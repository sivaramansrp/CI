import { Solicitud140103State, Tramite140103Store } from './../../../estados/tramites/tramite140103.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio para gestionar las operaciones relacionadas con la solicitud 140103.
 * 
 * Este servicio interactúa con el store `Tramite140103Store` para actualizar el estado del formulario
 * y proporciona métodos para obtener datos desde archivos JSON externos.
 *
 * @providedIn root
 */
@Injectable({
  providedIn: 'root',
})
export class Solicitud140103Service{
 /** URL base del servidor para servicios backend */
  urlServer = ENVIRONMENT.URL_SERVER;

  /** URL base para obtener catálogos JSON auxiliares */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  
  /**
   * Constructor del servicio que inyecta HttpClient y Tramite140103Store.
   * @param http Cliente HTTP para realizar peticiones REST.
   * @param tramite140103Store Store para gestionar el estado de la solicitud 140103.
   */
   constructor(private http: HttpClient, private tramite140103Store: Tramite140103Store,) {
    // Lógica de inicialización si es necesario
  }

   /**
   * Actualiza el estado del formulario en el store con los datos proporcionados.
   * Solo actualiza los campos que estén definidos en el objeto DATOS.
   *
   * @param DATOS Estado parcial o completo de la solicitud 140103.
   */
  actualizarEstadoFormulario(DATOS: Solicitud140103State): void {
    if (DATOS.regimen){
      this.tramite140103Store.setRegimen(DATOS.regimen);
    }
    if(DATOS.mecanismo){
       this.tramite140103Store.setMecanismo(DATOS.mecanismo);
    }
    if(DATOS.tratado){
      this.tramite140103Store.setTratado(DATOS.tratado);
    }
    if(DATOS.producto){
      this.tramite140103Store.setProducto(DATOS.producto);
    }
    if(DATOS.subproducto){
      this.tramite140103Store.setSubproducto(DATOS.subproducto);
    }
    if (DATOS.representacion){
      this.tramite140103Store.setRepresentacion(DATOS.representacion);
    }
    this.tramite140103Store.setCantidad(DATOS.cantidad);
  }

   /**
   * Obtiene los datos de registro para la toma de muestras de mercancías desde un archivo JSON.
   *
   * @returns Observable con el estado de la solicitud 140103.
   */
   getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud140103State> {
    return this.http.get<Solicitud140103State>('assets/json/140103/cancelacion-de-cupo.json');
  }
}