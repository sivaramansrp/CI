/**
 *compo doc
 * @fileoverview Componente DatosDeLaMercancia: maneja la lógica del formulario
 * para la gestión de productos, fracciones arancelarias y unidades de medida.
 */

/**
 *compo doc
 * @class DatosDeLaMercaciaComponent
 * @description Componente para la gestión de datos relacionados con productos,
 * fracciones arancelarias y unidades de medida en un formulario reactivo.
 */

/**
 * compo doc
 * @property {any} prodData - Datos de productos importados desde un archivo JSON.
 */

/**
 * compo doc
 * @property {FormGroup} formDelLa - Estructura del formulario reactivo.
 */

/**
 * compo doc
 * @property {Array<{ label: string; value: string }>} producto - Lista de productos disponibles.
 */

/**
 * compo doc
 * @property {string} selectedValue - Opción seleccionada por defecto.
 */

/**
 * compo doc
 * @property {string} defaultSelect - Valor predeterminado para el selector de productos.
 */

/**
 * compo doc
 * @property {Catalogo[]} Unidad - Catálogo de unidades de medida.
 */

/**
 * compo doc
 * @property {Catalogo[]} fraccionF - Catálogo de fracciones arancelarias.
 */

/**
 * compo doc
 * @constructor
 * @param {HttpClient} http - Cliente HTTP para solicitudes.
 * @param {FormBuilder} fb - Constructor de formularios reactivos.
 */

/**
 * compo doc
 * @method ngOnInit
 * @description Inicializa el formulario con validaciones y carga datos de productos.
 */

/**
 * compo doc
 * @method onValueChange
 * @description Actualiza el valor seleccionado.
 * @param {string | number} value - Nuevo valor seleccionado.
 *
 * Este método es para la etiqueta de radio de producto.
 */

/**
 * compo doc
 * @method fetchProductoOptions
 * @description Carga las opciones de productos desde el JSON.
 */

/**
 * compo doc
 * @method fetchFraccion
 * @description Obtiene información de fracción arancelaria.
 */

/**
 * compo doc
 * @method fetchUnidad
 * @description Obtiene información de unidad de medida.
 */

/**
 * compo doc
 * @method setValoresStore
 * @description Establece valores en el store de trámites.
 * @param {FormGroup} formDelLa - Formulario reactivo.
 * @param {string} campo - Nombre del campo del formulario.
 * @param {keyof Tramite130109Store} metodoNombre - Nombre del método del store.
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
 
 import fractionValues from '@libs/shared/theme/assets/json/130110/fraccion_arancelaria.json';
 import productoOptions from '@libs/shared/theme/assets/json/130110/producto-otions.json';
 import unidadOptions from '@libs/shared/theme/assets/json/130110/unidad_da.json';
 
 import { Catalogo } from '@ng-mf/data-access-user';
 import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
 import { InputRadioComponent } from '@ng-mf/data-access-user';
 import { REG_X } from '@ng-mf/data-access-user';
 import { TituloComponent } from '@ng-mf/data-access-user';
 import { Tramite130109Query } from '../../estados/queries/tramite130110.query';
 import { Tramite130109Store } from '../../estados/tramites/tramites130110.store';

 /**
  *compo doc
  * @class DatosDeLaMercaciaComponent
  * @description Componente para la gestión de datos relacionados con productos,
  * fracciones arancelarias y unidades de medida en un formulario reactivo.
  */
 @Component({
   selector: 'app-datos-de-la-mercancia',
   standalone: true,
   imports: [
     TituloComponent,
     CommonModule,
     ReactiveFormsModule,
     InputRadioComponent,
     CatalogoSelectComponent,
   ],
   templateUrl: './datos-de-la-mercancia.component.html',
   styleUrl: './datos-de-la-mercancia.component.scss',
 })
 export class DatosDeLaMercanciaComponent implements OnInit {
   /**
    * compo doc
    * @property {any} prodData - Datos de productos importados desde un archivo JSON.
    */
   public prodData = productoOptions;
 
   /**
    * compo doc
    * @property {FormGroup} formDelLa - Estructura del formulario reactivo.
    */
   formDelLa!: FormGroup;
 
   /**
    * compo doc
    * @property {Array<{ label: string; value: string }>} producto - Lista de productos disponibles.
    */
   producto: { label: string; value: string }[] = [];
 
   /**
    * compo doc
    * @property {string} selectedValue - Opción seleccionada por defecto.
    */
   selectedValue: string = 'Nuevo';
 
   /**
    * compo doc
    * @property {string} defaultSelect - Valor predeterminado para el selector de productos.
    */
   defaultSelect: string = 'Nuevo';
 
   /**
    * compo doc
    * @property {Catalogo[]} Unidad - Catálogo de unidades de medida.
    */
   Unidad: Catalogo[] = unidadOptions;
 
   /**
    * compo doc
    * @property {Catalogo[]} fraccionF - Catálogo de fracciones arancelarias.
    */
   fraccionF: Catalogo[] = fractionValues;
 
   /**
    * compo doc
    * @constructor
    * @param {HttpClient} http - Cliente HTTP para solicitudes.
    * @param {FormBuilder} fb - Constructor de formularios reactivos.
    */
   constructor(private http: HttpClient, private fb: FormBuilder,private tramite130109Store: Tramite130109Store,
    private tramite130109Query: Tramite130109Query) {
     //constructor
     this.prodData = productoOptions;
   }
 
   /**
    * compo doc
    * @method ngOnInit
    * @description Inicializa el formulario con validaciones y carga datos de productos.
    */
   ngOnInit(): void {
     this.formDelLa = this.fb.group({
      descripcion: [
         '',
         [
           Validators.required,
           Validators.minLength(10),
           Validators.maxLength(500),
         ],
       ],
       fraccion: ['', [Validators.required]],
       unidadMedida: ['', [Validators.required]],
       cantidad: [
         '',
         [
           Validators.required,
           Validators.min(1),
           Validators.pattern(REG_X.SOLO_NUMEROS), 
         ],
       ],
       valorFacturaUSD: [
         '',
         [
           Validators.required,
           Validators.min(0.01),
           Validators.pattern(REG_X.DECIMALES_DOS_LUGARES),
         ],
       ],
     });
     this.fetchProductoOptions();
   }
 
   /**
    * compo doc
    * @method onValueChange
    * @description Actualiza el valor seleccionado.
    * @param {string | number} value - Nuevo valor seleccionado.
    *
    * Este método es para la etiqueta de radio de producto.
    */
   onValueChange(value: string | number): void {
     this.selectedValue = value.toString();
   }
 
   /**
    * compo doc
    * @method fetchProductoOptions
    * @description Carga las opciones de productos desde el JSON.
    */
   fetchProductoOptions(): void {
     this.producto = productoOptions.options;
     this.defaultSelect = productoOptions.defaultSelect;
   }
 
   /**
    * compo doc
    * @method fetchFraccion
    * @description Obtiene información de fracción arancelaria.
    */
   fetchFraccion(): void {
     this.selectedValue = 'Nuevo';
     this.formDelLa.get('unidadMedida')?.setValue(this.Unidad[0].id)
   }
 
   /**
    * compo doc
    * @method fetchUnidad
    * @description Obtiene información de unidad de medida.
    */
   fetchUnidad(): void {
     this.selectedValue = 'Nuevo';
   }
     setValoresStore(
      formDelLa: FormGroup,
       campo: string,
       metodoNombre: keyof Tramite130109Store
     ): void {
       const VALOR = formDelLa.get(campo)?.value;
       (this.tramite130109Store[metodoNombre] as (value: string | number) => void)(VALOR);
     }
 }