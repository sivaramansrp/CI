import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

import administrarResiduosMesa from '../../../../../assets/json/231001/administrar-residuos-mesa.json';

/**
 * Componente para administrar residuos
 */
@Component({
  selector: 'app-administrar-residuos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, TableComponent],
  templateUrl: './administrar-residuos.component.html',
  styleUrl: './administrar-residuos.component.scss',
})
export class AdministrarResiduosComponent implements OnInit {
  /**
   * Datos del encabezado de la tabla
   */
  tableHeaderData: string[] = [];
  /**
   * Datos del cuerpo de la tabla
   */
  tableBodyData: { tbodyData: string[] }[] = [];
  /**
   * Datos de la tabla obtenidos de un archivo JSON
   */
  public getEstablecimientoTableData = administrarResiduosMesa;
  /**
   * Formulario para el recuento total de filas
   */
  formForTotalCount!: FormGroup;
  /**
   * Constructor de la clase
   * @param fb - FormBuilder para crear formularios reactivos
   */
  constructor(private fb: FormBuilder) {
    // constructor
  }
  /**
   * Método de inicialización del componente
   */
  ngOnInit(): void {
    this.getEstablecimiento();
    this.formularioTotalCount();
    this.actualizarRecuentoTotalDeFilas();
  }

  /**
   * Obtiene los datos del establecimiento y los asigna a las variables de la tabla
   */
  public getEstablecimiento(): void {
    this.tableHeaderData = this.getEstablecimientoTableData.tableHeader;
    this.tableBodyData = this.getEstablecimientoTableData.tableBody;
  }

  /**
   * Crea el formulario para el recuento total de filas
   */
  formularioTotalCount(): void {
    this.formForTotalCount = this.fb.group({
      recuentoTotalDeFilas: [{ value: '', disabled: true }],
    });
    // this.formForTotalCount.controls['recuentoTotalDeFilas'].disable();
    this.formForTotalCount.controls['recuentoTotalDeFilas'].disable();
  }

  /**
   * Actualiza el recuento total de filas en el formulario
   */
  public actualizarRecuentoTotalDeFilas(): void {
    const totalRowCount = this.tableBodyData.length;
    this.formForTotalCount.patchValue({ recuentoTotalDeFilas: totalRowCount });
  }
}
