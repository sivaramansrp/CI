import { Tramite260212State, Tramite260212Store } from '../estados/tramite260212.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class Service260212Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;
 
  constructor(private http: HttpClient, private tramite260212Store: Tramite260212Store,) {
    // Lógica de inicialización si es necesario
  }
 
  actualizarEstadoFormulario(DATOS: Tramite260212State): void {
    if (DATOS.selectedEstado) {
      this.tramite260212Store.setSelectedEstado(DATOS.selectedEstado);
    }
    if (DATOS.selectedClave) {
      this.tramite260212Store.setClave(DATOS.selectedClave);
    }
    if (DATOS.selectedDescripcion) {
      this.tramite260212Store.setDescripcion(DATOS.selectedDescripcion);
    }
    if (DATOS.selecteDespecificarClasificacion) {
      this.tramite260212Store.setDespecificarClasificacion(DATOS.selecteDespecificarClasificacion);
    }
    if (DATOS.banco) {
      this.tramite260212Store.setBanco(DATOS.banco);
    }
    this.tramite260212Store.setRfcDelResponsableSanitario(DATOS.setRfcDelResponsableSanitario);
    this.tramite260212Store.setDenominacionRazonSocial(DATOS.setDenominacionRazonSocial);
    this.tramite260212Store.setCorreoElectronico(DATOS.setCorreoElectronico);
    this.tramite260212Store.setMunicipio(DATOS.setMunicipio);
    this.tramite260212Store.setLocalidad(DATOS.setLocalidad);
    this.tramite260212Store.setColonia(DATOS.setColonia);
    this.tramite260212Store.setCalle(DATOS.setCalle);
    this.tramite260212Store.setLada(DATOS.setLada);
    this.tramite260212Store.setCodigoPostal(DATOS.setCodigoPostal);
     if (DATOS.setRegimen) {
      this.tramite260212Store.setRegimen(DATOS.setRegimen);
    }
     if (DATOS.setEntradas) {
      this.tramite260212Store.setEntradas(DATOS.setEntradas);
    }
   this.tramite260212Store.setClaveDeReferncia(DATOS.ClaveDeReferncia);
   this.tramite260212Store.setCadenaDeLaDependencia(DATOS.CadenaDeLaDependencia);
   this.tramite260212Store.setLlaveDePago(DATOS.llaveDePago);
   this.tramite260212Store.setFechaDePago(DATOS.setFechaDePago);
    this.tramite260212Store.setImporteDePago(DATOS.importeDePago);
  }
 
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260212State> {
    return this.http.get<Tramite260212State>('assets/json/260212/consulta.json');
  }
 
}
 