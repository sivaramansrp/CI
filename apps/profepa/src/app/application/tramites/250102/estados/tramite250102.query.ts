import { Tramite250102State, Tramite250102Store } from "./tramite250102.store";
import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";

@Injectable({
    providedIn: 'root',
})
export class Tramite250102Query extends Query<Tramite250102State>{

    public selectTramiteState$ = this.select((state) => state);
    public selectTipoMovimiento$ = this.select((state) => state.tipoMovimiento);
    public selectDestinatarioRowData$ = this.select((state) => state.destinatarioRowData);
    public selectAgenteAduanalRowData$ = this.select((state) => state.agenteAduanalRowData);
  
    constructor(private tramiteStore: Tramite250102Store){
        super(tramiteStore);
    }
  
}