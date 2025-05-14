import { CatalogosSelect, ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { AccesosTabla } from "../models/tecnologicos.model";

/**
 * Configuración de columnas para la tabla de accesos.
 * Define las columnas que se mostrarán en la tabla de accesos,
 * incluyendo encabezados, claves y el orden de las columnas.
 */
export const HEADERS_ACCESOS_TABLA: ConfiguracionColumna<AccesosTabla>[] = [
    {
      encabezado: 'RFC',
      clave: (ele: AccesosTabla) => ele.rfc,
      orden: 1,
    },
    {
      encabezado: 'Sistema',
      clave: (ele: AccesosTabla) => ele.sistema,
      orden: 2,
    },
    {
      encabezado: 'Rol/Perfil',
      clave: (ele: AccesosTabla) => ele.rol,
      orden: 3,
    },
    {
      encabezado: 'Tipo Movimiento',
      clave: (ele: AccesosTabla) => ele.tipoMovimiento,
      orden: 4,
    },
    {
      encabezado: 'Aduana',
      clave: (ele: AccesosTabla) => ele.aduana,
      orden: 5,
    },
  ];

/**
 * Catálogo de opciones para "Aduana".
 * Define las opciones disponibles para el campo "Aduana".
 */
export const ADUANA_CATALOGO: CatalogosSelect = {
  labelNombre: 'Aduana',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
};

/**
 * Catálogo de opciones para "Sistema".
 * Define las opciones disponibles para el campo "Sistema".
 */
export const SISTEMA_CATALOGO: CatalogosSelect = {
  labelNombre: 'Sistema',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
};

/**
 * Catálogo de opciones para "Rol".
 * Define las opciones disponibles para el campo "Rol".
 */
export const ROL_CATALOGO: CatalogosSelect = {
  labelNombre: 'Rol',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
};

/**
 * Catálogo de opciones para "Tipo Movimiento".
 * Define las opciones disponibles para el campo "Tipo Movimiento".
 */
export const MOVIMIENTO_CATALOGO: CatalogosSelect = {
  labelNombre: 'Tipo Movimiento',
  required: true,
  primerOpcion: 'Selecciona un valor',
  catalogos: [],
};