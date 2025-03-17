/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatosDelTramite, MercanciaDatos, PagoDeDerechos, PagoDeDerechosRevision, ResponsableInspección } from '../modelos/acuicola.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AcuicolaService {

  private apiUrl = 'assets/json/220703/';

  constructor(
    private http: HttpClient
    // eslint-disable-next-line no-empty-function
  ) {

  }

  obtenerDatosCertificados(): Observable<DatosDelTramite> {
    return this.http.get<DatosDelTramite>(`${this.apiUrl}datos-certificados.json`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getHoraDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}hora-de-inspeccion.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getAduanaDeIngreso(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}aduana-de-ingreso.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getOficinaDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}oficina-de-inspeccion.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getPuntoDeInspeccion(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}punto-de-inspeccion.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  obtenerResponsableDatos(): Observable<ResponsableInspección> {
    return this.http.get<ResponsableInspección>(`${this.apiUrl}responsable-inspeccion.json`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getTipoContenedor(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}tipo-contenedor.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMedioDeTransporte(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}medio-de-transporte.json`).pipe(
      map(response => {
        return response;
      })
    );
  }

  getBancoDatos(): Observable<RespuestaCatalogos> {
    return this.http.get<RespuestaCatalogos>(`${this.apiUrl}banco-datos.json`).pipe(
      map(response => {
        return response;
      })
    );
  }


  pagoDeCargarDatos(): Observable<PagoDeDerechos> {
    return this.http.get<PagoDeDerechos>(`${this.apiUrl}pago-de-derechos.json`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  getPagoDerechosRevision(): Observable<PagoDeDerechosRevision> {
    return this.http.get<PagoDeDerechosRevision>(`${this.apiUrl}pago-de-derechos-revision.json`).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

}
