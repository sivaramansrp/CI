import { CAATRegistradoEmpresaForm, PersonaFisicaExtranjeraForm, PersonaFisicaNacionalForm, PersonaMoralExtranjeraForm, PersonaMoralNacionalForm } from '../../../tramites/40201/models/transportacion-maritima.model';
import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

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
 * Actualiza el estado del trámite 40201 con los valores proporcionados.
 *
 * @param valores Objeto parcial con las propiedades del estado que se desean actualizar.
 */

    setTramite40201State(valores: Partial<TransportacionMaritima40201State>): void {
    this.update((state) => ({
      ...state,
      ...valores,
    }));
  }
 
}