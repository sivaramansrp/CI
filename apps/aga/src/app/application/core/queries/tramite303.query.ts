import { Tramite303Store, Tramite303StoreService } from "../estados/tramites/tramite303.store";
import { Injectable } from "@angular/core";
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite303Query extends Query<Tramite303Store> {

    selectSolicitud$ = this.select((state) => {
        return state;
    });

    constructor(
        protected override store: Tramite303StoreService) {
        super(store);
    }
}