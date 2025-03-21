import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { Store, StoreConfig } from '@datorama/akita'

export interface SolicitudRequerimientosState {
    idTipoRequerimiento: number ;
    justificacionRequerimiento: string;
  }
  export function createInitialState(): SolicitudRequerimientosState {
    return {
        idTipoRequerimiento: 0,
        justificacionRequerimiento: ''
    };
  }

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'RequerimientosStates', resettable: true})
export class RequerimientosStates extends Store<SolicitudRequerimientosState>{
    constructor(){
       super( createInitialState());
    }
    
    resetStore(){
        this.reset();
    }

    settipoRequerimientoValue( idTipoRequerimiento : number){
        this.update(state => ({... state, idTipoRequerimiento}));
    }

    setjustificacionRequerimientoValue( justificacionRequerimiento : string){
        this.update(state => ({... state, justificacionRequerimiento}));
    }
    
    public limpiarRequerimiento() {
        this.reset();
      }
}
