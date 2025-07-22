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
        value: 'DomicilioNuevo',
    },
    {
        /**
         * Opción para indicar que se desea modificar un domicilio existente.
         */
        label: 'Modificar domicilio',
        value: 'ModificarDomicilio',
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
 * Encabezados de la tabla que muestra los datos del nuevo domicilio registrado.
 */
export const MOSTRAR_GRID_NUEVO_HEADER = [
 /**
 * Identificador único del inmueble dentro del sistema.
 */
'idInmueble',

/**
 * Dirección física del inmueble.
 */
'Domicilio',

/**
 * Código postal asociado al domicilio registrado.
 */
'Código Postal',

/**
 * Estado o entidad federativa donde se encuentra ubicado el domicilio.
 */
'Entidad federativa',

/**
 * Clave identificadora única de la entidad federativa.
 */
'cveEntidad',

/**
 * Nombre de la alcaldía o municipio correspondiente al domicilio.
 */
'Alcaldía o Municipio',

/**
 * Clave identificadora del municipio en el sistema.
 */
'cveMunicipio',

/**
 * Tipo de documento con el que se acredita el uso y goce del inmueble.
 */
'Tipo de Documento con el que se acredita el uso y goce',

/**
 * Clave del tipo de documento que acredita el uso del inmueble.
 */
'cveTipoDoc',

/**
 * Fecha en la que comienza la vigencia del documento acreditador.
 */
'Fecha inicio de vigencia',

/**
 * Fecha en la que finaliza la vigencia del documento acreditador.
 */
'Fecha fin vigencia',

/**
 * Espacio destinado para observaciones adicionales sobre el inmueble o su documentación.
 */
'Observaciones',

];

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

