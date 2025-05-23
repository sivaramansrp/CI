import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite110102State{
    cveRegistroProductor:string,
    unidadAdministrativaClave:string,
    solicitudEntidadFederativaEntidadClave:string,
    protestoDecirVerdad:boolean,
    solicitaSeparacionContable: boolean,
    solicitaExportadorAutorizado: boolean,
    condicionExportador: string,
    solicitaExportadorAutorizadoJPN:boolean,
    condicionExportadorJPN: string
}

export function createInitialState(): Tramite110102State {
    return {
        cveRegistroProductor: '',
        unidadAdministrativaClave: '',
        solicitudEntidadFederativaEntidadClave: '',
        protestoDecirVerdad:false,
        solicitaSeparacionContable: false,
        solicitaExportadorAutorizado: false,
        condicionExportador: '',
        solicitaExportadorAutorizadoJPN:false,
        condicionExportadorJPN: ''
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
  public setSolicitudEntidadFederativaEntidadClave(solicitudEntidadFederativaEntidadClave: string):void {
    this.update((state) => ({
      ...state,
      solicitudEntidadFederativaEntidadClave,
    }));
  }

  public setCveRegistroProductor(cveRegistroProductor: string):void {
    this.update((state) => ({
      ...state,
      cveRegistroProductor,
    }));
  }

  public setProtestoDecirVerdad(protestoDecirVerdad: boolean):void {
    this.update((state) => ({
      ...state,
      protestoDecirVerdad,
    }));
  }






  public setSolicitaSeparacionContable(solicitaSeparacionContable: boolean):void {
    this.update((state) => ({
      ...state,
      solicitaSeparacionContable,
    }));
  }

  public setSolicitaExportadorAutorizado(solicitaExportadorAutorizado: boolean):void {
    this.update((state) => ({
      ...state,
      solicitaExportadorAutorizado,
    }));
  }
  public setCondicionExportador(condicionExportador: string):void {
    this.update((state) => ({
      ...state,
      condicionExportador,
    }));
  }
  public setSolicitaExportadorAutorizadoJPN(solicitaExportadorAutorizadoJPN: boolean):void {
    this.update((state) => ({
      ...state,
      solicitaExportadorAutorizadoJPN
    }));
  }
  public setCondicionExportadorJPN(condicionExportadorJPN: string):void {
    this.update((state) => ({
      ...state,
      condicionExportadorJPN,
    }));
  }

    public establecerDatos(datos: Partial<Tramite110102State>): void {
    this.update((state) => ({
      ...state,
      ...datos,
    }));
  }

}