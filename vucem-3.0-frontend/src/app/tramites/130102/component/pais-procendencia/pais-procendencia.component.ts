/**
 * @fileoverview Este archivo contiene la clase PaisProcendenciaComponent, que es responsable de manejar la lógica del componente País Procedencia.
 * 
 * @module PaisProcendenciaComponent
 */

import { Component, OnInit } from '@angular/core';
import { TituloComponent } from "../../../../shared/components/titulo/titulo.component";
import { CrosslistComponent } from "../../../../shared/components/crosslist/crosslist.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from "../../../../shared/components/select-catalogos/select-catalogos.component";
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
    SelectCatalogosComponent
  ],
  templateUrl: './pais-procendencia.component.html',
  styleUrl: './pais-procendencia.component.scss'
})
export class PaisProcendenciaComponent implements OnInit {
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
      // Lógica para agregar selección
    } else {
      // Lógica para agregar todos
    }
  }

  /**
   * @method quitar
   * @description Quita elementos según el tipo especificado.
   * @param {string} type - El tipo de acción a realizar.
   */
  quitar(type: string) {
    if (type === 't') {
      // Lógica para restar selección
    } else {
      // Lógica para restar todos
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
    this.http.get('/assets/json/130102/pais-procenia.json').subscribe((data: any) => {
      this.paisProc = data;
    });
  }
}