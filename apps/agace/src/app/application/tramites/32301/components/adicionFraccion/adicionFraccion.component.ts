import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConsultaioQuery,
  CrosslistComponent,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  TableComponent,
  TablePaginationComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  GRID_FRACCIONES_HEADER,
  MESSAGE_FRACCION,
} from '../../constantes/importador-exportador.enum';
import { Subject, map, takeUntil } from 'rxjs';
import { ALOTO_FRACCIONES } from '../../enums/adicionFraccion.enum';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CROSLISTA_DE_PAISES } from '../../enums/pantallas-constante.enum';
import { CommonModule } from '@angular/common';
import { InputCheckComponent } from '@libs/shared/data-access-user/src';
import { Modal } from 'bootstrap';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
interface RatioOption {
  label: string;
  value: string | number;
}
/**
 * Componente para la gestión de la adición de fracciones arancelarias.
 * Permite tanto la carga manual como la carga masiva de fracciones.
 */
@Component({
  selector: 'app-adicion-fraccion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    InputRadioComponent,
    TableComponent,
    TablePaginationComponent,
    CatalogoSelectComponent,
    CrosslistComponent,
    NotificacionesComponent,
    InputCheckComponent
  ],
  templateUrl: './adicionFraccion.component.html',
  styleUrls: ['./adicionFraccion.component.scss'],
})
export class AdicionFraccionComponent
  implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Formulario principal para la declaración.
   */
  declaracionForm!: FormGroup;

  /**
   * Modelo del formulario de declaración.
   */
  declaracionFormModel!: FormGroup;

  /**
   * Formulario para la carga manual de datos.
   */
  cargaManualForm!: FormGroup;

  /**
   * Controla la visibilidad del botón de carga manual.
   */
  divBtnCargaMVisible: boolean = false;

  /**
   * Mensaje informativo para el usuario sobre la carga de fracciones arancelarias.
   */
  messageFraccion = MESSAGE_FRACCION;

  /**
   * Definición de la variable para manejar fracciones en el sistema.
   * Se utiliza para almacenar y manipular fracciones de manera eficiente.
   */
  alotoFracciones = ALOTO_FRACCIONES;
  /**
   * Opciones para los botones de radio.
   */
  radioOptions!: RatioOption[];

  /**
   * Encabezados de la tabla de fracciones arancelarias.
   */
  gridFraccionesHeader = GRID_FRACCIONES_HEADER;

  /**
   * Fechas seleccionadas por el usuario.
   */
  fechasSeleccionadas: string[] = [];

  /**
   * Fechas disponibles para selección.
   */
  fechasDatos: string[] = [];

  /**
   * Lista de países para selección, tomada de un catálogo.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;

  /**
   * Rango de días seleccionados, basado en la lista de países.
   */
  selectRangoDias: string[] = this.crosListaDePaises;

  /**
   * Configuración de botones para acciones sobre la selección.
   */
  botonField = [
    {
      btnNombre: 'Agregar',
      class: 'btn-primary',
      funcion: (): void => this.agregar(''),
    },
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.agregar('t'),
    },
    {
      btnNombre: 'Eliminar',
      class: 'btn-danger',
      funcion: (): void => this.quitar(''),
    },
    {
      btnNombre: 'Eliminar todos',
      class: 'btn-default',
      funcion: (): void => this.quitar('t'),
    },
  ];

  /**
   * Control de formulario para la fecha general.
   */
  fecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha seleccionada.
   */
  fechaSeleccionada: FormControl = new FormControl('');

  /**
   * Catálogos asignados a propiedades para selección.
   */
  cveNicoMod!: Catalogo[];
  unidadMedidaMod!: Catalogo[];
  activRelProcMod!: Catalogo[];
  cveFraccionCorrelacionMod!: Catalogo[];

  /**
   * Datos del cuerpo para el componente de miembros de la empresa.
   */
  public miembroDeLaEmpresaBodyData: unknown[] = [];

  /**
   * Instancias de modales utilizados en la carga masiva y fracciones.
   */
  cargaMasivaFrModalInstance!: Modal;
  /**
   * Instancia de la clase `Modal` utilizada para gestionar el diálogo modal de fracciones.
   * Esta propiedad se inicializa cuando se crea el modal y proporciona métodos para controlar su comportamiento.
   */
  fraccionesModelInstance!: Modal;

  /**
  * Elemento de entrada de archivo HTML.
  *
  * @type {HTMLInputElement}
  */
  entradaArchivo!: HTMLInputElement;
  /**
  * Etiqueta del archivo seleccionado.
  */
  etiquetaDeArchivo: string = 'Sin archivo seleccionados';

  /**
 * Archivo de medicamentos seleccionado.
 */
  archivoMedicamentos: File | null = null;

  /**
   * Referencias a los elementos del DOM para los modales.
   */
  @ViewChild('cargaMasivaFrModal', { static: false })
  cargaMasivaFrModal!: ElementRef;

  @ViewChild('fraccionesModel', { static: false }) fraccionesModel!: ElementRef;

  /**
   * Declaración de la variable nuevaNotificacion de tipo Notificacion.
   * Se utiliza para almacenar y gestionar notificaciones dentro del sistema.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Subject utilizado para destruir suscripciones y evitar fugas de memoria.
   */
  private destroy$: Subject<void> = new Subject<void>();
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Constructor donde se inyectan servicios y se inicializa el formulario principal.
   */
  constructor(
    private fb: FormBuilder,
    private AvisoModifyService: AvisoModifyService,
    private store: Tramite32301Store,
    private query: Tramite32301Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.declaracionForm = this.fb.group({
      tipoCarga: [''],
      booleanGenerico: [''],
      descripcionGenerica3: [''],
      idSolicitud: [''],
      labelFraccionesAgregadas: [''],
      idCarga: [{ value: '', disabled: this.esFormularioSoloLectura }],
      manifiestos: [false, Validators.required],
    });

    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroy$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa los formularios secundarios y obtiene las opciones de fracción adicional.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }
  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }
  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.declaracionForm.disable();
      this.declaracionFormModel.disable();
      this.cargaManualForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.declaracionForm.enable();
      this.declaracionFormModel.enable();
      this.cargaManualForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }
  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.declaracionFormModel = this.fb.group({
      archivoProceso: [''],
      registrosProcesoCargados: [{ value: '', disabled: true }],
    });

    this.cargaManualForm = this.fb.group({
      txtfraccionDeclCert: ['', Validators.required, Validators.maxLength(8)],
      activRelProc: ['-1', Validators.required],
      txtDescripcionMercancia: ['', Validators.required],
      cveFraccionCorrelacion: ['-1', Validators.required],
      unidadMedida: ['-1', Validators.required],
      nico: ['', Validators.required],
      txtDescripcionNico: [''],
      sPaisBloqueOrigen: [[], Validators.required],
      sPaisBloqueDestino: [[], Validators.required],
    });
    this.getAdicianFraccionOption();
    this.getAdicianFraccionNicoModOptions();
    this.getAdicianFraccionActivRelProcModOption();
    this.getAdicianFraccioncveFraccionCorrelacionModOption();
    this.getAdicianFraccionUnidadMedidaModOption();
  
  }
  /**
   * Obtiene las opciones para los botones de radio relacionados con fracciones.
   */
  getAdicianFraccionOption(): void {
    this.AvisoModifyService.getAdicianFraccionOption()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.radioOptions = Object.assign([], resp);
      });
  }
  /**
   * Obtiene las opciones de modificación de clave nacional única.
   */
  getAdicianFraccionNicoModOptions(): void {
    this.AvisoModifyService.getAdicianFraccionNicoModOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.cveNicoMod = Object.assign([], resp);
      });
  }

  /**
   * Obtiene las opciones de modificación de unidad de medida.
   */
  getAdicianFraccionUnidadMedidaModOption(): void {
    this.AvisoModifyService.getAdicianFraccionUnidadMedidaModOption()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.unidadMedidaMod = Object.assign([], resp);
      });
  }

  /**
   * Obtiene las opciones de modificación de actividad relacionada con el proceso.
   */
  getAdicianFraccionActivRelProcModOption(): void {
    this.AvisoModifyService.getAdicianFraccionActivRelProcModOption()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.activRelProcMod = Object.assign([], resp);
      });
  }

  /**
   * Obtiene las opciones de modificación de la clave de fracción de correlación.
   */
  getAdicianFraccioncveFraccionCorrelacionModOption(): void {
    this.AvisoModifyService.getAdicianFraccioncveFraccionCorrelacionModOption()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.cveFraccionCorrelacionMod = Object.assign([], resp);
      });
  }

  /**
   * Agrega fechas seleccionadas dependiendo del tipo especificado ('t' para todas).
   */
  agregar(tipo: string): void {
    if (tipo === 't') {
      this.fechasSeleccionadas = [...this.selectRangoDias];
      this.fechasDatos = [];
    } else {
      const FECHA_VALOR = this.fecha.value.map(Number);
      this.fechasSeleccionadas.push(this.fechasDatos[FECHA_VALOR]);
      this.fechasDatos.splice(FECHA_VALOR, 1);
    }
  }

  /**
   * Quita fechas seleccionadas dependiendo del tipo especificado ('t' para todas).
   */
  quitar(tipo: string = ''): void {
    if (tipo === 't') {
      this.fechasDatos = [...this.fechasSeleccionadas];
      this.fechasSeleccionadas = [];
    } else {
      const FECHA_VALOR = this.fechaSeleccionada.value.map(Number);
      this.fechasDatos.push(this.fechasSeleccionadas[FECHA_VALOR]);
      this.fechasSeleccionadas.splice(FECHA_VALOR, 1);
    }
  }

  /**
   * Inicializa las instancias de los modales después de que las vistas estén cargadas.
   */
  ngAfterViewInit(): void {
    if (this.cargaMasivaFrModal?.nativeElement) {
      this.cargaMasivaFrModalInstance = new Modal(
        this.cargaMasivaFrModal.nativeElement
      );
    }

    if (this.fraccionesModel?.nativeElement) {
      this.fraccionesModelInstance = new Modal(
        this.fraccionesModel.nativeElement
      );
    }
  }

  /**
   * Controla la visibilidad del botón de carga dependiendo del tipo de carga seleccionado.
   */
  valorSeleccionadoTipoCarga(ev: string | number): void {
    if (ev === 'TIPCAR.MA') {
      this.divBtnCargaMVisible = false;
    } else if (ev === 'TIPCAR.CM') {
      this.divBtnCargaMVisible = true;
    }
  }

  /**
   * Abre el modal para agregar fracciones manualmente.
   */
  modalAgregaCarga(): void {
    this.openfraccionesModelModel();
  }
  /**
   * Abre el modal para la carga masiva de fracciones.
   */
  abrirModalCargaMasivaFr(): void {
    this.openCargaMasivaFrModal();
  }

  /**
   * Abre el modal de alerta después de cargar un archivo de procesos.
   */
  cargarArchivoProcesosAjax(): void {
    /**
     * Configuración de una nueva notificación para alertar al usuario.
     */
    this.nuevaNotificacion = {
      /**
       * Tipo de notificación: alerta.
       */
      tipoNotificacion: 'alert',

      /**
       * Categoría de la notificación: peligro (danger).
       */
      categoria: 'danger',

      /**
       * Modo de la notificación: acción requerida.
       */
      modo: 'action',

      /**
       * Título de la notificación (actualmente vacío).
       */
      titulo: '',

      /**
       * Mensaje de la notificación, indicando que 1 - El archivo debe conteneral menos un registro.
       */
      mensaje: '1 - El archivo debe conteneral menos un registro.',

      /**
       * Indica si la notificación debe cerrarse automáticamente (false = no se cerrará).
       */
      cerrar: false,

      /**
       * Tiempo de espera antes de cerrar la notificación (2000 milisegundos).
       */
      tiempoDeEspera: 2000,

      /**
       * Texto del botón de aceptación en la notificación.
       */
      txtBtnAceptar: 'Aceptar',

      /**
       * Texto del botón de cancelación en la notificación (actualmente vacío).
       */
      txtBtnCancelar: '',
    };
  }

  /**
   * Abre el modal correspondiente a la carga masiva de fracciones.
   */
  openCargaMasivaFrModal(): void {
    if (this.cargaMasivaFrModalInstance) {
      this.cargaMasivaFrModalInstance.show();
    }
  }

  /**
   * Cierra el modal de carga masiva de fracciones.
   */
  closeCargaMasivaFrModal(): void {
    if (this.cargaMasivaFrModalInstance) {
      this.cargaMasivaFrModalInstance.hide();
    }
  }

  /**
   * Abre el modal para agregar fracciones de forma manual.
   */
  openfraccionesModelModel(): void {
    if (this.fraccionesModelInstance) {
      this.fraccionesModelInstance.show();
    }
  }

  /**
   * Cierra el modal para agregar fracciones de forma manual.
   */
  closefraccionesModelModel(): void {
    if (this.fraccionesModelInstance) {
      this.fraccionesModelInstance.hide();
    }
  }

  /**
   * Se ejecuta al destruir el componente. Se utiliza para limpiar suscripciones activas y prevenir fugas de memoria.
   */
  ngOnDestroy(): void {
    /**
     * Notifica a los observadores que el flujo de datos se va a destruir.
     */
    this.destroy$.next();

    /**
     * Completa el flujo de datos, asegurando que no se envíen más valores.
     */
    this.destroy$.complete();
  }
  /**
 * Maneja el cambio de archivo en el input de archivo.
 *
 * @param event Evento de cambio de archivo.
 *
 * @returns {void}
 */
  onCambioDeArchivo(event: Event): void {
    const TARGET = event.target as HTMLInputElement;
    const FILE_INPUT = document.getElementById(
      'archivoProceso'
    ) as HTMLInputElement;
    const FILE = FILE_INPUT.files?.[0];
    if (FILE) {
      if (FILE.type !== 'text/csv' && !FILE.name.endsWith('.csv')) {
        this.abrirModal();
        return;
      }

      if (TARGET.files && TARGET.files.length > 0) {
        this.archivoMedicamentos = TARGET.files[0];
        this.etiquetaDeArchivo
          = this.archivoMedicamentos.name;
      } else {
        this.etiquetaDeArchivo = 'Sin archivo seleccionados';
      }
    }
  }
  /**
  * Abre un modal de notificación para alertar al usuario que debe seleccionar un archivo CSV.
  * 
  * Este método inicializa la notificación con un mensaje de alerta y configura el elemento a eliminar.
  */
  abrirModal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'Por favor seleccione un archivo CSV.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'OK',
      txtBtnCancelar: '',
    };

  }
  /**
* Activa la selección del archivo de medicamentos.
* @returns {void}
*/
  activarSeleccionArchivo(): void {
    this.entradaArchivo = document.getElementById(
      'archivoProceso'
    ) as HTMLInputElement;
    if (this.entradaArchivo) {
      this.entradaArchivo.click();
    }


  }
}
