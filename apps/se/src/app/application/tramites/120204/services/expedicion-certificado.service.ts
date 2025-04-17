import { DetalledelaLicitacion, DistribucionSaldo, LicitacionesDisponibles } from '../../../shared/models/expedicion-certificado.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Servicio para la gestión de datos relacionados con la expedición de certificados.
 * Proporciona métodos para obtener información desde archivos JSON locales.
 */
@Injectable({
  providedIn: 'root'
})
export class ExpedicionCertificadoService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP utilizado para realizar solicitudes a los archivos JSON.
   */
  constructor(private http: HttpClient) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el catálogo de entidades federativas.
   * @returns Un observable que emite los datos del catálogo de entidades federativas.
   */
  getEntidadFederativa(): Observable<Catalogo> {
    return this.http.get<Catalogo>('assets/json/120204/entidad-federativa.json');
  }

  /**
   * Obtiene el catálogo de representaciones federales.
   * @returns Un observable que emite los datos del catálogo de representaciones federales.
   */
  getRepresentacionFederal(): Observable<Catalogo> {
    return this.http.get<Catalogo>('assets/json/120204/representacion-federal.json');
  }

  /**
   * Obtiene los detalles de la licitación.
   * @returns Un observable que emite los datos de los detalles de la licitación.
   */
  getDetallesDelalicitacion(): Observable<DetalledelaLicitacion> {
    return this.http.get<DetalledelaLicitacion>('assets/json/120204/detalles-licitacion.json');
  }

  /**
   * Obtiene la distribución del saldo.
   * @returns Un observable que emite los datos de la distribución del saldo.
   */
  getDistribucionSaldo(): Observable<DistribucionSaldo> {
    return this.http.get<DistribucionSaldo>('assets/json/120204/distribucion-saldo.json');
  }

  /**
   * Obtiene los datos de la tabla de licitaciones disponibles.
   * @returns Un observable que emite los datos de la tabla de licitaciones disponibles.
   */
  obtenerDatosTabla(): Observable<LicitacionesDisponibles> {
    return this.http.get<LicitacionesDisponibles>('assets/json/120204/datos-de-la-tabla.json');
  }
}
