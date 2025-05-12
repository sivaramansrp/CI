// Importaciones necesarias para la funcionalidad de consultas y el estado
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite130105State } from '../tramites/tramites130105.store';
import { Tramite130105Store } from '../tramites/tramites130105.store';

// Decorador que define esta clase como un servicio inyectable
@Injectable({ providedIn: 'root' })
export class Tramite130105Query extends Query<Tramite130105State> {
  // Selecciona el estado completo
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  // Selecciona si se debe mostrar la tabla
  mostrarTabla$ = this.select((state) => state.mostrarTabla);

  // Selecciona la fila actualmente seleccionada
  filaSeleccionada$ = this.select(state => state.filaSeleccionada);

  // Selecciona la solicitud actual
  solicitud$ = this.select(state => state.solicitud);

  // Selecciona la fracción arancelaria
  fraccion$ = this.select(state => state.fraccion);

  // Selecciona el producto actual
  producto$ = this.select(state => state.producto);

  // Selecciona la descripción de las partidas de la mercancía
  descripcionPartidasDeLaMercancia$ = this.select(state => state.descripcionPartidasDeLaMercancia);

  // Selecciona la cantidad de partidas de la mercancía
  cantidadPartidasDeLaMercancia$ = this.select(state => state.cantidadPartidasDeLaMercancia);

  // Selecciona el valor en USD de las partidas de la mercancía
  valorPartidaUSDPartidasDeLaMercancia$ = this.select(state => state.valorPartidaUSDPartidasDeLaMercancia);

  // Selecciona la unidad de medida
  unidadMedida$ = this.select(state => state.unidadMedida);

  // Selecciona el valor por defecto para el select
  defaultSelect$ = this.select(state => state.defaultSelect);

  // Selecciona el producto por defecto
  defaultProducto$ = this.select(state => state.defaultProducto);

  // Selecciona la clasificación
  clasificacion$ = this.select(state => state.clasificacion);

  // Selecciona el régimen
  regimen$ = this.select(state => state.regimen);

  // Selecciona el bloque
  bloque$ = this.select(state => state.bloque);

  // Selecciona el uso específico
  usoEspecifico$ = this.select(state => state.usoEspecifico);

  // Selecciona la justificación de importación/exportación
  justificacionImportacionExportacion$ = this.select(state => state.justificacionImportacionExportacion);

  // Selecciona las observaciones
  observaciones$ = this.select(state => state.observaciones);

  // Selecciona la entidad
  entidad$ = this.select(state => state.entidad);

  // Selecciona la representación
  representacion$ = this.select(state => state.representacion);

  // Selecciona un estado relacionado con la mercancía
  mercanciaState$ = this.select(state => ({
    producto: state.producto,
    descripcion: state.descripcion,
    fraccion: state.fraccion,
    cantidad: state.cantidad,
    valorPartidaUSD: state.valorPartidaUSD,
    unidadMedida: state.unidadMedida,
    defaultProducto: state.defaultProducto,
  }));

  // Constructor que inicializa la consulta con el store correspondiente
  constructor(protected override store: Tramite130105Store) {
    super(store);
  }
}