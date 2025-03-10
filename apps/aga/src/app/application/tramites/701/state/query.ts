/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "@angular/core";

import { Query } from "@datorama/akita";
import{TipoDocumentoStore} from './store';
import { TipoDocumento } from "./tipo-documento.model";


@Injectable({
    providedIn: 'root'
})
export class TipoDocumentoQuery
extends Query<TipoDocumento> {
    constructor(protected override store: 
        TipoDocumentoStore){
            super(store);
        }
        selectdescripcion$ = this.select(state => state.descripcion);
        selected$ = this.select(state => state.selected);
        tipoDocumento$ = this.select(state => state.tipoDocumento);
        rfcParaConsulta$ = this.select(state => state.rfcParaConsulta);
        nombre$ = this.select(state => state.nombre);
        
}