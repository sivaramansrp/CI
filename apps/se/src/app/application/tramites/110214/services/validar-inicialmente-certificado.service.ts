import { CatalogoLista, DisponiblesTabla, SeleccionadasTabla } from '../models/validar-inicialmente-certificado.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductorExportador } from '../models/validar-inicialmente-certificado.model';
/**
 * Servicio para validar inicialmente los datos del certificado en el trámite 110214.
 * 
 * Este servicio proporciona métodos para obtener información necesaria para el trámite,
 * como idiomas, entidades federativas, representaciones federales, mercancías disponibles,
 * mercancías seleccionadas, productores por exportador, tratados y países.
 */
@Injectable({
  providedIn: 'root'
})
export class ValidarInicialmenteCertificadoService {

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes a los recursos.
   */
  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de idiomas disponibles.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de idiomas.
   */
  obtenerIdioma(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/idioma.json');
  }

  /**
   * Obtiene la lista de entidades federativas.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de entidades federativas.
   */
  obtenerEntidadFederativa(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/entidad-federativa.json');
  }

  /**
   * Obtiene la lista de representaciones federales.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de representaciones federales.
   */
  obtenerRepresentacionFederal(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/representacion-federal.json');
  }

  /**
   * Obtiene la información del productor por exportador.
   * 
   * @returns {Observable<ProductorExportador>} Un observable con los datos del productor por exportador.
   */
  obtenerProductorPorExportador(): Observable<ProductorExportador> {
    return this.http.get<ProductorExportador>('assets/json/110214/productor-exportador.json');
  }

  /**
   * Obtiene la lista de mercancías disponibles.
   * 
   * @returns {Observable<DisponiblesTabla[]>} Un observable con la lista de mercancías disponibles.
   */
  obtenerMercanciasDisponibles(): Observable<DisponiblesTabla[]> {
    return this.http.get<DisponiblesTabla[]>('assets/json/110214/mercancia-disponsible.json');
  }

  /**
   * Obtiene la lista de mercancías seleccionadas.
   * 
   * @returns {Observable<SeleccionadasTabla[]>} Un observable con la lista de mercancías seleccionadas.
   */
  obtenerMercanciasSeleccionadas(): Observable<SeleccionadasTabla[]> {
    return this.http.get<SeleccionadasTabla[]>('assets/json/110214/mercancias-seleccionadas.json');
  }

  /**
   * Obtiene la lista de tratados disponibles.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de tratados.
   */
  obtenerTratado(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/pais.json');
  }

  /**
   * Obtiene la lista de países disponibles.
   * 
   * @returns {Observable<CatalogoLista>} Un observable con la lista de países.
   */
  obtenerPais(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>('assets/json/110214/pais.json');
  }
}