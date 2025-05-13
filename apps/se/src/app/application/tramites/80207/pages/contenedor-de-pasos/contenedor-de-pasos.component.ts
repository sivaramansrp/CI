import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  SeccionLibStore,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { PASOS } from '../../constantes/pasos.enum';
import { Subject } from 'rxjs';
import { Tramites80207Queries } from '../../estados/tramite80207.query';
import { takeUntil } from 'rxjs/operators';

/**
 * @fileoverview Componente para la gestión del contenedor de pasos.
 * Este componente maneja la lógica y la presentación del contenedor de pasos,
 * incluyendo la inicialización, la navegación entre pasos y la gestión del estado de las secciones.
 * @module contenedorDePasos --80207
 */

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
export class ContenedorDePasosComponent implements OnDestroy {
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
   * Obtiene el valor del índice del paso actual.
   * @method getValorIndice
   * @param {AccionBoton} e - Acción del botón que contiene el valor del índice.
   */

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor de la clase ContenedorDePasosComponent.
   *
   * @param tramiteQuery - Servicio de consultas específicas para el trámite 80207.
   * @param seccion - Servicio para gestionar el estado de la sección en la librería de la aplicación.
   *
   * Este constructor inicializa el componente y configura una suscripción al observable `formaValida$`
   * del servicio `Tramites80207Queries`. Cuando se emite un nuevo valor, se actualiza el estado de la
   * sección y se establece si el formulario es válido.
   */
  constructor(
    private tramiteQuery: Tramites80207Queries,
    private seccion: SeccionLibStore
  ) {
    this.tramiteQuery.formaValida$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((res) => {
        this.seccion.establecerSeccion([true]);
        this.seccion.establecerFormaValida([res]);
      });
  }

  /**
   * @method getValorIndice
   * @description Cambia el índice actual basado en el valor y la acción proporcionados por el evento `AccionBoton`.
   * Si el valor está entre 1 y 4 (inclusive), actualiza el índice y ejecuta una acción en el componente del asistente.
   *
   * @param {AccionBoton} e - Objeto que contiene el valor y la acción a realizar.
   *                          `valor` debe ser un número entre 1 y 4, y `accion` puede ser 'cont' o cualquier otra acción.
   *
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 5) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Utiliza un Subject para notificar a todos los observables suscritos que deben completarse.
   * Esto ayuda a evitar posibles fugas de memoria al completar el Subject y finalizar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
