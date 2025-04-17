import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

import { BusquedaPermisos140216State, Tramite140216Store } from '../../estados/tramites/tramite140216.store';
import { FECHA_SALIDA, PERMISOS_VIGENTES_ENCABEZADO_DE_TABLA } from '../../constantes/suspension-permiso.enum';
import { InputFecha, InputFechaComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { PermisosVigentes, PermisosVigentesRespuesta } from '../../models/suspension-permiso.model';
import { DetalleDelPermisoComponent } from '../detalle-del-permiso/detalle-del-permiso.component';
import { DetalleTitularComponent } from '../detalle-titular/detalle-titular.component';
import { PersonasNotificarComponent } from '../personas-notificar/personas-notificar.component';
import { SuspensionPermisoService } from '../../services/suspension-permiso/suspension-permiso.service';
import { Tramite140216Query } from '../../estados/queries/tramite140216.query';

/**
 * Componente para la búsqueda de permisos.
 */
@Component({
  selector: 'app-busqueda-permisos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    InputFechaComponent,
    DetalleDelPermisoComponent,
    DetalleTitularComponent,
    PersonasNotificarComponent
  ],
  templateUrl: './busqueda-permisos.component.html',
  styleUrl: './busqueda-permisos.component.scss',
})

export class BusquedaPermisosComponent implements OnInit, OnDestroy {
  /**
   * Referencia al formulario reactivo de busquedaPermisos.
   * @type {FormGroup}
   */
  busquedaPermisosForm!: FormGroup;

  /**
   * Referencia al store de la sección de tramite 140216.
   */
  public busquedaPermisosState!: BusquedaPermisos140216State;

  /**
   * Configuración para el encabezado de la tabla de permisos vigentes.
   * @type {ConfiguracionColumna<PermisosVigentes>[]}
   */
  permisosVigentesEncabezadoDeTabla = PERMISOS_VIGENTES_ENCABEZADO_DE_TABLA;

  /**
   * Referencia a la lista de permisos vigentes.
   * @type {PermisosVigentes[]}
   */
  permisosVigentesTabla: PermisosVigentes[] = [];

  /**
   * Configuración de tabla para selección de tipo checkbox.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Fecha final de entrada.
   */
  fechaFinalInput: InputFecha = FECHA_SALIDA;

  /**
   * Referencia al elemento modal para mostrar detalles del RFC de la facultad.
   * @type {ElementRef}
   */
  @ViewChild('detalle-rfc-facultad', { static: false }) modalDetalleRfcFacultad!: ElementRef;

  /**
   * Referencia al elemento modal para mostrar detalles del permiso.
   * @type {ElementRef}
   */
  @ViewChild('detalle-del-permiso', { static: false }) modalDetallePermiso!: ElementRef;

  /**
   * Referencia al elemento modal para mostrar personas a notificar.
   * @type {ElementRef}
   */
  @ViewChild('personas-notificar', { static: false }) modalPersonasNotificar!: ElementRef;

  /**
   * Elemento modal para mostrar información adicional.
   */
  modalElemento!: HTMLElement | null;

  /**
   * Subject para destruir notificador.
   */
  private destruirNotificador$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite140216Store - Store para gestionar el estado del trámite 140216.
   * @param tramite140216Query - Query para obtener datos del store del trámite 140216.
   * @param suspensionPermisoService - Servicio para gestionar permisos de suspensión.
   */
  constructor(
    private fb: FormBuilder,
    private tramite140216Store: Tramite140216Store,
    private tramite140216Query: Tramite140216Query,
    private suspensionPermisoService: SuspensionPermisoService,
  ) {
    // El constructor se utiliza para la inyección de dependencias
  }

  /**
   * Inicializa el componente.
   * Suscribe a los cambios en el estado de la sección y crea el formulario reactivo.
   */
  ngOnInit(): void {
    this.tramite140216Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.busquedaPermisosState = seccionState;
          this.permisosVigentesTabla = seccionState.permisosVigentesTabla || [];
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearBusquedaPermisosForm();
  }

  /**
   * Inicializa el formulario reactivo
   * @returns {void}
   */
  crearBusquedaPermisosForm(): void {
    this.busquedaPermisosForm = this.fb.group({
      folioTramiteBusqueda: [
        this.busquedaPermisosState?.folioTramiteBusqueda,
        [Validators.required]
      ],
      motivoSuspension: [
        this.busquedaPermisosState?.motivoSuspension,
        [Validators.required]
      ],
      numAutorizacion: [
        this.busquedaPermisosState?.numAutorizacion,
        [Validators.required]
      ],
      fechaSuspension: [
        this.busquedaPermisosState?.fechaSuspension,
        [Validators.required]
      ]
    });
  }

  /**
   * Método que se ejecuta al hacer clic en el botón "Buscar".
   * Actualiza los valores en el store y llama al servicio para buscar permisos vigentes.
   * @returns {void}
   */
  relanzarGrid(): void {
    this.suspensionPermisoService.obtenerPermisosVigentes()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (permisosVigentes: PermisosVigentesRespuesta) => {
          this.permisosVigentesTabla = permisosVigentes.data.map((permiso: PermisosVigentes) => {
            return {
              numeroResolucion: permiso.numeroResolucion,
              tipoSolicitud: permiso.tipoSolicitud,
              regimen: permiso.regimen,
              clasificacionRegimen: permiso.clasificacionRegimen,
              periodoDeVigencia: permiso.periodoDeVigencia,
              fraccionArancelaria: permiso.fraccionArancelaria,
              unidad: permiso.unidad,
              nico: permiso.nico,
              nicoDescripcion: permiso.nicoDescripcion,
              acotacion: permiso.acotacion,
              cantidadAutorizada: permiso.cantidadAutorizada,
              valorAutorizada: permiso.valorAutorizada,
              fechaInicioVigencia: permiso.fechaInicioVigencia,
              fechaFinVigencia: permiso.fechaFinVigencia
            };
          });
          this.tramite140216Store.setPermisosVigentesTabla(this.permisosVigentesTabla);
        }
      });
  }

  /**
   * Método que se ejecuta al hacer clic en el botón "Limpiar".
   * @returns {void}
   */
  limpiarGrid(): void {
    this.permisosVigentesTabla = [];
    this.tramite140216Store.setPermisosVigentesTabla(this.permisosVigentesTabla);
    this.tramite140216Store.setFolioTramiteBusqueda('');
    this.tramite140216Store.setMotivoSuspension('');
    this.tramite140216Store.setNumAutorizacion('');
    this.tramite140216Store.setFechaSuspension('');
    this.busquedaPermisosForm.reset();
  }

  /**
   * Método que se ejecuta al hacer clic en el botón "Detalle del permiso".
   * @returns {void}
   */
  obtenerDetallePermiso(): void {
    this.mostrarModal('detalle-del-permiso');
  }

  /**
   * Método que se ejecuta al hacer clic en el botón "Detalle titular".
   * @returns {void}
   */
  obtenerDetalleTitular(): void {
    this.mostrarModal('detalle-rfc-facultad');
  }

  /**
   * Método que se ejecuta al hacer clic en el botón "Personas a notificar".
   * @returns {void}
   */
  obtenerPersonasNotificacion(): void {
    this.mostrarModal('personas-notificar');
  }

  /**
   * Método que se ejecuta al cambiar la fecha de suspensión.
   * Actualiza el valor en el formulario y en el store.
   * @param {string} nuevo_valor - Nuevo valor de la fecha de suspensión.
   * @returns {void}
   */
  cambioFechaSuspension(nuevo_valor: string): void {
    this.busquedaPermisosForm.patchValue({
      fechaSuspension: nuevo_valor,
    });
    this.tramite140216Store.setFechaSuspension(nuevo_valor);
  }

  /**
   * Muestra un modal específico.
   * @param id - El ID del modal que se va a mostrar.
   * @returns {void}
   */
  mostrarModal(id: string): void {
    this.modalElemento = document.getElementById(id);
    if (this.modalElemento) {
      const MODAL = Modal.getOrCreateInstance(this.modalElemento);
      MODAL.show();
    }
  }

  /**
   * Establece los valores en el store de tramite140216.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite140216Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite140216Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}