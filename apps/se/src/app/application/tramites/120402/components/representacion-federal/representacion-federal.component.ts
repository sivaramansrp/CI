/**
 * @class RepresentacionFederalComponent
 * @description
 * Este componente gestiona la representación federal dentro de un formulario.
 * Permite al usuario seleccionar una entidad federativa y su respectiva representación federal.
 *
 * @since 1.0.0
 * @version 1.0.0
 * @license MIT
 *
 * @selector app-representacion-federal
 * @standalone true
 * @requires CommonModule
 * @requires ReactiveFormsModule
 * @requires CatalogoSelectComponent
 * @requires TituloComponent
 *
 * @templateUrl ./representacion-federal.component.html
 * @styleUrls ['./representacion-federal.component.scss']
 */

import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Catalogo,
  CatalogoSelectComponent,
  RepresentacionFederalService,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Subject, takeUntil } from 'rxjs';

/**
 * @class RepresentacionFederalComponent
 * @description
 * Componente de Angular encargado de manejar la representación federal dentro de un formulario.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TituloComponent,
  ],
  templateUrl: './representacion-federal.component.html',
  styleUrls: ['./representacion-federal.component.scss'],
})
export class RepresentacionFederalComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} representacionForm
   * @description
   * Formulario reactivo que maneja la selección de entidad federativa y representación federal.
   * Se inicializa en `ngOnInit()`.
   *
   * @access public
   */
  public representacionForm!: FormGroup;

  /**
   * Subject utilizado para manejar la destrucción del componente y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * @property {Catalogo[]} entidad
   * @description
   * Lista de entidades federativas cargadas desde un archivo JSON.
   * Se usa para poblar el select de entidades en el formulario.
   *
   * @access public
   */
  public entidad: Catalogo[] = [];

  /**
   * @property {Catalogo[]} representacion
   * @description
   * Lista de representaciones federales cargadas desde un archivo JSON.
   * Se usa para poblar el select de representaciones en el formulario.
   *
   * @access public
   */
  public representacion: Catalogo[] = [];

  /**
   * @constructor
   * @description
   * Constructor que inyecta `FormBuilder` para la creación del formulario reactivo.
   *
   * @param {FormBuilder} fb - Servicio de Angular para construir formularios reactivos.
   * @access public
   */
  constructor(
    private fb: FormBuilder,
    private service: RepresentacionFederalService
  ) {}

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Llama a `initializeForm()` para configurar el formulario.
   *
   * @returns {void}
   * @access public
   */
  public ngOnInit(): void {
    this.initializeForm();
    this.loadEntidad();
    this.loadRepresentacion();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * @method initializeForm
   * @description
   * Inicializa el formulario reactivo con los campos requeridos.
   * Se establecen valores vacíos por defecto.
   *
   * @returns {void}
   * @access private
   */
  private initializeForm(): void {
    this.representacionForm = this.fb.group({
      /**
       * @property {string} entidad
       * @description
       * Campo del formulario para la selección de la entidad federativa.
       * Se inicializa como una cadena vacía.
       */
      entidad: ['', [Validators.required]],

      /**
       * @property {string} representacion
       * @description
       * Campo del formulario para la selección de la representación federal.
       * Se inicializa como una cadena vacía.
       */
      representacion: ['', [Validators.required]],
    });
  }

  /**
   * Carga la información de la entidad desde el servicio y la asigna al formulario.
   */
  loadEntidad(): void {
    this.service
      .getEntidad()
      .pipe(takeUntil(this.destroyed$))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((data: any) => {
        this.entidad = data;
      });
  }

   /**
   * Carga la información de la representacion desde el servicio y la asigna al formulario.
   */
   loadRepresentacion(): void {
    this.service
      .getEntidad()
      .pipe(takeUntil(this.destroyed$))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .subscribe((data: any) => {
        this.representacion = data;
      });
  }
}
