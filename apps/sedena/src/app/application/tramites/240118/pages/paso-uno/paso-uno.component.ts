import {
  ConsultaioQuery,
  ConsultaioState,
} from '@libs/shared/data-access-user/src';
import { Subject, map} from 'rxjs';
import { Component } from '@angular/core';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Tramite240118Query } from '../../estados/tramite240118Query.query';
import { Tramite240118Store } from '../../estados/tramite240118Store.store';
import { takeUntil } from 'rxjs';

/**
 * @title Paso Uno
 * @description Componente que representa el primer paso del flujo de solicitud. Contiene los datos del solicitante, datos del trámite, terceros relacionados y pago de derechos.
 * @summary Agrupa los subcomponentes necesarios para capturar la información inicial del trámite.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * @description Constructor del componente.
   * Inicializa el componente y establece el índice de la pestaña seleccionada.
   */
  formularioDeshabilitado: boolean = false;
  /**
   * @property {ConsultaioState} consultaState - Estado actual relacionado con la consulta.
   */
  public consultaState!: ConsultaioState;
  /**
  /**
   * @property indice
   * @description Indicates the index of the selected tab within the form step.
   * @type {number | undefined}
   */
  public indice: number | undefined = 1;

  /**
   * @property destroyNotifier$
   * @description Observable notifier to unsubscribe active subscriptions when the component is destroyed.
   * Helps prevent memory leaks.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Initializes the component with required query and store for state management.
   *
   * @param Tramite240118Query Query to access procedure state.
   * @param tramite240118Store Store to update procedure state.
   *  @param consultaQuery Query to access consultation state.
   *  @param datosSolicitudService Service to fetch and manage request data.
   * @description
   *  This constructor injects the necessary services to manage the state of the procedure and consultation.
   */
  constructor(
    private tramite240118Query: Tramite240118Query,
    private tramite240118Store: Tramite240118Store,
    private consultaQuery: ConsultaioQuery,
    private datosSolicitudService: DatosSolicitudService
  ) {
    // No hacer nada
  }

  /**
   * Angular lifecycle method that runs on component initialization.
   * Subscribes to the selected tab from state and updates `indice`.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite240118Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          if (this.consultaState.update) {
            this.guardarDatosFormulario();
            this.formularioDeshabilitado = false;
          } else if (this.consultaState.readonly) {
            this.formularioDeshabilitado = true;
          }
        })
      )
      .subscribe();
  }
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.More actions
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.datosSolicitudService
      .obtenerRegistroTomarMuestrasDatos240118()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.tramite240118Store.setState(datos);
      });
  }

  /**
   * Updates the selected tab index in the store.
   *
   * @param i Index of the selected tab.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.tramite240118Store.updateTabSeleccionado(i);
  }

  /**
   * Angular lifecycle method that runs just before the component is destroyed.
   * Emits and completes the `destroyNotifier$` to unsubscribe observables.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
