import { CatalogosSelect, ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { Domicillio, Empresa, Querella } from "../models/adace.model";
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
