import { AVISO, DatosPasos, ERROR_FORMA_ALERT, JSONResponse, ListaPasosWizard, WizardComponent, esValidObject, getValidDatos } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { Tramite130112State, Tramite130112Store } from '../../estados/tramites/tramites130112.store';
import { AccionBoton } from '../../enums/accion-botton.enum';
import { ImportacionMaterialDeInvestigacionCientificaService } from '../../services/importacion-material-de-investigacion-cientifica.service';
import { PASOS_IMPORTACION } from '../../constants/importacion-material-de-investigacion-cientifica-pasos.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';
import { Tramite130112Query } from '../../estados/queries/tramite130112.query';


/**
 * Constante que representa el índice del primer paso en el proceso de wizard.
 */
const PASO_UNO = 1;

/**
 * @descripcion
 * Componente que representa la página principal del trámite de importación de material de investigación científica.
 * Este componente gestiona la lógica del asistente (wizard) para navegar entre los pasos del trámite.
 *
 * @selector app-importacion-material-de-investigacion-cientifica
 * @templateUrl ./importacion-material-de-investigacion-cientifica.component.html
 */
@Component({
  selector: 'app-importacion-material-de-investigacion-cientifica',
  templateUrl: './importacion-material-de-investigacion-cientifica.component.html',
})
export class ImportacionMaterialDeInvestigacionCientificaComponent {
     /**
   * @property {object} TEXTOS - Contiene constantes relacionadas con aviso y firma.
   * Se utiliza para manejar textos estáticos en la aplicación.
   */
    public TEXTOS = {
    AVISO,
  };
  /**
   * @descripcion
   * Lista de pasos del asistente para el trámite.
   * @type {ListaPasosWizard[]}
   */
  pasosSolicitar: ListaPasosWizard[] = PASOS_IMPORTACION;

  /**
   * Indica si el formulario actual es válido.
   */
  esFormaValido: boolean = false;

  /**
  * Notificador para destruir los observables y evitar posibles fugas de memoria.
  * @private
  * @type {Subject<void>}
  */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud 130112.
   *
   * Esta propiedad mantiene la información de la solicitud en curso y
   * se sincroniza de manera reactiva con el store correspondiente.
   * Contiene los datos necesarios para representar y manipular
   * la solicitud dentro del componente.
   *
   * @type {Tramite130112State}
   * @public
   */
  public solicitudState!: Tramite130112State;

  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Indica si el botón para cargar archivos está habilitado.
   */
  activarBotonCargaArchivos: boolean = false;

  /**
   * Indica si la sección de carga de documentos está activa.
   * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
   */
  seccionCargarDocumentos: boolean = true;

  /**
   * Indica si la carga de datos está en progreso.
   * Se utiliza para mostrar indicadores de carga o deshabilitar acciones mientras se realiza una operación asíncrona.
   */
  cargaEnProgreso: boolean = true;

  /**
   * jest.spyOnIdentificador del procedimiento actual.
   * @type {number}
   */
  idProcedimiento: number = Number(130112);

  /**
   * Referencia al componente del primer paso para validar formularios.
   */
  @ViewChild(PasoUnoComponent) pasoUno!: PasoUnoComponent;

  /**
   * @descripcion
   * Índice del paso actual en el asistente.
   * @type {number}
   */
  indice: number = 1;

  /**
   * @descripcion
   * Índice de la pestaña seleccionada actualmente.
   * @type {number}
   */
  tabIndex: number = 1;

  /**
   * @descripcion
   * Referencia al componente del asistente (wizard).
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @descripcion
   * Datos de configuración del asistente, como el número de pasos y los textos de los botones.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasosSolicitar.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Contiene el mensaje HTML de error para el campo de cambio de modalidad.
   * Se utiliza para mostrar alertas de validación al usuario.
   * @type {string}
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Constructor del componente.
   */
  constructor(
    public importacionMaterialDeInvestigacionCientificaService: ImportacionMaterialDeInvestigacionCientificaService,
    private query: Tramite130112Query,
    private store: Tramite130112Store,
    private toastr: ToastrService
  ) {
      this.query.selectSolicitud$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((solicitud) => {
          this.solicitudState = solicitud;
        });
  }

  /**
   * Método para actualizar el índice del paso actual en el asistente.
   * También navega al siguiente o al paso anterior según la acción especificada.
   *
   * Objeto de tipo `AccionBoton` que contiene:
   *  - `valor`: El nuevo índice del paso.
   *  - `accion`: La acción a realizar ('cont' para continuar o 'ant' para retroceder).
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    if (this.indice === 1 && e.accion === 'cont') {
      this.datosPasos.indice = 1;
      const ISVALID = this.pasoUno?.solicitudComponent?.validarFormulario();
      if (!ISVALID) {
        this.esFormaValido = true;
        return;
      }
      this.obtenerDatosDelStore();
    } else if (e.valor > 0 && e.valor <= this.pasosSolicitar.length) {
      this.pasoNavegarPor(e);
    }
  }

  /**
   * Navega a través de los pasos del asistente según la acción del botón.
   * @param e Objeto que contiene la acción y el valor del índice al que se desea navegar.
   */
  pasoNavegarPor(e: AccionBoton): void {
    this.indice = e.valor;
    this.datosPasos.indice = e.valor;
    if (e.valor > 0 && e.valor < 5) {
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.importacionMaterialDeInvestigacionCientificaService
      .getAllState()
      .pipe(take(1))
      .subscribe((data) => {
        this.guardar(data);
      });
  }

  guardar(item: Tramite130112State): Promise<JSONResponse> {
    const MERCANCIA = this.importacionMaterialDeInvestigacionCientificaService.getPayloadDatos(item);
    const PAYLOAD = {
      "tipoDeSolicitud": "guardar",
      "tipo_solicitud_pexim": item.defaultSelect,
      "mercancia": {
        "cantidadComercial": 12,
        "cantidadTarifaria": Number(item.cantidad),
        "valorFacturaUSD": Number(item.valorFacturaUSD),
        "condicionMercancia": item.producto,
        "descripcion": item.descripcion,
        "usoEspecifico": item.usoEspecifico,
        "justificacionImportacionExportacion": item.justificacionImportacionExportacion,
        "observaciones": item.observaciones,
        "unidadMedidaTarifaria": {
          "clave": item.unidadMedida
        },
        "fraccionArancelaria": {
          "cveFraccion": item.fraccion
        },
        "partidasMercancia": MERCANCIA,
      },
      "id_solcitud": item.idSolicitud || 0,
      "idTipoTramite":this.idProcedimiento,
      "cve_regimen": item.regimen,
      "cve_clasificacion_regimen": item.clasificacion,
      "productor": {
        "tipo_persona": true,
        "nombre": "Juan",
        "apellido_materno": "López",
        "apellido_paterno": "Norte",
        "razon_social": "Aceros Norte",
        "descripcion_ubicacion": "Calle Acero, No. 123, Col. Centro",
        "rfc": "AAL0409235E6",
        "pais": "SIN"
      },
      "solicitante": {
        "rfc": "AAL0409235E6",
        "nombre": "Juan Pérez",
        "es_persona_moral": true,
        "certificado_serial_number": "string"
      },
      "representacion_federal": {
        "cve_entidad_federativa": item.entidad,
        "cve_unidad_administrativa": "0203"
      },
      "entidades_federativas": {
        "cveEntidad": item.entidad
      },
      "lista_paises": item.fechasSeleccionadas ?? []
    };
    return new Promise((resolve, reject) => {
      this.importacionMaterialDeInvestigacionCientificaService.guardarDatosPost(PAYLOAD).subscribe(
        (response) => {
          if (esValidObject(response) && esValidObject(response['datos'])) {
            const DATOS = response['datos'] as { id_solicitud?: number };
            if (getValidDatos(DATOS.id_solicitud)) {
              this.store.setIdSolicitud(DATOS.id_solicitud ?? 0);
              this.pasoNavegarPor({ accion: 'cont', valor: 2 });
            } else {
              this.store.setIdSolicitud(0);
            }
          }
          resolve({
            id: response['id'] ?? 0,
            descripcion: response['descripcion'] ?? '',
            codigo: response['codigo'] ?? '',
            mensaje: 'Operación exitosa.',
            data: response['data'] ?? response['datos'] ?? null,
            ...response,
          } as JSONResponse);
        },
        (error) => {
          reject(error);
          this.toastr.error('Error al buscar Mercancia');
        }
      );
    });
  }

   /**
    * Emite un evento para cargar archivos.
    * {void} No retorna ningún valor.
    */
   onClickCargaArchivos(): void {
     this.cargarArchivosEvento.emit();
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
    * Método para manejar el evento de carga de documentos.
    * Actualiza el estado de la sección de carga de documentos.
    *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
    * {void} No retorna ningún valor.
    */
   cargaRealizada(cargaRealizada: boolean): void {
     this.seccionCargarDocumentos = cargaRealizada ? false : true;
   }

   /**
    * Actualiza el estado de la carga en progreso.
    *
    * @param carga - Indica si la carga está en progreso (`true`) o no (`false`).
    */
   onCargaEnProgreso(carga: boolean): void {
     this.cargaEnProgreso = carga;
   }

}