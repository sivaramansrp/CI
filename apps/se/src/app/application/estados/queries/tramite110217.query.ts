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
   * Selecciona las fechas del certificado.
   * @returns {Observable<any>} - Observable con las fechas del certificado.
   */
  formDatosCertificado$ = this.select((state) => {
    return state.formDatosCertificado;
  });

  /**
   * Selecciona el catálogo de idiomas.s
   */
  selectIdioma$ = this.select((state) => state.idiomaDatos);

  /**
   * Selecciona los datos de la entidad federativa.
   * @returns {Observable<any>} - Observable con los datos de la entidad federativa.
   */
  selectEntidadFederativa$ = this.select((state) => {
    return state.entidadFederativaDatos;
  });

  /**
   * Selecciona los datos de la representación federal.
   * @returns {Observable<any>} - Observable con los datos de la representación federal.
   */
  selectrepresentacionFederal$ = this.select((state) => {
    return state.representacionFederalDatos;
  });

  /**
   * Constructor de la clase Tramite110217Query.
   *
   * @param {Tramite110217Store} store - El store que contiene el estado del trámite 110217.
   */
  constructor(protected override store: Tramite110217Store) {
    super(store);
  }
}