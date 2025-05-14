import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud150103State } from './solicitud150103.store';
import { Solicitud150103Store } from './solicitud150103.store';

/**
 * @description Servicio que implementa una consulta (`Query`) para acceder al estado de la solicitud.
 * Utiliza la librería Akita para gestionar el estado de la aplicación.
 */
@Injectable({ providedIn: 'root' })
/**
 * @description Servicio que implementa una consulta (`Query`) para acceder al estado de la solicitud.
 * Utiliza la librería Akita para gestionar el estado de la aplicación.
 */
export class Solicitud150103Query extends Query<Solicitud150103State> {
  /**
   * @description Observable que permite seleccionar el estado completo de la solicitud.
   * @returns El estado actual de la solicitud (`Solicitud150103State`).
   */
  seleccionarSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * @description Constructor que inicializa la consulta (`Query`) con el store de la solicitud.
   * @param solicitud150103Store Instancia del store que contiene el estado de la solicitud.
   */
  constructor(protected solicitud150103Store: Solicitud150103Store) {
    super(solicitud150103Store); // Inicializa el Query con el store proporcionado
  }
}
