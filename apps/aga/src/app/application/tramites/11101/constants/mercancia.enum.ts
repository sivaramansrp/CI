import { ConfiguracionColumna } from "@libs/shared/data-access-user/src";
import { DiscripccionDeLaMercanciaForm } from "../models/transportacion-maritima.model";

/**
 * Configuración de las columnas para el encabezado de la tabla de mercancías.
 * 
 * Esta configuración define las columnas que se mostrarán en la tabla, incluyendo:
 * - El encabezado de la columna.
 * - La clave que se utilizará para obtener el valor de cada fila.
 * - El orden en el que se mostrarán las columnas.
 * 
 * @type {ConfiguracionColumna<DiscripccionDeLaMercanciaForm>[]}
 */
export const CONFIGURACION_PARA_PFE_ENCABEZADO_DE_TABLA: ConfiguracionColumna<DiscripccionDeLaMercanciaForm>[] = [
    /**
     * Columna que muestra el nombre de la mercancía.
     * - Encabezado: "Nombre".
     * - Clave: Obtiene el valor de `Consecutivo` de la fila.
     * - Orden: 1.
     */
    { encabezado: 'Consecutivo', clave: (fila) => fila.Consecutivo, orden: 1 },

    /**
     * Columna que muestra el domicilio relacionado con la mercancía.
     * - Encabezado: "Domicilio".
     * - Clave: Obtiene el valor de `estado` de la fila.
     * - Orden: 2.
     */
    { encabezado: 'Estado', clave: (fila) => fila.estado, orden: 2 },

    /**
     * Columna que muestra la descripción de la mercancía.
     * - Encabezado: "Descripción".
     * - Clave: Obtiene el valor de `Cantidad` de la fila.
     * - Orden: 3.
     */
    { encabezado: 'Cantidad', clave: (fila) => fila.Cantidad, orden: 3 },

    /**
     * Columna que muestra el país relacionado con la mercancía.
     * - Encabezado: "País".
     * - Clave: Obtiene el valor de `FormaParteDePatrimonio` de la fila.
     * - Orden: 4.
     */
    { encabezado: 'FormaParteDePatrimonio', clave: (fila) => fila.FormaParteDePatrimonio, orden: 4 },
];