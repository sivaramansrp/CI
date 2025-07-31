import {
  MercanciasTabla,
  RespuestaTabla,
} from '../../../shared/components/domicilio-establecimiento-aduanas/domicilio-establecimiento-aduanas.component';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class DatosDomicilioService {

  /**
   * Subject utilizado para emitir y escuchar eventos personalizados dentro del servicio.
   * Puede ser suscrito para comunicación basada en eventos entre componentes o servicios.
   * @private
   */
  private eventSubject = new Subject();
  /**
   * Flujo observable que emite eventos desde el subject interno de eventos.
   * Suscríbete a este observable para escuchar notificaciones de eventos.
   */
  event$ = this.eventSubject.asObservable();
  /**
   * Servicio para obtener datos de terceros relacionados y permisos.
   *
   * @param http - Instancia de HttpClient para realizar solicitudes HTTP.
   */
  constructor(public http: HttpClient) {
    // Constructor del servicio
  }

  /**
   * Obtiene los datos de la tabla desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto RespuestaTabla.
   */
  getObtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/cofepris/clave-scian.json');
  }

  /**
   * Obtiene los datos de mercancías desde un archivo JSON local.
   *
   * @returns Observable que emite un objeto MercanciasTabla.
   */
  getObtenerMercanciasDatos(): Observable<MercanciasTabla> {
    return this.http.get<MercanciasTabla>(
      'assets/json/cofepris/mercancias-tabla.json'
    );
  }

  /**
   * Emite un evento booleano a los suscriptores a través de eventSubject.
   *
   * @param datos - El valor booleano que se emitirá a los observadores.
   */
  emitEvent(datos: boolean): void {
    this.eventSubject.next(datos);
  }
}
