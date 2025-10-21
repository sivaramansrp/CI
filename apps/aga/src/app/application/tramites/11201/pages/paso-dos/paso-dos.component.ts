import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';
import { Solicitud11201State } from '../../../../core/estados/tramites/tramite11201.store';
import { TituloComponent,Notificacion } from '@ng-mf/data-access-user';
import { Tramite11201Query } from '../../estados/queries/tramite11201.query';
import { Tramite11201Store } from '../../estados/tramites/tramite11201.store';
import { Validators } from '@angular/forms';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { ToastrService } from 'ngx-toastr';
import { 
  TablaDinamicaComponent,
  TablaSeleccion,
  ConfiguracionColumna,  
  TEXTO_ACEPTAR,
  TEXTO_CANCELAR,
  TEXTO_CERRAR,
  TEXTO_ELIMINAR_SOLICITUD,
  MSG_ALERTA_ELIMINAR_ELEMENTO,
  NotificacionesComponent,
  CAMPO_VACIO,
  MSG_ELIMINA_ELEMENTO
} from '@libs/shared/data-access-user/src';
import { LineaCaptura } from '../../../../core/models/5701/linea-captura.model';
import {
  CONFIGURACION_ENCABEZADO_TABLA_PAGOS,
} from '../../../../core/enums/5701/tramite5701.enum';
import { TITULO_MODAL_AVISO } from '@libs/shared/data-access-user/src/tramites/constantes/terceros.enums';
import {
  CONFIRMAR_ELIMINAR_SOLICITUD,
  MSG_ADUANA_PEDIMENTO,
  MSG_ERROR_RFC_NO_ENCONTRADO,
  MSG_ERROR_SELECCIONE_REGISTRO,
  MSG_MONTO_PAGADO_CUBIERTO,
  MSJ_ERROR_FECHAS_NO_SELECCIONADAS,
  MSJ_ERROR_FECHA_DIA,
  MSJ_ERROR_FECHA_FINAL_NO_SELECCIONADA,
  MSJ_ERROR_FECHA_INICIAL_NO_SELECCIONADA,
  MSJ_ERROR_FECHA_MES,
  MSJ_ERROR_FECHA_SEMANA,
  MSJ_ERROR_FOLIO_DDEX,
  MSJ_ERROR_HORA_FINAL_MENOR_INICIAL,
  MSJ_ERROR_ID_SOCIO_COMERCIAL,
  MSJ_ERROR_LINEA_CAPTURA,
  MSJ_ERROR_LINEA_CAPTURA_NO_VALIDA,
  MSJ_FECHA_DENTRO_DE_HORARIO_ADUANA,
  MSJ_LINEA_CAPTURA_DUPLICADA,
  MSJ_LINEA_CAPTURA_NO_PAGADA,
  MSJ_LINEA_CAPTURA_USADA,
  MSJ_NO_RELACION_ENCARGO_CONFERIDO,
} from '../../../../core/enums/5701/mensajes-modal-5701.enum';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  delay,
  forkJoin,
  map,
  merge,
  switchMap,
  takeUntil,
  tap,
  throwError,
  timer,
} from 'rxjs';
/**
 * Componente para el paso dos del trámite de contenedores temporales.
 * 
 * Este componente maneja el formulario de pago de derechos, incluyendo
 * la captura de información de líneas de captura y montos a pagar.
 * Gestiona la interacción con el store del trámite para persistir datos.
 * 
 * @component
 */
@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent,NotificacionesComponent],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  providers: [ToastrService],

})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Formulario reactivo que contiene los campos de datos del importador/exportador.
   * El formulario incluye un campo 'linea' y un campo 'monto' con validaciones de 'required'.
   *
   * @type {FormGroup}
   */
  formSolicitud!: FormGroup;

  /**
   * Estado de la solicitud de la sección 301.
   */
  public solicitudState!: Solicitud11201State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  public tablaSeleccionPagos = TablaSeleccion;

  mensajeCamposObligatorios: string = '* Campos obligatorios';



    /**
   * Datos de la tabla de pagos.
   */
  public datosTablaPagos: LineaCaptura[] = [];

   /**
   *@description Alamcena las lineas de capturas seleccionadas por el usuario en la tabla.
   */
  lineaCapturaSeleccionados: LineaCaptura[] = [];

  public nuevaNotificacion!: Notificacion | null;
  /**
   * GUarda el tipo de proceso que se eligió y de acuerdo a lo elegido se tomá decision en el modal.
   */
  public procesoModal!: string;

  @Output() cancelEvent = new EventEmitter<void>();

  @Output() continuarEvento = new EventEmitter<void>();




    /**
   * Encabezado de la tabla de pagos.
   */
  public encabezadoDeTablaPagos: ConfiguracionColumna<LineaCaptura>[] = CONFIGURACION_ENCABEZADO_TABLA_PAGOS;



  /**
   * Constructor del componente `PagoDeDerechosComponent`.
   *
   * Inicializa la instancia de `FormBuilder` para crear formularios reactivos.
   *
   * @param {FormBuilder} fb - Instancia de FormBuilder utilizada para construir formularios reactivos.
   */
  constructor(
    private fb: FormBuilder,
    private tramite11201Store: Tramite11201Store,
    private tramite11201Query: Tramite11201Query,
    private datosTramiteService: DatosTramiteService,
    private toastrService: ToastrService,
    // eslint-disable-next-line no-empty-function
  ) { }

  /**
   * Método del ciclo de vida `ngOnInit()`.
   * Este método se ejecuta cuando el componente se inicializa y realiza las siguientes acciones:
   * - Inicializa el formulario reactivo `FormSolicitud` con dos campos: `linea` y `monto`.
   * - Llama al método `campoDeDormularioDeActualización()` para configurar el campo 'monto', deshabilitándolo y estableciendo un valor predeterminado.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnInit(): void {
    // Inicializa el formulario con validaciones requeridas
    this.tramite11201Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe()

    this.formSolicitud = this.fb.group({
      pagoDeDerechos: this.fb.group({
        linea: [this.solicitudState?.linea, Validators.required],
        monto: ['', Validators.required],
        montoPagar: [this.solicitudState?.monto],
        lineaCheckbox: [this.solicitudState?.lineaCheckbox],
      }),
    });


    // Llama al método para actualizar el campo 'monto'
    // this.campoDeDormularioDeActualizacion();
    this.getMontoConstanciaITC();
  }

  /**
   * Método `campoDeDormularioDeActualizacion()`.
   * Este método se encarga de actualizar el campo 'monto' dentro del formulario:
   * - Deshabilita el campo 'monto'.
   * - Establece el valor predeterminado de 'monto' a '352'.
   *
   * @memberof PagoDeDerechosComponent
   */
  campoDeDormularioDeActualizacion(): void {
    // Deshabilita el campo 'monto' y asigna el valor '352'
    this.formSolicitud.get('pagoDeDerechos.montoPagar')?.disable();
    this.formSolicitud.get('pagoDeDerechos.montoPagar')?.setValue('352');
  }

   /**
   * Obtiene el grupo de formulario 'datosServicio' del formulario principal 'FormSolicitud'.
   *
   * @returns {FormGroup} El grupo de formulario 'datosServicio'.
   */
  get datosServicio(): FormGroup {
    return this.formSolicitud?.get('pagoDeDerechos') as FormGroup;
  }

  getMontoConstanciaITC(): void {
    this.datosTramiteService.getMontoConstanciaITC()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((respuesta: any) => {
        if (respuesta?.codigo === '00') {
          this.formSolicitud.get('pagoDeDerechos.montoPagar')?.disable();
          this.formSolicitud.get('pagoDeDerechos.montoPagar')?.setValue(respuesta.datos);
        } else {
          this.toastrService.error(respuesta.error);
        }
      });
  }

  /**
   * Método `onSubmit()`.
   * Este método se ejecuta cuando se envía el formulario y realiza las siguientes acciones:
   * - Valida si el formulario es válido.
   * - Llama al método `setValoresStore()` para guardar los valores del formulario en el estado.
   *
   * @param {FormGroup} form - Formulario reactivo que contiene los campos de datos del importador/exportador.
   * @memberof PagoDeDerechosComponent
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite11201Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite11201Store[metodoNombre] as (value: Tramite11201Store) => void)(VALOR);
  }


  /**
   * Validates the payment information entered in the form.
   *
   * This method checks if the 'linea' and 'monto' fields in the form are valid.
   * If both fields are valid, it calls the `validarPago` method of `datosTramiteService`
   * with the provided values. The response is observed until the component is destroyed.
   * If the response code is '00', a success alert is shown to the user.
   */
  validarPago(): void {
    if (
      this.formSolicitud.get('pagoDeDerechos.linea')?.valid &&
      this.formSolicitud.get('pagoDeDerechos.monto')?.valid
    ) {
      const linea_captura = this.formSolicitud.get('pagoDeDerechos.linea')?.value;
      const monto = this.formSolicitud.get('pagoDeDerechos.monto')?.value;
      const PAYLOAD = { linea_captura, monto };
      this.datosTramiteService
        .validarPago(PAYLOAD)
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((respuesta: any) => {
          if (respuesta?.codigo === '00') {
           const PAGO = {
            lineaCaptura: linea_captura,
            monto: respuesta.datos.pago_model.importe,
          };
           this.datosTablaPagos = [...this.datosTablaPagos, PAGO];
          }
          if (respuesta?.codigo !== '00') {
            this.toastrService.error(respuesta.error);

          }
        });
    }
  }

   /**
   * Elimina un elemento de la tabla de lineas de captura
   * @returns {void} No retorna ningún valor.
   */
  eliminarLineaCaptura(): void {
    if (this.lineaCapturaSeleccionados.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: '',
        modo: 'action',
        titulo: TITULO_MODAL_AVISO,
        mensaje: MSG_ERROR_SELECCIONE_REGISTRO,
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
      return;
    }

    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: '',
      modo: 'action',
      titulo: TITULO_MODAL_AVISO,
      mensaje: MSG_ALERTA_ELIMINAR_ELEMENTO,
      cerrar: false,
      txtBtnAceptar: TEXTO_ACEPTAR,
      txtBtnCancelar: TEXTO_CANCELAR,
    };
    this.procesoModal = 'linea_captura';
  }

  
  // #Seccion Modal
  /**
   * Método que maneja el evento de aceptar o no una accion del componente Notificación cuando este es un modal.
   */
  confirmacionModal(confirmar: boolean): void {
    switch (this.procesoModal) {
      case 'linea_captura':
        if (confirmar) {
          this.limpiarNotificacion();
          this.datosTablaPagos = this.datosTablaPagos.filter(
            (item) =>
              !this.lineaCapturaSeleccionados.some(
                (seleccionado) =>
                  seleccionado.lineaCaptura === item.lineaCaptura
              )
          );
          this.lineaCapturaSeleccionados = [];

          timer(500)
            .pipe(
              tap(() => {
                this.nuevaNotificacion = {
                  tipoNotificacion: 'alert',
                  categoria: '',
                  modo: 'action',
                  titulo: TITULO_MODAL_AVISO,
                  mensaje: MSG_ELIMINA_ELEMENTO,
                  cerrar: false,
                  txtBtnAceptar: TEXTO_ACEPTAR,
                  txtBtnCancelar: CAMPO_VACIO,
                };
              }),
              takeUntil(this.destroyNotifier$)
            )
            .subscribe();

          // this.tramite5701Store.setLineasCaptura(this.datosTablaPagos);
          // this.montoPagadoLineas = this.datosTablaPagos.reduce(
          //   (total, item) => total + item.monto,
          //   0
          // );

          this.procesoModal = '';
        }
        break;
      default:
        break;
    }
  }

   /**
   * Lipia el objeto de notificación y el proceso modal.
   * @returns {void} No retorna ningún valor.
   */
  limpiarNotificacion(): void {
    this.nuevaNotificacion = null;
    this.procesoModal = '';
  }

  cancelar(): void {
    this.cancelEvent.emit();
  }

  continuar(): void {
    this.continuarEvento.emit();
  }

  pagosGuardar(): void {
    console.log('Guardar pagos',this.datosTablaPagos);

    const PAYLOAD = {
          "pagos": this.datosTablaPagos.map(pago => ({
            linea_captura: pago.lineaCaptura,
            monto: pago.monto
          }))
    }
    const idSolicitud = this.solicitudState.idSolicitud;
    this.datosTramiteService
      .guardarPagosSolicitud(PAYLOAD, idSolicitud)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (respuesta) => {
          // Manejar éxito, posiblemente refrescar la grilla o mostrar mensaje
          if (respuesta?.codigo === '00') {
            this.continuar();
          }
        }
      );
  } 



  /**
   * Método `ngOnDestroy()`.
   * Este método se ejecuta cuando el componente se destruye y realiza las siguientes acciones:
   * - Desuscribe la suscripción a los cambios en el formulario reactivo.
   *
   * @memberof PagoDeDerechosComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete()
  }
}
