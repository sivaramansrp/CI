import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesistimientoSolicitudService } from '../../services/desistimiento-solicitud.service';

import { Solicitud230301State, Solicitud230301Store} from '../../estados/tramites/tramites230301.store';
import { map, takeUntil} from 'rxjs';
import { Subject} from 'rxjs';

import { ConsultaSolicitud230301Query } from '../../estados/queries/tramites230301.query';

import { SeccionLibState} from '@libs/shared/data-access-user/src';

import { SeccionLibStore} from '@libs/shared/data-access-user/src';

import { RespuestaDesistimientoSolicitud } from '../../models/disponsibles.model';
import { SeccionLibQuery} from '@libs/shared/data-access-user/src';


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
   * @type {Solicitud230301State}
   */
  public solicitudState!: Solicitud230301State;

  /**
   * Estado de la sección.
   * @type {SeccionLibState}
   */
  private seccion!: SeccionLibState;

  /**
   * Constructor para inicializar dependencias.
   * @param {FormBuilder} fb - Constructor de formularios reactivos.
   * @param {DesistimientoSolicitudService} desistimientoService - Servicio para manejar solicitudes de desistimiento.
   * @param {Solicitud230301Store} desistimientoStore - Almacén para gestionar el estado de la solicitud.
   * @param {ConsultaSolicitud230301Query} consultaSolicitud230301 - Consulta para obtener el estado de la solicitud.
   * @param {SeccionLibQuery} seccionQuery - Consulta para obtener el estado de la sección.
   * @param {SeccionLibStore} seccionStore - Almacén para gestionar el estado de la sección.
   */
  constructor(
    private fb: FormBuilder,
    private desistimientoService: DesistimientoSolicitudService,
    private readonly desistimientoStore: Solicitud230301Store,
    private consultaSolicitud230301: ConsultaSolicitud230301Query,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore
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
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    // Suscripción al estado de la sección
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();
    this.crearDesistimientoForm();
    this.getFromdata();
    if(this.formularioDeshabilitado) {
      this.formDesistimiento.disable();
    }
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
    crearDesistimientoForm (): void {
      // Inicialización del formulario reactivo
      this.formDesistimiento = this.fb.group({
        desistimientoFolio: [
          { value: this.solicitudState.desistimientoFolio, disabled: true },
          Validators.required,
        ],
        solicitudTipo: [
          { value: this.solicitudState.solicitudTipo, disabled: true },
          [Validators.required],
        ],
        desistimientoMotivo: [
          this.solicitudState.desistimientoMotivo,
          [Validators.required],
        ],
      });
    }

  /**
   * Método para obtener datos del desistimiento desde el servicio.
   * Actualiza el formulario con los datos obtenidos.
   * @returns {void}
   */
  getFromdata(): void {
    this.desistimientoService
      .getDesistimientoSolicitud('solictud.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(
        (res: RespuestaDesistimientoSolicitud ) => {
          this.formDesistimiento.patchValue({
            desistimientoFolio: res.data.desistimientoFolio,
            solicitudTipo: res.data.solicitudTipo,
          });
          this.desistimientoStore.setSolicitudTipo(res.data.desistimientoFolio);
          this.desistimientoStore.setDesistimientoFolio(res.data.solicitudTipo);
        },
        (error) => {
          console.error(error);
        }
      );
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
   * Método para manejar cambios en la descripción del desistimiento.
   * Actualiza el estado del almacén con el motivo del desistimiento.
   * @returns {void}
   */
  onDescripcionChange(): void {
    const DESISTIMIENTO_MOTIVO = this.formDesistimiento.get('desistimientoMotivo')?.value;
    this.desistimientoStore.setDesistimientoMotivo(DESISTIMIENTO_MOTIVO);

    const SECCION: number = 1;
    const FORMAS_VALIDADAS = this.seccion.formaValida;
    FORMAS_VALIDADAS[SECCION] = true;
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
    return false
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

