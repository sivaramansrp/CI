import { INITIAL_STATE, Tramite32301Store } from '../estados/tramite32301.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Solicitud32301Service {

/**
 * Constructor de la clase.
 * 
 * Inyecta los servicios necesarios para realizar peticiones HTTP y 
 * para gestionar el estado del trámite 32301 mediante el store.
 * 
 * @param http Cliente HTTP de Angular para realizar solicitudes al backend.
 * @param tramite301Store Store encargado de manejar el estado del trámite 32301.
 */
constructor(
  private http: HttpClient,
  private tramite301Store: Tramite32301Store,
) {
  // Lógica de inicialización si es necesario
}

  /**
 * Actualiza el estado del formulario en el store `tramite301Store` 
 * utilizando los datos proporcionados en el objeto `DATOS`.
 * 
 * Este método asigna cada propiedad del estado recibido a su correspondiente
 * método setter en el store, asegurando que el estado del trámite 32301 esté sincronizado.
 * 
 * @param DATOS Objeto basado en `INITIAL_STATE` que contiene toda la información del formulario.
 */
actualizarEstadoFormulario(DATOS: typeof INITIAL_STATE): void {
  this.tramite301Store.setModalidadCertificacion(DATOS.tipoDevAviso.modalidadCertificacion);
  this.tramite301Store.setClientesProveedoresExtranjeros(DATOS.tipoDevAviso.foreignClientsSuppliers);
  this.tramite301Store.setProveedoresNacionales(DATOS.tipoDevAviso.nationalSuppliers);
  this.tramite301Store.setModificacionesMiembros(DATOS.tipoDevAviso.modificationsMembers);
  this.tramite301Store.setCambiosDocumentosLegales(DATOS.tipoDevAviso.changesToLegalDocuments);
  this.tramite301Store.setNotifiFusionOescision(DATOS.tipoDevAviso.mergerOrSplitNotice);
  this.tramite301Store.setAdicionalesFractions(DATOS.tipoDevAviso.additionFractions);
  this.tramite301Store.setAceptacion253(DATOS.tipoDevAviso.acepto253);
  this.tramite301Store.setArchivoExtranjero(DATOS.proveedorExtranjero);
  this.tramite301Store.setRegistrosProveedoresExtranjeros(DATOS.proveedorExtranjero);
  this.tramite301Store.setSnsucarácterde(DATOS.modificacionSocios.ensucarácterde);
  this.tramite301Store.setRfc(DATOS.modificacionSocios.rfc);
  this.tramite301Store.setObligadoaTributarenMéxico(DATOS.modificacionSocios.obligadoaTributarenMéxico);
  this.tramite301Store.setNacionalidad(DATOS.modificacionSocios.nacionalidad);
  this.tramite301Store.setModificacionGoceInmueble(DATOS.modificacionGoceInmueble);
  this.tramite301Store.SetpersonaFusionEscisionDTO(DATOS.personaFusionEscisionDTO);
  this.tramite301Store.setNombreCompleto(DATOS.modificacionSocios.nombreCompleto);
}

/**
 * Obtiene los datos del registro de toma de muestras de mercancías.
 * 
 * Realiza una solicitud HTTP GET para recuperar un archivo JSON local
 * que contiene la estructura del estado inicial (`INITIAL_STATE`) del trámite 32301.
 * 
 * @returns Un observable que emite los datos del tipo `INITIAL_STATE`.
 */
getRegistroTomaMuestrasMercanciasData(): Observable<typeof INITIAL_STATE> {
  return this.http.get<typeof INITIAL_STATE>('assets/json/32301/registro_toma_muestras_mercancias.json');
}


}
