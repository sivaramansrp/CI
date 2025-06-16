import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
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

/**
 * @component
 * @name ProgramasReporteAnnualComponent
 * @description
 * Este componente se utiliza para gestionar el reporte anual de programas. 
 * Proporciona una interfaz para visualizar y seleccionar programas, así como para administrar las fechas del reporte anual.
 * 
 * @selector app-programas-reporte-annual
 * @templateUrl ./programas-reporte-annual.component.html
 * @styleUrl ./programas-reporte-annual.component.scss
 * 
 * @example
 * <app-programas-reporte-annual></app-programas-reporte-annual>
 * 
 * @implements OnInit, OnDestroy
 */
@Component({
  selector: 'app-programas-reporte-anual',
  templateUrl: './programas-reporte-anual.component.html',
  styleUrl: './programas-reporte-anual.component.scss',
})
export class ProgramasReporteAnnualComponent implements OnDestroy {
  /** Formulario reactivo para administrar los datos del reporte anual */
  periodoReporteAnual!: FormGroup;
  /**
   * @description Configuración del componente `BsDatepicker`.
   * Permite establecer el formato de la fecha y restringir la selección a nivel de mes y año.
   *
   * @property {string} dateInputFormat - Define el formato de la fecha mostrada en el campo de entrada (MM/YYYY).
   * @property {string} minMode - Establece el modo mínimo de selección en el selector (mes).
   */
  bsConfig: Partial<BsDatepickerConfig> = {
    dateInputFormat: 'MM-YYYY', // Formato de entrada: mes-año
    minMode: 'month', // Solo permite seleccionar mes y año
  };

  /**
     * @description Evento que se emite al seleccionar una fila de la tabla.
     * Emite un valor booleano para indicar si la fila ha sido seleccionada.
     * @type {EventEmitter<boolean>}
     */
  @Output() filaDeInformeSeleccionada = new EventEmitter<boolean>();

  /**
   * @property {Solicitud150101State} solicitud150101State
   * @description Estado actual de la solicitud 150101.
   */
  solicitud150101State: Solicitud150101State = {} as Solicitud150101State;

  /**
   * @property {Subject<void>} destroyed$
   * @description Sujeto utilizado para manejar la destrucción de suscripciones y evitar fugas de memoria.
   */
  private destroyed$ = new Subject<void>();

  /**
   * @property {TablaSeleccion} solicitudSeleccionTabla
   * @description Configuración de selección de la tabla (RADIO, CHECKBOX, etc.).
   */
  solicitudSeleccionTabla = TablaSeleccion.RADIO;

  /**
   * @property {ProgramasReporte[]} solicitudDatos
   * @description Lista de datos de programas obtenidos para el reporte.
   */
  solicitudDatos: ProgramasReporte[] = [];

  /**
   * @property {boolean} formularioDeshabilitado
   * @description Indica si el formulario está deshabilitado (solo lectura).
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @property {ConfiguracionColumna<ProgramasReporte>[]} solicitudConfiguracionTabla
   * @description Configuración de las columnas de la tabla para mostrar los datos de programas.
   */
  solicitudConfiguracionTabla: ConfiguracionColumna<ProgramasReporte>[] = [
    {
      encabezado: 'Número/Registro de programa',
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
   * @constructor
   * @param {FormBuilder} fb - Constructor para formularios reactivos.
   * @param {Solicitud150101Store} solicitud150101Store - Store para manejar el estado de la solicitud.
   * @param {Solicitud150101Query} solicitud150101Query - Query para seleccionar datos del estado.
   * @param {SolicitudService} solicitudService - Servicio para manejar solicitudes relacionadas.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validaciones de formularios.
   * @param {ConsultaioQuery} consultaioQuery - Query para manejar el estado de la consulta.
   */
  constructor(
    public fb: FormBuilder,
    public solicitud150101Store: Solicitud150101Store,
    public solicitud150101Query: Solicitud150101Query,
    public solicitudService: SolicitudService,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
        })
      )
      .subscribe();
      
    this.solicitud150101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud150101State) => {
          this.solicitud150101State = respuesta;
        })
      )
      .subscribe();

    this.obtenerReporteFechas();
    this.obtenerProgramasReporte();

    this.periodoReporteAnual = this.fb.group({
      reporteAnualFechaInicio: [{ value: this.solicitud150101State?.reporteAnualFechaInicio, disabled: true }],
      reporteAnualFechaFin: [{ value: this.solicitud150101State?.reporteAnualFechaFin, disabled: true }],
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

    this.inicializarEstadoFormulario();
  }

  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado del formulario `periodoReporteAnual` basado en si el formulario está deshabilitado o no.
   * Si el formulario está deshabilitado, se deshabilita el campo `periodoReporteAnual`.
   * Si no está deshabilitado, se habilita el campo `periodoReporteAnual`.
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.formularioDeshabilitado) {
      this.periodoReporteAnual.disable();
    } else if (!this.formularioDeshabilitado) {
      this.periodoReporteAnual.enable();
    }
  }

  /**
   * @description Método para obtener las fechas de inicio y fin del reporte.
   * Actualiza el estado con las fechas obtenidas del servicio.
   */
  obtenerReporteFechas(): void {
    this.solicitudService
      .obtenerReporteFechas()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (respuesta: ReporteFechas) => {
          this.solicitud150101Store.setReporteAnualFechaInicio(respuesta.reporteAnualFechaInicio);
          this.solicitud150101Store.setReporteAnualFechaFin(respuesta.reporteAnualFechaFin);
        },
      });
  }

  /**
   * @method obtenerProgramasReporte
   * @description
   * Método para obtener la lista de programas de reporte anual desde el servicio.
   * Actualiza la propiedad `solicitudDatos` con los datos obtenidos.
   *
   * @returns {void}
   */
  obtenerProgramasReporte(): void {
    this.solicitudService.obtenerProgramasReporte().pipe(takeUntil(this.destroyed$)).subscribe({
      next: (respuesta: ProgramasReporte[]) => {
        this.solicitudDatos = respuesta;
      },
    });
  }

  /**
   * Actualiza los datos del programa de reporte anual en el estado de la solicitud
   * y emite un evento si la fila de informe ha sido seleccionada.
   *
   * @param evento - Objeto de tipo `ProgramasReporte` que contiene la información
   * del programa a actualizar, incluyendo el folio, modalidad, tipo de programa y estatus.
   *
   * @remarks
   * Este método actualiza múltiples propiedades en el estado de la solicitud
   * utilizando los métodos del store `solicitud150101Store`. Además, verifica si
   * el evento es una instancia de un objeto y, en ese caso, emite un evento para
   * indicar que una fila de informe ha sido seleccionada.
   */
  actualizarProgramasReporte(evento: ProgramasReporte): void {
    this.solicitud150101Store.actualizarFolioPrograma(evento.folioPrograma);
    this.solicitud150101Store.actualizarModalidad(evento.modalidad);
    this.solicitud150101Store.actualizarTipoPrograma(evento.tipoPrograma);
    this.solicitud150101Store.actualizarEstatus(evento.estatus);
    if (evento instanceof Object) {
      this.filaDeInformeSeleccionada.emit(true);
    }
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

  /**
   * @method ngOnDestroy
   * @description
   * Método que se ejecuta cuando el componente se destruye.
   * Se utiliza para completar el observable `destroyed$` y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
