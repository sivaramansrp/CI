import { DetalleMercancia, DetalleMercanciaEstupefacientes } from '../models/detalle-mercancia.model';
import {
  TablaMercanciaClaveConfig,
  TablaMercanciasDatos,
  TablaOpcionConfig,
  TablaScianConfig,
} from '../models/datos-solicitud.model';



/**
 * @const OPCION_TABLA
 * @description Configuración de las opciones de la tabla utilizada en la aplicación.
 * Contiene los encabezados, claves y el orden de las columnas de la tabla.
 * 
 * @property {string} encabezado - El nombre del encabezado de la columna.
 * @property {(ele: TablaOpcionConfig) => string} clave - Función que retorna el valor correspondiente
 * a la clave de la columna basada en el objeto `TablaOpcionConfig`.
 * @property {number} orden - El orden en el que se debe mostrar la columna en la tabla.
 * 
 */
export const OPCION_TABLA = [
  {
    encabezado: 'Fecha creación',
    clave: (ele: TablaOpcionConfig): string => ele.fechaCreacion,
    orden: 1,
  },
  {
    encabezado: 'Mercancía',
    clave: (ele: TablaOpcionConfig): string => ele.mercancia,
    orden: 2,
  },
  {
    encabezado: 'Cantidad',
    clave: (ele: TablaOpcionConfig): string => ele.cantidad,
    orden: 3,
  },
  {
    encabezado: 'Proveedor',
    clave: (ele: TablaOpcionConfig): string => ele.proveedor,
    orden: 4,
  },
];

/**
 * @const SCIAN_TABLA
 * @description Configuración de la tabla utilizada para mostrar información relacionada con el S.C.I.A.N.
 * Contiene los encabezados, claves y el orden de las columnas de la tabla.
 * 
 * @property {string} encabezado - El nombre del encabezado de la columna.
 * @property {(ele: TablaScianConfig) => string} clave - Función que retorna el valor correspondiente
 * a la clave de la columna basada en el objeto `TablaScianConfig`.
 * @property {number} orden - El orden en el que se debe mostrar la columna en la tabla.
 */
export const SCIAN_TABLA = [
  {
    encabezado: 'Clave S.C.I.A.N.',
    clave: (ele: TablaScianConfig): string => ele.clave,
    orden: 1,
  },
  {
    encabezado: 'Descripcion del S.C.I.A.N.',
    clave: (ele: TablaScianConfig): string => ele.descripcion,
    orden: 1,
  },
];

/**
 * @const DATOS_MERCANCIA_CLAVE_TABLA
 * @description Configuración de la tabla utilizada para mostrar información relacionada con la clave de mercancía.
 * Contiene los encabezados, claves y el orden de las columnas de la tabla.
 * 
 * @property {string} encabezado - El nombre del encabezado de la columna.
 * @property {(ele: TablaMercanciaClaveConfig) => string} clave - Función que retorna el valor correspondiente
 * a la clave de la columna basada en el objeto `TablaMercanciaClaveConfig`.
 * @property {number} orden - El orden en el que se debe mostrar la columna en la tabla.
 */
export const DATOS_MERCANCIA_CLAVE_TABLA = [
  {
    encabezado: 'Clave de los lotes',
    clave: (ele: TablaMercanciaClaveConfig): string => ele.clave,
    orden: 1,
  },
  {
    encabezado: 'Fecha de fabricacio',
    clave: (ele: TablaMercanciaClaveConfig): string => ele.fabricacion,
    orden: 1,
  },
  {
    encabezado: 'Fecha de caducidad',
    clave: (ele: TablaMercanciaClaveConfig): string => ele.caducidad,
    orden: 1,
  },
];

/**
 * @const SCIAN_TABLA_DATA
 * @description Datos de ejemplo para la tabla S.C.I.A.N.
 * Contiene una lista de objetos que representan las claves y descripciones del S.C.I.A.N.
 * 
 * @property {string} clave - Clave del S.C.I.A.N.
 * @property {string} descripcion - Descripción del S.C.I.A.N.
 */
export const SCIAN_TABLA_DATA: TablaScianConfig[] = [
  { clave: '001', descripcion: 'Descripción 1' },
  { clave: '002', descripcion: 'Descripción 2' },
];


/**
 * @const ALERTA_OPCIONS
 * @description
 * Este constante contiene una plantilla HTML que representa un mensaje de alerta.
 * El mensaje informa al usuario que al dar doble clic en una solicitud, los datos
 * de dicha solicitud se copiarán en la solicitud actual.
 * 
 * @uso
 * Esta constante puede ser utilizada en componentes o vistas donde se requiera
 * mostrar esta alerta como parte de un flujo de trabajo relacionado con solicitudes.
 */
export const ALERTA_OPCIONS = `<p>Al dar doble-clic en una Solicitud, se copiarán sus datos en esta Solicitud.</p>`;

/**
 * @const ALERTA_DE_MANIFESTO_Y_DECLARACIONES
 * @description
 * Este constante contiene una plantilla HTML que representa un mensaje de alerta
 * relacionado con manifiestos y declaraciones. Incluye un checkbox para la selección
 * del manifiesto y un párrafo que describe los requisitos y normatividad aplicable.
 * 
 * @detalle
 * - El checkbox permite al usuario confirmar que cumple con los requisitos y normatividad aplicable.
 * - El párrafo informa al usuario sobre las posibles verificaciones de la autoridad sanitaria
 *   y las sanciones por falsedad de declaraciones.
 * - También se menciona que la notificación del trámite se realizará a través de la Ventanilla
 *   Única de Comercio Exterior.
 * 
 * @uso
 * Esta constante puede ser utilizada en componentes o vistas donde se requiera mostrar
 * esta alerta como parte de un formulario o proceso de declaración.
 */
export const ALERTA_DE_MANIFESTO_Y_DECLARACIONES = `<div class="row">
    <div class="col-md-1 mt-4">
        <div class="form-check mt-4">
            <input class="form-check-input" type="checkbox" value="" id="manifiestosCasillaDeVerificacion">
            <label class="form-check-label" for="manifiestosCasillaDeVerificacion" (click)="manifestoSellecionado()">*
            </label>
        </div>
    </div>
    <div class="col-md-11">
        <p>Cumplo con los requisitos y normatividad aplicable, sin que me eximan de que la autoridad sanitaria verifique su
            cumplimiento, esto sin perjuicio de las sanciones en que puedo incurrir por falsedad de declaraciones dadas a una
            autoridad. Asimismo acepto que la notificación de este tramite, sea a través de la Ventanilla Única de Comercio
            Exterior por los mecanismos de la misma.</p>
    </div>
</div>`;

/**
 * Represents a constant array `PRODUCTO_TABLA` that defines the structure of a product table.
 * Each object in the array contains the following properties:
 *
 * - `encabezado`: A string representing the header of the column.
 * - `clave`: A function that takes an object of type `TablaMercanciasDatos` and returns the value of the corresponding key.
 * - `orden`: A number representing the order of the column in the table.
 *
 * @constant
 * @type {Array<{ encabezado: string; clave: (ele: TablaMercanciasDatos) => any; orden: number }>}
 */
export const PRODUCTO_TABLA = [
  {
    encabezado: 'Clasificación del producto',
    clave: (ele: TablaMercanciasDatos): string => ele.clasificacionProducto, // Reemplaza 'ele.clasificacionProducto' con la clave correcta
    orden: 1,
  },
  {
    encabezado: 'Especificar clasificación del producto',
    clave: (ele: TablaMercanciasDatos): string =>
      ele.especificarClasificacionProducto, // Reemplaza 'ele.especificarClasificacionProducto' con la clave correcta
    orden: 2,
  },
  {
    encabezado: 'Denominación específica del producto',
    clave: (ele: TablaMercanciasDatos): string |undefined =>
      ele.denominacionEspecificaProducto, // Reemplaza 'ele.denominacionEspecificaProducto' con la clave correcta
    orden: 3,
  },
  {
    encabezado: 'Denominación distintiva',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.denominacionDistintiva, // Reemplaza 'ele.denominacionDistintiva' con la clave correcta
    orden: 4,
  },
  {
    encabezado: 'Denominación común, nombre común o nombre científico',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.denominacionComun, // Reemplaza 'ele.denominacionComun' con la clave correcta
    orden: 5,
  },
  {
    encabezado: 'Forma farmacéutica',
    clave: (ele: TablaMercanciasDatos): string => ele.formaFarmaceutica, // Reemplaza 'ele.formaFarmaceutica' con la clave correcta
    orden: 6,
  },
  {
    encabezado: 'Estado físico',
    clave: (ele: TablaMercanciasDatos): string => ele.estadoFisico, // Reemplaza 'ele.estadoFisico' con la clave correcta
    orden: 7,
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (ele: TablaMercanciasDatos): string => ele.fraccionArancelaria, // Reemplaza 'ele.fraccionArancelaria' con la clave correcta
    orden: 8,
  },
  {
    encabezado: 'Descripción de la fracción',
    clave: (ele: TablaMercanciasDatos): string |undefined => ele.descripcionFraccion, // Reemplaza 'ele.descripcionFraccion' con la clave correcta
    orden: 9,
  },
  {
    encabezado: 'Unidad de medida de comercialización (UMC)',
    clave: (ele: TablaMercanciasDatos): string |undefined=>
      ele.unidadMedidaComercializacion, // Reemplaza 'ele.unidadMedidaComercializacion' con la clave correcta
    orden: 10,
  },
  {
    encabezado: 'Cantidad UMC',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMC, // Reemplaza 'ele.cantidadUMC' con la clave correcta
    orden: 11,
  },
  {
    encabezado: 'Unidad de medida de tarifa (UMT)',
    clave: (ele: TablaMercanciasDatos): string => ele.unidadMedidaTarifa, // Reemplaza 'ele.unidadMedidaTarifa' con la clave correcta
    orden: 12,
  },
  {
    encabezado: 'Cantidad UMT',
    clave: (ele: TablaMercanciasDatos): string => ele.cantidadUMT, // Reemplaza 'ele.cantidadUMT' con la clave correcta
    orden: 13,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: TablaMercanciasDatos): string => ele.presentacion, // Reemplaza 'ele.Presentación' con la clave correcta
    orden: 14,
  },
  {
    encabezado: 'Número de registro sanitario',
    clave: (ele: TablaMercanciasDatos): string => ele.numeroRegistroSanitario, // Reemplaza 'ele.numeroRegistroSanitario' con la clave correcta
    orden: 15,
  },
  {
    encabezado: 'País de origen',
    clave: (ele: TablaMercanciasDatos): string => ele.paisOrigen, // Reemplaza 'ele.paisOrigen' con la clave correcta
    orden: 16,
  },
  {
    encabezado: 'País de procedencia',
    clave: (ele: TablaMercanciasDatos): string => ele.paisProcedencia, // Reemplaza 'ele.paisProcedencia' con la clave correcta
    orden: 17,
  },
  {
    encabezado: 'Tipo producto',
    clave: (ele: TablaMercanciasDatos): string => ele.tipoProducto, // Reemplaza 'ele.tipoProducto' con la clave correcta
    orden: 18,
  },
  {
    encabezado: 'Uso especifico',
    clave: (ele: TablaMercanciasDatos): string => ele.usoEspecifico, // Reemplaza 'ele.usoEspecifico' con la clave correcta
    orden: 19,
  },
];

/**
 * Constante que representa los datos de la tabla de mercancías para productos.
 * 
 * @const
 * @type {TablaMercanciasDatos[]}
 * @description Contiene un arreglo con la información inicial de un producto, incluyendo su clasificación, denominación, forma farmacéutica, estado físico, fracción arancelaria, unidad de medida, cantidad, presentación, número de registro sanitario, país de origen, país de procedencia, tipo de producto y uso específico.
 */
export const PRODUCTO_TABLA_DATA: TablaMercanciasDatos[] = [
  {
    clasificacionProducto: '1',
    especificarClasificacionProducto: '',
    denominacionEspecificaProducto: 'QA',
    denominacionDistintiva: 'QA',
    denominacionComun: 'QA',
    formaFarmaceutica: '',
    estadoFisico: '',
    fraccionArancelaria: '',
    descripcionFraccion: '',
    unidadMedidaComercializacion: '',
    cantidadUMC: '',
    unidadMedidaTarifa: '',
    cantidadUMT: '',
    presentacion: '',
    numeroRegistroSanitario: '',
    paisOrigen: '',
    paisProcedencia: '',
    tipoProducto: '',
    usoEspecifico: '',
  },
];

/** "t" se utiliza para continuar el botón que se usa globalmente para el procedimiento 230401 */
export const CONTINUAR: string = 't';


/**
 * @const CROSLISTA_DE_PAISES
 * @description Lista de países representados como cadenas de texto. 
 * Esta constante contiene nombres de países con sus respectivas denominaciones oficiales.
 * 
 * @type {string[]}
 */
export const CROSLISTA_DE_PAISES: string[] = [
  'AFGANISTÁN (EMIRATO ISLÁMICO)',
  'ALBANIA (REPÚBLICA DE)',
  'ALEMANIA (REPÚBLICA FEDERAL DE)',
  'ANDORRA (PRINCIPADO DE)',
  'ANGOLA (REPÚBLICA DE)',
  'ANGUILLA',
  'ANTIGUA Y BARBUDA',
  'ARABIA SAUDITA (COMUNIDAD ECONÓMICA EUROPEA)',
  'ARGELIA (REPÚBLICA DEMOCRÁTICA Y POPULAR DE)',
  'ARGENTINA (REPÚBLICA)',
  'AUSTRALIA (COMMONWEALTH OF)',
  'AUSTRIA (REPUBLIC OF)',
  'BAHAMAS (COMMONWEALTH OF THE)',
  'BAHRAIN (KINGDOM OF)',
  "BANGLADESH (PEOPLE'S REPUBLIC OF)",
  'BARBADOS',
  'BELGIUM (KINGDOM OF)',
  'BELIZE',
  'BENIN (REPUBLIC OF)',
  'BHUTAN (KINGDOM OF)',
];

export const CROSLISTA_DE_FORMAS_FARMACEUTICAS: string[] = [
  
    "AEROSOL",
    "CAPSULAS",
    "COMPRIMIDOS",
    "CREMA",
    "EMULSIÓN"
  
]


/**
 * @const TABLA_OPCION_DATA
 * @description Configuración de opciones para la tabla de datos de solicitud.
 * Contiene información sobre la fecha de creación, mercancía, cantidad y proveedor.
 *
 * @type {TablaOpcionConfig[]}
 * @property {string} fechaCreacion - Fecha y hora de creación del registro en formato 'YYYY-MM-DD HH:mm:ss.S'.
 * @property {string} mercancia - Descripción de la mercancía, especificando restricciones o características.
 * @property {string} cantidad - Cantidad asociada a la mercancía.
 * @property {string} proveedor - Nombre del proveedor relacionado con la mercancía.
 */
export const TABLA_OPCION_DATA: TablaOpcionConfig[] = [
  {
    fechaCreacion: '2025-02-19 11:26:55.0',
    mercancia:
      'Los demás. Únicamente: Los que no sean estupefacientes o psicotrópicos, o contengan dichas sustancias...',
    cantidad: '0.5',
    proveedor: 'TramitesVUCEM SA de CV',
  },
  {
    fechaCreacion: '2024-11-08 13:02:58.0',
    mercancia:
      'Los demás. Únicamente: Los que no sean estupefacientes o psicotrópicos, o contengan',
    cantidad: '0.5',
    proveedor: 'TramitesVUCEM SA de CV',
  },
];

/**
 * @const PROCEDIMIENTOS_NO_PARA_ELEMENTO_COLAPSABLE
 * @description Lista de identificadores de procedimientos que no deben ser utilizados 
 *              para elementos colapsables en la aplicación.
 * @type {number[]}
*/
export const PROCEDIMIENTOS_NO_PARA_ELEMENTO_COLAPSABLE = [ 260206,
  260214, 260216, 260205, 260217, 260218, 260102,260301, 260208,260207, 260209,260201, 
  260219,260302, 260304 , 260103
];

/**
 * @const PROCEDIMIENTOS_NO_PARA_ELEMENTO_TABLA
 * @description Lista de identificadores de procedimientos que no deben ser utilizados 
 *              para elementos de tabla en la aplicación.
 * @type {number[]}
*/
export const OCULTAR_PROVEEDOR = [260102];


/**
 * @const OCULTAR_FACTURADOR
 * @description Lista de identificadores de procedimientos para los cuales el elemento "Facturador" debe ser ocultado en la aplicación.
 * 
 * @type {number[]}
 */
export const OCULTAR_FACTURADOR = [260102];


/**
 * @const PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE
 * @description Lista de identificadores de procedimientos específicos para no contribuyentes.
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 */
export const PROCEDIMIENTOS_PARA_NO_CONTRIBUYENTE = [260216, 260208, 260209];

/**
 * @const PROCEDIMIENTOS_NO_PARA_ELEMENTO_CORREO_ELECTRONIC
 * @description Lista de identificadores de procedimientos para los cuales el elemento "Correo Electrónico" no debe ser utilizado en la aplicación.
 * 
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (PROCEDIMIENTOS_NO_PARA_ELEMENTO_CORREO_ELECTRONIC.includes(procedimientoId)) {
 *   // Lógica para ocultar o deshabilitar el elemento "Correo Electrónico"
 * }
 */
export const PROCEDIMIENTOS_NO_PARA_ELEMENTO_CORREO_ELECTRONIC = [260102, 260301,260302, 260304];


/**
 * @const PROCEDIMIENTOS_NO_PARA_ELEMENTO_RFC_DEL_SANITARIO
 * @description Lista de identificadores de procedimientos para los cuales el elemento "RFC del Sanitario" no debe ser utilizado en la aplicación.
 * 
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (PROCEDIMIENTOS_NO_PARA_ELEMENTO_RFC_DEL_SANITARIO.includes(procedimientoId)) {
 *   // Lógica para ocultar o deshabilitar el elemento "RFC del Sanitario"
 * }
 */
export const PROCEDIMIENTOS_NO_PARA_ELEMENTO_RFC_DEL_SANITARIO = [260301, 260208,260302,260304,260103];


/**
 * @const PROCEDIMIENTOS_NO_PARA_ELEMENTO_CALLE
 * @description Lista de identificadores de procedimientos que no aplican para el elemento "calle".
 * @type {number[]}
 * @example
 * // Uso:
 * if (PROCEDIMIENTOS_NO_PARA_ELEMENTO_CALLE.includes(procedimientoId)) {
 *   // Lógica para manejar procedimientos no aplicables
 * }
 */
export const PROCEDIMIENTOS_NO_PARA_ELEMENTO_CALLE = [260301,260302, 260304]


/**
 * @const PROCEDIMIENTOS_NO_PARA_ELEMENTO_REGIMEN_Y_ADUNADEENTRADAS
 * @description Lista de identificadores de procedimientos para los cuales los elementos "Régimen" y "Aduana de Entradas" no deben ser utilizados en la aplicación.
 * 
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (PROCEDIMIENTOS_NO_PARA_ELEMENTO_REGIMEN_Y_ADUNADEENTRADAS.includes(procedimientoId)) {
 *   // Lógica para ocultar o deshabilitar los elementos "Régimen" y "Aduana de Entradas"
 * }
 */
export const PROCEDIMIENTOS_NO_PARA_ELEMENTO_REGIMEN_Y_ADUNADEENTRADAS = [260301,260302, 260304,260103];

/**
 * @const PROCEDIMIENTOS_PARA_DESHABILITAR_MUNICIPIO_ALCALDIA
 * @description Lista de procedimientos específicos que requieren deshabilitar
 * el campo de municipio o alcaldía en la interfaz de usuario.
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (PROCEDIMIENTOS_PARA_DESHABILITAR_MUNICIPIO_ALCALDIA.includes(codigoProcedimiento)) {
 *   deshabilitarCampoMunicipio();
 * }
 */
export const PROCEDIMIENTOS_PARA_DESHABILITAR_MUNICIPIO_ALCALDIA=[260301]

/**
 * @const PROCEDIMIENTOS_PARA_CORREO_ELECTRONICO_EN_MISMA_FILA
 * @description Lista de identificadores de procedimientos para los cuales el elemento "Correo Electrónico" debe estar en la misma fila en la aplicación.
 * 
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (PROCEDIMIENTOS_PARA_CORREO_ELECTRONICO_EN_MISMA_FILA.includes(procedimientoId)) {
 *   // Lógica para mostrar el elemento "Correo Electrónico" en la misma fila
 * }
 */
export const PROCEDIMIENTOS_PARA_CORREO_ELECTRONICO_EN_MISMA_FILA = [260208,260103];

/**
 * @const REPRESENTANTE_LEGAL
 * @description Arreglo que contiene los identificadores relacionados con el representante legal.
 * @type {number[]}
 */
export const REPRESENTANTE_LEGAL = [260208];

/**
 * @const BANCO
 * @description Lista de identificadores de procedimientos relacionados con el banco.
 * 
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (BANCO.includes(procedimientoId)) {
 *   // Lógica para manejar procedimientos relacionados con el banco
 * }
 */
export const BANCO = [260208, 260209, 260207, 260201, 260219,260302, 260304,260103];

/**
 * @const DATOS_MERCANCIA_CAMPO
 * @description Arreglo que contiene los identificadores de los campos relacionados con los datos de mercancía.
 * @type {number[]}
 */
export const DATOS_MERCANCIA_CAMPO = [260208, 260209];


/**
 * @const PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_MATERNO
 * @description Lista de identificadores de procedimientos específicos para los cuales
 * el campo de "Apellido Materno" debe ser deshabilitado en la aplicación.
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_MATERNO.includes(procedimientoId)) {
 *   deshabilitarCampoApellidoMaterno();
 * }
 */
export const PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_MATERNO=[260301,260207,260201,260302, 260304,260103]


/**
 * @const PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_PATERNO
 * @description Lista de identificadores de procedimientos específicos que requieren deshabilitar el campo de apellido paterno.
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_PATERNO.includes(procedimientoId)) {
 *   // Lógica para deshabilitar el campo de apellido paterno
 * }
 */
export const PROCEDIMIENTOS_PARA_DESHABILITAR_APELLIDO_PATERNO=[260301,260207,260201,260302, 260304,260103]

/**
 * @const PROCEDIMIENTOS_PARA_DESHABILITAR_NOMBRE_RAZON_SOCIAL
 * @description Lista de códigos de procedimientos específicos que requieren deshabilitar el campo de 
 * nombre o razón social en el formulario de solicitud.
 * @type {number[]}
 * @example
 * // Ejemplo de uso:
 * if (PROCEDIMIENTOS_PARA_DESHABILITAR_NOMBRE_RAZON_SOCIAL.includes(codigoProcedimiento)) {
 *   deshabilitarCampoNombreRazonSocial();
 * }
 */
export const PROCEDIMIENTOS_PARA_DESHABILITAR_NOMBRE_RAZON_SOCIAL=[260301,260207,260201,260302, 260304,260103]

/**
 * @const PROCEDIMIENTOS_PARA_COLONIA_O_EQUIVALENTE
 * @description Lista de identificadores numéricos que representan procedimientos específicos
 *              relacionados con colonias o equivalentes en el sistema.
 * @type {number[]}
 */
export const PROCEDIMIENTOS_PARA_COLONIA_O_EQUIVALENTE=[260207,260208, 260209, 260219]

/**
 * @enum {number}
 * @description Enumeración que define los números de trámite utilizados en la aplicación.
 * @name NUMERO_TRAMITE
 * @property {number} TRAMITE_260205 - Representa el número de trámite 260205.
 * @property {number} TRAMITE_260301 - Representa el número de trámite 260301.
 */
export enum NUMERO_TRAMITE {
  TRAMITE_260205 = 260205,
  TRAMITE_260301 = 260301,
  TRAMITE_260103 = 260103,
}

/**
 * @const DETALLE_MERCANCIA_TABLA
 * @description Constante que define la configuración de la tabla para mostrar los detalles de mercancía.
 * Cada objeto dentro del arreglo representa una columna de la tabla con su encabezado, 
 * clave para acceder al valor correspondiente y el orden en el que se mostrará.
 *
 * @property {string} encabezado - El título de la columna que se mostrará en la tabla.
 * @property {Function} clave - Una función que toma un objeto de tipo `DetalleMercancia` y devuelve el valor correspondiente para la columna.
 * @property {number} orden - El orden en el que se mostrará la columna en la tabla.
 *
 */
export const DETALLE_MERCANCIA_TABLA = [
  {
    encabezado: 'Forma farmacéutica',
    clave: (ele: DetalleMercancia): string => ele.formaFormaceutica,
    orden: 1,
  },
  {
    encabezado: 'Número de registro sanitario',
    clave: (ele: DetalleMercancia): string => ele.numeroDeRegistro,
    orden: 2,
  },
  {
    encabezado: 'Marcas Distintivas',
    clave: (ele: DetalleMercancia): string => ele.marcasDistintivas,
    orden: 3,
  },
  {
    encabezado: 'Presentación',
    clave: (ele: DetalleMercancia): string => ele.tipoDeEnvase,
    orden: 4,
  },
];

/**
 * @const DETALLE_MERCANCIA_TABLA_ESTUPEFACIENTES
 * @description Define una tabla de detalles para mercancías relacionadas con estupefacientes.
 * Cada objeto en la tabla representa una columna con su encabezado, clave de acceso y orden.
 * 
 * @property {string} encabezado - El título de la columna que se mostrará en la tabla.
 * @property {Function} clave - Una función que toma un objeto de tipo `DetalleMercanciaEstupefacientes` 
 * y devuelve el valor correspondiente para esa columna.
 * @property {number} orden - El orden en el que se mostrará la columna en la tabla.
 * .
 */
export const DETALLE_MERCANCIA_TABLA_ESTUPEFACIENTES = [
  {
    encabezado: 'Presentación',
    clave: (ele: DetalleMercanciaEstupefacientes): string => ele.presentacion,
    orden: 1,
  },
  {
    encabezado: 'Número de piezas',
    clave: (ele: DetalleMercanciaEstupefacientes): string => ele.numeroDePiezasAFabricar,
    orden: 2,
  },
  {
    encabezado: 'Descripción del número de piezas a fabricar',
    clave: (ele: DetalleMercanciaEstupefacientes): string => ele.descripcionNumeroDePiezas,
    orden: 3,
  },
  {
    encabezado: 'Registro Sanitario',
    clave: (ele: DetalleMercanciaEstupefacientes): string => ele.numeroRegistroSanitario,
    orden: 4,
  },
 
];

/**
 * @const STR_NACIONAL
 * @type {string}
 * @description Constante que representa el valor 'Nacional'.
 * @usage Utilizada para identificar solicitudes de ámbito nacional.
 */
export const STR_NACIONAL = 'Nacional';

/**
 * @const DESCRIPCION_FRACCION_DESHABILITADO_VALOR
 * @type {string}
 * @description Constante que representa el valor deshabilitado para la descripción de la fracción.
 * Este valor se utiliza para identificar fracciones específicas que no pueden ser modificadas.
 * 
 * @usage Utilizada en formularios o tablas donde se requiera mostrar una descripción fija para una fracción.
 */
export const DESCRIPCION_FRACCION_DESHABILITADO_VALOR = "Algodón absorbente o gasas, con sustancias medicinales";

/**
 * @const UMT_DESHABILITADO_VALOR
 * @description Constante que representa el valor deshabilitado de la unidad de medida utilizada en la aplicación.
 * @type {string}
 * @valor "Kilogramo"
 */
export const UMT_DESHABILITADO_VALOR="Kilogramo";

/** Mensaje mostrado cuando no hay fila seleccionada. */
export const MENSAJE_SIN_FILA_SELECCIONADA="Seleciona un registro";

/**
 * @description
 *  Identificadores de notificación.
 */
export const MOSTRAR_NOTIFICACION = [260219,260302]
