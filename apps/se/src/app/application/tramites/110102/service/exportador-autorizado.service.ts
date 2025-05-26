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
    this.tramite110102Store.update({
      cveRegistroProductor: _registro.cveRegistroProductor,
      unidadAdministrativaClave: _registro.unidadAdministrativaClave,
      solicitudEntidadFederativaEntidadClave: _registro.solicitudEntidadFederativaEntidadClave,
      protestoDecirVerdad: _registro.protestoDecirVerdad,
      solicitaSeparacionContable: _registro.solicitaSeparacionContable,
      solicitaExportadorAutorizado: _registro.solicitaExportadorAutorizado,
      condicionExportador: _registro.condicionExportador,
      solicitaExportadorAutorizadoJPN: _registro.solicitaExportadorAutorizadoJPN,
      condicionExportadorJPN: _registro.condicionExportadorJPN
    });
    
  }
}
