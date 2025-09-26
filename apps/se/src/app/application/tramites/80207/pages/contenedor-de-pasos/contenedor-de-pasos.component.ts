import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  RegistroSolicitudService,
  SeccionLibStore,
  Usuario, 
} from '@ng-mf/data-access-user';
import { PASOS, USUARIO_INFO } from '../../constantes/pasos.enum';
import { Subject, map } from 'rxjs';
import { AVISO } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite80207State } from '../../modelos/subfabricante.model';
import { Tramites80207Queries } from '../../estados/tramite80207.query';
import { Tramites80207Store } from '../../estados/tramite80207.store';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { takeUntil } from 'rxjs/operators';

/**
 * @fileoverview Componente para la gestión del contenedor de pasos.
 * Este componente maneja la lógica y la presentación del contenedor de pasos,
 * incluyendo la inicialización, la navegación entre pasos y la gestión del estado de las secciones.
 * @module contenedorDePasos --80207
 */

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente para la gestión del contenedor de pasos.
 * @class ContenedorDePasosComponent --80207
 */

@Component({
  selector: 'app-contenedor-de-pasos',
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-pasos.component.scss',
})

/**
 * Lista de pasos del wizard.
 * @property {ListaPasosWizard[]} pasos
 */
export class ContenedorDePasosComponent implements OnInit, OnDestroy {
  /**
   * Lista de pasos del wizard.
   * @property {ListaPasosWizard[]} pasos
   */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * Índice del paso actual.
   * @property {number} indice
   */
  indice: number = 1;

  /**
   * Textos constantes utilizados en el componente.
   * @property {any} TEXTOS
   */
  TEXTOS = AVISO;

  tramiteId: string = '80207';
  /**
   * Referencia al componente del wizard.
   * @property {WizardComponent} wizardComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
 

  /**
   * Datos de los pasos del wizard.
   * @property {DatosPasos} datosPasos
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Obtiene el valor del índice del paso actual.
   * @method getValorIndice
   * @param {AccionBoton} e - Acción del botón que contiene el valor del índice.
   */

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

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

// Add this near your other property declarations
public solicitudState: Tramite80207State = {} as Tramite80207State; // or provide a proper initial state
  /**
   * Constructor de la clase ContenedorDePasosComponent.
   *
   * @param tramiteQuery - Servicio de consultas específicas para el trámite 80207.
   * @param seccion - Servicio para gestionar el estado de la sección en la librería de la aplicación.
   *
   * Este constructor inicializa el componente y configura una suscripción al observable `formaValida$`
   * del servicio `Tramites80207Queries`. Cuando se emite un nuevo valor, se actualiza el estado de la
   * sección y se establece si el formulario es válido.
   */
  constructor(
    private tramiteQuery: Tramites80207Queries,
    private seccion: SeccionLibStore,
    private registroSolicitudService: RegistroSolicitudService,
    private store: Tramites80207Store
    
  ) {
    this.tramiteQuery.formaValida$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((res) => {
        this.seccion.establecerSeccion([true]);
        this.seccion.establecerFormaValida([true]);
      });
  }

   /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
     * Suscribe al observable `selectSeccionState$` para escuchar cambios en el estado de la sección,
     * actualizando la propiedad `solicitudState` con el nuevo estado recibido.
     * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`,
     * evitando fugas de memoria.
     */
    ngOnInit(): void {
      this.tramiteQuery.selectSeccionState$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.solicitudState = seccionState;
          })
        ).subscribe();
    }

  /**
   * @method getValorIndice
   * @description Cambia el índice actual basado en el valor y la acción proporcionados por el evento `AccionBoton`.
   * Si el valor está entre 1 y 4 (inclusive), actualiza el índice y ejecuta una acción en el componente del asistente.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor y la acción a realizar.
   *                          `valor` debe ser un número entre 1 y 4, y `accion` puede ser 'cont' o cualquier otra acción.
   *
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    const PAYLOAD = {
    "tipoDeSolicitud": "guardar",
    "idSolicitud": 0,
    "idTipoTramite": 80207,
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
    "solicitud": {
        "modalidad": "",
        "booleanGenerico": true,
        "descripcionSistemasMedicion": "Web",
        "descripcionLugarEmbarque": "Localisation",
        "numeroPermiso": "SI",
        "fechaOperacion": "2025-09-19",
        "nomOficialAutorizado": "",
        "notario": {
            "nombreNotario": "JORGE",
            "apellidoMaterno": "NAVARRO",
            "apellidoPaterno": "NEAVES",
            "rfc": "AAL0409235E6",
            "numeroActa": "26117",
            "numeroNotaria": "22",
            "numeroNotario": null,
            "delegacionMunicipio": "08046",
            "entidadFederativa": "CHIH",
            "fechaActa": "2025-09-05",
            "numeroRegistro": "251473"
        }
    },
    "notarios": [
        {
            "nombreNotario": "JORGE",
            "apellidoMaterno": "NAVARRO",
            "apellidoPaterno": "NEAVES",
            "rfc": "AAL0409235E6",
            "numeroActa": "26117",
            "numeroNotaria": "22",
            "numeroNotario": null,
            "delegacionMunicipio": "08046",
            "entidadFederativa": "CHIH",
            "fechaActa": "2025-09-05",
            "numeroRegistro": "251473"
        }
    ],
    "planta": [
        {
            "razonSocial": "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
            "clavePlanta": "0",
            "claveAduana": null,
            "superficie": null,
            "ubicacionColindancias": null,
            "capacidadProduccion": null,
            "capacidadProduccionUtilizada": 0,
            "tipoLocal": null,
            "tipoEstablecimiento": null,
            "ubicacionEstablecimiento": null,
            "domicilio": 260910315,
            "empresaSolicitante": 332682,
            "rfcRecinto": null,
            "numeroLicencia": null,
            "avisoFuncionamiento": null,
            "rfcResponsableSanitario": null,
            "correoElectronico": null,
            "fecFinVigencia": "2025-09-05",
            "testado": false,
            "estadoEvaluacionEntidad": "AUTORIZADO",
            "estadoEntidad": "AUTORIZADO",
            "original": null,
            "modificado": null,
            "tipoBodega": null,
            "tipoDeposito": null,
            "marbetesPrecintos": null,
            "idSolicitudRecursiva": null,
            "idRecintoRecursiva": null,
            "claveSidefi": null,
            "nacional": null,
            "numeroMovimientoVs": null,
            "descripcionNumeroBodega": null,
            "blnActivo": null,
            "booleanAlquilado": null,
            "blnCertificada": null,
            "blnGenerico1": null,
            "capacidadMaxAlmacenamiento": null,
            "cveUnidadAdministrativa": null,
            "cveUnidadMedidaCapacidad": null,
            "cveUnidadMedidaVolumen": null,
            "descripcionCertificador": null,
            "fechaInicioVigencia": "2025-09-05",
            "idAlmacenadoraMercancia": null,
            "idPersonaSolicitud": null,
            "tipoInmueble": null,
            "idTipoRecinto": "TIREC.03",
            "rfcCertificador": null,
            "superficieEtr": null,
            "superficieMarbetes": null,
            "volumenManejoRecinto": null,
            "idRecinto": 1,
            "errorImmex": null,
            "domiciliosMontoInversion": [
                {
                    "claveTipo": "TIMI.EQ",
                    "descripcion": "EWR WERWER",
                    "cantidad": "34",
                    "monto": "54",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "domiciliosEmpleados": [
                {
                    "totalEmpleados": "45",
                    "directos": "25",
                    "cedula": "SI",
                    "fechaCedula": "2025-09-05",
                    "indirectos": "20",
                    "contrato": "435",
                    "objetoContrato": "RET ERT",
                    "fechaFirma": "2025-09-05",
                    "fechaFinVigenciaFirma": "2025-09-05",
                    "rfcEmpresa": "AAL970927390",
                    "razonEmpresa": "ALMEXA",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "domiciliosCapacidad": [
                {
                    "idServicio": 10,
                    "claveFraccion": "1_84199",
                    "unidadMedida": "pieza",
                    "descripcion": "EXPP",
                    "capacidadEfectiva": "90",
                    "turnos": "22",
                    "horasTurno": "6",
                    "cantidadEmpleados": "33",
                    "cantidadMaquinaria": "33",
                    "descripcionMaquinaria": "GSD",
                    "capacidadMensual": "3242",
                    "capacidadAnual": "2343",
                    "calculo": "48.1",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "complementoPlanta": {
                "amparoPrograma": "SI",
                "tipoDoc": "TID.CA",
                "descripcionTipoDoc": null,
                "fechaFirmaDoc": "04/09/2025",
                "fechaFinVigenciaDoc": "04/09/2025",
                "rfcFirmante": null,
                "razonFirmante": null,
                "rfcFirmanteDos": null,
                "razonFirmanteDos": null,
                "tipoDocResp": "TICCOR.CC",
                "descripcionTipoDocResp": null,
                "fechaFirmaDocResp": "04/09/2025",
                "fechaFinVigenciaDocResp": "04/09/2025",
                "rfcFirmanteResp": null,
                "razonFirmanteResp": null,
                "rfcFirmanteRespDos": null,
                "razonFirmanteRespDos": null,
                "testado": true,
                "fecFinVigencia": "2025-09-05"
            },
            "firmantes": [
                {
                    "idPersonaPersonaSolicitudR": 0,
                    "idSolicitud": 0,
                    "nombre": "AGRICOLA ALPE S DE RL DE CV",
                    "apellidoMaterno": "string",
                    "apellidoPaterno": "string",
                    "razonSocial": "TIPERS.SL",
                    "rfc": "AAL0409235E6",
                    "curp": "string",
                    "ideTipoPersonaSol": "string",
                    "correoElectronico": "vucem.soporte.aplicativo@ultrasist.com.mx",
                    "cedulaProfesional": "string",
                    "nss": "260833725",
                    "telefono": "8154563",
                    "descripcionGiro": "Siembra, cultivo y cosecha de papa",
                    "cvePaisOrigen": "str",
                    "idDireccionSol": 0,
                    "tipoPatenteAgente": "string",
                    "recif": "string",
                    "puesto": "string",
                    "tipoAgente": "string",
                    "numeroPatente": "str",
                    "numeroIdentificacionFiscal": "AAL0409235E6",
                    "personaMoral": true,
                    "extranjero": true,
                    "organismoPublico": true,
                    "cveUsuario": "string",
                    "paginaWeb": "string",
                    "ideGenerica1": "string",
                    "rfcExtranjero": "string",
                    "codAutorizacion": "stri",
                    "actividadProductiva": "string",
                    "estadoEvaluacionEntidad": "AUTORIZADO",
                    "estadoEntidad": "AUTORIZADO",
                    "original": true,
                    "modificado": true,
                    "numeroRegistro": "string",
                    "concentimientoInstalacionRecuperacion": true,
                    "cveCatalogo": "string",
                    "alquilado": true,
                    "volumenAlmacenaje": 0,
                    "capacidadAlmacenaje": 0,
                    "descripcionDetalladaActividadEconomica": "string",
                    "activo": true,
                    "generico1": true,
                    "area": "string",
                    "cveNacionalidad": "str",
                    "clasificacionArancelaria": "string",
                    "infoAdicional": true,
                    "montoImportacion": 0,
                    "montoExportacion": 0,
                    "pctParticAccionaria": 0,
                    "ampliacionModelos": true,
                    "ampliacionPaises": true,
                    "fecFallecimiento": "2025-09-05",
                    "idDomicilio": 0
                }
            ]
        }
    ],
    "capacidadProduccion": [
        {
            "unidadMedidaTarifaria": "2",
            "capacidadInstalada": "000000000000010125",
            "porccentajeUtilizado": 40,
            "descripcionUnidadMedida": "test",
            "fraccionCap": "test",
            "cveFraccion": "string"
        }
    ],
    "plantasSubmanufactureras": [
        {
            "razonSocial": "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
            "clavePlanta": "0",
            "claveAduana": null,
            "superficie": null,
            "ubicacionColindancias": null,
            "capacidadProduccion": null,
            "capacidadProduccionUtilizada": 0.0,
            "tipoLocal": null,
            "tipoEstablecimiento": null,
            "ubicacionEstablecimiento": null,
            "domicilio": 260910315,
            "empresaSolicitante": 332682,
            "rfcRecinto": null,
            "numeroLicencia": null,
            "avisoFuncionamiento": null,
            "rfcResponsableSanitario": null,
            "correoElectronico": null,
            "fecFinVigencia": "2025-09-05",
            "testado": false,
            "estadoEvaluacionEntidad": "AUTORIZADO",
            "estadoEntidad": "AUTORIZADO",
            "original": null,
            "modificado": null,
            "tipoBodega": null,
            "tipoDeposito": null,
            "marbetesPrecintos": null,
            "idSolicitudRecursiva": null,
            "idRecintoRecursiva": null,
            "claveSidefi": null,
            "nacional": null,
            "numeroMovimientoVs": null,
            "descripcionNumeroBodega": null,
            "blnActivo": null,
            "booleanAlquilado": null,
            "blnCertificada": null,
            "blnGenerico1": null,
            "capacidadMaxAlmacenamiento": null,
            "cveUnidadAdministrativa": null,
            "cveUnidadMedidaCapacidad": null,
            "cveUnidadMedidaVolumen": null,
            "descripcionCertificador": null,
            "fechaInicioVigencia": "2025-09-05",
            "idAlmacenadoraMercancia": null,
            "idPersonaSolicitud": null,
            "tipoInmueble": null,
            "idTipoRecinto": "TIREC.03",
            "rfcCertificador": null,
            "superficieEtr": null,
            "superficieMarbetes": null,
            "volumenManejoRecinto": null,
            "idRecinto": 1,
            "errorImmex": null,
            "domiciliosMontoInversion": [
                {
                    "claveTipo": "TIMI.EQ",
                    "descripcion": "EWR WERWER",
                    "cantidad": "34",
                    "monto": "54",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "domiciliosEmpleados": [
                {
                    "totalEmpleados": "45",
                    "directos": "25",
                    "cedula": "SI",
                    "fechaCedula": "2025-09-05",
                    "indirectos": "20",
                    "contrato": "435",
                    "objetoContrato": "RET ERT",
                    "fechaFirma": "2025-09-05",
                    "fechaFinVigenciaFirma": "2025-09-05",
                    "rfcEmpresa": "AAL970927390",
                    "razonEmpresa": "ALMEXA",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "domiciliosCapacidad": [
                {
                    "idServicio": 10,
                    "claveFraccion": "1_84199",
                    "unidadMedida": "pieza",
                    "descripcion": "EXPP",
                    "capacidadEfectiva": "90",
                    "turnos": "22",
                    "horasTurno": "6",
                    "cantidadEmpleados": "33",
                    "cantidadMaquinaria": "33",
                    "descripcionMaquinaria": "GSD",
                    "capacidadMensual": "3242",
                    "capacidadAnual": "2343",
                    "calculo": "48.1",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "complementoPlanta": {
                "amparoPrograma": "SI",
                "tipoDoc": "TID.CA",
                "descripcionTipoDoc": null,
                "fechaFirmaDoc": "04/09/2025",
                "fechaFinVigenciaDoc": "04/09/2025",
                "rfcFirmante": null,
                "razonFirmante": null,
                "rfcFirmanteDos": null,
                "razonFirmanteDos": null,
                "tipoDocResp": "TICCOR.CC",
                "descripcionTipoDocResp": null,
                "fechaFirmaDocResp": "04/09/2025",
                "fechaFinVigenciaDocResp": "04/09/2025",
                "rfcFirmanteResp": null,
                "razonFirmanteResp": null,
                "rfcFirmanteRespDos": null,
                "razonFirmanteRespDos": null,
                "testado": true,
                "fecFinVigencia": "2025-09-05"
            },
            "firmantes": [
                {
                    "idPersonaPersonaSolicitudR": 0,
                    "idSolicitud": 0,
                    "nombre": "AGRICOLA ALPE S DE RL DE CV",
                    "apellidoMaterno": "string",
                    "apellidoPaterno": "string",
                    "razonSocial": "TIPERS.SL",
                    "rfc": "AAL0409235E6",
                    "curp": "string",
                    "ideTipoPersonaSol": "string",
                    "correoElectronico": "vucem.soporte.aplicativo@ultrasist.com.mx",
                    "cedulaProfesional": "string",
                    "nss": "260833725",
                    "telefono": "8154563",
                    "descripcionGiro": "Siembra, cultivo y cosecha de papa",
                    "cvePaisOrigen": "str",
                    "idDireccionSol": 0,
                    "tipoPatenteAgente": "string",
                    "recif": "string",
                    "puesto": "string",
                    "tipoAgente": "string",
                    "numeroPatente": "str",
                    "numeroIdentificacionFiscal": "AAL0409235E6",
                    "personaMoral": true,
                    "extranjero": true,
                    "organismoPublico": true,
                    "cveUsuario": "string",
                    "paginaWeb": "string",
                    "ideGenerica1": "string",
                    "rfcExtranjero": "string",
                    "codAutorizacion": "stri",
                    "actividadProductiva": "string",
                    "estadoEvaluacionEntidad": "AUTORIZADO",
                    "estadoEntidad": "AUTORIZADO",
                    "original": true,
                    "modificado": true,
                    "numeroRegistro": "string",
                    "concentimientoInstalacionRecuperacion": true,
                    "cveCatalogo": "string",
                    "alquilado": true,
                    "volumenAlmacenaje": 0,
                    "capacidadAlmacenaje": 0,
                    "descripcionDetalladaActividadEconomica": "string",
                    "activo": true,
                    "generico1": true,
                    "area": "string",
                    "cveNacionalidad": "str",
                    "clasificacionArancelaria": "string",
                    "infoAdicional": true,
                    "montoImportacion": 0,
                    "montoExportacion": 0,
                    "pctParticAccionaria": 0,
                    "ampliacionModelos": true,
                    "ampliacionPaises": true,
                    "fecFallecimiento": "2025-09-05",
                    "idDomicilio": 0
                }
            ]
        }
    ],
    "plantasControladoras": [
        {
            "razonSocial": "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
            "clavePlanta": "0",
            "claveAduana": null,
            "superficie": null,
            "ubicacionColindancias": null,
            "capacidadProduccion": null,
            "capacidadProduccionUtilizada": 0.0,
            "tipoLocal": null,
            "tipoEstablecimiento": null,
            "ubicacionEstablecimiento": null,
            "domicilio": 260910315,
            "empresaSolicitante": 332682,
            "rfcRecinto": null,
            "numeroLicencia": null,
            "avisoFuncionamiento": null,
            "rfcResponsableSanitario": null,
            "correoElectronico": null,
            "fecFinVigencia": "2025-09-05",
            "testado": false,
            "estadoEvaluacionEntidad": "AUTORIZADO",
            "estadoEntidad": "AUTORIZADO",
            "original": null,
            "modificado": null,
            "tipoBodega": null,
            "tipoDeposito": null,
            "marbetesPrecintos": null,
            "idSolicitudRecursiva": null,
            "idRecintoRecursiva": null,
            "claveSidefi": null,
            "nacional": null,
            "numeroMovimientoVs": null,
            "descripcionNumeroBodega": null,
            "blnActivo": null,
            "booleanAlquilado": null,
            "blnCertificada": null,
            "blnGenerico1": null,
            "capacidadMaxAlmacenamiento": null,
            "cveUnidadAdministrativa": null,
            "cveUnidadMedidaCapacidad": null,
            "cveUnidadMedidaVolumen": null,
            "descripcionCertificador": null,
            "fechaInicioVigencia": "2025-09-05",
            "idAlmacenadoraMercancia": null,
            "idPersonaSolicitud": null,
            "tipoInmueble": null,
            "idTipoRecinto": "TIREC.03",
            "rfcCertificador": null,
            "superficieEtr": null,
            "superficieMarbetes": null,
            "volumenManejoRecinto": null,
            "idRecinto": 1,
            "errorImmex": null,
            "domiciliosMontoInversion": [
                {
                    "claveTipo": "TIMI.EQ",
                    "descripcion": "EWR WERWER",
                    "cantidad": "34",
                    "monto": "54",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "domiciliosEmpleados": [
                {
                    "totalEmpleados": "45",
                    "directos": "25",
                    "cedula": "SI",
                    "fechaCedula": "2025-09-05",
                    "indirectos": "20",
                    "contrato": "435",
                    "objetoContrato": "RET ERT",
                    "fechaFirma": "2025-09-05",
                    "fechaFinVigenciaFirma": "2025-09-05",
                    "rfcEmpresa": "AAL970927390",
                    "razonEmpresa": "ALMEXA",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "domiciliosCapacidad": [
                {
                    "idServicio": 10,
                    "claveFraccion": "1_84199",
                    "unidadMedida": "pieza",
                    "descripcion": "EXPP",
                    "capacidadEfectiva": "90",
                    "turnos": "22",
                    "horasTurno": "6",
                    "cantidadEmpleados": "33",
                    "cantidadMaquinaria": "33",
                    "descripcionMaquinaria": "GSD",
                    "capacidadMensual": "3242",
                    "capacidadAnual": "2343",
                    "calculo": "48.1",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "complementoPlanta": {
                "amparoPrograma": "SI",
                "tipoDoc": "TID.CA",
                "descripcionTipoDoc": null,
                "fechaFirmaDoc": "04/09/2025",
                "fechaFinVigenciaDoc": "04/09/2025",
                "rfcFirmante": null,
                "razonFirmante": null,
                "rfcFirmanteDos": null,
                "razonFirmanteDos": null,
                "tipoDocResp": "TICCOR.CC",
                "descripcionTipoDocResp": null,
                "fechaFirmaDocResp": "04/09/2025",
                "fechaFinVigenciaDocResp": "04/09/2025",
                "rfcFirmanteResp": null,
                "razonFirmanteResp": null,
                "rfcFirmanteRespDos": null,
                "razonFirmanteRespDos": null,
                "testado": true,
                "fecFinVigencia": "2025-09-05"
            },
            "firmantes": [
                {
                    "idPersonaPersonaSolicitudR": 0,
                    "idSolicitud": 0,
                    "nombre": "AGRICOLA ALPE S DE RL DE CV",
                    "apellidoMaterno": "string",
                    "apellidoPaterno": "string",
                    "razonSocial": "TIPERS.SL",
                    "rfc": "AAL0409235E6",
                    "curp": "string",
                    "ideTipoPersonaSol": "string",
                    "correoElectronico": "vucem.soporte.aplicativo@ultrasist.com.mx",
                    "cedulaProfesional": "string",
                    "nss": "260833725",
                    "telefono": "8154563",
                    "descripcionGiro": "Siembra, cultivo y cosecha de papa",
                    "cvePaisOrigen": "str",
                    "idDireccionSol": 0,
                    "tipoPatenteAgente": "string",
                    "recif": "string",
                    "puesto": "string",
                    "tipoAgente": "string",
                    "numeroPatente": "str",
                    "numeroIdentificacionFiscal": "AAL0409235E6",
                    "personaMoral": true,
                    "extranjero": true,
                    "organismoPublico": true,
                    "cveUsuario": "string",
                    "paginaWeb": "string",
                    "ideGenerica1": "string",
                    "rfcExtranjero": "string",
                    "codAutorizacion": "stri",
                    "actividadProductiva": "string",
                    "estadoEvaluacionEntidad": "AUTORIZADO",
                    "estadoEntidad": "AUTORIZADO",
                    "original": true,
                    "modificado": true,
                    "numeroRegistro": "string",
                    "concentimientoInstalacionRecuperacion": true,
                    "cveCatalogo": "string",
                    "alquilado": true,
                    "volumenAlmacenaje": 0,
                    "capacidadAlmacenaje": 0,
                    "descripcionDetalladaActividadEconomica": "string",
                    "activo": true,
                    "generico1": true,
                    "area": "string",
                    "cveNacionalidad": "str",
                    "clasificacionArancelaria": "string",
                    "infoAdicional": true,
                    "montoImportacion": 0,
                    "montoExportacion": 0,
                    "pctParticAccionaria": 0,
                    "ampliacionModelos": true,
                    "ampliacionPaises": true,
                    "fecFallecimiento": "2025-09-05",
                    "idDomicilio": 0
                }
            ]
        }
    ],
    "plantasTerciarizadoras": [
        {
            "razonSocial": "INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV",
            "clavePlanta": "0",
            "claveAduana": null,
            "superficie": null,
            "ubicacionColindancias": null,
            "capacidadProduccion": null,
            "capacidadProduccionUtilizada": 0.0,
            "tipoLocal": null,
            "tipoEstablecimiento": null,
            "ubicacionEstablecimiento": null,
            "domicilio": 260910315,
            "empresaSolicitante": 332682,
            "rfcRecinto": null,
            "numeroLicencia": null,
            "avisoFuncionamiento": null,
            "rfcResponsableSanitario": null,
            "correoElectronico": null,
            "fecFinVigencia": "2025-09-05",
            "testado": false,
            "estadoEvaluacionEntidad": "AUTORIZADO",
            "estadoEntidad": "AUTORIZADO",
            "original": null,
            "modificado": null,
            "tipoBodega": null,
            "tipoDeposito": null,
            "marbetesPrecintos": null,
            "idSolicitudRecursiva": null,
            "idRecintoRecursiva": null,
            "claveSidefi": null,
            "nacional": null,
            "numeroMovimientoVs": null,
            "descripcionNumeroBodega": null,
            "blnActivo": null,
            "booleanAlquilado": null,
            "blnCertificada": null,
            "blnGenerico1": null,
            "capacidadMaxAlmacenamiento": null,
            "cveUnidadAdministrativa": null,
            "cveUnidadMedidaCapacidad": null,
            "cveUnidadMedidaVolumen": null,
            "descripcionCertificador": null,
            "fechaInicioVigencia": "2025-09-05",
            "idAlmacenadoraMercancia": null,
            "idPersonaSolicitud": null,
            "tipoInmueble": null,
            "idTipoRecinto": "TIREC.03",
            "rfcCertificador": null,
            "superficieEtr": null,
            "superficieMarbetes": null,
            "volumenManejoRecinto": null,
            "idRecinto": 1,
            "errorImmex": null,
            "domiciliosMontoInversion": [
                {
                    "claveTipo": "TIMI.EQ",
                    "descripcion": "EWR WERWER",
                    "cantidad": "34",
                    "monto": "54",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "domiciliosEmpleados": [
                {
                    "totalEmpleados": "45",
                    "directos": "25",
                    "cedula": "SI",
                    "fechaCedula": "2025-09-05",
                    "indirectos": "20",
                    "contrato": "435",
                    "objetoContrato": "RET ERT",
                    "fechaFirma": "2025-09-05",
                    "fechaFinVigenciaFirma": "2025-09-05",
                    "rfcEmpresa": "AAL970927390",
                    "razonEmpresa": "ALMEXA",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "domiciliosCapacidad": [
                {
                    "idServicio": 10,
                    "claveFraccion": "1_84199",
                    "unidadMedida": "pieza",
                    "descripcion": "EXPP",
                    "capacidadEfectiva": "90",
                    "turnos": "22",
                    "horasTurno": "6",
                    "cantidadEmpleados": "33",
                    "cantidadMaquinaria": "33",
                    "descripcionMaquinaria": "GSD",
                    "capacidadMensual": "3242",
                    "capacidadAnual": "2343",
                    "calculo": "48.1",
                    "testado": true,
                    "fecFinVigencia": "2025-09-05"
                }
            ],
            "complementoPlanta": {
                "amparoPrograma": "SI",
                "tipoDoc": "TID.CA",
                "descripcionTipoDoc": null,
                "fechaFirmaDoc": "04/09/2025",
                "fechaFinVigenciaDoc": "04/09/2025",
                "rfcFirmante": null,
                "razonFirmante": null,
                "rfcFirmanteDos": null,
                "razonFirmanteDos": null,
                "tipoDocResp": "TICCOR.CC",
                "descripcionTipoDocResp": null,
                "fechaFirmaDocResp": "04/09/2025",
                "fechaFinVigenciaDocResp": "04/09/2025",
                "rfcFirmanteResp": null,
                "razonFirmanteResp": null,
                "rfcFirmanteRespDos": null,
                "razonFirmanteRespDos": null,
                "testado": true,
                "fecFinVigencia": "2025-09-05"
            },
            "firmantes": [
                {
                    "idPersonaPersonaSolicitudR": 0,
                    "idSolicitud": 0,
                    "nombre": "AGRICOLA ALPE S DE RL DE CV",
                    "apellidoMaterno": "string",
                    "apellidoPaterno": "string",
                    "razonSocial": "TIPERS.SL",
                    "rfc": "AAL0409235E6",
                    "curp": "string",
                    "ideTipoPersonaSol": "string",
                    "correoElectronico": "vucem.soporte.aplicativo@ultrasist.com.mx",
                    "cedulaProfesional": "string",
                    "nss": "260833725",
                    "telefono": "8154563",
                    "descripcionGiro": "Siembra, cultivo y cosecha de papa",
                    "cvePaisOrigen": "str",
                    "idDireccionSol": 0,
                    "tipoPatenteAgente": "string",
                    "recif": "string",
                    "puesto": "string",
                    "tipoAgente": "string",
                    "numeroPatente": "str",
                    "numeroIdentificacionFiscal": "AAL0409235E6",
                    "personaMoral": true,
                    "extranjero": true,
                    "organismoPublico": true,
                    "cveUsuario": "string",
                    "paginaWeb": "string",
                    "ideGenerica1": "string",
                    "rfcExtranjero": "string",
                    "codAutorizacion": "stri",
                    "actividadProductiva": "string",
                    "estadoEvaluacionEntidad": "AUTORIZADO",
                    "estadoEntidad": "AUTORIZADO",
                    "original": true,
                    "modificado": true,
                    "numeroRegistro": "string",
                    "concentimientoInstalacionRecuperacion": true,
                    "cveCatalogo": "string",
                    "alquilado": true,
                    "volumenAlmacenaje": 0,
                    "capacidadAlmacenaje": 0,
                    "descripcionDetalladaActividadEconomica": "string",
                    "activo": true,
                    "generico1": true,
                    "area": "string",
                    "cveNacionalidad": "str",
                    "clasificacionArancelaria": "string",
                    "infoAdicional": true,
                    "montoImportacion": 0,
                    "montoExportacion": 0,
                    "pctParticAccionaria": 0,
                    "ampliacionModelos": true,
                    "ampliacionPaises": true,
                    "fecFallecimiento": "2025-09-05",
                    "idDomicilio": 0
                }
            ]
        }
    ],
    "productoExportacionDtoList": [
        {
            "testado": true,
            "claveServicioImmex": null,
            "tipoFraccion": "TIPD.EX",
            "visible": true,
            "fraccionPadre": null,
            "replica": true,
            "activo": true,
            "idProductoExp": null,
            "complemento": {
                "anexoII": "NO SENSIBLE",
                "tipo": "EXPORTACION",
                "unidadMedida": "Kilogramo",
                "categoria": "TICAT.MP",
                "descripcion": "DEJ JLFKDSFDSFSDF",
                "valorMensual": "12",
                "valorAnual": "432",
                "volumenMensual": "5435",
                "volumenAnual": "534",
                "testado": true,
                "fecFinVigencia": "2025-09-07",
                "volumenAnualSolicitado": null
            },
            "fraccionCompuesta": null,
            "cveServicioImmex": {
                "claveServicio": null,
                "nombre": "ABASTECIMIENTO, ALMACENAJE O DISTRIBUCION DE MERCANCIAS",
                "tipoServicio": "TISIMMEX.TN",
                "blnActivo": true,
                "fechaInicioVigencia": "2025-09-07",
                "fechaFinVigencia": "2025-09-07"
            },
            "cveSector": null,
            "idSectorProsecSol": 0,
            "blnFraccionSeleccionada": 0,
            "descripcionTestado": null,
            "proyectosImmex": [
                {
                    "tipoDocumento": "TIDPI.CM",
                    "descripcion": null,
                    "fechaFirma": "04/09/2025",
                    "fechaVigencia": "04/09/2025",
                    "rfcFirmante": "AAL0409235E6",
                    "razonFirmante": "SILVA",
                    "testado": true,
                    "fecFinVigencia": "2025-09-07"
                }
            ],
            "proyectosClientes": [
                {
                    "paisOrigen": "AUSTIRA",
                    "rfcProveedor": "WERWSV",
                    "razonProveedor": "WER QWER QW",
                    "paisDestino": "ANTARTIDA",
                    "rfcClient": "AAL0409235E6",
                    "razonCliente": "CLICNTE UNO ",
                    "domicilioCliente": null,
                    "testado": true,
                    "fecFinVigencia": "2025-09-07"
                }
            ],
            "fraccionArancelaria": {
                "fraccionPadre": "string",
                "descripcionFraccionPadre": "string",
                "tipoFraccion": "string",
                "exenta": true,
                "fraccionCompuesta": "string",
                "claveFraccionPadre": "string",
                "unidadMedida": "string",
                "fraccionConcatenada": "string",
                "descripcionTestado": "string",
                "testado": true,
                "tipoOperacion": "string",
                "valorMonedaMensual": "string",
                "valorMonedaAnual": "string",
                "valorProduccionMensual": "string",
                "valorProduccionAnual": "string",
                "valorProduccionAnualSolicitada": "string",
                "claveCategoria": "string",
                "descripcionCategoria": "string",
                "mensaje": "string",
                "descripcionUsuario": "string",
                "umt": "string",
                "idFraccion": "string",
                "idProducto": "string",
                "idProductoPadre": "string",
                "claveProductoExportacion": 0,
                "descripcionServicio": "string",
                "rowID": "string",
                "cveFraccion": "61032301",
                "capitulo": "string",
                "partida": "string",
                "subPartida": "string",
                "descripcion": "string",
                "fechaCaptura": "2025-09-07T12:43:35.647Z",
                "fechaInicioVigencia": "2025-09-07T12:43:35.647Z",
                "fechaFinVigencia": "2025-09-07T12:43:35.647Z",
                "cveUsuario": "string",
                "cveCapituloFraccion": "string",
                "cvePartidaFraccion": "string",
                "cveSubPartidaFraccion": "string",
                "activo": true,
                "activoAnexo28": true,
                "decretoImmex": true,
                "sector": [
                    {
                        "cveSector": "string",
                        "nombre": "string",
                        "productorIndirecto": 0,
                        "ampliacionMercancias": 0,
                        "fechaInicioVigencia": "2025-09-07T12:43:35.647Z",
                        "fechaFinVigencia": "2025-09-07T12:43:35.647Z",
                        "blnActivo": 0
                    }
                ],
                "cveServicioImmex": {
                    "claveServicio": "string",
                    "nombre": "string",
                    "tipoServicio": "string",
                    "fechaInicioVigencia": "2025-09-07T12:43:35.647Z",
                    "fechaFinVigencia": "2025-09-07T12:43:35.647Z",
                    "blnActivo": true
                },
                "listaProveedores": [
                    {
                        "idProveedor": "string",
                        "paisOrigen": "string",
                        "rfcProveedor": "string",
                        "razonProveedor": "string",
                        "paisDestino": "string",
                        "rfcCliente": "string",
                        "razonCliente": "string",
                        "domicilio": "string",
                        "testado": true,
                        "idProductoP": "string",
                        "descTestado": "string"
                    }
                ],
                "listaProyecto": [
                    {
                        "idProyecto": "string",
                        "tipoDocumento": "string",
                        "descDocumento": "string",
                        "otro": "string",
                        "fechaIncio": "string",
                        "fechaFin": "string",
                        "firmante": {
                            "idFirmante": "string",
                            "rfc": "string",
                            "razonSocial": "string",
                            "claveFraccion": "string"
                        },
                        "testado": "string",
                        "idProducto": "string",
                        "descTestado": "string"
                    }
                ],
                "nicoDtos": [
                    {
                        "claveNico": "00",
                        "descripcion": "string",
                        "testadoNico": "string",
                        "testadoInt": true
                    }
                ]
            }
        }
    ],
    "mercanciaImportacion": [
        {
            "claveMercanciaImportacion": 0,
            "testado": 0,
            "tipoFraccion": "string",
            "visible": true,
            "fraccionPadre": "string",
            "blnFraccionSeleccionada": 0,
            "claveFraccionPadre": "string",
            "fraccionCompuesta": "string",
            "descripcionTestado": "string",
            "unidadMedida": "string",
            "tipoOperacion": "string",
            "valorMonedaMensual": "string",
            "valorMonedaAnual": "string",
            "valorProduccionMensual": "string",
            "valorProduccionAnual": "string",
            "valorProduccionAnualSolicitada": "string",
            "categoria": "string",
            "mensaje": "string",
            "umt": "string",
            "claveCategoria": "string",
            "descripcionUsuario": "string",
            "descripcionFraccionPadre": "string",
            "idProductoPadre": "string",
            "idProducto": "string",
            "permisoPadre": "string",
            "fraccionArancelaria": {
                "fraccionPadre": "string",
                "descripcionFraccionPadre": "string",
                "tipoFraccion": "string",
                "exenta": true,
                "fraccionCompuesta": "string",
                "claveFraccionPadre": "string",
                "unidadMedida": "string",
                "fraccionConcatenada": "string",
                "descripcionTestado": "string",
                "testado": true,
                "tipoOperacion": "string",
                "valorMonedaMensual": "string",
                "valorMonedaAnual": "string",
                "valorProduccionMensual": "string",
                "valorProduccionAnual": "string",
                "valorProduccionAnualSolicitada": "string",
                "claveCategoria": "string",
                "descripcionCategoria": "string",
                "mensaje": "string",
                "descripcionUsuario": "string",
                "umt": "string",
                "idFraccion": "string",
                "idProducto": "string",
                "idProductoPadre": "string",
                "claveProductoExportacion": 0,
                "descripcionServicio": "string",
                "rowID": "string",
                "cveFraccion": "61032301",
                "capitulo": "string",
                "partida": "string",
                "subPartida": "string",
                "descripcion": "string",
                "fechaCaptura": "2025-09-07T12:43:35.647Z",
                "fechaInicioVigencia": "2025-09-07T12:43:35.647Z",
                "fechaFinVigencia": "2025-09-07T12:43:35.647Z",
                "cveUsuario": "string",
                "cveCapituloFraccion": "string",
                "cvePartidaFraccion": "string",
                "cveSubPartidaFraccion": "string",
                "activo": true,
                "activoAnexo28": true,
                "decretoImmex": true,
                "sector": [
                    {
                        "cveSector": "string",
                        "nombre": "string",
                        "productorIndirecto": 0,
                        "ampliacionMercancias": 0,
                        "fechaInicioVigencia": "2025-09-07T12:43:35.647Z",
                        "fechaFinVigencia": "2025-09-07T12:43:35.647Z",
                        "blnActivo": 0
                    }
                ],
                "cveServicioImmex": {
                    "claveServicio": "string",
                    "nombre": "string",
                    "tipoServicio": "string",
                    "fechaInicioVigencia": "2025-09-07T12:43:35.647Z",
                    "fechaFinVigencia": "2025-09-07T12:43:35.647Z",
                    "blnActivo": true
                },
                "listaProveedores": [
                    {
                        "idProveedor": "string",
                        "paisOrigen": "string",
                        "rfcProveedor": "string",
                        "razonProveedor": "string",
                        "paisDestino": "string",
                        "rfcCliente": "string",
                        "razonCliente": "string",
                        "domicilio": "string",
                        "testado": true,
                        "idProductoP": "string",
                        "descTestado": "string"
                    }
                ],
                "listaProyecto": [
                    {
                        "idProyecto": "string",
                        "tipoDocumento": "string",
                        "descDocumento": "string",
                        "otro": "string",
                        "fechaIncio": "string",
                        "fechaFin": "string",
                        "firmante": {
                            "idFirmante": "string",
                            "rfc": "string",
                            "razonSocial": "string",
                            "claveFraccion": "string"
                        },
                        "testado": "string",
                        "idProducto": "string",
                        "descTestado": "string"
                    }
                ],
                "nicoDtos": [
                    {
                        "claveNico": "00",
                        "descripcion": "string",
                        "testadoNico": "string",
                        "testadoInt": true
                    }
                ]
            },
            "listaProveedores": [
                {
                    "idProveedor": "string",
                    "paisOrigen": "string",
                    "rfcProveedor": "string",
                    "razonProveedor": "string",
                    "paisDestino": "string",
                    "rfcCliente": "string",
                    "razonCliente": "string",
                    "domicilio": "string",
                    "testado": true,
                    "idProductoP": "string",
                    "descTestado": "string"
                }
            ],
            "listaProyecto": [
                {
                    "idProyecto": "string",
                    "tipoDocumento": "string",
                    "descDocumento": "string",
                    "otro": "string",
                    "fechaIncio": "string",
                    "fechaFin": "string",
                    "firmante": {
                        "idFirmante": "string",
                        "rfc": "string",
                        "razonSocial": "string",
                        "claveFraccion": "string"
                    },
                    "testado": "string",
                    "idProducto": "string",
                    "descTestado": "string"
                }
            ],
            "nicoDtos": [
                {
                    "claveNico": "01",
                    "descripcion": "string",
                    "testadoNico": "string",
                    "testadoInt": true
                }
            ],
            "proyectosClientes": [
                {
                    "paisOrigen": "",
                    "rfcProveedor": "",
                    "razonProveedor": "",
                    "paisDestino": "ARGELIA (REPUBLICA DEMOCRATICA Y POPULAR DE)",
                    "rfcClient": "GDFGFDHGJGHJGH",
                    "razonCliente": "D FFGSDFSFSDF",
                    "domicilioCliente": "",
                    "testado": false,
                    "fecFinVigencia": null
                }
            ],
            "complemento": {
                "anexoII": "NO SENSIBLE",
                "tipo": "EXPORTACION",
                "unidadMedida": "Kilogramo",
                "categoria": "TICAT.MP",
                "descripcion": "DEJ JLFKDSFDSFSDF",
                "valorMensual": "12",
                "valorAnual": "432",
                "volumenMensual": "5435",
                "volumenAnual": "534",
                "testado": true,
                "fecFinVigencia": null,
                "volumenAnualSolicitado": null
            }
        }
    ],
    "anexoII": [
        {
            "descripcion": "CONTROL DE ENERGIA",
            "idTipoBien": 0,
            "idBienComercial": 0,
            "testado": true,
            "contadorGrid": null,
            "descripcionTestado": null
        }
    ],
    "anexoIII": [
        {
            "descripcion": "CONTROL DE ENERGIA",
            "idTipoBien": 0,
            "idBienComercial": 0,
            "testado": true,
            "contadorGrid": null,
            "descripcionTestado": null
        }
    ],
    "fraccionesSensibles": [
        {
            "claveSencible": 0,
            "complemento": "00001",
            "unidadMedidaTarifaria": "1",
            "cantidad": "300000.0",
            "valor": "20000.00",
            "fraccionPadre": "02101999",
            "descUnidadMedida": null,
            "fechaInicioVigencia": "2025-09-07",
            "fechaFinVigencia": "2025-09-07",
            "cveFraccion": "string"
        }
    ],
    "fraccionesTextiles": [
        {
            "proyeccionExportacion": 120000.0,
            "numeroTrabajadores": 8,
            "maximoImportaciones": 120000.0,
            "factorAmpliacion": 0.00,
            "maxImportaciones": null,
            "proyeccionConsulta": null,
            "fechaInicioVigencia": "2025-09-07",
            "fechaFinVigencia": "2025-09-07"
        }
    ],
    "servicios": [
        {
            "tipoServicio": "TISIMMEX.TN",
            "testado": true,
            "claveServicio": 1,
            "descripcion": null,
            "descripcionTipo": null,
            "descripcionTestado": null,
            "estatus": true,
            "desEstatus": null,
            "fecIniVigencia": "2025-09-07",
            "fecFinVigencia": "2025-09-07"
        }
    ],
    "empresasNacionales": [
        {
            "tipoEmpresa": "1",
            "caracterEmpresa": "",
            "montoExportacionesUSD": 0,
            "numeroProgramaDGCESE": "",
            "porcentajeParticipacionAccionaria": 0,
            "porcentajeParticionAccionariaExt": 0,
            "nombre": "",
            "apellidoPaterno": "",
            "apellidoMaterno": "",
            "razonSocial": "COMPA¿A MEXICANA DE TRAJES, S.A. DE C.V.",
            "rfc": "MTR8012148K9",
            "certificada": false,
            "correoElectronico": "trafico@mextrajes.com",
            "idDireccionSol": 112053,
            "testado": false,
            "fechaInicioVigencia": "2025-09-07",
            "fecFinVigencia": "2025-09-07",
            "blnActivo": true,
            "idServicio": "0",
            "descripcionServicio": "",
            "domicilioCompleto": "",
            "numeroPrograma": "",
            "tiempoPrograma": "",
            "descripcionTestado": "",
            "idCompuestoEmpresa": "",
            "idServicioAutorizado": 0
        }
    ],
    "sectoresImmex": [
        {
            "idSolicitud": 0,
            "idAtributo": 0,
            "cveEnumeracionH": "string",
            "cveEnumeracion": "string",
            "blnEstado": true,
            "descGenerica1": "string",
            "importeGenerico1": 0,
            "fecGenerica1": "2025-09-07"
        }
    ],
    "actividadProductivaTres": [
        {
            "idSolicitud": 0,
            "idAtributo": 0,
            "cveEnumeracionH": "string",
            "cveEnumeracion": "string",
            "blnEstado": 0,
            "fecGenerica1": "2025-09-03",
            "descGenerica1": "string",
            "importeGenerico1": 0
        }
    ],
    "sociosAccionistas": [
        {
            "domicilio":{
                "codigoPostal":"900"
            },
            "idPersonaPersonaSolicitudR": 0,
            "idSolicitud": 0,
            "nombre": "",
            "apellidoMaterno": "",
            "apellidoPaterno": "",
            "razonSocial": "AGRICOLA ALPE S DE RL DE CV",
            "rfc": "AAL0409235E6",
            "curp": "",
            "ideTipoPersonaSol": "TIPERS.SL",
            "correoElectronico": "vucem.soporte.aplicativo@ultrasist.com.mx",
            "cedulaProfesional": "",
            "nss": "",
            "telefono": "8154563",
            "descripcionGiro": "Siembra, cultivo y cosecha de papa",
            "cvePaisOrigen": "",
            "idDireccionSol": 260833725,
            "tipoPatenteAgente": "",
            "recif": "",
            "puesto": "",
            "tipoAgente": "",
            "numeroPatente": "",
            "numeroIdentificacionFiscal": "",
            "personaMoral": false,
            "extranjero": false,
            "organismoPublico": false,
            "cveUsuario": "AAL0409235E6",
            "paginaWeb": "",
            "ideGenerica1": "",
            "rfcExtranjero": "",
            "codAutorizacion": "",
            "actividadProductiva": "",
            "estadoEvaluacionEntidad": "AUTORIZADO",
            "estadoEntidad": "AUTORIZADO",
            "original": false,
            "modificado": false,
            "numeroRegistro": "",
            "concentimientoInstalacionRecuperacion": false,
            "cveCatalogo": "",
            "alquilado": false,
            "volumenAlmacenaje": 0,
            "capacidadAlmacenaje": 0,
            "descripcionDetalladaActividadEconomica": "",
            "activo": false,
            "generico1": false,
            "area": "",
            "cveNacionalidad": "",
            "clasificacionArancelaria": "",
            "infoAdicional": false,
            "montoImportacion": 0,
            "montoExportacion": 0,
            "pctParticAccionaria": 0,
            "ampliacionModelos": false,
            "ampliacionPaises": false,
            "fecFallecimiento": "2025-09-07"
        }
    ],
    "fraccionesAnexoDos": [
        {
            "claveFraccion": "02101999",
            "descripcion": "FDSF DSFS",
            "testado": true,
            "fecFinVigencia": null,
            "descTestado": null,
            "idFraccion": null
        }
    ],
    "fraccionesAnexoTres": [
        {
            "claveFraccion": "02101999",
            "descripcion": "FDSF DSFS",
            "testado": true,
            "fecFinVigencia": null,
            "descTestado": null,
            "idFraccion": null
        }
    ],
    "empresasExtranjeras": [
        {
            "tipoEmpresa": "1",
            "caracterEmpresa": "",
            "montoExportacionesUSD": 0,
            "numeroProgramaDGCESE": "",
            "porcentajeParticipacionAccionaria": 0,
            "porcentajeParticionAccionariaExt": 0,
            "nombre": "",
            "apellidoPaterno": "",
            "apellidoMaterno": "",
            "razonSocial": "COMPA¿A MEXICANA DE TRAJES, S.A. DE C.V.",
            "rfc": "MTR8012148K9",
            "certificada": false,
            "correoElectronico": "trafico@mextrajes.com",
            "idDireccionSol": 112053,
            "testado": false,
            "fechaInicioVigencia": "2025-09-07",
            "fecFinVigencia": "2025-09-07",
            "blnActivo": true,
            "idServicio": "0",
            "descripcionServicio": "",
            "domicilioCompleto": "",
            "numeroPrograma": "",
            "tiempoPrograma": "",
            "descripcionTestado": "",
            "idCompuestoEmpresa": "",
            "idServicioAutorizado": 0,
            "domicilioSolicitud": {
                "codigoPostal": "dhdjjd",
                "informacionExtra": "83938"
            }
        }
    ],
    "programaImmex": {
        "folioPrograma": "string",
        "tipoPrograma": "string",
        "movimientoProgramaSE": "string",
        "rfc": "MTR8012148K9",
        "anioPrograma": 0,
        "fechaInicioVigencia": "2025-09-03",
        "fechaFinVigencia": "2025-09-03",
        "actividadProductiva": "string",
        "fechaSuspension": "2025-09-03",
        "modalidad": "string",
        "numeroImmex": "string",
        "resolucionId": 0,
        "unidadAdministrativaId": 0
    },
    "declaracionSolicitudEntities": [
        {
            "acepto": 0,
            "idTipoTramite": 80207,
            "manifiestoDeclaracion": true,
            "cveDeclaracion": "123"
        },
        {
            "acepto": 0,
            "idTipoTramite": 80207,
            "manifiestoDeclaracion": true,
            "cveDeclaracion": "456"
        }
    ],
    "claveModalidadActual": "MOD-123",
    "datosCertificacion": "CERT-001",
    "montoImportaciones": 500000,
    "factorAmpliacion": 1.2,
    "proyeccion": 750000,
    "trabajadores": 150,
    "id_solicitud": 12345,
    "discriminatorValue": "80207",
    "certificacion_sat": "CERTIFICADO",
    "unidadAdministrativaRepresentacionFederal": {
        "clave": "string",
        "idDependencia": 0,
        "claveEntidad": "string",
        "claveUnidadAdminR": "string",
        "ideTipoUnidadAdministrativa": "string",
        "nivel": 0,
        "acronimo": "string",
        "nombre": "string",
        "descripcion": "string",
        "fechaInicioVigencia": "2025-09-08",
        "fechaFinVigencia": "2025-09-08",
        "activo": true,
        "idDireccion": 0,
        "fronteriza": true
    },
    "programaAutorizadoEconomia": {
        "idProgramaAutorizado": 0,
        "folioPrograma": "string",
        "tipoPrograma": "string",
        "movimientoProgramaSE": "string",
        "rfc": "MTR8012148K9",
        "anioPrograma": 0,
        "resolucionId": 0,
        "unidadAdministrativaId": 0,
        "fechaInicioVigencia": "2025-09-08",
        "fechaFinVigencia": "2025-09-08",
        "actividadProductiva": "string",
        "fechaSuspension": "2025-09-08"
    },
    "domicilio": {
        "idDomicilio": 0,
        "calle": "string",
        "numeroExterior": "string",
        "numeroInterior": "string",
        "codigoPostal": "string",
        "informacionExtra": "string",
        "clave": "string",
        "cveLocalidad": "string",
        "cveDelegMun": "string",
        "cveEntidad": "string",
        "cvePais": "string",
        "ciudad": "string",
        "telefono": "string",
        "fax": "string",
        "municipio": "string",
        "colonia": "string",
        "descUbicacion": "string",
        "cveCatalogo": "string",
        "telefonos": "string",
        "tipoDomicilio": 0
    },
    "solicitante": {
        "idPersonaPersonaSolicitudR": 0,
        "idSolicitud": 0,
        "nombre": "",
        "apellidoMaterno": "",
        "apellidoPaterno": "",
        "razonSocial": "AGRICOLA ALPE S DE RL DE CV",
        "rfc": "AAL0409235E6",
        "curp": "",
        "ideTipoPersonaSol": "TIPERS.SL",
        "correoElectronico": "vucem.soporte.aplicativo@ultrasist.com.mx",
        "cedulaProfesional": "",
        "nss": "",
        "telefono": "8154563",
        "descripcionGiro": "Siembra, cultivo y cosecha de papa",
        "cvePaisOrigen": "",
        "idDireccionSol": 260833725,
        "tipoPatenteAgente": "",
        "recif": "",
        "puesto": "",
        "tipoAgente": "",
        "numeroPatente": "",
        "numeroIdentificacionFiscal": "",
        "personaMoral": false,
        "extranjero": false,
        "organismoPublico": false,
        "cveUsuario": "AAL0409235E6",
        "paginaWeb": "",
        "ideGenerica1": "",
        "rfcExtranjero": "",
        "codAutorizacion": "",
        "actividadProductiva": "",
        "estadoEvaluacionEntidad": "AUTORIZADO",
        "estadoEntidad": "AUTORIZADO",
        "original": false,
        "modificado": false,
        "numeroRegistro": "",
        "concentimientoInstalacionRecuperacion": false,
        "cveCatalogo": "",
        "alquilado": false,
        "volumenAlmacenaje": 0,
        "capacidadAlmacenaje": 0,
        "descripcionDetalladaActividadEconomica": "",
        "activo": false,
        "generico1": false,
        "area": "",
        "cveNacionalidad": "",
        "clasificacionArancelaria": "",
        "infoAdicional": false,
        "montoImportacion": 0,
        "montoExportacion": 0,
        "pctParticAccionaria": 0,
        "ampliacionModelos": false,
        "ampliacionPaises": false,
        "fecFallecimiento": "2025-09-07"
    }
};
   
   if(e.accion==='cont'){
    let isValid=true;
    if (this.indice === 1 && this.pasoUnoComponent) {
      isValid = this.pasoUnoComponent.validarTodosLosFormularios();
    }
    if (!isValid) {
      
      this.datosPasos.indice = this.indice;
      return;
    }

  this.registroSolicitudService.postGuardarDatos(this.tramiteId, PAYLOAD).pipe(takeUntil(this.destroyNotifier$))
      .subscribe((response) => {
        if (response) {
           this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      this.wizardComponent.siguiente();
        this.store.setIdSolicitud(response.datos?.id_solicitud ?? 0);
        }
      });
 

  }
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
   * Método que se ejecuta al destruir el componente.
   * Utiliza un Subject para notificar a todos los observables suscritos que deben completarse.
   * Esto ayuda a evitar posibles fugas de memoria al completar el Subject y finalizar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
