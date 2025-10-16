import { ENVIRONMENT, HttpCoreService, JSONResponse } from '@ng-mf/data-access-user';
import { Solicitud110207State,Tramite110207Store,} from '../state/Tramite110207.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROC_110207 } from '../servers/api-route';
import { Tramite110207Query } from '../state/Tramite110207.query';

/**
 * Servicio para gestionar las solicitudes relacionadas con los catálogos y datos del trámite 110207.
 */
@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  /**
   * URL base del servidor principal.
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
   * URL base del servidor de catálogos auxiliares.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(
    private http: HttpClient,
    public tramiteQuery: Tramite110207Query,
    private httpService: HttpCoreService,
    private tramite110207Store: Tramite110207Store
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  /**
   * Actualiza el estado global del formulario con los datos proporcionados.
   * @param DATOS Objeto con los datos del formulario de tipo Solicitud110207State.
   */
  actualizarEstadoFormulario(DATOS: Solicitud110207State): void {
    this.tramite110207Store.setTratado(DATOS.tratado);
    this.tramite110207Store.setPais(DATOS.pais);
    this.tramite110207Store.setFraccionArancelaria(DATOS.fraccionArancelaria);
    this.tramite110207Store.setNumRegistro(DATOS.numeroRegistro);
    this.tramite110207Store.setNomComercial(DATOS.nombreComercial);
    this.tramite110207Store.setFechInicioB(DATOS.fechaInicial);
    this.tramite110207Store.setFechFinB(DATOS.fechaFinal);
    this.tramite110207Store.setArchivo(DATOS.archivo);
    this.tramite110207Store.setObservaciones(DATOS.observaciones);
    this.tramite110207Store.setPresica(DATOS.presica);
    this.tramite110207Store.setPresenta(DATOS.presenta);
    this.tramite110207Store.setIdioma(DATOS.idioma);
    this.tramite110207Store.setEntidad(DATOS.entidad);
    this.tramite110207Store.setRepresentacion(DATOS.representacion);
    this.tramite110207Store.setNombre(DATOS.nombre);
    this.tramite110207Store.setApellidoPrimer(DATOS.apellidoPrimer);
    this.tramite110207Store.setApellidoSegundo(DATOS.apellidoSegundo);
    this.tramite110207Store.setNumeroFiscal(DATOS.numeroFiscal);
    this.tramite110207Store.setRazonSocial(DATOS.razonSocial);
    this.tramite110207Store.setCiudad(DATOS.ciudad);
    this.tramite110207Store.setCalle(DATOS.calle);
    this.tramite110207Store.setNumeroLetra(DATOS.numeroLetra);
    this.tramite110207Store.setLada(DATOS.lada);
    this.tramite110207Store.setTelefono(DATOS.telefono);
    this.tramite110207Store.setFax(DATOS.fax);
    this.tramite110207Store.setCorreoElectronico(DATOS.correoElectronico);
    this.tramite110207Store.setNacion(DATOS.nacion);
    this.tramite110207Store.setTransporte(DATOS.transporte);
    this.tramite110207Store.setfraccionMercanArancelaria(
      DATOS.fraccionMercanciaArancelaria
    );
    this.tramite110207Store.setnombretecnico(DATOS.nombreTecnico);
    this.tramite110207Store.setnomreeningles(DATOS.nombreEnIngles);
    this.tramite110207Store.setcriterioparaconferir(DATOS.criterioParaConferir);
    this.tramite110207Store.setmarca(DATOS.marca);
    this.tramite110207Store.setcantidad(DATOS.cantidad);
    this.tramite110207Store.setUMC(DATOS.umc);
    this.tramite110207Store.setvalordelamercancia(DATOS.valorDelaMercancia);
    this.tramite110207Store.setcomplementodeladescripcion(
      DATOS.complementoDelaDescripcion
    );
    this.tramite110207Store.setmasabruta(DATOS.masaBruta);
    this.tramite110207Store.setnombrecomercialdelamercancia(
      DATOS.nombreComercialDelaMercancia
    );
    this.tramite110207Store.setUnidadMedida(DATOS.unidadMedida);
    this.tramite110207Store.setTipoFactura(DATOS.tipoFactura);
    this.tramite110207Store.setFecha(DATOS.fecha);
    this.tramite110207Store.setNFactura(DATOS.numeroFactura);
    this.tramite110207Store.setJustificacion(DATOS.justificacion);
    this.tramite110207Store.setCheckbox(DATOS.casillaVerificacion);
    this.tramite110207Store.setEstablecerSiCasilla(DATOS.siCasilla);
    this.tramite110207Store.setRutaCompleta(DATOS.rutaCompleta);
    this.tramite110207Store.setPuertoEmbarque(DATOS.puertoEmbarque);
    this.tramite110207Store.setPuertoDesembarque(DATOS.puertoDesembarque);
  }
  /**
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   * @returns Observable con los datos del formulario.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud110207State> {
    return this.http.get<Solicitud110207State>(
      'assets/json/110207/registro_toma_muestras_mercancias.json'
    );
  }

  /**
   * Obtiene un catálogo específico por su identificador.
   * @param id Identificador del catálogo.
   * @returns Observable con la respuesta del catálogo solicitado.
   */
  getCatalogoById(id: number): Observable<JSONResponse> {
    return this.http.get<JSONResponse>(`${this.urlServerCatalogos}/${id}`);
  }

  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns {Observable<TramiteState>} Observable con todos los datos del estado.
   */
  getAllState(): Observable<Solicitud110207State> {
    return this.tramiteQuery.selectState$;
  }

  /**
   * Realiza una búsqueda de mercancías utilizando los criterios proporcionados en el cuerpo de la solicitud.
   * @param body Objeto que contiene los criterios de búsqueda.
   * @returns Observable con la respuesta de la búsqueda de mercancías.
   */
  buscarMercanciasCert(
    body: Record<string, unknown>
  ): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_110207.BUSCAR, {
      body: body,
    });
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
        id?: number;
        fraccionArancelaria: string;
        cantidad?: string;
        valorMercancia?: string;
        nombreTecnico: string;
        nombreComercial: string;
        numeroDeRegistrodeProductos: string;
        umc?: string;
        fechaExpedicion: string;
        fechaVencimiento: string;
        tipoFactura?: string;
        numeroFactura?: string;
        complementoDescripcion?: string;
        fechaFactura?: string;
      };

      RESULT.push({
        id: ITEM.id,
        fraccion_arancelaria: ITEM.fraccionArancelaria,
        cantidad:ITEM.cantidad,
        unidad_medida:ITEM.umc,
        valor_mercancia:ITEM.valorMercancia,
        nombreTecnico:ITEM.nombreTecnico,
        nombre_comercial:ITEM.nombreComercial,
        registro_producto:ITEM.numeroDeRegistrodeProductos,
        fechaExpedicion:ITEM.fechaExpedicion,
        fechaVencimiento:ITEM.fechaVencimiento,
        tipo_factura:ITEM.tipoFactura,
        num_factura:ITEM.numeroFactura,
        complemento_descripcion:ITEM.complementoDescripcion,
        fecha_factura:ITEM.fechaFactura,
      });
    });

    return RESULT;
  }

  /**
   * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
   *
   * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
   * @returns Observable con la respuesta de la solicitud POST.
   */
  guardarDatosPost(body: Record<string, unknown>): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_110207.GUARDAR, {
      body: body,
    });
  }
}
