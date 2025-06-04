import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DatosDomicilioLegalState,
  DatosDomicilioLegalStore,
} from '../../estados/stores/datos-domicilio-legal.store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Notificacion,
  REGEX_CORREO_ELECTRONICO,
  REGEX_RFC_FISICA,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  NotificacionesComponent,
  Pedimento,
} from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ConfiguracionVisibilidad } from '../../models/datos-domicilio-legal.model';
import { DEFAULT_CONFIGURACION_VISIBILIDAD } from '../../constantes/datos-domicilio-legal.enum';
import { DatosDomicilioLegalQuery } from '../../estados/queries/datos-domicilio-legal.query';
import { DomicilioComponent } from '../domicilio-establecimiento/domicilio-establecimiento.component';
import { ManifiestosComponent } from '../manifiestos-declaraciones/manifiestos-declaraciones.component';
import { RepresentanteLegalRfcComponent } from '../representante-legal-rfc/representante-legal-rfc.component';
/**
 * Componente responsable de gestionar y mostrar los datos principales del formulario,
 * incluyendo domicilio, manifiestos y representante legal.
 */
@Component({
  selector: 'app-datos-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    DomicilioComponent,
    ManifiestosComponent,
    NotificacionesComponent,
    RepresentanteLegalRfcComponent,
  ],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosDeLaComponent implements OnInit, OnDestroy {
  /**
   * Indica si el campo GarantiasOfrecidasVisible es visible.
   */
  @Input() isGarantiasOfrecidasVisible: boolean = false;
  /**
   * Indica si el campo AvisoLicenciaVisible es visible.
   */
  @Input() isAvisoLicenciaVisible: boolean = true;

  /**
   * Indica si el campo AduanasEntradaVisible es visible.
   */
  @Input() isAduanasEntradaVisible: boolean = false;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: DatosDomicilioLegalState;

  /**
   * Indica si el campo esPaginacionVisible es visible.
   */
  @Input() esPaginacionVisible: boolean = false;


  /**
   * Método que se llama cuando se elimina un pedimento.
   * @param {boolean} borrar - Indica si se debe eliminar el pedimento.
   * Si es verdadero, se elimina el pedimento en la posición `elementoParaEliminar` del arreglo `pedimentos`.
   */
  eliminarPedimento(borrar: boolean): void {
    this.alternarControlesDeFormulario();
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * @description
   * Arreglo que almacena los pedimentos asociados al establecimiento.
   * Cada pedimento contiene información relevante para el trámite.
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * @description
   * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
   * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
   */
  elementoParaEliminar!: number;

   /** Bandera de solo lectura (puedes adaptarla si tienes lógica para esto) */
  public esFormularioSoloLectura: boolean = false;

  /**
   * Notificador para destruir observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

   /**
   * Configuración de visibilidad de los campos.
   */
   @Input() configuracionVisibilidad: ConfiguracionVisibilidad = DEFAULT_CONFIGURACION_VISIBILIDAD

  /**
   * Constructor del componente.
   * @param fb
   * @param datosDomicilioLegalStore
   * @param datosDomicilioLegalQuery
   */
  constructor(
    public readonly fb: FormBuilder,
    private datosDomicilioLegalStore: DatosDomicilioLegalStore,
    private datosDomicilioLegalQuery: DatosDomicilioLegalQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
    // Inicializa el formulario.
    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
      })
    )
    .subscribe()
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de estados.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
    // this.getEstadoCatalogo();
  }
    /**
   * Carga datos y deshabilita el formulario si es solo lectura.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
     this.forma = this.fb.group({
      rfcDel: [{ value: this.solicitudState?.rfcDel, disabled: true },Validators.pattern(REGEX_RFC_FISICA)],
      denominacion: [
        { value: this.solicitudState?.denominacion, disabled: true },
        Validators.required,
      ],
      correo: [
        { value: this.solicitudState?.correo, disabled: true },
        [Validators.required,Validators.pattern(REGEX_CORREO_ELECTRONICO)]
      ],
    });
  }

  /**
   * Inicializa el formulario reactivo para capturar el estado seleccionado.
   */
    inicializarFormulario(): void {
      this.datosDomicilioLegalQuery.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        )
        .subscribe();
        
    }

  /**
   * Grupo de formularios principal.
   * @property {FormGroup} forma
   */
  forma!: FormGroup;

  /**
   * Método que se llama cuando se inicializa el componente
   * */
  ngOnInit(): void {
    this.datosDomicilioLegalQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.forma = this.fb.group({
      rfcDel: [{ value: this.solicitudState?.rfcDel, disabled: true },Validators.pattern(REGEX_RFC_FISICA)],
      denominacion: [
        { value: this.solicitudState?.denominacion, disabled: true },
        Validators.required,
      ],
      correo: [
        { value: this.solicitudState?.correo, disabled: true },
        [Validators.required,Validators.pattern(REGEX_CORREO_ELECTRONICO)]
      ],
    });
        this.inicializarEstadoFormulario();

  }

  /**
   * Método que se llama cuando se envía el formulario.
   * Se utiliza para establecer los valores en el store de DatosDomicilioLegal.
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Método que se llama cuando se envía el formulario.
   */
  alternarControlesDeFormulario(): void {
    Object.keys(this.forma.controls).forEach((controlName) => {
      const CONTROL = this.forma.get(controlName);
      if (CONTROL?.disabled) {
        CONTROL.enable();
      }
    });
  }
  /**
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof DatosDomicilioLegalStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (
      this.datosDomicilioLegalStore[metodoNombre] as (
        value: string | number | boolean
      ) => void
    )(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
