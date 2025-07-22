import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  DatosDeFila,
  DatosForma,
  FilaSolicitud,
  RadioOpcion,
  SolicitudFilaTabla,
} from '../../models/220202/fitosanitario.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FitosanitarioStore } from '../../estados/fitosanitario.store';
import { INSTRUCCION_DOBLE_CLIC } from '../../constantes/220202/fitosanitario.enums';

/**
 * @description Constructor del componente.
 * @param fb - FormBuilder para crear formularios reactivos.
 * @param agriculturaApiService - Servicio para realizar peticiones HTTP relacionadas con la agricultura.
 * @param consultaioQuery - Query para obtener el estado de la consulta.
 * @param router - Router para navegar entre rutas.
 * @param activatedROute - Ruta activada para obtener parámetros de la ruta actual.
 * @param fitosanitarioStore - Store para manejar el estado del fitosanitario.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    CommonModule,
  ],
})

/**
 * Componente encargado de gestionar y mostrar los datos de la solicitud en el trámite agrícola.
 *
 * Este componente administra el formulario principal de la solicitud, así como la visualización y manipulación
 * de las tablas relacionadas con los datos de la solicitud y mercancías. Permite la carga de catálogos para los
 * selectores del formulario, la gestión del estado de solo lectura, y la actualización de los datos en el store.
 *
 * Además, implementa la lógica para inicializar los campos del formulario, manejar la selección de filas en las tablas,
 * y controlar la suscripción a los servicios para evitar fugas de memoria.
 *
 * @remarks
 * - Utiliza servicios para obtener datos de catálogos y del formulario.
 * - Permite alternar entre modo edición y solo lectura.
 * - Implementa OnInit y OnDestroy para el ciclo de vida del componente.
 *
 * @example
 * ```html
 * <app-datos-de-la-solicitud></app-datos-de-la-solicitud>
 * ```
 *
 * @see {@link AgriculturaApiService}
 * @see {@link FormBuilder}
 * @see {@link ConsultaioQuery}
 */
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /** @description Indica si el panel de detalle está colapsado o no. */
  colapsable: boolean = false;

  /**
   * @description Datos para las columnas de la tabla.
   * Cada elemento del array representa una columna y contiene la información para mostrar en la cabecera y las celdas de la tabla.
   */
  mesaColumnas: string[] = [];

  /**
   * @description Rango de días seleccionados.
   * Este array contiene las fechas seleccionadas por el usuario para filtrar la información mostrada en la tabla.
   */
  selectRangoDias: string[] = [];

  /**
   * @description Instrucción para el doble clic.
   * Este string contiene el mensaje que se muestra al usuario indicando que debe hacer doble clic en una celda para ver más detalles.
   */
  instruccionDobleClic: string = INSTRUCCION_DOBLE_CLIC;

  /**
   * @description Datos para el cuerpo de la tabla.
   * Este array contiene la información que se muestra en las celdas de la tabla, excluyendo la cabecera.
   */
  mesaCuerpo: string[] = [];

  /**
   * @description Datos de las filas de la tabla.
   * Este array de objetos contiene la información de cada fila de la tabla. Cada objeto representa una fila y contiene las propiedades necesarias para mostrar los datos en las celdas.
   */
  tablaDeDatosDeCelda: DatosDeFila[] = [];

  /**
   * @description Formulario para los datos del trámite.
   * Este `FormGroup` contiene los controles para los campos del formulario relacionados con los datos del trámite.
   */
  procedureData?: FormGroup;

  /**
   * @description Lista de aduanas.
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de aduanas en el formulario.
   */
  aduanaList: Catalogo[] = [];

  /**
   * @description Lista de establecimientos agropecuarios.
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de establecimientos agropecuarios en el formulario.
   */
  agropecuariaList: Catalogo[] = [];

  /**
   * @description Lista de puntos de verificación.
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de puntos de verificación en el formulario.
   */
  puntoList: Catalogo[] = [];

  /**
   * @description Lista de regímenes.
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de regímenes en el formulario.
   */
  regimeList: Catalogo[] = [];

  /**
   * @description Lista de productos.
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de productos en el formulario.
   */
  productoList: Catalogo[] = [];

  /**
   * @description Lista de usos.
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de usos en el formulario.
   */
  usoList: Catalogo[] = [];

  /**
   * @description Lista de unidades de medida de cantidad (UMC).
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de UMC en el formulario.
   */
  umcList: Catalogo[] = [];

  /**
   * @description Lista de NICO (Número de Identificación Comercial).
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de NICO en el formulario.
   */
  nicoList: Catalogo[] = [];

  /**
   * @description Lista de fracciones arancelarias.
   * Este array contiene los objetos `Catalogo` que se utilizan para poblar el selector de fracciones arancelarias en el formulario.
   */
  arancelariaList: Catalogo[] = [];

  /**
   * @description Formulario principal.
   * Este `FormGroup` contiene todos los controles del formulario.
   */
  forma!: FormGroup;

  /**
   * @description Formulario para el transporte.
   * Este `FormGroup` contiene los controles para los campos del formulario relacionados con la información de transporte.
   */
  formularioDeTransporte?: FormGroup;

  /**
   * @description Almacena los datos del formulario principal.
   * @type {DatosForma}
   */
  formulariodataStore: DatosForma = {} as DatosForma;

  /**
   * @description Tipo de selección para la tabla de solicitudes.
   * @type {TablaSeleccion}
   */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * @description Tipo de selección para la tabla de mercancías.
   * @type {TablaSeleccion}
   */
  tipoSeleccionsoliMercancias: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * @description Configuración de las columnas de la tabla de solicitudes.
   * Cada objeto define el encabezado, la clave de acceso y el orden de la columna.
   * @type {ConfiguracionColumna<FilaSolicitud>[]}
   */
  configuracionColumnasoli: ConfiguracionColumna<FilaSolicitud>[] = [
    { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },
    {
      encabezado: 'Tipo de requisito',
      clave: (fila) => fila.tipoRequisito,
      orden: 2,
    },
    { encabezado: 'Requisito', clave: (fila) => fila.requisito, orden: 3 },
    {
      encabezado: 'Número de Certificado Internacional',
      clave: (fila) => fila.numeroCertificadoInternacional,
      orden: 4,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (fila) => fila.fraccionArancelaria,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la fracción',
      clave: (fila) => fila.descripcionFraccion,
      orden: 6,
    },
    { encabezado: 'Nico', clave: (fila) => fila.nico, orden: 7 },
    {
      encabezado: 'Descripción Nico',
      clave: (fila) => fila.descripcionNico,
      orden: 8,
    },
    { encabezado: 'Descripción', clave: (fila) => fila.descripcion, orden: 9 },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (fila) => fila.umt,
      orden: 10,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (fila) => fila.cantidadUMT,
      orden: 11,
    },
    {
      encabezado: 'Unidad de medida de comercialización (UMC)',
      clave: (fila) => fila.umc,
      orden: 12,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (fila) => fila.cantidadUMC,
      orden: 13,
    },
    { encabezado: 'Uso', clave: (fila) => fila.uso, orden: 14 },
    {
      encabezado: 'Tipo de Producto',
      clave: (fila) => fila.tipoDeProducto,
      orden: 15,
    },
    {
      encabezado: 'Número de lote',
      clave: (fila) => fila.numeroDeLote,
      orden: 16,
    },
    {
      encabezado: 'País de origen',
      clave: (fila) => fila.paisDeOrigen,
      orden: 17,
    },
    {
      encabezado: 'País de procedencia',
      clave: (fila) => fila.paisDeProcedencia,
      orden: 18,
    },
    {
      encabezado: 'Certificado Internacional Electrónico',
      clave: (fila) => fila.certificadoInternacionalElectronico,
      orden: 19,
    },
  ];

  /**
   * @description Configuración de las columnas de la tabla de solicitudes.
   * Cada objeto define el encabezado, la clave de acceso y el orden de la columna.
   * @type {ConfiguracionColumna<SolicitudFilaTabla>[]}
   */
  solicitudConfigurationColumnasoli: ConfiguracionColumna<SolicitudFilaTabla>[] =
    [
      {
        encabezado: 'Fecha Creación',
        clave: (fila) => fila.fechaCreacion,
        orden: 1,
      },
      { encabezado: 'Mercancía', clave: (fila) => fila.mercancia, orden: 2 },
      { encabezado: 'Cantidad', clave: (fila) => fila.cantidad, orden: 3 },
      { encabezado: 'Proovedor', clave: (fila) => fila.proveedor, orden: 4 },
    ];

  /**
   * @description Datos de la tabla principal.
   * @type {FilaSolicitud[]}
   */
  cuerpoTabla: FilaSolicitud[] = [];

  /**
   * @description Lista de solicitudes para la tabla.
   * @type {SolicitudFilaTabla[]}
   */
  solicitubLista: SolicitudFilaTabla[] = [];

  /**
   * @description Subject utilizado para destruir las suscripciones y evitar fugas de memoria cuando el componente se destruye.
   * @type {Subject<void>}
   */
  public destroyNotifier$ = new Subject<void>();

  /**
   * @description Indica si el formulario se encuentra en modo solo lectura.
   * @type {boolean}
   */
  public esFormularioSoloLectura: boolean = false;

  /**
   * @description Fila seleccionada en la tabla.
   * @type {FilaSolicitud[]}
   */
  selectedRow: FilaSolicitud[] = [];

  /**
   * Opciones para el botón de radio.
   * @property {RadioOpcion[]} opcionDeBotonDeRadio
   */
  opcionDeBotonDeRadio: RadioOpcion[] = [
    {
      label: 'Animales Vivos',
      value: 'yes',
    },
    {
      label: 'Productos Subproductos',
      value: 'no',
    },
  ];

  /**
   * @description Indica si se debe mostrar la notificación de verificación.
   * Esta propiedad se utiliza para controlar la visibilidad de una notificación en la interfaz de usuario.
   *
   * @type {boolean}
   */
  public notificationCheck: boolean = true;

  /**
   * @description Indica si se debe mostrar la tabla de solicitudes.
   * Esta propiedad se utiliza para controlar la visibilidad de la tabla de solicitudes en la interfaz de usuario.
   * @type {boolean}
   */
  public mostrarSolicitudTabla: boolean = false;

  /**
   * Arreglo que contiene las filas de la tabla de solicitudes.
   * @type {SolicitudFilaTabla[]}
   */
  cuerpoTablaSolicitud: SolicitudFilaTabla[] = [
    {
      fechaCreacion: '2025-06-17 10:30:00',
      mercancia: 'Laptop HP',
      cantidad: 5,
      proveedor: 'Tech Solutions Inc.',
    },
    {
      fechaCreacion: '2025-06-16 14:15:30',
      mercancia: 'Monitor Dell 27"',
      cantidad: 10,
      proveedor: 'Global Electronics',
    },
    {
      fechaCreacion: '2025-06-15 09:00:00',
      mercancia: 'Teclado Mecánico RGB',
      cantidad: 8,
      proveedor: 'Peripherals World',
    },
    {
      fechaCreacion: '2025-06-14 17:45:10',
      mercancia: 'Mouse Inalámbrico Logitech',
      cantidad: 12,
      proveedor: 'Tech Accessories Co.',
    },
    {
      fechaCreacion: '2025-06-13 11:20:05',
      mercancia: 'Impresora Epson EcoTank',
      cantidad: 3,
      proveedor: 'Print Masters',
    },
  ];

  /**
   * @constructor
   * @param {FormBuilder} fb - Servicio FormBuilder para crear y gestionar formularios reactivos.
   * @param {AgriculturaApiService} agriculturaApiService - Servicio HttpClient para realizar peticiones HTTP.
   */
  constructor(
    public fb: FormBuilder,
    public agriculturaApiService: AgriculturaApiService,
    public consultaioQuery: ConsultaioQuery,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public fitosanitarioStore: FitosanitarioStore
  ) {
    this.agriculturaApiService
      .getAllDatosForma()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.formulariodataStore = datos.datos;
        this.cuerpoTabla = datos.tablaDatos;
        this.createFromFields();
      });

    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.mostrarSolicitudTabla = !seccionState.readonly;
          this.mostrarSolicitudTabla = !seccionState.update;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * @description Inicializa el componente.
   * Este método se llama automáticamente después de que se crea el componente.
   * Llama a otros métodos para obtener los datos iniciales que se mostrarán en el formulario y la tabla.
   * @method ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.forma?.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe(() => {
        const FORMA_VALIDA_ACTUALIZADA = {
          datosFormaValidacion: false,
        };
        FORMA_VALIDA_ACTUALIZADA.datosFormaValidacion = this.forma?.valid
          ? true
          : false;
        this.agriculturaApiService.actualizarFormaValida(
          FORMA_VALIDA_ACTUALIZADA
        );
      });
    this.obtenerTodosLosDatosDeLaLista();
    this.createFromFields();
  }

  /**
   * @description Inicializa el estado del formulario dependiendo si está en modo solo lectura o edición.
   * Si el formulario está en modo solo lectura, deshabilita los campos; de lo contrario, los habilita y crea los campos del formulario.
   * @method inicializarEstadoFormulario
   * @returns {void}
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.createFromFields();
    }
  }

  /**
   * @description Habilita o deshabilita el formulario según el modo de solo lectura.
   * Si el formulario está en modo solo lectura, deshabilita todos los controles; si no, los habilita.
   * @method guardarDatosFormulario
   * @returns {void}
   */
  guardarDatosFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.forma.disable();
    } else {
      this.forma.enable();
    }
  }

  /**
   * @description Crea los campos del formulario y los agrupa en un `FormGroup`.
   * Inicializa el formulario principal (`forma`) con los controles para los datos de la solicitud,
   * incluyendo un `FormArray` para las mercancías.
   * @method createFromFields
   * @returns {void}
   */
  createFromFields(): void {
    this.forma = this.fb.group(this.inicializarCamposFormulario());
    if (this.forma) {
      this.notificationCheck = true;
    }
  }

  /**
   * Método que inicializa los campos del formulario.
   * @returns Un objeto con los campos del formulario.
   */
  inicializarCamposFormulario(): Record<string, unknown> {
    return {
      ...this.crearCamposRequeridos(),
    };
  }

  /**
   * Método para crear campos requeridos del formulario.
   * @param FORMULARIO Datos de formulariodataStore.
   * @returns Objeto con los campos requeridos.
   */
  crearCamposRequeridos(): Record<string, unknown> {
    const FORMULARIO = this.formulariodataStore;
    return {
      tipoMercancia: [
        { value: 'yes', disabled: this.esFormularioSoloLectura },
        Validators.required,
      ],
      aduanaDeIngreso: [
        {
          value: FORMULARIO.aduanaDeIngreso || '',
          disabled: this.esFormularioSoloLectura,
        },
        Validators.required,
      ],
      oficinaDeInspeccion: [
        {
          value: FORMULARIO.oficinaDeInspeccion || '',
          disabled: this.esFormularioSoloLectura,
        },
        Validators.required,
      ],
      puntoDeInspeccion: [
        {
          value: FORMULARIO.puntoDeInspeccion || '',
          disabled: this.esFormularioSoloLectura,
        },
        Validators.required,
      ],
      regimen: [
        {
          value: FORMULARIO.regimen || '',
          disabled: this.esFormularioSoloLectura,
        },
        Validators.required,
      ],
      numeroDeGuia: [
        {
          value: FORMULARIO.numeroDeGuia || '',
          disabled: this.esFormularioSoloLectura,
        },
      ],
      numeroDeCarro: [
        {
          value: FORMULARIO.numeroDeCarro || '',
          disabled: this.esFormularioSoloLectura,
        },
      ],
    };
  }

  /**
   * @description Obtiene todos los datos para las listas de opciones (selects) del formulario.
   * Este método llama a las funciones individuales para obtener los datos de cada lista: aduana, agropecuaria, punto, régimen, arancelaria, NICO, producto, unidad de medida de cantidad (UMC) y uso.
   * @method obtenerTodosLosDatosDeLaLista
   * @returns {void}
   */
  obtenerTodosLosDatosDeLaLista(): void {
    this.getaduanaLista();
    this.getagropecuariaLista();
    this.getPuntoLista();
    this.getRegimenLista();
    this.getArancelariaLista();
    this.getNicoLista();
    this.getProductoLista();
    this.getUmCLista();
    this.getusoLista();
  }

  /**
   * @description Muestra u oculta el panel colapsable.
   * @method mostrar_colapsable
   * @returns {void}
   */
  mostrar_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * @description Obtiene la lista de aduanas desde un archivo JSON.
   * @method getaduanaLista
   * @returns {void}
   */
  getaduanaLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('aduana_de_ingreso.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.aduanaList = data as Catalogo[];
      });
  }

  /**
   * @description Obtiene la lista de agropecuarias desde un archivo JSON.
   * @method getagropecuariaLista
   * @returns {void}
   */
  getagropecuariaLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('aduana_de_ingreso.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.agropecuariaList = data as Catalogo[];
      });
  }

  /**
   * @description Obtiene la lista de puntos de verificación desde un archivo JSON.
   * @method getPuntoLista
   * @returns {void}
   */
  getPuntoLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('punto.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.puntoList = data as Catalogo[];
      });
  }

  /**
   * @description Obtiene la lista de regímenes desde un archivo JSON.
   * @method getRegimenLista
   * @returns {void}
   */
  getRegimenLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('regimen.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.regimeList = data as Catalogo[];
      });
  }

  /**
   * @description Obtiene la lista de fracciones arancelarias desde un archivo JSON.
   * @method getArancelariaLista
   * @returns {void}
   */
  getArancelariaLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.arancelariaList = data as Catalogo[];
      });
  }

  /**
   * @description Obtiene la lista de NICO desde un archivo JSON.
   * @method getNicoLista
   * @returns {void}
   */
  getNicoLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.nicoList = data as Catalogo[];
      });
  }

  /**
   * @description Obtiene la lista de unidades de medida de cantidad (UMC) desde un archivo JSON.
   * @method getUmCLista
   * @returns {void}
   */
  getUmCLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.umcList = data as Catalogo[];
      });
  }

  /**
   * @description Obtiene la lista de usos desde un archivo JSON.
   * @method getusoLista
   * @returns {void}
   */
  getusoLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.usoList = data as Catalogo[];
      });
  }

  /**
   * @description Obtiene la lista de productos desde un archivo JSON.
   * @method getProductoLista
   * @returns {void}
   */
  getProductoLista(): void {
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.productoList = data as Catalogo[];
      });
  }

  /**
   * @description Actualiza los datos almacenados en el store.
   * @method setValoresStore
   */
  setValoresStore(_forma?: FormGroup, _campo?: string): void {
    const VALOR = this.forma.value;
    (
      this.agriculturaApiService.updateDatosForma as (value: DatosForma) => void
    )(VALOR);
  }

  /**
   * Maneja la selección de una fila en la tabla de solicitudes.
   *
   * Cuando se selecciona una fila, este método actualiza los valores del formulario (`forma`)
   * con datos predefinidos relacionados con la solicitud seleccionada, usando los IDs correctos de los catálogos.
   *
   * @param event - Objeto de tipo `SolicitudFilaTabla` que representa la fila seleccionada en la tabla.
   */
  seleccionFila(event: SolicitudFilaTabla): void {
    if (event) {
      this.forma.patchValue({
        aduanaDeIngreso: '1',
        oficinaDeInspeccion: '1',
        puntoDeInspeccion: '1',
        numeroDeGuia: 'GUIA123456',
        regimen: '1',
        numeroDeCarro: 'CARRO7890',
        requisito: 'Certificado Zoosanitario',
        numeroCertificadoInternacional: 'CERTINTL2024',
        descripcionFraccion: 'Caballos de raza pura',
        descripcionNico: 'Caballos para carreras',
        descripcion: 'Importación de caballos de carreras',
      });
    }
  }

  /**
   * @description Getter que indica si hay registros seleccionados en la tabla.
   * @returns {boolean} true si hay al menos un registro seleccionado, false en caso contrario.
   */
  get tieneRegistrosSeleccionados(): boolean {
    const SELECTED_DATA = this.fitosanitarioStore.getValue().selectedDatos;
    return SELECTED_DATA && SELECTED_DATA.length > 0;
  }

  /**
   * @description Navega a la página de agregar mercancía.
   * Este método redirige al usuario a la ruta relativa 'mercancia-form' para agregar una nueva mercancía.
   * @method agregarMercancia
   * @returns {void}
   */
  agregarMercancia(): void {
    this.seleccionTabla([]);
    this.router.navigate(['../mercancia-form'], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * @description Selecciona una fila de la tabla de solicitudes y actualiza el estado del store.
   * Este método se llama cuando se selecciona una fila en la tabla de solicitudes.
   * Actualiza el estado del store con los datos de la fila seleccionada.
   * @method seleccionTabla
   * @param {FilaSolicitud} event - Datos de la fila seleccionada.
   */
  seleccionTabla(event: FilaSolicitud[]): void {
    this.fitosanitarioStore.update((state) => ({
      ...state,
      selectedDatos: event,
    }));
  }

  /**
   * @description Navega a la página de modificar mercancía.
   * Este método redirige al usuario a la ruta relativa '../mercancia-form' para modificar una mercancía existente.
   * Solo permite la navegación si hay al menos un registro seleccionado.
   * Mantiene los datos seleccionados en el store para pre-llenar el formulario.
   * @method modificarMercancia
   * @returns {void}
   */
  modificarMercancia(): void {
    const SELECTED_DATA = this.fitosanitarioStore.getValue().selectedDatos;
    // Verificar si hay al menos un registro seleccionado
    if (!SELECTED_DATA || SELECTED_DATA.length === 0) {
      // Si no hay registros seleccionados, no realizar ninguna acción
      return;
    }
    // Si hay datos seleccionados, navegar a la página de modificación
    const ID = SELECTED_DATA[0].noPartida || 1; // Usar ID del primer registro seleccionado
    this.router.navigate(['../mercancia-form', ID], {
      relativeTo: this.activatedRoute,
    });
  }

  /**
   * @description Método que se ejecuta cuando el componente es destruido.
   * Utiliza un Subject para notificar a las suscripciones que deben ser destruidas, evitando fugas de memoria.
   * @method ngOnDestroy
   * @returns {void}
   */
  eliminarMercancia(): void {
    const VALOR = this.fitosanitarioStore.getValue().tablaDatos;
    if (VALOR && VALOR.length === 0) {
      return;
    }
    const FILTERED_VALOR = VALOR.filter(
      (item) => !this.fitosanitarioStore.getValue().selectedDatos.includes(item)
    );
    this.fitosanitarioStore.update((state) => ({
      ...state,
      tablaDatos: FILTERED_VALOR,
    }));
  }

  /**
   * @description Destruye la suscripción cuando el componente es destruido.
   * @method ngOnDestroy
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
