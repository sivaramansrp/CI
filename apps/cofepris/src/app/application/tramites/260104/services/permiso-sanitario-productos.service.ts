import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CatalogosSelect, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { MercanciasTabla, RespuestaTabla } from '@libs/shared/data-access-user/src/core/models/260104/domicilo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisoSanitarioProductosService {

  constructor(public http: HttpClient) {
    // Constructor vacío, no requiere inicialización adicional.
  }

  obtenerEstadoCatalogo(): Observable<CatalogosSelect> {
    return this.http
      .get<CatalogosSelect>('../../../assets/json/260104/estado-catalogo.json')
      .pipe();
  }

  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/260104/tablaDatos.json');
  }

  obtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/260104/seleccion.json');
  }

  obtenerMercanciasDatos(): Observable<MercanciasTabla> {
    return this.http.get<MercanciasTabla>('assets/json/260104/mercanciasDatos.json');
  }
}
