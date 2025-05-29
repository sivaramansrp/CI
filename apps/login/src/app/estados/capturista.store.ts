import { Store, StoreConfig } from "@datorama/akita";
import { Capturista } from "../application/core/models/capturista.model";
import { Injectable } from "@angular/core";

export interface CapturistaStore {
    rfc: string;
    curp: string;
    listaCapturistas: Capturista[];
    consultaCapturista: Capturista;
    registrarDatos: boolean;
    visualizarTabla: boolean;
}
export function createInitialState(): CapturistaStore {
    return {
        rfc: '',
        curp: '',
        listaCapturistas: [],
        consultaCapturista: {
            idCapturista: 0,
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            rfc: '',
            curp: ''
        },
        registrarDatos: false,
        visualizarTabla: false
    };
}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'CapturistaStore', resettable: true })
export class CapturistaStoreService extends Store<CapturistaStore> {
    private state: CapturistaStore = createInitialState();
    constructor() {
        super(createInitialState());
    }

    getState(): CapturistaStore {
        return this.state;
    }

    setState(newState: Partial<CapturistaStore>): void {
        this.state = { ...this.state, ...newState };
    }

    resetStore(): void {
        this.state = createInitialState();
    }

    public setValorRFC(rfc: string): void {
        this.update((state) => ({
            ...state,
            rfc,
        }));
    }

    public setValorCURP(curp: string): void {
        this.update((state) => ({
            ...state,
            curp,
        }));
    }

    public setConsultaCapturista(consultaCapturista: Capturista): void {
            this.update((state) => ({
                ...state,
                consultaCapturista,
            }));
        }
}