/**
 * @fileoverview Servicio `EstablecimientoService`
 * Este servicio proporciona métodos para interactuar con los datos relacionados con el establecimiento,
 * incluyendo catálogos, datos de representantes, manifiestos, y propietarios.
 */
import { DatosDelSolicituteSeccionStateInterface, DatosDelSolicituteSeccionStateStoreI} from '../estados/datos-del-solicitud-seccion.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable} from 'rxjs';

import { Catalogo } from '@libs/shared/data-access-user/src';

import { PropietarioTipoPersona } from '../models/datos-de-la-solicitud.model';

import { DatosDomicilioLegalState } from '../../../shared/estados/stores/datos-domicilio-legal.store';

import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';

/**
 * @class EstablecimientoService
 * @description
 * Servicio que gestiona las solicitudes HTTP para obtener datos relacionados con el establecimiento.
 */
@Injectable({
  providedIn: 'root',
})
export class EstablecimientoService {
  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient,
    private tramiteStore: DatosDelSolicituteSeccionStateStoreI,
  private tramiteStoreData: DatosDelSolicituteSeccionStateStore
  ) {
    //constructor
  }

  /**
   * Obtiene los datos del catálogo de SCIAN.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del catálogo de SCIAN.
   */
  getSciandata(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/scianda.json');
  }

  /**
   * Obtiene los datos de justificación.
   * @returns {Observable<PropietarioTipoPersona[]>} Un observable con los datos de justificación.
   */
  getJustificationData(): Observable<PropietarioTipoPersona[]> {
    return this.http.get<PropietarioTipoPersona[]>('assets/json/cofepris/justificacion.json');
  }
  /**
   * Obtiene los datos de un establecimiento por su ID.
   * @param id ID del establecimiento.
   * @returns {Observable<Catalogo[]>} Un observable con los datos del establecimiento.
   */
  getEstadodata(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/260401/scianda.json');
  }
  /**
   * 
   * @returns {Observable<DatosDelSolicituteSeccionStateInterface>} Un observable con los datos del establecimiento.
   * @description
   */
  getPagoDerechos(): Observable<DatosDelSolicituteSeccionStateInterface> {
      return this.http.get<DatosDelSolicituteSeccionStateInterface>('assets/json/260909/serviciosExtraordinarios260909.json');
    }
    /**
     * 
     * @returns {Observable<DatosDomicilioLegalStore>} Un observable con los datos del estado de derechos.
     * @description
     */
    getEstadoDerechos(): Observable<DatosDelSolicituteSeccionState> {
    return this.http.get<DatosDelSolicituteSeccionState>('assets/json/260909/serviciosExtraordinarios.json');
  }
  /**
   * 
   * @param DATOS Datos del solicitante que se actualizarán en el estado del formulario.
   * @description
   */
  actualizarEstadoFormulario(DATOS: DatosDelSolicituteSeccionStateInterface): void {
  this.tramiteStore.setEstablecimientoCorreoElectronico(DATOS.establecimientoCorreoElectronico);
  this.tramiteStore.setEstablecimientoDomicilioCodigoPostal(DATOS.establecimientoDomicilioCodigoPostal);
  this.tramiteStore.setIdeGenerica1(DATOS.ideGenerica1);
  this.tramiteStore.setObservaciones(DATOS.observaciones);
  this.tramiteStore.setEstablecimientoRFCResponsableSanitario(DATOS.establecimientoRFCResponsableSanitario);
  this.tramiteStore.setEstablecimientoRazonSocial(DATOS.establecimientoRazonSocial);
  this.tramiteStore.setEstablecimientoEstados(DATOS.establecimientoEstados);
  this.tramiteStore.setDescripcionMunicipio(DATOS.descripcionMunicipio);
  this.tramiteStore.setLocalidad(DATOS.localidad);
  this.tramiteStore.setColonias(DATOS.colonias);
  this.tramiteStore.setCalle(DATOS.calle);
  this.tramiteStore.setLada(DATOS.lada);
  this.tramiteStore.setTelefono(DATOS.telefono);
  this.tramiteStore.setScian(DATOS.scian);
  this.tramiteStore.setEstablishomentoColonias(DATOS.establishomentoColonias);
  this.tramiteStore.setNoLicenciaSanitaria(DATOS.noLicenciaSanitaria);
  this.tramiteStore.setAvisoCheckbox(DATOS.avisoCheckbox);
  this.tramiteStore.setLicenciaSanitaria(DATOS.licenciaSanitaria);
  this.tramiteStore.setRegimen(DATOS.regimen);
  this.tramiteStore.setAduanasEntradas(DATOS.aduanasEntradas);
  this.tramiteStore.setDescripcionScian(DATOS.descripcionScian);
   this.tramiteStore.setRepresentanteApellidos(DATOS.apellidoMaterno,DATOS.apellidoPaterno);
  
}
actualizarFormulario(DATOS: DatosDelSolicituteSeccionState): void {
this.tramiteStoreData.setRepresentanteRfc(DATOS.representanteRfc);
this.tramiteStoreData.setRepresentanteNombre(DATOS.representanteNombre);
this.tramiteStoreData.setRepresentanteApellidos(DATOS.apellidoPaterno, DATOS.apellidoMaterno);
}
}