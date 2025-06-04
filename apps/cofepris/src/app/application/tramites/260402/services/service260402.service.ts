import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DatosDelSolicituteSeccionState } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { DatosDelSolicituteSeccionStateStore } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';


@Injectable({
  providedIn: 'root',
})
export class Solocitud260402Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite301Store: DatosDelSolicituteSeccionStateStore,) {
    // Lógica de inicialización si es necesario
  }

  actualizarEstadoFormulario(DATOS: DatosDelSolicituteSeccionState): void {
    this.tramite301Store.setEstablecimientoDenominacionRazonSocial(DATOS.establecimientoDenominacionRazonSocial);
    this.tramite301Store.setEstablecimientoCorreoElectronico(DATOS.establecimientoCorreoElectronico);
    this.tramite301Store.setEstablecimientoDomicilioCodigoPostal(DATOS.establecimientoDomicilioCodigoPostal);
    this.tramite301Store.setEstablecimientoDomicilioEstado(DATOS.establecimientoDomicilioEstado);
    this.tramite301Store.setEstablecimientoMunicipioYAlcaldia(DATOS.establecimientoMunicipioYAlcaldia);
    this.tramite301Store.setEstablecimientoDomicilioLocalidad(DATOS.establecimientoDomicilioLocalidad);
    this.tramite301Store.setEstablecimientoDomicilioColonia(DATOS.establecimientoDomicilioColonia);
    this.tramite301Store.setEstablecimientoDomicilioCalle(DATOS.establecimientoDomicilioCalle);
    this.tramite301Store.setEstablecimientoDomicilioLada(DATOS.establecimientoDomicilioLada);
    this.tramite301Store.setEstablecimientoDomicilioTelefono(DATOS.establecimientoDomicilioTelefono);
    this.tramite301Store.setRfcDelProfesionalResponsable(DATOS.rfcDelProfesionalResponsable);
    this.tramite301Store.setNombreDelProfesionalResponsable(DATOS.nombreDelProfesionalResponsable)
  
    
  }

  getRegistroTomaMuestrasMercanciasData(): Observable<DatosDelSolicituteSeccionState> {
    return this.http.get<DatosDelSolicituteSeccionState>('assets/json/260402/serviciosExtraordinarios.json');
  }

}
