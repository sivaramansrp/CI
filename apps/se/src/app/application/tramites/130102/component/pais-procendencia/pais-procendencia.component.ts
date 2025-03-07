/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * compo doc
 * @fileoverview Componente encargado de gestionar la selección de países de procedencia en un trámite.
 * @module PaisProcendenciaComponent
 */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

import paisProcJson from 'libs/shared/theme/assets/json/130102/pais-procenia.json';


import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs';
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
   * Formulario reactivo para la gestión de países de procedencia.
   */
  paisForm!: FormGroup;

  /**
   * Lista de fechas seleccionadas.
   */
  fechasSeleccionadas: string[] = [];

  /**
   * Control de formulario para la fecha.
   */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * Lista de datos de fechas disponibles.
   */
  fechasDatos: string[] = [];

  /**
   * Lista de rangos de días seleccionados.
   */
  selectRangoDias: string[] = [];

  /**
   * Catálogo de países de procedencia.
   */
  paisProc: Catalogo[] = paisProcJson;

  public solicitudState!: Solicitud130102State;
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  botonField = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: () => this.agregar('t'),
    },
    {
      btnNombre: 'Restar selección',
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
   * Constructor del componente.
   * @param {HttpClient} http - Servicio HTTP para obtener datos del servidor.
   * @param {FormBuilder} fb - Utilidad para la construcción de formularios reactivos.
   */
  // eslint-disable-next-line no-empty-function
  constructor(private http: HttpClient, private fb: FormBuilder,
    private tramite130102Store: Tramite130102Store,
    private tramite130102Query: Tramite130102Query
  ) {
    //constructor
  }

  /**
   * Inicializa el componente y configura el formulario.
   */
  ngOnInit() {
     this.tramite130102Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {  
            console.log('Solicitud130102State', seccionState);
            this.solicitudState = seccionState;
          })
        )
        .subscribe();

    this.paisForm = this.fb.group({
      bloque: [this.solicitudState?.bloque],
      descripcionJustificacion: [this.solicitudState?.descripcionJustificacion, [Validators.required]],
      observaciones: [this.solicitudState?.observaciones],
    });
    this.fetchPaisProc();
  }
  /**
   * Asigna un valor del formulario al store.
   *
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Campo del formulario a obtener.
   * @param {keyof Tramite130102Store} metodoNombre - Método del store donde se guardará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130102Store): void {
    const valor = form.get(campo)?.value;
    (this.tramite130102Store[metodoNombre] as (value: any) => void)(valor);
  }

  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregar(tipo: string) {
    if (tipo === 't') {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const FECHA_VALOR = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[FECHA_VALOR]);
      this.fechasDatos.splice(FECHA_VALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = '') {
    if (tipo === 't') {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const FECHA_VALOR = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[FECHA_VALOR]);
      this.fechasSeleccionadas.splice(FECHA_VALOR, 1);
    }
  }

  /**
   * Obtiene la lista de países de procedencia desde un archivo JSON.
   */
  fetchPaisProc() {
    this.http
      .get<Catalogo[]>('/assets/json/130102/pais-procenia.json')
      .subscribe((data) => {
        this.paisProc = data;
      });
  }
}
