/**
 * @fileoverview Este archivo contiene la clase DetosDelTramiteComponent, la cual gestiona la lógica del componente Detos Del Trámite.
 * @module DetosDelTramiteComponent
 */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CatalogosSelect, TiposDocumentosResponse } from '../../../../core/models/shared/components.model';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import { ProductoOption, ProductoResponse } from '../../../../core/services/130102/octava-temporral.enum';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';

/**
 * descripción 
 * @class DetosDelTramiteComponent
 * @classdesc Componente encargado de manejar la selección de solicitudes y tipos de documentos en un trámite.
 */
@Component({
  selector: 'app-detos-del-tramite',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    SelectCatalogosComponent,
  ],
  templateUrl: './detos-del-tramite.component.html',
  styleUrl: './detos-del-tramite.component.scss',
})
export class DetosDelTramiteComponent implements OnInit {
  /**
   * descripción 
   * @property {FormGroup} form - Formulario reactivo del componente.
   */
  form!: FormGroup;

  /**
   * descripción 
   * @property {ProductoOption[]} solicitude - Lista de opciones de solicitud disponibles.
   */
  solicitude: ProductoOption[] = [];

  /**
   * descripción 
   * @property {CatalogosSelect[]} tiposDocumentosArray - Lista de tipos de documentos disponibles.
   */
  tiposDocumentosArray: CatalogosSelect[] = [];

  /**
   * descripción 
   * @property {string | number} selectedValue - Valor seleccionado actualmente.
   */
  selectedValue: string | number = 'Inicial';

  /**
   * descripción 
   * @property {string} defaultSelect - Valor seleccionado por defecto.
   */
  defaultSelect: string = 'Inicial';

  /**
   * descripción 
   * @constructor
   * @param {HttpClient} http - Servicio para realizar peticiones HTTP.
   * @param {FormBuilder} fb - Utilidad para la construcción de formularios reactivos.
   */
  constructor(private http: HttpClient, private fb: FormBuilder) {}

  /**
   * descripción 
   * @method ngOnInit
   * @description Método de inicialización del componente, configura el formulario y obtiene datos iniciales.
   */
  ngOnInit() {
    this.form = this.fb.group({
      solicitud: [''],
      tipoDocumento: ['']
    });
    this.fetchSolicitudeOptions();
    this.fetchTiposDocumentos();
  }

  /**
   * descripción 
   * @method onValueChange
   * @description Maneja el cambio en el valor seleccionado.
   * @param {string | number} value - Nuevo valor seleccionado.
   */
  onValueChange(value: string | number) {
    this.selectedValue = value;
  }

  /**
   * descripción 
   * @method tipoTransporte
   * @description Método de marcador de posición para manejar el tipo de transporte.
   * @param {Catalogo} e - Evento del catálogo seleccionado.
   */
  tipoTransporte(_e: Catalogo) {
    // Manejo del evento
  }

  /**
   * descripción 
   * @method fetchTiposDocumentos
   * @description Obtiene la lista de tipos de documentos desde un archivo JSON.
   */
  fetchTiposDocumentos() {
    this.http
      .get<TiposDocumentosResponse>('/assets/json/130102/solicitude-select.json')
      .subscribe((data) => {
        this.tiposDocumentosArray = data.tiposDocumentosArray;
      });
  }

  /**
   * descripción 
   * @method fetchSolicitudeOptions
   * @description Obtiene la lista de opciones de solicitud desde un archivo JSON.
   */
  fetchSolicitudeOptions() {
    this.http
      .get<ProductoResponse>('/assets/json/130102/solicitude-options.json')
      .subscribe((data) => {
        this.solicitude = data.options;
        this.defaultSelect = data.defaultSelect;
      });
  }
}
