import { AL_DAR, AlertComponent, InputRadioComponent, Notificacion, NotificacionesComponent, Pedimento, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Solicitud260906State, Tramite260906Store } from '../../../../estados/tramites/tramite260906.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DomicilloComponent } from '../domicillo/domicillo.component';
import { ManifiestosComponent } from '../manifiestos/manifiestos.component';
import { RepresentanteLegalComponent } from '../representante-legal/representanteLegal.component';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Tramite260906Query } from '../../../../estados/queries/tramite260906.query';
import tipoOperacion from '@libs/shared/theme/assets/json/260906/tipoOperacion.json';

/**
 * @component
 * @name DatosEstablecimientoComponent
 * @description
 * Componente responsable de gestionar y mostrar los datos principales del formulario,
 * incluyendo domicilio, manifiestos y representante legal.
 */
@Component({
  selector: 'app-datos-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
    DomicilloComponent,
    ManifiestosComponent,
    RepresentanteLegalComponent,
    InputRadioComponent,
    NotificacionesComponent
  ],
  templateUrl: './datos-establecimiento.component.html',
  styleUrls: ['./datos-establecimiento.component.css'],
})
export class DatosEstablecimientoComponent implements OnInit, OnDestroy {

  pedimentos: Array<Pedimento> = [];
  elementoParaEliminar!: number;
  public nuevaNotificacion!: Notificacion;

  /**
   * Indica si un campo es requerido o no.
   * @type {boolean}
   * @default false
   */
  noRequerido: boolean = false;

  /**
   * Estado de la solicitud.
   * @type {Solicitud260906State}
   */
  public solicitudState!: Solicitud260906State;

  /**
   * Notificador para destruir observables y evitar memory leaks.
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Grupo de formularios principal.
   * @type {FormGroup}
   */
  public forma!: FormGroup;

  /**
   * Opciones para los radio buttons, cargadas desde un archivo JSON.
   * @type {RadioOptions[]}
   */
  radioOptions = tipoOperacion;

  /**
   * Indica si la sección es colapsable.
   * @type {boolean}
   * @default true
   */
  public colapsable: boolean = true;

  /**
   * Constantes importadas desde el archivo de enumeración que contienen textos importantes y advertencias.
   * @type {typeof AL_DAR}
   */
  public TEXTOS = AL_DAR;

  /**
   * @constructor
   * Inicializa el componente y gestiona la inyección de dependencias necesarias.
   *
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {Tramite260906Store} tramite260906Store - Store para gestionar el estado del trámite.
   * @param {Tramite260906Query} tramite260906Query - Consulta para obtener datos del estado del trámite.
   * @param {SolicitudDatosService} solicitudDatosService - Servicio para gestionar datos de la solicitud.
   */
  constructor(
    public readonly fb: FormBuilder,
    private tramite260906Store: Tramite260906Store,
    private tramite260906Query: Tramite260906Query,
    public solicitudDatosService: SolicitudDatosService
  ) {
    // Inicialización adicional si es necesario
  }

  /**
   * Método del ciclo de vida de Angular que se llama al inicializar el componente.
   * Obtiene datos del estado de la solicitud y configura el formulario.
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramite260906Query
      .selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.inicializarFormGroup();
  }

  inicializarFormGroup(): void {
    this.forma = this.fb.group({
      /**
       * Indicador de selección "tipoOperacion".
       */
      tipoOperacion: [this.solicitudState?.tipoOperacion, [Validators.required]],
      tipoOperacionJustificacion: [this.solicitudState?.tipoOperacionJustificacion, [Validators.required]],
      /**
       * RFC del solicitante, campo deshabilitado.
       */
      rfcResponsableSanitario: [this.solicitudState?.rfcResponsableSanitario],
      /**
       * Denominación del solicitante, campo requerido.
       */
      denominacion: [this.solicitudState?.denominacion, Validators.required],
      /**
       * Correo electrónico del solicitante, campo requerido.
       */
      correo: [this.solicitudState?.correo, Validators.required]
    });
  }

  /**
   * Alterna el estado colapsable de la sección del formulario.
   * @returns {void}
   */
  public mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Habilita todos los controles del formulario si están deshabilitados.
   * @returns {void}
   */
  public toggleFormControls(): void {
    this.abrirModal();
    Object.keys(this.forma.controls).forEach((controlName) => {
      const CONTROL = this.forma.get(controlName);
      if (CONTROL?.disabled) {
        CONTROL.enable();
      }
    });
  }

  /**
   * Establece el valor de un campo en el store de Tramite260906.
   *
   * @param {FormGroup} form - El grupo de formularios que contiene el campo.
   * @param {string} campo - El nombre del campo cuyo valor se va a establecer.
   * @param {keyof Tramite260906Store} metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   * @returns {void}
   */
  public setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260906Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260906Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Actualiza el valor de "tipoOperacion" en el Store.
   * @param {any} evento - Valor seleccionado para la propiedad "tipoOperacion".
   * @returns {void}
   */
  setTipoOperacion(evento: string | number): void {
    this.tramite260906Store.setTipoOperacion(evento);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable `destroyNotifier$` para cancelar las suscripciones activas.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
 * Elimina un elemento de la lista de pedimentos en la posición especificada.
 * 
 * @param {number} i - El índice del elemento a eliminar.
 * 
 * @remarks
 * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
 * y se abre el modal para mostrar un aviso al usuario.
 */
  abrirModal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

}