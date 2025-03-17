/**
 * compo doc
 * @fileoverview Componente encargado de gestionar la selección de solicitudes y tipos de documentos en un trámite.
 * @module DetosDelTramiteComponent
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

import {
  ProductoOption,
  ProductoResponse,
} from '../../enum/vehiculos-adaptados.enum';

import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from '@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

import solicitudeSelectVal from '@libs/shared/theme/assets/json/130109/solicitud-select.json';

/**
 * Componente para la gestión de solicitudes y tipos de documentos en un trámite.
 */
@Component({
  selector: 'app-detos-del-tramite',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './detos-del-tramite.component.html',
})
export class DetosDelTramiteComponent implements OnInit {
  /**
   * Lista de campos de entrada utilizados en el formulario.
   */
  inputFields = [
    {
      label: 'Régimen al que se destinará la mercancía',
      placeholder: 'Seleccione un documento',
      required: true,
    },
    {
      label: 'Clasificación del régimen',
      placeholder: 'Seleccione un documento',
      required: true,
    },
  ];

  /**
   * Lista de catálogos disponibles para la selección.
   */
  catalogosArray: Catalogo[][] = solicitudeSelectVal;

  /**
   * Formulario reactivo del componente.
   */
  formDelTramite!: FormGroup;

  /**
   * Opciones disponibles para la solicitud.
   */
  solicitude: ProductoOption[] = [];

  /**
   * Lista de tipos de documentos disponibles.
   */
  tiposDocumentosArray: Catalogo[] = [];

  /**
   * Valor seleccionado actualmente.
   */
  selectedValue: string | number = 'Inicial';

  /**
   * Valor predeterminado en la selección.
   */
  defaultSelect: string = 'Inicial';

  /**
   * Constructor del componente.
   * @param {HttpClient} http - Servicio para realizar peticiones HTTP.
   * @param {FormBuilder} fb - Utilidad para la construcción de formularios reactivos.
   */
  constructor(private http: HttpClient, private fb: FormBuilder) {
    //constructor
  }

  /**
   * Inicializa el componente, configura el formulario y obtiene datos iniciales.
   */
  ngOnInit(): void {
    this.formDelTramite = this.fb.group({
      solicitud: [''],
      tipoDocumento: [''],
      fraccion: ['', [Validators.required]],
    });
    this.fetchSolicitudeOptions();
  }

  /**
   * Maneja los cambios en la opción seleccionada.
   *
   * Este método se activa cuando el usuario cambia el valor en el campo correspondiente.
   *
   * @param {string | number} value - El nuevo valor seleccionado.
   *
   * Este método es para el control de radio de solicitud.
   */
  onValueChange(value: string | number): void {
    this.selectedValue = value;
  }

  /**
   * Método de marcador de posición para gestionar el tipo de transporte.
   */
  tipoTransporte(): void {
    this.selectedValue = 'Nuevo';
  }

  /**
   * Obtiene la lista de opciones de solicitud desde un archivo JSON.
   */

  fetchSolicitudeOptions(): void {
    this.http
      .get<ProductoResponse>('/assets/json/130111/solicitude-options.json')
      .subscribe((data) => {
        this.solicitude = data.options;
        this.defaultSelect = data.defaultSelect;
      });
  }
}
