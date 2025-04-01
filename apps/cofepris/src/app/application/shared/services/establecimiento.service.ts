import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Catalogo } from '@libs/shared/data-access-user/src';

import { map } from 'rxjs';

import { Observable } from 'rxjs';

import { Manifiestistos, PropietarioRadio, PropietarioTipoPersona, Representante } from '../models/datos-de-la-solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class EstablecimientoService {

  constructor(private http: HttpClient) {
    //constructor
   }
  getEstadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/establecimiento.json');
  }
  getSciandata(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/scianda.json');
  }
  getRegimenData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/regimen.json');
  }
  getAduanaDeSalidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/aduanaDeSalida.json');
  }
  getTipoDeProductoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/tipoDeProducto.json');
  }
  getUnidadDeMedidaData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/unidadDeMedida.json');
  }
  getUsoEspecificoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/usoEspecifico.json');
  }
  getRepresentanteByRfc(rfc: string): Observable<Representante | null> {
   
    return this.http.get<Representante[]>('assets/json/260401/representanteByRfc.json').pipe(
      map((representantes) => {
        const REPRESENTANTES = representantes.find((rep) => rep.rfc === rfc) || null;
       
        return REPRESENTANTES;
      }),
    
    );
  }

  getManifiestosByRfc(rfc: string): Observable<Manifiestistos | null> {
    return this.http.get<Manifiestistos[]>('assets/json/260401/manifiestos.json').pipe(
      map((representantes) => representantes.find((rep) => rep.rfc === rfc) || null)
    );
  }
  getPropietarioRadioData(): Observable<PropietarioRadio[]> {
    return this.http.get<PropietarioRadio[]>('assets/json/260401/propietario.json');
  }
  getPropietarioTipoPersonaData(): Observable<PropietarioTipoPersona[]> {
    return this.http.get<PropietarioTipoPersona[]>('assets/json/260401/propietarioTipoPersona.json');
  }
  getInformacionConfidencialRadioOptions(): Observable<PropietarioTipoPersona[]> {
    return this.http.get<PropietarioTipoPersona[]>('assets/json/260401/radioSiNo.json');
  }
}
