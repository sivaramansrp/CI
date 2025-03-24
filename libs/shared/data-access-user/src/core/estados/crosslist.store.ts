import { Store, StoreConfig } from "@datorama/akita";
import { Injectable } from "@angular/core";

export interface CrosslistState {
    fechas: string[];
    fechasDatos: string[];
    fechasSeleccionadas: string[];
}

export function createInitialState(): CrosslistState {
    return {
        fechas: [],
        fechasDatos: [],
        fechasSeleccionadas: []
    };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'crosslist', resettable: true })
export class CrosslistStore extends Store<CrosslistState> {
    constructor() {
        super(createInitialState());
    }

    public establecerFechas(fechas: string[]): void {
        this.update(state => ({
            ...state,
            fechas
        }));
    }

    public establecerFechasDatos(fechasDatos: string[]): void {
        this.update(state => ({
            ...state,
            fechasDatos
        }));
    }

    public establecerFechasSeleccionadas(fechasSeleccionadas: string[]): void {
        this.update(state => ({
            ...state,
            fechasSeleccionadas
        }));
    }

    public limpiarCrosslist(): void {
        this.reset();
    }

}