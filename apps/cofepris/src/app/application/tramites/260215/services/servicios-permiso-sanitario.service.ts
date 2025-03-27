import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import {
  MercanciasTabla,
  RespuestaTabla,
} from '../components/domicilio-establecimiento/domicilio-establecimiento.component';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermisoModel } from '../models/permiso-sanitario.model';

@Injectable({
  providedIn: 'root',
})
export class ServiciosPermisoSanitarioService {
  constructor(private http: HttpClient) {
    // to be initilized
  }

  getBancoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('./assets/json/260215/banco-options.json');
  }
  getDatos(): Observable<unknown> {
    return this.http.get('assets/json/260215/derechos.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  getProveedordata(): Observable<unknown> {
    return this.http.get('assets/json/260215/proveedor.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }
  getLocalidaddata(): Observable<unknown> {
    return this.http.get('assets/json/260215/estadolocalidad.json').pipe(
      catchError((error: unknown) => {
        return throwError(() => error);
      })
    );
  }

  getTable(): Observable<PermisoModel[]> {
    return this.http.get<PermisoModel[]>('assets/json/260215/terceros.json');
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

  getObtenerEstadoList() {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/260215/seleccion.json'
    );
  }

  getObtenerTablaDatos() {
    return this.http.get<RespuestaTabla>('assets/json/260215/tablaDatos.json');
  }

  getObtenerMercanciasDatos() {
    return this.http.get<MercanciasTabla>(
      'assets/json/260215/mercanciasDatos.json'
    );
  }
}
