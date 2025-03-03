import { Injectable } from '@angular/core';
import {
  solicitante,
  datosDeLaSolicitud,
  datosParaMovilizacionNacional,
  pagoDeDerechos,
  ElegibilidadDeTextiles,
  ImportadorForm,
  FacturaForm,
  FitosanitarioForm,
  formularioAsociacionFactura,
  HistoricoFabricantesForm,
} from '../models/elegibilidad-de-textiles.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importa Observable
import { Store, StoreConfig } from '@datorama/akita'; // Import Akita

// Define the state interface
export interface ElegibilidadDeTextilesState {
  textileSolicitudCargaUtil: ElegibilidadDeTextiles;
}

// Create the store
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'elegibilidadDeTextiles' })
export class ElegibilidadDeTextilesStore extends Store<ElegibilidadDeTextilesState> {
  constructor() {
    super({
      textileSolicitudCargaUtil: {
        importadorForm: {} as ImportadorForm,
        facturaForm: {} as FacturaForm,
        fitosanitarioForm: {} as FitosanitarioForm,
        formularioAsociacionFactura: {} as formularioAsociacionFactura,
        historicoFabricantesForm: {} as HistoricoFabricantesForm
      }
    });
  }
}

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
   * Constructor del servicio.
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private readonly http: HttpClient, private elegibilidadDeTextilesStore: ElegibilidadDeTextilesStore) { }

  setSoliciante(name: string, value: any) {
    this.elegibilidadDeTextilesStore.update(state => ({
      textileSolicitudCargaUtil: {
        ...state.textileSolicitudCargaUtil,
        [name]: value
      }
    }));
  }

  /**
   * Envía la solicitud capturada.
   * @method textileSolicitudEnviar
   * @returns {Observable<any>} - Un Observable que emite la respuesta del servidor.
   */
  textileSolicitudEnviar(): Observable<any> { // Especifica el tipo de retorno Observable<any>
    const _url = 'http://localhost:3000/textileSolicitud';
    return this.http.post<any>(_url, this.elegibilidadDeTextilesStore.getValue().textileSolicitudCargaUtil);
  }
}