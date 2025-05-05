import { Component, ViewChild } from '@angular/core';
import { MENSAJE_DE_EXITO_ETAPA_UNO, PASOS } from '../../constants/immex-ampliacion-sensibles.enums';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '../../models/immex-ampliacion-sensibles.model';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Interfaz para la acción de los botones
 */
interface AccionBoton {
  accion: string;
  valor: number;
}
/**
 * Componente principal para el formulario de solicitud IMMEX modalidad ampliación sensibles.
 */

@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})
export class SolicitudPageComponent {
  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje - Título que se muestra en la parte superior del formulario.
   */
  tituloMensaje: string | null =
    'Registro de solicitud IMMEX modalidad ampliación sensibles';


  /**
   * Mensaje de éxito para el primer paso.
   * @property {string} mensajeDeTextoDeExito - Mensaje que se muestra si el primer paso se completa con éxito.
   *
   */
  mensajeDeTextoDeExito: string = MENSAJE_DE_EXITO_ETAPA_UNO;

  /**
   * Array de pasos del asistente.
   * @property {ListaPasosWizard[]} pasos - Lista de los pasos del asistente, incluyendo título y componente asociado.
   *
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice actual del paso.
   * @property {number} indice - Índice del paso actual en el que se encuentra el usuario.
   *
   */
  indice: number = 1;

  /**
   * Componente Wizard.
   * @property {WizardComponent} wizardComponent - Referencia al componente Wizard para controlar la navegación.
   *
   */

  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos para la configuración de los botones del asistente.
   * @property {DatosPasos} datosPasos - Configuración para los botones "Anterior" y "Siguiente".
   *
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Updates the `indice` and `tituloMensaje` properties based on the value of the provided `AccionBoton` object.
   * If the `valor` property of `AccionBoton` is between 1 and 4 (inclusive), it sets the `indice` to `e.valor`
   * and updates the `tituloMensaje` using the `obtenerNombreDelTítulo` method.
   * Depending on the `accion` property of `AccionBoton`, it either moves the wizard component forward or backward.
   *
   * @param {AccionBoton} e - The action button object containing the `valor` and `accion` properties.
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      this.tituloMensaje = SolicitudPageComponent.obtenerNombreDelTítulo(
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
   * Obtiene el nombre del título basado en el valor proporcionado.
   *
   * @param {number} valor - El valor numérico que determina el título a retornar.
   * @returns {string} El nombre del título correspondiente al valor proporcionado.
   *
   *
   */
  static obtenerNombreDelTítulo(valor: number): string {
    switch (valor) {
      case 1:
        return 'Registro de solicitud IMMEX modalidad ampliación sensibles';
      case 2:
        return 'Cargar archivos';
      case 3:
        return 'Cargar archivos';
      case 4:
        return 'Firmar';
      default:
        return 'Registro de solicitud IMMEX modalidad ampliación sensibles';
    }
  }

  /**
   * Cambia el título del mensaje según la pestaña seleccionada.
   * @method enTabChange
   * @param {number} selectedTab - El índice de la pestaña seleccionada.
   *
   * */
  enTabChange(selectedTab: number): void {
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
