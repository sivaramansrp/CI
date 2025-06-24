import { Solicitud31910State, Tramite31910Store } from '../../../estados/tramites/tramite31910.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de gestionar la lógica relacionada con la acción de
 * desistir una solicitud de información histórica dentro del trámite 31910.
 * Este servicio se proporciona a nivel raíz (`providedIn: 'root'`), por lo que
 */

@Injectable({
  providedIn: 'root'
})
export class DesistirSolicitudInformacionHistoricaService {

/**
* @param http Servicio HttpClient utilizado para realizar peticiones HTTP.
* @param tramite31910Store Store que gestiona el estado del trámite 31910.
*/

constructor(private http: HttpClient, private tramite31910Store:Tramite31910Store) {
    // Constructor vacío: La inicialización se realizará en métodos específicos según sea necesario.
}

/**
* Actualiza el estado del formulario en el store.
* @param DATOS Estado actualizado del trámite.
*/
actualizarEstadoFormulario(DATOS: Solicitud31910State): void {
  this.tramite31910Store.actualizarEstado(DATOS);
}

/**
* Obtiene los datos de la solicitud.
* @returns Observable con los datos de la solicitud.
*/
getDatosDeLaSolicitud(): Observable<Solicitud31910State> {
  return this.http.get<Solicitud31910State>('assets/json/31910/datos-de-la-solicitud.json');
}
}
