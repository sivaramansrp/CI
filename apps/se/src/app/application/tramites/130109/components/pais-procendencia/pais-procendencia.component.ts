/**
 * compo doc
 * @fileoverview Componente encargado de gestionar la selección de países de procedencia en un trámite.
 * @module PaisProcendenciaComponent
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Pais } from '../../enum/vehiculos-adaptados.enum';

import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CrosslistComponent } from '@libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

import paisProcJson from '@libs/shared/theme/assets/json/130109/pais-procenia.json';

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
export class PaisProcendenciaComponent implements OnInit {
  /**
   * compo doc
   * @property {CrosslistComponent} crosslistComponent - Referencia al componente Crosslist.
   */
  @ViewChild(CrosslistComponent) crosslistComponent!: CrosslistComponent;

  /**
   * compo doc
   * @property {FormGroup} paisForm - Estructura del formulario reactivo.
   */
  paisForm!: FormGroup;

  /**
   * compo doc
   * @property {string[]} fechasSeleccionadas - Lista de fechas seleccionadas.
   */
  fechasSeleccionadas: string[] = [];

  /**
   * compo doc
   * @property {FormControl} fecha - Control de formulario para la fecha.
   */
  fecha: FormControl = new FormControl('');

  /**
   * compo doc
   * @property {FormControl} fechaSeleccionada - Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * compo doc
   * @property {string[]} fechasDatos - Datos de fechas.
   */
  fechasDatos: string[] = [];

  /**
   * compo doc
   * @property {string[]} selectRangoDias - Rango de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * compo doc
   * @property {Catalogo[]} paisProc - Catálogo de países de procedencia.
   */
  paisProc: Catalogo[] = paisProcJson;

  /**
   * compo doc
   * @property {Pais[]} paisesPorBloque - Lista de países por bloque.
   */
  paisesPorBloque:Pais[] = [];
  /**
   * compo doc
   * @property {Array<{ btnNombre: string; class: string; funcion: Function }>} botonField - Configuración de botones.
   */
  botonField = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void =>{
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('t');
        }
      }
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.agregar('');
        }
      }
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('');
        }
      }
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => {
        if (this.crosslistComponent) {
          this.crosslistComponent.quitar('t');
        }
      }
    },
  ];

  /**
   * compo doc
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para solicitudes.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   */
  constructor(private http: HttpClient, private fb: FormBuilder) {
     // Constructor del componente
  }

  /**
   * compo doc
   * @method ngOnInit
   * @description Inicializa el formulario y carga datos de países de procedencia.
   */
  ngOnInit() :void {
    this.paisForm = this.fb.group({
      bloque: [''],
      descripcioneSpecffico:['',Validators.required],
      descripcionJustificacion: ['', [Validators.required]],
      observaciones: [''],
    });
    this.fetchPaisProc();
  }

  /**
   * compo doc
   * @method fetchPaisProc
   * @description Carga las opciones de países de procedencia desde el JSON.
   */
  fetchPaisProc(): void {
    this.http
      .get<Catalogo[]>('/assets/json/130109/pais-procenia.json')
      .subscribe((data) => {
        this.paisProc = data;
      });
    const SELECTED_BLOQUE = (this.paisForm.get('bloque') as FormControl).value;
    if (SELECTED_BLOQUE) {
      this.fetchPaisesPorBloque(SELECTED_BLOQUE);
    }
  }

  /**
   * compo doc
   * @method fetchPaisesPorBloque
   * @description Obtiene información de países por bloque.
   * @param {number} bloqueId - ID del bloque seleccionado.
   */
  fetchPaisesPorBloque(_bloqueId: number): void {
    this.http
      .get<Pais[]>('/assets/json/130109/paises-por-bloque.json')
      .subscribe((data: Pais[]) => {
        this.paisesPorBloque = data;
        this.selectRangoDias = this.paisesPorBloque.map((pais: Pais) => pais.descripcion);
      });
  }
}