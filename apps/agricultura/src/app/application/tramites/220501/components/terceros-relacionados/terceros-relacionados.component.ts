import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { ITEMS, PERSONA, TERCEROS_TEXTO_DE_ALERTA } from '../../constantes/constantes';

/**
 * Componente para gestionar los terceros relacionados.
 */
@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
  standalone: true,
  imports: [TituloComponent, CommonModule, ReactiveFormsModule,AlertComponent],
})
export class TercerosRelacionadosComponent {
  /**
   * Texto de alerta utilizado en el componente.
   * @type {string}
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Indica si la barra de desplazamiento está habilitada.
   * @type {boolean}
   */
  @Input() enableScrollbar: boolean = false;

   /**
   * Lista de elementos de tipo Row.
   * @type {Row[]}
   */
   items = ITEMS; 
   /**
    * Lista de elementos de tipo Rows.
    * @type {Rows[]}
    */
   persona = PERSONA;

  // Otros miembros de la clase...
}
