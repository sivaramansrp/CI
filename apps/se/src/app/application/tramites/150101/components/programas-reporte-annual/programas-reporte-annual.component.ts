import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ProgramasReporte } from '../../models/programas-reporte.model';
import { ReporteFechas } from '../../models/programas-reporte.model';
import { Solicitud150101Query } from '../../estados/solicitud150101.query';
import { Solicitud150101State } from '../../estados/solicitud150101.store';
import { Solicitud150101Store } from '../../estados/solicitud150101.store';
import { SolicitudService } from '../../services/registro-solicitud-anual.service';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-programas-reporte-annual',
  templateUrl: './programas-reporte-annual.component.html',
  styleUrl: './programas-reporte-annual.component.scss',
})
export class ProgramasReporteAnnualComponent implements OnInit, OnDestroy {
  periodoReporteAnual!: FormGroup;
  solicitud150101State: Solicitud150101State = {} as Solicitud150101State;
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
    public solicitud150101Store: Solicitud150101Store,
    public solicitud150101Query: Solicitud150101Query,
    public solicitudService: SolicitudService,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.obtenerReporteFechas();
    this.obtenerProgramasReporte();
  }

  ngOnInit(): void {
    this.periodoReporteAnual = this.fb.group({
      reporteAnualFechaInicio: [this.solicitud150101State?.reporteAnualFechaInicio],
      reporteAnualFechaFin: [this.solicitud150101State?.reporteAnualFechaFin],
      folioPrograma: [
        { value: this.solicitud150101State?.folioPrograma, disabled: true },
      ],
      modalidad: [
        { value: this.solicitud150101State?.modalidad, disabled: true },
      ],
      tipoPrograma: [
        { value: this.solicitud150101State?.tipoPrograma, disabled: true },
      ],
      estatus: [{ value: this.solicitud150101State?.estatus, disabled: true }],
    });
    this.solicitud150101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud150101State) => {
          this.solicitud150101State = respuesta;
          this.periodoReporteAnual.patchValue({
            reporteAnualFechaInicio: this.solicitud150101State.reporteAnualFechaInicio,
            reporteAnualFechaFin: this.solicitud150101State.reporteAnualFechaFin,
            folioPrograma: this.solicitud150101State.folioPrograma,
            modalidad: this.solicitud150101State.modalidad,
            tipoPrograma: this.solicitud150101State.folioPrograma,
            estatus: this.solicitud150101State.estatus,
          });
        })
      )
      .subscribe();

    
  }

  obtenerReporteFechas(): void {
    this.solicitudService.obtenerReporteFechas().subscribe({
      next: (respuesta: ReporteFechas) => {
        this.solicitud150101Store.setReporteAnualFechaInicio(respuesta.reporteAnualFechaInicio);
        this.solicitud150101Store.setReporteAnualFechaFin(respuesta.reporteAnualFechaFin);
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
    this.solicitud150101Store.actualizarFolioPrograma(evento.folioPrograma);
    this.solicitud150101Store.actualizarModalidad(evento.modalidad);
    this.solicitud150101Store.actualizarTipoPrograma(evento.tipoPrograma);
    this.solicitud150101Store.actualizarEstatus(evento.estatus);
  }

  /**
   * Este método se utiliza para validar la forma del transporte. - 220401
   * @param form: Forma del transporte
   * @param field: campo del formulario
   * @returns Validaciones del formulario
   */
  isValid(form: FormGroup, field: string): boolean {
    return this.validacionesService.isValid(form, field) || false;
  }

  /**
    * Establece los valores en el store de tramite5701.
    *
    * @param {FormGroup} form - El formulario del cual se obtiene el valor.
    * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
    * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
    * @returns {void}
    */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud150101Store): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud150101Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
