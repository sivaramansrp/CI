/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FECHA_FACTURA, PagoDerechosState } from '../../models/tramies230401.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputFecha, REGEX_IMPORTE_PAGO, REGEX_LLAVE_DE_PAGO, SeccionLibQuery, dateLessThanOrEqualToday } from '@libs/shared/data-access-user/src';
import {
  delay,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PantallasActionService } from '../../services/pantallas-action.service';
import { SeccionLibState } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { Solicitud230401Query } from '../../estados/queries/solicitud230401.query';
import { Subject } from 'rxjs';
import { Tramite230401Store } from '../../estados/tramite230401.store';

@Component({
  selector: 'app-pago-de-derechos',
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent implements OnInit , OnDestroy {
  /**
   * Formulario reactivo que contiene los campos de datos del importador/exportador.
   * El formulario incluye un campo 'linea' y un campo 'monto' con validaciones de 'required'.
   *
   * @type {FormGroup}
   */
  public pagoDerechos!: FormGroup;

  /**
   * Suscripción a los cambios en el formulario reactivo.
   */
  public clasificacion: string = '';

  /**
   * Estado de la solicitud de la sección 230401.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado de la solicitud de la sección 230401.
   */
  public pagoDerechosState!: PagoDerechosState;

  /**
   * Estado de la sección de la solicitud.
   */
  private seccion!: SeccionLibState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Representa la fecha de la factura como una entrada de tipo `InputFecha`.
   * Este valor se inicializa con la constante `FECHA_FACTURA`.
   * 
   * @type {InputFecha}
   */
  public fechaDeLaFacturaInput: InputFecha = FECHA_FACTURA;

  constructor(public pantallasService: PantallasActionService, private fb: FormBuilder,
    public tramite230401Store:Tramite230401Store, public solicitud230401Query: Solicitud230401Query,
    private seccionQuery: SeccionLibQuery,private seccionStore: SeccionLibStore,
    private consultaQuery: ConsultaioQuery,
  ) {
    this.pantallasService.inicializaPagoDerechosCatalogo();
  }

  /**
   * Crea y configura el formulario de pago de derechos.
   * Los campos 'clave', 'dependencia', 'llavePago' e 'importePago' están deshabilitados por defecto.
   * Los campos 'banco' y 'fecha' son obligatorios.
   */
  ngOnInit(): void {
    this.solicitud230401Query.seletPagoDerechosState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.pagoDerechosState = seccionState;
        })
      ).subscribe();
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if(!seccionState.create && seccionState.procedureId === '230401') {
            this.esFormularioSoloLectura = seccionState.readonly;
            this.fechaDeLaFacturaInput.habilitado = !this.esFormularioSoloLectura;
          }
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
    this.pagoDerechos.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          const SECCION: number = 2;
          const FORMAS_VALIDADAS = this.seccion.formaValida;
          const ES_VALIDO_EL_BANCO = this.pagoDerechos.get('banco')?.status;
          const ES_VALIDO_EL_FECHO = this.pagoDerechos.get('fecha')?.status;
          if (this.pagoDerechos.valid ||
            (ES_VALIDO_EL_BANCO === 'VALID' && ES_VALIDO_EL_FECHO === 'VALID')) {
            FORMAS_VALIDADAS[SECCION] = true;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          } else {
            FORMAS_VALIDADAS[SECCION] = false;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          }
        })
      )
      .subscribe();
  }

    /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
    inicializarEstadoFormulario(): void {
      this.createPagoDerechos();
      if (this.esFormularioSoloLectura) {
        this.pagoDerechos.disable();
      }
    }

  /**
   * Este método inicializa el formulario `pagoDerechos` con varios campos predefinidos
   * y sus respectivas validaciones. Algunos campos están deshabilitados y tienen valores
   * predeterminados.
   * Campos del formulario:
   * - clave: Clave del trámite, deshabilitado y con valor predeterminado.
   * - dependencia: Dependencia correspondiente, deshabilitado y con valor predeterminado.
   * - banco: Banco donde se realizará el pago, requerido.
   * - llavePago: Llave de pago, deshabilitado y con valor predeterminado.
   * - importePago: Importe del pago, deshabilitado y con valor predeterminado.
    */
  createPagoDerechos(): void {
    this.pagoDerechos = this.fb.group({
      clave:  [this.pagoDerechosState.clave, [Validators.required, Validators.maxLength(50)]],
      dependencia: [this.pagoDerechosState.dependencia, [Validators.required, Validators.maxLength(50)]],
      banco: [this.pagoDerechosState.banco, [Validators.required]],
      llavePago: [ this.pagoDerechosState.llavePago, [Validators.required, Validators.pattern(REGEX_LLAVE_DE_PAGO)]],
      fecha: [this.pagoDerechosState.fecha, [Validators.required, dateLessThanOrEqualToday]],
      importePago: [ this.pagoDerechosState.importePago, [Validators.required, Validators.maxLength(16), Validators.pattern(REGEX_IMPORTE_PAGO)]],
    });
    const FETCHA_CONTROL = this.pagoDerechos.get('fecha');
    if (FETCHA_CONTROL) {
      FETCHA_CONTROL.valueChanges.subscribe((value) => {
        this.tramite230401Store.setPagoDerechosStateProperty('fecha', value);
      });
    }
  }

  
  /**
   * Método para manejar la selección de clasificación.
   */
  clasificacionSeleccione(): void {
    this.clasificacion = this.pagoDerechos.get('banco')?.value;
    this.tramite230401Store.setPagoDerechosStateProperty('banco', this.clasificacion);
  }
 /**
   * Maneja el evento cuando la fecha es cambiada.
   * 
   * @param fecha - La nueva fecha seleccionada en formato de cadena.
   * Si se proporciona una fecha válida, actualiza el formulario `pagoDerechos`
   * con el valor de la fecha de exportación.
   */
 onFechaCambiada(fecha: string): void {
  if (fecha) {
    this.pagoDerechos.patchValue({ fecha: fecha });
    this.tramite230401Store.setPagoDerechosStateProperty('fecha', fecha);
  }
}
    /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
    ngOnDestroy(): void {
      this.destroyNotifier$.next();
      this.destroyNotifier$.complete();
    }
}
