import { CatalogosSelect } from '@ng-mf/data-access-user';
import { FormularioDinamico } from '@ng-mf/data-access-user';


/**
 * Interfaz que representa una lista de pasos en un asistente (wizard).
 * 
 * @property {number} indice - Índice del paso en el wizard.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo en el wizard.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export interface ListaPasosWizard {
  indice: number; // Índice del paso en el wizard.
  titulo: string; // Título del paso.
  activo: boolean; // Indica si el paso está activo en el wizard.
  completado: boolean; // Indica si el paso ha sido completado.
}


/**
 * Configuración de entrada para un formulario.
 * 
 * @property {string} title - Título del input.
 * @property {string} formGroupName - Nombre del formulario o grupo de inputs.
 * @property {MenuConfig[]} menu - Menú de configuración de los inputs.
 */
export interface InputConfig {
  title: string; // Título del input.
  formGroupName: string; // Nombre del formulario o grupo de inputs.
  menu: MenuConfig[]; // Menú de configuración de los inputs.
}

/**
 * Interfaz que define la configuración de un menú.
 * 
 * @property {string} inputType - Tipo de input (por ejemplo, 'text', 'select', etc.).
 * @property {FormularioDinamico | CatalogosSelect | undefined} props - Propiedades dinámicas o catálogo de selección para el input.
 * @property {string} class - Clase CSS asociada con el input.
 * @property {string} [visibility] - Condición opcional para la visibilidad del input (si es necesario).
 * @property {string[]} [radioConfig] - Configuración de los radio buttons (si se aplica).
 */
export interface MenuConfig {
  inputType: string; // Tipo de input (por ejemplo, 'text', 'select', etc.).
  props: FormularioDinamico | CatalogosSelect | undefined; // Propiedades dinámicas o catálogo de selección para el input.
  class: string; // Clase CSS asociada con el input.
  visibility?: string; // Condición opcional para la visibilidad del input (si es necesario).
  radioConfig?: string[]; // Configuración de los radio buttons (si se aplica).
}

/**
 * Interfaz que representa los datos de la mercancía.
 * 
 * @property {string} descripcion - Descripción de la mercancía.
 * @property {string} marca - Marca de la mercancía.
 * @property {string} tipoEntrada - Tipo de entrada de la mercancía.
 * @property {string} fraccion - Fracción arancelaria de la mercancía.
 * @property {string} nico - NICO (Número de Identificación Comercial).
 * @property {string} umt - Unidad de medida tarifaria.
 * @property {string} facturaNumero - Número de la factura.
 * @property {string} facturaFecha - Fecha de la factura.
 * @property {string} umc - Unidad de medida comercial.
 * @property {string} otroUmc - Otro tipo de unidad de medida comercial (si aplica).
 * @property {string} cantidadUmc - Cantidad en unidades comerciales.
 * @property {string} factorConversion - Factor de conversión entre unidades.
 * @property {string} cantidadUmt - Cantidad en unidades de medida tarifarias.
 * @property {string} valorFactura - Valor total de la factura.
 * @property {string} monedaComercializacion - Moneda de comercialización de la mercancía.
 * @property {string} valorFacturaUsd - Valor total de la factura en USD.
 * @property {string} precioUnitarioUsd - Precio unitario en USD.
 * @property {string} paisExportador - País exportador de la mercancía.
 * @property {string} paisOrigen - País de origen de la mercancía.
 * @property {string} valorTotalFactura - Valor total de la factura (en moneda local).
 * @property {string} valorTotalFacturaUsd - Valor total de la factura en USD.
 */
export interface DatosMercancia {
  descripcion: string; // Descripción de la mercancía.
  marca: string; // Marca de la mercancía.
  tipoEntrada: string; // Tipo de entrada de la mercancía.
  fraccion: string; // Fracción arancelaria de la mercancía.
  nico: string; // NICO (Número de Identificación Comercial).
  umt: string; // Unidad de medida tarifaria.
  facturaNumero: string; // Número de la factura.
  facturaFecha: string; // Fecha de la factura.
  umc: string; // Unidad de medida comercial.
  otroUmc: string; // Otro tipo de unidad de medida comercial (si aplica).
  cantidadUmc: string; // Cantidad en unidades comerciales.
  factorConversion: string; // Factor de conversión entre unidades.
  cantidadUmt: string; // Cantidad en unidades de medida tarifarias.
  valorFactura: string; // Valor total de la factura.
  monedaComercializacion: string; // Moneda de comercialización de la mercancía.
  valorFacturaUsd: string; // Valor total de la factura en USD.
  precioUnitarioUsd: string; // Precio unitario en USD.
  paisExportador: string; // País exportador de la mercancía.
  paisOrigen: string; // País de origen de la mercancía.
  valorTotalFactura: string; // Valor total de la factura (en moneda local).
  valorTotalFacturaUsd: string; // Valor total de la factura en USD.
}

