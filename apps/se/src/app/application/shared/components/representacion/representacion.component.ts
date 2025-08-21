/**
 * @component
 * @name RepresentacionComponent
 * @description RepresentacionComponent es un componente que maneja la selección de entidades federativas y representaciones federales.
 * @selector app-representacion
 * @standalone true
 * @imports TituloComponent, CatalogoSelectComponent, CommonModule, ReactiveFormsModule, AlertComponent
 * @templateUrl ./representacion.component.html
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { REPRESENTACION_FEDERAL_DECLARACIONES, TEXTOS } from '../../constantes/representacion-federal.enum';
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

@Component({
  selector: 'app-representacion',
  standalone: true,
  imports: [
    AlertComponent,
    CatalogoSelectComponent,
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
  ],
  templateUrl: './representacion.component.html',
})
export class RepresentacionComponent implements OnInit {
  /**
   * @description Indica si el formulario debe mostrarse en modo solo lectura.
   */
  @Input() esFormularioSoloLectura!: boolean;
  /**
   * Formulario reactivo para la representación.
   * @type {FormGroup}
   */
  @Input() frmRepresentacionForm!: FormGroup;

  /**
   * Lista de entidades federativas.
   * @type {Catalogo[]}
   */
  @Input() entidadFederativa: Catalogo[] = [];

  /**
   * Lista de representaciones federales.
   * @type {Catalogo[]}
   */
  @Input() representacionFederal: Catalogo[] = [];

  /**
   * Textos utilizados en el componente.
   * @type {any}
   */
  @Input() TEXTOS = TEXTOS;

  /**
   * Indica si el procedimiento es de representación federal.
   * @type {boolean}
   */
  esRepresentacionFederal: boolean = false;

  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   *
   * @decorador @Input
   */
  @Input() public idProcedimiento!: number;

  /**
   * Evento emitido para establecer valores en el store.
   * @type {EventEmitter<{ form: FormGroup; campo: string; metodoNombre: string }>}
   */
  @Output() setValoresStoreEvent = new EventEmitter<{
    form: FormGroup;
    campo: string;
  }>();

  /**
   * Constructor del componente.
   */
  constructor() {
    //
  }

  /**
   * Habilita o deshabilita el formulario según el modo de solo lectura.
   * Controla el estado del formulario al iniciar el componente.
   */
  ngOnInit(): void {
    this.esRepresentacionFederal =
      REPRESENTACION_FEDERAL_DECLARACIONES.includes(this.idProcedimiento);
    if (this.esFormularioSoloLectura) {
      this.frmRepresentacionForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.frmRepresentacionForm.enable();
    }
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
