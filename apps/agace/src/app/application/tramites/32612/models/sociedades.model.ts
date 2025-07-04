export interface Sociedades {
    rfc: string;
    denominacion: string;
    aduanaEnLaQueActua: string;
    fiscales: string;
}

export interface DatosDeLasInstalaciones {
    rfc: string;
    instalacionesPrincipales: string;
    tipoDeInstalacion: string;
    entidadFederativa: string;
    municipioDelegacion: string;
    colonia: string;
    codigoPostal: string;
    realizaLaValidacion: string;
    actualizarPerfil: string;
}

export const ENLACE_TABLA = [
  {
    encabezado: 'RFC',
    clave: (ele: Sociedades): string => ele.rfc,
    orden: 1,
  },
  {
    encabezado: 'Nombre',
    clave: (ele: Sociedades): string => ele.denominacion,
    orden: 2,
  },
  {
    encabezado: 'Apellido Paterno',
    clave: (ele: Sociedades): string => ele.aduanaEnLaQueActua,
    orden: 3,
  },
  {
    encabezado: 'Apellido Materno',
    clave: (ele: Sociedades): string => ele.fiscales,
    orden: 4,
  }
];

export const CONFIGURACION_INSTALACIONES = [
    {
        encabezado: 'RFC',
        clave: (ele: DatosDeLasInstalaciones): string => ele.rfc,
        orden: 1,
    },
    {
        encabezado: 'Instalaciones Principales',
        clave: (ele: DatosDeLasInstalaciones): string => ele.instalacionesPrincipales,
        orden: 2,
    },
    {
        encabezado: 'Tipo de Instalación',
        clave: (ele: DatosDeLasInstalaciones): string => ele.tipoDeInstalacion,
        orden: 3,
    },
    {
        encabezado: 'Entidad Federativa',
        clave: (ele: DatosDeLasInstalaciones): string => ele.entidadFederativa,
        orden: 4,
    },
    {
        encabezado: 'Municipio/Delegación',
        clave: (ele: DatosDeLasInstalaciones): string => ele.municipioDelegacion,
        orden: 5,
    },
    {
        encabezado: 'Colonia',
        clave: (ele: DatosDeLasInstalaciones): string => ele.colonia,
        orden: 6,
    },
    {
        encabezado: 'Código Postal',
        clave: (ele: DatosDeLasInstalaciones): string => ele.codigoPostal,
        orden: 7,
    },
    {
        encabezado: 'Realiza la Validación',
        clave: (ele: DatosDeLasInstalaciones): string => ele.realizaLaValidacion,
        orden: 8,
    },
    {
        encabezado: 'Actualizar Perfil',
        clave: (ele: DatosDeLasInstalaciones): string => ele.actualizarPerfil,
        orden: 9,
    }
];