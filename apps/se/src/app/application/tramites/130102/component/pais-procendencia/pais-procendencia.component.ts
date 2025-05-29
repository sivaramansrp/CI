/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * compo doc
 * @fileoverview Componente encargado de gestionar la selección de países de procedencia en un trámite.
 * @module PaisProcendenciaComponent
 */
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CrosslistComponent } from 'libs/shared/data-access-user/src/tramites/components/crosslist/crosslist.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

import paisProcJson from 'libs/shared/theme/assets/json/130102/pais-procenia.json';


import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs';
import { FormularioRegistroService } from '../../services/octava-temporal.service';

import { ConsultaioQuery } from '@ng-mf/data-access-user';
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
   * Indica si el componente está deshabilitado.
   * @type {boolean}
   */
  @Input() isDisabled! :boolean;
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

  /**
   * Estado actual de la solicitud 130102, obtenido desde el store.
   */
  public solicitudState!: Solicitud130102State;

  /**
   * Observable utilizado para cancelar suscripciones al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();
/**
   * Indica si el formulario es de solo lectura.
   */
   esFormularioSoloLectura: boolean = false;

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

  constructor(private http: HttpClient, private fb: FormBuilder,
    private tramite130102Store: Tramite130102Store,
    private tramite130102Query: Tramite130102Query,
    private formularioRegistroService: FormularioRegistroService,
        private consultaioQuery: ConsultaioQuery
  ) {
     this.consultaioQuery.selectConsultaioState$
         .pipe(
           takeUntil(this.destroyNotifier$),
           map((seccionState) => {
             this.esFormularioSoloLectura = seccionState.readonly;
            
             this.inicializarEstadoFormulario();
           })
         )
         .subscribe();
  }

  /**
   * Inicializa el componente y configura el formulario.
   */
  ngOnInit() {
  this.inicializarEstadoFormulario();
    this.fetchPaisProc();
    this.formularioRegistroService.registrarFormulario('paisForm', this.paisForm);
  }
    inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
   
  }
  /**
    * Guarda los datos del formulario y ajusta su estado según si es de solo lectura o no.
  */
   guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.paisForm.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.paisForm.enable();
      } 
  }
  /**
   * Inicializa el formulario reactivo y sus validaciones.
   */
  inicializarFormulario(): void {
   this.tramite130102Query.selectSolicitud$
        .pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {  
            this.solicitudState = seccionState;
          })
        )
        .subscribe();

    this.paisForm = this.fb.group({
      bloque: [this.solicitudState?.bloque],
      descripcionJustificacion: [this.solicitudState?.descripcionJustificacion, [Validators.required,PaisProcendenciaComponent.noLeadingSpacesValidator]],
      observaciones: [this.solicitudState?.observaciones,[PaisProcendenciaComponent.noLeadingSpacesValidator]]
    });
     if (this.esFormularioSoloLectura) {
    this.paisForm.disable();
  }
  }
  /**
   * Asigna un valor del formulario al store.
   *
   * @param {FormGroup} form - Formulario reactivo.
   * @param {string} campo - Campo del formulario a obtener.
   * @param {keyof Tramite130102Store} metodoNombre - Método del store donde se guardará el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130102Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite130102Store[metodoNombre] as (value: string | number | boolean) => void)(VALOR);
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

   /**
   * Validador que verifica que el valor del campo no tenga espacios al inicio ni al final.
   * 
   * @param control - Control del formulario a validar.
   * @returns Un objeto con el error 'leadingSpaces' si hay espacios al inicio o final, o null si es válido.
   */
  private static noLeadingSpacesValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  }
}
