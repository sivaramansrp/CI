/**
 * descripción
 * @fileoverview Este archivo contiene la clase DetosDelLaComponent, encargada de manejar la lógica del componente Detos Del La.
 *
 * @module DetosDelLaComponent
 */
import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import fractionValues from '../../../../../assets/json/130102/fraccion_arancelaria.json';
import productoOptions from '../../../../../assets/json/130102/producto-otions.json';
import unidadOptions from '../../../../../assets/json/130102/unidad_da.json';

/**
 * descripción
 * @class DetosDelLaComponent
 * @description Componente responsable de manejar la lógica del Detos Del La.
 */
@Component({
  selector: 'app-detos-del-la',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './detos-del-la.component.html',
  styleUrl: './detos-del-la.component.scss',
})
export class DetosDelLaComponent implements OnInit {
  /** 
   * descripción
   * @property {any} prodData
   * @description Opciones de productos importadas desde un archivo JSON.
   */
  public prodData = productoOptions;

  /**
   * descripción
   * @property {FormGroup} formDelLa
   * @description Estructura y validaciones del formulario reactivo.
   */
  formDelLa!: FormGroup;

  /**
   * descripción
   * @property {Array<{ label: string; value: string }>} producto
   * @description Lista de opciones de productos disponibles.
   */
  producto: { label: string; value: string }[] = [];

  /**
   * descripción
   * @property {string} selectedValue
   * @description Opción preseleccionada en el selector de productos.
   */
  selectedValue: string = 'Nuevo';

  /**
   * descripción
   * @property {string} defaultSelect
   * @description Opción preseleccionada en el selector de productos.
   */
  defaultSelect: string = 'Nuevo';

  /**
   * descripción
   * @property {Catalogo[]} Unidad
   * @description Catálogo de unidades de medida.
   */
  Unidad: Catalogo[] = unidadOptions;

  /**
   * descripción
   * @property {Catalogo[]} fraccionF
   * @description Catálogo de fracciones arancelarias.
   */
  fraccionF: Catalogo[] = fractionValues;

  /**
   * descripción
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para solicitudes.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   */
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  /**
   * descripción
   * @method ngOnInit
   * @description Inicializa el componente y configura el formulario reactivo.
   */
  ngOnInit() {
    this.formDelLa = this.fb.group({
      descripcion: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
      ],
      fraccion: ['', [Validators.required]],
      unidadMedida: ['', [Validators.required]],
      cantidad: [
        '',
        [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')],
      ],
      valorFacturaUSD: [
        '',
        [Validators.required, Validators.min(0.01), Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')],
      ],
    });
    this.fetchProductoOptions();
  }

  /**
   * descripción
   * @method onValueChange
   * @description Maneja los cambios en el valor seleccionado.
   * @param {string | number} value - Nuevo valor seleccionado.
   */
  onValueChange(value: string | number) {
    this.selectedValue = value.toString();
  }

  /**
   * descripción
   * @method fetchProductoOptions
   * @description Obtiene las opciones de productos desde el archivo JSON.
   */
  fetchProductoOptions() {
    this.producto = productoOptions.options;
    this.defaultSelect = productoOptions.defaultSelect;
  }

  /**
   * descripción
   * @method fetchFraccion
   * @description Método para obtener datos de fracción arancelaria.
   */
  fetchFraccion(): void {
    this.selectedValue = 'Nuevo';
  }

  /**
   * descripción
   * @method fetchUnidad
   * @description Método para obtener datos de unidad de medida.
   */
  fetchUnidad(): void {
    this.selectedValue = 'Nuevo';
  }
}
