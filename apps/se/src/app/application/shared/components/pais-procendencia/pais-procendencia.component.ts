/**
 * compo doc
 * @fileoverview Componente encargado de gestionar la selección de países de procedencia en un trámite.
 * @module PaisProcendenciaComponent
 */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  PROCEDIMIENTOS_AYUDA_DECLARACIONES,
  PROCEDIMIENTOS_NUMERO_ES_DE_PERMISO_DECLARACIONES,
} from '../../constantes/pais-procendencia.enum';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

/**
 * Componente para la gestión de la selección de países de procedencia.
 */
@Component({
  selector: 'app-pais-procendencia',
  standalone: true,
  imports: [
    TituloComponent,
    CrosslistComponent,
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
  ],
  templateUrl: './pais-procendencia.component.html',
  styleUrl: './pais-procendencia.component.scss',
})
export class PaisProcendenciaComponent implements OnInit, OnChanges {
  /**
   * Indica si el permiso es de tipo N.
   * @type {boolean}
   */
  esNumeroDePermiso: boolean = false;

  /**
   * Indica si el procedimiento requiere ayuda.
   * @type {boolean}
   */
  esAyuda: boolean = false;

  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   *
   * @decorador @Input
   */
  @Input() public idProcedimiento!: number;
  /**
   * @description Indica si el formulario debe mostrarse en modo solo lectura.
   */
  @Input() esFormularioSoloLectura!: boolean;
  /**
   * Referencia al componente CrosslistComponent.
   * @type {CrosslistComponent}
   */
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;

  /**
   * Formulario reactivo para la selección de países.
   * @type {FormGroup}
   */
  @Input() paisForm!: FormGroup;

  /**
   * Lista de países de procedencia.
   * @type {Catalogo[]}
   */
  @Input() elementosDeBloque: Catalogo[] = [];

  /**
   * Lista de países agrupados por bloques.
   * @type {Catalogo[]}
   */
  @Input() paisesPorBloque: Catalogo[] = [];

  /**
   * Rango de días seleccionables.
   * @type {string[]}
   */
  @Input() selectRangoDias: string[] = [];

  /**
   * Evento emitido cuando se cambia el bloque seleccionado.
   * @type {EventEmitter<number>}
   */
  @Output() bloqueCambiar = new EventEmitter<number>();

  /**
   * Evento emitido para establecer valores en el store.
   * @type {EventEmitter<{ form: FormGroup; campo: string; metodoNombre: string }>}
   */
  @Output() setValoresStoreEvent = new EventEmitter<{
    form: FormGroup;
    campo: string;
  }>();
  /**
   * Configuración de los botones para la gestión de la selección de países.
   *
   */
  campoDeBotones = [
    {
      /**
       * Nombre del botón para agregar todos los elementos.
       * @type {string}
       */
      btnNombre: 'Agregar todos',
      /**
       * Clase CSS del botón.
       * @type {string}
       */
      class: 'btn-primary',
      /**
       * Función para agregar todos los elementos.
       *
       */
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('t');
        }
      },
    },
    {
      /**
       * Nombre del botón para agregar la selección actual.
       * @type {string}
       */
      btnNombre: 'Agregar selección',
      /**
       * Clase CSS del botón.
       * @type {string}
       */
      class: 'btn-default',
      /**
       * Función para agregar la selección actual.
       *
       */
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('');
        }
      },
    },
    {
      /**
       * Nombre del botón para restar la selección actual.
       * @type {string}
       */
      btnNombre: 'Restar selección',
      /**
       * Clase CSS del botón.
       * @type {string}
       */
      class: 'btn-danger',
      /**
       * Función para restar la selección actual.
       *
       */

      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('');
        }
      },
    },
    {
      /**
       * Nombre del botón para restar todos los elementos.
       * @type {string}
       */
      btnNombre: 'Restar todos',
      /**
       * Clase CSS del botón.
       * @type {string}
       */
      class: 'btn-default',
      /**
       * Función para restar todos los elementos.
       *
       */
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('t');
        }
      },
    },
  ];
  /**
   * Constructor del componente.
   */
  constructor() {
    // Constructor del componente
  }

  ngOnInit(): void {
    this.esNumeroDePermiso =
      PROCEDIMIENTOS_NUMERO_ES_DE_PERMISO_DECLARACIONES.includes(
        this.idProcedimiento
      );
    this.esAyuda = PROCEDIMIENTOS_AYUDA_DECLARACIONES.includes(
      this.idProcedimiento
    );
  }
  /**
   * Método que se ejecuta cuando hay cambios en las propiedades de entrada del componente.
   * @param {SimpleChanges} changes - Objeto que contiene los cambios en las propiedades de entrada.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      /**
       * Actualiza la propiedad selectRangoDias con las descripciones de los países agrupados por bloques.
       */
      this.selectRangoDias = this.paisesPorBloque.map(
        (pais: Catalogo) => pais.descripcion
      );
    }

    if (changes['esFormularioSoloLectura']) {
      if (this.esFormularioSoloLectura) {
        this.paisForm.disable();
      }else if (!this.esFormularioSoloLectura) {
        this.paisForm.enable();
      }
    }
  }

  /**
   * Maneja el cambio de bloque seleccionado.
   * @param {Event} event - El evento de cambio.
   */
  enCambioDeBloque(event: Event): void {
    const SELECTED_BLOQUE = Number((event.target as HTMLInputElement).value);
    this.bloqueCambiar.emit(SELECTED_BLOQUE);
  }
  /**
   * Establece valores en el store.
   * @param {FormGroup} form - El formulario reactivo.
   * @param {string} campo - El campo a actualizar.
   * @param {string} metodoNombre - El nombre del método.
   */
  setValoresStore(form: FormGroup, campo: string): void {
    this.setValoresStoreEvent.emit({ form, campo });
  }
}
