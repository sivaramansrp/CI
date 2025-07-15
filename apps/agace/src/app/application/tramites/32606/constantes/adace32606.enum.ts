import { CatalogosSelect, ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { ControladasTable, Domicillio, Empresa, EnlaceOperativo, Querella, RecibirNotificaciones, TransportistasTable } from "../models/adace.model";
/**
 * Opciones para el radio relacionado con la disminución total.
 */
export const RADIO_01 = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
];

export const RADIO_07 = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
];

export const RADIO_08 = [
  { label: 'Sí', value: 'si' },
  { label: 'No', value: 'no' },
];

export const RADIO_AUTORIZO = [
  { label: 'Si Autorizo', value: 'si_autorizo' },
  { label: 'No Autorizo', value: 'no_autorizo' },
];

export const RADIO_CLASIFICACION = [
  { label: 'Pública', value: 'publica' },
  { label: 'Privada', value: 'privada' },
];
/**
 * Configuración para la fecha inicial del dictamen.
 */
export const FECHA_INICIAL = {
  /** Etiqueta para la fecha inicial. */
  labelNombre: 'Fecha de elaboración del dictamen',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Indica si el campo está habilitado. */
  habilitado: true,
};

/**
 * Configuración para la fecha de pago.
 */
export const FECHA_PAGO = {
  /** Etiqueta para la fecha de pago. */
  labelNombre: 'Fecha de pago',
  /** Indica si el campo es obligatorio. */
  required: false,
  /** Indica si el campo está habilitado. */
  habilitado: true,
};

/**
 * Configuración para el catálogo de años.
 */
export const SECTOR_PRODUCTIVO: CatalogosSelect = {
  /** Etiqueta para el catálogo de años. */
  labelNombre: 'Sector Productivo',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};

/**
 * Configuración para el catálogo de meses.
 */
export const SERVICIO_CATALOGO: CatalogosSelect = {
  /** Etiqueta para el catálogo de meses. */
  labelNombre: 'Servicio',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};

export const BIOMESTRE_CATALOGO: CatalogosSelect = {
  /** Etiqueta para el catálogo de bimestres. */
  labelNombre: 'Biomestre',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};

export const DOMICILIO_CATALOGO: CatalogosSelect = {
  /** Etiqueta para el catálogo de Domicillio. */
  labelNombre: '',
  /** Indica si el campo es obligatorio. */
  required: true,
  /** Texto de la primera opción del catálogo. */
  primerOpcion: 'Selecciona un valor',
  /** Lista de elementos del catálogo. */
  catalogos: [],
};

export const DOMICILLIO_TABLA: ConfiguracionColumna<Domicillio>[] = [
  {
    /** Instalaciones principales de la empresa. */
    encabezado: 'Instalaciones principales',
    clave: (item: Domicillio) => item.instalacionPrincipal,
    orden: 1,
  },
  {
    /** Tipo de instalación de la empresa. */
    encabezado: 'Tipo de instalación',
    clave: (item: Domicillio) => item.tipoInstalacion,
    orden: 1,
  },
  {
    /** Entidad federativa donde está ubicada la instalación. */
    encabezado: 'Entidad federativa',
    clave: (item: Domicillio) => item.entidadFederativa,
    orden: 1,
  },
  {
    /** Municipio o delegación donde se encuentra la instalación. */
    encabezado: 'Municipio o delegación',
    clave: (item: Domicillio) => item.municipioDelegacion,
    orden: 1,
  },
  {
    /** Dirección completa del domicilio, incluyendo colonia, calle y número. */
    encabezado: 'Colonia, calle y número',
    clave: (item: Domicillio) => item.direccion,
    orden: 1,
  },
  {
    /** Código postal correspondiente al domicilio. */
    encabezado: 'Código postal',
    clave: (item: Domicillio) => item.codigoPostal,
    orden: 1,
  },
  {
    /** Registro del domicilio ante la Secretaría de Economía (SE) o el Servicio de Administración Tributaria (SAT). */
    encabezado: 'Registro ante SE/SAT',
    clave: (item: Domicillio) => item.registroSESAT,
    orden: 1,
  },
  {
    /** Proceso productivo que se realiza en la instalación. */
    encabezado: 'Proceso Productivo',
    clave: (item: Domicillio) => item.procesoProductivo,
    orden: 1,
  },
  {
    /** Indica si el domicilio acredita el uso y goce del inmueble. */
    encabezado: 'Acredita el uso y Goce del Inmueble',
    clave: (item: Domicillio) => item.acreditaInmueble,
    orden: 1,
  },
  {
    /** Indica si la instalación realiza operaciones de Comercio Exterior. */
    encabezado: 'Realiza operaciones de Comercio Exterior',
    clave: (item: Domicillio) => item.operacionesCExt,
    orden: 1,
  },
  {
    /** Reconocimiento mutuo para la instalación C-TPAT. */
    encabezado: 'Reconocimiento Mutuo (Instalación C-TPAT)',
    clave: (item: Domicillio) => item.instalacionCtpat,
    orden: 1,
  },
  {
    /** Perfil de la empresa correspondiente a la instalación. */
    encabezado: 'Perfil de la empresa',
    clave: (item: Domicillio) => item.instalacionPerfil,
    orden: 1,
  },
  {
    /** Perfil del Recinto Fiscalizado Estratégico. */
    encabezado: 'Perfil del Recinto Fiscalizado Estratégico',
    clave: (item: Domicillio) => item.instalacionPerfilRFE,
    orden: 1,
  },
  {
    /** Perfil del Auto Transportista Terrestre. */
    encabezado: 'Perfil del Auto Transportista Terrestre',
    clave: (item: Domicillio) => item.instalacionPerfilAuto,
    orden: 1,
  },
  {
    /** Perfil del Transportista Ferroviario. */
    encabezado: 'Perfil del Transportista Ferroviario',
    clave: (item: Domicillio) => item.instalacionPerfilFerro,
    orden: 1,
  },
  {
    /** Perfil del Recinto Fiscalizado. */
    encabezado: 'Perfil del Recinto Fiscalizado',
    clave: (item: Domicillio) => item.instalacionPerfilRf,
    orden: 1,
  },
  {
    /** Perfil de Mensajería y Paquetería. */
    encabezado: 'Perfil de Mensajería y Paquetería',
    clave: (item: Domicillio) => item.instalacionPerfilMensajeria,
    orden: 1,
  },
];

export const QUERELLA_TABLA: ConfiguracionColumna<Querella>[] = [
  {
    /** Instalaciones principales de la empresa. */
    encabezado: 'Nombre del sistema o datos para su identificación',
    clave: (item: Querella) => item.sistemaIdentificacion,
    orden: 1,
  },
  {
    /** Tipo de instalación de la empresa. */
    encabezado: 'Lugar de radicación',
    clave: (item: Querella) => item.lugarRadicacion,
    orden: 2,
  },
  {
    /** Entidad federativa donde está ubicada la instalación. */
    encabezado: 'Indique, si cuenta con un sistema de control de inventarios de conformidad con las disposiciones previstas por el Anexo 24.',
    clave: (item: Querella) => item.indiqueSiCuenta,
    orden: 3,
  }
];

export const EMPRESA_TABLA: ConfiguracionColumna<Empresa>[] =
  [
    {
      /** Tipo de Persona */
      encabezado: 'Tipo de Persona',
      clave: (item: Empresa) => item.tipoPersonaMuestra,
      orden: 1,
    },
    {
      /** Nombre completo */
      encabezado: 'Nombre',
      clave: (item: Empresa) => item.nombreCompleto,
      orden: 1,
    },
    {
      /** RFC del Socio IC */
      encabezado: 'RFC',
      clave: (item: Empresa) => item.rfc,
      orden: 1,
    },
    {
      /** Carácter en que actúa el Socio IC */
      encabezado: 'En su carácter de',
      clave: (item: Empresa) => item.caracterDe,
      orden: 1,
    },
    {
      /** Carácter en que actúa el Socio IC */
      encabezado: 'Nacionalidad',
      clave: (item: Empresa) => item.nacionalidad,
      orden: 1,
    },

    {
      /** ¿Obligado a tributar en México? */
      encabezado: 'Obligado a tributar en México',
      clave: (item: Empresa) => item.tributarMexico,
      orden: 1,
    },
    {
      /** Nombre de la empresa */
      encabezado: 'Nombre de la empresa',
      clave: (item: Empresa) => item.nombreEmpresa,
      orden: 1,
    },
];

export const ENLACE_OPERATIVO_TABLA: ConfiguracionColumna<EnlaceOperativo>[] =
  [
    /**
     * Configuración para la columna "RFC".
     * Muestra el RFC de cada enlace operativo.
     */
    {
      encabezado: 'RFC',
      clave: (item: EnlaceOperativo) => item.rfc,
      orden: 1,
    },

    /**
     * Configuración para la columna "Nombre".
     * Muestra el nombre de cada enlace operativo.
     */
    {
      encabezado: 'Nombre',
      clave: (item: EnlaceOperativo) => item.nombre,
      orden: 1,
    },

    /**
     * Configuración para la columna "Apellido Paterno".
     * Muestra el apellido paterno de cada enlace operativo.
     */
    {
      encabezado: 'Apellido Paterno',
      clave: (item: EnlaceOperativo) => item.apellidoPaterno,
      orden: 1,
    },

    /**
     * Configuración para la columna "Apellido Materno".
     * Muestra el apellido materno de cada enlace operativo.
     */
    {
      encabezado: 'Apellido Materno',
      clave: (item: EnlaceOperativo) => item.apellidoMaterno,
      orden: 1,
    },

    /**
     * Configuración para la columna "Ciudad o Estado de Residencia".
     * Muestra la clave de la ciudad o estado de residencia de cada enlace operativo.
     */
    {
      encabezado: 'Ciudad o Estado de Residencia',
      clave: (item: EnlaceOperativo) => item.claveCiudad,
      orden: 1,
    },

    /**
     * Configuración para la columna "Ciudad".
     * Muestra la ciudad de cada enlace operativo.
     */
    {
      encabezado: 'Ciudad',
      clave: (item: EnlaceOperativo) => item.ciudad,
      orden: 1,
    },

    /**
     * Configuración para la columna "Cargo".
     * Muestra el cargo de cada enlace operativo.
     */
    {
      encabezado: 'Cargo',
      clave: (item: EnlaceOperativo) => item.cargo,
      orden: 1,
    },

    /**
     * Configuración para la columna "Teléfono".
     * Muestra el número de teléfono de cada enlace operativo.
     */
    {
      encabezado: 'teléfono',
      clave: (item: EnlaceOperativo) => item.telefono,
      orden: 1,
    },

    /**
     * Configuración para la columna "Correo".
     * Muestra el correo electrónico de cada enlace operativo.
     */
    {
      encabezado: 'Correo',
      clave: (item: EnlaceOperativo) => item.correo,
      orden: 1,
    },

    /**
     * Configuración para la columna "Suplente".
     * Muestra si el enlace operativo es suplente.
     */
    {
      encabezado: 'Suplente',
      clave: (item: EnlaceOperativo) => item.suplente,
      orden: 1,
    },

    /**
     * Configuración para la columna "Calle".
     * Muestra la calle de la dirección de cada enlace operativo.
     */
    {
      encabezado: 'Calle',
      clave: (item: EnlaceOperativo) => item.calle,
      orden: 1,
    },

    /**
     * Configuración para la columna "Número Exterior".
     * Muestra el número exterior de la dirección de cada enlace operativo.
     */
    {
      encabezado: 'Numero Exterior',
      clave: (item: EnlaceOperativo) => item.numeroExterior,
      orden: 1,
    },

    /**
     * Configuración para la columna "Número Interior".
     * Muestra el número interior de la dirección de cada enlace operativo.
     */
    {
      encabezado: 'Numero Interior',
      clave: (item: EnlaceOperativo) => item.numeroInterior,
      orden: 1,
    },

    /**
     * Configuración para la columna "Colonia".
     * Muestra la colonia de la dirección de cada enlace operativo.
     */
    {
      encabezado: 'Colonia',
      clave: (item: EnlaceOperativo) => item.colonia,
      orden: 1,
    },

    /**
     * Configuración para la columna "Código Postal".
     * Muestra el código postal de la dirección de cada enlace operativo.
     */
    {
      encabezado: 'Codigo Postal',
      clave: (item: EnlaceOperativo) => item.codigoPostal,
      orden: 1,
    },

    /**
     * Configuración para la columna "Localidad".
     * Muestra la localidad de la dirección de cada enlace operativo.
     */
    {
      encabezado: 'Localidad',
      clave: (item: EnlaceOperativo) => item.localidad,
      orden: 1,
    },

    /**
     * Configuración para la columna "Delegación o Municipio".
     * Muestra la delegación o municipio de la dirección de cada enlace operativo.
     */
    {
      encabezado: 'Delegacion Municipio',
      clave: (item: EnlaceOperativo) => item.delegacionMunicipio,
      orden: 1,
    },
];

export const  PERSONAS_TABLA: ConfiguracionColumna<RecibirNotificaciones>[] =
  [
    {
      /** RFC del destinatario de la notificación */
      encabezado: 'RFC',
      clave: (item: RecibirNotificaciones) => item.rfc,
      orden: 1,
    },
    {
      /** CURP del destinatario de la notificación */
      encabezado: 'CURP',
      clave: (item: RecibirNotificaciones) => item.curp,
      orden: 2,
    },
    {
      /** Nombre del destinatario de la notificación */
      encabezado: 'Nombre',
      clave: (item: RecibirNotificaciones) => item.nombre,
      orden: 3,
    },
    {
      /** Primer apellido del destinatario */
      encabezado: 'Primer apellido',
      clave: (item: RecibirNotificaciones) => item.apellidoPaterno,
      orden: 4,
    },
    {
      /** Segundo apellido del destinatario */
      encabezado: 'Segundo apellido',
      clave: (item: RecibirNotificaciones) => item.apellidoMaterno,
      orden: 5,
    },
];

export const TRANSPORTISTAS_TABLA: ConfiguracionColumna<TransportistasTable>[] =
  [
    /**
     * Configuración para la columna "RFC".
     * Muestra el RFC de cada transportista.
     */
    {
      encabezado: 'RFC',
      clave: (item: TransportistasTable) => item.rfc,
      orden: 1,
    },

    /**
     * Configuración para la columna "Denominación o Razón Social".
     * Muestra la razón social o denominación del transportista.
     */
    {
      encabezado: 'Denominación o Razón social',
      clave: (item: TransportistasTable) => item.razonSocial,
      orden: 2,
    },

    /**
     * Configuración para la columna "Domicilio".
     * Muestra la dirección del transportista.
     */
    {
      encabezado: 'Domicilio',
      clave: (item: TransportistasTable) => item.domicilio,
      orden: 3,
    },

    /**
     * Configuración para la columna "Registro CAAT vigente".
     * Muestra si el transportista tiene el registro CAAT vigente.
     */
    {
      encabezado: 'Registro CAAT vigente',
      clave: (item: TransportistasTable) => item.caat,
      orden: 4,
    },
];

export const CONTROLADAS_TABLA: ConfiguracionColumna<ControladasTable>[] = [
  {
      encabezado: 'RFC',
      clave: (item: ControladasTable) => item.rfc,
      orden: 1,
    },
    {
      encabezado: 'Denominación o Razón social',
      clave: (item: ControladasTable) => item.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Domicilio',
      clave: (item: ControladasTable) => item.domicilio,
      orden: 3,
    },

    {
      encabezado: 'Participación Accionaria',
      clave: (item: ControladasTable) => item.accinaria,
      orden: 4,
    },
    {
      encabezado: 'Importaciones',
      clave: (item: ControladasTable) => item.importaciones,
      orden: 5,
    },
    {
      encabezado: 'Exportaciones',
      clave: (item: ControladasTable) => item.exportaciones,
      orden: 6,
    },
   ];

