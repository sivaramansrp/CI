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

export interface Administrar {
    origenResiduo: string;
    fraccionArancelaria: string;
    nico: string;
    acotacion: string;
    nombreResiduoPeligroso: string;
    cantidad: string;
    cantidadLetra: string;
    unidadMedida: string;
    claveClasificacion: string;
    nombreClasificacion: string;
    descripcionClasificacion: string;
    descripcionOtro: string;
    creti: string;
    estadoFisico: string;
    descripcionOtroEstadoFisico: string;
    tipoContenedor: string;
    descripcionOtroContenedor: string;
    capacidad: string;
}


export const ADMINISTRAR_RESIDUOS = [
    {
        encabezado: 'Origen del residuo',
        clave: (ele: Administrar): string => ele.origenResiduo,
        orden: 1,
    },
    {
        encabezado: 'Fracción arancelaria',
        clave: (ele: Administrar): string => ele.fraccionArancelaria,
        orden: 2,
    },
    {
        
        encabezado: 'NICO',
        clave: (ele: Administrar): string => ele.nico,
        orden: 3,
    },
    {
        
        encabezado: 'Acotación',
        clave: (ele: Administrar): string => ele.acotacion,
        orden: 4,
    },
    {
        
        encabezado: 'Nombre Residuo Peligroso',
        clave: (ele: Administrar): string => ele.nombreResiduoPeligroso,
        orden: 5,
    },
    {
        
        encabezado: 'Cantidad',
        clave: (ele: Administrar): string => ele.cantidad,
        orden: 6,
    },
    {
        encabezado: 'Cantidad letra',
        clave: (ele: Administrar): string => ele.cantidadLetra,
        orden: 7,
    },
    {
        encabezado: 'Unidad de medida',
        clave: (ele: Administrar): string => ele.unidadMedida,
        orden: 8,
    },
    {
        encabezado: 'Clave clasificación',
        clave: (ele: Administrar): string => ele.claveClasificacion,
        orden: 9,
    },
    {
        encabezado: 'Nombre clasificación',
        clave: (ele: Administrar): string => ele.nombreClasificacion,
        orden: 10,
    },
    {
        encabezado: 'Descripción clasificación',
        clave: (ele: Administrar): string => ele.descripcionClasificacion,
        orden: 11,
    },
    {
        encabezado: 'Descripción otro Clasificación',
        clave: (ele: Administrar): string => ele.descripcionOtro,
        orden: 12,
    },
    {
        encabezado: 'CRETI',
        clave: (ele: Administrar): string => ele.creti,
        orden: 13,
    },
    {
        encabezado: 'Estado físico',
        clave: (ele: Administrar): string => ele.estadoFisico,
        orden: 14,
    },
    {
        encabezado: 'Descripción otro estado físico',
        clave: (ele: Administrar): string => ele.descripcionOtroEstadoFisico,
        orden: 15,
    },
    {
        encabezado: 'Tipo de contenedor',
        clave: (ele: Administrar): string => ele.tipoContenedor,
        orden: 16,
    },
    {
        encabezado: 'Descripción otro contenedor',
        clave: (ele: Administrar): string => ele.descripcionOtroContenedor,
        orden: 17,
    },
    {
        encabezado: 'Capacidad',
        clave: (ele: Administrar): string => ele.capacidad,
        orden: 18
    }
];