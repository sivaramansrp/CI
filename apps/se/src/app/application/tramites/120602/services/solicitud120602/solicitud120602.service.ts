import { Solicitud120602State, Tramite120602Store } from '../../../../estados/tramites/tramite120602.store';
import { ENVIRONMENT } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Solicitud120602Service {

  /**
  * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
  */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
  * URL base para los catálogos auxiliares en formato JSON.
  */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  constructor(private http: HttpClient, private tramite120602Store: Tramite120602Store) {
    // Lógica de inicialización si es necesario
  }

  getEmpresaSolicitudData(): Observable<Solicitud120602State> {
    return this.http.get<Solicitud120602State>('assets/json/120602/empresa-solicitud.json');
  }

  actualizarEstadoFormulario(DATOS: Solicitud120602State): void {
    this.tramite120602Store.setEstado(DATOS.estado);
    this.tramite120602Store.setRepresentacionFederal(DATOS.representacionFederal);
    this.tramite120602Store.setTipoEmpresa(DATOS.tipoEmpresa ?? '');
    this.tramite120602Store.setEspecifique(DATOS.especifique);
    this.tramite120602Store.setActividadEconomicaPreponderante(DATOS.actividadEconomicaPreponderante);
    this.tramite120602Store.setDescripcion(DATOS.descripcion);
    this.tramite120602Store.setPais(DATOS.pais);
    this.tramite120602Store.setCodigoPostal(DATOS.codigoPostal);
    this.tramite120602Store.setEstadoDomicilio(DATOS.estadoDomicilio);
    this.tramite120602Store.setMunicipioAlcaldia(DATOS.municipioAlcaldia);
    this.tramite120602Store.setLocalidad(DATOS.localidad);
    this.tramite120602Store.setColonia(DATOS.colonia);
    this.tramite120602Store.setCalle(DATOS.calle);
    this.tramite120602Store.setNumeroExterior(DATOS.numeroExterior);
    this.tramite120602Store.setNumeroInterior(DATOS.numeroInterior);
    this.tramite120602Store.setLada(DATOS.lada);
    this.tramite120602Store.setTelefono(DATOS.telefono);
    this.tramite120602Store.setNacionalidad(DATOS.nacionalidad);
    this.tramite120602Store.setTipoDePersona(DATOS.tipoDePersona);
    this.tramite120602Store.setTaxId(DATOS.taxId);
    this.tramite120602Store.setDenominacion(DATOS.denominacion);
    this.tramite120602Store.setDatosPais(DATOS.datosPais ?? '');
    this.tramite120602Store.setDatosCodigoPostal(DATOS.datosCodigoPostal ?? '');
    this.tramite120602Store.setDatosEstado(DATOS.datosEstado ?? '');
    this.tramite120602Store.setCorreoElectronico(DATOS.correoElectronico);
  }
}
