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

import { ConsultaioQuery, ConsultaioState, ConsultaioStore, FECHA_DE_INICIO } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { LISTA_TRIMITES } from '../shared/constantes/lista-trimites.enums';

import { AcusesResolucionResponse } from '@libs/shared/data-access-user/src/core/models/130118/consulta-acuses-response.model';
import { DictamenesResponse } from '@libs/shared/data-access-user/src/core/models/130118/dictamenes-response.model';
import { DocumentoSolicitud } from "@libs/shared/data-access-user/src/core/models/130118/consulta-documentos-response.model";
import { EnvioDigitalResponse } from '@libs/shared/data-access-user/src/core/models/130118/envio-digital-response.model';
import { EvaluarSolicitudService } from '../core/services/evaluar-tramite/evaluar-solicitud.service';
import { GuardarDictamenRequest } from '../core/models/evaluar/request/guardar-dictamen-request.model';
import { GuardarDictamenService } from '../core/services/evaluar-tramite/guardar-dictamen.service';
import { IniciarService } from '../core/services/evaluar-tramite/iniciar.service';
import { OpcionesEvaluacionRequest } from '../core/models/evaluar/request/opciones-evaluacion.model';
import { OpinionResponse } from '@libs/shared/data-access-user/src/core/models/130118/opinion-response.model';
import { RequerimientosResponse } from '@libs/shared/data-access-user/src/core/models/130118/requerimientos-response.model';
import { TabsSolicitudServiceTsService } from "../core/services/evaluar-tramite/tabs-solicitud.service.ts.service";
import { TareasSolicitud } from "@libs/shared/data-access-user/src/core/models/130118/consulta-tareas-response.model";

/**
 * @component
 * @name EvaluarComponent
 * @description Componente principal para la evaluación de trámites en la aplicación AGA.
 * 
 * Este componente permite gestionar el flujo de evaluación de un trámite, incluyendo la navegación entre pestañas,
 * la visualización y captura de requerimientos, la generación de dictámenes y la firma electrónica.
 * Utiliza servicios y stores para obtener y actualizar el estado del trámite y los requerimientos asociados.
 * 
 * @selector app-evaluar
 * @standalone true
 * @imports
 *  - CommonModule
 *  - ReviewersTabsComponent
 *  - EncabezadoRequerimientoComponent
 *  - FormsModule
 *  - ReactiveFormsModule
 *  - GenerarDictamenComponent
 *  - FirmaElectronicaComponent
 *  - CapturarRequerimientoComponent
 *  - SolicitarDocumentosEvaluacionComponent
 * @templateUrl ./evaluar.component.html
 * @styleUrl ./evaluar.component.scss
 */
@Component({
  selector: 'app-evaluar',
  standalone: true,
  imports: [CommonModule, ReviewersTabsComponent,
    EncabezadoRequerimientoComponent,
    FormsModule, ReactiveFormsModule,
    GenerarDictamenComponent,
    FirmaElectronicaComponent,
    CapturarRequerimientoComponent,
    SolicitarDocumentosEvaluacionComponent,
    SolicitarOpinionComponent
  ],
  templateUrl: './evaluar.component.html',
  styleUrl: './evaluar.component.scss',
})
export class EvaluarComponent implements OnInit, OnDestroy {
  /**
  * @property {AccuseComponentes[] } listaTrimites
  * @description Lista de trámites disponibles para evaluación, obtenida de la constante LISTA_TRIMITES.
  */
  listaTrimites = LISTA_TRIMITES;
  /**
   * @property {AccuseComponentes | undefined} slectTramite
   * @description Objeto que representa el trámite seleccionado actualmente.
   */
  slectTramite!: AccuseComponentes | undefined;
  /**
   * @property {Type<unknown>} viewChild
   * @description Referencia dinámica al componente hijo que se carga según la pestaña seleccionada.
   */
  viewChild!: Type<unknown>;
  /**
   * @property {number} tramite
   * @description Identificador del trámite seleccionado.
   */
  tramite: number = 0;
  /**
   * @property {number} indice
   * @description Índice de la pestaña principal seleccionada.
   */
  indice: number = 0;
  /**
   * @property {boolean} firmar
   * @description Indica si se debe mostrar la sección de firma electrónica.
   */
  firmar: boolean = false;
  /**
   * @property {ConsultaioState} guardarDatos
   * @description Estado actual del trámite consultado.
   */
  guardarDatos!: ConsultaioState;
  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para cancelar las suscripciones y evitar fugas de memoria al destruir el componente.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * @property {number} indiceDictamen
   * @description Índice de la pestaña de dictamen seleccionada.
   */
  indiceDictamen: number = 1;
  /**
   * @property {SolicitudRequerimientosState} requerimientoState
   * @description Estado actual de los requerimientos asociados al trámite.
   */
  public requerimientoState!: SolicitudRequerimientosState;
  /**
   * Variable para deshabilitar pestaña documento
   */
  deshabilitarSolicitarDocumentos: boolean = false;

  /**
   * @property {string[]} opcionesDisponibles
   * @description Lista de opciones disponibles para la evaluación del trámite.
   */
  opcionesDisponibles: string[] = [];

  /**
   * @property {string} conformidadDictamen
   * @description Texto que representa la conformidad del dictamen, utilizado en el formulario de generación de dictamen.
   */
  conformidadDictamen: string = '';

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

  /** Listado de opiniones registradas para el trámite. */
  opinion: OpinionResponse[] = [];

  /**
   * @property {AcusesResolucionResponse[]} acusesResolucion
   * @description Acuses de resolución asociados al trámite.
   */
  acusesResolucion!: AcusesResolucionResponse;

  /**
   * @property {EnvioDigitalResponse} envioDigital
   * @description Respuesta del envío digital asociado al trámite.
   */
  envioDigital!: EnvioDigitalResponse;

  /**
   * @property {RequerimientosResponse[]} requerimientosSolicitud
   * @description Requerimientos de solicitud.
   */
  requerimientosSolicitud: RequerimientosResponse[] = [];

  /**
   * @property {DictamenesResponse[]} dictamenesSolicitud
   * @description Dictamenes de solicitud.
   */
  dictamenesSolicitud: DictamenesResponse[] = [];

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
    private guardarService: GuardarDictamenService
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
    this.opcionesEvaluacion();
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
    const IDSOLICITUD = '202757440'
    this.tabsSolicitudServiceTsService.getDocumentosSolicitud(this.tramite, IDSOLICITUD)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.documentosSolicitud = response.datos ?? [];
          } else {
            console.error('Error en respuesta:', response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error al llamar el servicio:', error);
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
    const NUMFOLIOTRAMITE = '0402600400220214006000415'
    this.tabsSolicitudServiceTsService.getRequerimientos(this.tramite, NUMFOLIOTRAMITE)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.requerimientosSolicitud = response.datos ?? [];
          } else {
            console.error('Error en respuesta:', response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error al llamar el servicio:', error);
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
    const NUMFOLIOTRAMITE = '0201300101820161931039462'
    this.tabsSolicitudServiceTsService.getDictamenes(this.tramite, NUMFOLIOTRAMITE)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.dictamenesSolicitud = response.datos ?? [];
          } else {
            console.error('Error en respuesta:', response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error al llamar el servicio:', error);
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
    const NUMFOLIOTRAMITE = '0201100100120242540000372'
    this.tabsSolicitudServiceTsService.getTareasSolicitud(this.tramite, NUMFOLIOTRAMITE)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.tareasSolicitud = response.datos ?? [];
          } else {
            console.error('Error en respuesta:', response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error al llamar el servicio:', error);
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
    const NUMFOLIOTRAMITE = '0201200600320232336000029'
    this.tabsSolicitudServiceTsService.getOpiniones(this.tramite, NUMFOLIOTRAMITE)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.opinion = response.datos ?? [];
          } else {
            console.error('Error en respuesta:', response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error al llamar el servicio:', error);
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
    const NUMFOLIOTRAMITE = '0402600100420214006000153'
    this.tabsSolicitudServiceTsService.getAcusesResolucion(this.tramite, NUMFOLIOTRAMITE)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.acusesResolucion = response.datos ?? {} as AcusesResolucionResponse;
          } else {
            console.error('Error en respuesta:', response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error al llamar el servicio:', error);
        }
      });
  }


  /**
   * @method getEnvioDigital
   * @description Método para obtener el envío digital asociado a un trámite.
   */
  getEnvioDigital(): void {
    const NUMFOLIOTRAMITE = '0201100202220222540000013'
    this.tabsSolicitudServiceTsService.getEnvioDigital(this.tramite, NUMFOLIOTRAMITE)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.envioDigital = response.datos ?? {} as EnvioDigitalResponse;
          } else {
            console.error('Error en respuesta:', response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error al llamar el servicio:', error);
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
   * @method evaluarSolicitud
   * @description Método para enviar las opciones de evaluación del trámite 130118.
   * 
   * Envía una solicitud al servicio `EvaluarSolicitudService` con el número de folio del trámite y los datos de las opciones de evaluación.
   * Actualiza la lista de opciones disponibles si la respuesta es exitosa, o muestra un error en caso contrario.
   * 
   * @returns {void}
   */
  opcionesEvaluacion(): void {

    const FOLIOTRAMITE = '0201300101820251118000019';

    const PAYLOAD: OpcionesEvaluacionRequest = {
      cve_rol_capturista: 'ROL123',
      considera_capturista: true
    };

    this.evaluarSolicitudService.postOpcionesEvaluacion(FOLIOTRAMITE, PAYLOAD)
      .subscribe({
        next: (response) => {
          if (response.codigo === '00') {
            this.opcionesDisponibles = response.datos ?? [];
          } else {
            console.error('Error en respuesta:', response.mensaje);
          }
        },
        error: (error) => {
          console.error('Error al llamar el servicio:', error);
        }
      });
  }

  /**
   * @method tieneOpcion
   * @description Verifica si una opción específica está disponible en la lista de opciones.
   * 
   * @param {string} opcion - Opción a verificar.
   * @returns {boolean} Retorna true si la opción está disponible, false en caso contrario.
   */
  tieneOpcion(opcion: string): boolean {
    return this.opcionesDisponibles.includes(opcion);
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
   * @method seleccionaTab
   * @description Cambia la pestaña principal seleccionada.
   * @param {number} i - Índice de la pestaña.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;

    if (i === 1) {
      this.iniciarDictamen();
    }
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
    const FOLIOTRAMITE = '0201300101820251118000019';

    this.iniciarService.getIniciarDictamen(FOLIOTRAMITE).subscribe({
      next: () => {
        this.obtenerCriterios();

      },
      error: (err) => {
        console.error('Error al iniciar dictamen:', err);
      }
    });
  }

  obtenerCriterios(): void {

    const IDSOLICITUD = '202744892';

    this.guardarService.getCriterios(IDSOLICITUD).subscribe({
      next: (resp) => {
        this.conformidadDictamen = resp.datos ?? '';
      },
      error: (err) => {
        console.error('Error al obtener criterios:', err);
      }
    });
  }

  /**
   * @method seleccionaTabRequerimiento
   * @description Cambia la pestaña de dictamen seleccionada.
   * @param {number} i - Índice de la pestaña de dictamen.
   * @returns {void}
   */
  seleccionaTabRequerimiento(i: number): void {
    this.indiceDictamen = i;
  }

  /**
   * @method guardarFirmar
   * @description Activa la sección de firma electrónica.
   * @returns {void}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guardarFirmar(datosDictamen?: any): void {
    const FOLIOTRAMITE = '0201300101820251118000019';

    if (!datosDictamen) {
      console.error('No se recibieron datos del dictamen.');
      return;
    }

    const PAYLOAD: GuardarDictamenRequest = {
      ide_sentido_dictamen: datosDictamen.cumplimiento,
      justificacion_dictamen: datosDictamen.mensajeDictamen
    };

    this.guardarService.postGuadarDictamen(FOLIOTRAMITE, PAYLOAD)
      .subscribe({
        next: (resp) => {
          this.firmar = true;
        },
        error: (err) => {
          console.error('Error al guardar el dictamen', err);
          // Mostrar mensaje de error si aplica
        }
      });
  }

  /**
   * @method enviarEvento
   * @description Maneja los eventos de guardar y cancelar provenientes de componentes hijos.
   * @param {{ events: string, datos: unknown }} e - Objeto con el tipo de evento y los datos asociados.
   * @returns {void}
   */
  enviarEvento(e: { events: string, datos: unknown }): void {
    switch (e.events) {
      case 'guardar':
        this.guardarFirmar(e.datos);
        break;
      case 'cancelar':
        this.indice = 1;
        break;
      default:
    }
  }

  /**
   * @method continuar
   * @description Controla el flujo de avance entre pestañas y activa la firma si corresponde.
   * @returns {void}
   */
  continuar(): void {
    const DATOS = 3;
    if (this.indiceDictamen === 2 || Number(this.requerimientoState.idTipoRequerimiento) === DATOS) {
      this.guardarFirmar();
    } else {
      this.indiceDictamen = 2;
    }
  }
  /**
    * @method obtieneFirma
    * @description Navega a la bandeja de tareas pendientes tras obtener la firma electrónica.
    * @param {string} ev - Cadena que representa la firma obtenida.
    * @returns {void}
    */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['bandeja-de-tareas-pendientes']);
    }
  }
  /**
   * @method cancelar
   * @description Método para restablecer los índices de las pestañas principales y de dictamen.
   * 
   * Este método se utiliza para reiniciar el flujo de navegación en el componente:
   * - Establece el índice de la pestaña principal (`indice`) en 1.
   * - Establece el índice de la pestaña de dictamen (`indiceDictamen`) en 1.
   * 
   * @returns {void}
   */
  cancelar(): void {
    this.indice = 1;
    this.indiceDictamen = 1;
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
