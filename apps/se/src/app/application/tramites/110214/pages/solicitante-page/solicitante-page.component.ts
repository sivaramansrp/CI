import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  PASOS,
  TEXTO_DE_ALERTA,
  TEXTO_DE_PELIGRO,
} from '../../constants/validar-inicialmente-certificado.enum';
import {
  Tramite110214State,
  Tramite110214Store,
} from '../../../../estados/tramites/tramite110214.store';

import {
  CategoriaMensaje,
  DatosPasos,
  ListaPasosWizard,
  Notificacion,
  TipoNotificacionEnum,
} from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { AccionBoton } from '../../models/validar-inicialmente-certificado.model';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';
import { WizardComponent } from '@libs/shared/data-access-user/src';

import { PasoUnoComponent } from '../paso-uno/paso-uno.component';

/**
 * Componente para gestionar la página del solicitante.
 *
 * Este componente permite al usuario navegar entre los pasos del wizard y gestionar
 * las acciones relacionadas con el trámite, como avanzar o retroceder entre los pasos.
 */
@Component({
  selector: 'app-solicitante-page',
  templateUrl: './solicitante-page.component.html',
  styleUrl: './solicitante-page.component.scss',
})
export class SolicitantePageComponent implements OnInit, OnDestroy {
  /**
   * Lista de pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso activo en el wizard.
   */
  indice: number = 1;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   */
  public tramiteState!: Tramite110214State;

  /**
   * Referencia al componente `WizardComponent`.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Referencia al componente `PasoUnoComponent`.
   */
  @ViewChild('pasoUnoRef') pasoUnoComponent!: PasoUnoComponent;

  /**
   * Datos relacionados con los pasos del wizard.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
  /**
   * Configuración de notificación actual para mostrar al usuario.
   */
  public nuevaNotificacion!: Notificacion;
  /**
   * Texto de alerta para notificaciones.
   */
  TEXTO_DE_ALERTA = TEXTO_DE_ALERTA;

  /**
   * Texto de peligro para notificaciones.
   */
  TEXTO_DE_PELIGRO = TEXTO_DE_PELIGRO;

  /**
   * Indica si se debe mostrar una alerta.
   */
  isAlerta: boolean = false;

  /**
   * Indica si se debe mostrar un mensaje de peligro.
   */
  isPeligro: boolean = false;

  /**
   * Indica si se debe mostrar el botón de continuar.
   */
  btnContinuar: boolean = false;

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
   * Estado actual del trámite 110214.
   *
   * Esta propiedad mantiene la información de la solicitud en curso y
   * se sincroniza de manera reactiva con el store correspondiente.
   * Contiene los datos necesarios para representar y manipular
   * la solicitud dentro del componente.
   */
  public solicitudState!: Tramite110214State;

  /**
   * Constructor del componente.
   */
  constructor(
    public store: Tramite110214Store,
    public tramiteQuery: Tramite110214Query
  ) {
    this.tramiteQuery.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Método para manejar las acciones de los botones del wizard.
   */
  getValorIndice(e: AccionBoton): void {
    // Validar formularios antes de continuar desde el paso uno
    if (this.indice === 1 && e.accion === 'cont') {
      const ES_VALIDO = this.validarFormulariosPasoActual();
      if (!ES_VALIDO) {
        this.isPeligro = true;
        this.TEXTO_DE_PELIGRO =
          '<strong>¡Error de registro!</strong> Faltan campos por capturar';
        this.mostrarNotificacionError();

        return; // Detener ejecución si los formularios son inválidos
      }
    }

    // Verifica si el valor de la acción está en el rango adecuado
    if (e.valor > 0 && e.valor <= this.pasos.length) {
      // Actualiza el índice del paso basado en el valor de la acción
      this.indice = e.valor;

      // Dependiendo de la acción, avanza o retrocede en el wizard
      if (e.accion === 'cont') {
        this.wizardComponent.siguiente();
      } else {
        this.wizardComponent.atras();
      }

      // Actualiza el paso activo en el store
      this.store.setPasoActivo(this.indice);
    }
  }

  /**
   * Valida los formularios del paso actual antes de permitir continuar.
   *
   * @returns {boolean} - `true` si los formularios son válidos, `false` en caso contrario.
   */
  validarFormulariosPasoActual(): boolean {
    if (this.indice === 1) {
      // Validar formularios del paso uno
      return this.pasoUnoComponent?.validarFormularios() ?? true;
    }
    // Agregar validaciones para otros pasos si es necesario
    return true;
  }

  /**
   * Muestra un mensaje de advertencia si la validación falla.
   */
  mostrarMensajePeligro(): void {
    if (this.isPeligro) {
      this.isPeligro = false;
    }
  }

  /**
   * Muestra una notificación cuando el RFC tiene un formato incorrecto.
   */
  mostrarNotificacionError(): void {
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
  }
  /**
   * Maneja la confirmación del modal de notificación.
   */
  btnContinuarNotificacion(): void {
    this.btnContinuar = false;
  }
  /**
   * Método que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}