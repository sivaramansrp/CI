import { Solicitud31616PerfilesState, Tramite31616PerfilesStore } from '../../estados/tramites/tramite31616_perfiles.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({providedIn: 'root'})
export class Tramite31616PerfilesQuery extends Query<Solicitud31616PerfilesState>{
    selectSolicitud$ = this.select((state) => {
        return state;
    });

    constructor(
        protected override store: Tramite31616PerfilesStore){
            super(store)
        }
    
}