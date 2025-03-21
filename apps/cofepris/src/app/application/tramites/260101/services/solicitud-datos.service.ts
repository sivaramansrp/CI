import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatosDeSolicitud, Solicitud } from '../models/solicitud-datos.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Mercancia, MercanciaCatalogos, MercanciaCrossList } from '../models/mercancia.model';
import { ClavesDeLotes } from '../models/claves-de-lotes.model';
import { Destinatario, DestinatarioCatalogos } from '../models/destinatario.model';
import { Fabricante } from '../models/fabricante.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitudDatosService {

  constructor(public http: HttpClient) {}

  obtenerDatosDeSolicitud(): Observable<DatosDeSolicitud> {
    return this.http.get<DatosDeSolicitud>('../../../assets/json/260101/solicitud-datos.json').pipe();
  }

  obtenerSolicitud(): Observable<Solicitud> {
    return this.http.get<Solicitud>('../../../assets/json/260101/solicitud.json').pipe();
  }

  obtenerRegimenDestinaraListo() {
    return this.http.get<CatalogosSelect>('../../../assets/json/260101/regimen-destinaran.json').pipe();
  }

  obtenerAduanaListo() {
    return this.http.get<CatalogosSelect>('../../../assets/json/260101/aduana.json').pipe();
  }

  obtenerEstadoCatalogo() {
    return this.http.get<CatalogosSelect>('../../../assets/json/260101/estado-catalogo.json').pipe();
  }

  obtenerMercanciaListo():Observable<Mercancia[]>{
    return this.http.get<Mercancia[]>('../../../assets/json/260101/mercancia.json').pipe();
  }

  obtenerClavesDeLotesListo():Observable<ClavesDeLotes[]>{
    return this.http.get<ClavesDeLotes[]>('../../../assets/json/260101/claves-de-lotes.json').pipe();
  }

  obtenerDestinatarioListo():Observable<Destinatario[]>{
    return this.http.get<Destinatario[]>('../../../assets/json/260101/destinatario.json').pipe();
  }

  obtenerFabricanteListo():Observable<Fabricante[]>{
    return this.http.get<Fabricante[]>('../../../assets/json/260101/fabricante.json').pipe();
  }

  obtenerDestinatarioCatalogos():Observable<DestinatarioCatalogos>{
    return this.http.get<DestinatarioCatalogos>('../../../assets/json/260101/destinatario-catalogos.json').pipe();
  }

  obtenerDestinatarioRadio():Observable<{ label: string; value: string | number }[]>{
    return this.http.get<{ label: string; value: string | number }[]>('../../../assets/json/260101/destinatario-radio.json').pipe();
  }

  obtenerMercanciaCatalogos():Observable<MercanciaCatalogos>{
    return this.http.get<MercanciaCatalogos>('../../../assets/json/260101/mercancia-catalogos.json').pipe();
  }

  obtenerCrosslisto():Observable<MercanciaCrossList>{
    return this.http.get<MercanciaCrossList>('../../../assets/json/260101/mercancia-cross-list.json').pipe();
  }
}