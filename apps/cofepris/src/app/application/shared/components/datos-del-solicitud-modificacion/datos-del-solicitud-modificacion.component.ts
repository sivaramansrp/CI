/**
 * @component DatosDelSolicitudModificacionComponent
 * @description
 * Este componente gestiona la modificación de datos relacionados con una solicitud.
 * Proporciona formularios reactivos para capturar información del establecimiento,
 * datos SCIAN, y otros detalles relacionados con la solicitud.
 * También incluye funcionalidades para manejar modales, tablas dinámicas y listas cruzadas.
 */
import {
  ALERT,
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  CrossListLable,
  CrosslistComponent,
  InputCheckComponent,
  InputFecha,
  InputFechaComponent,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  REGEX_RFC_FISICA,
  REGEX_SOLO_DIGITOS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';

import {
  CROSLISTA_DE_PAISES,
  FECHA_DE_PAGO,
  MERCANCIAS_DATA,
  SCIAN_TABLE_CONFIG,
  TEXTOS,
} from '../../constantes/aviso-de-funcionamiento.enum';
import { CommonModule } from '@angular/common';
import { DatosDelSolicituteSeccionQuery } from '../../estados/queries/datos-del-solicitute-seccion.query';
import { DatosDelSolicituteSeccionStateStore } from '../../estados/stores/datos-del-solicitute-seccion.store';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MENSAJE_DE_VALIDACI0N } from '../../../shared/constantes/aviso-de-funcionamiento.enum';

import { Modal } from 'bootstrap';

import {
  MercanciasInfo,
  PropietarioTipoPersona,
  ScianModel,
} from '../../models/datos-de-la-solicitud.model';
import { Subject, takeUntil } from 'rxjs';
import { ScianData } from '../../../shared/models/datos-modificacion.model';

import { SCIAN_DATA } from '../../constantes/datos-scian.enum';

import { EstablecimientoService } from '../../services/establecimiento.service';
import { ManifiestosRepresentanteSeccionComponent } from '../manifiestos-representante-seccion/manifiestos-representante-seccion.component';
/*
 ** component
 */

@Component({
  selector: 'app-datos-del-solicitud-modificacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CrosslistComponent,
    ManifiestosRepresentanteSeccionComponent,
    InputFechaComponent,
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    AlertComponent,
    InputCheckComponent,
    NotificacionesComponent,
  ],

  templateUrl: './datos-del-solicitud-modificacion.component.html',
  styleUrl: './datos-del-solicitud-modificacion.component.scss',
})
export class DatosDelSolicitudModificacionComponent
  implements OnInit, OnDestroy, AfterViewInit
{

  /**
 * @input mostrarScianBotones
 * @description
 * Indica si se deben mostrar los botones relacionados con la gestión de la tabla SCIAN en el componente.
 * @type {boolean}
 * @default true
 */
  @Input() mostrarScianBotones: boolean = true;
  
  /**
 * @input mostrarNumeroYFecha
 * @description
 * Indica si se deben mostrar los campos de número de registro y fecha de caducidad en el formulario de mercancías.
 * @type {boolean}
 * @default true
 */
  @Input() mostrarNumeroYFecha: boolean = true;

  @Input() mostrarAlerta: boolean = true; // o false, según lo que necesites
  /**
   * Referencia al componente `ManifiestosRepresentanteSeccionComponent`.
   */
  @Input() hideRepresentanteLegal: boolean = true;
  /**
   * Referencia al componente `CatalogoSelectComponent`.
   * @tipo {boolean}
   * @descripción
   * Este decorador de entrada (`@Input`) permite controlar la visibilidad de los campos relacionados con
   * el código postal y el correo electrónico en el componente.
   *
   * */
  @Input() showCodigoPostalCorreoElectronico: boolean = false;
  /**
   * Notificación actual que se muestra en el componente.
   *
   * Esta propiedad almacena los datos de la notificación que se mostrará al usuario.
   * Se utiliza para configurar el tipo, categoría, mensaje y otros detalles de la notificación.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Índice del elemento que se desea eliminar.
   *
   * Esta propiedad almacena el índice del elemento seleccionado para su eliminación
   * en la lista de pedimentos.
   */
  elementoParaEliminar!: number;

  /**
   * Lista de pedimentos.
   *
   * Esta propiedad almacena un arreglo de objetos de tipo `Pedimento`, que representan
   * los pedimentos gestionados en el componente.
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * Abre el modal de confirmación para eliminar un pedimento.
   *
   * Este método configura los datos de la notificación que se mostrará en el modal
   * de confirmación. También almacena el índice del elemento que se desea eliminar.
   *
   * @param i - Índice del pedimento que se desea eliminar. Por defecto, es 0.
   */
  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'Por el momento no hay comunicación con el Sistema de COFEPRIS, favor de capturar su establecimiento.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };

    this.elementoParaEliminar = i;
  }

  /**
   * Elimina un pedimento de la lista.
   *
   * Este método elimina el pedimento seleccionado de la lista de pedimentos si
   * el usuario confirma la acción en el modal de confirmación.
   *
   * @param borrar - Indica si se debe proceder con la eliminación. Si es `true`,
   * se elimina el pedimento correspondiente.
   */
  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  /**
   * @input showPreFillingOptions
   * Indica si se deben mostrar las opciones de prellenado.
   */
  @Input() showPreFillingOptions: boolean = true;
  /**
   * Indica si se debe mostrar el checkbox de AIFA.
   */
  @Input() showAifaCheckbox: boolean = true; 

/**
 * Indica si se debe mostrar el botón para copiar datos en la interfaz.
 * 
 * Cuando es `true`, el botón "Copiar Datos" será visible para el usuario.
 * Cuando es `false`, el botón no se mostrará.
 */
@Input() mostrarBotonCopiarDatos: boolean = true; 

  /**
   * Referencia al modal del establecimiento.
   */
  @ViewChild('establecimientoModal', { static: false })
  establecimientoModal!: ElementRef;
  /**
   * Referencia al botón del modal del establecimiento.
   */
  @ViewChild('establecimientoModalButton', { static: false })
  establecimientoModalButton!: ElementRef;
  @ViewChild('modalAddAgentMercancias', { static: false })
  modalAddAgentMercancias!: ElementRef;

  /**
   * Fecha de caducidad para el formulario.
   */
  public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;
  /**
   * Instancia del modal de Bootstrap.
   */
  modalInstance!: Modal;

  /**
   * Formulario para gestionar mercancías.
   */
  formMercancias!: FormGroup;
  /**
   * Instancia del modal del establecimiento.
   */
  establecimientoModalInstance!: Modal;
  modalAddAgentMercanciasInstance!: Modal;

  /**
   * Datos del catálogo SCIAN.
   */
  scianJson: Catalogo[] = [];

  /**
   * Formulario para datos SCIAN.
   */
  scianForm!: FormGroup;
  /**
   * Formulario para datos del establecimiento.
   */
  solicitudEstablecimientoForm!: FormGroup;

  /**
   * Referencias a los componentes de listas cruzadas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Opciones genéricas para el formulario.
   */
  genericOptions: PropietarioTipoPersona[] = [];

  /**
   * Nombre del modal.
   */
  public modal: string = 'modal';

  /**
   * Botones de acción para gestionar listas de países en la primera sección.
   */
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Botones de acción para gestionar listas de países en la segunda sección.
   */
  paisDeProcedenciaBotonsDos = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[1].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[1].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[1].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[1].quitar('t'),
    },
  ];

  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsTres = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[2].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].quitar('t'),
    },
  ];

  /**
   * Etiqueta para el crosslist de país de procedencia.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };
  /**
   * Lista de países para la selección de origen.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;
  /**
   * Indica si la sección es colapsable.
   */
  colapsable: boolean = false;

  /**
   * Indica si la sección "Duo" es colapsable.
   */
  colapsableDos: boolean = false;

  /**
   * Indica si la sección "Tres" es colapsable.
   */
  colapsableTres: boolean = false;
  /**
   * Indica si la sección "Uno" es colapsable.
   */
  public cambioFechaFinal(nuevo_valor: string): void {
    this.formMercancias.get('fechaCaducidad')?.setValue(nuevo_valor);
    this.formMercancias.get('fechaCaducidad')?.markAsUntouched();
  }
  /**
   * Alterna el estado colapsable de la primera sección.
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Alterna el estado colapsable de la segunda sección.
   */
  mostrar_colapsableDos(): void {
    this.colapsableDos = !this.colapsableDos;
  }

  /**
   * Alterna el estado colapsable de la tercera sección.
   */
  mostrar_colapsableTres(): void {
    this.colapsableTres = !this.colapsableTres;
  }
  /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  /**
   * Lista de países para seleccionar el origen de la segunda sección.
   */
  seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;

  /**
   * Lista de países para seleccionar el origen de la tercera sección.
   */
  seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;

  /**
   * Lista de estados.
   */
  estado: Catalogo[] = [];

  /**
   * Clase de alerta.
   */
  class = 'alert-warning';

  /**
   * Configuración de selección de tabla.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Datos cargados dinámicamente para la tabla SCIAN.
   */
  datosData: ScianModel[] = [];
  /**
   * Enum para la selección de tablas.
   */
  tipoSeleccionTabla = TablaSeleccion;

  /**
   * Formulario de establecimiento.
   */
  domicilioEstablecimiento!: FormGroup;
  /**
   * Muestra el modal para la clave SCIAN.
   */
  public mostrarModeloClave(): void {
    this.modalInstance.show();
  }

  /**
   * Cierra el modal de clave SCIAN.
   */
  openEstablecimientoModal(): void {
    this.establecimientoModalInstance.show();
    this.abrirModal();
  }
  /**
   * Ciclo de vida `AfterViewInit`.
   * Inicializa la instancia del modal de Bootstrap.
   */
  ngAfterViewInit(): void {
    if (this.establecimientoModalButton) {
      this.establecimientoModalInstance = new Modal(
        this.establecimientoModalButton.nativeElement
      );
    }
    if (this.establecimientoModal) {
      this.modalInstance = new Modal(this.establecimientoModal.nativeElement);
    }
    if (this.modalAddAgentMercancias) {
      this.modalAddAgentMercanciasInstance = new Modal(
        this.modalAddAgentMercancias.nativeElement
      );
    }
  }

  /**
   * Texto de los manifiestos.
   */
  TEXTOS1 = TEXTOS;
  /**
   * Texto de los manifiestos.
   */
  colapsable1: boolean = true;
  /**
   * Texto de los manifiestos.
   */
  private destroy$ = new Subject<void>();

  /**
   * Configuración de columnas de la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos de la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Constructor del componente.
   *
   * @param fb FormBuilder para crear formularios.
   * @param tramite260904Query Consulta de datos del trámite.
   * @param tramite260904Store Almacenamiento de datos del trámite.
   */
  constructor(
    private fb: FormBuilder,
    private establecimientoService: EstablecimientoService,
    private domicilioEstablecimientoStore: DatosDelSolicituteSeccionStateStore,
    private domicilioEstablecimientoQuery: DatosDelSolicituteSeccionQuery
  ) {
    // Constructor
  }

  /**
   * Método de inicialización del componente.
   */
  ngOnInit(): void {
    this.loadScian();
    this.loadEstadoData();
    this.crearAgregarFormulario();
    this.establecerDeshabilitado();
    this.estadoDelServicio();
    if (this.mostrarNumeroYFecha) {
      this.agregarNumeroYFechaControls();
    } else {
      this.eliminarNumeroYFechaControls();
    }
    this.obtenerScianTablaDatos();
  }

  /**
  * @method obtenerScianTablaDatos
  * @description
  * Método que obtiene los datos de la tabla SCIAN desde el servicio `EstablecimientoService` y los agrega al arreglo `personaparas`.
  */
  obtenerScianTablaDatos(): void {
    this.establecimientoService
      .getScianTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: ScianModel[]) => {
        response?.forEach((resp: ScianModel) => {
          this.personaparas.push(resp)
        })
      });
  }

  /**
   * Método que agrega los controles 'numeroRegistro' y 'fechaCaducidad' al formulario
   * cuando la condición mostrarNumeroYFecha es verdadera.
   */
  agregarNumeroYFechaControls(): void {
    this.formMercancias.addControl(
      'numeroRegistro',
      this.fb.control('', Validators.required)
    );
    this.formMercancias.addControl('fechaCaducidad', this.fb.control(''));
  }

  /**
   * Método que elimina los controles 'numeroRegistro' y 'fechaCaducidad' del formulario
   * cuando la condición mostrarNumeroYFecha es falsa.
   */
  eliminarNumeroYFechaControls(): void {
    this.formMercancias.removeControl('numeroRegistro');
    this.formMercancias.removeControl('fechaCaducidad');
  }

  /*
   * Método para manejar el evento de cierre del modal.
   */
  estadoDelServicio(): void {
    this.establecimientoService
      .getJustificationData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PropietarioTipoPersona[]) => {
        this.genericOptions = data; // Bind the fetched data
      });
    this.domicilioEstablecimientoQuery
      .select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.domicilioEstablecimiento.patchValue(state, { emitEvent: false });
      });
    this.domicilioEstablecimientoQuery
      .select()
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.solicitudEstablecimientoForm.patchValue(state, {
          emitEvent: false,
        });
      });
  }

  /**
   * Método de limpieza del componente.
   * Se utiliza para liberar recursos y evitar fugas de memoria.
   */
  crearAgregarFormulario(): void {
    this.domicilioEstablecimiento = this.fb.group({
      ideGenerica1: ['', Validators.required],
      observaciones: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(2000)]],
      establecimientoRFCResponsableSanitario: ['', [Validators.required,Validators.pattern(REGEX_RFC_FISICA)]],
      establecimientoRazonSocial:['', Validators.required],
      establecimientoCorreoElectronico :['', [Validators.required, Validators.email]],
      establecimientoEstados :['', Validators.required],
      descripcionMunicipio: ['', Validators.required],
      localidad: [''],
      establishomentoColonias: [''],
      calle: ['', Validators.required],
      lada: ['', [Validators.maxLength(5), Validators.pattern(REGEX_SOLO_DIGITOS)]],
      telefono: ['', [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS)],Validators.maxLength(30)],
      establecimientoDomicilioCodigoPostal :['', [Validators.required,Validators.maxLength(12)]],
      scian: this.fb.array([]),
    });
    this.scianForm = this.fb.group({
      scian: ['', Validators.required],
      descripcionScian: [''],
    });

    this.solicitudEstablecimientoForm = this.fb.group({
      noLicenciaSanitaria: [''],
      avisoCheckbox: [false],
      licenciaSanitaria: [{ value: '', disabled: true }],
      regimen: ['', Validators.required],
      aduanasEntradas: ['', Validators.required],
      aifaCheckbox: [false],
    });
    this.formMercancias = this.fb.group({
      clasificacion: ['', Validators.required],
      especificarClasificacionProducto: ['', Validators.required],
      denominacionEspecifica: ['', Validators.required],
      denominacionDistintiva: ['', Validators.required],
      denominacionComun: ['', Validators.required],
      tipoDeProducto: ['', Validators.required],
      estadoFisico: ['', Validators.required],
      estadoFormaFarmaceutica: ['', Validators.required],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: '', disabled: true }, Validators.required],
      cantidadUMT: ['', Validators.required],
      UMT: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: ['', Validators.required],
      UMC: ['', Validators.required],
      presentacion: ['', Validators.required],
    });
  }
  /**
   * Deshabilita el campo "observaciones" del formulario de domicilio
   */
  establecerDeshabilitado(): void {
    this.domicilioEstablecimiento
      .get('ideGenerica1')
      ?.valueChanges.subscribe((value) => {
        if (value === 'modificacion') {
          this.domicilioEstablecimiento.get('observaciones')?.enable();
        } else {
          this.domicilioEstablecimiento.get('observaciones')?.disable();
        }
      });
  }
  /**
   * Alterna el estado colapsable de la sección "Uno".
   *
   * Este método cambia el valor de la propiedad `colapsable1` entre `true` y `false`.
   * Se utiliza para mostrar u ocultar dinámicamente el contenido de una sección en la interfaz de usuario.
   *
   * Comportamiento:
   * - Si `colapsable1` es `true`, se establece en `false` y la sección se oculta.
   * - Si `colapsable1` es `false`, se establece en `true` y la sección se muestra.
   */
  mostrarColapsable(): void {
    this.colapsable1 = !this.colapsable1;
  }
  /**
   * Carga los datos del catálogo SCIAN.
   */
  loadScian(): void {
    this.establecimientoService
      .getSciandata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.scianJson = resp;
      });
  }
  /**
   * @method loadEstadoData
   * @description
   * Este método carga los datos del catálogo de estados desde el servicio `EstablecimientoService`.
   * Utiliza un observable para suscribirse a los datos y los almacena en la propiedad `estado`.
   * La suscripción se gestiona con `takeUntil` para evitar fugas de memoria al destruir el componente.
   *
   * @returns void
   */
  loadEstadoData(): void {
    this.establecimientoService
      .getEstadodata()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.estado = resp;
      });
  }

  /**
   * @method cerrarModal
   * @description
   * Este método cierra el modal activo utilizando la instancia del modal de Bootstrap.
   * Verifica si la instancia del modal (`modalInstance`) está definida antes de intentar cerrarlo.
   *
   * @returns void
   */
  cerrarModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
  /**
   * @method abrirModal
   * @description
   * Este método abre el modal activo utilizando la instancia del modal de Bootstrap.
   * Verifica si la instancia del modal (`modalInstance`) está definida antes de intentar abrirlo.
   *
   * @returns void
   */
  enCambioDeControl(formName: string, controlName: string): void {
    let formGroup: FormGroup;

    // Determine which form group to use
    switch (formName) {
      case 'scianForm':
        formGroup = this.scianForm;
        break;
      case 'domicilioEstablecimiento':
        formGroup = this.domicilioEstablecimiento;
        break;
      case 'solicitudEstablecimientoForm':
        formGroup = this.solicitudEstablecimientoForm;
        break;
      default:
        return;
    }

    // Obtener el valor actualizado del control
    const UPDATED_VALUE = {
      [controlName]: formGroup.get(controlName)?.value,
    };

    //Actualizar la tienda o el servicio con el valor actualizado
    this.domicilioEstablecimientoStore.update(UPDATED_VALUE);
  }

  /**
   * Habilita o deshabilita el campo "No Licencia Sanitaria" según el estado del checkbox.
   * @param event Evento del checkbox.
   */
  toggleNoLicenciaSanitaria(event: Event): void {
    const NO_LICENCIA_SANITARIA = this.solicitudEstablecimientoForm.get(
      'noLicenciaSanitaria'
    );

    if ((event.target as HTMLInputElement).checked) {
      NO_LICENCIA_SANITARIA?.disable();
    } else {
      NO_LICENCIA_SANITARIA?.enable();
    }
  }

  /**
   * Limpia el formulario SCIAN.
   */
  limpiarScianForm(): void {
    this.scianForm.reset();
  }
  /**
   * Datos SCIAN agregados por el usuario.
   */
  personaparas: ScianModel[] = [];
  /**
   * Guarda un nuevo dato SCIAN y lo agrega a la tabla.
   */
  guardarScian(): void {
    if (this.scianForm.valid) {
      const SCIAN_DATA: ScianModel = {
        claveScian: this.scianForm.get('scian')?.value,
        descripcionScian: this.scianForm.get('descripcionScian')?.value,
      };

      // Agregar el nuevo dato a la tabla
      this.personaparas.push(SCIAN_DATA);
      this.datosData = [...this.personaparas];

      // Limpiar el formulario
      this.scianForm.reset();

      // Cerrar el modal
      this.closeScianModal();
    }
  }
  /**
   * compo docs
   * @description
   * Este método guarda los datos de una mercancía ingresados en el formulario `formMercancias`.
   * Si el formulario es válido, se crea un objeto `MERCANCIA` con los valores del formulario,
   * se agrega a la tabla de datos `mercanciasTablaDatos`, y luego se reinicia el formulario.
   */

  guardarMarcancia(): void {
    if (this.formMercancias.valid) {
      const MERCANCIA: MercanciasInfo = {
        clasificacion: this.formMercancias.get('clasificacion')?.value,
        especificar: this.formMercancias.get('especificarClasificacionProducto')
          ?.value,
        denominacionEspecifica: this.formMercancias.get(
          'denominacionEspecifica'
        )?.value,
        denominacionDistintiva: this.formMercancias.get(
          'denominacionDistintiva'
        )?.value,
        denominacionComun: this.formMercancias.get('denominacionComun')?.value,
        formaFarmaceutica: this.formMercancias.get('tipoDeProducto')?.value,
        estadoFisico: this.formMercancias.get('estadoFisico')?.value,
        estadoFormaFarmaceutica: this.formMercancias.get(
          'estadoFormaFarmaceutica'
        )?.value,
        fraccionArancelaria: this.formMercancias.get('fraccionArancelaria')
          ?.value,
        descripcionFraccion: this.formMercancias.get('descripcionFraccion')
          ?.value,
        unidadUMT: this.formMercancias.get('UMT')?.value,
        cantidadUMT: this.formMercancias.get('cantidadUMT')?.value,
        unidad: this.formMercancias.get('UMC')?.value,
        cantidadUMC: this.formMercancias.get('cantidadUMC')?.value,
        presentacion: this.formMercancias.get('presentacion')?.value,
        numeroRegistro: this.formMercancias.get('numeroRegistro')?.value,
        paisDeOrigen: this.formMercancias.get('paisDeOrigen')?.value,
        paisDeProcedencia: this.formMercancias.get('paisDeProcedencia')?.value,
        tipoProducto: this.formMercancias.get('tipoDeProducto')?.value,
        usoEspecifico: this.formMercancias.get('usoEspecifico')?.value,
      };

      // Add the new data to the table
      this.mercanciasTablaDatos.push(MERCANCIA);
      // Reset the form
      this.formMercancias.reset();
      this.cerrarModalMercancía();
    }
  }
  /* *
   * Método para eliminar un elemento de la tabla de mercancías.
   * @param index Índice del elemento a eliminar.
   **/
  validationMessages = MENSAJE_DE_VALIDACI0N;
  /**
   * * Método para obtener el mensaje de error de un control específico en el formulario.
   * @param controlName Nombre del control en el formulario.
   * @returns Mensaje de error o null si no hay error.
   *
   * */
  getErrorMessage(controlName: string): string | null {
    const CONTROL = this.formMercancias.get(controlName);
    if (
      CONTROL &&
      CONTROL.hasError('required') &&
      (CONTROL.touched || CONTROL.dirty)
    ) {
      return this.validationMessages[controlName];
    }
    return null;
  }

  /**
   * Abre el modal SCIAN.
   */
  openScianModal(): void {
    this.modalInstance.show();
  }

  /**
   * Cierra el modal SCIAN.
   */
  closeScianModal(): void {
    this.modalInstance.hide();
  }

  /**
   * Abre el modal SCIAN.
   */
  abrirModalMercancia(): void {
    this.modalAddAgentMercanciasInstance.show();
  }

  /**
   * Cierra el modal SCIAN.
   */
  cerrarModalMercancía(): void {
    this.modalAddAgentMercanciasInstance.hide();
  }

  /**
   * Configuración de columnas para la tabla de datos SCIAN.
   */
  configuracionTabla: ConfiguracionColumna<ScianModel>[] = SCIAN_TABLE_CONFIG;

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Método para crear el formulario.
   */
  hasError(form: FormGroup, controlName: string, error: string) {
    return (
      form.get(controlName)?.touched && form.get(controlName)?.hasError(error)
    );
  }
}
