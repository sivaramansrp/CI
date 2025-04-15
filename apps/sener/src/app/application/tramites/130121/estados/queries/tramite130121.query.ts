/**
 * @file Tramite130121Query file.
 * @description This file contains the Tramite130121Query class which extends Akita's Query to retrieve and expose
 * various slices of the Tramite130121 state as observables.
 * @module Tramite130121Query
 */

import { Tramite130121State, Tramite130121Store } from '../tramites/tramites130121.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

/**
 * Service that queries the Tramite130121 state.
 *
 * This service provides getters and observable properties to retrieve data from the Tramite130121 state.
 * It extends the Akita Query class and is decorated with @Injectable to be provided in the root.
 *
 * @export
 * @class Tramite130121Query
 * @extends {Query<Tramite130121State>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite130121Query extends Query<Tramite130121State> {
  /**
   * Observable for the entire Tramite130121 state.
   *
   * @readonly
   * @type {Observable<Tramite130121State>}
   * @memberof Tramite130121Query
   */
  get selectSolicitud$(): Observable<Tramite130121State> {
    return this.select((state) => state);
  }

  /**
   * Observable for the "mostrarTabla" flag in the state.
   *
   * @readonly
   * @type {Observable<boolean>}
   * @memberof Tramite130121Query
   */
  get mostrarTabla$(): Observable<boolean> {
    return this.select((state) => state.mostrarTabla);
  }

  /**
   * Observable for the "solicitud" property in the state.
   *
   * @readonly
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  get solicitud$(): Observable<string> {
    return this.select((state) => state.solicitud);
  }

  /**
   * Observable for the "fraccion" property in the state.
   *
   * @readonly
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  get fraccion$(): Observable<string> {
    return this.select((state) => state.fraccion);
  }

  /**
   * Observable for the "umt" property in the state.
   *
   * @readonly
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  get umt$(): Observable<string> {
    return this.select((state) => state.umt);
  }

  /**
   * Observable for the "nico" property in the state.
   *
   * @readonly
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  get nico$(): Observable<string> {
    return this.select((state) => state.nico);
  }

  /**
   * Observable for the "plazo" property in the state.
   *
   * @readonly
   * @type {Observable<unknown>}
   * @memberof Tramite130121Query
   */
  get plazo$(): Observable<unknown> {
    return this.select((state) => state.plazo);
  }

  /**
   * Observable for the "descripcionPartidasDeLaMercancia" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  descripcionPartidasDeLaMercancia$: Observable<string> = this.select(
    (state) => state.descripcionPartidasDeLaMercancia
  );

  /**
   * Observable for the "cantidadPartidasDeLaMercancia" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  cantidadPartidasDeLaMercancia$: Observable<string> = this.select(
    (state) => state.cantidadPartidasDeLaMercancia
  );

  /**
   * Observable for the "valorPartidaUSDPartidasDeLaMercancia" property in the state.
   *
   * @type {Observable<number>}
   * @memberof Tramite130121Query
   */
  valorPartidaUSDPartidasDeLaMercancia$: Observable<number> = this.select(
    (state) => state.valorPartidaUSDPartidasDeLaMercancia
  );

  /**
   * Observable for the "unidadMedida" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  unidadMedida$: Observable<string> = this.select((state) => state.unidadMedida);

  /**
   * Observable for the "defaultSelect" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  defaultSelect$: Observable<string> = this.select((state) => state.defaultSelect);

  /**
   * Observable for the "defaultPlazo" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  defaultPlazo$: Observable<string> = this.select((state) => state.defaultPlazo);

  /**
   * Observable for the "clasificacion" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  clasificacion$: Observable<string> = this.select((state) => state.clasificacion);

  /**
   * Observable for the "regimen" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  regimen$: Observable<string> = this.select((state) => state.regimen);

  /**
   * Observable for the "bloque" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  bloque$: Observable<string> = this.select((state) => state.bloque);

  /**
   * Observable for the "usoEspecifico" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  usoEspecifico$: Observable<string> = this.select((state) => state.usoEspecifico);

  /**
   * Observable for the "justificacionImportacionExportacion" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  justificacionImportacionExportacion$: Observable<string> = this.select(
    (state) => state.justificacionImportacionExportacion
  );

  /**
   * Observable for the "observaciones" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  observaciones$: Observable<string> = this.select((state) => state.observaciones);

  /**
   * Observable for the "entidad" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  entidad$: Observable<string> = this.select((state) => state.entidad);

  /**
   * Observable for the "representacion" property in the state.
   *
   * @type {Observable<string>}
   * @memberof Tramite130121Query
   */
  representacion$: Observable<string> = this.select((state) => state.representacion);

  /**
   * Observable combining several properties from the state related to "mercancia".
   *
   * The returned object includes:
   * - plazo: unknown
   * - descripcion: string
   * - fraccion: string
   * - umt: string
   * - nico: string
   * - cantidad: number (converted from state.cantidad)
   * - valorPartidaUSD: number
   * - unidadMedida: string
   * - defaultPlazo: string
   *
   * @type {{
   *   plazo: unknown;
   *   descripcion: string;
   *   fraccion: string;
   *   umt: string;
   *   nico: string;
   *   cantidad: number;
   *   valorPartidaUSD: number;
   *   unidadMedida: string;
   *   defaultPlazo: string;
   * }}
   * @memberof Tramite130121Query
   */
  mercanciaState$: Observable<{
    plazo: unknown;
    descripcion: string;
    fraccion: string;
    umt: string;
    nico: string;
    cantidad: number;
    valorPartidaUSD: number;
    unidadMedida: string;
    defaultPlazo: string;
  }> = this.select((state) => ({
    plazo: state.plazo,
    descripcion: state.descripcion,
    fraccion: state.fraccion,
    umt: state.umt,
    nico: state.nico,
    cantidad: Number(state.cantidad),
    valorPartidaUSD: state.valorPartidaUSD,
    unidadMedida: state.unidadMedida,
    defaultPlazo: state.defaultPlazo,
  }));

  /**
   * Creates an instance of Tramite130121Query.
   *
   * @param {Tramite130121Store} store The store managing the Tramite130121 state.
   * @memberof Tramite130121Query
   */
  constructor(protected override store: Tramite130121Store) {
    super(store);
  }
}
