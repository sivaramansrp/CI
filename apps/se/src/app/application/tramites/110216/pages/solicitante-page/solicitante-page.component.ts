import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  DatosPasos,
  ListaPasosWizard,
  WizardComponent,
} from '@ng-mf/data-access-user';
import {
  PASOS,
  TEXTOS,
} from '../../constants/inicialmente-certificado-origen.enum';
import { Subject, map, takeUntil } from 'rxjs';
import {
  Tramite110216State,
  Tramite110216Store,
} from '../../../../estados/tramites/tramite110216.store';
import { AccionBoton } from '../../models/certificado-origen.model';
import { Tramite110216Query } from '../../../../estados/queries/tramite110216.query';

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
   *
   * Esta propiedad contiene un array de objetos `ListaPasosWizard` que representan
   * los pasos del wizard.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * Índice del paso activo en el wizard.
   *
   * Esta propiedad indica el paso actual en el wizard, comenzando desde 1.
   */
  indice: number = 1;

  /**
   * Textos utilizados en el componente.
   *
   * Esta propiedad contiene textos como instrucciones o mensajes que se muestran
   * en la interfaz del usuario.
   */
  TEXTOS = TEXTOS;

  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   *
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual del trámite.
   *
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
  public tramiteState!: Tramite110216State;

  /**
   * Referencia al componente `WizardComponent`.
   *
   * Esta propiedad utiliza `@ViewChild` para obtener una referencia al componente
   * del wizard dentro de la plantilla.
   */
  @ViewChild(WizardComponent) wizardComponent!: WizardComponent;

  /**
   * Datos relacionados con los pasos del wizard.
   *
   * Esta propiedad contiene información como el número total de pasos, el índice
   * del paso actual y los textos de los botones "Anterior" y "Continuar".
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };

  /**
   * Estado actual del trámite 110216.
   *
   * Esta propiedad mantiene la información de la solicitud en curso y
   * se sincroniza de manera reactiva con el store correspondiente.
   * Contiene los datos necesarios para representar y manipular
   * la solicitud dentro del componente.
   *
   * @type {Tramite110216State}
   * @public
   */
  solicitudState!: Tramite110216State;

  /**
   * Identificador numérico de la solicitud actual.
   * Se inicializa en 0 y se actualiza cuando se captura una nueva solicitud.
   */
  idSolicitud: number = 0;

  /**
   * Constructor del componente.
   *
   * @param {Tramite110216Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite110216Query} tramiteQuery - Query para obtener el estado del trámite.
   */
  constructor(
    public store: Tramite110216Store,
    public tramiteQuery: Tramite110216Query
  ) {
    this.tramiteQuery.selectSolicitud$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((solicitud) => {
        this.solicitudState = solicitud;
      });
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   *
   * Este método suscribe al estado del trámite y actualiza la propiedad `tramiteState`
   * con los datos obtenidos.
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
   *
   * Este método actualiza el índice del paso activo y avanza o retrocede en el wizard
   * dependiendo de la acción recibida.
   *
   * @param {AccionBoton} e - Objeto que contiene la acción (`cont` o `atras`) y el valor del índice.
   */
  getValorIndice(e: AccionBoton): void {
    // Verifica si el valor de la acción está en el rango adecuado
    if (e.valor > 0 && e.valor < 5) {
      // Actualiza el índice del paso basado en el valor de la acción
      this.indice = e.valor;

      // Dependiendo de la acción, avanza o retrocede en el wizard
      if (e.accion === 'cont') {
        // Si la acción es 'cont', avanza al siguiente paso
        this.wizardComponent.siguiente();
      } else {
        // Si la acción es 'atras', retrocede al paso anterior
        this.wizardComponent.atras();
      }

      // Actualiza el paso activo en el store
      this.store.setPasoActivo(this.indice);
    }
  }

  /**
   * Método que se ejecuta al destruir el componente.
   *
   * Este método emite un valor al `destroyNotifier$` y lo completa para cancelar
   * todas las suscripciones activas y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
