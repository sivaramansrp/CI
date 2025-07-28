import { Facturador } from '../../../shared/models/terceros-relacionados.model';

/**
 * @interface Otros
 * @extends Facturador
 * @description Representa los datos adicionales de un tercero relacionado en el proceso de trámite,
 *              incluyendo información descriptiva adicional del nombre o razón social.
 * @since 1.0.0
 * @example
 * ```typescript
 * const otroTercero: Otros = {
 *   nombreDescripcion: "Distribuidor Farmacéutico ABC S.A. de C.V."
 * };
 * ```
 */
export interface Otros extends Facturador {
  /**
   * @property {string} nombreDescripcion
   * @description Descripción o nombre adicional del tercero relacionado.
   *              Puede incluir información complementaria como razón social completa,
   *              nombre comercial o cualquier descripción que ayude a identificar
   *              de manera única al tercero en el contexto del trámite.
   * @example "Laboratorio Farmacéutico Internacional S.A."
   * @required
   */
  nombreDescripcion: string;
}

/**
 * @interface TipoPersonaModel
 * @description Representa un modelo para el tipo de persona, utilizado para seleccionar 
 *              entre diferentes opciones de persona en formularios y listas desplegables.
 *              Este modelo facilita la presentación de opciones al usuario con información
 *              descriptiva y valores asociados.
 * @since 1.0.0
 * @example
 * ```typescript
 * const tipoPersona: TipoPersonaModel = {
 *   label: "Persona Física",
 *   value: "fisica",
 *   hint: "Seleccione esta opción para individuos"
 * };
 * ```
 */
export interface TipoPersonaModel {
  /**
   * @property {string} label
   * @description La etiqueta descriptiva que se muestra al usuario en la interfaz.
   *              Debe ser un texto claro y comprensible que identifique el tipo de persona.
   * @example "Persona Física", "Persona Moral", "Empresa Extranjera"
   * @required
   */
  label: string;
  
  /**
   * @property {string} value
   * @description El valor asociado a la opción de tipo de persona que se utilizará
   *              internamente en el sistema. Generalmente es un identificador único
   *              o código que representa el tipo seleccionado.
   * @example "fisica", "moral", "extranjera"
   * @required
   */
  value: string;
  
  /**
   * @property {string} hint
   * @description Información adicional o sugerencia opcional que proporciona más
   *              contexto sobre la opción. Se puede mostrar como tooltip o texto
   *              de ayuda para guiar al usuario en su selección.
   * @example "Para personas físicas con actividad empresarial"
   * @optional
   */
  hint?: string;
}
/**
 * @interface DetalleMercancíaProductoTerminado
 * @description Representa los detalles específicos de una mercancía clasificada como producto terminado
 *              en el contexto de trámites de COFEPRIS. Incluye información sobre cantidad,
 *              presentación y registro sanitario del producto farmacéutico o medicamento.
 * @since 1.0.0
 * @example
 * ```typescript
 * const detalleMercancia: DetalleMercancíaProductoTerminado = {
 *   cantidad: "1000",
 *   presentacion: "Caja con 30 tabletas de 500mg",
 *   registroSanitario: "123M2023"
 * };
 * ```
 */
export interface DetalleMercancíaProductoTerminado {
  /**
   * @property {string} cantidad
   * @description Cantidad numérica de unidades de la mercancía que se está declarando
   *              o procesando en el trámite. Se almacena como string para permitir
   *              diferentes formatos de entrada y validación personalizada.
   * @example "1000", "500.5", "2500"
   * @required
   */
  cantidad: string;

  /**
   * @property {string} presentacion
   * @description Descripción detallada de la presentación comercial del producto terminado.
   *              Incluye información sobre el tipo de envase, contenido, concentración
   *              y cualquier detalle relevante para la identificación del producto.
   * @example "Frasco con 100ml de jarabe", "Caja con 20 tabletas de 250mg", "Ampolleta de 2ml"
   * @required
   */
  presentacion: string;

  /**
   * @property {string} registroSanitario
   * @description Número único de registro sanitario asignado por COFEPRIS que autoriza
   *              la comercialización del producto farmacéutico. Es un identificador
   *              oficial requerido para productos regulados por la autoridad sanitaria.
   * @example "123M2023", "456N2024", "789P2022"
   * @required
   */
  registroSanitario: string;
}
