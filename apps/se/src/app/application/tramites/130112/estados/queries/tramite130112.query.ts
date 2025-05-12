import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Tramite130112State, Tramite130112Store } from '../tramites/tramites130112.store';

/**
 * @descripcion
 * Clase que implementa las consultas (queries) para el estado del trámite 130112.
 * Proporciona selectores para acceder a diferentes partes del estado almacenado en el store.
 *
 * @decorador @Injectable
 */
@Injectable({ providedIn: 'root' })
export class Tramite130112Query extends Query<Tramite130112State> {
  /**
   * @descripcion
   * Selector que devuelve el estado completo del store.
   */
  selectSolicitud$ = this.select((state) => state);

  /**
   * @descripcion
   * Selector que indica si se debe mostrar la tabla.
   */
  mostrarTabla$ = this.select((state) => state.mostrarTabla);

  /**
   * @descripcion
   * Selector que devuelve la fila seleccionada.
   */
  filaSeleccionada$ = this.select((state) => state.filaSeleccionada);

  /**
   * @descripcion
   * Selector que devuelve la solicitud actual.
   */
  solicitud$ = this.select((state) => state.solicitud);

  /**
   * @descripcion
   * Selector que devuelve la fracción actual.
   */
  fraccion$ = this.select((state) => state.fraccion);

  /**
   * @descripcion
   * Selector que devuelve el producto actual.
   */
  producto$ = this.select((state) => state.producto);

  /**
   * @descripcion
   * Selector que devuelve la descripción de las partidas de la mercancía.
   */
  descripcionPartidasDeLaMercancia$ = this.select(
    (state) => state.descripcionPartidasDeLaMercancia
  );

  /**
   * @descripcion
   * Selector que devuelve la cantidad de las partidas de la mercancía.
   */
  cantidadPartidasDeLaMercancia$ = this.select(
    (state) => state.cantidadPartidasDeLaMercancia
  );

  /**
   * @descripcion
   * Selector que devuelve el valor de la partida en USD de las partidas de la mercancía.
   */
  valorPartidaUSDPartidasDeLaMercancia$ = this.select(
    (state) => state.valorPartidaUSDPartidasDeLaMercancia
  );

  /**
   * @descripcion
   * Selector que devuelve la unidad de medida actual.
   */
  unidadMedida$ = this.select((state) => state.unidadMedida);

  /**
   * @descripcion
   * Selector que devuelve el valor predeterminado del selector.
   */
  defaultSelect$ = this.select((state) => state.defaultSelect);

  /**
   * @descripcion
   * Selector que devuelve el valor predeterminado del producto.
   */
  defaultProducto$ = this.select((state) => state.defaultProducto);

  /**
   * @descripcion
   * Selector que devuelve la clasificación actual.
   */
  clasificacion$ = this.select((state) => state.clasificacion);

  /**
   * @descripcion
   * Selector que devuelve el régimen actual.
   */
  regimen$ = this.select((state) => state.regimen);

  /**
   * @descripcion
   * Selector que devuelve el bloque actual.
   */
  bloque$ = this.select((state) => state.bloque);

  /**
   * @descripcion
   * Selector que devuelve el uso específico actual.
   */
  usoEspecifico$ = this.select((state) => state.usoEspecifico);

  /**
   * @descripcion
   * Selector que devuelve la justificación de importación/exportación.
   */
  justificacionImportacionExportacion$ = this.select(
    (state) => state.justificacionImportacionExportacion
  );

  /**
   * @descripcion
   * Selector que devuelve las observaciones actuales.
   */
  observaciones$ = this.select((state) => state.observaciones);

  /**
   * @descripcion
   * Selector que devuelve la entidad actual.
   */
  entidad$ = this.select((state) => state.entidad);

  /**
   * @descripcion
   * Selector que devuelve la representación actual.
   */
  representacion$ = this.select((state) => state.representacion);

  /**
   * @descripcion
   * Selector que devuelve un objeto con el estado relacionado con la mercancía.
   */
  mercanciaState$ = this.select((state) => ({
    producto: state.producto,
    descripcion: state.descripcion,
    fraccion: state.fraccion,
    cantidad: state.cantidad,
    valorPartidaUSD: state.valorPartidaUSD,
    unidadMedida: state.unidadMedida,
    defaultProducto: state.defaultProducto,
  }));

  /**
   * @descripcion
   * Constructor de la clase `Tramite130112Query`.
   * Inicializa la consulta con el store proporcionado.
   * @param {Tramite130112Store} store - Instancia del store del trámite 130112.
   */
  constructor(protected override store: Tramite130112Store) {
    super(store);
  }
}