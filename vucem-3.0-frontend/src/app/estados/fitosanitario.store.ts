import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { createDatosState, ListaDeDatosFinal } from '../core/models/220202/fitosanitario.model';



@Injectable({
    providedIn: 'root',
})
@StoreConfig({ name: 'seccion', resettable: true })
export class FitosanitarioStore extends Store<ListaDeDatosFinal> {
    constructor() {
        super(createDatosState());
    }

    /**
     * Actualiza el estado con la información de la sección.
     * @param seccion Estado de validación de las secciones.
     */
    public establecerSeccion(seccion: any[]): void {
        this.update(state => ({
            ...state,
            seccion,
        }));
    }

    /**
     * Establece si cada formulario es válido o no.
     * @param formaValida Array de booleanos indicando validez de formularios.
     */
    public establecerFormaValida(formaValida: any[]): void {
        this.update(state => ({
            ...state,
            formaValida,
        }));
    }

    /**
     * Restablece el estado a su estado inicial.
     */
    public limpiarSeccion(): void {
        this.reset();
    }
}
