import { Store, StoreConfig } from '@datorama/akita';
  
import { Injectable } from '@angular/core';

import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Creacion del estado inicial para la interfaz de tramite 
 * @returns Solicitud120501
 */
export interface Solicitud110218State {
  puertodeEmbarque: string,
  puertodeDesembarque:string,
  puertodeTránsito:string,
  nombredelaEmbarcación:string,
  númerodeVuelo:string
}

export function createInitialState(): Solicitud110218State {
  return{
    puertodeEmbarque:'Veracruz',
    puertodeDesembarque:'mexico',
    puertodeTránsito:'veracruz norte ',
    nombredelaEmbarcación:'puerto boca',
    númerodeVuelo:'0115 I'
  }
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite110218', resettable: true })
export class Tramite110218Store extends Store<Solicitud110218State> {
  constructor() {
    super(createInitialState());
  }

  public setpuertodeEmbarque(puertodeEmbarque: string): void {
      this.update((state) => ({
        ...state,
        puertodeEmbarque,
      }));
    }
    public setpuertodeDesembarque(puertodeDesembarque: string): void {
      this.update((state) => ({
        ...state,
        puertodeDesembarque,
      }));
    }
    public setnombredelaEmbarcación(nombredelaEmbarcación: string): void {
      this.update((state) => ({
        ...state,
        nombredelaEmbarcación,
      }));
    }
    public setnúmerodeVuelo(númerodeVuelo: string): void {
      this.update((state) => ({
        ...state,
        númerodeVuelo,
      }));
    }
    public setPuertodeTránsito(puertodeTránsito : string):void{
      this.update((state) => ({
        ...state,
        puertodeTránsito,
      }));
    }
}
