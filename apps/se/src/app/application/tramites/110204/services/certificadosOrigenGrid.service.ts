import { Observable, map } from 'rxjs';
import { Tramite110204Store, TramiteState } from '../estados/tramite110204.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../../../shared/models/modificacion.enum';
import { Mercancias } from '../models/plantas-consulta.model';

@Injectable({
  providedIn: 'root'
})
export class CertificadosOrigenGridService {
  constructor(private http: HttpClient, private store: Tramite110204Store) { }

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
  obtenerMercancia(): Observable<Mercancias[]> {
    return this.http
      .get<{ data: Mercancias[] }>('assets/json/110204/mercancia.json') // Solicita los datos del archivo JSON
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

}
