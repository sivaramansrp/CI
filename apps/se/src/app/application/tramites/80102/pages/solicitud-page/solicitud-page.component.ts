import { Anexo1, ProveedorClienteDatosTabla } from '../../models/autorizacion-programa-nuevo.model';
import {
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  PasoFirmaComponent,
  SeccionLibStore,
  Usuario,
  WizardComponent,
  formatearFechaYyyyMmDd,
} from '@ng-mf/data-access-user';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  PASOS,
  TITULOMENSAJE,
} from '../../constantes/autorizacion-programa-nuevo.enum';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Tramite80102State, Tramite80102Store } from '../../estados/tramite80102.store';
import { AutorizacionProgrmaNuevoService } from '../../services/autorizacion-programa-nuevo.service';
import { CommonModule } from '@angular/common';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { USUARIO_INFO } from '../../enum/enum-80102';
import empresasExtranjeras from '@libs/shared/theme/assets/json/shared/empresas-extranjeras.json';
import empresasNacionales from '@libs/shared/theme/assets/json/shared/empresas-nacionales.json';
import notarios from '@libs/shared/theme/assets/json/shared/notarios.json';
import planta from '@libs/shared/theme/assets/json/shared/planta.json';
import plantasSubmanufactureras from '@libs/shared/theme/assets/json/shared/plantas-submanufactureras.json';
import socioAccionistas from '@libs/shared/theme/assets/json/shared/socio-accionistas.json';
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

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  host: { hostID: crypto.randomUUID().toString() },
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    BtnContinuarComponent,
    PasoTresComponent,
    PasoFirmaComponent
  ],
  standalone: true,
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent implements OnDestroy, OnInit {
  /**
   * Evento que se emite para cargar archivos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de
   */
  cargarArchivosEvento = new EventEmitter<void>();

  /**
   * Identificador del tipo de trámite.
   * @type {number}
   */
  idTipoTRamite: string = '80102';

  /**
   * Información del usuario actual.
   * Se inicializa con los datos definidos en la constante USUARIO_INFO.
   */
  datosUsuario: Usuario = USUARIO_INFO;

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
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje - Título que se muestra en la parte superior del formulario.
   */
  tituloMensaje: string = TITULOMENSAJE;

  /**
   * URL de la página actual.
   */
  public solicitudState!: Tramite80102State;

  /** Listado de empresas nacionales utilizadas en el formulario de solicitud. */
  private empresasNacionales = empresasNacionales;
  
  /** Listado de empresas  extranjeras utilizadas en el formulario de solicitud. */
  private empresasExtranjeras = empresasExtranjeras;

  constructor(
    private seccion: SeccionLibStore,
    private autorizacionProgrmaNuevoService: AutorizacionProgrmaNuevoService,
    private tramite80102Store: Tramite80102Store,
    private tramite80102Query: Tramite80102Query
  ) {
    // Constructor del componente
  }


  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al observable `selectSeccionState$` para escuchar cambios en el estado de la sección,
   * actualizando la propiedad `solicitudState` con el nuevo estado recibido.
   * La suscripción se cancela automáticamente cuando se emite un valor en `destroyNotifier$`,
   * evitando fugas de memoria.
   */
  ngOnInit(): void {
    this.tramite80102Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      ).subscribe();
  }

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /** Indica la visibilidad del botón Guardar. */
  public btnGuardarVisible: string = 'visible';

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se utiliza para referenciar la solicitud en curso.
   */
  idSolicitud: number = 0;

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
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
   * Obtiene el título para cada página según el índice.
   * @method obtenerNombreDelTítulo
   * @param {number} valor - El índice de la página.
   * @returns {void}
   */
  obtenerNombreDelTítulo(valor: number): void {
    switch (valor) {
      case 1:
        this.tituloMensaje = TITULOMENSAJE;
        break;
      case 2:
        this.tituloMensaje = this.pasos[1].titulo;
        break;
      case 3:
        this.tituloMensaje = this.pasos[2].titulo;
        break;
      case 4:
        this.tituloMensaje = this.pasos[3].titulo;
        break;
      default:
        this.tituloMensaje = TITULOMENSAJE;
    }
  }

 /**
   * Objeto base inmutable que representa la estructura inicial de un socio/accionista.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private socioAccionistaBase = socioAccionistas;

  /**
   * Objeto base inmutable que representa la estructura inicial de un plantasSubmanufactureras.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plantasSubmanufacturerasBase: any[] = plantasSubmanufactureras;

  /**
   * Objeto base inmutable que representa la estructura inicial de un planta.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private plantasBase: any[] = planta;

  /**
   * Objeto base inmutable que representa la estructura inicial de un notarios.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private notariosBase: any[] = notarios;

/**
   * Obtiene los datos del store y los guarda utilizando el servicio.
   */
  obtenerDatosDelStore(): void {
    this.autorizacionProgrmaNuevoService.getAllState()
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
  buildSociosAccionistas(data: Record<string, any>, base: Record<string, any>): any {
    return {
      ...base,
      notario: {
        ...base['notario'],
        rfc: data['datosComplimentos'].formaModificaciones.rfc,
        numeroActa: data['datosComplimentos'].formaModificaciones.nombreDeActa,
        numeroNotario: data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
        entidadFederativa: data['datosComplimentos'].formaModificaciones.estado,
        fechaActa: formatearFechaYyyyMmDd(data['datosComplimentos'].formaModificaciones.fechaDeActa)
      },
      modalidad: data['datosComplimentos'].modalidad,
      booleanGenerico: data['datosComplimentos'].programaPreOperativo ? true : false,
      descripcionSistemasMedicion: data['datosComplimentos'].datosGeneralis.paginaWWeb,
      descripcionLugarEmbarque: data['datosComplimentos'].datosGeneralis.localizacion,
      capacidadAlmacenaje: data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
      numeroPermiso: data['datosComplimentos'].obligacionesFiscales.opinionPositiva === 1 ? 'SI' : '',
      fechaOperacion: formatearFechaYyyyMmDd(data['datosComplimentos'].obligacionesFiscales.fechaExpedicion), 
      nomOficialAutorizado: data['datosComplimentos'].formaModificaciones.nombreDelFederatario,

    };
  }

  /** Construye el arreglo de declaraciones de solicitud a partir de los datos proporcionados. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildDeclaracionSolicitudEntries(data: Record<string, any>): unknown[] {
    const RESULT = [
      {
          "acepto": data['datosComplimentos'].obligacionesFiscales.aceptarObligacionFiscal ? 1 : 0,
          "idTipoTramite": 80102,
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

     const proyectoImmexDatos = (item: any) => ({
      tipoDocumento: item.encabezadoTipoDocument,
      descripcion: item.encabezadoDescripcionOtro,
      fechaFirma:  item.encabezadoFechaFirma,
      fechaVigencia:  item.encabezadoFechaVigencia,
      rfcFirmante:  item.encabezadoRfc,
      razonFirmante:  item.encabezadoRazonFirmante,
      testado: true,
      fecFinVigencia:  item.encabezadoFechaVigencia,
    });

  return {
    anexo: {
      ANEXOII: (data.annexoDosTres?.anexoDosTablaLista || []).map(buildAnexoItem),
      ANEXOIII: (data.annexoDosTres?.anexoTresTablaLista || []).map(buildAnexoItem),
      proveedorCliente: (data.annexoUno?.proveedorClienteDatosTabla || []).map(buildProveedorCliente),
      datosParaNavegar: buildDatosParaNavegar(data.annexoUno?.datosParaNavegar || {}),
      tableDos: anexoDos,
      proyectoimex: (data.proyectoImmexTablaLista || []).map(proyectoImmexDatos),
    },
  };
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
  fechaActa: item.fechaInicioInput ?? '',
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
    const DECLARACION_SOLICUTUD_ENTRIES = SolicitudPageComponent.buildDeclaracionSolicitudEntries(data);
    const EMPRESAS_NACIONALES = SolicitudPageComponent.buildComplementosTablaPayload(data.tablaDatosComplimentos, this.empresasNacionales);
    const EMPRESAS_EXTRANJERAS = SolicitudPageComponent.buildComplementosTablaPayload(data.tablaDatosComplimentosExtranjera, this.empresasExtranjeras);
    const PLANTAS = this.buildPlantas(data.plantasImmexTablaLista, this.plantasBase);
    const ANEXO_ALL = this.buildAnexo(data);
    const PLANTAS_SUBMANUFACTURERAS = this.buildPlantasSubmanufactureras(data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar, this.plantasSubmanufacturerasBase);
    const NOTARIOS = this.buildDatosFederatarios(data.tablaDatosFederatarios, this.notariosBase);

    const PAYLOAD = {
      "esDeGuardar": true,
    "tipoDeSolicitud": "guardar",
    "idSolicitud": 202781045,
    "idTipoTramite": 80102,
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
    "discriminator_value": "80102",
    "discriminatorValue": "80102",
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
     "productoExportacionDtoList": [
        {
          "proyectosImmex": [...ANEXO_ALL.anexo.proyectoimex]
        }
      ],
    "plantasSubmanufactureras": [...PLANTAS_SUBMANUFACTURERAS],
    "solicitud": SOLICITUD,
    "declaracionSolicitudEntities": DECLARACION_SOLICUTUD_ENTRIES,
    "empresasNacionales": EMPRESAS_NACIONALES,
    "empresasExtranjeras": EMPRESAS_EXTRANJERAS,
}
    this.autorizacionProgrmaNuevoService.guardarDatosPost(PAYLOAD).subscribe(response => {
      this.tramite80102Store.setIdSolicitud(response.datos.id_solicitud || 0);
      return response;
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
