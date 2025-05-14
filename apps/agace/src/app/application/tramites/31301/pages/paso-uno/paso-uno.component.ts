import { AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosGeneralesDeLaSolicitudComponent } from '../../components/datos-generales-de-la-solicitud/datos-generales-de-la-solicitud.component';
import { DatosPorGarantiaComponent } from '../../components/datos-por-garantia/datos-por-garantia.component';
import { ModificacionDeDenominacionORazorsSocialComponent } from '../../components/modificacion-de-denominacion-o-razors-social/modificacion-de-denominacion-o-razors-social.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src';
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
    DatosGeneralesDeLaSolicitudComponent,
    DatosPorGarantiaComponent,
    ModificacionDeDenominacionORazorsSocialComponent,
    TercerosRelacionadosComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss'],
})
export class PasoUnoComponent implements AfterViewInit {
   /**
   * Referencia al componente SolicitanteComponent para acceder a sus métodos y propiedades.
   */
   @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;

   /**
    * Se ejecuta después de que la vista ha sido inicializada.
    * Llama al método `obtenerTipoPersona` del componente SolicitanteComponent
    * para establecer el tipo de persona como MORAL_NACIONAL.
    */
   ngAfterViewInit(): void {
     this.solicitante.obtenerTipoPersona(TIPO_PERSONA.MORAL_NACIONAL);
   }

  /**
   * Índice utilizado para identificar la pestaña activa dentro del paso.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Determina si la pestaña de modificación de denominación o razón social debe estar habilitada.
   * @type {boolean}
   */
  isEnableModificacionTab: boolean = false;

  /**
   * Cambia la pestaña activa según el índice proporcionado.
   * @param i - El índice de la pestaña que se desea activar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Maneja el cambio de tipo de endoso y habilita o deshabilita la pestaña de modificación
   * dependiendo del valor seleccionado.
   * 
   * @param evento - El tipo de endoso seleccionado (puede ser string o número).
   */
  tipoDeEndosoChanges(evento: string | number): void {
    if (evento === 3) {
      this.isEnableModificacionTab = true;
    } else {
      this.isEnableModificacionTab = false;
    }
  }
}
