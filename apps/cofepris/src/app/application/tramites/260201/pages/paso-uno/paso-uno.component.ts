import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConsultaioQuery,
  ConsultaioState,
} from '@libs/shared/data-access-user/src';
import {
  Observable, 
  Subject,
  map,
  takeUntil
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tramite260201Query } from '../../estados/tramite260201Query.query';

import {
  Tramite260201State,
  Tramite260201Store
} from '../../estados/tramite260201Store.store';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
    /**
   * The index of the currently selected tab.
   * 
   * @type {number | undefined}
   * @default 1
   */
  indice: number | undefined = 1;

   /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

    /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
    public esDatosRespuesta: boolean = false;

   /**
   * A `Subject` used as a notifier to signal the destruction of the component.
   * This is typically used to unsubscribe from observables to prevent memory leaks.
   * 
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor de la clase PasoUnoComponent.
   * 
   * Este constructor inyecta las dependencias necesarias para el funcionamiento del componente.
   * 
   * @param tramite260201Query - Servicio que proporciona acceso a las consultas relacionadas con el flujo del trámite.
   * @param tramite260201Store - Servicio que gestiona el estado del flujo del trámite.
   */
  constructor(
    private tramite260201Query: Tramite260201Query,
        private tramite260201Store: Tramite260201Store,
    private consultaQuery: ConsultaioQuery,
    private readonly http: HttpClient
  ) {
    // El constructor necesita inyectar las dependencias.
  }

  /**
   * @override
   * @method ngOnInit
   * @description Este método se ejecuta al inicializar el componente. Se suscribe al observable `getTabSeleccionado$` 
   * del servicio `tramite260201Query` para obtener el índice de la pestaña seleccionada y lo asigna a la propiedad `indice`.
   * También utiliza el operador `takeUntil` para gestionar la suscripción y evitar fugas de memoria, 
   * deteniéndola cuando se emite un valor en el observable `destroyNotifier$`.
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite260201Query.getTabSeleccionado$
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
            this.esDatosRespuesta = false;
            this.guardarDatosFormulario();
          } else if (this.consultaState.readonly) {
            this.esDatosRespuesta = true;
          }
        })
      )
      .subscribe();
  }

  /**
   * Selecciona una pestaña específica en el flujo del trámite.
   *
   * @param i - El índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(i: number): void {
    this.tramite260201Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**More actions
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   *
   * @returns Observable con los datos del estado de la solicitud `Tramite260202State`,
   *          cargados desde el archivo JSON especificado en la ruta de `assets`.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260201State> {
    return this.http.get<Tramite260201State>(
      'assets/json/260201/respuestaDeActualizacionDe.json'
    );
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.More actions
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Actualiza el estado del formulario con los datos proporcionados.
   *
   * @param DATOS - Estado de la solicitud `Solicitud230401State` con la información
   *                del tipo de solicitud a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: Tramite260201State): void {
    this.tramite260201Store.update((state) => ({
      ...state,
      ...DATOS,
    }));
  }

}
