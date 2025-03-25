import { BienesProducidos } from '../../models/programas-reporte.model';
import { Component } from '@angular/core';
import {
  ConfiguracionAporteColumna,
  ConfiguracionColumna,
  TablaCampoSeleccion,
} from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { Solicitud150102State } from '../../estados/solicitud150102.store';
import { Solicitud150102Store } from '../../estados/solicitud150102.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
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
  producidosSeleccionTabla = TablaSeleccion.RADIO;
  producidosDatos: BienesProducidos[] = [];
  producidosConfiguracionTabla: ConfiguracionAporteColumna<BienesProducidos>[] =
    [
      {
        encabezado: 'Bienes producidos',
        llave: 'bienProducido',
        clave: (item: BienesProducidos) => item.bienProducido,
        opcionDeEntrada: TablaCampoSeleccion.NONE,
        orden: 1,
      },
      {
        encabezado: 'Clave sector ',
        llave: 'sector',
        clave: (item: BienesProducidos) => item.sector,
        opcionDeEntrada: TablaCampoSeleccion.NONE,
        orden: 2,
      },
      {
        encabezado: 'Fraccion arancelaria',
        llave: 'fraccion',
        clave: (item: BienesProducidos) => item.fraccion,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 3,
      },
      {
        encabezado: 'Unidad de medida',
        llave: 'unidadMedida',
        clave: (item: BienesProducidos) => item.unidadMedida,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 4,
      },
      {
        encabezado: 'Volumen del total de bienes producidos',
        llave: 'totalBienesProducidos',
        clave: (item: BienesProducidos) => item.totalBienesProducidos,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 5,
      },
      {
        encabezado: 'Volumen del mercado nacional',
        llave: 'mercadoNacional',
        clave: (item: BienesProducidos) => item.mercadoNacional,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 6,
      },
      {
        encabezado: 'Volumen de exportaciones',
        llave: 'exportaciones',
        clave: (item: BienesProducidos) => item.exportaciones,
        opcionDeEntrada: TablaCampoSeleccion.INPUT,
        orden: 7,
      },
    ];
  bienesProducidos: BienesProducidos = {} as BienesProducidos;
  bienesProducidosSeleccionTabla = TablaSeleccion.RADIO;
  bienesProducidosDatos: BienesProducidos[] = [];
  bienesProducidosConfiguracionTabla: ConfiguracionColumna<BienesProducidos>[] =
    [
      {
        encabezado: 'Bienes producidos',
        clave: (item: BienesProducidos) => item.bienProducido,
        orden: 1,
      },
      {
        encabezado: 'Clave sector ',
        clave: (item: BienesProducidos) => item.sector,
        orden: 2,
      },
      {
        encabezado: 'Fraccion arancelaria',
        clave: (item: BienesProducidos) => item.fraccion,
        orden: 3,
      },
      {
        encabezado: 'Unidad de medida',
        clave: (item: BienesProducidos) => item.unidadMedida,
        orden: 4,
      },
      {
        encabezado: 'Volumen del total de bienes producidos',
        clave: (item: BienesProducidos) => item.totalBienesProducidos,
        orden: 5,
      },
      {
        encabezado: 'Volumen del mercado nacional',
        clave: (item: BienesProducidos) => item.mercadoNacional,
        orden: 6,
      },
      {
        encabezado: 'Volumen de exportaciones',
        clave: (item: BienesProducidos) => item.exportaciones,
        orden: 7,
      },
    ];
  constructor(
    public fb: FormBuilder,
    public solicitud150102Store: Solicitud150102Store,
    public solicitud150102Query: Solicitud150102Query,
    public solicitudService: SolicitudService
  ) {
    //
    this.obtenerProducidosDatos();
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
          this.producidosDatos = this.solicitud150102State.producidosDatos;
        })
      )
      .subscribe();
  }

  obtenerProducidosDatos(): void{
    this.solicitudService.obtenerProducidosDatos().subscribe({
      next:((respuesta: BienesProducidos[])=>{
        this.producidosDatos = respuesta;
      })
    })
  }

  obtenerVentasTotales(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarVentasTotales(VALUE);
    this.calcularReporteAnnual();
  }

  obtenerTotalExportaciones(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarTotalExportaciones(VALUE);
    this.calcularReporteAnnual();
  }

  obtenerTotalImportaciones(evento: Event): void {
    const VALUE = (evento.target as HTMLInputElement).value;
    this.solicitud150102Store.actualizarTotalImportaciones(VALUE);
    this.calcularReporteAnnual();
  }

  seleccionarFilaDeEntrada(evento: BienesProducidos): void {
    this.bienesProducidos = evento;
    const OBJETO_JSON = [];
    OBJETO_JSON.push(this.bienesProducidos);
    this.solicitud150102Store.actualizarProducidosDatos(OBJETO_JSON);
  }

  agregarBienesProducidos(): void {
    if (this.bienesProducidos) {
      const EXISTE = this.bienesProducidosDatos.some(
        (item) => item.bienProducido === this.bienesProducidos.bienProducido
      );
      if (!EXISTE) {
        this.bienesProducidosDatos.push(this.bienesProducidos);
      }
    }
  }

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
    this.solicitud150102Store.actualizarPorcentajeExportacion(
      TOTAL_PORCENTAJE_VALUE
    );
    const TOTAL_SALDO: number = TOTAL_EXPORTACIONES - TOTAL_IMPORTACIONES;
    this.solicitud150102Store.actualizarSaldo(TOTAL_SALDO.toString());
  }
}
