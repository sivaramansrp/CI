import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

import { AccionBoton } from '@ng-mf/data-access-user';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';

import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { PASOS } from '../../constants/medicos-uso.enum';
import { TITULOMENSAJE } from '../../constants/medicos-uso.enum';

/**
 * @component ContenedorDePasosComponent
 * @description Componente contenedor principal del flujo tipo "wizard".
 * Administra la navegación entre los pasos del formulario y la lógica para cambiar de vista,
 * así como el título dinámico mostrado en el encabezado.
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
   * @property tituloMensaje
   * @description Título dinámico que se muestra en la parte superior del componente wizard.
   * Cambia según el paso activo.
   * @type {string | null}
   */
  public tituloMensaje: string | null = TITULOMENSAJE;

  /**
   * @property pasos
   * @description Lista de pasos definidos para el wizard.
   * @type {ListaPasosWizard[]}
   */
  public pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property indice
   * @description Índice actual del paso seleccionado en el wizard.
   * @type {number}
   */
  public indice: number = 1;

  /**
   * @property wizardComponent
   * @description Referencia al componente `WizardComponent`, permite manipular métodos como `siguiente()` o `atras()`.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;

  /**
   * @property datosPasos
   * @description Datos requeridos por el componente wizard para configurar botones y número de pasos.
   * @type {DatosPasos}
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @method seleccionaTab
   * @description Cambia el índice del paso actual manualmente.
   * @param {number} i - Índice del paso seleccionado.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method getValorIndice
   * @description Recibe una acción desde el botón de navegación del wizard y actualiza el paso y el título.
   * Llama al método correspondiente en el wizard para avanzar o retroceder.
   * @param {AccionBoton} e - Objeto con el valor del paso y la acción a ejecutar (`cont` o `atras`).
   * @returns {void}
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
   * @description Método auxiliar estático que devuelve el título correspondiente a cada paso.
   * @param {number} valor - Índice del paso.
   * @returns {string} Título a mostrar en el encabezado del wizard.
   */
  public static obtenerNombreDelTítulo(valor: number): string {
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
