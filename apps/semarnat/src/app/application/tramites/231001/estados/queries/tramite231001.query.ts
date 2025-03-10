import { Solicitud231001State, Tramite231001Store } from '../tramites/tramite231001.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite231001Query extends Query<Solicitud231001State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });
  numeroProgramaImmex$ = this.select((state) => state.numeroProgramaImmex);
  aduanas$ = this.select((state) => state.aduanas);
  capituloFraccion$ = this.select((state) => state.capituloFraccion);
  unidadMedidaComercial$ = this.select((state) => state.unidadMedidaComercial);
  partidaFraccion$ = this.select((state) => state.partidaFraccion);
  subPartidaFraccion$ = this.select((state) => state.subPartidaFraccion);
  fraccion$ = this.select((state) => state.fraccion);
  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Tramite231001Store) {
    super(store);
  }
}
