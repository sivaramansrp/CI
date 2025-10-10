import { Component, OnDestroy, ViewChild } from '@angular/core';
import { DatosPasos, ERROR_FORMA_ALERT } from '@ng-mf/data-access-user';
import {
  Solicitud110207State,
  Tramite110207Store,
} from '../../state/Tramite110207.store';
import { Subject, takeUntil } from 'rxjs';
import { ListaPasosWizard } from '@ng-mf/data-access-user';
import { PASOS } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { WizardComponent } from '@ng-mf/data-access-user';

/**
 * Texto de alerta para terceros.
 */
const TERCEROS_TEXTO_DE_ALERTA =
  'La solicitud ha quedado registrada con el número temporal 202757598 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.';
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
 * Componente que representa la página de solicitud.
 */
@Component({
  templateUrl: './solicitud-page.component.html',
  styles: ``,
  standalone: false,
})
/**
 * Componente que representa la página de solicitud.
 */
export class SolicitudPageComponent implements OnDestroy {
  TEXTO_DE_ALERTA: string = TERCEROS_TEXTO_DE_ALERTA;
  /**
   * Lista de pasos del asistente.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso actual.
   */
  indice: number = 1;

  /** Identificador numérico de la solicitud actual. */
  idSolicitud: number = 0;

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  solicitudState!: Solicitud110207State;

  /**
   * Notificador para destruir los observables y evitar posibles fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  destroyNotifier$: Subject<void> = new Subject();

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
  * @property {boolean} esFormaValido
  * @description
  * Indica si el formulario del paso actual es válido.
  * Se utiliza para mostrar mensajes de error o controlar la navegación en el asistente.
  */
  esFormaValido: boolean = false;

  /**
  * @property {PasoUnoComponent} pasoUnoComponent
  * @description
  * Referencia al componente hijo `PasoUnoComponent` mediante ViewChild.
  * Permite acceder a los métodos y propiedades del formulario del primer paso del asistente desde el componente padre.
  */
  @ViewChild(PasoUnoComponent) pasoUnoComponent!: PasoUnoComponent;

  /**
   * @property {string} formErrorAlert
   * @description
   * Mensaje HTML que se muestra como alerta cuando faltan campos por capturar en el formulario.
   */
  public formErrorAlert = ERROR_FORMA_ALERT;

  /**
   * Constructor del componente.
   *
   * Inyecta los servicios necesarios para consultar y gestionar el estado
   * del trámite **110207**.
   * Al inicializarse, establece una suscripción al observable `selectSolicitud$`
   * expuesto por el `Tramite110207Query`, con el fin de mantener sincronizada
   * la propiedad local `solicitudState` en función de los cambios en el store.
   *
   * @param {Tramite110207Store} solicitudStore - Servicio `Store` que administra el estado global
   *                                              del trámite 110207, permitiendo crear, actualizar
   *                                              o resetear los valores del estado.
   * @param {Tramite110207Query} tramiteQuery - Servicio `Query` que expone observables y selectores
   */
  constructor(
    public solicitudStore: Tramite110207Store,
    public tramiteQuery: Tramite110207Query
  ) {
    this.tramiteQuery.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
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
   * Este método controla el cambio de paso en el wizard dependiendo de la acción del botón presionado.
   * 
   * Si la acción es 'cont', pasa al siguiente paso. Si la acción es 'atras', regresa al paso anterior.
   * 
   * @param e Acción del botón (cont o atras) y el valor asociado a la acción.
   */
  getValorIndice(e: AccionBoton): void {
    this.esFormaValido = false;

    if (this.indice === 1 && e.accion === 'cont') {
      const ISVALID = this.validarTodosFormulariosPasoUno();
      if (!ISVALID) {
        this.esFormaValido = true;
        this.indice = 1;
        this.datosPasos.indice = 1;
      } else {
        this.indice = 2;
        this.datosPasos.indice = 2;
      }

    } else if (e.valor > 0 && e.valor <= this.pasos.length) {
      this.pasoNavegarPor(e);
    }
  }

  /**
   * Obtiene el valor del índice de la acción del botón.
   * @param e Acción del botón.
   */
  pasoNavegarPor(e: AccionBoton): void {
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
 * @method validarTodosFormulariosPasoUno
 * @description
 * Valida todos los formularios del componente `PasoUnoComponent`.
 * Si la referencia al componente no existe, retorna `true` (no hay formularios que validar).
 * Llama al método `validarFormularios()` del componente hijo y retorna `false` si algún formulario es inválido.
 * Retorna `true` si todos los formularios son válidos.
 *
 * @returns {boolean} Indica si todos los formularios del paso uno son válidos.
 */
  private validarTodosFormulariosPasoUno(): boolean {
    if (!this.pasoUnoComponent) {
      return true;
    }
    const ISFORM_VALID_TOUCHED = this.pasoUnoComponent.validateAll();
    if (!ISFORM_VALID_TOUCHED) {
      return false;
    }
    return true;
  }

  /**
   * Hook de ciclo de vida de Angular que se ejecuta al destruir el componente.
   *
   * Su objetivo es limpiar los recursos utilizados durante la vida del componente,
   * principalmente las suscripciones a observables.
   * Para lograrlo, emite un valor (`next()`) y completa (`complete()`)
   * el `Subject` `destroyNotifier$`, el cual se usa junto con `takeUntil`
   * en las suscripciones RxJS.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
