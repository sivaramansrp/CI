import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { InfoServicios, Servicio } from '../models/nuevo-programa-industrial.model';
import { Observable, map } from 'rxjs';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';

@Injectable({
  providedIn: 'root',
})
export class NuevoProgramaIndustrialService {
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
    .pipe(map((res: any) => res.data.InfoServicios));
}
   
  /**
   * Obtiene la lista de selección de ingreso desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
  obtenerIngresoSelectList(): Observable<Catalogo[]> {
    return this.http
    .get<Catalogo[]>("assets/json/80205/ampliacion-IMMEX-dropdown.json")
    .pipe(map((res: any) => res.data));
  }

   /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<RespuestaCatalogos>} Observable con la lista de estados.
   */
   obtenerListaEstado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(
      'assets/json/80207/estado-datos.json'
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
          'assets/json/80207/submanufactureras-disponibles-datos.json'
        )
        .pipe(map((response: any) => response.data))
    );
  }

  /**
   * Obtiene los datos de complementos desde un archivo JSON local.
   * 
   * @returns Un observable que emite los datos de tipo `DatosComplimentos`.
   */
  obtenerComplimentos(): Observable<DatosComplimentos> {
    return this.http
    .get<DatosComplimentos>("assets/json/80102/datos-complimentos.json")
    .pipe(map((res: any) => res));
  }
/**
   * Obtiene los datos de complementos desde un archivo JSON local.
   * 
   * @returns Un observable que emite los datos de tipo `DatosComplimentos`.
   */
getEstadosCatalogo(): Observable<Catalogo> {
  return this.http
  .get<Catalogo>("assets/json/80105/empresas.json")
  .pipe(map((res: Catalogo) => res));
}
}
