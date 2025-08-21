import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PASOS } from '../../constants/solicitud.enums';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';


import {
  CategoriaMensaje,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  TipoNotificacionEnum,
  WizardComponent
} from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';

import { map, takeUntil } from 'rxjs/operators';

import { Tramite40402Query } from '../../estados/tramite40402.query';

import {
  Tramite40402Store,
  Tramitenacionales40402State
} from '../../estados/tramite40402.store';

/**
 * Interfaz que define la estructura de un botón de acción en el asistente.
 */
interface AccionBoton {
  /** Acción que se debe realizar (por ejemplo, "cont" para continuar o "atras" para retroceder). */
  accion: string;
  /** Valor asociado al botón, que indica el índice del paso al que se debe mover el asistente. */
  valor: number;

}
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit, OnDestroy {
  /**
   * Configuración de notificación actual para mostrar al usuario.
   */
  public nuevaNotificacion!: Notificacion;
  
  /**
   * Controla la visibilidad del modal de notificación.
   */
   btnContinuar: boolean = false;

  /**
 * Referencia al componente hijo `PasoUnoComponent` para acceder a sus métodos de validación de formularios.
 * const esValido = this.pasoUnoComponent.validateForms();
 * const formsValidity = this.pasoUnoComponent.getAllFormsValidity();
 */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Controla la visibilidad del mensaje de error cuando la validación de formularios falla.
   * }
   */
  esFormaValido: boolean = false;

  /**
   * Método para retroceder el paso desde Paso Tres
   */
  retrocederPaso(): void {
    if (this.indice > 1) {
      this.indice--;
      this.actualizarDatosPasos();
    }
  }
  /**
   * Actualiza los textos y datos de los botones según el paso actual
   */
  private actualizarDatosPasos(): void {
    this.datosPasos = {
      nroPasos: this.pasos.length,
      indice: this.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
  }
  /**
   * Lista de pasos del asistente (wizard) que se mostrarán en la página.
   */
  pasos: Array<ListaPasosWizard> = PASOS;

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
    this.actualizarDatosPasos();
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
  this.actualizarDatosPasos();
  }

  /**
   * Cambia el índice actual del asistente según la acción realizada (continuar o retroceder).
   * @param e - Objeto que contiene la acción y el valor del índice.
   */
getValorIndice(e: AccionBoton): void {
  this.esFormaValido = false;
  if (this.indice === 1 && e.accion === 'cont') {
    e.valor = 1;
    if (this.pasoUnoComponent && this.pasoUnoComponent.DatosTramite) {
      this.pasoUnoComponent.DatosTramite.marcarTodoComoTocado();
    }
    const ES_VALIDO = this.pasoUnoComponent ? this.pasoUnoComponent.validarFormularios() : true;
    if (!ES_VALIDO) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ERROR,
        modo: 'modal-md',
        titulo: '',
        mensaje: 'Existen requisitos obligatorios en blanco o con errores.',
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.btnContinuar = true;
      this.indice = 1;
      this.actualizarDatosPasos();
      return;
    }

    const INDICE_ACTUALIZADO = e.valor + 1;
    if (INDICE_ACTUALIZADO > 0 && INDICE_ACTUALIZADO <= this.pasos.length) {
      this.indice = INDICE_ACTUALIZADO;
      this.actualizarDatosPasos();
      this.wizardComponent.siguiente();
      this.btnContinuar = false;
    }
    return;
  }

  if (this.indice !== 1) {
    let INDICE_ACTUALIZADO = e.valor;
    if (e.accion === 'cont') {
      INDICE_ACTUALIZADO = e.valor + 1;
      if (INDICE_ACTUALIZADO > 0 && INDICE_ACTUALIZADO <= this.pasos.length) {
        this.indice = INDICE_ACTUALIZADO;
        this.actualizarDatosPasos();
        this.wizardComponent.siguiente();
      }
    } else if (e.accion === 'ant') {
      INDICE_ACTUALIZADO = e.valor - 1;
      if (INDICE_ACTUALIZADO > 0 && INDICE_ACTUALIZADO <= this.pasos.length) {
        this.indice = INDICE_ACTUALIZADO;
        this.actualizarDatosPasos();
        this.wizardComponent.atras();
      }
    }
  }
}
}
