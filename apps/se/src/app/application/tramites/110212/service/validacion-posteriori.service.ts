import { CatalogoLista, DisponiblesTabla, RespuestaConsulta, SeleccionadasTabla } from '../models/validacion-posteriori.model';
import { Tramite110212State, Tramite110212Store } from '../../../estados/tramites/tramite110212.store';
import { HttpClient } from '@angular/common/http';
import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROC_110212 } from '../servers/api-route';
import { ProductorExportador } from '../models/validacion-posteriori.model'
import { Tramite110212Query } from '../../../estados/queries/tramite110212.query';

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
export class ValidacionPosterioriService {
  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient,private httpService: HttpCoreService, private store: Tramite110212Store,private query:Tramite110212Query) { }


  /**
   * Obtiene la lista de idiomas disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de idiomas desde un archivo JSON.
   * 
   * @returns {Observable<CatalogoLista>} Un observable que emite la lista de idiomas.
   */
  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http
      .get<CatalogoLista>('assets/json/110212/idioma.json');
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
      .get<CatalogoLista>('assets/json/110212/entidad-federativa.json');
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
      .get<CatalogoLista>('assets/json/110212/representacion-federal.json');
  }

  /**
   * Obtiene la lista de productores/exportadores disponibles.
   * 
   * Este método realiza una solicitud HTTP para obtener los datos de productores/exportadores desde un archivo JSON.
   * 
   * @returns {Observable<ProductorExportador>} Un observable que emite la lista de productores/exportadores.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http
      .get<ProductorExportador>('assets/json/110212/productor-exportador.json');
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
      .get<DisponiblesTabla[]>('assets/json/110212/mercancia-disponsible.json');
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
      .get<SeleccionadasTabla[]>('assets/json/110212/mercancias-seleccionadas.json');
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
      .get<CatalogoLista>('assets/json/110212/pais.json');
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
      .get<CatalogoLista>('assets/json/110212/pais.json');
  }
  /**
   * @method getDatosConsulta
   * @description Obtiene los datos de consulta desde un archivo JSON local.
   * 
   * Este método realiza una solicitud HTTP GET para obtener los datos de consulta simulados desde el archivo `consulta_11201.json`.
   * 
   * @returns {Observable<RespuestaConsulta>} Un observable que emite la respuesta de los datos de consulta.
   */
  getDatosConsulta(): Observable<RespuestaConsulta> {
    return this.http.get<RespuestaConsulta>(`assets/json/110212/consulta-110212.json`);
  }

  /**
 * Obtiene todos los datos del estado almacenado en el store.
 * @returns {Observable<Tramite110212State>} Observable con todos los datos del estado.
 */
getAllState(): Observable<Tramite110212State> {
  return this.query.selectSolicitud$;
}

/**
 * 
 * @param body - Objeto que contiene los datos para buscar mercancías.
 * @returns 
 */
buscarMercanciasCert(body: any): Observable<any> {
  // return this.httpService.post<any>(
  //   'http://localhost:8080/api/sat-t110212/solicitud/buscar-mercancias',
  //   { body: body }
  // );
   return this.httpService.post<any>(PROC_110212.BUSCAR, { body: body });
}

/**
 * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
 * 
 * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
 * @returns Observable con la respuesta de la solicitud POST.
 */
guardarDatosPost(body: any): Observable<any> {
  return this.httpService.post<any>(PROC_110212.GUARDAR, { body: body });
  // return this.httpService.post<any>('http://localhost:8080/api/sat-t110212/solicitud/guardar', { body: body });
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
        fraccionArancelaria?: string;
        nombreTecnico?: string;
        nombreComercial?: string;
        numeroDeRegistrodeProductos?: string;
        fechaExpedicion?: string;
        fechaVencimiento?: string;
        tipoFactura?: string;
        numFactura?: string;
        complementoDescripcion?: string;
        fechaFactura?: string;
        cantidad?: string;
        umc?: string;
        unidadMedida?: string;
        valorMercancia?: string;
      };

      RESULT.push({
        id: ITEM.id,
        fraccion_arancelaria: ITEM.fraccionArancelaria,
        cantidad: ITEM.cantidad,
        unidad_medida: ITEM.unidadMedida,
        valor_mercancia: ITEM.valorMercancia,
        nombreTecnico: ITEM.nombreTecnico,
        nombre_comercial: ITEM.nombreComercial,
        registro_producto: ITEM.numeroDeRegistrodeProductos,
        fechaExpedicion: ITEM.fechaExpedicion,
        fechaVencimiento: ITEM.fechaVencimiento,
        tipo_factura: ITEM.tipoFactura,
        num_factura: ITEM.numFactura,
        complemento_descripcion: ITEM.complementoDescripcion,
        fecha_factura: ITEM.fechaFactura,
        umc: ITEM.umc,
      });
    });

    return RESULT;
  }
}