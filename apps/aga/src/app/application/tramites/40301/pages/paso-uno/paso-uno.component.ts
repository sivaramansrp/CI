import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { LayaoutCapturaTipoAgenteComponent } from '../../components/layaoutCapturaTipoAgente/layaoutCapturaTipoAgente.component';
import { LayoutDirectorGeneralComponent } from '../../components/layoutDirectorGeneral/layoutDirectorGeneral.component';
import { CapturarComponent } from '../../components/capturar/capturar.component';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``
})
export class PasoUnoComponent {
  indice: number = 1;
  
  @Output() pestanaCambiado = new EventEmitter<number>();
  @Output() isValid = new EventEmitter<boolean>();
  @ViewChild(CapturarComponent) capturarComponent!: CapturarComponent;
 
  /**
   * @method seleccionaTab
   * @description
   * Cambia la pestaña activa y emite el nuevo índice seleccionado.
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.pestanaCambiado.emit(this.indice);
  }


}

