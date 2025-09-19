import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { Subject, map, take } from 'rxjs';
import { Tramite80101State, Tramite80101Store } from '../../estados/tramite80101.store';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-terciarización.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import basePlantasTerciarizadoras from '@libs/shared/theme/assets/json/80105/basePlantasTerciarizadoras.json';
import { takeUntil } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries

@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
})
export class PasoCapturarSolicitudComponent implements OnDestroy,OnInit {
  /**
   * Almacena los pasos del wizard definidos en PASOS4.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS4;
  /**
   * Almacena el índice actual del paso en el wizard.
   * @type {number}
   */
  indice: number = 1;
  /**
   * Almacena el mensaje de aviso para el wizard.
   * @type {AVISO}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Referencia al componente `WizardComponent` dentro de la plantilla.
   * Esta propiedad utiliza el decorador `@ViewChild` para obtener una instancia del componente
   * `WizardComponent` que se encuentra en la plantilla del componente actual.
   * 
   * Uso:
   * - Se utiliza para acceder a los métodos y propiedades del componente `WizardComponent`.
   * - Por ejemplo, se llama a los métodos `siguiente()` y `atras()` para navegar entre los pasos
   *   del asistente (wizard).
   * 
   * Nota:
   * - Esta propiedad se inicializa después de que Angular haya renderizado la vista.
   * - Asegúrese de que el componente `WizardComponent` esté presente en la plantilla.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
 * 
 * Una cadena que representa la clase CSS para una alerta de información.
 * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
 */
  public infoAlert = 'alert-info';
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Indica si el botón Guardar está habilitado o visible. */
  public btnGuardar: boolean = true;

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se utiliza para rastrear la solicitud en curso.
   */
  idSolicitud: number=0;

  /**
   * Objeto base inmutable que representa la estructura inicial de un socio/accionista.
   */
  private socioAccionistaBase: Readonly<Record<string, unknown>> = {
      "idPersonaPersonaSolicitudR": 0,
      "idSolicitud": 202734824,
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
  };

  private basePlantasTerciarizadoras: unknown[] = Array.isArray(basePlantasTerciarizadoras) ? basePlantasTerciarizadoras : [];

    private plantasBase: Readonly<Record<string, any>> = {
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plantasSubmanufacturerasBase: Readonly<Record<string, any>> = {
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

   /**
   * URL de la página actual.
   */
  public solicitudState!: Tramite80101State;

  /**
   * Constructor del componente `PasoCapturarSolicitudComponent`.
   * Inicializa el componente y establece la validez del formulario en el store.
   * 
   * @param {Tramite80101Query} tramiteQuery - Servicio para gestionar el estado del trámite.
   * @param {SeccionLibStore} seccion - Servicio para gestionar el estado de la sección.
   */
  constructor(
    private tramiteQuery: Tramite80101Query,
    private seccion: SeccionLibStore,
    private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService,
    private tramite80105Store: Tramite80101Store,
    private tramite80105Query: Tramite80101Query
  ) {
    this.tramiteQuery.FormaValida$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.seccion.establecerSeccion([true]);
      this.seccion.establecerFormaValida([res]);
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
    this.tramite80105Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e - event$: Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
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
    this.nuevoProgramaIndustrialService.getAllState()
    .pipe(take(1))
    .subscribe(data => {
      this.guardar(data);
    });
  }

        // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildPlantas(arr: any[] = [], base: Record<string, any>, data: any): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const MAP_TO_PAYLOAD = (item: any): any => ({
  ...base,
  entidadFederativa: item.estado,
  municipioDelegacion: item.estadoOptions,
  fechaActa: item.fechaDelActa,
  nombreNotario: item.nombre,
  numeroActa: item.numeroDeActa,
  numeroNotaria: item.numeroDeNotaria,
  apellidoPaterno: item.primerApellido,
  apellidoMaterno: item.segundoApellido,
  estadoEntidad: item.entidadFederativa,
  cvePaisOrigen: item.pais,
  rfc: item.rfc,
  domicilio: item.domicilioFiscal,
  razonSocial: item.razonSocial,
});
      

    arr.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

    return RESULT;
}
  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
   * 
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns void
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guardar(data: any): void {
    const SOCIO_ACCIONISTAS = this.buildSociosAccionistas(data.tablaDatosComplimentos, data.tablaDatosComplimentosExtranjera, this.socioAccionistaBase, data);
    const PLANTAS_TERCIARIZADORAS = PasoCapturarSolicitudComponent.buildPlantasTerciarizadoras(data.empresasSeleccionadas, this.basePlantasTerciarizadoras);
    const PLANTAS = this.buildPlantas(data.tablaDatosFederatarios, this.plantasBase, data);
    const ANEXO_ALL = this.buildAnexo(data);
    const PLANTAS_SUBMANUFACTURERAS = this.buildPlantasSubmanufactureras(data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar, this.plantasSubmanufacturerasBase, data);

    const PAYLOAD = {
    "tipoDeSolicitud": "guardar",
    "idSolicitud": 202781045,
    "idTipoTramite": 80105,
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
    "discriminator_value": "80105",
    "discriminatorValue": "80105",
     "domicilio": {
    },
    "solicitante": {
        
    },
      "planta": [...PLANTAS],
      "anexoII": [...ANEXO_ALL.anexo.ANEXOII],
      "anexoIII": [...ANEXO_ALL.anexo.ANEXOIII],
      "mercanciaImportacion": [
        {
          "listaProveedores": [
            ...ANEXO_ALL.anexo.proveedorCliente
          ],
          "complemento": {
            ...ANEXO_ALL.anexo.datosParaNavegar
          },
        }
    ],
    "plantasSubmanufactureras": [...PLANTAS_SUBMANUFACTURERAS],
    "sociosAccionistas":[...SOCIO_ACCIONISTAS],
    "solicitud": {
      "anexoI": [...ANEXO_ALL.anexo.tableDos]
    },
    "plantasTerciarizadoras": PLANTAS_TERCIARIZADORAS
    };
    this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
      this.tramite80105Store.setIdSolicitud(response.datos.id_solicitud || 0);
      return response;
    });
  }

  /**
 * Construye un arreglo de socios/accionistas a partir de dos listas de entrada,
 * utilizando un objeto base como plantilla y datos complementarios para completar
 * los campos faltantes.
 *
 * @param arr1 Primer arreglo de socios/accionistas.
 * @param arr2 Segundo arreglo de socios/accionistas.
 * @param base Objeto base que sirve de plantilla para cada elemento del resultado.
 * @param data Objeto con datos complementarios necesarios para completar el payload.
 *
 * @returns Un nuevo arreglo que contiene los objetos combinados y mapeados
 *          con la información de los dos arreglos de entrada.
 *
 * @example
 * const socios = buildSociosAccionistas(listaA, listaB, BASE, datos);
 */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
  buildSociosAccionistas(arr1: any[] = [], arr2: any[] = [], base: Record<string, any>, data: any): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    const MAP_TO_PAYLOAD = (item: Record<string, unknown>): Record<string, unknown> => ({
      ...base,
      nombre: item['nombre'] ?? '',
      apellidoPaterno: item['apellidoPaterno'] ?? '',
      apellidoMaterno: item['apellidoMaterno'] ?? '',
      rfc: item['rfc'] ?? '',
      correoElectronico: item['correoElectronico'] ?? '',
      razonSocial: data.datosComplimentos.formaSocioAccionistas.formaDatos.razonSocial,
      ideTipoPersonaSol: data.datosComplimentos.formaSocioAccionistas.tipoDePersona,
      paginaWeb: data.datosComplimentos.datosGeneralis.paginaWWeb,
      cveNacionalidad: data.datosComplimentos.formaSocioAccionistas.nationalidadMaxicana,
      fecFallecimiento: data.datosComplimentos.formaCertificacion.fechaVigencia
    });

    arr1.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));
    arr2.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

    return RESULT;
  }

// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildPlantasSubmanufactureras(arr: any[] = [], base: Record<string, any>, data: any): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MAP_TO_PAYLOAD = (item: any): any => ({
      ...base,
      estadoEntidad: item.entidadFederativa,
      cvePaisOrigen: item.pais,
      rfc: item.rfc,
      domicilio: item.domicilioFiscal,
      razonSocial: item.razonSocial,
    });

    arr.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

    return RESULT;
}

  /**
 * Build plantasControladoras by taking the base array
 * and appending the length of each key in empresasSeleccionadas
 * to every planta item.
 *
 * @param empresasSeleccionadas  Object with keys whose values are arrays
 * @param basePlantas            Existing plantasControladoras array
 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildPlantasTerciarizadoras(empresasSeleccionadas: any[], basePlantas: unknown[]): unknown[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];

    empresasSeleccionadas.forEach(emp => {
      basePlantas.forEach(planta => {
        const PLANTA = (planta && typeof planta === 'object') ? planta : {};
        RESULT.push({
          ...PLANTA,
          calle: emp.calle ?? '',
          numeroExterior: emp.numeroExterior ?? '',
          numeroInterior: emp.numeroInterior ?? '', 
          codigoPostal: emp.codigoPostal ?? '',
          colonia: emp.colonia ?? '',
          delegacionMunicipio: emp.municipioDelegacion ?? '',
          entidadFederativa: emp.entidadFederativa ?? '',
          pais: emp.pais ?? '',
          rfc: emp.registroFederalContribuyentes ?? '',
          razonSocial: emp.razonSocial ?? '',
          domicilioFiscal: emp.domicilioFiscalSolicitante ?? ''
        });
      });
    });
    return RESULT;
  }




  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/explicit-function-return-type
      /**
       * Construye el objeto `anexo` a partir de los datos proporcionados.
       *
       * @param data - Objeto de entrada que contiene la información necesaria para construir los anexos y sus tablas asociadas.
       * @returns Un objeto con la estructura de los anexos, incluyendo ANEXOII, ANEXOIII, proveedorCliente y datosParaNavegar.
       *
       * - `ANEXOII` y `ANEXOIII`: Listas construidas a partir de los elementos de `anexoDosTablaLista` y `anexoTresTablaLista` respectivamente.
       * - `proveedorCliente`: Lista de proveedores y clientes obtenida de `proveedorClienteDatosTabla`.
       * - `datosParaNavegar`: Información adicional para navegación, construida desde `datosParaNavegar`.
       *
       * Cada subestructura se construye utilizando funciones auxiliares para mapear y transformar los datos de entrada.
       */
       buildAnexo(data: any) {
       
        const buildAnexoItem = (item: Anexo1) => ({
          descripcion: item.encabezadoFraccion,
          idTipoBien: 0,
          idBienComercial: 0,
          testado: true,
          contadorGrid: null,
          descripcionTestado: item.encabezadoDescripcion,
        });
      
        const buildProveedorCliente = (item: ProveedorClienteDatosTabla) => ({
          idProveedor: item.idProveedor,
          paisOrigen: item.paisOrigen,
          rfcProveedor: item.rfcProveedor,
          razonProveedor: item.razonProveedor,
          paisDestino: item.paisDestino,
          rfcCliente: item.rfcClinte,
          razonCliente: item.razonSocial,
          domicilio: item.domicilio,
          testado: item.testado,
          idProductoP: item.idProductoP,
          descTestado: item.descTestado,
        });
      
        const buildDatosParaNavegar = (datos: any) => ({
          anexoII: datos?.encabezadoAnexoII,
          tipo: datos?.encabezadoTipo,
          unidadMedida: datos?.encabezadoAnexoII,
          categoria: datos?.encabezadoCategoria,
          descripcion: datos?.encabezadoDescripcionComercial,
          valorMensual: datos?.encabezadoVolumenMensual,
          valorAnual: datos?.encabezadoVolumenAnual,
          volumenMensual: datos?.encabezadoValorEnMonedaMensual,
          volumenAnual: datos?.encabezadoValorEnMonedaAnual,
          testado: true,
          fecFinVigencia: null,
          volumenAnualSolicitado: null,
        });
           const anexoDos: any = [];

    (data.annexoUno?.exportarDatosTabla || []).forEach((item: any) => {
      anexoDos.push({
        fraccionExportacion: item.encabezadoFraccionExportacion,
        fraccionImportacion: item.encabezadoFraccionImportacion,
        descFraccionImpo: item.encabezadoDescripcionComercial,
        claveFraccionAnexo: item.encabezadoAnexoII,
        idProducto: item.encabezadoIdProducto,
        fraccionDescripcionAnexo: item.encabezadoFraccionDescripcionAnexo,
        fraccionValorMonedaAI: item.encabezadoValorEnMonedaAnual,
        fraccionValorProdMI: item.encabezadoValorEnMonedaMensual,
        categoriaFraccion: item.encabezadoCategoria,
        tipoFraccion:item.encabezadoTipo,
        umt:item.encabezadoUmt
      });
    });
      
        return {
          anexo: {
            ANEXOII: (data.annexoDosTres?.anexoDosTablaLista || []).map(buildAnexoItem),
            ANEXOIII: (data.annexoDosTres?.anexoTresTablaLista || []).map(buildAnexoItem),
            proveedorCliente: (data.annexoUno?.proveedorClienteDatosTabla || []).map(buildProveedorCliente),
            datosParaNavegar: buildDatosParaNavegar(data.annexoUno?.datosParaNavegar || {}),
            tableDos: anexoDos
          },
        };
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
