import { Injectable } from "@angular/core";
import { Contenedor11202State, Contenedor11202Store } from "../tramites/contenedor11202.store";
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Contenedor11202Query extends Query<Contenedor11202State> {

  /**
   * Selecciona el estado completo de la solicitud
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**Guarda el estado completo del formulario de la solicitud */
  constructor(
    protected override store: Contenedor11202Store) {
    super(store);
  }
}
