/**
 * Componente que representa la página de retorno de importación temporal.
 * Permite gestionar los pasos del asistente y la navegación entre ellos.
 */
import { Component, ViewChild } from '@angular/core';

import { AVISO, DatosPasos, PASOS_REGISTRO } from '@ng-mf/data-access-user';
import {ERROR_FORMA_ALERT,ERROR_FORMA_ALERT_DOS} from '../../enum/autorizacion-importacion-temporal.enum';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { WizardComponent } from '@ng-mf/data-access-user';


/**
 * Interfaz que representa la acción de un botón.
 */
interface AccionBoton {
  /**
   * La acción que se va a realizar.
   */
  accion: string;
  /**
   * El valor asociado a la acción.
   */
  valor: number;
}

/**
 * Componente que representa los pasos de datos en un proceso de múltiples pasos.
 */
@Component({
  selector: 'app-autorizacion-importacion-temporal',
  templateUrl:'./autorizacion-importacion-temporal.component.html',
  standalone:false
})
export class AutorizacionImportacionTemporalComponent {


  /**
   * Mensaje de información para la alerta.
   */
  public infoAlert = 'alert-info';

  /**
   * Textos de aviso utilizados en el componente.
   */
  TEXTOS = AVISO.Aviso;
  /**
   * Lista de pasos en el asistente.
   */
  pasos: ListaPasosWizard[] = PASOS_REGISTRO;

  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Variable utilizada para almacenar la lista de pasos.
   */
  pantallasPasos: ListaPasosWizard[] = PASOS_REGISTRO;

  /**
   * Variable utilizada para almacenar el índice del paso actual.
   */
  indice: number = 1;

  /**
   * Datos para los pasos en el asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  
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
   * @property {boolean} esFormaValidoDos
   * @description
   * Indica si hay errores de validación en los formularios que se deben mostrar.
   * Se establece a `true` cuando se intenta avanzar al siguiente paso con formularios inválidos,
   * lo que activa la visualización de mensajes de error en la interfaz.
   */
  esFormaValidoDos: boolean = false;

   /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
   formErrorAlert =ERROR_FORMA_ALERT;
  /**
   * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
   */
   formErrorAlertDos =ERROR_FORMA_ALERT_DOS;

  /**
   * Actualiza el valor del índice según el evento del botón de acción.
   * @param e El evento del botón de acción que contiene la acción y el valor.
   */
  public getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;
    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
    
       if(ISVALID==="showFirstError"){
        this.esFormaValido = true;
        this.esFormaValidoDos = false;
        return;

       }
       if(ISVALID==="showSecondError"){
        this.esFormaValido = false;
        this.esFormaValidoDos = true;
        return;

       }
       if(ISVALID==="showBothErrors"){
        this.esFormaValido = true;
        this.esFormaValidoDos =true;
        return;

       }

       if(ISVALID==="showNoError"){
        this.esFormaValido = false;
        this.esFormaValidoDos = false;
        
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
  private validarTodosFormulariosPasoUno(): string {
    if (!this.pasoUnoComponent) {
      return "showNoError";
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validarFormularios();
   
    return ISFORM_VALID_TOUCHED;
  }         

}
