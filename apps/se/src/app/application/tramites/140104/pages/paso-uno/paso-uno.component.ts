import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { map } from 'rxjs';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Componente `PasoUnoComponent` que representa el primer paso del flujo de solicitud.
 * Controla el índice de la sección activa del formulario multipaso y maneja
 * la visibilidad de secciones específicas como la búsqueda y devolución de facturas.
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @description Índice de la pestaña/paso actual.
   * Este valor indica el paso actual en el proceso de formulario.
   * @type {number}
   * @default 1
   */
  indice: number = 1;

  /**
   * @description 
   * Array de objetos que representan las diferentes secciones del formulario.
   * Cada objeto contiene el índice, título y el nombre del componente correspondiente.
   * Este arreglo es utilizado para navegar entre los diferentes pasos del formulario.
   * 
   * @type {Array<{ index: number, title: string, component: string }>}
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Cancelación de Certificados de Cupo', component: 'cancelacion-de-solicitus' },
  ];

  /**
   * @description Flag que indica si debe mostrarse la sección de búsqueda.
   * Este valor es controlado a través de un observable emitido por el servicio de mensajes.
   * @type {boolean}
   * @default false
   */
  public mostrarBusqueda: boolean = false;

  /**
   * @description Flag que indica si debe mostrarse la sección de devolución de facturas.
   * @type {boolean}
   * @default false
   */
  public mostrarDevolverFacturas: boolean = false;

     /**
   * Esta variable se utiliza para almacenar el índice del subtítulo.
   */
  public consultaState!: ConsultaioState;

  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;


  /** Subject para notificar la destrucción del componente. */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * Inicializa el estado de validación de la forma y las secciones activas
   * a través del store `SeccionLibStore`, y obtiene el servicio de mensajes.
   * 
   * @param seccionStore Servicio que administra el estado de las secciones del formulario.
   * @param servicioDeMensajesService Servicio que permite la comunicación entre componentes mediante observables.
   */
  constructor(
    private readonly seccionStore: SeccionLibStore,
    private servicioDeMensajesService: ServicioDeMensajesService,
    private consultaQuery: ConsultaioQuery
  ) {
    // Establece el estado de la forma como no válida al inicio.
    this.seccionStore.establecerFormaValida([false]);
    // Establece la primera sección como activa.
    this.seccionStore.establecerSeccion([false]);

    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
    .subscribe();
    if (this.consultaState.update) {
      this.servicioDeMensajesService.establecerDatosDePermiso(true);
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
  }

  }


   /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {

    this.servicioDeMensajesService.getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.servicioDeMensajesService.actualizarEstadoFormulario(resp);

        }
      });
  }

  /**
   * @description Método que se ejecuta después de inicializar el componente.
   * Se suscribe a los observables `mensaje$` y `devolverFacturasMensaje$` para
   * controlar la visibilidad de las secciones correspondientes.
   */
  ngOnInit(): void {
    this.servicioDeMensajesService.mensaje$
      .pipe(takeUntil(this.destroyNotifier$)) // Automatically unsubscribe on destroy
      .subscribe((mensaje) => {
        this.mostrarBusqueda = mensaje;
      });

    this.servicioDeMensajesService.devolverFacturasMensaje$
      .pipe(takeUntil(this.destroyNotifier$)) // Automatically unsubscribe on destroy
      .subscribe((mensaje) => {
        this.mostrarDevolverFacturas = mensaje;
      });
  }

  /**
   * @description Método que se ejecuta al destruir el componente.
   * Envía valores `false` a los observables del servicio para limpiar el estado
   * y evitar efectos secundarios al desmontar el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); // Emit a value to signal completion
    this.destroyNotifier$.complete(); // Complete the Subject to clean up resources
    this.servicioDeMensajesService.enviarMensaje(false);
    this.servicioDeMensajesService.enviarDevolverFacturasMensaje(false);
  }

  /**
   * @description Método que permite seleccionar una pestaña/paso específico.
   * Actualiza el índice del paso actual para navegar entre secciones del formulario.
   * 
   * @param i Índice del paso seleccionado.
   */
  seleccionaPestana(i: number): void {
    this.indice = i;
  }
}
