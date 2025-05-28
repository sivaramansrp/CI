import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Catalogo, CatalogoResponse } from '@ng-mf/data-access-user';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Pantallas220401Service {

  constructor(private http: HttpClient) {
    //constructor
   }
   private dropdownState = new BehaviorSubject<{ [key: string]: any }>({});
   getState() {
    return this.dropdownState.asObservable();
  }

  setState(key: string, value: any) {
    const currentState = this.dropdownState.value;
    currentState[key] = value;
    this.dropdownState.next(currentState);
  }
   getDelegacionesData(): Observable<CatalogoResponse[]> {
    return this.http.get<CatalogoResponse[]>('assets/json/220401/delegaciones.json');
  }
  getEspecieData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getFuncionZootecnica(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getMercancia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getlaodPaisDestino(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getNombreEstablecimiento(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getTipoActividad(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getAduanaSalida(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getOisaSalida(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getRegimenMercancia(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
  getPaisOrigen(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/220401/delegaciones.json');
  }
}