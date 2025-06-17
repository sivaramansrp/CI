import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ProsecState {
    modalidad: string;
    Estado: string;
    RepresentacionFederal: string;
    ActividadProductiva: string;
    Sector: string;
    Fraccion_arancelaria: string;
    contribuyentes: string;
    formaValida: string;
}

export function createInitialState(): ProsecState {
    return {
        modalidad: '',
        Estado: '',
        RepresentacionFederal: '',
        ActividadProductiva: '',
        Sector: '',
        Fraccion_arancelaria: '',
        contribuyentes: '',
        formaValida: ''
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
    public setModalidad(modalidad: string): void {
        this.update((state) => ({
            ...state,
            modalidad, // Wraps the data in an array
        }));
    }

    /**
     * Updates the state with the information of plants.
     * @param Plantas Data of plants.
     */
    public setEstado(Estado: string): void {
        this.update((state) => ({
            ...state,
            Estado, // Wraps the data in an array
        }));
    }

    /**
     * Actualiza el campo 'RepresentacionFederal' en el estado.
     * @param RepresentacionFederal Valor de la representación federal a establecer.
     */
    public setRepresentacionFederal(RepresentacionFederal: string): void {
        this.update((state) => ({
            ...state,
            RepresentacionFederal,
        }));
    }

    /**
     * Actualiza el campo 'ActividadProductiva' en el estado.
     * @param ActividadProductiva Valor de la actividad productiva a establecer.
     */
    public setActividadProductiva(ActividadProductiva: string): void {
        this.update((state) => ({
            ...state,
            ActividadProductiva,
        }));
    }

    /**
     * Actualiza el campo 'Sector' en el estado.
     * @param Sector Valor del sector a establecer.
     */
    public setSector(Sector: string): void {
        this.update((state) => ({
            ...state,
            Sector,
        }));
    }

    /**
     * Actualiza el campo 'Fraccion_arancelaria' en el estado.
     * @param Fraccion_arancelaria Valor de la fracción arancelaria a establecer.
     */
    public setFraccionArancelaria(Fraccion_arancelaria: string): void {
        this.update((state) => ({
            ...state,
            Fraccion_arancelaria,
        }));
    }

    /**
     * Actualiza el campo 'contribuyentes' en el estado.
     * @param contribuyentes Valor de los contribuyentes a establecer.
     */
    public setcontribuyentes(contribuyentes: string): void {
        this.update((state) => ({
            ...state,
            contribuyentes,
        }));
    }

    /**
     * Actualiza el campo 'formaValida' en el estado.
     * @param formaValida Valor de la forma válida a establecer.
     */
    public setFormaValida(formaValida: string): void {
        this.update((state) => ({
            ...state,
            formaValida,
        }))
    }
}