import {
  Personas,
  ResponsablesDespacho,
} from '@ng-mf/data-access-user';

import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

export interface Solicitud31601State {
    autorizacionIVAIEPS:string,
    regimen_0:boolean,
    regimen_1:boolean,
    regimen_2:boolean,
    regimen_3:boolean,
}

export function createInitialState(): Solicitud31601State {
    return {
        autorizacionIVAIEPS:'',
        regimen_0:false,
        regimen_1:false,
        regimen_2:false,
        regimen_3:false,
    };
  }

@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite31601', resettable: true })

  export class Tramite31601Store extends Store<Solicitud31601State>{
    constructor() {
        super(createInitialState());
      }
      public setAutorizacionIVAIEPS(autorizacionIVAIEPS: string) {
        this.update((state) => ({
          ...state,
          autorizacionIVAIEPS,
        }));
      }
      public setRegimen_0(regimen_0: boolean) {
        this.update((state) => ({
          ...state,
          regimen_0,
        }));
      }
      public setRegimen_1(regimen_1: boolean) {
        this.update((state) => ({
          ...state,
          regimen_1,
        }));
      }
      public setRegimen_2(regimen_2: boolean) {
        this.update((state) => ({
          ...state,
          regimen_2,
        }));
      }
      public setRegimen_3(regimen_3: boolean) {
        this.update((state) => ({
          ...state,
          regimen_3,
        }));
      }
  } 
  