import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConsultaioQuery, ConsultaioState, doDeepCopy, esValidArray, esValidObject, getValidDatos, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { InformeAnualProgramaService } from '../../services/informe-anual-programa.service';
import { ProgramasReporte } from '../../models/programas-reporte.model';
import { SOLICITUD_CONFIGURACION_TABLA } from '../../constants/tablacolumns.enum';
import { Solicitud150103Query } from '../../estados/solicitud150103.query';
import { Solicitud150103State } from '../../estados/solicitud150103.store';
import { Solicitud150103Store } from '../../estados/solicitud150103.store';

/**
 * @description Componente para gestionar el reporte anual de programas.
 * Se encarga de mostrar, actualizar y administrar datos relacionados
 * con los programas de reporte y sus configuraciones.
 */
@Component({
  selector: 'app-programas-reporte-anual',
  templateUrl: './programas-reporte-anual.component.html',
  styleUrl: './programas-reporte-anual.component.scss',
  
})
export class ProgramasReporteAnualComponent implements OnInit, OnDestroy {
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

  /** Estado de la consulta que se obtiene del store. */
  consultaDatos!: ConsultaioState;

  /**
   * @property {boolean} soloLectura
   * @description Indica si el formulario o los campos están en modo de solo lectura.
   * @default false
   */
  esFormularioSoloLectura: boolean = false;

  /** Estado actual de la solicitud */
  solicitud150103State: Solicitud150103State = {} as Solicitud150103State;

  /**
   * @description Evento que se emite al seleccionar una fila de la tabla.
   * Emite un valor booleano para indicar si la fila ha sido seleccionada.
   * @type {EventEmitter<boolean>}
   */
  @Output() filaDeInformeSeleccionada = new EventEmitter<boolean>();

  /** Subject para manejar la destrucción de observables */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Selección de tabla para los datos de solicitud (radio) */
  solicitudSeleccionTabla = TablaSeleccion.RADIO;

  /** Datos de la solicitud en forma de arreglo de programas de reporte */
  solicitudDatos: ProgramasReporte[] = [];

  /** Configuración de la tabla para mostrar los datos de solicitud */
  solicitudConfiguracionTabla = SOLICITUD_CONFIGURACION_TABLA;

  // Valor de RFC de ejemplo
  private readonly LOGIN_RFC: string = 'AAL0409235E6';

  /**
   * @description Constructor que inicializa los servicios y estado necesarios.
   * @param fb Servicio para crear formularios reactivos.
   * @param solicitud150103Store Servicio para manejar el estado de la solicitud.
   * @param solicitud150103Query Servicio para realizar consultas del estado.
   * @param informaAnualPrograma Servicio para realizar solicitudes relacionadas.
   */  
  constructor(
    public fb: FormBuilder,
    public solicitud150103Store: Solicitud150103Store,
    public solicitud150103Query: Solicitud150103Query,
    public informaAnualPrograma: InformeAnualProgramaService,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.setDefaultDates();
    
    if (this.solicitud150103Query.getValue().solicitudDato?.length) {
      this.solicitudDatos = this.solicitud150103Query.getValue().solicitudDato ?? [];
    } else {
      this.obtenerProgramasReporte();
    }
  }

  /**
   * @method setDefaultDates
   * @description Sets default dates - today's month/year for inicio and -1 month for fin
   */
  private setDefaultDates(): void {
    const CURRENT_DATE = new Date();
    const MONTH_DATE = new Date(CURRENT_DATE);
    MONTH_DATE.setMonth(CURRENT_DATE.getMonth() - 1);
    
    const FORMATTED_INICIO_DATE = this.formatDateToMonthYear(CURRENT_DATE.toISOString());
    const FORMATTED_FIN_DATE = this.formatDateToMonthYear(MONTH_DATE.toISOString());
    
    this.solicitud150103Store.actualizarInicio(FORMATTED_INICIO_DATE);
    this.solicitud150103Store.actualizarFin(FORMATTED_FIN_DATE);
  }

  /**
   * @description Método que se ejecuta al inicializar el componente.
   * Configura el formulario y sincroniza los datos iniciales con el estado.
   */
  ngOnInit(): void {
    this.formProgrmasReporte = this.fb.group({
      inicio: [{ value: this.solicitud150103State.inicio, disabled: true }],
      fin: [{ value: this.solicitud150103State.fin, disabled: true }],
      folioPrograma: [
        { value: this.solicitud150103State.folioPrograma, disabled: true },
      ],
      modalidad: [
        { value: this.solicitud150103State.modalidad, disabled: true },
      ],
      tipoPrograma: [
        { value: this.solicitud150103State.tipoPrograma, disabled: true },
      ],
      estatus: [{ value: this.solicitud150103State.estatus, disabled: true }],
    });

    this.solicitud150103Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud150103State) => {
          this.solicitud150103State = respuesta;
          this.formProgrmasReporte.patchValue({
            inicio: this.solicitud150103State.inicio,
            fin: this.solicitud150103State.fin,
            folioPrograma: this.solicitud150103State.folioPrograma,
            modalidad: this.solicitud150103State.modalidad,
            tipoPrograma: this.solicitud150103State.tipoPrograma,
            estatus: this.solicitud150103State.estatus,
          });
        })
      )
      .subscribe();
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaDatos = seccionState;
          this.esFormularioSoloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
      this.inicializarEstadoFormulario();
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
    this.informaAnualPrograma
      .obtenerProgramasReporte(this.LOGIN_RFC)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({        
        next: (respuesta) => {
          const API_RESPONSE = doDeepCopy(respuesta);
          if(esValidObject(API_RESPONSE) && esValidArray(API_RESPONSE.datos)) {
            this.solicitudDatos = this.mapProgramasResponse(API_RESPONSE.datos);
          }
        },
      });
  }

  /**
   * @method mapProgramasResponse
   * @description Mapea la respuesta de la API a un arreglo de objetos `ProgramasReporte`.
   * @param datos Arreglo de datos sin tipar recibido de la API.
   * @returns Arreglo de objetos `ProgramasReporte` mapeados.
   */
  public mapProgramasResponse(datos: unknown[]): ProgramasReporte[] {
    return datos.map((item: unknown) => {
      const PROGRAMA = item as ProgramasReporte;
      return {
        folioPrograma: PROGRAMA.folioPrograma,
        modalidad: PROGRAMA.modalidad,
        tipoPrograma: PROGRAMA.tipoPrograma,
        estatus: PROGRAMA.estatus
      };
    }) || [];
  }

  /**
   * @method formatDateToMonthYear
   * @description Formatea una cadena de fecha al formato "MM-YYYY".
   * @param dateString Cadena de fecha en formato ISO o similar.
   * @returns Cadena formateada en "MM-YYYY" o cadena vacía si la entrada no es válida.
   */
  private formatDateToMonthYear(dateString: string): string {
    if(getValidDatos(dateString)) {
        const DATE = new Date(dateString);
        const MONTH = String(DATE.getMonth() + 1).padStart(2, '0');
        const YEAR = DATE.getFullYear();
        return `${MONTH}-${YEAR}`;
    }
    return '';
  }

  /**
   * @description Actualiza los datos del programa seleccionado en el estado.
   * @param evento Objeto que contiene los datos del programa seleccionado.
   */
  actualizarProgramasReporte(evento: ProgramasReporte): void {
    const INDEX = this.solicitudDatos.findIndex(
      (x) => x.folioPrograma === evento.folioPrograma
    );
    this.solicitud150103Store.actualizarIndiceDeRegistroDelPrograma(INDEX);
    this.solicitud150103Store.actualizarFolioPrograma(evento.folioPrograma);
    this.solicitud150103Store.actualizarModalidad(evento.modalidad);
    this.solicitud150103Store.actualizarTipoPrograma(evento.tipoPrograma);
    this.solicitud150103Store.actualizarEstatus(evento.estatus);
    if (evento instanceof Object) {
      this.filaDeInformeSeleccionada.emit(true);
    }
  }
/**
 * @method inicializarEstadoFormulario
 * @description Método que verifica si el formulario debe estar en modo de solo lectura y, en caso afirmativo, desactiva todos los campos del formulario.
 */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.formProgrmasReporte?.enable();
    }else {
      this.formProgrmasReporte?.disable();
    }
  }
  /**
   * Método que se ejecuta al destruir el componente.
   * Notifica a las suscripciones que deben finalizar y completa el Subject.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next(); 
    this.destroyNotifier$.complete(); 
  }
}
