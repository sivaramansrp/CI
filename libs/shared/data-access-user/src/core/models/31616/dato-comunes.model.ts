export interface MercanciasInfo {
    denominacion_social: string;
    rfc: string;
    numero_de_empleados: string;
    bimestre:string;
}

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

export interface InstalacionesPrincipalesTablaInfo {
    instalaciones_principales: string;
    tipo_de_instalacion: string;
    entidad_federativa: string;
    municipio_o_delegacion:string;
    colonia:string
}

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