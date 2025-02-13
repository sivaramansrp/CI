/**
 * descripción
 * @fileoverview Este archivo contiene la clase PaisProcendenciaComponent, responsable de manejar la lógica del componente País Procedencia.
 *
 * @module PaisProcendenciaComponent
 */
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CrosslistComponent } from '../../../../shared/components/crosslist/crosslist.component';

import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import paisProcJson from '../../../../../assets/json/130102/pais-procenia.json';

import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';

/**
 * descripción
 * @class PaisProcendenciaComponent
 * @classdesc Componente encargado de gestionar la selección de países de procedencia.
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
  paisForm!: FormGroup;
  /**
   * descripción
   * @property {string[]} fechasSeleccionadas - Lista de fechas seleccionadas.
   */
  fechasSeleccionadas: string[] = [];

  /**
   * descripción
   * @property {FormControl} fecha - Control de formulario para la fecha.
   */
  fecha: FormControl = new FormControl('');

  /**
   * descripción
   * @property {FormControl} fechaSeleccionada - Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * descripción
   * @property {string[]} fechasDatos - Lista de datos de fechas disponibles.
   */
  fechasDatos: string[] = [];

  /**
   * descripción
   * @property {string[]} selectRangoDias - Lista de rangos de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * descripción
   * @property {CatalogosSelect} paisProc - Catálogo de países.
   */
  paisProc: Catalogo[] = paisProcJson;

  /**
   * descripción
   * @property {Array<Object>} botonField - Lista de botones de acción disponibles.
   */
  botonField = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar seleccion',
      class: 'btn-default',
      funcion: () => this.agregar('t'),
    },
    {
      btnNombre: 'Restar Seleccion',
      class: 'btn-danger',
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: () => this.quitar('t'),
    },
  ];

  /**
   * descripción
   * @constructor
   * @param {HttpClient} http - Servicio HTTP para obtener datos del servidor.
   */
  constructor(private http: HttpClient, private fb: FormBuilder) {
    //constructor
  }

  /**
   * descripción
   * @method ngOnInit
   * @description Inicializa el componente y carga los datos iniciales.
   */
  ngOnInit() {
    this.paisForm = this.fb.group({
      bloque: [''],
      descripcionJustificacion: ['', [Validators.required]],
      observaciones: [''],
    });
    this.fetchpaisProc();
  }

  /**
   * descripción
   * @method agregar
   * @description Agrega elementos a la lista según el tipo especificado.
   * @param {string} type - Tipo de acción a realizar.
   */
  agregar(type: string) {
    if (type === 't') {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const fechaValor = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[fechaValor]);
      this.fechasDatos.splice(fechaValor, 1);
    }
  }

  /**
   * descripción
   * @method quitar
   * @description Elimina elementos de la lista según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = '') {
    if (tipo === 't') {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const fechaValor = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[fechaValor]);
      this.fechasSeleccionadas.splice(fechaValor, 1);
    }
  }

  fetchpaisProc() {
    this.http
      .get<Catalogo[]>('/assets/json/130102/pais-procenia.json')
      .subscribe((data) => {
        this.paisProc = data;
      });
  }
}
