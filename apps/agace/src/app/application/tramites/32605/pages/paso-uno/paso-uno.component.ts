import { CTPATComponent } from '../../components/c-tpat/c-tpat.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosComunesComponent } from '../../components/datos-comunes/datos-comunes.component';
import { ImportadorExportadorComponent } from '../../components/importador-exportador/importador-exportador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TercerosRelacionadosComponent } from '../../components/terceros-relacionados/terceros-relacionados.component';
import { ViewChild } from '@angular/core';

/**
 * Componente que representa el primer paso de un trámite.
 * Maneja la visualización y activación de diferentes secciones (tabs) según el tipo de endoso.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SolicitanteComponent,
    ImportadorExportadorComponent,
    CTPATComponent,
    TercerosRelacionadosComponent,
    DatosComunesComponent
  ],
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
export class PasoUnoComponent {
   /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
   @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;


  /**
   * Índice utilizado para identificar la pestaña activa dentro del paso.
   * @type {number}
   */
  indice: number = 1;


  /**
   * Cambia la pestaña activa según el índice proporcionado.
   * @param i - El índice de la pestaña que se desea activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
