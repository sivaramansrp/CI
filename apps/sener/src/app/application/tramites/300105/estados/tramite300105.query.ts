import { Tramite300105State, Tramite300105Store } from "./tramite300105.store";
import { Injectable } from "@angular/core";
import { Query } from '@datorama/akita';

/**
 * Clase Tramite300105Query
 * Descripción: Clase que representa las consultas al estado del trámite 300105.
 */
@Injectable({ providedIn: 'root' })
export class Tramite300105Query extends Query<Tramite300105State> {
  
  /**
   * Propiedad selectTramite300105$
   * Descripción: Observable que selecciona el estado completo del trámite 300105.
   */
  selectTramite300105$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite300105Query
   * Descripción: Inicializa la clase Tramite300105Query con el store correspondiente.
   * Parámetros:
   *   - store: Instancia del store del trámite 300105.
   */
  constructor(
    protected override store: Tramite300105Store) {
    super(store);
  }
}