import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite 90201
 * @returns Solicitud90201
 */
export interface Solicitud221602State {
  
    justificacion: string;
    aduana:string;
    oficina: string;
    punto: string;
    guia: string;
    regimen: string;
    carro:string;
    medio: string;
    transporte: string;
    verificacion: string;
    empresa:string;
    clave: string;
    dependencia:string;
    banco: string;
    llave: string;
    fecha: string;
    importe:string;

   


}

export function createInitialState(): Solicitud221602State {
  return {
    justificacion: '',
    aduana: '',
    oficina: '',
    punto:'',
    guia:'',
    regimen:'',
    carro: '', 
    medio:'',
    transporte:'',
    verificacion:'',
    empresa: '', 
    clave:'',
    dependencia: '', 
    banco:'',
    llave:'',
    fecha:'',
    importe: '', 
   
   

  };
}
@Injectable({
    providedIn: 'root',
  })
  @StoreConfig({ name: 'tramite221602', resettable: true })
  export class Tramite221602Store extends Store<Solicitud221602State> {
    constructor() {
      super(createInitialState());
    }

    public setRegimen(regimen: string) {
        this.update((state) => ({
            ...state,
            regimen,
        }));
    }
    public setJustificacion(justificacion: string) {
        this.update((state) => ({
            ...state,
            justificacion,
        }));
    }
    public setAduana(aduana: string) {
        this.update((state) => ({
            ...state,
            aduana,
        }));
    }
    public setOficina(oficina: string) {
        this.update((state) => ({
            ...state,
            oficina,
        }));
    }
    public setPunto(punto: string) {
        this.update((state) => ({
            ...state,
            punto,
        }));
    }
    public setGuia(guia: string) {
        this.update((state) => ({
            ...state,
            guia,
        }));
    }
    public setCarro(carro: string) {
        this.update((state) => ({
            ...state,
            carro,
        }));
    }
    public setMedio(medio: string) {
        this.update((state) => ({
            ...state,
            medio,
        }));
    }

    public setVerificacion(verificacion: string) {
        this.update((state) => ({
            ...state,
            verificacion,
        }));
    }

    public setTransporte(transporte: string) {
        this.update((state) => ({
            ...state,
            transporte,
        }));
    }

    public setEmpresa(empresa: string) {
        this.update((state) => ({
            ...state,
            empresa,
        }));
    }
    public setClave(clave: string) {
        this.update((state) => ({
            ...state,
            clave,
        }));
    }
    public setDependencia(dependencia: string) {
        this.update((state) => ({
            ...state,
            dependencia,
        }));
    }
    public setBanco(banco: string) {
        this.update((state) => ({
            ...state,
            banco,
        }));
    }
    public setLlave(llave: string) {
        this.update((state) => ({
            ...state,
            llave,
        }));
    }
    public setFecha(fecha: string) {
        this.update((state) => ({
            ...state,
            fecha,
        }));
    }
    public setImporte(importe: string) {
        this.update((state) => ({
            ...state,
            importe,
        }));
    }


  }
