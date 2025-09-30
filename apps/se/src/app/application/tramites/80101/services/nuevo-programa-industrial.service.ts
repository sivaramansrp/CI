import {
  Anexo1,
  InfoServicios,
  ProveedorClienteDatosTabla,
  Servicio
} from '../models/nuevo-programa-industrial.model';
import { AnexoEncabezado, AnexoUnoEncabezado, ProveedorClienteTabla, ProyectoImmexEncabezado } from '../../../shared/models/nuevo-programa-industrial.model';
import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoDatosIdx, FederatariosEncabezado, PlantasImmex } from '../../../shared/models/federatarios-y-plantas.model';
import { DatosComplimentos, SociaoAccionistas } from '../../../shared/models/complimentos.model';
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
import { ComplimentosService } from '../../../shared/services/complimentos.service';
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
   * @param DATOS - Estado de la solicitud `Solicitud230401State` con la información del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: unknown): void {
    this.setComplimentos(DATOS);
    this.setFederatarios(DATOS);
    this.setEmpresasSubmanufactureras(DATOS);
    this.setAnexoI(DATOS);
    this.setAnexoIIyIII(DATOS);
    console.log('After update:', this.tramite80101Store.getValue());
  }

  setComplimentos(DATOS: unknown): void {
    const DATOS_COMPLIMENTOS = this.reverseBuildComplimentos(DATOS) as DatosComplimentos;
    this.tramite80101Store.setDatosComplimentos(DATOS_COMPLIMENTOS);
    const SOCIOS_ACCIONISTAS = this.reverseBuildSociosAccionistas((DATOS as { sociosAccionistas?: unknown[] }).sociosAccionistas ?? []) as { ARR1: SociaoAccionistas[]; ARR2: SociaoAccionistas[] };
    SOCIOS_ACCIONISTAS.ARR1.forEach((ele: SociaoAccionistas) => {
      this.tramite80101Store.aggregarTablaDatosComplimentos(ele);
    });
    SOCIOS_ACCIONISTAS.ARR2.forEach((ele: SociaoAccionistas) => {
      this.tramite80101Store.aggregarTablaDatosComplimentosExtranjera(ele);
    });
  }

  setFederatarios(DATOS: unknown): void {
    if (typeof DATOS === 'object' && DATOS !== null && 'notario' in DATOS) {
      const NOTARIOS = this.reverseBuildDatosFederatarios((DATOS as { notario?: unknown[] }).notario ?? []);
      NOTARIOS.forEach((ele: FederatariosEncabezado) => {
        this.tramite80101Store.setFederatarios(ele);
      });
    }

    if (typeof DATOS === 'object' && DATOS !== null && 'planta' in DATOS) {
      const PLANTAS = this.reverseBuildPlantas((DATOS as { planta?: unknown[] }).planta ?? []);
      this.tramite80101Store.setPlantasImmexTablaLista(PLANTAS);
    }
  }

  setEmpresasSubmanufactureras(DATOS: unknown): void {
    if (typeof DATOS === 'object' && DATOS !== null && 'plantasSubmanufactureras' in DATOS) {
      const PLANTAS_SUBMANUFACTURERAS = this.reverseBuildPlantasSubmanufactureras((DATOS as { plantasSubmanufactureras?: unknown[] }).plantasSubmanufactureras ?? []);
      this.tramite80101Store.setPlantasSubfabricantesAgregar(PLANTAS_SUBMANUFACTURERAS);
    }
  }

  setAnexoI(DATOS: unknown): void {
    if (typeof DATOS === 'object' && DATOS !== null && 'mercanciaImportacion' in DATOS) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const MERCANCIA_IMPORTACION = (DATOS as { mercanciaImportacion?: any[] }).mercanciaImportacion ?? [];
      const ANEXO_TABLA_UNO = this.reverseBuildDatosParaNavegar(MERCANCIA_IMPORTACION[0]?.complemento);
      this.tramite80101Store.setImportarDatosTabla(ANEXO_TABLA_UNO);
      const ANEXO_TABLA_DOS = this.reverseBuildAnexoDos(MERCANCIA_IMPORTACION[0]?.anexoI);
      this.tramite80101Store.setExportarDatosTabla(ANEXO_TABLA_DOS);
      const LISTA_PROVEEDORES_CLIENT = this.reverseBuildProveedorCliente(MERCANCIA_IMPORTACION[0]?.listaProveedores);
      this.tramite80101Store.setProveedorClienteDatosTablaUno(LISTA_PROVEEDORES_CLIENT);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const LISTA_PROVEEDORES_CLIENT_DOS = this.reverseProveedoresClientDos((DATOS as any).fraccionArancelaria[0].listaProveedores);
      this.tramite80101Store.setProveedorClienteDatosTablaDos(LISTA_PROVEEDORES_CLIENT_DOS);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const PROYECTO_IMMEX = this.reverseProyectoIMMEX((DATOS as any).productoExportacionDtoList[0].proyectosImmex);
      this.tramite80101Store.setProyectoImmexTablaLista(PROYECTO_IMMEX);
    }
  }

  setAnexoIIyIII(DATOS: unknown): void {
    if (typeof DATOS === 'object' && DATOS !== null && 'anexoII' in DATOS) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ANEXO_II = this.reverseBuildAnexoDosTres((DATOS as any).anexoII);
      this.tramite80101Store.setAnnexoDosTableLista(ANEXO_II);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ANEXO_III = this.reverseBuildAnexoDosTres((DATOS as any).anexoIII);
      this.tramite80101Store.setAnnexoTresTableLista(ANEXO_III);
    }
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

  /** Realiza una solicitud POST para obtener los datos de la solicitud seleccionada desde el servidor. */
  fetchMostrarDatos(body: {idSolicitud: number; idSolicitudSeleccionada: string}): Observable<unknown> {
    return this.httpService.post<{ idSolicitud: number; idSolicitudSeleccionada: string }>(PROC_80101.MOSTRAR, { body: body });
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
  static buildDeclaracionSolicitudEntries(data: Record<string, any>): unknown[] {
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
  buildPlantas(array: any[] = [], base: unknown[], data: any): any {
    // eslint-disable-next-line complexity, @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
    const MAP_CAPACIDAD_INSTALADA = (item: any) => ({
      fraccion: item.FRACCION_ARANCELARIA_PRODUCTO_TERMINADO_CATLOGO ?? "",
      umt: item.UMT ?? "",
      descripcion: item.DESCRIPCION_COMERCIAL_PRODUCTO_TERMINADO ?? "",
      capacidadEfectiva: item.CAPACIDAD_EFECTIVAMENTE_UTILIZADA ?? "",
      calculo: item.CALCULO_CAPACIDAD_INSTALADA ?? "",
      turnos: (item.TURNOS ?? "").toString(),
      horasTurno: (item.HORAS_POR_TURNO ?? "").toString(),
      cantidadEmpleados: (item.CANTIDAD_EMPLEADOS ?? "").toString(),
      cantidadMaquinaria: (item.CANTIDAD_MAQUINARIA ?? "").toString(),
      descripcionMaquinaria: item.DESCRIPCION_MAQUINARIA ?? "",
      capacidadMensual: (item.CAPACIDAD_INSTALADA_MENSUAL ?? "").toString(),
      capacidadAnual: item.CAPACIDAD_INSTALADA_ANUAL ?? "",
      testado: "1",
    });
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
    const MAP_MONTOS_INVERSION = (item: any) => ({
      idPlantaM: item.PLANTA ?? "",
      idMonto: (item.MONTO ?? "").toString(),
      tipo: item.TIPO ?? "",
      descTipo: item.DESC_TIPO ?? "",
      cantidad: (item.CANTIDAD ?? "").toString(),
      descripcion: item.DESCRIPCION ?? "",
      monto: (item.MONTO ?? "").toString(),
      testado: item.TESTADO ?? "",
      descTestado: item.DESC_TESTADO ?? "",
    })
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
    const MAP_EMPLEADOS = (item: any) => ({
      idPlantaE: item.PLANTA ?? '',
      idEmpleados: item.ID_EMPLEADOS ?? '',
      totalEmpleados: (item.TOTAL ?? '').toString(),
      directos: item.DIRECTOS ?? '',
      cedula: item.CEDULA_DE_CUOTAS ?? '',
      fechaCedula: formatearFechaYyyyMmDd(item.FECHA_DE_CEDULA ?? ''),
      indirectos: item.INDIRECTOS_TEST ?? '',
      contrato: item.CONTRATO ?? '',
      objetoContrato: item.OBJETO_DEL_CONTRATO_DEL_SERVICIO ?? '',
      fechaFirma: formatearFechaYyyyMmDd(item.FECHA_FIRMA ?? ''),
      fechaFinVigencia: formatearFechaYyyyMmDd(item.FECHA_FIN_VIGENCIA ?? ''),
      rfcEmpresa: item.RFC ?? '',
      razonEmpresa: item.RAZON_SOCIAL ?? '',
      testado: item.TESTADO ?? '',
      descTestado: item.DESC_TESTADO ?? '',
    })
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
    const MAP_COMPLEMENTAR = (item: any) => ({
      idPlantaC: item.PLANTA ?? '' ,
      idDato: item.DATO ?? '',
      amparoPrograma: item.PERMANECERA_MERCANCIA_PROGRAMA ?? '',
      tipoDocumento: item.TIPO_DOCUMENTO ?? '',
      descDocumento: item.DESCRIPCION_DOCUMENTO ?? '',
      descripcionOtro: item.DESCRIPCION_OTRO ?? '',
      documentoRespaldo: item.DOCUMENTO_RESPALDO ?? '',
      descDocRespaldo: item.DESC_DOCUMENTO_RESPALDO ?? '',
      respaldoOtro: item.RESPALDO_OTRO ?? '',
      fechaFirma: formatearFechaYyyyMmDd(item.FECHA_DE_FIRMA ?? ''),
      fechaVigencia: formatearFechaYyyyMmDd(item.FECHA_DE_FIN_DE_VIGENCIA ?? ''),
      fechaFirmaRespaldo: item.FECHA_DE_FIRMA_DOCUMENTO ?? '',
      fechaVigenciaRespaldo: item.FECHA_DE_FIN_DE_VIGENCIA_DOCUMENTO ?? ''
    })
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
    const MAP_FIRMANTES = (item:any) => ({
      idPlantaF: item.planta ?? '',
      tipoFirmante: item.tipoFirmante ?? '',
      descTipoFirmante: item.descTipoFirmante ?? '',
    })
 
    const listaCapacidad = (data.tablaDatosCapacidadInstalada || []).map(MAP_CAPACIDAD_INSTALADA);
    const montos = (data.montosDeInversionTablaDatos || []).map(MAP_MONTOS_INVERSION);
    const datosEmpleados = (data.empleadosTablaDatos || []).map(MAP_EMPLEADOS);
    const datosComplementarios = (data.complementarPlantaDatos || []).map(MAP_COMPLEMENTAR);
    const firmantes = (data.complementarFirmanteDatos || []).map(MAP_FIRMANTES);
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const RESULT: any[] = [];
    array.forEach(arr => {
      // eslint-disable-next-line complexity
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
    const RESULT_DATA = { ...RESULT[0], listaCapacidad, montos, datosEmpleados, datosComplementarios, firmantes };
    return RESULT_DATA;
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (ITEM as any)?.datosComplementarios
          )
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  static buildComplementosTablaPayload(array: any[], base: unknown[]): unknown[] {
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
          fechaActa: formatearFechaYyyyMmDd(arr.fechaInicioInput ?? ''),
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
  // eslint-disable-next-line class-methods-use-this
  buildAnexo(data: unknown): { anexo: Record<string, unknown> } {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const BUILD_ANEXO_ITEM = (item: Anexo1) => ({
      descripcion: item.encabezadoFraccion,
      idTipoBien: 0,
      idBienComercial: 0,
      testado: true,
      contadorGrid: null,
      descripcionTestado: item.encabezadoDescripcion,
    });
 
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
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
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
    const BUILD_ANEXO_DOS = (item: any) => ({
      fraccionExportacion: item.encabezadoFraccionExportacion,
      fraccionImportacion: item.encabezadoFraccionImportacion,
      descFraccionImpo: item.encabezadoDescripcionComercial,
      claveFraccionAnexo: item.encabezadoAnexoII,
      idProducto: item.encabezadoIdProducto,
      fraccionDescripcionAnexo: item.encabezadoFraccionDescripcionAnexo,
      fraccionValorMonedaAI: item.encabezadoValorEnMonedaAnual,
      fraccionValorProdMI: item.encabezadoValorEnMonedaMensual,
      fraccionVolumenMensual: item?.encabezadoValorEnMonedaMensual,
      fraccionVolumenAnual: item?.encabezadoVolumenAnual,
      categoriaFraccion: item.encabezadoCategoria,
      tipoFraccion: item.encabezadoTipo,
      umt: item.encabezadoUmt,
    });
 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-function-return-type
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ANEXOII: ((data as any).annexoDosTres?.anexoDosTablaLista || []).map(BUILD_ANEXO_ITEM),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ANEXOIII: ((data as any).annexoDosTres?.anexoTresTablaLista || []).map(BUILD_ANEXO_ITEM),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        proveedorCliente: ((data as any).annexoUno?.proveedorClienteDatosTabla || []).map(BUILD_PROVEEDOR_CLIENTE),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        datosParaNavegar: BUILD_DATOS_PARA_NAVEGAR((data as any).annexoUno?.importarDatosTabla[0] || {}),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tableDos: ((data as any).annexoUno?.exportarDatosTabla || []).map(BUILD_ANEXO_DOS),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        proyectoimex: ((data as any).proyectoImmexTablaLista || []).map(PROYECTO_IMMEX_DATOS),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        proveedorClienteDos: ((data as any).annexoUno?.proveedorClienteDatosTablaDos || []).map(BUILD_PROVEEDOR_CLIENTE_DOS),
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseBuildComplimentos(payload: any): DatosComplimentos {
    return {
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
          opinionPositiva: payload.solicitud.numeroPermiso === 'SI' ? '' : '',
          fechaExpedicion: formatearFechaDdMmYyyy(payload.solicitud.fechaOperacion),
          aceptarObligacionFiscal: payload.declaracionSolicitudEntities?.[0]?.acepto === 1 ? 'Si' : 'No'
        }
    };
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseBuildSociosAccionistas(payload: any[]): { ARR1: SociaoAccionistas[]; ARR2: SociaoAccionistas[] } {
    const ARR1: SociaoAccionistas[] = [];
    const ARR2: SociaoAccionistas[] = [];
    for (const ELE of payload) {
      if (ELE?.rfc && String(ELE.rfc).trim() !== '') {
        ARR1.push({
          rfc: ELE.rfc
        });
      } else if (ELE?.rfcExtranjero && String(ELE.rfcExtranjero).trim() !== '') {
        ARR2.push({
          nombre: ELE.nombre,
          apellidoPaterno: ELE.apellidoPaterno,
          apellidoMaterno: ELE.apellidoMaterno,
          taxId: ELE.rfcExtranjero,
          correoElectronico: ELE.correoElectronico,
          razonSocial: ELE.razonSocial,
          estado: ELE.estadoEntidad ?? ELE.estadoEvaluacionEntidad,
          pais: ELE.cvePaisOrigen,
          codigoPostal: ELE.domicilio?.codigoPostal,
        });
      }
    }
    return { ARR1, ARR2 };
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseBuildDatosFederatarios(payload: any[]): FederatariosEncabezado[] {
    const RESULT: FederatariosEncabezado[] = [];
    for (const ELE of payload) {
      RESULT.push({
        nombre: ELE.nombreNotario ?? '',
        primerApellido: ELE.apellidoPaterno ?? '',
        segundoApellido: ELE.apellidoMaterno ?? '',
        numeroDeActa: ELE.numeroActa ?? '',
        fechaDelActa: ELE.fechaActa ?? '',
        numeroDeNotaria: ELE.numeroNotaria ?? '',
        estado: ELE.entidadFederativa ?? '',
        estadoOptions: ELE.delegacionMunicipio ?? '',
        entidadFederativa: ELE.entidadFederativa ?? '',
        municipioODelegacion: ELE.delegacionMunicipio ?? '',
        estadoUno: '',
        estadoDos: '',
        estadoTres: ''
      });
    }
    return RESULT;
  }

  // Turn the merged payload back into the original array of plant objects
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseBuildPlantas(payload: any[]): PlantasImmex[] {
    const RESULT: PlantasImmex[] = [];
    for (const ELE of payload) {
      RESULT.push({
        planta: ELE.idPlanta ?? '',
        calle: ELE.calle ?? '',
        numeroExterior: ELE.numeroExterior ?? '',
        numeroInterior: ELE.numeroInterior ?? '',
        codigoPostal: ELE.codigoPostal ?? '',
        localidad: ELE.localidad ?? '',
        colonia: ELE.colonia ?? '',
        delegacionMunicipio: ELE.delegacionMunicipio ?? '',
        entidadFederativa: ELE.entidadFederativa ?? '',
        pais: ELE.pais ?? '',
        registroFederalDeContribuyentes: ELE.rfc ?? '',
        domicilioDelSolicitante: ELE.domicilioFiscal ?? '',
        razonSocial: ELE.razonSocial ?? '',
      });
    }
    return RESULT;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseBuildPlantasSubmanufactureras(payload: any[]): PlantasSubfabricante[] {
    const RESULT: PlantasSubfabricante[] = [];
    for (const ELE of payload) {
      RESULT.push({
        calle: ELE.empresaCalle ?? '',
        numInterior: ELE.empresaNumeroInterior ?? '',
        numExterior: ELE.empresaNumeroExterior ?? '',
        codigoPostal: ELE.empresaCodigoPostal ?? '',
        colonia: ELE.localidad ?? '',
        municipio: ELE.empresaDelegacionMunicipio ?? '',
        entidadFederativa: ELE.empresaEntidadFederativa ?? '',
        pais: ELE.empresaPais ?? '',
        rfc: ELE.rfc ?? '',
        domicilioFiscal: ELE.domicilioFiscal ?? '',
        razonSocial: ELE.razonSocial ?? '',
      });
    }
    return RESULT;
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseBuildAnexoDos(items: any[]): any[] {
    return items.map((built) => ({
      encabezadoFraccionExportacion: built.fraccionExportacion,
      encabezadoFraccionImportacion: built.fraccionImportacion,
      encabezadoDescripcionComercial: built.descFraccionImpo,
      encabezadoAnexoII: built.claveFraccionAnexo,
      encabezadoIdProducto: built.idProducto,
      encabezadoFraccionDescripcionAnexo: built.fraccionDescripcionAnexo,
      encabezadoValorEnMonedaAnual: built.fraccionValorMonedaAI,
      encabezadoValorEnMonedaMensual: built.fraccionValorProdMI,
      encabezadoCategoria: built.categoriaFraccion,
      encabezadoTipo: built.tipoFraccion,
      encabezadoUmt: built.umt,
    }));
  }

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseBuildAnexoDosTres(items: any[]): AnexoEncabezado[] {
    return items.map((built) => ({
      encabezadoFraccion: built.descripcion,
      encabezadoDescripcion: built.descripcionTestado,
      estatus: built.estatus ?? true, // Default to true if not present
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, class-methods-use-this
  reverseBuildProveedorCliente(items: any[]): ProveedorClienteDatosTabla[] {
    return items.map((built) => ({
      idProveedor: built.idProveedor,
      paisOrigen: built.paisOrigen,
      rfcProveedor: built.rfcProveedor,
      razonProveedor: built.razonProveedor,
      paisDestino: built.paisDestino,
      rfcClinte: built.rfcCliente,
      razonSocial: built.razonCliente,
      domicilio: built.domicilio,
      testado: built.testado,
      idProductoP: built.idProductoP,
      descTestado: built.descTestado,
    }));
  }

// eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
reverseProveedoresClientDos(items: any[]): ProveedorClienteTabla[] {
  return items.map((built) => ({
    idProveedor: built.idProveedor ?? 0,
    paisOrigen: built.paisOrigen,
    rfcProveedor: built.rfcProveedor,
    razonProveedor: built.razonProveedor,
    paisDestino: built.paisDestino,
    rfcClinte: built.rfcCliente,
    razonSocial: built.razonCliente,
    domicilio: built.domicilio,
    descTestado: built.descTestado,
    testado: built.testado ?? false,
    idProductoP: built.idProductoP ?? 0,
  }));
}

  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  reverseProyectoIMMEX(items: any[]): ProyectoImmexEncabezado[] {
    return items.map((built) => ({
      encabezadoTipoDocument: built.tipoDocumento,
      encabezadoDescripcionOtro: built.descripcion,
      encabezadoFechaFirma: built.fechaFirma,
      encabezadoFechaVigencia: built.fechaVigencia,
      encabezadoRfc: built.rfcFirmante,
      encabezadoRazonFirmante: built.razonFirmante,
      testado: built.testado,
      encabezadoFraccion: built.encabezadoFraccion ?? '',
      estatus: built.estatus ?? true
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, class-methods-use-this
  reverseBuildDatosParaNavegar(items: any): AnexoUnoEncabezado[] {
    return [
      {
        encabezadoAnexoII: items.anexoII,
        encabezadoTipo: items.tipo,
        encabezadoCategoria: items.categoria,
        encabezadoDescripcionComercial: items.descripcion,
        encabezadoVolumenMensual: items.valorMensual,
        encabezadoVolumenAnual: items.valorAnual,
        encabezadoValorEnMonedaMensual: items.volumenMensual,
        encabezadoValorEnMonedaAnual: items.volumenAnual,
        encabezadoFraccion: items.fraccion ?? "",
        encabezadoFraccionArancelaria: items.fraccionArancelaria ?? "",
        encabezadoUmt: items.umt ?? "",
        estatus: items.estatus ?? true,
      },
    ];
  }


}