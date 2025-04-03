import {Tramite130108State, Tramite130108Store } from '../tramites/tramites130108.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';


@Injectable({ providedIn: 'root' })
export class Tramite130108Query extends Query<Tramite130108State> {
  get selectSolicitud$(): Observable<Tramite130108State> {
    return this.select((state) => state);
  }
 
  get mostrarTabla$(): Observable<boolean> {
    return this.select((state) => state.mostrarTabla);
  }
 
  get solicitud$(): Observable<string> {
    return this.select((state) => state.solicitud);
  }
 
  get fraccion$(): Observable<string> {
    return this.select((state) => state.fraccion);
  }
 
  get umt$(): Observable<string> {
    return this.select((state) => state.umt);
  }
 
  get nico$(): Observable<string> {
    return this.select((state) => state.nico);
  }
 
  get plazo$(): Observable<unknown> {
    return this.select((state) => state.plazo);
  }
 
  descripcionPartidasDeLaMercancia$: Observable<string> = this.select(
    (state) => state.descripcionPartidasDeLaMercancia
  );
  cantidadPartidasDeLaMercancia$: Observable<string> = this.select(
    (state) => state.cantidadPartidasDeLaMercancia
  );
  valorPartidaUSDPartidasDeLaMercancia$: Observable<number> = this.select(
    (state) => state.valorPartidaUSDPartidasDeLaMercancia
  );
  unidadMedida$: Observable<string> = this.select((state) => state.unidadMedida);
  defaultSelect$: Observable<string> = this.select((state) => state.defaultSelect);
  defaultPlazo$: Observable<string> = this.select((state) => state.defaultPlazo);
  clasificacion$: Observable<string> = this.select((state) => state.clasificacion);
  regimen$: Observable<string> = this.select((state) => state.regimen);
  bloque$: Observable<string> = this.select((state) => state.bloque);
  usoEspecifico$: Observable<string> = this.select((state) => state.usoEspecifico);
  justificacionImportacionExportacion$: Observable<string> = this.select(
    (state) => state.justificacionImportacionExportacion
  );
  observaciones$: Observable<string> = this.select((state) => state.observaciones);
  entidad$: Observable<string> = this.select((state) => state.entidad);
  representacion$: Observable<string> = this.select((state) => state.representacion);
 
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
 
  constructor(protected override store: Tramite130108Store) {
    super(store);
  }
}
