/**
 * @description Este componente es responsable de manejar el flujo de pasos para la elegibilidad de textiles.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 * @import { PASOS } from 'libs/shared/data-access-user/src/tramites/constantes/80208/solicitud-modalidad.enums';
 * @import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
 * @import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/80208/solicitud-modalidad.model';
 * @import { WizardComponent } from '@ng-mf/data-access-user';
 */

import {
  CambioModalidadState,
  CambioModalidadStore,
} from '../../estados/tramite80208.store';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, Usuario, esValidObject, getValidDatos } from '@ng-mf/data-access-user';
import { Observable, Subject, catchError, finalize, map, of, switchMap, take, takeUntil, tap } from 'rxjs';
import {
  PASOS,
  USUARIO_INFO,
} from '../../constantes/solicitud-modalidad.enums';
import { CambioModalidadQuery } from '../../estados/tramite80208.query';
import { CambioModalidadService } from '../../service/cambio-modalidad.service';
import { GuardarService } from '../../service/guardar.service';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ResultadoSolicitud } from '../../modelos/solicitud-modalidad.model';
import { ToastrService } from 'ngx-toastr';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz para definir la acción y el valor del botón.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * @description Este componente es responsable de manejar el flujo de pasos para la elegibilidad de textiles.
 * Incluye la lógica para la navegación entre pasos y la obtención de títulos.
 */
@Component({
  selector: 'app-solicitud-modalidad-page',
  templateUrl: './solicitud-modalidad-page.component.html',
  styleUrl: './solicitud-modalidad-page.component.scss',
  providers: [ToastrService],
})
export class SolicitudModalidadPageComponent implements OnInit {
  /**
   * @property {Array<ListaPasosWizard>} pasos
   * @description Array de pasos del asistente (wizard).
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * @property {WizardComponent} wizardComponent
   * @description Referencia al componente del asistente (wizard).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice
   * @description Índice del paso actual en el asistente.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description Datos relacionados con los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * URL de la página actual.
   */
  public solicitudState!: CambioModalidadState;

  /**
   * Referencia al componente del primer paso.
   * Permite acceder a los métodos y propiedades del paso uno.
   */
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Subject para notificar la destrucción del componente y cancelar suscripciones.
   * Se utiliza para evitar fugas de memoria al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Contiene la información del usuario actual.
   *
   * @type {Usuario}
   * @see USUARIO_INFO
   */
  datosUsuario: Usuario = USUARIO_INFO;

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

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /** Indica si el botón Guardar debe mostrarse o estar habilitado en el formulario. */
  public btnGuardar: boolean = true;

  /**
   * @constructor
   * @description Constructor que inicializa el componente y sus dependencias.
   * @param {CambioModalidadQuery} cambioModalidadQuery - Servicio para consultar el estado del cambio de modalidad.
   */
  constructor(
    public cambioModalidadQuery: CambioModalidadQuery,
    private guardarService: GuardarService,
    private tramite80208Store: CambioModalidadStore,
    private cambioModalidadService: CambioModalidadService,
    private toastrService: ToastrService,
  ) {}

  /**
   * Mantiene la suscripción al estado de CambioModalidadQuery para tener siempre el estado actualizado.
   */
  ngOnInit(): void {
    this.cambioModalidadQuery.selectCambioModalidad$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((state: CambioModalidadState) => {
        this.solicitudState = state;
      });
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
getValorIndice(e: AccionBoton): void {
  let shouldNavigate = false;
  this.cambioModalidadService.getAllState()
    .pipe(
      take(1),
      tap(data => {
        //
      }),
      switchMap((data) => this.guardar(data)),
      tap(response => {
        shouldNavigate = response.codigo === '00';
        if (shouldNavigate) {
          this.toastrService.success(response.mensaje);
        } else {
          this.toastrService.error(response.mensaje);
        }
      }),
      finalize(() => {
        if (shouldNavigate && e.valor > 0 && e.valor < 5) {
          this.indice = e.valor;
          if (e.accion === 'cont') {
            this.wizardComponent.siguiente();
          } else {
            this.wizardComponent.atras();
          }
        }
      })
    )
    .subscribe();
}

  /**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.cambioModalidadService.getAllState()
      .pipe(take(1))
      .subscribe(data => {
        this.guardar(data);
      });
  }

  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `GuardarService`.
   * 
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns Promise<any>
   */
  guardar(data: CambioModalidadState): Promise<any> {
    const PAYLOAD = 
    {
    "tipoDeSolicitud": "guardar",
    "idSolicitud": this.solicitudState.idSolicitud,
    "idTipoTramite": 80208,
    "rfc": "AAL0409235E6",
    "cveUnidadAdministrativa": "8208",
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
    "servicios": data.ServiciosDatos?.map((servicio, index) => ({
        "tipoServicio": "TISIMMEX.TN",
        "testado": true,
        "claveServicio": index + 1,
        "descripcion": servicio.descripcionDelServicio || '',
        "descripcionTipo": servicio.tipoDeServicio || '',
        "descripcionTestado": null,
        "estatus": servicio.estatus || '',
        "desEstatus": null,
        "fecIniVigencia": "2025-09-07",
        "fecFinVigencia": "2025-09-07"
    })),
    "empresasNacionales": data.datos?.map((empresa, index) => ({
        "tipoEmpresa": "1",
        "caracterEmpresa": "",
        "montoExportacionesUSD": 0,
        "numeroProgramaDGCESE": "",
        "porcentajeParticipacionAccionaria": 0,
        "porcentajeParticionAccionariaExt": 0,
        "nombre": "",
        "apellidoPaterno": "",
        "apellidoMaterno": "",
        "razonSocial": empresa.denominacionSocial || "",
        "rfc": empresa.registroContribuyentes || "",
        "certificada": false,
        "correoElectronico": "trafico@mextrajes.com",
        "idDireccionSol": 112053,
        "testado": false,
        "fechaInicioVigencia": "2025-09-07",
        "fecFinVigencia": "2025-09-07",
        "blnActivo": true,
        "idServicio": index.toString(),
        "descripcionServicio": empresa.servicio || "",
        "domicilioCompleto": "",
        "numeroPrograma": empresa.numeroIMMEX || "",
        "tiempoPrograma": empresa.anoIMMEX || "",
        "descripcionTestado": "",
        "idCompuestoEmpresa": "",
        "idServicioAutorizado": 0
    })),
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
            "idPersonaPersonaSolicitudR": 0,
            "idSolicitud": 202744842,
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
            "idTipoTramite": 80208,
            "manifiestoDeclaracion": true,
            "cveDeclaracion": "123"
        },
        {
            "acepto": 0,
            "idTipoTramite": 80208,
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
    "discriminatorValue": "80208",
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
        "idSolicitud": 202744842,
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
}
    return new Promise((resolve, reject) => {
      this.guardarService.postSolicitud(PAYLOAD).subscribe(response => {
        if(esValidObject(response) && esValidObject(response.datos)) {
          if(getValidDatos(response.datos?.id_solicitud)) {
            this.tramite80208Store.setIdSolicitud(response.datos!.id_solicitud);
          } else {
            this.tramite80208Store.setIdSolicitud(0);
          }
        }
        resolve(response);
      }, error => {
        reject(error);
      });
    });
  }

  /**
   * Envía la solicitud de cambio de modalidad usando los datos del PasoUnoComponent y el estado actual.
   */
  enviaSolicitudRequest(): Observable<ResultadoSolicitud> {
    // Obtiene el estado actual del trámite desde PasoUnoComponent
    const CAMBIO_MODALIDAD_STATE: CambioModalidadState =
      this.pasoUnoComponent?.cambioDeModalidadComponent?.tramiteState;

    // Construye el payload para la solicitud
    const PAYLOAD: CambioModalidadState = {
      idSolicitud: CAMBIO_MODALIDAD_STATE?.idSolicitud ?? null,
      ano: CAMBIO_MODALIDAD_STATE?.ano ?? null,
      folio: CAMBIO_MODALIDAD_STATE?.folio ?? null,
      seleccionaModalidad: CAMBIO_MODALIDAD_STATE?.seleccionaModalidad ?? null,
      seleccionaLaModalidad:
        CAMBIO_MODALIDAD_STATE?.seleccionaLaModalidad ?? null,
      cambioDeModalidad: CAMBIO_MODALIDAD_STATE?.cambioDeModalidad ?? null,
      serviciosImmx: CAMBIO_MODALIDAD_STATE?.serviciosImmx ?? null,
      rfcEmpresa: CAMBIO_MODALIDAD_STATE?.rfcEmpresa ?? null,
      numeroPrograma: CAMBIO_MODALIDAD_STATE?.numeroPrograma ?? null,
      tiempoPrograma: CAMBIO_MODALIDAD_STATE?.tiempoPrograma ?? null,
      datos: CAMBIO_MODALIDAD_STATE?.datos ?? null,
      ServiciosDatos: CAMBIO_MODALIDAD_STATE?.ServiciosDatos ?? null,
      domiciliosSeleccionados: CAMBIO_MODALIDAD_STATE?.domiciliosSeleccionados ?? [],
      empresasSeleccionados: CAMBIO_MODALIDAD_STATE?.empresasSeleccionados ?? [],
      // Agrega otros campos relevantes según la estructura de CambioModalidadState
    };

    // Llama al servicio para guardar la solicitud
    return this.guardarService.postSolicitud(PAYLOAD).pipe(
      map((response) => {
        if (response?.codigo === '00' && response?.datos?.id_solicitud) {
          // Actualiza el ID de la solicitud en el store si es exitoso
          this.tramite80208Store.setIdSolicitud(response.datos.id_solicitud);
          return { exito: true };
        }
        const MENSAJE =
          response?.error ||
          response?.mensaje ||
          response?.causa ||
          'Ocurrió un error al guardar la solicitud.';
        const ERRORESMODELO = (response?.errores_modelo || []).map(
          (error: any) => ({
            campo: error.campo || 'general',
            errores: Array.isArray(error.errores)
              ? error.errores
              : [String(error.errores)],
          })
        );
        return {
          exito: false,
          MENSAJE,
          erroresModelo: ERRORESMODELO,
        } as ResultadoSolicitud;
      }),
      catchError((error) => {
        const MENSAJE =
          error?.error?.error ||
          error?.message ||
          'Error inesperado al guardar la solicitud.';
        return of({
          exito: false,
          MENSAJE,
          erroresModelo: error?.error?.errores_modelo || [],
        });
      }),
      takeUntil(this.destroyNotifier$)
    );
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

  /**
   * Emite un evento para cargar archivos.
   * {void} No retorna ningún valor.
   */
  onClickCargaArchivos(): void {
    this.cargarArchivosEvento.emit();
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
}
