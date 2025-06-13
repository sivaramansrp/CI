import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Solicitud150101Query } from '../../estados/solicitud150101.query';
import { Solicitud150101State } from '../../estados/solicitud150101.store';
import { Solicitud150101Store } from '../../estados/solicitud150101.store';
import { SolicitudService } from '../../services/registro-solicitud-anual.service';

/**
 * @component
 * @description Este componente es responsable de manejar los datos y el formulario del reporte anual.
 */
@Component({
  selector: 'app-datos-de-reporte-anual',
  templateUrl: './datos-de-reporte-anual.component.html',
  styleUrl: './datos-de-reporte-anual.component.scss',
})

/**
 * @class DatosDeReporteAnnualComponent
 * @implements {OnInit, OnDestroy}
 * @description Este componente maneja la lógica del formulario para capturar los datos del reporte anual.
 */
export class DatosDeReporteAnnualComponent implements OnInit, OnDestroy {
  /**
   * @description Formulario reactivo para capturar los datos del reporte anual.
   */
  formReporteAnnual!: FormGroup;

  /**
   * @property {boolean} formularioDeshabilitado
   * @description Indica si el formulario está deshabilitado (solo lectura).
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @description Estado actual de la solicitud, obtenido desde el store.
   */
  solicitud150101State: Solicitud150101State = {} as Solicitud150101State;

  /**
   * @description Subject para la gestión de las suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * @constructor
   * @param fb - Servicio para la construcción de formularios reactivos.
   * @param solicitud150101Store - Store que gestiona el estado del reporte.
   * @param solicitud150101Query - Query para seleccionar datos del estado del reporte.
   * @param solicitudService - Servicio para obtener y enviar datos relacionados con el reporte.
   * @param consultaioQuery - Query para gestionar el estado de la consulta.
   */
  constructor(
    public fb: FormBuilder,
    public solicitud150101Store: Solicitud150101Store,
    public solicitud150101Query: Solicitud150101Query,
    public solicitudService: SolicitudService,
    public consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * @returns {void}
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Inicializa el estado del formulario basado en si es de solo lectura o no.
   * Si es de solo lectura, llama a `guardarDatosFormulario` para cargar los datos del formulario.
   * Si no es de solo lectura, inicializa el formulario con `inicializarFormulario`.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * @method guardarDatosFormulario
   * @description Guarda los datos del formulario y configura el estado de los campos.
   * Si el formulario es de solo lectura, deshabilita los campos del formulario.
   * Si no es de solo lectura, habilita los campos del formulario.
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();

    if (this.formularioDeshabilitado) {
      this.formReporteAnnual.disable();
    } else if (!this.formularioDeshabilitado) {
      this.formReporteAnnual.enable();
    }
  }

  /**
   * @method inicializarFormulario
   * @description Inicializa el formulario reactivo con los valores del estado de la solicitud.
   * Configura los validadores y el estado de los campos según corresponda.
   * @returns {void}
   */
  inicializarFormulario(): void {
    this.formReporteAnnual = this.fb.group({
      ventasTotales: [
        { value: this.solicitud150101State.ventasTotales, disabled: false },
        [Validators.required, Validators.maxLength(16)],
      ],
      totalExportaciones: [
        {
          value: this.solicitud150101State.totalExportaciones,
          disabled: false,
        },
        [Validators.required, Validators.maxLength(16)],
      ],
      totalImportaciones: [
        {
          value: this.solicitud150101State.totalImportaciones,
          disabled: true,
        },
        [Validators.required, Validators.maxLength(16)],
      ],
      saldo: [
        { value: this.solicitud150101State.saldo, disabled: true },
        [Validators.maxLength(16)],
      ],
      porcentajeExportacion: [
        {
          value: this.solicitud150101State.porcentajeExportacion,
          disabled: true,
        },
        [Validators.maxLength(16)],
      ],
    });

    this.solicitud150101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud150101State) => {
          this.solicitud150101State = respuesta;
          this.formReporteAnnual.patchValue({
            ventasTotales: this.solicitud150101State.ventasTotales,
            totalExportaciones: this.solicitud150101State.totalExportaciones,
            totalImportaciones: this.solicitud150101State.totalImportaciones,
            saldo: this.solicitud150101State.saldo,
            porcentajeExportacion: this.solicitud150101State.porcentajeExportacion,
          });
        })
      )
      .subscribe();
  }

  /**
   * @description Actualiza las ventas totales en el store y recalcula el reporte.
   * @param evento - Evento del input para capturar el valor introducido.
   */
  obtenerVentasTotales(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150101Store.actualizarVentasTotales(VALUE);
    this.calcularReporteAnnual();
  }

  /**
   * @description Actualiza el total de exportaciones en el store, calcula el saldo, y recalcula el reporte.
   * @param evento - Evento del input para capturar el valor introducido.
   */
  obtenerTotalExportaciones(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150101Store.actualizarTotalExportaciones(parseFloat(VALUE));

    const VENTAS_TOTALES =
      parseFloat(this.formReporteAnnual.get('ventasTotales')?.value) || 0;
    const TOTAL_EXPORTACIONES =
      parseFloat(this.formReporteAnnual.get('totalExportaciones')?.value) || 0;
    const TOTAL: number = VENTAS_TOTALES - TOTAL_EXPORTACIONES;

    const TOTAL_VALUE = Number.isFinite(TOTAL) ? TOTAL : 0;
    this.solicitud150101Store.actualizarSaldo(TOTAL_VALUE);
    this.calcularReporteAnnual();
  }

  /**
   * @description Actualiza el total de importaciones en el store y recalcula el reporte.
   * @param evento - Evento del input para capturar el valor introducido.
   */
  obtenerTotalImportaciones(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150101Store.actualizarTotalImportaciones(parseFloat(VALUE));
    this.calcularReporteAnnual();
  }

  /**
   * @description Calcula y actualiza el saldo y porcentaje de exportación en el reporte anual.
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
      ? TOTAL_PORCENTAJE
      : 0;

    this.solicitud150101Store.actualizarPorcentajeExportacion(TOTAL_PORCENTAJE_VALUE);
    const TOTAL_SALDO: number = TOTAL_EXPORTACIONES - TOTAL_IMPORTACIONES;
    this.solicitud150101Store.actualizarSaldo(TOTAL_SALDO);
  }

  /**
   * @lifecycle
   * @description Método del ciclo de vida de Angular llamado al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}