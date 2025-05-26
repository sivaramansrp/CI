import { Solicitud140103State, Tramite140103Store } from './../../../estados/tramites/tramite140103.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solicitud140103Service{
/**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

   constructor(private http: HttpClient, private tramite140103Store: Tramite140103Store,) {
    // Lógica de inicialización si es necesario
  }

  actualizarEstadoFormulario(DATOS: Solicitud140103State): void {
    this.tramite140103Store.setRegimen(DATOS.regimen);
    this.tramite140103Store.setMecanismo(DATOS.mecanismo);
    this.tramite140103Store.setTratado(DATOS.tratado);
    this.tramite140103Store.setProducto(DATOS.producto);
    this.tramite140103Store.setSubproducto(DATOS.subproducto);
    this.tramite140103Store.setRepresentacion(DATOS.representacion);
    this.tramite140103Store.setCantidad(DATOS.cantidad);
  }

   getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud140103State> {
    return this.http.get<Solicitud140103State>('assets/json/140103/cancelacion-de-cupo.json');
  }
}