import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite130203State } from '../tramites/tramites130203.store';
import { Tramite130203Store } from '../tramites/tramites130203.store';

@Injectable({ providedIn: 'root' })
export class Tramite130203Query extends Query<Tramite130203State> {
  selectSolicitud$ = this.select((state) => {
    return state;
  });
  mostrarTabla$ = this.select((state) => state.mostrarTabla);
  filaSeleccionada$ = this.select((state) => state.filaSeleccionada);
  solicitud$ = this.select((state) => state.solicitud);
  fraccion$ = this.select((state) => state.fraccion);
  producto$ = this.select((state) => state.producto);
  descripcionPartidasDeLaMercancia$ = this.select(
    (state) => state.descripcionPartidasDeLaMercancia
  );
  cantidadPartidasDeLaMercancia$ = this.select(
    (state) => state.cantidadPartidasDeLaMercancia
  );
  valorPartidaUSDPartidasDeLaMercancia$ = this.select(
    (state) => state.valorPartidaUSDPartidasDeLaMercancia
  );
  unidadMedida$ = this.select((state) => state.unidadMedida);
  defaultSelect$ = this.select((state) => state.defaultSelect);
  defaultProducto$ = this.select((state) => state.defaultProducto);
  clasificacion$ = this.select((state) => state.clasificacion);
  regimen$ = this.select((state) => state.regimen);
  bloque$ = this.select((state) => state.bloque);
  usoEspecifico$ = this.select((state) => state.usoEspecifico);
  justificacionImportacionExportacion$ = this.select(
    (state) => state.justificacionImportacionExportacion
  );
  observaciones$ = this.select((state) => state.observaciones);
  entidad$ = this.select((state) => state.entidad);
  representacion$ = this.select((state) => state.representacion);

  mercanciaState$ = this.select((state) => ({
    producto: state.producto,
    descripcion: state.descripcion,
    fraccion: state.fraccion,
    cantidad: state.cantidad,
    valorPartidaUSD: state.valorPartidaUSD,
    unidadMedida: state.unidadMedida,
    defaultProducto: state.defaultProducto
  }));

  nombreExportador$ = this.select((state) => state.nombreExportador);
  direccionExportador$ = this.select((state) => state.direccionExportador);
  nombreImportador$ = this.select((state) => state.nombreImportador);
  direccionImportador$ = this.select((state) => state.direccionImportador);
  numeroEnLetraDeLosLotes$ = this.select((state) => state.numeroEnLetraDeLosLotes);
  numeroEnLetraDeLosLotesEnIngles$ = this.select((state) => state.numeroEnLetraDeLosLotesEnIngles);
  numeroDeFactura$ = this.select((state) => state.numeroDeFactura);
  cantidadEnQuilates$ = this.select((state) => state.cantidadEnQuilates);
  valorDeLosDiamantes$ = this.select((state) => state.valorDeLosDiamantes);

    constructor(private tramiteStore: Tramite130203Store) {
      super(tramiteStore);
    }
}
