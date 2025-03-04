import { Injectable } from "@angular/core";
import { ElegibilidadDeTextilesStore } from "../estados/elegibilidad-de-textiles.store";
import { ElegibilidadDeTextilesState } from "../models/elegibilidad-de-textiles.model";
import { Query } from "@datorama/akita";


@Injectable({ providedIn: 'root' })
export class ElegibilidadDeTextilesQuery extends Query<ElegibilidadDeTextilesState> {

    /**
     * @summary Constructor del servicio.
     * 
     * @param store Instancia del `FitosanitarioStore` utilizada para 
     * inicializar la consulta.
     */
    constructor(protected override store: ElegibilidadDeTextilesStore) {
        super(store);
    }
  
}
