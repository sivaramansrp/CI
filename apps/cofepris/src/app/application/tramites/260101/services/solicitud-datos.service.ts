import {
  DatosDeSolicitud,
  RadioOptions,
} from '../models/solicitud-datos.model';
import {
  DestinatarioImitar,
  TercerosDestinatarioImitar,
} from '../models/mercancia.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { ClavesDeLotes } from '../models/claves-de-lotes.model';
import { Destinatario } from '../models/destinatario.model';
import { DestinatarioCatalogos } from '../models/destinatario.model';
import { Fabricante } from '../models/fabricante.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mercancia } from '../models/mercancia.model';
import { MercanciaCatalogos } from '../models/mercancia.model';
import { MercanciaCrossList } from '../models/mercancia.model';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitud-datos.model';
/**
 * Servicio `SolicitudDatosService`.
 * Este servicio se encarga de gestionar las operaciones relacionadas con los datos de la solicitud 260101.
 * Realiza llamadas HTTP para obtener catálogos, datos de mercancías, destinatarios, pagos y más.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudDatosService {
  /**
   * Constructor del servicio.
   * @param http - Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(public http: HttpClient) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  /**
   * Obtiene los datos generales de la solicitud.
   * @returns Observable con los datos de la solicitud.
   */
  obtenerDatosDeSolicitud(): Observable<DatosDeSolicitud> {
    return this.http
      .get<DatosDeSolicitud>('assets/json/260101/solicitud-datos.json')
      .pipe();
  }

  /**
   * Obtiene los datos de la solicitud específica.
   * @returns Observable con la solicitud.
   */
  obtenerSolicitud(): Observable<Solicitud> {
    return this.http.get<Solicitud>('assets/json/260101/solicitud.json').pipe();
  }

  /**
   * Obtiene el catálogo de regímenes disponibles.
   * @returns Observable con el catálogo de regímenes.
   */
  obtenerRegimenDestinaraListo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('assets/json/260101/regimen-destinaran.json')
      .pipe();
  }

  /**
   * Obtiene el catálogo de aduanas disponibles.
   * @returns Observable con el catálogo de aduanas.
   */
  obtenerAduanaListo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('assets/json/260101/aduana.json')
      .pipe();
  }

  /**
   * Obtiene el catálogo de estados disponibles.
   * @returns Observable con el catálogo de estados.
   */
  obtenerEstadoCatalogo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('assets/json/260101/estado-catalogo.json')
      .pipe();
  }

  /**
   * Obtiene la lista de mercancías disponibles.
   * @returns Observable con la lista de mercancías.
   */
  obtenerMercanciaListo(): Observable<Mercancia[]> {
    return this.http
      .get<Mercancia[]>('assets/json/260101/mercancia.json')
      .pipe();
  }

  /**
   * Obtiene la lista de claves de lotes disponibles.
   * @returns Observable con las claves de lotes.
   */
  obtenerClavesDeLotesListo(): Observable<ClavesDeLotes[]> {
    return this.http
      .get<ClavesDeLotes[]>('assets/json/260101/claves-de-lotes.json')
      .pipe();
  }

  /**
   * Obtiene la lista de destinatarios disponibles.
   * @returns Observable con los destinatarios.
   */
  obtenerDestinatarioListo(): Observable<Destinatario[]> {
    return this.http
      .get<Destinatario[]>('assets/json/260101/destinatario.json')
      .pipe();
  }

  /**
   * Obtiene la lista de fabricantes disponibles.
   * @returns Observable con los fabricantes.
   */
  obtenerFabricanteListo(): Observable<Fabricante[]> {
    return this.http
      .get<Fabricante[]>('assets/json/260101/fabricante.json')
      .pipe();
  }

  /**
   * Obtiene los catálogos relacionados con los destinatarios.
   * @returns Observable con los catálogos de destinatarios.
   */
  obtenerDestinatarioCatalogos(): Observable<DestinatarioCatalogos> {
    return this.http
      .get<DestinatarioCatalogos>(
        'assets/json/260101/destinatario-catalogos.json'
      )
      .pipe();
  }

  /**
   * Obtiene las opciones de selección de tipo de persona (radio).
   * @returns Observable con las opciones de tipo de persona.
   */
  obtenerDestinatarioRadio(): Observable<RadioOptions[]> {
    return this.http
      .get<RadioOptions[]>('assets/json/260101/destinatario-radio.json')
      .pipe();
  }

  /**
   * Obtiene las opciones de selección de fabricante (radio).
   * @param {string} tipo - Tipo de fabricante (nacional o extranjero).
   * @returns Observable con las opciones de fabricante.
   * */
  obtenerFabricanteRadio(): Observable<RadioOptions[]> {
    return this.http
      .get<RadioOptions[]>('assets/json/260101/fabricante-radio.json')
      .pipe();
  }

  /**
   * Obtiene las opciones de selección de tipo de persona (radio).
   * @returns Observable con las opciones de tipo de persona.
   */
  obtenerTercerosNacionalidadRadioOptions(): Observable<RadioOptions[]> {
    return this.http
      .get<RadioOptions[]>(
        'assets/json/260101/terceros-nacionalidad-radio.json'
      )
      .pipe();
  }

  /**
   * Obtiene los catálogos relacionados con las mercancías.
   * @returns Observable con los catálogos de mercancías.
   */
  obtenerMercanciaCatalogos(): Observable<MercanciaCatalogos> {
    return this.http
      .get<MercanciaCatalogos>('assets/json/260101/mercancia-catalogos.json')
      .pipe();
  }

  /**
   * Obtiene las listas cruzadas relacionadas con la mercancía.
   * @returns Observable con las listas cruzadas de la mercancía.
   */
  obtenerCrosslisto(): Observable<MercanciaCrossList> {
    return this.http
      .get<MercanciaCrossList>('assets/json/260101/mercancia-cross-list.json')
      .pipe();
  }

  /**
   * Obtiene los datos relacionados con el pago de derechos.
   * @returns Observable con los datos de pago de derechos.
   */
  obtenerPagoDerechos(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('assets/json/260101/pago-derechos.json')
      .pipe();
  }

  /**
   * Obtiene un destinatario basado en datos de ejemplo (mock).
   * @returns Observable con un destinatario de ejemplo.
   */
  obtenerDestinatarioImitar(): Observable<DestinatarioImitar> {
    return this.http
      .get<DestinatarioImitar>('assets/json/260101/destinatario-mock.json')
      .pipe();
  }

  /**
   * @returns Observable con un destinatario de terceros de ejemplo.
   */
  obtenerTercerosDestinatarioImitar(): Observable<TercerosDestinatarioImitar> {
    return this.http
      .get<TercerosDestinatarioImitar>(
        'assets/json/260101/terceros-destinatario-mock.json'
      )
      .pipe();
  }
}
