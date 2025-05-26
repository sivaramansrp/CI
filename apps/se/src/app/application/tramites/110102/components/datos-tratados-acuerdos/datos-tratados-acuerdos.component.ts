/**
 * Este módulo define el componente `DatosTratadosAcuerdosComponent` que maneja la información de los tratados y acuerdos.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';

import { TablaDinamicaComponent, TablaSeleccion } from '@ng-mf/data-access-user';

import { CONFIGURACION_ACCIONISTAS } from '@ng-mf/data-access-user';
 import { DatostratadosacuerdosService } from '@ng-mf/data-access-user';

/**
 * Este módulo define el componente `DatosTratadosAcuerdosComponent` que maneja la información de los tratados y acuerdos.
 */
@Component({
  selector: 'app-datos-tratados-acuerdos',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent],
  templateUrl: './datos-tratados-acuerdos.component.html',
  styleUrl: './datos-tratados-acuerdos.component.scss',
})
export class DatosTratadosAcuerdosComponent implements OnInit, OnDestroy {

  /**
   * Configuración de la tabla que se utilizará en el componente.
   * @type {any}
   */
  configuracionTabla = CONFIGURACION_ACCIONISTAS;

  /**
   * Selección de la tabla inicializada como indefinida.
   * @type {TablaSeleccion}
   */
  seleccionTabla = TablaSeleccion.UNDEFINED;

  /**
   * Datos que se mostrarán en la tabla.
   * @type {any}
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public datosTabla!:any;

  /**
   * Subject para manejar la desuscripción cuando el componente se destruye.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * Servicio para obtener datos para el componente.
   * @param {DatostratadosacuerdosService} service - Servicio para obtener datos de tratados y acuerdos.
   */
  constructor(private service: DatostratadosacuerdosService) {
    // Lógica del constructor puede ser añadida aquí si es necesario
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Obtiene datos del servicio y los asigna a tableData.
   */
  ngOnInit(): void {
    this.service.getData().pipe(
      takeUntil(this.destroyed$)
    ).subscribe(
      (data: object) => {
        this.datosTabla = data;
      }
    );
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject destroyed$ para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}