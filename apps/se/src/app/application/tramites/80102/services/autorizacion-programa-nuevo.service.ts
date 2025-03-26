import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { InfoServicios, Servicio } from '../models/autorizacion-programa-nuevo.model';
import { Observable, map } from 'rxjs';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';

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

   /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<RespuestaCatalogos>} Observable con la lista de estados.
   */
   obtenerListaEstado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/80102/estado-datos.json'
    );
  }

  /**
   * Obtiene la lista de subfabricantes disponibles.
   * @method getSubfabricantesDisponibles
   * @returns {Observable<TableData>} Observable con la lista de subfabricantes disponibles.
   */
  getSubfabricantesDisponibles(): Observable<PlantasSubfabricante[]> {
    return (
      this.http
        .get<PlantasSubfabricante[]>(
          'assets/json/80102/submanufactureras-disponibles-datos.json'
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((response: any) => response.data))
    );
  }

  obtenerComplimentos(): Observable<DatosComplimentos> {
    return this.http
    .get<DatosComplimentos>("assets/json/80102/datos-complimentos.json")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .pipe(map((res: any) => res));
  }

}
