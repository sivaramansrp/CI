import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';

import { map, takeUntil } from 'rxjs/operators';

import {
  ConsultaioQuery,
  ConsultaioState,
  PersonaTerceros,
} from '@ng-mf/data-access-user';

import { SeccionLibStore } from '@libs/shared/data-access-user/src';

import { ConsultaDatosService } from '../../servicios/consulta-datos.servicio';

import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite240118Query } from '../../estados/tramite240118Query.query';
import { Tramite240118Store } from '../../estados/tramite240118Store.store';


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
   * Indica si existen datos de respuesta para mostrar en el formulario.
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * @property {ConsultaioState} consultaState - Estado actual relacionado con la consulta.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Lista de personas relacionadas con el trámite.
   * @type {PersonaTerceros[]}
   */
  public personas: PersonaTerceros[] = [];

  /**
   * @description Constructor del componente.
   * Inicializa el componente y establece el índice de la pestaña seleccionada.
   */
  formularioDeshabilitado: boolean = false;

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
    private route: ActivatedRoute,
    private seccionStore: SeccionLibStore,
    private consultaDatosService: ConsultaDatosService,
    private consultaQuery: ConsultaioQuery,
    private tramite240118Query: Tramite240118Query,
    private tramite240118Store: Tramite240118Store,
    private datosSolicitudService: DatosSolicitudService
  ) {
    this.tramite240118Store = tramite240118Store;
  }

  /**
   * Angular lifecycle method that runs on component initialization.
   * Subscribes to the selected tab from state and updates `indice`.
   *
   * @returns {void}
   */
  ngOnInit(): void {
        this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState.readonly;
          if (this.consultaState.update) {
            this.guardarDatosFormulario();
          } else {
            this.esDatosRespuesta = true;
          }
        })
      )
      .subscribe();

    this.route.queryParams
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = Number(tab['indice'] || 1);
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
   * Guarda los datos del formulario obtenidos del servicio.
   * Este método se suscribe al servicio para obtener los datos de la solicitud
   * y actualiza el estado del formulario con la información recibida.
   * @method guardarDatosFormulario
   */
  guardarDatosFormulario(): void {
    this.consultaDatosService
      .getDatosDeLaSolicitudData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.personas =
            (resp as { personas?: PersonaTerceros[] }).personas || [];
          this.consultaDatosService.actualizarEstadoFormulario(resp);
        }
      });
  }
  /**
   * Evento emitido al cambiar de pestaña.
   * @event tabChanged
   * @type {EventEmitter<number>}
   */
  @Output() tabChanged = new EventEmitter<number>();

  /**
   * Cambia el índice de la pestaña seleccionada.
   * @method seleccionaTab
   * @param {number} i - El índice de la pestaña a seleccionar.
   */
  public seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }

  /**
   * Maneja la limpieza de recursos antes de destruir el componente.
   * Completa el Subject `destroyNotifier$` para evitar fugas de memoria.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
