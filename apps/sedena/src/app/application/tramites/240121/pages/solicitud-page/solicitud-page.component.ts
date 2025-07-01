import { Component, ViewChild } from '@angular/core';
import { DatosPasos, WizardComponent } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '../../modelos/exportacion-explosivo.model';
import { PASOS } from '../../constantes/exportacion-armas-explosivo.enum';
import { TITULOMENSAJE } from '../../constantes/exportacion-armas-explosivo.enum';

/**
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   */
  valor: number;
}
@Component({
  /**
   * @property selector
   * @description Nombre del selector HTML que se usará para insertar este componente
   * en otras plantillas. Se representa como una etiqueta HTML personalizada.
   * @example <app-solicitud-page></app-solicitud-page>
   */
  selector: 'app-solicitud-page',

  /**
   * @property templateUrl
   * @description Ruta relativa al archivo HTML que contiene la plantilla de vista del componente.
   */
  templateUrl: './solicitud-page.component.html',

  /**
   * @property styleUrl
   * @description Ruta al archivo SCSS que contiene los estilos específicos del componente.
   */
  styleUrl: './solicitud-page.component.scss',
})
export class SolicitudPageComponent {

  /**
   * Array de pasos del wizard que indica el flujo del trámite.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

  /**
   * Título principal del mensaje de encabezado del componente.
   */
  tituloMensaje: string | null = 'Registro nacional de exportadores';

  /**
   * Referencia al componente `WizardComponent`, permite controlar el flujo entre pasos.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Índice actual del paso activo en el wizard.
   */
  indice: number = 1;

  /**
   * Objeto que representa los datos del wizard (botones y número de pasos).
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Maneja los eventos de los botones del wizard para avanzar o retroceder en los pasos.
   *
   * @param e - Objeto que contiene el tipo de acción (`cont` o `atras`) y el nuevo índice del paso.
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
   * Retorna el título correspondiente al paso del wizard según su índice.
   *
   * @param {number} valor - Índice del paso actual.
   * @returns {string} Título a mostrar.
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
