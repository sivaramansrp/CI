import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { CAATRegistradoEmpresaForm, PersonaFisicaExtranjeraForm, PersonaFisicaNacionalForm, PersonaMoralExtranjeraForm, PersonaMoralNacionalForm } from '../../../tramites/40201/models/transportacion-maritima.model';

export interface TransportacionMaritima40201State {
    /**
     * RFC de la persona física nacional.
     * @type {string}
     */
    buscarRfcPFN: string;

    /**
     * RFC de la persona física nacional.
     * @type {string}
     */
    rfcPFN: string;

    /**
     * Nombre de la persona física nacional.
     * @type {string}
     */
    nombrePFN: string;

    /**
     * Apellido paterno de la persona física nacional.
     * @type {string}
     */
    apellidoPaternoPFN: string;

    /**
     * Apellido materno de la persona física nacional.
     * @type {string}
     */
    apellidoMaternoPFN: string;

    /**
     * Pais de la persona física nacional.
     * @type {string}
     */
    paisPFN: string;

    /**
     * Código postal de la persona física nacional.
     * @type {string}
     */
    codigoPostalPFN?: string;

    /**
     * Estado de la persona física nacional.
     * @type {string}
     */
    estadoPFN?: string;

    /**
     * Municipio de la persona física nacional.
     * @type {string}
     */
    municipioPFN?: string;

    /**
     * Localidad de la persona física nacional.
     * @type {string}
     */
    localidadPFN?: string;

    /**
     * Calle de la persona física nacional.
     * @type {string}
     */
    callePFN?: string;

    /**
     * Colonia de la persona física nacional.
     * @type {string}
     */
    coloniaPFN?: string;

    /**
     * Número exterior de la persona física nacional.
     * @type {string}
     */
    numeroExteriorPFN?: string;

    /**
     * Número interior de la persona física nacional.
     * @type {string}
     */
    numeroInteriorPFN?: string;

    /**
     * RFC de la persona moral nacional.
     * @type {string}
     */
    buscarRfcPMN?: string;

    /**
     * RFC de la persona moral nacional.
     * @type {string}
     */
    rfcPMN?: string;

    /**
     * Denominación de la persona moral nacional.
     * @type {string}
     */
    denominacionPMN?: string;

    /**
     * Correo electrónico de la persona moral nacional.
     * @type {string}
     */
    correoPMN?: string;

    /**
     * País de la persona moral nacional.
     * @type {string}
     */
    paisPMN?: string;

    /**
     * Código postal de la persona moral nacional.
     * @type {string}
     */
    codigoPostalPMN?: string;

    /**
     * Estado de la persona moral nacional.
     * @type {string}
     */
    estadoPMN?: string;

    /**
     * Municipio de la persona moral nacional.
     * @type {string}
     */
    municipioPMN?: string;

    /**
     * Localidad de la persona moral nacional.
     * @type {string}
     */
    localidadPMN?: string;

    /**
     * Colonia de la persona moral nacional.
     * @type {string}
     */
    coloniaPMN?: string;

    /**
     * Calle de la persona moral nacional.
     * @type {string}
     */
    callePMN?: string;

    /**
     * Número exterior de la persona moral nacional.
     * @type {string}
     */
    numeroExteriorPMN?: string;

    /**
     * Número interior de la persona moral nacional.
     * @type {string}
     */
    numeroInteriorPMN?: string;

    /**
     * Nombre del director general de la persona moral nacional.
     * @type {string}
     */
    nombreDirectorGeneral?: string;

    /**
     * Apellido paterno del director general de la persona moral nacional.
     * @type {string}
     */
    apellidoPaternoDirectorGeneral?: string;

    /**
     * Apellido materno del director general de la persona moral nacional.
     * @type {string}
     */
    apellidoMaternoDirectorGeneral?: string;

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
     * Denominación de la persona moral extranjera.
     * @type {string}
     */
    denominacionPME?: string;

    /**
     * Correo electrónico de la persona moral extranjera.
     * @type {string}
     */
    correoPME?: string;

    /**
     * País de la persona moral extranjera.
     * @type {number | string}
     */
    paisPME?: number | string;

    /**
     * Código postal de la persona moral extranjera.
     * @type {string}
     */
    codigoPostalPME?: string;

    /**
     * Ciudad de la persona moral extranjera.
     * @type {string}
     */
    ciudadPME?: string;

    /**
     * Estado de la persona moral extranjera.
     * @type {string}
     */
    estadoPME?: string;

    /**
     * Calle de la persona moral extranjera.
     * @type {string}
     */
    callePME?: string;

    /**
     * Número exterior de la persona moral extranjera.
     * @type {string}
     */
    numeroExteriorPME?: string;

    /**
     * Número interior de la persona moral extranjera.
     * @type {string}
     */
    numeroInteriorPME?: string;

    /**
     * Nombre del director general de la persona moral extranjera.
     * @type {string}
     */
    nombreDG?: string;

    /**
     * Apellido paterno del director general de la persona moral extranjera.
     * @type {string}
     */
    apellidoPaternoDG?: string;

    /**
     * Apellido materno del director general de la persona moral extranjera.
     * @type {string}
     */
    apellidoMaternoDG?: string;

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
     * Tabla de personas físicas nacionales.
     * @type {PersonaFisicaNacionalForm[]}
     */
    personaFisicaNacionalTabla?: PersonaFisicaNacionalForm[];

    /**
     * Tabla de personas morales nacionales.
     * @type {PersonaMoralNacionalForm[]}
     */
    personaMoralNacionalTabla?: PersonaMoralNacionalForm[];

    /**
     * Tabla de personas físicas extranjeras.
     * @type {PersonaFisicaExtranjeraForm[]}
     */
    personaFisicaExtranjeraTabla?: PersonaFisicaExtranjeraForm[];

    /**
     * Tabla de personas morales extranjeras.
     * @type {PersonaMoralExtranjeraForm[]}
     */
    personaMoralExtranjeraTabla?: PersonaMoralExtranjeraForm[];
}

/**
 * Crea el estado inicial del trámite 40201.
 * @returns Estado inicial de tipo `TransportacionMaritima40201State`.
 */
export function createInitialState(): TransportacionMaritima40201State {
    return {
        buscarRfcPFN: '',
        rfcPFN: '',
        nombrePFN: '',
        apellidoPaternoPFN: '',
        apellidoMaternoPFN: '',

        paisPFN: '',
        codigoPostalPFN: '',
        estadoPFN: '',
        municipioPFN: '',
        localidadPFN: '',
        callePFN: '',
        coloniaPFN: '',
        numeroExteriorPFN: '',
        numeroInteriorPFN: '',

        buscarRfcPMN: '',
        rfcPMN: '',
        denominacionPMN: '',
        correoPMN: '',
        paisPMN: '',
        codigoPostalPMN: '',
        estadoPMN: '',
        municipioPMN: '',
        localidadPMN: '',
        callePMN: '',
        coloniaPMN: '',
        numeroExteriorPMN: '',
        numeroInteriorPMN: '',
        nombreDirectorGeneral: '',
        apellidoPaternoDirectorGeneral: '',
        apellidoMaternoDirectorGeneral: '',

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

        denominacionPME: '',
        correoPME: '',
        paisPME: '',
        codigoPostalPME: '',
        ciudadPME: '',
        estadoPME: '',
        callePME: '',
        numeroExteriorPME: '',
        numeroInteriorPME: '',
        nombreDG: '',
        apellidoPaternoDG: '',
        apellidoMaternoDG: '',

        tipoDeEmpresaOpcion: '1',
        buscarPorRFCNa: '',
        buscarPorDenominacionNa: '',
        folioCaatBusquedaNa: '',
        buscarPorDenominacionEx: '',
        folioCaatBusquedaEx: '',

        caatRegistradoEmpresaTabla: [],
        personaFisicaNacionalTabla: [],
        personaMoralNacionalTabla: [],
        personaFisicaExtranjeraTabla: [],
        personaMoralExtranjeraTabla: [],
    };
}

/**
 * Servicio de estado global para gestionar el trámite 40201 con Akita.
 */
@Injectable({
    providedIn: 'root',
})

/**
 * Configuración de la tienda Akita para el trámite 40201 con opción de reinicio.
 */
@StoreConfig({ name: 'tramite40201', resettable: true })
export class Tramite40201Store extends Store<TransportacionMaritima40201State> {
    /**
     * Constructor que inicializa el estado con los valores predeterminados.
     */
    constructor() {
        super(createInitialState());
    }

    /**
     * Obtiene el RFC de la persona física nacional.
     * @returns RFC de la persona física nacional.
     * @param buscarRfcPFN - RFC de la persona física nacional.
     * @description Establece el RFC de la persona física nacional en el estado.
     */
    public setBuscarRfcPFN(buscarRfcPFN: string): void {
        this.update((state) => ({
            ...state,
            buscarRfcPFN,
        }));
    }

    /**
     * Establece el RFC de la persona física nacional en el estado.
     * @param rfcPFN - RFC de la persona física nacional.
     * @description Establece el RFC de la persona física nacional en el estado.
     */
    public setRfcPFN(rfcPFN: string): void {
        this.update((state) => ({
            ...state,
            rfcPFN,
        }));
    }

    /**
     * Establece el nombre de la persona física nacional en el estado.
     * @param nombrePFN - Nombre de la persona física nacional.
     * @description Establece el nombre de la persona física nacional en el estado.
     */
    public setNombrePFN(nombrePFN: string): void {
        this.update((state) => ({
            ...state,
            nombrePFN,
        }));
    }

    /**
     * Establece el apellido paterno de la persona física nacional en el estado.
     * @param apellidoPaternoPFN - Apellido paterno de la persona física nacional.
     * @description Establece el apellido paterno de la persona física nacional en el estado.
     */
    public setApellidoPaternoPFN(apellidoPaternoPFN: string): void {
        this.update((state) => ({
            ...state,
            apellidoPaternoPFN,
        }));
    }

    /**
     * Establece el apellido materno de la persona física nacional en el estado.
     * @param apellidoMaternoPFN - Apellido materno de la persona física nacional.
     * @description Establece el apellido materno de la persona física nacional en el estado.
     */
    public setApellidoMaternoPFN(apellidoMaternoPFN: string): void {
        this.update((state) => ({
            ...state,
            apellidoMaternoPFN,
        }));
    }

    /**
     * Establece el país de la persona física nacional en el estado.
     * @param paisPFN - País de la persona física nacional.
     * @description Establece el país de la persona física nacional en el estado.
     */
    public setPaisPFN(paisPFN: string): void {
        this.update((state) => ({
            ...state,
            paisPFN,
        }));
    }

    /**
     * Establece el código postal de la persona física nacional en el estado.
     * @param codigoPostalPFN - Código postal de la persona física nacional.
     * @description Establece el código postal de la persona física nacional en el estado.
     */
    public setCodigoPostalPFN(codigoPostalPFN: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalPFN,
        }));
    }

    /**
     * Establece el estado de la persona física nacional en el estado.
     * @param estadoPFN - Estado de la persona física nacional.
     * @description Establece el estado de la persona física nacional en el estado.
     */
    public setEstadoPFN(estadoPFN: string): void {
        this.update((state) => ({
            ...state,
            estadoPFN,
        }));
    }

    /**
     * Establece el municipio de la persona física nacional en el estado.
     * @param municipioPFN - Municipio de la persona física nacional.
     * @description Establece el municipio de la persona física nacional en el estado.
     */
    public setMunicipioPFN(municipioPFN: string): void {
        this.update((state) => ({
            ...state,
            municipioPFN,
        }));
    }

    /**
     * Establece la localidad de la persona física nacional en el estado.
     * @param localidadPFN - Localidad de la persona física nacional.
     * @description Establece la localidad de la persona física nacional en el estado.
     */
    public setLocalidadPFN(localidadPFN: string): void {
        this.update((state) => ({
            ...state,
            localidadPFN,
        }));
    }

    /**
     * Establece la colonia de la persona física nacional en el estado.
     * @param coloniaPFN - Colonia de la persona física nacional.
     * @description Establece la colonia de la persona física nacional en el estado.
     */
    public setColoniaPFN(coloniaPFN: string): void {
        this.update((state) => ({
            ...state,
            coloniaPFN,
        }));
    }

    /**
     * Establece la calle de la persona física nacional en el estado.
     * @param callePFN - Calle de la persona física nacional.
     * @description Establece la calle de la persona física nacional en el estado.
     */
    public setCallePFN(callePFN: string): void {
        this.update((state) => ({
            ...state,
            callePFN,
        }));
    }

    /**
     * Numero exterior de la persona física nacional en el estado.
     * @param numeroExteriorPFN - Número exterior de la persona física nacional.
     * @description Establece el número exterior de la persona física nacional en el estado.
     */

    public setNumeroExteriorPFN(numeroExteriorPFN: string): void {
        this.update((state) => ({
            ...state,
            numeroExteriorPFN,
        }));
    }

    /**
     * Establece el número interior de la persona física nacional en el estado.
     * @param numeroInteriorPFN - Número interior de la persona física nacional.
     * @description Establece el número interior de la persona física nacional en el estado.
     */
    public setNumeroInteriorPFN(numeroInteriorPFN: string): void {
        this.update((state) => ({
            ...state,
            numeroInteriorPFN,
        }));
    }

    /**
     * Establece el RFC de la persona moral nacional en el estado.
     * @param buscarRfcPMN - RFC de la persona moral nacional.
     * @description Establece el RFC de la persona moral nacional en el estado.
     */
    public setBuscarRfcPMN(buscarRfcPMN: string): void {
        this.update((state) => ({
            ...state,
            buscarRfcPMN,
        }));
    }

    /**
     * Establece el RFC de la persona moral nacional en el estado.
     * @param rfcPMN - RFC de la persona moral nacional.
     * @description Establece el RFC de la persona moral nacional en el estado.
     */
    public setRfcPMN(rfcPMN: string): void {
        this.update((state) => ({
            ...state,
            rfcPMN,
        }));
    }

    /**
     * Establece la denominación de la persona moral nacional en el estado.
     * @param denominacionPMN - Denominación de la persona moral nacional.
     * @description Establece la denominación de la persona moral nacional en el estado.
     */
    public setDenominacionPMN(denominacionPMN: string): void {
        this.update((state) => ({
            ...state,
            denominacionPMN,
        }));
    }

    /**
     * Establece el correo electrónico de la persona moral nacional en el estado.
     * @param correoPMN - Correo electrónico de la persona moral nacional.
     * @description Establece el correo electrónico de la persona moral nacional en el estado.
     */
    public setCorreoPMN(correoPMN: string): void {
        this.update((state) => ({
            ...state,
            correoPMN,
        }));
    }

    /**
     * Establece el país de la persona moral nacional en el estado.
     * @param paisPMN - País de la persona moral nacional.
     * @description Establece el país de la persona moral nacional en el estado.
     */
    public setPaisPMN(paisPMN: string): void {
        this.update((state) => ({
            ...state,
            paisPMN,
        }));
    }

    /**
     * Establece el código postal de la persona moral nacional en el estado.
     * @param codigoPostalPMN - Código postal de la persona moral nacional.
     * @description Establece el código postal de la persona moral nacional en el estado.
     */
    public setCodigoPostalPMN(codigoPostalPMN: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalPMN,
        }));
    }

    /**
     * Establece el estado de la persona moral nacional en el estado.
     * @param estadoPMN - Estado de la persona moral nacional.
     * @description Establece el estado de la persona moral nacional en el estado.
     */
    public setEstadoPMN(estadoPMN: string): void {
        this.update((state) => ({
            ...state,
            estadoPMN,
        }));
    }

    /**
     * Establece el municipio de la persona moral nacional en el estado.
     * @param municipioPMN - Municipio de la persona moral nacional.
     * @description Establece el municipio de la persona moral nacional en el estado.
     */
    public setMunicipioPMN(municipioPMN: string): void {
        this.update((state) => ({
            ...state,
            municipioPMN,
        }));
    }

    /**
     * Establece la localidad de la persona moral nacional en el estado.
     * @param localidadPMN - Localidad de la persona moral nacional.
     * @description Establece la localidad de la persona moral nacional en el estado.
     */
    public setLocalidadPMN(localidadPMN: string): void {
        this.update((state) => ({
            ...state,
            localidadPMN,
        }));
    }

    /**
     * Establece la colonia de la persona moral nacional en el estado.
     * @param coloniaPMN - Colonia de la persona moral nacional.
     * @description Establece la colonia de la persona moral nacional en el estado.
     */
    public setColoniaPMN(coloniaPMN: string): void {
        this.update((state) => ({
            ...state,
            coloniaPMN,
        }));
    }

    /**
     * Establece la calle de la persona moral nacional en el estado.
     * @param callePMN - Calle de la persona moral nacional.
     * @description Establece la calle de la persona moral nacional en el estado.
     */
    public setCallePMN(callePMN: string): void {
        this.update((state) => ({
            ...state,
            callePMN,
        }));
    }

    /**
     * Establece el número exterior de la persona moral nacional en el estado.
     * @param numeroExteriorPMN - Número exterior de la persona moral nacional.
     * @description Establece el número exterior de la persona moral nacional en el estado.
     */
    public setNumeroExteriorPMN(numeroExteriorPMN: string): void {
        this.update((state) => ({
            ...state,
            numeroExteriorPMN,
        }));
    }

    /**
     * Establece el número interior de la persona moral nacional en el estado.
     * @param numeroInteriorPMN - Número interior de la persona moral nacional.
     * @description Establece el número interior de la persona moral nacional en el estado.
     */
    public setNumeroInteriorPMN(numeroInteriorPMN: string): void {
        this.update((state) => ({
            ...state,
            numeroInteriorPMN,
        }));
    }

    /**
     * Establece el nombre del director general de la persona moral nacional en el estado.
     * @param nombreDirectorGeneral - Nombre del director general de la persona moral nacional.
     * @description Establece el nombre del director general de la persona moral nacional en el estado.
     */
    public setNombreDirectorGeneral(nombreDirectorGeneral: string): void {
        this.update((state) => ({
            ...state,
            nombreDirectorGeneral,
        }));
    }

    /**
     * Establece el apellido paterno del director general de la persona moral nacional en el estado.
     * @param apellidoPaternoDirectorGeneral - Apellido paterno del director general de la persona moral nacional.
     * @description Establece el apellido paterno del director general de la persona moral nacional en el estado.
     */
    public setApellidoPaternoDirectorGeneral(apellidoPaternoDirectorGeneral: string): void {
        this.update((state) => ({
            ...state,
            apellidoPaternoDirectorGeneral,
        }));
    }

    /**
     * Establece el apellido materno del director general de la persona moral nacional en el estado.
     * @param apellidoMaternoDirectorGeneral - Apellido materno del director general de la persona moral nacional.
     * @description Establece el apellido materno del director general de la persona moral nacional en el estado.
     */
    public setApellidoMaternoDirectorGeneral(apellidoMaternoDirectorGeneral: string): void {
        this.update((state) => ({
            ...state,
            apellidoMaternoDirectorGeneral,
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
     * Establece la denominación de la persona moral extranjera en el estado.
     * @param denominacionPME - Denominación de la persona moral extranjera.
     * @description Establece la denominación de la persona moral extranjera en el estado.
     */
    public setDenominacionPME(denominacionPME: string): void {
        this.update((state) => ({
            ...state,
            denominacionPME,
        }));
    }

    /**
     * Establece el correo electrónico de la persona moral extranjera en el estado.
     * @param correoPME - Correo electrónico de la persona moral extranjera.
     * @description Establece el correo electrónico de la persona moral extranjera en el estado.
     */
    public setCorreoPME(correoPME: string): void {
        this.update((state) => ({
            ...state,
            correoPME,
        }));
    }

    /**
     * Establece el país de la persona moral extranjera en el estado.
     * @param paisPME - País de la persona moral extranjera.
     * @description Establece el país de la persona moral extranjera en el estado.
     */
    public setPaisPME(paisPME: number | string): void {
        this.update((state) => ({
            ...state,
            paisPME,
        }));
    }

    /**
     * Establece el código postal de la persona moral extranjera en el estado.
     * @param codigoPostalPME - Código postal de la persona moral extranjera.
     * @description Establece el código postal de la persona moral extranjera en el estado.
     */
    public setCodigoPostalPME(codigoPostalPME: string): void {
        this.update((state) => ({
            ...state,
            codigoPostalPME,
        }));
    }

    /**
     * Establece la ciudad de la persona moral extranjera en el estado.
     * @param ciudadPME - Ciudad de la persona moral extranjera.
     * @description Establece la ciudad de la persona moral extranjera en el estado.
     */
    public setCiudadPME(ciudadPME: string): void {
        this.update((state) => ({
            ...state,
            ciudadPME,
        }));
    }

    /**
     * Establece el estado de la persona moral extranjera en el estado.
     * @param estadoPME - Estado de la persona moral extranjera.
     * @description Establece el estado de la persona moral extranjera en el estado.
     */
    public setEstadoPME(estadoPME: string): void {
        this.update((state) => ({
            ...state,
            estadoPME,
        }));
    }

    /**
     * Establece la calle de la persona moral extranjera en el estado.
     * @param callePME - Calle de la persona moral extranjera.
     * @description Establece la calle de la persona moral extranjera en el estado.
     */
    public setCallePME(callePME: string): void {
        this.update((state) => ({
            ...state,
            callePME,
        }));
    }

    /**
     * Establece el número exterior de la persona moral extranjera en el estado.
     * @param numeroExteriorPME - Número exterior de la persona moral extranjera.
     * @description Establece el número exterior de la persona moral extranjera en el estado.
     */
    public setNumeroExteriorPME(numeroExteriorPME: string): void {
        this.update((state) => ({
            ...state,
            numeroExteriorPME,
        }));
    }

    /**
     * Establece el número interior de la persona moral extranjera en el estado.
     * @param numeroInteriorPME - Número interior de la persona moral extranjera.
     * @description Establece el número interior de la persona moral extranjera en el estado.
     */
    public setNumeroInteriorPME(numeroInteriorPME: string): void {
        this.update((state) => ({
            ...state,
            numeroInteriorPME,
        }));
    }

    /**
     * Establece el nombre del director general de la persona moral extranjera en el estado.
     * @param nombreDG - Nombre del director general de la persona moral extranjera.
     * @description Establece el nombre del director general de la persona moral extranjera en el estado.
     */
    public setNombreDG(nombreDG: string): void {
        this.update((state) => ({
            ...state,
            nombreDG,
        }));
    }

    /**
     * Establece el apellido paterno del director general de la persona moral extranjera en el estado.
     * @param apellidoPaternoDG - Apellido paterno del director general de la persona moral extranjera.
     * @description Establece el apellido paterno del director general de la persona moral extranjera en el estado.
     */
    public setApellidoPaternoDG(apellidoPaternoDG: string): void {
        this.update((state) => ({
            ...state,
            apellidoPaternoDG,
        }));
    }

    /**
     * Establece el apellido materno del director general de la persona moral extranjera en el estado.
     * @param apellidoMaternoDG - Apellido materno del director general de la persona moral extranjera.
     * @description Establece el apellido materno del director general de la persona moral extranjera en el estado.
     */
    public setApellidoMaternoDG(apellidoMaternoDG: string): void {
        this.update((state) => ({
            ...state,
            apellidoMaternoDG,
        }));
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
     * Establece la tabla de persona física nacional en el estado.
     * @param personaFisicaNacionalTabla - Tabla de persona física nacional.
     * @description Establece la tabla de persona física nacional en el estado.
     */
    public setPersonaFisicaNacionalTabla(personaFisicaNacionalTabla: PersonaFisicaNacionalForm[]): void {
        this.update((state) => ({
            ...state,
            personaFisicaNacionalTabla,
        }));
    }

    /**
     * Establece la tabla de persona moral nacional en el estado.
     * @param personaMoralNacionalTabla - Tabla de persona moral nacional.
     * @description Establece la tabla de persona moral nacional en el estado.
     */
    public setPersonaMoralNacionalTabla(personaMoralNacionalTabla: PersonaMoralNacionalForm[]): void {
        this.update((state) => ({
            ...state,
            personaMoralNacionalTabla,
        }));
    }

    /**
     * Establece la tabla de persona física extranjera en el estado.
     * @param personaFisicaExtranjeraTabla - Tabla de persona física extranjera.
     * @description Establece la tabla de persona física extranjera en el estado.
     */
    public setPersonaFisicaExtranjeraTabla(personaFisicaExtranjeraTabla: PersonaFisicaExtranjeraForm[]): void {
        this.update((state) => ({
            ...state,
            personaFisicaExtranjeraTabla,
        }));
    }

    /**
     * Establece la tabla de persona moral extranjera en el estado.
     * @param personaMoralExtranjeraTabla - Tabla de persona moral extranjera.
     * @description Establece la tabla de persona moral extranjera en el estado.
     */
    public setPersonaMoralExtranjeraTabla(personaMoralExtranjeraTabla: PersonaMoralExtranjeraForm[]): void {
        this.update((state) => ({
            ...state,
            personaMoralExtranjeraTabla,
        }));
    }
}