import { ACCIONBOTON, LISTAPASOWIZARD } from '../../models/prosec.module';
import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, PASOS } from '../../constantes/prosec.module';
import { DatosPasos } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * @component ProsecComponent
 * @description
 * Este componente maneja el flujo del trámite PROSEC mediante un wizard.
 * Permite la navegación entre pasos, mantiene el estado actual del paso
 * y gestiona los textos de los botones de navegación.
 */
@Component({
  selector: 'app-prosec',
  templateUrl: './prosec.component.html',
  styleUrl: './prosec.component.scss'
})
export class ProsecComponent {
  /**
   * @property {LISTAPASOWIZARD[]} pasos
   * @description
   * Lista de pasos del wizard utilizada para estructurar el flujo del trámite.
   */
  pasos: LISTAPASOWIZARD[] = PASOS;

  /**
   * @property {string | null} tituloMensaje
   * @description
   * Título mostrado en la parte superior del wizard.
   */
  tituloMensaje: string | null = 'Zoosanitario para importación';

  /**
   * @property {WizardComponent} wizardComponent
   * @description
   * Referencia al componente hijo `WizardComponent` para controlar la navegación de pasos.
   */
  @ViewChild(WizardComponent)
  wizardComponent!: WizardComponent;

  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` que contiene los formularios del primer paso del trámite PROSEC.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * @property {number} indice
   * @description
   * Índice del paso actual en el flujo del wizard.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description
   * Contiene información sobre el número de pasos, texto de botones e índice actual.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @property {boolean} esFormaValido
   * @description
   * Indica si el formulario actual es válido. Se utiliza para mostrar alertas cuando faltan campos por capturar.
   */
  esFormaValido: boolean = false;

  /**
   * @property {string} formErrorAlert
   * @description
   * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;
  /**
   * @method getValorIndice
   * @description
   * Este método se ejecuta cuando se presiona un botón de navegación.
   * Verifica si el valor es válido y navega hacia adelante o hacia atrás en el wizard.
   * 
   * @param {ACCIONBOTON} e - Objeto con la acción (`cont` para continuar, `back` para retroceder) y el nuevo índice.
   * @returns {void}
   */
  getValorIndice(e: ACCIONBOTON): void {
    this.esFormaValido = false;
    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return; // Detener ejecución si los formularios son inválidos
      }
    }

    let indiceActualizado = e.valor;
    if (e.accion === 'cont') {
      indiceActualizado = e.valor + 1;
    } else if (e.accion === 'ant') {
      indiceActualizado = e.valor - 1;
    }

    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (indiceActualizado > 0 && indiceActualizado <= this.pasos.length) {

      // Actualizar el índice y datosPasos
      this.indice = indiceActualizado;
      this.datosPasos.indice = indiceActualizado;

      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else if (e.accion === 'ant') {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * @method validarTodosFormulariosPasoUno
   * @description
   * Valida todos los formularios del componente hijo `PasoUnoComponent`.
   * Retorna `true` si todos los formularios son válidos, `false` si alguno es inválido.
   * Si no existe la referencia al componente, retorna `true` por defecto.
   *
   * @returns {boolean} `true` si todos los formularios son válidos, `false` si alguno es inválido.
   */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }
}
