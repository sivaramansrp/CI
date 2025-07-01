/**
 * Este componente maneja los datos de la mercancía, incluyendo la validación y la interacción con el estado global.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ConsultaioQuery, Notificacion, NotificacionesComponent, REG_X, TituloComponent } from '@ng-mf/data-access-user';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';

import { Tramite110102State, Tramite110102Store } from '../../estados/store/tramite110102.store';

/**
 * Componente que gestiona los datos de la mercancía, incluyendo la validación de formularios y la interacción con el estado global.
 */
@Component({
  selector: 'app-datos-de-la-mercancia',
  standalone: true,
  imports: [CommonModule, TituloComponent, ReactiveFormsModule, NotificacionesComponent],
  templateUrl: './datos-de-la-mercancia.component.html',
  styleUrls: ['./datos-de-la-mercancia.component.scss'],
})
export class DatosDeLaMercanciaComponent implements OnInit, OnDestroy {
  /**
   * Indica si el formulario está en modo de solo lectura.
   */
  esSoloLectura!: boolean;

  /**
   * Formulario reactivo para gestionar los datos de la mercancía.
   */
  formularioDatosMercancia!: FormGroup;

  /**
   * Subject que emite un evento cuando el componente es destruido, permitiendo la desuscripción de observables.
   */
  private destruido$ = new Subject<void>();

  /**
   * Estado actual del trámite.
   */
  estadoTramite!: Tramite110102State;

  /**
   * Notificación para mostrar alertas al usuario.
   */
  alertaNotificacion!: Notificacion;

  /**
   * Constructor del componente.
   * @param {FormBuilder} formBuilder - Servicio para la creación de formularios reactivos.
   * @param {Tramite110102Store} tramiteStore - Servicio para manejar el estado del trámite.
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado de la consulta.
   * @param {Tramite110102Query} tramiteQuery - Servicio para consultar el estado del trámite.
   */
  constructor(
    private formBuilder: FormBuilder,
    private tramiteStore: Tramite110102Store,
    private consultaQuery: ConsultaioQuery,
    private tramiteQuery: Tramite110102Query
  ) {}

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   * Inicializa el formulario y configura las suscripciones necesarias.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    this.consultaQuery.selectConsultaioState$
      .pipe(takeUntil(this.destruido$))
      .subscribe((estadoConsulta) => {
        this.esSoloLectura = estadoConsulta.readonly;
        this.habilitarDeshabilitarFormulario();
      });
  }

  /**
   * Inicializa el formulario con los valores del estado global.
   */
  inicializarFormulario(): void {
    this.obtenerValoresDelEstado();
    this.formularioDatosMercancia = this.formBuilder.group({
      cveRegistroProductor: [
        this.estadoTramite?.cveRegistroProductor,
        [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)],
      ],
      solicitud: this.formBuilder.group({
        idSolicitud: [null],
        idSolicitudProductor: [''],
      }),
    });
  }

  /**
   * Establece los valores en el estado global a partir de un campo específico del formulario.
   * @param {FormGroup} formulario - El formulario reactivo del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se establecerá en el estado.
   */
  establecerValoresEnEstado(formulario: FormGroup, campo: string): void {
    const VALOR = formulario.get(campo)?.value;
    this.tramiteStore.establecerDatos({ [campo]: VALOR });
  }

  /**
   * Habilita o deshabilita el formulario según el estado de solo lectura.
   */
  habilitarDeshabilitarFormulario(): void {
    if (this.esSoloLectura) {
      this.formularioDatosMercancia.disable();
    } else {
      this.formularioDatosMercancia.enable();
    }
  }

  /**
   * Obtiene los valores del estado global y los asigna al formulario.
   */
  obtenerValoresDelEstado(): void {
    this.tramiteQuery.selectTramite110102$
      .pipe(takeUntil(this.destruido$))
      .subscribe((estado) => {
        this.estadoTramite = estado;
      });
  }

  /**
   * Verifica si un control del formulario es inválido.
   * @param {string} nombreControl - Nombre del control del formulario.
   * @returns {boolean} - Retorna true si el control es inválido, de lo contrario false.
   */
  esControlInvalido(nombreControl: string): boolean {
    const CONTROL = this.formularioDatosMercancia.get(nombreControl);
    return CONTROL ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty) : false;
  }

  /**
   * Actualiza el estado del grid de comercializadores de productos.
   */
  actualizarGridComercializadores(): void {
    const REGISTRO_PRODUCTOR = this.formularioDatosMercancia.get('cveRegistroProductor');

    if (REGISTRO_PRODUCTOR?.value !== '') {
      if (REGISTRO_PRODUCTOR?.hasError('pattern')) {
        this.alertaNotificacion = {
          tipoNotificacion: 'alert',
          categoria: 'danger',
          modo: 'action',
          titulo: '',
          mensaje: 'Debe introducir la clave de registro.',
          cerrar: false,
          tiempoDeEspera: 2000,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        };
      } else if (REGISTRO_PRODUCTOR?.value !== '254023028961') {
        this.alertaNotificacion = {
          tipoNotificacion: 'alert',
          categoria: 'danger',
          modo: 'action',
          titulo: '',
          mensaje:
            'El número de registro proporcionado no existe, no se encuentra vigente o no tiene dado de alta el RFC del comercializador. Favor de verificar.',
          cerrar: false,
          tiempoDeEspera: 2000,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        };
      }
    }
  }

  /**
   * Hook del ciclo de vida que se llama cuando la directiva se destruye.
   * Completa el subject `destruido$` para desuscribirse de todos los observables.
   */
  ngOnDestroy(): void {
    this.destruido$.next();
    this.destruido$.complete();
  }
}