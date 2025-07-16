
import { Catalogo } from '@libs/shared/data-access-user/src';
import { EnlaceOperativo } from '../models/solicitud.model';
import { GuardarDatosFormulario } from '../models/solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventarios } from '../models/solicitud.model';
import { Observable } from 'rxjs';
import { PersonaRespuestaTabla } from '../models/personas-notificaciones-tabla.model';
import { RecibirNotificaciones } from '../models/solicitud.model';
import { RepresentanteLegal } from '../models/solicitud.model';
import { SeccionSubcontratados } from '../models/solicitud.model';
import { Solicitud32611Store } from '../estados/solicitud32611.store';
import { SolicitudCatologoSelectLista } from '../models/solicitud.model';
import { SolicitudRadioLista } from '../models/solicitud.model';
import { TransportistasTable } from '../models/solicitud.model';

/**
 * Servicio encargado de obtener los datos necesarios para el llenado del formulario
 * de la solicitud 32611 a partir de archivos JSON locales.
 */
@Injectable({
  providedIn: 'root',
})
/**
 * Servicio encargado de obtener los datos necesarios para el llenado del formulario
 * de la solicitud 32611 a partir de archivos JSON locales.
 */
export class SolicitudService {
  /**
   * Constructor que inyecta el cliente HTTP.
   * @param http - Cliente HTTP para realizar peticiones.
   */
  constructor(
    private http: HttpClient,
    public solicitud32611Store: Solicitud32611Store
  ) {
    // Lógica del constructor aquí
  }

  /**
   * Obtiene la lista de opciones para recibir notificaciones.
   */
  conseguirRecibirNotificaciones(): Observable<RecibirNotificaciones[]> {
    return this.http.get<RecibirNotificaciones[]>(
      'assets/json/32611/recibir-notificaciones.json'
    );
  }

  /**
   * Obtiene los datos del representante legal desde un archivo JSON local.
   * @returns Observable con un objeto de tipo RepresentanteLegal.
   */
  conseguirRepresentanteLegalDatos(): Observable<RepresentanteLegal> {
    return this.http.get<RepresentanteLegal>(
      'assets/json/32611/representante-legal-datos.json'
    );
  }

  /**
   * Obtiene las opciones de radio de la solicitud desde un archivo JSON local.
   * @returns Observable con un objeto de tipo SolicitudRadioLista.
   */
  conseguirOpcionDeRadio(): Observable<SolicitudRadioLista> {
    return this.http.get<SolicitudRadioLista>(
      'assets/json/32611/solicitud-radio-lista.json'
    );
  }

  /**
   * Obtiene la lista de transportistas desde un archivo JSON local.
   * @returns Observable con un arreglo de TransportistasTable.
   */
  conseguirTransportistasLista(): Observable<TransportistasTable[]> {
    return this.http.get<TransportistasTable[]>(
      'assets/json/32611/transportistas-lista.json'
    );
  }

  /**
   * Obtiene los catálogos selectivos de la solicitud desde un archivo JSON local.
   * @returns Observable con un objeto de tipo SolicitudCatologoSelectLista.
   */
  conseguirSolicitudCatologoSelectLista(): Observable<SolicitudCatologoSelectLista> {
    return this.http.get<SolicitudCatologoSelectLista>(
      'assets/json/32611/solicitud-catologo-select-lista.json'
    );
  }

  /**
   * Obtiene los datos de la sección de subcontratados desde un archivo JSON local.
   * @returns Observable con un objeto de tipo SeccionSubcontratados.
   */
  conseguirSeccionSubcontratados(): Observable<SeccionSubcontratados> {
    return this.http.get<SeccionSubcontratados>(
      'assets/json/32611/seccion-subcontratados.json'
    );
  }

  /**
   * Obtiene los inventarios registrados desde un archivo JSON local.
   * @returns Observable con un arreglo de Inventarios.
   */
  conseguirInventarios(): Observable<Inventarios[]> {
    return this.http.get<Inventarios[]>(
      'assets/json/32611/inventarios-datos.json'
    );
  }

   /**
     * Obtiene los datos del catálogo de bancos.
     * Realiza una solicitud HTTP para obtener la lista de bancos desde un archivo JSON.
     *
     * @returns Un observable que emite una lista de objetos de tipo `Catalogo`.
     */
    obtenerDatosBanco(): Observable<Catalogo[]> {
      return this.http.get<Catalogo[]>('assets/json/32611/banco.json');
    }

     /**
   * Obtiene los datos de la tabla de personas.
   * Realiza una petición a un recurso local en formato JSON que contiene datos relacionados con personas.
   *
   * @returns {Observable<PersonaRespuestaTabla>} Un observable con los datos de la tabla de personas.
   * @memberof SolicitudDeRegistroInvocarService
   */
  obtenerPersonaTablaDatos(): Observable<PersonaRespuestaTabla> {
    return this.http.get<PersonaRespuestaTabla>('assets/json/32611/personas-notificacione.json');
  }

  /**
   * Realiza una solicitud HTTP GET para obtener los datos guardados del formulario
   * desde un archivo JSON local.
   *
   * @returns {Observable<GuardarDatosFormulario>} Un observable que emite los datos del formulario.
   */
  guardarDatosFormulario(): Observable<GuardarDatosFormulario> {
    return this.http.get<GuardarDatosFormulario>(
      'assets/json/32611/guardar-datos-formulario.json'
    );
  }

  /**
   * Actualiza el estado del formulario en el store `solicitud32611Store`
   * con los datos proporcionados en la respuesta.
   *
   * @param {GuardarDatosFormulario} resp - Objeto con la información del formulario a actualizar.
   */
  actualizarEstadoFormulario(resp: GuardarDatosFormulario): void {
    // this.solicitud32611Store.actualizar190(resp[190]);
    // this.solicitud32611Store.actualizar191(resp[191]);
    // this.solicitud32611Store.actualizar199(resp[199]);
    // this.solicitud32611Store.actualizar2034(resp[2034]);
    // this.solicitud32611Store.actualizar236(resp[236]);
    // this.solicitud32611Store.actualizar237(resp[237]);
    // this.solicitud32611Store.actualizar238(resp[238]);
    this.solicitud32611Store.establecerDatos(resp);
    // this.solicitud32611Store.actualizar240(resp[240]);
    // this.solicitud32611Store.actualizar243(resp[243]);
    // this.solicitud32611Store.actualizar244(resp[244]);
    // this.solicitud32611Store.actualizar245(resp[245]);
    // this.solicitud32611Store.actualizar246(resp[246]);
    // this.solicitud32611Store.actualizar247(resp[247]);
    // this.solicitud32611Store.actualizar248(resp[248]);
    // this.solicitud32611Store.actualizar249(resp[249]);
    // this.solicitud32611Store.actualizar250(resp[250]);
    // this.solicitud32611Store.actualizar251(resp[251]);
   
  }
}
