
import {
  Chofer40101Store,
  Choferesnacionales40101State,
} from '../../estado/chofer40101.store';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiResponseSolicitante } from '../../models/registro-muestras-mercancias.model';
import { Chofer40101Query } from '../../estado/chofer40101.query';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_40101 } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { Tramite40101Query } from '../../estado/tramite40101.query';
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


  /** Indica si el trámite es CAAT (Certificado de Autotransporte Aduanal Terrestre).
   * 
   * @type {boolean}
   * @default false
   */
  isCaat: boolean = false;


  /**
    * Clase CSS para mostrar una alerta de información.
    */
  public info = 'alert-info';

  // temp data needed from db to get  
  ALERTA = `<p style='text-align: center;'><b>¡Error de registro!</b> Faltan campos por capturar</p>`;

  /**
   * Subject para destruir las suscripciones y evitar fugas de memoria de los datos del solicitante.
   */
  private destroySolicitante$ = new Subject<void>();

  /**
   * Índice actual del paso en el wizard.
   *
   * @type {number}
   */
  indice: number = 1;

  /**
   * Estado de la sección actual del trámite.
   *
   * @type {Choferesnacionales40101State}
   */
  public seccion!: Choferesnacionales40101State;

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
   * @param {Chofer40101Query} chofer40101Query - Servicio para consultar el estado del store.
   * @param {Chofer40101Store} chofer40101Store - Servicio para manejar el estado del store.
   */
  constructor(
    private chofer40101Query: Chofer40101Query,
    private chofer40101Store: Chofer40101Store,
    private tramite40101Query: Tramite40101Query
  ) { }

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

    this.chofer40101Query.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.asignarSecciones();

    this.tramite40101Query.solicitanteData$.pipe(takeUntil(this.destroySolicitante$)).subscribe((data: ApiResponseSolicitante['datos']) => {
      this.isCaat = data.caat_existe;
    })
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
    this.destroySolicitante$.next();
    this.destroySolicitante$.complete();
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
      SECCIONES_TRAMITE_40101.PASO_1
    ) as Array<keyof typeof SECCIONES_TRAMITE_40101.PASO_1>) {
      SECCIONES.push(SECCIONES_TRAMITE_40101.PASO_1[LLAVE_SECCION]);
      FORMA_VALIDA.push(false);
    }

    this.chofer40101Store.establecerSeccion(SECCIONES);
    this.chofer40101Store.establecerFormaValida(FORMA_VALIDA);
  }
}
