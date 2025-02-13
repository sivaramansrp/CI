/**
 * @module InformacionDeLaComponent
 * @description Este módulo define el componente `InformacionDeLaComponent` que maneja la información de la mercancía.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';

import estadofisico from '../../../../../assets/json/301/estado-fisico-options.json';
import franccionArancelaria from '../../../../../assets/json/301/fraccion-arancelaria-options.json';
import nico from '../../../../../assets/json/301/nico-options.json';

import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { SelectCatalogosComponent } from "../../../../shared/components/select-catalogos/select-catalogos.component";
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-informacion-de-la',
  templateUrl: './informacion-de-la.component.html',
  styleUrl: './informacion-de-la.component.scss',
  imports: [TituloComponent, ReactiveFormsModule, CommonModule, BtnContinuarComponent, SelectCatalogosComponent],
  standalone: true
})
export class InformacionDeLaComponent implements OnInit {

  /**
   * @property {FormGroup} informacionDeLaform - Formulario principal del componente.
   */
  informacionDeLaform!: FormGroup;

  /**
   * @property {CatalogosSelect} fraccionArancelariaOptions - Opciones del catálogo de fracción arancelaria.
   */
  fraccionArancelariaOptions !: CatalogosSelect; 

  /**
   * @property {CatalogosSelect} nicoOptions - Opciones del catálogo de Nico.
   */
  nicoOptions! : CatalogosSelect;

  /**
   * @property {CatalogosSelect} estadoFisicoOptions - Opciones del catálogo de estado físico.
   */
  estadoFisicoOptions!: CatalogosSelect;

  /**
   * @property {number} indice - Índice del paso actual.
   */
  indice: number = 1;

  /**
   * @property {any} datosPasos - Datos de los pasos del formulario.
   */
  datosPasos: any = {
    indice: this.indice,
    txtBtnSig: 'Continuar',
  }

  /**
   * @constructor
   * @param {FormBuilder} formbuilt - Instancia de FormBuilder para crear formularios.
   */
  constructor(private formbuilt: FormBuilder) { }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y configura el formulario con reglas de validación.
   * @memberof InformacionDeLaComponent
   */
  ngOnInit(): void {
    this.informacionDeLaform = this.formbuilt.group({
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: '', disabled: true }],
      nico: ['', Validators.required],
      descripcionNico: [{ value: '', disabled: true }],
      nombreQuimico: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      numeroCAS: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      acondicionamiento: ['', Validators.required]
    });

    this.getFraccionArancelaria();
    this.getNico();
    this.getEstadofisico();
  }

  /**
   * @method getFraccionArancelaria
   * @description Configura las opciones del catálogo de fracción arancelaria.
   * @memberof InformacionDeLaComponent
   */
  public getFraccionArancelaria() {
    this.fraccionArancelariaOptions = {
      labelNombre: 'Fracción arancelaria',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: franccionArancelaria
    }
  }

  /**
   * @method getNico
   * @description Configura las opciones del catálogo de Nico.
   * @memberof InformacionDeLaComponent
   */
  public getNico() {
    this.nicoOptions = {
      labelNombre: 'Nico',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: nico
    }
  }

  /**
   * @method getEstadofisico
   * @description Configura las opciones del catálogo de estado físico.
   * @memberof InformacionDeLaComponent
   */
  public getEstadofisico() {
    this.estadoFisicoOptions = {
      labelNombre: 'Estado Fisico',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: estadofisico
    }
  }

  /**
   * @method valorSeleccionadoFraccion
   * @description Maneja el evento de selección de una fracción arancelaria.
   * @param {any} valor - Valor seleccionado.
   * @memberof InformacionDeLaComponent
   */
  valorSeleccionadoFraccion(valor: any) {
    this.informacionDeLaform.patchValue({
      franccionArancelaria: valor.id
    })

    if (valor.id) {
      this.informacionDeLaform.get('descripcionFraccion')?.enable();
    } else {
      this.informacionDeLaform.get('descripcionFraccion')?.disable();
    }
  }

  /**
   * @method valorSeleccionadoNico
   * @description Maneja el evento de selección de un Nico.
   * @param {any} valor - Valor seleccionado.
   * @memberof InformacionDeLaComponent
   */
  valorSeleccionadoNico(valor: any) {
    this.informacionDeLaform.patchValue({
      nico: valor.id
    })
    if (valor.id) {
      this.informacionDeLaform.get('descripcionNico')?.enable();
    } else {
      this.informacionDeLaform.get('descripcionNico')?.disable();
    }
  }

  /**
   * @method valorSeleccionadoEstado
   * @description Maneja el evento de selección de un estado físico.
   * @param {any} valor - Valor seleccionado.
   * @memberof InformacionDeLaComponent
   */
  valorSeleccionadoEstado(valor: any) {
    this.informacionDeLaform.patchValue({
      estadoFisico: valor.id
    })
  }

  /**
   * @method getValorIndice
   * @description Registra el valor del evento en la consola.
   * @param {unknown} event - El evento a registrar.
   * @memberof InformacionDeLaComponent
   */
  getValorIndice(event: unknown): void {
    console.log(event);
  }
}