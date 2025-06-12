import { INITIAL_STATE, Tramite32301Store } from '../estados/tramite32301.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Solicitud32301Service {


  constructor(private http: HttpClient, private tramite301Store: Tramite32301Store,) {
    // Lógica de inicialización si es necesario
  }
  
  actualizarEstadoFormulario(DATOS: typeof INITIAL_STATE): void {
    this.tramite301Store.setModalidadCertificacion(DATOS.tipoDevAviso.modalidadCertificacion);
    this.tramite301Store.setClientesProveedoresExtranjeros(DATOS.tipoDevAviso);
    this.tramite301Store.setProveedoresNacionales(DATOS.tipoDevAviso);
    this.tramite301Store.setModificacionesMiembros(DATOS.tipoDevAviso);
    this.tramite301Store.setCambiosDocumentosLegales(DATOS.tipoDevAviso);
    this.tramite301Store.setNotifiFusionOescision(DATOS.tipoDevAviso);
    this.tramite301Store.setAdicionalesFractions(DATOS.tipoDevAviso);
    this.tramite301Store.setAceptacion253(DATOS.tipoDevAviso);
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

  getRegistroTomaMuestrasMercanciasData(): Observable<typeof INITIAL_STATE> {
    return this.http.get<typeof INITIAL_STATE>('assets/json/32301/registro_toma_muestras_mercancias.json');
  }

}
