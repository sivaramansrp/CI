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
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';


@Component({
  selector: 'app-informacion-de-la',
  templateUrl: './informacion-de-la.component.html',
  styleUrl: './informacion-de-la.component.scss',
  imports: [TituloComponent, ReactiveFormsModule, CommonModule, BtnContinuarComponent, CatalogoSelectComponent],
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
  fraccionArancelariaOptions: Catalogo[] = franccionArancelaria;

  /**
   * @property {CatalogosSelect} nicoOptions - Opciones del catálogo de Nico.
   */
  nicoOptions: Catalogo[] = nico;

  /**
   * @property {CatalogosSelect} estadoFisicoOptions - Opciones del catálogo de estado físico.
   */
  estadoFisicoOptions: Catalogo[] = estadofisico;

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
  constructor(private formbuilt: FormBuilder) {}

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
  }

  /**
   * @method valorSeleccionadoFraccion
   * @description Maneja el evento de selección de una fracción arancelaria.
   * @param {any} valor - Valor seleccionado.
   * @memberof InformacionDeLaComponent
   */
  valorSeleccionadoFraccion() {
    if (this.informacionDeLaform.get('fraccionArancelaria')?.value) {
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
  valorSeleccionadoNico() {
    if (this.informacionDeLaform.get('nico')?.value) {
      this.informacionDeLaform.get('descripcionNico')?.enable();
    } else {
      this.informacionDeLaform.get('descripcionNico')?.disable();
    }
  }

 
}