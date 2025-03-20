import { BehaviorSubject, Observable, of } from 'rxjs';
import { Chofer40103Store } from './chofer40103.store';
import { Injectable } from '@angular/core';

import {
  DatosDelVehículo,
  DatosDelVehículoPaisEmisor,
  Emisor2daPlaca,
  VehiculoColor,
  VehiculoVEHs,
} from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Chofer40103Service {
  private urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';
  private choferesListSubject = new BehaviorSubject<DatosDelVehículo[]>([]);
  choferesList$ = this.choferesListSubject.asObservable();

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
   * @param nuevoMiembro El nuevo chofer a agregar.
   * @param isExtranjero Indica si el chofer es extranjero.
   */
  addChofer(
    nuevoMiembro: DatosDelVehículo,
    isExtranjero: boolean = false
  ): void {
    if (!nuevoMiembro) {
      return;
    }
    const STORAGE_KEY = isExtranjero
      ? 'choferesextranjeroList'
      : 'choferesList';
    const STORE_DATA = localStorage.getItem(STORAGE_KEY);
    const CHOFER_ARRAY: any[] = STORE_DATA ? JSON.parse(STORE_DATA) : [];
    CHOFER_ARRAY.push(nuevoMiembro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(CHOFER_ARRAY));

    // Actualizar tienda Akita
    this.chofer40103Store.update((state) => ({
      ...state,
      choferesextranjero: isExtranjero
        ? CHOFER_ARRAY
        : state.choferesextranjero,
      choferes: !isExtranjero ? CHOFER_ARRAY : state.choferes,
    }));

    if (isExtranjero) {
      this.choferesListSubject.next(CHOFER_ARRAY);
    }
  }

  /**
   * Obtiene la clasificación del régimen de vehículos.
   * @returns Un observable con la lista de clasificaciones de vehículos.
   */
  static getClasifiRegimen(): Observable<DatosDelVehículo[]> {
    return of([
      { clave: '1', descripcion: 'Automóvil' },
      { clave: '2', descripcion: 'Camioneta' },
      { clave: '3', descripcion: 'Motocicleta' },
    ]);
  }

  /**
   * Obtiene los colores de vehículos.
   * @returns Un observable con la lista de colores de vehículos.
   */
  static getVehiculoColor(): Observable<VehiculoColor[]> {
    return of([
      { clave: '1', descripcion: 'BLANCO' },
      { clave: '2', descripcion: 'NEGRO' },
      { clave: '3', descripcion: 'AZUL' },
    ]);
  }

  /**
   * Obtiene los años de los vehículos.
   * @returns Un observable con la lista de años de vehículos.
   */
  static getVehiculoVEH(): Observable<VehiculoVEHs[]> {
    return of([
      { clave: '1', descripcion: '2023' },
      { clave: '2', descripcion: '2024' },
      { clave: '3', descripcion: '2025' },
    ]);
  }

  /**
   * Obtiene los países emisores de la segunda placa.
   * @returns Un observable con la lista de países emisores de la segunda placa.
   */
  static getPaisEmisor2daPlaca(): Observable<Emisor2daPlaca[]> {
    return of([
      { clave: '1', descripcion: 'México3434' },
      { clave: '2', descripcion: 'Estados Unidos33' },
      { clave: '3', descripcion: 'Canadá' },
    ]);
  }

  /**
   * Obtiene los datos de choferes nacionales.
   * @returns Un observable con la lista de datos de choferes nacionales.
   */
  getChoferNacionalData(): Observable<DatosDelVehículo[]> {
    return this.http.get<DatosDelVehículo[]>(this.urlServer);
  }

  /**
   * Obtiene la lista de estados.
   * @returns Un observable con la lista de estados.
   */
  getEstados(): Observable<{ clave: string; descripcion: string }[]> {
    return this.http.get<{ clave: string; descripcion: string }[]>(
      `${this.urlServer}/estados`
    );
  }

  /**
   * Obtiene la lista de municipios de un estado específico.
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
}