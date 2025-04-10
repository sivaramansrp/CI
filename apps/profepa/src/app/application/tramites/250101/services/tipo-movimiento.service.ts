import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoMovimientoService {
  constructor(private http: HttpClient) {
    //
  }

  getAduanaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/250101/aduana.json');
  }

  getInspectoriaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/250101/inspectoria-profepa.json');
  }

  getAlcaldiaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/250101/municipio-alcaldia.json');
  }
}
