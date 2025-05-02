import { AgregarTransportistasComponent } from '../agregar-transportistas/agregar-transportistas.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ElementRef } from '@angular/core';
import { FECHA_DE_INICIO } from '../../constants/solicitud.enum';
import { FECHA_DE_PAGO } from '../../constants/solicitud.enum';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { InputRadio } from '../../models/solicitud.model';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { Solicitud32605State } from '../../estados/solicitud32605.store';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { SolicitudRadioLista } from '../../models/solicitud.model';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TRANSPORTISTAS_CONFIGURACION } from '../../constants/solicitud.enum';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { TransportistasTable } from '../../models/solicitud.model';
import { Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-importador-exportador',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    InputFechaComponent,
    TituloComponent,
    TablaDinamicaComponent,
    AgregarTransportistasComponent,
  ],
  providers: [SolicitudService],
  templateUrl: './importador-exportador.component.html',
  styleUrl: './importador-exportador.component.scss',
})
export class ImportadorExportadorComponent implements OnInit, OnDestroy {
  importadorExportadorForm!: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  sinoOpcion: InputRadio = {} as InputRadio;
  mutuo: InputRadio = {} as InputRadio;
  clasificacionInformacion: InputRadio = {} as InputRadio;
  solicitud32605State: Solicitud32605State = {} as Solicitud32605State;
  fechaDeFinDeVigencia: InputFecha = FECHA_DE_INICIO;
  fechaDePago: InputFecha = FECHA_DE_PAGO;
  transportistasTabla = TablaSeleccion.CHECKBOX;
  transportistasConfiguracionColumnas: ConfiguracionColumna<TransportistasTable>[] =
    TRANSPORTISTAS_CONFIGURACION;
  transportistasLista: TransportistasTable[] = [];
  @ViewChild('transportistas', { static: false })
  transportistaElement!: ElementRef;
  constructor(
    private fb: FormBuilder,
    public solicitudService: SolicitudService,
    public solicitud32605Store: Solicitud32605Store,
    public solicitud32605Query: Solicitud32605Query
  ) {
    this.conseguirOpcionDeRadio();
    this.conseguirTransportistasLista();
  }

  ngOnInit(): void {
    this.importadorExportadorForm = this.fb.group({
      '2042': [this.solicitud32605State[2042]],
      '2043': [this.solicitud32605State[2043]],
      '2044': [this.solicitud32605State[2044]],
      fechaInicioComercio: [
        { value: this.solicitud32605State.fechaInicioComercio, disabled: true },
        Validators.required,
      ],
      fechaPago: [this.solicitud32605State.fechaPago],
      monto: [this.solicitud32605State.monto, [Validators.maxLength(10)]],
      operacionesBancarias: [
        this.solicitud32605State.operacionesBancarias,
        [Validators.maxLength(25)],
      ],
      llavePago: [
        this.solicitud32605State.llavePago,
        [Validators.maxLength(25)],
      ],
    });

    this.solicitud32605Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32605State) => {
          this.solicitud32605State = respuesta;
          this.importadorExportadorForm.patchValue({
            '2042': this.solicitud32605State[2042],
            '2043': this.solicitud32605State[2043],
            '2044': this.solicitud32605State[2044],
            fechaInicioComercio: this.solicitud32605State.fechaInicioComercio,
            fechaPago: this.solicitud32605State.fechaPago,
            monto: this.solicitud32605State.monto,
            operacionesBancarias: this.solicitud32605State.operacionesBancarias,
            llavePago: this.solicitud32605State.llavePago,
          });
        })
      )
      .subscribe();
  }

  conseguirOpcionDeRadio(): void {
    this.solicitudService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
          this.mutuo = respuesta.reconocimientoMutuo;
          this.clasificacionInformacion = respuesta.clasificacionInformacion;
        },
      });
  }

  conseguirTransportistasLista(): void {
    this.solicitudService
      .conseguirTransportistasLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: TransportistasTable[]) => {
          this.transportistasLista = respuesta;
        },
      });
  }

  actualizar2042(evento: string | number): void {
    this.solicitud32605Store.actualizar2042(evento);
  }

  actualizar2043(evento: string | number): void {
    this.solicitud32605Store.actualizar2043(evento);
  }

  actualizar2044(evento: string | number): void {
    this.solicitud32605Store.actualizar2044(evento);
  }

  actualizarFechaInicioComercio(evento: string): void {
    this.solicitud32605Store.actualizarFechaInicioComercio(evento);
  }

  actualizarFechaPago(evento: string): void {
    this.solicitud32605Store.actualizarFechaPago(evento);
  }

  actualizarMonto(evento: string): void {
    this.solicitud32605Store.actualizarMonto(evento);
  }

  actualizarOperacionesBancarias(evento: string): void {
    this.solicitud32605Store.actualizarOperacionesBancarias(evento);
  }

  actualizarLlavePago(evento: string): void {
    this.solicitud32605Store.actualizarLlavePago(evento);
  }

  agregarTransportistaModel(): void {
    if (this.transportistaElement) {
      const MODAL_INSTANCE = new Modal(this.transportistaElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  transportistasDatos(evento: TransportistasTable): void {
    this.transportistasLista.push(evento);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
