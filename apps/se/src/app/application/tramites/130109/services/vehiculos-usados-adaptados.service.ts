import { BehaviorSubject, Observable } from 'rxjs';
import {
  ProductoOption,
  ProductoResponse,
} from '../enum/vehiculos-adaptados.enum';
import { Catalogo } from '@ng-mf/data-access-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VehiculosUsadosAdaptadosService {
  constructor(private http: HttpClient) {
    //
  }

  /**
   * Estado del dropdown gestionado mediante BehaviorSubject.
   * @private
   * @type {BehaviorSubject<{ [key: string]: string | number | boolean }>}
   */
  private dropdownState = new BehaviorSubject<{ [key: string]: string | number | boolean }>({});

  /**
   * Obtiene el estado actual del dropdown como un observable.
   * @returns {Observable<{ [key: string]: string | number | boolean }>}
   */
  getState() {
    return this.dropdownState.asObservable();
  }

  /**
   * Establece un nuevo valor en el estado del dropdown.
   * @param {string} key - La clave del estado a actualizar.
   * @param {string | number | boolean} value - El nuevo valor a establecer.
   */
  setState(key: string, value: string | number | boolean) {
    const CURRENT_STATE = this.dropdownState.value;
    CURRENT_STATE[key] = value;
    this.dropdownState.next(CURRENT_STATE);
  }

  /**
   * Obtiene la lista de régimen de destino de la mercancía desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getListaDeRegimenDestinoMercancia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/regimen-mercancia-select.json'
    );
  }

  /**
   * Obtiene la lista de clasificación del régimen desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getClasificacionDelRegimen(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/clasificacion-del-regimen-select.json'
    );
  }

  /**
   * Obtiene las opciones de solicitud desde un archivo JSON.
   * @returns {Observable<ProductoResponse>}
   */
  getSolicitudeOptions(): Observable<ProductoResponse> {
    return this.http.get<ProductoResponse>(
      '/assets/json/130109/solicitude-options.json'
    );
  }

  /**
   * Obtiene la lista de países disponibles desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getListaDePaisesDisponibles(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/pais-procenia.json'
    );
  }

  /**
   * Obtiene la lista de países por bloque desde un archivo JSON.
   * @param {number} _bloqueId - El ID del bloque.
   * @returns {Observable<Catalogo[]>}
   */
  getPaisesPorBloque(_bloqueId: number): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/paises-por-bloque.json'
    );
  }

  /**
   * Obtiene la lista de entidades federativas desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getEntidadFederativa(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/entidad-federativa.json'
    );
  }

  /**
   * Obtiene la lista de representaciones federales desde un archivo JSON.
   * @returns {Observable<Catalogo[]>}
   */
  getRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/130109/representacion-federal.json'
    );
  }
}