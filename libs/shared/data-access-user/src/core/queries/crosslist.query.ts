import { CrosslistState, CrosslistStore } from "../estados/crosslist.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";

@Injectable({
  providedIn: 'root'
})
export class CrosslistQuery extends Query<CrosslistState> {
   /**
     * Selecciona el estatdo completo de la sección
     */
    selectCrosslist$ = this.select((state) => {
      return state;
    });
  
    constructor(protected override store: CrosslistStore) {
      super(store);
    }
}