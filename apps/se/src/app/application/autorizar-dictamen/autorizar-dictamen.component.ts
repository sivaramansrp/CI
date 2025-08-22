import { AccuseComponentes, ListaComponentes, Tabulaciones } from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Component, OnDestroy, OnInit, Type } from "@angular/core";
import { CapturarRequerimientoComponent } from '@libs/shared/data-access-user/src/tramites/components/capturar-requerimiento/capturar-requerimiento.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { SolicitudRequerimientosState } from '@libs/shared/data-access-user/src/core/estados/requerimientos.store';

import { SolicitudRequerimientoQuery } from '@libs/shared/data-access-user/src/core/queries/requerimientos.query';

import { EncabezadoRequerimientoComponent } from '@libs/shared/data-access-user/src/tramites/components/encabezado-requerimiento/encabezado-requerimiento.component';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component';
import { GenerarDictamenComponent } from '@libs/shared/data-access-user/src/tramites/components/generar-dictamen/generar-dictamen.component';
import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';
import { SolicitarDocumentosEvaluacionComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitar-documentos-evaluacion/solicitar-documentos-evaluacion.component';
import { SolicitarOpinionComponent } from '@libs/shared/data-access-user/src/tramites/components/solicitar-opinion/solicitar-opinion.component';

import { CategoriaMensaje, ConsultaioQuery, ConsultaioState, ConsultaioStore, FECHA_DE_INICIO, Notificacion, NotificacionesComponent, base64ToHex, encodeToISO88591Hex } from '@ng-mf/data-access-user';
import { Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { LISTA_TRIMITES } from '../shared/constantes/lista-trimites.enums';

import { AcusesResolucionResponse } from '@libs/shared/data-access-user/src/core/models/130118/consulta-acuses-response.model';
import { DictamenesResponse } from '@libs/shared/data-access-user/src/core/models/130118/dictamenes-response.model';
import { DocumentoSolicitud } from "@libs/shared/data-access-user/src/core/models/130118/consulta-documentos-response.model";
import { EnvioDigitalResponse } from '@libs/shared/data-access-user/src/core/models/130118/envio-digital-response.model';
import { EvaluacionOpcionResponse } from '../core/models/evaluar/response/evaluar-estado-evaluacion-response.model';
import { EvaluarSolicitudService } from '../core/services/evaluar-tramite/evaluar-solicitud.service';
import { GuardarDictamenRequest } from '../core/models/evaluar/request/guardar-dictamen-request.model';
import { GuardarDictamenService } from '../core/services/evaluar-tramite/guardar-dictamen.service';
import { IniciarService } from '../core/services/evaluar-tramite/iniciar.service';
import { OpcionesEvaluacionRequest } from '../core/models/evaluar/request/opciones-evaluacion.model';
import { OpinionResponse } from '@libs/shared/data-access-user/src/core/models/130118/opinion-response.model';
import { RequerimientosResponse } from '@libs/shared/data-access-user/src/core/models/130118/requerimientos-response.model';
import { TabsSolicitudServiceTsService } from "../core/services/evaluar-tramite/tabs-solicitud.service.ts.service";
import { TareasSolicitud } from "@libs/shared/data-access-user/src/core/models/130118/consulta-tareas-response.model";


import { GuardarRequerimiento } from '../core/models/evaluar/request/guardar-requerimiento-request.model';
import { GuardarRequerimientoService } from '../core/services/evaluar-tramite/guardarRequerimiento.service';
import { IniciarDictamenResponse } from '@libs/shared/data-access-user/src/core/models/130118/iniciar-dictamen-response.model';
import { IniciarRequerimientoRequest } from '../core/models/evaluar/request/iniciar-requerimiento-request.model';
import { IniciarRequerimientoResponse } from '@libs/shared/data-access-user/src/core/models/130118/Iniciar-requerimiento-response.model';
import { MostrarFirmarRequest } from '../core/models/evaluar/request/firmar-mostrar-dictamen.request.model';
import { MostrarFirmarResponse } from '../core/models/evaluar/response/mostrar-firmar-response.model';
import { SentidosDisponiblesResponse } from '@libs/shared/data-access-user/src/core/models/130118/sentidos-disponibles.model';
import { TabsResponse } from '@libs/shared/data-access-user/src/core/models/130118/consulta-tabs-response.model';

import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { FirmarDictamenRequest } from '../core/models/evaluar/request/firmar-dictamen-request.model';
import { FirmarDictamenService } from '../core/services/evaluar-tramite/FirmarDictamen.service';

@Component({
  selector: 'app-autorizar-dictamen',
  standalone: true,
  imports: [CommonModule, ReviewersTabsComponent,
    EncabezadoRequerimientoComponent,
    FormsModule, ReactiveFormsModule,
    GenerarDictamenComponent,
    FirmaElectronicaComponent,
    NotificacionesComponent],
  templateUrl: './autorizar-dictamen.component.html',
  styleUrl: './autorizar-dictamen.component.scss',
})
export class AutorizarDictamenComponent implements OnInit, OnDestroy {
/** Datos del dictamen a generar */
  dataIniciarDictamen!: IniciarDictamenResponse;
  /**
   * @property {SolicitudRequerimientosState} requerimientoState
   * @description Estado actual de los requerimientos asociados al trámite.
   */
  public requerimientoState!: SolicitudRequerimientosState;
  /**
    * @property {AccuseComponentes | undefined} slectTramite
    * @description Objeto que representa el trámite seleccionado actualmente.
  */
  slectTramite!: AccuseComponentes | undefined;

  /**
   * @property {boolean} firmar
   * @description Indica si se debe mostrar la sección de firma electrónica.
  */
  isDictamen: boolean = true;

  /**
   * @property {boolean} firmar
   * @description Indica si se debe mostrar la sección de firma electrónica.
  */
  isFirma: boolean = false;

  /**
   * @property {boolean} firmar
   * @description Indica si se debe mostrar la sección de firma electrónica.
  */
  isAcuse: boolean = false;

  /** Nueva notificación a gestionar */
  nuevaNotificacion!: Notificacion;

  /**
     * @property {ConsultaioState} guardarDatos
     * @description Estado actual del trámite consultado.
     */
  guardarDatos!: ConsultaioState;

  /**
 * @property {number} tramite
 * @description Identificador del trámite seleccionado.
 */
  tramite: number = 0;

  /** 
   * @property {GuardarDictamenRequest} guardarDictamenRequest
   * @description Objeto que contiene los datos necesarios para guardar un dictamen.
   */
  opcionesSentidosDispobles: SentidosDisponiblesResponse[] = [];

  /**
  * @property {Subject<void>} destroyNotifier$
  * @description Subject utilizado para cancelar las suscripciones y evitar fugas de memoria al destruir el componente.
  * @private
  */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
 * Cadena original generada a partir de los datos del trámite.
 * Esta cadena será firmada con el certificado digital y la llave privada proporcionados.
 */
  cadenaOriginal?: string;

  /**
   * @property {Type<unknown>} viewChild
   * @description Referencia dinámica al componente hijo que se carga según la pestaña seleccionada.
   */
  viewChild!: Type<unknown>;

  /**
   * @property {TabsResponse} tabs
   * @description Almacena la respuesta de pestañas disponibles.
 */
  tabs!: TabsResponse;

  /**
   * @property {DocumentoSolicitud[]} documentos
   * @description Documentos de solicitud.
   */
  documentosSolicitud: DocumentoSolicitud[] = [];

  /**
   * @property {TareasSolicitud[]} tareasSolicitud
   * @description Tareas de solicitud.
   */
  tareasSolicitud: TareasSolicitud[] = [];

  /**
   * @property {DictamenesResponse[]} dictamenesSolicitud
   * @description Dictamenes de solicitud.
   */
  dictamenesSolicitud: DictamenesResponse[] = [];

  /**
   * @property {EnvioDigitalResponse} envioDigital
   * @description Respuesta del envío digital asociado al trámite.
   */
  envioDigital!: EnvioDigitalResponse;

  /** Listado de opiniones registradas para el trámite. */
  opinion: OpinionResponse[] = [];

  /**
   * @property {RequerimientosResponse[]} requerimientosSolicitud
   * @description Requerimientos de solicitud.
   */
  requerimientosSolicitud: RequerimientosResponse[] = [];

  /**
   * @property {AcusesResolucionResponse[]} acusesResolucion
   * @description Acuses de resolución asociados al trámite.
   */
  acusesResolucion!: AcusesResolucionResponse;

    /**
   * @property {boolean} yaCargoDocumentos
   * @description Indica si los documentos de la solicitud ya han sido cargados.
   */
  yaCargoDocumentos = false;

  /**
   * @property {boolean} yaCargoTareas
   * @description Indica si las tareas de la solicitud ya han sido cargadas.
   */
  yaCargoTareas = false;

  /**
   * @property {boolean} yaCargoAcuses
   * @description Indica si los acuses de resolución ya han sido cargados.
   */
  yaCargoAcuses = false;

    /**
   * @property {boolean} yaCargoDictamenes
   * @description Indica si los dictamenes ya han sido cargados.
   */
  yaCargoDictamenes = false;

  /**
   * @property {boolean} yaCaegoRequerimientos
   * @description Indica si los requerimientos ya han sido cargados.
   */
  yaCargoRequerimientos = false;

  /**
   * @property {boolean} yaCargoEnvioDigital
   * @description Indica si el envío digital ya ha sido cargado.
   */
  yaCargoEnvioDigital = false;

  /** Indica si la opinión ya ha sido cargada. */
  yaCargoOpinion = false;

  /**
   * Variable para deshabilitar pestaña documento
   */
  deshabilitarSolicitarDocumentos: boolean = false;


  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios y suscripciones necesarias para la evaluación del trámite.
   * 
   * - Se suscribe al estado de consulta del trámite mediante `ConsultaioQuery` y actualiza la propiedad `guardarDatos` cada vez que cambia el estado.
   * - Se suscribe al estado de requerimientos mediante `SolicitudRequerimientoQuery` y actualiza la propiedad `requerimientoState` cada vez que cambia el estado.
   * - Inicializa el identificador del trámite (`tramite`) a partir del estado consultado.
   * - Llama al método `solicitanteConsultaio` del store para cargar los datos iniciales del trámite, utilizando el folio, la fecha de inicio y el estado del trámite.
   * 
   * @param {Router} router - Servicio de enrutamiento de Angular para navegación.
   * @param {ConsultaioStore} consultaioStore - Store para gestionar el estado de consulta del trámite.
   * @param {ConsultaioQuery} consultaioQuery - Query para observar el estado de consulta del trámite.
   * @param {SolicitudRequerimientoQuery} solicitudRequerimientoQuery - Query para observar el estado de los requerimientos asociados al trámite.
   */
  constructor(private router: Router,
    private consultaioStore: ConsultaioStore,
    private consultaioQuery: ConsultaioQuery,
    private solicitudRequerimientoQuery: SolicitudRequerimientoQuery,
    private evaluarSolicitudService: EvaluarSolicitudService,
    private tabsSolicitudServiceTsService: TabsSolicitudServiceTsService,
    private iniciarService: IniciarService,
    private guardarService: GuardarDictamenService,
    private guardarRequerimientoService: GuardarRequerimientoService,
    private firmarDictamenService: FirmarDictamenService
  ) {

     this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.guardarDatos = seccionState;
        })
      )
      .subscribe()
    this.solicitudRequerimientoQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.requerimientoState = seccionState;
          this.deshabilitarSolicitarDocumentos = !seccionState.activarTabSolicitarDocumentos;
        })
      )
      .subscribe();
    this.tramite = Number(this.guardarDatos?.procedureId);
    this.consultaioStore.solicitanteConsultaio({
      folioDelTramite: this.guardarDatos?.folioTramite,
      fechaDeInicio: FECHA_DE_INICIO,
      estadoDelTramite: this.guardarDatos?.estadoDeTramite
    });
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Si existe un trámite seleccionado (`this.tramite`), selecciona el trámite y establece el estado de consulta
   * llamando a `establecerConsultaio` en el store con los datos actuales del trámite.
   * Si no existe un trámite seleccionado, redirige al usuario a la pantalla de selección de trámite correspondiente
   * al departamento actual.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    if (this.tramite) {
      this.selectTramite(this.tramite);
    } else {
      this.router.navigate([`/${this.guardarDatos?.department.toLowerCase()}/seleccion-tramite`]);
    }

    this.getSentidosDisponibles();
    this.getTabs();
  }

  /**
  * Objeto que contiene los datos reales de la firma electrónica generada después del proceso de firma.
  * Incluye:
  * - firma: Cadena de la firma generada (en base64).
  * - certSerialNumber: Número de serie del certificado digital.
  * - rfc: RFC extraído del certificado.
  * - fechaFin: Fecha de vencimiento del certificado.
  */
  datosFirmaReales!: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  };

  /**
    * @method obtieneFirma
    * @description Navega a la bandeja de tareas pendientes tras obtener la firma electrónica.
    * @param {string} ev - Cadena que representa la firma obtenida.
    * @returns {void}
    */
  obtieneFirma(datos: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  }): void {
    this.datosFirmaReales = datos;
    this.firmaDictamen(datos.firma);
  }

  static formatFecha(fecha: string | Date): string {
    const DATE_OBJ = new Date(fecha);
    const PAD = (n: number): string => n.toString().padStart(2, '0');

    const YYYY = DATE_OBJ.getFullYear();
    const MM = PAD(DATE_OBJ.getMonth() + 1);
    const DD = PAD(DATE_OBJ.getDate());
    const HH = PAD(DATE_OBJ.getHours());
    const MM_MINUTES = PAD(DATE_OBJ.getMinutes());
    const SS = PAD(DATE_OBJ.getSeconds());

    return `${YYYY}-${MM}-${DD} ${HH}:${MM_MINUTES}:${SS}`;
  }

  /**
   * @method getTabs
   * @description Obtiene las pestañas disponibles para el trámite
   * 
   * Realiza una petición al servicio para recuperar las pestañas habilitadas
   * para el trámite actual. Asigna las pestañas a la variable tabs si la respuesta
   * es exitosa (código '00'), o muestra un error en caso contrario.
   * 
   * @returns {void}
 */
  getTabs(): void {
    this.tabsSolicitudServiceTsService.getTabs(this.tramite, this.guardarDatos.id_solicitud)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.tabs = response.datos ?? {} as TabsResponse;
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en solicitud estado.',
              mensaje:
                response.causa ||
                response.mensaje ||
                response.error ||
                'Error en opciones solicitud estado.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: error?.error?.error || 'Error inesperado en solicitud estado.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

    /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida que se ejecuta al destruir el componente.
   * 
   * Cancela todas las suscripciones activas para evitar fugas de memoria.
   * 
   * @returns {void}
   */
  onTabSeleccionado(indice: number): void {
    if (indice === 1 && !this.yaCargoDocumentos) {
      this.yaCargoDocumentos = true;
      this.getDocumentosSolicitud();
    }

    if (indice === 6 && !this.yaCargoTareas) {
      this.yaCargoTareas = true;
      this.getTareasSolicitud();
    }

    if (indice === 2 && !this.yaCargoDictamenes) {
      this.yaCargoDictamenes = true;
      this.getDictamenes();
    }

    if (indice === 3 && !this.yaCargoRequerimientos) {
      this.yaCargoRequerimientos = true;
      this.getRequerimientos();
    }

    if (indice === 4 && !this.yaCargoOpinion) {
      this.yaCargoOpinion = true;
      this.getOpiniones();
    }

    if (indice === 7 && !this.yaCargoEnvioDigital) {
      this.yaCargoEnvioDigital = true;
      this.getEnvioDigital();
    }

    if (indice === 5 && !this.yaCargoAcuses) {
      this.yaCargoAcuses = true;
      this.getAcusesResolucion();
    }
  }

  /**
   * @method getDocumentosSolicitud
   * @description Método para obtener los documentos asociados a una solicitud.
   * 
   * Realiza una petición al servicio tabsSolicitudServiceTsService para recuperar los documentos
   * vinculados al ID de solicitud proporcionado. Asigna los documentos a la variable documentosSolicitud
   * si la respuesta es exitosa (código '00'), o muestra un error en caso contrario.
   * 
   * @returns {void}
 */
  getDocumentosSolicitud(): void {
    this.tabsSolicitudServiceTsService.getDocumentosSolicitud(this.tramite, this.guardarDatos.id_solicitud)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.documentosSolicitud = response.datos ?? [];
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en documentos.',
              mensaje:
                response.causa ||
                response.mensaje ||
                response.error ||
                'Error en documentos.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: error?.error?.error || 'Error inesperado en documentos.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

  /**
   * @method getRequerimientos
   * @description Método para obtener los requerimientos asociados a un trámite.
   *
   * Realiza una petición al servicio tabsSolicitudServiceTsService para recuperar los requerimientos
   * vinculados al número de folio proporcionado. Asigna los requerimientos a la variable requerimientosSolicitud
   * si la respuesta es exitosa (código '00'), o muestra un error en caso contrario.
   *
   * @returns {void}
   */
  getRequerimientos(): void {
    this.tabsSolicitudServiceTsService.getRequerimientos(this.tramite, this.guardarDatos.folioTramite)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.requerimientosSolicitud = response.datos ?? [];
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en requerimientos.',
              mensaje:
                response.causa ||
                response.mensaje ||
                response.error ||
                'Error en requerimientos.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: error?.error?.error || 'Error inesperado en requerimientos.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

  /**
   * @method getDictamenes
   * @description Método para obtener los dictámenes asociados a un trámite.
   *
   * Realiza una petición al servicio tabsSolicitudServiceTsService para recuperar los dictámenes
   * vinculados al número de folio proporcionado. Procesa la respuesta si es exitosa (código '00'),
   * o muestra un error en caso contrario.
   *
   * @returns {void}
   */
  getDictamenes(): void {
    this.tabsSolicitudServiceTsService.getDictamenes(this.tramite, this.guardarDatos.folioTramite)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.dictamenesSolicitud = response.datos ?? [];
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en dictamenes.',
              mensaje:
                response.causa ||
                response.mensaje ||
                response.error ||
                'Error en dictamenes.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: error?.error?.error || 'Error inesperado en dictamenes.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

  /**
   * @method TareasSolicitud
   * @description Método para obtener las tareas asociadas a una solicitud.
   * 
   * Realiza una petición al servicio tabsSolicitudServiceTsService para recuperar las tareas
   * vinculados al ID de solicitud proporcionado. Asigna las tareas a la variable tareasSolicitud
   * si la respuesta es exitosa (código '00'), o muestra un error en caso contrario.
   * 
   * @returns {void}
 */
  getTareasSolicitud(): void {
    this.tabsSolicitudServiceTsService.getTareasSolicitud(this.tramite, this.guardarDatos.folioTramite)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.tareasSolicitud = response.datos ?? [];
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en tareas.',
              mensaje:
                response.causa ||
                response.mensaje ||
                response.error ||
                'Error en tareas.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: error?.error?.error || 'Error inesperado en tareas.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

  /**
   * Obtiene las opiniones asociadas al trámite actual usando un folio predefinido.
   * Maneja la respuesta del servicio y actualiza la propiedad 'opinion' del componente.
   * En caso de error, lo registra en la consola.
   * 
   * @returns {void}
   */
  getOpiniones(): void {
    this.tabsSolicitudServiceTsService.getOpiniones(this.tramite, this.guardarDatos.folioTramite)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.opinion = response.datos ?? [];
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en opiniones.',
              mensaje:
                response.causa ||
                response.mensaje ||
                response.error ||
                'Error en opiniones.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: error?.error?.error || 'Error inesperado en opiniones.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida que se ejecuta al destruir el componente.
   * 
   * Cancela todas las suscripciones activas para evitar fugas de memoria.
   * 
   * @returns {void}
   */
  getAcusesResolucion(): void {
    this.tabsSolicitudServiceTsService.getAcusesResolucion(this.tramite, this.guardarDatos.folioTramite)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.acusesResolucion = response.datos ?? {} as AcusesResolucionResponse;
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en acuse.',
              mensaje:
                response.causa ||
                response.mensaje ||
                response.error ||
                'Error en acuse.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: error?.error?.error || 'Error inesperado en acuse.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }


  /**
   * @method getEnvioDigital
   * @description Método para obtener el envío digital asociado a un trámite.
   */
  getEnvioDigital(): void {
    this.tabsSolicitudServiceTsService.getEnvioDigital(this.tramite, this.guardarDatos.folioTramite)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.envioDigital = response.datos ?? {} as EnvioDigitalResponse;
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: response.error || 'Error en envio digital',
              mensaje:
                response.causa ||
                response.mensaje ||
                response.error ||
                'Error en envio digital.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (error) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: error?.error?.error || 'Error inesperado en envio digital.',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
        }
      });
  }

  /**
     * @method firmaDictamen
     * @description Firma el dictamen con los datos proporcionados.
     * 
     * Convierte la cadena original y la firma a formato hexadecimal, prepara el payload
     * y envía una solicitud al servicio `FirmarDictamenService` para completar la firma.
     * Maneja la respuesta y muestra notificaciones según el resultado de la operación.
     * 
     * @param {string} firma - Firma en base64 a ser procesada.
     * @returns {void}
     */
  firmaDictamen(firma: string): void {
    if (!this.cadenaOriginal || !this.datosFirmaReales) {
      console.error('Faltan datos para completar la firma');
      this.nuevaNotificacion = {
        tipoNotificacion: 'toastr',
        categoria: CategoriaMensaje.ERROR,
        modo: 'action',
        titulo: 'Error',
        mensaje: 'Faltan datos para completar la firma.',
        cerrar: false,
        txtBtnAceptar: '',
        txtBtnCancelar: '',
      };
      return;
    }

    const CADENAHEX = encodeToISO88591Hex(this.cadenaOriginal);
    const FIRMAHEX = base64ToHex(firma);
    const NUMFOLIO = this.guardarDatos.folioTramite;

    const PAYLOAD: FirmarDictamenRequest = {
      id_accion: this.guardarDatos.action_id,
      firma: {
        cadena_original: CADENAHEX,
        cert_serial_number: this.datosFirmaReales.certSerialNumber,
        clave_usuario: this.datosFirmaReales.rfc,
        fecha_firma: AutorizarDictamenComponent.formatFecha(new Date()),
        clave_rol: this.guardarDatos.current_user,
        sello: FIRMAHEX,
      }
    };

    this.firmarDictamenService.postGuadarDictamen(this.tramite, NUMFOLIO, PAYLOAD)
      .pipe(
        takeUntil(this.destroyNotifier$),
        tap((firmaResponse: BaseResponse<null>) => {
          if (firmaResponse.codigo !== '00' || !firmaResponse.datos) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: 'Error al firmar la solicitud',
              mensaje: firmaResponse.mensaje || firmaResponse.error || 'Ocurrió un error al procesar la firma.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
            throw new Error('Firma no exitosa');
          } else if (firmaResponse.codigo === '00') {
            this.router.navigate(['bandeja-de-tareas-pendientes']);
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.EXITO,
              modo: 'action',
              titulo: 'Firma exitosa',
              mensaje: 'La firma del dictamen se ha realizado correctamente.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            }
          }

        }),
        catchError((error) => {
          console.error('Error en el proceso de firma:', error);
          if (!this.nuevaNotificacion) {
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: 'Error inesperado',
              mensaje: error?.error.error || 'Ocurrió un error al procesar la firma.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
          return of(null);
        })
      )
      .subscribe();
  }

  /**
   * @method getSentidosDisponibles
   * @description Obtiene los sentidos disponibles para el dictamen del trámite 130118.
   * Realiza una petición al servicio `GuardarDictamenService` para recuperar los sentidos disponibles.
   */
  getSentidosDisponibles(): void {
    this.guardarService.getSentidosDisponibles(this.tramite.toString()).subscribe({
      next: (resp) => {
        this.opcionesSentidosDispobles = resp.datos ?? [];
      },
      error: (err) => {
        console.error('Error al obtener criterios:', err);
      }
    });
  }

  /**
   * @method iniciarDictamen
   * @description Inicia el dictamen del trámite 130118.
   * 
   * Llama al servicio `IniciarService` para iniciar el dictamen con un número de folio predefinido.
   * Muestra un mensaje en la consola si el dictamen se inicia correctamente o si ocurre un error.
   * 
   * @returns {void}
   */
  iniciarDictamen(): void {
    const PAYLOAD: IniciarRequerimientoRequest = {
      cve_usuario: this.guardarDatos.current_user,
      id_accion: this.guardarDatos.action_id
    };

    this.iniciarService.postIniciarDictamen(this.tramite, this.guardarDatos.folioTramite, PAYLOAD).subscribe({
      next: (resp) => {
        if (resp.codigo === '00') {
          this.dataIniciarDictamen = resp.datos ?? {} as IniciarDictamenResponse;
        }

      },
      error: (err) => {
        console.error('Error al iniciar dictamen:', err);
      }
    });
  }
  /**
     * @method loadComponent
     * @description Carga dinámicamente un componente hijo según la ruta especificada en el objeto recibido.
     * @param {ListaComponentes} li - Objeto que contiene la información y la ruta del componente a cargar.
     * @returns {Promise<void>}
     */
  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      return;
    }
    this.viewChild = await li.componentPath() as Type<unknown>;
  }
  /**
  * @method viewChildcambioDePestana
  * @description Cambia el componente hijo mostrado según la pestaña seleccionada.
  * @param {Tabulaciones} id - Identificador de la pestaña seleccionada.
  * @returns {void}
  */
  viewChildcambioDePestana(id: Tabulaciones): void {
    const LI = this.slectTramite?.listaComponentes.find((v: ListaComponentes) => v.id === id.id);
    if (LI) {
      this.loadComponent(LI);
    }
  }

  /**
   * @method selectTramite
   * @description Selecciona el trámite a evaluar y actualiza la referencia del trámite seleccionado.
   * @param {number} i - Identificador del trámite.
   * @returns {void}
   */
  selectTramite(i: number): void {
    this.tramite = i;
    this.slectTramite = LISTA_TRIMITES.find((v) => v.tramite === i);
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida que se ejecuta al destruir el componente.
   * 
   * Libera los recursos utilizados por el componente:
   * - Emite un valor en el `destroyNotifier$` para cancelar las suscripciones activas y evitar fugas de memoria.
   * - Completa el `destroyNotifier$`.
   * - Limpia el estado del trámite llamando a `solicitanteConsultaio` y `establecerConsultaio` en el store.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    this.consultaioStore.solicitanteConsultaio(null);
    this.consultaioStore.establecerConsultaio('', '', '', '', '', '', false, true, false);
  }
}
