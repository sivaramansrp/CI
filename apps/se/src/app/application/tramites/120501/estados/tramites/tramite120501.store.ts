import { Store, StoreConfig } from '@datorama/akita';
  
import { Injectable } from '@angular/core';

import { Catalogo } from '@libs/shared/data-access-user/src';

/**
 * Creacion del estado inicial para la interfaz de tramite 
 * @returns Solicitud120501
 */
export interface Solicitud120501State {
  entidadFederativa: string;
  representacionFederal: string;
  numeraDelicitacion: string;
  fechaDelEventoDelicitacion: string;
  descripcionDelProducto: string;
  unidadTarifaria: string;
  regimenAduanero: string;
  fraccionArancelaria: string;
  fechaDeiniciodeVigenciadelCupo:string,
  fechaDefindeVigenciadelCupo:string,
  obserVaciones:string,
  bloqueComercial:string,
  paises:string,
  montoadJudicado:string,
  montoDisponible:string,
  montoMaximo:string,
  rfc:string,
  adquirienteMontoDisponible:string,
  montoRecibir:string,
  rfc1:string,
}

export function createInitialState(): Solicitud120501State {
  return{
      
      entidadFederativa:'',
      representacionFederal:'',
      numeraDelicitacion: '',
      fechaDelEventoDelicitacion: '',
      descripcionDelProducto: '', 
      unidadTarifaria: '',
      regimenAduanero: '',
      fraccionArancelaria: '',
      fechaDeiniciodeVigenciadelCupo:'',
      fechaDefindeVigenciadelCupo:'',
      obserVaciones:'',
      bloqueComercial:'',
      paises:'',
      montoadJudicado:'',
      montoDisponible:'',
      montoMaximo:'',
      rfc:'',
      adquirienteMontoDisponible:'',
      montoRecibir:'',
      rfc1:''
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
