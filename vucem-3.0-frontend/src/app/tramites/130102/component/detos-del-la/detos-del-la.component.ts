/**
 * @fileoverview Este archivo contiene la clase DetosDelLaComponent, que es responsable de manejar la lógica del componente Detos Del La.
 * 
 * @module DetosDelLaComponent
 */

import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { HttpClient } from '@angular/common/http';
import { SelectCatalogosComponent } from "../../../../shared/components/select-catalogos/select-catalogos.component";
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
/**
 * @class DetosDelLaComponent
 * @classdesc Esta clase representa el componente Detos Del La.
 */
@Component({
  selector: 'app-detos-del-la',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    SelectCatalogosComponent
  ],
  templateUrl: './detos-del-la.component.html',
  styleUrl: './detos-del-la.component.scss'
})
export class DetosDelLaComponent implements OnInit {
    /**
   * @property {any[]} producto - Array para almacenar las opciones de productos.
   */
  producto: any[] = [];
  
  /**
   * @property {string | number} selectedValue - El valor seleccionado.
   */
  selectedValue: string | number = 'Nuevo'; // Update the type to string | number
  /**
   * @property {string} defaultSelect - El valor seleccionado por defecto.
   */
  defaultSelect: string = 'Nuevo';
   /**
   * @property {CatalogosSelect} Unidad - El catálogo de unidades.
   */
  Unidad!: CatalogosSelect;
  /**
   * @property {CatalogosSelect} fraccionF - El catálogo de fracciones.
   */
  fraccionF!: CatalogosSelect;
  /**
   * @constructor
   * @param {HttpClient} http - El cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {

  }
  /**
   * @method ngOnInit
   * @description Inicializa el componente obteniendo los datos necesarios.
   */
  ngOnInit() {
    this.fetchUnidadDe();
    this.fetchProductoOptions();
    this.fetchFraccionarOptions();
  }
   /**
   * @method onValueChange
   * @description Maneja el cambio del valor seleccionado.
   * @param {any} newValue - El nuevo valor.
   */
  onValueChange(newValue: any) {
    this.selectedValue = newValue;
  }
  
  /**
   * @method fetchProductoOptions
   * @description Obtiene las opciones de productos del servidor.
   */
  fetchProductoOptions() {
    this.http.get('/assets/json/130102/producto-otions.json').subscribe((data: any) => {
      this.producto = data.options;
      this.defaultSelect = data.defaultSelect;
    });
  }
   /**
   * @method fetchfraccionarancelaria
   * @description Método de marcador de posición para obtener datos de fracción.
   * @param {any} e - El parámetro del evento.
   */
  fetchfraccionarancelaria(e: any) {

  }

  /**
   * @method fetchFraccionarOptions
   * @description Obtiene las opciones de fracción del servidor.
   */
  fetchFraccionarOptions() {
    this.http.get('/assets/json/130102/fraccion_arancelaria.json').subscribe((data: any) => {
      this.fraccionF = data;
    });
  }
   /**
   * @method fetchUnidadDe
   * @description Obtiene los datos de unidad del servidor.
   */
  fetchUnidadDe() {
    this.http.get('/assets/json/130102/unidad_da.json').subscribe((data: any) => {
      console.log(data);
      this.Unidad = data;
    });
  }
  /**
   * @method fetchFraccion
   * @description Método de marcador de posición para obtener datos de fracción.
   * @param {any} e - El parámetro del evento.
   */
  fetchFraccion(e: any) {

  }
   /**
   * @method fetchUnidad
   * @description Método de marcador de posición para obtener datos de unidad.
   * @param {any} e - El parámetro del evento.
   */
  fetchUnidad(e: any) {

  }
}
