import { BienesProducidos } from '../models/programas-reporte.model';
import { GuardarDatosFormulario } from '../models/programas-reporte.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramasReporte } from '../models/programas-reporte.model';
import { ReporteFechas } from '../models/programas-reporte.model';
import { Solicitud150102Store } from '../estados/solicitud150102.store';

/**
 * @description Servicio encargado de realizar solicitudes HTTP relacionadas con el reporte anual.
 * Proporciona métodos para obtener los programas de reporte, las fechas del reporte y los datos de bienes producidos.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * @description Servicio encargado de realizar solicitudes HTTP relacionadas con el reporte anual.
 *  Proporciona métodos para obtener los programas de reporte, las fechas del reporte y los datos de bienes producidos.
 * @class SolicitudService
 */
export class SolicitudService {
  /**
   * @description Constructor del servicio. Inyecta la dependencia de HttpClient para realizar las solicitudes HTTP.
   * @param http Cliente HTTP de Angular para realizar solicitudes al servidor.
   */
  constructor(
    private http: HttpClient,
    private solicitud150102Store: Solicitud150102Store
  ) {
    // Constructor vacío, inicialización del servicio HttpClient
  }

  /**
   * @description Obtiene los datos de los programas de reporte desde un archivo JSON.
   * @returns Un observable con un arreglo de objetos ProgramasReporte.
   */
  obtenerProgramasReporte(): Observable<ProgramasReporte[]> {
    return this.http.get<ProgramasReporte[]>(
      'assets/json/150102/programas-reporte.json'
    );
  }

  /**
   * @description Obtiene las fechas de inicio y fin del reporte desde un archivo JSON.
   * @returns Un observable con un objeto ReporteFechas.
   */
  obtenerReporteFechas(): Observable<ReporteFechas> {
    return this.http.get<ReporteFechas>(
      'assets/json/150102/reporte-fechas.json'
    );
  }

  /**
   * @description Obtiene los datos de los bienes producidos desde un archivo JSON.
   * @returns Un observable con un arreglo de objetos BienesProducidos.
   */
  obtenerProducidosDatos(): Observable<BienesProducidos[]> {
    return this.http.get<BienesProducidos[]>(
      'assets/json/150102/producidos-datos.json'
    );
  }

  /**
   * Obtiene los datos guardados del formulario desde un archivo JSON local.
   *
   * @returns {Observable<GuardarDatosFormulario>} Un observable con los datos del formulario.
   */
  guardarDatosFormulario(): Observable<GuardarDatosFormulario> {
    return this.http.get<GuardarDatosFormulario>(
      'assets/json/150102/guardar-datos-formulario.json'
    );
  }

  /**
   * Actualiza el estado del formulario en el store con los datos proporcionados.
   *
   * @param {GuardarDatosFormulario} resp - Objeto con los datos del formulario que se utilizarán para actualizar el store.
   */
  actualizarEstadoFormulario(resp: GuardarDatosFormulario): void {
    this.solicitud150102Store.actualizarInicio(resp.inicio);
    this.solicitud150102Store.actualizarFin(resp.fin);
    this.solicitud150102Store.actualizarFolioPrograma(resp.folioPrograma);
    this.solicitud150102Store.actualizarModalidad(resp.modalidad);
    this.solicitud150102Store.actualizarTipoPrograma(resp.tipoPrograma);
    this.solicitud150102Store.actualizarEstatus(resp.estatus);
    this.solicitud150102Store.actualizarVentasTotales(resp.ventasTotales);
    this.solicitud150102Store.actualizarTotalExportaciones(
      resp.totalExportaciones
    );
    this.solicitud150102Store.actualizarTotalImportaciones(
      resp.totalImportaciones
    );
    this.solicitud150102Store.actualizarSaldo(resp.saldo);
    this.solicitud150102Store.actualizarPorcentajeExportacion(
      resp.porcentajeExportacion
    );
  }
}
