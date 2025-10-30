import {
  AlertComponent,
  BtnContinuarComponent,
  ConsultaioQuery,
  ConsultaioState,
  DatosPasos,
  doDeepCopy,
  ERROR_FORMA_ALERT,
  esValidObject,
  JSONResponse,
  ListaPasosWizard,
  PasoFirmaComponent,
  WizardComponent,
  WizardService,
} from '@libs/shared/data-access-user/src';
import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosComponent } from '../datos/datos.component';
import { PAGO_DE_DERECHOS } from '../../constantes/solicitud150102.enum';
import { REPORTE_ANUAL_PASOS } from '../../enums/reporte-anual.enum';
import { Solicitud150102State, Solicitud150102Store } from '../../estados/solicitud150102.store';
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { catchError, from, map, Observable, of, Subject, switchMap, take, takeUntil } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { ToastrService } from 'ngx-toastr';
import { ServicioDeFormularioService } from '../../../../shared/services/forma-servicio/servicio-de-formulario.service';

/**
 * @description Interfaz que define la estructura y propiedades de una acción asociada a un botón interactivo.
 * Esta interfaz permite manejar eventos y datos relacionados con el funcionamiento del botón.
 *
 * @interface AccionBoton
 * @property {string} accion - Define la acción que se ejecutará cuando se interactúe con el botón.
 * Puede incluir valores como 'cont' para avanzar, o 'atras' para retroceder, según la lógica del asistente.
 * @property {number} valor - Representa un valor numérico asociado a la acción, como el índice del paso actual.
 * Este campo se utiliza para identificar el contexto de la acción realizada.
 */
interface AccionBoton {
  /** Especifica la acción a realizar al presionar el botón (e.g., 'cont' para continuar, 'atras' para retroceder). */
  accion: string;

  /** Valor numérico asociado a la acción, usado para definir el paso o estado actual. */
  valor: number;
}

/**
 * @description Componente que gestiona el proceso de solicitud de reporte.
 * Utiliza un asistente (wizard) para guiar al usuario a través de diferentes pasos.
 */
@Component({
  selector: 'app-solicitud-de-reporte', // Selector del componente
  standalone: true, // Indica que este componente no es independiente y depende de otros módulos
  imports: [
    CommonModule,
    WizardComponent,
    DatosComponent,
    PasoFirmaComponent,
    AlertComponent,
    BtnContinuarComponent,
    AlertComponent,
  ], // Importa el componente Wizard para su uso en este componente
  templateUrl: './solicitud-de-reporte.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './solicitud-de-reporte.component.scss', // Ruta del archivo de estilos
})
export class SolicitudDeReporteComponent implements OnInit,OnDestroy{

  /** Identificador numérico para guardar la solicitud.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  public guardarIdSolicitud: number = 0;
  /** Estado actual de la solicitud */
  public solicitud150102State!: Solicitud150102State;
  /**
   * Representa el estado actual del pago de derechos.
   *
   * Inicialmente se establece con el valor `ADJUNTAR` de la enumeración `PAGO_DE_DERECHOS`.
   *
   * @type {string}
   */
  PAGO_DE_DERECHOS: string = PAGO_DE_DERECHOS.ADJUNTAR;
  /**
   * Mensaje de error a mostrar.
   */
  esValido = true;

  /** Referencia al componente del asistente (wizard) */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente `DatosComponent` identificado mediante el template reference variable `#datos`.
   *
   * Permite acceder directamente a las propiedades y métodos del componente hijo desde el componente padre.
   */
  @ViewChild('datos') datosComponent!: DatosComponent;

  /** Lista de pasos dentro del asistente */
  pantallasPasos: ListaPasosWizard[] = REPORTE_ANUAL_PASOS;

  /**
   * @description Índice del paso actual dentro del asistente.
   *
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Contiene el mensaje de error que se mostrará al usuario.
   *
   * Se actualiza dinámicamente en función de las validaciones del formulario u otras operaciones fallidas.
   */
  mensajeError: string = '';

  /** Configuración de los datos de los pasos para el asistente */
  datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length, // Número total de pasos en el asistente
    indice: this.indice, // Índice actual del paso
    txtBtnAnt: 'Anterior', // Texto del botón para retroceder
    txtBtnSig: 'Continuar', // Texto del botón para avanzar
  };

  public consultaState!: ConsultaioState;

  wizardService = inject(WizardService);

  public esFormaValido!: boolean;

  public formErrorAlert = ERROR_FORMA_ALERT;

  constructor(
      private tramiteQuery: Solicitud150102Query,
      private _solicitudSvc: SolicitudService,
      public tramiteStore: Solicitud150102Store,
      private toastrService: ToastrService,
      private consultaQuery: ConsultaioQuery,
      private servicioDeFormularioService: ServicioDeFormularioService,
  ) {}

  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      ).subscribe();
    this.tramiteQuery.seleccionarSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitud150102State = solicitud;
      });
  }

  /**
   * Genera una cadena HTML con los mensajes de validación del componente de datos anuales.
   *
   * Recorre la lista de mensajes almacenados en `mensajesDeValidacion` y construye
   * un bloque HTML para ser insertado en la interfaz, normalmente en un componente de alerta.
   *
   * @returns HTML en forma de string con los mensajes de error formateados.
   */
  generarValidacionHTML(): string {
    const SOLICITUD_COMPONENT =
      this.datosComponent?.datosDeReporteAnnualComponent;
    const ERRORES_HTML = SOLICITUD_COMPONENT.mensajesDeValidacion
      .map(
        (message, index) => `
        <div class="validation-wrapper">
          <span class="validation-index">${index + 1}.</span>
          <span class="validation-message">${message}</span>
        </div>`
      )
      .join('');
    const HTML = `
    <div class="validation-title">Corrija los siguientes errores:</div>
    ${ERRORES_HTML}
  `;
    return HTML;
  }




  getValorIndice(e: AccionBoton): void {
      if (e.valor > 0 && e.valor <= this.pantallasPasos.length) {
      const NEXT_INDEX =
        e.accion === 'cont' ? e.valor + 1 :
        e.accion === 'ant' ? e.valor - 1 :
        e.valor;
      if (!this.consultaState.readonly && e.accion === 'cont') {
        // if (!this.consultaState.update) {
        //   this.esFormaValido = this.verificarLaValidezDelFormulario();
        //   if (!this.esFormaValido) {
        //     this.indice = e.valor;
        //     this.datosPasos.indice = e.valor;
        //     this.servicioDeFormularioService.markFormAsTouched('datosGeneralisForm');
        //     this.servicioDeFormularioService.markFormAsTouched('formaModificacionesForm');
        //     this.servicioDeFormularioService.markFormAsTouched('obligacionesFiscalesForm');
        //     this.servicioDeFormularioService.markFormAsTouched('federatariosCatalogoForm');
        //     return;
        //   }
        // }
        this.shouldNavigate$()
          .subscribe((shouldNavigate) => {
            if (shouldNavigate) {
              this.indice = NEXT_INDEX;
              this.datosPasos.indice = NEXT_INDEX;
              this.wizardService.cambio_indice(NEXT_INDEX);
              this.wizardComponent.siguiente();
            } else {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
            }
          });
      } else if (e.accion === 'cont') {
        this.shouldNavigate$()
          .subscribe((shouldNavigate) => {
            if (shouldNavigate) {
              this.indice = NEXT_INDEX;
              this.datosPasos.indice = NEXT_INDEX;
              this.wizardService.cambio_indice(NEXT_INDEX);
              this.wizardComponent.siguiente();
            } else {
              this.indice = e.valor;
              this.datosPasos.indice = e.valor;
            }
          });
      } else {
        this.indice = NEXT_INDEX;
        this.datosPasos.indice = NEXT_INDEX;
        this.wizardComponent.atras();
      }
    }
}
  /**
   * @description Método que actualiza el índice del paso actual dentro del asistente.
   * Ejecuta una acción dependiendo del valor de `e.accion` ('cont' para continuar, otro para retroceder).
   *
   * @param {AccionBoton} evento Objeto que contiene la acción y el valor del índice.
   */
  // getValorIndice(evento: AccionBoton): void {
  //   if (evento.valor > 0 && evento.valor < 5) {
  //     if (this.indice === 1 && this.datosComponent.indice === 3) {
  //       const SOLICITUD_COMPONENT =
  //         this.datosComponent?.datosDeReporteAnnualComponent;
  //       this.esValido =
  //         SOLICITUD_COMPONENT?.validarTotalExportaciones() ?? false;
  //     }

  //     // if (!this.esValido) {
  //     //   this.mensajeError = this.generarValidacionHTML();
  //     //   this.datosPasos.indice = 1;
  //     //   return;
  //     // }

  //     this.indice = evento.valor;
  //     if (evento.accion === 'cont') {
  //       this.shouldNavigate$().subscribe((shouldNavigate) => {
  //         if (shouldNavigate) {
  //          // this.wizardComponent.siguiente();
  //         }
  //       });
  //     } else {
  //       this.wizardComponent.atras();
  //     }
  //   }
  // }

  public guardar():Promise<JSONResponse> {
    const SOLICITUDE = this.solicitud150102State;
    const [OBSERVACIONES, DESCRIPCION] = SOLICITUDE.idProgramaCompuesto.split(",");
    const PAYLOAD = {
      "fracciones": [
          {
              "cveFraccion": "",
              "bienesProducidos": {
                  "descripcionBienProducido": "",
                  "totalBienesProducidos": 0,
                  "volumenMercadoNacional": 0,
                  "olumenExportaciones": 0
              }
          }
      ],
      "sectores": [
          {
              "idConfProgramaSE": 0
          }
      ],
      "reporte_anual": {
          "saldo": SOLICITUDE.saldo,
          "porcentaje": SOLICITUDE.porcentajeExportacion,
          "ventasTotales": SOLICITUDE.ventasTotales,
          "totalExportaciones": SOLICITUDE.totalExportaciones,
          "totalImportaciones": SOLICITUDE.totalImportaciones,
          "totalPersonalAdmin1": 0,
          "totalPersonalAdmin2": 0,
          "totalPersonalObrero1": 0,
          "totalPersonalObrero2": 0
      },
      "observaciones": OBSERVACIONES,
      "descripcion": DESCRIPCION,
      "id_solcitud": 202846846,
      "tipoDeSolicitud": "guardar",
      "solicitante": {
          "rfc": "AAL0409235E6",
          "nombre": "Juan Pérez",
          "es_persona_moral": true,
          "certificado_serial_number": "1234"
      },
      "representacion_federal": {
          "cve_entidad_federativa": "DGO",
          "cve_unidad_administrativa": "1016"
      },
      "ide_generica_1": SOLICITUDE.inicio,
      "ide_generica_2": SOLICITUDE.fin,
      "descripcion_clob_generica_1": SOLICITUDE.modalidad,
      "descripcion_clob_generica_2": SOLICITUDE.idProgramaCompuesto
      }

      return new Promise((resolve, reject) => {
        this._solicitudSvc.guardar(PAYLOAD).pipe(
          takeUntil(this.destroyNotifier$)
        ).subscribe((response) => {
          if(esValidObject(response)) {
            const RESPONSE = doDeepCopy(response);
            this.tramiteStore.actualizarIdSolicitud(RESPONSE?.datos?.id_solicitud ?? 0);
            this.guardarIdSolicitud = RESPONSE?.datos?.id_solicitud ?? 0;
            //this.wizardComponent.siguiente();
            resolve(response);
          }
        },error=>{
          reject(error);
        });
      });
  }

   private shouldNavigate$(): Observable<boolean> {
    return of(this.solicitud150102State).pipe(
      take(1),
      switchMap(() => from(this.guardar())),
      map(response => {
        const DATOS = doDeepCopy(response);
        const OK = DATOS.codigo === '00';
        if (OK) {
          this.toastrService.success(DATOS.mensaje);
        } else {
          this.toastrService.error(DATOS.mensaje);
        }
        return OK;
      }),
      catchError((error) => {
        console.error('Error during save operation:', error);
        this.toastrService.error(error.message || 'Ocurrió un error al guardar la solicitud.');
        return of(false);
      })
    );
  }

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
