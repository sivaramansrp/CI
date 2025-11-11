import { DatosEmpresa, DatosSociosTable, DatosSociosTableExtranjeros, RepresentacionFederal } from '../modelos/datos-empresa.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tramite120602Query } from '../estados/tramite-120602.query';
import { Tramite120602Store } from '../estados/tramite-120602.store';

/**
 * Servicio para manejar los datos de la empresa en el trámite 120602.
 * Este servicio se encarga de obtener datos simulados desde archivos JSON
 * */
@Injectable({
  providedIn: 'root'
})  
export class DatosEmpresaService {

  /**
   * URL base para obtener los datos simulados desde archivos JSON.
   * @private
   * @type {string}
   */
  private assetsJsonUrl = '/assets/json/120602/';

  /**
   * Constructor del servicio.
   * 
   * @param {HttpClient} http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient ,private tramite120602Store: Tramite120602Store,
    private tramite120602Query: Tramite120602Query) {
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Obtiene los datos simulados para la tabla datosSocios.
   * 
   * @returns {Observable<DatosSociosTable[]>} Observable que emite los datos.
   */
  obtenerDatosTablaDeSocios(): Observable<DatosSociosTable[]> {
    return this.http.get<DatosSociosTable[]>(`${this.assetsJsonUrl}datosSocios-table.json`);
  }

   /**
   * Obtiene los datos simulados para la tabla datosSocios.
   * 
   * @returns {Observable<DatosSociosTableExtranjeros[]>} Observable que emite los datos.
   */
  obtenerDatosTablaDeSociosExtranjeros(): Observable<DatosSociosTableExtranjeros[]> {
    return this.http.get<DatosSociosTableExtranjeros[]>(`${this.assetsJsonUrl}datosSociosExtranjenos.json`);
  }

  /**
   * Obtiene los datos del estado.
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite los datos.
   */
  obtenerEstado(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.assetsJsonUrl}tipoDeEmpresa.json`);
  }

  /**
   * Obtiene datos de Representación Federal
   * 
   * @returns {Observable<Catalogo[]>} Observable que emite los datos.
   */
  obtenerDatosDeRepresentacionFederal(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.assetsJsonUrl}representacionFederal.json`);
  }

  /**
   * Obtener datos para la Tabla de Representación Federal
   * 
   * @returns {Observable<RepresentacionFederal[]>} Observable que emite los datos.
   */
  ObtenerTablaDeRepresentaciónFederal(): Observable<RepresentacionFederal[]> {
    return this.http.get<RepresentacionFederal[]>(`${this.assetsJsonUrl}representacionFederal-table.json`);
  }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   * 
   * @param {DatosEmpresa} datos - Datos de la empresa a actualizar.
   */
  actualizarEstadoFormulario(datos: DatosEmpresa): void {
    if (datos.FormSolicitud?.datosImportadorExportador) {
      this.tramite120602Store.setNacionalidad(datos.FormSolicitud.datosImportadorExportador.nacionalidad);
      this.tramite120602Store.setPersona(datos.FormSolicitud.datosImportadorExportador.persona);
      this.tramite120602Store.setCadenaDependencia(datos.FormSolicitud.datosImportadorExportador.cadenaDependencia);
    }

    if (datos.solicitudForm?.tipoDeEmpresa) {
      this.tramite120602Store.setTipoDeEmpresa(String(datos.solicitudForm.tipoDeEmpresa.id));
    }

    if (datos.solicitudForm){
      this.tramite120602Store.setActividadEconomicaClave(datos.solicitudForm.actividadEconomicaClave);
    }

    if (datos.representacionFederal) {
      this.tramite120602Store.setEstado(String(datos.representacionFederal.estado.id));
      this.tramite120602Store.setRepresentacion(String(datos.representacionFederal.representacion.id));
    }
  }

  /**
   * Obtiene los datos de la empresa desde un archivo JSON.
   * 
   * @returns {Observable<DatosEmpresa>} Observable que emite los datos de la empresa.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<DatosEmpresa> {
    return this.http.get<DatosEmpresa>(`${this.assetsJsonUrl}datosEmpresa.json`);
  }

}