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
    code: number;
    data: MercanciasInfo[];
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
    code: number;
    data: InstalacionesPrincipalesTablaInfo[];
    message: string;
}

export interface ControlInventarios {
    nombreSistema: string;
    lugarRadicacion: string;
    sistemaControlInventarios: string;
}


export const CONTROL_INVENTARIOS_TABLA = [
    {
        encabezado: 'Nombre del sistema o datos para su identificación',
        clave: (ele: ControlInventarios) => ele.nombreSistema,
        orden: 1,
    },
    {
        encabezado: 'Lugar de radicación',
        clave: (ele: ControlInventarios) => ele.lugarRadicacion,
        orden: 2,
    },
    {
        
        encabezado: 'Indique si se trata de un sistema de control de inventarios conforme el anexo 24',
        clave: (ele: ControlInventarios) => ele.sistemaControlInventarios,
        orden: 3,
    }
];

export interface Miembro {
    tipoDePersona: string;
    nombre: string;
    rfc: string;
    caracter: string;
    nacionalidad: string;
    obligadoTributar: string;
    nombreEmpresa: string;
}

export const AGREGAR_MIEMBRO_TABLA = [
    {
        encabezado: 'Tipo de Persona',
        clave: (ele: Miembro) => ele.tipoDePersona,
        orden: 1,
    },
    {
        encabezado: 'Nombre',
        clave: (ele: Miembro) => ele.nombre,
        orden: 2,
    },
    {
        
        encabezado: 'RFC',
        clave: (ele: Miembro) => ele.rfc,
        orden: 3,
    },
    {
        
        encabezado: 'En su carácter de',
        clave: (ele: Miembro) => ele.caracter,
        orden: 4,
    },
    {
        
        encabezado: 'Nacionalidad',
        clave: (ele: Miembro) => ele.nacionalidad,
        orden: 5,
    },
    {
        
        encabezado: 'Obligado a tributar en México',
        clave: (ele: Miembro) => ele.obligadoTributar,
        orden: 6,
    },
    {
        
        encabezado: 'Nombre de la empresa',
        clave: (ele: Miembro) => ele.nombreEmpresa,
        orden: 7,
    }
];