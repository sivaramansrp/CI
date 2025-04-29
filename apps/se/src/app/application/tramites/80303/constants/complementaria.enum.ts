import { AnexoExportacion, AnexoImportacion, DatosContribuyente, DatosEmpresaSubmanufacturera, DatosPlantaManufacturera, Federatario, FederatarioRealizaranLasOperaciones, Sensible, ServicioImmex } from "../models/complementaria.model";

/**
 * CONFIGURACION_CONTRIBUYENTES
 * 
 * Esta constante define una configuración para la representación de datos de contribuyentes
 * en una tabla o lista. Cada objeto dentro del arreglo representa una columna con:
 * 
 * - `encabezado`: El nombre visible de la columna.
 * - `clave`: Una función que extrae el valor del objeto `DatosContribuyente` correspondiente.
 * - `orden`: El orden en el que aparece la columna.
 */
export const CONFIGURACION_CONTRIBUYENTES_ACCIONISTAS = [
    {
      encabezado: 'Registro Federal de Contribuyente (RFC)',
      clave: (ele: DatosContribuyente): string | undefined => ele.RFC,
      orden: 1,
    },
    {
      encabezado: 'Nombre(s)',
      clave: (ele: DatosContribuyente): string | undefined => ele.Nombres,
      orden: 2,
    },
    {
      encabezado: 'Primer apellido',
      clave: (ele: DatosContribuyente): string | undefined => ele.PrimerApellido,
      orden: 3,
    },
    {
      encabezado: 'Segundo apellido',
      clave: (ele: DatosContribuyente): string | undefined => ele.SegundoApellido,
      orden: 4,
    },
  ];


/**
 * CONFIGURACION_FEDERATARIOS
 * 
 * Configuración de columnas para la tabla de federatarios.
 */
export const CONFIGURACION_FEDERATARIOS = [
  {
    encabezado: 'Nombre',
    clave: (ele: Federatario): string | undefined => ele.Nombre,
    orden: 1,
  },
  {
    encabezado: 'Primer apellido',
    clave: (ele: Federatario): string | undefined => ele.PrimerApellido,
    orden: 2,
  },
  {
    encabezado: 'Segundo apellido',
    clave: (ele: Federatario): string | undefined => ele.SegundoApellido,
    orden: 3,
  },
  {
    encabezado: 'Número acta',
    clave: (ele: Federatario): string | undefined => ele.NumeroActa,
    orden: 4,
  },
  {
    encabezado: 'Fecha acta',
    clave: (ele: Federatario): string | undefined => ele.FechaActa,
    orden: 5,
  },
  {
    encabezado: 'Número notaría',
    clave: (ele: Federatario): string | undefined => ele.NumeroNotaria,
    orden: 6,
  },
  {
    encabezado: 'Municipio o Delegación',
    clave: (ele: Federatario): string | undefined => ele.MunicipioDelegacion,
    orden: 7,
  },
  {
    encabezado: 'Estado o Distrito Federal',
    clave: (ele: Federatario): string | undefined => ele.EstadoDistrito,
    orden: 8,
  },
];


/**
 * CONFIGURACION_FEDERATARIOS_DOMICILIO
 * 
 * Esta constante define una configuración para la representación de datos de los federatarios
 * en una tabla o lista. Cada objeto dentro del arreglo representa una columna con:
 * 
 * - `encabezado`: El nombre visible de la columna.
 * - `clave`: Una función que extrae el valor del objeto `Federatario` correspondiente.
 * - `orden`: El orden en el que aparece la columna.
 */
export const CONFIGURACION_FEDERATARIOS_DOMICILIO = [
    {
      encabezado: 'Calle',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.Calle,
      orden: 1,
    },
    {
      encabezado: 'Número exterior',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.NumeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número interior',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.NumeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código postal',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.CodigoPostal,
      orden: 4,
    },
    {
      encabezado: 'Colonia',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.Colonia,
      orden: 5,
    },
    {
      encabezado: 'Localidad',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.Localidad,
      orden: 6,
    },
    {
      encabezado: 'Municipio o Delegación',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.MunicipioDelegacion,
      orden: 7,
    },
    {
      encabezado: 'Estado o Distrito Federal',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.EstadoDistrito,
      orden: 8,
    },
    {
      encabezado: 'País',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.Pais,
      orden: 9,
    },
    {
      encabezado: 'Registro Federal de Contribuyente (RFC)',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.RFC,
      orden: 10,
    },
    {
      encabezado: 'Domicilio fiscal del solicitante',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.DomicilioFiscal,
      orden: 11,
    },
    {
      encabezado: 'Denominación o razón social',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.DenominacionSocial,
      orden: 12,
    },
    {
      encabezado: 'Estatus',
      clave: (ele: FederatarioRealizaranLasOperaciones): string | undefined => ele.Estatus,
      orden: 13,
    }
];

/**
 * Configuración de las empresas submanufactureras.
 * 
 * Este arreglo define la estructura de los datos que se mostrarán para las empresas submanufactureras,
 * incluyendo encabezados, claves de acceso a los datos y el orden en el que se deben presentar.
 * 
 * Cada objeto en el arreglo contiene las siguientes propiedades:
 * 
 * - `encabezado`: El título o encabezado que se mostrará en la tabla o interfaz de usuario.
 * - `clave`: Una función que toma un objeto de tipo `DatosEmpresaSubmanufacturera` y devuelve el valor correspondiente
 *   para la columna especificada. Si no se encuentra el valor, devuelve `undefined`.
 * - `orden`: Un número que indica el orden en el que se deben mostrar las columnas.
 * 
 * Propiedades incluidas en la configuración:
 * - Registro Federal de Contribuyentes
 * - Razón social
 * - Calle
 * - Número interior
 * - Número exterior
 * - Código postal
 * - Colonia
 * - Municipio o delegación
 * - Entidad federativa
 * - País
 * - Teléfono
 * - Estatus
 * 
 * @constant
 */
export const CONFIGURACION_EMPRESAS_SUBMANUFACTURERAS = [
    {
      encabezado: 'Registro Federal de Contribuyentes',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.rfc,
      orden: 1,
    },
    {
      encabezado: 'Razón social',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.razonSocial,
      orden: 2,
    },
    {
      encabezado: 'Calle',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.calle,
      orden: 3,
    },
    {
      encabezado: 'Número interior',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.numeroInterior,
      orden: 4,
    },
    {
      encabezado: 'Número exterior',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.numeroExterior,
      orden: 5,
    },
    {
      encabezado: 'Código postal',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.codigoPostal,
      orden: 6,
    },
    {
      encabezado: 'Colonia',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.colonia,
      orden: 7,
    },
    {
      encabezado: 'Municipio o delegación',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.municipioDelegacion,
      orden: 8,
    },
    {
      encabezado: 'Entidad federativa',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.entidadFederativa,
      orden: 9,
    },
    {
      encabezado: 'País',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.pais,
      orden: 10,
    },
    {
      encabezado: 'Teléfono',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.telefono,
      orden: 11,
    },
    {
      encabezado: 'Estatus',
      clave: (ele: DatosEmpresaSubmanufacturera): string | undefined => ele.estatus,
      orden: 12,
    },
  ];

  export const CONFIGURACION_PLANTAS_MANUFACTURERAS = [
    {
      encabezado: 'Calle',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.Calle,
      orden: 1,
    },
    {
      encabezado: 'Número exterior',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.NumeroExterior,
      orden: 2,
    },
    {
      encabezado: 'Número interior',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.NumeroInterior,
      orden: 3,
    },
    {
      encabezado: 'Código postal',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.CodigoPostal,
      orden: 4,
    },
    {
      encabezado: 'Colonia',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.Colonia,
      orden: 5,
    },
    {
      encabezado: 'Municipio o delegación',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.MunicipioDelegacion,
      orden: 6,
    },
    {
      encabezado: 'Entidad Federativa',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.EntidadFederativa,
      orden: 7,
    },
    {
      encabezado: 'País',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.Pais,
      orden: 8,
    },
    {
      encabezado: 'Registro Federal de Contribuyentes',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.RFC,
      orden: 9,
    },
    {
      encabezado: 'Domicilio fiscal del solicitante',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.DomicilioFiscal,
      orden: 10,
    },
    {
      encabezado: 'Estatus',
      clave: (ele: DatosPlantaManufacturera): string | undefined => ele.Estatus,
      orden: 11,
    },
  ];

  export const CONFIGURACION_SERVICIOS_IMMEX = [
    {
      encabezado: 'Descripción del servicio',
      clave: (ele: ServicioImmex): string | undefined => ele.descripcionServicio,
      orden: 1,
    },
    {
      encabezado: 'Tipo de servicio',
      clave: (ele: ServicioImmex): string | undefined => ele.tipoServicio,
      orden: 2,
    },
    {
      encabezado: 'Testado',
      clave: (ele: ServicioImmex): string | undefined => ele.testado,
      orden: 3,
    },
    {
      encabezado: 'Estatus',
      clave: (ele: ServicioImmex): string | undefined => ele.estatus,
      orden: 4,
    },
  ];
  
  /**
 * CONFIGURACION_ANEXO_EXPORTACION
 * 
 * Esta constante define la configuración de columnas para mostrar los datos del anexo de exportación
 * en la tabla dinámica.
 */
export const CONFIGURACION_ANEXO_EXPORTACION = [
    {
      encabezado: 'Fracción arancelaria del producto de exportación',
      clave: (ele: AnexoExportacion): string | undefined => ele.fraccionArancelaria,
      orden: 1,
    },
    {
      encabezado: 'Descripción',
      clave: (ele: AnexoExportacion): string | undefined => ele.descripcion,
      orden: 2,
    },
    {
      encabezado: 'Tipo fracción',
      clave: (ele: AnexoExportacion): string | undefined => ele.tipoFraccion,
      orden: 3,
    },
  ];
  
  /**
 * CONFIGURACION_ANEXO_IMPORTACION
 * 
 * Esta constante define la configuración para la tabla dinámica del anexo de importación.
 * Cada columna especifica su encabezado visible, cómo extraer el valor y el orden.
 */
export const CONFIGURACION_ANEXO_IMPORTACION = [
    {
      encabezado: 'Fracción arancelaria del producto de exportación',
      clave: (ele: AnexoImportacion): string | undefined => ele.fraccionExportacion,
      orden: 1,
    },
    {
      encabezado: 'Fracción arancelaria de la mercancía de importación',
      clave: (ele: AnexoImportacion): string | undefined => ele.fraccionImportacion,
      orden: 2,
    },
    {
      encabezado: 'Descripción',
      clave: (ele: AnexoImportacion): string | undefined => ele.descripcion,
      orden: 3,
    },
    {
      encabezado: 'Tipo fracción',
      clave: (ele: AnexoImportacion): string | undefined => ele.tipoFraccion,
      orden: 4,
    },
  ];
  
  /**
 * CONFIGURACION_SENSIBLES
 *
 * Define la configuración de columnas para la tabla de productos sensibles.
 */
export const CONFIGURACION_SENSIBLES = [
    {
      encabezado: 'Fracción arancelaria de la mercancía de importación',
      clave: (ele: Sensible): string | undefined => ele.fraccionImportacion,
      orden: 1,
    },
    {
      encabezado: 'Cantidad',
      clave: (ele: Sensible): string | undefined => ele.cantidad,
      orden: 2,
    },
    {
      encabezado: 'Valor',
      clave: (ele: Sensible): string | undefined => ele.valor,
      orden: 3,
    },
    {
      encabezado: 'Unidad de medida tarifaria',
      clave: (ele: Sensible): string | undefined => ele.unidadMedida,
      orden: 4,
    },
  ];
  