import { Component, OnDestroy, OnInit } from '@angular/core';
import { DOMICILIO_TABLA_COLUMNAS, FECHA_INGRESO } from '../../constantes/concluir-relacion.enum';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite420102State, Tramite420102Store } from '../../estados/tramite420102.store';
import { CommonModule } from '@angular/common';
import { ConcluirRelacionService } from '../../services/concluir-relacion.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDelContenedorTabla } from '../../models/tramite420102.enum';
import { ReactiveFormsModule } from '@angular/forms';
import { Tramite420102Query } from '../../estados/tramite420102.query';

/**
 * @class ConcluirRelacionComponent
 * @description Componente que gestiona la funcionalidad para concluir una relación en el trámite 420102.
 * Este componente incluye un formulario reactivo para capturar datos, manejar fechas y mostrar una tabla dinámica.
 */
@Component({
  selector: 'app-concluir-relacion-de',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    InputFechaComponent,
  ],
  templateUrl: './concluir-relacion-de.component.html',
  styleUrl: './concluir-relacion-de.component.scss',
})
export class ConcluirRelacionComponent implements OnInit, OnDestroy {
  /**
   * @property {FormGroup} concluirFormulario
   * @description Formulario reactivo utilizado para capturar los datos del trámite.
   */
  public concluirFormulario!: FormGroup;

  /**
   * @property {InputFecha} fechaInicioInput
   * @description Configuración para el campo de fecha inicial en el formulario.
   */
  public fechaInicioInput: InputFecha = FECHA_INGRESO;

  /**
   * @property {any[]} encabezadoDeTabla
   * @description Configuración de las columnas de la tabla dinámica.
   */
  public encabezadoDeTabla = DOMICILIO_TABLA_COLUMNAS;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Notificador utilizado para cancelar suscripciones al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Tramite420102State} solicitudState
   * @description Estado actual del trámite 420102.
   */
  public solicitudState!: Tramite420102State;

  /**
   * @property {string} fechaPagoDate
   * @description Fecha de pago utilizada en el formulario.
   */
  fechaPagoDate: string = '';

  /**
   * @property {TablaSeleccion} seleccionTabla
   * @description Tipo de selección utilizada en la tabla dinámica (por ejemplo, selección por radio).
   */
  seleccionTabla = TablaSeleccion.RADIO;

  /**
   * @property {any[]} datosTabla
   * @description Datos que se mostrarán en la tabla dinámica.
   */
  datosTabla: DatosDelContenedorTabla[] = [];

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * @constructor
   * @description Constructor que inicializa los servicios y configuraciones necesarias para el componente.
   *
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {ConcluirRelacionService} concluirrelacionService - Servicio para manejar la lógica de negocio del trámite.
   * @param {Tramite420102Store} tramite420102Store - Store para manejar el estado del trámite 420102.
   * @param {Tramite420102Query} tramite420102Query - Query para consultar el estado del trámite 420102.
   */
  constructor(
    private fb: FormBuilder,
    private concluirrelacionService: ConcluirRelacionService,
    private tramite420102Store: Tramite420102Store,
    private tramite420102Query: Tramite420102Query,
    private readonly consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * @method ngOnInit
   * @description Método de inicialización del componente. Configura el formulario y suscribe al estado del trámite.
   */
  ngOnInit(): void {
    this.tramite420102Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.datosTabla = this.solicitudState.tableDatos || [];
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.crearDesistimientoForm();
  }

  /**
   * @method inicializarEstadoFormulario
   * @description Inicializa el estado del formulario dependiendo si está en modo solo lectura o editable.
   * Si el formulario es solo lectura, guarda y deshabilita los datos del formulario.
   * Si no, crea el formulario para permitir edición.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearDesistimientoForm();
    }
  }

  /**
   * @method guardarDatosFormulario
   * @description Guarda los datos actuales del formulario y ajusta su estado según el modo de solo lectura.
   * Si el formulario está en modo solo lectura, lo deshabilita para evitar modificaciones.
   * Si no, lo habilita para permitir la edición de los campos.
   */
  guardarDatosFormulario(): void {
    this.crearDesistimientoForm();
    if (this.esFormularioSoloLectura) {
      this.concluirFormulario.disable();
    } else {
      this.concluirFormulario.enable();
    }
  }

  /**
   * @method crearDesistimientoForm
   * @description Método para inicializar el formulario reactivo con los campos requeridos.
   */
  crearDesistimientoForm(): void {
    this.concluirFormulario = this.fb.group({
      rfc: [this.solicitudState?.rfc || ''],
      fechaInicial: [
        { value: this.solicitudState?.fechaInicial, disabled: true },
      ],
      fechaFinal: [{ value: this.solicitudState?.fechaFinal, disabled: true }],
    });
  }

  /**
   * @method concluirFormularioSubmit
   * @description Método que se ejecuta al enviar el formulario. Obtiene datos para la tabla dinámica.
   */
  concluirFormularioSubmit(): void {
    if (this.concluirFormulario.valid) {
      this.concluirrelacionService
        .obtenerTablerList('concluir-relacion-Tablea.json')
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data) => {
          this.datosTabla = data;
        });
    }
  }

  /**
   * @method buscarRFC
   * @description Método para buscar el RFC ingresado en el formulario y actualizar el estado del trámite.
   */
  buscarRFC(): void {
    this.tramite420102Store.establecerRfc(
      this.concluirFormulario.get('rfc')?.value
    );
    if (this.concluirFormulario.valid) {
      this.concluirrelacionService
        .obtenerTablerList('concluir-relacion-Tablea.json')
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((data) => {
          this.datosTabla = data;
        });
    }
  }

  /**
   * @method cambiarFechaInicio
   * @description Método para actualizar la fecha inicial en el formulario.
   *
   * @param {string} nuevo_valor - Nueva fecha inicial.
   */
  public cambiarFechaInicio(nuevo_valor: string): void {
    this.concluirFormulario.patchValue({
      fechaInicial: nuevo_valor,
    });
    this.concluirFormulario.get('fechaInicial')?.setValue(nuevo_valor);
    this.concluirFormulario.get('fechaInicial')?.markAsUntouched();
  }

  /**
   * @method cambiarFechaFinal
   * @description Método para actualizar la fecha final en el formulario.
   *
   * @param {string} nuevo_valor - Nueva fecha final.
   */
  public cambiarFechaFinal(nuevo_valor: string): void {
    this.concluirFormulario.patchValue({
      fechaFinal: nuevo_valor,
    });
    this.concluirFormulario.get('fechaFinal')?.setValue(nuevo_valor);
    this.concluirFormulario.get('fechaFinal')?.markAsUntouched();
  }

  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta al destruir el componente. Cancela todas las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
