import { Component, ViewChild } from '@angular/core';
import { DatosPasos,ERROR_FORMA_ALERT, ListaPasosWizard, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '@ng-mf/data-access-user';
import {DatosComponent} from '../datos/datos.component';
import { PANTA_PASOS } from '@ng-mf/data-access-user';

/**
 * @component PantallasComponent
 * @description
 * Componente principal para gestionar el flujo de pasos en el wizard del trámite 260514.
 * Permite la navegación entre diferentes pantallas/pasos utilizando el componente Wizard.
 * Controla el índice del paso actual y los datos necesarios para la navegación.
 * 
 * @selector app-pantallas
 * @templateUrl ./pantallas.component.html
 * @styleUrl ./pantallas.component.scss
 */
@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styleUrl: './pantallas.component.scss',
})
export class PantallasComponent {

  /**
   * @property pantallasPasos
   * @type {ListaPasosWizard[]}
   * @description
   * Lista de pasos del wizard, obtenida desde una constante.
   */
  public pantallasPasos: ListaPasosWizard[] = PANTA_PASOS;
 
  /**
   * @property indice
   * @type {number}
   * @default 1
   * @description
   * Índice del paso actual en el wizard.
   */
  public indice: number = 1;

  @ViewChild(DatosComponent) pasoUnoComponent!:DatosComponent ;
  public esFormaValido: boolean = false;

  public formErrorAlert = ERROR_FORMA_ALERT;
 
  /**
   * @property wizardComponent
   * @type {WizardComponent}
   * @description
   * Referencia al componente Wizard para controlar la navegación entre pasos.
   */
  @ViewChild(WizardComponent)
  public wizardComponent!: WizardComponent;
 
  /**
   * @property datosPasos
   * @type {DatosPasos}
   * @description
   * Datos utilizados para el control del wizard, como el número de pasos, el índice actual y los textos de los botones.
   */
  public datosPasos: DatosPasos = {
    nroPasos: this.pantallasPasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
 
  /**
   * @method getValorIndice
   * @description
   * Actualiza el índice del paso y maneja la navegación hacia adelante o atrás en el wizard.
   * Si la acción es 'cont', avanza al siguiente paso; en caso contrario, retrocede.
   * Solo actualiza si el valor está dentro del rango de pasos válidos.
   * 
   * @param {AccionBoton} e - Objeto que contiene el valor del paso y la acción a realizar.
   * @returns {void}
   */
  public getValorIndice(e: AccionBoton): void {
    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.pasoUnoComponent.validOnButtonClick();
      if (!ISVALID) {
        this.esFormaValido = true;
        return; // Detener ejecución si los formularios son inválidos
      }
    }

    // Calcular el nuevo índice basado en la acción
    let indiceActualizado = e.valor;
    if (e.accion === 'cont') {
      indiceActualizado = e.valor + 1;
    } else if (e.accion === 'ant') {
      indiceActualizado = e.valor - 1;
    }

    // Validar que el nuevo índice esté dentro de los límites permitidos
    if (indiceActualizado > 0 && indiceActualizado <= this.pantallasPasos.length) {

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
}
