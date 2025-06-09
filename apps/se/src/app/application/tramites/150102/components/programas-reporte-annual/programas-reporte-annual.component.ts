import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';
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

  /** Estado actual de la solicitud */
  solicitud150102State: Solicitud150102State = {} as Solicitud150102State;

  /**
   * @description Evento que se emite al seleccionar una fila de la tabla.
   * Emite un valor booleano para indicar si la fila ha sido seleccionada.
   * @type {EventEmitter<boolean>}
   */
  @Output() filaDeInformeSeleccionada = new EventEmitter<boolean>();

  /** Subject para manejar la destrucción de observables */
  private destroyed$ = new Subject<void>();

  /** Selección de tabla para los datos de solicitud (radio) */
  solicitudSeleccionTabla = TablaSeleccion.RADIO;

  /** Datos de la solicitud en forma de arreglo de programas de reporte */
  solicitudDatos: ProgramasReporte[] = [];

  /** Configuración de la tabla para mostrar los datos de solicitud */
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
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

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
    public solicitudService: SolicitudService,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.obtenerReporteFechas();
    this.obtenerProgramasReporte();
  }

  /**
   * @description Método que se ejecuta al inicializar el componente.
   * Configura el formulario y sincroniza los datos iniciales con el estado.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.formProgrmasReporte.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formProgrmasReporte.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario `formProgrmasReporte` con los valores actuales del estado `solicitud150102State`.
   *
   * - Deshabilita todos los campos para solo lectura.
   * - Se suscribe al observable `seleccionarSolicitud$` para actualizar el formulario en tiempo real
   *   cuando haya cambios en el estado de la solicitud.
   */

  inicializarFormulario(): void {
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
    this.solicitudService
      .obtenerReporteFechas()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
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
    this.solicitudService
      .obtenerProgramasReporte()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
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
    if (evento instanceof Object) {
      this.filaDeInformeSeleccionada.emit(true);
    }
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
