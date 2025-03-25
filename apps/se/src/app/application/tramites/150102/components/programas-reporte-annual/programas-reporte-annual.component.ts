import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { ProgramasReporte } from '../../models/programas-reporte.model';
import { ReporteFechas } from '../../models/programas-reporte.model';
import { Solicitud150102Query } from '../../estados/solicitud150102.query';
import { Solicitud150102State } from '../../estados/solicitud150102.store';
import { Solicitud150102Store } from '../../estados/solicitud150102.store';
import { SolicitudService } from '../../services/solicitud.service';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-programas-reporte-annual',
  templateUrl: './programas-reporte-annual.component.html',
  styleUrl: './programas-reporte-annual.component.scss',
})
export class ProgramasReporteAnnualComponent implements OnInit, OnDestroy {
  formProgrmasReporte!: FormGroup;
  configuracionFechaFinVigencia: InputFecha = {
    labelNombre: 'Fin',
    required: false,
    habilitado: false,
  };
  configuracionFechaInicioVigencia: InputFecha = {
    labelNombre: 'Inicio',
    required: false,
    habilitado: false,
  };
  solicitud150102State: Solicitud150102State = {} as Solicitud150102State;
  private destroyed$ = new Subject<void>();
  solicitudSeleccionTabla = TablaSeleccion.RADIO;
  solicitudDatos: ProgramasReporte[] = [];
  solicitudConfiguracionTabla: ConfiguracionColumna<ProgramasReporte>[] = [
    {
      encabezado: 'Numero/Registro de programa',
      clave: (item: ProgramasReporte) => item.folioPrograma,
      orden: 1,
    },
    {
      encabezado: 'Tipo programa',
      clave: (item: ProgramasReporte) => item.tipoPrograma,
      orden: 2,
    },
    {
      encabezado: 'Modalidad',
      clave: (item: ProgramasReporte) => item.modalidad,
      orden: 3,
    },
    {
      encabezado: 'Estatus',
      clave: (item: ProgramasReporte) => item.estatus,
      orden: 4,
    },
  ];
  constructor(
    public fb: FormBuilder,
    public solicitud150102Store: Solicitud150102Store,
    public solicitud150102Query: Solicitud150102Query,
    public solicitudService: SolicitudService
  ) {
    this.obtenerReporteFechas();
    this.obtenerProgramasReporte();
  }

  ngOnInit(): void {
    this.formProgrmasReporte = this.fb.group({
      inicio: [{ value: this.solicitud150102State.inicio, disabled: true }],
      fin: [{ value: this.solicitud150102State.fin, disabled: true }],
      folioPrograma: [
        { value: this.solicitud150102State.folioPrograma, disabled: true },
      ],
      modalidad: [
        { value: this.solicitud150102State.modalidad, disabled: true },
      ],
      tipoPrograma: [
        { value: this.solicitud150102State.tipoPrograma, disabled: true },
      ],
      estatus: [{ value: this.solicitud150102State.estatus, disabled: true }],
    });

    this.solicitud150102Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud150102State) => {
          this.solicitud150102State = respuesta;
          this.formProgrmasReporte.patchValue({
            inicio: this.solicitud150102State.inicio,
            fin: this.solicitud150102State.fin,
            folioPrograma: this.solicitud150102State.folioPrograma,
            modalidad: this.solicitud150102State.modalidad,
            tipoPrograma: this.solicitud150102State.folioPrograma,
            estatus: this.solicitud150102State.estatus,
          });
        })
      )
      .subscribe();
  }

  obtenerReporteFechas(): void {
    this.solicitudService.obtenerReporteFechas().subscribe({
      next: (respuesta: ReporteFechas) => {
        this.solicitud150102Store.actualizarInicio(respuesta.inicio);
        this.solicitud150102Store.actualizarFin(respuesta.fin);
      },
    });
  }

  obtenerProgramasReporte(): void {
    this.solicitudService.obtenerProgramasReporte().subscribe({
      next: (respuesta: ProgramasReporte[]) => {
        this.solicitudDatos = respuesta;
      },
    });
  }

  actualizarProgramasReporte(evento: ProgramasReporte): void {
    this.solicitud150102Store.actualizarFolioPrograma(evento.folioPrograma);
    this.solicitud150102Store.actualizarModalidad(evento.modalidad);
    this.solicitud150102Store.actualizarTipoPrograma(evento.tipoPrograma);
    this.solicitud150102Store.actualizarEstatus(evento.estatus);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
