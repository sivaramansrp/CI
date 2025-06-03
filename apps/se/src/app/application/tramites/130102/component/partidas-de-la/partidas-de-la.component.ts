/**
 * @file PartidasDeLaComponent
 * @description Componente Angular para gestionar las partidas de mercancía en un trámite específico.
 */

import { CommonModule } from '@angular/common';
 
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { MERCANCIA_TABLA } from '../../constantes/octava-temporal.enum';

import { Solicitud130102State, Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';

import { Subject, map, takeUntil } from 'rxjs'; 
import { FormularioRegistroService } from '../../services/octava-temporal.service';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

import { AlertComponent, Catalogo,REGEX_NUMERO_DECIMAL_ENTERO, REG_X, TablaDinamicaComponent, TablaSeleccion, TituloComponent, UppercaseDirective} from '@libs/shared/data-access-user/src';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';

import { OctavaTemporal } from '../../models/octava-temporal.model';


/**
 * Clase PartidasDeLaComponent
 * @description Componente Angular para gestionar las partidas de mercancía en un trámite específico.
 */
@Component({
  selector: 'app-partidas-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    UppercaseDirective,
    AlertComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './partidas-de-la.component.html',
  styleUrl: './partidas-de-la.component.scss',
})
/**
 * * Componente para gestionar las partidas de mercancía en un trámite específico.
 */

export class PartidasDeLaComponent implements OnInit, OnDestroy {
    /**
     * @property {TablaSeleccion} tablaSeleccion
     * @description Tabla de selección para la tabla de cupos.
     */
    tablaSeleccion = TablaSeleccion;
  /**
   * Expresión regular para validar fracciones arancelarias.
   */ 
  configuracionTabla =MERCANCIA_TABLA;
/*
* @property {OctavaTemporal[]} datosSocios
* @description Datos de los socios obtenidos desde el store.
*/
    datosSocios: OctavaTemporal[] = [];

  /**
   * Formulario reactivo utilizado para gestionar los datos de las partidas de la mercancía.
   * @type {FormGroup}
   */
  form!: FormGroup;
 
  /**
   * Formulario reactivo utilizado para gestionar los totales de cantidad y valor en USD.
   * @type {FormGroup}
   */
  formForTotalCount!: FormGroup;
 
  /**
   * Constantes de texto utilizadas en el componente.
   * @type {any}
   */
  TEXTOS = TEXTOS;
 
  /**
   * Datos del catálogo de fracciones arancelarias TIGIE.
   * @type {CatalogosSelect}
   */
  fraccionArancelariaTIGIE: Catalogo[] = [];
 
 
 
  /**
   * Datos del cuerpo de la tabla.
   * @type {Array<{ tbodyData: string[] }>}
   */
  tableBodyData: { tbodyData: string[] }[] = [];
 
 
 
    /**
     * Estado actual de la solicitud 130102, obtenido desde el store.
     */
    public solicitudState!: Solicitud130102State;
  
    /**
     * Observable utilizado para cancelar suscripciones al destruir el componente.
     */
    private destroyNotifier$: Subject<void> = new Subject();
  /* *
     * Indica si el formulario es de solo lectura.
     */
     esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del formulario reactivo.
   * @param {FormBuilder} fb - Constructor del formulario reactivo.
   */

  constructor(private fb: FormBuilder,
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
   * Método para inicializar el estado del formulario.
   * Si el formulario es de solo lectura, se guardan los datos; de lo contrario, se crea el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
   
  }
  /**
   * Método para guardar los datos del formulario y ajustar su estado según si es de solo lectura o no.
   */
  guardarDatosFormulario(): void {
      this.crearFormulario();
      if (this.esFormularioSoloLectura) {
        this.form.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.form.enable();
      } 
  }
  
  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.formularioRegistroService.getFraccionArancelariaTIGIE().pipe(takeUntil(this.destroyNotifier$)).subscribe(data => {
      this.fraccionArancelariaTIGIE = data;
    });
     this.formularioRegistroService.getPartidasFromJson().pipe(takeUntil(this.destroyNotifier$)).subscribe(partidas => {
    this.datosSocios = partidas;
  });
    this.inicializarEstadoFormulario();
    this.formularioTotalCount();
  
    this.calculateTotals();
 
    // eslint-disable-next-line dot-notation
    this.formForTotalCount.controls['cantidadTotal'].disable();
    // eslint-disable-next-line dot-notation
    this.formForTotalCount.controls['valorTotalUSD'].disable();
    this.formularioRegistroService.registrarFormulario('form', this.form);
    this.formularioRegistroService.registrarFormulario('formForTotalCount', this.formForTotalCount);
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
   * Método para crear el formulario reactivo.
   */
  crearFormulario(): void {
    this.tramite130102Query.selectSolicitud$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState) => {  
        this.solicitudState = seccionState;
      })
    )
    .subscribe();

    this.form = this.fb.group({
      cantidad: [
        this.solicitudState?.cantidadPartidas,
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
          PartidasDeLaComponent.noLeadingSpacesValidator,
        ],
      ],
      fraccionArancelariaTIGIE: [ this.solicitudState?.fraccionArancelariaTIGIE, [Validators.required,Validators.pattern(REG_X.REGEX_FRACCION_ARANCELARIA),PartidasDeLaComponent.noLeadingSpacesValidator]],
      fraccionArancelariaTIGIE_TIGIE: [ this.solicitudState?.fraccionArancelariaTIGIE_TIGIE, [Validators.required]],
      descripcion: [ this.solicitudState?.descripcionPartidas, [Validators.required, Validators.maxLength(255),PartidasDeLaComponent.noLeadingSpacesValidator,]],
      valorPartidaUSD: [
        this.solicitudState?.valorPartidaUSD,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern(REGEX_NUMERO_DECIMAL_ENTERO),
          Validators.maxLength(20)
        ],
      ],
    });
     if (this.esFormularioSoloLectura) {
    this.form.disable();
  }
  }
 
  /**
   * Método para calcular los totales de cantidad y valor en USD.
   */
  calculateTotals(): void {
    const CANTIDAD_TOTAL = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[0]),
      0
    );
const VALOR_TOTAL_USD = this.tableBodyData.reduce(
  (sum: number, item: { tbodyData: string[] }) =>
    sum + parseFloat(item.tbodyData[5]),
  0
);

// eslint-disable-next-line dot-notation
this.formForTotalCount.controls['cantidadTotal'].setValue(CANTIDAD_TOTAL);
// eslint-disable-next-line dot-notation
this.formForTotalCount.controls['valorTotalUSD'].setValue(VALOR_TOTAL_USD);
  }
 
  /**
   * Método para crear el formulario de totales.
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      cantidadTotal: [{ value: '', disabled: true }],
      valorTotalUSD: [{ value: '', disabled: true }],
    });
  }
 
  /**
   * Método para manejar la selección de fracción arancelaria TIGIE.
   * @param {Catalogo} aduana - Datos del catálogo seleccionado.
   */
   // eslint-disable-next-line class-methods-use-this
   fraccionArancelariaTIGIESelection() : void{
    // Implementar el método o eliminarlo si no es necesario
  }
 
  
 
  /**
   * Método para validar el formulario al hacer clic en el botón
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } 
  }
 
  /**
   * Método para verificar si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control del formulario.
   * @returns {boolean} - Retorna true si el control es inválido, de lo contrario false.
   */
  esInvalido(nombreControl: string): boolean {
    const CONTROL = this.form.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
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

  /**
 * Método del ciclo de vida que se ejecuta al destruir el componente.
 * Emite y completa el observable para evitar fugas de memoria.
 */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}