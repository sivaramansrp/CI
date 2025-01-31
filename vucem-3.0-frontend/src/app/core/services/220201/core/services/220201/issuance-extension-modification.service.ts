import { Injectable } from '@angular/core';
import {
  capturarSolicitud,
  solicitante,
  datosDeLaSolicitud,
  datosParaMovilizacionNacional,
  tercerosRelacionados,
  pagoDeDerechos,
} from '../../../../../models/220201/capturar-solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class IssuanceExtensionModificationServiceService {
  capturarSolicitudCargaUtil: capturarSolicitud;

  constructor() {}

  setSoliciante(solicitante: solicitante) {
    this.capturarSolicitudCargaUtil.solicitane = solicitante;
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
}
