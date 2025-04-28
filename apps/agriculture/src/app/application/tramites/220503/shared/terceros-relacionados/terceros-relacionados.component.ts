import { AlertComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component, Input } from '@angular/core';
import { DESTINATARIO_ITEM, EXPORTADOR_ITEM, TERCEROS_TEXTO_DE_ALERTA } from '../../enums/terceros-relacionados.enum'
import { Destinatario, Exportador} from '../../models/terceros-relacionados.model'
import { CommonModule } from '@angular/common';
/**
 * Texto de alerta utilizado en el componente.
 * @constant {string}
 */
const TERCEROS = TERCEROS_TEXTO_DE_ALERTA
/**
 * Componente para gestionar los terceros relacionados.
 */
@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent], // Importa los módulos necesarios aquí
})
export class TercerosRelacionadosComponent {
  /**
   * Texto de alerta utilizado en el componente.
   * @type {string}
   */
  TEXTO_DE_ALERTA: string = TERCEROS;

  /**
   * Indica si la barra de desplazamiento está habilitada.
   * @type {boolean}
   */
  @Input() enableScrollbar: boolean = false;

  /**
   * Lista de elementos de tipo Row.
   * @type {Exportador[]}
   */
  items: Exportador[] = EXPORTADOR_ITEM
  /**
   * Lista de elementos de tipo Destinatario.
   * @type {Destinatario[]}
   */
  persona: Destinatario[] = DESTINATARIO_ITEM

  // Otros miembros de la clase...
}
