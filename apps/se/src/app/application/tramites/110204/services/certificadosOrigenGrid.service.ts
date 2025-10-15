import { Catalogo, HttpCoreService, JSONResponse, formatearFechaYyyyMmDd } from '@libs/shared/data-access-user/src';
import { Observable, map } from 'rxjs';
import { Tramite110204Store, TramiteState } from '../estados/tramite110204.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { PROC_110204 } from '../servers/api-route';
import { Tramite110204Query } from '../estados/tramite110204.query';

@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenGridService {
  constructor(private http: HttpClient, private httpService: HttpCoreService, private store: Tramite110204Store, private query: Tramite110204Query) { }

  /**
   * Obtiene la lista de estados desde un archivo JSON local.
   * @method obtenerListaEstado
   * @returns {Observable<Catalogo[]>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('./assets/json/110204/estado.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de países bloque desde un archivo JSON local.
   * @method obtenerPaisBloque
   * @returns {Observable<Catalogo[]>} Observable con la lista de países bloque.
   */
  obtenerPaisBloque(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110204/país-bloque.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de mercancías desde un archivo JSON local.
   * @method obtenerMercancia
   * @returns {Observable<Mercancia[]>} Observable con la lista de mercancías.
   */
  obtenerMercancia(): Observable<Mercancia[]> {
    return this.http
      .get<{ data: Mercancia[] }>('assets/json/110204/mercancia.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de idiomas desde un archivo JSON local.
   * @method obtenerIdioma
   * @returns {Observable<Catalogo[]>} Observable con la lista de idiomas.
   */
  obtenerIdioma(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110204/idioma.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON local.
   * @method obtenerEntidadFederativa
   * @returns {Observable<Catalogo[]>} Observable con la lista de entidades federativas.
   */
  obtenerEntidadFederativa(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110204/entidad-federativa.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON local.
   * @method obtenerRepresentacionFederal
   * @returns {Observable<Catalogo[]>} Observable con la lista de representaciones federales.
   */
  obtenerRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http
      .get<{ data: Catalogo[] }>('assets/json/110204/representacion-federal.json') // Solicita los datos del archivo JSON
      .pipe(map((res) => res.data)); // Mapea los datos para extraer la propiedad 'data'
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
   * @description Obtiene los datos del formulario de certificados de origen desde un archivo JSON local.
   * @returns {Observable<TramiteState>} Observable con el estado del trámite.
   */
  public getAcuiculturaData(): Observable<TramiteState> {
    return this.http.get<TramiteState>('assets/json/110204/certificadosOrigenForm.json');
  }

  /**
   * @description Actualiza el estado completo del formulario en el store de acuicultura.
   * @param DATOS Objeto de tipo Acuicultura con los datos a actualizar.
   */
  public actualizarEstadoFormulario(DATOS: TramiteState): void {
    this.store.setEstado(DATOS.estado)
    this.store.setFactura(DATOS.factura)
    this.store.setUmc(DATOS.umcs)
    this.store.setBloque(DATOS.paisBloques)
    this.store.setaltaPlanta(DATOS.altaPlanta)
    this.store.setFormDatosCertificado(DATOS.formDatosCertificado);
    this.store.setFormCertificado(DATOS.formCertificado);
    this.store.setFormMercancia(DATOS.mercanciaForm);
    this.store.setbuscarMercancia(DATOS.buscarMercancia);

  }
  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<TramiteState> {
    return this.query.selectState$;
  }
  buscarMercanciasCert(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_110204.BUSCAR, { body: body });
  }

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   *
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */
  guardarDatosPost(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_110204.GUARDAR, { body: body });
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

 /** Construye el objeto certificado a partir del estado del trámite TramiteState. */
  buildCertificado(item: TramiteState): unknown {
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
      mercancias_seleccionadas: this.buildMercanciaSeleccionadas(item.mercanciaTabla),
    };
  }

  /** Construye el objeto datos del certificado a partir del estado del trámite TramiteState. */
  buildDatosCertificado(data: TramiteState): unknown {
      return {
        "observaciones": data.formDatosCertificado['observacionesDates'] ?? '',
        "idioma": data.formDatosCertificado['idiomaDates'] ?? 0,
        "representacion_federal": {
            "entidad_federativa": data.formDatosCertificado['EntidadFederativaDates'] ?? 0,
            "representacion_federal": data.formDatosCertificado['representacionFederalDates'] ?? 0
        }
      }
    }
}