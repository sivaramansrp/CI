
/**
 * Interfaz que representa un catálogo importante de selección.
 * 
 */

import { CatalogosSelect, TableData } from "@ng-mf/data-access-user";

/**
 * Representa una selección importante del catálogo para el registro de muestras de mercancías.
 * 
 * @property {CatalogosSelect} importadorExportadorPrevio - Selección previa del importador/exportador.
 * @property {CatalogosSelect} fraccionArancelariaAga - Selección de la fracción arancelaria AGA.
 * @property {CatalogosSelect} nico - Selección del NICO.
 * @property {CatalogosSelect} ideGenerica - Selección de la IDE genérica.
 * @property {CatalogosSelect} tomaMuestraDespacho - Selección de la toma de muestra en despacho.
 * @property {TableData} requisitosObligatoriosTabla - Tabla de requisitos obligatorios.
 * @property {TableData} tablaDeTarifasDePago - Tabla de tarifas de pago.
 */
export interface ImportanteCatalogoSeleccion {
    /**
     * Selección previa del importador/exportador.
     */
    importadorExportadorPrevio: CatalogosSelect,

    /**
     * Selección de la fracción arancelaria AGA.
     */
    fraccionArancelariaAga: CatalogosSelect,

    /**
     *  Selección del NICO.
     */
    nico: CatalogosSelect,

    /**
     * Selección de la IDE genérica.
     */
    ideGenerica: CatalogosSelect,
    /**
     * Selección de la toma de muestra en despacho.
     */
    tomaMuestraDespacho: CatalogosSelect,
    /**
     * Tabla de requisitos obligatorios.
     */
    requisitosObligatoriosTabla: TableData,

    /**
     *  Tabla de tarifas de pago.
     */
    tablaDeTarifasDePago: TableData
}