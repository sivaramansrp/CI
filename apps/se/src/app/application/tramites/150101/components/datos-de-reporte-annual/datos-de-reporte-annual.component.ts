import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud150101Query } from '../../estados/solicitud150101.query';
import { Solicitud150101State } from '../../estados/solicitud150101.store';
import { Solicitud150101Store } from '../../estados/solicitud150101.store';
import { SolicitudService } from '../../services/registro-solicitud-anual.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-de-reporte-annual',
  templateUrl: './datos-de-reporte-annual.component.html',
  styleUrl: './datos-de-reporte-annual.component.scss',
})
export class DatosDeReporteAnnualComponent implements OnInit, OnDestroy {
  formReporteAnnual!: FormGroup;
  solicitud150101State: Solicitud150101State = {} as Solicitud150101State;
  private destroyed$ = new Subject<void>();
  constructor(
    public fb: FormBuilder,
    public solicitud150101Store: Solicitud150101Store,
    public solicitud150101Query: Solicitud150101Query,
    public solicitudService: SolicitudService
  ) {
    //
  }

  ngOnInit(): void {
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
          disabled: false,
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
            porcentajeExportacion: this.solicitud150101State.porcentajeExportacion
          });
        })
      )
      .subscribe();
  }

  obtenerVentasTotales(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150101Store.actualizarVentasTotales(VALUE);
  }

  obtenerTotalExportaciones(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150101Store.actualizarTotalExportaciones(VALUE);

    const VENTAS_TOTALES =
      parseFloat(this.formReporteAnnual.get('ventasTotales')?.value) || 0;
    const TOTAL_EXPORTACIONES =
      parseFloat(this.formReporteAnnual.get('totalExportaciones')?.value) || 0;
    const TOTAL: number = (VENTAS_TOTALES - TOTAL_EXPORTACIONES);

    const TOTAL_VALUE = Number.isFinite(TOTAL) ? TOTAL.toString() : '0';

    this.solicitud150101Store.actualizarSaldo(TOTAL_VALUE);
  }

  obtenerTotalImportaciones(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150101Store.actualizarTotalImportaciones(VALUE);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
