import { BehaviorSubject, Observable, of } from 'rxjs';
import { Chofer40101Store } from './chofer40101.store';
import { Injectable } from '@angular/core';
import {
  DatosDelVehículo,
  DatosDelVehículoPaisEmisor,
  VehiculoVEHs, VehiculoColor,
  Emisor2daPlaca
} from 'libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Chofer40101Service {
  private urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';
  private choferesListSubject = new BehaviorSubject<any[]>([]);
  choferesList$ = this.choferesListSubject.asObservable();

  constructor(
    private chofer40101Store: Chofer40101Store,
    private http: HttpClient
  ) {
    const storedData = localStorage.getItem('choferesList');
    if (storedData) {
      this.choferesListSubject.next(JSON.parse(storedData));
    }
  }

  addChofer(nuevoMiembro: any, isExtranjero: boolean = false) {
    if (!nuevoMiembro) return;
    console.log('Adding Chofer:', nuevoMiembro);

    let storageKey = isExtranjero ? 'choferesextranjeroList' : 'choferesList';
    let storedData = localStorage.getItem(storageKey);
    let choferArray: any[] = storedData ? JSON.parse(storedData) : [];
    choferArray.push(nuevoMiembro);
    localStorage.setItem(storageKey, JSON.stringify(choferArray));

    // Actualizar tienda Akita
    this.chofer40101Store.update((state) => ({
      ...state,
      choferesextranjero: isExtranjero ? choferArray : state.choferesextranjero,
      choferes: !isExtranjero ? choferArray : state.choferes,
    }));

    if (isExtranjero) {
      this.choferesListSubject.next(choferArray);
    }

    console.log('Updated Akita Store:', choferArray);
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
