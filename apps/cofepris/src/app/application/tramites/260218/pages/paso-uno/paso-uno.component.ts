import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Tramite260218State, Tramite260218Store } from '../../estados/tramite260218Store.store';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosContenedoraComponent } from '../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260218Query } from '../../estados/tramite260218Query.query';

import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosContenedoraComponent
  ],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy, OnInit, OnChanges {
  // Variable que mantiene el índice de la pestaña seleccionada.
  indice: number | undefined = 1;

  /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

    /**
   * Subject utilizado para manejar la desuscripción de observables
   * cuando el componente es destruido.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
     * @property {ContenedorDeDatosSolicitudComponent} contenedorDeDatosSolicitudComponent
     * @description
     * Referencia al componente hijo `ContenedorDeDatosSolicitudComponent` obtenida
     * mediante el decorador `@ViewChild`.
     *
     * Esta propiedad permite invocar métodos públicos del contenedor y acceder
     * a sus propiedades, por ejemplo para delegar la validación del formulario
     * interno (`validarContenedor()`).
     *
     * > Nota: Angular inicializa esta referencia después de que la vista
     * ha sido cargada, comúnmente en el ciclo de vida `ngAfterViewInit`.
     */
    @ViewChild(ContenedorDeDatosSolicitudComponent)
    contenedorDeDatosSolicitudComponent!: ContenedorDeDatosSolicitudComponent;

    @ViewChild(PagoDeDerechosContenedoraComponent)
    pagoDeDerechosContenedoraComponent!: PagoDeDerechosContenedoraComponent;

    @ViewChild(TercerosRelacionadosVistaComponent)
    tercerosRelacionadosVistaComponent!: TercerosRelacionadosVistaComponent;

    @Input() confirmarSinPagoDeDerechos: number = 0;

  /**
   * Constructor que inyecta las dependencias necesarias para el manejo del estado del trámite.
   * @constructor
   * @param {Tramite260218Query} tramite260218Query - Query para acceder al estado del trámite
   * @param {Tramite260218Store} tramite260218Store - Store para actualizar el estado del trámite
   * @param {ConsultaioQuery} consultaQuery - Query para acceder al estado de la consulta
   * @param {HttpClient} http - Cliente HTTP para realizar peticiones
   */
  constructor(
    private tramite260218Query: Tramite260218Query,
    private tramite260218Store: Tramite260218Store,
    private consultaQuery: ConsultaioQuery,
    private readonly http: HttpClient
  ) { 
    this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$),
      map((seccionState) => {
        this.consultaState = seccionState;
      })).subscribe();
  }


ngOnChanges(changes: SimpleChanges): void {
    if (changes['confirmarSinPagoDeDerechos'] && !changes['confirmarSinPagoDeDerechos'].firstChange) {
      const CONFIRMAR_VALOR = changes['confirmarSinPagoDeDerechos'].currentValue;
      if (CONFIRMAR_VALOR) {
        this.seleccionaTab(CONFIRMAR_VALOR);
      }
    }
  }

  /**
   * Método del ciclo de vida OnInit de Angular.
   * Se suscribe a los cambios en la pestaña seleccionada del trámite.
   * @method ngOnInit
   */
  ngOnInit(): void {
    if (this.consultaState && this.consultaState.procedureId === '260218' &&
      this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }

    this.tramite260218Query.getTabSeleccionado$
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
  actualizarEstadoFormulario(DATOS: Tramite260218State): void {
    this.tramite260218Store.update((state) => ({
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
  getRegistroTomaMuestrasMercanciasData(): Observable<Tramite260218State> {
    return this.http.get<Tramite260218State>('assets/json/260218/datos.json');
  }

  /**
   * Método para seleccionar la pestaña activa según el índice proporcionado.
   * @param indice El índice de la pestaña que se desea seleccionar.
   */
  seleccionaTab(indice: number): void {
    // Asigna el valor del índice seleccionado a la propiedad 'indice'.
    this.indice = indice;
  }

   /**
   * @description
   * Método que se encarga de validar el primer paso del flujo.
   *
   * Invoca al método `validarContenedor()` del componente hijo
   * `ContenedorDeDatosSolicitudComponent` para comprobar si los
   * datos del formulario son correctos.
   *
   * En caso de que el componente hijo no esté disponible o
   * retorne `null/undefined`, se devuelve `false` por defecto.
   *
   * @returns {boolean}
   * - `true`: si el contenedor y su formulario interno son válidos.
   * - `false`: si el contenedor no es válido o no está disponible.
   */
   validarPasoUno(): boolean {
    const ESTABVALIDO = this.contenedorDeDatosSolicitudComponent?.validarContenedor() ?? false;
    const ESTERCEROSVALIDO = this.tercerosRelacionadosVistaComponent.validarContenedor() ?? false;
    return (
      (ESTABVALIDO && ESTERCEROSVALIDO) ? true : false

    );
  }

  /**
   * Método del ciclo de vida OnDestroy de Angular.
   * Limpia las suscripciones activas emitiendo un valor al destroyNotifier$
   * y completando el subject.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
