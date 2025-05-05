import { Solicitud120702State, Tramite120702Store } from "./tramite120702.store";
import { Injectable } from "@angular/core"; 
import { Query } from "@datorama/akita";

@Injectable({providedIn:'root'})
export class Tramite120702Query extends Query<Solicitud120702State>{
    selectSolicitud$ = this.select((state) => {
        return state;
    })

    constructor(protected override store: Tramite120702Store){
        super(store)
    }
}