import { Solicitud120602State, Tramite120602Store } from '../../../../estados/tramites/tramite120602.store';
import { ENVIRONMENT } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * @Injectable
 * @providedIn root
 * 
 * @description
 * Decorador que marca la clase `Solicitud120602Service` como un servicio inyectable en Angular.
 * @example
 * constructor(private solicitud120602Service: Solicitud120602Service) { }
 */
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

  /**
 * @constructor
 * @description
 * Constructor del servicio `Solicitud120602Service`.
 * @param {HttpClient} http - Servicio de Angular para realizar solicitudes HTTP.
 * @param {Tramite120602Store} tramite120602Store - Store para manejar el estado del trámite 120602.
 */
  constructor(private http: HttpClient, private tramite120602Store: Tramite120602Store) {
    // Lógica de inicialización si es necesario
  }

  /**
 * @method getEmpresaSolicitudData
 * @description
 * Obtiene los datos de la empresa para el trámite 120602 desde un archivo JSON local.
 * 
 * Detalles:
 * - Realiza una petición HTTP GET para recuperar la información de la empresa almacenada en el archivo `empresa-solicitud.json`.
 * - Devuelve un observable que emite un objeto de tipo `Solicitud120602State` con los datos obtenidos.
 * 
 * @returns {Observable<Solicitud120602State>} Observable con los datos de la empresa para el trámite.
 * 
 * @example
 * this.solicitud120602Service.getEmpresaSolicitudData().subscribe(data => {
 *   console.log(data);
 * });
 */
  getEmpresaSolicitudData(): Observable<Solicitud120602State> {
    return this.http.get<Solicitud120602State>('assets/json/120602/empresa-solicitud.json');
  }

  /**
 * @method actualizarEstadoFormulario
 * @description
 * Actualiza el estado global del formulario de empresa en el store `Tramite120602Store` con los datos proporcionados.
 * 
 * Detalles:
 * - Asigna cada propiedad del objeto `DATOS` al método correspondiente del store para mantener sincronizado el estado global.
 * - Utiliza el operador de fusión nula (`??`) para asegurar valores por defecto en campos opcionales.
 * 
 * @param {Solicitud120602State} DATOS - Objeto que contiene los datos de la empresa a actualizar en el store.
 * 
 * @example
 * this.actualizarEstadoFormulario(datosEmpresa);
 * // Actualiza el estado global del formulario con los datos de la empresa.
 */
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
