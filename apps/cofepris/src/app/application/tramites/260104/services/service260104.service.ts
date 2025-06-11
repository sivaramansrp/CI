import { Solicitud260104State, Tramite260104StoreDos } from '../../../estados/tramites/tramite260104.store';
import {Tramite260104State,Tramite260104Store} from '../estados/stores/tramite260104.store';
import { ENVIRONMENT } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Solocitud260104Service {
  /**
   * AppConfig es una inyección de dependencias que proporciona la configuración de la aplicación.
   */
  urlServer = ENVIRONMENT.URL_SERVER;
  /**
   * URL base del servidor que contiene los catálogos auxiliares en formato JSON.
   */
  urlServerCatalogos = ENVIRONMENT.URL_SERVER_JSON_AUXILIAR;

  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a servicios o archivos locales.
   * @param tramite31601Store Store personalizado para el manejo del estado del trámite 31601.
   */
  constructor(private http: HttpClient, private tramite260104StoreDos: Tramite260104StoreDos,private tramite260104Store: Tramite260104Store) {
    // Lógica de inicialización si es necesario
  }

  /**
   * Actualiza el estado del formulario de la solicitud en el store con la información proporcionada.
   * Cada propiedad del objeto recibido es asignada al store correspondiente.
   * 
   * @param DATOS Objeto con la estructura completa del estado del formulario del trámite 31601.
   */

  actualizarEstadoFormularioDos(DATOS: Solicitud260104State): void {
    this.tramite260104StoreDos.setRazonSocial(DATOS.razonSocial);
    this.tramite260104StoreDos.setCorreoElectronico(DATOS.correoElectronico);
    this.tramite260104StoreDos.setCodigoPostal(DATOS.codigoPostal);
    this.tramite260104StoreDos.setEstado(DATOS.estado);
    this.tramite260104StoreDos.setMunicipio(DATOS.municipio);
    this.tramite260104StoreDos.setLocalidad(DATOS.localidad);
    this.tramite260104StoreDos.setColonia(DATOS.colonia);
    this.tramite260104StoreDos.setCalle(DATOS.calle);
    this.tramite260104StoreDos.setLada(DATOS.lada);
    this.tramite260104StoreDos.setTelefono(DATOS.telefono);
    this.tramite260104StoreDos.setAvisoCheckbox(DATOS.avisoCheckbox);
    this.tramite260104StoreDos.setLicenciaSanitaria(DATOS.licenciaSanitaria);
    this.tramite260104StoreDos.setRegimen(DATOS.regimen);
    this.tramite260104StoreDos.setAduana(DATOS.aduana);
    this.tramite260104StoreDos.setManifesto(DATOS.manifesto);
    this.tramite260104StoreDos.setHacerlosPublicos(DATOS.hacerlosPublicos);
    this.tramite260104StoreDos.setClaveScianModal(DATOS.claveScianModal);
    this.tramite260104StoreDos.setClaveDescripcionModal(DATOS.claveDescripcionModal);
    this.tramite260104StoreDos.setClasificacion(DATOS.clasificacion);
    this.tramite260104StoreDos.setEspecificarClasificacionProducto(DATOS.especificarClasificacionProducto);
    this.tramite260104StoreDos.setEspecifique(DATOS.especifique);
    this.tramite260104StoreDos.setDenominacionEspecifica(DATOS.denominacionEspecifica);
    this.tramite260104StoreDos.setMarca(DATOS.marca);
    this.tramite260104StoreDos.setEspecifiqueTipo(DATOS.especifiqueTipo);
    this.tramite260104StoreDos.setFraccionArancelaria(DATOS.fraccionArancelaria);
    this.tramite260104StoreDos.setDescripcionFraccion(DATOS.descripcionFraccion);
    this.tramite260104StoreDos.setCantidadUMT(DATOS.cantidadUMT);
    this.tramite260104StoreDos.setUMT(DATOS.UMT);
    this.tramite260104StoreDos.setCantidadUMC(DATOS.cantidadUMC);
    this.tramite260104StoreDos.setUMC(DATOS.UMC);
    this.tramite260104StoreDos.setClaveDeLosLotes(DATOS.claveDeLosLotes);
    this.tramite260104StoreDos.setFechaCaducidad(DATOS.fechaCaducidad);
    this.tramite260104StoreDos.setFechaFabricacion(DATOS.fechaFabricacion);
    this.tramite260104StoreDos.setTipoDeProducto(DATOS.tipoDeProducto);
    this.tramite260104StoreDos.setRfc(DATOS.rfc);
  }
  /**
   * Obtiene los datos precargados desde un archivo JSON relacionado con el registro de toma de muestras de mercancías.
   * Este archivo contiene información que se puede utilizar para precargar el estado del formulario.
   * 
   * @returns Observable con la estructura del estado de la solicitud.
   */
  getRegistroTomaMuestrasMercanciasDataDos(): Observable<Solicitud260104State> {
    return this.http.get<Solicitud260104State>('assets/json/260104/registro_toma_muestras_mercancias.json');
  }

  actualizarEstadoFormulario(DATOS: Tramite260104State): void {
    this.tramite260104Store.updatePagoDerechos(DATOS.pagoDerechos);
    this.tramite260104Store.updateDestinatarioFinalTablaDatos(DATOS.destinatarioFinalTablaDatos);
    this.tramite260104Store.updateFabricanteTablaDatos(DATOS.fabricanteTablaDatos);
  }

  /**
   * Obtiene los datos precargados desde un archivo JSON relacionado con el registro de toma de muestras de mercancías.
   * Este archivo contiene información que se puede utilizar para precargar el estado del formulario.
   * 
   * @returns Observable con la estructura del estado de la solicitud.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260104State> {
    return this.http.get<Tramite260104State>('assets/json/260104/registro_toma_muestras_mercancias_Pago.json');
  }

}
