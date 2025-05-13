import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formaRespuestaDatos, InstalacionesPrincipalesRespuestaTabla } from '@libs/shared/data-access-user/src/core/models/6502/dato-comunes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroPoblacionalService {

  constructor(private http: HttpClient) { 
    // Constructor vacío, puede incluir lógica si es necesario.
  }

  obtenerInstalacionesPrincipalesTablaDatos(): Observable<InstalacionesPrincipalesRespuestaTabla> {
    return this.http.get<InstalacionesPrincipalesRespuestaTabla>('assets/json/6502/instalacionesPrincipales-tabla.json');
  }

  obtenerFromaDatos(): Observable<formaRespuestaDatos> {
    return this.http.get<formaRespuestaDatos>('assets/json/6502/forma-datos.json');
  }
}
