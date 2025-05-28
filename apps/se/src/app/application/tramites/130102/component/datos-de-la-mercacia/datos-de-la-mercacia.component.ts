/* eslint-disable @nx/enforce-module-boundaries */
/**
 *compo doc
 * @fileoverview Componente DetosDelLaComponent: maneja la lógica del formulario
 * para la gestión de productos, fracciones arancelarias y unidades de medida.
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule, 
  ValidationErrors,  
  Validators,
} from '@angular/forms';

import fractionValues from 'libs/shared/theme/assets/json/130102/fraccion_arancelaria.json';
import productoOptions from 'libs/shared/theme/assets/json/130102/producto-otions.json';
import unidadOptions from 'libs/shared/theme/assets/json/130102/unidad_da.json';

import { Catalogo, ConsultaioQuery } from '@ng-mf/data-access-user';
import { InputRadioComponent } from "@libs/shared/data-access-user/src/tramites/components/input-radio/input-radio.component";
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { REG_X } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs';
import { FormularioRegistroService } from '../../services/octava-temporal.service';


/**
 *compo doc
 * @class DetosDelMarcanciaComponent
 * @description Componente para la gestión de datos relacionados con productos,
 * fracciones arancelarias y unidades de medida en un formulario reactivo.
 */
@Component({
  selector: 'app-datos-de-la-mercacia',
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    CatalogoSelectComponent,
  ],
  templateUrl: './datos-de-la-mercacia.component.html',
  styleUrl: './datos-de-la-mercacia.component.scss',
})
export class DetosDelLaMarcaciaComponent implements OnInit , OnDestroy {
  /*
  * @description Indica si el formulario es de solo lectura.
  */
   esFormularioSoloLectura: boolean = false;
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

  public solicitudState!: Solicitud130102State;
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * compo doc
   * @constructor
   * @param {HttpClient} http - Cliente HTTP para solicitudes.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   */
  constructor(private http: HttpClient,
     private fb: FormBuilder,
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
   * compo doc
   * @method ngOnInit
   * @description Inicializa el formulario con validaciones y carga datos de productos.
   */
  ngOnInit(): void {
     this.inicializarEstadoFormulario();
   
   this.fetchProductoOptions();
   this.formularioRegistroService.registrarFormulario('formDelLa', this.formDelLa);
  }
 inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
   
  }
    guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        this.formDelLa.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.formDelLa.enable();
      } else {
        // No se requiere ninguna acción en el formulario
      }
  }

  inicializarFormulario():void{
 this.tramite130102Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {  
        this.solicitudState = seccionState;
      })
    )
    .subscribe();

    this.formDelLa = this.fb.group({
      productos: [this.solicitudState?.productos],
      descripcion: [
        this.solicitudState?.descripcion,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
          DetosDelLaMarcaciaComponent.noLeadingSpacesValidator
        ],
      ],
      fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, [Validators.required]],
      unidadMedida: [this.solicitudState?.unidadMedida, [Validators.required]],
      cantidad: [
        this.solicitudState?.cantidad,
        [
          Validators.required,
          Validators.min(1),
          Validators.pattern(REG_X.SOLO_NUMEROS),
          DetosDelLaMarcaciaComponent.noLeadingSpacesValidator 
        ],
      ],
      valorFacturaUSD: [
        this.solicitudState?.valorFacturaUSD,
        [
          Validators.required,
          Validators.min(0.01),
          Validators.pattern(REG_X.DECIMALES_DOS_LUGARES),
          DetosDelLaMarcaciaComponent.noLeadingSpacesValidator 
        ],
      ],
    });
     if (this.esFormularioSoloLectura) {
    this.formDelLa.disable();
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
    (this.tramite130102Store[metodoNombre] as (value: string | number) => void)(VALOR);
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
  }

  /**
   * compo doc
   * @method fetchFraccion
   * @description Obtiene información de fracción arancelaria.
   */
  fetchFraccion(): void {
    this.selectedValue = 'Nuevo';
  }

  /**
   * compo doc
   * @method fetchUnidad
   * @description Obtiene información de unidad de medida.
   */
  fetchUnidad(): void {
    this.selectedValue = 'Nuevo';
  }

  /**
 * Validador personalizado que verifica si un campo comienza con espacios en blanco.
 * Retorna un error si se detectan espacios al inicio.
 */
  private static noLeadingSpacesValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.trim() !== control.value) {
      return { leadingSpaces: true };
    }
    return null;
  }
  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Emite y completa el observable para evitar fugas de memoria.
   */

  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

}
