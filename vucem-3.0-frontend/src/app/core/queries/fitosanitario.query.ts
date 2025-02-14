import { Injectable } from "@angular/core";
import { ListaDeDatosFinal } from "../models/220202/fitosanitario.model";
import { Query } from "@datorama/akita";
import { FitosanitarioStore } from "../../estados/fitosanitario.store";

@Injectable({ providedIn: 'root' })
export class FitosanitarioQuery extends Query<ListaDeDatosFinal> {

    constructor(protected override store: FitosanitarioStore) {
        super(store);
    }
}