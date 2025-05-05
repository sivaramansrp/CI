import { Tramite250102State, Tramite250102Store } from "./tramite250102.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";

@Injectable({
    providedIn: 'root',
})
export class Tramite250102Query extends Query<Tramite250102State>{


    constructor(private tramiteStore: Tramite250102Store){
        super(tramiteStore);
    }
}