import { AutorizacionProsecStore } from "../../../../../../apps/se/src/app/application/store/90101/autorizacion-prosec.store";
import { Injectable } from "@angular/core";
import { ListaDeDatosFinal } from "../models/90101/prosec.module";
import { Query } from "@datorama/akita";

/**
 * Query to manage the state of Prosec authorization.
 */
@Injectable({ providedIn: 'root' })
export class FitosanitarioQuery extends Query<ListaDeDatosFinal> {

    /**
     * Constructor to inject AutorizacionProsecStore.
     * @param store AutorizacionProsecStore instance
     */
    constructor(protected override store: AutorizacionProsecStore) {
        super(store);
    }
}