/**
 * @module DatosDeLosResiduosComponent
 * Este módulo define el componente `DatosDeLosResiduosComponent` que maneja la información de los residuos.
 */

import { CommonModule } from '@angular/common';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { BtnContinuarComponent } from "../../../../shared/components/btn-continuar/btn-continuar.component";
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { HttpCoreService } from '../../../../core/services/shared/http/http.service';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

/**
 * 
 * Componente que maneja los datos relacionados con los residuos, incluidos los formularios y catálogos.
 */
@Component({
  selector: 'app-datos-de-los-residuos',
  templateUrl: './datos-de-los-residuos.component.html',
  styleUrl: './datos-de-los-residuos.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CatalogoSelectComponent, CommonModule, TituloComponent, BtnContinuarComponent]
})
export class DatosDeLosResiduosComponent implements OnInit, OnDestroy {

  /**
   * @property {FormGroup} materiaPrimaForm
   * Formulario principal del componente para la gestión de datos de residuos.
   */
  materiaPrimaForm: FormGroup;

  /**
   * @property {boolean} mostrarMsgCantSe06
   * Indica si se debe mostrar el mensaje de cantidad SE06.
   */
  mostrarMsgCantSe06: boolean = false;

  /**
   * @property {DatosPasos} datosPasosGuardar
   * Objeto que maneja los datos de los pasos del formulario.
   */
  datosPasosGuardar: DatosPasos = {
    txtBtnSig: "Guardar",
    txtBtnAnt: "Cancelar",
    indice: 2,
    nroPasos: 0
  };

  /**
   * @property {Catalogo[]} comboUnidadMedida
   * Opciones del catálogo de unidad de medida.
   */
  comboUnidadMedida: Catalogo[];

  /**
   * @property {Catalogo[]} comboCapituloFraccion
   * Opciones del catálogo de capítulo de fracción.
   */
  comboCapituloFraccion: Catalogo[];

  /**
   * @property {Catalogo[]} comboPartidaFraccion
   * Opciones del catálogo de partida de fracción.
   */
  comboPartidaFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboSubPartidaFraccion
   * Opciones del catálogo de subpartida de fracción.
   */
  comboSubPartidaFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboFraccionArancelariaParametros
   * Opciones del catálogo de fracción arancelaria.
   */
  comboFraccionArancelariaParametros!: Catalogo[];

  /**
   * @private
   * @property {Subject<void>} destroyed$
   * Subject utilizado para gestionar la destrucción del componente y la cancelación de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Instancia de FormBuilder para crear formularios.
   *  Servicio para realizar solicitudes HTTP.
   */
  constructor(private fb: FormBuilder, private http: HttpCoreService) {
    this.materiaPrimaForm = this.fb.group({
      descUnidadMedida: [''],
      descFraccion: [''],
      generica1: [''],
      clavePartida: [''],
      claveSubPartida: [''],
      
      descripcionMercancia: ['', [Validators.required, Validators.maxLength(120)]], // Descripción de la mercancía (requerido, máximo 120 caracteres)
      generica2: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,6})?$'), Validators.maxLength(18)]], // Valor numérico (requerido, número entero o decimal con hasta 6 decimales, máximo 18 caracteres)
      cantidadEnLetra: [{ value: '', disabled: true }, Validators.maxLength(256)], // Cantidad en letra (deshabilitado, máximo 256 caracteres)
      unidadMedidaComercial: this.fb.group({
        clave: ['', Validators.required]
      }),
      capituloFraccion: ['', Validators.required],
      partidaFraccion: ['', Validators.required],
      subPartidaFraccion: ['', Validators.required],
      fraccion: ['', Validators.required]
    });
  }

  /**
   * @ngOnInit
   * Método que se ejecuta cuando el componente es inicializado. Carga los catálogos de unidad de medida y capítulo de fracción.
   */
  ngOnInit(): void {
    this.loadcomboUnidadMedida();
    this.loadComboCapituloFraccion();
  }

  /**
   * @method loadcomboUnidadMedida
   * Método que carga las opciones del catálogo de unidad de medida desde un archivo JSON.
   */
  loadcomboUnidadMedida(): void {
    this.http.get('./assets/json/231001/comboUnidadMedida.json').pipe(
      takeUntil(this.destroyed$) // Se usa takeUntil para asegurarse de que las suscripciones se cancelen al destruirse el componente
    ).subscribe((data): void => {
      this.comboUnidadMedida = data as Catalogo[];
    });
  }

  /**
   * @method loadComboCapituloFraccion
   * Método que carga las opciones del catálogo de capítulo de fracción desde un archivo JSON.
   */
  loadComboCapituloFraccion(): void {
    this.http.get('./assets/json/231001/comboCapituloFraccion.json').pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.comboCapituloFraccion = data as Catalogo[];
    });
  }

  /**
   * @method loadComboPartidaFraccion
   * Método que carga las opciones del catálogo de partida de fracción desde un archivo JSON.
   */
  loadComboPartidaFraccion(): void {
    this.http.get('./assets/json/231001/comboPartidaFraccion.json').pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.comboPartidaFraccion = data as Catalogo[];
    });
  }

  /**
   * @method loadComboSubPartidaFraccion
   * Método que carga las opciones del catálogo de subpartida de fracción desde un archivo JSON.
   */
  loadComboSubPartidaFraccion(): void {
    this.http.get('./assets/json/231001/comboSubPartidaFraccion.json').pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.comboSubPartidaFraccion = data as Catalogo[];
    });
  }

  /**
   * @method loadcomboFraccionArancelariaParametros
   * Método que carga las opciones del catálogo de fracción arancelaria desde un archivo JSON.
   */
  loadcomboFraccionArancelariaParametros(): void {
    this.http.get('./assets/json/231001/comboFraccionArancelariaParametros.json').pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data): void => {
      this.comboFraccionArancelariaParametros = data as Catalogo[];
    });
  }

  /**
   * @method obtenerLetraCantidad
   * Convierte la cantidad numérica a su equivalente en texto.
   * @param {string} cantidad - La cantidad a convertir en letra.
   */
  obtenerLetraCantidad(cantidad: string): void {
    this.materiaPrimaForm.patchValue({ cantidadEnLetra: cantidad === '1' ? 'UNO' : '' });
  }

  /**
   * @method cambiaCapituloFraccion
   * Maneja el cambio de capítulo de fracción, limpiando los valores relacionados.
   */
  cambiaCapituloFraccion(): void {
    this.materiaPrimaForm.patchValue({
      clavePartida: '',
      claveSubPartida: '',
      descFraccion: '',
      generica1: ''
    });
    this.comboPartidaFraccion = [];
    this.comboSubPartidaFraccion = [];
    this.comboFraccionArancelariaParametros = [];
    this.loadComboPartidaFraccion();
  }

  /**
   * @method cambiaPartidaFraccion
   * Maneja el cambio de partida de fracción, limpiando los valores relacionados.
   */
  cambiaPartidaFraccion(): void {
    const partidaClave = this.materiaPrimaForm.get('partidaFraccion')?.value;
    this.materiaPrimaForm.patchValue({
      clavePartida: partidaClave,
      claveSubPartida: '',
      descFraccion: '',
      generica1: ''
    });
    this.comboSubPartidaFraccion = [];
    this.comboFraccionArancelariaParametros = [];
    this.loadComboSubPartidaFraccion();
  }

  /**
   * @method cambiaSubPartidaFraccion
   * Maneja el cambio de subpartida de fracción, limpiando los valores relacionados.
   */
  cambiaSubPartidaFraccion(): void {
    const subPartidaClave = this.materiaPrimaForm.get('subPartidaFraccion')?.value;
    this.materiaPrimaForm.patchValue({
      claveSubPartida: subPartidaClave,
      descFraccion: '',
      generica1: ''
    });
    this.comboFraccionArancelariaParametros = [];
    this.loadcomboFraccionArancelariaParametros();
  }

  /**
   * @method cambiaFraccion
   * Maneja el cambio de fracción y valida su vigencia.
   */
  cambiaFraccion(): void {
    const fraccionSeleccionada = this.comboFraccionArancelariaParametros.find(fr => fr.id === this.materiaPrimaForm.get('fraccion')?.value);
    if (fraccionSeleccionada) {
      this.materiaPrimaForm.patchValue({
        descFraccion: fraccionSeleccionada.descripcion,
        generica1: fraccionSeleccionada.id
      });
      this.validaVigenciaFraccion(fraccionSeleccionada.id);
    }
  }

  /**
   * @method cambiaUnidadMedida
   * Maneja el cambio de unidad de medida y actualiza la descripción.
   */
  cambiaUnidadMedida(): void {
    const unidadSeleccionada = this.comboUnidadMedida.find(unidad => unidad.id === this.materiaPrimaForm.get('unidadMedidaComercial.clave')?.value);
    if (unidadSeleccionada) {
      this.materiaPrimaForm.patchValue({ descUnidadMedida: unidadSeleccionada.descripcion });
    }
  }

  /**
   * @method validaVigenciaFraccion
   * Valida la vigencia de la fracción.
   * @param {number} clvFracion - Clave de la fracción a validar.
   */
  validaVigenciaFraccion(clvFracion: number): void {
    if (!clvFracion) {
      this.materiaPrimaForm.patchValue({ fraccion: '' });
    }
  }

  /**
   * @ngOnDestroy
   * Método que se ejecuta cuando el componente es destruido, limpiando los recursos y cancelando las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
