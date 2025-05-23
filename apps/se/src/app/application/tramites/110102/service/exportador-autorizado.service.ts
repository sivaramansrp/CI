/**
 *  Este servicio proporciona métodos para obtener datos relacionados con tratados y acuerdos.
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tramite110102State, Tramite110102Store } from '../estados/store/tramite110102.store';


@Injectable({
  providedIn: 'root'
})
export class ExportadorAutorizadoService {

  /**
   * {HttpCoreService} http - Servicio HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient,private tramite110102Store: Tramite110102Store) { 
    // Lógica de inicialización si es necesario
  }
  getRegistro(): Observable<Tramite110102State> {
    return this.http.get<Tramite110102State>('./assets/json/110102/registro.json');
  }

  setRegistro(_registro: Tramite110102State):void {

    (Object.keys(_registro) as Array<keyof Tramite110102State>).forEach(field => {
      this.tramite110102Store.establecerDatos({ [field]: _registro[field] });
    });
  }
}
