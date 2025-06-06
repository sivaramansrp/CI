import { Component } from '@angular/core';
import { SeccionLibStore} from '@libs/shared/data-access-user/src';

/**
 * @class PasoUnoComponent
 * @description Componente que representa el paso uno del trámite 420102.
 * Este paso incluye la funcionalidad para gestionar la información del solicitante
 * y concluir la relación asociada al trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent {
  /**
   * @property {number} indice
   * @description Índice actual del paso seleccionado.
   */
  indice: number = 1;

  /**
   * @constructor
   * @description Constructor que inicializa el store de la sección.
   * @param {SeccionLibStore} seccionStore - Servicio para manejar el estado de la sección.
   */
  constructor(private seccionStore: SeccionLibStore) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method seleccionaTab
   * @description Método para seleccionar una pestaña específica estableciendo el índice correspondiente.
   * @param {number} i - El índice de la pestaña a seleccionar.
   * @returns {void}
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}