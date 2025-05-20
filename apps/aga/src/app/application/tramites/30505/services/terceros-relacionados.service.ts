import { AvisoAgente, FusionDatos, FusionEscision, TercerosRelacionados } from '../../../core/models/30505/aviso-modificacion.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio para gestionar operaciones relacionadas con terceros en el trámite 30505.
 * 
 * Proporciona métodos para obtener datos de terceros relacionados y datos de personas
 * a través de archivos JSON locales.
 * 
 * @remarks
 * Este servicio utiliza inyección de dependencias para acceder al cliente HTTP de Angular.
 */
@Injectable({
  providedIn: 'any'
})
export class TercerosRelacionadosService {
  /**
   * Constructor del servicio.
   * 
   * @param http - Cliente HTTP utilizado para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient) {
     // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene los datos del programa a cancelar desde un archivo JSON local.
   * 
   * @returns Observable que emite los datos del programa a cancelar.
   */
  obtenerDatos(): Observable<TercerosRelacionados> {
    return this.http.get<TercerosRelacionados>(`assets/json/30505/aviso.json`);
  }

  /**
   * @description
   * Obtiene los datos de una persona fusionando información desde un archivo JSON local,
   * utilizando el RFC proporcionado como parámetro de consulta.
   *
   * @param rfc El Registro Federal de Contribuyentes (RFC) de la persona a consultar.
   * @returns Un observable que emite un objeto de tipo FusionDatos con la información de la persona.
   *
   * @memberof TercerosRelacionadosService
   */
  obtenerDatosPersona(rfc: string): Observable<FusionDatos> {
    return this.http.get<FusionDatos>(`assets/json/30505/fusion.json`, { params: { rfc } });
  }

  /**
   * Fuente de datos reactiva que mantiene una lista de objetos de tipo `FusionEscision`.
   * Utiliza `BehaviorSubject` para emitir el estado actual y notificar a los suscriptores sobre cualquier cambio.
   * 
   * @private
   */
  private fusionSource = new BehaviorSubject<FusionEscision[]>([]);

  /**
   * Observable que expone el estado actual de la fuente de datos de fusión.
   * Permite a los suscriptores recibir actualizaciones cuando los datos de fusión cambian.
   */
  fusion$ = this.fusionSource.asObservable();

  /**
   * Actualiza la fuente de datos de fusiones con la lista proporcionada.
   *
   * @param data - Arreglo de objetos de tipo FusionEscision que representa las fusiones a establecer.
   */
  setFusionada(data: FusionEscision[]): void {
    this.fusionSource.next(data);
  }

  /**
   * Fuente de datos reactiva que mantiene una lista de objetos AvisoAgente.
   * Utiliza BehaviorSubject para emitir el estado actual y notificar a los suscriptores sobre cualquier cambio.
   * 
   * @private
   * @type {BehaviorSubject<AvisoAgente[]>}
   */
  private agenteSource = new BehaviorSubject<AvisoAgente[]>([]);

  /**
   * Observable que expone el estado actual del agente relacionado.
   * 
   * Permite a los componentes suscribirse para recibir actualizaciones
   * cuando el agente cambia en el flujo de la aplicación.
   */
  agente$ = this.agenteSource.asObservable();

  /**
   * Actualiza la fuente de datos de agentes con la lista proporcionada.
   *
   * @param data - Arreglo de objetos de tipo AvisoAgente que representa los agentes a establecer.
   */
  setAgente(data: AvisoAgente[]): void {
    this.agenteSource.next(data);
  }

}