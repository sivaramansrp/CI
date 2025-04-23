import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TituloComponent } from '@libs/shared/data-access-user/src';

import { Solicitud150103Query } from '../../estados/solicitud150103.query';
import { Solicitud150103State } from '../../estados/solicitud150103.store';
import { Solicitud150103Store } from '../../estados/solicitud150103.store';

/**
 * Componente para gestionar los datos del reporte anual.
 */
@Component({
  selector: 'app-datos-de-reporte-anual',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule],
  templateUrl: './datos-de-reporte-anual.component.html',
  styleUrl: './datos-de-reporte-anual.component.scss',
})
export class DatosDeReporteAnualComponent implements OnInit, OnDestroy {
  /**
   * Estado de la solicitud 150103.
   */
  solicitud150103State: Solicitud150103State = {} as Solicitud150103State;

  /**
   * Formulario reactivo para el reporte anual.
   */
  formReporteAnnual!: FormGroup;

  /**
   * Subject utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param solicitud150103Store - Store para gestionar el estado de la solicitud.
   * @param solicitud150103Query - Query para obtener datos de la solicitud.
   */
  constructor(
    public fb: FormBuilder,
    private solicitud150103Store: Solicitud150103Store,
    private solicitud150103Query: Solicitud150103Query
  ) {}

  /**
   * Método de inicialización del componente.
   * Configura el formulario y suscribe a los cambios en el estado de la solicitud.
   */
  ngOnInit(): void {
    this.formReporteAnnual = this.fb.group({
      ventasTotales: [
        { value: this.solicitud150103State.ventasTotales, disabled: false },
        [Validators.maxLength(16)],
      ],
      totalExportaciones: [
        {
          value: this.solicitud150103State.totalExportaciones,
          disabled: false,
        },
        [Validators.maxLength(16)],
      ],
      totalImportaciones: [
        {
          value: this.solicitud150103State.totalImportaciones,
          disabled: true,
        },
        [Validators.maxLength(16)],
      ],
      saldo: [{ value: this.solicitud150103State.saldo, disabled: true }],
      porcentajeExportacion: [
        {
          value: this.solicitud150103State.porcentajeExportacion,
          disabled: true,
        },
      ],
    });

    this.solicitud150103Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud150103State) => {
          this.solicitud150103State = respuesta;
          this.formReporteAnnual.patchValue({
            ventasTotales: this.solicitud150103State.ventasTotales,
            totalExportaciones: this.solicitud150103State.totalExportaciones,
            totalImportaciones: this.solicitud150103State.totalImportaciones,
            saldo: this.solicitud150103State.saldo,
            porcentajeExportacion:
              this.solicitud150103State.porcentajeExportacion,
          });
        })
      )
      .subscribe();
  }

  /**
   * Calcula los valores del reporte anual, incluyendo porcentaje de exportación y saldo.
   */
  calcularReporteAnnual(): void {
    const TOTAL_EXPORTACIONES =
      parseFloat(this.formReporteAnnual.get('totalExportaciones')?.value) || 0;
    const VENTAS_TOTALES =
      parseFloat(this.formReporteAnnual.get('ventasTotales')?.value) || 0;
    const TOTAL_IMPORTACIONES =
      parseFloat(this.formReporteAnnual.get('totalImportaciones')?.value) || 0;
    const TOTAL_PORCENTAJE: number =
      (TOTAL_EXPORTACIONES / VENTAS_TOTALES) * 100;
    const TOTAL_PORCENTAJE_VALUE = Number.isFinite(TOTAL_PORCENTAJE)
      ? TOTAL_PORCENTAJE.toString()
      : '0';
    this.solicitud150103Store.actualizarPorcentajeExportacion(
      TOTAL_PORCENTAJE_VALUE
    );
    const TOTAL_SALDO: number = TOTAL_EXPORTACIONES - TOTAL_IMPORTACIONES;
    this.solicitud150103Store.actualizarSaldo(TOTAL_SALDO.toString());
  }

  /**
   * Actualiza el valor de las exportaciones totales y recalcula el reporte anual.
   * @param evento - Evento del input que contiene el valor de exportaciones.
   */
  obtenerTotalExportaciones(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud150103Store.actualizarTotalExportaciones(VALOR);
    this.calcularReporteAnnual();
  }

  /**
   * Actualiza el valor de las ventas totales y recalcula el reporte anual.
   * @param evento - Evento del input que contiene el valor de ventas.
   */
  obtenerVentasTotales(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud150103Store.actualizarVentasTotales(VALOR);
    this.calcularReporteAnnual();
  }

  /**
   * Actualiza el valor de las importaciones totales y recalcula el reporte anual.
   * @param evento - Evento del input que contiene el valor de importaciones.
   */
  obtenerTotalImportaciones(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud150103Store.actualizarTotalImportaciones(VALOR);
    this.calcularReporteAnnual();
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Notifica a las suscripciones que deben finalizar y completa el Subject.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(); // Notifica a las suscripciones que deben finalizar
    this.destroyed$.complete(); // Completa el Subject para evitar fugas de memoria
  }
}
