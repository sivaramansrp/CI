import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { InfoServicios, Servicio } from '../models/autorizacion-programa-nuevo.model';
import { Observable, map } from 'rxjs';
import { Tramite80102State, Tramite80102Store } from '../estados/tramite80102.store';
import { CatalogoDatosIdx } from '../../../shared/models/federatarios-y-plantas.model';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionProgrmaNuevoService {
 constructor(private readonly http: HttpClient, public tramite80102Store: Tramite80102Store) {
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

  /**
 * Actualiza el estado del formulario con los datos proporcionados.
 * 
 * @param DATOS - Estado de la solicitud `Solicitud230401State` con la información 
 *                del tipo de solicitud a actualizar en el store.
 */
actualizarEstadoFormulario(DATOS: Tramite80102State): void {
  this.tramite80102Store.update((state) => ({
    ...state,
    ...DATOS
  }))

}

/**
* Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
* 
* @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
*          cargados desde el archivo JSON especificado en la ruta de `assets`.
*/
getRegistroTomaMuestrasMercanciasData(): Observable<Tramite80102State> {
  return this.http.get<Tramite80102State>('assets/json/80102/respuestaDeActualizacionDe.json');
}

/**
   * Obtiene los datos del catálogo de federatarios y plantas desde un archivo JSON local.
   *
   * Este método realiza una solicitud HTTP GET para recuperar los datos del catálogo
   * almacenados en el archivo `federatarios-y-plantas-catalogos.json` ubicado en la
   * carpeta de activos (`assets/json/80101/`). Los datos recuperados se devuelven como
   * un observable de tipo `CatalogoDatosIdx`.
   *
   * @returns {Observable<CatalogoDatosIdx>} Un observable que emite los datos del catálogo
   * de federatarios y plantas.
   *
   * @example
   * this.nuevoProgramaIndustrialService.getFederataiosyPlantaCatalogosData()
   *   .subscribe((datos: CatalogoDatosIdx) => {
   *     console.log('Datos del catálogo:', datos);
   *   });
   *
   * @remarks
   * Este método es útil para cargar información estática de catálogos que se utiliza
   * en la aplicación, como listas de federatarios y plantas. Asegúrese de que el archivo
   * JSON exista en la ubicación especificada para evitar errores de carga.
   */
  getFederataiosyPlantaCatalogosData(): Observable<CatalogoDatosIdx> {
    return this.http.get<CatalogoDatosIdx>(
      'assets/json/80101/federatarios-y-plantas-catalogos.json'
    );
  }

}
