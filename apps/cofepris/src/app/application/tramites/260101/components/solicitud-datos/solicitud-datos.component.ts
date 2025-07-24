import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionColumna,
  InputRadioComponent,
  REGEX_CORREO_ELECTRONICO,
  REGEX_TELEFONO,
  TablaDinamicaComponent,
  TablaSeleccion,
  TableComponent,
  TableData,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  DatosDeSolicitud,
  RadioOptions,
  SCIAN,
  Solicitud,
  SolicitudDatos,
} from '../../models/solicitud-datos.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Solicitud260101State,
  Solicitud260101Store,
} from '../../estados/tramites260101.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Mercancia } from '../../models/mercancia.model';
import { Modal } from 'bootstrap';
import { ModificarMercanciasComponent } from '../modificar-mercancias/modificar-mercancias.component';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { TEXTOS } from '../../constantes/constantes';

/**
 * Componente que representa los datos de la solicitud.
 */
@Component({
  selector: 'app-solicitud-datos',
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputRadioComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    TableComponent,
    AlertComponent,
    TituloComponent,
    ModificarMercanciasComponent,
  ],
})
/**
 * Componente que representa los datos de la solicitud
 */
export class SolicitudDatosComponent implements OnInit, OnDestroy {
  /**
   * Obtiene los datos de enumeración y establece valores de TEXTOS.
   * Esta variable contiene los textos estáticos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Controla la visibilidad del panel plegable.
   * El valor predeterminado está establecido en verdadero (panel ampliado).
   */
  public colapsable = true;

  /**
   * Controlador para manejar la destrucción del componente.
   * Utilizado para liberar recursos relacionados con las suscripciones.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Lista de identificadores SCIAN seleccionados.
   *
   * Contiene los IDs (de tipo `number`) correspondientes a las actividades
   * económicas seleccionadas por el usuario dentro del formulario.
   *
   * @type {number[]}
   */
  scianSeleccionados: number[] = [];

  /**
   * Lista de identificadores de mercancías seleccionadas.
   *
   * Este arreglo almacena los IDs de las mercancías que el usuario ha elegido,
   * ya sea para registrar, modificar o visualizar en el contexto del formulario.
   *
   * @type {number[]}
   */
  mercanciasSeleccionados: number[] = [];

  /**
   * Configuración de la tabla de mercancías.
   * Contiene encabezados y cuerpo de datos vacíos al inicio.
   */
  public tableDataMercancias: TableData = {
    tableHeader: [],
    tableBody: [],
  };

  /**
   * Catálogo relacionado con el régimen.
   * Inicializado como un objeto vacío.
   */
  regimenCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con la aduana.
   * Inicializado como un objeto vacío.
   */
  aduanaCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo relacionado con los estados.
   * Inicializado como un objeto vacío.
   */
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Formulario reactivo utilizado para gestionar datos de la solicitud.
   * Se inicializará más adelante en el componente.
   */
  solicitudForm!: FormGroup;

  /**
   * Datos de las mercancías seleccionadas.
   * Representados como un arreglo de objetos tipo Mercancia.
   */
  selectedMercanciasDatos: Mercancia[] = [];

  /**
   * Lista de objetos SCIAN seleccionados por el usuario.
   *
   * Este arreglo contiene los elementos completos del catálogo SCIAN
   * que han sido seleccionados en el formulario o componente actual.
   *
   * A diferencia de `scianSeleccionados`, que solo guarda los IDs,
   * esta propiedad almacena los objetos `SCIAN` completos con toda su información.
   *
   * @type {SCIAN[]}
   */
  selectedscianDatos: SCIAN[] = [];

  /**
   * Referencia al elemento del modal para agregar mercancías.
   * Utilizado para manipular el modal mediante su elemento HTML.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Opciones de botones de selección por radio.
   * Representadas como un arreglo de objetos tipo RadioOptions.
   */
  hacerlosRadioOptions: RadioOptions[] = [];

  /**
   * Controla el valor seleccionado en los botones de selección por radio.
   * Inicializado con un valor predeterminado de 0.
   */
  hacerlosPublicos = 0;

  /**
   * Estado actual de la solicitud.
   * Inicializado como un objeto vacío con la estructura de Solicitud260101State.
   */
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;

  /**
   * Configuración para la selección de filas en la tabla de mercancías.
   * Utiliza selección con checkbox.
   */
  mercanciasSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Modo de selección de la tabla SCIAN.
   *
   * Define el tipo de selección que permite la tabla de actividades económicas SCIAN.
   * En este caso, se configura como selección por `CHECKBOX`, lo que permite seleccionar múltiples filas.
   *
   * Esta propiedad utiliza un valor del enum `TablaSeleccion`.
   *
   * @type {TablaSeleccion}
   */
  scianSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración para la selección de filas en la tabla de solicitudes.
   * Actualmente está desactivada (sin selección definida).
   */
  solicitudSeleccionTabla = TablaSeleccion.UNDEFINED;

  /**
   * Configuración de las columnas de la tabla de solicitudes.
   * Define los encabezados, claves y orden para mostrar los datos de solicitudes.
   */
  solicitudConfiguracionTabla: ConfiguracionColumna<SolicitudDatos>[] = [
    {
      /**
       * Columna para mostrar la fecha de creación de la solicitud.
       * Utiliza la propiedad 'fechaCreacion' del modelo 'SolicitudDatos'.
       */
      encabezado: 'Fecha creación',
      clave: (item: SolicitudDatos) => item.fechaCreacion,
      orden: 1,
    },
    {
      /**
       * Columna para mostrar la mercancía asociada a la solicitud.
       * Utiliza la propiedad 'mercancia' del modelo 'SolicitudDatos'.
       */
      encabezado: 'Mercancía',
      clave: (item: SolicitudDatos) => item.mercancia,
      orden: 2,
    },
    {
      /**
       * Columna para mostrar la cantidad asociada a la solicitud.
       * Utiliza la propiedad 'cantidad' del modelo 'SolicitudDatos'.
       */
      encabezado: 'Cantidad',
      clave: (item: SolicitudDatos) => item.cantidad,
      orden: 3,
    },
    {
      /**
       * Columna para mostrar el proveedor asociado a la solicitud.
       * Utiliza la propiedad 'proovedor' del modelo 'SolicitudDatos'.
       */
      encabezado: 'Proveedor',
      clave: (item: SolicitudDatos) => item.proovedor,
      orden: 4,
    },
  ];

  /**
   * Datos de las solicitudes.
   * Inicialmente, es un arreglo vacío que se llenará con datos dinámicos.
   */
  solicitudDatos: SolicitudDatos[] = [];

  /**
   * Configuración de las columnas de la tabla de mercancías.
   * Define las columnas y cómo se obtienen los datos de cada mercancía.
   */
  mercanciasConfiguracionTabla: ConfiguracionColumna<Mercancia>[] = [
    {
      encabezado: 'Clasificación del producto',
      clave: (item: Mercancia) => item.clasificaionProductos,
      orden: 1,
    },
    {
      encabezado: 'Especificar Clasificación del producto',
      clave: (item: Mercancia) => item.especificarProducto,
      orden: 2,
    },
    {
      encabezado: 'Denominación específico del producto',
      clave: (item: Mercancia) => item.nombreProductoEspecifico,
      orden: 3,
    },
    {
      encabezado: 'Marca',
      clave: (item: Mercancia) => item.marca,
      orden: 4,
    },
    {
      encabezado: 'Fracción arancelaria',
      clave: (item: Mercancia) => item.fraccionArancelaria,
      orden: 5,
    },
    {
      encabezado: 'Descripción de la fracción arancelaria',
      clave: (item: Mercancia) => item.descripcionFraccionArancelaria,
      orden: 6,
    },
    {
      encabezado: 'Unidad de medida de comercialización (UMC)',
      clave: (item: Mercancia) => item.umc,
      orden: 7,
    },
    {
      encabezado: 'Cantidad UMC',
      clave: (item: Mercancia) => item.cantidadUMC,
      orden: 8,
    },
    {
      encabezado: 'Unidad de medida de tarifa (UMT)',
      clave: (item: Mercancia) => item.umt,
      orden: 9,
    },
    {
      encabezado: 'Cantidad UMT',
      clave: (item: Mercancia) => item.cantidadUMT,
      orden: 10,
    },
    {
      encabezado: 'País de origen',
      clave: (item: Mercancia) => item.paisDeOrigen,
      orden: 11,
    },
    {
      encabezado: 'País de procedencia',
      clave: (item: Mercancia) => item.paisDeProcedencia,
      orden: 12,
    },
    {
      encabezado: 'Tipo de producto',
      clave: (item: Mercancia) => item.tipoProducto,
      orden: 13,
    },
    {
      encabezado: 'Uso específico',
      clave: (item: Mercancia) => item.usoEspecifico,
      orden: 14,
    },
  ];

  /**
   * Configuración de columnas para la tabla de actividades económicas SCIAN.
   *
   * Define las columnas que se mostrarán en la tabla de selección SCIAN,
   * incluyendo encabezados, claves de acceso a los datos y el orden de aparición.
   *
   * Cada objeto en el arreglo representa una columna de la tabla y utiliza
   * el tipo genérico `ConfiguracionColumna<SCIAN>`, que asume que los datos
   * provienen de objetos del tipo `SCIAN`.
   *
   * - `encabezado`: Título de la columna visible para el usuario.
   * - `clave`: Función que extrae el valor correspondiente del objeto `SCIAN`.
   * - `orden`: Determina el orden en que se muestra la columna.
   *
   * @type {ConfiguracionColumna<SCIAN>[]}
   */
  scianConfiguracionTabla: ConfiguracionColumna<SCIAN>[] = [
    {
      encabezado: 'Clave S.C.I.A.N',
      clave: (item: SCIAN) => item.clave,
      orden: 1,
    },
    {
      encabezado: 'Descripción del S.C.I.A.N.',
      clave: (item: SCIAN) => item.descripcion,
      orden: 2,
    },
  ];

  /**
   * Datos de las mercancías.
   * Representados como un arreglo de objetos tipo Mercancia.
   */
  mercanciasDatos: Mercancia[] = [];

  /**
   * Catálogo completo de actividades económicas SCIAN.
   *
   * Este arreglo contiene todos los elementos del catálogo SCIAN disponibles
   * para mostrar en la tabla o para ser seleccionados por el usuario.
   *
   * Los objetos de tipo `SCIAN` pueden incluir propiedades como clave, descripción, etc.
   *
   * @type {SCIAN[]}
   */
  scianDatos: SCIAN[] = [];

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa servicios y otras dependencias necesarias.
   * @param solicitudDatosService - Servicio para manejar datos relacionados con la solicitud.
   * @param solicitud260101Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260101Query - Consulta para observar los cambios en el estado de la solicitud.
   * @param fb - Servicio para construir formularios reactivos.
   * @param consultaioQuery - Servicio para consultar el estado actual desde el store.
   */
  constructor(
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query,
    public fb: FormBuilder,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * Inicializa el formulario reactivo y configura las suscripciones necesarias.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
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
      this.solicitudForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.solicitudForm.enable();
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
    this.solicitudForm = this.fb.group({
      /** Razón social del solicitante. */
      razonSocial: [
        { value: this.solicitud260101State.razonSocial, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Correo electrónico del solicitante con validación de patrón. */
      correoElectronico: [
        { value: this.solicitud260101State.correoElectronico, disabled: true },
        [Validators.required, Validators.pattern(REGEX_CORREO_ELECTRONICO)],
      ],
      /** Código postal del domicilio del solicitante. */
      codigoPostal: [
        { value: this.solicitud260101State.codigoPostal, disabled: true },
        [Validators.required, Validators.maxLength(10)],
      ],
      /** Estado asociado al domicilio. */
      estado: [this.solicitud260101State.estado, [Validators.required]],
      /** Municipio del domicilio del solicitante. */
      municipio: [
        { value: this.solicitud260101State.municipio, disabled: true },
        [Validators.required],
      ],
      /** Localidad del domicilio. */
      localidad: [
        { value: this.solicitud260101State.localidad, disabled: true },
      ],
      /** Colonia del domicilio. */
      colonia: [{ value: this.solicitud260101State.colonia, disabled: true }],
      /** Calle del domicilio. */
      calle: [
        { value: this.solicitud260101State.calle, disabled: true },
        [Validators.required, Validators.maxLength(68)],
      ],
      /** Código LADA del número telefónico del solicitante. */
      lada: [{ value: this.solicitud260101State.lada, disabled: true }],
      /** Número telefónico con validación de longitud y formato. */
      telefono: [
        { value: this.solicitud260101State.telefono, disabled: true },
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(REGEX_TELEFONO),
        ],
      ],
      /** Indicador de aviso de funcionamiento del solicitante. */
      avisoDeFuncionamiento: [
        {
          value: this.solicitud260101State.avisoDeFuncionamiento,
          disabled: this.esFormularioSoloLectura,
        },
      ],
      /** Licencia sanitaria del solicitante. */
      licenciaSanitaria: [
        {
          value: this.solicitud260101State.licenciaSanitaria,
          disabled: this.esFormularioSoloLectura,
        },
      ],
      /** Estado del producto (fresco, congelado o vivo). */
      liveFreshFrozen: [
        {
          value: this.solicitud260101State.liveFreshFrozen,
          disabled: this.esFormularioSoloLectura,
        },
      ],
      /** Régimen asociado al trámite. */
      regimen: [
        { value: this.solicitud260101State.regimen, disabled: false },
        [Validators.required],
      ],
      /** Aduana asociada al trámite. */
      aduana: [
        { value: this.solicitud260101State.aduana, disabled: false },
        [Validators.required],
      ],
      /** Indicador de selección "hacerlos". */
      hacerlos: [
        {
          value: this.solicitud260101State.hacerlos,
          disabled: this.esFormularioSoloLectura,
        },
        [Validators.required],
      ],
      /** RFC del solicitante. */
      rfc: [
        {
          value: this.solicitud260101State.rfc,
          disabled: this.esFormularioSoloLectura,
        },
        [Validators.required, Validators.maxLength(13)],
      ],
      /** Razón social del representante legal. */
      legalRazonSocial: [
        { value: this.solicitud260101State.legalRazonSocial, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Apellido paterno del solicitante. */
      apellidoPaterno: [
        { value: this.solicitud260101State.apellidoPaterno, disabled: true },
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Apellido materno del solicitante. */
      apellidoMeterno: [
        { value: this.solicitud260101State.apellidoMeterno, disabled: true },
        [Validators.maxLength(30)],
      ],
      /** Indicador de manifiesto en el estado actual. */
      manifesto: [
        {
          value: this.solicitud260101State.manifesto,
          disabled: this.esFormularioSoloLectura,
        },
      ],
    });

    // Observa cambios en el estado de la solicitud y actualiza el formulario reactivo.
    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260101State) => {
          this.solicitud260101State = respuesta;
          this.solicitudForm.patchValue({
            razonSocial: this.solicitud260101State.razonSocial,
            correoElectronico: this.solicitud260101State.correoElectronico,
            codigoPostal: this.solicitud260101State.codigoPostal,
            estado: this.solicitud260101State.estado,
            municipio: this.solicitud260101State.municipio,
            localidad: this.solicitud260101State.localidad,
            colonia: this.solicitud260101State.colonia,
            calle: this.solicitud260101State.calle,
            lada: this.solicitud260101State.lada,
            telefono: this.solicitud260101State.telefono,
            avisoDeFuncionamiento:
              this.solicitud260101State.avisoDeFuncionamiento,
            licenciaSanitaria: this.solicitud260101State.licenciaSanitaria,
            liveFreshFrozen: this.solicitud260101State.liveFreshFrozen,
            regimen: this.solicitud260101State.regimen,
            aduana: this.solicitud260101State.aduana,
            hacerlos: this.solicitud260101State.hacerlos,
            rfc: this.solicitud260101State.rfc,
            legalRazonSocial: this.solicitud260101State.legalRazonSocial,
            apellidoPaterno: this.solicitud260101State.apellidoPaterno,
            apellidoMeterno: this.solicitud260101State.apellidoMeterno,
            manifesto: this.solicitud260101State.manifesto,
          });
          // Actualiza las tablas de
          this.mercanciasDatos = this.solicitud260101State.mercanciasDatos;
          this.scianSeleccionados =
            this.solicitud260101State.scianSeleccionados;
          this.mercanciasSeleccionados =
            this.solicitud260101State.mercanciasSeleccionados;
        })
      )
      .subscribe();

    // Obtiene catálogos y datos relacionados con la aplicación.
    this.obtenerEstadoCatalogo();
    this.obtenerDatosDeAplicacion();
    this.obtenerRegimenDestinaraListo();
    this.obtenerAduanaListo();
    this.obtenerMercanciaListo();
    this.obtenerSolicitud();
  }

  /**
   * Muestra u oculta el panel plegable.
   * Cambia el estado de la propiedad `colapsable`.
   */
  mostrarColapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Obtiene los datos iniciales de la solicitud y los actualiza en el estado.
   */
  obtenerSolicitud(): void {
    this.solicitudDatosService
      .obtenerSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Solicitud) => {
          this.solicitud260101Store.setRazonSocial(respuesta.razonSocial);
          this.solicitud260101Store.setCorreoElectronico(
            respuesta.correoElectronico
          );
          this.solicitud260101Store.setCodigoPostal(respuesta.codigoPostal);
          this.solicitud260101Store.setMunicipio(respuesta.municipio);
          this.solicitud260101Store.setLocalidad(respuesta.localidad);
          this.solicitud260101Store.setColonia(respuesta.colonia);
          this.solicitud260101Store.setCalle(respuesta.calle);
          this.solicitud260101Store.setLada(respuesta.lada);
          this.solicitud260101Store.setTelefono(respuesta.telefono);
          this.solicitud260101Store.setLegalRazonSocial(
            respuesta.legalRazonSocial
          );
          this.solicitud260101Store.setApellidoPaterno(
            respuesta.apellidoPaterno
          );
          this.solicitud260101Store.setApellidoMeterno(
            respuesta.apellidoMeterno
          );
        },
      });
  }

  /**
   * Obtiene el catálogo de estados desde el servicio y actualiza la variable `estadoCatalogo`.
   */
  obtenerEstadoCatalogo(): void {
    this.solicitudDatosService
      .obtenerEstadoCatalogo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.estadoCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene los datos de la aplicación relacionados con la solicitud,
   * incluyendo encabezados, filas de la tabla y opciones de selección.
   * Actualiza las propiedades correspondientes con los valores obtenidos.
   */
  obtenerDatosDeAplicacion(): void {
    this.solicitudDatosService
      .obtenerDatosDeSolicitud()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: DatosDeSolicitud) => {
          this.solicitudDatos = respuesta.tablaFilaDatos;
          this.hacerlosRadioOptions = respuesta.hacerlosRadioOptions;
          this.scianDatos = respuesta.tablaFilaDatos[0]?.SCIANLista;
        },
      });
  }

  /**
   * Obtiene la lista de mercancías desde el servicio y actualiza el estado en el Store.
   */
  obtenerMercanciaListo(): void {
    this.solicitudDatosService
      .obtenerMercanciaListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (res: Mercancia[]) => {
          this.solicitud260101Store.setMercanciasDatos(res);
        },
      });
  }

  /**
   * Obtiene el catálogo de regímenes desde el servicio y actualiza la variable `regimenCatalogo`.
   */
  obtenerRegimenDestinaraListo(): void {
    this.solicitudDatosService
      .obtenerRegimenDestinaraListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.regimenCatalogo = respuesta;
        },
      });
  }

  /**
   * Obtiene el catálogo de aduanas desde el servicio y actualiza la variable `aduanaCatalogo`.
   */
  obtenerAduanaListo(): void {
    this.solicitudDatosService
      .obtenerAduanaListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: CatalogosSelect) => {
          this.aduanaCatalogo = respuesta;
        },
      });
  }

  /**
   * Abre el modal para modificar mercancías.
   * Utiliza la referencia del elemento del modal en el DOM.
   */
  openModificarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre el modal para agregar nuevas mercancías.
   * Utiliza la referencia del elemento del modal en el DOM.
   */
  openAgregarMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Actualiza el estado seleccionado en el Store.
   * @param evento - Objeto del catálogo que contiene el estado seleccionado.
   */
  setEstado(evento: Catalogo): void {
    this.solicitud260101Store.setEstado(evento.id);
  }

  /**
   * Actualiza la licencia sanitaria en el Store.
   * @param evento - Evento que contiene el valor de la licencia sanitaria.
   */
  setLicenciaSanitaria(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setLicenciaSanitaria(VALOR);
  }

  /**
   * Actualiza el régimen seleccionado en el Store.
   * @param evento - Objeto del catálogo que contiene el régimen seleccionado.
   */
  setRegimen(evento: Catalogo): void {
    this.solicitud260101Store.setRegimen(evento.id);
  }

  /**
   * Actualiza la aduana seleccionada en el Store.
   * @param evento - Objeto del catálogo que contiene la aduana seleccionada.
   */
  setAduana(evento: Catalogo): void {
    this.solicitud260101Store.setAduana(evento.id);
  }

  /**
   * Actualiza el valor de "hacerlos" en el Store.
   * @param evento - Valor seleccionado para la propiedad "hacerlos".
   */
  setHacerlos(evento: number | string): void {
    this.solicitud260101Store.setHacerlos(evento);
  }

  /**
   * Actualiza el RFC en el Store.
   * @param evento - Evento que contiene el valor del RFC.
   */
  setRFC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setRfc(VALOR);
  }

  /**
   * Obtiene los datos seleccionados de mercancías desde el eventoo.
   * @param evento - Lista de mercancías seleccionadas.
   */
  getMercanciasDatos(evento: Mercancia[]): void {
    this.selectedMercanciasDatos = evento;
  }

  /**
   * Establece los elementos SCIAN seleccionados por el usuario.
   *
   * Este método recibe un arreglo de objetos `SCIAN` seleccionados desde un componente
   * hijo (como una tabla dinámica), y los asigna a la propiedad `selectedscianDatos`
   * para su uso posterior (visualización, validación o envío).
   *
   * @param {SCIAN[]} evento - Arreglo de objetos `SCIAN` seleccionados.
   */
  getscianDatos(evento: SCIAN[]): void {
    this.selectedscianDatos = evento;
  }

  /**
   * Elimina la primera mercancía seleccionada de la lista en el Store.
   */
  eliminarMercancias(): void {
    if (this.selectedMercanciasDatos.length > 0) {
      this.solicitud260101Store.removeMercanciaDatos(
        this.selectedMercanciasDatos[0]
      );
    }
  }

  /**
   * Actualiza el estado del producto como fresco, congelado o vivo en el Store.
   * @param evento - Evento que contiene el estado seleccionado.
   */
  setLiveFreshFrozen(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud260101Store.setLiveFreshFrozen(VALOR);
  }

  /**
   * Actualiza el indicador de aviso de funcionamiento en el Store.
   * @param evento - Evento que contiene el valor del indicador.
   */
  setAvisoDeFuncionamiento(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud260101Store.setAvisoDeFuncionamiento(VALOR);
  }

  /**
   * Actualiza el indicador de manifiesto en el Store.
   * @param evento - Evento que contiene el valor del indicador.
   */
  setManifesto(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).checked;
    this.solicitud260101Store.setManifesto(VALOR);
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   * Libera los recursos y elimina las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
