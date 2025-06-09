
import { Tramite120404State, Tramite120404Store } from '../estados/store/tramite120404.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
/**
   * @constructor
   * @description
   * Constructor que inyecta `HttpClient` para realizar solicitudes HTTP y `Tramite120404Store`
   * para gestionar el estado del trámite.
   *
   * @param {HttpClient} http - Servicio HTTP para la obtención de datos.
   * @param {Tramite120404Store} tramite120404Store - Tienda Akita para la gestión del estado.
   */
  constructor(private http:HttpClient,private tramite120404Store: Tramite120404Store) { }
 
  /**
   * @method actualizarEstadoFormulario
   * @description
   * Actualiza el estado del formulario con los datos proporcionados.
   *
   * @param {Tramite120404State} DATOS - Datos del trámite que se van a establecer en el estado.
   */
  actualizarEstadoFormulario(DATOS:Tramite120404State): void {
    this.tramite120404Store.establecerDatos(DATOS);
  }

  /**
   * @method getRegistroTomaMuestrasMercanciasData
   * @description
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   *
   * @returns {Observable<Tramite120404State>} - Un observable que emite el estado del trámite.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite120404State> {
    return this.http.get<Tramite120404State>('assets/json/120404/asignciondirecta.json');
  }
}
