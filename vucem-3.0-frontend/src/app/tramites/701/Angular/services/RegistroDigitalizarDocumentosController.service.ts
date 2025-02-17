// registro-digitalizar-documentos.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitudDigitalizarDocumento } from '../models/solicitud-digitalizar-documento.model';
import { TipoDocumento } from '../models/tipo-documento.model';
import { Persona } from '../models/persona.model';
import { Firma } from '../models/firma.model';
import { DocumentoOficialDigi } from '../models/documento-oficial-digi.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroDigitalizarDocumentosService {

  private baseUrl = `${environment.apiBaseUrl}/digitalizar-documentos`;

  constructor(private http: HttpClient) {}

  /**
   * Guarda la solicitud de digitalización de documentos.
   * @param solicitud La solicitud a guardar.
   * @returns Observable con la respuesta del servidor.
   */
  guardarSolicitud(solicitud: SolicitudDigitalizarDocumento): Observable<any> {
    return this.http.post(`${this.baseUrl}/guardar`, solicitud, { withCredentials: true });
  }

  /**
   * Muestra una solicitud específica.
   * @param idSolicitud ID de la solicitud a mostrar.
   * @returns Observable con la solicitud.
   */
  mostrarSolicitud(idSolicitud: number): Observable<SolicitudDigitalizarDocumento> {
    return this.http.get<SolicitudDigitalizarDocumento>(`${this.baseUrl}/mostrar/${idSolicitud}`, { withCredentials: true });
  }

  /**
   * Carga los tipos de documentos disponibles.
   * @returns Observable con la lista de tipos de documentos.
   */
  cargarTiposDocumentos(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.baseUrl}/tipos-documentos`, { withCredentials: true });
  }

  /**
   * Filtra los archivos específicos basados en el tipo de trámite y solicitud.
   * @param idSolicitud ID de la solicitud.
   * @param tipoTramite ID del tipo de trámite.
   * @returns Observable con la lista de documentos específicos.
   */
  filtrarArchivosEspecificos(idSolicitud: number, tipoTramite: number): Observable<TipoDocumento[]> {
    const params = new HttpParams()
      .set('idSolicitud', idSolicitud.toString())
      .set('tipoTramite', tipoTramite.toString());

    return this.http.get<TipoDocumento[]>(`${this.baseUrl}/filtrar-archivos-especificos`, { params, withCredentials: true });
  }

  /**
   * Carga la lista de documentos específicos seleccionados.
   * @param documentos Lista de tipos de documentos específicos.
   * @returns Observable con la respuesta del servidor.
   */
  cargarListDoctosEspecificos(documentos: TipoDocumento[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/cargar-lista-doctos-especificos`, documentos, { withCredentials: true });
  }

  /**
   * Filtra los archivos generales (actualmente retorna una lista vacía).
   * @returns Observable con una lista vacía de documentos generales.
   */
  filtrarArchivosGenerales(): Observable<TipoDocumento[]> {
    return this.http.get<TipoDocumento[]>(`${this.baseUrl}/filtrar-archivos-generales`, { withCredentials: true });
  }

  /**
   * Guarda los tipos de documentos por trámite.
   * @param solicitudId ID de la solicitud.
   * @param tiposDocumentos Lista de tipos de documentos seleccionados.
   * @returns Observable con la respuesta del servidor.
   */
  guardarTipoDoctosPorTramite(solicitudId: number, tiposDocumentos: TipoDocumento[]): Observable<any> {
    const payload = {
      solicitudId,
      tiposDocumentos
    };
    return this.http.post(`${this.baseUrl}/guardar-tipo-doctos-por-tramite`, payload, { withCredentials: true });
  }

  /**
   * Busca un usuario en CVU por RFC.
   * @param rfc RFC del usuario a buscar.
   * @returns Observable con la información del usuario.
   */
  buscarUsuarioIDCVU(rfc: string): Observable<Persona | string> {
    const params = new HttpParams().set('rfc', rfc);
    return this.http.get<Persona | string>(`${this.baseUrl}/buscar-usuario-idcvu`, { params, responseType: 'json', withCredentials: true });
  }

  /**
   * Muestra la firma para una solicitud específica.
   * @param idSolicitud ID de la solicitud.
   * @returns Observable con los datos de la firma.
   */
  mostrarFirma(idSolicitud: number): Observable<Firma> {
    return this.http.get<Firma>(`${this.baseUrl}/mostrar-firma/${idSolicitud}`, { withCredentials: true });
  }

  /**
   * Envía la firma para una solicitud específica.
   * @param firma Objeto de firma.
   * @returns Observable con la respuesta del servidor.
   */
  firmar(firma: Firma): Observable<any> {
    return this.http.post(`${this.baseUrl}/firmar`, firma, { withCredentials: true });
  }

  /**
   * Genera el acuse de recibo para un folio de trámite.
   * @param folioTramite Folio del trámite.
   * @returns Observable con el documento del acuse.
   */
  generaAcuseRecibo(folioTramite: string): Observable<DocumentoOficialDigi> {
    return this.http.get<DocumentoOficialDigi>(`${this.baseUrl}/generar-acuse-recibo/${folioTramite}`, { withCredentials: true });
  }

  /**
   * Descarga el acuse de recibo en formato PDF.
   * @param idDocumento ID del documento oficial.
   * @returns Observable con el blob del PDF.
   */
  descargarAcuseRecibo(idDocumento: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/descargar-acuse-recibo/${idDocumento}`, {
      responseType: 'blob',
      withCredentials: true
    });
  }

  /**
   * Recupera los detalles de una solicitud específica.
   * @param idSolicitud ID de la solicitud.
   * @returns Observable con los detalles de la solicitud.
   */
  getDetallesSolicitud(idSolicitud: number): Observable<SolicitudDigitalizarDocumento> {
    return this.http.get<SolicitudDigitalizarDocumento>(`${this.baseUrl}/detalles/${idSolicitud}`, { withCredentials: true });
  }

  /**
   * Actualiza una solicitud existente.
   * @param idSolicitud ID de la solicitud a actualizar.
   * @param solicitud Datos actualizados de la solicitud.
   * @returns Observable con la respuesta del servidor.
   */
  actualizarSolicitud(idSolicitud: number, solicitud: SolicitudDigitalizarDocumento): Observable<any> {
    return this.http.put(`${this.baseUrl}/actualizar/${idSolicitud}`, solicitud, { withCredentials: true });
  }

  /**
   * Elimina una solicitud específica.
   * @param idSolicitud ID de la solicitud a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  eliminarSolicitud(idSolicitud: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${idSolicitud}`, { withCredentials: true });
  }

  /**
   * Obtiene los documentos requeridos para una solicitud.
   * @param idSolicitud ID de la solicitud.
   * @returns Observable con la lista de documentos requeridos.
   */
  obtenerDocumentosRequeridos(idSolicitud: number): Observable<DocumentosRequeridos[]> {
    return this.http.get<DocumentosRequeridos[]>(`${this.baseUrl}/documentos-requeridos/${idSolicitud}`, { withCredentials: true });
  }

  /**
   * Guarda la persona asociada a un documento específico.
   * @param idDocumento ID del documento.
   * @param cvePersona Clave de la persona.
   * @returns Observable con la respuesta del servidor.
   */
  guardaPersonaDocumento(idDocumento: number, cvePersona: number): Observable<any> {
    const payload = { idDocumento, cvePersona };
    return this.http.post(`${this.baseUrl}/guarda-persona-documento`, payload, { withCredentials: true });
  }

  /**
   * Replica el documento digitalizado para un folio de trámite.
   * @param folioTramite Folio del trámite.
   * @returns Observable con la respuesta del servidor.
   */
  replicaDocumentoDigitalizado(folioTramite: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/replica-dd`, { folioTramite }, { withCredentials: true });
  }

  /**
   * Genera la cadena original para la firma.
   * @param solicitud Datos de la solicitud.
   * @param fechaFirma Fecha de la firma.
   * @returns Observable con la cadena original generada.
   */
  generarCadenaOriginal(solicitud: SolicitudDigitalizarDocumento, fechaFirma: Date): Observable<string> {
    const payload = { solicitud, fechaFirma };
    return this.http.post(`${this.baseUrl}/generar-cadena-original`, payload, { responseType: 'text', withCredentials: true });
  }
}