/**
 * Estado que representa los valores del formulario de reciclaje.
 */
export interface EstadoDatoSolicitud {

    /** Sección de datos de la solicitud */
    solicitudForm: {
        /** Identificador genérico. */
        ideGenerica1: string;
        /** Número de registro ambiental */
        numeroRegistroAmbiental: string;

        /** Descripción genérica del residuo */
        descripcionGenerica1: string;

        /** Número de programa IMMEX asociado */
        numeroProgramaImmex: string;
        domicilio: string
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
        razonSocial: string;
        pais: string;
        destinoDomicilio: string,
        codigoPostal: string;
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
        clave: string;
        /** Descripción de las precauciones de manejo */
        precaucionesManejo: string;
    };
}