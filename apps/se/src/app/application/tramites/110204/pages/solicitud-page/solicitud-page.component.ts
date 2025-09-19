import { AVISO_CONTRNIDO, DatosPasos, ListaPasosWizard, SeccionLibStore, WizardComponent } from '@ng-mf/data-access-user';
import { Component, ViewChild } from '@angular/core';
import { ERROR_FORMA_ALERT, PASOS } from "../../constantes/modificacion.enum";
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

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
  templateUrl: './solicitud-page.component.html',
  styles: ``,
})
/**
 * Componente que representa la página de solicitud.
 * Este componente gestiona los pasos de un asistente de solicitud (wizard).
 */
export class SolicitudPageComponent {

  /**
   * Lista de pasos del asistente.
   * Contiene un arreglo con los pasos definidos en `PASOS` que será utilizado en el wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {string} formErrorAlert
   * @description
   * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Índice del paso actual.
   * Este valor se utiliza para determinar qué paso está activo en el wizard.
   * Inicialmente se establece en 1, que corresponde al primer paso.
   */

  constructor(private seccionStore: SeccionLibStore){
    
  }
  indice: number = 1;

  /**
   * Referencia al componente del asistente (wizard).
   * Se utiliza para interactuar con el wizard y controlar su flujo (pasar a siguiente paso, ir al anterior, etc.).
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

    /**
   * @property {PasoUnoComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
   * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * @property {boolean} esFormaValido
   * @description
   * Indica si el formulario del paso actual es válido.
   * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
   */
  esFormaValido: boolean = false;

  /**
   * Datos de los pasos del asistente.
   * Incluye el número total de pasos, el índice del paso actual y los textos de los botones de navegación (Anterior, Continuar).
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length, // Número total de pasos en el asistente
    indice: this.indice, // Índice del paso actual
    txtBtnAnt: 'Anterior', // Texto del botón "Anterior"
    txtBtnSig: 'Continuar', // Texto del botón "Continuar"
  };

  /**
   * Clase CSS utilizada para mostrar alertas informativas.
   * Esta clase se aplica a los mensajes de información que se muestran en el componente.
   */
  public infoAlert = 'alert-info';

/**
 * Contiene el texto del aviso de privacidad simplificado.
 * 
 * @constant {string} avisoContrnido
 * Se inicializa con la propiedad `aviso` del objeto `AVISO_CONTRNIDO`.
 * 
 * Uso:
 * - Mostrar el aviso de privacidad en la interfaz de usuario.
 * - Reutilizar el contenido del aviso en distintos componentes.
 */
avisoContrnido = AVISO_CONTRNIDO.aviso;

  /**
   * Selecciona una pestaña del asistente (wizard).
   * Este método actualiza el índice del paso seleccionado y, por lo tanto, cambia el paso que se está mostrando.
   * 
   * @param i Índice de la pestaña a seleccionar (paso).
   */
  seleccionaTab(i: number): void {
    // Actualiza el índice del paso seleccionado
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * Este método controla el cambio de paso en el wizard dependiendo de la acción del botón presionado.
   * 
   * Si la acción es 'cont', pasa al siguiente paso. Si la acción es 'atras', regresa al paso anterior.
   * 
   * @param e Acción del botón (cont o atras) y el valor asociado a la acción.
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

}
