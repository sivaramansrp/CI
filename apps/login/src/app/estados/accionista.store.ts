import { ConsultaSocioExtranjeroFisica, ConsultaSocioExtranjeroMoral } from "../application/core/models/consulta-socio-extranjero.model";
import { Store, StoreConfig } from "@datorama/akita";
import { ConsultaSocioAccionista } from "../application/core/models/consulta-socio-accionista.model";
import { ConsultaSocioNacional } from "../application/core/models/consulta-socio-nacional.model";
import { Injectable } from "@angular/core";

export interface AccionistaStore {
    tipoNacionalidad: boolean;
    personaNacional: string;
    rfc: string;
    nombre: string;
    apellidoPaterno: string;
    pais: string;
    codigoPostal: string;
    estado: string;
    razonSocial: string;
    accionistaNacional: ConsultaSocioNacional;
    listaAccionistasNacionales: ConsultaSocioNacional[];
    accionistaExtranjeroFisica: ConsultaSocioExtranjeroFisica;
    listaAccionistasExtranjeros: ConsultaSocioAccionista[];
    accionistaExtranjeroMoral: ConsultaSocioExtranjeroMoral;
    listaAccionistasExtranjerosMoral?: ConsultaSocioExtranjeroMoral[];
    visaulizarTablas: boolean;
    accionistaNacionalSeleccionado: ConsultaSocioAccionista[];
    accionistaExtranjeroSeleccionado: ConsultaSocioAccionista[];
}
export function createInitialState(): AccionistaStore {
    return {
        tipoNacionalidad: true,
        personaNacional: 'fisica',
        rfc: '',
        nombre: '',
        apellidoPaterno: '',
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

}