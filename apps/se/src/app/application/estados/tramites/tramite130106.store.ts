import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

   
export interface Solicitud130106State {

    regimen: string;
    clasificacion: string;
    solicitudDescripcion: string
    fraccion: string
    cantidad: string;
    factura: string;
    umt: string;
    mercanciaCantidad: string;
    mercanciaFactura: string;
    descripcion: string;
    especifico: string;
    justificacion: string;
    observaciones: string;
    entidad: string;
    representacion: string;
    bloque: string;
    disponible:string;
    seleccionado:string;
    solicitud:string;
    producto:string;
    selectRangoDias: string[]

}

export function createInitialState(): Solicitud130106State {
    return {
        regimen: '',
        clasificacion: '',
        solicitudDescripcion: '',
        fraccion: '',
        cantidad: '',
        factura: '',
        umt: '',
        mercanciaCantidad: '',
        mercanciaFactura: '',
        descripcion: '',
        especifico: '',
        justificacion: '',
        observaciones: '',
        entidad: '',
        representacion: '',
        bloque: '',
        disponible:'',
        seleccionado:'',
        solicitud:'',
        producto:'',
        selectRangoDias:['']
    };
}
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite130106', resettable: true })
export class Tramite130106Store extends Store<Solicitud130106State> {

    constructor() {
        super(createInitialState());
    }


    public setFraccion(fraccion: string) {
        this.update((state) => ({
            ...state,
            fraccion,
        }));
    }
    public setCantidad(cantidad: string) {
        this.update((state) => ({
            ...state,
            cantidad,
        }));
    }
    public setFactura(factura: string) {
        this.update((state) => ({
            ...state,
            factura,
        }));
    }
    public setUmt(umt: string) {
        this.update((state) => ({
            ...state,
            umt,
        }));
    }
    public setMercanciaCantidad(mercanciaCantidad: string) {
        this.update((state) => ({
            ...state,
            mercanciaCantidad,
        }));
    }
    public setMercanciaFactura(mercanciaFactura: string) {
        this.update((state) => ({
            ...state,
            mercanciaFactura,
        }));
    }
    public setDescripcion(descripcion: string) {
        this.update((state) => ({
            ...state,
            descripcion,
        }));
    }
    public setEspecifico(especifico: string) {
        this.update((state) => ({
            ...state,
            especifico,
        }));
    }
    public setJustificacion(justificacion: string) {
        this.update((state) => ({
            ...state,
            justificacion,
        }));
    }
    public setObservaciones(observaciones: string) {
        this.update((state) => ({
            ...state,
            observaciones,
        }));
    }
    public setEntidad(entidad: string) {
        this.update((state) => ({
            ...state,
            entidad,
        }));
    }
    public setRepresentacion(representacion: string) {
        this.update((state) => ({
            ...state,
            representacion,
        }));
    }
    public setBloque(bloque: string) {
        this.update((state) => ({
            ...state,
            bloque,
        }));
    }

    public setRegimen(regimen: string) {
        this.update((state) => ({
            ...state,
            regimen,
        }));
    }

    public setClasificacion(clasificacion: string) {
        this.update((state) => ({
            ...state,
            clasificacion,
        }));
    }

    public setSolicitudDescripcion(solicitudDescripcion: string) {
        this.update((state) => ({
            ...state,
            solicitudDescripcion,
        }));
    }
    public setDisponible(disponible: string) {
        this.update((state) => ({
            ...state,
            disponible,
        }));
    }
    public setSeleccionado(seleccionado: string) {
        this.update((state) => ({
            ...state,
            seleccionado,
        }));
    }
    
    public setSolicitud(solicitud: string) {
        this.update((state) => ({
            ...state,
            solicitud,
        }));
    }
    public setProducto(producto: string) {
        this.update((state) => ({
            ...state,
            producto,
        }));
    }
    updateSelectRangoDias(selectRangoDias: string[]) {
        this.update({ selectRangoDias });
      }
  

}



