import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Tramite260214State, Tramite260214Store } from '../../estados/tramite260214Store.store';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { HttpClient } from '@angular/common/http';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260214Query } from '../../estados/tramite260214Query.query';

/**
 * @component PasoUnoComponent
 * @description Componente que representa el primer paso del flujo del trámite.
 * Gestiona la selección de pestañas y la interacción con el estado del trámite a través del store y las consultas.
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
export class PasoUnoComponent implements OnDestroy, OnInit {
  /**
   * @property {number | undefined} indice
   * @description Índice de la pestaña seleccionada actualmente.
   */
  indice: number | undefined = 1;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Observable utilizado para notificar y cancelar suscripciones activas al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;
  
  /**
   * Subject utilizado para notificar la destrucción del componente y evitar fugas de memoria.
   * @type {Subject<void>}
   */
  public formularioDeshabilitado: boolean = false;

  /**
   * Initializes the PasoUnoComponent.
   *
   * @param tramite260214Query - Service for querying tramite260214 state.
   * @param tramite260214Store - Store for managing tramite260214 state.
   * @param consultaQuery - Service for querying consultaio state.
   * @param http - Angular HttpClient for making HTTP requests.
   *
   * Subscribes to the `selectConsultaioState$` observable to update the local `consultaState`
   * and `formularioDeshabilitado` properties based on the latest state. The subscription is
   * automatically unsubscribed when `destroyNotifier$` emits to prevent memory leaks.
   */
  constructor(
    private tramite260214Query: Tramite260214Query,
    private tramite260214Store: Tramite260214Store,
    private consultaQuery: ConsultaioQuery,
    private readonly http: HttpClient
  ) {
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
        this.formularioDeshabilitado = seccionState.readonly;
      })).subscribe();
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Suscribe al estado de la pestaña seleccionada y actualiza el índice.
   */
  ngOnInit(): void {
    if (this.consultaState && this.consultaState.procedureId === '260214' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
    this.tramite260214Query.getTabSeleccionado$
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
 * @param DATOS - Estado de la solicitud `Tramite260214State` con la información 
 *                del tipo de solicitud a actualizar en el store.
 */
  actualizarEstadoFormulario(DATOS: Tramite260214State): void {
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
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260214State> {
    return this.http.get<Tramite260214State>('assets/json/260214/respuestaDeActualizacionDe.json');
  }

  /**
   * @method seleccionaTab
   * @description Actualiza el índice de la pestaña seleccionada en el store del trámite.
   *
   * @param {number} i - Índice de la pestaña seleccionada.
   */
  seleccionaTab(i: number): void {
    this.tramite260214Store.updateTabSeleccionado(i);
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
}
