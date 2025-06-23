import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

import { CAATRegistradoEmpresaForm, CandidatoModificarCaatForm } from '../../../tramites/40202/models/modificacion-transportacion-maritima.model';

/**
 * Interfaz que define el estado del trámite 40202.
 * @interface TransportacionMaritima40202State
 */
export interface TransportacionMaritima40202State {
    /**
     * Tipo de empresa seleccionada.
     * @type {string}
     */
    tipoDeEmpresaOpcion?: string | number;

    /**
     * RFC de la tipo de empresa para buscar.
     * @type {string}
     */
    buscarPorRFCNa?: string;

    /**
     * Denominación de la tipo de empresa para buscar Nacional.
     * @type {string}
     */
    buscarPorDenominacionNa?: string;

    /**
     * Folio CAAT de la tipo de empresa para buscar Nacional.
     * @type {string}
     */
    folioCaatBusquedaNa?: string;

    /**
     * Denominación de la tipo de empresa para buscar Extranjera.
     * @type {string}
     */
    buscarPorDenominacionEx?: string;

    /**
     * Folio CAAT de la tipo de empresa para buscar Extranjera.
     * @type {string}
     */
    folioCaatBusquedaEx?: string;

    /**
     * Tabla de empresas CAAT registradas.
     * @type {CAATRegistradoEmpresaForm[]}
     */
    caatRegistradoEmpresaTabla?: CAATRegistradoEmpresaForm[];

    /**
     * Tabla de candidatos a modificar CAAT.
     * @type {CandidatoModificarCaatForm[]}
     */
    candidatoModificarCaatTabla?: CandidatoModificarCaatForm[];

    /**
     * Número de seguro social de la persona física extranjera.
     * @type {string}
     */
    seguroNumero?: string;

    /**
     * Nombre de la persona física extranjera.
     * @type {string}
     */
    nombrePFE?: string;

    /**
     * Apellido paterno de la persona física extranjera.
     * @type {string}
     */
    apellidoPaternoPFE?: string;

    /**
     * Apellido materno de la persona física extranjera.
     * @type {string}
     */
    apellidoMaternoPFE?: string;

    /**
     * Correo electrónico de la persona física extranjera.
     * @type {string}
     */
    correoPFE?: string;

    /**
     * País de la persona física extranjera.
     * @type {string}
     */
    paisPFE?: string;

    /**
     * Código postal de la persona física extranjera.
     * @type {string}
     */
    codigoPostalPFE?: string;

    /**
     * Ciudad de la persona física extranjera.
     * @type {string}
     */
    ciudadPFE?: string;

    /**
     * Estado de la persona física extranjera.
     * @type {string}
     */
    estadoPFE?: string;

    /**
     * Calle de la persona física extranjera.
     * @type {string}
     */
    callePFE?: string;

    /**
     * Número exterior de la persona física extranjera.
     * @type {string}
     */
    numeroExteriorPFE?: string;

    /**
     * Número interior de la persona física extranjera.
     * @type {string}
     */
    numeroInteriorPFE?: string;

    /**
     * Indica si se debe mostrar el botón de agregar seleccionado.
     * @type {boolean}
     */
    mostrarAgregarSeleccionado?: boolean;
}

/**
 * Crea el estado inicial del trámite 40202.
 * @returns Estado inicial de tipo `TransportacionMaritima40202State`.
 */
export function createInitialState(): TransportacionMaritima40202State {
    return {
        tipoDeEmpresaOpcion: '1',
        buscarPorRFCNa: '',
        buscarPorDenominacionNa: '',
        folioCaatBusquedaNa: '',
        buscarPorDenominacionEx: '',
        folioCaatBusquedaEx: '',

        caatRegistradoEmpresaTabla: [],
        candidatoModificarCaatTabla: [],

        seguroNumero: '',
        nombrePFE: '',
        apellidoPaternoPFE: '',
        apellidoMaternoPFE: '',
        correoPFE: '',
        paisPFE: '',
        codigoPostalPFE: '',
        ciudadPFE: '',
        estadoPFE: '',
        callePFE: '',
        numeroExteriorPFE: '',
        numeroInteriorPFE: '',

        mostrarAgregarSeleccionado: true
    };
}

/**
 * Servicio de estado global para gestionar el trámite 40202 con Akita.
 */
@Injectable({
    providedIn: 'root',
})

/**
 * Configuración de la tienda Akita para el trámite 40202 con opción de reinicio.
 */
@StoreConfig({ name: 'tramite40202', resettable: true })
export class Tramite40202Store extends Store<TransportacionMaritima40202State> {
    /**
     * Constructor que inicializa el estado con los valores predeterminados.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Establece el tipo de empresa seleccionada en el estado.
     * @param tipoDeEmpresaOpcion - Tipo de empresa seleccionada.
     * @description Establece el tipo de empresa seleccionada en el estado.
     */
    public setTipoDeEmpresaOpcion(tipoDeEmpresaOpcion: string | number): void {
        this.update((state) => ({
            ...state,
            tipoDeEmpresaOpcion,
        }));
    }

    /**
     * Establece el RFC de la tipo de empresa para buscar en el estado.
     * @param buscarPorRFCNa - RFC de la tipo de empresa para buscar.
     * @description Establece el RFC de la tipo de empresa para buscar en el estado.
     */
    public setBuscarPorRFCNa(buscarPorRFCNa: string): void {
        this.update((state) => ({
            ...state,
            buscarPorRFCNa,
        }));
    }

    /**
     * Establece la denominación de la tipo de empresa para buscar en el estado.
     * @param buscarPorDenominacionNa - Denominación de la tipo de empresa para buscar.
     * @description Establece la denominación de la tipo de empresa para buscar en el estado.
     */
    public setBuscarPorDenominacionNa(buscarPorDenominacionNa: string): void {
        this.update((state) => ({
            ...state,
            buscarPorDenominacionNa,
        }));
    }

    /**
     * Establece el folio CAAT de la tipo de empresa para buscar en el estado.
     * @param folioCaatBusquedaNa - Folio CAAT de la tipo de empresa para buscar.
     * @description Establece el folio CAAT de la tipo de empresa para buscar en el estado.
     */
    public setFolioCaatBusquedaNa(folioCaatBusquedaNa: string): void {
        this.update((state) => ({
            ...state,
            folioCaatBusquedaNa,
        }));
    }

    /**
     * Establece la denominación de la tipo de empresa para buscar en el estado.
     * @param buscarPorDenominacionEx - Denominación de la tipo de empresa para buscar.
     * @description Establece la denominación de la tipo de empresa para buscar en el estado.
     */
    public setBuscarPorDenominacionEx(buscarPorDenominacionEx: string): void {
        this.update((state) => ({
            ...state,
            buscarPorDenominacionEx,
        }));
    }

    /**
     * Establece el folio CAAT de la tipo de empresa para buscar en el estado.
     * @param folioCaatBusquedaEx - Folio CAAT de la tipo de empresa para buscar.
     * @description Establece el folio CAAT de la tipo de empresa para buscar en el estado.
     */
    public setFolioCaatBusquedaEx(folioCaatBusquedaEx: string): void {
        this.update((state) => ({
            ...state,
            folioCaatBusquedaEx,
        }));
    }

    /**
     * Establece la tabla de CAAT registrado empresa en el estado.
     * @param caatRegistradoEmpresaTabla - Tabla de CAAT registrado empresa.
     * @description Establece la tabla de CAAT registrado empresa en el estado.
     */
    public setCaatRegistradoEmpresaTabla(caatRegistradoEmpresaTabla: CAATRegistradoEmpresaForm[]): void {
        this.update((state) => ({
            ...state,
            caatRegistradoEmpresaTabla,
        }));
    }

    /**
     * Establece la tabla de candidatos a modificar CAAT en el estado.
     * @param candidatoModificarCaatTabla - Tabla de candidatos a modificar CAAT.
     * @description Establece la tabla de candidatos a modificar CAAT en el estado.
     */
    public setCandidatoModificarCaatTabla(candidatoModificarCaatTabla: CandidatoModificarCaatForm[]): void {
        this.update((state) => ({
            ...state,
            candidatoModificarCaatTabla,
        }));
    }

    /**
     * Establece el número de seguro social de la persona física extranjera en el estado.
     * @param seguroNumero - Número de seguro social de la persona física extranjera.
     * @description Establece el número de seguro social de la persona física extranjera en el estado.
     */
    public setSeguroNumero(seguroNumero: string): void {
        this.update((state) => ({
            ...state,
            seguroNumero,
        }));
    }

    /**
     * Establece el nombre de la persona física extranjera en el estado.
     * @param nombrePFE - Nombre de la persona física extranjera.
     * @description Establece el nombre de la persona física extranjera en el estado.
     */
    public setNombrePFE(nombrePFE: string): void {
        this.update((state) => ({
            ...state,
            nombrePFE,
        }));
    }

    /**
     * Establece el apellido paterno de la persona física extranjera en el estado.
     * @param apellidoPaternoPFE - Apellido paterno de la persona física extranjera.
     * @description Establece el apellido paterno de la persona física extranjera en el estado.
     */
    public setApellidoPaternoPFE(apellidoPaternoPFE: string): void {
        this.update((state) => ({
            ...state,
            apellidoPaternoPFE,
        }));
    }

    /**
     * Establece el apellido materno de la persona física extranjera en el estado.
     * @param apellidoMaternoPFE - Apellido materno de la persona física extranjera.
     * @description Establece el apellido materno de la persona física extranjera en el estado.
     */
    public setApellidoMaternoPFE(apellidoMaternoPFE: string): void {
        this.update((state) => ({
            ...state,
            apellidoMaternoPFE,
        }));
    }

    /**
     * Establece el correo electrónico de la persona física extranjera en el estado.
     * @param correoPFE - Correo electrónico de la persona física extranjera.
     * @description Establece el correo electrónico de la persona física extranjera en el estado.
     */
    public setCorreoPFE(correoPFE: string): void {
        this.update((state) => ({
            ...state,
            correoPFE,
        }));
    }

    /**
     * Establece el país de la persona física extranjera en el estado.
     * @param paisPFE - País de la persona física extranjera.
     * @description Establece el país de la persona física extranjera en el estado.
     */
    public setPaisPFE(paisPFE: string): void {
        this.update((state) => ({
            ...state,
            paisPFE,
        }));
    }

    /**
     * Establece el código postal de la persona física extranjera en el estado.
     * @param codigoPostalPFE - Código postal de la persona física extranjera.
     * @description Establece el código postal de la persona física extranjera en el estado.
     */
    public setCodigoPostalPFE(codigoPostalPFE: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalPFE,
        }));
    }

    /**
     * Establece la ciudad de la persona física extranjera en el estado.
     * @param ciudadPFE - Ciudad de la persona física extranjera.
     * @description Establece la ciudad de la persona física extranjera en el estado.
     */
    public setCiudadPFE(ciudadPFE: string): void {
        this.update((state) => ({
            ...state,
            ciudadPFE,
        }));
    }

    /**
     * Establece el estado de la persona física extranjera en el estado.
     * @param estadoPFE - Estado de la persona física extranjera.
     * @description Establece el estado de la persona física extranjera en el estado.
     */
    public setEstadoPFE(estadoPFE: string): void {
        this.update((state) => ({
            ...state,
            estadoPFE,
        }));
    }

    /**
     * Establece la calle de la persona física extranjera en el estado.
     * @param callePFE - Calle de la persona física extranjera.
     * @description Establece la calle de la persona física extranjera en el estado.
     */
    public setCallePFE(callePFE: string): void {
        this.update((state) => ({
            ...state,
            callePFE,
        }));
    }

    /**
     * Establece el número exterior de la persona física extranjera en el estado.
     * @param numeroExteriorPFE - Número exterior de la persona física extranjera.
     * @description Establece el número exterior de la persona física extranjera en el estado.
     */
    public setNumeroExteriorPFE(numeroExteriorPFE: string): void {
        this.update((state) => ({
            ...state,
            numeroExteriorPFE,
        }));
    }

    /**
     * Establece el número interior de la persona física extranjera en el estado.
     * @param numeroInteriorPFE - Número interior de la persona física extranjera.
     * @description Establece el número interior de la persona física extranjera en el estado.
     */
    public setNumeroInteriorPFE(numeroInteriorPFE: string): void {
        this.update((state) => ({
            ...state,
            numeroInteriorPFE,
        }));
    }

    /**
     * Establece si se debe mostrar el botón de agregar seleccionado en el estado.
     * @param mostrarAgregarSeleccionado - Indica si se debe mostrar el botón de agregar seleccionado.
     * @description Establece si se debe mostrar el botón de agregar seleccionado en el estado.
     */
    public setMostrarAgregarSeleccionado(mostrarAgregarSeleccionado: boolean): void {
        this.update((state) => ({
            ...state,
            mostrarAgregarSeleccionado,
        }));
    }

    /**
     * Actualiza el estado de la consulta de transportación marítima.
     * @param nuevoDatos - Nuevo estado de tipo `TransportacionMaritima40202State`.
     * @description Actualiza el estado de la consulta de transportación marítima con los nuevos datos proporcionados.
     */
    public setConsultaTransportacionMaritimaState(nuevoDatos: TransportacionMaritima40202State): void {
        this.update(nuevoDatos);
    }
}
