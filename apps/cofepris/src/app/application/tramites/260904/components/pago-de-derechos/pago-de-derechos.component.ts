/**
 * Importa módulos y utilidades de Angular necesarios para formularios reactivos, validación y observables
 * @packageDocumentation
 * @module PagoDeDerechosComponent
 */

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Component,Input, OnChanges, OnDestroy, OnInit } from '@angular/core';

import { ConsultaioQuery, REGEX_IMPORTE_PAGO, REGEX_LLAVE_DE_PAGO} from "@ng-mf/data-access-user";

import { Tramite260904State, Tramite260904Store } from '../../estados/tramite260904.store';

import { Subject, map, takeUntil } from 'rxjs';

import { BancoList } from '../../modelos/pago-de-derechos.model';
import { CommonModule } from '@angular/common';
import { PagoDeDerechosService } from '../../services/pago-de-derechos.service';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { Tramite260904Query } from '../../estados/tramite260904.query';


/**
 * Selector del componente
 * Habilita el uso independiente de este componente
 * Módulos necesarios
 * Proveedores de servicios para inyección de dependencias
 * Ruta del archivo HTML
 * Ruta del archivo CSS
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent],
  providers: [PagoDeDerechosService],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * Formulario reactivo para manejar los campos de entrada del usuario.
   */
  public pagoDeDerechosForm!: FormGroup;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   */
  public destroyed$ = new Subject<void>();

   /**
    * Estado seleccionado del trámite 260911.
    */
  estadoSeleccionado!: Tramite260904State;

  /**
   * Lista de datos relacionados con bancos obtenidos desde el servicio.
   */
  public bancoList!: BancoList[];

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el campo de banco está deshabilitado.
   * Cuando es `true`, el campo de selección de banco no se puede modificar.
   */
  disableBanco: boolean = false;

  /**
   * @desc Sujeto utilizado para notificar la destrucción del componente.
   * Se emplea comúnmente para cancelar suscripciones y evitar fugas de memoria
   * cuando el componente se destruye.
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject<void>();

  /**
   * Constructor para inyectar los servicios y las tiendas necesarias.
   * @param fb - FormBuilder para formularios reactivos.
   * @param tramite260904Store - Tienda para gestionar el estado del formulario.
   * @param tramite260904Query - Servicio de consulta para acceder a los datos del store.
   * @param Servicio - Servicio para obtener la lista de bancos.
   */
  constructor(
    public fb: FormBuilder,
    private tramite260904Query: Tramite260904Query,
    private tramite260904Store: Tramite260904Store,
    private Servicio: PagoDeDerechosService,
    private consultaQuery: ConsultaioQuery,
  ) {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Hook de ciclo de vida para inicializar la lógica del componente y cargar datos.
   */
  ngOnInit(): void {
   
    this.inicializarEstadoFormulario();
     this.getBancoList();
    if (!this.esFormularioSoloLectura && !this.disabled) {
      if (this.tipoTramite === '1' || this.tipoTramite === '2') {
        this.pagoDeDerechosForm?.enable();
      } else {
        this.pagoDeDerechosForm?.disable();
      }
    } else {
      this.pagoDeDerechosForm?.disable();
    }
    if (this.disabled) {
      this.pagoDeDerechosForm.disable();
    }
  }

   ngOnChanges(): void {
    if (this.pagoDeDerechosForm) {
      if (this.tipoTramite === '1' || this.tipoTramite === '2') {
        this.pagoDeDerechosForm.enable();
      } else {
        this.pagoDeDerechosForm.disable();
      }
    }
  }
  @Input() disabled: boolean = false;
  @Input() tipoTramite: string = '';

  /**
   * Crea el formulario reactivo con las reglas de validación para cada control.
   */
  crearForm(): void {
     this.tramite260904Query.selectTramite260904$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.estadoSeleccionado = seccionState;
        })
      )
      .subscribe();
    this.pagoDeDerechosForm = this.fb.group({
      claveDeReferencia: [this.estadoSeleccionado.claveDeReferencia, [Validators.maxLength(50)]],
      cadenaPagoDependencia: [this.estadoSeleccionado.cadenaPagoDependencia, [Validators.maxLength(50)]],
      clave: [this.estadoSeleccionado.clave, Validators.required],
      llaveDePago: [
        this.estadoSeleccionado.llaveDePago,
        [Validators.required, Validators.pattern('^[A-Z0-9]{10}$'),],
      ],
      fecPago: [
        this.estadoSeleccionado.fecPago,
        [Validators.required, PagoDeDerechosComponent.fechaLimValidator()],
      ],
      impPago: [
        this.estadoSeleccionado.impPago,
        [Validators.maxLength(30), Validators.pattern(REGEX_IMPORTE_PAGO), PagoDeDerechosComponent.noComaValidator()],
      ],
    });
    this.pagoDeDerechosForm.disable();
}

/**
   * Inicializa el estado del formulario según si está en modo solo lectura o editable.
   * Si el formulario es solo lectura, deshabilita los campos correspondientes.
   * Si es editable, habilita los campos necesarios.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearForm();
    }
  }

  
  /**
   * Guarda los datos del formulario y configura su estado de habilitación.
   * 
   * Crea el formulario y posteriormente lo habilita o deshabilita
   * según el modo de operación (lectura o edición).
   * 
   * @returns void
   */
  guardarDatosFormulario(): void {
    this.crearForm();
    if (this.esFormularioSoloLectura) {
      this.pagoDeDerechosForm.disable();
    }
  }
/**
 * Método para validar que el campo de un formulario no contenga comas.
 * Actualiza el estado de validez del campo especificado sin emitir eventos adicionales.
 *
 * @param {string} impPago - El nombre del campo de formulario que se validará.
 */
public validarSinComas(impPago:string): void {
  this.pagoDeDerechosForm.get(impPago)?.updateValueAndValidity({ emitEvent: false });
}


/**
 * Método para validar cambios en un campo de formulario relacionado con fechas futuras.
 * Monitorea los cambios de valor del campo especificado y actualiza su estado de validación sin emitir eventos adicionales.
 * Utiliza operadores de RxJS como distinctUntilChanged y takeUntil para manejar suscripciones de forma eficiente y evitar fugas de memoria.
 *
 * @param {string} fecPago - El nombre del campo de formulario que se validará.
 */
public validarFechaFutura(fecPago:string): void {
  this.pagoDeDerechosForm.get(fecPago)?.updateValueAndValidity({ emitEvent: false });
}



  /**
   * Validador para asegurar que la fecha seleccionada no sea en el futuro.
   */
  public static fechaLimValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const LIM = control.value;
      if (LIM) {
        const [YEAR, MONTH, DAY] = LIM.split('-');
        const FECHA = new Date(+Number(YEAR), +Number(MONTH) - 1, +Number(DAY));
        const TODAY = new Date();
        if (FECHA.getTime() > TODAY.getTime()) {
          return { fechaLim: true }; // Retorna error si la fecha está en el futuro
        }
      }
      return null; // Fecha válida
    };
  }

  /**
   * Validador para asegurar que la entrada no contenga comas.
   */
  public static noComaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } | null => {
      const VALUE = control.value;
      if (VALUE && VALUE.includes(',')) {
        return { noComa: true }; // Retorna error si el valor contiene comas
      }
      return null; // Entrada válida
    };
  }

  /**
   * Obtiene la lista de bancos del servicio y la asigna a `bancoList`.
   */
  getBancoList(): void {
    this.Servicio.onBancoList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: BancoList[]) => {
        this.bancoList = data;
      });
  }


  /**
   * Actualiza el formulario con datos obtenidos desde la tienda.
   */
  public enPatchStoredFormData(): void {
    this.tramite260904Query.selectTramite260904$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.pagoDeDerechosForm.patchValue({
            claveDeReferencia: seccionState.claveDeReferencia,
            cadenaPagoDependencia: seccionState.cadenaPagoDependencia,
            clave: seccionState.clave,
            llaveDePago: seccionState.llaveDePago,
            fecPago: seccionState.fecPago,
            impPago: seccionState.impPago,
          });
        })
      )
      .subscribe();
  }

  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
  const CONTROL = this.pagoDeDerechosForm.get(nombreControl);
  return CONTROL
    ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) && CONTROL.value
    : false;
}


  /**
   * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
   * @param form - El formulario reactivo.
   * @param campo - El nombre del campo en el formulario.
   * @param metodoNombre - El método en la tienda para actualizar el estado.
   */
public setValoresStore(form: FormGroup, campo: string): void {
  const CONTROL = form.get(campo);
  const VALOR = CONTROL?.value;
  this.tramite260904Store.setTramite260904State({
    [campo]: VALOR
  });
  if (CONTROL && (VALOR === null || VALOR === '')) {
    CONTROL.markAsPristine();
    CONTROL.markAsUntouched();
  }
}
  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite260904Query.selectTramite260904$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.estadoSeleccionado = data;
      }
    );
  }

  /**
   * Valida la longitud máxima de un campo y marca el control como tocado para mostrar errores.
   * 
   * Este método se ejecuta en el evento input para mostrar errores de validación
   * cuando el usuario alcanza el límite de caracteres, incluso cuando el HTML
   * maxlength previene la entrada de más caracteres.
   * 
   * @param controlName - Nombre del control a validar
   * @param maxLength - Longitud máxima permitida
   * @returns void
   */
  public validarLongitudMaxima(controlName: string, maxLength: number): void {
    const CONTROL = this.pagoDeDerechosForm.get(controlName);
    if (CONTROL && CONTROL.value && CONTROL.value.length >= maxLength) {
      CONTROL.markAsTouched();
      CONTROL.markAsDirty();
    }
  }
  /**
   * Resetea todos los campos del formulario de pago de derechos y actualiza el store.
   * Marca los controles como pristine y untouched para ocultar errores de campos requeridos después de borrar.
   * Se invoca al hacer clic en el botón "Borrar datos del pago".
   */
  resetPagoDeDerechos(): void {
    if (this.pagoDeDerechosForm) {
      this.pagoDeDerechosForm.reset();
      Object.values(this.pagoDeDerechosForm.controls).forEach(control => {
        control.markAsPristine();
        control.markAsUntouched();
        control.updateValueAndValidity();
      });
      this.tramite260904Store.setTramite260904State({
        claveDeReferencia: '',
        cadenaPagoDependencia: '',
        clave: '',
        llaveDePago: '',
        fecPago: '',
        impPago: ''
      });
    }
  }



  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
