import { BehaviorSubject, Observable, of } from 'rxjs';
import { Tramite40102Store } from './tramite40102.store';
import { Injectable } from '@angular/core';
import {
  DatosDelVehículo,
  DatosDelVehículoPaisEmisor,
  VehiculoVEHs, VehiculoColor,
  Emisor2daPlaca
} from 'libs/shared/data-access-user/src/core/models/40102/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Tramite40102Service {
  private urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';
  private choferesListSubject = new BehaviorSubject<any[]>([]);
  choferesList$ = this.choferesListSubject.asObservable();

  constructor(
    private tramite40102Store: Tramite40102Store,
    private http: HttpClient
  ) {
    const STORED_DATA = localStorage.getItem('choferesList');
    if (STORED_DATA) {
      this.choferesListSubject.next(JSON.parse(STORED_DATA));
    }
  }

  addChofer(nuevoMiembro: any, isExtranjero: boolean = false) {
    if (!nuevoMiembro) return;
    const STORAGE_KEY = isExtranjero ? 'choferesextranjeroList' : 'choferesList';
    const STORED_DATA = localStorage.getItem(STORAGE_KEY);
    let choferArray: any[] = STORED_DATA ? JSON.parse(STORED_DATA) : [];
    choferArray.push(nuevoMiembro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(choferArray));

    // Actualizar tienda Akita
    this.tramite40102Store.update((state) => ({
      ...state,
      choferesextranjero: isExtranjero ? choferArray : state.choferesextranjero,
      choferes: !isExtranjero ? choferArray : state.choferes,
    }));

    if (isExtranjero) {
      this.choferesListSubject.next(choferArray);
    }
  }
  getClasifiRegimen(): Observable<DatosDelVehículo[]> {
    return of([
      { clave: '1', descripcion: 'Automóvil' },
      { clave: '2', descripcion: 'Camioneta' },
      { clave: '3', descripcion: 'Motocicleta' },
    ]);
  }
  getVehiculoColor(): Observable<VehiculoColor[]> {
    return of([
      { clave: '1', descripcion: 'BLANCO' },
      { clave: '2', descripcion: 'NEGRO' },
      { clave: '3', descripcion: 'AZUL' },
    ]);
  }
  getVehiculoVEH(): Observable<VehiculoVEHs[]> {
    return of([
      { clave: '1', descripcion: '2023' },
      { clave: '2', descripcion: '2024' },
      { clave: '3', descripcion: '2025' },
    ]);
  }
  getPaisEmisor2daPlaca(): Observable<Emisor2daPlaca[]> {
    return of([
      { clave: '1', descripcion: 'México3434' },
      { clave: '2', descripcion: 'Estados Unidos33' },
      { clave: '3', descripcion: 'Canadá' },
    ]);
  }
  

  getChoferNacionalData(): Observable<any> {
    return this.http.get<any>(this.urlServer);
  }

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlServer}/estados`);
  }
  getMunicipios(claveEstado: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.urlServer}/municipios?estado=${claveEstado}`
    );
  }

  getColonias(claveMunicipio: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.urlServer}/colonias?municipio=${claveMunicipio}`
    );
  }
}
