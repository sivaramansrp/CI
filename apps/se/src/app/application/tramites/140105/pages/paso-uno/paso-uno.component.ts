
import { Component, OnDestroy, OnInit } from '@angular/core';
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
   * Constructor del componente.
   * Este constructor inicializa el componente y establece el estado inicial de la validación
   * y de las secciones del formulario utilizando el servicio `SeccionLibStore`.
   * @constructor
   * @param {SeccionLibStore} seccionStore - Servicio para gestionar el estado de las secciones del formulario.
   */
  constructor(private readonly seccionStore: SeccionLibStore, private servicioDeMensajesService: ServicioDeMensajesService) {
    // Establece el estado de la forma como no válida al inicio.
    this.seccionStore.establecerFormaValida([false]);
    // Establece la primera sección como activa.
    this.seccionStore.establecerSeccion([false]);
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
  ngOnInit() {
    this.servicioDeMensajesService.mensaje$.subscribe((mensaje) => {
      this.mostrarBusqueda = mensaje;
    });
  }

  /**
 * Método que se ejecuta al destruir el componente.
 * Envía un mensaje con el valor 'false' al servicio de mensajes para indicar 
 * que se ha cancelado o finalizado la acción relacionada.
 */
  ngOnDestroy(){
  this.servicioDeMensajesService.enviarMensaje(false);
  }
  
}