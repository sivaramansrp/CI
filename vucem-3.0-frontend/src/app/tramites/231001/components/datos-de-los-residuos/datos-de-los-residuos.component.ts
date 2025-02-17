/**
 * @module DatosDeLosResiduosComponent
 * @description Este módulo define el componente `DatosDeLosResiduosComponent` que maneja la información de los residuos.
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

// Importación de componentes compartidos
import { BtnContinuarComponent } from "../../../../shared/components/btn-continuar/btn-continuar.component";
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { DatosPasos } from '../../../../core/models/shared/components.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

// Importación de JSON con datos para los catálogos
import CapituloFraccion from '../../../../../assets/json/231001/comboCapituloFraccion.json';
import FraccionArancelariaParametros from '../../../../../assets/json/231001/comboFraccionArancelariaParametros.json';
import PartidaFraccion from '../../../../../assets/json/231001/comboPartidaFraccion.json';
import SubPartidaFraccion from '../../../../../assets/json/231001/comboSubPartidaFraccion.json';
import UnidadMedida from '../../../../../assets/json/231001/comboUnidadMedida.json';

@Component({
  selector: 'app-datos-de-los-residuos',
  templateUrl: './datos-de-los-residuos.component.html',
  styleUrl: './datos-de-los-residuos.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CatalogoSelectComponent, CommonModule, TituloComponent, BtnContinuarComponent]
})
export class DatosDeLosResiduosComponent {

  /**
   * @property {FormGroup} materiaPrimaForm
   * @description Formulario principal del componente para la gestión de datos de residuos.
   */
  materiaPrimaForm: FormGroup;

  /**
   * @property {boolean} mostrarMsgCantSe06
   * @description Indica si se debe mostrar el mensaje de cantidad SE06.
   */
  mostrarMsgCantSe06: boolean = false;

  /**
   * @property {DatosPasos} datosPasosGuardar
   * @description Objeto que maneja los datos de los pasos del formulario.
   */
  datosPasosGuardar: DatosPasos = {
    txtBtnSig: "Guardar",
    txtBtnAnt: "Cancelar",
    indice: 2,
    nroPasos: 0
  };

  /**
   * @property {Catalogo[]} comboUnidadMedida
   * @description Opciones del catálogo de unidad de medida.
   */
  comboUnidadMedida: Catalogo[] = UnidadMedida;

  /**
   * @property {Catalogo[]} comboCapituloFraccion
   * @description Opciones del catálogo de capítulo de fracción.
   */
  comboCapituloFraccion: Catalogo[] = CapituloFraccion;

  /**
   * @property {Catalogo[]} comboPartidaFraccion
   * @description Opciones del catálogo de partida de fracción.
   */
  comboPartidaFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboSubPartidaFraccion
   * @description Opciones del catálogo de subpartida de fracción.
   */
  comboSubPartidaFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboFraccionArancelariaParametros
   * @description Opciones del catálogo de fracción arancelaria.
   */
  comboFraccionArancelariaParametros!: Catalogo[];

  /**
   * @constructor
   * @param {FormBuilder} fb - Instancia de FormBuilder para crear formularios.
   */
  constructor(private fb: FormBuilder) {
    this.materiaPrimaForm = this.fb.group({
      descUnidadMedida: [''],
      descFraccion: [''],
      generica1: [''],
      clavePartida: [''],
      claveSubPartida: [''],
      
      descripcionMercancia: ['', [Validators.required, Validators.maxLength(120)]], // Descripción de la mercancía (requerido, máximo 120 caracteres)
      generica2: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,6})?$'), Validators.maxLength(18)]], //Valor numérico (requerido, número entero o decimal con hasta 6 decimales, máximo 18 caracteres).
      cantidadEnLetra: [{ value: '', disabled: true }, Validators.maxLength(256)], //Cantidad en letra (deshabilitado, máximo 256 caracteres).
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
   * Carga las opciones del catálogo de partida de fracción.
   */
  loadComboPartidaFraccion(): void {
    this.comboPartidaFraccion = PartidaFraccion;
  }

  /**
   * Carga las opciones del catálogo de subpartida de fracción.
   */
  loadComboSubPartidaFraccion(): void {
    this.comboSubPartidaFraccion = SubPartidaFraccion;
  }

  /**
   * Carga las opciones del catálogo de fracción arancelaria.
   */
  loadComboFraccion(): void {
    this.comboFraccionArancelariaParametros = FraccionArancelariaParametros;
  }

  /**
   * Convierte la cantidad numérica a su equivalente en texto.
   * @param {string} cantidad - La cantidad a convertir en letra.
   */
  obtenerLetraCantidad(cantidad: string): void {
    this.materiaPrimaForm.patchValue({ cantidadEnLetra: cantidad === '1' ? 'UNO' : '' });
  }

  /**
   * Maneja el cambio de capítulo de fracción.
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
   * Maneja el cambio de partida de fracción.
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
   * Maneja el cambio de subpartida de fracción.
   */
  cambiaSubPartidaFraccion(): void {
    const subPartidaClave = this.materiaPrimaForm.get('subPartidaFraccion')?.value;
    this.materiaPrimaForm.patchValue({
      claveSubPartida: subPartidaClave,
      descFraccion: '',
      generica1: ''
    });
    this.comboFraccionArancelariaParametros = [];
    this.loadComboFraccion();
  }

  /**
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
   * Maneja el cambio de unidad de medida.
   */
  cambiaUnidadMedida(): void {
    const unidadSeleccionada = this.comboUnidadMedida.find(unidad => unidad.id === this.materiaPrimaForm.get('unidadMedidaComercial.clave')?.value);
    if (unidadSeleccionada) {
      this.materiaPrimaForm.patchValue({ descUnidadMedida: unidadSeleccionada.descripcion });
    }
  }

  /**
   * Valida la vigencia de la fracción.
   * @param {number} clvFracion - Clave de la fracción a validar.
   */
  validaVigenciaFraccion(clvFracion: number): void {
    if (!clvFracion) {
      this.materiaPrimaForm.patchValue({ fraccion: '' });
    }
    else{
      // Lógica de validación de vigencia de fracción
    }
  }
}
