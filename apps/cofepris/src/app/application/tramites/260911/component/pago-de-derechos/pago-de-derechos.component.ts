/**
 * Componente para gestionar el formulario de pago de derechos.
 * Este componente permite al usuario ingresar y validar información relacionada con el pago de derechos,
 * incluyendo validaciones específicas como fechas no futuras y valores sin comas.
 * También interactúa con el estado global y servicios para obtener datos dinámicos como la lista de bancos.
 * 
 * @packageDocumentation
 * @module PagoDeDerechosComponent
 */

import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260911State, Tramite260911Store } from '../../estados/tramite260911.store';

import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PagoDeDerechosService } from '../../services/datos-de-la-solicitud/pago-de-derechos.service';

import { Tramite260911Query } from '../../estados/tramite260911.query';

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
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
  providers: [PagoDeDerechosService],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss',
})
export class PagoDeDerechosComponent implements OnInit, OnDestroy {

   /** Estado actual de la solicitud proveniente del store */
  public solicitudState!: Tramite260911State;

    /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;
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
  estadoSeleccionado!: Tramite260911State;

  /**
   * Lista de datos relacionados con bancos obtenidos desde el servicio.
   */
  public bancoList!: Catalogo[];

  /**
   * Constructor para inyectar los servicios y las tiendas necesarias.
   * @param fb - FormBuilder para formularios reactivos.
   * @param tramite260911Store - Tienda para gestionar el estado del formulario.
   * @param tramite260911Query - Servicio de consulta para acceder a los datos del store.
   * @param Servicio - Servicio para obtener la lista de bancos.
   */
  constructor(
    public fb: FormBuilder,
    private tramite260911Store: Tramite260911Store,
    private tramite260911Query: Tramite260911Query,
    private Servicio: PagoDeDerechosService,
     public consultaioQuery: ConsultaioQuery,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  
  /**
   * Inicializa el formulario dependiendo del modo (solo lectura o editable).
   * Si está en solo lectura, carga y bloquea el formulario.
   * Si no, crea un formulario editable.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearForm();
    }
  }

   /**
   * Crea el formulario y, si está en modo solo lectura, lo deshabilita.
   * De lo contrario, lo habilita para edición.
   */
  guardarDatosFormulario(): void {
    this.crearForm();
    if (this.esFormularioSoloLectura) {
      this.pagoDeDerechosForm.disable();
    } else {
      this.pagoDeDerechosForm.enable();
    }
  }

  /**
   * Hook de ciclo de vida para inicializar la lógica del componente y cargar datos.
   */
  ngOnInit(): void {
 this.inicializarEstadoFormulario();
    this.obtenerBancoList();
  }

  /**
   * Crea el formulario reactivo con las reglas de validación para cada control.
   */
  crearForm(): void {
    this.tramite260911Query.selectTramite260911$
        .pipe(
          takeUntil(this.destroyed$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe();
    this.pagoDeDerechosForm = this.fb.group({
      claveDeReferencia: [this.solicitudState?.claveDeReferencia, [Validators.maxLength(50)]],
      cadenaPagoDependencia: [this.solicitudState?.cadenaPagoDependencia, [Validators.maxLength(50)]],
      clave: [this.solicitudState?.clave, Validators.required],
      llaveDePago: [this.solicitudState?.llaveDePago, [Validators.required, Validators.pattern('^[A-Z0-9]{10}$')]],
      fecPago: [this.solicitudState?.fecPago, [Validators.required, PagoDeDerechosComponent.fechaLimValidator()]],
      impPago: [this.solicitudState?.impPago, [Validators.maxLength(16), PagoDeDerechosComponent.noComaValidator()]],
    });
  }

  /**
   * Método para validar cambios en un campo de formulario relacionado con fechas futuras.
   * Monitorea los cambios de valor del campo especificado y actualiza su estado de validación sin emitir eventos adicionales.
   * 
   * @param {string} fecPago - El nombre del campo de formulario que se validará.
   */
  public validarFechaFutura(fecPago: string): void {
    this.pagoDeDerechosForm.get(fecPago)?.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Método para validar que el campo de un formulario no contenga comas.
   * Actualiza el estado de validez del campo especificado sin emitir eventos adicionales.
   *
   * @param {string} impPago - El nombre del campo de formulario que se validará.
   */
  public validarSinComas(impPago: string): void {
    this.pagoDeDerechosForm.get(impPago)?.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Validador para asegurar que la fecha seleccionada no sea en el futuro.
   * 
   * @returns {ValidatorFn} - Función de validación personalizada.
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
   * 
   * @returns {ValidatorFn} - Función de validación personalizada.
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
  obtenerBancoList(): void {
    this.Servicio.onBancoList()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: Catalogo[]) => {
        this.bancoList = data;
      });
  }

  /**
   * Pasa el valor de un campo del formulario a la tienda para la gestión del estado.
   * 
   * @param FormGroup - El formulario reactivo.
   * @param control - El nombre del campo en el formulario.
   */
  public setValoresStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260911Store.setTramite260911State({
      [control]: VALOR
    });
  }

  /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * 
   * @param {string} nombreControl - Nombre del control a verificar.
   * @returns {boolean} - True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.pagoDeDerechosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Obtiene el estado actual del trámite desde el store.
   */
  getValorStore(): void {
    this.tramite260911Query.selectTramite260911$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data) => {
        this.estadoSeleccionado = data;
      }
    );
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Libera recursos y evita fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}