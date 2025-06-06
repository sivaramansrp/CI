import { ConsultaSocioExtranjeroFisica, ConsultaSocioExtranjeroMoral } from "../application/core/models/consulta-socio-extranjero.model";
import { Store, StoreConfig } from "@datorama/akita";
import { ConsultaSocioNacional } from "../application/core/models/consulta-socio-nacional.model";
import { Injectable } from "@angular/core";

export interface AccionistaStore {
    tipoNacionalidad: boolean;
    personaNacional: string;
    rfc: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    pais: string;
    codigoPostal: string;
    estado: string;
    razonSocial: string;
    accionistaNacional: ConsultaSocioNacional;
    listaAccionistasNacionales: ConsultaSocioNacional[];
    accionistaExtranjeroFisica: ConsultaSocioExtranjeroFisica;
    listaAccionistasExtranjeros: ConsultaSocioExtranjeroMoral[];
    accionistaExtranjeroMoral: ConsultaSocioExtranjeroMoral;
    listaAccionistasExtranjerosMoral?: ConsultaSocioExtranjeroMoral[];
    visaulizarTablas: boolean;
    registrarDatos: boolean;
    accionistaNacionalSeleccionado: ConsultaSocioExtranjeroMoral[];
    accionistaExtranjeroSeleccionado: ConsultaSocioExtranjeroMoral[];
}
export function createInitialState(): AccionistaStore {
    return {
        tipoNacionalidad: true,
        personaNacional: 'fisica',
        rfc: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        pais: '',
        codigoPostal: '',
        estado: '',
        razonSocial: '',
        accionistaNacional: {
            rfc: '',
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            nacionalidad: '',
            tipoPersona: ''
        },
        listaAccionistasNacionales: [],
        accionistaExtranjeroFisica: {
            razonSocial: '',
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            pais: '',
            codigoPostal: '',
            estado: '',
            calle: '',
            numeroInterior: '',
            numeroExterior: '',
            numeroSeguroSocial: '',
            numeroIdentificacionFiscal: ''
        },
        listaAccionistasExtranjeros: [],
        accionistaExtranjeroMoral: {
            razonSocial: '',
            pais: '',
            codigoPostal: '',
            estado: '',
            calle: '',
            numeroInterior: '',
            numeroExterior: ''
        },
        listaAccionistasExtranjerosMoral: [],
        visaulizarTablas: false,
        registrarDatos: false,
        accionistaNacionalSeleccionado: [],
        accionistaExtranjeroSeleccionado: []
    }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'AccionistaStore', resettable: true })
export class AccionistaStoreService extends Store<AccionistaStore> {
    private state: AccionistaStore = createInitialState();

    constructor() {
        super(createInitialState());
    }

    getState(): AccionistaStore {
        return this.state;
    }

    updateState(newState: Partial<AccionistaStore>): void {
        this.state = { ...this.state, ...newState };
    }

    resetState(): void {
        this.state = createInitialState();
        this.update(this.state);
    }


    public setsocioAccionistaNacional(accionistaNacional: ConsultaSocioNacional): void {
        this.update((state) => ({
            ...state,
            accionistaNacional,
        }));
    }

    public setVisualizarTabla(visualizarTabla: boolean): void {
        this.update((state) => ({
            ...state,
            visualizarTabla,
        }));
    }

    public setRegistraDatosNacional(registrarDatos: boolean): void {
        this.update((state) => ({
            ...state,
            registrarDatos,
        }));
    }

    public setListaSociosNacionales(listaAccionistasNacionales: ConsultaSocioNacional[]): void {
            this.update((state) => ({
                ...state,
                listaAccionistasNacionales,
            }));
        }

}