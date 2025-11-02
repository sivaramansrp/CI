import { ProgramasReporte, ReporteFechas } from '../models/programas-reporte.model';
import { Solicitud150103State,Solicitud150103Store } from '../estados/solicitud150103.store';
import { Solicitud150103Query } from '../estados/solicitud150103.query';
import { PROC_150103 } from '../servers/api-route';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpCoreService, JSONResponse } from '@libs/shared/data-access-user/src';

@Injectable({
  providedIn: 'root'
})
export class InformeAnualProgramaService {  /**
   * Constructor del servicio.
   * @param http Cliente HTTP para realizar solicitudes a servicios externos.
   * @param solicitud150103Store Store para manejar el estado de la solicitud.
   * @param solicitud150103Query Query para acceder al estado de la solicitud.
   * @param httpService Servicio HTTP core para comunicación con el backend.
   */
  constructor(
    private http: HttpClient, 
    private solicitud150103Store: Solicitud150103Store,
    private solicitud150103Query: Solicitud150103Query,
    private httpService: HttpCoreService
  ) {}
  actualizarEstadoFormulario(DATOS: Solicitud150103State): void {
    this.solicitud150103Store.actualizarFolioPrograma(DATOS.folioPrograma);
    this.solicitud150103Store.actualizarModalidad(DATOS.modalidad);
    this.solicitud150103Store.actualizarTipoPrograma(DATOS.tipoPrograma);
    this.solicitud150103Store.actualizarEstatus(DATOS.estatus);
    this.solicitud150103Store.actualizarVentasTotales(DATOS.ventasTotales);
    this.solicitud150103Store.actualizarTotalExportaciones(DATOS.totalExportaciones);
   
  }
  /**
   * Obtiene los programas de reporte desde un archivo JSON.
   * 
   * Este método realiza una solicitud HTTP para obtener un arreglo de programas de reporte.
   * @returns Un observable que emite un arreglo de objetos de tipo `ProgramasReporte`.
   */
  obtenerProgramasReporte(): Observable<ProgramasReporte[]> {
    return this.http.get<ProgramasReporte[]>(
      'assets/json/150103/programas-reporte.json'
    );
  }

  /**
   * Obtiene las fechas de inicio y fin del reporte desde un archivo JSON.
   * 
   * Este método realiza una solicitud HTTP para obtener las fechas del reporte.
   * @returns Un observable que emite un objeto de tipo `ReporteFechas`.
   */
  obtenerReporteFechas(): Observable<ReporteFechas> {
    return this.http.get<ReporteFechas>(
      'assets/json/150103/reporte-fechas.json'
    );
  }

 /**
 * @method getRegistroData
 * @description Método que obtiene los datos de registro desde un archivo JSON.
 * Realiza una solicitud HTTP para obtener un objeto de tipo `Solicitud150103State`.
 * @returns Un observable que emite los datos de registro.
 */
getRegistroData(): Observable<Solicitud150103State> {
    return this.http.get<Solicitud150103State>('assets/json/150103/registro.json');
}

  /**
   * Guarda los datos del reporte anual enviando el payload al backend.
   * @param payload - Objeto que contiene los datos del reporte anual para guardar.
   * @returns Observable con la respuesta del servidor.
   */
  guardarDatosPost(payload: any): Observable<JSONResponse> {
    return this.httpService.post<JSONResponse>(PROC_150103.GUARDAR, { body: payload });
  }
  /**
   * Construye el objeto de datos del reporte basado en el estado actual.
   * @param data - Estado actual de la solicitud 150103.
   * @returns Objeto con los datos del reporte estructurados para el API.
   */
  buildDatosReporte(data: Solicitud150103State): any {
    return {
      rfc_solicitante: 'AAL0409235E6', // This should be obtained from user session
      idSolicitud: data.idSolicitud || 0,
      solicitante: {
        rfc: "AAL0409235E6",
        nombre: "EMPRESA EJEMPLO S.A. DE C.V.",
        actividad_economica: "Actividad económica ejemplo",
        correo_electronico: "contacto@empresa.com",
        domicilio: {
          pais: "México",
          codigo_postal: "06700",
          estado: "Ciudad de México",
          municipio_alcaldia: "Cuauhtémoc",
          localidad: "Centro",
          colonia: "Roma Norte",
          calle: "Av. Ejemplo",
          numero_exterior: "123",
          numero_interior: "Piso 1",
          lada: "",
          telefono: "123456"
        }
      },
      reporte_anual: {
        fecha_inicio: data.inicio,
        fecha_fin: data.fin,
        folio_programa: data.folioPrograma,
        modalidad: data.modalidad,
        tipo_programa: data.tipoPrograma,
        estatus: data.estatus,
        ventas_totales: parseFloat(data.ventasTotales) || 0,
        total_exportaciones: parseFloat(data.totalExportaciones) || 0,
        total_importaciones: parseFloat(data.totalImportaciones) || 0,
        saldo: parseFloat(data.saldo) || 0,
        porcentaje_exportacion: parseFloat(data.porcentajeExportacion) || 0
      },
      fracciones: [],
      sectores: []
    };
  }
  
  /**
   * Obtiene todos los datos del estado almacenado en el store.
   * @returns Observable con todos los datos del estado.
   */
  getAllState(): Observable<Solicitud150103State> {
    return this.solicitud150103Query.seleccionarSolicitud$;
  }
}