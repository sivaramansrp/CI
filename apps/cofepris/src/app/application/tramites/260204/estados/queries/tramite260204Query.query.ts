import { Query, StoreConfig } from "@datorama/akita";
import { Tramite260204State, Tramite260204Store } from "../stores/tramite260204Store.store";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'solicitud230401', resettable: true})
export class Tramite260204Query extends Query<Tramite260204State> {
    
    /**Guarda el estado completo del formulario de la solicitud */
    constructor(
        protected override store: Tramite260204Store) {
            super(store);
        }
      /**
         * Selecciona el estado completo de la solicitud
         */
      selectTramiteState$ = this.select((state) => {
        return state;
    });
    }