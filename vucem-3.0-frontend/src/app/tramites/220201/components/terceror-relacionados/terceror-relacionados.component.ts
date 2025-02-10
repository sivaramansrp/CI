/**
 * @fileoverview Componente para la gestión de terceros relacionados en el formulario.
 * Este componente maneja la lógica y la presentación de la sección de terceros relacionados,
 * incluyendo la visualización de un mensaje de alerta.
 * @module tercerosRelacionados
 */

import { Component } from '@angular/core';
import { TERCEROR_TEXTO_DE_ALERTA } from '../../../../shared/constantes/certificado-zoosanitario.enum';

/**
 * Componente para la gestión de terceros relacionados.
 * @class TercerorRelacionadosComponent
 */
@Component({
  selector: 'app-terceror-relacionados',
  templateUrl: './terceror-relacionados.component.html',
  styleUrl: './terceror-relacionados.component.scss'
})
export class TercerorRelacionadosComponent {

  /**
   * Texto de alerta para la sección de terceros relacionados. --220201
   * @property {string} TEXTO_DE_ALERTA
   */
  TEXTO_DE_ALERTA: string = TERCEROR_TEXTO_DE_ALERTA;
}