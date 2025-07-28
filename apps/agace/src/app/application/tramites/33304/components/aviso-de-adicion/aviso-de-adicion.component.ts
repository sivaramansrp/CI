import {
  Catalogo,
  CatalogoSelectComponent,
  CategoriaMensaje,
  ConfiguracionColumna,
  Notificacion,
  NotificacionesComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TipoNotificacionEnum,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  Solicitud33304State,
  Solicitud33304Store,
} from '../../estados/solicitud33304Store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { EMPRESAS_TRANSPORTISTAS_TABLA_DATOS } from '../../constants/solicitud32101.enum';
import { Modal } from 'bootstrap';
import { Solicitud33304Query } from '../../estados/solicitud33304Query';
import { SolicitudService } from '../../services/solicitud.service';
import { TablaEmpresaTransportista } from '../../modelos/aviso-de-transportistas.model';


@Component({
  selector: 'app-aviso-de-adicion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    FormsModule,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    NotificacionesComponent
  ],
  templateUrl: './aviso-de-adicion.component.html',
  styleUrl: './aviso-de-adicion.component.scss',
})
export class AvisoDeAdicionComponent implements OnInit, OnDestroy {
  /**
   * Referencia al elemento DOM del modal de enlace operativo.
   */
  @ViewChild('transportistaElemento') transportistaElemento!: ElementRef;

  /**
   * Formulario reactivo para el registro y edición de enlaces operativos.
   */
  transportistaForm!: FormGroup;

  /**
   * Referencia de solo lectura al enumerado de tipos de selección de tabla.
   */
  public readonly TablaSeleccion = TablaSeleccion;

  /**
   * Configuración de columnas para la tabla dinámica de enlaces operativos.
   */
  public readonly configuracionTabla: ConfiguracionColumna<TablaEmpresaTransportista>[] =
    EMPRESAS_TRANSPORTISTAS_TABLA_DATOS;

  /**
   * Datos de la tabla de enlaces operativos.
   */
  empresaTransportistaData: TablaEmpresaTransportista[] =
    [] as TablaEmpresaTransportista[];

  /**
   * Lista de filas seleccionadas en la tabla de enlaces operativos.
   */
  listaFilaSeleccionadaEnlace: TablaEmpresaTransportista[] = [];

  /**
   * Fila actualmente seleccionada en la tabla de enlaces operativos.
   */
  filaSeleccionadaEnlaceOperativo!: TablaEmpresaTransportista;

  /**
   * Indica si el botón de modificar está habilitado.
   */
  enableModficarBoton: boolean = false;

   /**
   * Indica si el botón de eliminar está habilitado.
   */
  enableEliminarBoton: boolean = false;

  /** Indica si una fila ha sido seleccionada en la tabla. */
  esFilaSeleccionada: boolean = false;

  /**
   * Indica si el popup de selección múltiple está abierto.
  */
  multipleSeleccionPopupAbierto: boolean = false;

  /**
   * Indica si el formulario está en modo de edición.
   */
  modoEdicion: boolean = false;

  /**
   * Catálogo de estatus disponibles para el formulario.
   */
  estatus!: Catalogo[];

  /**
   * ID del registro que se está editando actualmente.
   */
  registroEditandoId?: number;

  /**
   * Configuración de notificación actual para mostrar al usuario.
   */
  public nuevaNotificacion!: Notificacion;
  
  /**
   * Indica si el formulario está en modo de solo lectura.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Subject para gestionar la destrucción de suscripciones.
   */
  private readonly destroyed$: Subject<void> = new Subject();

  /**
   * @property {Solicitud33304State} seccionState
   * Estado actual del formulario.
   */
  public seccionState!: Solicitud33304State;

  constructor(
    public fb: FormBuilder,
    private solicitudService: SolicitudService,
    private solicitud33304Store: Solicitud33304Store,
    private solicitud33304Query: Solicitud33304Query,
    private consultaioQuery: ConsultaioQuery
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
   * - Se suscribe a `selectTramite30401$` para obtener datos del estado.
   * - Actualiza `seccionState` con la información más reciente del estado.
   * - Asigna `AgentesTablaDatos` a `avisoListaTransportistas`.
   *
   * La suscripción está gestionada con `takeUntil(this.destroyed$)`
   * para garantizar la limpieza cuando el componente se destruye.
   */
  ngOnInit(): void {
     this.inicializaCatalogos();
    this.solicitud33304Query.selectSolicitud$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((datos: Solicitud33304State) => {
        this.seccionState = datos;
        this.empresaTransportistaData = this.seccionState.transportistasLista;
      });

    this.transportistaForm = this.fb.group({
      id: [null],
      registroContribuyente: [''],
      rfc: [''],
      denominacion: [''],
      domicilio: [''],
      registroCaat: [''],
      estatus: [''],
    });
  }

  /**
   * Crea el formulario reactivo para el registro de vehículos.
   */
  crearFormulario(): void {
    this.transportistaForm = this.fb.group({
      id: [null],
      rfc: [''],
      denominacion: [''],
      domicilio: [''],
      registroCaat: [''],
      estatus: [''],
    });
  }

    /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    this.solicitudService.getEstatus().subscribe((resp) => {
    this.estatus = resp.data;
  });
  }

  /**
   * Maneja la selección de filas en la tabla de enlaces operativos.
   *
   * @description
   * Actualiza el estado de las filas seleccionadas y controla la habilitación
   * de los botones de modificar y eliminar. Si no hay filas seleccionadas,
   * deshabilita los botones y limpia la selección.
   *
   */
  manejarFilaSeleccionada(fila: TablaEmpresaTransportista[]): void {
    this.listaFilaSeleccionadaEnlace = fila;
    if (fila.length === 0) {
      this.filaSeleccionadaEnlaceOperativo = {} as TablaEmpresaTransportista;
      this.enableModficarBoton = false;
      this.enableEliminarBoton = false;
      return;
    }
    this.filaSeleccionadaEnlaceOperativo = fila[fila.length - 1];
  }
  
  /**
   * Abre el cuadro de diálogo modal para el registro de enlaces operativos.
   *
   * @description
   * Inicializa y muestra el modal de Bootstrap para permitir al usuario
   * ingresar o editar información de enlaces operativos. Requiere que
   * el ViewChild esté inicializado.
   */
  agregarDialogoDatos(): void {
    if (this.transportistaElemento) {
      const MODAL_INSTANCIA = new Modal(
        this.transportistaElemento?.nativeElement
      );
      MODAL_INSTANCIA.show();
    }
  }
  
  /**
   * Método para cerrar el modal de confirmación.
   * @returns {void}
   */
  cerrarModal(): void {
    this.esFilaSeleccionada = false;
    this.multipleSeleccionPopupAbierto = false;
  }

 modificarItemTransportista(): void {
    this.cerrarModal();
    if(this.empresaTransportistaData.length === 0) {
      this.abrirMultipleSeleccionPopup('', 'No se encontró información');
      this.esFilaSeleccionada = true;
      return;
    }
    if (this.listaFilaSeleccionadaEnlace.length === 0) {
     this.abrirMultipleSeleccionPopup('', 'Seleccione un registro');
      this.esFilaSeleccionada = true;
      return;
    } if (
      this.listaFilaSeleccionadaEnlace &&
      this.listaFilaSeleccionadaEnlace.length === 1
    ) {
      this.filaSeleccionadaEnlaceOperativo = {
        ...this.listaFilaSeleccionadaEnlace[0],
      };
      this.registroEditandoId = this.filaSeleccionadaEnlaceOperativo.id;
      this.modoEdicion = true;
      this.agregarDialogoDatos();
      this.actualizarDatosModificados();
    }
  }

   /**
   * Actualiza el formulario con los datos de la fila seleccionada para modificación.
   *
   * @description
   * Llena todos los campos del formulario con los valores de la fila seleccionada
   * para permitir la edición. Utiliza patchValue para actualizar solo los
   * campos especificados sin afectar el resto del formulario.
   */
  actualizarDatosModificados(): void {
    if (!this.filaSeleccionadaEnlaceOperativo) {
      return;
    }
    this.transportistaForm.patchValue({
      rfc: this.filaSeleccionadaEnlaceOperativo.rfc,
      denominacion: this.filaSeleccionadaEnlaceOperativo.denominacion,
      domicilio: this.filaSeleccionadaEnlaceOperativo.domicilio,
      registroCaat: this.filaSeleccionadaEnlaceOperativo.registroCaat,  
      estatus: this.filaSeleccionadaEnlaceOperativo.estatus,
      id: this.filaSeleccionadaEnlaceOperativo.id,
    });
  }

  /**
   * @method abrirMultipleSeleccionPopup
   * Muestra un popup de notificación con contenido dinámico.
   * Este método permite personalizar el título, mensaje y etiquetas de los botones del popup.
   * @param titulo - Título del popup
   * @param mensaje - Mensaje a mostrar en el popup
   * @param txtBtnAceptar - Texto del botón de aceptar (opcional, por defecto 'Cerrar')
   * @param txtBtnCancelar - Texto del botón de cancelar (opcional, por defecto '')
   */
  abrirMultipleSeleccionPopup(
    titulo: string,
    mensaje: string,
    txtBtnAceptar: string = 'Aceptar',
    txtBtnCancelar: string = ''
  ): void {
    this.nuevaNotificacion = {
      tipoNotificacion: TipoNotificacionEnum.ALERTA,
      categoria: CategoriaMensaje.ALERTA,
      modo: 'modal',
      titulo: titulo,
      mensaje: mensaje,
      cerrar: false,
      txtBtnAceptar: txtBtnAceptar,
      txtBtnCancelar: txtBtnCancelar,
    };
  }

  /**
   * Alterna la visibilidad del cuadro de diálogo modal para el registro de enlaces operativos.
   */
  cambiarEstadoModal(): void {
    const MODAL_INSTANCIA = Modal.getInstance(
      this.transportistaElemento.nativeElement
    );
    if (MODAL_INSTANCIA) {
      MODAL_INSTANCIA.hide();
    }
  }

 /**
  * Cancela el cuadro de diálogo modal para el registro de enlaces operativos.
  */
  modalCancelar(): void {
    this.cambiarEstadoModal();
    this.limpiarFormulario();
  }

  /**
   * Restablece el formulario de registro de enlaces operativos a su estado inicial.
   */
  limpiarFormulario(): void {
    this.transportistaForm.reset();
  }

  estatusSeleccion(): void {
    const ESTATUS = this.transportistaForm.get('estatus')?.value;
  }

    /**
   * Envía los datos del formulario y muestra el modal de confirmación.
   *
   * @description
   * Valida el formulario y, si es válido, procesa los datos del enlace operativo.
   * Muestra una notificación de confirmación y resetea el formulario.
   * Si el formulario es inválido, marca todos los campos como tocados para
   * mostrar los errores de validación.
   */
  enviarDialogData(): void {
    if (this.transportistaForm.valid) {
      this.enlaceInfoDatos();
      this.limpiarFormulario();
      this.cambiarEstadoModal();
    } else {
      this.transportistaForm.markAllAsTouched();
    }
  }

    /**
     * Agrega o actualiza los datos del enlace operativo en la lista de registros.
     */
    enlaceInfoDatos(): void {
      if (!this.transportistaForm.valid) {
        return;
      }

      const FORM_DATA = this.transportistaForm.getRawValue();
      if (this.modoEdicion && this.registroEditandoId !== undefined) {
        this.empresaTransportistaData = this.empresaTransportistaData.map((item) =>
          item.id === this.registroEditandoId ? { ...item, ...FORM_DATA } : item
        );
      } else {
        const NEW_ID =
          this.empresaTransportistaData.length > 0
            ? Math.max(...this.empresaTransportistaData.map((item) => item.id || 0)) +
              1
            : 1;
        const EMPRESA_TRANSPORTISTA: TablaEmpresaTransportista = {
          ...FORM_DATA,
          id: NEW_ID,
        };
        this.empresaTransportistaData = [
          ...this.empresaTransportistaData,
          EMPRESA_TRANSPORTISTA,
        ];
      }
      this.solicitud33304Store.actualizarEstado({
        transportistasLista: this.empresaTransportistaData,
      });
      this.filaSeleccionadaEnlaceOperativo = {} as TablaEmpresaTransportista;
    }

  /**
   * Método de limpieza que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
