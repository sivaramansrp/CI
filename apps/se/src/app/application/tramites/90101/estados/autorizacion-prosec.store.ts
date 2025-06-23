import { Store, StoreConfig } from '@datorama/akita';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Injectable } from '@angular/core';

/**
 * @descripcion
 * Interfaz que define la estructura del estado para la autorización PROSEC.
 */
export interface ProsecState {
    /**
     * @descripcion Modalidad seleccionada en el trámite.
     */
    modalidad: string;
    /**
     * @descripcion Lista de estados seleccionados.
     */
    Estado: Catalogo[];
    /**
     * @descripcion Lista de representaciones federales seleccionadas.
     */
    RepresentacionFederal: Catalogo[];
    /**
     * @descripcion Lista de actividades productivas seleccionadas.
     */
    ActividadProductiva: Catalogo[];
    /**
     * @descripcion Lista de sectores seleccionados.
     */
    Sector: Catalogo[];
    /**
     * @descripcion Fracción arancelaria seleccionada.
     */
    Fraccion_arancelaria: string;
    /**
     * @descripcion Contribuyentes registrados.
     */
    contribuyentes: string;
    /**
     * @descripcion Estado de validez del formulario.
     */
    domiciliosFormaValida: boolean;
        /**
     * @property {boolean} productorFromValida
     * @description
     * Indica si el formulario de productor ha sido validado correctamente.
     * Se utiliza para controlar la habilitación de acciones o la navegación en el trámite según la validez de la sección de productor.
     */
    productorFromValida: boolean;
    /**
     * @property {boolean} sectoresFromValida
     * @description
     * Indica si el formulario de sectores ha sido validado correctamente.
     * Permite gestionar la lógica de validación y flujo del trámite en la sección de sectores.
     */
    sectoresFromValida: boolean;
}

/**
 * @descripcion
 * Función que retorna el estado inicial para la autorización PROSEC.
 */
export function createInitialState(): ProsecState {
    return {
        modalidad: '',
        Estado: [],
        RepresentacionFederal: [],
        ActividadProductiva: [],
        Sector: [],
        Fraccion_arancelaria: '',
        contribuyentes: '',
        domiciliosFormaValida: false,
        productorFromValida: false,
        sectoresFromValida: false,
    }
}

/**
 * @descripcion
 * Store encargado de gestionar el estado de la autorización PROSEC.
 * Permite actualizar y consultar los datos relacionados con el trámite de autorización PROSEC.
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
     * @descripcion
     * Actualiza el estado con la modalidad seleccionada.
     * @param modalidad Modalidad seleccionada.
     */
    public setModalidad(modalidad: string): void {
        this.update((state) => ({
            ...state,
            modalidad,
        }));
    }

    /**
     * @descripcion
     * Actualiza el estado con la información de los estados seleccionados.
     * @param Estado Lista de estados seleccionados.
     */
    public setEstado(Estado: Catalogo[]): void {
        this.update((state) => ({
            ...state,
            Estado,
        }));
    }

    /**
     * @descripcion
     * Actualiza el estado con la información de la representación federal seleccionada.
     * @param RepresentacionFederal Lista de representaciones federales seleccionadas.
     */
    public setRepresentacionFederal(RepresentacionFederal: Catalogo[]): void {
        this.update((state) => ({
            ...state,
            RepresentacionFederal,
        }));
    }

    /**
     * @descripcion
     * Actualiza el estado con la información de la actividad productiva seleccionada.
     * @param ActividadProductiva Lista de actividades productivas seleccionadas.
     */
    public setActividadProductiva(ActividadProductiva: Catalogo[]): void {
        this.update((state) => ({
            ...state,
            ActividadProductiva,
        }));
    }

    /**
     * @descripcion
     * Actualiza el estado con la información de los sectores seleccionados.
     * @param Sector Lista de sectores seleccionados.
     */
    public setSector(Sector: Catalogo[]): void {
        this.update((state) => ({
            ...state,
            Sector,
        }));
    }

    /**
     * @descripcion
     * Actualiza el estado con la fracción arancelaria seleccionada.
     * @param Fraccion_arancelaria Fracción arancelaria seleccionada.
     */
    public setFraccionArancelaria(Fraccion_arancelaria: string): void {
        this.update((state) => ({
            ...state,
            Fraccion_arancelaria,
        }));
    }

    /**
     * @descripcion
     * Actualiza el estado con los contribuyentes registrados.
     * @param contribuyentes Contribuyentes registrados.
     */
    public setcontribuyentes(contribuyentes: string): void {
        this.update((state) => ({
            ...state,
            contribuyentes,
        }));
    }

    /**
     * @descripcion
     * Actualiza el estado de validez del formulario.
     * @param domiciliosFormaValida Lista que indica el estado de validez del formulario.
     */
    public setDomiciliosFormaValida(domiciliosFormaValida: boolean): void {
        this.update((state) => ({
            ...state,
            domiciliosFormaValida,
        }))
    }

    /**
     * @descripcion
     * Actualiza el estado de validez del formulario de productor.
     * @param productorFromValida Lista que indica el estado de validez del formulario de productor.
     */
    public setProductorFromValida(productorFromValida: boolean): void {
        this.update((state) => ({
            ...state,
            productorFromValida,
        }))
    }
    /**
     * @descripcion
     * Actualiza el estado de validez del formulario de sectores.
     * @param sectoresFromValida Lista que indica el estado de validez del formulario de sectores.
     */
    public setSectoresFromValida(sectoresFromValida: boolean): void {
        this.update((state) => ({
            ...state,
            sectoresFromValida,
        }))
    }


}