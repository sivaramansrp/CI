import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite110216State } from '../tramites/tramite110216.store';
import { Tramite110216Store } from '../tramites/tramite110216.store';

/**
 * Servicio de consulta para el estado del trámite 110216.
 * 
 * Este servicio permite realizar consultas al estado del trámite 110216 utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110216Query extends Query<Tramite110216State> {

  /**
   * Observable selector for retrieving the entire state.
   */
  allStoreData$ = this.select((state) => state);

  /**
   * @descripcion
   *  Observable que selecciona los datos del formulario de certificado.
   */ 
    datosProductorFormulario$ = this.select((state) => {
      return state.datosProductorFormulario;
    });

  /**
   * @descripcion
   * Observable que selecciona los datos del formulario de certificado.
   */
    formulario$ = this.select((state) => {
      return state.formulario;
    });

  /**
   * Observable que selecciona el estado completo del trámite.
   * 
   * Este observable emite el estado actual del trámite 110216.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite110216Query.
   * 
   * @param {Tramite110216Store} store - El store que contiene el estado del trámite 110216.
   */
  constructor(
    protected override store: Tramite110216Store) {
    super(store);
  }
}