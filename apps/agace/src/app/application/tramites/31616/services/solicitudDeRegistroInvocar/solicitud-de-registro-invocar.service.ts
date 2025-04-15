import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InstalacionesPrincipalesRespuestaTabla, RespuestaTabla } from '@libs/shared/data-access-user/src/core/models/31616/dato-comunes.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudDeRegistroInvocarService {

  constructor(private http: HttpClient) { }

  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/31616/mercancias-tabla.json');
  }

  obtenerInstalacionesPrincipalesTablaDatos(): Observable<InstalacionesPrincipalesRespuestaTabla> {
    return this.http.get<InstalacionesPrincipalesRespuestaTabla>('assets/json/31616/instalacionesPrincipales-tabla.json');
  }
}
