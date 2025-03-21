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
 * @property {any} datosProducto - Datos de productos importados desde un archivo JSON.
 */

/**
 * compo doc
 * @property {FormGroup} formularioDatosMercancia - Estructura del formulario reactivo.
 */

/**
 * compo doc
 * @property {Array<{ label: string; value: string }>} producto - Lista de productos disponibles.
 */

/**
 * compo doc
 * @property {string} valorSeleccionado - Opción seleccionada por defecto.
 */

/**
 * compo doc
 * @property {string} predeterminadoSeleccionar - Valor predeterminado para el selector de productos.
 */

/**
 * compo doc
 * @property {Catalogo[]} unidad - Catálogo de unidades de medida.
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
 * @param {FormGroup} formularioDatosMercancia - Formulario reactivo.
 * @param {string} campo - Nombre del campo del formulario.
 * @param {keyof Tramite130109Store} metodoNombre - Nombre del método del store.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, takeUntil } from 'rxjs';
import fraccionArancelariaOpciones from '@libs/shared/theme/assets/json/130109/fraccion_arancelaria.json';
import productoOptions from '@libs/shared/theme/assets/json/130109/producto-opciones.json';
import unidadOptions from '@libs/shared/theme/assets/json/130109/unidad_da.json';

import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { REG_X } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';
import { TituloComponent } from '@ng-mf/data-access-user';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';
import { Tramite130109Store } from '../../estados/tramites/tramites130109.store';

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
export class DatosDeLaMercanciaComponent implements OnInit, OnDestroy {
  /**
   * compo doc
   * @property {any} datosProducto - Datos de productos importados desde un archivo JSON.
   */
  public datosProducto = productoOptions;

  /**
   * compo doc
   * @property {FormGroup} formularioDatosMercancia - Estructura del formulario reactivo.
   */
  formularioDatosMercancia!: FormGroup;

  /**
   * compo doc
   * @property {Array<{ label: string; value: string }>} opcionesProducto - Lista de productos disponibles.
   */
  opcionesProducto: { label: string; value: string }[] = [];

  /**
   * compo doc
   * @property {string} valorSeleccionado - Opción seleccionada por defecto.
   */
  valorSeleccionado: string = 'Nuevo';

  /**
   * compo doc
   * @property {string} predeterminadoSeleccionar - Valor predeterminado para el selector de productos.
   */
  predeterminadoSeleccionar: string = 'Nuevo';

  /**
   * compo doc
   * @property {Catalogo[]} unidad - Catálogo de unidades de medida.
   */
  unidad: Catalogo[] = unidadOptions;

  /**
   * compo doc
   * @property {Catalogo[]} fraccionF - Catálogo de fracciones arancelarias.
   */
  fraccionF: Catalogo[] = fraccionArancelariaOpciones;
  /**
   * Observable utilizado para gestionar la destrucción del componente y evitar fugas de memoria.
   * @private
   * @type {Subject<void>}
   */
  private destroyed$: Subject<void> = new Subject();
  /**
   * compo doc
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para solicitudes.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   */
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private tramite130109Store: Tramite130109Store,
    private tramite130109Query: Tramite130109Query
  ) {
    //constructor
    this.datosProducto = productoOptions;
  }

  /**
   * compo doc
   * @method ngOnInit
   * @description Inicializa el formulario con validaciones y carga datos de productos.
   */
  ngOnInit(): void {
    this.formularioDatosMercancia = this.fb.group({
      opcion: [this.predeterminadoSeleccionar, [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(254)]],
      fraccion: ['', [Validators.required]],
      unidadMedida: ['', [Validators.required]],
      cantidad: [
        '',
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      valorFacturaUSD: [
        '',
        [Validators.required, Validators.pattern(REG_X.DECIMALES_DOS_LUGARES)],
      ],
    });

    this.fetchProductoOptions();

    this.tramite130109Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDatosMercancia.patchValue({
            descripcion: seccionState.descripcion,
            fraccion: seccionState.fraccion,
            cantidad: seccionState.cantidad,
            valorFacturaUSD: seccionState.valorFacturaUSD,
            unidadMedida: seccionState.unidadMedida,
            opcion: seccionState.opcion || this.predeterminadoSeleccionar,
          });
          if (seccionState.fraccion) {
            this.formularioDatosMercancia.patchValue({
              unidadMedida: this.unidad[0].id,
            });
          }
        })
      )
      .subscribe();
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
    this.valorSeleccionado = value.toString();
  }

  /**
   * compo doc
   * @method fetchProductoOptions
   * @description Carga las opciones de productos desde el JSON.
   */
  fetchProductoOptions(): void {
    this.opcionesProducto = productoOptions.opciones;
    this.predeterminadoSeleccionar = productoOptions.predeterminadoSeleccionar;
  }

  /**
   * compo doc
   * @method fetchFraccion
   * @description Obtiene información de fracción arancelaria.
   */
  fetchFraccion(): void {
    this.valorSeleccionado = 'Nuevo';
    this.formularioDatosMercancia
      .get('unidadMedida')
      ?.setValue(this.unidad[0].id);
    // this.setValoresStore(this.formularioDatosMercancia, 'unidadMedida', 'setUnidadMedida');
  }

  /**
   * compo doc
   * @method fetchUnidad
   * @description Obtiene información de unidad de medida.
   */
  fetchUnidad(): void {
    this.valorSeleccionado = 'Nuevo';
  }
  /**
   * @nombre setValoresStore
   * @descripción Este método establece los valores en el store de Tramite130109.
   * @param {FormGroup} formularioDatosMercancia - El formulario del cual se obtendrá el valor.
   * @param {string} campo - El nombre del campo del formulario.
   * @param {keyof Tramite130109Store} metodoNombre - El nombre del método en el store que se llamará.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite130109Store
  ): void {
    const VALOR = form.get(campo)?.value;

    (this.tramite130109Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }
  /**
   * Método que se ejecuta cuando el componente se destruye.
   * Este método emite un valor a `destroyed$` y completa el observable para evitar fugas de memoria.
   * @method
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
