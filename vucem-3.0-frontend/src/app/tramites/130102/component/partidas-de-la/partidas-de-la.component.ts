import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { UppercaseDirective } from '../../../../shared/directives/Uppercase/uppercase.directive';

import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosSelect } from '../../../../core/models/shared/components.model';
import { TEXTOS } from '../../../../shared/constantes/octava-temporral.enum';
import { TableComponent } from '../../../../shared/components/table/table.component';

import establecimientoTable from '../../../../../assets/json/130102/partidas-de-la.json'

@Component({
  selector: 'app-partidas-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    UppercaseDirective,
    AlertComponent,
    SelectCatalogosComponent,
    TableComponent
  ],
  templateUrl: './partidas-de-la.component.html',
  styleUrl: './partidas-de-la.component.scss'
})
export class PartidasDeLaComponent implements OnInit {
  /**
   * @property {FormGroup} form - Formulario reactivo utilizado para gestionar los datos de las partidas de la mercancía.
   */
  form!: FormGroup;

   /**
   * @property {FormGroup} formForTotalCount - Formulario reactivo utilizado para gestionar los totales de cantidad y valor en USD.
   */
  formForTotalCount!: FormGroup;

  /**
   * @property {any} TEXTOS - Constantes de texto utilizadas en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * @property {CatalogosSelect} fraccionArancelariaTIGIE - Datos del catálogo de fracciones arancelarias TIGIE.
   */
  fraccionArancelariaTIGIE: CatalogosSelect = {
    labelNombre: '',
    required: false,
    primerOpcion: 'Seleccione una Fraccion Arancelaria TIGIE',
    catalogos: [
      { id: 1, descripcion: '98020018 Mercancias para el Pro' },
      { id: 2, descripcion: '98020019 Mercancias para el Pro' },
      { id: 3, descripcion: '98020020 Mercancias para el Pro' }
    ]
  };
  
  /**
   * @property {string[]} tableHeaderData - Datos del encabezado de la tabla.
   */
  tableHeaderData: string[] = [];

  /**
   * @property {Array<{ tbodyData: string[] }>} tableBodyData - Datos del cuerpo de la tabla.
   */
  tableBodyData: { tbodyData: string[] }[] = [];

  /**
   * @property {any} getEstablecimientoTableData - Datos de la tabla de establecimiento.
   */
  public getEstablecimientoTableData = establecimientoTable;

   /**
   * @constructor
   * @param {FormBuilder} fb - Constructor del formulario reactivo.
   */
  constructor(private fb: FormBuilder) { }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit() {
    this.crearFormulario();
    this.formularioTotalCount();
    this.getEstablecimiento();
    this.calculateTotals();

    this.formForTotalCount.controls['cantidadTotal'].disable();
    this.formForTotalCount.controls['valorTotalUSD'].disable();
  }

  /**
   * Método para crear el formulario reactivo.
   */
  crearFormulario(): void {
    this.form = this.fb.group({
      cantidad: ['', Validators.required],
      fraccionArancelariaTIGIE: [''],
      descripcion: ['', Validators.required],
      valorPartidaUSD: ['', [Validators.required, Validators.min(0)]]
    });
  }

   /**
   * Método para calcular los totales de cantidad y valor en USD.
   */
  calculateTotals(): void {
    const cantidadTotal = this.tableBodyData.reduce((sum: number, item: { tbodyData: string[] }) => sum + parseFloat(item.tbodyData[0]), 0);
    const valorTotalUSD = this.tableBodyData.reduce((sum: number, item: { tbodyData: string[] }) => sum + parseFloat(item.tbodyData[5]), 0);

    this.formForTotalCount.controls['cantidadTotal'].setValue(cantidadTotal);
    this.formForTotalCount.controls['valorTotalUSD'].setValue(valorTotalUSD);
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
  fraccionArancelariaTIGIESelection(aduana: Catalogo) {
    // Implementar el método o eliminarlo si no es necesario
  }

  /**
   * Método para obtener los datos de establecimiento.
   */
  public getEstablecimiento() {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }
}
