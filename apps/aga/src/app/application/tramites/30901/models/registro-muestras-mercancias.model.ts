/**
 * Interfaz que representa un catálogo importante de selección.
 * 
 */

import { CatalogosSelect, TableData } from '@ng-mf/data-access-user';

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
/**
 * Representa un registro de muestras de mercancías.
 */
export interface RegistroMuestras {
  /**
   * Opción del importador seleccionada en el registro.
   */
  opcionDeImportador: string;

  /**
   * Indica si se tomó una muestra en el despacho.
   */
  tomaMuestraDespacho: string;

  /**
   * Motivo de la falta de muestra, si no se realizó la toma de muestra.
   */
  descMotivoFaltaMuestra: string;

  /**
   * Valor combinado de fracción arancelaria seleccionado en un combo.
   */
  comboFraccionConcatenada: string;

  /**
   * Código de la fracción arancelaria.
   */
  fraccionConcatenada: string;

  /**
   * Descripción de la fracción arancelaria.
   */
  fracciondescripcion: string;

  /**
   * Valor combinado de NICOS seleccionado en un combo.
   */
  comboNicos: string;

  /**
   * Descripción del NICOS asociado.
   */
  nicoDescripcion: string;

  /**
   * Nombre químico de la sustancia o mercancía.
   */
  nombreQuimico: string;

  /**
   * Nombre comercial de la sustancia o mercancía.
   */
  nombreComercial: string;

  /**
   * Número CAS (Chemical Abstracts Service) de la sustancia.
   */
  numeroCAS: string;

  /**
   * Identificación genérica de la mercancía.
   */
  ideGenerica: string;

  /**
   * Descripción detallada del producto en formato CLOB (Character Large Object).
   */
  descClobGenerica: string;
}

/**
 * Representa una lista de fechas.
 */
export interface ListaDeFechas {
  /**
   * Representa la fecha de inicio de vigencia.
   */
  fechaInicioVigencia: string;
  /**
   * Representa la fecha de fin de vigencia.
   */
  fechaFinVigencia: string;
}
