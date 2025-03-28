import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermisoModel } from '../models/permiso-plaguicidas-datos.model';

@Injectable({
  providedIn: 'root',
})
export class PermisoPlaguicidasDatosService {
  constructor(public http: HttpClient) {}

  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260215/banco-options.json');
  }

   /**
   * Obtiene los datos de terceros relacionados desde un archivo JSON local.
   *
   * @returns Observable que emite un arreglo de objetos Catalogo.
   */
   getData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      'assets/json/260215/terceros-relacionados.json'
    );
  }

  getTable(): Observable<PermisoModel[]> {
    return this.http.get<PermisoModel[]>('assets/json/260215/terceros.json');
  }
}
