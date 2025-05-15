import { Component, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '../../modelos/acta-de-hechos.model';
import { PASOS } from '../../constantes/exportacion-armas-explosivo.enum';
import { TITULOMENSAJE } from '../../constantes/exportacion-armas-explosivo.enum';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz para manejar las acciones de los botones del wizard.
 * @interface AccionBoton
 */
interface AccionBoton {
  /**
   * Acción a realizar ('cont' para continuar, 'atras' para retroceder).
   * @type {string}
   */
  accion: string;

  /**
   * Índice del paso al que se desea navegar.
   * @type {number}
   */
  valor: number;
}

/**
 * Componente para la página de solicitud.
 * Maneja el flujo del wizard y la navegación entre pasos.
 */
@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss'
})
export class SolicitudPageComponent {

  /**
   * Array de pasos del wizard.
   * @type {Array<ListaPasosWizard>}
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * Título del mensaje mostrado en la página.
   * @type {string | null}
   */
  tituloMensaje: string | null = 'Registro nacional de exportadores';

  /**
   * Referencia al componente del wizard.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice del paso actual en el wizard.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Datos de configuración de los pasos del wizard.
   * @type {DatosPasos}
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
   * @param {AccionBoton} e - Objeto de acción que contiene la acción y el valor a manejar.
   * El `valor` representa el índice del paso al que ir.
   * La `accion` determina si avanzar ('cont') o retroceder ('atras').
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
   * Método estático que determina el título a mostrar de acuerdo al índice del paso actual.
   *
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
