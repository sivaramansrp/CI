import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { COMPLEMENTO_DE_PLANTA } from '../../constantes/complementar-planta.enum';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente para gestionar los montos de inversión.
 * @class MontosDeInversionComponent
 */
@Component({
  selector: 'app-montos-de-inversion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './montos-de-inversion.component.html',
  styleUrl: './montos-de-inversion.component.css',
})
export class MontosDeInversionComponent {
  /**
   * Formulario para gestionar los montos de inversión.
   * @property {FormGroup} montosDeInversionForm
   */
  montosDeInversionForm!: FormGroup;

  /**
   * Opciones disponibles para el tipo de inversión.
   * @property {Array} tipoOptions
   */
  tipoOptions = [];

  /**
   * Lista de montos de inversión.
   * @property {Array} montosDeInversion
   */
  montosDeInversion = [];

  /**
   * Tipo de selección para la tabla de montos de inversión.
   * @property {TablaSeleccion} montosDeInversionTablaSeleccion
   */
  montosDeInversionTablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de encabezados para la tabla de montos de inversión.
   * @property {any} montosDeInversionEncabezado
   */
  montosDeInversionEncabezado = COMPLEMENTO_DE_PLANTA;

  /**
   * Datos para la tabla de montos de inversión.
   * @property {Array} montosDeInversionDatos
   */
  montosDeInversionDatos = [];

  /**
   * Constructor del componente.
   * @constructor
   * @param {FormBuilder} fb - Servicio para construcción de formularios
   */
  constructor(private fb: FormBuilder, private ubicaccion: Location) {
    this.createMontosDeInversionForm();
  }

  /**
   * Crea el formulario de montos de inversión.
   * @method createMontosDeInversionForm
   * @returns {void}
   */
  createMontosDeInversionForm(): void {
    this.montosDeInversionForm = this.fb.group({
      tipo: [''],
      cantidad: [''],
      descripsion: [''],
      mnx: [''],
    });
  }

  /**
   * Vuelve a la ubicación anterior en el historial del navegador.
   * @returns {void}
   */
  regrasar(): void {
    this.ubicaccion.back();
  }
}
