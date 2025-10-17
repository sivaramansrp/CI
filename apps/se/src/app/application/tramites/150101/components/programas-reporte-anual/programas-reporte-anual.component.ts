import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { InputFecha } from '@ng-mf/data-access-user';
import { Notificacion } from '@ng-mf/data-access-user';
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

/**
 * @constant FECHA_INDICO
 * @description
 * Constante que define las propiedades de la fecha de pago en el modelo de trámites.
 */
const FECHA_INCIO = {
  labelNombre: 'Inicio:',
  required: false,
  habilitado: true,
};
const FECHA_FIN = {
  labelNombre: 'Fin:',
  required: false,
  habilitado: true,
};

// Add custom validator for integer values
function integerValidator(control: AbstractControl): { [key: string]: any } | null {
  const VALUE = control.value;
  if (VALUE === null || VALUE === '' || VALUE === undefined) {
    return null; // Let required validator handle empty values
  }
  
  // Check if value is a valid integer
  const NUMVALUE = Number(VALUE);
  if (isNaN(NUMVALUE) || !Number.isInteger(NUMVALUE) || NUMVALUE < 0) {
    return { 'notInteger': { value: control.value } };
  }
  
  return null;
}

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
   *
   *  @property {InputFecha} fechaIncio
   *  @description
   *  Esta propiedad define la configuración de la fecha de inicio del reporte anual.
   */
  public fechaIncio: InputFecha = FECHA_INCIO;

  /**
   * @property {InputFecha} fechaFin
   * @description
   * Esta propiedad define la configuración de la fecha de fin del reporte anual.
   * Incluye el nombre de la etiqueta, si es requerida y si está habilitada.
   */

  public fechaFin: InputFecha = FECHA_FIN;
   /**
       * @public
       * @property {Notificacion} nuevaNotificacion
       * @description Representa una nueva notificación que se utilizará en el componente.
       * @command Este campo debe ser inicializado antes de su uso.
       */
    public nuevaNotificacion!: Notificacion;

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
    this.inicializarFormulario();
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyed$),
        map((seccionState) => {
          this.formularioDeshabilitado = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.solicitud150101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyed$),
        map((respuesta: Solicitud150101State) => {
          this.solicitud150101State = respuesta;
          if (this.periodoReporteAnual) {
            this.periodoReporteAnual.patchValue({
              reporteAnualFechaInicio: respuesta.reporteAnualFechaInicio,
              reporteAnualFechaFin: respuesta.reporteAnualFechaFin,
              folioPrograma: respuesta.folioPrograma,
              modalidad: respuesta.modalidad,
              tipoPrograma: respuesta.tipoPrograma,
              estatus: respuesta.estatus,
            });
          }
        })
      )
      .subscribe();

    this.obtenerReporteFechas();
    this.obtenerProgramasReporte();
  }

  /**
   * @method inicializarFormulario
   * @description
   * Inicializa el formulario `periodoReporteAnual` con los valores actuales del estado de la solicitud.
   * Establece los valores iniciales y el estado habilitado/deshabilitado de los controles.
   * Este método debe llamarse al crear el componente o cuando se actualiza el estado de la solicitud.
   * @returns {void}
   */
  inicializarFormulario(): void {
    this.periodoReporteAnual = this.fb.group({
      reporteAnualFechaInicio: [
        {
          value: this.solicitud150101State?.reporteAnualFechaInicio,
        },
      ],
      reporteAnualFechaFin: [
        {
          value: this.solicitud150101State?.reporteAnualFechaFin,
        },
      ],
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
      // Add validation for numeric fields
      ventasTotales: ['', [Validators.required, integerValidator]],
      totalExportaciones: ['', [Validators.required, integerValidator]]
    });

    // Add value change listeners for validation
    this.periodoReporteAnual.get('ventasTotales')?.valueChanges.subscribe(value => {
      this.validateIntegerField('ventasTotales', value, 'Ventas totales (a):');
    });

    this.periodoReporteAnual.get('totalExportaciones')?.valueChanges.subscribe(value => {
      this.validateIntegerField('totalExportaciones', value, 'Total exportaciones (b):');
    });
  }

  /**
   * @method validateIntegerField
   * @description Validates if a field contains a valid integer value and shows notification if invalid
   * @param fieldName - Name of the form field
   * @param value - Value to validate
   * @param fieldLabel - Label to show in error message
   */
  validateIntegerField(fieldName: string, value: any, fieldLabel: string): void {
    const CONTROL = this.periodoReporteAnual.get(fieldName);
    
    if (value !== null && value !== '' && value !== undefined) {
      const NUMVALUE = Number(value);
      if (isNaN(NUMVALUE) || !Number.isInteger(NUMVALUE) || NUMVALUE < 0) {
        // Set field to 0 and show notification
        CONTROL?.setValue('0', { emitEvent: false });
        this.showValidationAlert(fieldLabel);
      }
    }
  }

  /**
   * @method showValidationAlert
   * @description Shows validation alert for invalid integer input
   * @param fieldName - Name of the field that failed validation
   */
  showValidationAlert(fieldName: string): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'warning',
      modo: 'action',
      titulo: 'Valor inválido',
      mensaje: `${fieldName} debe ser un número entero válido. El campo se ha establecido en 0.`,
      cerrar: false,
      tiempoDeEspera: 3000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  /**
   * @method showAlert
   * @description Shows a general alert notification
   */
  showAlert(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'info',
      modo: 'action',
      titulo: 'Programa seleccionado',
      mensaje: 'Se ha seleccionado un programa correctamente.',
      cerrar: false,
      tiempoDeEspera: 3000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
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
    } else {
      this.periodoReporteAnual.enable();
      // Vuelve a deshabilitar los campos que deben permanecer deshabilitados
      this.periodoReporteAnual.get('folioPrograma')?.disable();
      this.periodoReporteAnual.get('modalidad')?.disable();
      this.periodoReporteAnual.get('tipoPrograma')?.disable();
      this.periodoReporteAnual.get('estatus')?.disable();
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
          this.solicitud150101Store.setReporteAnualFechaInicio(
            respuesta.reporteAnualFechaInicio
          );
          this.solicitud150101Store.setReporteAnualFechaFin(
            respuesta.reporteAnualFechaFin
          );
        },
      });
  }
  onFechaInicio(fecha: string): void {
    if (fecha) {
      this.periodoReporteAnual.patchValue({ reporteAnualFechaInicio: fecha });
      this.solicitud150101Store.setReporteAnualFechaInicio(fecha);
    }
  }
  onFechaFin(fecha: string): void {
    if (fecha) {
      this.periodoReporteAnual.patchValue({ reporteAnualFechaFin: fecha });
      this.solicitud150101Store.setReporteAnualFechaFin(fecha);
    }
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
    this.periodoReporteAnual.patchValue({
      folioPrograma: evento.folioPrograma,
      modalidad: evento.modalidad,
      tipoPrograma: evento.tipoPrograma,
      estatus: evento.estatus,
    });
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
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Solicitud150101Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.solicitud150101Store[metodoNombre] as (value: unknown) => void)(
      VALOR
    );
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
