/**
 * @fileoverview
 * El `ContenedorDePasosComponent` es un componente de Angular diseñado para gestionar la navegación de un wizard.
 * Este componente utiliza el `WizardComponent` y otros componentes de pasos (`PasoUnoComponent`, `PasoDosComponent`, `PasoTresComponent`) 
 * para proporcionar una experiencia de navegación paso a paso.
 * 
 * @module ContenedorDePasosComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos de navegación del wizard, 
 * incluyendo el título mostrado y el índice del paso actual. También permite la navegación entre pasos 
 * mediante botones o pestañas.
 */

import {
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
} from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { PASOS, TITULOMENSAJE } from '../../constants/medicos-uso.enum';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * @component
 * @name ContenedorDePasosComponent
 * @description
 * Componente contenedor que utiliza el `WizardComponent` para gestionar la navegación paso a paso.
 * Este componente interactúa con los pasos definidos (`PasoUnoComponent`, `PasoDosComponent`, `PasoTresComponent`) 
 * y actualiza dinámicamente el título y el índice del paso actual.
 *
 * @selector app-contenedor-de-pasos
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./contenedor-de-pasos.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./contenedor-de-paso.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - WizardComponent: Componente que gestiona la navegación del wizard.
 * - PasoUnoComponent, PasoDosComponent, PasoTresComponent: Componentes que representan los pasos del wizard.
 * - BtnContinuarComponent: Componente para gestionar los botones de navegación.
 */
@Component({
  selector: 'app-contenedor-de-pasos',
  standalone: true,
  imports: [
    CommonModule,
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    PasoTresComponent,
    BtnContinuarComponent,
  ],
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent {
  /**
   * @property {string | null} tituloMensaje
   * Título que se muestra en la parte superior del wizard. Se actualiza dependiendo del paso seleccionado.
   */
  public tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * @property {ListaPasosWizard[]} pasos
   * Listado de pasos definidos para el wizard, incluyendo información y componentes asociados.
   */
  public pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {number} indice
   * Índice del paso actual en el wizard.
   */
  public indice: number = 1;

  /**
   * @property {WizardComponent} wizardComponent
   * Referencia al componente `WizardComponent`, utilizada para invocar métodos de navegación interna como `siguiente()` y `atras()`.
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  /**
   * @property {DatosPasos} datosPasos
   * Configuración de la barra de navegación del wizard: número de pasos, índice actual y textos de los botones.
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method seleccionaTab
   * @description
   * Permite cambiar el paso actual de forma manual al hacer clic en las pestañas (tabs) del wizard.
   * 
   * @param {number} i - Índice del paso seleccionado.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * this.seleccionaTab(2); // Cambia al paso 2
   * ```
   */
  public seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description
   * Controla la navegación del wizard en función de la acción recibida (`cont` o `atras`). 
   * Actualiza el paso actual y el título mostrado, y llama a los métodos de navegación del `WizardComponent`.
   * 
   * @param {AccionBoton} e - Objeto que contiene el índice del paso y la acción a realizar.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * const accion: AccionBoton = { valor: 2, accion: 'cont' };
   * this.getValorIndice(accion); // Navega al paso 2
   * ```
   */
  public getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = ContenedorDePasosComponent.obtenerNombreDelTítulo(
        e.valor
      );

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * @method obtenerNombreDelTítulo
   * @description
   * Método estático que determina el título a mostrar de acuerdo al índice del paso actual.
   * 
   * @param {number} valor - Índice del paso.
   * @returns {string} Título correspondiente al paso.
   *
   * @example
   * ```typescript
   * const titulo = ContenedorDePasosComponent.obtenerNombreDelTítulo(2);
   * console.log(titulo); // 'Cargar requisitos'
   * ```
   */
  public static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULOMENSAJE;
      case 2:
        return 'Cargar requisitos';
      case 3:
        return 'Firmar';
      default:
        return TITULOMENSAJE;
    }
  }
}