import { CatalogosSelect } from '@ng-mf/data-access-user';
import { FormularioDinamico } from '@ng-mf/data-access-user';

/**
 * Interfaz que define la estructura de los pasos en el wizard.
 */
export interface ListaPasosWizard {
  indice: number; // Índice del paso en el wizard.
  titulo: string; // Título del paso.
  activo: boolean; // Indica si el paso está activo en el wizard.
  completado: boolean; // Indica si el paso ha sido completado.
}

/**
 * Interfaz para la configuración de los inputs.
 */
export interface InputConfig {
  title: string; // Título del input.
  formGroupName: string; // Nombre del formulario o grupo de inputs.
  menu: MenuConfig[]; // Menú de configuración de los inputs.
}

/**
 * Interfaz para la configuración de cada ítem del menú del input.
 */
export interface MenuConfig {
  inputType: string; // Tipo de input (por ejemplo, 'text', 'select', etc.).
  props: FormularioDinamico | CatalogosSelect | undefined; // Propiedades dinámicas o catálogo de selección para el input.
  class: string; // Clase CSS asociada con el input.
  visibility?: string; // Condición opcional para la visibilidad del input (si es necesario).
  radioConfig?: string[]; // Configuración de los radio buttons (si se aplica).
}

/**
 * Interfaz que define la estructura de los datos de la mercancía.
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

