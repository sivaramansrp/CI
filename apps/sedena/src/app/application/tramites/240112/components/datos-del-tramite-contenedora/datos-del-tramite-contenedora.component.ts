import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatosDelTramiteFormState, MercanciaDetalle } from '../../../../shared/models/datos-del-tramite.model';
import { Subject, takeUntil } from 'rxjs';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { DatosMercanciaContenedoraComponent } from '../datos-mercancia-contenedora/datos-mercancia-contenedora.component';
import { ID_PROCEDIMIENTO } from '../../constants/agregar-destinatario.enum';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { Tramite240112Query } from '../../estados/tramite240112Query.query';
import { Tramite240112Store } from '../../estados/tramite240112Store.store';


@Component({
  selector: 'app-datos-del-tramite-contenedora',
  templateUrl: './datos-del-tramite-contenedora.component.html',
  styleUrl: './datos-del-tramite-contenedora.component.scss',
  standalone: true,
  imports: [DatosDelTramiteComponent, ModalComponent]
})
export class DatosDelTramiteContenedoraComponent implements OnInit, OnDestroy {
  /**
    * @description Referencia al componente ModalComponent dentro de la plantilla.
    * Utiliza el decorador ViewChild para acceder a la instancia del modal y manipularlo desde el código TypeScript.
    * @example
    * // Para abrir el modal:
    * this.modalComponent.open();
    * 
    * @see ModalComponent
    * 
    * @es
    * Referencia al componente modal para mostrar u ocultar diálogos modales en la interfaz de usuario.
    */
  @ViewChild('modal', { static: false }) modalComponent!: ModalComponent;
  /**
   * @input
   * @description
   * Indica si el formulario debe estar deshabilitado. Cuando es `true`, los controles del formulario estarán inactivos y no permitirán la edición por parte del usuario.
   * @type {boolean}
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Datos de la tabla de mercancías que se muestran en el formulario.
   * @property {MercanciaDetalle[]} datosMercanciaTabla
   */
  public datosMercanciaTabla: MercanciaDetalle[] = [];

  /**
   * Estado actual del formulario de datos del trámite.
   * @property {DatosDelTramiteFormState} datosDelTramiteFormState
   */
  public datosDelTramiteFormState!: DatosDelTramiteFormState;

  /**
   * Observable adicional para limpieza de suscripciones.
   * @property {Subject<void>} destroy$
   */
  private destroy$ = new Subject<void>();

  /**
   * @readonly
   * @description
   * Identificador único del procedimiento actual.
   * 
   * @remarks
   * Esta propiedad almacena el valor constante de `ID_PROCEDIMIENTO` que representa el procedimiento en curso.
   * 
   * @example
   * // Acceso al identificador del procedimiento
   * console.log(this.idProcedimiento);
   * 
   * @comando
   * Utilice esta propiedad para obtener el ID del procedimiento asociado al trámite.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

  /**
   * Constructor del componente.
   *
   * @method constructor
   * @param {Tramite240111Query} tramiteQuery - Query de Akita para obtener el estado actual del trámite.
   * @param {Tramite240111Store} tramiteStore - Store de Akita para actualizar el estado del trámite.
   * @returns {void}
   */
  constructor(
    private tramiteQuery: Tramite240112Query,
    private tramiteStore: Tramite240112Store
  ) { }

  /**
   * Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe a los observables del estado para mostrar los datos en la vista.
   *
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.tramiteQuery.getMercanciaTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datosMercanciaTabla = data;
      });

    this.tramiteQuery.getDatosDelTramite$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datosDelTramiteFormState = data;
      });
  }

  /**
   * Hook del ciclo de vida que se ejecuta al destruir el componente.
   * Libera las suscripciones activas para evitar fugas de memoria.
   *
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Actualiza el estado del formulario de datos del trámite en el store.
   *
   * @method updateDatosDelTramiteFormulario
   * @param {DatosDelTramiteFormState} event - Estado actualizado del formulario.
   * @returns {void}
   */
  updateDatosDelTramiteFormulario(event: DatosDelTramiteFormState): void {
    this.tramiteStore.updateDatosDelTramiteFormState(event);
  }

  /**
    * Abre el modal correspondiente según el nombre del evento recibido.
    *
    * Si el evento es `'Datosmercancia'`, se carga el componente `DatosMercanciaContenedoraComponent`
    * dentro del modal y se le pasa una función de cierre como input.
    *
    * @method openModal
    * @param {string} event - Nombre del evento que indica qué componente se debe mostrar en el modal.
    * @returns {void}
    */
  openModal(event: string): void {
    if (event === 'Datosmercancia') {
      this.modalComponent.abrir(DatosMercanciaContenedoraComponent, {
        cerrarModal: this.cerrarModal.bind(this),
      });
    }
  }

  /**
   * Cierra el modal dinámico actualmente abierto utilizando el método del componente modal.
   *
   * @method cerrarModal
   * @returns {void}
   */
  cerrarModal(): void {
    this.modalComponent.cerrar();
  }
}
