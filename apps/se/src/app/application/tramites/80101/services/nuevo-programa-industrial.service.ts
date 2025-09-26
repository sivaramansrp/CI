import {
  Anexo1,
  InfoServicios,
  ProveedorClienteDatosTabla,
  Servicio
} from '../models/nuevo-programa-industrial.model';
import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import {
  HttpCoreService,
  formatearFechaDdMmYyyy,
  formatearFechaYyyyMmDd,
} from '@libs/shared/data-access-user/src';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  Tramite80101State,
  Tramite80101Store,
} from '../estados/tramite80101.store';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { BehaviorSubject } from 'rxjs';
import { CadenaOriginalRequest } from '../../130118/model/request/cadena-original-request.model';
import { CatalogoDatosIdx } from '../../../shared/models/federatarios-y-plantas.model';
import { ComplimentosService } from '../../../shared/services/complimentos.service';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PROC_80101 } from '../servers/api-route';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';
import { Tramite80101Query } from '../estados/tramite80101.query';

/**
 * Servicio para gestionar las operaciones relacionadas con el programa industrial.
 * Este servicio proporciona métodos para obtener datos desde archivos JSON locales,
 * actualizar el estado del formulario y realizar otras operaciones relacionadas con el programa industrial.
 */
@Injectable({
  providedIn: 'root',
})
export class NuevoProgramaIndustrialService {
  /**
   * Subject que mantiene el estado actual sobre si la tabla tiene datos.
   * Permite la suscripción reactiva a los cambios en la presencia de datos en la tabla.
   */
  private _tieneDatosDeTabla$ = new BehaviorSubject<boolean>(false);

  /**
   * Observable que expone el estado de si la tabla tiene datos.
   * Se utiliza para que otros componentes puedan reaccionar a los cambios sin modificar el estado directamente.
   */
  public tieneDatosDeTabla$ = this._tieneDatosDeTabla$.asObservable();

  /**
   * Constructor de la clase NuevoProgramaIndustrialService.
   *
   * @param http - Cliente HTTP utilizado para realizar solicitudes HTTP al servidor.
   */
  constructor(
    private readonly http: HttpClient,
    public tramite80101Store: Tramite80101Store,
    public httpService: HttpCoreService,
    private Tramite80101Query: Tramite80101Query,
    private complimentosService: ComplimentosService
  ) {
    // No se necesita lógica de inicialización adicional.
    this.setProcedure();
    this.setProcedureNo();
  }

  setProcedureNo(): void {
    this.complimentosService.setProcedureNo('80101');
  }

  /**
   * Actualiza el estado interno indicando si la tabla tiene datos.
   * Emite el nuevo valor a todos los suscriptores del observable correspondiente.
   */
  setTieneDatosDeTabla(value: boolean): void {
    this._tieneDatosDeTabla$.next(value);
  }

  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
  getDatos(): Observable<InfoServicios> {
    return (
      this.http
        .get<Servicio[]>('assets/json/80205/ampliacion-servicios.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res.data.InfoServicios))
    );
  }

  /**
   * Obtiene la lista de selección de ingreso desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
  obtenerIngresoSelectList(): Observable<Catalogo[]> {
    return (
      this.http
        .get<Catalogo[]>('assets/json/80205/ampliacion-IMMEX-dropdown.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res.data))
    );
  }

  /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<RespuestaCatalogos>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/80207/estado-datos.json'
    );
  }

  /**
   * Obtiene la lista de subfabricantes disponibles.
   * @method getSubfabricantesDisponibles
   * @returns {Observable<TableData>} Observable con la lista de subfabricantes disponibles.
   */
  getSubfabricantesDisponibles(): Observable<PlantasSubfabricante[]> {
    return this.http
      .get<PlantasSubfabricante[]>(
        'assets/json/80207/submanufactureras-disponibles-datos.json'
      )

      .pipe(map((response: PlantasSubfabricante[]) => response));
  }

  /**
   * Obtiene la cadena original del trámite 130118.
   * @param body Objeto que contiene los datos necesarios para generar la cadena original.
   * @returns Un observable que emite la respuesta del servidor con la cadena original.
   */
  obtenerCadenaOriginal<T>(
    idSolicitud: string,
    body: CadenaOriginalRequest
  ): Observable<BaseResponse<T>> {
    return this.http
      .post<BaseResponse<T>>(
        PROC_80101.API_POST_CADENA_ORIGINAL(idSolicitud),
        body
      )
      .pipe(
        map((response) => response),
        catchError(() => {
          const ERROR = new Error(
            `Error al obtener la cadena original en ${PROC_80101.API_POST_CADENA_ORIGINAL(
              idSolicitud
            )}`
          );
          return throwError(() => ERROR);
        })
      );
  }

  /**
   * Envía una solicitud de firma electrónica.
   * @param idSolicitud - ID de la solicitud a firmar.
   * @param body - Cuerpo de la solicitud de firma.
   * @returns Observable con la respuesta del servidor.
   */
  enviarFirma<T>(
    idSolicitud: string | number,
    body: FirmarRequest
  ): Observable<BaseResponse<T>> {
    return this.http
      .post<BaseResponse<T>>(
        PROC_80101.API_POST_FIRMA(String(idSolicitud)),
        body
      )
      .pipe(
        map((response) => response),
        catchError(() => {
          const ERROR = new Error(
            `Error al firmar solicitud con ID ${idSolicitud}`
          );
          return throwError(() => ERROR);
        })
      );
  }

  /**
   * Obtiene los datos de complementos desde un archivo JSON local.
   *
   * @returns Un observable que emite los datos de tipo `DatosComplimentos`.
   */
  obtenerComplimentos(): Observable<DatosComplimentos> {
    return (
      this.http
        .get<DatosComplimentos>('assets/json/80102/datos-complimentos.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res))
    );
  }
  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   *
   * @param DATOS - Estado de la solicitud `Solicitud230401State` con la información
   *                del tipo de solicitud a actualizar en el store.
   */

  actualizarEstadoFormulario(DATOS: unknown): void {
    const DATOS_COMPLIMENTOS = this.reverseBuildComplimentos(DATOS) as DatosComplimentos;
    this.tramite80101Store.setDatosComplimentos(DATOS_COMPLIMENTOS);
    console.log('After update:', this.tramite80101Store.getValue());
  }

  /**
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   *
   * @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
   *          cargados desde el archivo JSON especificado en la ruta de `assets`.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite80101State> {
    return this.http.get<Tramite80101State>(
      'assets/json/80101/respuestaDeActualizacionDe.json'
    );
  }

  /**
   * Obtiene los datos del catálogo de federatarios y plantas desde un archivo JSON local.
   *
   * Este método realiza una solicitud HTTP GET para recuperar los datos del catálogo
   * almacenados en el archivo `federatarios-y-plantas-catalogos.json` ubicado en la
   * carpeta de activos (`assets/json/80101/`). Los datos recuperados se devuelven como
   * un observable de tipo `CatalogoDatosIdx`.
   *
   * @returns {Observable<CatalogoDatosIdx>} Un observable que emite los datos del catálogo
   * de federatarios y plantas.
   *
   * @example
   * this.nuevoProgramaIndustrialService.getFederataiosyPlantaCatalogosData()
   *   .subscribe((datos: CatalogoDatosIdx) => {
   *     console.log('Datos del catálogo:', datos);
   *   });
   *
   * @remarks
   * Este método es útil para cargar información estática de catálogos que se utiliza
   * en la aplicación, como listas de federatarios y plantas. Asegúrese de que el archivo
   * JSON exista en la ubicación especificada para evitar errores de carga.
   */
  getFederataiosyPlantaCatalogosData(): Observable<CatalogoDatosIdx> {
    return this.http.get<CatalogoDatosIdx>(
      'assets/json/80101/federatarios-y-plantas-catalogos.json'
    );
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<Tramite80101State>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite80101State> {
    return this.Tramite80101Query.allStoreData$;
  }

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   *
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */
  guardarDatosPost(body: any): Observable<any> {
    return this.httpService.post<any>(PROC_80101.GUARDAR, { body: body });
  }

  /**
   * Establece el procedimiento actual para la gestión de trámites industriales.
   * Asigna el identificador de procedimiento 'st_t80101' y lo configura en el servicio de cumplimientos.
   *
   * @returns {void} No retorna ningún valor.
   */
  setProcedure(): void {
    const PROCEDURE = 'sat-t80101';
    this.complimentosService.setProcedure(PROCEDURE);
  }

  fetchMostrarDatos(body: {
    idSolicitud: number;
    idSolicitudSeleccionada: string;
  }): Observable<unknown> {
    return this.httpService.post<{
      idSolicitud: number;
      idSolicitudSeleccionada: string;
    }>(PROC_80101.MOSTRAR, { body: body });
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
        numeroNotario:
          data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
        entidadFederativa: data['datosComplimentos'].formaModificaciones.estado,
        fechaActa: formatearFechaYyyyMmDd(
          data['datosComplimentos'].formaModificaciones.fechaDeActa
        ),
      },
      modalidad: data['datosComplimentos'].modalidad,
      booleanGenerico: data['datosComplimentos'].programaPreOperativo
        ? true
        : false,
      descripcionSistemasMedicion:
        data['datosComplimentos'].datosGeneralis.paginaWWeb,
      descripcionLugarEmbarque:
        data['datosComplimentos'].datosGeneralis.localizacion,
      capacidadAlmacenaje:
        data['datosComplimentos'].formaModificaciones.nombreDeNotaria,
      numeroPermiso:
        data['datosComplimentos'].obligacionesFiscales.opinionPositiva === 1
          ? 'SI'
          : '',
      fechaOperacion: formatearFechaYyyyMmDd(
        data['datosComplimentos'].obligacionesFiscales.fechaExpedicion
      ),
      nomOficialAutorizado:
        data['datosComplimentos'].formaModificaciones.nombreDelFederatario,
    };
  }

  /** Construye el arreglo de declaraciones de solicitud a partir de los datos proporcionados. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static buildDeclaracionSolicitudEntries(
    data: Record<string, any>
  ): unknown[] {
    const RESULT = [
      {
        acepto: data['datosComplimentos'].obligacionesFiscales
          .aceptarObligacionFiscal
          ? 1
          : 0,
        idTipoTramite: 80101,
        cveDeclaracion: '123',
      },
    ];
    return RESULT;
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
    const CLONED_BASE = structuredClone
      ? structuredClone(BASE_OBJECT)
      : JSON.parse(JSON.stringify(BASE_OBJECT));
    const MAP_TO_PAYLOAD = (
      item: Record<string, unknown>
    ): Record<string, unknown> => ({
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
      },
    });

    return [...arr1.map(MAP_TO_PAYLOAD), ...arr2.map(MAP_TO_PAYLOAD)];
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
    array.forEach((arr) => {
      base.forEach((item) => {
        const ITEM = item && typeof item === 'object' ? item : {};
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
    array.forEach((arr) => {
      base.forEach((item) => {
        const ITEM = item && typeof item === 'object' ? item : {};
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
          datosComplementarios: Array.isArray(
            (ITEM as any)?.datosComplementarios
          )
            ? (ITEM as any).datosComplementarios.map((dc: any) => ({
                idPlantaC: dc.idPlantaC ?? '',
                idDato: dc.idDato ?? '',
                amparoPrograma: dc.amparoPrograma ?? '',
              }))
            : [],
        });
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
  static buildComplementosTablaPayload(
    array: any[],
    base: unknown[]
  ): unknown[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];

    array.forEach((arr) => {
      base.forEach((item) => {
        const ITEM = item && typeof item === 'object' ? item : {};
        RESULT.push({
          ...ITEM,
          rfc: arr.rfc || arr.taxId,
          correoElectronico: arr.correoElectronico,
          razonSocial: arr.razonSocial,
          nombre: arr.taxId,
          apellidoPaterno: arr.apellidoPaterno,
          apellidoMaterno: arr.apellidoMaterno,
          domicilioSolicitud: {
            codigoPostal: arr.codigoPostal || arr.cp,
            informacionExtra: arr.estado,
          },
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
    const RESULT: unknown[] = [];
    array.forEach((arr) => {
      base.forEach((item) => {
        const ITEM = item && typeof item === 'object' ? item : {};
        RESULT.push({
          ...ITEM,
          nombreNotario: arr.nombre ?? '',
          apellidoMaterno: arr.segundoApellido ?? '',
          apellidoPaterno: arr.primerApellido ?? '',
          numeroActa: arr.numeroDeActa ?? '',
          fechaActa: arr.fechaInicioInput ?? '',
          numeroNotaria: arr.numeroDeNotaria ?? '',
          entidadFederativa: arr.estado ?? '',
          delegacionMunicipio: arr.estadoOptions ?? '',
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
    const BUILD_ANEXO_ITEM = (item: Anexo1) => ({
      descripcion: item.encabezadoFraccion,
      idTipoBien: 0,
      idBienComercial: 0,
      testado: true,
      contadorGrid: null,
      descripcionTestado: item.encabezadoDescripcion,
    });

    const BUILD_PROVEEDOR_CLIENTE = (item: ProveedorClienteDatosTabla) => ({
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

    const BUILD_DATOS_PARA_NAVEGAR = (datos: any) => ({
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

    const BUILD_ANEXO_DOS = (item: any) => ({
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
      umt: item.encabezadoUmt,
    });

    const PROYECTO_IMMEX_DATOS = (item: any) => ({
      tipoDocumento: item.encabezadoTipoDocument,
      descripcion: item.encabezadoDescripcionOtro,
      fechaFirma: item.encabezadoFechaFirma,
      fechaVigencia: item.encabezadoFechaVigencia,
      rfcFirmante: item.encabezadoRfc,
      razonFirmante: item.encabezadoRazonFirmante,
      testado: true,
      fecFinVigencia: item.encabezadoFechaVigencia,
    });

    /**
     * Construye un objeto con los datos del proveedor y cliente a partir de un elemento de tipo `ProveedorClienteDatosTabla`.
     *
     * @param item - Objeto que contiene la información del proveedor y cliente.
     * @returns Un objeto con las propiedades: paisOrigen, rfcProveedor, razonProveedor, paisDestino, rfcCliente, razonCliente, domicilio y descTestado.
     */
    const BUILD_PROVEEDOR_CLIENTE_DOS = (item: ProveedorClienteDatosTabla) => ({
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
        ANEXOII: (data.annexoDosTres?.anexoDosTablaLista || []).map(
          BUILD_ANEXO_ITEM
        ),
        ANEXOIII: (data.annexoDosTres?.anexoTresTablaLista || []).map(
          BUILD_ANEXO_ITEM
        ),
        proveedorCliente: (
          data.annexoUno?.proveedorClienteDatosTabla || []
        ).map(BUILD_PROVEEDOR_CLIENTE),
        datosParaNavegar: BUILD_DATOS_PARA_NAVEGAR(
          data.annexoUno?.datosParaNavegar || {}
        ),
        tableDos: (data.annexoUno?.exportarDatosTabla || []).map(BUILD_ANEXO_DOS),
        proyectoimex: (data.proyectoImmexTablaLista || []).map(
          PROYECTO_IMMEX_DATOS
        ),
        proveedorClienteDos: (
          data.annexoUno?.proveedorClienteDatosTablaDos || []
        ).map(BUILD_PROVEEDOR_CLIENTE_DOS),
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseBuildComplimentos(payload: any): DatosComplimentos {
  return {
    // datosComplimentos: {
      formaModificaciones: {
        rfc: payload.solicitud.notario.rfc,
        nombreDeActa: payload.solicitud.notario.numeroActa,
        nombreDeNotaria: payload.solicitud.notario.numeroNotario,
        estado: payload.solicitud.notario.entidadFederativa,
        fechaDeActa: formatearFechaDdMmYyyy(payload.solicitud.notario.fechaActa),
        nombreDelFederatario: payload.solicitud.nomOficialAutorizado,
      },
      modalidad: payload.solicitud.modalidad,
      programaPreOperativo: payload.solicitud.booleanGenerico,
      datosGeneralis: {
        paginaWWeb: payload.solicitud.descripcionSistemasMedicion,
        localizacion: payload.solicitud.descripcionLugarEmbarque,
      },
      obligacionesFiscales: {
        opinionPositiva: payload.solicitud.numeroPermiso === 1 ? 'SI' : 'NO',
        fechaExpedicion: formatearFechaDdMmYyyy(payload.solicitud.fechaOperacion),
        // aceptarObligacionFiscal: payload.declaracionSolicitudEntities?.[0]?.acepto === 1 ? true: false
      }
    // }
  };
}

}
