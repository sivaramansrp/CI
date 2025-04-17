import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TramitesAsociados } from '../models/destinatario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CorreccionInternaDeLaCofeprisService {

  constructor(private http: HttpClient) {}

  getTramitesAsociados(): Observable<TramitesAsociados[]> {
      return this.http.get<TramitesAsociados[]>('./assets/json/261601/tramitesasociados.json');
    }

  getSolicitudData():Observable<TramitesAsociados[]> {
    return this.http.get<TramitesAsociados[]>('./assets/json/261601/solicitud.json');
  }

}
