import { ListaDeDatosFinal, Plantas, SectoresYMercancias, createDatosState } from '../models/prosec.module';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src';

export interface ProsecState {
    modalidad: string;
    Estado: Catalogo[];
    RepresentacionFederal: Catalogo[];
    ActividadProductiva: Catalogo[];
    Sector: Catalogo[];
    Fraccion_arancelaria: string;
    contribuyentes: string;
    formaValida: Catalogo[];
}

export function createInitialState(): ProsecState {
    return {
        modalidad: '',
        Estado: [],
        RepresentacionFederal: [],
        ActividadProductiva: [],
        Sector: [],
        Fraccion_arancelaria: '',
        contribuyentes: '',
        formaValida: []
    }
}
/**
 * Store to manage the state of Prosec authorization.
 */
@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class AutorizacionProsecStore extends Store<ProsecState> {
    constructor() {
        super(createInitialState());
    }

    /**
     * Updates the state with the information of sectors and goods.
     * @param sectoresYMercancias Data of sectors and goods.
     */
    public setModalidad(modalidad: string) {
        this.update((state) => ({
            ...state,
            modalidad, // Wraps the data in an array
        }));
    }

    /**
     * Updates the state with the information of plants.
     * @param Plantas Data of plants.
     */
    public setEstado(Estado: Catalogo[]) {
        this.update((state) => ({
            ...state,
            Estado, // Wraps the data in an array
        }));
    }

    public setRepresentacionFederal(RepresentacionFederal: Catalogo[]) {
        this.update((state) => ({
            ...state,
            RepresentacionFederal,
        }));
    }

    public setActividadProductiva(ActividadProductiva: Catalogo[]) {
        this.update((state) => ({
            ...state,
            ActividadProductiva,
        }));
    }

    public setSector(Sector: Catalogo[]) {
        this.update((state) => ({
            ...state,
            Sector,
        }));
    }

    public setFraccionArancelaria(Fraccion_arancelaria: string) {
        this.update((state) => ({
            ...state,
            Fraccion_arancelaria,
        }));
    }

    public setcontribuyentes(contribuyentes: string) {
        this.update((state) => ({
            ...state,
            contribuyentes,
        }));
    }

    public setFormaValida(formaValida: Catalogo[]){
        this.update((state) => ({
            ...state,
            formaValida,
        }))
    }
}