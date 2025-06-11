import { Solicitud110208State, Tramite110208Store } from '../../../estados/tramites/tramite110208.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de manejar la lógica relacionada con la solicitud del trámite 110208.
 * Se encarga de actualizar el estado de la solicitud en el store y de obtener datos precargados desde archivos JSON.
 */
@Injectable({
  providedIn: 'root',
})
export class Solocitud110208Service {
  /**
   * URL base del servidor principal.
   */
  urlServer = ENVIRONMENT.URL_SERVER;

  /**
   * URL base del servidor que contiene los catálogos auxiliares en formato JSON.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a servicios o archivos locales.
   * @param tramite110208Store Store personalizado para el manejo del estado del trámite 110208.
   */
  constructor(
    private http: HttpClient,
    private tramite110208Store: Tramite110208Store
  ) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario de la solicitud en el store con la información proporcionada.
   * Cada propiedad del objeto recibido es asignada al store correspondiente.
   * 
   * @param DATOS Objeto con la estructura completa del estado del formulario del trámite 110208.
   */
  actualizarEstadoFormulario(DATOS: Solicitud110208State): void {
    this.tramite110208Store.setEntidadFederativa(DATOS.entidadFederativa);
    this.tramite110208Store.setBloque(DATOS.bloque);
    this.tramite110208Store.setFraccionArancelariaForm(DATOS.fraccionArancelariaForm);
    this.tramite110208Store.setRegistroProductoForm(DATOS.registroProductoForm);
    this.tramite110208Store.setNombreComercialForm(DATOS.nombreComercialForm);
    this.tramite110208Store.setFechaInicio(DATOS.fechaInicio);
    this.tramite110208Store.setFechaFinal(DATOS.fechaFinal);
    this.tramite110208Store.setTercerOperador(DATOS.tercerOperador);
    this.tramite110208Store.setMarca(DATOS.marca);
    this.tramite110208Store.setUmc(DATOS.umc);
    this.tramite110208Store.setCantidad(DATOS.cantidad);
    this.tramite110208Store.setValorDeLa(DATOS.valorDeLa);
    this.tramite110208Store.setComplementoDescripcion(DATOS.complementoDescripcion);
    this.tramite110208Store.setNFactura(DATOS.nFactura);
    this.tramite110208Store.setTipoDeFactura(DATOS.tipoDeFactura);
    this.tramite110208Store.setFechaFactura(DATOS.fechaFactura);
    this.tramite110208Store.setNombres(DATOS.nombres);
    this.tramite110208Store.setPrimerApellido(DATOS.primerApellido);
    this.tramite110208Store.setSegundoApellido(DATOS.segundoApellido);
    this.tramite110208Store.setNumeroFiscal(DATOS.numeroFiscal);
    this.tramite110208Store.setRazonSocial(DATOS.razonSocial);
    this.tramite110208Store.setCiudad(DATOS.ciudad);
    this.tramite110208Store.setCalle(DATOS.calle);
    this.tramite110208Store.setNumeroLetra(DATOS.numeroLetra);
    this.tramite110208Store.setLada(DATOS.lada);
    this.tramite110208Store.setTelefono(DATOS.telefono);
    this.tramite110208Store.setFax(DATOS.fax);
    this.tramite110208Store.setCorreoElectronico(DATOS.correoElectronico);
    this.tramite110208Store.setPaisDestino(DATOS.paisDestino);
    this.tramite110208Store.setMedioTransporte(DATOS.medioTransporte);
    this.tramite110208Store.setRutaCompleta(DATOS.rutaCompleta);
    this.tramite110208Store.setPuertoDeEmbarque(DATOS.puertoDeEmbarque);
    this.tramite110208Store.setPuertoDeDesembarque(DATOS.puertoDeDesembarque);
    this.tramite110208Store.setObservaciones(DATOS.observaciones);
    this.tramite110208Store.setIdioma(DATOS.idioma);
    this.tramite110208Store.setEntidadFederativaCertificado(DATOS.entidadFederativaCertificado);
    this.tramite110208Store.setRepresentacionFederal(DATOS.representacionFederal);
    this.tramite110208Store.setEntidadFederativaCertificado(DATOS.entidadFederativaCertificado);
  }

  /**
   * Obtiene los datos precargados desde un archivo JSON relacionado con el registro de toma de muestras de mercancías.
   * Este archivo contiene información que se puede utilizar para precargar el estado del formulario.
   * 
   * @returns Observable con la estructura del estado de la solicitud.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud110208State> {
    return this.http.get<Solicitud110208State>('assets/json/110208/registro_toma_muestras_mercancias.json');
  }
}
