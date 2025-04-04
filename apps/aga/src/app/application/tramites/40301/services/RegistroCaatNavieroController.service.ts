import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroCaatNaviero } from './RegistroCaatNaviero';

// Define interfaces based on the models used in the controller
export interface SolicitudCaatNaviero {
  idSolicitud?: number;
  solicitante: Solicitante;
  directorGeneral?: DirectorGeneral;
  caatSolicitudes?: CaatSolicitud[];
}

export interface Solicitante {
  rfc: string;
  tipoAgente?: string;
  booleanExtranjero?: boolean;
  personaMoral?: boolean;
  idPersonaSolicitud?: number;
}

export interface DirectorGeneral {
  idPersonaPersonaSolicitud?: number;
  nombre: string;
  apellidoPaterno: string;
}

export interface CaatSolicitud {
  idTipoCaat: string;
  cveFolioCaat: string;
  fechaFinVigencia: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistroCaatNavieroService implements RegistroCaatNaviero {
  private baseUrl: string = '/api/registroCaatNaviero'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  /**
   * Initializes the CAAT Naviero registration process.
   * @returns Observable<any>
   */
  iniciar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/iniciar`);
  }

  /**
   * Displays the registration form with existing data if available.
   * @returns Observable<any>
   */
  mostrar(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mostrar`);
  }

  /**
   * Saves the CAAT Naviero solicitation.
   * @param solicitud SolicitudCaatNaviero
   * @returns Observable<any>
   */
  guardar(solicitud: SolicitudCaatNaviero): Observable<any> {
    return this.http.post(`${this.baseUrl}/guardar`, solicitud, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Signs the solicitation and generates an acuse.
   * @param idSolicitud number
   * @returns Observable<any>
   */
  firmar(idSolicitud: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/firmar`, { idSolicitud }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Returns to the main menu.
   * @returns Observable<any>
   */
  regresaMenu(): Observable<any> {
    return this.http.get(`${this.baseUrl}/regresaMenu`);
  }

  /**
   * Generates the acuse receipt.
   * @param folioTramite string
   * @returns Observable<Blob>
   */
  generaAcuseRecibo(folioTramite: string): Observable<Blob> {
    const params = new HttpParams().set('folioTramite', folioTramite);
    return this.http.get(`${this.baseUrl}/generaAcuseRecibo`, {
      params,
      responseType: 'blob'
    });
  }

  /**
   * Retrieves the current solicitud.
   * @returns Observable<SolicitudCaatNaviero>
   */
  getSolicitud(): Observable<SolicitudCaatNaviero> {
    return this.http.get<SolicitudCaatNaviero>(`${this.baseUrl}/solicitud`);
  }

  /**
   * Updates the current solicitud.
   * @param solicitud SolicitudCaatNaviero
   * @returns Observable<any>
   */
  setSolicitud(solicitud: SolicitudCaatNaviero): Observable<any> {
    return this.http.put(`${this.baseUrl}/solicitud`, solicitud, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Retrieves the CAAT information by folio.
   * @param cveFolioCaat string
   * @returns Observable<CaatSolicitud>
   */
  getCaatByFolio(cveFolioCaat: string): Observable<CaatSolicitud> {
    const params = new HttpParams().set('cveFolioCaat', cveFolioCaat);
    return this.http.get<CaatSolicitud>(`${this.baseUrl}/caatPorFolio`, { params });
  }

  /**
   * Checks if there are pending solicitudes for a given RFC.
   * @param rfc string
   * @returns Observable<boolean>
   */
  tieneSolicitudesPendientes(rfc: string): Observable<boolean> {
    const params = new HttpParams().set('rfc', rfc);
    return this.http.get<boolean>(`${this.baseUrl}/solicitudesPendientes`, { params });
  }

  /**
   * Retrieves the role of the current user.
   * @returns Observable<string>
   */
  getUserRole(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/userRole`);
  }

  /**
   * Retrieves the Director General for a given solicitud.
   * @param idSolicitud number
   * @returns Observable<DirectorGeneral>
   */
  obtenerDirectorGeneral(idSolicitud: number): Observable<DirectorGeneral> {
    const PARAMS = new HttpParams().set('idSolicitud', idSolicitud.toString());
    return this.http.get<DirectorGeneral>(`${this.baseUrl}/directorGeneral`, { params: PARAMS });
  }

  /**
   * Saves the Director General information.
   * @param solicitud SolicitudCaatNaviero
   * @param directorGeneral DirectorGeneral
   * @returns Observable<any>
   */
  guardarDirectorGeneral(solicitud: SolicitudCaatNaviero, directorGeneral: DirectorGeneral): Observable<any> {
    const PAYLOAD = {
      solicitud,
      directorGeneral
    };
    return this.http.post(`${this.baseUrl}/guardarDirectorGeneral`, PAYLOAD, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Actualizes the type of agent for a given solicitud.
   * @param solicitante Solicitante
   * @param idSolicitud number
   * @returns Observable<any>
   */
  actualizaTipoAgente(solicitante: Solicitante, idSolicitud: number): Observable<any> {
    const PAYLOAD = {
      solicitante,
      idSolicitud
    };
    return this.http.put(`${this.baseUrl}/actualizaTipoAgente`, PAYLOAD, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Retrieves the RFC by solicitud ID.
   * @param idSolicitud number
   * @returns Observable<string>
   */
  buscarRFCPorIdSolicitud(idSolicitud: number): Observable<string> {
    const params = new HttpParams().set('idSolicitud', idSolicitud.toString());
    return this.http.get<string>(`${this.baseUrl}/buscarRFC`, { params });
  }

  /**
   * Retrieves the tipoAgente by cveFolioCaat.
   * @param cveFolioCaat string
   * @returns Observable<string>
   */
  buscarTipoAgentePorCveFolioCaat(cveFolioCaat: string): Observable<string> {
    const params = new HttpParams().set('cveFolioCaat', cveFolioCaat);
    return this.http.get<string>(`${this.baseUrl}/tipoAgentePorFolio`, { params });
  }

  /**
   * Obtains the description based on tipoAgente.
   * @param tipoAgente string
   * @returns Observable<string>
   */
  obtenerDescripcion(tipoAgente: string): Observable<string> {
    const params = new HttpParams().set('tipoAgente', tipoAgente);
    return this.http.get<string>(`${this.baseUrl}/descripcionAgente`, { params });
  }

  /**
   * Busca la solicitud CAAT Naviero vigente por RFC.
   * @param rfc string
   * @returns Observable<CaatSolicitud>
   */
  buscarCaatNavieroVigentePorRFC(rfc: string): Observable<CaatSolicitud> {
    const params = new HttpParams().set('rfc', rfc);
    return this.http.get<CaatSolicitud>(`${this.baseUrl}/caatVigentePorRFC`, { params });
  }

  /**
   * Guarda la resolución para un folio de trámite y solicitud.
   * @param folioTramite string
   * @param idSolicitud number
   * @param tipoCaat string
   * @returns Observable<any>
   */
  guardarResolucion(folioTramite: string, idSolicitud: number, tipoCaat: string): Observable<any> {
    const payload = {
      folioTramite,
      idSolicitud,
      tipoCaat
    };
    return this.http.post(`${this.baseUrl}/guardarResolucion`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  /**
   * Guarda una CAAT solicitud terrestre.
   * @param rfc string
   * @param idSolicitud number
   * @param tipoCaat string
   * @returns Observable<CaatSolicitud>
   */
  guardarCaat(rfc: string, idSolicitud: number, tipoCaat: string): Observable<CaatSolicitud> {
    const payload = {
      rfc,
      idSolicitud,
      tipoCaat
    };
    return this.http.post<CaatSolicitud>(`${this.baseUrl}/guardarCaat`, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}