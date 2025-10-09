import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite110214State } from '../tramites/tramite110214.store';
import { Tramite110214Store } from '../tramites/tramite110214.store';


/**
 * Servicio de consulta para el estado del trámite 110214.
 * 
 * Este servicio permite realizar consultas al estado del trámite 110214 utilizando Akita.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110214Query extends Query<Tramite110214State> {
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
   * Observable selector for retrieving the entire state.
   */
  allStoreData$ = this.select((state) => state);


  /**
   * Observable que selecciona el estado completo del trámite.
   * 
   * Este observable emite el estado actual del trámite 110214.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  selectAgregarProductoresExportador$ = this.select((state) => {
    return state.agregarProductoresExportador;
  });

  selectMercanciaProductores$ = this.select((state) => {
    return state.mercanciaProductores;
  });

  /**
   * Constructor de la clase Tramite110214Query.
   * 
   * @param {Tramite110214Store} store - El store que contiene el estado del trámite 110214.
   */
  constructor(
    protected override store: Tramite110214Store) {
    super(store);
  }
}