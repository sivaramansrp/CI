import { Tramite260515State, Tramite260515Store } from "../stores/tramite260515Store.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";

@Injectable({ providedIn: 'root' })
export class Tramite260515Query extends Query<Tramite260515State> {
  /**
   * @constructor
   * @description
   * Inicializa la consulta con la tienda correspondiente.
   *
   * @param {Tramite260515Store} store - La tienda que contiene el estado del trámite 260515.
   */
  constructor(protected override store: Tramite260515Store) {
    super(store);
  }
    /**
   * Obtiene el índice previo de la ruta.
   * @returns {Observable<number>} El índice previo de la ruta
   */
  public indicePrevioRuta$ = this.select((state) => state.idSolicitud);

}