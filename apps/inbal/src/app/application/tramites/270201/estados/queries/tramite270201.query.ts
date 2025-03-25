import { DatosSolicitud270201State, Tramite270201Store } from "../tramites/tramite270201.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";

@Injectable({
    providedIn: 'root'
  })

  export class Tramite270201Query extends Query<DatosSolicitud270201State> {
    selectDatosSolicitud$ = this.select((state) => {
        return state;
    });

    constructor(
        protected override store: Tramite270201Store
    ){
        super(store);
    }
  }