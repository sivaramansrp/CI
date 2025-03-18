import {
  BtnContinuarComponent,
  DatosPasos,
  ListaPasosWizard,
  SeccionLibStore,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import {
  PASOS,
  TITULOMENSAJE,
} from '../../constantes/autorizacion-programa-nuevo.enum';
import { Subject, takeUntil } from 'rxjs';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';

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
  host: { hostID: crypto.randomUUID().toString() },
  imports: [
    WizardComponent,
    PasoUnoComponent,
    PasoDosComponent,
    BtnContinuarComponent,
    PasoTresComponent,
  ],
  standalone: true,
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent implements OnDestroy {
  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /**
   * Referencia al componente del asistente.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos de los pasos del asistente.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Título del mensaje principal.
   * @property {string | null} tituloMensaje - Título que se muestra en la parte superior del formulario.
   */
  tituloMensaje: string = TITULOMENSAJE;

  constructor(
    private tramiteQuery: Tramite80102Query,
    private seccion: SeccionLibStore
  ) {
    this.tramiteQuery.FormaValida$.pipe(
      takeUntil(this.destroyNotifier$)
    ).subscribe((res) => {
      this.seccion.establecerSeccion([true]);
      this.seccion.establecerFormaValida([res]);
    });
  }
  /**
   * Selecciona una pestaña del asistente.
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
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
   * Obtiene el título para cada página según el índice.
   * @method obtenerNombreDelTítulo
   * @param {number} valor - El índice de la página.
   * @returns {void}
   */
  obtenerNombreDelTítulo(valor: number): void {
    switch (valor) {
      case 1:
        this.tituloMensaje = TITULOMENSAJE;
        break;
      case 2:
        this.tituloMensaje = this.pasos[1].titulo;
        break;
      case 3:
        this.tituloMensaje = this.pasos[2].titulo;
        break;
      case 4:
        this.tituloMensaje = this.pasos[3].titulo;
        break;
      default:
        this.tituloMensaje = TITULOMENSAJE;
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
