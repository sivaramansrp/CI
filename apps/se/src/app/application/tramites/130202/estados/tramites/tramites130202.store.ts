import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite130202State {
  producto: string;
  descripcion: string;
  fraccion: string;
  cantidad: string;
  valorPartidaUSD: number; 
  unidadMedida: string;
  solicitud: string ; 
  defaultSelect: string;
  defaultProducto: string;
  regimen:string;
  classification:string
}

export function createInitialState(): Tramite130202State {
  return {
    solicitud: '', 
    fraccion: '',
    defaultSelect: 'Inicial',
    producto: '',
    descripcion: '',
    cantidad: '',
    valorPartidaUSD: 0,
    unidadMedida:'',
    defaultProducto: 'Nuevo',
    regimen: '',
    classification: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'tramite130202' })
export class Tramite130202Store extends Store<Tramite130202State> {
  
  constructor() {
    super(createInitialState());
  }

  public setFraccion(fraccion: string): void {
    
    this.update((state) => ({
      ...state,
      fraccion,
    }));
  }

  public updateSolicitud(solicitud: string): void {
    this.update((state) => ({
      ...state,
      solicitud,
    }));
  }

  public updateDefaultSelect(defaultSelect: string): void {
    this.update((state) => ({
      ...state,
      defaultSelect,
    }));
  }
 // Generic update method for multiple fields
 updateState(updates: Partial<Tramite130202State>): void {
  this.update(updates);
}

// Specific setters
setProducto(producto: string): void {
  this.update({ producto });
}

setDescripcion(descripcion: string): void {
  this.update({ descripcion });
}


setCantidad(cantidad: string): void {
  this.update({ cantidad });
}

setValorPartidaUSD(valorPartidaUSD: number): void {
  this.update({ valorPartidaUSD });
}

setUnidadMedida(unidadMedida: string): void {
  this.update({ unidadMedida });
}
updateDefaultProducto(defaultProducto: string): void {
  this.update({ defaultProducto });
}
 setregimen(regimen:string): void{
  this.update({regimen})
 }
 setclasificacion(classification:string):void{
  this.update({classification})
 }
}
