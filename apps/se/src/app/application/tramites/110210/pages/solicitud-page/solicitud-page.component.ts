import { AVISO, DatosPasos, ListaPasosWizard, PASOS, WizardComponent } from '@libs/shared/data-access-user/src';
import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT } from '../../constantes/tramite110210.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';


/**
 * @descripcion
 * Interfaz que define la estructura de una acción de botón.
 */
interface AccionBoton {
  /**
   * La acción que se realizará.
   * @type {string}
   */
  accion: string;

  /**
   * El valor asociado a la acción.
   * @type {number}
   */
  valor: number;
}

@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
/**
 * @descripcion
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent {
     /**
   * Constantes importadas desde el archivo de enumeración para los mensajes de advertencia.
   *
   * @type {AVISO}
   * @memberof RegistroParaLaComponent
   */
  public ADVERTENCIA = AVISO;
  /**
   * Lista de pasos del asistente.
   * @type {ListaPasosWizard[]}
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   * @type {number}
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;
  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente,
   * especialmente para validar todos sus formularios antes de avanzar al siguiente paso.
   */
  @ViewChild('pasoUno') pasoUnoComponent!: PasoUnoComponent;

  /**
   * @property {boolean} esFormaValido
   * @description
   * Indica si hay errores de validación en los formularios que se deben mostrar.
   * Se establece a `true` cuando se intenta avanzar al siguiente paso con formularios inválidos,
   * lo que activa la visualización de mensajes de error en la interfaz.
   */
  esFormaValido: boolean = false;

  /**
   * @property {Object} formErrorAlert
   * @description
   * Objeto que contiene la configuración del mensaje de error para formularios inválidos.
   * Utiliza la constante `ERROR_FORMA_ALERT` definida en las enumeraciones del trámite.
   * Define el título, mensaje y opciones de visualización para la alerta de error de validación de formularios.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Datos de los pasos del asistente.
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @descripcion
   * Selecciona una pestaña del asistente.
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @descripcion
   * Obtiene el valor del índice de la acción del botón.
   * @param {AccionBoton} e - Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {
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
   * Valida todos los formularios del componente `PasoUnoComponent`.
   * Si la referencia al componente no existe, retorna `true` para permitir la navegación.
   * Llama al método `validarFormularios()` del componente hijo para verificar la validez de todos sus formularios.
   * Si algún formulario es inválido, retorna `false` para impedir el avance al siguiente paso.
   * 
   * @returns {boolean} `true` si todos los formularios son válidos o si el componente no existe, `false` si algún formulario es inválido.
   * @private
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