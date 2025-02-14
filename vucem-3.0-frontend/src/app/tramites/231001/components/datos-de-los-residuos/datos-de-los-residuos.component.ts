/**
 * @module DatosDeLosResiduosComponent
 * @description Este módulo define el componente `DatosDeLosResiduosComponent` que maneja la información de los residuos.
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BtnContinuarComponent } from "../../../../shared/components/btn-continuar/btn-continuar.component";
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { DatosPasos } from '../../../../core/models/shared/components.model';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

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
   * @property {FormGroup} materiaPrimaForm - Formulario principal del componente.
   */
  materiaPrimaForm: FormGroup;

  /**
   * @property {boolean} mostrarMsgCantSe06 - Indica si se debe mostrar el mensaje de cantidad SE06.
   */
  mostrarMsgCantSe06: boolean = false;

  /**
   * @property {DatosPasos} datosPasosGuardar - Datos de los pasos del formulario.
   */
  datosPasosGuardar: DatosPasos = {
    txtBtnSig: "Guardar",
    txtBtnAnt: "Cancelar",
    indice: 2,
    nroPasos: 0
  }

  /**
   * @property {Catalogo[]} comboUnidadMedida - Opciones del catálogo de unidad de medida.
   */
  comboUnidadMedida: Catalogo[] = UnidadMedida;

  /**
   * @property {Catalogo[]} comboCapituloFraccion - Opciones del catálogo de capítulo de fracción.
   */
  comboCapituloFraccion: Catalogo[] = CapituloFraccion;

  /**
   * @property {Catalogo[]} comboPartidaFraccion - Opciones del catálogo de partida de fracción.
   */
  comboPartidaFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboSubPartidaFraccion - Opciones del catálogo de subpartida de fracción.
   */
  comboSubPartidaFraccion!: Catalogo[];

  /**
   * @property {Catalogo[]} comboFraccionArancelariaParametros - Opciones del catálogo de fracción arancelaria.
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
      descripcionMercancia: ['', [Validators.required, Validators.maxLength(120)]],
      generica2: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,6})?$'), Validators.maxLength(18)]],
      cantidadEnLetra: [{ value: '', disabled: true }, Validators.maxLength(256)],
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
   * @method loadComboPartidaFraccion
   * @description Carga las opciones del catálogo de partida de fracción.
   * @memberof DatosDeLosResiduosComponent
   */
  loadComboPartidaFraccion(): void {
    this.comboPartidaFraccion = PartidaFraccion;
  }

  /**
   * @method loadComboSubPartidaFraccion
   * @description Carga las opciones del catálogo de subpartida de fracción.
   * @memberof DatosDeLosResiduosComponent
   */
  loadComboSubPartidaFraccion(): void {
    this.comboSubPartidaFraccion = SubPartidaFraccion;
  }

  /**
   * @method loadComboFraccion
   * @description Carga las opciones del catálogo de fracción arancelaria.
   * @memberof DatosDeLosResiduosComponent
   */
  loadComboFraccion(): void {
    this.comboFraccionArancelariaParametros = FraccionArancelariaParametros;
  }

  /**
   * @method obtenerLetraCantidad
   * @description Obtiene la letra correspondiente a la cantidad.
   * @param {string} cantidad - La cantidad a convertir en letra.
   * @memberof DatosDeLosResiduosComponent
   */
  obtenerLetraCantidad(cantidad: string): void {
    if (cantidad === '1') {
      this.materiaPrimaForm.patchValue({ cantidadEnLetra: 'UNO' });
    } else {
      this.materiaPrimaForm.patchValue({ cantidadEnLetra: '' });
    }
  }

  /**
   * @method cambiaCapituloFraccion
   * @description Maneja el cambio de capítulo de fracción.
   * @memberof DatosDeLosResiduosComponent
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
   * @description Maneja el cambio de partida de fracción.
   * @memberof DatosDeLosResiduosComponent
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
   * @description Maneja el cambio de subpartida de fracción.
   * @memberof DatosDeLosResiduosComponent
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
   * @method cambiaFraccion
   * @description Maneja el cambio de fracción.
   * @memberof DatosDeLosResiduosComponent
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
   * @description Maneja el cambio de unidad de medida.
   * @memberof DatosDeLosResiduosComponent
   */
  cambiaUnidadMedida(): void {
    const unidadSeleccionada = this.comboUnidadMedida.find(unidad => unidad.id === this.materiaPrimaForm.get('unidadMedidaComercial.clave')?.value);
    if (unidadSeleccionada) {
      this.materiaPrimaForm.patchValue({
        descUnidadMedida: unidadSeleccionada.descripcion
      });
    }
  }

  /**
   * @method validaVigenciaFraccion
   * @description Valida la vigencia de la fracción.
   * @param {number} clvFracion - Clave de la fracción a validar.
   * @memberof DatosDeLosResiduosComponent
   */
  validaVigenciaFraccion(clvFracion: number): void {
    if (!clvFracion) {
      this.materiaPrimaForm.patchValue({ fraccion: '' });
    }
  }
}