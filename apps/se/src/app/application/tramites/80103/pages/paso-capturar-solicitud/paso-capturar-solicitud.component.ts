/**
 * compo doc
 * @component
 * @selector app-paso-capturar-solicitud
 * @description
 * Este componente gestiona el flujo del wizard para la captura de la solicitud en el trámite 80103.
 * Permite navegar entre los diferentes pasos del proceso, controla el estado de avance y valida la información
 * de cada sección utilizando el estado centralizado proporcionado por SeccionLibStore y Tramite80101Query.
 *
 * Funcionalidades principales:
 * - Visualiza y administra los pasos del wizard definidos en PASOS4.
 * - Permite avanzar y retroceder entre los pasos mediante el componente WizardComponent.
 * - Sincroniza el estado de la sección y la validez del formulario con el store global.
 * - Aplica estilos de alerta informativa para mensajes relevantes en el proceso.
 *
 * Componentes importados:
 * - `WizardComponent`: Componente para la navegación tipo wizard.
 *
 * @templateUrl ./paso-capturar-solicitud.component.html
 */
import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, SeccionLibStore, WizardComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, take } from 'rxjs';
import { Tramite80101State, Tramite80101Store } from '../../estados/tramite80101.store';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import empresasExtranjeras from '@libs/shared/theme/assets/json/shared/empresas-extranjeras.json';
import empresasNacionales from '@libs/shared/theme/assets/json/shared/empresas-nacionales.json';
import socioAccionistas from '@libs/shared/theme/assets/json/shared/socio-accionistas.json';
import { takeUntil } from 'rxjs';

/*
*  * Componente para gestionar el paso de captura de solicitud en el trámite 80103.
*  * Este componente utiliza el componente WizardComponent para permitir la navegación entre
*/

@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
})
/**
 * Clase que representa el componente de captura de solicitud.
 * Este componente gestiona el flujo del wizard para la captura de la solicitud en el trámite 80103.
 */
export class PasoCapturarSolicitudComponent implements OnDestroy, OnInit {
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

  idSolicitud: number=0;
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

   /**
   * Objeto base inmutable que representa la estructura inicial de un socio/accionista.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private socioAccionistaBase: any[] = socioAccionistas;

  /** Listado de empresas nacionales utilizadas en el formulario de solicitud. */
  private empresasNacionales = empresasNacionales;
  
  /** Listado de empresas  extranjeras utilizadas en el formulario de solicitud. */
  private empresasExtranjeras = empresasExtranjeras;

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
            "idPlanta": "123",
            "calle": "Main St",
            "numeroInterior": "A",
            "numeroExterior": "10",
            "codigoPostal": "12345",
            "colonia": "Centro",
            "delegacionMunicipio": "MunicipioX",
            "entidadFederativa": "EntidadY",
            "pais": "Mexico",
            "rfc": "RFC123456",
            "domicilioFiscal": "Fiscal Address",
            "razonSocial": "Empresa S.A.",
            "claveEntidadFederativa": "EF01",
            "clavePlantaEmpresa": "PLT01",
            "clavePais": "MX",
            "claveDelegacionMunicipio": "DM01",
            "estatus": true,
            "desEstatus": "Activo",
            "localidad": "Localidad1",
            "telefono": "5551234567",
            "fax": "5557654321",
            "idDireccion": "DIR123",
            "testadoP": 1,
            "empresaCalle": "Empresa St",
            "empresaNumeroInterior": "B",
            "empresaNumeroExterior": "20",
            "empresaCodigoPostal": "54321",
            "empresaColonia": "EmpColonia",
            "empresaDelegacionMunicipio": "EmpMunicipio",
            "empresaEntidadFederativa": "EmpEntidad",
            "empresaPais": "Mexico",
            "empresaClaveEntidadFederativa": "EF02",
            "empresaClavePlantaEmpresa": "PLT02",
            "empresaClavePais": "MX",
            "empresaClaveDelegacionMunicipio": "DM02",
            "empresaCorreoElectronico": "empresa@email.com",
            "empresaTipo": "Tipo1",
            "permaneceMercancia": "Si",
            "rfcActivo": "RFC654321",
            "domiciliosInscritos": "2",
            "personaMoralISR": "Si",
            "opinionSAT": "Positiva",
            "fecha32D": "2024-06-01",
            "firmantes": [
                {
                    "idPlantaF": "FIRM01",
                    "tipoFirmante": "Representante Legal",
                    "descTipoFirmante": "Legal Representative"
                }
            ],
            "datosComplementarios": [
                {
                    "idPlantaC": "C01",
                    "idDato": "D01",
                    "amparoPrograma": "ProgramaX",
                    "tipoDocumento": "DocType1",
                    "descDocumento": "Documento de respaldo",
                    "descripcionOtro": "Otro documento",
                    "documentoRespaldo": "Respaldo.pdf",
                    "descDocRespaldo": "Descripción respaldo",
                    "respaldoOtro": "Otro respaldo",
                    "fechaFirma": "2024-01-01",
                    "fechaVigencia": "2025-01-01",
                    "fechaFirmaRespaldo": "2024-01-02",
                    "fechaVigenciaRespaldo": "2025-01-02"
                }
            ],
            "montos": [
                {
                    "idPlantaM": "M01",
                    "idMonto": "MON01",
                    "tipo": "Inversión",
                    "descTipo": "Inversión inicial",
                    "cantidad": "1000",
                    "descripcion": "Monto de inversión",
                    "monto": "500000",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ],
            "listaCapacidad": [
                {
                    "idPlantaCa": "CA01",
                    "idCapacidad": "CAP01",
                    "claveServicio": "1",
                    "descripcionServicio": "Servicio de producción",
                    "cveTipoServicio": "TS01",
                    "tipoServicio": "Producción",
                    "fraccion": "FR01",
                    "fraccionVista": "Fracción Vista",
                    "umt": "UMT01",
                    "descripcion": "Capacidad instalada",
                    "capacidadEfectiva": "10000",
                    "calculo": "Manual",
                    "turnos": "3",
                    "horasTurno": "8",
                    "cantidadEmpleados": "50",
                    "cantidadMaquinaria": "10",
                    "descripcionMaquinaria": "Maquinaria industrial",
                    "capacidadMensual": "300000",
                    "capacidadAnual": "3600000",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ],
            "datosEmpleados": [
                {
                    "idPlantaE": "E01",
                    "idEmpleados": "EMP01",
                    "totalEmpleados": "100",
                    "directos": "80",
                    "cedula": "CED123",
                    "fechaCedula": "2024-01-10",
                    "indirectos": "20",
                    "contrato": "ContratoX",
                    "objetoContrato": "Objeto del contrato",
                    "fechaFirma": "2024-01-15",
                    "fechaFinVigencia": "2025-01-15",
                    "rfcEmpresa": "RFCEMP123",
                    "razonEmpresa": "Empresa Empleadora",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ]
  }

    private plantasBase: Readonly<Record<string, any>> = {
            "idPlanta": "123",
            "calle": "Main St",
            "numeroInterior": "A",
            "numeroExterior": "10",
            "codigoPostal": "12345",
            "colonia": "Centro",
            "delegacionMunicipio": "MunicipioX",
            "entidadFederativa": "EntidadY",
            "pais": "Mexico",
            "rfc": "RFC123456",
            "domicilioFiscal": "Fiscal Address",
            "razonSocial": "Empresa S.A.",
            "claveEntidadFederativa": "EF01",
            "clavePlantaEmpresa": "PLT01",
            "clavePais": "MX",
            "claveDelegacionMunicipio": "DM01",
            "estatus": true,
            "desEstatus": "Activo",
            "localidad": "Localidad1",
            "telefono": "5551234567",
            "fax": "5557654321",
            "idDireccion": "DIR123",
            "testadoP": 1,
            "empresaCalle": "Empresa St",
            "empresaNumeroInterior": "B",
            "empresaNumeroExterior": "20",
            "empresaCodigoPostal": "54321",
            "empresaColonia": "EmpColonia",
            "empresaDelegacionMunicipio": "EmpMunicipio",
            "empresaEntidadFederativa": "EmpEntidad",
            "empresaPais": "Mexico",
            "empresaClaveEntidadFederativa": "EF02",
            "empresaClavePlantaEmpresa": "PLT02",
            "empresaClavePais": "MX",
            "empresaClaveDelegacionMunicipio": "DM02",
            "empresaCorreoElectronico": "empresa@email.com",
            "empresaTipo": "Tipo1",
            "permaneceMercancia": "Si",
            "rfcActivo": "RFC654321",
            "domiciliosInscritos": "2",
            "personaMoralISR": "Si",
            "opinionSAT": "Positiva",
            "fecha32D": "2024-06-01",
            "firmantes": [
                {
                    "idPlantaF": "FIRM01",
                    "tipoFirmante": "Representante Legal",
                    "descTipoFirmante": "Legal Representative"
                }
            ],
            "datosComplementarios": [
                {
                    "idPlantaC": "C01",
                    "idDato": "D01",
                    "amparoPrograma": "ProgramaX",
                    "tipoDocumento": "DocType1",
                    "descDocumento": "Documento de respaldo",
                    "descripcionOtro": "Otro documento",
                    "documentoRespaldo": "Respaldo.pdf",
                    "descDocRespaldo": "Descripción respaldo",
                    "respaldoOtro": "Otro respaldo",
                    "fechaFirma": "2024-01-01",
                    "fechaVigencia": "2025-01-01",
                    "fechaFirmaRespaldo": "2024-01-02",
                    "fechaVigenciaRespaldo": "2025-01-02"
                }
            ],
            "montos": [
                {
                    "idPlantaM": "M01",
                    "idMonto": "MON01",
                    "tipo": "Inversión",
                    "descTipo": "Inversión inicial",
                    "cantidad": "1000",
                    "descripcion": "Monto de inversión",
                    "monto": "500000",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ],
            "listaCapacidad": [
                {
                    "idPlantaCa": "CA01",
                    "idCapacidad": "CAP01",
                    "claveServicio": "1",
                    "descripcionServicio": "Servicio de producción",
                    "cveTipoServicio": "TS01",
                    "tipoServicio": "Producción",
                    "fraccion": "FR01",
                    "fraccionVista": "Fracción Vista",
                    "umt": "UMT01",
                    "descripcion": "Capacidad instalada",
                    "capacidadEfectiva": "10000",
                    "calculo": "Manual",
                    "turnos": "3",
                    "horasTurno": "8",
                    "cantidadEmpleados": "50",
                    "cantidadMaquinaria": "10",
                    "descripcionMaquinaria": "Maquinaria industrial",
                    "capacidadMensual": "300000",
                    "capacidadAnual": "3600000",
                    "testado": "1",
                    "descTestado": "Testado OK"
                }
            ],
            "datosEmpleados": [
                {
                    "idPlantaE": "E01",
                    "idEmpleados": "EMP01",
                    "totalEmpleados": "100",
                    "directos": "80",
                    "cedula": "CED123",
                    "fechaCedula": "2024-01-10",
                    "indirectos": "20",
                    "contrato": "ContratoX",
                    "objetoContrato": "Objeto del contrato",
                    "fechaFirma": "2024-01-15",
                    "fechaFinVigencia": "2025-01-15",
                    "rfcEmpresa": "RFCEMP123",
                    "razonEmpresa": "Empresa Empleadora",
                    "testado": "1",
                    "descTestado": "Testado OK"
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
    private tramite80103Store: Tramite80101Store
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
    this.tramiteQuery.selectSeccionState$
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
    this.obtenerDatosDelStore()
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

 /**
 * Construye un arreglo de socios/accionistas a partir de dos listas de entrada,
 * utilizando un objeto base como plantilla y datos complementarios para completar
 * los campos faltantes.
 *
 * @param data Primer arreglo de socios/accionistas.
 * @param base Objeto base que sirve de plantilla para cada elemento del resultado.
 *
 * @returns Un nuevo arreglo que contiene los objetos combinados y mapeados
 *          con la información de los dos arreglos de entrada.
 *
 * @example
 * const socios = buildSociosAccionistas(listaA, listaB, BASE, datos);
 */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
  buildSociosAccionistas(data: Record<string, any>, base: any[]): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
          paginaWeb: data['datosComplimentos'].datosGeneralis.paginaWWeb,
          numeroRegistro: data['datosComplimentos'].formaModificaciones.nombreDeActa,
          capacidadAlmacenaje: data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
          rfc:  data['datosComplimentos'].formaModificaciones.rfc ?? ''
        });
      });
    return RESULT;
  }

  /**
 * Build plantasControladoras by taking the base array
 * and appending the length of each key in empresasSeleccionadas
 * to every planta item.
 *
 * @param array  Object with keys whose values are arrays
 * @param base            Existing plantasControladoras array
 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildComplementosTablaPayload(array: any[], base: unknown[]): unknown[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];

    array.forEach(arr => {
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
          rfc: arr.rfc || arr.taxId,
          correoElectronico: arr.correoElectronico,
          razonSocial: arr.razonSocial,
          nombre: arr.nombre,
          apellidoPaterno: arr.apellidoPaterno,
          apellidoMaterno: arr.apellidoMaterno,
        });
      });
    });
    return RESULT;
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

// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildPlantasSubmanufactureras(arr: any[] = [], base: Record<string, any>, data: any): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MAP_TO_PAYLOAD = (item: any): any => ({
      ...base,
      empresaCalle: item.calle ?? '',
      empresaNumeroInterior: item.numInterior ?? '',
      empresaNumeroExterior: item.numExterior ?? '',
      empresaCodigoPostal: item.codigoPostal ?? '',
      localidad: item.colonia ?? '',
      empresaDelegacionMunicipio: item.delegacionMunicipio ?? '',
      empresaEntidadFederativa: item.entidadFederativa ?? '',
      empresaPais: item.pais ?? '',
      rfc: item.rfc ?? '',
      domicilioFiscal: item.domicilioFiscalSolicitante ?? '',
      razonSocial: item.razonSocial ?? '',
    });

    arr.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

    return RESULT;
}

// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildPlantas(arr: any[] = [], base: Record<string, any>, data: any): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MAP_TO_PAYLOAD = (item: any): any => ({
      ...base,
      estadoEntidad: item.entidadFederativa ?? '',
      cvePaisOrigen: item.pais ?? '',
      rfc: item.rfc ?? '',
      domicilio: item.domicilioFiscalSolicitante ?? '',
      razonSocial: item.razonSocial ?? '',
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
    const SOCIO_ACCIONISTAS = this.buildSociosAccionistas(data, this.socioAccionistaBase);
    const EMPRESAS_NACIONALES = PasoCapturarSolicitudComponent.buildComplementosTablaPayload(data.tablaDatosComplimentos, this.empresasNacionales);
    const EMPRESAS_EXTRANJERAS = PasoCapturarSolicitudComponent.buildComplementosTablaPayload(data.tablaDatosComplimentosExtranjera, this.empresasExtranjeras);
    const PLANTAS = this.buildPlantas(data.tablaDatosFederatarios, this.plantasBase, data);
    const ANEXO_ALL = this.buildAnexo(data);
    const PLANTAS_SUBMANUFACTURERAS = this.buildPlantasSubmanufactureras(data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar, this.plantasSubmanufacturerasBase, data);
    const PLANTAS = this.buildPlantas(data.tablaDatosFederatarios, this.plantasBase, data);
    const PAYLOAD = {
    "tipoDeSolicitud": "guardar",
    "idSolicitud": 202781045,
    "idTipoTramite": 80103,
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
    "discriminator_value": "80103",
    "discriminatorValue": "80103",
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
    "sociosAccionistas": SOCIO_ACCIONISTAS,
    "empresasNacionales": EMPRESAS_NACIONALES,
    "empresasExtranjeras": EMPRESAS_EXTRANJERAS,
    "solicitud": {
        "anexoI": [...ANEXO_ALL.anexo.tableDos]
      }
    };
    this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
      this.tramite80103Store.setIdSolicitud(response.datos.id_solicitud || 0);
      return response;
    });
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
