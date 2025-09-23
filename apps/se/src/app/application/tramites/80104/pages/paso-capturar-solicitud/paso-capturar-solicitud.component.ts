import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, Usuario, WizardComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Tramite80101State, Tramite80101Store } from '../../estados/tramite80101.store';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { USUARIO_INFO } from '../../constantes/nuevo-programa.enum';
import basePlantasControladoras from '@libs/shared/theme/assets/json/80104/basePlantasControladoras.json';
import empresasExtranjeras from '@libs/shared/theme/assets/json/shared/empresas-extranjeras.json';
import empresasNacionales from '@libs/shared/theme/assets/json/shared/empresas-nacionales.json';
import notarios from '@libs/shared/theme/assets/json/shared/notarios.json';
import planta from '@libs/shared/theme/assets/json/shared/planta.json';
import plantasSubmanufactureras from '@libs/shared/theme/assets/json/shared/plantas-submanufactureras.json';
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
   * Se inicializa en 0 y se utiliza para referenciar la solicitud en curso.
   */
  idSolicitud: number = 0;

  activarBotonCargaArchivos: boolean = false;

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

  /**
   * Datos del usuario actual del sistema.
   * 
   * Contiene la información del usuario que está utilizando la aplicación,
   * incluyendo datos personales, permisos y configuraciones específicas.
   * Se inicializa con los valores predeterminados definidos en USUARIO_INFO.
   * 
   * @type {Usuario}
   * @memberof PasoCapturarSolicitudComponent
   * @see {@link USUARIO_INFO} - Constante que contiene los datos predeterminados del usuario
   * 
   * @example
   * ```typescript
   * // Acceder a los datos del usuario
   * console.log(this.datosUsuario.nombre);
   * console.log(this.datosUsuario.email);
   * 
   * // Modificar datos del usuario
   * this.datosUsuario = { ...this.datosUsuario, nombre: 'Nuevo Nombre' };
   * ```
   */
  datosUsuario: Usuario = USUARIO_INFO;
  

  /** Indica si el botón Guardar debe mostrarse o estar habilitado en el formulario. */
  public btnGuardar: boolean = true;

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
   * Objeto base inmutable que representa la estructura inicial de un socio/accionista.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private socioAccionistaBase = socioAccionistas;

   /** Listado de empresas nacionales utilizadas en el formulario de solicitud. */
  private empresasNacionales = empresasNacionales;
  
  /** Listado de empresas  extranjeras utilizadas en el formulario de solicitud. */
  private empresasExtranjeras = empresasExtranjeras;

  private basePlantasControladoras: unknown[] = Array.isArray(basePlantasControladoras) ? basePlantasControladoras : [];

  /**
   * Objeto base inmutable que representa la estructura inicial de un plantas.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plantasBase: any[] = planta;

  /**
   * Objeto base inmutable que representa la estructura inicial de un plantasSubmanufactureras.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plantasSubmanufacturerasBase: any[] = plantasSubmanufactureras;

  /**
   * Objeto base inmutable que representa la estructura inicial de un notarios.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private notariosBase: any[] = notarios;

   /**
   * URL de la página actual.
   */
  public solicitudState!: Tramite80101State;

  /**
 * Indica si la sección de carga de documentos está activa.
 * Se inicializa en true para mostrar la sección de carga de documentos al inicio.
 */
  seccionCargarDocumentos: boolean = true;
   /**
     * Evento que se emite para cargar archivos.
     * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
     */
    cargarArchivosEvento = new EventEmitter<void>();
  
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
  constructor(private nuevoProgramaIndustrialService: NuevoProgramaIndustrialService,
    private tramite80104Store: Tramite80101Store,private tramite80104Query: Tramite80101Query,) {
  //
  }


   /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable `selectSeccionState$` para escuchar cambios en el estado de la sección,
   * actualizando la propiedad `solicitudState` con el nuevo estado recibido.
   * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`,
   * evitando fugas de memoria.
   */
ngOnInit(): void {
    this.tramite80104Query.selectSolicitud$
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
  * Método para manejar el evento de carga de documentos.
  * Actualiza el estado del botón de carga de archivos.
  *  carga - Indica si la carga de documentos está activa o no.
  * {void} No retorna ningún valor.
  */
  manejaEventoCargaDocumentos(carga: boolean): void {
    this.activarBotonCargaArchivos = carga;
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
 * Construye un arreglo de objetos con los datos de plantas submanufactureras a partir de un arreglo de entrada.
 *
 * @param arr Arreglo de objetos con datos de entrada (opcional).
 * @param base Objeto base que se fusiona con los datos específicos de cada planta.
 * @returns Un arreglo con los objetos estructurados de plantas submanufactureras.
 */
// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildPlantasSubmanufactureras(arr: any[] = [], base: Record<string, any>): any[] {
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
      empresaDelegacionMunicipio: item.municipio ?? '',
      empresaEntidadFederativa: item.entidadFederativa ?? '',
      empresaPais: item.pais ?? '',
      rfc: item.rfc ?? '',
      domicilioFiscal: item.domicilioFiscal ?? '',
      razonSocial: item.razonSocial ?? '',
    });

        arr.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

    return RESULT;
}

/**
 * Construye un arreglo de objetos de plantas basado en una estructura base común.
 * 
 * @param arr Arreglo de datos de entrada para cada planta.
 * @param base Objeto base que se combina con los datos específicos de cada planta.
 * @returns Un nuevo arreglo de objetos con la información estructurada de cada planta.
 */
// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildPlantas(arr: any[] = [], base: Record<string, any>): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const MAP_TO_PAYLOAD = (item: any): any => ({
  ...base,
  idPlanta: item.planta ?? '',
  calle: item.calle ?? '',
  numeroExterior: item.numeroExterior ?? '',
  numeroInterior: item.numeroInterior ?? '',
  codigoPostal: item.codigoPostal ?? '',
  localidad: item.localidad ?? '',
  colonia: item.colonia ?? '',
  delegacionMunicipio: item.delegacionMunicipio ?? '',
  entidadFederativa: item.entidadFederativa ?? '',
  pais: item.pais ?? '',
  rfc: item.registroFederalDeContribuyentes ?? '',
  domicilioFiscal: item.domicilioDelSolicitante ?? '',
  razonSocial: item.razonSocial ?? '',
});
      

    arr.forEach(row => RESULT.push(MAP_TO_PAYLOAD(row)));

    return RESULT;
}

/**
 * Genera un arreglo de objetos con los datos de fedatarios a partir de un arreglo de entrada.
 *
 * @param arr Arreglo de objetos con datos de entrada (opcional).
 * @param base Objeto base que se fusiona con los datos específicos de cada fedatario.
 * @returns Un arreglo de objetos estructurados con la información de los fedatarios.
 */
// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
buildDatosFederatarios(arr: any[] = [], base: Record<string, any>): any[] {
  const RESULT: any[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const MAP_TO_PAYLOAD = (item: any): any => ({
  ...base,
  nombreNotario: item.nombre ?? '',
  apellidoMaterno: item.segundoApellido ?? '',
  apellidoPaterno: item.primerApellido ?? '',
  numeroActa: item.numeroDeActa ?? '',
  fechaActa: item.fechaDelActa ?? '',
  numeroNotaria: item.numeroDeNotaria ?? '',
  entidadFederativa: item.estado ?? '',
  delegacionMunicipio: item.estadoOptions ?? '',
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
    const SOLICITUD = this.buildSociosAccionistas(data, this.socioAccionistaBase);
    const DECLARACION_SOLICUTUD_ENTRIES = PasoCapturarSolicitudComponent.buildDeclaracionSolicitudEntries(data);
    const EMPRESAS_NACIONALES = PasoCapturarSolicitudComponent.buildComplementosTablaPayload(data.tablaDatosComplimentos, this.empresasNacionales);
    const EMPRESAS_EXTRANJERAS = PasoCapturarSolicitudComponent.buildComplementosTablaPayload(data.tablaDatosComplimentosExtranjera, this.empresasExtranjeras);
    const PLANTAS_CONTROLADORAS = PasoCapturarSolicitudComponent.buildPlantasControladoras(data.empresasSeleccionadas, this.basePlantasControladoras);
    const PLANTAS = this.buildPlantas(data.plantasImmexTablaLista, this.plantasBase);
    const ANEXO_ALL = this.buildAnexo(data);
    const PLANTAS_SUBMANUFACTURERAS = this.buildPlantasSubmanufactureras(data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar, this.plantasSubmanufacturerasBase);
    const NOTARIOS = this.buildDatosFederatarios(data.tablaDatosFederatarios, this.notariosBase);
    
    const PAYLOAD = {
    "tipoDeSolicitud": "guardar",
    "idSolicitud": 202781045,
    "idTipoTramite": 80104,
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
    "discriminator_value": "80104",
    "discriminatorValue": "80104",
     "domicilio": {
    },
    "solicitante": {
        
    },
      "planta": [...PLANTAS],
      "notario":[...NOTARIOS],
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
           "anexoI": [...ANEXO_ALL.anexo.tableDos]
        }
    ],
    "plantasSubmanufactureras": [...PLANTAS_SUBMANUFACTURERAS],
    "solicitud": SOLICITUD,
    "declaracionSolicitudEntities": DECLARACION_SOLICUTUD_ENTRIES,
    "empresasNacionales": EMPRESAS_NACIONALES,
    "empresasExtranjeras": EMPRESAS_EXTRANJERAS,
    "plantasControladoras": PLANTAS_CONTROLADORAS
    };

    this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
      this.tramite80104Store.setIdSolicitud(response.datos.id_solicitud || 0);
      return response;
    });
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
  static buildPlantasControladoras(empresasSeleccionadas: any[], basePlantas: unknown[]): unknown[] {
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
  buildSociosAccionistas(data: Record<string, any>, base: Record<string, any>): any {
    return {
      ...base,
      notario: {
        ...base['notario'],
        rfc: data['datosComplimentos'].formaModificaciones.rfc,
        numeroActa: data['datosComplimentos'].formaModificaciones.nombreDeActa,
        numeroNotario: data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
        entidadFederativa: data['datosComplimentos'].formaModificaciones.estado,
        fechaActa: data['datosComplimentos'].formaModificaciones.fechaDeActa
      },
      modalidad: data['datosComplimentos'].modalidad,
      booleanGenerico: data['datosComplimentos'].programaPreOperativo ? true : false,
      descripcionSistemasMedicion: data['datosComplimentos'].datosGeneralis.paginaWWeb,
      descripcionLugarEmbarque: data['datosComplimentos'].datosGeneralis.localizacion,
      capacidadAlmacenaje: data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
      numeroPermiso: data['datosComplimentos'].obligacionesFiscales.opinionPositiva === 1 ? 'SI' : '',
      fechaOperacion: data['datosComplimentos'].obligacionesFiscales.fechaExpedicion,
      nomOficialAutorizado: data['datosComplimentos'].formaModificaciones.nombreDelFederatario,

    };
  }

  /** Construye el arreglo de declaraciones de solicitud a partir de los datos proporcionados. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildDeclaracionSolicitudEntries(data: Record<string, any>): unknown[] {
    const RESULT = [
      {
          "acepto": data['datosComplimentos'].obligacionesFiscales.aceptarObligacionFiscal ? 1 : 0,
          "idTipoTramite": 80104,
          "cveDeclaracion": "123"
      }
    ];
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
          domicilioSolicitud: {
            codigoPostal: arr.codigoPostal || arr.cp,
            informacionExtra: arr.estado
          }
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
   * Método para manejar el evento de carga de documentos.
   * Actualiza el estado de la sección de carga de documentos.
   *  cargaRealizada - Indica si la carga de documentos se realizó correctamente.
   * {void} No retorna ningún valor.
   */
  cargaRealizada(cargaRealizada: boolean): void {
    this.seccionCargarDocumentos = cargaRealizada ? false : true;
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
}
