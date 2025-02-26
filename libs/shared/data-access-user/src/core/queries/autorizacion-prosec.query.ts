import { Injectable } from "@angular/core";
import { ListaDeDatosFinal } from "../models/90101/prosec.module";
import { Query } from "@datorama/akita";
import { AutorizacionProsecStore } from "../../../../../../apps/se/src/app/application/store/90101/autorizacion-prosec.store";
/**
 * @summary Servicio de consulta para el estado de fitosanitarios.
 * 
 * @description 
 * La clase `FitosanitarioQuery` extiende de `Query<ListaDeDatosFinal>` 
 * y proporciona una interfaz para consultar el estado del almacenamiento 
 * de datos fitosanitarios mediante Akita.
 * 
 * @injectable
 */
@Injectable({ providedIn: 'root' })
export class FitosanitarioQuery extends Query<ListaDeDatosFinal> {

    /**
     * @summary Constructor del servicio.
     * 
     * @param store Instancia del `FitosanitarioStore` utilizada para 
     * inicializar la consulta.
     */
    constructor(protected override store: AutorizacionProsecStore) {
        super(store);
    }
}