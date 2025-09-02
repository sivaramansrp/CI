/**
 * @fileoverview Componente encargado de gestionar el proceso completo de atención a un requerimiento.
 * ...
 */
import {
  AccionBoton,
  AcuseComponent,
  AnexarDocumentosComponent,
  BtnContinuarComponent,
  CATALOGOS_ID, Catalogo,
  CatalogosService,
  CategoriaMensaje,
  ConsultaioQuery,
  ConsultaioState,
  ConsultaioStore,
  DatosPasos,
  DesplazarseHaciaArribaService,
  EncabezadoRequerimientoComponent,
  FirmaElectronicaComponent,
  ListaPasosWizard,
  Notificacion,
  NotificacionesComponent,
  PASOS_REQUERIMIENTOS,
  RequerimientoInformacionComponent,
  TITULO_ACUSE,
  TXT_ALERTA_ACUSE,
  TramiteFolioQueries,
  WizardComponent,
  base64ToHex,
  encodeToISO88591Hex
} from '@ng-mf/data-access-user';
import {
  AccuseComponentes,
  ListaComponentes,
  Tabulaciones,
} from '@libs/shared/data-access-user/src/core/models/lista-trimites.model';
import { Component, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { Subject, catchError, map, of, takeUntil, tap } from 'rxjs';
import { AtenderRequerimientoService } from '../core/services/atender-requerimiento/atender-requerimiento.service';
import { CommonModule } from '@angular/common';
import { IniciarAtenderRequerimientoResponse } from '../core/models/atender-requerimiento/response/iniciar-atender-requerimiento.model';
import { LISTA_TRIMITES } from '../shared/constantes/lista-trimites.enums';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';
import { ReviewersTabsComponent } from '@libs/shared/data-access-user/src/tramites/components/reviewers-tabs/reviewers-tabs.component';
import { Router } from '@angular/router';
import { Type } from '@angular/core';

import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { CodigoRespuesta } from '../core/enum/enum-130118';
import { FirmarRequest } from '../core/models/atender-requerimiento/request/fimar-request.model';
import { FirmarResponse } from '../core/models/atender-requerimiento/response/firmar-response.model';
import { MostrarFirmaRequest } from '../core/models/atender-requerimiento/request/mostrar-firma-request.model';

/**
 * Componente principal para el proceso de requerimiento.
 *
 * Este componente gestiona el flujo del requerimiento de información,
 * incluyendo anexar documentos, firma electrónica, y generación de acuse.
 *
 * @selector proceso-requerimiento
 * @standalone Este componente es autónomo (standalone).
 * @imports Importa módulos y componentes necesarios para el proceso.
 * @providers Proveedor del servicio `AtenderRequerimientoService`.
 * @templateUrl Ruta al archivo de plantilla HTML del componente.
 * @styleUrl Ruta al archivo de estilos SCSS del componente.
 */
@Component({
  selector: 'proceso-requerimiento',
  standalone: true,
  imports: [
    CommonModule,
    ReviewersTabsComponent,
    WizardComponent,
    BtnContinuarComponent,
    AnexarDocumentosComponent,
    FirmaElectronicaComponent,
    AcuseComponent,
    forwardRef(() => EncabezadoRequerimientoComponent),
    forwardRef(() => RequerimientoInformacionComponent),
    NotificacionesComponent
  ],
  providers: [AtenderRequerimientoService],
  templateUrl: './proceso-requerimiento.component.html',
  styleUrl: './proceso-requerimiento.component.scss',
})
export class ProcesoRequerimientoComponent implements OnInit, OnDestroy {
  /**
  * Lista de pasos del wizard de requerimientos.
  */
  pasos: ListaPasosWizard[] = PASOS_REQUERIMIENTOS;

  /**
   * Índice actual del paso en el wizard.
   */
  indice: number = 1;

  /** 
   * Datos de respuesta al iniciar un requerimiento
   */
  iniciarAtenderRequerimientoData!: IniciarAtenderRequerimientoResponse;

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
   * Nueva notificación para mostrar mensajes de error o información al usuario.
   */
  nuevaNotificacion: Notificacion | null = null;

  /** Identificador de la solicitud generada tras firmar el requerimiento. */
  idSolicitud!: number;

  /**
   * Lista de trámites disponibles.
   */
  listaTrimites = LISTA_TRIMITES;

  /**
   * Trámite seleccionado.
   */
  slectTramite!: AccuseComponentes | undefined;

  /**
   * Componente dinámico a mostrar.
   */
  viewChild!: Type<unknown>;

  /**
   * Identificador del trámite actual.
   */
  tramite: number = 0;

  /**
   * Fecha del requerimiento.
   */
  fechaRequerimiento!: string;

  /**
   * Justificación del requerimiento.
   */
  justificacionRequerimiento!: string;

  /**
   * Estado actual de la consulta.
   */
  guardarDatos!: ConsultaioState;

  /**
* Cadena original generada a partir de los datos del trámite.
* Esta cadena será firmada con el certificado digital y la llave privada proporcionados.
*/
  cadenaOriginal?: string;

  /**
   * Departamento asociado al trámite.
   */
  departamento!: string;

  /**
   * Indica si el servicio de requerimiento está cargado.
   */
  esRequerimientoServiceLoaded: boolean = false;

  /**
   * Texto de alerta mostrado en el componente.
   */
  txtAlerta!: string;

  /**
   * Subtítulo mostrado en el componente.
   */
  subtitulo = TITULO_ACUSE;

  /**
   * Folio del trámite.
   */
  folio!: string;

  /**
   * URL actual.
   */
  url!: string;

  /**
   * Indica si se muestra el acuse.
   */
  esAcuse: boolean = false;

  /**
   * Catálogo de documentos disponibles.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Referencia al componente Wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Inicializa servicios y suscripciones necesarias.
   */
  constructor(
    private router: Router,
    private consultaioStore: ConsultaioStore,
    private consultaioQuery: ConsultaioQuery,
    private catalogosServices: CatalogosService,
    private tramiteQueries: TramiteFolioQueries,
    private desplazarseHaciaArribaService: DesplazarseHaciaArribaService,
    private atenderRequerimientoService: AtenderRequerimientoService,
    private location: Location,
  ) {

    /**
     * Suscripción al estado de consulta.
     * Guarda los datos actuales del estado en `guardarDatos`.
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.guardarDatos = seccionState;
        })
      )
      .subscribe();

    /**
     * Asigna valores a propiedades locales a partir de `guardarDatos`.
     * - `tramite`: ID del procedimiento.
     * - `departamento`: Nombre del departamento en minúsculas.
     */
    this.tramite = Number(this.guardarDatos?.procedureId);
    this.departamento = this.guardarDatos?.department.toLowerCase();
  }

  /**
   * Método del ciclo de vida OnInit.
   * Inicializa el componente y obtiene datos necesarios.
   */
  ngOnInit(): void {
    /**
     * Verifica si existe un trámite previamente seleccionado.
     * Si existe, se selecciona automáticamente.
     * En caso contrario, redirige al usuario a la pantalla de selección de trámite.
     */
    if (this.tramite) {
      this.selectTramite(this.tramite);
    } else {
      this.router.navigate([`/${this.departamento}/seleccion-tramite`]);
    }

    /**
     * Obtiene los tipos de documentos necesarios para el trámite actual.
     */
    this.getTiposDocumentos();

    /**
     * Obtiene la URL actual desde el router.
     * Extrae la primera sección de la URL para asignarla a la propiedad `url`.
     */
    const URL_ACTUAL = this.router.url;
    this.url = URL_ACTUAL.split('/')[1];

    /**
     * Obtiene el folio del trámite actual desde el servicio `tramiteQueries`.
     */
    this.folio = this.tramiteQueries.getTramite();
    /**
 * Genera el texto de alerta de acuse con el folio del trámite.
 */
    this.txtAlerta = TXT_ALERTA_ACUSE(this.folio);

    /**
     * Realiza un desplazamiento suave hacia la parte superior de la página usando el servicio.
     *
     * Se utiliza para mejorar la experiencia de usuario al cambiar de paso o al inicializar el componente.
     */
    this.desplazarseHaciaArribaService.desplazarArriba();

    this.iniciarAtenderRequerimiento();
  }

  /**
   * Carga dinámicamente un componente según el parámetro recibido.
   * @param li - Objeto de tipo ListaComponentes que contiene la ruta del componente a cargar.
   */
  async loadComponent(li: ListaComponentes): Promise<void> {
    if (!li.componentPath) {
      console.error('Component not found in registry:');
      return;
    }
    this.viewChild = (await li.componentPath()) as Type<unknown>;
  }

  /**
   * Cambia la pestaña activa en el wizard según el id recibido.
   * @param id - Objeto de tipo Tabulaciones que indica la pestaña a mostrar.
   */
  viewChildcambioDePestana(id: Tabulaciones): void {
    const LI = this.slectTramite?.listaComponentes.find(
      (v: ListaComponentes) => v.id === id.id
    );
    if (LI) {
      this.loadComponent(LI);
    }
  }
  /**
   * Selecciona un trámite según el identificador recibido.
   * @param i - Identificador del trámite a seleccionar.
   */
  selectTramite(i: number): void {
    this.tramite = i;
    this.slectTramite = LISTA_TRIMITES.find((v) => v.tramite === i);
  }

  /**
   * Actualiza el índice basado en el valor de la acción proporcionada y navega en el componente wizard.
   *
   * @param e - Objeto de tipo `AccionBoton` que contiene el valor y la acción a realizar.
   *   - `valor`: Número que debe estar entre 1 y 4 (inclusive).
   *   - `accion`: Cadena que indica la acción a realizar ('cont' para siguiente, cualquier otro valor para atrás).
   * @return {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e?.valor && e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (this.indice !== 2) {
        this.consultaioStore.establecerConsultaio(
          this.guardarDatos?.procedureId,
          this.guardarDatos?.parameter,
          this.guardarDatos?.department,
          this.guardarDatos?.folioTramite,
          this.guardarDatos?.tipoDeTramite,
          this.guardarDatos?.estadoDeTramite,
          true, false, false,
          this.guardarDatos?.action_id,);
      } else {
        this.consultaioStore.establecerConsultaio(
          this.guardarDatos?.procedureId,
          this.guardarDatos?.parameter,
          this.guardarDatos?.department,
          this.guardarDatos?.folioTramite,
          this.guardarDatos?.tipoDeTramite,
          this.guardarDatos?.estadoDeTramite,
          false, false, true,
          this.guardarDatos?.action_id,);
      }
      if (this.indice === 4) {
        this.mostrarFirmarAtenderRequerimiento();
      }
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }

      this.desplazarseHaciaArribaService.desplazarArriba();
    }
  }

  /**
   * Obtiene el catálogo de los tipos de documentos disponibles para el trámite.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        error: (_error): void => {
          // Manejo de errores si es necesario
        },
      });
  }

  /**
   * Recibe la firma electrónica y redirige a la página de acuse si la firma es válida.
   * @param ev - Cadena que representa la firma electrónica obtenida.
   */
  obtieneFirma(datos: {
    firma: string;
    certSerialNumber: string;
    rfc: string;
    fechaFin: string;
  }): void {
    this.datosFirmaReales = datos;
    this.firmarAtenderRequerimiento(datos.firma);
  }


  /**
   * Inicia la atención de un requerimiento específico.
   * 
   * Realiza la consulta al servicio para obtener los datos iniciales del requerimiento
   * basado en el número de folio del trámite. Maneja la respuesta mostrando notificaciones
   * de error en caso de fallas y guarda los datos recibidos en la propiedad `iniciarAtenderRequerimientoData`.
   */
  iniciarAtenderRequerimiento(): void {
    const NUMFOLIO = this.guardarDatos.folioTramite;
    this.atenderRequerimientoService.getIniciarAtenderRequerimiento(NUMFOLIO).subscribe({
      next: (response) => {
        if (response.codigo === '00') {
          this.iniciarAtenderRequerimientoData = response.datos ?? {} as IniciarAtenderRequerimientoResponse;
        } else {
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: CategoriaMensaje.ERROR,
            modo: 'action',
            titulo: '',
            mensaje: response.error || 'Error al consultar la notificacion',
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          };
          this.location.back();
        }
      },
      error: (error) => {
        const MENSAJE = error?.error?.error || 'Error inesperado al consultar notificacion.';
        this.nuevaNotificacion = {
          tipoNotificacion: 'toastr',
          categoria: 'error',
          modo: 'action',
          titulo: '',
          mensaje: MENSAJE,
          cerrar: false,
          txtBtnAceptar: '',
          txtBtnCancelar: '',
        }
      }
    });
  }

  /**
   * Muestra los datos de la firma para atender un requerimiento.
   * Realiza la llamada al servicio para obtener la información necesaria
   * y guarda la cadena original en `this.cadenaOriginal`.
   * También maneja notificaciones de éxito o error.
   */
  mostrarFirmarAtenderRequerimiento(): void {
    const PAYLOAD: MostrarFirmaRequest = {
      documentos_requeridos: []
    };

    this.atenderRequerimientoService.postFirmarMostrar(this.tramite, this.guardarDatos.folioTramite, PAYLOAD)
      .subscribe({
        next: (resp) => {
          if (resp.codigo === CodigoRespuesta.EXITO) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.EXITO,
              modo: 'action',
              titulo: 'Éxito',
              mensaje: resp.mensaje,
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
            this.cadenaOriginal = resp.datos?.cadena_original_atender_requerimiento || '';
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.nuevaNotificacion = {
              tipoNotificacion: 'toastr',
              categoria: CategoriaMensaje.ERROR,
              modo: 'action',
              titulo: resp.error || 'Error al mostrar la firma.',
              mensaje:
                resp.causa ||
                resp.mensaje ||
                'Ocurrió un error al mostrar la firma.',
              cerrar: false,
              txtBtnAceptar: '',
              txtBtnCancelar: '',
            };
          }
        },
        error: (err) => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const MENSAJE = err?.error?.error || 'Error al mostrar la firma';
          this.nuevaNotificacion = {
            tipoNotificacion: 'toastr',
            categoria: 'error',
            modo: 'action',
            titulo: '',
            mensaje: MENSAJE,
            cerrar: false,
            txtBtnAceptar: '',
            txtBtnCancelar: '',
          }
        }
      });
  }

  /**
   * Firma electrónicamente un requerimiento utilizando los datos guardados
   * y la cadena original obtenida previamente.
   * 
   * @param firma Cadena base64 de la firma generada por el usuario.
   */
  firmarAtenderRequerimiento(firma: string): void {
    if (!this.cadenaOriginal || !this.datosFirmaReales) {
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

    const PAYLOAD: FirmarRequest = {
      id_accion: this.guardarDatos.action_id,
      firma: {
        cadena_original: CADENAHEX,
        cert_serial_number: this.datosFirmaReales.certSerialNumber,
        clave_usuario: this.datosFirmaReales.rfc,
        fecha_firma: ProcesoRequerimientoComponent.formatFecha(new Date()),
        clave_rol: 'CapturistaGubernamental',
        sello: FIRMAHEX,
        fecha_fin_vigencia: ProcesoRequerimientoComponent.formatFecha(this.datosFirmaReales.fechaFin),
        documentos_requeridos: []
      },
    };

    this.atenderRequerimientoService.postFirmarAtenderRequerimiento(this.tramite, NUMFOLIO, PAYLOAD)
      .pipe(
        takeUntil(this.destroyNotifier$),
        tap((firmaResponse: BaseResponse<FirmarResponse>) => {
          if (firmaResponse.codigo !== '00') {
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
          } else if (firmaResponse.codigo === CodigoRespuesta.EXITO) {
            this.esAcuse = true;
            this.idSolicitud = firmaResponse.datos?.id_solicitud || 0;
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
   * Convierte un objeto Date o string de fecha a formato 'YYYY-MM-DD HH:mm:ss'.
   * @param fecha Fecha a formatear.
   * @returns Cadena con el formato 'YYYY-MM-DD HH:mm:ss'.
   */
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
   * Método que se ejecuta cuando el componente es destruido.
   * Este método se encarga de limpiar las suscripciones a eventos y notificar la destrucción del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    this.consultaioStore.establecerConsultaio('', '', '', '', '', '', false, true, false);
  }
}
