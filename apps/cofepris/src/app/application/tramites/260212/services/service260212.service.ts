import { Terceros260211State, Terceros260211Store } from '../../../estados/tramites/terceros260211.store';
import { Tramite260212State, Tramite260212Store } from '../estados/tramite260212.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de manejar la lógica y comunicación relacionada con el trámite 260212.
 * Proporciona métodos para actualizar el estado del formulario y obtener datos de consulta.
 */
@Injectable({
  providedIn: 'root',
})
export class Service260212Service {
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
   * @param tramite260212Store Almacén de estado para el trámite 260212.
   */
  constructor(private http: HttpClient, private tramite260212Store: Tramite260212Store,private terceros260211Store: Terceros260211Store) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario en el store a partir de los datos proporcionados.
   * @param DATOS Estado actual del formulario de trámite 260212.
   */
  actualizarEstadoFormulario(DATOS: Tramite260212State): void {
    if (DATOS.estado) {
      this.tramite260212Store.setSelectedEstado(DATOS.estado);
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
    this.tramite260212Store.setRfcDelResponsableSanitario(DATOS.rfcDelResponsableSanitario);
    this.tramite260212Store.setDenominacionRazonSocial(DATOS.denominacionRazonSocial);
    this.tramite260212Store.setCorreoElectronico(DATOS.correoElectronico);
    this.tramite260212Store.setMunicipio(DATOS.municipio);
    this.tramite260212Store.setLocalidad(DATOS.localidad);
    this.tramite260212Store.setColonia(DATOS.colonia);
    this.tramite260212Store.setCalle(DATOS.calle);
    this.tramite260212Store.setLada(DATOS.lada);
     this.tramite260212Store.setTelefono(DATOS.teléfono);
    this.tramite260212Store.setCodigoPostal(DATOS.codigoPostal);
     if (DATOS.regimen) {
      this.tramite260212Store.setRegimen(DATOS.regimen);
    }
     if (DATOS.entradas) {
      this.tramite260212Store.setEntradas(DATOS.entradas);
    }
   this.tramite260212Store.setClaveDeReferncia(DATOS.ClaveDeReferncia);
   this.tramite260212Store.setCadenaDeLaDependencia(DATOS.CadenaDeLaDependencia);
   this.tramite260212Store.setLlaveDePago(DATOS.llaveDePago);
   this.tramite260212Store.setFechaDePago(DATOS.setFechaDePago);
    this.tramite260212Store.setImporteDePago(DATOS.importeDePago);
    
  this.tramite260212Store.setLosDatos(DATOS.losDatos);
  this.tramite260212Store.setRfc(DATOS.rfc);
  this.tramite260212Store.setNombre(DATOS.nombre);
  this.tramite260212Store.setPrimerApellido(DATOS.primerApellido);
  this.tramite260212Store.setSegundoApellido(DATOS.segundoApellido);
    this.tramite260212Store.setAvisoclave(DATOS.avisoclave);
  this.tramite260212Store.setNoLicenciaSanitaria(DATOS.noLicenciaSanitaria);
  }
   actualizarEstadoTercerosFormulario(DATOS: Terceros260211State): void {
  this.terceros260211Store.setTercerosNacionalidad(DATOS.tercerosNacionalidad);
  this.terceros260211Store.setTipoPersona(DATOS.tipoPersona);
  this.terceros260211Store.setRfc(DATOS.rfc);
  this.terceros260211Store.setNombre(DATOS.nombre);
  this.terceros260211Store.setPrimerApellido(DATOS.primerApellido);
  this.terceros260211Store.setSegundoApellido(DATOS.segundoApellido);
  this.terceros260211Store.setCurp(DATOS.curp);
  this.terceros260211Store.setDenominacionRazonSocial(DATOS.denominacionRazonSocial);
  this.terceros260211Store.setPais(DATOS.pais);
  this.terceros260211Store.setEstadoLocalidad(DATOS.estadoLocalidad);
  this.terceros260211Store.setMunicipioAlcaldia(DATOS.municipioAlcaldia);
  this.terceros260211Store.setLocalidad(DATOS.localidad);
  this.terceros260211Store.setCodigoPostaloEquivalente(DATOS.codigoPostaloEquivalente);
  this.terceros260211Store.setColonia(DATOS.colonia);
  this.terceros260211Store.setExtranjeroEstado(DATOS.extranjeroEstado);
  this.terceros260211Store.setExtranjeroCodigo(DATOS.extranjeroCodigo);
  this.terceros260211Store.setExtranjeroColonia(DATOS.extranjeroColonia);
  this.terceros260211Store.setCalle(DATOS.calle);
  this.terceros260211Store.setNumeroExterior(DATOS.numeroExterior);
  this.terceros260211Store.setNumeroInterior(DATOS.numeroInterior);
  this.terceros260211Store.setLada(DATOS.lada);
  this.terceros260211Store.setTelefono(DATOS.telefono);
  this.terceros260211Store.setCorreoElectronico(DATOS.correoElectronico);
  this.terceros260211Store.setColoniaoEquivalente(DATOS.coloniaoEquivalente);
  this.terceros260211Store.setColoniaoEquivalenteLabel(DATOS.coloniaoEquivalenteLabel);
  this.terceros260211Store.setCodigoPostaloEquivalentes(DATOS.codigoPostaloEquivalentes);
  this.terceros260211Store.setEstado(DATOS.estado);
  this.terceros260211Store.setEntidadFederativa(DATOS.entidadFederativa);
}
  /**
   * Obtiene los datos de consulta para el registro de toma de muestras de mercancías.
   * @returns Observable con el estado del trámite 260212.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260212State> {
    return this.http.get<Tramite260212State>('assets/json/260212/consulta.json');
  }
 getTercerosData(): Observable<Terceros260211State> {
    return this.http.get<Terceros260211State>('assets/json/260212/tercerosdata.json');
  }
}
