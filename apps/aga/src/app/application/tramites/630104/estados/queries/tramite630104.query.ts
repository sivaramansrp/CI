import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite630104State } from '../tramites/tramite630104.store';
import { Tramite630104Store } from '../tramites/tramite630104.store';

/**
 * Servicio de consulta (Query) para acceder al estado del trámite 630104.
 * Proporciona selectores para obtener datos específicos del estado.
 */
@Injectable({ providedIn: 'root' })
export class Tramite630104Query extends Query<Tramite630104State> {
  /**
   * Selector para obtener el valor de `esConsultaRep` del estado.
   * @type {Observable<string>}
   */
  esConsultaRep$ = this.select((state) => state.esConsultaRep);

  /**
   * Selector para obtener el valor de `esExtranjero` del estado.
   * @type {Observable<string>}
   */
  esExtranjero$ = this.select((state) => state.esExtranjero);

  razonSocial = this.select((state) => state.razonSocial);

  /**
   * Selector para obtener el valor de `nombre` del estado.
   * @type {Observable<string>}
   */
  nombre$ = this.select((state) => state.nombre);

  /**
   * Selector para obtener el valor de `apellidoPaterno` del estado.
   * @type {Observable<string>}
   */
  apellidoPaterno$ = this.select((state) => state.apellidoPaterno);

  /**
   * Selector para obtener el valor de `apellidoMaterno` del estado.
   * @type {Observable<string>}
   */
  apellidoMaterno$ = this.select((state) => state.apellidoMaterno);

  /**
   * Selector para obtener el valor de `calle` del estado.
   * @type {Observable<string>}
   */
  calle$ = this.select((state) => state.calle);

  /**
   * Selector para obtener el valor de `numeroExterior` del estado.
   * @type {Observable<string>}
   */
  numeroExterior$ = this.select((state) => state.numeroExterior);

  /**
   * Selector para obtener el valor de `numeroInterior` del estado.
   * @type {Observable<string>}
   */
  numeroInterior$ = this.select((state) => state.numeroInterior);

  /**
   * Selector para obtener el valor de `pais` del estado.
   * @type {Observable<string>}
   */
  pais$ = this.select((state) => state.pais);

  /**
   * Selector para obtener el valor de `estadoLocalidad` del estado.
   * @type {Observable<string>}
   */
  estadoLocalidad$ = this.select((state) => state.estadoLocalidad);

  /**
   * Selector para obtener el valor de `correoElectronico` del estado.
   * @type {Observable<string>}
   */
  correoElectronico$ = this.select((state) => state.correoElectronico);

  /**
   * Selector para obtener el valor de `telefono` del estado.
   * @type {Observable<string>}
   */
  telefono$ = this.select((state) => state.telefono);

  /**
   * Selector para obtener el valor de `codigoPostal` del estado.
   * @type {Observable<string>}
   */
  codigoPostal$ = this.select((state) => state.codigoPostal);

  /**
   * Selector para obtener el estado completo del trámite 630104.
   * @type {Observable<Tramite630104State>}
   */
  selectTramite630104$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor del servicio de consulta.
   * @param tramiteStore Almacén del estado del trámite 630104.
   */
  constructor(private tramiteStore: Tramite630104Store) {
    super(tramiteStore);
  }
}