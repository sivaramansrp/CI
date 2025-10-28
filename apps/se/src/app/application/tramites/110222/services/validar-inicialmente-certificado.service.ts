/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpCoreService, JsonResponseCatalogo } from '@ng-mf/data-access-user';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PROC_110222, PRODUCTORS_EXPORTADOR } from '../servers/api-route';
import { Tramite110222State, Tramite110222Store } from '../estados/tramite110222.store';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { CadenaOriginalRequest } from '../../130118/model/request/cadena-original-request.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tramite110222Query } from '../estados/tramite110222.query';


/**
 * @descripcion
 * Servicio encargado de validar y obtener datos iniciales para el trámite de certificado.
 * Proporciona métodos para consultar catálogos, tablas de datos, productores/exportadores y actualizar el estado del formulario.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidarInicialmenteCertificadoService {
  url: string = '../../../../../assets/json/110222/';

  /**
   * @constructor
   * @descripcion
   * Inyecta el cliente HTTP y el store del trámite para manipular el estado y realizar peticiones.
   * @param http Cliente HTTP para realizar solicitudes.
   * @param tramite110222Store Store para manipular el estado del trámite.
   */
  constructor(
    private readonly http: HttpClient,
    public tramite110222Store: Tramite110222Store,
    public httpService: HttpCoreService,
    private tramite110222Query: Tramite110222Query
  ) { }

  /**
   * @method getRegistroTomaMuestrasMercanciasData
   * @descripcion
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   * @returns Observable con los datos del estado de la solicitud `Tramite110222State`,
   *          cargados desde el archivo JSON especificado en la ruta de `assets`.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite110222State> {
    return this.http.get<Tramite110222State>('assets/json/110222/datos-prefill.json');
  }

  /**
   * @method actualizarEstadoFormulario
   * @descripcion
   * Actualiza el estado del formulario con los datos proporcionados.
   * @param DATOS - Estado de la solicitud `Tramite110222State` con la información 
   *                del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: Tramite110222State): void {
    this.tramite110222Store.update((state) => ({
      ...state,
      ...DATOS
    }))
  }

  /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getTipoFactura(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      PROC_110222.TIPO_FACTURA,
      {},
      false
    );
  }

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   * 
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */

   guardarDatosPost( body: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.httpService.post<Record<string, unknown>>(PROC_110222.GUARDAR, { body: body });
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<Tramite110222State>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Tramite110222State> {
    return this.tramite110222Query.selectTramite$;
  }
  buscarMercanciasCert(body: any): Observable<any> {
     return this.httpService.post<any>(PROC_110222.BUSCAR, { body: body });
  }
   /**
* Construye un arreglo de mercancías seleccionadas a partir de los datos proporcionados.
* @param arr Arreglo de objetos con los datos de las mercancías seleccionadas.
* @returns Arreglo de objetos con la estructura requerida para las mercancías seleccionadas.
* */
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

   agregarProductores(body: {rfc_solicitante: string}): Observable<unknown> {
    return this.httpService.post<unknown>(PROC_110222.AGREGAR_PRODUCTOR, { body: body });
  }
  
  obtenerProductorPorExportador(rfc: string): Observable<Record<string, unknown>> {
      return this.http.get<Record<string, unknown>>(PRODUCTORS_EXPORTADOR(rfc));
    }

    /** Construye el objeto certificado a partir del estado del trámite TramiteState. */
  buildCertificado(item: Tramite110222State): unknown {    
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
  buildDatosCertificado(data: Tramite110222State): unknown {
      return {
        "observaciones": data.formDatosCertificado['observacionesDates'] ?? '',
        "idioma": data.formDatosCertificado['idiomaDates'] ?? 0,
        "representacion_federal": {
            "entidad_federativa": data.formDatosCertificado['EntidadFederativaDates'] ?? 0,
            "representacion_federal": data.formDatosCertificado['representacionFederalDates'] ?? 0
        }
      }
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
            PROC_110222.API_POST_CADENA_ORIGINAL(idSolicitud),
            body
          )
          .pipe(
            map((response) => response),
            catchError(() => {
              const ERROR = new Error(
                `Error al obtener la cadena original en ${PROC_110222.API_POST_CADENA_ORIGINAL(
                  idSolicitud
                )}`
              );
              return throwError(() => ERROR);
            })
          );
      }
}