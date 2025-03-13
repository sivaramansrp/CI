import { InfoServicios, Servicio } from '../models/autorizacion-programa-nuevo.model';
import { Observable, map } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionProgrmaNuevoService {
 constructor(private readonly http: HttpClient) {
   // No se necesita lógica de inicialización adicional.
  }

  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
  getDatos(): Observable<InfoServicios> {
    return this.http
    .get<Servicio[]>("assets/json/80205/ampliacion-servicios.json")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .pipe(map((res: any) => res.data.InfoServicios));
}
   
  /**
   * Obtiene la lista de selección de ingreso desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
  obtenerIngresoSelectList(): Observable<Catalogo[]> {
    return this.http
    .get<Catalogo[]>("assets/json/80205/ampliacion-IMMEX-dropdown.json")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .pipe(map((res: any) => res.data));
  }

}
