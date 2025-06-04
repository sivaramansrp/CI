import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 90201
 * @returns Solicitud90201
 */
export interface Solicitud140103State {
  
 regimen: string;
 mecanismo:string;
 tratado: string;
 producto: string;
 subproducto: string;
 representacion: string;
 cantidad:string;


}

/** Crea y devuelve el estado inicial vacío para el formulario de Solicitud 140103. */
export function createInitialState(): Solicitud140103State {
  return {
    regimen: '',
    mecanismo: '',
    tratado: '',
    producto:'',
    subproducto:'',
    representacion:'',
    cantidad: '', 
   

  };
}

/** Store que gestiona el estado reactivo para el trámite 140103 usando Akita. */
@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite140103', resettable: true })
  export class Tramite140103Store extends Store<Solicitud140103State> {
    constructor() {
      super(createInitialState());
    }


    public setRegimen(regimen: string) {
        this.update((state) => ({
            ...state,
            regimen,
        }));
    }
    public setMecanismo(mecanismo: string) {
        this.update((state) => ({
            ...state,
            mecanismo,
        }));
    }
    public setTratado(tratado: string) {
        this.update((state) => ({
            ...state,
            tratado,
        }));
    }

    public setProducto(producto: string) {
        this.update((state) => ({
            ...state,
            producto,
        }));
    }
    public setSubproducto(subproducto: string) {
        this.update((state) => ({
            ...state,
            subproducto,
        }));
    }
    public setRepresentacion(representacion: string) {
        this.update((state) => ({
            ...state,
            representacion,
        }));
    }

 public setCantidad(cantidad: string) {
    this.update((state) => ({
        ...state,
        cantidad,
    }));
} 


}
  