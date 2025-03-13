import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';

export interface Cancelaciones140201State {
  //   selectedEstado: Estado;
  entidadFederativa: Catalogo | null;
  colonia: Catalogo | null;
  localidad: Catalogo | null;
  municipio: Catalogo | null;
  paisInput: null;
  numeroInterior: null;
  codigoPostal:null;
  telefona:null;
  nombre:null;
  apellidoPaterno:null;
  correoElectronico:null;
}

export function createInitialState(): Cancelaciones140201State {
  return {
    entidadFederativa: null,
    colonia: null,
    localidad: null,
    municipio: null,
    paisInput: null,
    numeroInterior: null,
    codigoPostal:null,
    telefona:null,
    nombre:null,
    apellidoPaterno:null,
    correoElectronico:null
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'cancelaciones140201', resettable: true })
export class Cancelaciones140201Store extends Store<Cancelaciones140201State> {
  constructor() {
    super(createInitialState());
  }
  public setEntidadFed(entidadFederativa: Catalogo): void {
    this.update((state) => ({
      ...state,
      entidadFederativa,
    }));
  }

  public setColonia(colonia: Catalogo): void {
    this.update((state) => ({
      ...state,
      colonia,
    }));
  }

  public setLocalidad(localidad: Catalogo): void {
    this.update((state) => ({
      ...state,
      localidad,
    }));
  }

  public setMunicipiosAlcaldia(municipio: Catalogo): void {
    this.update((state) => ({
      ...state,
      municipio,
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setPaisInput(paisInput: any): void {
    this.update((state) => ({
      ...state,
      paisInput,
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setNumeroInterior(numeroInterior: any): void {
    this.update((state) => ({
      ...state,
      numeroInterior,
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setCodigoPostal(codigoPostal: any): void {
    this.update((state) => ({
      ...state,
      codigoPostal,
    }));
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
public setTelefona(telefona:any):void{
  this.update((state) => ({
    ...state,
    telefona,
  }));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
 public setNombre(nombre:any):void{
  this.update((state)=>({
    ...state,
    nombre,
  }))
 } 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
 public setApellidoPaterno(apellidoPaterno:any):void{
this.update ((state)=>({
  ...state,
  apellidoPaterno,
}))

 }
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 public setCorreoElectronico(correoElectronico:any):void{
  this.update((state)=>({
    ...state,
    correoElectronico,
    }))
 }
}
