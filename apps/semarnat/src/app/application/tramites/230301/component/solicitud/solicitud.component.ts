import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesistimientoSolicitudService } from '../../services/desistimiento-solicitud.service';

import {
  Tramite230301State,
  Tramite230301Store,
} from '../../estados/tramites/tramites230301.store';
import {
  map,
  takeUntil,
} from 'rxjs';
import { Subject } from 'rxjs';

import { Solicitud230301Query } from '../../estados/queries/tramites230301.query';

import {
  ConsultaioQuery,
  ConsultaioState,
  SeccionLibQuery,
  SeccionLibStore,
} from '@libs/shared/data-access-user/src';
import { SeccionLibState } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss',
})
export class SolicitudComponent implements OnInit, OnDestroy {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Formulario reactivo para el desistimiento.
   * @type {FormGroup}
   */
  public formDesistimiento!: FormGroup;

  /**
   * Observable para notificar la destrucción del componente y evitar fugas de memoria.
   * @type {Subject<void>}
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * Estado actual de la solicitud.
   * @type {Tramite230301State}
   */
  public solicitud230301State!: Tramite230301State;

  /**
   * Estado de la sección.
   * @type {SeccionLibState}
   */
  private seccionState!: SeccionLibState;

  /**
   * Estado de la consulta compartida entre trámites.
   * @type {ConsultaioState}
   */
  private consultaioState!: ConsultaioState;

  /**
   * Constructor para inicializar dependencias.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   * @param {DesistimientoSolicitudService} desistimientoService - Servicio para manejar solicitudes de desistimiento.
   * @param {Tramite230301Store} desistimientoStore - Almacén para gestionar el estado de la solicitud.
   * @param {Solicitud230301Query} consultaSolicitud230301 - Consulta para obtener el estado de la solicitud.
   * @param {SeccionLibQuery} seccionQuery - Consulta para obtener el estado de la sección.
   * @param {SeccionLibStore} seccionStore - Almacén para gestionar el estado de la sección.
   */
  constructor(
    private fb: FormBuilder,
    private desistimientoService: DesistimientoSolicitudService,
    private readonly desistimientoStore: Tramite230301Store,
    private consultaSolicitud230301: Solicitud230301Query,
    private readonly seccionQuery: SeccionLibQuery,
    private readonly consultaioQuery: ConsultaioQuery
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura las suscripciones a los estados y crea el formulario reactivo.
   * @returns {void}
   */
  ngOnInit(): void {
    // Suscripción al estado de la solicitud
    this.consultaSolicitud230301.estadoSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitud230301State = seccionState;
        })
      )
      .subscribe();

    // Suscripción al estado de la sección
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();

    // Suscripción al estado compartido para obtener el folio del trámite anterior
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((consultaioState) => {
          this.consultaioState = consultaioState;
          this.initializeComponent();
        })
      )
      .subscribe();
  }

  /**
   * @function crearDesistimientoForm
   * @description
   * Inicializa un formulario reactivo para manejar los datos de "desistimiento" (retiro).
   * El formulario incluye campos para el folio de desistimiento, tipo de solicitud y motivo del desistimiento.
   * Algunos campos están pre-rellenados y deshabilitados según el estado actual de la solicitud.
   *
   * @returns {void} Esta función no retorna ningún valor.
   */
  crearDesistimientoForm(): void {
    this.formDesistimiento = this.fb.group({
      folioAnterior: [
        { value: this.solicitud230301State.folioAnterior, disabled: true },
        Validators.required,
      ],
      tipoSolicitud: [
        { value: this.solicitud230301State.tipoSolicitud, disabled: true },
        [Validators.required],
      ],
      motivoDesistimiento: [
        this.solicitud230301State.motivoDesistimiento,
        [Validators.required],
      ],
    });
  }

  /**
   * Inicializa el componente: actualiza el store local y crea el formulario.
   * @returns {void}
   */
  private initializeComponent(): void {
    this.desistimientoStore.setInitialState({
      //folioAnterior: this.consultaioState.folioTramite,
      //tipoSolicitud: this.consultaioState.tipoDeTramite,
      folioAnterior: "23030502300100120255090000031",
      tipoSolicitud: "Certificado fitosanitario tipo de solicitud anterior etc etc",
      solicitudAnterior: Number(this.consultaioState.id_solicitud),
    });
    this.crearDesistimientoForm();
    if (this.formularioDeshabilitado) {
      this.formDesistimiento.disable();
    }
  }

  /**
   * Método para validar el formulario.
   * Si el formulario no es válido, marca todos los campos como tocados.
   * @returns {void}
   */
  validate(): void {
    if (this.formDesistimiento.valid) {
      // Lógica adicional si el formulario es válido
    } else {
      this.formDesistimiento.markAllAsTouched();
    }
  }

  /**
   * @method validarFormulario
   * @description
   * Valida el estado del formulario de desistimiento.
   * Si el formulario es válido, retorna true.
   * Si no es válido, marca todos los campos como tocados para mostrar los mensajes de error y retorna false.
   *
   * @returns {boolean} true si el formulario es válido, false si contiene errores de validación.
   */
  validarFormulario(): boolean {
    if (this.formDesistimiento.valid) {
      return true;
    }
    this.formDesistimiento.markAllAsTouched();
    return false;
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
