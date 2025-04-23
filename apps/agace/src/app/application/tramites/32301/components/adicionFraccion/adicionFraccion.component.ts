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
  CrosslistComponent,
  InputRadioComponent,
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
import { Subject, Subscription } from 'rxjs';
import { ALOTO_FRACCIONES } from '../../enums/adicionFraccion.enum';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CROSLISTA_DE_PAISES } from '../../enums/pantallas-constante.enum';
import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './adicionFraccion.component.html',
})
export class AdicionFraccionComponent
  implements OnInit, OnDestroy, AfterViewInit
{
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
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.agregar(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.agregar('t'),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.quitar('t'),
    },
  ];

  /**
   * Total de elementos a paginar.
   */
  totalItems: number = 0;

  /**
   * Número de elementos por página.
   */
  itemsPerPage: number = 1;

  /**
   * Página actual en la paginación.
   */
  currentPage: number = 1;

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
  CargaMasivaFralertaModelInstance!: Modal;
  fraccionesModelInstance!: Modal;

  /**
   * Referencias a los elementos del DOM para los modales.
   */
  @ViewChild('cargaMasivaFrModal', { static: false })
  cargaMasivaFrModal!: ElementRef;
  @ViewChild('CargaMasivaFralertaModel', { static: false })
  CargaMasivaFralertaModel!: ElementRef;
  @ViewChild('fraccionesModel', { static: false }) fraccionesModel!: ElementRef;

  /**
   * Subject utilizado para destruir suscripciones y evitar fugas de memoria.
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Suscripción para obtener opciones adicionales de fracción.
   */
  getAdicianFraccionOptionSubscription!: Subscription;

  /**
   * Suscripción para gestionar opciones del módulo Nico relacionadas con fracciones.
   */
  getAdicianFraccionNicoModOptionsSubscription!: Subscription;

  /**
   * Suscripción para manejar opciones de unidad de medida en el módulo de fracciones.
   */
  getAdicianFraccionUnidadMedidaModOptSubscription!: Subscription;

  /**
   * Suscripción para obtener opciones de procesos relacionados con fracciones.
   */
  getAdicianFraccionActivRelProcModOptSubscription!: Subscription;

  /**
   * Suscripción para gestionar la clave de correlación de fracciones en el módulo correspondiente.
   */
  getAdicianFraccioncveFraccionCorrelaModOptSubscription!: Subscription;

  /**
   * Constructor donde se inyectan servicios y se inicializa el formulario principal.
   */
  constructor(
    private fb: FormBuilder,
    private AvisoModifyService: AvisoModifyService,
    private store: Tramite32301Store,
    private query: Tramite32301Query
  ) {
    this.declaracionForm = this.fb.group({
      tipoCarga: [''],
      booleanGenerico: [''],
      descripcionGenerica3: [''],
      idSolicitud: [''],
      labelFraccionesAgregadas: [''],
      idCarga: [''],
    });
  }

  /**
   * Inicializa los formularios secundarios y obtiene las opciones de fracción adicional.
   */
  ngOnInit(): void {
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
  }

  /**
   * Obtiene las opciones para los botones de radio relacionados con fracciones.
   */
  getAdicianFraccionOption(): void {
    this.getAdicianFraccionOptionSubscription =
      this.AvisoModifyService.getAdicianFraccionOption().subscribe((resp) => {
        this.radioOptions = Object.assign([], resp);
      });
  }
  /**
   * Obtiene las opciones de modificación de clave nacional única.
   */
  getAdicianFraccionNicoModOptions(): void {
    this.getAdicianFraccionNicoModOptionsSubscription =
      this.AvisoModifyService.getAdicianFraccionNicoModOptions().subscribe(
        (resp) => {
          this.cveNicoMod = Object.assign([], resp);
        }
      );
  }

  /**
   * Obtiene las opciones de modificación de unidad de medida.
   */
  getAdicianFraccionUnidadMedidaModOption(): void {
    this.getAdicianFraccionUnidadMedidaModOptSubscription =
      this.AvisoModifyService.getAdicianFraccionUnidadMedidaModOption().subscribe(
        (resp) => {
          this.unidadMedidaMod = Object.assign([], resp);
        }
      );
  }

  /**
   * Obtiene las opciones de modificación de actividad relacionada con el proceso.
   */
  getAdicianFraccionActivRelProcModOption(): void {
    this.getAdicianFraccionActivRelProcModOptSubscription =
      this.AvisoModifyService.getAdicianFraccionActivRelProcModOption().subscribe(
        (resp) => {
          this.activRelProcMod = Object.assign([], resp);
        }
      );
  }

  /**
   * Obtiene las opciones de modificación de la clave de fracción de correlación.
   */
  getAdicianFraccioncveFraccionCorrelacionModOption(): void {
    this.getAdicianFraccioncveFraccionCorrelaModOptSubscription =
      this.AvisoModifyService.getAdicianFraccioncveFraccionCorrelacionModOption().subscribe(
        (resp) => {
          this.cveFraccionCorrelacionMod = Object.assign([], resp);
        }
      );
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

    if (this.CargaMasivaFralertaModel?.nativeElement) {
      this.CargaMasivaFralertaModelInstance = new Modal(
        this.CargaMasivaFralertaModel.nativeElement
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
  valorSeleccionadoTipoCarga(): void {
    const SELECTED_VALUE = this.declaracionForm.get('idCarga')?.value;

    if (SELECTED_VALUE === 'TIPCAR.MA') {
      this.divBtnCargaMVisible = false;
    } else if (SELECTED_VALUE === 'TIPCAR.CM') {
      this.divBtnCargaMVisible = true;
    }
  }

  /**
   * Maneja el evento cuando cambia la cantidad de elementos por página.
   */
  onItemsPerPageChange(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.updatePagination();
  }

  /**
   * Maneja el evento cuando se cambia de página.
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  /**
   * Actualiza la paginación de la tabla según el número de elementos y la página actual.
   */
  updatePagination(): void {
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;
    this.miembroDeLaEmpresaBodyData = this.miembroDeLaEmpresaBodyData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
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
    this.openCargaMasivaFralertaModel();
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
   * Abre el modal de alerta de carga masiva de fracciones.
   */
  openCargaMasivaFralertaModel(): void {
    if (this.CargaMasivaFralertaModelInstance) {
      this.CargaMasivaFralertaModelInstance.show();
    }
  }

  /**
   * Cierra el modal de alerta de carga masiva de fracciones.
   */
  closeCargaMasivaFralertaModel(): void {
    if (this.CargaMasivaFralertaModelInstance) {
      this.CargaMasivaFralertaModelInstance.hide();
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

    /**
     * Cancela la suscripción a las opciones adicionales de fracción si está activa.
     */
    if (this.getAdicianFraccionOptionSubscription) {
      this.getAdicianFraccionOptionSubscription.unsubscribe();
    }

    /**
     * Cancela la suscripción a las opciones del módulo Nico relacionadas con fracciones si está activa.
     */
    if (this.getAdicianFraccionNicoModOptionsSubscription) {
      this.getAdicianFraccionNicoModOptionsSubscription.unsubscribe();
    }

    /**
     * Cancela la suscripción a las opciones de unidad de medida en el módulo de fracciones si está activa.
     */
    if (this.getAdicianFraccionUnidadMedidaModOptSubscription) {
      this.getAdicianFraccionUnidadMedidaModOptSubscription.unsubscribe();
    }

    /**
     * Cancela la suscripción a los procesos relacionados con fracciones si está activa.
     */
    if (this.getAdicianFraccionActivRelProcModOptSubscription) {
      this.getAdicianFraccionActivRelProcModOptSubscription.unsubscribe();
    }

    /**
     * Cancela la suscripción a la clave de correlación de fracciones si está activa.
     */
    if (this.getAdicianFraccioncveFraccionCorrelaModOptSubscription) {
      this.getAdicianFraccioncveFraccionCorrelaModOptSubscription.unsubscribe();
    }
  }
}
