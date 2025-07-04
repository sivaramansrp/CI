/**
 * @fileoverview Componente del segundo paso del trámite IMMEX
 * @author Sistema VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 */

import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';

/**
 * @class PasoDosComponent
 * @description
 * Componente responsable de manejar el segundo paso del proceso de trámite IMMEX.
 * Este componente incluye la lógica para obtener y gestionar los tipos de documentos
 * y los documentos seleccionados durante el flujo del trámite.
 * 
 * @implements {OnInit} - Implementa la interfaz OnInit para inicialización del componente
 * 
 * @example
 * ```html
 * <paso-dos></paso-dos>
 * ```
 * 
 * @see {@link https://angular.io/api/core/Component} Documentación de Angular Component
 * @see {@link TEXTOS} Constantes de textos del sistema
 */
@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
})
export class PasoDosComponent {
  /**
   * @member {any} TEXTOS
   * @description 
   * Constantes de textos utilizadas en el componente para mostrar mensajes,
   * instrucciones y etiquetas relacionadas con el trámite IMMEX.
   * Contiene todos los textos localizados y configurables del sistema.
   * 
   * @type {any}
   * @readonly
   * @public
   * 
   * @example
   * ```typescript
   * // Acceso a un texto específico
   * const mensaje = this.TEXTOS.MENSAJE_BIENVENIDA;
   * ```
   * 
   * @see {@link TEXTOS} Definición de las constantes de texto
   */
  TEXTOS = TEXTOS;
}