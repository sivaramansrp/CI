import { InstalacionesPrincipalesRespuestaTabla, PersonaRespuestaTabla, RespuestaTabla } from '@libs/shared/data-access-user/src/core/models/31616/dato-comunes.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SolicitudDeRegistroInvocarService {

  constructor(private http: HttpClient) {
    //Añade lógica aquí
   }

  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/31616/mercancias-tabla.json');
  }

  obtenerInstalacionesPrincipalesTablaDatos(): Observable<InstalacionesPrincipalesRespuestaTabla> {
    return this.http.get<InstalacionesPrincipalesRespuestaTabla>('assets/json/31616/instalacionesPrincipales-tabla.json');
  }
  obtenerPersonaTablaDatos(): Observable<PersonaRespuestaTabla> {
    return this.http.get<PersonaRespuestaTabla>('assets/json/31616/personapara.json');
  }
}
