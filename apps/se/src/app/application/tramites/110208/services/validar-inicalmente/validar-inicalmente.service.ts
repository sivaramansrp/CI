import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { Observable } from 'rxjs';
import { RespuestaDatos, RespuestaTabla } from '../../components/cargaDeMercancias/cargaDeMercancias.component';
import { RespuestaTablaCertificado } from '../../components/certificado-origen/certificado-origen.component';

@Injectable({
  providedIn: 'root'
})
export class ValidarInicalmenteService {

  constructor(private http: HttpClient) { }

  obtenerEstadoList(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>('assets/json/110208/seleccion.json');
  }

  obtenerFormDatos(): Observable<RespuestaDatos> {
    return this.http.get<RespuestaDatos>('assets/json/110208/mercancia-datos.json');
  }

  obtenerTablaDatos(): Observable<RespuestaTabla> {
    return this.http.get<RespuestaTabla>('assets/json/110208/mercancias-tabla.json');
  }

  obtenerTablaDatosCertificado(): Observable<RespuestaTablaCertificado> {
    return this.http.get<RespuestaTablaCertificado>('assets/json/110208/certificado-tabla.json');
  }
}
