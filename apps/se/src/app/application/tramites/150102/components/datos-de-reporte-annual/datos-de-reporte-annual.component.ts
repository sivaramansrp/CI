import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { Solicitud150102State } from '../../estados/solicitud150102.store';
import { Solicitud150102Store } from '../../estados/solicitud150102.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-datos-de-reporte-annual',
  templateUrl: './datos-de-reporte-annual.component.html',
  styleUrl: './datos-de-reporte-annual.component.scss',
})
export class DatosDeReporteAnnualComponent implements OnInit {
  formReporteAnnual!: FormGroup;
  solicitud150102State: Solicitud150102State = {} as Solicitud150102State;
  private destroyed$ = new Subject<void>();
  constructor(
    public fb: FormBuilder,
    public solicitud150102Store: Solicitud150102Store,
    public solicitud150102Query: Solicitud150102Query,
    public solicitudService: SolicitudService
  ) {
    //
  }

  ngOnInit(): void {
    this.formReporteAnnual = this.fb.group({
      ventasTotales: [
        { value: this.solicitud150102State.ventasTotales, disabled: false },
        [Validators.maxLength(16)],
      ],
      totalExportaciones: [
        {
          value: this.solicitud150102State.totalExportaciones,
          disabled: false,
        },
        [Validators.maxLength(16)],
      ],
      totalImportaciones: [
        {
          value: this.solicitud150102State.totalImportaciones,
          disabled: false,
        },
        [Validators.maxLength(16)],
      ],
      saldo: [
        { value: this.solicitud150102State.saldo, disabled: true },
        [Validators.maxLength(16)],
      ],
      porcentajeExportacion: [
        {
          value: this.solicitud150102State.porcentajeExportacion,
          disabled: true,
        },
        [Validators.maxLength(16)],
      ],
    });

    this.solicitud150102Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud150102State) => {
          this.solicitud150102State = respuesta;
          this.formReporteAnnual.patchValue({
            ventasTotales: this.solicitud150102State.ventasTotales,
            totalExportaciones: this.solicitud150102State.totalExportaciones,
            totalImportaciones: this.solicitud150102State.totalImportaciones,
            saldo: this.solicitud150102State.saldo,
            porcentajeExportacion:
              this.solicitud150102State.porcentajeExportacion,
          });
        })
      )
      .subscribe();
  }

  obtenerVentasTotales(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarVentasTotales(VALUE);
  }

  obtenerTotalExportaciones(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarTotalExportaciones(VALUE);

    const VENTAS_TOTALES =
      parseFloat(this.formReporteAnnual.get('ventasTotales')?.value) || 0;
    const TOTAL_EXPORTACIONES =
      parseFloat(this.formReporteAnnual.get('totalExportaciones')?.value) || 0;
    const TOTAL: number = (VENTAS_TOTALES - TOTAL_EXPORTACIONES );

    const TOTAL_VALUE = Number.isFinite(TOTAL) ? TOTAL.toString() : '0';

    this.solicitud150102Store.actualizarSaldo(TOTAL_VALUE);
  }

  obtenerTotalImportaciones(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarTotalImportaciones(VALUE);
  }
}
