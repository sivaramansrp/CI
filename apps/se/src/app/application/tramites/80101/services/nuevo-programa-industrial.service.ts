import {
  Catalogo,
  RespuestaCatalogos,
} from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import {
  InfoServicios,
  Servicio,
} from '../models/nuevo-programa-industrial.model';
import { Observable, catchError, map, throwError } from 'rxjs';
import {
  Tramite80101State,
  Tramite80101Store,
} from '../estados/tramite80101.store';
import { BaseResponse } from '@libs/shared/data-access-user/src/core/models/shared/base-response.model';
import { BehaviorSubject } from 'rxjs';
import { CadenaOriginalRequest } from '../../130118/model/request/cadena-original-request.model';
import { CatalogoDatosIdx } from '../../../shared/models/federatarios-y-plantas.model';
import { ComplimentosService } from '../../../shared/services/complimentos.service';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { FirmarRequest } from '@libs/shared/data-access-user/src/core/models/shared/firma-electronica/request/firmar-request.model';
import { HttpClient } from '@angular/common/http';
import { HttpCoreService } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';
import { PROC_80101 } from '../servers/api-route';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';
import { Tramite80101Query } from '../estados/tramite80101.query';



/**
 * Servicio para gestionar las operaciones relacionadas con el programa industrial.
 * Este servicio proporciona métodos para obtener datos desde archivos JSON locales,
 * actualizar el estado del formulario y realizar otras operaciones relacionadas con el programa industrial.
 */
@Injectable({
  providedIn: 'root',
})
export class NuevoProgramaIndustrialService {

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
   * Constructor de la clase NuevoProgramaIndustrialService.
   *
   * @param http - Cliente HTTP utilizado para realizar solicitudes HTTP al servidor.
   */
  constructor(
    private readonly http: HttpClient,
    public tramite80101Store: Tramite80101Store,
    public httpService: HttpCoreService,
    private Tramite80101Query:Tramite80101Query,
    private complimentosService:ComplimentosService
    
  ) {
    // No se necesita lógica de inicialización adicional.
    this.setProcedure();
    this.setProcedureNo();
  }

  setProcedureNo(): void {
    this.complimentosService.setProcedureNo('80101');
  }


  /**
   * Actualiza el estado interno indicando si la tabla tiene datos.
   * Emite el nuevo valor a todos los suscriptores del observable correspondiente.
  */
  setTieneDatosDeTabla(value: boolean): void {
    this._tieneDatosDeTabla$.next(value);
  }

  /**
   * Obtiene los datos de ampliación de servicios desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
  getDatos(): Observable<InfoServicios> {
    return (
      this.http
        .get<Servicio[]>('assets/json/80205/ampliacion-servicios.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res.data.InfoServicios))
    );
  }

  /**
   * Obtiene la lista de selección de ingreso desde un archivo JSON.
   * @returns {Observable<any>} - Observable con los datos obtenidos.
   */
  obtenerIngresoSelectList(): Observable<Catalogo[]> {
    return (
      this.http
        .get<Catalogo[]>('assets/json/80205/ampliacion-IMMEX-dropdown.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res.data))
    );
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

        .pipe(map((response: PlantasSubfabricante[]) => response))
    );
  }

   /**
   * Obtiene la cadena original del trámite 130118.
   * @param body Objeto que contiene los datos necesarios para generar la cadena original.
   * @returns Un observable que emite la respuesta del servidor con la cadena original.
   */
  obtenerCadenaOriginal<T>(idSolicitud: string, body: CadenaOriginalRequest): Observable<BaseResponse<T>> {
    return this.http.post<BaseResponse<T>>(PROC_80101.API_POST_CADENA_ORIGINAL(idSolicitud), body).pipe(
      map((response) => response),
      catchError(() => {
        const ERROR = new Error(`Error al obtener la cadena original en ${PROC_80101.API_POST_CADENA_ORIGINAL(idSolicitud)}`);
        return throwError(() => ERROR);
      })
    );
  }
 
  /**
     * Envía una solicitud de firma electrónica.
     * @param idSolicitud - ID de la solicitud a firmar.
     * @param body - Cuerpo de la solicitud de firma.
     * @returns Observable con la respuesta del servidor.
     */
  enviarFirma<T>(idSolicitud: string | number, body: FirmarRequest): Observable<BaseResponse<T>> {
    return this.http.post<BaseResponse<T>>(PROC_80101.API_POST_FIRMA(String(idSolicitud)), body).pipe(
      map(response => response),
      catchError(() => {
        const ERROR = new Error(`Error al firmar solicitud con ID ${idSolicitud}`);
        return throwError(() => ERROR);
      })
    );
  }

  /**
   * Obtiene los datos de complementos desde un archivo JSON local.
   *
   * @returns Un observable que emite los datos de tipo `DatosComplimentos`.
   */
  obtenerComplimentos(): Observable<DatosComplimentos> {
    return (
      this.http
        .get<DatosComplimentos>('assets/json/80102/datos-complimentos.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res))
    );
  }
  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   *
   * @param DATOS - Estado de la solicitud `Solicitud230401State` con la información
   *                del tipo de solicitud a actualizar en el store.
   */

  actualizarEstadoFormulario(DATOS: Tramite80101State): void {

    this.tramite80101Store.update((state) => ({
      ...state,
      ...DATOS,
    }));
  }

  /**
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   *
   * @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
   *          cargados desde el archivo JSON especificado en la ruta de `assets`.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite80101State> {
    return this.http.get<Tramite80101State>(
      'assets/json/80101/respuestaDeActualizacionDe.json'
    );
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
getAllState(): Observable<Tramite80101State> {
  return this.Tramite80101Query.allStoreData$;
}

/**
 * Envía los datos proporcionados mediante una solicitud HTTP POST a la ruta especificada.
 * 
 * @param body - Objeto que contiene los datos a enviar en el cuerpo de la solicitud.
 * @returns Observable con la respuesta de la solicitud POST.
 */
guardarDatosPost(body: Record<string, unknown>): Observable<Record<string, unknown>> {
  return this.httpService.post<Record<string, unknown>>(PROC_80101.GUARDAR, { body: body });
}

/**
 * Establece el procedimiento actual para la gestión de trámites industriales.
 * Asigna el identificador de procedimiento 'st_t80101' y lo configura en el servicio de cumplimientos.
 *
 * @returns {void} No retorna ningún valor.
 */
setProcedure():void{
  const PROCEDURE='sat-t80101'
  this.complimentosService.setProcedure(PROCEDURE);
}



}
