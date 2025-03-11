
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Chofer40101Store } from './chofer40101.store';
import { Injectable } from '@angular/core';
import { DatosDelVehículo, DatosDelVehículoPaisEmisor } from 'libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Chofer40101Service {
  private urlServer = 'https://dev.v30.ultrasist.net/api/json-auxiliar';
  private choferesListSubject = new BehaviorSubject<any[]>([]);
  choferesList$ = this.choferesListSubject.asObservable();

  constructor(private chofer40101Store: Chofer40101Store, private http: HttpClient) {
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
  
    // Update localStorage
    localStorage.setItem(storageKey, JSON.stringify(choferArray));
  
    // Update Akita store
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
      { clave: '1', descripcion: 'Automóvil'},
      { clave: '2', descripcion: 'Camioneta'},
      { clave: '3', descripcion: 'Motocicleta'}
    ]);
  }
  getPaisEmisor(): Observable<DatosDelVehículoPaisEmisor[]> {
    return of([
      { clave1: '1', descripcion2: 'México'},
      { clave1: '2', descripcion2: 'Estados Unidos'},
      { clave1: '3', descripcion2: 'Canadá'}
    ]);
  }
  
  getChoferNacionalData(): Observable<any> {
    return this.http.get<any>(this.urlServer);
  }

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlServer}/estados`);
  }
  getMunicipios(claveEstado: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlServer}/municipios?estado=${claveEstado}`);
  }

  getColonias(claveMunicipio: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlServer}/colonias?municipio=${claveMunicipio}`);
  }
}


