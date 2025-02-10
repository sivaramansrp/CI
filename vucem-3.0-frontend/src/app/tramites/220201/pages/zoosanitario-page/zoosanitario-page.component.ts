import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { ListaPasosWizard } from '../../../../core/models/220201/certificado-zoosanitario.model';
import { PASOS } from '../../../../shared/constantes/certificado-zoosanitario.enum';
import { SUCECESS_MESSAGE_STAGEONE } from '../../../../shared/constantes/certificado-zoosanitario.enum';
import { WizardComponent } from '../../../../shared/components/wizard/wizard.component';

/**
 * @fileoverview Componente principal para el formulario de certificado zoosanitario.
 * Este componente gestiona el flujo del formulario a través de un asistente (wizard),
 * controlando la navegación entre los pasos y la información mostrada en cada uno.
 * @module zoosanitarioPage
 */

/**
 * Interfaz para definir la acción y el valor del botón.
 * @interface AccionBoton
 * @property {string} accion - La acción del botón ('cont' o 'atras').
 * @property {number} valor - El índice del paso al que se navega.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

/**
 * Componente principal para el formulario de certificado zoosanitario.
 * @class ZoosanitarioPageComponent
 */
@Component({
  selector: 'app-zoosanitario-page',
  templateUrl: './zoosanitario-page.component.html',
})
export class ZoosanitarioPageComponent {

  /**
   * Array de pasos del asistente.
   * @property {ListaPasosWizard[]} pasos
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * Componente Wizard.
   * @property {WizardComponent} wizardComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice actual del paso.
   * @property {number} indice
   */
  indice: number = 1;

  /**
   * Datos para la configuración de los botones del asistente.
   * @property {DatosPasos} datosPasos
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Guardar',
    txtBtnSig: 'Continuar',
  };

  /**
   * Mensaje de éxito para el primer paso.
   * @property {string} mensajeDeTextoDeExito
   */
  mensajeDeTextoDeExito: string = SUCECESS_MESSAGE_STAGEONE;

  /**
   * Maneja la acción del botón y navega entre los pasos.
   * @method getValorIndice
   * @param {AccionBoton} e - Objeto con la acción y el valor del botón.
   */
  getValorIndice(e: AccionBoton) {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = this.obtenerNombreDelTítulo(e.valor);
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Obtiene el título para cada página según el índice.
   * @method obtenerNombreDelTítulo
   * @param {number} valor - El índice de la página.
   * @returns {string} - El título correspondiente.
   */
  obtenerNombreDelTítulo(valor: number) {
    switch (valor) {
      case 1:
        return 'Zoosanitario para importación';
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Zoosanitario para importación';
      case 4:
        return 'Firmar';
      default:
        return 'Zoosanitario para importación';
    }
  }

  /**
   * Cambia el título del mensaje según la pestaña seleccionada.
   * @method onTabChange
   * @param {number} selectedTab - El índice de la pestaña seleccionada.
   */
  onTabChange(selectedTab: number): void {
    switch (selectedTab) {
      case 1:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 2:
        this.tituloMensaje =
          'Captura del certificado zoosanitario para importación';
        break;
      case 3:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 4:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
      case 5:
        this.tituloMensaje =
          'Captura del certificado zoosanitario para importación';
        break;
      default:
        this.tituloMensaje = 'Zoosanitario para importación';
        break;
    }
  }
}