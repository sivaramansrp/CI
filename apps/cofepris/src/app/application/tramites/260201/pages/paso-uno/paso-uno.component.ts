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
   * Índice de la pestaña actualmente seleccionada.
   * 
   * @type {number | undefined}
   * @default 1
   */
  indice: number | undefined = 1;

  /**
   * Almacena el estado de la consulta actual.
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si el formulario está deshabilitado.
   */
  formularioDeshabilitado: boolean = false;

  /**
   * Subject utilizado para notificar la destrucción del componente.
   * Se usa para cancelar suscripciones y evitar fugas de memoria.
   * 
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente PasoUnoComponent.
   * 
   * Inyecta los servicios necesarios para la gestión del estado y consultas del trámite.
   * 
   * @param tramite260201Query Servicio para consultar el estado del trámite.
   * @param tramite260201Store Servicio para actualizar el estado del trámite.
   * @param consultaQuery Servicio para consultar el estado de la consulta.
   * @param http Cliente HTTP para realizar peticiones.
   */
  constructor(
    private tramite260201Query: Tramite260201Query,
    private tramite260201Store: Tramite260201Store,
    private consultaQuery: ConsultaioQuery,
    private readonly http: HttpClient
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Se suscribe a los observables para obtener el índice de la pestaña seleccionada y el estado de la consulta.
   * Gestiona la habilitación/deshabilitación del formulario y la carga de datos según el estado.
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
            this.formularioDeshabilitado = false;
            this.guardarDatosFormulario();
          } else if (this.consultaState.readonly) {
            this.formularioDeshabilitado = true;
          }
        })
      )
      .subscribe();
  }

  /**
   * Selecciona una pestaña específica en el flujo del trámite.
   *
   * @param i Índice de la pestaña a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.tramite260201Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se llama antes de destruir el componente.
   * Emite una notificación para cancelar las suscripciones y libera recursos.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
   *
   * @returns Observable con los datos del estado del trámite cargados desde el archivo JSON.
   */
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260201State> {
    return this.http.get<Tramite260201State>(
      'assets/json/260201/respuestaDeActualizacionDe.json'
    );
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Posteriormente, actualiza el formulario con los valores del store.
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
   * @param DATOS Estado del trámite con la información a actualizar en el store.
   */
  actualizarEstadoFormulario(DATOS: Tramite260201State): void {
    this.tramite260201Store.update((state) => ({
      ...state,
      ...DATOS,
    }));
  }

}
