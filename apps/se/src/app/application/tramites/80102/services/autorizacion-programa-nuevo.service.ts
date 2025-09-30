import { BehaviorSubject, Observable, map } from 'rxjs';
import { Catalogo, JsonResponseCatalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { InfoServicios, Servicio } from '../models/autorizacion-programa-nuevo.model';
import { Tramite80102State, Tramite80102Store } from '../estados/tramite80102.store';
import { CatalogoDatosIdx } from '../../../shared/models/federatarios-y-plantas.model';
import { ComplimentosService } from '../../../shared/services/complimentos.service';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { HttpClient } from '@angular/common/http';
import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { PROC_80102 } from '../servers/api-route';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';
import { Tramite80102Query } from '../estados/tramite80102.query';

@Injectable({
  providedIn: 'root',
})
export class AutorizacionProgrmaNuevoService {
 constructor(private readonly http: HttpClient, public tramite80102Store: Tramite80102Store,
  private tramite80102Query:Tramite80102Query,public httpService: HttpCoreService,private complimentosService:ComplimentosService) {
   this.setProcedure();
   this.setProcedureNo();
  }

   setProcedureNo(): void {
    this.complimentosService.setProcedureNo('80102');
  }
  /**
   * Subject que mantiene el estado actual sobre si la tabla tiene datos.
   * Permite la suscripción reactiva a los cambios en la presencia de datos en la tabla.
   */
  private _tieneDatosDeTabla$ = new BehaviorSubject<boolean>(false);

    /**
   * Observable que expone el estado de si la tabla tiene datos.
   * Se utiliza para que otros componentes puedan reaccionar a los cambios sin modificar el estado directamente.
   */
  public tieneDatosDeTabla$ = this._tieneDatosDeTabla$.asObservable();

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

/**
 * Obtiene todos los datos del estado almacenado en el store.
 * @returns {Observable<Tramite80101State>} Observable con todos los datos del estado.
 */
getAllState(): Observable<Tramite80102State> {
  return this.tramite80102Query.allStoreData$;
}

/**
 * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
 * 
 * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
 * @returns Observable con la respuesta de la solicitud POST.
 */
guardarDatosPost(body: any): Observable<any> {
  return this.httpService.post<any>(PROC_80102.GUARDAR, { body: body });
}
/**
 * Establece el procedimiento actual para la gestión de trámites industriales.
 * Asigna el identificador de procedimiento 'st_t80101' y lo configura en el servicio de cumplimientos.
 *
 * @returns {void} No retorna ningún valor.
 */
setProcedure():void{
  const PROCEDURE='sat-t80102'
  this.complimentosService.setProcedure(PROCEDURE);
}

/**
 * Obtiene información del servicio IMMEX desde el catálogo correspondiente.
 *
 * Realiza una solicitud HTTP GET al endpoint definido en `apiRoutes.servicoImex`
 * y retorna la respuesta como un observable de tipo `JsonResponseCatalogo`.
 *
 * @returns Observable que emite la respuesta del catálogo IMMEX.
 */
getServicoImmex(): Observable<JsonResponseCatalogo> {
  
     return this.httpService.get<JsonResponseCatalogo>(
    PROC_80102.servicoImex,
    {},
    false
  );
}

 /**
   * Recupera una lista de países desde el API de catálogo.
   *
   * @returns Un Observable que emite la respuesta con un arreglo de países.
   */
  getPais(): Observable<JsonResponseCatalogo> {
    return this.httpService.get<JsonResponseCatalogo>(
      PROC_80102.PAIS,
      {},
      false
    );
  }


}
