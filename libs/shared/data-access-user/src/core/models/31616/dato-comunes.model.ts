/**
 * Interfaz que representa la información de mercancías relacionada con el RFC y número de empleados.
 */
export interface MercanciasInfo {
    denominacion_social: string;
    rfc: string;
    numero_de_empleados: string;
    bimestre: string;
}

/**
 * Columnas configuradas para la tabla que muestra información de mercancías.
 */
export const MERCANCIA_TABLA = [
    {
        encabezado: 'Denominacion Social',
        clave: (ele: MercanciasInfo) => ele.denominacion_social,
        orden: 1,
    },
    {
        encabezado: 'RFC',
        clave: (ele: MercanciasInfo) => ele.rfc,
        orden: 2,
    },
    {
        encabezado: 'Numero de Empleados',
        clave: (ele: MercanciasInfo) => ele.numero_de_empleados,
        orden: 3,
    },
    {
        encabezado: 'Bimestre',
        clave: (ele: MercanciasInfo) => ele.bimestre,
        orden: 4,
    }
];

/**
 * Respuesta estructurada para datos de mercancías, incluye código, datos y mensaje.
 */
export interface RespuestaTabla {
    /**
     * Código de respuesta.
     */
    code: number;
    /**
     * Datos de la tabla NICO.
     */
    data: MercanciasInfo[];
    /**
     * Mensaje de la respuesta.
     */
    message: string;
}

/**
 * Interfaz que representa información de instalaciones principales.
 */
export interface InstalacionesPrincipalesTablaInfo {
    instalaciones_principales: string;
    tipo_de_instalacion: string;
    entidad_federativa: string;
    municipio_o_delegacion: string;
    colonia: string;
}

/**
 * Columnas configuradas para la tabla de instalaciones principales.
 */
export const INSTALACIONES_PRINCIPALES_TABLA = [
    {
        encabezado: '*Instalaciones principales',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.instalaciones_principales,
        orden: 1,
    },
    {
        encabezado: '*Tipo de instalación',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.tipo_de_instalacion,
        orden: 2,
    },
    {
        encabezado: 'Entidad federativa',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.entidad_federativa,
        orden: 3,
    },
    {
        encabezado: 'Municipio o delegación',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.municipio_o_delegacion,
        orden: 4,
    },
    {
        encabezado: 'Colonia, calle y número',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.colonia,
        orden: 5,
    }
];

/**
 * Respuesta estructurada para la tabla de instalaciones principales.
 */
export interface InstalacionesPrincipalesRespuestaTabla {
    /**
     * Código de respuesta.
     */
    code: number;
    /**
     * Datos de instalaciones principales.
     */
    data: InstalacionesPrincipalesTablaInfo[];
    /**
     * Mensaje de la respuesta.
     */
    message: string;
}

/**
 * Interfaz que representa información personal de una persona.
 */
export interface PersonasInfo {
    rfc: string; // RFC de la persona
    curp: string; // CURP de la persona
    nombre: string; // Nombre de la persona
    apellidoPaterno: string; // Apellido paterno de la persona
    apellidoMaterno: string; // Apellido materno de la persona
}

/**
 * Columnas configuradas para la tabla de personas.
 */
export const PERSONAS_TABLA = [
    {
        encabezado: 'RFC',
        clave: (ele: PersonasInfo) => ele.rfc,
        orden: 1,
    },
    {
        encabezado: 'CURP',
        clave: (ele: PersonasInfo) => ele.curp,
        orden: 2,
    },
    {
        encabezado: 'Nombre',
        clave: (ele: PersonasInfo) => ele.nombre,
        orden: 3,
    },
    {
        encabezado: 'Apellido Paterno',
        clave: (ele: PersonasInfo) => ele.apellidoPaterno,
        orden: 4,
    },
    {
        encabezado: 'Apellido Materno',
        clave: (ele: PersonasInfo) => ele.apellidoMaterno,
        orden: 5,
    }
];

/**
 * Respuesta estructurada para la tabla de personas.
 */
export interface PersonaRespuestaTabla {
    /**
     * Código de respuesta.
     */
    code: number;
    /**
     * Datos de personas.
     */
    data: PersonasInfo[];
    /**
     * Mensaje de la respuesta.
     */
    message: string;
}
