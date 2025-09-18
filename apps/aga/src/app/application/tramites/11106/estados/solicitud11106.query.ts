import { Solicitud11106State, Solicitud11106Store } from './solicitud11106.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio `Solicitud11106Query` que extiende de `Query` para exponer el estado reactivo de `Solicitud11106Store`.
 * Se utiliza para consultar (leer) el estado de la solicitud 11106 (Cancelación de Donaciones).
 * Maneja únicamente el campo checkbox "laAutorizacionEsNula".
 */
@Injectable({ providedIn: 'root' })
export class Solicitud11106Query extends Query<Solicitud11106State> {

  /**
   * @description Observable que expone el estado completo de la solicitud.
   * Puede ser utilizado para reaccionar ante cualquier cambio en el estado.
   */
  seleccionarSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * @description Observable que expone específicamente el valor del checkbox "laAutorizacionEsNula".
   * Útil para reactividad específica a este campo crítico del formulario.
   */
  seleccionarAutorizacionEsNula$ = this.select((state) => state.laAutorizacionEsNula);

  /**
   * @description Constructor que inyecta el store asociado a la solicitud 11106.
   * Se pasa al constructor de la clase padre `Query`.
   * @param store Instancia del store `Solicitud11106Store` que contiene el estado de la solicitud.
   */
  constructor(
    protected override store: Solicitud11106Store
  ) {
    super(store);
  }

  /**
   * @description Método para obtener el estado actual de manera síncrona.
   * @returns {Solicitud11106State} El estado actual de la solicitud.
   */
  public obtenerEstadoActual(): Solicitud11106State {
    return this.getValue();
  }

  /**
   * @description Método para obtener solo el valor actual del checkbox "laAutorizacionEsNula".
   * @returns {boolean} El valor actual del checkbox.
   */
  public obtenerAutorizacionEsNula(): boolean {
    return this.getValue().laAutorizacionEsNula;
  }
}