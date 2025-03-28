import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src';
import {
  MercanciasTabla,
  RespuestaTabla,
} from '../components/domicilio-establecimiento/domicilio-establecimiento.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoModel } from '../models/datos-domicilio-legal.model';

@Injectable({
  providedIn: 'root',
})
export class TercerosFabricanteService {
  constructor(public http: HttpClient) {}

  getObtenerEstadoList() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/260501/seleccion.json'
    );
  }

  getObtenerTablaDatos() {
    return this.http.get<RespuestaTabla>('assets/json/260501/tablaDatos.json');
  }

  getObtenerMercanciasDatos() {
    return this.http.get<MercanciasTabla>(
      'assets/json/260501/mercanciasDatos.json'
    );
  }
  /**
   * Obtiene los datos de terceros relacionados desde un archivo JSON local.
   *
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
  getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      'assets/json/260501/terceros-relacionados.json'
    );
  }

  getTable(): Observable<PermisoModel[]> {
    return this.http.get<PermisoModel[]>('assets/json/260501/terceros.json');
  }
}
