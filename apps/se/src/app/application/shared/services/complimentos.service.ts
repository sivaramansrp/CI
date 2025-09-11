import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';

import { AnexoDosEncabezado, AnexoUnoEncabezado } from '../models/nuevo-programa-industrial.model';
import { Catalogo, HttpCoreService, JsonResponseCatalogo } from '@ng-mf/data-access-user';
import { ENVIRONMENT } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComplimentosService {
/**
 * Subject que mantiene la fila seleccionada del Anexo Uno.
 * Permite emitir y reaccionar a cambios en la selección de filas de forma reactiva.
 */
private _anexoUnoFilaSeleccionada$ = new BehaviorSubject<AnexoUnoEncabezado | null>(null);
/**
 * Observable que expone la fila seleccionada del Anexo Uno.
 * Permite a otros componentes suscribirse a los cambios sin modificar directamente el estado.
 */
public anexoUnoFilaSeleccionada$ = this._anexoUnoFilaSeleccionada$.asObservable();
/**
 * Subject que almacena la fila seleccionada del Anexo Dos.
 * Facilita la comunicación reactiva cuando cambia la selección de filas en el Anexo Dos.
 */
private _anexoDosFilaSeleccionada$ = new BehaviorSubject<AnexoDosEncabezado | null>(null);
/**
 * Observable que expone la fila seleccionada del Anexo Dos.
 * Permite a otros componentes reaccionar a los cambios en la selección de filas sin modificar el estado directamente.
 */
public anexoDosFilaSeleccionada$ = this._anexoDosFilaSeleccionada$.asObservable();

  constructor(private readonly http: HttpClient,public httpService: HttpCoreService) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Obtiene la lista de estados.
   * @method obtenerListaEstado
   * @returns {Observable<RespuestaCatalogos>} Observable con la lista de estados.
   */
  obtenerListaEstado(): Observable<Catalogo[]> {
    return (
      this.http
        .get<Catalogo[]>('assets/json/funcionario/estado.json')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .pipe(map((res: any) => res.data))
    );
  }

  /**
     * @method getDatos
     * Método para obtener datos desde un archivo JSON.
     * @returns {Observable<unknown>} Un Observable que emite los datos obtenidos o un error.
     */
    getDatos(): Observable<unknown> {
        return this.http.get('assets/json/80102/pagoderechos.json') // Realiza una solicitud GET al archivo JSON.
          .pipe(
            catchError((error: unknown) => { // Maneja errores en la solicitud.
              return throwError(() => error); // Lanza el error para que pueda ser manejado por el suscriptor.
            })
          );
     }

    /**
     * Recupera una lista de países desde el API de catálogo.
     *
     * @returns Un Observable que emite la respuesta con un arreglo de países.
     */
     getPais(): Observable<JsonResponseCatalogo> {
  return this.httpService.get<JsonResponseCatalogo>(
    `${ENVIRONMENT.API_HOST}/api/catalogo/paises`,
    {},
    false
  );
  }

 

   /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getEstado(): Observable<JsonResponseCatalogo> {
     return this.httpService.get<JsonResponseCatalogo>(
    `${ENVIRONMENT.API_HOST}/api/catalogo/estados`,
    {},
    false
  );
  }
  /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getActividadProductiva(): Observable<JsonResponseCatalogo> {
     return this.httpService.get<JsonResponseCatalogo>(
    `${ENVIRONMENT.API_HOST}/api/catalogo/actividad-productiva-prosec`,
    {},
    false
  );
  }

   /**
   * Obtiene el catálogo de estados desde el servidor.
   *
   * Realiza una petición HTTP GET al endpoint `/api/catalogo/estados` y retorna la respuesta
   * como un observable de tipo `JsonResponseCatalogo`.
   *
   * @returns Observable que emite la respuesta del catálogo de estados.
   */
  getRepresentacion(): Observable<JsonResponseCatalogo> {
     return this.httpService.get<JsonResponseCatalogo>(
    `${ENVIRONMENT.API_HOST}/api/catalogo/representacion-federal`,
    {},
    false
  );
}

  /**
   * Obtiene la información de un tipo de documento específico según su identificador.
   *
   * @param id - El identificador único del tipo de documento a consultar.
   * @returns Un observable que emite la respuesta JSON con los datos del catálogo del tipo de documento.
   */
  getTipoDocumento(id:number): Observable<JsonResponseCatalogo> {
     return this.httpService.get<JsonResponseCatalogo>(
    `${ENVIRONMENT.API_HOST}/api/catalogo/tipo-documento/${id}`,
    {},
    false
  );
}

  /**
   * Obtiene el catálogo de municipios de México correspondientes a una entidad específica.
   *
   * @param cveEntidad - Clave numérica de la entidad federativa para la cual se desean obtener los municipios.
   * @returns Un observable que emite la respuesta en formato `JsonResponseCatalogo` con el listado de municipios.
   */
  getmunicipio(cveEntidad:string): Observable<JsonResponseCatalogo> {
     return this.httpService.get<JsonResponseCatalogo>(
    `${ENVIRONMENT.API_HOST}/api/catalogo/municipios-mex/${cveEntidad}`,
    {},
    false
  );
}


/**
 * Obtiene la información de una categoría de tipo según el valor de la clave enumerada proporcionada.
 *
 * @param cveEnum - Clave enumerada que identifica el tipo de categoría a consultar.
 * @returns Un observable que emite la respuesta JSON del catálogo correspondiente.
 */
 getTipCategoria(cveEnum:string): Observable<JsonResponseCatalogo> {
     return this.httpService.get<JsonResponseCatalogo>(
    `${ENVIRONMENT.API_HOST}/api/catalogo/tipo-categoria/${cveEnum}`,
    {},
    false
  );
}

/**
 * Establece la fila seleccionada del Anexo Uno.
 * Emite el nuevo valor a todos los suscriptores del observable correspondiente.
 */
setAnexoUnoFilaSeleccionada(row: AnexoUnoEncabezado | null): void {
  this._anexoUnoFilaSeleccionada$.next(row);
}

/**
 * Establece la fila seleccionada del Anexo Dos.
 * Emite el nuevo valor a todos los suscriptores del observable correspondiente.
 */
setAnexoDosFilaSeleccionada(row: AnexoDosEncabezado | null): void {
  this._anexoDosFilaSeleccionada$.next(row);
}
}