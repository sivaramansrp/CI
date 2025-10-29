import { AVISO, ConsultaioQuery, ConsultaioState, ERROR_FORMA_ALERT, JSONResponse, WizardService, doDeepCopy } from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, WizardComponent, esValidObject, getValidDatos } from '@libs/shared/data-access-user/src';
import { Observable, Subject, map, switchMap, take, takeUntil } from 'rxjs';
import { Tramite80101State, Tramite80101Store } from '../../estados/tramite80101.store';
import { AccionBoton } from '../../models/nuevo-programa-industrial.model';
import { NuevoProgramaIndustrialService } from '../../services/nuevo-programa-industrial.service';
import { ServicioDeFormularioService } from '../../../../shared/services/forma-servicio/servicio-de-formulario.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import complimentos from '@libs/shared/theme/assets/json/shared/complimentos.json';
import empresasExtranjeras from '@libs/shared/theme/assets/json/shared/empresas-extranjeras.json';
import empresasNacionales from '@libs/shared/theme/assets/json/shared/empresas-nacionales.json';
import notarios from '@libs/shared/theme/assets/json/shared/notarios.json';
import planta from '@libs/shared/theme/assets/json/shared/planta.json';
import plantasSubmanufactureras from '@libs/shared/theme/assets/json/shared/plantas-submanufactureras.json';
import sociosAccionistas from '@libs/shared/theme/assets/json/shared/socios-accionistas.json';
/**
 * Obtiene el valor del índice de la acción del botón y actualiza el estado del componente.
 *
 * Este método se utiliza para manejar las acciones de los botones en el componente.
 * Dependiendo del valor y la acción proporcionados, actualiza el índice actual y
 * navega hacia adelante o hacia atrás en el componente Wizard.
 *
 * @param e - Un objeto de tipo `AccionBoton` que contiene dos propiedades:
 *   - `valor`: Un número que representa el índice al que se desea navegar. Debe estar entre 1 y 4.
 *   - `accion`: Una cadena que indica la acción a realizar. Puede ser:
 *     - `'cont'`: Para avanzar al siguiente paso en el Wizard.
 *     - `'atras'`: Para retroceder al paso anterior en el Wizard.
 *
 * @remarks
 * Si el valor proporcionado está fuera del rango permitido (menor que 1 o mayor que 4),
 * el método no realiza ninguna acción.
 *
 * @example
 * ```typescript
 * const accion: AccionBoton = { valor: 2, accion: 'cont' };
 * this.getValorIndice(accion); // Avanza al paso 2 en el Wizard.
 * ```
 */
@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
  providers: [ToastrService],
})
export class PasoCapturarSolicitudComponent implements OnInit, OnDestroy {

  /**
  * compo doc
  * Mensaje relacionado con el aviso de privacidad simplificado.
  * 
  * @type {string}
  * @memberof PantallasComponent
  */
    public avisoPrivacidadAlert: string = AVISO.Aviso;

  padreBtn: boolean = true;
  /**
   * Lista de pasos del wizard.
   * Esta propiedad almacena una lista de objetos que representan los pasos del wizard.
   * Cada objeto contiene información sobre el paso, como su título y descripción.
   */
  pasos: ListaPasosWizard[] = PASOS4;
  /**
   * Índice actual del paso en el wizard.
   * Este valor se utiliza para determinar qué paso se está mostrando actualmente.
   * El valor inicial es 1, lo que indica que el primer paso está activo al cargar el componente.
   */
  indice: number = 1;
 
  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;
 
  /**
   * Datos de los pasos del wizard.
   * Esta propiedad almacena información relacionada con el número de pasos, el índice actual,
   * y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Componente Wizard utilizado para la navegación entre pasos.
   * Este componente permite al usuario avanzar o retroceder entre los pasos del wizard.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
 *
 * Una cadena que representa la clase CSS para una alerta de información.
 * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
 */
  public infoAlert = 'alert-info';
 
 
 
  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();
 
  /**
   * Evento que se emite para regresar a la sección de carga de documentos.
   * Este evento se utiliza para notificar a otros componentes que se debe regresar a la sección de carga de documentos.
   */
  regresarSeccionCargarDocumentoEvento = new EventEmitter<void>();
 
  /**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;
 
  /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;
 
  cargaEnProgreso: boolean = true;
 
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();
 
  /** Indica si el botón Guardar debe mostrarse o estar habilitado en el formulario. */
  public btnGuardar: boolean = true;
 
  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';
 
  /**
   * Objeto base inmutable que representa la estructura inicial de un socio/accionista.
   */
  private complimentosBase = complimentos;
 
  /**
   * Objeto base inmutable que representa la estructura inicial de un plantas.
   */
  private plantasBase = planta;
 
  /** Listado de empresas nacionales utilizadas en el formulario de solicitud. */
  private empresasNacionales = empresasNacionales;
 
  /** Listado de empresas  extranjeras utilizadas en el formulario de solicitud. */
  private empresasExtranjeras = empresasExtranjeras;
 
  /**
   * Objeto base inmutable que representa la estructura inicial de un plantasSubmanufactureras.
   */
  private plantasSubmanufacturerasBase = plantasSubmanufactureras;
 
  /**
  * Objeto base inmutable que representa la estructura inicial de un notarios.
  */
  private notariosBase = notarios;
 
  /**
  * Objeto base inmutable que representa la estructura inicial de un sociosAccionistas.
  */
  private sociosAccionistas = sociosAccionistas;
 
  /**
  * URL de la página actual.
  */
  public solicitudState!: Tramite80101State;
  
  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  public consultaState!: ConsultaioState;
 
  /**
 * @property esFormaValido
 * @description
 * Indica si el formulario actual es válido. Se utiliza para habilitar o deshabilitar la navegación entre pasos en el wizard.
 * @type {boolean}
 * @default false
 */
  public esFormaValido!: boolean;
 
  /**
 * @property wizardService
 * @description
 * Inyección del servicio `WizardService` para gestionar la lógica y el estado del componente wizard.
 * @type {WizardService}
 */
  wizardService = inject(WizardService);
 
  /**
 * @property formErrorAlert
 * @description
 * Contiene el mensaje de alerta que se muestra cuando ocurre un error en el formulario.
 * @type {string}
 */
  public formErrorAlert = ERROR_FORMA_ALERT;
 
  /**
   * Constructor de la clase PasoCapturarSolicitudComponent.
   *
   * @param tramiteQuery - Servicio de consulta para Tramite80101 que proporciona acceso a observables y datos relacionados.
   * @param seccion - Servicio de gestión de estado para manejar la sección y la validez del formulario.
   *
   * Este constructor inicializa el componente y configura una suscripción al observable `FormaValida$` del servicio `Tramite80101Query`.
   * Cuando se emite un valor desde el observable, se actualiza el estado de la sección y la validez del formulario
   * utilizando los métodos `establecerSeccion` y `establecerFormaValida` del servicio `SeccionLibStore`.
   * La suscripción se gestiona para que se complete automáticamente al destruir el componente mediante `takeUntil` y `destroyNotifier$`.
   */
  constructor(
    private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService,
    private tramite80101Store: Tramite80101Store,
    private tramite80101Query: Tramite80101Query,
    private toastrService: ToastrService,
    private consultaQuery: ConsultaioQuery,
    private servicioDeFormularioService: ServicioDeFormularioService,
  ) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
  }
 
  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable `selectSeccionState$` para escuchar cambios en el estado de la sección,
   * actualizando la propiedad `solicitudState` con el nuevo estado recibido.
   * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`,
   * evitando fugas de memoria.
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      ).subscribe();
 
    this.tramite80101Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
  }
 
  /**
 * @method verificarLaValidezDelFormulario
 * @description
 * Este método verifica la validez de los formularios dinámicos asociados a los pasos del wizard.
 * @returns {boolean} - Indica si todos los formularios son válidos.
 */
  verificarLaValidezDelFormulario(): boolean {
    return (
      (this.servicioDeFormularioService.isFormValid('datosGeneralisForm') ??
        false) &&
      (this.servicioDeFormularioService.isFormValid('formaModificacionesForm') ??
      false) &&
      (this.servicioDeFormularioService.isFormValid('obligacionesFiscalesForm') ??
      false) &&
      (this.servicioDeFormularioService.isFormValid('federatariosCatalogoForm') ??
      false) &&
      ((this.servicioDeFormularioService.isArrayFilled('datosSocioAccionistas') ??
      false) ||
      (this.servicioDeFormularioService.isArrayFilled('datosSocioAccionistasExtrenjeros') ??
      false)) &&
      this.isAllArraysFilledIn80101(['anexoUnoTabla1', 'anexoUnoTabla2', 'federatariosDatos', 'plantasImmexDatos', 'datosTablaSubfabricantesSeleccionadas', 'anexoTresTablaLista'])
    );
  }
 
  /** Verifica que todos los arreglos indicados estén llenos en el formulario del trámite 80101. */
  isAllArraysFilledIn80101(array: string[]): boolean {
    return array.every(item => this.servicioDeFormularioService.isArrayFilled(item));
  }
 
  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e - event$: Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor <= this.pasos.length) {
      const NEXT_INDEX =
        e.accion === 'cont' ? e.valor + 1 :
        e.accion === 'ant' ? e.valor - 1 :
        e.valor;
      if (!this.consultaState.readonly && e.accion === 'cont') {
        if (!this.consultaState.update) {
          this.esFormaValido = this.verificarLaValidezDelFormulario();
          if (!this.esFormaValido) {
            this.indice = e.valor;
            this.datosPasos.indice = e.valor;
            this.servicioDeFormularioService.markFormAsTouched('datosGeneralisForm');
            this.servicioDeFormularioService.markFormAsTouched('formaModificacionesForm');
            this.servicioDeFormularioService.markFormAsTouched('obligacionesFiscalesForm');
            this.servicioDeFormularioService.markFormAsTouched('federatariosCatalogoForm');
            return;
          }
        }
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
 * Maneja la lógica para actualizar el índice del paso del wizard según el evento del botón de acción proporcionado.
 *
 * Este método obtiene el estado actual desde `nuevoProgramaIndustrialService`, lo guarda,
 * y muestra un mensaje de éxito o error dependiendo del código de respuesta. Si la respuesta es exitosa
 * y el valor del evento está dentro del rango válido (1 a 4), actualiza el índice del wizard y navega
 * hacia adelante o atrás según el tipo de acción.
 *
 * @param e - El evento del botón de acción que contiene el valor y el tipo de acción.
 */
  private shouldNavigate$(): Observable<boolean> {
    return this.nuevoProgramaIndustrialService.getAllState().pipe(
      take(1),
      switchMap(data => this.guardar(data)),
      map(response => {
        const DATOS = doDeepCopy(response);
        const OK = response.codigo === '00';
        if (OK) {
          this.toastrService.success(DATOS.mensaje);
        } else {
          this.padreBtn = true;
          this.toastrService.error(DATOS.mensaje);
        }
        return OK;
      })
    );
  }
 
  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.nuevoProgramaIndustrialService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
      });
  }
 
  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
   *
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns void
   */
  guardar(data: Tramite80101State): Promise<JSONResponse> {
    const PLANTAS = this.nuevoProgramaIndustrialService.buildPlantas(data.plantasImmexTablaLista, this.plantasBase, data);
    const PLANTAS_SUBMANUFACTURERAS = this.nuevoProgramaIndustrialService.buildPlantasSubmanufactureras(
      Array.isArray(this.plantasSubmanufacturerasBase) ? this.plantasSubmanufacturerasBase : [this.plantasSubmanufacturerasBase],
      Array.isArray(data.empressaSubFabricantePlantas?.plantasSubfabricantesAgregar) ? data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar : []
    );
    const SOLICITUD = this.nuevoProgramaIndustrialService.buildComplimentos(data as unknown as Record<string, unknown>, this.complimentosBase);
    const DECLARACION_SOLICUTUD_ENTRIES = this.nuevoProgramaIndustrialService.buildDeclaracionSolicitudEntries(data as unknown as Record<string, unknown>);
    const NOTARIOS = this.nuevoProgramaIndustrialService.buildDatosFederatarios(data.tablaDatosFederatarios, this.notariosBase);
    const ANEXO_ALL = this.nuevoProgramaIndustrialService.buildAnexo(data);
    const SOCIOS_ACCIONISTAS = this.nuevoProgramaIndustrialService.buildSociosAccionistas(
      Array.isArray(data.tablaDatosComplimentos) ? data.tablaDatosComplimentos : [],
      Array.isArray(data.tablaDatosComplimentosExtranjera) ? data.tablaDatosComplimentosExtranjera : [],
      Array.isArray(this.sociosAccionistas) ? this.sociosAccionistas[0] : this.sociosAccionistas
    );

    const PAYLOAD = {
      "esDeGuardar": true,
      "tipoDeSolicitud": "guardar",
      "idSolicitud": this.solicitudState.idSolicitud || 0,
      "idTipoTramite": 80101,
      "rfc": "AAL0409235E6",
      "cveUnidadAdministrativa": "8101",
      "costoTotal": 10000.5,
      "certificadoSerialNumber": "1234567890ABCDEF",
      "certificado": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A",
      "numeroFolioTramiteOriginal": "TRM-2023-00001",
      "nombre": "Juan",
      "apPaterno": "Pérez",
      "apMaterno": "López",
      "telefono": "5551234567",
      "discriminator_value": "80101",
      "discriminatorValue": "80101",
      "domicilio": {
      },
      "solicitante": {
 
      },
      "planta": Array.isArray(PLANTAS) ? [...PLANTAS] : [PLANTAS],
      "notarios": [...NOTARIOS],
      "anexoII": Array.isArray(ANEXO_ALL.anexo['ANEXOII']) ? [...ANEXO_ALL.anexo['ANEXOII']] : [],
      "anexoIII": Array.isArray(ANEXO_ALL.anexo['ANEXOIII']) ? [...ANEXO_ALL.anexo['ANEXOIII']] : [],
      "mercanciaImportacion": [
        {
          "listaProveedores": [
            ...(Array.isArray(ANEXO_ALL.anexo['proveedorCliente']) ? ANEXO_ALL.anexo['proveedorCliente'] : [])
          ],
          "complemento": {
            ...(typeof ANEXO_ALL.anexo['datosParaNavegar'] === 'object' && ANEXO_ALL.anexo['datosParaNavegar'] !== null ? ANEXO_ALL.anexo['datosParaNavegar'] : {})
          },
          "anexoI": Array.isArray(ANEXO_ALL.anexo['tableDos']) ? [...ANEXO_ALL.anexo['tableDos']] : []
        },
      ],
      "fraccionArancelaria": [
        {
          "listaProveedores": Array.isArray(ANEXO_ALL.anexo['proveedorClienteDos']) ? [...ANEXO_ALL.anexo['proveedorClienteDos']] : []
        }
      ],
 
      "productoExportacionDtoList": [
        {
          "proyectosImmex": Array.isArray(ANEXO_ALL.anexo['proyectoimex']) ? [...ANEXO_ALL.anexo['proyectoimex']] : []
        }
      ],
      "plantasSubmanufactureras": [...PLANTAS_SUBMANUFACTURERAS],
      "solicitud": SOLICITUD,
      "declaracionSolicitudEntities": DECLARACION_SOLICUTUD_ENTRIES,
      "sociosAccionistas": [...SOCIOS_ACCIONISTAS],
    }
    return new Promise((resolve, reject) => {
      this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
        const API_RESPONSE = doDeepCopy(response);
        if(esValidObject(API_RESPONSE) && esValidObject(API_RESPONSE.datos)) {
          if(getValidDatos(API_RESPONSE.datos.id_solicitud)) {
            this.tramite80101Store.setIdSolicitud(API_RESPONSE.datos.id_solicitud);
          } else {
            this.tramite80101Store.setIdSolicitud(0);
          }
        }
        resolve(response);
      }, error => {
        reject(error);
      });
      });
  }
 
 
 
 
  /**
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos.
   *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
   * {void} No retorna ningún valor.
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
  }
 
  /**
  * Método para manejar el evento de carga de documentos.
  * Actualiza el estado del botón de carga de archivos.
  *  carga - Indica si la carga de documentos está activa o no.
  * {void} No retorna ningún valor.
  */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
  }
 
  /**
   * Método para navegar a la siguiente sección del wizard.
   * Realiza la validación de los documentos cargados y actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  siguiente(): void {
    // Aqui se hara la validacion de los documentos cargdados
    this.wizardComponent.siguiente();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
 
  /**
   * Método para navegar a la sección anterior del wizard.
   * Actualiza el índice y el estado de los pasos.
   * {void} No retorna ningún valor.
   */
  anterior(): void {
    this.wizardComponent.atras();
    this.indice = this.wizardComponent.indiceActual + 1;
    this.datosPasos.indice = this.wizardComponent.indiceActual + 1;
  }
 
  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
  }
 
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }
 
 
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}