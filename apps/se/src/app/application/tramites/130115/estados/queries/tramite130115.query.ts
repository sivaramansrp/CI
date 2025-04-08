import { Tramite130115State, Tramite130115Store } from '../tramites/tramite130115.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * @class Tramite130115Query
 * Clase que extiende la funcionalidad de Akita Query para consultar el estado del trámite 130115.
 * Proporciona selectores para acceder a propiedades específicas del estado.
 */
@Injectable({ providedIn: 'root' })
export class Tramite130115Query extends Query<Tramite130115State> {
  /**
   * Selector para obtener todo el estado del trámite.
   * Devuelve el estado completo como un observable.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Selector para obtener el valor de `mostrarTabla` del estado.
   * Indica si la tabla debe mostrarse o no.
   */
  mostrarTabla$ = this.select((state) => state.mostrarTabla);

  /**
   * Selector para obtener la fila seleccionada en el estado.
   * Devuelve la fila seleccionada como un observable.
   */
  filaSeleccionada$ = this.select((state) => state.filaSeleccionada);

  /**
   * Selector para obtener el valor de `solicitud` del estado.
   * Devuelve la solicitud actual como un observable.
   */
  solicitud$ = this.select((state) => state.solicitud);

  /**
   * Selector para obtener el valor de `fraccion` del estado.
   * Devuelve la fracción arancelaria como un observable.
   */
  fraccion$ = this.select((state) => state.fraccion);

  /**
   * Selector para obtener el valor de `producto` del estado.
   * Devuelve el producto actual como un observable.
   */
  producto$ = this.select((state) => state.producto);

  /**
   * Selector para obtener la descripción de las partidas de la mercancía.
   * Devuelve la descripción como un observable.
   */
  descripcionPartidasDeLaMercancia$ = this.select(
    (state) => state.descripcionPartidasDeLaMercancia
  );

  /**
   * Selector para obtener la cantidad de partidas de la mercancía.
   * Devuelve la cantidad como un observable.
   */
  cantidadPartidasDeLaMercancia$ = this.select(
    (state) => state.cantidadPartidasDeLaMercancia
  );

  /**
   * Selector para obtener el valor en USD de las partidas de la mercancía.
   * Devuelve el valor como un observable.
   */
  valorPartidaUSDPartidasDeLaMercancia$ = this.select(
    (state) => state.valorPartidaUSDPartidasDeLaMercancia
  );

  /**
   * Selector para obtener la unidad de medida del estado.
   * Devuelve la unidad de medida como un observable.
   */
  unidadMedida$ = this.select((state) => state.unidadMedida);

  /**
   * Selector para obtener el valor predeterminado del selector.
   * Devuelve el valor predeterminado como un observable.
   */
  defaultSelect$ = this.select((state) => state.defaultSelect);

  /**
   * Selector para obtener el producto predeterminado.
   * Devuelve el producto predeterminado como un observable.
   */
  defaultProducto$ = this.select((state) => state.defaultProducto);

  /**
   * Selector para obtener la clasificación del estado.
   * Devuelve la clasificación como un observable.
   */
  clasificacion$ = this.select((state) => state.clasificacion);

  /**
   * Selector para obtener el régimen del estado.
   * Devuelve el régimen como un observable.
   */
  regimen$ = this.select((state) => state.regimen);

  /**
   * Selector para obtener el bloque del estado.
   * Devuelve el bloque como un observable.
   */
  bloque$ = this.select((state) => state.bloque);

  /**
   * Selector para obtener el uso específico del estado.
   * Devuelve el uso específico como un observable.
   */
  usoEspecifico$ = this.select((state) => state.usoEspecifico);

  /**
   * Selector para obtener la justificación de importación/exportación.
   * Devuelve la justificación como un observable.
   */
  justificacionImportacionExportacion$ = this.select(
    (state) => state.justificacionImportacionExportacion
  );

  /**
   * Selector para obtener las observaciones del estado.
   * Devuelve las observaciones como un observable.
   */
  observaciones$ = this.select((state) => state.observaciones);

  /**
   * Selector para obtener la entidad del estado.
   * Devuelve la entidad como un observable.
   */
  entidad$ = this.select((state) => state.entidad);

  /**
   * Selector para obtener la representación del estado.
   * Devuelve la representación como un observable.
   */
  representacion$ = this.select((state) => state.representacion);

  /**
   * Selector para obtener un subconjunto del estado relacionado con la mercancía.
   * Devuelve un objeto con las propiedades de la mercancía como un observable.
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
   * Constructor de la clase Tramite130115Query.
   * Inicializa la consulta con el almacén proporcionado.
   * @param store - Instancia del Tramite130115Store.
   */
  constructor(protected override store: Tramite130115Store) {
    super(store);
  }
}