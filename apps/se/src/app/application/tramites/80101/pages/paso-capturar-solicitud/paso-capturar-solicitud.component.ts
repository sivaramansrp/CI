import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, WizardComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Tramite80101State, Tramite80101Store } from '../../estados/tramite80101.store';
import { NuevoProgramaIndustrialService } from '../../services/nuevo-programa-industrial.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import empresasExtranjeras from '@libs/shared/theme/assets/json/shared/empresas-extranjeras.json';
import empresasNacionales from '@libs/shared/theme/assets/json/shared/empresas-nacionales.json';
import socioAccionistas from '@libs/shared/theme/assets/json/shared/socio-accionistas.json';
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
})
export class PasoCapturarSolicitudComponent implements OnInit {
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private socioAccionistaBase: any[] = socioAccionistas;

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

  private empresasNacionales = empresasNacionales;
  private empresasExtranjeras = empresasExtranjeras;

  /**
  * URL de la página actual.
  */
  public solicitudState!: Tramite80101State;
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
  constructor(private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService, private tramite80101Store: Tramite80101Store, private tramite80101Query: Tramite80101Query) {
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
    this.tramite80101Query.selectSeccionState$
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
    this.obtenerDatosDelStore();
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


  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
   * 
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns void
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guardar(data: any): void {
    const PLANTAS_SUBMANUFACTURERAS = data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar.map((item: any) => ({
      idDomicilio: 0,
      calle: item.calle,
      numeroExterior: item.numExterior,
      numeroInterior: item.numInterior,
      codigoPostal: item.codigoPostal,
      informacionExtra: item.informacionExtra ?? '',
      clave: item.clave ?? '',
      cveLocalidad: item.cveLocalidad ?? '',
      cveDelegMun: item.delegacionMunicipio ?? '',
      cveEntidad: item.entidadFederativa ?? '',
      cvePais: item.pais ?? '',
      ciudad: item.ciudad ?? '',
      telefono: item.telefono ?? '',
      fax: item.fax ?? '',
      municipio: item.municipio ?? '',
      colonia: item.colonia ?? '',
      descUbicacion: item.descUbicacion ?? '',
      cveCatalogo: item.cveCatalogo ?? '',
      telefonos: item.telefonos ?? '',
      tipoDomicilio: item.domicilioFiscalSolicitante ?? ''
    }));
const PLANTAS = this.buildPlantas(data.tablaDatosFederatarios, this.plantasBase, data);


    const SOCIO_ACCIONISTAS = this.buildSociosAccionistas(data, this.socioAccionistaBase);
    const EMPRESAS_NACIONALES = PasoCapturarSolicitudComponent.buildComplementosTablaPayload(data.tablaDatosComplimentos, this.empresasNacionales);
    const EMPRESAS_EXTRANJERAS = PasoCapturarSolicitudComponent.buildComplementosTablaPayload(data.tablaDatosComplimentosExtranjera, this.empresasExtranjeras);
    const ANEXO_ALL = this.buildAnexo(data);
    const PAYLOAD = {
    "tipoDeSolicitud": "guardar",
    "idSolicitud": 202781045,
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

    }
    this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
      this.tramite80101Store.setIdSolicitud(response.datos.id_solicitud || 0);
      return response;
    });
  }

}
