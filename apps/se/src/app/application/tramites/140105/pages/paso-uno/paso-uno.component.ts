
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { Subject, map, takeUntil } from 'rxjs';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit, OnDestroy{
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
    { index: 2, title: 'Cancelación de solicitud de permisos', component: 'cancelacion-de-solicitus' },
  ];
  /**
   * @description Flag indicating whether the search section should be displayed.
   * This value is controlled based on messages received from the service.
   * @type {boolean}
   * @default false
   */
  public mostrarBusqueda: boolean = false;

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
   * Este constructor inicializa el componente y establece el estado inicial de la validación
   * y de las secciones del formulario utilizando el servicio `SeccionLibStore`.
   * @constructor
   * @param {SeccionLibStore} seccionStore - Servicio para gestionar el estado de las secciones del formulario.
   */
  constructor(private readonly seccionStore: SeccionLibStore, private servicioDeMensajesService: ServicioDeMensajesService, private consultaQuery: ConsultaioQuery) {
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
   * @description 
   * Método que se ejecuta al seleccionar una pestaña/paso del formulario.
   * Actualiza el índice de la pestaña/paso actual, permitiendo la navegación
   * entre las diferentes secciones del formulario multipaso.
   * 
   * @method seleccionaPestana
   * @param {number} i - Índice de la pestaña/paso seleccionada.
   * @returns {void}
   */
  seleccionaPestana(i: number): void {
    this.indice = i;
  }

  /**
 * Método que se ejecuta al inicializar el componente.
 * Se suscribe a los cambios en el mensaje enviado desde el servicio de mensajes,
 * y actualiza la propiedad 'mostrarBusqueda' con el valor recibido.
 */
  ngOnInit(): void {
    this.servicioDeMensajesService.mensaje$.subscribe((mensaje) => {
      this.mostrarBusqueda = mensaje;
    });
  }

  /**
 * Método que se ejecuta al destruir el componente.
 * Envía un mensaje con el valor 'false' al servicio de mensajes para indicar 
 * que se ha cancelado o finalizado la acción relacionada.
 */
  ngOnDestroy(): void {
    // Notifica a los suscriptores que el componente se está destruyendo
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    
    // Envía un mensaje al servicio de mensajes indicando que la acción ha finalizado 
  this.servicioDeMensajesService.enviarMensaje(false);
  }
  
}