
import {
  Chofer40102Store,
  Choferesnacionales40102State,
} from '../../estados/chofer40102.store';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chofer40102Query } from '../../estados/chofer40102.query';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_40102 } from '../../constants/solicitud.enums';
import { Subject } from 'rxjs';
import { WizardComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';

interface AccionBoton {
  accion: string;
  valor: number;
}

@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit, OnDestroy {
  /**
   * Lista de pasos del wizard que se mostrarán en la página.
   *
   * @type {Array<ListaPasosWizard>}
   */
  pasos: Array<ListaPasosWizard> = PASOS.slice(0, 2);

  /**
   * Índice actual del paso en el wizard.
   *
   * @type {number}
   */
  indice: number = 1;

  /**
   * Estado de la sección actual del trámite.
   *
   * @type {Choferesnacionales40102State}
   */
  public seccion!: Choferesnacionales40102State;

  /**
   * Observable utilizado para manejar la limpieza de recursos al destruir el componente.
   *
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente hijo `WizardComponent` dentro de la plantilla.
   * Permite acceder a las propiedades y métodos públicos del componente hijo.
   *
   * @type {WizardComponent}
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos relacionados con los pasos del wizard, como el número de pasos, el índice actual,
   * y los textos de los botones de navegación.
   *
   * @type {DatosPasos}
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente. Inicializa las dependencias necesarias.
   *
   * @param {Chofer40102Query} chofer40102Query - Servicio para consultar el estado del store.
   * @param {Chofer40102Store} chofer40102Store - Servicio para manejar el estado del store.
   */
  constructor(
    private chofer40102Query: Chofer40102Query,
    private chofer40102Store: Chofer40102Store
  ) {}

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura los pasos del wizard y suscribe al estado de la sección.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.pasos = PASOS.slice(0, 2).map((paso) => {
      if (paso.indice === 2 && paso.titulo === 'Anexar necesarios') {
        return { ...paso, titulo: 'Firmar solicitud' };
      }
      return paso;
    });

    this.chofer40102Query.selectSeccionState$
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
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia los recursos y completa los observables.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Cambia el índice actual del wizard al valor proporcionado.
   *
   * @param {number} i - Índice del paso seleccionado.
   * @returns {void}
   */
  seleccionadosTodos(i: number): void {
    this.indice = i;
  }

  /**
   * Cambia el índice actual del wizard basado en la acción del botón.
   * Navega hacia adelante o hacia atrás en el wizard.
   *
   * @param {AccionBoton} e - Objeto que contiene la acción y el valor del índice.
   * @returns {void}
   */
  getValorIndice(e: AccionBoton): void {
    if (e.valor > 0 && e.valor < 6) {
      this.indice = e.valor;
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }
    }
  }

  /**
   * Método privado para asignar las secciones existentes al store.
   * Configura las secciones y las formas válidas en el estado del store.
   *
   * @returns {void}
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];

    for (const LLAVE_SECCION of Object.keys(
      SECCIONES_TRAMITE_40102.PASO_1
    ) as Array<keyof typeof SECCIONES_TRAMITE_40102.PASO_1>) {
      SECCIONES.push(SECCIONES_TRAMITE_40102.PASO_1[LLAVE_SECCION]);
      FORMA_VALIDA.push(false);
    }

    this.chofer40102Store.establecerSeccion(SECCIONES);
    this.chofer40102Store.establecerFormaValida(FORMA_VALIDA);
  }
}
