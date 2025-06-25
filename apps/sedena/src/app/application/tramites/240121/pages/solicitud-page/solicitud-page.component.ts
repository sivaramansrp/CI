import { Component, ViewChild } from '@angular/core';
import { DatosPasos,WizardComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '../../modelos/exportacion-explosivo.model';
import { PASOS } from '../../constantes/exportacion-armas-explosivo.enum';
import { TITULOMENSAJE } from '../../constantes/exportacion-armas-explosivo.enum';

/**
 * @interface AccionBoton
 * Representa una acción de botón con un nombre de acción y un valor asociado.
 *
 * @property {string} accion - El nombre o identificador de la acción del botón.
 * @property {number} valor - El valor numérico asociado a la acción.
 */
interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss'
})
export class SolicitudPageComponent {

  /**
   * @property {Array<ListaPasosWizard>} pasos - Array de pasos del wizard.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * @property {string | null} tituloMensaje - El título del mensaje.
   */
  tituloMensaje: string | null = 'Registro nacional de exportadores';

  /**
   * @description Referencia al componente `WizardComponent` dentro de la plantilla.
   * Utiliza el decorador `@ViewChild` para acceder a las propiedades y métodos públicos del componente hijo.
   * 
   * @remarks
   * Esta propiedad se inicializa automáticamente después de que Angular ha renderizado la vista.
   * 
   * @example
   * // Acceder a métodos del wizard desde el componente padre:
   * this.wizardComponent.nextStep();
   * 
   * @comando
   * Utilice esta propiedad para controlar el flujo del wizard desde el componente principal.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * @property {number} indice - El índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos - Datos de los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja la acción del botón y determina la navegación (siguiente o anterior).
   *
   * @param e - Objeto de acción que contiene la acción y el valor a manejar.
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar (cont) o retroceder (atras).
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * @method obtenerNombreDelTítulo
   * @description Método estático que determina el título
   * a mostrar de acuerdo al índice del paso actual.
   * @param {number} valor - Índice del paso.
   * @returns {string} Título correspondiente al paso.
   */
  public static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return TITULOMENSAJE;
      case 2:
        return 'Anexar requisitos';
      case 3:
        return 'Firmar';
      default:
        return TITULOMENSAJE;
    }
  }
}
