/**
 * Estado que representa los valores del formulario de reciclaje.
 */
export interface EstadoDatoSolicitud {

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