import {
  Catalogo,
  CatalogoSelectComponent,
  CategoriaMensaje,
  Notificacion,
  NotificacionesComponent,
  REGEX_RFC,
  REG_X,
  TablaDinamicaComponent,
  TablaSeleccion,
  TipoNotificacionEnum,
} from '@libs/shared/data-access-user/src';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MENSAJE_DE_VALIDACION, NOTA, NUMERO_EMPLEADOS_TABLA_DATOS } from '../../enums/oea-textil-registro.enum';
import { Subject, map, takeUntil} from 'rxjs';
import { Tramite32609Store, Tramites32609State } from '../../estados/tramites32609.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { NumeroEmpleadosTabla } from '../../modelos/oea-textil-registro.model';
import { OeaTextilRegistroService } from '../../services/oea-textil-registro.service';
import { Tramite32609Query } from '../../estados/tramites32609.query';


/**
 * Componente NumeroEmpleadosBimestreComponent para la gestión de vehículos dentro del sistema.
 * 
 * Este componente independiente (`standalone`) se encarga de la interacción con la tabla dinámica,
 * el manejo de formularios reactivos, y la visualización de notificaciones. Proporciona una interfaz
 * intuitiva para la gestión de vehículos registrados.
 * 
 * @component
 * @selector app-vehiculos
 * @standalone true
 * @imports CommonModule, TablaDinamicaComponent, TituloComponent, ReactiveFormsModule, NotificacionesComponent
 * @templateUrl ./Empleado.component.html
 * @styleUrl ./Empleado.component.scss
 */
@Component({
  selector: 'app-numero-empleados-bimestre',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    ReactiveFormsModule,
    NotificacionesComponent,
  ],
  templateUrl: './numero-empleados-bimestre.component.html',
  styleUrl: './numero-empleados-bimestre.component.scss',
})
export class NumeroEmpleadosBimestreComponent implements OnInit, OnDestroy {
    /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Define si el diálogo exitoso está habilitado.
   *
   * @property esHabilitarElDialogo
   * @type {boolean}
   * @default false
   */
  esHabilitarElDialogo: boolean = false;

  /**
   * Formulario reactivo para el registro de vehículos.
   */
  registroNumeroEmpleadosForm!: FormGroup;

  /**
   * Formulario para gestionar los archivos adjuntos.
   *
   * Permite capturar y validar los datos relacionados con los archivos adjuntos.
   */
  formularioArchivo!: FormGroup;

  /**
   * Formulario para capturar el RFC.
   *
   * Este formulario es utilizado para validar y capturar el RFC del usuario.
   */
  rfcForm!: FormGroup;

  /**
   * Tipo de selección de tabla (CHECKBOX).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Lista de vehículos registrados.
   */
  numeroEmpleadosBimestreList: NumeroEmpleadosTabla[] = [] as NumeroEmpleadosTabla[];

  /**
   * Nombre de la pestaña activa.
   */
  activeTab: string = 'parquevehicular';

  /**
   * Referencia al elemento modal para el registro de vehículos.
   */
  @ViewChild('registroDeNumeroEmpleados') registroDeNumeroEmpleadosElemento!: ElementRef;

  /**
   * Referencia al elemento modal de confirmación.
   */
  @ViewChild('modalDeConfirmacion') confirmacionElemento!: ElementRef;

  /**
   * Constante para la nota de confirmación del vehículo.
   */
  CONFIRMACION_NUMEROEMPLEADOS = NOTA.CONFIRMACION_NUMEROEMPLEADOS;

  MENSAJE_DE_VALIDACION = MENSAJE_DE_VALIDACION;

 /**
   * Configuración para las columnas de la tabla de vehículos.
   */
  ParqueVehicular = NUMERO_EMPLEADOS_TABLA_DATOS;

  /**
   * Subject utilizado para rastrear la destrucción del componente.
   * Ayuda a cancelar la suscripción de observables para evitar fugas de memoria.
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
  filaSeleccionadaNumeroEmpleados!: NumeroEmpleadosTabla;

  /**
   * Lista de filas seleccionadas en la tabla de mercancías.
   */
  listaFilaSeleccionadaEmpleado: NumeroEmpleadosTabla[] = [] as NumeroEmpleadosTabla[];

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
  mostrarModalDatosEmpleado: boolean = false;

  /**
   * Indica si el popup está cerrado.
   */
  multipleSeleccionPopupCerrado: boolean = true;

  /**
   * @property {Tramites32609State} seccionState
   * Estado actual del formulario.
   */
  public seccionState!: Tramites32609State;

   /**
     * Lista de bimestres.
     */
    @Input() bimestreList!: Catalogo[];

  /**
   * Indica si el formulario es colapsable.
   */
  colapsable: boolean = true;

  /**
   * Constructor para NumeroEmpleadosBimestreComponent.
   * Inicializa el formulario e inyecta los servicios necesarios.
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param tramite32609Store - Store para gestionar el estado relacionado con el Trámite 32609.
   */
  constructor(
    public fb: FormBuilder,
    private tramite32609Store: Tramite32609Store,
    private tramite32609Query: Tramite32609Query,
    private consultaioQuery: ConsultaioQuery,
    private servicio: OeaTextilRegistroService
  ) {
      this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
      })
    )
    .subscribe();
    this.crearFormulario();
  }

  /**
   * Método del ciclo de vida que se ejecuta cuando el componente se inicializa.
   * - Se suscribe a `selectTramite32609$` para obtener datos del estado.
   * - Actualiza `seccionState` con la información más reciente del estado.
   * - Asigna `NumeroEmpleadosTablaDatos` a `numeroEmpleadosBimestreList`.
   *
   * La suscripción está gestionada con `takeUntil(this.destroyed$)`
   * para garantizar la limpieza cuando el componente se destruye.
   */
  ngOnInit(): void {
    this.tramite32609Query.selectTramite32609$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos: Tramites32609State) => {
        this.seccionState = datos;
      });

    this.numeroEmpleadosBimestreList = this.seccionState.numeroEmpleadosBimestre;
  }

  /**
   * Crea el formulario reactivo para el registro de vehículos.
   */
  crearFormulario(): void {

    this.rfcForm = this.fb.group({
      rfcInput: ['', Validators.required]
    });

    this.registroNumeroEmpleadosForm = this.fb.group({
      id: [null],
      rfc: ['', [Validators.required, Validators.pattern(REGEX_RFC)]],
      denominacionSocial: ['', Validators.required],
      numeroDeEmpleados: ['', [Validators.required, Validators.pattern(REG_X.SOLO_NUMEROS)]],
      bimestre: [null, Validators.required]
    });
  }


  /**
   * Abre el cuadro de diálogo modal para el registro de vehículos.
   */
  agregarDialogoDatos(): void {
    if (this.registroDeNumeroEmpleadosElemento) {
      const MODAL_INSTANCIA = new Modal(
        this.registroDeNumeroEmpleadosElemento?.nativeElement,
        { backdrop: false }
      );
      MODAL_INSTANCIA.show();
    }
  }

  /**
   * Envía los datos del formulario y muestra el modal de confirmación.
   * Si el formulario es inválido, marca todos los campos como tocados.
   */
  enviarDialogData(): void {
    if (this.registroNumeroEmpleadosForm.valid) {
      this.enNuevaNotificacion(this.CONFIRMACION_NUMEROEMPLEADOS);
       this.esHabilitarElDialogo = true;
      this.NumeroEmpleadosInfoDatos();
      this.registroNumeroEmpleadosForm.reset();
      this.cambiarEstadoModal();
    } else {
      this.enNuevaNotificacion(this.MENSAJE_DE_VALIDACION);
      this.esHabilitarElDialogo = true;
      this.registroNumeroEmpleadosForm.markAllAsTouched();
    }
  }

  /**
   * Envía los datos del formulario y muestra el modal de confirmación.
   */
  enNuevaNotificacion(datos:string):void {
     this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: datos,
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
  }

  /**
   * Cancela el cuadro de diálogo modal para el registro de vehículos.
   * Este método oculta el modal y restablece el formulario.
   */
  modalCancelar(): void {
    this.cambiarEstadoModal();
  }

  /**
   * Alterna la visibilidad del cuadro de diálogo modal para el registro de vehículos.
   * Si el modal está visible actualmente, se ocultará.
   */
  cambiarEstadoModal(): void {
    const MODAL_INSTANCIA = Modal.getInstance(
      this.registroDeNumeroEmpleadosElemento.nativeElement
    );
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
  }

  /**
   * Agrega los datos actuales del formulario a la lista de vehículos registrados.
   * Los datos del formulario se añaden al array `numeroEmpleadosBimestreList`.
   */
  NumeroEmpleadosInfoDatos(): void {
    const OBTENER_DESCRIPCION = (array: Catalogo[], index: number): string =>
      array[index - 1]?.descripcion || '';

    const {
      denominacionSocial: DENOMINACION_SOCIAL,
      rfc: RFC,
      numeroDeEmpleados: NUMERO_DE_EMPLEADOS,
      numeroUno: NUMERO_UNO,
      bimestre: BIMESTRE,
    } = this.registroNumeroEmpleadosForm.value;

    const SELECTEDBIMESTRE= OBTENER_DESCRIPCION(
        this.bimestreList,
        BIMESTRE
      );
    

    if (
      !this.filaSeleccionadaNumeroEmpleados ||
      Object.keys(this.filaSeleccionadaNumeroEmpleados).length === 0
    ) {
      const ID = this.numeroEmpleadosBimestreList.length
        ? this.numeroEmpleadosBimestreList[this.numeroEmpleadosBimestreList.length - 1]?.id + 1
        : 1;

      const OBJETO = { id: ID, denominacionSocial: DENOMINACION_SOCIAL, rfc: RFC, numeroDeEmpleados: NUMERO_DE_EMPLEADOS, numeroUno: NUMERO_UNO, bimestre: SELECTEDBIMESTRE } as NumeroEmpleadosTabla;

      this.numeroEmpleadosBimestreList = [...this.numeroEmpleadosBimestreList, OBJETO];
      this.tramite32609Store.establecerDatos({numeroEmpleadosBimestre:this.numeroEmpleadosBimestreList});
    } else {
      this.numeroEmpleadosBimestreList = this.numeroEmpleadosBimestreList.map((elemento) =>
        elemento.id === this.filaSeleccionadaNumeroEmpleados.id
          ? { ...elemento, denominacionSocial: DENOMINACION_SOCIAL, rfc: RFC, numeroDeEmpleados: NUMERO_DE_EMPLEADOS, numeroUno: NUMERO_UNO, bimestre: SELECTEDBIMESTRE }
          : elemento
      );

      this.tramite32609Store.establecerDatos({numeroEmpleadosBimestre:this.numeroEmpleadosBimestreList});
      this.filaSeleccionadaNumeroEmpleados = {} as NumeroEmpleadosTabla;
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
  manejarFilaSeleccionada(fila: NumeroEmpleadosTabla[]): void {
    this.listaFilaSeleccionadaEmpleado = fila;
      if (fila.length === 0) {
      this.filaSeleccionadaNumeroEmpleados = {} as NumeroEmpleadosTabla;
      this.enableModficarBoton = false;
      this.enableEliminarBoton = false;
      return;
    }
  this.filaSeleccionadaNumeroEmpleados = fila[fila.length - 1];
  }
  

  /**
   * Actualiza la fila seleccionada con los datos más recientes de la tabla.
   */
  actualizarFilaSeleccionada(): void {
    const DATOS_ACTUALIZADOS = this.numeroEmpleadosBimestreList.find(
      (item) => item.id === this.filaSeleccionadaNumeroEmpleados.id
    );

    if (DATOS_ACTUALIZADOS) {
      this.filaSeleccionadaNumeroEmpleados = { ...DATOS_ACTUALIZADOS };
    }
  }

  /**
   * Filtra y elimina los elementos seleccionados de la tabla de mercancías.
   * Actualiza el estado del almacén y cierra el popup de confirmación de eliminación.
   */
  eliminarEmpleadoItem(evento:boolean): void {
    if(evento === true) {
      const IDS_TO_DELETE = this.listaFilaSeleccionadaEmpleado.map(
        (item) => item.id
      );

      this.numeroEmpleadosBimestreList = this.numeroEmpleadosBimestreList.filter(
        (item) => !IDS_TO_DELETE.includes(item.id)
      );

      this.listaFilaSeleccionadaEmpleado = [];
      this.filaSeleccionadaNumeroEmpleados = {} as NumeroEmpleadosTabla;
      this.tramite32609Store.establecerDatos({numeroEmpleadosBimestre:this.numeroEmpleadosBimestreList});
      this.cerrarEliminarConfirmationPopup();
    }
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
  modificarItemEmpleado(): void {
    const SELECCIONADAS = this.listaFilaSeleccionadaEmpleado;
  
    if (!SELECCIONADAS || SELECCIONADAS.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: 'Selecciona un registro',
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
      this.multipleSeleccionPopupAbierto = true;
      return;
    }
  
    if (SELECCIONADAS.length > 1) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: 'Selecciona sólo un registro para modificar.',
        cerrar: false,
        txtBtnAceptar: 'Cerrar',
        txtBtnCancelar: '',
      };
      this.multipleSeleccionPopupAbierto = true;
      return;
    }
    this.actualizarFilaSeleccionada();
    this.agregarDialogoDatos();
    this.patchModifyiedData();
  }
  
  /**
   * @method patchModifyiedData
   * Rellena el formulario con los datos de la fila seleccionada para su modificación.
   * Este método utiliza `patchValue` para actualizar los valores del formulario.
   */
  patchModifyiedData(): void {
     const OBTENER_INDICE = (array: Catalogo[], value: string): number =>
      array.findIndex((item) => item.descripcion === value) + 1;
    const BIMESTRE = OBTENER_INDICE(this.bimestreList, this.filaSeleccionadaNumeroEmpleados?.bimestre);
    this.registroNumeroEmpleadosForm.patchValue({
      id: this.filaSeleccionadaNumeroEmpleados?.id,
      denominacionSocial: this.filaSeleccionadaNumeroEmpleados?.denominacionSocial,
      rfc: this.filaSeleccionadaNumeroEmpleados?.rfc,
      numeroDeEmpleados: this.filaSeleccionadaNumeroEmpleados?.numeroDeEmpleados,
      bimestre: BIMESTRE,
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
      txtBtnAceptar: 'Cerrar',
      txtBtnCancelar: '',
    };
    this.multipleSeleccionPopupAbierto = true;
  }

  /**
   * Confirma la eliminación de los elementos seleccionados en la tabla de mercancías.
   * Si no hay elementos seleccionados, no realiza ninguna acción.
   * Si hay elementos seleccionados, abre el popup de confirmación de eliminación.
   */
  confirmEliminarEmpleadoItem(): void {
    if (this.listaFilaSeleccionadaEmpleado.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: TipoNotificacionEnum.ALERTA,
        categoria: CategoriaMensaje.ALERTA,
        modo: 'modal',
        titulo: '',
        mensaje: 'Debes seleccionar al menos un registro para eliminar.',
        cerrar: false,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: '',
      };
      this.multipleSeleccionPopupAbierto = true;
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
   * Verifica si un control de formulario es inválido, está tocado o ha sido modificado.
   * @param nombreControl - El nombre del control de formulario a verificar.
   * @returns Verdadero si el control es inválido, de lo contrario, falso.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.registroNumeroEmpleadosForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Busca los detalles del RFC para una persona física nacional (PFN).
   * Si el RFC tiene longitud mayor a 0, realiza una llamada al servicio para obtener los detalles.
   * Actualiza el formulario con la denominación social y el número de empleados obtenidos.
   * @param rfc - El RFC de la persona física nacional.
   */
  onBuscarRfc(): void {
    if (this.rfcForm.valid) {
      this.servicio.getRFCDetails().pipe(
        takeUntil(this.destroyed$)
      ).subscribe({
        next: (result) => {
          const DATOS = result.data;
          this.registroNumeroEmpleadosForm.patchValue({
            rfc: DATOS.rfc,
            denominacionSocial: DATOS.denominacionSocial,
          });
        }
      });
    }

  }

  /**
   * Restablece el formulario de registro de vehículos a su estado inicial.
   */
  limpiarFormulario(): void {
    this.registroNumeroEmpleadosForm.reset();
  }
  
   /**
   * Método para mostrar u ocultar el formulario colapsable.
   * Cambia el estado de la variable `colapsable`.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }
  /**
   * @method ngOnDestroy
   * Hook de ciclo de vida que se ejecuta al destruir el componente.
   * Libera recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
