import { Component, ViewChild } from '@angular/core';
import {
  DatosPasos,
} from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { WizardComponent } from '@ng-mf/data-access-user';
import { ERROR_FORMA_ALERT } from '../../enum/certificado.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * Texto de alerta para terceros.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'La solicitud ha quedado registrada con el número temporal 202757598 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';

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

/**
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent {
  /**
   * Texto de alerta que se muestra a los terceros.
   */
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;

  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Indica si se debe mostrar el botón de continuar (controla la visibilidad según el estado de carga de archivo).
   */
  cargarArchivo: boolean = true;

  /**
   * Índice del paso actual en el asistente.
   */
  indice: number = 1;


  /**
    * @property {boolean} esFormaValido
    * @description
    * Indica si el formulario del paso actual es válido.
    * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
    */
  esFormaValido: boolean = false;
  /**
    * @property {string} formErrorAlert
    * @description
    * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
    */
  public formErrorAlert = ERROR_FORMA_ALERT;
  /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
  /**
   * Referencia al componente del asistente (wizard).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente, incluyendo textos de botones y el índice actual.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón y controla la navegación del asistente.
   * @param e Acción del botón.
   */
  getValorIndice(e: AccionBoton): void {

    this.esFormaValido = false;

    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        return;
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

      if (e.valor > 0 && e.valor < 5) {
        this.indice = e.valor;
        if (e.accion === 'cont') {
          this.wizardComponent.siguiente();
        } else {
          this.wizardComponent.atras();
        }
      }
    }
  }

  /**
     * @method validarTodosFormulariosPasoUno
     * @description
     * Valida todos los formularios del componente `PasoUnoComponent`.
     * Si la referencia al componente no existe, retorna `true` (no hay formularios que validar).
     * Llama al método `validarFormularios()` del componente hijo y retorna `false` si algún formulario es inválido.
     * Retorna `true` si todos los formularios son válidos.
     *
     * @returns {boolean} Indica si todos los formularios del paso uno son válidos.
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


  /**
   * Actualiza el estado de carga de archivo, permitiendo mostrar u ocultar el botón de continuar.
   * Este método es llamado desde un componente hijo mediante un evento.
   * @param data Valor booleano que indica si se está cargando un archivo.
   */
  cargaArchivo(data: boolean): void {
    this.cargarArchivo = data;
  }
}