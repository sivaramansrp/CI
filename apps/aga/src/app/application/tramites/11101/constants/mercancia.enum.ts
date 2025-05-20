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
     * Columna que muestra el consecutivo de la mercancía.
     * - Encabezado: "Consecutivo".
     * - Clave: Obtiene el valor de `Consecutivo` de la fila.
     * - Orden: 1.
     */
    { encabezado: 'consecutivo', clave: (fila) => fila.consecutivo, orden: 1 },

    /**
     * Columna que muestra el estado relacionado con la mercancía.
     * - Encabezado: "Estado".
     * - Clave: Obtiene el valor de `estado` de la fila.
     * - Orden: 2.
     */
    { encabezado: 'estado', clave: (fila) => fila.estado, orden: 2 },

    /**
     * Columna que muestra la cantidad de la mercancía.
     * - Encabezado: "Cantidad".
     * - Clave: Obtiene el valor de `Cantidad` de la fila.
     * - Orden: 3.
     */
    { encabezado: 'cantidad', clave: (fila) => fila.cantidad, orden: 3 },

    /**
     * Columna que muestra si la mercancía forma parte del patrimonio.
     * - Encabezado: "FormaParteDePatrimonio".
     * - Clave: Obtiene el valor de `FormaParteDePatrimonio` de la fila.
     * - Orden: 4.
     */
    { encabezado: 'formaParteDePatrimonio', clave: (fila) => fila.formaParteDePatrimonio, orden: 4 },
];

/**
 * Lista de documentos seleccionados requeridos para la mercancía.
 * 
 * Cada elemento contiene:
 * - id: Identificador único del documento.
 * - descripcion: Descripción del documento requerido.
 * 
 * @type {{ id: number, descripcion: string }[]}
 */
export const DocumentosSeleccionados = [
  {
    id: 1,
    descripcion: 'Documentos que ampare el valor de la mercancía',
  },
  {
    id: 2,
    descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)',
  },
];