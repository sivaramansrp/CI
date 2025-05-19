import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Tabulaciones } from "../../../core/models/lista-trimites.model";
import tramiteDetailsData from '@libs/shared/theme/assets/json/shared/lista-trimites-tabs.json';

/**
 * @component
 * @name ReviewersTabsComponent
 * @description Componente para la visualización y navegación entre pestañas de revisión en el flujo de trámites.
 * 
 * Permite mostrar diferentes secciones o vistas mediante pestañas, facilitando la organización y acceso a la información relevante para los revisores.
 * 
 * @selector app-reviewers-tabs
 * @standalone true
 * @imports
 *  - CommonModule
 * @templateUrl ./reviewers-tabs.component.html
 * @styleUrl ./reviewers-tabs.component.scss
 */@Component({
  selector: 'app-reviewers-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviewers-tabs.component.html',
  styleUrl: './reviewers-tabs.component.scss',
})
export class ReviewersTabsComponent implements OnChanges, OnInit {
  /**
   * @property {number} indice
   * @description Índice de la pestaña actualmente seleccionada.
   */
  indice: number = 0;
  /**
   * @property {Tabulaciones[]} listaDeTabulaciones
   * @description Lista de objetos que representan las pestañas disponibles para navegación.
   */
  listaDeTabulaciones: Tabulaciones[] = tramiteDetailsData;
  /**
   * @property {number} tramite
   * @description Identificador del trámite asociado a las pestañas.
   */
  @Input() tramite!: number;
  /**
   * @property {Type<unknown>} viewChild
   * @description Referencia al componente hijo que se debe mostrar en la pestaña activa.
   */
  @Input() viewChild!: Type<unknown>;
  /**
   * @property {EventEmitter<Tabulaciones>} viewChildcambioDePestana
   * @description Evento emitido cuando se cambia de pestaña, enviando el objeto de tabulación seleccionado.
   */
  @Output() viewChildcambioDePestana = new EventEmitter<Tabulaciones>();
  /**
   * @property {ViewContainerRef} childContainer
   * @description Referencia al contenedor donde se insertan dinámicamente los componentes hijos.
   */
  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer!: ViewContainerRef;
  /**
   * @method ngOnInit
   * @description Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Filtra la lista de tabulaciones según el trámite recibido por input y selecciona la primera pestaña por defecto.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    if (this.listaDeTabulaciones) {
      this.seleccionaTab(0, this.listaDeTabulaciones[0]);
    }
  }
  /**
   * @method ngOnChanges
   * @description Método del ciclo de vida que se ejecuta cuando cambian las propiedades de entrada del componente.
   * 
   * Si cambia la propiedad `viewChild` y existe un nuevo valor, actualiza las pestañas llamando al método `updateTabs`.
   * 
   * @param {SimpleChanges} changes - Objeto que contiene los cambios de las propiedades de entrada.
   * @returns {void}
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['viewChild'] && this.viewChild) {
      this.updateTabs();
    }
  }
  /**
   * @method seleccionaTab
   * @description Cambia la pestaña seleccionada según el índice y la tabulación recibida. Si la pestaña está deshabilitada, no realiza ninguna acción.
   * Actualiza el índice de la pestaña activa, emite el evento de cambio de pestaña y actualiza las pestañas después de un breve retraso.
   * 
   * @param {number} i - Índice de la pestaña seleccionada.
   * @param {Tabulaciones} j - Objeto de tabulación correspondiente a la pestaña seleccionada.
   * @returns {void}
   */
  seleccionaTab(i: number, j: Tabulaciones): void {
    if (j?.disabled) { return }
    this.indice = i;
    this.viewChildcambioDePestana.emit(j);
    setTimeout(() => {
      this.updateTabs();
    }, 100);
  }
  /**
   * @method updateTabs
   * @description Actualiza el contenido del contenedor de vistas (`childContainer`) creando dinámicamente el componente hijo correspondiente a la pestaña seleccionada.
   * 
   * Si existen referencias válidas tanto para el contenedor como para el componente hijo, limpia el contenedor y crea el nuevo componente.
   * 
   * @returns {void}
   */
  updateTabs(): void {
    if (this.childContainer && this.viewChild) {
      this.childContainer.clear();
      this.childContainer.createComponent(this.viewChild);
    }
  }
}
