import { Injectable } from '@angular/core';
import {
  capturarSolicitud,
  solicitante,
  datosDeLaSolicitud,
  datosParaMovilizacionNacional,
  tercerosRelacionados,
  pagoDeDerechos,
} from '../../../../../models/220201/capturar-solicitud.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class MódulodeModificacióndeExtensióndeemisiónServiceService {
  public capturarSolicitudCargaUtil: capturarSolicitud = {
    solicitante: undefined,
    datosDeLaSolicitud: undefined,
    datosParaMovilizacionNacional: undefined,
    tercerosRelacionados: undefined,
    pagoDeDerechos: undefined,
  };

  constructor(private http: HttpClient) { }

  setSoliciante(solicitante: solicitante) {
    this.capturarSolicitudCargaUtil.solicitante = solicitante;
  }

  setDatosDeLaSolicitud(datosDeLaSolicitud: datosDeLaSolicitud) {
    this.capturarSolicitudCargaUtil.datosDeLaSolicitud = datosDeLaSolicitud;
  }
  setDatosParaMovilizacionNacional(
    datosParaMovilizacionNacional: datosParaMovilizacionNacional
  ) {
    this.capturarSolicitudCargaUtil.datosParaMovilizacionNacional =
      datosParaMovilizacionNacional;
  }
  setTercerosRelacionados(tercerosRelacionados: tercerosRelacionados) {
    this.capturarSolicitudCargaUtil.tercerosRelacionados = tercerosRelacionados;
  }
  setPagoDeDerechos(pagoDeDerechos: pagoDeDerechos) {
    this.capturarSolicitudCargaUtil.pagoDeDerechos = pagoDeDerechos;
  }

  CapturarsolicitudEnviar() {
    console.log(this.capturarSolicitudCargaUtil);
    const _url = 'http://localhost:3000/capturarSolicitud';
    return this.http.post<any>(_url, this.capturarSolicitudCargaUtil);
  }
}
