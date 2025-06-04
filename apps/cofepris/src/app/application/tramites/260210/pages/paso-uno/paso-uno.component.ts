import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Tramite260210State, Tramite260214Store } from '../../estados/tramite260210Store.store';
import { HttpClient } from '@angular/common/http';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260210Query } from '../../estados/tramite260210Query.query';

/**
 * @component PasoUnoComponent
 * @description Container component representing the first step of the procedure form.
 * It handles the selected tab index using state from `Tramite260210Query` and updates it via `Tramite260214Store`.
 */
@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosContenedoraComponent,
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
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
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  /**
   * Initializes the component with required query and store for state management.
   *
   * @param Tramite260210Query Query to access procedure state.
   * @param tramite260214Store Store to update procedure state.
   */
  constructor(
    private Tramite260210Query: Tramite260210Query,
    private tramite260214Store: Tramite260214Store,
    private consultaQuery: ConsultaioQuery,
    private readonly http: HttpClient
  ) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })).subscribe();
  }

  /**
   * Angular lifecycle method that runs on component initialization.
   * Subscribes to the selected tab from state and updates `indice`.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    // this.consultaState && this.consultaState.procedureId === '260210' &&
    if (
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
    this.Tramite260210Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  /**
 * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
 * Luego reinicializa el formulario con los valores actualizados desde el store.
 */
  guardarDatosFormulario(): void {
    this.getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)).subscribe((resp) => {
          if (resp) {
            this.esDatosRespuesta = true;
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
actualizarEstadoFormulario(DATOS: Tramite260210State): void {
  this.tramite260214Store.update((state) => ({
    ...state,
    ...DATOS
  }))

}

/**
* Obtiene los datos del registro de toma de muestras de mercancías desde un archivo JSON.
* 
* @returns Observable con los datos del estado de la solicitud `Solicitud230401State`,
*          cargados desde el archivo JSON especificado en la ruta de `assets`.
*/
getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260210State> {
  return this.http.get<Tramite260210State>('assets/json/260210/respuestaDeActualizacionDe.json');
}

  /**
   * Updates the selected tab index in the store.
   *
   * @param i Index of the selected tab.
   * @returns {void}
   */
  public seleccionaTab(i: number): void {
    this.tramite260214Store.updateTabSeleccionado(i);
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
