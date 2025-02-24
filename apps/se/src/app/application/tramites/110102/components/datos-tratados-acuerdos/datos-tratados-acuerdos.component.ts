/**
 * @module DatosTratadosAcuerdosComponent
 *  Este módulo define el componente `DatosTratadosAcuerdosComponent` que maneja la información de los tratados y acuerdos.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';
import { TableComponent, TableData } from '@ng-mf/data-access-user';
import { DatostratadosacuerdosService } from 'libs/shared/data-access-user/src/core/services/110102/datostratadosacuerdos.service';

@Component({
  selector: 'app-datos-tratados-acuerdos',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './datos-tratados-acuerdos.component.html',
  styleUrl: './datos-tratados-acuerdos.component.scss',
})
export class DatosTratadosAcuerdosComponent implements OnInit, OnDestroy {

  tableoptions = {
    checkbox : false
  };
  /**
   * @property {TableData} tableData - Datos que se mostrarán en la tabla.
   */
  public tableData!: TableData;

  /**
   * @property {Subject<void>} destroyed$ - Subject para manejar la desuscripción cuando el componente se destruye.
   */
  private destroyed$ = new Subject<void>();

  /**
   * @constructor
   * Servicio para obtener datos para el componente.
   */
  constructor(private service: DatostratadosacuerdosService) {
    // Lógica del constructor puede ser añadida aquí si es necesario
  }

  /**
   * @method ngOnInit
   *  Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene datos del servicio y los asigna a tableData.
   * @memberof DatosTratadosAcuerdosComponent
   */
  ngOnInit(): void {
    this.service.getData().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: TableData) => {
        this.tableData = data;
      }
    );
  }

  /**
   * @method ngOnDestroy
   *  Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   * @memberof DatosTratadosAcuerdosComponent
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}