import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite110217State } from '../tramites/tramite110217.store';
import { Tramite110217Store } from '../tramites/tramite110217.store';

/**
 * Servicio de consulta para el estado del trámite 110217.
 * 
 * Este servicio permite realizar consultas al estado del trámite 110217 utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110217Query extends Query<Tramite110217State> {

  /**
   * Observable que selecciona el estado completo del trámite.
   * 
   * Este observable emite el estado actual del trámite 110217.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

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
   * Constructor de la clase Tramite110217Query.
   * 
   * @param {Tramite110217Store} store - El store que contiene el estado del trámite 110217.
   */
  constructor(
    protected override store: Tramite110217Store) {
    super(store);
  }
}