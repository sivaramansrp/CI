import { API_POST_SOLICITUD, BUSCAR_PRODUCTOR, PROC_110223 } from '../servers/api-route';
import { Catalogo, CatalogoLista, DisponiblesTabla, HistoricoColumnas, MercanciaTabla, MercanciasHistorico, MercanciasHistoricos, SeleccionadasTabla } from '../models/certificado-origen.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpCoreService, JsonResponseCatalogo, RespuestaCatalogos, formatearFechaYyyyMmDd } from '@libs/shared/data-access-user/src';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Tramite110223Store, TramiteState } from '../estados/Tramite110223.store';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/5701/base-response.model';
import { GuadarSolicitudResponse } from '../models/response/guardar-solicitud-response.model';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { ProductorExportador } from '../models/certificado-origen.model';
import { Tramite110223Query } from '../query/tramite110223.query';

/**
 * Servicio para gestionar las operaciones relacionadas con el certificado de origen.
 * 
 * Este servicio proporciona métodos para obtener datos como idiomas, entidades federativas,
 * representaciones federales, productores/exportadores, mercancías disponibles y seleccionadas,
 * tratados y países desde archivos JSON.
 */
@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenService {
    url: string = '../../../../../assets/json/110223/';

    /**
   * La URL base del servidor al que se realizarán las solicitudes.
   * Esta propiedad es de solo lectura y se utiliza para construir las rutas de los servicios.
   */
  private readonly servidor!: string;

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient,private store: Tramite110223Store, public httpService: HttpCoreService,
    private tramite110223Query: Tramite110223Query
  ) { }

  /**
   * Obtiene la lista de idiomas disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de idiomas desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de idiomas.
   */
  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/idioma.json');
  }

  /**
   * Obtiene la lista de entidades federativas disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de entidades federativas desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de entidades federativas.
   */
  obtenerEntidadFederativa(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/entidad-federativa.json');
  }

  /**
   * Obtiene la lista de representaciones federales disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de representaciones federales desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de representaciones federales.
   */
  obtenerRepresentacionFederal(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/representacion-federal.json');
  }

  /**
   * @method obtenerProductorPorExportador
   * @description
   * Obtiene la lista de productores/exportadores disponibles desde un archivo JSON local.
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductorPorExportador(rfc: string): Observable<ProductorExportador> {
    return this.httpService.get<ProductorExportador>(BUSCAR_PRODUCTOR(rfc));
  }

  /**
   * @method obtenerProductorNuevo
   * @description
   * Agrega un nuevo productor/exportador al sistema.
   * @param body - Objeto que contiene el RFC del solicitante
   * @returns {Observable<unknown>} Un observable que emite la respuesta del servidor
   */
  obtenerProductorNuevo(body: { rfc_solicitante: string }): Observable<unknown> {
    return this.httpService.post<unknown>(PROC_110223.AGREGAR_PRODUCTOR, {
      body: body,
    });
  }

  /**
   * Obtiene la lista de mercancías disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de mercancías disponibles desde un archivo JSON.
   * 
   * @returns {Observable<DisponiblesTabla[]>} Un observable que emite la lista de mercancías disponibles.
   */
  obtenerMercanciasDisponibles(): Observable<DisponiblesTabla[]> {
    return this.http
      .get<DisponiblesTabla[]>('assets/json/110223/mercancia-disponsible.json');
  }

  /**
   * Obtiene la lista de mercancías seleccionadas.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de mercancías seleccionadas desde un archivo JSON.
   * 
   * @returns {Observable<SeleccionadasTabla[]>} Un observable que emite la lista de mercancías seleccionadas.
   */
  obtenerMercanciasSeleccionadas(): Observable<SeleccionadasTabla[]> {
    return this.http
      .get<SeleccionadasTabla[]>('assets/json/110223/mercancias-seleccionadas.json');
  }

  /**
   * Obtiene la lista de tratados disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de tratados desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de tratados.
   */
  obtenerTratado(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/pais.json');
  }

  /**
   * Obtiene la lista de países disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de países desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de países.
   */
  obtenerPais(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110223/pais.json');
  }
    /**
   * Obtiene los datos para la consulta del trámite.
   * @returns {Observable<RespuestaConsulta>} Observable con los datos de consulta.
   */
  getDatosConsulta(): Observable<TramiteState> {
    return this.http.get<TramiteState>('assets/json/110223/consulta_110223.json');
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
      this.store.setDestinatarioForm(DATOS.destinatarioForm)
      this.store.setDomicilioForm(DATOS.domicilioForm)
      this.store.setRepresentanteLegalForm(DATOS.representanteLegalForm)
    }
      /**
       * Obtiene la lista de mercancías desde un archivo JSON local.
       * @method obtenerMercancia
       * @returns {Observable<Mercancia[]>} Observable con la lista de mercancías.
       */
       /**
        * @method obtenerMercancia
        * @descripcion
        * Obtiene el historial de mercancías seleccionadas desde un archivo JSON local.
        * @returns {Observable<MercanciasHistorico>} Un observable que emite los datos del historial de mercancías.
        */
       obtenerMercancia(): Observable<MercanciasHistorico> {
         return this.http
           .get<MercanciasHistorico>('assets/json/110223/mercancias-seleccionadas.json');
       }
          obtenerMercancias(): Observable<MercanciasHistoricos> {
              return this.http
                .get<MercanciasHistoricos>('assets/json/110221/mercancias-seleccionadas.json');
            }
         
            /**
             * Obtiene el catálogo de unidades de medida comercial (UMC).
             * @returns Observable con la respuesta del catálogo de UMC.
             */
            getUMC(): Observable<RespuestaCatalogos> {
              return this.http.get<RespuestaCatalogos>('assets/json/110223/umc.json');
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
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getTipoFactura(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      PROC_110223.TIPO_FACTURA,
      {},
      false
    );
  }

  /**
   * Busca mercancías para el certificado de origen.
   * @param body Objeto que contiene los parámetros de búsqueda.
   * @returns Observable con la respuesta de la búsqueda de mercancías.
   */
  buscarMercanciasCert(body: { [key: string]: unknown }): Observable<{ [key: string]: unknown }> {
    return this.httpService.post<{ [key: string]: unknown }>(PROC_110223.BUSCAR, { body: body });
  }
  
  /**
   * Guarda los datos del certificado de origen.
   * @param body Objeto que contiene los datos a guardar.
   * @returns Observable con la respuesta del guardado.
   */
  guardarDatosPost(
    body: Record<string, unknown>
  ): Observable<Record<string, unknown>> {
    return this.httpService.post<Record<string, unknown>>(PROC_110223.GUARDAR, {
      body: body,
    });
  }

  /**
   * Guarda la solicitud del trámite 80208.
   * @param solicitud Objeto que contiene los datos de la solicitud a guardar.
   * @returns Observable con la respuesta del servidor.
   */
  postSolicitud(
    solicitud: unknown
  ): Observable<BaseResponse<GuadarSolicitudResponse>> {
    const ENDPOINT = `${this.servidor}` + API_POST_SOLICITUD;
    return this.http
      .post<BaseResponse<GuadarSolicitudResponse>>(ENDPOINT, solicitud)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((httpError) => {
          if (httpError instanceof HttpErrorResponse) {
            return throwError(() => ({
              success: false,
              error: httpError.error,
            }));
          }
          const ERROR = new Error(
            `Ocurrió un error al guardar la información ${ENDPOINT} `
          );
          return throwError(() => ERROR);
        })
      );
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<TramiteState> {
    return this.tramite110223Query.selectPexim$;
  }

  /** Construye el objeto destinatario a partir del estado del trámite 110214. */
  // eslint-disable-next-line class-methods-use-this
  buildMercanciasProductor(data: MercanciaTabla[]): unknown[] {
    return data.map(item => ({
      "fraccionArancelaria": item.fraccionArancelaria,
      "cantidadComercial": item.cantidad,
      "descUnidadMedidaComercial": item.unidadMedida,
      "valorTransaccional": item.valorMercancia,
      "descFactura": item.fetchFactura,
      "fechaFactura": item.fetchFactura,
      "numeroFactura": item.numeroFactura,
      "complementoDescripcion": item.complementoDescripcion,
      "rfcProductor": item.rfcProductor1
    }));
  }

  /** Construye el objeto destinatario a partir del estado del trámite 110214. */
  // eslint-disable-next-line class-methods-use-this
  buildProductoresPorExportador(data: HistoricoColumnas[]): unknown[] {
    return data.map(item => ({
      "nombreCompleto": item.nombreProductor,
      "rfc": item.numeroRegistroFiscal,
      "direccionCompleta": item.direccion,
      "correoElectronico": item.correoElectronico,
      "telefono": item.telefono,
      "fax": item.fax
    }));
  }

  /** Construye el objeto destinatario a partir del estado del trámite 110214. */
  buildCertificado(data: TramiteState): unknown {
    return {
      "tratado_acuerdo": data.formCertificado['entidadFederativa'] || 102,
      "pais_bloque": data.formCertificado['bloque'] || '',
      "fraccion_arancelaria": data.formCertificado['fraccionArancelariaForm'] || '',
      "nombre_comercial": data.formCertificado['nombreComercialForm'] || '',
      "registro_producto": data.formCertificado['registroProductoForm'] || '',
      "fecha_inicio": data.formCertificado['fechaInicio'] || '',
      "fecha_fin": data.formCertificado['fechaFin'] || '',
      "realizo_tercer_operador": { 
        "tercer_operador": data.formCertificado['si'] || false,
        "nombre": data.formCertificado['nombres'] || '',
        "primer_apellido": data.formCertificado['primerApellido'] || '',
        "segundo_apellido": data.formCertificado['segundoApellido'] || '',
        "numero_registro_fiscal": data.formCertificado['numeroDeRegistroFiscal'] || '',
        "razon_social": data.formCertificado['razonSocial'] || ''
      },
      "domicilio_tercer_operador": {
        "pais": data.formCertificado['pais'] || '',
        "ciudad": data.formCertificado['ciudad'] || '',
        "calle": data.formCertificado['calle'] || '',
        "numero_letra": data.formCertificado['numeroLetra'] || '',
        "telefono": data.formCertificado['telefono'] || '',
        "correo_electronico": data.formCertificado['correo'] || ''
      },
      "mercancias_seleccionadas": this.buildCertificadoMercancia(data.mercanciaTabla)
    }
  }

  /** Construye el objeto destinatario a partir del estado del trámite 110214. */
  buildCertificadoMercancia(data: Mercancia[]): unknown {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item) => ({
      ...item,
      id: item.id ?? '',
      fraccion_arancelaria: item.fraccionArancelaria ?? '',
      cantidad: item.cantidad ?? '',
      unidad_medida: item.umc ?? '',
      valor_mercancia: item.valorMercancia ?? '',
      tipo_factura: item.tipoFactura ?? '',
      num_factura: item.numeroFactura ?? '',
      complemento_descripcion: item.complementoDescripcion ?? '',
      fecha_factura: item.fechaFactura ?? '',
    }));
  }  /** Construye el objeto destinatario a partir del estado del trámite 110223. */
  buildDestinatario(data: TramiteState): unknown {
    const formDestinatario = data.formDestinatario || {};

    return {
      "nombre": formDestinatario['nombre'] || '',
      "primer_apellido": formDestinatario['primerApellido'] || '',
      "segundo_apellido": formDestinatario['segundoApellido'] || '',
      "numero_registro_fiscal": formDestinatario['numeroRegistroFiscal'] || '',
      "razon_social": formDestinatario['razonSocial'] || '',
      "domicilio": {
          "ciudad_poblacion_estado_provincia": formDestinatario['ciudad'] || '',
          "calle": formDestinatario['calle'] || '',
          "numero_letra": formDestinatario['numeroLetra'] || '',
          "telefono": formDestinatario['telefono'] || '',
          "fax": formDestinatario['fax'] || '',
          "correo_electronico": formDestinatario['correoElectronico'] || '',
          "pais_destino": formDestinatario['paisDestino'] || ''
      },
      "generalesRepresentanteLegal": {
          "lugarRegistro": formDestinatario['lugarRegistro'] || '',
          "nombre": formDestinatario['nombreRepresentante'] || '',
          "razonSocial": formDestinatario['razonSocialRepresentante'] || '',
          "puesto": formDestinatario['puestoRepresentante'] || '',
          "telefono": formDestinatario['telefonoRepresentante'] || '',
          "correoElectronico": formDestinatario['correoRepresentante'] || ''
        },
      "medio_transporte": formDestinatario['medioTransporte'] || "MEDTR.01"
    }
  }

}