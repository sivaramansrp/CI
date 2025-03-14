import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosDeSolicitud } from '../models/solicitud-datos.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root',
})
export class SolicitudDatosService {
  private datosDeSolicitudUrl =
    '../../../assets/json/260101/solicitud-datos.json';
  private datosRegimenDestinaraUrl =
    '../../../assets/json/260101/regimen-destinaran.json';
  private datosAduanaUrl =
    '../../../assets/json/260101/aduana.json';

  constructor(public http: HttpClient) {}

  obtenerDatosDeSolicitud(): Observable<DatosDeSolicitud> {
    return this.http.get<DatosDeSolicitud>(this.datosDeSolicitudUrl).pipe();
  }

  obtenerRegimenDestinaraListo() {
    return this.http.get<CatalogosSelect>(this.datosRegimenDestinaraUrl).pipe();
  }

  obtenerAduanaListo() {
    return this.http.get<CatalogosSelect>(this.datosAduanaUrl).pipe();
  }
}
