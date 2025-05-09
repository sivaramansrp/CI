import { DestruccionState, DestruccionStore } from "./Tramite32509.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";


/**
 * Query to manage the state of Prosec authorization.
 */
@Injectable({ providedIn: 'root' })
export class DestruccionQuery extends Query<DestruccionState> {

    selectDestruccion$ = this.select((state) => {
        return state;
      });
    

    /**
     * Constructor to inject DestruccionStore.
     * @param store DestruccionStore instance
     */
    constructor(protected override store: DestruccionStore) {
        super(store);
    }
}