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
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import entidadValues from 'libs/shared/theme/assets/json/130102/entidad_federativa.json';
import representacionValues from 'libs/shared/theme/assets/json/130102/representacion_federal.json';

/**
 * @class RepresentacionFederalComponent
 * @description
 * Componente de Angular encargado de manejar la representación federal dentro de un formulario.
 */
@Component({
  selector: 'app-representacion-federal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CatalogoSelectComponent, TituloComponent],
  templateUrl: './representacion-federal.component.html',
  styleUrls: ['./representacion-federal.component.scss']
})
export class RepresentacionFederalComponent implements OnInit {
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
   * @property {Catalogo[]} entidad
   * @description
   * Lista de entidades federativas cargadas desde un archivo JSON.
   * Se usa para poblar el select de entidades en el formulario.
   * 
   * @access public
   */
  public entidad: Catalogo[] = entidadValues;

  /**
   * @property {Catalogo[]} representacion
   * @description
   * Lista de representaciones federales cargadas desde un archivo JSON.
   * Se usa para poblar el select de representaciones en el formulario.
   * 
   * @access public
   */
  public representacion: Catalogo[] = representacionValues;

  /**
   * @constructor
   * @description
   * Constructor que inyecta `FormBuilder` para la creación del formulario reactivo.
   * 
   * @param {FormBuilder} fb - Servicio de Angular para construir formularios reactivos.
   * @access public
   */
  constructor(private fb: FormBuilder) {}

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
      entidad: [''],

      /**
       * @property {string} representacion
       * @description
       * Campo del formulario para la selección de la representación federal.
       * Se inicializa como una cadena vacía.
       */
      representacion: [''],
    });
  }

  /**
   * @method entidadoOnChange
   * @description
   * Se ejecuta cuando el usuario cambia la entidad federativa seleccionada en el formulario.
   * En el futuro, se integrará con una API para actualizar dinámicamente la lista de representaciones disponibles.
   * 
   * @param {Event} event - Evento de cambio en la selección de entidad.
   * @returns {void}
   * @access public
   */
  public entidadoOnChange(event: Event): void {
    console.log('Cambio en la entidad seleccionada', event);
  }

  /**
   * @method representacionOnChange
   * @description
   * Se ejecuta cuando el usuario cambia la representación federal seleccionada en el formulario.
   * En el futuro, se integrará con una API para manejar cambios dinámicos según la entidad seleccionada.
   * 
   * @param {Event} event - Evento de cambio en la selección de representación federal.
   * @returns {void}
   * @access public
   */
  public representacionOnChange(event: Event): void {
    console.log('Cambio en la representación seleccionada', event);
  }
}
