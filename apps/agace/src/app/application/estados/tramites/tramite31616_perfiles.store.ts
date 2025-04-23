import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Solicitud31616PerfilesState {
    procedimientoDocumentado: string;
    indiqueNumero: string;
    cargosFunciones: string;
    casoContratarse: string;
    casoContar: string;
    describirProcedimiento: string,
    indiqueMecanismos: string;
    indicarEmpleados: string;
    indiqueIdentifica: string;
    describaEmpresa: string;
    indiqueAsegura: string;
    procedimientoParaControl: string;
    senaleRegistros: string;
    senaleQuien: string;
    describaRecepion: string;
    indiqueEncargado: string;
    indiqueIdentfica: string;
    senaleComo: string;
    describaCaracteristicas: string;
    senaleAccion: string;
    indiqueLleva: string,
    describaProcedimiento: string,
    indiqueSocios: string,
    indiqueForma: string,
    indiqueExisten: string,
    indiqueCuenta: string,
    procedimientoRealizar: string,
    indiquePeriodicidad: string,
    describaComo: string,
    comoAseguran: string,
    indiqueFormatos: string,
    senalarMedidas: string,
}

export function createInitialState(): Solicitud31616PerfilesState {
    return {
        procedimientoDocumentado: '',
        indiqueNumero: '',
        cargosFunciones: '',
        casoContratarse: '',
        casoContar: '',
        describirProcedimiento: '',
        indiqueMecanismos: '',
        indicarEmpleados: '',
        indiqueIdentifica: '',
        describaEmpresa: '',
        indiqueAsegura: '',
        procedimientoParaControl: '',
        senaleRegistros: '',
        senaleQuien: '',
        describaRecepion: '',
        indiqueEncargado: '',
        indiqueIdentfica: '',
        senaleComo: '',
        describaCaracteristicas: '',
        senaleAccion: '',
        indiqueLleva: '',
        describaProcedimiento: '',
        indiqueSocios: '',
        indiqueForma: '',
        indiqueExisten: '',
        indiqueCuenta: '',
        procedimientoRealizar: '',
        indiquePeriodicidad: '',
        describaComo: '',
        comoAseguran: '',
        indiqueFormatos: '',
        senalarMedidas: '',
    };
}

@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite31616Perfiles', resettable: true })

export class Tramite31616PerfilesStore extends Store<Solicitud31616PerfilesState>{
  
    constructor() {
        super(createInitialState());
    }
   
    public setProcedimientoDocumentado(procedimientoDocumentado: string): void {
        this.update((state) => ({
            ...state,
            procedimientoDocumentado,
        }));
    }
  
    public setIndiqueNumero(indiqueNumero: string): void {
        this.update((state) => ({
            ...state,
            indiqueNumero,
        }));
    }
   
    public setCargosFunciones(cargosFunciones: string): void {
        this.update((state) => ({
            ...state,
            cargosFunciones,
        }));
    }
    
    public setCasoContratarse(casoContratarse: string): void {
        this.update((state) => ({
            ...state,
            casoContratarse,
        }));
    }
   
    public setCasoContar(casoContar: string): void {
        this.update((state) => ({
            ...state,
            casoContar,
        }));
    }

    public setDescribirProcedimiento(describirProcedimiento: string): void {
        this.update((state) => ({
            ...state,
            describirProcedimiento,
        }));
    }

    public setIndiqueMecanismos(indiqueMecanismos: string): void {
        this.update((state) => ({
            ...state,
            indiqueMecanismos,
        }));
    }
  
    public setIndicarEmpleados(indicarEmpleados: string): void {
        this.update((state) => ({
            ...state,
            indicarEmpleados,
        }));
    }
   
    public setIndiqueIdentifica(indiqueIdentifica: string): void {
        this.update((state) => ({
            ...state,
            indiqueIdentifica,
        }));
    }
    
    public setDescribaEmpresa(describaEmpresa: string): void {
        this.update((state) => ({
            ...state,
            describaEmpresa,
        }));
    }
   
    public setIndiqueAsegura(indiqueAsegura: string): void {
        this.update((state) => ({
            ...state,
            indiqueAsegura,
        }));
    }

    public setProcedimientoParaControl(procedimientoParaControl: string): void {
        this.update((state) => ({
            ...state,
            procedimientoParaControl,
        }));
    }
  
    public setSenaleRegistros(senaleRegistros: string): void {
        this.update((state) => ({
            ...state,
            senaleRegistros,
        }));
    }
   
    public setSenaleQuien(senaleQuien: string): void {
        this.update((state) => ({
            ...state,
            senaleQuien,
        }));
    }
    
    public setDescribaRecepion(describaRecepion: string): void {
        this.update((state) => ({
            ...state,
            describaRecepion,
        }));
    }
   
    public setIndiqueEncargado(indiqueEncargado: string): void {
        this.update((state) => ({
            ...state,
            indiqueEncargado,
        }));
    }

    public setIndiqueIdentfica(indiqueIdentfica: string): void {
        this.update((state) => ({
            ...state,
            indiqueIdentfica,
        }));
    }
  
    public setSenaleComo(senaleComo: string): void {
        this.update((state) => ({
            ...state,
            senaleComo,
        }));
    }
   
    public setDescribaCaracteristicas(describaCaracteristicas: string): void {
        this.update((state) => ({
            ...state,
            describaCaracteristicas,
        }));
    }
    
    public setSenaleAccion(senaleAccion: string): void {
        this.update((state) => ({
            ...state,
            senaleAccion,
        }));
    }

    public setIndiqueLleva(indiqueLleva: string): void {
        this.update((state) => ({
            ...state,
            indiqueLleva,
        }));
    }
  
    public setDescribaProcedimiento(describaProcedimiento: string): void {
        this.update((state) => ({
            ...state,
            describaProcedimiento,
        }));
    }
   
    public setIndiqueSocios(indiqueSocios: string): void {
        this.update((state) => ({
            ...state,
            indiqueSocios,
        }));
    }
    
    public setIndiqueForma(indiqueForma: string): void {
        this.update((state) => ({
            ...state,
            indiqueForma,
        }));
    }

    public setIndiqueExisten(indiqueExisten: string): void {
        this.update((state) => ({
            ...state,
            indiqueExisten,
        }));
    }
  
    public setIndiqueCuenta(indiqueCuenta: string): void {
        this.update((state) => ({
            ...state,
            indiqueCuenta,
        }));
    }
   
    public setProcedimientoRealizar(procedimientoRealizar: string): void {
        this.update((state) => ({
            ...state,
            procedimientoRealizar,
        }));
    }
    
    public setIndiquePeriodicidad(indiquePeriodicidad: string): void {
        this.update((state) => ({
            ...state,
            indiquePeriodicidad,
        }));
    }

    public setDescribaComo(describaComo: string): void {
        this.update((state) => ({
            ...state,
            describaComo,
        }));
    }
  
    public setComoAseguran(comoAseguran: string): void {
        this.update((state) => ({
            ...state,
            comoAseguran,
        }));
    }
   
    public setIndiqueFormatos(indiqueFormatos: string): void {
        this.update((state) => ({
            ...state,
            indiqueFormatos,
        }));
    }
    
    public setSenalarMedidas(senalarMedidas: string): void {
        this.update((state) => ({
            ...state,
            senalarMedidas,
        }));
    }
} 