import { CommonModule } from '@angular/common';
 
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { UppercaseDirective } from 'libs/shared/data-access-user/src/tramites/directives/Uppercase/uppercase.directive';
 
import { Component, OnInit } from '@angular/core';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { TEXTOS } from 'libs/shared/data-access-user/src/tramites/constantes/octava-temporal.enum';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
 
import establecimientoTable from 'libs/shared/theme/assets/json/130109/partidas-de-la.json';
import fraccionArancelariaTIGIE from 'libs/shared/theme/assets/json/130109/partidas-de-la-catalogos-select.json';
 
import { CatalogoSelectComponent } from 'libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
 
@Component({
  selector: 'app-partidas-de-la',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    UppercaseDirective,
    AlertComponent,
    TableComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './partidas-de-la.component.html',
  styleUrl: './partidas-de-la.component.scss',
})
export class PartidasDeLaComponent implements OnInit {
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
  fraccionArancelariaTIGIE: Catalogo[] = fraccionArancelariaTIGIE.catalogos;
 
  /**
   * Datos del encabezado de la tabla.
   * @type {string[]}
   */
  tableHeaderData: string[] = [];
 
  /**
   * Datos del cuerpo de la tabla.
   * @type {Array<{ tbodyData: string[] }>}
   */
  tableBodyData: { tbodyData: string[] }[] = [];
 
  /**
   * Datos de la tabla de establecimiento.
   * @type {any}
   */
  public getEstablecimientoTableData = establecimientoTable;
 
  /**
   * Constructor del formulario reactivo.
   * @param {FormBuilder} fb - Constructor del formulario reactivo.
   */
  constructor(private fb: FormBuilder) {}
 
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
      cantidad: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.maxLength(18),
        ],
      ],
      fraccionArancelariaTIGIE: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      valorPartidaUSD: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
          Validators.maxLength(20),
        ],
      ],
    });
  }
 
  /**
   * Método para calcular los totales de cantidad y valor en USD.
   */
  calculateTotals(): void {
    const cantidadTotal = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[0]),
      0
    );
    const valorTotalUSD = this.tableBodyData.reduce(
      (sum: number, item: { tbodyData: string[] }) =>
        sum + parseFloat(item.tbodyData[5]),
      0
    );
 
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
  fraccionArancelariaTIGIESelection() : void{
    // Implementar el método o eliminarlo si no es necesario
  }
 
  /**
   * Método para obtener los datos de establecimiento.
   */
  public getEstablecimiento() {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }
 
  /**
   * Método para validar el formulario al hacer clic en el botón
   */
  validarYEnviarFormulario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log(
        'El formulario tiene errores. Corríjalos antes de continuar.'
      );
    } else {
      console.log('Formulario enviado con éxito', this.form.value);
    }
  }
 
  /**
   * Método para verificar si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control del formulario.
   * @returns {boolean} - Retorna true si el control es inválido, de lo contrario false.
   */
  esInvalido(nombreControl: string): boolean {
    const control = this.form.get(nombreControl);
    return control
      ? control.invalid && (control.touched || control.dirty)
      : false;
  }
}