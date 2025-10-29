import { Catalogo, HttpCoreService, JSONResponse, JsonResponseCatalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';
import { ColumnasTabla, SeleccionadasTabla } from '../models/registro.model';
import { MercanciasHistorico, ProductorExportador } from '../models/peru-certificado.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Tramite110221State, Tramite110221Store } from '../estados/tramite110221.store';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';

import { Mercancias } from '../models/plantas-consulta.model';

import { PROC_110221 } from '../servers/api-route';
import { Tramite110221Query } from '../estados/tramite110221.query';

import { CadenaOriginalRequest } from '@libs/shared/data-access-user/src/core/models/shared/cadena-original-request.model';

import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';

/**
 * @descripcion
 * Servicio encargado de validar y obtener datos iniciales para el trámite de certificado.
 * Proporciona métodos para consultar catálogos, tablas de datos, productores/exportadores y actualizar el estado del formulario.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidarInicialmenteCertificadoService {
  url: string = '../../../../../assets/json/110221/';
  
  private readonly servidor: string | undefined;
  /**
   * @constructor
   * @descripcion
   * Inyecta el cliente HTTP y el store del trámite para manipular el estado y realizar peticiones.
   * @param http Cliente HTTP para realizar solicitudes.
   * @param tramite110221Store Store para manipular el estado del trámite.
   */
  constructor(private readonly http: HttpClient, public tramite110221Store: Tramite110221Store, public httpService: HttpCoreService,
        public query: Tramite110221Query
) { }

    private get apiRoutes(): typeof PROC_110221 {
    return PROC_110221;
  }

  /**
   * @method obtenerMenuDesplegable
   * @descripcion
   * Obtiene un arreglo de objetos `Catalogo` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un arreglo de objetos `Catalogo`.
   * @usageNotes
   * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerMenuDesplegable(fileName: string): Observable<Catalogo[]> {
    const BASE_URL = this.url + fileName;
    return this.http.get<RespuestaCatalogos>(BASE_URL).pipe(
      map(response => response.data)
    );
  }

  /**
   * @method obtenerTablaDatos
   * @descripcion
   * Obtiene un arreglo de objetos `Mercancia` desde un archivo JSON ubicado en la URL especificada.
   * @param fileName El nombre del archivo JSON desde el cual se obtendrán los datos.
   * @returns Un `Observable` que emite un arreglo de objetos `Mercancia`.
   * @usageNotes
   * Este método construye la URL completa al agregar el `fileName` a la URL base (`this.url`) 
   * y realiza una solicitud HTTP GET para recuperar los datos.
   */
  obtenerTablaDatos(fileName: string): Observable<Mercancia[]> {
    const JSON_URL = this.url + fileName;
    return this.http.get<Mercancia[]>(JSON_URL);
  }

  // /**
  //  * @method obtenerProductorPorExportador
  //  * @descripcion
  //  * Obtiene la lista de productores/exportadores disponibles desde un archivo JSON.
  //  * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
  //  */
  // obtenerProductorPorExportador(): Observable<ProductorExportador> {
  //   return this.http
  //     .get<ProductorExportador>('assets/json/110221/productor-exportador.json');
  // }

  /**
   * @method obtenerMercancia
   * @descripcion
   * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
   * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
   */
  /**
   * Obtiene la lista de mercancías desde un archivo JSON local.
   * @method obtenerMercancia
   * @returns {Observable<Mercancia[]>} Observable con la lista de mercancías.
   */
  obtenerMercancia(): Observable<Mercancias[]> {
    return this.http
      .get<{ data: Mercancias[] }>('assets/json/110221/mercancia.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }


  /**
   * Obtiene el catálogo de países de destino.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getPaisDestino(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }

  /**
   * Obtiene el catálogo de transportes.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/pais.json');
  }
  /**
   * Obtiene el catálogo de tratados.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTratado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/tratado.json');
  }
  
   /**
   * Obtiene el catálogo de tipos de factura.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getTipoFactura(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/110221/tipofactura.json'
    );
  }

  /**
   * Obtiene el catálogo de unidades de medida comercial (UMC).
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getUMC(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/umc.json');
  }

  /**
   * Obtiene el catálogo de unidades de medida.
   * @returns {Observable<RespuestaCatalogos>} Observable con la respuesta del catálogo.
   */
  getUnidadMedida(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110221/umc.json');
  }

  /**
   * Recupera la lista de "Registro de Solicitudes" desde un archivo JSON.
   * @returns {Observable<ColumnasTabla[]>} Observable con array de objetos.
   * @throws {Error} Lanza error si la solicitud HTTP falla.
   */
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http.get<ColumnasTabla[]>('assets/json/110221/mercancia-disponsible.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

   /**
   * Recupera la lista de "Solicitudes Seleccionadas" desde un archivo JSON.
   * @returns {Observable<SeleccionadasTabla[]>} Observable con array de objetos.
   * @throws {Error} Lanza error si la solicitud HTTP falla.
   */
  public getSolicitudesDataTabla(): Observable<SeleccionadasTabla[]> {
    return this.http.get<SeleccionadasTabla[]>('assets/json/110221/mercancias-seleccionadas-certificado.json').pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  
  /**
   * @method getRegistroTomaMuestrasMercanciasData
   * @descripcion
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   * @returns Observable con los datos del estado de la solicitud `Tramite110221State`,
   *          cargados desde el archivo JSON especificado en la ruta de `assets`.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110221State> {
    return this.http.get<Tramite110221State>('assets/json/110221/datos-prefill.json');
  }

    /**
     * Obtiene la lista de estados desde un archivo JSON local.
     * @method obtenerListaEstado
     * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
     */
    obtenerListaEstado(): Observable<Catalogo[]> {
      return this.http
        .get<{ data: Catalogo[] }>('./assets/json/110221/estado.json') // Solicita los datos del archivo JSON
        .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
    }
    /**
   * Obtiene la lista de países bloque desde un archivo JSON local.
   * @method obtenerPaisBloque
   * @returns {Observable<Catalogo[]>} Observable con la lista de países bloque.
   */


    obtenerMercancias(): Observable<MercanciasHistorico> {
    return this.http
      .get<MercanciasHistorico>('assets/json/110221/mercancias-seleccionadas.json');
  }
   /**
 * Obtiene la lista de facturas desde un archivo JSON local.
 * @method obtenerFacturas
 * @returns {Observable<Catalogo[]>} Observable con la lista de facturas.
 */
  obtenerFacturas(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110204/factura.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }
   /**
     * Obtiene la lista de UMC desde un archivo JSON local.
     * @method obtenerUmc
     * @returns {Observable<Catalogo[]>} Observable con la lista de UMC.
     */
    obtenerUmc(): Observable<Catalogo[]> {
      return this.http
        .get<{ data: Catalogo[] }>('assets/json/110204/umc.json') // Solicita los datos del archivo JSON
        .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
    }
  

    /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getTipoFacturaOpciones(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      PROC_110221.TIPO_FACTURA,
      {},
      false
    );
  }

  /**
   * Obtiene la lista de países bloque desde un archivo JSON local.
   * @method obtenerPaisBloque
   * @returns {Observable<Catalogo[]>} Observable con la lista de países bloque.
   */
  obtenerPaisBloque(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110221/país-bloque.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

    /**
     * Obtiene la entidad federativa asociada a la solicitud.
     * @returns {Observable<JsonResponseCatalogo>} Observable con la entidad federativa.
     */
    obtenerEntidadFederativa(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      PROC_110221.ENTIDAD_FEDERATIVA,
      {},
      false
    );
  }
  /**
 * @method obtenerRepresentacionFederal
 * @descripcion
 * Obtiene el catálogo de representaciones federales desde el servidor.
 * @returns {Observable<JsonResponseCatalogo>} Observable con la respuesta del catálogo de representaciones federales.
 */
obtenerRepresentacionFederal(): Observable<JsonResponseCatalogo> {
  return this.httpService.get<JsonResponseCatalogo>(
    PROC_110221.REPRESENTACION_FEDERAL, // Use the route defined in `api-route.ts`
    {},
    false
  );
}

 guardarDatosPost(
    body: Record<string, unknown>
  ): Observable<Record<string, unknown>> {
    return this.httpService.post<Record<string, unknown>>(PROC_110221.GUARDAR, {
      body: body,
    });
  }

  /**
   * Busca las mercancías asociadas a un certificado.
   * @param body Cuerpo de la solicitud con los parámetros de búsqueda.
   * @returns Observable con la respuesta de la API.
   */
buscarMercanciasCert(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_110221.BUSCAR, { body: body });
  }

  /** Construye el arreglo de mercancías seleccionadas para el certificado. */
buildMercanciaSeleccionadas(array: unknown[]): unknown[] {
    const RESULT: unknown[] = [];

    array.forEach((arr) => {
      const ITEM = arr as {
        id?: number | string;
        idMercancia?: string;
        fraccionArancelaria?: string;
        descripcionMercancia?: string | null;
        unidadMedida?: string | null;
        paisOrigen?: string | null;
        cumpleReglasOrigen?: boolean;
        criterioOrigen?: string | null;
        porcentajeContenidoRegional?: number | null;
        numeroRegistro?: boolean | string | null;
        requiereDocumentosAdicionales?: boolean;
        fraccionNaladi?: string;
        fraccionNaladiSa93?: string;
        fraccionNaladiSa96?: string;
        fraccionNALADISA02Clave?: string;
        fraccionNALADIClave?: string;
        fraccionNALADSA93Clave?: string;
        fraccionNALADISA96Clave?: string;
        nombreTecnico?: string | null;
        nombreComercial?: string | null;
        numeroDeRegistrodeProductos?: string;
        tipoFactura?: string;
        numFactura?: string;
        complementoDescripcion?: string;
        fechaExpedicion?: string | null;
        fechaVencimiento?: string | null;
        fechaFactura?: string;
        cantidad?: string;
        umc?: string;
        unidadMedidaMasaBruta?: string;
        valorMercancia?: string;
      };

      RESULT.push({
        id: ITEM.id || null,
        fraccion_arancelaria: ITEM.fraccionArancelaria || '',
        fraccion_naladi: ITEM.fraccionNALADIClave || '',
        fraccion_naladi_sa93: ITEM.fraccionNALADSA93Clave || '',
        fraccion_naladi_sa96: ITEM.fraccionNALADISA96Clave || '',
        fraccion_naladi_sa02: ITEM.fraccionNALADISA02Clave || '',
        nombre_tecnico: ITEM.nombreTecnico || '',
        nombre_comercial: ITEM.nombreComercial || '',
        registro_producto: ITEM.numeroDeRegistrodeProductos || '',
        fecha_expedicion: ITEM.fechaExpedicion || '',
        fecha_vencimiento: ITEM.fechaVencimiento || '',
        tipo_factura: ITEM.tipoFactura || '',
        num_factura: ITEM.numFactura || '',
        complemento_descripcion: ITEM.complementoDescripcion || '',
        fecha_factura: ITEM.fechaFactura || '',
        cantidad: ITEM.cantidad || '',
        umc: ITEM.umc || '',
        unidad_medida: ITEM.unidadMedidaMasaBruta || '',
        valor_mercancia: ITEM.valorMercancia || ''
      });
    });

    return RESULT;
  }

 /** Construye el objeto certificado a partir del estado del trámite TramiteState. */
  buildCertificado(item: Tramite110221State): unknown {    
    return {
      tratado_acuerdo: item.formCertificado['entidadFederativa'] || '',
      pais_bloque: item.formCertificado['bloque'] || '',
      fraccion_arancelaria: item.formCertificado['fraccionArancelaria'] || '',
      nombre_comercial: item.formCertificado['nombreComercial'] || '',
      fecha_inicio: item.formCertificado['fechaInicio'] || '',
      fecha_fin: item.formCertificado['fechaFin'] || '',
      registro_producto: item.formCertificado['registroProducto'] || '',
      realizo_tercer_operador: {
        tercer_operador: item.formCertificado['si'] || false,
        nombre: item.formCertificado['nombres'] || '',
        primer_apellido: item.formCertificado['primerApellido'] || '',
        segundo_apellido: item.formCertificado['segundoApellido'] || '',
        numero_registro_fiscal: item.formCertificado['numeroDeRegistroFiscal'] || '',
        razon_social: item.formCertificado['razonSocial'] || '',
      },
      domicilio_tercer_operador:{
        pais: item.formCertificado['pais'] || '',
        calle: item.formCertificado['calle'] || '',
        Ciudad: item.formCertificado['ciudad'] || '',
        numero_letra: item.formCertificado['numeroLetra'] || '',
        lada: item.formCertificado['lada'] || '',
        telefono: item.formCertificado['telefono'] || '',
        correo_electronico:item.formCertificado['correo'],
        fax:item.formCertificado['fax']
      },
      mercancias_seleccionadas: this.buildMercanciaSeleccionadas(item.mercanciaTabla),
    };
  }

  /** Construye el objeto datos del certificado a partir del estado del trámite TramiteState. */
  buildDatosCertificado(data: Tramite110221State): unknown {
      return {
        "observaciones": data.formDatosCertificado['observacionesDates'] ?? '',
        "idioma": data.formDatosCertificado['idiomaDates'] ?? 0,
        "representacion_federal": {
            "entidad_federativa": data.formDatosCertificado['EntidadFederativaDates'] ?? 0,
            "representacion_federal": data.formDatosCertificado['representacionFederalDates'] ?? 0
        }
      }
    }

  /** Agrega un nuevo productor/exportador. */
    obtenerProductoruNevo(body: Record<string, unknown>): Observable<unknown> {
    return this.httpService.post<unknown>(PROC_110221.AGREGAR_PRODUCTOR, {
      body: body,
    });
  }

  /**
   * Obtiene el productor/exportador asociado a la solicitud.
   * @returns {Observable<ProductorExportador>} Observable con el productor/exportador.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.httpService.get<ProductorExportador>(
      PROC_110221.BUSCAR_PRODUCTOR
    );
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite110221State> {
    return this.query.selectTramite$;
  }

  /**
   * Obtiene la cadena original del trámite.
   * @param {string} idSolicitud - ID de la solicitud.
   * @param {CadenaOriginalRequest} body - Cuerpo de la solicitud.
   * @returns {Observable<BaseResponse<T>>} Observable con la respuesta de la API.
   */
  obtenerCadenaOriginal<T>(
        idSolicitud: string,
        body: CadenaOriginalRequest
      ): Observable<BaseResponse<T>> {
        return this.http
          .post<BaseResponse<T>>(
            PROC_110221.API_POST_CADENA_ORIGINAL(idSolicitud),
            body
          )
          .pipe(
            map((response) => response),
            catchError(() => {
              const ERROR = new Error(
                `Error al obtener la cadena original en ${PROC_110221.API_POST_CADENA_ORIGINAL(
                  idSolicitud
                )}`
              );
              return throwError(() => ERROR);
            })
          );
      }
}