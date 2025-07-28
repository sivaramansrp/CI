
import {PlantasDireccionModelo, SubfabricanteDireccionModelo } from "../modelos/subfabricante.model";
/**
 * Configuración de la tabla para mostrar información de subfabricantes.
 * @export
 * @const {Array<Object>} SUBFABRICANTE_TABLA_CONFIGURACION
 */
export const SUBFABRICANTE_TABLA_CONFIGURACION = [
  {
    /**
     * Título de la columna que se muestra en la tabla.
     * @property {string} encabezado
     */
    encabezado: 'Calle',

    /**
     * Función que toma un objeto de tipo `SubfabricanteDireccionModelo` y devuelve el valor correspondiente para la columna.
     * @property {(ele: SubfabricanteDireccionModelo) => string} clave
     */
    clave: (ele: SubfabricanteDireccionModelo):string => ele.calle,

    /**
     * Posición de la columna en la tabla.
     * @property {number} orden
     */
    orden: 1,
  },
  {
    encabezado: 'Num.exterior',
    clave: (ele: SubfabricanteDireccionModelo):number => ele.numExterior,
    orden: 2,
  },
  {
    encabezado: 'Num.interior',
    clave: (ele: SubfabricanteDireccionModelo):number => ele.numInterior,
    orden: 3,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: SubfabricanteDireccionModelo):number=> ele.codigoPostal,
    orden: 4,
  },
  {
    encabezado: 'Colonia',
    clave: (ele: SubfabricanteDireccionModelo):string => ele.colonia,
    orden: 5,
  },
  {
    encabezado: 'Delegación / Municipio',
    clave: (ele: SubfabricanteDireccionModelo):string => ele.delegacionMunicipio,
    orden: 6,
  },
  {
    encabezado: 'Entidad federativa',
    clave: (ele: SubfabricanteDireccionModelo):string => ele.entidadFederativa,
    orden: 7,
  },
  {
    encabezado: 'País',
    clave: (ele: SubfabricanteDireccionModelo):string => ele.pais,
    orden: 8,
  },
  {
    encabezado: 'Registro federal de contribuyentes',
    clave: (ele: SubfabricanteDireccionModelo):string => ele.rfc,
    orden: 9,
  },
  {
    encabezado: 'Domicilio fiscal del solicitante',
    clave: (ele: SubfabricanteDireccionModelo):string => ele.domicilioFiscalSolicitante,
    orden: 10,
  },
  {
    encabezado: 'Razón social',
    clave: (ele: SubfabricanteDireccionModelo):string => ele.razonSocial,
    orden: 11,
  }
];

export const PLANTAS_TABLA_CONFIGURACION = [
  {
    /**
     * Título de la columna que se muestra en la tabla.
     * @property {string} encabezado
     */
    encabezado: 'Calle',

    /**
     * Función que toma un objeto de tipo `SubfabricanteDireccionModelo` y devuelve el valor correspondiente para la columna.
     * @property {(ele: PlantasDireccionModelo) => string} clave
     */
    clave: (ele: PlantasDireccionModelo):string => ele.calle,

    /**
     * Posición de la columna en la tabla.
     * @property {number} orden
     */
    orden: 1,
  },
  {
    encabezado: 'Num.exterior',
    clave: (ele: PlantasDireccionModelo):number => ele.numExterior,
    orden: 2,
  },
  {
    encabezado: 'Num.interior',
    clave: (ele: PlantasDireccionModelo):number => ele.numInterior,
    orden: 3,
  },
  {
    encabezado: 'Código postal',
    clave: (ele: PlantasDireccionModelo):number=> ele.codigoPostal,
    orden: 4,
  },
  {
    encabezado: 'Localidad ',
    clave: (ele: PlantasDireccionModelo):string => ele.localidad,
    orden: 5,
  },
  {
    encabezado: 'Delegación / Municipio',
    clave: (ele: PlantasDireccionModelo):string => ele.delegacionMunicipio,
    orden: 6,
  },
  {
    encabezado: 'Entidad federativa',
    clave: (ele: PlantasDireccionModelo):string => ele.entidadFederativa,
    orden: 7,
  },
  {
    encabezado: 'País',
    clave: (ele: PlantasDireccionModelo):string => ele.pais,
    orden: 8,
  },
  {
    encabezado: 'Registro federal de contribuyentes',
    clave: (ele: PlantasDireccionModelo):string => ele.rfc,
    orden: 9,
  },
  {
    encabezado: 'Domicilio fiscal del solicitante',
    clave: (ele: PlantasDireccionModelo):string => ele.domicilioFiscalSolicitante,
    orden: 10,
  },
  {
    encabezado: 'Razón social',
    clave: (ele: PlantasDireccionModelo):string => ele.razonSocial,
    orden: 11,
  }
];
