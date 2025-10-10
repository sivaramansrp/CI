import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DatosDelContenedor } from '@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model';

/**
 * Configuración de columnas para la tabla de contenedores.
 * 
 * Define las columnas que se mostrarán en la tabla de contenedores, incluyendo
 * encabezados, claves de acceso a los datos y orden de visualización.
 * 
 * @type {ConfiguracionColumna<DatosDelContenedor>[]}
 */
export const ENCABEZADO_TABLA_CONTENEDOR: ConfiguracionColumna<DatosDelContenedor>[] = [
  { encabezado: '', clave: (articulo) => articulo.id, orden: 1 },
  { encabezado: 'Iniciales del equipo', clave: (articulo) => articulo.inicialesEquipo, orden: 1 },
  { encabezado: 'Número de equipo', clave: (articulo) => articulo.numeroEquipo, orden: 2 },
  { encabezado: 'Dígito Verificador', clave: (articulo) => articulo.digitoVerificador, orden: 3 },
  { encabezado: 'Tipo de equipo', clave: (articulo) => articulo.tipoEquipo, orden: 4 },
  { encabezado: 'Aduana', clave: (articulo) => articulo.aduana, orden: 5 },
  { encabezado: 'Fecha Ingreso', clave: (articulo) => articulo.fechaIngreso, orden: 6 },
  { encabezado: 'Vigencia', clave: (articulo) => articulo.vigencia, orden: 7 },
  { encabezado: 'Estado de constancia', clave: (articulo) => articulo.estadoConstancia, orden: 8 },
  { encabezado: 'Existe en VUCEM', clave: (articulo) => articulo.existeEnVUCEM, orden: 9 }
];

/**
 * Configuración de columnas para la tabla de contenedores de manifiestos.
 * 
 * Define las columnas específicas que se mostrarán en la tabla de contenedores
 * relacionados con manifiestos, incluyendo encabezados, claves de acceso y orden.
 * 
 * @type {ConfiguracionColumna<DatosDelContenedor>[]}
 */
export const ENCABEZADO_TABLA_CONTENEDOR_MANIFIESTO: ConfiguracionColumna<DatosDelContenedor>[] = [
  { encabezado: 'Iniciales del equipo', clave: (articulo) => articulo.inicialesEquipo, orden: 1 },
  { encabezado: 'Número de equipo', clave: (articulo) => articulo.numeroEquipo, orden: 2 },
  { encabezado: 'Dígito Verificador', clave: (articulo) => articulo.digitoVerificador, orden: 3 },
  { encabezado: 'Tipo de equipo', clave: (articulo) => articulo.tipoEquipo, orden: 4 },
  { encabezado: 'Aduana', clave: (articulo) => articulo.aduana, orden: 5 },
  { encabezado: 'Fecha Ingreso', clave: (articulo) => articulo.fechaIngreso, orden: 6 },
  { encabezado: 'Vigencia', clave: (articulo) => articulo.vigencia, orden: 7 },
  { encabezado: 'Estado de constancia', clave: (articulo) => articulo.estadoConstancia, orden: 8 },
  { encabezado: 'Existe en VUCEM', clave: (articulo) => articulo.existeEnVUCEM, orden: 9 },
];

/**
 * Mapeo de encabezados de columnas a nombres de propiedades de los datos.
 * 
 * Este objeto define la correspondencia entre los nombres de las columnas mostradas
 * en la interfaz de usuario y las propiedades reales de los objetos de datos.
 * 
 * @type {{ [key: string]: string }}
 */
export const HEADER_MAP_DATOS: { [key: string]: string } = {
      Id: 'id',
      'Aduana': 'aduana',
      'Iniciales del equipo': 'inicialesEquipo',
      'Tipo de equipo': 'tipoEquipo',
      'Número de equipo': 'numeroEquipo',
      'Dígito Verificador': 'digitoVerificador',
      'Fecha Ingreso': 'fechaIngreso',
      'Vigencia': 'vigencia',
      'Estado de constancia': 'estadoConstancia',
      'Existe en VUCEM': 'existeEnVUCEM',
      'Id constancia': 'idConstancia',
      'Número manifiesto': 'numeroManifiesto',
      'Id solicitud': 'idSolicitud',
      'Fecha inicio': 'fechaInicio',
    };