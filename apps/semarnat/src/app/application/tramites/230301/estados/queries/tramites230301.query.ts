import { Solicitud230301State, Solicitud230301Store } from '../tramites/tramites230301.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ConsultaSolicitud230301 extends Query<Solicitud230301State> {

    /**
     * Selecciona el estado completo de la solicitud
     */
    estadoSolicitud$ = this.select((estado) => {
        return estado;
    });

    /**
     * Inicializa la consulta con el store proporcionado
     */
    constructor(
        protected override store: Solicitud230301Store) {
        super(store);
    }
}
