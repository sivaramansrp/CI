import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';
import { Tramite230202Store } from '../estados/tramite230202.store';

@Injectable({
  providedIn: 'root'
})
export class PhytosanitaryReexportacionService {

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param http Servicio HTTP para realizar solicitudes a recursos externos.
   * @param store Store de Akita para gestionar el estado del trámite.
   */
  constructor(private http: HttpClient, private store: Tramite230202Store) {
    // El constructor se utiliza para la inyección de dependencias.
  }
  
  getNumeroDeCertificado(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/230202/numeroDeCertificado.json');
  }
}
