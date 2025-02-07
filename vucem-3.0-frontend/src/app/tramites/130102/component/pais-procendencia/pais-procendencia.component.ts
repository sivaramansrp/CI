/**
 * @fileoverview Este archivo contiene la clase PaisProcendenciaComponent, que es responsable de manejar la lógica del componente País Procedencia.
 *
 * @module PaisProcendenciaComponent
 */

import { Component, OnInit } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CrosslistComponent } from '../../../../shared/components/crosslist/crosslist.component';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { HttpClient } from '@angular/common/http';

/**
 * @class PaisProcendenciaComponent
 * @classdesc Esta clase representa el componente País Procedencia.
 */
@Component({
  selector: 'app-pais-procendencia',
  standalone: true,
  imports: [
    TituloComponent,
    CrosslistComponent,
    CommonModule,
    ReactiveFormsModule,
    SelectCatalogosComponent,
  ],
  templateUrl: './pais-procendencia.component.html',
  styleUrl: './pais-procendencia.component.scss',
})
export class PaisProcendenciaComponent implements OnInit {
  fechasSeleccionadas: string[] = [];
  fecha: FormControl = new FormControl('');
  fechaSeleccionada: FormControl = new FormControl('');
  fechasDatos: string[] = [];
  /**
   * @property {Array<string>} selectRangoDias - Array para almacenar los rangos de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * @property {CatalogosSelect} paisProc - El catálogo de países.
   */
  paisProc!: CatalogosSelect;

  /**
   * @property {Array<Object>} botonField - Array para almacenar los botones de acción.
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
   * @constructor
   * @param {HttpClient} http - El cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {}

  /**
   * @method ngOnInit
   * @description Inicializa el componente obteniendo los datos necesarios.
   */
  ngOnInit() {
    this.fetchPaisOptions();
  }

  /**
   * @method agregar
   * @description Agrega elementos según el tipo especificado.
   * @param {string} type - El tipo de acción a realizar.
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
   * @method quitar
   * @description Quita elementos según el tipo especificado.
   * @param {string} type - El tipo de acción a realizar.
   */
  quitar(type: string = '') {
    if (type === 't') {
      this.fechasDatos = [...this.selectRangoDias];
      this.fechasSeleccionadas = [];
    } else {
      const fechaValor = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[fechaValor]);
      this.fechasSeleccionadas.splice(fechaValor, 1);
    }
  }

  /**
   * @method fetchpaisProc
   * @description Método de marcador de posición para manejar la selección de país.
   * @param {any} e - El parámetro del evento.
   */
  fetchpaisProc(e: any) {}

  /**
   * @method fetchPaisOptions
   * @description Obtiene las opciones de países del servidor.
   */
  fetchPaisOptions() {
    this.http
      .get('/assets/json/130102/pais-procenia.json')
      .subscribe((data: any) => {
        this.paisProc = data;
      });
  }
}
