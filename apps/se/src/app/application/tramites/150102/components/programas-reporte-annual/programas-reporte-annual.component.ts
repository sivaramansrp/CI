import { Component} from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
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

/**
 * @description Componente para gestionar el reporte anual de programas.
 * Se encarga de mostrar, actualizar y administrar datos relacionados
 * con los programas de reporte y sus configuraciones.
 */
@Component({
  selector: 'app-programas-reporte-annual',
  templateUrl: './programas-reporte-annual.component.html',
  styleUrl: './programas-reporte-annual.component.scss',
})
export class ProgramasReporteAnnualComponent implements OnInit, OnDestroy {
  /** Formulario reactivo para administrar los datos del reporte anual */
  formProgrmasReporte!: FormGroup;

  /** Configuración de la fecha de fin de vigencia */
  configuracionFechaFinVigencia: InputFecha = {
    labelNombre: 'Fin',
    required: false,
    habilitado: false,
  };

  /** Configuración de la fecha de inicio de vigencia */
  configuracionFechaInicioVigencia: InputFecha = {
    labelNombre: 'Inicio',
    required: false,
    habilitado: false,
  };

  /** Estado actual de la solicitud */
  solicitud150102State: Solicitud150102State = {} as Solicitud150102State;

  /** Subject para manejar la destrucción de observables */
  private destroyed$ = new Subject<void>();

  /** Selección de tabla para los datos de solicitud (radio) */
  solicitudSeleccionTabla = TablaSeleccion.RADIO;

  /** Datos de la solicitud en forma de arreglo de programas de reporte */
  solicitudDatos: ProgramasReporte[] = [];

  /** Configuración de la tabla para mostrar los datos de solicitud */
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

  /**
   * @description Constructor que inicializa los servicios y estado necesarios.
   * @param fb Servicio para crear formularios reactivos.
   * @param solicitud150102Store Servicio para manejar el estado de la solicitud.
   * @param solicitud150102Query Servicio para realizar consultas del estado.
   * @param solicitudService Servicio para realizar solicitudes relacionadas.
   */
  constructor(
    public fb: FormBuilder,
    public solicitud150102Store: Solicitud150102Store,
    public solicitud150102Query: Solicitud150102Query,
    public solicitudService: SolicitudService
  ) {
    this.obtenerReporteFechas();
    this.obtenerProgramasReporte();
  }

  /**
   * @description Método que se ejecuta al inicializar el componente.
   * Configura el formulario y sincroniza los datos iniciales con el estado.
   */
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

  /**
   * @description Método para obtener las fechas de inicio y fin del reporte.
   * Actualiza el estado con las fechas obtenidas del servicio.
   */
  obtenerReporteFechas(): void {
    this.solicitudService.obtenerReporteFechas().subscribe({
      next: (respuesta: ReporteFechas) => {
        this.solicitud150102Store.actualizarInicio(respuesta.inicio);
        this.solicitud150102Store.actualizarFin(respuesta.fin);
      },
    });
  }

  /**
   * @description Método para obtener los datos de programas de reporte.
   * Actualiza los datos con los resultados obtenidos del servicio.
   */
  obtenerProgramasReporte(): void {
    this.solicitudService.obtenerProgramasReporte().subscribe({
      next: (respuesta: ProgramasReporte[]) => {
        this.solicitudDatos = respuesta;
      },
    });
  }

  /**
   * @description Actualiza los datos del programa seleccionado en el estado.
   * @param evento Objeto que contiene los datos del programa seleccionado.
   */
  actualizarProgramasReporte(evento: ProgramasReporte): void {
    this.solicitud150102Store.actualizarFolioPrograma(evento.folioPrograma);
    this.solicitud150102Store.actualizarModalidad(evento.modalidad);
    this.solicitud150102Store.actualizarTipoPrograma(evento.tipoPrograma);
    this.solicitud150102Store.actualizarEstatus(evento.estatus);
  }

  /**
   * @description Método que se ejecuta al destruir el componente.
   * Completa las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(); // Emite una señal para finalizar las suscripciones
    this.destroyed$.complete(); // Completa el Subject
  }
}
