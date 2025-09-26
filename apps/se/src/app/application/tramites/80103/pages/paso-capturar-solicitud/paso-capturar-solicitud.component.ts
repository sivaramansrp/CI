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
import { AVISO, Usuario, esValidObject, formatearFechaYyyyMmDd, getValidDatos } from '@ng-mf/data-access-user'
import { AccionBoton, Anexo1, ProveedorClienteDatosTabla } from '../../models/nuevo-programa-industrial.model';
import { Component, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, PASOS4, SeccionLibStore, WizardComponent } from '@libs/shared/data-access-user/src';
import { Subject, finalize, map, switchMap, take, tap } from 'rxjs';
import { Tramite80101State, Tramite80101Store } from '../../estados/tramite80101.store';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { ToastrService } from 'ngx-toastr';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { USUARIO_INFO } from '../../constantes/nuevo-programa.enum';
import complimentos from '@libs/shared/theme/assets/json/shared/complimentos.json';
import empresasExtranjeras from '@libs/shared/theme/assets/json/shared/empresas-extranjeras.json';
import empresasNacionales from '@libs/shared/theme/assets/json/shared/empresas-nacionales.json';
import notarios from '@libs/shared/theme/assets/json/shared/notarios.json';
import planta from '@libs/shared/theme/assets/json/shared/planta.json';
import plantasSubmanufactureras from '@libs/shared/theme/assets/json/shared/plantas-submanufactureras.json';
import sociosAccionistas from '@libs/shared/theme/assets/json/shared/socios-accionistas.json';
import { takeUntil } from 'rxjs';

/*
*  * Componente para gestionar el paso de captura de solicitud en el trámite 80103.
*  * Este componente utiliza el componente WizardComponent para permitir la navegación entre
*/

@Component({
  selector: 'app-paso-capturar-solicitud',
  templateUrl: './paso-capturar-solicitud.component.html',
  providers: [ToastrService],
})
/**
 * Clase que representa el componente de captura de solicitud.
 * Este componente gestiona el flujo del wizard para la captura de la solicitud en el trámite 80103.
 */
export class PasoCapturarSolicitudComponent implements OnDestroy, OnInit {

  /** 
   * Indica si el componente padre es BtnContinuarComponent. 
   */
  padreBtn: boolean = true;
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

  idSolicitud: number = 0;
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
  private complimentosBase = complimentos;

  /** Listado de empresas nacionales utilizadas en el formulario de solicitud. */
  private empresasNacionales = empresasNacionales;

  /** Listado de empresas  extranjeras utilizadas en el formulario de solicitud. */
  private empresasExtranjeras = empresasExtranjeras;

  /**
   * Objeto base inmutable que representa la estructura inicial de un plantas.
   */
  private plantasBase = planta;

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
  * Objeto base inmutable que representa la estructura inicial de un sociosAccionistas.
  */
  private sociosAccionistas = sociosAccionistas;

  /**
  * URL de la página actual.
  */
  public solicitudState!: Tramite80101State;

  /**
   * Almacena la información del usuario actual.
   * Contiene los datos del usuario que está utilizando el sistema, obtenidos de la constante USUARIO_INFO.
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
   * Texto del aviso de privacidad simplificado.
   */
  TEXTOS = AVISO.Aviso;


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
    private tramite80103Store: Tramite80101Store,
    private toastrService: ToastrService,
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
  this.nuevoProgramaIndustrialService.getAllState()
    .pipe(
      take(1),
      switchMap((data) => this.guardar(data)),
      tap(response => {
        shouldNavigate = response.codigo === '00';
        if(shouldNavigate) {
          this.padreBtn = false;
          this.toastrService.success(response.mensaje);
        } else {
          this.padreBtn = true;
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
  buildComplimentos(data: Record<string, any>, base: Record<string, any>): any {
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
  buildSociosAccionistas(arr1: any[] = [], arr2: any[] = [], base: Record<string, any>): any[] {
    const BASE_OBJECT = base[0];
    const CLONED_BASE = structuredClone ? structuredClone(BASE_OBJECT) : JSON.parse(JSON.stringify(BASE_OBJECT));
    const MAP_TO_PAYLOAD = (item: Record<string, unknown>): Record<string, unknown> => ({
      ...CLONED_BASE,
      nombre: item['nombre'] ?? '',
      apellidoPaterno: item['apellidoPaterno'] ?? '',
      apellidoMaterno: item['apellidoMaterno'] ?? '',
      rfc: item['rfc'] ?? '',
      correoElectronico: item['correoElectronico'] ?? '',
      razonSocial: item['razonSocial'] ?? '',
      estadoEvaluacionEntidad: item['estado'] ?? '',
      estadoEntidad: item['estado'] ?? '',
      cvePaisOrigen: item['pais'] ?? '',
      rfcExtranjero: item['taxId'] ?? '',
      domicilio: {
        codigoPostal: item['codigoPostal'] ?? '',
      }
    });

    return [...arr1.map(MAP_TO_PAYLOAD), ...arr2.map(MAP_TO_PAYLOAD)];
  }

  /** Construye el arreglo de declaraciones de solicitud a partir de los datos proporcionados. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildDeclaracionSolicitudEntries(data: Record<string, any>): unknown[] {
    const RESULT = [
      {
        "acepto": data['datosComplimentos'].obligacionesFiscales.aceptarObligacionFiscal ? 1 : 0,
        "idTipoTramite": 80103,
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

/**
 * Construye un arreglo de objetos de plantas basado en una estructura base común.
 * 
 * @param arr Arreglo de datos de entrada para cada planta.
 * @param base Objeto base que se combina con los datos específicos de cada planta.
 * @returns Un nuevo arreglo de objetos con la información estructurada de cada planta.
 */
    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any, default-param-last
  buildPlantas(array: any[] = [], base: unknown[]): unknown[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    array.forEach(arr => {
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
      idPlanta: arr.planta ?? '',
      calle: arr.calle ?? '',
      numeroExterior: arr.numeroExterior ?? '',
      numeroInterior: arr.numeroInterior ?? '',
      codigoPostal: arr.codigoPostal ?? '',
      localidad: arr.localidad ?? '',
      colonia: arr.colonia ?? '',
      delegacionMunicipio: arr.delegacionMunicipio ?? '',
      entidadFederativa: arr.entidadFederativa ?? '',
      pais: arr.pais ?? '',
      rfc: arr.registroFederalDeContribuyentes ?? '',
      domicilioFiscal: arr.domicilioDelSolicitante ?? '',
      razonSocial: arr.razonSocial ?? '',
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
        tipoFraccion: item.encabezadoTipo,
        umt: item.encabezadoUmt
      });
    });

    const proyectoImmexDatos = (item: any) => ({
      tipoDocumento: item.encabezadoTipoDocument,
      descripcion: item.encabezadoDescripcionOtro,
      fechaFirma: item.encabezadoFechaFirma,
      fechaVigencia: item.encabezadoFechaVigencia,
      rfcFirmante: item.encabezadoRfc,
      razonFirmante: item.encabezadoRazonFirmante,
      testado: true,
      fecFinVigencia: item.encabezadoFechaVigencia,
    });

     const buildProveedorClienteDos = (item: ProveedorClienteDatosTabla) => ({
              paisOrigen: item.paisOrigen,
              rfcProveedor: item.rfcProveedor,
              razonProveedor: item.razonProveedor,
              paisDestino: item.paisDestino,
              rfcCliente: item.rfcClinte,
              razonCliente: item.razonSocial,
              domicilio: item.domicilio,
              descTestado: item.descTestado,
            });

    return {
      anexo: {
        ANEXOII: (data.annexoDosTres?.anexoDosTablaLista || []).map(buildAnexoItem),
        ANEXOIII: (data.annexoDosTres?.anexoTresTablaLista || []).map(buildAnexoItem),
        proveedorCliente: (data.annexoUno?.proveedorClienteDatosTabla || []).map(buildProveedorCliente),
        datosParaNavegar: buildDatosParaNavegar(data.annexoUno?.datosParaNavegar || {}),
        tableDos: anexoDos,
        proyectoimex: (data.proyectoImmexTablaLista || []).map(proyectoImmexDatos),
        proveedorClienteDos: (data.annexoUno?.proveedorClienteDatosTablaDos || []).map(buildProveedorClienteDos),
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
  buildPlantasSubmanufactureras(array: any[] = [], base: unknown[]): unknown[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    array.forEach(arr => {
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
      empresaCalle: arr.calle ?? '',
      empresaNumeroInterior: arr.numInterior ?? '',
      empresaNumeroExterior: arr.numExterior ?? '',
      empresaCodigoPostal: arr.codigoPostal ?? '',
      localidad: arr.colonia ?? '',
      empresaDelegacionMunicipio: arr.delegacionMunicipio ?? '',
      empresaEntidadFederativa: arr.entidadFederativa ?? '',
      empresaPais: arr.pais ?? '',
      rfc: arr.rfc ?? '',
      domicilioFiscal: arr.domicilioFiscalSolicitante ?? '',
      razonSocial: arr.razonSocial ?? '',
       datosComplementarios: Array.isArray((ITEM as any)?.datosComplementarios)
          ? (ITEM as any).datosComplementarios.map((dc:any) => ({
              idPlantaC: dc.idPlantaC ?? '',
              idDato: dc.idDato ?? '',
              amparoPrograma: dc.amparoPrograma ?? '',              
            }))
          : []
        });
      });
    });
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
  buildDatosFederatarios(array: any[] = [], base: unknown[]): unknown[] {
    const RESULT: any[] = [];
    array.forEach(arr => {
      base.forEach(item => {
        const ITEM = (item && typeof item === 'object') ? item : {};
        RESULT.push({
          ...ITEM,
      nombreNotario: arr.nombre ?? '',
      apellidoMaterno: arr.segundoApellido ?? '',
      apellidoPaterno: arr.primerApellido ?? '',
      numeroActa: arr.numeroDeActa ?? '',
      fechaActa: arr.fechaDelActa ?? '',
      numeroNotaria: arr.numeroDeNotaria ?? '',
      entidadFederativa: arr.estado ?? '',
      delegacionMunicipio: arr.estadoOptions ?? '',
        });
      });
    });
    return RESULT;
  }

  /**
   * Guarda los datos proporcionados enviándolos al servidor mediante el servicio `nuevoProgramaIndustrialService`.
   * 
   * @param data - Los datos que se desean guardar y enviar al servidor.
   * @returns void
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  guardar(data: any): Promise<any> {
    const SOLICITUD = this.buildComplimentos(data, this.complimentosBase);
    const DECLARACION_SOLICUTUD_ENTRIES = PasoCapturarSolicitudComponent.buildDeclaracionSolicitudEntries(data);
    const PLANTAS = this.buildPlantas(data.plantasImmexTablaLista, this.plantasBase);
    const ANEXO_ALL = this.buildAnexo(data);
    const PLANTAS_SUBMANUFACTURERAS = this.buildPlantasSubmanufactureras(data.empressaSubFabricantePlantas.plantasSubfabricantesAgregar, this.plantasSubmanufacturerasBase);
    const NOTARIOS = this.buildDatosFederatarios(data.tablaDatosFederatarios, this.notariosBase);
    const SOCIOS_ACCIONISTAS = this.buildSociosAccionistas(data.tablaDatosComplimentos, data.tablaDatosComplimentosExtranjera, this.sociosAccionistas);

    const PAYLOAD = {
      "esDeGuardar": true,
      "tipoDeSolicitud": "guardar",
      "idSolicitud": 0,
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
      "notario": [...NOTARIOS],
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
      "fraccionArancelaria":[
        {
          "listaProveedores": [...ANEXO_ALL.anexo.proveedorClienteDos]
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
      "sociosAccionistas": [...SOCIOS_ACCIONISTAS],
    };

    return new Promise((resolve, reject) => {
      this.nuevoProgramaIndustrialService.guardarDatosPost(PAYLOAD).subscribe(response => {
        if(esValidObject(response) && esValidObject(response.datos)) {
          if(getValidDatos(response.datos.id_solicitud)) {
            this.tramite80103Store.setIdSolicitud(response.datos.id_solicitud);
          } else {
            this.tramite80103Store.setIdSolicitud(0);
          }
        }
        resolve(response);
      }, error => {
        reject(error);
      });
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
   * Método que se ejecuta al destruir el componente.
   * Utiliza un Subject para notificar a todos los observables suscritos que deben completarse.
   * Esto ayuda a evitar posibles fugas de memoria al completar el Subject y finalizar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
