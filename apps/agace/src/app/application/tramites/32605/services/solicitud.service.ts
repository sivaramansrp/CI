import { EnlaceOperativo } from '../models/solicitud.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventarios } from '../models/solicitud.model';
import { Observable } from 'rxjs';
import { RecibirNotificaciones } from '../models/solicitud.model';
import { RepresentanteLegal } from '../models/solicitud.model';
import { SeccionSubcontratados } from '../models/solicitud.model';
import { SolicitudCatologoSelectLista } from '../models/solicitud.model';
import { SolicitudRadioLista } from '../models/solicitud.model';
import { TransportistasTable } from '../models/solicitud.model';

/**
 * Servicio encargado de obtener los datos necesarios para el llenado del formulario
 * de la solicitud 32605 a partir de archivos JSON locales.
 */
@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  /**
   * Constructor que inyecta el cliente HTTP.
   * @param http - Cliente HTTP para realizar peticiones.
   */
  constructor(private http: HttpClient) {
    // Lógica del constructor aquí
  }

  /**
   * Obtiene la lista de opciones para recibir notificaciones.
   */
  conseguirRecibirNotificaciones(): Observable<RecibirNotificaciones[]> {
    return this.http.get<RecibirNotificaciones[]>(
      'assets/json/32605/recibir-notificaciones.json'
    );
  }

  conseguirEnlaceOperativoDatos(): Observable<EnlaceOperativo[]> {
    return this.http.get<EnlaceOperativo[]>(
      'assets/json/32605/enlace-operativo-datos.json'
    );
  }

  conseguirRepresentanteLegalDatos(): Observable<RepresentanteLegal> {
    return this.http.get<RepresentanteLegal>(
      'assets/json/32605/representante-legal-datos.json'
    );
  }

  conseguirOpcionDeRadio(): Observable<SolicitudRadioLista> {
    return this.http.get<SolicitudRadioLista>(
      'assets/json/32605/solicitud-radio-lista.json'
    );
  }

  conseguirTransportistasLista(): Observable<TransportistasTable[]> {
    return this.http.get<TransportistasTable[]>(
      'assets/json/32605/transportistas-lista.json'
    );
  }

  conseguirSolicitudCatologoSelectLista(): Observable<SolicitudCatologoSelectLista> {
    return this.http.get<SolicitudCatologoSelectLista>(
      'assets/json/32605/solicitud-catologo-select-lista.json'
    );
  }

  conseguirSeccionSubcontratados(): Observable<SeccionSubcontratados> {
    return this.http.get<SeccionSubcontratados>(
      'assets/json/32605/seccion-subcontratados.json'
    );
  }

  conseguirInventarios(): Observable<Inventarios[]> {
    return this.http.get<Inventarios[]>(
      'assets/json/32605/inventarios-datos.json'
    );
  }
}
