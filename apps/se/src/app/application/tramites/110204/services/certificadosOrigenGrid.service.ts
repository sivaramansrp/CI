import { Catalogo, HttpCoreService } from '@libs/shared/data-access-user/src';
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
  constructor(private http: HttpClient,private httpService: HttpCoreService, private store: Tramite110204Store,private query:Tramite110204Query) { }

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
buscarMercanciasCert(body: any): Observable<any> {
  // return this.httpService.post<any>(
  //   'http://localhost:8080/api/sat-t110204/solicitud/buscar-mercancias',
  //   { body: body }
  // );
   return this.httpService.post<any>(PROC_110204.BUSCAR, { body: body });
}

/**
 * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
 * 
 * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
 * @returns Observable con la respuesta de la solicitud POST.
 */
guardarDatosPost(body: any): Observable<any> {
  return this.httpService.post<any>(PROC_110204.GUARDAR, { body: body });
  // return this.httpService.post<any>('http://localhost:8080/api/sat-t110204/solicitud/guardar', { body: body });
}
}