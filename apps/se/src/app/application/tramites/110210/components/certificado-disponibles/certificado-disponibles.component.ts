/**
 * Este módulo define el componente `CertificadoDisponiblesComponent` que maneja la información de los tratados y acuerdos.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject, takeUntil } from 'rxjs';

import { CERTIFICADO_DISPONIBLES_COLUMNAS, CertificadoDisponibles, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@ng-mf/data-access-user';

import { CertificadoDisponiblesService } from '@ng-mf/data-access-user';

/**
 * Este módulo define el componente `CertificadoDisponiblesComponent` que maneja la información de los tratados y acuerdos.
 */
@Component({
  selector: 'app-certificado-disponibles',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent],
  templateUrl: './certificado-disponibles.component.html',
  styleUrl: './certificado-disponibles.component.scss',
})
export class CertificadoDisponiblesComponent<T> implements OnInit, OnDestroy {

  /**
   * Configuración de la tabla que se utilizará en el componente.
   * @type {any}
   */
  configuracionTabla = CERTIFICADO_DISPONIBLES_COLUMNAS;

  /**
   * Selección de la tabla inicializada como indefinida.
   * @type {TablaSeleccion}
   */
  seleccionTabla = TablaSeleccion.UNDEFINED;

  /**
   * Datos que se mostrarán en la tabla.
   * @type {any}
   */
  public datosTabla!: CertificadoDisponibles[];

  /**
   * Subject para manejar la desuscripción cuando el componente se destruye.
   * @type {Subject<void>}
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * Servicio para obtener datos para el componente.
   * @param {CertificadoDisponiblesService} service - Servicio para obtener datos de tratados y acuerdos.
   */
  constructor(private service: CertificadoDisponiblesService) {
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
      (data: CertificadoDisponibles[]) => {
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