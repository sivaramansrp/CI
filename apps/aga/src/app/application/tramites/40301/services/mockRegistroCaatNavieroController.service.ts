/* eslint-disable class-methods-use-this */
import { CaatSolicitud, DirectorGeneral, Solicitante, SolicitudCaatNaviero } from './RegistroCaatNavieroController.service';
import { Observable, of } from 'rxjs';
import { RegistroCaatNaviero } from './RegistroCaatNaviero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockRegistroCaatNavieroService implements RegistroCaatNaviero {
  private mockData = {
    // solicitud: require('./mock-data/solicitud.json'),
    solicitud: require('libs/shared/theme/assets/json/40301/solicitud.json'),
    caatSolicitudes: require('libs/shared/theme/assets/json/40301/caatSolicitudes.json'),
    directorGeneral: require('libs/shared/theme/assets/json/40301/directorGeneral.json'),
    userRole: 'admin',
    solicitudesPendientes: true,
  };

  iniciar(): Observable<any> {
    return of({ message: 'Proceso iniciado' });
  }

  mostrar(): Observable<any> {
    return of({ message: 'Formulario mostrado' });
  }

  guardar(solicitud: SolicitudCaatNaviero): Observable<any> {
    this.mockData.solicitud = solicitud;
    return of({ message: 'Solicitud guardada' });
  }

  firmar(idSolicitud: number): Observable<any> {
    return of({ message: `Solicitud ${idSolicitud} firmada` });
  }

  regresaMenu(): Observable<any> {
    return of({ message: 'Regresando al menú principal' });
  }

  generaAcuseRecibo(folioTramite: string): Observable<Blob> {
    const BLOB = new Blob([`Acuse de recibo para folio: ${folioTramite}`], { type: 'text/plain' });
    return of(BLOB);
  }

  getSolicitud(): Observable<SolicitudCaatNaviero> {
    return of(this.mockData.solicitud);
  }

  setSolicitud(solicitud: SolicitudCaatNaviero): Observable<any> {
    this.mockData.solicitud = solicitud;
    return of({ message: 'Solicitud actualizada' });
  }

  getCaatByFolio(cveFolioCaat: string): Observable<CaatSolicitud> {
    const CATT = this.mockData.caatSolicitudes.find((c: CaatSolicitud) => c.cveFolioCaat === cveFolioCaat);
    return of(CATT);
  }

  tieneSolicitudesPendientes(rfc: string): Observable<boolean> {
    return of(this.mockData.solicitudesPendientes);
  }

  getUserRole(): Observable<string> {
    return of(this.mockData.userRole);
  }

  obtenerDirectorGeneral(idSolicitud: number): Observable<DirectorGeneral> {
    return of(this.mockData.directorGeneral);
  }

  guardarDirectorGeneral(solicitud: SolicitudCaatNaviero, directorGeneral: DirectorGeneral): Observable<any> {
    this.mockData.directorGeneral = directorGeneral;
    return of({ message: 'Director General guardado' });
  }

  actualizaTipoAgente(solicitante: Solicitante, idSolicitud: number): Observable<any> {
    return of({ message: `Tipo de agente actualizado para solicitud ${idSolicitud}` });
  }

  buscarRFCPorIdSolicitud(idSolicitud: number): Observable<string> {
    return of('RFC123456789');
  }

  buscarTipoAgentePorCveFolioCaat(cveFolioCaat: string): Observable<string> {
    return of('TipoAgente123');
  }

  obtenerDescripcion(tipoAgente: string): Observable<string> {
    return of(`Descripción para tipo de agente: ${tipoAgente}`);
  }

  buscarCaatNavieroVigentePorRFC(rfc: string): Observable<CaatSolicitud> {
    return of(this.mockData.caatSolicitudes[0]);
  }

  guardarResolucion(folioTramite: string, idSolicitud: number, tipoCaat: string): Observable<any> {
    return of({ message: `Resolución guardada para folio ${folioTramite}` });
  }

  guardarCaat(rfc: string, idSolicitud: number, tipoCaat: string): Observable<CaatSolicitud> {
    const NEW_CAAT: CaatSolicitud = { idTipoCaat: tipoCaat, cveFolioCaat: 'FOLIO123', fechaFinVigencia: '2025-12-31' };
    this.mockData.caatSolicitudes.push(NEW_CAAT);
    return of(NEW_CAAT);
  }
}