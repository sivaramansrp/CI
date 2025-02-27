import { Component } from '@angular/core';

/**
 * Component representing the first step in a multi-step process.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * The index of the currently selected tab.
   */
  indice: number = 1;

  /**
   * Selects a tab by setting the index.
   * @param i The index of the tab to select.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}