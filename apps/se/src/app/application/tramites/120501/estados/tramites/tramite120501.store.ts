import { Store, StoreConfig } from '@datorama/akita';
  
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 
 * @returns Solicitud120501
 */
export interface Solicitud120501State {
  montoRecibir:string;
  entidadFederativa:string;
  representacionFederal:string;
}

export function createInitialState(): Solicitud120501State {
  return{
      montoRecibir:'1000',
      entidadFederativa: '',
      representacionFederal:''

  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite120501', resettable: true })
export class Tramite120501Store extends Store<Solicitud120501State> {
  constructor() {
    super(createInitialState());
  }

  public setmontoRecibir(montoRecibir: string): void {
      this.update((state) => ({
        ...state,
        montoRecibir,
      }));
    }

    public setEntidadFederativa(entidadFederativa: string):void {
      this.update((state) => ({
        ...state,
        entidadFederativa,
      }));
    }
    
    public setRepresentacionFederal(representacionFederal: string):void {
      this.update((state) => ({
        ...state,
        representacionFederal,
      }));
    }
}
