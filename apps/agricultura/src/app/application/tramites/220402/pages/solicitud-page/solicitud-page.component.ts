import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';

import { map, takeUntil } from 'rxjs/operators';

import {
  DatosPasos,
  SECCIONES_TRAMITE_220402
} from '@ng-mf/data-access-user';

import { WizardComponent } from '@libs/shared/data-access-user/src';

import {
  ERROR_FORMA_ALERT,
  MENSAJE_DE_EXITO_ETAPA_UNO,
  PASOS
} from '../../constantes/certificado-zoosanitario.enum';

import { ListaPasosWizard } from '../../models/pantallas-captura.model';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

import { SeccionQuery } from '../../../../estados/queries/seccion.query';

import { SeccionState, SeccionStore } from '../../../../estados/seccion.store';


/**
 *
 * Interfaz que define la estructura de un objeto de acción de botón.
 */
interface AccionBoton {
  /**
   * @property {string} accion - El accion del paso.
   */
  accion: string;
  /**
   * @property {number} valor - El valor del paso en el asistente.
   */
  valor: number;
}

/**
 * Componente para la vista de la solicitud-page de la sección de "220402".
 */

@Component({
  templateUrl: './solicitud-page.component.html',
  styleUrl: './solicitud-page.component.scss',
})

/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent implements OnInit, OnDestroy {
  /**
 * Contiene el mensaje de error que se muestra cuando la validación de formularios falla.
 */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
 * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
 * }
 */
  esFormaValido: boolean = false;

  /**
   * @property {ListaPasosWizard[]} pasos - Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {number} indice - Índice actual del paso.
   */
  indice: number = 1;

  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS_REQUISITOS - Textos para los requisitos del certificado zoosanitario. --220201
   */
  TEXTOS = MENSAJE_DE_EXITO_ETAPA_UNO;

  /**
   * @property {SeccionState} seccion - Estado de la sección actual.
   */
  public seccion: SeccionState = {
    seccion: [],
    formaValida: []
  };
  /**
    * @ignore
    * @private
    * @property {Subject<void>} destroyNotifier$ - Un `Subject` utilizado para notificar la destrucción del componente.
    */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente hijo WizardComponent para controlar la navegación del asistente.
   * Permite acceder a los métodos públicos del wizard desde este componente.
   *
   * @type {WizardComponent}
   * @memberof SolicitudPageComponent
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
 * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
 * const isValid = this.pasoUnoComponent.validateForms();
 * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
 */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;
  /**
   * @property {number} nroPasos - Número total de pasos.
   * @property {number} indice - Índice actual del paso.
   * @property {string} txtBtnAnt - Texto del botón para ir al paso anterior.
   * @property {string} txtBtnSig - Texto del botón para ir al siguiente paso.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * @description Constructor del componente. Inyecta las dependencias necesarias.
   * @param {SeccionQuery} seccionQuery - Servicio para consultar el estado de la sección.
   * @param {SeccionStore} seccionStore - Servicio para manejar el estado de la sección.
   */
  constructor(
    private seccionQuery: SeccionQuery,
    private seccionStore: SeccionStore
  ) { }

  /**
   * @ignore
   * @description Método que se ejecuta al inicializar el componente.
   * Suscribe al estado de la sección y asigna las secciones.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();
  }

  /**
   * @description Método para seleccionar una pestaña específica.
   * @param {number} i - Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Actualiza el índice basado en el valor de la acción proporcionada y navega en el componente wizard.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor y la acción del botón.
   * @param {number} e.valor - Valor del índice que debe estar entre 1 y 4.
   * @param {string} e.accion - Acción a realizar, puede ser 'cont' para avanzar o cualquier otro valor para retroceder.
   *
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e.accion === 'cont') {
      let isValid = true;
     if (this.indice === 1 && this.pasoUnoComponent) {
        isValid = this.pasoUnoComponent.validarTodosLosFormularios();
      }
      if (!isValid) {
        this.esFormaValido = true;
        this.datosPasos.indice = this.indice;
        return;
      }
      this.esFormaValido = false;
      this.indice = e.valor;
      this.datosPasos.indice = this.indice;
      return;
    }

    this.indice = e.valor;
    this.datosPasos.indice = this.indice;
  }

  /**
   * Método para asignar las secciones existentes al stored
   */
  asignarSecciones(): void {
    const SECCIONES: boolean[] = Object.values(SECCIONES_TRAMITE_220402.PASO_1);
    const FORM_VALIDA: boolean[] = [];
    for (const LLAVESECCIONE in SECCIONES_TRAMITE_220402.PASO_1) {
      if (LLAVESECCIONE) {
        FORM_VALIDA.push(false);
      }
    }
    this.seccionStore.establecerSeccion(SECCIONES);
    this.seccionStore.establecerFormaValida(FORM_VALIDA);
  }
  /**
   * Guarda los datos actuales y retrocede al paso anterior en el asistente.
   * 
   * Este método utiliza el método `getValorIndice` para establecer el índice del paso anterior
   * en el asistente y navegar hacia él.
   * 
   * @param {void} _ev - Evento que dispara la acción de guardar (actualmente no utilizado).
   */
  guardar(_ev: void): void {
    this.getValorIndice({ accion: 'ant', valor: 2 });
  }

  /**
   * Valida todos los formularios del primer paso antes de permitir continuar al siguiente paso.
   */
  // El método de validación de formularios paso uno ya no es necesario con el nuevo flujo
  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida que se ejecuta al destruir el componente.
   * 
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar todas las suscripciones activas, evitando fugas de memoria.
   * 
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}