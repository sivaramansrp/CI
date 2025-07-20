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
        clave: (ele: MercanciasInfo): string => ele.denominacion_social,
        orden: 1,
    },
    {
        encabezado: 'RFC',
        clave: (ele: MercanciasInfo): string => ele.rfc,
        orden: 2,
    },
    {
        encabezado: 'Numero de Empleados',
        clave: (ele: MercanciasInfo): string => ele.numero_de_empleados,
        orden: 3,
    },
    {
        encabezado: 'Bimestre',
        clave: (ele: MercanciasInfo): string => ele.bimestre,
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
    codigo_postal: string;
    registro_ante_se_sat: string;
    proceso_productivo: string;
    acredita_el_uso_y_goce_del_inmueble: string;
    realiza_operaciones_de_comercio_exterior: string;
    reconocimiento_mutuo_instalacion_c_tpat: string;
    perfil_de_la_empresa: string;
    perfil_del_recinto_fiscalizado_estrategico: string;
    perfil_del_auto_transportista_terrestre: string;
    perfil_del_transportista_ferroviario: string;
    perfil_del_recinto_fiscalizado: string;
    perfil_de_mensajeria_y_paqueteria: string;
    perfil_almacen_general: string;
}

/**
 * Columnas configuradas para la tabla de instalaciones principales.
 */
export const INSTALACIONES_PRINCIPALES_TABLA = [
    {
        encabezado: '*Instalaciones principales',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.instalaciones_principales,
        orden: 1,
    },
    {
        encabezado: '*Tipo de instalación',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.tipo_de_instalacion,
        orden: 2,
    },
    {
        encabezado: 'Entidad federativa',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.entidad_federativa,
        orden: 3,
    },
    {
        encabezado: 'Municipio o delegación',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.municipio_o_delegacion,
        orden: 4,
    },
    {
        encabezado: 'Colonia, calle y número',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.colonia,
        orden: 5,
    },
    {
        encabezado: 'Código postal',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.codigo_postal,
        orden: 6,
    },
    {
        encabezado: 'Registro ante SE/SAT',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.registro_ante_se_sat,
        orden: 7,
    },
    {
        encabezado: 'Proceso Productivo',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.proceso_productivo,
        orden: 8,
    },
    {
        encabezado: 'Acredita el uso y Goce del Inmueble',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.acredita_el_uso_y_goce_del_inmueble,
        orden: 9,
    },
    {
        encabezado: 'Realiza operaciones de Comercio Exterior',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.realiza_operaciones_de_comercio_exterior,
        orden: 10,
    },
    {
        encabezado: 'Reconocimiento Mutuo (Instalación C-TPAT)',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.reconocimiento_mutuo_instalacion_c_tpat,
        orden: 11,
    },
    {
        encabezado: 'Perfil de la empresa',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.perfil_de_la_empresa,
        orden: 12,
    },
    {
        encabezado: 'Perfil del Recinto Fiscalizado Estratégico',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.perfil_del_recinto_fiscalizado_estrategico,
        orden: 13,
    },
    {
        encabezado: 'Perfil del Auto Transportista Terrestre',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.perfil_del_auto_transportista_terrestre,
        orden: 14,
    },
    {
        encabezado: 'Perfil del Transportista Ferroviario',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.perfil_del_transportista_ferroviario,
        orden: 15,
    },
    {
        encabezado: 'Perfil del Recinto Fiscalizado',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.perfil_del_recinto_fiscalizado,
        orden: 16,
    },
    {
        encabezado: 'Perfil de Mensajeria y Paqueteria',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.perfil_de_mensajeria_y_paqueteria,
        orden: 17,
    },
    {
        encabezado: 'Perfil Almacen General',
        clave: (ele: InstalacionesPrincipalesTablaInfo): string => ele.perfil_almacen_general,
        orden: 18,
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
        clave: (ele: PersonasInfo): string => ele.rfc,
        orden: 1,
    },
    {
        encabezado: 'CURP',
        clave: (ele: PersonasInfo): string => ele.curp,
        orden: 2,
    },
    {
        encabezado: 'Nombre',
        clave: (ele: PersonasInfo): string => ele.nombre,
        orden: 3,
    },
    {
        encabezado: 'Apellido Paterno',
        clave: (ele: PersonasInfo): string => ele.apellidoPaterno,
        orden: 4,
    },
    {
        encabezado: 'Apellido Materno',
        clave: (ele: PersonasInfo): string => ele.apellidoMaterno,
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

/**
 * Interfaz que representa información de inventarios.
 */
export interface InventariosInfo {
    nombre: string; // Nombre del sistema o datos para su identificación
    lugarRadicacion: string; // Lugar de radicación
    sistemaControlInventarios: string; // Indique, si cuenta con un sistema de control de inventarios de conformidad con las disposiciones previstas por el Anexo 24.
}

/**
 * Columnas configuradas para la tabla de inventarios.
 */
export const INVENTARIOS_TABLA = [
    {
        encabezado: 'Nombre del sistema o datos para su identificación',
        clave: (ele: InventariosInfo): string => ele.nombre,
        orden: 1,
    },
    {
        encabezado: 'Lugar de radicación',
        clave: (ele: InventariosInfo): string => ele.lugarRadicacion,
        orden: 2,
    },
    {
        encabezado: 'Indique, si cuenta con un sistema de control de inventarios de conformidad con las disposiciones previstas por el Anexo 24.',
        clave: (ele: InventariosInfo): string => ele.sistemaControlInventarios,
        orden: 3,
    }
];

/**
 * Respuesta estructurada para la tabla de inventarios.
 */
export interface InventariosRespuestaTabla {
    /**
     * Código de respuesta.
     */
    code: number;
    /**
     * Datos de inventarios.
     */
    data: InventariosInfo[];
    /**
     * Mensaje de la respuesta.
     */
    message: string;
}
