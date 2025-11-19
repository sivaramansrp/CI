import {
  AVISO,
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  RegistroSolicitudService,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { PASOS, TITULOMENSAJE } from '../../constants/importacion-retorno-sanitario.enum';
import { Tramite260103State, Tramite260103Store } from '../../estados/tramite260103Store.store';
import { GuardarAdapter_260103 } from '../../adapters/guardar-payload.adapter';
import { MENSAJE_DE_VALIDACION } from '../../../260212/constants/medicos-uso.enum';
import { MENSAJE_DE_VALIDACION_PAGO_DERECHOS } from '../../../260218/constants/pasos.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ToastrService } from 'ngx-toastr';
import { Tramite260103Query } from '../../estados/tramite260103Query.query';
import { WizardComponent } from '@ng-mf/data-access-user';
import { getValidDatos,esValidObject  } from '../../../../../../../../../libs/shared/data-access-user/src/core/utils/utilerias';
/**
 * @component
 * @name ContenedorDePasosComponent
 * @description
 * Este componente es un contenedor para manejar los pasos de un wizard (asistente).
 * Permite la navegación entre diferentes pasos y actualiza el título del mensaje
 * según el paso seleccionado.
 *
 * @selector app-contenedor-de-pasos
 * @standalone true
 * @imports
 * - CommonModule
 * - WizardComponent
 * - PasoUnoComponent
 * - PasoDosComponent
 * - PasoTresComponent
 * - BtnContinuarComponent
 */
@Component({
  selector: 'app-contenedor-de-pasos',
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent  implements OnInit{
    /**
     * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
     */
   public formErrorAlert!:string;
    public requiresPaymentData: boolean = false;
      public confirmarSinPagoDeDerechos: number = 0;
    /**
   * @property {boolean} isSaltar
   * @description
   * Indica si se debe saltar al paso de firma. Controla la navegación
   * directa al paso de firma en el wizard.
   * @default false - No salta por defecto
   */
  isSaltar: boolean = false;

    /**
   * Indica si la carga de archivos está en progreso.
   */
  cargaEnProgreso: boolean = true;
    /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;

    /**
 * Indica si el botón para cargar archivos está habilitado.
 */
  activarBotonCargaArchivos: boolean = false;
    /**
     * Evento que se emite para cargar archivos.
     * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
     */
    cargarArchivosEvento = new EventEmitter<void>();
  
  
    /**
     * @property {Tramite260201State} storeData
     * @description Estado de la tienda para el trámite 260201.
     */
    storeData!: Tramite260103State;
  
    /**
   * @property {string} MENSAJE_DE_ERROR
   * @description
   * Propiedad usada para almacenar el mensaje de error actual.
   * Se inicializa como cadena vacía y se actualiza en función
   * de las validaciones o errores capturados en el flujo.
   */
     MENSAJE_DE_ERROR: string = MENSAJE_DE_VALIDACION;
  
    infoError = 'alert-danger text-center';
     /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   */
  esFormaValido: boolean = false;
    /** Nueva notificación relacionada con el RFC. */
    public seleccionarFilaNotificacion!: Notificacion;
    /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public mostrarAlerta: boolean = false;
  
    /**
      * @property {PasoUnoComponent} pasoUnoComponent
      * @description
      * Referencia al componente hijo `PasoUnoComponent` mediante
      * `@ViewChild`. Permite acceder a sus métodos y propiedades
      * desde este componente padre.
    */
    @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;
  
  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';
  /**
   * @property {string | null} tituloMensaje
   * @description Título del mensaje que se muestra en el wizard.
   * Inicializado con el valor de `TITULOMENSAJE`.
   */

  tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * @property {ListaPasosWizard[]} pasos
   * @description Lista de pasos del wizard.
   * Inicializado con el valor de `PASOS`.
   */
  pasos: ListaPasosWizard[] = PASOS;

  
    TEXTOS: string = AVISO.Aviso;

  /**
   * @property {number} indice
   * @description Índice actual del paso seleccionado en el wizard.
   * Inicializado con el valor `1`.
   */
  indice: number = 1;

  /**
   * @property {WizardComponent} wizardComponent
   * @description Referencia al componente del wizard.
   * Utilizado para manejar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {DatosPasos} datosPasos
   * @description Objeto que contiene información sobre los pasos del wizard.
   * Incluye el número total de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  constructor(public registroSolicitudService: RegistroSolicitudService,private tramite260103Query: Tramite260103Query, private tramite260103Store: Tramite260103Store,
    private toastrService: ToastrService
  ){

  }
  
  ngOnInit(): void {
        this.tramite260103Query.selectTramiteState$.pipe().subscribe((data) => {
      this.storeData = data;
    });
  }
  /**
   * @method seleccionaTab
   * @description Cambia el índice actual al valor proporcionado.
   * @param {number} i - Índice del paso seleccionado.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description Actualiza el índice y el título del mensaje según la acción del botón.
   * Navega hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e - Objeto que contiene el valor del índice y la acción ('cont' o 'atras').
   */
 /**
   * @method getValorIndice
   * @description Actualiza el índice y el título del mensaje según la acción del botón.
   * Navega hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e - Objeto que contiene el valor del índice y la acción ('cont' o 'atras').
   */
  getValorIndice(e: AccionBoton): void {

    if (e.accion === 'cont') {
      let isValid = true;

      //   if (this.indice === 1 && this.pasoUnoComponent) {
      //   isValid = this.pasoUnoComponent.validarPasoUno();
      // }
      // if(!this.pasoUnoComponent.contenedorDeDatosSolicitudComponent?.validarContenedor() && this.requiresPaymentData) {
      //   this.confirmarSinPagoDeDerechos = 2;
      // }else {
      //   this.confirmarSinPagoDeDerechos = 3;
      // }
      // if(!this.requiresPaymentData) {
      //     if(!this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor()){
      //       this.mostrarAlerta=true;
      //       this.seleccionarFilaNotificacion = {
      //         tipoNotificacion: 'alert',
      //         categoria: 'danger',
      //         modo: 'action',
      //         titulo: '',
      //         mensaje: MENSAJE_DE_VALIDACION_PAGO_DERECHOS,
      //         cerrar: true,
      //         tiempoDeEspera: 2000,
      //         txtBtnAceptar: 'SI',
      //         txtBtnCancelar: 'NO',
      //         alineacionBtonoCerrar:'flex-row-reverse'
      //       }
      //       setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
      //     } else if(this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor() && !this.pasoUnoComponent.contenedorDeDatosSolicitudComponent?.validarContenedor()) {
      //       this.confirmarSinPagoDeDerechos = 2;
      //     } else if(this.pasoUnoComponent.pagoDeDerechosContenedoraComponent.validarContenedor() && this.pasoUnoComponent.contenedorDeDatosSolicitudComponent?.validarContenedor() && !this.pasoUnoComponent.tercerosRelacionadosVistaComponent.validarContenedor()) {
      //       this.confirmarSinPagoDeDerechos = 3;
      //     }
      // }
      if (!isValid) {
        this.formErrorAlert = this.MENSAJE_DE_ERROR;
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        return;
      }
      this.esFormaValido = false;
      this.postGuardarDatos(e);
    }else{
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      this.wizardComponent.atras();
    }
  }

  /**
   * @method obtenerNombreDelTítulo
   * @description Devuelve el título correspondiente al paso actual.
   * @param {number} valor - Índice del paso.
   * @returns {string} Título del paso.
   */
  obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULOMENSAJE;
      case 2:
        return this.pasos[1].titulo;
      case 3:
        return this.pasos[2].titulo;
      default:
        return TITULOMENSAJE;
    }
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
  
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
  }
    /**
   * @method blancoObligatoria
   * @description Método para manejar el evento de documentos obligatorios en blanco.
   * Actualiza la bandera `isSaltar` basada en el estado recibido.
   * @param {boolean} enBlanco - Indica si hay documentos obligatorios en blanco.
   * @return {void}
   */
  onBlancoObligatoria(enBlanco: boolean): void {
    this.isSaltar = enBlanco;
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
   * @method saltar
   * @description
   * Método para saltar directamente al paso de firma en el wizard.
   * Actualiza los índices correspondientes y ejecuta la transición
   * forward en el componente wizard.
   */
  saltar(): void {
    this.indice = 3;
    this.datosPasos.indice = 3;
    this.wizardComponent.siguiente();
  }
  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
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
 cerrarModal(value:boolean): void {
    if(value){
      this.mostrarAlerta = false;
      this.requiresPaymentData = true;
    } else {
      this.mostrarAlerta = false;
      this.confirmarSinPagoDeDerechos = 4;
    }
  }

  public static generarAlertaDeError(mensajes:string): string {
    const ALERTA = `
      <div class="d-flex justify-content-center text-center">
        <div class="col-md-12 p-3  border-danger  text-danger rounded">
          <div class="mb-2 text-secondary" >Corrija los siguientes errores:</div>

          <div class="d-flex justify-content-start mb-1">
            <span class="me-2">1.</span>
            <span class="flex-grow-1 text-center">${mensajes}</span>
          </div>  
        </div>
      </div>
      `;
      return ALERTA;
  }
    /**
     * @method obtenerNombreDelTítulo
     * @description Devuelve el título correspondiente al paso actual.
     * @param {number} valor - Índice del paso.
     * @returns {string} Título del paso.
     */
    static obtenerNombreDelTítulo(valor: number): string {
      switch (valor) {
        case 1:
          return TITULOMENSAJE;
        case 2:
          return 'Cargar archivos';
        case 3:
          return 'Firmar';
        default:
          return TITULOMENSAJE;
      }
    }
      /**
       * Método que se ejecuta después de guardar los datos.
       * Actualmente no realiza ninguna acción.
       */
      postGuardarDatos(e: AccionBoton): void {
        let PAYLOAD = GuardarAdapter_260103.toFormPayload(this.storeData);
        PAYLOAD ={
    "solicitante": {
        "rfc": "AAL0409235E6",
        "nombre": "ACEROS ALVARADO S.A. DE C.V.",
        "actividadEconomica": "Fabricación de productos de hierro y acero",
        "correoElectronico": "contacto@acerosalvarado.com",
        "domicilio": {
            "pais": "México",
            "codigoPostal": "06700",
            "estado": "Ciudad de México",
            "municipioAlcaldia": "Cuauhtémoc",
            "localidad": "Centro",
            "colonia": "Roma Norte",
            "calle": "Av. Insurgentes Sur",
            "numeroExterior": "123",
            "numeroInterior": "Piso 5, Oficina A",
            "lada": "",
            "telefono": "123456"
        }
    },
    "solicitud": {
        "discriminatorValue": 260103,
        "declaracionesSeleccionadas": true,
        "regimen": "01",
        "aduanaAIFA": "",
        "informacionConfidencial": true
    },
    "establecimiento": {
        "rfcResponsableSanitario": "XAXX010101000",
        "razonSocial": "Laboratorios Farmacéuticos del Centro S.A. de C.V.",
        "correoElectronico": "info@labcentro.com.mx",
        "domicilio": {
            "codigoPostal": "06700",
            "entidadFederativa": {
                "clave": "09"
            },
            "descripcionMunicipio": "Cuauhtémoc",
            "informacionExtra": "Centro",
            "descripcionColonia": "Roma Norte",
            "calle": "Calle Orizaba 123, Interior 4B",
            "lada": "55",
            "telefono": "55551234"
        },
        "original": "",
        "avisoFuncionamiento": true,
        "numeroLicencia": "123456",
        "aduanas": "140"
    },
    "datosSCIAN": [
        {
            "cveScian": "325412",
            "descripcion": "Fabricación de preparaciones farmacéuticas",
            "selected": true
        }
    ],
    "mercancias": [
        {
            "idMercancia": "1",
            "idClasificacionProducto": "325",
            "nombreClasificacionProducto": "Fab. sustancias químicas básicas",
            "ideSubClasificacionProducto": "32541",
            "nombreSubClasificacionProducto": "Fab. productos farmacéuticos",
            "descDenominacionEspecifica": "Medicamentos para uso humano",
            "descDenominacionDistintiva": "Paracetamol Tabletas 500mg",
            "descripcionMercancia": "Acetaminophen",
            "formaFarmaceuticaDescripcionOtros": "Tableta",
            "estadoFisicoDescripcionOtros": "Sólido",
            "fraccionArancelaria": {
                "clave": "30049099",
                "descripcion": "Los demás medicamentos constituidos por productos mezclados"
            },
            "unidadMedidaComercial": {
                "descripcion": "Pieza"
            },
            "cantidadUMCConComas": "50,000",
            "unidadMedidaTarifa": {
                "descripcion": "Kilogramo"
            },
            "cantidadUMTConComas": "1,000.00",
            "presentacion": "Frasco x 100 tabletas",
            "registroSanitarioConComas": "COFEPRIS-REG-001-2024-SSA1",
            "nombreCortoPaisOrigen": "India",
            "nombreCortoPaisProcedencia": "India",
            "tipoProductoDescripcionOtros": "Analgésico",
            "nombreCortoUsoEspecifico": "Uso humano",
            "fechaCaducidadStr": "31/12/2026"
        }
    ],
    "representanteLegal": {
        "rfc": "REPR890123ABC",
        "resultadoIDC": "",
        "nombre": "Juan Carlos",
        "apellidoPaterno": "García",
        "apellidoMaterno": "López"
    },
    "gridTerceros_TIPERS_FAB": [
        {
            "idPersonaSolicitud": "1",
            "ideTipoTercero": "TIPERS.FAB",
            "personaMoral": "1",
            "booleanExtranjero": "0",
            "booleanFisicaNoContribuyente": "0",
            "denominacion": "LABORATORIOS PISA S.A. DE C.V.",
            "razonSocial": "LABORATORIOS PISA S.A. DE C.V.",
            "rfc": "LPI950101ABC",
            "curp": "",
            "nombre": "",
            "apellidoPaterno": "",
            "apellidoMaterno": "",
            "telefono": "5555123456",
            "correoElectronico": "contacto@pisa.com.mx",
            "actividadProductiva": "MANUFACTURA",
            "actividadProductivaDesc": "Fabricación de productos farmacéuticos",
            "descripcionGiro": "Laboratorio farmacéutico",
            "numeroRegistro": "REG-001-2024",
            "domicilio": {
                "calle": "Av. Industria No. 2000",
                "numeroExterior": "2000",
                "numeroInterior": "A",
                "pais": {
                    "clave": "MEX",
                    "nombre": "México"
                },
                "colonia": {
                    "clave": "001",
                    "nombre": "Industrial"
                },
                "delegacionMunicipio": {
                    "clave": "015",
                    "nombre": "Cuauhtémoc"
                },
                "localidad": {
                    "clave": "001",
                    "nombre": "Ciudad de México"
                },
                "entidadFederativa": {
                    "clave": "09",
                    "nombre": "Ciudad de México"
                },
                "informacionExtra": "Zona Industrial Norte",
                "codigoPostal": "06400",
                "descripcionColonia": "Industrial Norte"
            },
            "idSolicitud": "12345"
        }
    ],
    "gridTerceros_TIPERS_DES": [
        {
            "idPersonaSolicitud": "1",
            "ideTipoTercero": "TIPERS.FAB",
            "personaMoral": "1",
            "booleanExtranjero": "0",
            "booleanFisicaNoContribuyente": "0",
            "denominacion": "LABORATORIOS PISA S.A. DE C.V.",
            "razonSocial": "LABORATORIOS PISA S.A. DE C.V.",
            "rfc": "LPI950101ABC",
            "curp": "",
            "nombre": "",
            "apellidoPaterno": "",
            "apellidoMaterno": "",
            "telefono": "5555123456",
            "correoElectronico": "contacto@pisa.com.mx",
            "actividadProductiva": "MANUFACTURA",
            "actividadProductivaDesc": "Fabricación de productos farmacéuticos",
            "descripcionGiro": "Laboratorio farmacéutico",
            "numeroRegistro": "REG-001-2024",
            "domicilio": {
                "calle": "Av. Industria No. 2000",
                "numeroExterior": "2000",
                "numeroInterior": "A",
                "pais": {
                    "clave": "MEX",
                    "nombre": "México"
                },
                "colonia": {
                    "clave": "001",
                    "nombre": "Industrial"
                },
                "delegacionMunicipio": {
                    "clave": "015",
                    "nombre": "Cuauhtémoc"
                },
                "localidad": {
                    "clave": "001",
                    "nombre": "Ciudad de México"
                },
                "entidadFederativa": {
                    "clave": "09",
                    "nombre": "Ciudad de México"
                },
                "informacionExtra": "Zona Industrial Norte",
                "codigoPostal": "06400",
                "descripcionColonia": "Industrial Norte"
            },
            "idSolicitud": "12345"
        }
    ],
    "pagoDeDerechos": {
        "claveDeReferencia": "REF260201001",
        "cadenaPagoDependencia": "CAD260201001",
        "banco": {
            "clave": "002",
            "descripcion": "BANCO NACIONAL DE MÉXICO, S.A."
        },
        "llaveDePago": "ABC1234567",
        "fecPago": "15/10/2025",
        "impPago": "2500.00"
    }
};
          let shouldNavigate = false;
          this.registroSolicitudService.postGuardarDatos('260103', PAYLOAD).subscribe(response => {
            shouldNavigate = response.codigo === '00';
            if (!shouldNavigate) {
              const ERROR_MESSAGE = response.error || 'Error desconocido en la solicitud';
              this.formErrorAlert = ContenedorDePasosComponent.generarAlertaDeError(ERROR_MESSAGE);
              this.esFormaValido = false;
              this.indice = 1;
              this.datosPasos.indice = 1;
              this.wizardComponent.indiceActual = 1;
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
              return;
            }
            if(shouldNavigate) {
              if(esValidObject(response) && esValidObject(response.datos)) {
                const DATOS = response.datos as { id_solicitud?: number };
                if(getValidDatos(DATOS.id_solicitud)) {
                  this.tramite260103Store.setIdSolicitud(DATOS.id_solicitud ?? 0);
                } else {
                  this.tramite260103Store.setIdSolicitud(0);
                }
              }
              // Calcular el nuevo índice basado en la acción
              let indiceActualizado = e.valor;
              if (e.accion === 'cont') {
                indiceActualizado = e.valor;
              }
              this.toastrService.success(response.mensaje);
              if (indiceActualizado > 0 && indiceActualizado < 5) {
                this.indice = indiceActualizado;
                this.datosPasos.indice = indiceActualizado;
                if (e.accion === 'cont') {
                  this.wizardComponent.siguiente();
                } else {
                  this.wizardComponent.atras();
                }
              }
            } else {
              this.toastrService.error(response.mensaje);
            }
          });
      }
}
