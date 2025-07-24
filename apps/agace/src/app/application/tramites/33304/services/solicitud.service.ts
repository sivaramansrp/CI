import { Solicitud33304State, Solicitud33304Store } from '../estados/solicitud33304Store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de manejar la lógica y comunicación relacionada con el trámite 317.
 * Proporciona métodos para actualizar el estado del formulario y obtener datos de consulta.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  /**
   * URL del servidor principal.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  /**
   * URL del servidor de catálogos auxiliares.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar peticiones.
   * @param tramite33303Store Almacén de estado para el trámite 33303.
   */
  constructor(private http: HttpClient, private solicitud33304Store: Solicitud33304Store,) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario en el store a partir de los datos proporcionados.
   * @param DATOS Estado actual del formulario de trámite 33303.
   */
  actualizarEstadoFormulario(DATOS: Solicitud33304State): void {
    if (DATOS.numeroOperacion) {
      this.solicitud33304Store.setnumeroOperacion(DATOS.numeroOperacion);
    }
    if (DATOS.banco) {
      this.solicitud33304Store.setbanco(DATOS.banco);
    }
    if (DATOS.llavePago) {
      this.solicitud33304Store.setllavePago(DATOS.llavePago);
    }
    if (DATOS.fechaPago) {
      this.solicitud33304Store.setfechaPago(DATOS.fechaPago);
    }
    if (DATOS.mapTipoTramite) {
      this.solicitud33304Store.setmapTipoTramite(DATOS.mapTipoTramite);
    }
   
    if (DATOS.foreignClientsSuppliers) {
      this.solicitud33304Store.setforeignClientsSuppliers(DATOS.foreignClientsSuppliers);
    }
    if (DATOS.nationalSuppliers) {
      this.solicitud33304Store.setnationalSuppliers(DATOS.nationalSuppliers);
    }
    if (DATOS.modificationsMembers) {
      this.solicitud33304Store.setmodificationsMembers(DATOS.modificationsMembers);
    }
    if (DATOS.changesToLegalDocuments) {
      this.solicitud33304Store.setchangesToLegalDocuments(DATOS.changesToLegalDocuments);
    }
    if (DATOS.mergerOrSplitNotice) {
      this.solicitud33304Store.setmergerOrSplitNotice(DATOS.mergerOrSplitNotice);
    }
    if (DATOS.additionFractions) {
      this.solicitud33304Store.setadditionFractions(DATOS.additionFractions);
    }
    if (DATOS.additionmodificación) {
      this.solicitud33304Store.setadditionmodificación(DATOS.additionmodificación);
    }
    if (DATOS.additionPresentación) {
      this.solicitud33304Store.setadditionPresentación(DATOS.additionPresentación);
    }
    if (DATOS.acepto253) {
      this.solicitud33304Store.setacepto253(DATOS.acepto253);
    }
  }

  /**
   * Obtiene los datos de consulta para el registro de toma de muestras de mercancías.
   * @returns Observable con el estado del trámite 317.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud33304State> {
    return this.http.get<Solicitud33304State>('assets/json/33303/consulta.json');
  }

}
