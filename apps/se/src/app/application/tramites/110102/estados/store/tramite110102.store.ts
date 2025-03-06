import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite110102State{
    cveRegistroProductor:string,
    unidadAdministrativaClave:string,
    solicitudEntidadFederativaEntidadClave:string
}

export function createInitialState(): Tramite110102State {
    return {
        cveRegistroProductor: '',
        unidadAdministrativaClave: '',
        solicitudEntidadFederativaEntidadClave: ''
    }
}

@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite110102', resettable: true })
  export class Tramite110102Store extends Store<Tramite110102State> {
    constructor() {
      super(createInitialState());
    }


public setUnidadAdministrativaClave(unidadAdministrativaClave: string):void {
    this.update((state) => ({
      ...state,
      unidadAdministrativaClave,
    }));
  }
  public setCveRegistroProductor(cveRegistroProductor: string):void {
    this.update((state) => ({
      ...state,
      cveRegistroProductor,
    }));
  }
  public setSolicitudEntidadFederativaEntidadClave(solicitudEntidadFederativaEntidadClave: string):void {
    this.update((state) => ({
      ...state,
      solicitudEntidadFederativaEntidadClave,
    }));
  }
}