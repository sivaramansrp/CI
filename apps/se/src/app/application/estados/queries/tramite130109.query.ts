import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite130109State } from '../tramites/tramites130109.store';
import { Tramite130109Store } from '../tramites/tramites130109.store';

@Injectable({ providedIn: 'root' })
export class Tramite130109Query extends Query<Tramite130109State> {
  selectSolicitud$ = this.select((state) => {
    return state;
  });
  mostrarTabla$ = this.select((state) => state.mostrarTabla);
  filaSeleccionada$ = this.select(state => state.filaSeleccionada);
  solicitud$ = this.select(state => state.solicitud);
  fraccion$ = this.select(state => state.fraccion);
  producto$ = this.select(state => state.producto);
  descripcionPartidasDeLaMercancia$ = this.select(state => state.descripcionPartidasDeLaMercancia);
  cantidadPartidasDeLaMercancia$ = this.select(state => state. cantidadPartidasDeLaMercancia);
  valorPartidaUSDPartidasDeLaMercancia$ = this.select(state => state.valorPartidaUSDPartidasDeLaMercancia);
  unidadMedida$ = this.select(state => state.unidadMedida);
  defaultSelect$ = this.select(state => state.defaultSelect);
  defaultProducto$ = this.select(state => state.defaultProducto);
  clasificacion$ =this.select(state =>state.clasificacion)
  regimen$=this.select(state=>state.regimen)
  bloque$=this.select(state=>state.bloque)
  usoEspecifico$=this.select(state=>state.usoEspecifico)
  justificacionImportacionExportacion$=this.select(state=>state.justificacionImportacionExportacion)
  observaciones$=this.select(state=>state.observaciones)
  entidad$=this.select(state=>state.entidad)
  representacion$=this.select(state=>state.representacion)
  
  mercanciaState$ = this.select(state => ({
    producto: state.producto,
    descripcion: state.descripcion,
    fraccion: state.fraccion,
    cantidad: state.cantidad,
    valorPartidaUSD: state.valorPartidaUSD,
    unidadMedida: state.unidadMedida,
    defaultProducto: state.defaultProducto,
  }));

  constructor(protected override store: Tramite130109Store) {
    super(store);
  }

}
