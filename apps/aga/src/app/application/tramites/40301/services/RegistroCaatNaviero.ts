import { 
  CaatSolicitud, 
  DirectorGeneral, 
  Solicitante, 
  SolicitudCaatNaviero 
} from './RegistroCaatNavieroController.service';
import { Observable } from 'rxjs';

export interface RegistroCaatNaviero {
  iniciar(): Observable<any>;
  mostrar(): Observable<any>;
  guardar(solicitud: SolicitudCaatNaviero): Observable<any>;
  firmar(idSolicitud: number): Observable<any>;
  regresaMenu(): Observable<any>;
  generaAcuseRecibo(folioTramite: string): Observable<Blob>;
  getSolicitud(): Observable<SolicitudCaatNaviero>;
  setSolicitud(solicitud: SolicitudCaatNaviero): Observable<any>;
  getCaatByFolio(cveFolioCaat: string): Observable<CaatSolicitud>;
  tieneSolicitudesPendientes(rfc: string): Observable<boolean>;
  getUserRole(): Observable<string>;
  obtenerDirectorGeneral(idSolicitud: number): Observable<DirectorGeneral>;
  guardarDirectorGeneral(solicitud: SolicitudCaatNaviero, directorGeneral: DirectorGeneral): Observable<any>;
  actualizaTipoAgente(solicitante: Solicitante, idSolicitud: number): Observable<any>;
  buscarRFCPorIdSolicitud(idSolicitud: number): Observable<string>;
  buscarTipoAgentePorCveFolioCaat(cveFolioCaat: string): Observable<string>;
  obtenerDescripcion(tipoAgente: string): Observable<string>;
  buscarCaatNavieroVigentePorRFC(rfc: string): Observable<CaatSolicitud>;
  guardarResolucion(folioTramite: string, idSolicitud: number, tipoCaat: string): Observable<any>;
  guardarCaat(rfc: string, idSolicitud: number, tipoCaat: string): Observable<CaatSolicitud>;
}
