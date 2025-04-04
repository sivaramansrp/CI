import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { RequestCertificadoKimberleyForma, RequestDatosDelTramite, RequestPartidasForma, RequestProrrogasForma, RespuestaDatos, RespuestaTabla } from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudProrrogaService {

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a recursos externos.
   */
  constructor(private http: HttpClient) { }

  obtenerFormDatos(): Observable<RespuestaDatos> {
    return this.http.get<RespuestaDatos>('assets/json/130301/solicitud-forma.json');
  }

  obtenerDelTramiteFormDatos(): Observable<RequestDatosDelTramite> {
    return this.http.get<RequestDatosDelTramite>('assets/json/130301/datos-del-tramite.json');
  }
  
  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/130301/partidas-tabla.json');
  }
  obtenerPartidasFormDatos(): Observable<RequestPartidasForma> {
    return this.http.get<RequestPartidasForma>('assets/json/130301/partidas-forma.json');
  }
  obtenerCertificadoKimberleyFormDatos(): Observable<RequestCertificadoKimberleyForma> {
    return this.http.get<RequestCertificadoKimberleyForma>('assets/json/130301/certificadoKimberley-forma.json');
  }
  obtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/130301/seleccion.json');
  }
  obtenerProrrogasFormDatos(): Observable<RequestProrrogasForma> {
    return this.http.get<RequestProrrogasForma>('assets/json/130301/prorrogas-forma.json');
  }
}
