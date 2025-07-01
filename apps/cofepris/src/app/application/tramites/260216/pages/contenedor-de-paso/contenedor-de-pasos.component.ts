/**
 * @file contenedor-de-pasos.component.ts
 * @description Este archivo define el componente `ContenedorDePasosComponent`, que actúa como un contenedor para manejar los pasos de un wizard (asistente).
 * Permite la navegación entre diferentes pasos y actualiza el título del mensaje según el paso seleccionado.
 *
 * @component
 * @name ContenedorDePasosComponent
 * @selector app-contenedor-de-pasos
 * @standalone true
 * @templateUrl ./contenedor-de-pasos.component.html
 * @styleUrl ./contenedor-de-paso.component.scss
 *
 * @description
 * Este componente encapsula la lógica y la presentación de un wizard que guía al usuario a través de varios pasos.
 * Utiliza componentes reutilizables como `WizardComponent`, `PasoUnoComponent`, `PasoDosComponent`, y `PasoTresComponent`.
 *
 * @dependencies
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - WizardComponent: Componente reutilizable para manejar la navegación entre pasos.
 * - PasoUnoComponent: Componente que representa el primer paso del wizard.
 * - PasoDosComponent: Componente que representa el segundo paso del wizard.
 * - PasoTresComponent: Componente que representa el tercer paso del wizard.
 * - BtnContinuarComponent: Componente reutilizable para manejar los botones de navegación.
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
   * @description Título del mensaje que se muestra en el wizard.
   * Inicializado con el valor de `TITULOMENSAJE`.
   */
  tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * @property {ListaPasosWizard[]} pasos
   * @description Lista de pasos del wizard.
   * Inicializado con el valor de `PASOS`.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {number} indice
   * @description Índice actual del paso seleccionado en el wizard.
   * Inicializado con el valor `1`.
   */
  indice: number = 1;

  /**
   * @property {WizardComponent} wizardComponent
   * @description Referencia al componente del wizard.
   * Utilizado para manejar la navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {DatosPasos} datosPasos
   * @description Objeto que contiene información sobre los pasos del wizard.
   * Incluye el número total de pasos, el índice actual y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method seleccionaTab
   * @description Cambia el índice actual al valor proporcionado.
   * @param {number} i - Índice del paso seleccionado.
   *
   * @example
   * ```typescript
   * this.seleccionaTab(2);
   * console.log(this.indice); // 2
   * ```
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description Actualiza el índice y el título del mensaje según la acción del botón.
   * Navega hacia adelante o hacia atrás en el wizard.
   * @param {AccionBoton} e - Objeto que contiene el valor del índice y la acción ('cont' o 'atras').
   *
   * @example
   * ```typescript
   * const accion: AccionBoton = { valor: 2, accion: 'cont' };
   * this.getValorIndice(accion);
   * console.log(this.indice); // 2
   * ```
   */
  getValorIndice(e: AccionBoton): void {
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
   * @description Devuelve el título correspondiente al paso actual.
   * @param {number} valor - Índice del paso.
   * @returns {string} Título del paso.
   *
   * @example
   * ```typescript
   * const titulo = ContenedorDePasosComponent.obtenerNombreDelTítulo(2);
   * console.log(titulo); // 'Cargar archivos'
   * ```
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULOMENSAJE;
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Firmar';
      default:
        return TITULOMENSAJE;
    }
  }
}