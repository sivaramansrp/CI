import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaContenedor } from '../models/datos-tramite.model';

@Injectable({
  providedIn: 'root'
})
export class AutoridadService {

  constructor(
    private http: HttpClient,
  ) { 
    //
  }


  obtenerTramiteLista(): Observable<CatalogosSelect> {
    return this.http.get<CatalogosSelect>(`assets/json/32401/tipo-de-tramite.json`);
  }

  obtenerAduanaLista(): Observable<CatalogosSelect> {
    return this.http.get<CatalogosSelect>(`assets/json/32401/tipo-de-requerimiento.json`);
  }

  agregarSolicitud(): Observable<RespuestaContenedor> {
    return this.http.get<RespuestaContenedor>(`assets/json/32401/contenedorLista.json`);
  }

}
