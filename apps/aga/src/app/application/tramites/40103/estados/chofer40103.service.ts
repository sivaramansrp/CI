import { BehaviorSubject, Observable } from 'rxjs'; 
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Chofer } from '../models/registro-muestras-mercancias.model';
import { Chofer40103Store } from './chofer40103.store';
import { DatosDelVehículo } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar datos relacionados con choferes y vehículos en el contexto del trámite 40103.
 * Proporciona métodos para agregar choferes, obtener datos de choferes nacionales, y consultar catálogos relacionados.
 * 
 * @author Ultrasist
 * @version 1.0
 * @since 2025
 */
@Injectable({
  providedIn: 'root',
})
export class Chofer40103Service {
  url = '../../../../../assets/json/40103/';
  /**
   * URL base del servidor para realizar solicitudes HTTP.
   */
  private urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';

  /**
   * Sujeto de comportamiento que almacena la lista de choferes.
   */
  private choferesListSubject = new BehaviorSubject<DatosDelVehículo[]>([]);

  /**
   * Observable que expone la lista de choferes.
   */
  choferesList$ = this.choferesListSubject.asObservable();

  /**
   * Constructor del servicio.
   * Inicializa los datos almacenados en el almacenamiento local y actualiza el estado de la tienda Akita.
   * 
   * @param chofer40103Store Tienda Akita para gestionar el estado de los choferes.
   * @param http Cliente HTTP para realizar solicitudes al servidor.
   */
  constructor(
    private chofer40103Store: Chofer40103Store,
    private http: HttpClient
  ) {
    const STORE_DATA = localStorage.getItem('choferesList');
    if (STORE_DATA) {
      this.choferesListSubject.next(JSON.parse(STORE_DATA));
    }
  }

  /**
   * Agrega un nuevo chofer a la lista.
   * 
   * @param nuevoMiembro El nuevo chofer a agregar.
   * @param isExtranjero Indica si el chofer es extranjero. Por defecto es `false`.
   */
  addChofer(
    nuevoMiembro: Chofer,
    isExtranjero: boolean = false
  ): void {
    if (!nuevoMiembro) {
      return;
    }
    const STORAGE_KEY = isExtranjero
      ? 'choferesextranjeroList'
      : 'choferesList';
    const STORE_DATA = localStorage.getItem(STORAGE_KEY);
    const CHOFER_ARRAY: Chofer[] = STORE_DATA ? JSON.parse(STORE_DATA) : [];
    CHOFER_ARRAY.push(nuevoMiembro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(CHOFER_ARRAY));

    // Actualizar tienda Akita
    this.chofer40103Store.update((state) => ({
      ...state,
      choferesExtranjero: isExtranjero
        ? CHOFER_ARRAY
        : state.choferesExtranjero,
      choferes: !isExtranjero ? CHOFER_ARRAY : state.choferes,
    }));

    if (isExtranjero) {
      this.choferesListSubject.next(CHOFER_ARRAY);
    }
  }

  /**
   * Obtiene los datos de choferes nacionales.
   * 
   * @returns Un observable con la lista de datos de choferes nacionales.
   */
  getChoferNacionalData(): Observable<DatosDelVehículo[]> {
    return this.http.get<DatosDelVehículo[]>(this.urlServer);
  }

  /**
   * Obtiene la lista de estados.
   * 
   * @returns Un observable con la lista de estados.
   */
  getEstados(): Observable<{ clave: string; descripcion: string }[]> {
    return this.http.get<{ clave: string; descripcion: string }[]>(
      `${this.urlServer}/estados`
    );
  }

  /**
   * Obtiene la lista de municipios de un estado específico.
   * 
   * @param claveEstado La clave del estado.
   * @returns Un observable con la lista de municipios.
   */
  getMunicipios(
    claveEstado: string
  ): Observable<{ clave: string; descripcion: string }[]> {
    return this.http.get<{ clave: string; descripcion: string }[]>(
      `${this.urlServer}/municipios?estado=${claveEstado}`
    );
  }

  /**
   * Obtiene la lista de colonias de un municipio específico.
   * 
   * @param claveMunicipio La clave del municipio.
   * @returns Un observable con la lista de colonias.
   */
  getColonias(
    claveMunicipio: string
  ): Observable<{ clave: string; descripcion: string }[]> {
    return this.http.get<{ clave: string; descripcion: string }[]>(
      `${this.urlServer}/colonias?municipio=${claveMunicipio}`
    );
  }

  /**
   * Obtiene el catálogo de tipos de vehículos de arrastre.
   * 
   * @returns Un observable con el catálogo de tipos de vehículos de arrastre.
   */
  getTipoVehiculoArrastreAGA(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/40103/tipo-vehiculo-arrastre.json'
    );
  }

  /**
   * Obtiene el catálogo de países emisores.
   * 
   * @returns Un observable con el catálogo de países emisores.
   */
  getPaisEmisor(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/pais-catalogo.json');
  }

  /**
   * Obtiene el catálogo de colores de vehículos.
   * 
   * @returns Un observable con el catálogo de colores de vehículos.
   */
  getcolorAGA(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/color-catalogo.json');
  }

  /**
   * Obtiene el catálogo de países emisores de la segunda placa.
   * 
   * @returns Un observable con el catálogo de países emisores de la segunda placa.
   */
  getpaisEmisor2DaPlacaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(
      '/assets/json/40103/pais-emisor-2da-placa.json'
    );
  }

  /**
   * Obtiene el catálogo de colores de vehículos para solicitudes.
   * 
   * @returns Un observable con el catálogo de colores de vehículos.
   */
  getsolicitudVehiculoColor(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/vehiculo-color.json');
  }

  /**
   * Obtiene el catálogo de países de origen.
   * 
   * @returns Un observable con el catálogo de países de origen.
   */
  getPaisOrigenChn(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/pais-origen.json');
  }

  /**
   * Obtiene el catálogo de delegaciones.
   * 
   * @returns Un observable con el catálogo de delegaciones.
   */
  getDelegacionChn(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/municipio.json');
  }

  /**
   * Obtiene la lista de estados desde un archivo JSON local.
   *
   * @returns {Observable<Catalogo[]>} Un observable que emite la lista de estados.
   */
  getEstado(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/estado.json');
  }

  /**
   * Obtiene el catálogo de colonias.
   * 
   * @returns Un observable con el catálogo de colonias.
   */
  getColoniaChn(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/colonia.json');
  }

  /**
   * Obtiene el catálogo de nacionalidades.
   * 
   * @returns Un observable con el catálogo de nacionalidades.
   */
  getNacionaliDadChe(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/nacionalidad.json');
  }

  /**
   * Obtiene el catálogo de choferes.
   * 
   * @returns Un observable con el catálogo de choferes.
   */
  getChoferData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('/assets/json/40103/chofer.json');
  }

  /**
   * Obtiene los datos de una tabla desde un archivo JSON.
   *
   * @template T El tipo genérico de los datos que se espera recibir.
   * @param {string} fileName - Nombre del archivo JSON que contiene los datos.
   * @returns {Observable<T[]>} Un observable que emite la lista de datos del archivo JSON.
   */
  obtenerTablaDatos<T>(fileName: string): Observable<T[]> {
    const JSONURL = this.url + fileName;
    return this.http.get<T[]>(JSONURL);
  }
}