import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

/**
 * Estado que representa los valores del formulario de reciclaje.
 */
export interface EstadoFormularioReciclaje {

    /** Sección de datos de la solicitud */
    solicitudForm: {
        /** Número de registro ambiental */
        numeroRegistroAmbiental: string;

        /** Descripción genérica del residuo */
        descripcionGenerica1: string;

        /** Número de programa IMMEX asociado */
        numeroProgramaImmex: string;
    };

    /** Información de la empresa recicladora */
    empresaReciclaje: {
        /** Indicador de si se requiere empresa recicladora */
        requiereEmpresa: string;

        /** Nombre de la empresa recicladora */
        nombreEmpresa: string;

        /** Representante legal de la empresa */
        representanteLegal: string;

        /** Teléfono de contacto de la empresa */
        telefono: string;

        /** Correo electrónico de contacto */
        correoElectronico: string;
    };

    /** Información del lugar de reciclaje */
    lugarReciclaje: {
        /** Indicador si se realiza en instalaciones del generador */
        reciclajeInstalaciones: string;

        /** Ubicación del lugar de reciclaje */
        lugarReciclaje: string;

        /** Número de autorización de la empresa recicladora */
        numeroAutorizacionEmpresaReciclaje: string;
    };

    /** Datos de la empresa transportista */
    empresaTransportista: {
        /** Nombre de la empresa transportista de residuos */
        nombreEmpresaTransportistaResiduos: string;

        /** Número de autorización otorgado por SEMARNAT */
        numeroAutorizacionSemarnat: string;
    };

    /** Precauciones en el manejo del residuo */
    precaucionesManejo: {
        /** Descripción de las precauciones de manejo */
        precaucionesManejo: string;
    };
}


/**
 * Función que retorna el estado inicial para el formulario de reciclaje.
 */
export function crearEstadoInicialFormularioReciclaje(): EstadoFormularioReciclaje {
    return {
        // Datos generales de la solicitud
        solicitudForm: {
            // Número de registro ambiental proporcionado por SEMARNAT
            numeroRegistroAmbiental: '',

            // Descripción genérica del residuo
            descripcionGenerica1: '',

            // Número del programa IMMEX asociado a la empresa
            numeroProgramaImmex: '',
        },

        // Información de la empresa recicladora
        empresaReciclaje: {
            // Indicador de si se requiere empresa recicladora (valor inicial: "Si")
            requiereEmpresa: 'Si',

            // Nombre de la empresa recicladora
            nombreEmpresa: '',

            // Representante legal de la empresa recicladora
            representanteLegal: '',

            // Teléfono de contacto de la empresa recicladora
            telefono: '',

            // Correo electrónico de la empresa recicladora
            correoElectronico: '',
        },

        // Información sobre el lugar donde se realiza el reciclaje
        lugarReciclaje: {
            // Indicador si el reciclaje se realiza en las instalaciones del generador (valor inicial: "Si")
            reciclajeInstalaciones: 'Si',

            // Dirección o nombre del lugar de reciclaje
            lugarReciclaje: '',

            // Número de autorización de la empresa recicladora otorgado por la autoridad competente
            numeroAutorizacionEmpresaReciclaje: '',
        },

        // Datos de la empresa encargada del transporte de los residuos
        empresaTransportista: {
            // Nombre de la empresa transportista
            nombreEmpresaTransportistaResiduos: '',

            // Número de autorización de SEMARNAT para transportar residuos
            numeroAutorizacionSemarnat: ''
        },

        // Descripción de las precauciones a tomar en el manejo del residuo
        precaucionesManejo: {
            precaucionesManejo: '',
        }
    };
}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'formulario-reciclaje', resettable: true })
export class FormularioReciclajeStore extends Store<EstadoFormularioReciclaje> {
    /**
    * Constructor del store que inicializa el estado con los valores predeterminados
    * definidos en la función crearEstadoInicialFormularioReciclaje().
    */
    constructor() {
        super(crearEstadoInicialFormularioReciclaje());
    }

    /**
     * Actualiza los valores del formulario de solicitud en el estado.
     * @param valores - Objeto con los nuevos valores del formulario de solicitud.
     */
    actualizarSolicitudForm(valores: EstadoFormularioReciclaje['solicitudForm']): void {
        this.update(state => ({
            ...state,
            solicitudForm: { ...valores }
        }));
    }

    /**
     * Actualiza los valores del formulario de la empresa recicladora en el estado.
     * @param valores - Objeto con los nuevos valores del formulario de empresa reciclaje.
     */
    actualizarEmpresaReciclaje(valores: EstadoFormularioReciclaje['empresaReciclaje']): void {
        this.update(state => ({
            ...state,
            empresaReciclaje: { ...valores }
        }));
    }


    /**
  * Actualiza los valores del formulario del lugar de reciclaje en el estado.
  * @param valores - Objeto con los nuevos valores del formulario de lugar de reciclaje.
  */
    actualizarLugarReciclaje(valores: EstadoFormularioReciclaje['lugarReciclaje']): void {
        this.update(state => ({
            ...state,
            lugarReciclaje: { ...valores }
        }));
    }

    /**
     * Actualiza los valores del formulario de la empresa transportista en el estado.
     * @param valores - Objeto con los nuevos valores del formulario de empresa transportista.
     */
    actualizarEmpresaTransportista(valores: EstadoFormularioReciclaje['empresaTransportista']): void {
        this.update(state => ({
            ...state,
            empresaTransportista: { ...valores }
        }));
    }


    /**
  * Actualiza los valores del formulario de precauciones de manejo en el estado.
  * @param valores - Objeto con los nuevos valores del formulario de precauciones de manejo.
  */
    actualizarPrecaucionesManejo(valores: EstadoFormularioReciclaje['precaucionesManejo']): void {
        this.update(state => ({
            ...state,
            precaucionesManejo: { ...valores }
        }));
    }

    /**
     * Restaura el estado del formulario al estado inicial.
     */
    limpiarFormulario(): void {
        this.reset();
    }

}
