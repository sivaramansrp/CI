import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite5601State {
    tieneCertificacion:boolean,
    certificacionEmpresa: string, 
    otraCertificacion: string

}

export function createInitialState(): Tramite5601State {
    return {
        tieneCertificacion: false,
        certificacionEmpresa: '',
        otraCertificacion: ''
}
}


@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'tramite5601', resettable: true })
export class Tramite5601Store extends Store<Tramite5601State> {

    constructor() {
        super(createInitialState());
    }

    public setTieneCertificacion(tieneCertificacion: boolean): void {
        this.update((state) => ({
            ...state,
            tieneCertificacion,
        }));
    }

    public setCertificacionEmpresa(certificacionEmpresa: string): void {
        this.update((state) => ({
            ...state,
            certificacionEmpresa,
        }));
    }

    public setOtraCertificacion(otraCertificacion: string): void {
        this.update((state) => ({
            ...state,
            otraCertificacion,
        }));
    }

}