/**
 * Mensaje informativo relacionado con la modificación de las partes contratantes
 * en la documentación que acredita el uso y goce de un domicilio.
 * Se indica que debe incluirse un escrito libre en el apartado correspondiente.
 */
export const MESSAGE_NAC: string = 
    "En caso de modificar las partes contratantes en la documentación con la que acreditó el legal uso y goce del domicilio, se tendrá que incluir un escrito libre en el apartado de Anexar requisitos, mediante el tipo de documento 'Otros' que detalle los cambios realizados.";

/**
 * Opciones de radio para seleccionar el tipo de cambio de domicilio.
 */
export const RADIO_OPTIONS = [
    {
        /**
         * Opción para indicar que se trata de un domicilio nuevo.
         */
        label: 'Domicilio nuevo',
        value: '1',
    },
    {
        /**
         * Opción para indicar que se desea modificar un domicilio existente.
         */
        label: 'Modificar domicilio',
        value: '0',
    },
];

/**
 * Datos de fracción arancelaria disponibles en el sistema.
 */
export const FRACCION_ARANCELARIA_DATA = [
    {
        /**
         * Identificador único de la fracción arancelaria.
         */
        id: 1,

        /**
         * Descripción de la fracción arancelaria.
         */
        descripcion: 'ENSENADA',
    },
];

/**
 * Opciones de tipos de documentos disponibles.
 */
export const CVE_TIPO_DOC_DATA = [
    {
        /**
         * Identificador único del tipo de documento.
         */
        id: 1,

        /**
         * Descripción del tipo de documento.
         */
        descripcion: 'contrato de compra',
    },
];
 /**
 * Configuración de las columnas para la tabla de mercancías.
 * Define el encabezado, la clave a mostrar por fila y el orden.
 * Utiliza funciones para mapear datos del modelo Mercancias.
 */
export const CONFIGURATION_TABLA_MOSTRAR_GRID_NUEVO_HEADER = [
  {
    encabezado: 'ID Inmueble',
    clave: (item: MostrarGridNuevoHeader): string => item.idInmueble,
    orden: 1
  },
  {
    encabezado: 'Domicilio',
    clave: (item: MostrarGridNuevoHeader): string => item.domicilio,
    orden: 2
  },
  {
    encabezado: 'Código Postal',
    clave: (item: MostrarGridNuevoHeader): string => item.codigoPostal,
    orden: 3
  },
  {
    encabezado: 'Entidad Federativa',
    clave: (item: MostrarGridNuevoHeader): string => item.entidadFederativa,
    orden: 4
  },
  {
    encabezado: 'Clave Entidad',
    clave: (item: MostrarGridNuevoHeader): string => item.cveEntidad,
    orden: 5
  },
  {
    encabezado: 'Alcaldía o Municipio',
    clave: (item: MostrarGridNuevoHeader): string => item.alcaldiaOMunicipio,
    orden: 6
  },
  {
    encabezado: 'Clave Municipio',
    clave: (item: MostrarGridNuevoHeader): string => item.cveMunicipio,
    orden: 7
  },
  {
    encabezado: 'Tipo de Documento',
    clave: (item: MostrarGridNuevoHeader): string => item.tipoDeDocumentoConElQueSeAcreditaElUsoYGoce,
    orden: 8
  },
  {
    encabezado: 'Clave Tipo Documento',
    clave: (item: MostrarGridNuevoHeader): string => item.cveTipoDoc,
    orden: 9
  },
  {
    encabezado: 'Fecha Inicio de Vigencia',
    clave: (item: MostrarGridNuevoHeader): string => item.fechaInicioDeVigencia,
    orden: 10
  },
  {
    encabezado: 'Fecha Fin de Vigencia',
    clave: (item: MostrarGridNuevoHeader): string => item.fechaFinVigencia,
    orden: 11
  },
  {
    encabezado: 'Observaciones',
    clave: (item: MostrarGridNuevoHeader): string => item.observaciones,
    orden: 12
  }
];



/**
 * Interfaz que representa la información del inmueble.
 */
export interface MostrarGridNuevoHeader {
  id?: number;
  /** Identificador único del inmueble dentro del sistema. */
  idInmueble: string;

  /** Dirección física del inmueble. */
  domicilio: string;

  /** Código postal asociado al domicilio registrado. */
  codigoPostal: string;

  /** Estado o entidad federativa donde se encuentra ubicado el domicilio. */
  entidadFederativa: string;

  /** Clave identificadora única de la entidad federativa. */
  cveEntidad: string;

  /** Nombre de la alcaldía o municipio correspondiente al domicilio. */
  alcaldiaOMunicipio: string;

  /** Clave identificadora del municipio en el sistema. */
  cveMunicipio: string;

  /** Tipo de documento con el que se acredita el uso y goce del inmueble. */
  tipoDeDocumentoConElQueSeAcreditaElUsoYGoce: string;

  /** Clave del tipo de documento que acredita el uso del inmueble. */
  cveTipoDoc: string;

  /** Fecha en la que comienza la vigencia del documento acreditador. */
  fechaInicioDeVigencia: string;

  /** Fecha en la que finaliza la vigencia del documento acreditador. */
  fechaFinVigencia: string;

  /** Espacio destinado para observaciones adicionales sobre el inmueble o su documentación. */
  observaciones: string;
}


/**
 * Encabezados de la tabla de modificación de las partes involucradas en el trámite.
 */
/**
 * Encabezados de la tabla que muestra las modificaciones de las partes involucradas en el trámite.
 */
export const MODIFICACION_PARTES_HEADER = [
  /**
   * Registro Federal de Contribuyentes de la parte modificada.
   */
  'RFC',

  /**
   * Nombre de la persona o entidad involucrada en la modificación.
   */
  'Nombre',

  /**
   * Rol o carácter de la persona dentro del proceso de modificación.
   */
  'Carácter de',
];

