import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";

import { CapturarSolicitud } from "../../models/220201/capturar-solicitud.model";
import { ZoosanitarioStore } from "../../estados/220201/zoosanitario.store";
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
export class ZoosanitarioQuery extends Query<CapturarSolicitud> {

    /**
     * @summary Constructor del servicio.
     * 
     * @param store Instancia del `FitosanitarioStore` utilizada para 
     * inicializar la consulta.
     */
    constructor(protected override store: ZoosanitarioStore) {
        super(store);
    }
}