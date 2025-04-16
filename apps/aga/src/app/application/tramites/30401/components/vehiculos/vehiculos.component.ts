import {
  CategoriaMensaje,
  Notificacion,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TipoNotificacionEnum,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  Tramite30401Store,
  Tramites30401State,
} from '../../estados/tramites30401.store';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { NOTA } from '../../enums/registro-empresas-transporte.enum';
import { Tramite30401Query } from '../../estados/tramites30401.query';
import { VehiculosTabla } from '../../modelos/registro-empresas-transporte.model';

/**
 * VehiculosComponent is responsible for managing the vehicle registration process,
 * including form handling, modal interactions, and state management.
 */
@Component({
  selector: 'app-vehiculos',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    TituloComponent,
    ReactiveFormsModule,
    NotificacionesComponent,
  ],
  templateUrl: './Vehiculos.component.html',
  styleUrl: './Vehiculos.component.scss',
})
export class VehiculosComponent implements OnInit {
  /**
   * Define si el diálogo exitoso está habilitado.
   *
   * @property esHabilitarElDialogo
   * @type {boolean}
   * @default false
   */
  esHabilitarElDialogo: boolean = false;

  /**
   * Reactive form for vehicle registration.
   */
  registroVehiculosForm!: FormGroup;

  /**
   * Type of table selection (CHECKBOX).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * List of registered vehicles.
   */
  vehiculosInfoList: VehiculosTabla[] = [] as VehiculosTabla[];

  /**
   * Name of the active tab.
   */
  activeTab: string = 'parquevehicular';

  /**
   * Reference to the vehicle registration modal element.
   */
  @ViewChild('registroDeVehiculos') registroDeVehiculosElemento!: ElementRef;

  /**
   * Reference to the confirmation modal element.
   */
  @ViewChild('modalDeConfirmacion') confirmacionElemento!: ElementRef;

  /**
   * Constant for the vehicle confirmation note.
   */
  CONFIRMACION_VEHICULO = NOTA.CONFIRMACION_VEHICULO;

  /**
   * Configuration for the vehicle table columns.
   */
  ParqueVehicular = [
    {
      encabezado: 'Marca',
      clave: (item: VehiculosTabla) => item.marca,
      orden: 1,
    },
    {
      encabezado: 'Modelo (s)',
      clave: (item: VehiculosTabla) => item.modelo,
      orden: 2,
    },
    {
      encabezado: 'Número de identificación vehicular o serie del vehículo',
      clave: (item: VehiculosTabla) => item.Vin,
      orden: 3,
    },
  ];

  /**
   * Subject used to track component destruction.
   * It helps in unsubscribing from observables to avoid memory leaks.
   */
  destroyed$: Subject<void> = new Subject();

  /**
   * Indica si el popup está abierto.
   */
  multipleSeleccionPopupAbierto: boolean = false;

  /**
   * Indica si el popup está abierto.
   */
  confirmEliminarPopupAbierto: boolean = false;

  /**
   * Notificación que se muestra al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Fila seleccionada en la tabla de mercancías.
   */
  filaSeleccionadaVehiculos!: VehiculosTabla;

  /**
   * Lista de filas seleccionadas en la tabla de mercancías.
   */
  listaFilaSeleccionadaVehiculos: VehiculosTabla[] = [] as VehiculosTabla[];

  /**
   * Indica si el botón de eliminar está habilitado.
   */
  enableEliminarBoton: boolean = false;

  /**
   * Indica si un archivo está seleccionado.
   */
  enableModficarBoton: boolean = false;

  /**
   * Indica si el popup está cerrado.
   */
  confirmEliminarPopupCerrado: boolean = true;

  /**
   * Indica si se debe mostrar el modal de datos de mercancía.
   */
  mostrarModalDatosVehiculos: boolean = false;

  /**
   * Indica si el popup está cerrado.
   */
  multipleSeleccionPopupCerrado: boolean = true;

  /**
   * @property {Tramites30401State} seccionState
   * Estado actual del formulario.
   */
  public seccionState!: Tramites30401State;

  /**
   * Constructor for VehiculosComponent.
   * Initializes the form and injects necessary services.
   * @param fb - FormBuilder for creating reactive forms.
   * @param tramite30401Store - Store for managing state related to Tramite 30401.
   */
  constructor(
    public fb: FormBuilder,
    private tramite30401Store: Tramite30401Store,
    private tramite30401Query: Tramite30401Query
  ) {
    this.crearFormulario();
  }

/**
 * Método del ciclo de vida que se ejecuta cuando el componente se inicializa.
 * - Se suscribe a `selectTramite30401$` para obtener datos del estado.
 * - Actualiza `seccionState` con la información más reciente del estado.
 * - Asigna `VehiculosTablaDatos` a `vehiculosInfoList`.
 *
 * La suscripción está gestionada con `takeUntil(this.destroyed$)` 
 * para garantizar la limpieza cuando el componente se destruye.
 */
  ngOnInit(): void {
    this.tramite30401Query.selectTramite30401$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos: Tramites30401State) => {
        this.seccionState = datos;
      });

    this.vehiculosInfoList = this.seccionState.vehiculosTablaDatos;
  }

  /**
   * Crea el formulario reactivo para el registro de vehículos.
   */
  crearFormulario(): void {
    this.registroVehiculosForm = this.fb.group({
      id: [null],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      Vin: ['', [Validators.required, Validators.maxLength(17)]],
    });
  }

  /**
   * Abre el cuadro de diálogo modal para el registro de vehículos.
   */
  agregarDialogoDatos(): void {
    if (this.registroDeVehiculosElemento) {
      const MODAL_INSTANCIA = new Modal(
        this.registroDeVehiculosElemento?.nativeElement
      );
      MODAL_INSTANCIA.show();
    }
  }

  /**
   * Envía los datos del formulario y muestra el modal de confirmación.
   * Si el formulario es inválido, marca todos los campos como tocados.
   */
  enviarDialogData(): void {
    if (this.registroVehiculosForm.valid) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: this.CONFIRMACION_VEHICULO,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };

      this.esHabilitarElDialogo = true;
      this.vehiculosInfoDatos();
      this.limpiarFormulario();
      this.cambiarEstadoModal();
    } else {
      this.registroVehiculosForm.markAllAsTouched();
    }
  }

  /**
   * Cancela el cuadro de diálogo modal para el registro de vehículos.
   * Este método oculta el modal y restablece el formulario.
   */
  modalCancelar(): void {
    this.cambiarEstadoModal();
    this.limpiarFormulario();
  }

  /**
   * Restablece el formulario de registro de vehículos a su estado inicial.
   */
  limpiarFormulario(): void {
    this.registroVehiculosForm.reset();
  }

  /**
   * Alterna la visibilidad del cuadro de diálogo modal para el registro de vehículos.
   * Si el modal está visible actualmente, se ocultará.
   */
  cambiarEstadoModal(): void {
    const MODAL_INSTANCIA = Modal.getInstance(
      this.registroDeVehiculosElemento.nativeElement
    );
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
  }

  /**
   * Agrega los datos actuales del formulario a la lista de vehículos registrados.
   * Los datos del formulario se añaden al array `vehiculosInfoList`.
   */
  vehiculosInfoDatos(): void {
    if (
      !this.filaSeleccionadaVehiculos ||
      Object.keys(this.filaSeleccionadaVehiculos).length === 0
    ) {
      const OBJ = {
        id: this.vehiculosInfoList.length
          ? this.vehiculosInfoList[this.vehiculosInfoList.length - 1]?.id + 1
          : (1 as number),
        marca: this.registroVehiculosForm.get('marca')?.value,
        modelo: this.registroVehiculosForm.get('modelo')?.value,
        Vin: this.registroVehiculosForm.get('Vin')?.value,
      };
      this.vehiculosInfoList = [...this.vehiculosInfoList, OBJ];
      this.tramite30401Store.setVehiculosTablaDatos([OBJ]);
    } else {
      const UPDATELIST = this.vehiculosInfoList.map((item) =>
        item.id === this.filaSeleccionadaVehiculos.id
          ? {
              ...item,
              marca: this.registroVehiculosForm.get('marca')?.value,
              modelo: this.registroVehiculosForm.get('modelo')?.value,
              Vin: this.registroVehiculosForm.get('Vin')?.value,
            }
          : item
      );

      this.vehiculosInfoList = UPDATELIST;
      this.tramite30401Store.setVehiculosTablaDatos(UPDATELIST);
      this.filaSeleccionadaVehiculos = {} as VehiculosTabla;
    }
  }
  /**
   * Método para cerrar el modal de confirmación.
   * @returns {void}
   */
  cerrarModal(): void {
    this.esHabilitarElDialogo = false;
  }

  /**
   * Maneja la fila seleccionada en la tabla de mercancías.
   * fila Fila seleccionada.
   */
  manejarFilaSeleccionada(fila: VehiculosTabla[]): void {
    if (fila.length === 0) {
      this.enableModficarBoton = false;
      this.enableEliminarBoton = false;
      return;
    }
    this.listaFilaSeleccionadaVehiculos = fila;
    this.filaSeleccionadaVehiculos = fila[fila.length - 1];
    this.enableModficarBoton = true;
    this.enableEliminarBoton = true;
  }

  /**
   * Actualiza la fila seleccionada con los datos más recientes de la tabla.
   */
  actualizarFilaSeleccionada(): void {
    const DATOS_ACTUALIZADOS = this.vehiculosInfoList.find(
      (item) => item.id === this.filaSeleccionadaVehiculos.id
    );

    if (DATOS_ACTUALIZADOS) {
      this.filaSeleccionadaVehiculos = { ...DATOS_ACTUALIZADOS };
    }
  }

  /**
   * Filtra y elimina los elementos seleccionados de la tabla de mercancías.
   * Actualiza el estado del almacén y cierra el popup de confirmación de eliminación.
   */
  eliminarVehiculosItem(): void {
    const IDS_TO_DELETE = this.listaFilaSeleccionadaVehiculos.map(
      (item) => item.id
    );

    this.vehiculosInfoList = this.vehiculosInfoList.filter(
      (item) => !IDS_TO_DELETE.includes(item.id)
    );

    this.listaFilaSeleccionadaVehiculos = [];
    this.tramite30401Store.setVehiculosTablaDatos(this.vehiculosInfoList);
    this.cerrarEliminarConfirmationPopup();
  }

  /**
   * Cierra el popup de confirmación de eliminación.
   */
  cerrarEliminarConfirmationPopup(): void {
    this.confirmEliminarPopupAbierto = false;
    this.confirmEliminarPopupCerrado = false;
  }

  /**
   * Modifica los datos de una fila seleccionada en la tabla de mercancías.
   * Actualiza el formulario de mercancía con los datos de la fila seleccionada
   * y abre el modal para editar los datos.
   */
  modificarItemVehiculos(): void {
    if (this.listaFilaSeleccionadaVehiculos && this.listaFilaSeleccionadaVehiculos?.length === 1) {
      this.actualizarFilaSeleccionada();
      this.agregarDialogoDatos();
      this.patchModifyiedData();
    } else {
      this.abrirMultipleSeleccionPopup();
    }
  }

  /**
   * @method patchModifyiedData
   * Rellena el formulario con los datos de la fila seleccionada para su modificación.
   * Este método utiliza `patchValue` para actualizar los valores del formulario.
   */
  patchModifyiedData():void {
    this.registroVehiculosForm.patchValue({
      id: this.filaSeleccionadaVehiculos?.id,
      marca: this.filaSeleccionadaVehiculos?.marca,
      modelo: this.filaSeleccionadaVehiculos?.modelo,
      Vin: this.filaSeleccionadaVehiculos?.Vin,
    });
  }

  /**
   * @method abrirMultipleSeleccionPopup
   * Muestra un popup de error si se seleccionan múltiples filas para modificar.
   * Este método se activa cuando el botón de modificar está habilitado.
   */
  abrirMultipleSeleccionPopup(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: '',
      mensaje: 'Selecciona sólo un registro para modificar.',
      cerrar: false,
      txtBtnAceptar: 'Cerca',
      txtBtnCancelar: '',
    };
    if (this.enableModficarBoton) {
      this.multipleSeleccionPopupAbierto = true;
    }
  }

  /**
   * Confirma la eliminación de los elementos seleccionados en la tabla de mercancías.
   * Si no hay elementos seleccionados, no realiza ninguna acción.
   * Si hay elementos seleccionados, abre el popup de confirmación de eliminación.
   */
  confirmEliminarVehiculosItem(): void {
    if (this.listaFilaSeleccionadaVehiculos.length === 0) {
      return;
    }
    this.abrirElimninarConfirmationopup();
  }

  /**
   * @method abrirElimninarConfirmationopup
   * Abre un popup de confirmación para eliminar los registros seleccionados.
   * Si no hay registros seleccionados, no realiza ninguna acción.
   */
  abrirElimninarConfirmationopup(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ERROR,
      modo: 'modal',
      titulo: '',
      mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
      cerrar: false,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
    this.confirmEliminarPopupAbierto = true;
  }

  /**
 * Cierra el popup de selección múltiple.
 */
  cerrarMultipleSeleccionPopup(): void {
    this.multipleSeleccionPopupAbierto = false;
    this.multipleSeleccionPopupCerrado = false;
  }

  /**
   * Checks if a form control is invalid, touched, or dirty.
   * @param nombreControl - The name of the form control to check.
   * @returns True if the control is invalid, otherwise false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.registroVehiculosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }
}
