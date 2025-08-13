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
  AVISO,
  AccionBoton,
  DatosPasos,
  ListaPasosWizard,
} from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { AlertComponent } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { PASOS } from '../../constants/pasos.enum';
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
 * - AlertComponent: Componente para mostrar mensajes de alerta.
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
    AlertComponent,
  ],
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-paso.component.scss',
})
export class ContenedorDePasosComponent {
  /**
   * @property {string | null} tituloMensaje
   * @description
   * Título principal mostrado en la parte superior según el paso actual.
   */
  tituloMensaje: string | null =
    'Permiso sanitario de importación de dispositivos médicos destinados a pruebas de laboratorio';

  /**
   * @property {string} TEXTOS
   * @description
   * Texto de aviso utilizado en el componente.
   */
  TEXTOS: string = AVISO.Aviso;

  /**
   * @property {string} infoAlert
   * @description
   * Clase CSS para aplicar estilos a los mensajes de información.
   */
  public infoAlert = 'alert-info';

  /**
   * @property {ListaPasosWizard[]} pasos
   * @description
   * Lista de pasos del wizard obtenidos desde una constante externa.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {number} indice
   * @description
   * Índice actual del paso seleccionado (empieza en 1).
   */
  indice: number = 1;

  /**
   * @property {WizardComponent} wizardComponent
   * @description
   * Referencia al componente Wizard para controlar navegación entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {DatosPasos} datosPasos
   * @description
   * Objeto de configuración utilizado por el componente wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method seleccionaTab
   * @description
   * Cambia el índice actual del wizard manualmente.
   * 
   * @param {number} i - Índice del paso al que se desea cambiar.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * this.seleccionaTab(2); // Cambia al paso 2
   * ```
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description
   * Controla la navegación del wizard según el botón presionado (anterior o continuar).
   * También actualiza el título correspondiente al paso actual.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor y la acción del botón presionado.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * const accion: AccionBoton = { valor: 3, accion: 'cont' };
   * this.getValorIndice(accion); // Navega al paso 3
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
   * @description
   * Devuelve el título a mostrar según el número de paso.
   *
   * @param {number} valor - Índice del paso actual.
   * @returns {string} - Título correspondiente.
   *
   * @example
   * ```typescript
   * const titulo = ContenedorDePasosComponent.obtenerNombreDelTítulo(2);
   * console.log(titulo); // 'Anexar requisitos'
   * ```
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return 'Permiso sanitario de importación de medicamentos con registro sanitario';
      case 2:
        return 'Anexar requisitos';
      case 3:
        return 'Firmar solicitud';
      default:
        return 'Permiso sanitario de importación de medicamentos con registro sanitario';
    }
  }
}