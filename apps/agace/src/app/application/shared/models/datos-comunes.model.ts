export const DATOS_COMUNES_TEXTOS = {
    alerta: `<p><strong>Nota:</strong> Si no encuadra en los sectores o los servicios
            de los catálogos, deberá seleccionar el más cercano a sus actividades.</p>`,
}

export const DATOS_COMUNES_TEXTOS_DOS = {
    alerta: `<p><strong>Nota:</strong> En el caso de la Modalidad de IVA e IEPS,
          tendrá que contar con al meanos 10 trabajadores registrados.</p>`,
}

export const DATOS_COMUNES_TEXTOS_TRES = {
    alerta: `<p><strong>Nota:</strong>De contar con un programa IMMEX activo y
          vigente al momento de ingresar la solicitud, se mostrarán los
          domicilios registrados ante la Secretaría de Economía. Así mismo,
          podrá incluir otros domicilios que se encuentren relacionados con el
          RFC del solicitante, dando click en el botón "Agregar" y seleccionado
          la Entidad Federativa.</p>`,
}

export interface Mencione {
    denominacionSocial: string;
    rfc: string;
    numeroDeEmpleados: string;
    bimestre: string;
}

export const MENCIONE_TABLA = [
    {
        encabezado: 'Denominación Social',
        clave: (ele: Mencione) => ele.denominacionSocial,
        orden: 1,
    },
    {
        encabezado: 'RFC',
        clave: (ele: Mencione) => ele.rfc,
        orden: 2,
    },
    {
        encabezado: 'Número de Empleados',
        clave: (ele: Mencione) => ele.numeroDeEmpleados,
        orden: 3,
    },
    {
        encabezado: 'Bimestre',
        clave: (ele: Mencione) => ele.bimestre,
        orden: 4,
    },
];

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
    instalacionesPrincipales: string;
    tipoDeInstalacion: string;
    entidadFederativa: string;
    municipioODelegacion:string;
    colonia:string
}

export const INSTALACIONES_PRINCIPALES_TABLA = [
    {
      encabezado: '*Instalaciones principales',
      clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.instalacionesPrincipales,
      orden: 1,
    },
    {
      encabezado: '*Tipo de instalación',
      clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.tipoDeInstalacion,
      orden: 2,
    },
    {
        
        encabezado: 'Entidad federativa',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.entidadFederativa,
        orden: 3,
    },
    {
        
        encabezado: 'Municipio o delegación',
        clave: (ele: InstalacionesPrincipalesTablaInfo) => ele.municipioODelegacion,
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