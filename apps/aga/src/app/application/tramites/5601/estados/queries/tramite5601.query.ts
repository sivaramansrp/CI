import {
    Tramite5601State,
    Tramite5601Store,
} from '../stores/tramite5601.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
/**
 * Se configura para estar disponible en toda la aplicación y 
 * ser reiniciable cuando sea necesario.
 */
@Injectable({ providedIn: 'root' })
export class Tramite5601Query extends Query<Tramite5601State> {
    /**
     * Observa el estado completo de la certificación en el store.
     * Esta variable se utiliza para obtener los datos del estado del trámite 5601.
     */
    selectCertificacion$ = this.select((state) => {
        return state;
    });

    /**
     * Constructor de la clase que inicializa el store.
     * Llama al constructor de la clase base con el store de Tramite5601.
     */
    constructor(protected override store: Tramite5601Store) {
        super(store);
    }

}
