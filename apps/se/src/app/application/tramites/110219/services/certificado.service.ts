import { ColumnasTabla, MercanciaCertificado} from '../models/certificado.model';
import { Observable, catchError, throwError } from 'rxjs';
import { Solicitud110219State, Tramite110219Store } from '../estados/Tramite110219.store';
import { Catalogo} from '@libs/shared/data-access-user/src';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/**
 * Servicio para gestionar las operaciones relacionadas con los certificados.
 */
@Injectable({
  providedIn: 'root',
})
export class CertificadoService {
  /**
   * Constructor del servicio.
   * 
   * @param http Cliente HTTP para realizar solicitudes a servicios externos.
   */
  constructor(private http: HttpClient, private tramite110219Store: Tramite110219Store) {}
/**
     * Actualiza el estado global del formulario con los datos proporcionados.
     * @param DATOS Objeto con los datos del formulario de tipo Solicitud110219State.
     */
  actualizarEstadoFormulario(DATOS: Solicitud110219State): void {
    this.tramite110219Store.setNumeroCertificado(DATOS.numeroCertificado);
    this.tramite110219Store.setPais(DATOS.pais);
    this.tramite110219Store.setTratado(DATOS.tratado);
    this.tramite110219Store.setFechaInicial(DATOS.fechaInicial);
    this.tramite110219Store.setFechaFinal(DATOS.fechaFinal);
    this.tramite110219Store.setMotivoCancelacion(DATOS.motivoCancelacion);
    this.tramite110219Store.setCertificadoDeorigen(DATOS.certificadoDeOrigen);
    this.tramite110219Store.setFechaExpedicion(DATOS.fechaExpedicion);
    this.tramite110219Store.setFechaVencimiento(DATOS.fechaVencimiento);
    this.tramite110219Store.setBloque(DATOS.bloque);
    this.tramite110219Store.setAcuerdo(DATOS.acuerdo);
    this.tramite110219Store.setObservaciones(DATOS.observaciones);
    this.tramite110219Store.setNombre(DATOS.nombre);
    this.tramite110219Store.setPrimerApellido(DATOS.primerApellido);
    this.tramite110219Store.setSegundoApellido(DATOS.segundoApellido);
    this.tramite110219Store.setRegistroFiscal(DATOS.registroFiscal);
    this.tramite110219Store.setRazonSocial(DATOS.razonSocial);
    this.tramite110219Store.setCalle(DATOS.calle);
    this.tramite110219Store.setNumeroLetra(DATOS.numeroLetra);
    this.tramite110219Store.setTelefono(DATOS.telefono);
    this.tramite110219Store.setCiudad(DATOS.ciudad);
    this.tramite110219Store.setFax(DATOS.fax);
    this.tramite110219Store.setCorreoElectronico(DATOS.correoElectronico);
  }
  /**
     * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
     * @returns Observable con los datos del formulario.
     */
  getRegistroTomaMuestrasMercanciasData(): Observable<Solicitud110219State> {
    return this.http.get<Solicitud110219State>('assets/json/110219/registro_toma_muestras_mercancias.json');
  }
  /**
   * Obtiene los datos del catálogo de tratados.
   * 
   * @returns Un observable que emite una lista de catálogos de tratados.
   */
  getTratadoData(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>('assets/json/110219/tratado.json');
  }

  /**
   * Obtiene los datos de la tabla de solicitudes.
   * 
   * @returns Un observable que emite una lista de columnas de la tabla de solicitudes.
   */
  public getSolicitudesTabla(): Observable<ColumnasTabla[]> {
    return this.http
      .get<ColumnasTabla[]>('assets/json/110219/mercanciaTable.json')
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los datos de la tabla de mercancías asociadas al certificado.
   * 
   * @returns Un observable que emite una lista de mercancías asociadas al certificado.
   */
  public getMercanciaCertificadoTabla(): Observable<MercanciaCertificado[]> {
    return this.http
      .get<MercanciaCertificado[]>(
        'assets/json/110219/mercanciaCertificado.json'
      )
      .pipe(
        catchError((error) => {
          // Maneja errores en la solicitud HTTP.
          return throwError(() => error);
        })
      );
  }
}