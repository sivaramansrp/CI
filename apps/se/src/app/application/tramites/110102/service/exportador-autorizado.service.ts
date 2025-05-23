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
    this.tramite110102Store.setCveRegistroProductor(_registro.cveRegistroProductor);
    this.tramite110102Store.setUnidadAdministrativaClave(_registro.unidadAdministrativaClave);
    this.tramite110102Store.setSolicitudEntidadFederativaEntidadClave(_registro.solicitudEntidadFederativaEntidadClave);
    this.tramite110102Store.setProtestoDecirVerdad(_registro.protestoDecirVerdad);
    this.tramite110102Store.setSolicitaSeparacionContable(_registro.solicitaSeparacionContable);
    this.tramite110102Store.setSolicitaExportadorAutorizado(_registro.solicitaExportadorAutorizado);
    this.tramite110102Store.setCondicionExportador(_registro.condicionExportador);
    this.tramite110102Store.setSolicitaExportadorAutorizadoJPN(_registro.solicitaExportadorAutorizadoJPN);
    this.tramite110102Store.setCondicionExportadorJPN(_registro.condicionExportadorJPN);
    
  }
}
