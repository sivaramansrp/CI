import { AvisocalidadStore, SolicitudState } from '../../estados/stores/aviso-calidad.store';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificacionesComponent, Pedimento, TituloComponent } from '@libs/shared/data-access-user/src';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisocalidadQuery } from '../../estados/queries/aviso-calidad.query';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { DatosDomicilioService } from '../../../tramites/260514/services/permiso-importacion.service';
import { Notificacion } from '@ng-mf/data-access-user';
/**
 * @description
 * Componente que gestiona los datos del establecimiento.
 * Permite inicializar un formulario reactivo con los datos de la solicitud
 * y realizar operaciones relacionadas con el estado del trámite.
 */
@Component({
  selector: 'app-datos-del-establecimiento-rfc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TituloComponent, NotificacionesComponent],
  templateUrl: './datos-del-establecimiento-rfc.component.html',
  styleUrl: './datos-del-establecimiento-rfc.component.scss',
})
/**
 * @var elementoParaEliminar
 * @type {number}
 * @memberof DatosDelEstablecimientoRFCComponent
 * @description
 * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
 * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
 */
export class DatosDelEstablecimientoRFCComponent implements OnInit, OnDestroy {
  /**
   * @description
   * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
   * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
   */
  elementoParaEliminar!: number;

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description
   * Arreglo que almacena los pedimentos asociados al establecimiento.
   * Cada pedimento contiene información relevante para el trámite.
   */
  pedimentos: Array<Pedimento> = [];
  /**
   * @description
   * Formulario reactivo para capturar los datos del establecimiento.
   */
  datosDelForm!: FormGroup;

  /**
   * @description
   * Variable que controla la visibilidad del modal.
   */
  public modal: string = 'modal';

  /**
   * @description
   * Referencia al elemento de cierre del modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * @description
   * Estado actual de la solicitud.
   */
  public solicitudState!: SolicitudState;

  /**
   * @description
   * Notificador para destruir observables y evitar fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si el botón de selección ha sido clicado.
   * Se utiliza para rastrear el estado de clic del botón de selección dentro del componente.
   */
  tieneElBotonSeleccionClicado: boolean = false;

  /**
   * @description
   * Constructor del componente.
   * @param fb Constructor de formularios reactivos.
   * @param avisocalidadStore Store para gestionar el estado del trámite.
   * @param avisocalidadQuery Query para obtener datos del estado del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private avisocalidadStore: AvisocalidadStore,
    private avisocalidadQuery: AvisocalidadQuery,
    private consultaioQuery: ConsultaioQuery,
    private datosDomicilioSvc: DatosDomicilioService
  ) {
    // Reservado para futuras inyecciones de dependencias o inicializaciones.
  }

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Configura el formulario reactivo y sus valores iniciales basados en el estado de la solicitud.
   */
  ngOnInit(): void {
    /**
    * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
    *
    * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
    * - Llama a `configurarGrupoForm()` para aplicar configuraciones basadas en el estado recibido.
    * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
    */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
        })
      )
      .subscribe()
    this.configurarGrupoForm(); // Configura el grupo de formularios con los valores iniciales.
  }
  /**
   * @description
   * Método que se invoca para abrir un modal de confirmación antes de eliminar un pedimento.
   * Muestra una notificación al usuario y establece el índice del pedimento a eliminar.
   * @param i Índice del pedimento a eliminar. Por defecto es 0.
   */

  abrirModal(i: number = 0): void {
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

    this.elementoParaEliminar = i;
    this.tieneElBotonSeleccionClicado = true;
    this.datosDomicilioSvc.emitEvent(this.tieneElBotonSeleccionClicado);
  }

  /**
   * @description
   * Método que se invoca para eliminar un pedimento del arreglo `pedimentos`.
   * Si el parámetro `borrar` es verdadero, elimina el pedimento en el índice almacenado en `elementoParaEliminar`.
   * @param borrar Indica si se debe proceder con la eliminación del pedimento.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
    if(this.tieneElBotonSeleccionClicado) {
      this.datosDelForm.enable();
    }
  }
  /**
   * @method configurarGrupoForm
   * @description Configures the reactive form group for the "Datos del Establecimiento RFC" component.
   */
  configurarGrupoForm(): void {
    /**
     * Se suscribe al estado de `Avisocalidad` para obtener información actualizada del estado de la solicitud. 
     * - Asigna el estado de la solicitud a la propiedad `solicitudState`.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
    */

     this.avisocalidadQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    /**
     * Inicializa el formulario reactivo `datosDelForm` con los valores del estado de la solicitud. 
     * - Utiliza el `FormBuilder` para crear un grupo de formularios con los campos `rfcDel`, `denominacionRazonSocial` y `correoElectronico`.
     * - Cada campo tiene sus respectivas validaciones:
     *  - `rfcDel`: Máximo de 254 caracteres.
     *  
     * `denominacionRazonSocial`: Requerido, máximo de 254 caracteres.
     * - `correoElectronico`: Requerido, debe ser un correo electrónico válido y con un máximo de 320 caracteres.
     * */

    this.datosDelForm = this.fb.group({
      rfcDel: [this.solicitudState?.rfcDel, [Validators.maxLength(13)]],
      denominacionRazonSocial: [this.solicitudState?.denominacionRazonSocial, [Validators.required, Validators.maxLength(100)]],
      correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email, Validators.maxLength(320)]]
    });

    /*
     * Si el formulario está en modo solo lectura, deshabilita todos los campos.
     * En caso contrario, habilita los campos para permitir la edición.
     * Esto asegura que el formulario refleje correctamente el estado de solo lectura.
     */
    if ((this.esFormularioSoloLectura && this.datosDelForm) || !this.tieneElBotonSeleccionClicado) {
      this.datosDelForm?.disable();
    } else {
      this.datosDelForm?.enable();
    }
  }
  /**
   * @description
   * Método que actualiza el estado del store con los valores del formulario.
   * @param form Formulario reactivo.
   * @param campo Campo del formulario que se desea actualizar.
   * @param metodoNombre Nombre del método del store que se invocará.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof AvisocalidadStore): void {
    const VALOR = form.get(campo)?.value;
    (this.avisocalidadStore[metodoNombre] as (value: string | number) => void)(VALOR);
  }

  /**
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia los observables para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}