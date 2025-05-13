export interface InstalacionesPrincipalesTablaInfo {
    tipo_persona: string;
    nombre: string;
    rfc: string;
    registro_poblacional:string;
}

export const INSTALACIONES_PRINCIPALES_TABLA = [
    {
      encabezado: 'Tipo persona',
      clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.tipo_persona,
      orden: 1,
    },
    {
      encabezado: 'Nombre',
      clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.nombre,
      orden: 2,
    },
    {
        
        encabezado: 'RFC',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.rfc,
        orden: 3,
    },
    {
        
        encabezado: 'Clave única de registro poblacional (CURP)',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.registro_poblacional,
        orden: 4,
    },
];

export interface InstalacionesPrincipalesRespuestaTabla {
    /**
     * Código de respuesta.
     */
    code: number;
    /**
     * Datos de la tabla NICO.
     */
    data: InstalacionesPrincipalesTablaInfo[];
    /**
     * Mensaje de la respuesta.
     */
    message: string;
}

export interface formaDatosInfo {
    nombre: string;
    registroFederal: string;
    curp: string;
}

export interface formaRespuestaDatos {
    /**
     * Código de respuesta.
     */
    code: number;
    /**
     * Datos de la tabla NICO.
     */
    data: formaDatosInfo[];
    /**
     * Mensaje de la respuesta.
     */
    message: string;
}