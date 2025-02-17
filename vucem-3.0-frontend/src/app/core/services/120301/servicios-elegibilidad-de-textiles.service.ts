import { Injectable } from '@angular/core';
import {
  solicitante,
  datosDeLaSolicitud,
  datosParaMovilizacionNacional,
  tercerosRelacionados,
  pagoDeDerechos,
  ElegibilidadDeTextiles,
  ImportadorForm,
  FacturaForm,
  FitosanitarioForm,
  FacturaAssociationForm,
  HistoricoFabricantesForm,
} from '../../models/120301/elegibilidad-de-textiles.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importa Observable

/**
 * Servicio para la gestión de solicitudes elegibilidad de textiles.
 * Este servicio proporciona métodos para configurar y enviar la información de la solicitud.
 * @module certificadoZoosanitario
 */
@Injectable({
  providedIn: 'root',
})
export class ServiciosElegibilidadDeTextilesService {

  /**
   * Objeto que contiene los datos de la solicitud..
   * @property {textileSolicitud} textileSolicitudCargaUtil - Datos de la solicitud que se enviarán.
   */
  public textileSolicitudCargaUtil: ElegibilidadDeTextiles = {
    importadorForm: {} as ImportadorForm,
    facturaForm: {} as FacturaForm,
    fitosanitarioForm: {} as FitosanitarioForm,
    facturaAssociationForm: {} as FacturaAssociationForm,
    historicoFabricantesForm: {} as HistoricoFabricantesForm
  };

  /**
   * Constructor del servicio.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private readonly http: HttpClient) { }
  setSoliciante(name: string, value: any) {
    this.textileSolicitudCargaUtil[name] = value;
  }


  /**
   * Envía la solicitud capturada.
   * @method textileSolicitudEnviar
   * @returns {Observable<any>} - Un Observable que emite la respuesta del servidor.
   */







  textileSolicitudEnviar(): Observable<any> { // Especifica el tipo de retorno Observable<any>
    const _url = 'http://localhost:3000/textileSolicitud';
    return this.http.post<any>(_url, this.textileSolicitudCargaUtil);
  }
}