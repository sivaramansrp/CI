import {
    Certificacion5601State,
    Tramite5601Store,
} from '../stores/tramite5601.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
@Injectable({ providedIn: 'root' })
export class Tramite5601Query extends Query<Certificacion5601State> {

    selectCertificacion$ = this.select((state) => {
        return state;
    });

    constructor(protected override store: Tramite5601Store) {
        super(store);
    }
}
