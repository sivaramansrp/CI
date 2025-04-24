import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosPasos } from '@ng-mf/data-access-user';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { SECCIONES_TRAMITE_40402 } from '../../constants/solicitud.enums';
import { Subject } from 'rxjs';
import { Tramite40402Query } from '../../estados/tramite40402.query';
import { Tramite40402Store } from '../../estados/tramite40402.store';
import { Tramitenacionales40402State } from '../../estados/tramite40402.store';
import { WizardComponent } from '@ng-mf/data-access-user';
import { map } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
/**
 * Interfaz que define la estructura de un botón de acción en el asistente.
 */
interface AccionBoton {
  /**
   * Acción que se debe realizar (por ejemplo, "cont" para continuar o "atras" para retroceder).
   */
  accion: string;

  /**
   * Valor asociado al botón, que indica el índice del paso al que se debe mover el asistente.
   */
  valor: number;
}

@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit, OnDestroy {
  /**
   * Lista de pasos del asistente (wizard) que se mostrarán en la página.
   */
  pasos: Array<ListaPasosWizard> = PASOS.slice(0, 2);

  /**
   * Índice actual del paso seleccionado en el asistente.
   */
  indice: number = 1;

  /**
   * Estado actual de las secciones del formulario, gestionado por el store.
   */
  public seccion!: Tramitenacionales40402State;

  /**
   * Notificador para gestionar la destrucción de suscripciones activas.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Referencia al componente del asistente (wizard) en la vista.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos relacionados con los pasos del asistente, como el número total de pasos y los textos de los botones.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Constructor del componente.
   * @param tramite40402Query - Consulta para obtener datos del estado del trámite.
   * @param tramite40402Store - Almacén para gestionar el estado del trámite.
   */
  constructor(
    private tramite40402Query: Tramite40402Query,
    private tramite40402Store: Tramite40402Store
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura los pasos del asistente y asigna las secciones al store.
   */
  ngOnInit(): void {
    this.tramite40402Query.selectSeccionState$
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
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Cambia el índice actual del asistente al valor proporcionado.
   * @param i - Índice del paso seleccionado.
   */
  seleccionadosTodos(i: number): void {
    this.indice = i;
  }

  /**
   * Cambia el índice actual del asistente según la acción realizada (continuar o retroceder).
   * @param e - Objeto que contiene la acción y el valor del índice.
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
   * Método para asignar las secciones existentes al store.
   * Inicializa las secciones y su estado de validación.
   */
  private asignarSecciones(): void {
    const SECCIONES: boolean[] = [];
    const FORMA_VALIDA: boolean[] = [];

    for (const LLAVE_SECCION of Object.keys(
      SECCIONES_TRAMITE_40402.PASO_1
    ) as Array<keyof typeof SECCIONES_TRAMITE_40402.PASO_1>) {
      SECCIONES.push(SECCIONES_TRAMITE_40402.PASO_1[LLAVE_SECCION]);
      FORMA_VALIDA.push(false);
    }

    this.tramite40402Store.establecerSeccion(SECCIONES);
    this.tramite40402Store.establecerFormaValida(FORMA_VALIDA);
  }
}
