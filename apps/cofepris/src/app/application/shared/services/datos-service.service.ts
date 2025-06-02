import { ENVIRONMENT } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DomicilioState, DomicilioStore } from '../estados/stores/domicilio.store';

@Injectable({
  providedIn: 'root',
})
export class DatosServiceService {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private domicilioStore: DomicilioStore,) {
    // Lógica de inicialización si es necesario
  }

  actualizarEstadoFormulario(DATOS: DomicilioState): void {
    this.domicilioStore.setDenominacion(DATOS.denominacion);
    this.domicilioStore.setCorreoElectronico(DATOS.correoElectronico);
    this.domicilioStore.setCodigoPostal(DATOS.codigoPostal);
    this.domicilioStore.setEstado(DATOS.estado);
    this.domicilioStore.setMunicipio(DATOS.municipio);
    this.domicilioStore.setLocalidad(DATOS.localidad);
    this.domicilioStore.setColonia(DATOS.colonia);
    this.domicilioStore.setCalle(DATOS.calle);
    this.domicilioStore.setLada(DATOS.lada);
    this.domicilioStore.setTelefono(DATOS.telefono);
    this.domicilioStore.setNoLicenciaSanitaria(DATOS.noLicenciaSanitaria);
      if (DATOS.regimenDestinado) {
      this.domicilioStore.setRegimenDestinado(DATOS.regimenDestinado);
    }
     if (DATOS.aduana) {
      this.domicilioStore.setAduana(DATOS.aduana);
    }
   
    this.domicilioStore.setAduana(DATOS.aduana);
  }

  getRegistroTomaMuestrasMercanciasData(): Observable<DomicilioState> {
    return this.http.get<DomicilioState>('assets/json/shared/datos.json');
  }

}
