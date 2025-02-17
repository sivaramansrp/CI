/**
 *compo doc
 * @fileoverview Componente DetosDelLaComponent: maneja la lógica del formulario
 * para la gestión de productos, fracciones arancelarias y unidades de medida.
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import fractionValues from '../../../../../assets/json/130102/fraccion_arancelaria.json';
import productoOptions from '../../../../../assets/json/130102/producto-otions.json';
import unidadOptions from '../../../../../assets/json/130102/unidad_da.json';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { REG_X } from '../../../../shared/constantes/regex.constants';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';


/**
 *compo doc
 * @class DetosDelMarcanciaComponent
 * @description Componente para la gestión de datos relacionados con productos,
 * fracciones arancelarias y unidades de medida en un formulario reactivo.
 */
@Component({
  selector: 'app-datos-de-la-mercacia',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './datos-de-la-mercacia.component.html',
  styleUrl: './datos-de-la-mercacia.component.scss',
})
export class DetosDelLaMarcaciaComponent implements OnInit {
  /**
   * compo doc
   * @property {any} prodData - Datos de productos importados desde un archivo JSON.
   */
  public prodData = productoOptions;

  /**
   * compo doc
   * @property {FormGroup} formDelLa - Estructura del formulario reactivo.
   */
  formDelLa!: FormGroup;

  /**
   * compo doc
   * @property {Array<{ label: string; value: string }>} producto - Lista de productos disponibles.
   */
  producto: { label: string; value: string }[] = [];

  /**
   * compo doc
   * @property {string} selectedValue - Opción seleccionada por defecto.
   */
  selectedValue: string = 'Nuevo';

  /**
   * compo doc
   * @property {string} defaultSelect - Valor predeterminado para el selector de productos.
   */
  defaultSelect: string = 'Nuevo';

  /**
   * compo doc
   * @property {Catalogo[]} Unidad - Catálogo de unidades de medida.
   */
  Unidad: Catalogo[] = unidadOptions;

  /**
   * compo doc
   * @property {Catalogo[]} fraccionF - Catálogo de fracciones arancelarias.
   */
  fraccionF: Catalogo[] = fractionValues;

  /**
   * compo doc
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para solicitudes.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   */
  constructor(private http: HttpClient, private fb: FormBuilder) {
    //constructor
  }

  /**
   * compo doc
   * @method ngOnInit
   * @description Inicializa el formulario con validaciones y carga datos de productos.
   */
  ngOnInit() {
    this.formDelLa = this.fb.group({
      descripcion: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      fraccion: ['', [Validators.required]],
      unidadMedida: ['', [Validators.required]],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(REG_X.ONLY_NUMBERS), 
        ],
      ],
      valorFacturaUSD: [
        '',
        [
          Validators.required,
          Validators.min(0.01),
          Validators.pattern(REG_X.DECIMAL_TWO_PLACES),
        ],
      ],
    });
    this.fetchProductoOptions();
  }

  /**
   * compo doc
   * @method onValueChange
   * @description Actualiza el valor seleccionado.
   * @param {string | number} value - Nuevo valor seleccionado.
   *
   * Este método es para la etiqueta de radio de producto.
   */
  onValueChange(value: string | number) {
    this.selectedValue = value.toString();
  }

  /**
   * compo doc
   * @method fetchProductoOptions
   * @description Carga las opciones de productos desde el JSON.
   */
  fetchProductoOptions() {
    this.producto = productoOptions.options;
    this.defaultSelect = productoOptions.defaultSelect;
  }

  /**
   * compo doc
   * @method fetchFraccion
   * @description Obtiene información de fracción arancelaria.
   */
  fetchFraccion(): void {
    this.selectedValue = 'Nuevo';
  }

  /**
   * compo doc
   * @method fetchUnidad
   * @description Obtiene información de unidad de medida.
   */
  fetchUnidad(): void {
    this.selectedValue = 'Nuevo';
  }
}
