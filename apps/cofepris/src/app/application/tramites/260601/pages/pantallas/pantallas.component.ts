import { AVISO_PRIVACIDAD, ERROR_FORMA_ALERT } from '../../constantes/aviso-enum';
import { Component, ViewChild } from '@angular/core';

import {
  AlertComponent,
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  PASOS,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosComponent } from '../datos/datos.component';
import { FirmarSolicitudComponent } from '../firmar-solicitud/firmar-solicitud.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * Interfaz que representa el botón de acción.
 */
interface AccionBoton {
  /**
   * La acción a realizar.
   */
  accion: string;

  /**
   * El valor asociado con la acción.
   */
  valor: number;
}

/**
 * Componente para la página de registro de solicitud.
 */
@Component({
  templateUrl: './pantallas.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WizardComponent,
    BtnContinuarComponent,
    DatosComponent,
    PasoDosComponent,
    AlertComponent,
    FirmarSolicitudComponent,
  ],
  styles: ``,
})
export class PantallasComponent {
  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente WizardComponent.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS`.
   */
  TEXTOS = AVISO_PRIVACIDAD;

  /**
   * Datos de los pasos del wizard.
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
   * Cuando es `true`, se muestra un mensaje de error indicando que hay campos obligatorios sin completar.
   */
  esFormaValido: boolean = false;

  /**
   * @property {DatosComponent} pasoUnoComponent
   * @description
   * Referencia al componente hijo DatosComponent que contiene los formularios del primer paso del trámite.
   * Se utiliza para acceder a sus métodos de validación y a la información capturada por el usuario.
   */
  @ViewChild(DatosComponent) pasoUnoComponent!: DatosComponent;
  /**
   * @property {string} formErrorAlert
   * @description
   * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
   * Utiliza la constante ERROR_FORMA_ALERT definida en los archivos de constantes del módulo.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Selecciona la pestaña especificada.
   *
   * @param i - El índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice y realiza la acción correspondiente.
   *
   * @param e - El botón de acción con el valor y la acción.
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
   * Valida todos los formularios del componente hijo DatosComponent.
   * Retorna `true` si todos los formularios son válidos, `false` si alguno es inválido.
   * Si no existe la referencia al componente, retorna `true` por defecto.
   *
   * @returns {boolean} `true` si todos los formularios son válidos, `false` si alguno es inválido.
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

export { PASOS };
