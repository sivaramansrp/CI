import { Component, ViewChild } from '@angular/core';
import { DatosPasos, ListaPasosWizard, WizardComponent} from '@ng-mf/data-access-user';
import { map, Subject, takeUntil } from 'rxjs';
import {PASOS} from "libs/shared/data-access-user/src/tramites/constantes/80207/pasos.enum";
import { SeccionState } from 'apps/aga/src/app/application/estados/seccion.store';

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
 * @fileoverview Componente para la gestión del contenedor de pasos.
 * Este componente maneja la lógica y la presentación del contenedor de pasos,
 * incluyendo la inicialización, la navegación entre pasos y la gestión del estado de las secciones.
 * @module contenedorDePasos --80207
 */

/**
 * Componente para la gestión del contenedor de pasos.
 * @class ContenedorDePasosComponent --80207
 */

@Component({
  selector: 'app-contenedor-de-pasos',
  templateUrl: './contenedor-de-pasos.component.html',
  styleUrl: './contenedor-de-pasos.component.scss',
})

/**
 * Lista de pasos del wizard.
 * @property {ListaPasosWizard[]} pasos
 */
export class ContenedorDePasosComponent {
  /**
   * Lista de pasos del wizard.
   * @property {ListaPasosWizard[]} pasos
   */
  pasos: ListaPasosWizard[] = PASOS;
  /**
   * Índice del paso actual.
   * @property {number} indice
   */
  indice: number = 1;

  /**
   * Estado de la sección actual.
   * @property {SeccionState} seccion
   */
  public seccion!: SeccionState;

  /**
   * Notificador para destruir las suscripciones.
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente del wizard.
   * @property {WizardComponent} wizardComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del wizard.
   * @property {DatosPasos} datosPasos
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente.
   * @constructor
   * @param {SeccionQuery} seccionQuery - Servicio para consultar el estado de las secciones.
   * @param {SeccionStore} seccionStore - Servicio para gestionar el estado de las secciones.
   */
  constructor(
  ) {}

  /**
   * Inicializa el componente.
   * @method ngOnInit
   */
  ngOnInit() {
  }

  /**
   * Obtiene el valor del índice del paso actual.
   * @method getValorIndice
   * @param {AccionBoton} e - Acción del botón que contiene el valor del índice.
   */

  getValorIndice(e: AccionBoton) {
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
