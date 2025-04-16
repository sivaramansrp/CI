import { Tramite130108State, Tramite130108Store } from '../tramites/tramites130108.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

/**
 * Clase encargada de realizar consultas al estado del tramite 130108.
 * Utiliza el patrón Query de Akita para obtener los datos desde el store.
 */
@Injectable({ providedIn: 'root' })
export class Tramite130108Query extends Query<Tramite130108State> {

  /**
   * Selecciona todo el estado del tramite.
   * @returns Observable con el estado completo del tramite 130108.
   */
  get selectSolicitud$(): Observable<Tramite130108State> {
    return this.select((state) => state);
  }

  /**
   * Selecciona si se debe mostrar la tabla en la interfaz.
   * @returns Observable de tipo booleano, que indica si la tabla debe ser visible.
   */
  get mostrarTabla$(): Observable<boolean> {
    return this.select((state) => state.mostrarTabla);
  }

  // /**
  //  * Selecciona el valor de la solicitud.
  //  * @returns Observable con el valor de la solicitud como string.
  //  */
  // get solicitud$(): Observable<string> {
  //   return this.select((state) => state.solicitud);
  // }

  /**
   * Selecciona el valor de la fracción asociada al tramite.
   * @returns Observable con el valor de la fracción como string.
   */
  // get fraccion$(): Observable<string> {
  //   return this.select((state) => state.fraccion);
  // }

  /**
   * Selecciona el valor de la unidad medida de tiempo (UMT).
   * @returns Observable con el valor de la UMT como string.
   */
  // get umt$(): Observable<string> {
  //   return this.select((state) => state.umt);
  // }

  /**
   * Selecciona el valor de NICO (número de identificación de la mercancía).
   * @returns Observable con el valor de NICO como string.
   */
  // get nico$(): Observable<string> {
  //   return this.select((state) => state.nico);
  // }

  /**
   * Selecciona el plazo asociado al tramite.
   * @returns Observable con el plazo asociado al tramite.
   */
  // get plazo$(): Observable<unknown> {
  //   return this.select((state) => state.plazo);
  // }

  /**
   * Selecciona la descripción de las partidas de la mercancía.
   * @returns Observable con la descripción de las partidas de la mercancía.
   */
  // descripcionModificar$: Observable<string> = this.select(
  //   (state) => state.descripcionModificar
  // );

  /**
   * Selecciona la cantidad de partidas de la mercancía.
   * @returns Observable con la cantidad de partidas de la mercancía.
   */
  // cantidadModificar$: Observable<string> = this.select(
  //   (state) => state.cantidadModificar
  // );

  /**
   * Selecciona el valor por partida en USD de la mercancía.
   * @returns Observable con el valor por partida en USD.
   */
  // valorPartidaUSDPartidasDeLaMercancia$: Observable<number> = this.select(
  //   (state) => state.valorPartidaUSDPartidasDeLaMercancia
  // );

  /**
   * Selecciona la clasificación asociada al tramite.
   * @returns Observable con la clasificación asociada al tramite.
   */
  // clasificacion$: Observable<string> = this.select((state) => state.clasificacion);

  /**
   * Selecciona el régimen del tramite.
   * @returns Observable con el régimen asociado al tramite.
   */
  // regimen$: Observable<string> = this.select((state) => state.regimen);

  /**
   * Selecciona el bloque asociado al tramite.
   * @returns Observable con el bloque asociado al tramite.
   */
  // bloque$: Observable<string> = this.select((state) => state.bloque);

  /**
   * Selecciona el uso específico asociado al tramite.
   * @returns Observable con el uso específico del tramite.
   */
  // usoEspecifico$: Observable<string> = this.select((state) => state.usoEspecifico);

  /**
   * Selecciona la justificación de importación o exportación de la mercancía.
   * @returns Observable con la justificación de importación o exportación.
   */
  // justificacionImportacionExportacion$: Observable<string> = this.select(
  //   (state) => state.justificacionImportacionExportacion
  // );

  /**
   * Selecciona las observaciones relacionadas con el tramite.
   * @returns Observable con las observaciones.
   */
  // observaciones$: Observable<string> = this.select((state) => state.observaciones);

  /**
   * Selecciona la entidad asociada al tramite.
   * @returns Observable con la entidad asociada.
   */
  entidad$: Observable<string> = this.select((state) => state.entidad);

  /**
   * Selecciona la representación del tramite.
   * @returns Observable con la representación.
   */
  representacion$: Observable<string> = this.select((state) => state.representacion);

  /**
   * Selecciona el estado de la mercancía, incluyendo datos como plazo, descripción, fracción, UMT, NICO, cantidad, valor y unidad de medida.
   * @returns Observable con el estado de la mercancía.
   */
  mercanciaState$: Observable<{
    plazo: unknown;
    descripcion: string;
    fraccion: string;
    umt: string;
    nico: string;
    cantidad: number;
    valorPartidaUSD: number;
  }> = this.select((state) => ({
    plazo: state.plazo,
    descripcion: state.descripcion,
    fraccion: state.fraccion,
    umt: state.umt,
    nico: state.nico,
    cantidad: Number(state.cantidad),
    valorPartidaUSD: state.valorPartidaUSD,
  }));

  /**
   * Constructor de la clase Tramite130108Query.
   * @param store - El store asociado al tramite 130108.
   */
  constructor(protected override store: Tramite130108Store) {
    super(store);
  }
}
