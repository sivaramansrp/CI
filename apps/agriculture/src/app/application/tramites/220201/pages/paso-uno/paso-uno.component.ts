import { Component, EventEmitter, Output } from '@angular/core';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';

/**
 * Componente para el asistente de solicitud.
 * Este componente gestiona la navegación entre los pasos del formulario de solicitud.
 * @component PasoUnoComponent
 * @selector app-paso-uno
 * @templateUrl ./paso-uno.component.html
 * @styleUrls ./paso-uno.component.scss
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']
})
export class PasoUnoComponent {

  /**
   * Índice de la pestaña seleccionada.
   * @property {number} indice - Índice de la pestaña actualmente seleccionada.
   * @default 1
   */
  indice: number = 1;

  /**
   * Lista de secciones del formulario.
   * @property {Array<{ index: number; title: string; component: string; }>} seccionesDeLaSolicitud
   * - Lista de pasos dentro del formulario con sus respectivos componentes.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Datos de la solicitud', component: 'datos-de-la-solicitud' },
    { index: 3, title: 'Datos para movilización nacional', component: 'datos-para-movilizacion-nacional' },
    { index: 4, title: 'Terceros relacionados', component: 'terceror-relacionados' },
    { index: 5, title: 'Pago de derechos', component: 'pago-de-derechos' }
  ];
  constructor(private readonly seccionStore: SeccionLibStore) {
    this.seccionStore.establecerFormaValida([false]);
    this.seccionStore.establecerSeccion([true])
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
  seleccionaTab(i: number): void {
    this.indice = i;
    this.tabChanged.emit(i);
  }
}