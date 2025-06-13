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
  ConsultaioQuery,
  InputRadioComponent,
  NotificacionesComponent,
  TableComponent,
  TablePaginationComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import {
  CANTIDAD_BIENES_OPTION,
  FUSIONRADIO_OPTIONS,
} from '../../enums/fusionOEscision.enum';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { Notificacion } from '@libs/shared/data-access-user/src';
import { PersonaFusionEscisionDTO } from '../../models/avisomodify.model';
import { TableDataNgTable } from '../../models/avisomodify.model';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
interface RatioOption {
  label: string;
  value: string | number;
}
/**
 * Componente responsable de la gestión de datos relacionados con la fusión o escisión de empresas.
 * Maneja formularios reactivos, carga de datos desde servicios y visualización condicional.
 */
@Component({
  selector: 'app-fusion-oescision',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    TituloComponent,
    InputRadioComponent,
    TableComponent,
    TablePaginationComponent,
    NotificacionesComponent,
  ],
  templateUrl: './fusionOEscision.component.html',
})
export class FusionOEscisionComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  /** Formulario principal del componente */
  formulario!: FormGroup;

  /** Formulario utilizado dentro del modal */
  modelFormulario!: FormGroup;

  /** Título principal mostrado dinámicamente según la opción elegida */
  fusionOescisionTitulo!: string;

  /** Subtítulo mostrado en la sección de detalle */
  subFusionOescisionTitulo!: string;

  /** Etiqueta para la fecha de fusión o escisión */
  labelFechaFusionOscision!: string;

  /** Opciones para el input radio de capacidad de almacenamiento */
  radioOptions!: RatioOption[];

  /** Visibilidad del bloque con certificación (en formulario principal) */
  conCertificacionPrincipalVisible: boolean = true;

  /** Visibilidad del bloque sin certificación (en modal) */
  sinCertificacionPrincipalVisible: boolean = true;

  /** Instancia del modal de modificación */
  ModificarFusionEscisionInstance!: Modal;

  /** Arreglo de fechas seleccionadas */
  fechasSeleccionadas = [];

  /** Opciones del radio para seleccionar tipo de operación (fusión/escisión) */
  fusionradioOptions = FUSIONRADIO_OPTIONS;

  /** Opciones para indicar si se poseen bienes */
  cantidadBienesOption = CANTIDAD_BIENES_OPTION;

  /** Encabezado de tabla que muestra los datos de empresas fusionadas/escindidas */
  gridFusionEscisionHeader: string[] = [];

  /** Datos a mostrar en la tabla */
  gridFusionEscisionData: { tbodyData: string[] }[] = [{ tbodyData: [] }];

  /** Total de elementos para paginación */
  totalItems: number = 0;

  /** Elementos por página para paginación */
  itemsPerPage: number = 1;

  /** Página actual seleccionada */
  currentPage: number = 1;

  /** Datos del cuerpo de tabla (miembros de la empresa) */
  public miembroDeLaEmpresaBodyData: unknown[] = [];

  /** Visibilidad del bloque completo con datos */
  divCompletoVisible: boolean = false;

  /** Contenido textual para el modal */
  modalContent: string = '';

  /** Referencia al modal de modificación en el DOM */
  @ViewChild('ModificarFusionEscisionModel', { static: false })
  ModificarFusionEscisionModel!: ElementRef;

  /** Objeto con datos de persona fusionada o escindida */
  PersonaFusionEscisionDTO!: PersonaFusionEscisionDTO;

  /**
   * Declaración de la variable correctamenteNotificacion de tipo Notificacion.
   * Se utiliza para almacenar y gestionar notificaciones que indican acciones exitosas dentro del sistema.
   */
  public correctamenteNotificacion!: Notificacion;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /** Observable para gestionar el ciclo de vida del componente */
  public destroy$: Subject<void> = new Subject<void>();
  /**
   * Constructor del componente, inyecta formularios, servicios y manejo de estado.
   */
  /**
   * Crea una instancia del componente `FusionOEscisionComponent`.
   *
   * @param fb - FormBuilder para crear formularios reactivos.
   * @param AvisoModifyService - Servicio para manejar la lógica de modificación de avisos.
   * @param store - Store para manejar el estado del trámite 32301.
   * @param Tramite32301Query - Query para obtener datos del estado del trámite 32301.
   * @param consultaioQuery - Query para obtener el estado de la consulta.
   */

  constructor(
    private fb: FormBuilder,
    private AvisoModifyService: AvisoModifyService,
    private store: Tramite32301Store,
    private Tramite32301Query: Tramite32301Query,
    private consultaioQuery: ConsultaioQuery
  ) {
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

  /** Inicializa formularios y obtiene opciones del servicio */
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
      this.formulario.disable();
      this.modelFormulario.disable();
      const CONTROL = this.formulario.get('personaFusionEscisionDTO');
      if (CONTROL) {
        CONTROL.disable();
      }

      this.mpersonaFusionEscisionDTO.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.formulario.enable();
      const CONTROL = this.formulario.get('personaFusionEscisionDTO');
      if (CONTROL) {
        CONTROL.disable();
      }
      this.modelFormulario.enable();
      this.personaFusionEscisionDTO.enable();
      this.mpersonaFusionEscisionDTO.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `Tramite32301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  async inicializarFormulario(): Promise<void> {
    await this.initializeForm();
    this.getCapacidadAlmacenamiento();
    this.getGridsubFusionOescision();
  }

  /** Llama al servicio para obtener opciones de capacidad de almacenamiento */
  getCapacidadAlmacenamiento(): void {
    this.AvisoModifyService.getCapacidadAlmacenamiento()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.radioOptions = Object.assign([], resp);
      });
  }

  /** Inicializa las instancias de los modales al cargar la vista */
  ngAfterViewInit(): void {
    if (this.ModificarFusionEscisionModel?.nativeElement) {
      this.ModificarFusionEscisionInstance = new Modal(
        this.ModificarFusionEscisionModel.nativeElement
      );
    }
  }

  /** Crea e inicializa los formularios reactivos */
  initializeForm(): void {
    this.formulario = this.fb.group({
      capacidadAlmacenamiento: [null, Validators.required],
      numeroTotalCarros: [null, Validators.required],
      cantidadBienes: [null, Validators.required],
      fechaInspeccion: [{ value: '' }],
      descripcionClobGenerica2: ['', Validators.required],
      personaFusionEscisionDTO: this.fb.group({
        rfc: [''],
        razonSocial: [{ value: '', disabled: true }],
        numFolioTramite: [{ value: '', disabled: true }],
        fechaInicioVigencia: [{ value: '', disabled: true }],
        fechaFinVigencia: [{ value: '', disabled: true }],
      }),
    });

    this.modelFormulario = this.fb.group({
      mCantidadBienes: [null, Validators.required],
      personaFusionEscisionDTO: this.fb.group({
        rfc: [''],
        razonSocial: [{ value: '', disabled: true }],
        numFolioTramite: [{ value: '', disabled: true }],
        fechaInicioVigencia: [{ value: '', disabled: true }],
        fechaFinVigencia: [{ value: '', disabled: true }],
      }),
    });
  }

  /** Oculta la opción de escisión si se selecciona cierto valor */
  ocultarEscicion(ev: string | number): void {
    if (ev === 'fusion1') {
      this.fusionradioOptions = FUSIONRADIO_OPTIONS;
    }
    if (ev === 'fusion2') {
      this.fusionradioOptions.pop();
    }
  }

  /** Cambia dinámicamente los títulos y etiquetas según la opción seleccionada */
  mostrarFusionOEscision(ev: string | number): void {
    this.divCompletoVisible = ev === '1' || ev === '0';
    this.fusionOescisionTitulo =
      ev === 1
        ? 'Datos de las empresas fusionadas'
        : 'Datos de las empresas escindidas';
    this.subFusionOescisionTitulo = this.fusionOescisionTitulo;
    this.labelFechaFusionOscision =
      ev === 1
        ? 'Fecha en que surte efecto la fusión'
        : 'Fecha en que surte efecto la escisión';
  }

  /** Muestra u oculta los bloques de certificación según la opción elegida */
  mostrarCertificacionFusionada(ev: string | number, ismodel?: string): void {
    const CANTIDAD_BIENES = this.formulario.get('cantidadBienes')?.value;
    this.conCertificacionPrincipalVisible = CANTIDAD_BIENES === '1';

    if (ismodel === 'isModel') {
      const MODELCANTIDAD_BIENES =
        this.modelFormulario.get('mCantidadBienes')?.value;
      this.sinCertificacionPrincipalVisible = MODELCANTIDAD_BIENES === '1';
    }
  }

  /** Carga los datos de persona fusionada desde el servicio y los guarda en el store */
  cargarDatosPersonaFusion(): void {
    this.AvisoModifyService.cargarDatosPersonaFusion()
      .pipe(
        takeUntil(this.destroy$),
        map((resp) => {
          this.personaFusionEscisionDTO.patchValue(resp);
          this.store.SetpersonaFusionEscisionDTO(resp);
        })
      )
      .subscribe();
  }

  /** Carga los datos de persona fusionada desde el query del store hacia el modal */
  ModelcargarDatosPersonaFusion(): void {
    this.Tramite32301Query.selectpersonaFusionEscisionDTO$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.PersonaFusionEscisionDTO =
          state as unknown as PersonaFusionEscisionDTO;
        this.mpersonaFusionEscisionDTO.patchValue(
          this.PersonaFusionEscisionDTO
        );
      });
  }

  getGridsubFusionOescision(): void {
    this.AvisoModifyService.gridsubFusionOescision()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: TableDataNgTable) => {
        this.gridFusionEscisionHeader = resp.tableHeader; // Asigna los encabezados para los domicilios nuevos
      });
  }

  /** Getter del grupo de persona fusionada en el formulario principal */
  get personaFusionEscisionDTO(): FormGroup {
    return this.formulario.get('personaFusionEscisionDTO') as FormGroup;
  }

  /** Getter del grupo de persona fusionada en el formulario del modal */
  get mpersonaFusionEscisionDTO(): FormGroup {
    return this.modelFormulario.get('personaFusionEscisionDTO') as FormGroup;
  }

  /** Cambia la cantidad de elementos por página y actualiza la tabla */
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  /** Cambia la página actual en la tabla y actualiza la vista */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  /** Realiza el corte de datos para mostrar la tabla paginada */
  updatePagination(): void {
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
  }

  /** Abre el modal de modificación de fusión o escisión */
  abrirModalFusionEscision(): void {
    if (this.ModificarFusionEscisionInstance) {
      this.ModificarFusionEscisionInstance.show();
    }
  }

  /** Cierra el modal y actualiza los datos mostrados en la tabla */
  closeFusionEscisionModal(): void {
    if (this.ModificarFusionEscisionInstance) {
      this.ModificarFusionEscisionInstance.hide();
      this.Tramite32301Query.selectpersonaFusionEscisionDTO$
        .pipe(takeUntil(this.destroy$))
        .subscribe((state) => {
          this.PersonaFusionEscisionDTO =
            state as unknown as PersonaFusionEscisionDTO;
          const NEW_DATU = Object.values(state);
          const TBODY_DATA = { tbodyData: NEW_DATU.map(String) };
          this.gridFusionEscisionData.pop();
          this.gridFusionEscisionData.push(TBODY_DATA);
        });
    }
  }

  /** Abre el modal de confirmación */
  openCorrectamenteModel(): void {
    this.correctamenteNotificacion = {
      /**
       * Tipo de notificación: alerta.
       */
      tipoNotificacion: 'alert',

      /**
       * Categoría de la notificación: peligro (danger).
       */
      categoria: 'success',

      /**
       * Modo de la notificación: acción requerida.
       */
      modo: 'action',

      /**
       * Título de la notificación (actualmente vacío).
       */
      titulo: '',

      /**
       * Mensaje de la notificación, indicando que Datos guardados correctamente.
       */
      mensaje: 'Datos guardados correctamente.',

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

  /** Destruye las suscripciones al finalizar el componente */
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
}
