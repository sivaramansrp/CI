
import { CatalogoLista, VehiculoTabla } from '../../models/registro-muestras-mercancias.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * @service modificarTerrestreService
 * @description
 * Servicio para gestionar las operaciones relacionadas con el aviso de traslado terrestre en el trámite 40101.
 * Proporciona métodos para obtener catálogos, tablas de vehículos y otros datos necesarios para el trámite.
 *
 * @providedIn root
 */
@Injectable({
  providedIn: 'root'
})
export class modificarTerrestreService {
   /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar peticiones a recursos locales o remotos.
   */
  constructor(private http: HttpClient) {
    // Constructor
  }
  
 /**
   * Obtiene el catálogo de tipos de vehículo de arrastre.
   * @returns Observable con la lista de catálogos de tipos de vehículo.
   */
  obtenerTipoDeVehiculo(): Observable<CatalogoLista> {
    return this.http.get<CatalogoLista>(`assets/json/40101/tipo-vehiculo-arrastre.json`);
  }
  /**
   * Obtiene la tabla de pedimentos de vehículos.
   * @returns Observable con la tabla de vehículos.
   */
   obtenerPedimentoTabla(): Observable<VehiculoTabla> {
    return this.http.get<VehiculoTabla>(`assets/json/40101/vahiculo-dummy.json`);
  }
 
}