import { AccionBoton, DatosPasos, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT } from '../../components/constantes/aviso-enum';
import { PASOS } from "@libs/shared/data-access-user/src/core/enums/130301/modificacion.enum";
import { PasoUnoComponent } from '../../pages/paso-uno/paso-uno.component';

/**
 * Componente para gestionar la página de la solicitud del trámite.
 * Este componente utiliza un asistente (wizard) para guiar al usuario a través de los pasos del trámite.
 */
@Component({
  selector: 'app-solicitud-page',
  templateUrl: './solicitud-page.component.html',
})
export class SolicitudPageComponent {
  /**
   * Índice actual del paso en el asistente.
   * Este valor determina el paso activo en el wizard.
   * 
   * @type {number}
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para interactuar con el wizard y controlar su flujo (pasar al siguiente paso, ir al anterior, etc.).
   * 
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al PasoUnoComponent para validación cruzada.
   */
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Lista de pasos del asistente.
   * Contiene un arreglo con los pasos definidos en `PASOS` que será utilizado en el wizard.
   * 
   * @type {ListaPasosWizard[]}
   */
  /**
   * Lista de pasos del asistente.
   * @type {ListaPasosWizard[]}
   */
  readonly PASOS_WIZARD: ListaPasosWizard[] = PASOS;

  /**
   * Datos de los pasos del asistente.
   * Incluye el número total de pasos, el índice del paso actual y los textos de los botones de navegación (Anterior, Continuar).
   * 
   * @type {DatosPasos}
   */
  /**
   * Datos de los pasos del asistente.
   * Incluye el número total de pasos, el índice del paso actual y los textos de los botones de navegación.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.PASOS_WIZARD.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Indica si el formulario actual es válido. Se utiliza para mostrar alertas cuando faltan campos por capturar.
   * @type {boolean}
   */
  esFormaValido: boolean = false;

  /**
   * Mensaje de alerta para campos obligatorios no capturados.
   * @type {string}
   */
  readonly formErrorAlert: string = ERROR_FORMA_ALERT;

  /**
   * Controla el cambio de paso en el asistente (wizard) según la acción del botón presionado.
   * Si la acción es 'cont', valida los formularios del paso uno antes de avanzar.
   * Si la validación falla, bloquea la navegación y muestra una alerta.
   * @param {AccionBoton} accionBoton - Acción del botón ('cont' o 'ant') y el valor asociado.
   */
  getValorIndice(accionBoton: AccionBoton): void {
    this.esFormaValido = false;
    
    // Solo validar cuando se avanza desde el paso 1
    if (this.indice === 1 && accionBoton.accion === 'cont') {
      const ES_VALIDO = this.validarTodosFormulariosPasoUno();
      if (!ES_VALIDO) {
        this.esFormaValido = true;
        // Asegurar que datosPasos.indice se mantenga en el paso actual
        this.datosPasos.indice = this.indice;
        return;
      }
    }
    
    // Calcular el índice actualizado basado en la acción
    let indiceActualizado = this.indice;
    if (accionBoton.accion === 'cont') {
      indiceActualizado = this.indice + 1; // Incrementar desde el paso actual
    } else if (accionBoton.accion === 'ant') {
      indiceActualizado = this.indice - 1; // Decrementar desde el paso actual
    }
    
    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (indiceActualizado > 0 && indiceActualizado <= this.PASOS_WIZARD.length) {
      this.indice = indiceActualizado;
      this.datosPasos.indice = indiceActualizado;
      
      // Navegar en el wizard
      if (accionBoton.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else if (accionBoton.accion === 'ant') {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Valida todos los formularios del PasoUnoComponent.
   * Retorna verdadero si todos los formularios son válidos, falso si alguno es inválido.
   * Si no existe la referencia al componente, retorna verdadero por defecto.
   * @returns {boolean} verdadero si todos los formularios son válidos, falso si alguno es inválido.
   */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ES_VALIDO = this.pasoUnoComponent.validarTodosFormulariosPasoUno();
    return Boolean(ES_VALIDO);
  }
}