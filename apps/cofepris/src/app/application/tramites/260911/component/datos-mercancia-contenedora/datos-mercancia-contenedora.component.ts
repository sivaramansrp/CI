import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CROSLISTA_DE_PAISES,
  DATOS_MERCANCIA_CAMPO,
  DATOS_MERCANCIA_CLAVE_TABLA,
  DESCRIPCION_FRACCION_DESHABILITADO_VALOR,
  TIPO_PRODUCTO_ESPECIAL,
  UMT_DESHABILITADO_VALOR,
} from '../../../../shared/constantes/datos-solicitud.enum';
import {
  Catalogo,
  CrossListLable,
  MercanciaForm,
  TablaMercanciaClaveConfig,
  TablaMercanciasDatos,
} from '../../../../shared/models/datos-solicitud.model';
import {
  CatalogoSelectComponent,
  CrosslistComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  REGEX_NUMERO_12_ENTEROS_5_DECIMALES,
  REGEX_SOLO_NUMEROS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { DetalleMercancia } from '../../../../shared/models/detalle-mercancia.model';
import { DetalleMercanciaComponent } from '../../../../shared/components/detalle-mercancia/detalle-mercancia.component';
import { Observable } from 'rxjs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { MercanciasInfo } from '@libs/shared/data-access-user/src/core/models/260211/domicilo.model';

@Component({
  selector: 'app-datos-mercancia-contenedora',
  standalone: true,
    imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    CatalogoSelectComponent,
    CrosslistComponent,
    DetalleMercanciaComponent,
    TablaDinamicaComponent,
    TooltipModule,
    NotificacionesComponent
  ],
  templateUrl: './datos-mercancia-contenedora.component.html',
  styleUrl: './datos-mercancia-contenedora.component.scss',
  providers: [DatosSolicitudService],
})
export class DatosMercanciaContenedoraComponent implements OnInit {
  onAgregarMercancia(): void {
    if (this.mercanciaForm.valid) {
      const MERCANCIA: MercanciasInfo = {
        clasificacion: this.mercanciaForm.get('clasificacionProducto')?.value,
        especificar: this.mercanciaForm.get('especificarClasificacionProducto')?.value,
        denominacionEspecifica: this.mercanciaForm.get('denominacionEspecificaProducto')?.value,
        denominacionDistintiva: this.mercanciaForm.get('denominacionDistintiva')?.value,
        denominacionComun: this.mercanciaForm.get('denominacionComun')?.value,
        formaFarmaceutica: this.mercanciaForm.get('formaFarmaceutica')?.value,
        estadoFisico: this.mercanciaForm.get('estadoFisico')?.value,
        fraccionArancelaria: this.mercanciaForm.get('fraccionArancelaria')?.value,
        descripcionFraccion: this.mercanciaForm.get('descripcionFraccion')?.value,
        unidad: this.mercanciaForm.get('cantidadUmcValor')?.value,
        cantidadUMC: this.mercanciaForm.get('cantidadUmc')?.value,
        unidadUMT: this.mercanciaForm.get('cantidadUmtValor')?.value,
        cantidadUMT: this.mercanciaForm.get('cantidadUmt')?.value,
        presentacion: this.mercanciaForm.get('presentacion')?.value,
        numeroRegistro: this.mercanciaForm.get('numeroRegistroSanitario')?.value,
        paisDeOrigen: this.mercanciaForm.get('paisDeOriginDatos')?.value?.[0],
        paisDeProcedencia: this.mercanciaForm.get('paisDeProcedenciaDatos')?.value?.[0],
        tipoProducto: this.mercanciaForm.get('tipoProducto')?.value,
        usoEspecifico: this.mercanciaForm.get('usoEspecifico')?.value?.[0],
        fechaCaducidad: this.mercanciaForm.get('fechaCaducidad')?.value,
      };
      this.agregarMercancia.emit(MERCANCIA);
    } else {
      this.mercanciaForm.markAllAsTouched();
    }
  }
  /**
   * @property {number} idProcedimiento
   * Identificador único del procedimiento asociado a la solicitud.
   * Este valor es recibido como un input desde el componente padre.
   *
   * @decorador @Input
   */
  @Input() public idProcedimiento!: number;
  /**
   * @property {boolean} detalleMercancia
   * Indica si el componente debe mostrar detalles de mercancía.
   * Se utiliza para determinar la configuración del formulario y la tabla.
   */
  @Input() detalleMercancia = false;

  /**
   * @property {DetalleMercancia} datosDetalleMercancia
   * Datos de detalle de la mercancía recibidos como entrada.
   */
  @Input() datosTablaDetalleMercancia!: Observable<DetalleMercancia[]>;
  /**
   * @property {FormGroup} mercanciaForm
   * Formulario reactivo principal para capturar los datos de la mercancía.
   */
  public mercanciaForm!: FormGroup;

  /**
   * @property {MercanciaForm} mercanciaFormState
   * Input que recibe el estado inicial del formulario de mercancía.
   */
  @Input() public mercanciaFormState!: MercanciaForm;

  /**
   * @property {TablaMercanciasDatos} datoSeleccionado
   * Dato seleccionado de la tabla de mercancías recibido como entrada desde el componente padre.
   */
  @Input() public datoSeleccionado!: TablaMercanciasDatos;

  /**
   * @event mercanciaSeleccionado
   * Evento emitido cuando el usuario selecciona o guarda una mercancía.
   */
  @Output() mercanciaSeleccionado: EventEmitter<TablaMercanciasDatos> =
    new EventEmitter<TablaMercanciasDatos>();

  /**
   * Event emitted when the Agregar button is clicked to add a new item to the parent table.
   */
  @Output() agregarMercancia: EventEmitter<MercanciasInfo> = new EventEmitter<MercanciasInfo>();

  /**
   * Referencias a los componentes de listas cruzadas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * @event eliminarMercanciaDatos
   * @description EventEmitter that emits an array of merchandise items to be deleted.
   * This is used to notify the parent component about the deletion of selected merchandise items.
   */
  @Output() eliminarMercanciaDatos: EventEmitter<DetalleMercancia[]> =
    new EventEmitter<DetalleMercancia[]>(true);

  /**
   * @description
   * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
   * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
   */
  elementoParaEliminar!: number;

  /**
   * @property {Catalogo[]} clasificacionProductoDatos
   * @description Catalog of product classifications used to populate the form.
   */
  public clasificacionProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} especificarClasificacionProductoDatos
   * @description Catalog of specific product classifications used to populate the form.
   */
  public especificarClasificacionProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} tipoProductoDatos
   * @description Catalog of product types used to populate the form.
   */
  public tipoProductoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} formaFarmaceuticaDatos
   * @description Catalog of pharmaceutical forms used to populate the form.
   */
  public formaFarmaceuticaDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} estadoFisicoDatos
   * @description Catalog of physical states used to populate the form.
   */
  public estadoFisicoDatos!: Catalogo[];

  /**
   * @property {Catalogo[]} cantidadUmcDatos
   * @description Catalog of commercial unit quantities used to populate the form.
   */
  public cantidadUmcDatos!: Catalogo[];

  /**
   * @property {boolean} paisDeOriginColapsable
   * Controla la visibilidad del listado de país de origen.
   */
  public paisDeOriginColapsable = false;

  /**
   * @property {boolean} paisDeProcedenciaColapsable
   * Controla la visibilidad del listado de país de procedencia.
   */
  public paisDeProcedenciaColapsable = false;

  /**
   * @property {boolean} usoEspesificoColapsable
   * Controla la visibilidad del listado de uso específico.
   */
  public usoEspesificoColapsable = false;

  /**
   * @property {string[]} elementosRequirdos
   * Lista de elementos requeridos para el formulario.
   */
  public elementosRequirdos: string[] = [];

  /** Etiquetas personalizadas para los crosslists */
  public paisDeOriginLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen:',
    derecha: 'País(es) seleccionado(s)',
  };

  /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @description
   * Arreglo que almacena los pedimentos asociados al establecimiento.
   * Cada pedimento contiene información relevante para el trámite.
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * @property {CrossListLable} paisDeProcedenciaLabel
   * Etiqueta personalizada para el componente de lista cruzada de país de procedencia.
   * Define los títulos mostrados en la parte izquierda y derecha del componente.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia:',
    derecha: 'País(es) seleccionados',
  };

  /**
   * @property {CrossListLable} usoEspesificoLabel
   * Etiqueta personalizada para el componente de lista cruzada de uso específico.
   * Define los títulos para los elementos disponibles y seleccionados.
   */
  public usoEspesificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico:',
    derecha: 'Uso específico',
  };

  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsUno = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].quitar('t'),
    },
  ];

  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsDos = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].quitar('t'),
    },
  ];

  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsTres = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].quitar('t'),
    },
  ];

  /**
   * @property {string[]} seleccionadasPaisDeOriginDatos
   * Lista de países seleccionados como origen.
   */
  public seleccionadasPaisDeOriginDatos: string[] = [];

  /**
   * @property {string[]} seleccionadasPaisDeProcedenciaDatos
   * Lista de países seleccionados como procedencia.
   */
  public seleccionadasPaisDeProcedenciaDatos: string[] = [];

  /**
   * @property {string[]} seleccionadasUsoEspesificoDatos
   * Lista de usos específicos seleccionados.
   */
  public seleccionadasUsoEspesificoDatos: string[] = [];

  /**
   * @property {Catalogo[]} paisDeProcedenciaDatos
   * Datos de países para la lista cruzada de procedencia.
   */
  public paisDeProcedenciaDatos = CROSLISTA_DE_PAISES;

  /**
   * @property {Catalogo[]} usoEspesificoDatos
   * Datos de usos específicos para lista cruzada.
   */
  public usoEspesificoDatos = CROSLISTA_DE_PAISES;

  /**
   * @property {Catalogo[]} seleccionarOrigenDelPais
   * Datos de países para lista cruzada de país de origen.
   */
  public seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;

  /**
   * Indica si se debe mostrar el campo de datos de mercancía en la interfaz.
   * @type {boolean}
   */
  public datosMercanciaCampo = false;

  /**
   * Lista de elementos deshabilitados en el formulario.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que deben estar deshabilitados en el formulario.
   */
  public elementosDeshabilitados: string[] = [];

  /**
   * @property {typeof TIPO_PRODUCTO_ESPECIAL} tipoProductoEspecial - Referencia a la constante que define los tipos especiales de producto.
   *
   * @remarks
   * Esta propiedad se utiliza para acceder y manejar los diferentes tipos de productos especiales dentro del componente.
   *
   * @comando
   * Utilice esta propiedad para mostrar o validar los tipos de productos especiales en la interfaz de usuario.
   */
  tipoProductoEspecial = TIPO_PRODUCTO_ESPECIAL;

  /**
   * @constructor
   * Inicializa el formulario de mercancía y carga catálogos desde archivos JSON.
   *
   * @param fb - FormBuilder para construir formularios reactivos.
   * @param datosSolicitudService - Servicio que carga catálogos desde assets.
   * @param ubicaccion - Servicio para manejar navegación (si es necesario).
   */
  constructor(
    private fb: FormBuilder,
    private datosSolicitudService: DatosSolicitudService,
    private ubicaccion: Location
  ) {
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'clasificacionProductoDatos',
      '/cofepris/mercanciaClasificacionProducto.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'especificarClasificacionProductoDatos',
      '/cofepris/especificarClasificacionProducto.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'tipoProductoDatos',
      '/cofepris/tipoProductoDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'formaFarmaceuticaDatos',
      '/cofepris/formaFarmaceutica.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'estadoFisicoDatos',
      '/cofepris/estadoFisicoDatos.json'
    );
    this.datosSolicitudService.obtenerRespuestaPorUrl(
      this,
      'cantidadUmcDatos',
      '/cofepris/cantidadUmcDatos.json'
    );

    this.datosMercanciaCampo = DATOS_MERCANCIA_CAMPO.includes(
      this.idProcedimiento
    )
      ? true
      : false;
  }

  /**
   * @method ngOnInit
   * @description Hook de ciclo de vida que se ejecuta al inicializar el componente.
   * Llama al método `crearMercanciaForm` para construir el formulario.
   */
  ngOnInit(): void {
    this.validarElementos();
    this.crearMercanciaForm();
    this.crossListRequirdos();
  }

  /**
   * Lista de elementos que no son válidos.
   * Esta propiedad almacena un arreglo de cadenas que representan
   * los elementos que no cumplen con los criterios de validación.
   */
  public elementosNoValidos: string[] = [];
  /**
   * Arreglo que almacena los elementos añadidos.
   *
   * Este arreglo se utiliza para guardar una lista de cadenas que representan
   * los elementos que han sido agregados en el componente.
   */
  public elementosAnadidos: string[] = [];
  /**
   * Configuración para la clave de mercancía.
   *
   * Esta propiedad define la configuración utilizada para la tabla de selección
   * de claves de mercancía. Incluye el tipo de selección, la configuración de la tabla
   * y los datos asociados.
   *
   * Propiedades:
   * - `tipoSeleccionTabla`: Define el tipo de selección en la tabla (por ejemplo, CHECKBOX).
   * - `configuracionTabla`: Configuración específica de la tabla para mostrar las claves de mercancía.
   * - `datos`: Arreglo que contiene los datos de configuración de las claves de mercancía.
   */
  public claveConfig = {
    tipoSeleccionTabla: TablaSeleccion.CHECKBOX,
    configuracionTabla: DATOS_MERCANCIA_CLAVE_TABLA,
    datos: [] as TablaMercanciaClaveConfig[],
  };
  /**
   * @property {TablaMercanciaClaveConfig[]} scianLista
   * Lista de registros Clave seleccionados.
   */
  public claveLista: TablaMercanciaClaveConfig[] = [];

  /**
   * @method crossListRequirdos
   * @description Actualiza las etiquetas de los crosslists según los elementos requeridos.
   * Esta función verifica si los elementos requeridos están presentes y actualiza las etiquetas
   */
  crossListRequirdos(): void {
    this.paisDeOriginLabel.derecha = this.elementosRequirdos.includes(
      'paisDeOrigen'
    )
      ? 'País(es) seleccionado(s)*:'
      : 'País(es) seleccionado(s)*:';
    this.paisDeProcedenciaLabel.derecha = this.elementosRequirdos.includes(
      'paisDeProcedencia'
    )
      ? 'País(es) seleccionado(s)*:'
      : 'País(es) seleccionado(s)*:';
    this.usoEspesificoLabel.derecha = this.elementosRequirdos.includes(
      'usoEspecífico'
    )
      ? 'Uso específico seleccionado*:'
      : 'Uso específico seleccionado*:';
  }

  /**
   * Valida elementos según el `idProcedimiento` y establece
   * las listas de elementos no válidos y añadidos.
   * @returns {void} Lista de elementos no válidos.
   */
  validarElementos(): void {
    this.elementosNoValidos = [];
    this.elementosAnadidos = [];
    switch (this.idProcedimiento) {
      case 260102:
        this.elementosNoValidos = [
          'denominacionDistintiva',
          'denominacionComun',
          'formaFarmaceutica',
          'estadoFisico',
          'presentacion',
          'numeroRegistroSanitario',
          'fechaCaducidad',
        ];
        this.elementosAnadidos = [
          'marca',
          'especifique',
          'claveDeLos',
          'fechaDeFabricacio',
          'fechaDeCaducidad',
        ];
        break;
      case 260208:
      case 260209:
        this.elementosNoValidos = ['numeroRegistroSanitario', 'fechaCaducidad'];
        this.elementosAnadidos = ['especifique'];
        this.elementosDeshabilitados = ['descripcionFraccion', 'cantidadUmt'];
        break;
      case 260207:
        this.elementosAnadidos = ['especifique'];
        this.elementosDeshabilitados = ['descripcionFraccion', 'cantidadUmt'];
        break;
      case 260219:
        this.elementosAnadidos = [
          'especifique',
          'especifiqueForma',
          'especifiqueEstado',
        ];
        this.elementosDeshabilitados = ['descripcionFraccion', 'cantidadUmt'];
        break;
      case 260201:
        this.elementosDeshabilitados = ['descripcionFraccion', 'cantidadUmt'];
        this.elementosRequirdos = [
          'paisDeOrigen',
          'paisDeProcedencia',
          'usoEspecífico',
        ];
        break;
      case 260213:
        this.elementosNoValidos = [
          'formaFarmaceutica',
          'numeroRegistroSanitario',
          'fechaCaducidad',
        ];
        break;
      case 260214:
        this.elementosNoValidos = [
          'formaFarmaceutica',
          'numeroRegistroSanitario',
          'fechaCaducidad',
        ];
        break;
      default:
        if (this.detalleMercancia) {
          this.elementosNoValidos = [
            'denominacionDistintiva',
            'formaFarmaceutica',
          ];
        }
        break;
    }
  }

  /**
   * Restablece los valores de los campos clave en el formulario.
   */
  modificarClave(): void {
    if (!this.claveLista.length) {
      return;
    }
    const CLAVES_A_ELIMINAR = new Set(
      this.claveLista.map((item) => item.clave)
    );
    const CLAVE = this.mercanciaForm.get('claveDeLos')?.value;
    const FABRICACION = this.mercanciaForm.get('fechaDeFabricacio')?.value;
    const CADUCIDAD = this.mercanciaForm.get('fechaDeCaducidad')?.value;
    for (let i = 0; i < this.claveConfig.datos.length; i++) {
      const ITEM = this.claveConfig.datos[i];
      if (CLAVES_A_ELIMINAR.has(ITEM.clave)) {
        this.claveConfig.datos[i] = {
          clave: CLAVE,
          fabricacion: FABRICACION,
          caducidad: CADUCIDAD,
        };
        break;
      }
    }
  }

  /**
   * Actualiza la lista de claves y ajusta los valores del formulario de mercancía
   * según la fila seleccionada en la configuración de claves.
   *
   * @param event - Arreglo de configuraciones de claves de mercancía (`TablaMercanciaClaveConfig[]`).
   *                Contiene las claves que se utilizarán para actualizar la lista.
   *
   * - Si la lista de claves está vacía, la función no realiza ninguna acción.
   * - Busca en los datos de configuración de claves una fila que coincida con las claves proporcionadas.
   * - Si se encuentra una fila coincidente, actualiza los valores del formulario de mercancía
   *   con los datos de la fila seleccionada, incluyendo la clave, la fecha de fabricación
   *   y la fecha de caducidad.
   */
  claveListaFn(event: TablaMercanciaClaveConfig[]): void {
    this.claveLista = event;
    if (!this.claveLista.length) {
      return;
    }
    const CLAVES_A_ELIMINAR = new Set(
      this.claveLista.map((item) => item.clave)
    );
    const FILA_SELECCIONADA = this.claveConfig.datos.find((item) =>
      CLAVES_A_ELIMINAR.has(item.clave)
    );
    if (FILA_SELECCIONADA) {
      this.mercanciaForm.patchValue({
        claveDeLos: FILA_SELECCIONADA.clave,
        fechaDeFabricacio: FILA_SELECCIONADA.fabricacion,
        fechaDeCaducidad: FILA_SELECCIONADA.caducidad,
      });
    }
  }
  /**
   * Agrega una nueva clave a la lista `claveConfig.datos`
   * solo si los valores de los campos no están vacíos.
   */
  agregarClave(): void {
    const CLAVE = this.mercanciaForm.get('claveDeLos')?.value;
    const FABRICACION = this.mercanciaForm.get('fechaDeFabricacio')?.value;
    const CADUCIDAD = this.mercanciaForm.get('fechaDeCaducidad')?.value;
    if (CLAVE && FABRICACION && CADUCIDAD) {
      this.claveConfig.datos.push({
        clave: CLAVE,
        fabricacion: FABRICACION,
        caducidad: CADUCIDAD,
      });
      this.mercanciaForm.patchValue({
        claveDeLos: '',
        fechaDeFabricacio: '',
        fechaDeCaducidad: '',
      });
    }
  }

  /**
   * Elimina las claves seleccionadas en `claveLista` de `claveConfig.datos`.
   * Si la lista de claves a eliminar está vacía, no hace nada.
   */
  eliminarClave(): void {
    if (!this.claveLista.length) {
      return;
    }
    const CLAVES_A_ELIMINAR = new Set(
      this.claveLista.map((item) => item.clave)
    );
    this.claveConfig.datos = this.claveConfig.datos.filter(
      (item) => !CLAVES_A_ELIMINAR.has(item.clave)
    );
  }

  /**
   * Crea y configura el formulario reactivo para la gestión de datos de mercancía.
   *
   * Este método inicializa un formulario con validaciones requeridas para cada campo,
   * utilizando los valores iniciales proporcionados por el estado `mercanciaFormState`.
   *
   * Campos incluidos en el formulario:
   * - `clasificacionProducto`: Clasificación del producto (requerido).
   * - `especificarClasificacionProducto`: Detalle de la clasificación del producto (requerido).
   * - `denominacionEspecificaProducto`: Denominación específica del producto (requerido).
   * - `denominacionDistintiva`: Denominación distintiva del producto (requerido).
   * - `denominacionComun`: Denominación común del producto (requerido).
   * - `tipoProducto`: Tipo de producto (requerido).
   * - `formaFarmaceutica`: Forma farmacéutica del producto (requerido).
   * - `estadoFisico`: Estado físico del producto (requerido).
   * - `fraccionArancelaria`: Fracción arancelaria del producto (requerido).
   * - `descripcionFraccion`: Descripción de la fracción arancelaria (requerido).
   * - `cantidadUmtValor`: Cantidad en unidad de medida de transporte (requerido).
   * - `cantidadUmt`: Unidad de medida de transporte (requerido).
   * - `cantidadUmcValor`: Cantidad en unidad de medida comercial (requerido).
   * - `cantidadUmc`: Unidad de medida comercial (requerido).
   * - `presentacion`: Presentación del producto (requerido).
   * - `numeroRegistroSanitario`: Número de registro sanitario (requerido).
   * - `fechaCaducidad`: Fecha de caducidad del producto (opcional).
   * - `paisDeOriginDatos`: País de origen del producto (requerido).
   * - `paisDeProcedenciaDatos`: País de procedencia del producto (requerido).
   *
   * @returns void
   */
  crearMercanciaForm(): void {
    this.mercanciaForm = this.fb.group({
      clasificacionProducto: [
        this.obtenerValor('clasificacionProducto'),
        Validators.required,
      ],
      especificarClasificacionProducto: [
        this.obtenerValor('especificarClasificacionProducto'),
        Validators.required,
      ],
      denominacionEspecificaProducto: [
        this.obtenerValor('denominacionEspecificaProducto'),
        Validators.required,
      ],
      denominacionDistintiva: [
        this.obtenerValor('denominacionDistintiva'),
        Validators.required,
      ],
      denominacionComun: [
        this.obtenerValor('denominacionComun'),
        Validators.required,
      ],
      tipoProducto: [this.obtenerValor('tipoProducto'), Validators.required],
      formaFarmaceutica: [
        this.obtenerValor('formaFarmaceutica'),
        Validators.required,
      ],
      estadoFisico: [this.obtenerValor('estadoFisico'), Validators.required],
      fraccionArancelaria: [
        this.obtenerValor('fraccionArancelaria'),
        Validators.required,
      ],
      descripcionFraccion: [
        {
          value: this.obtenerValor('descripcionFraccion'),
          disabled: this.elementosDeshabilitados.includes(
            'descripcionFraccion'
          ),
        },
        Validators.required,
      ],
      cantidadUmtValor: [
        this.obtenerValor('cantidadUmtValor'),
        [
          Validators.required,
          Validators.pattern(REGEX_NUMERO_12_ENTEROS_5_DECIMALES),
        ],
      ],
      cantidadUmt: [
        {
          value: this.obtenerValor('cantidadUmt'),
          disabled: this.elementosDeshabilitados.includes('cantidadUmt'),
        },
        Validators.required,
      ],
      cantidadUmcValor: [
        this.obtenerValor('cantidadUmcValor'),
        [
          Validators.required,
          Validators.pattern(REGEX_NUMERO_12_ENTEROS_5_DECIMALES),
        ],
      ],
      cantidadUmc: [this.obtenerValor('cantidadUmc'), Validators.required],
      presentacion: [this.obtenerValor('presentacion'), Validators.required],
      numeroRegistroSanitario: [
        this.obtenerValor('numeroRegistroSanitario'),
        Validators.required,
      ],
      fechaCaducidad: [this.obtenerValor('fechaCaducidad')],
      paisDeOriginDatos: [
        this.obtenerValor('paisDeOriginDatos') || [],
        Validators.required,
      ],
      paisDeProcedenciaDatos: [
        this.obtenerValor('paisDeProcedenciaDatos') || [],
        Validators.required,
      ],
      usoEspecifico: [
        this.obtenerValor('usoEspecifico') || [],
        Validators.required,
      ],
    });

    const CONTROLS_A_ELIMINAR = [...this.elementosNoValidos];
    if (this.detalleMercancia) {
      CONTROLS_A_ELIMINAR.push('formaFarmaceutica', 'denominacionDistintiva');
    }
    if (this.elementosNoValidos.length) {
      for (const NOMBRE_DEL_CONTROL of CONTROLS_A_ELIMINAR) {
        if (this.mercanciaForm.contains(NOMBRE_DEL_CONTROL)) {
          this.mercanciaForm.removeControl(NOMBRE_DEL_CONTROL, {
            emitEvent: false,
          });
        }
      }
    }
    if (this.elementosAnadidos.length) {
      for (const NOMBRE_DEL_CONTROL of this.elementosAnadidos) {
        if (!this.mercanciaForm.contains(NOMBRE_DEL_CONTROL)) {
          this.mercanciaForm.addControl(
            NOMBRE_DEL_CONTROL,
            new FormControl(
              this.obtenerValor(NOMBRE_DEL_CONTROL as keyof MercanciaForm),
              { validators: [Validators.required] }
            )
          );
        }
      }
    }
  }

  /**
   * Obtiene el valor de un campo específico del formulario o de los datos seleccionados.
   * @param {keyof TablaMercanciasDatos | keyof MercanciaForm} field - Nombre del campo a obtener.
   * @returns {string | number | undefined | string[]} - Valor del campo especificado.
   */
  public obtenerValor(
    field: keyof TablaMercanciasDatos | keyof MercanciaForm
  ): string | number | undefined | string[] {
    if (!this.datoSeleccionado && !this.mercanciaFormState) {
      return undefined;
    }
    const DATO = this.datoSeleccionado?.[field as keyof TablaMercanciasDatos];
    if (DATO !== undefined) {
      return DATO;
    }
    const FORM_STATE = this.mercanciaFormState?.[field as keyof MercanciaForm];
    if (FORM_STATE !== undefined) {
      return FORM_STATE;
    }
    return undefined;
  }

  /**
   * Valida si el campo de un formulario no contiene errores
   * @param {AbstractControl} control  : Control del formulario
   * @param {string} campo  : Nombre del campo a validar, si el control es un FormGroup
   * @returns {boolean | null} : Retorna true si el campo contiene errores y ha sido tocado, de lo contrario retorna false
   */
  // eslint-disable-next-line class-methods-use-this
  public isValid(control: AbstractControl, campo?: string): boolean | null {
    if (control instanceof FormGroup && campo) {
      return control.controls[campo].errors && control.controls[campo].touched;
    }
    return control.errors && control.touched;
  }

  /**
   * Método que se ejecuta cuando cambia la selección de países de origen.
   * Actualiza la lista de países seleccionados y sincroniza el formulario de mercancía
   * con los datos seleccionados.
   *
   * @param events - Arreglo de cadenas que representa los países seleccionados.
   */
  paisDeOriginSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeOriginDatos = events;
    this.mercanciaForm.patchValue({
      paisDeOriginDatos: events,
    });
  }

  /**
   * Maneja el evento de cambio para las selecciones de país de procedencia.
   *
   * @param events - Un arreglo de cadenas que representa los países seleccionados.
   *
   * Actualiza la propiedad `seleccionadasPaisDeProcedenciaDatos` con los valores seleccionados
   * y sincroniza el formulario `mercanciaForm` con los datos actualizados.
   */
  paisDeProcedenciaSeleccionadasChange(events: string[]): void {
    this.seleccionadasPaisDeProcedenciaDatos = events;
    this.mercanciaForm.patchValue({
      paisDeProcedenciaDatos: events,
    });
  }

  /**
   * Maneja el evento de cambio para las selecciones de uso específico.
   *
   * @param events - Un arreglo de cadenas que representa las selecciones actuales de uso específico.
   *
   * Este método actualiza la propiedad `seleccionadasUsoEspesificoDatos` con las selecciones proporcionadas
   * y actualiza el formulario `mercanciaForm` para reflejar los valores seleccionados en el campo `usoEspecifico`.
   */
  usoEspesificoSeleccionadasChange(events: string[]): void {
    this.seleccionadasUsoEspesificoDatos = events;
    this.mercanciaForm.get('usoEspecifico')?.setValue(events);
  }

  /**
   * Alterna el estado colapsable de una sección específica basada en el orden proporcionado.
   *
   * @param orden - Número que indica la sección a modificar:
   *   - 1: Alterna el estado de `paisDeOriginColapsable`.
   *   - 2: Alterna el estado de `paisDeProcedenciaColapsable`.
   *   - 3: Alterna el estado de `usoEspesificoColapsable`.
   */
  mostrarColapsable(orden: number): void {
    if (orden === 1) {
      this.paisDeOriginColapsable = !this.paisDeOriginColapsable;
    } else if (orden === 2) {
      this.paisDeProcedenciaColapsable = !this.paisDeProcedenciaColapsable;
    } else if (orden === 3) {
      this.usoEspesificoColapsable = !this.usoEspesificoColapsable;
    }
  }

  /**
   * Agrega una nueva mercancía utilizando los datos del formulario actual
   * y emite un evento con la información de la mercancía seleccionada.
   * Luego, navega de regreso a la ubicación anterior.
   *
   * @returns {void} Este método no devuelve ningún valor.
   */

  /**
   * Restablece el formulario de mercancía a su estado inicial.
   * Este método se utiliza para limpiar todos los campos del formulario,
   * eliminando cualquier dato ingresado previamente.
   */
  limpiarMercancia(): void {
    this.seleccionadasUsoEspesificoDatos = [];
    this.usoEspesificoDatos = CROSLISTA_DE_PAISES;
    this.seleccionadasPaisDeOriginDatos = [];
    this.paisDeProcedenciaDatos = CROSLISTA_DE_PAISES;
    this.seleccionadasPaisDeProcedenciaDatos = [];
    this.seleccionarOrigenDelPais = CROSLISTA_DE_PAISES;
    this.mercanciaForm.reset();
  }

  cancelar(): void {
    // Example usage of 'this' to satisfy the rule
    this.nuevaNotificacion = {
      tipoNotificacion: 'info',
      categoria: 'info',
      modo: 'action',
      titulo: '',
      mensaje: 'Cancelado',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

  cambiarFraccionArancelaria(): void {
    if (
      this.mercanciaForm.get('fraccionArancelaria') &&
      this.mercanciaForm.get('cantidadUmt')?.disabled
    ) {
      this.mercanciaForm
        .get('descripcionFraccion')
        ?.setValue(DESCRIPCION_FRACCION_DESHABILITADO_VALOR);
      this.mercanciaForm.get('cantidadUmt')?.setValue(UMT_DESHABILITADO_VALOR);
    } else if (this.mercanciaForm.get('fraccionArancelaria')?.value) {
      if (
        REGEX_SOLO_NUMEROS.test(
          this.mercanciaForm.get('fraccionArancelaria')?.value
        )
      ) {
        this.mercanciaForm
          .get('descripcionFraccion')
          ?.setValue(DESCRIPCION_FRACCION_DESHABILITADO_VALOR);
        this.mercanciaForm
          .get('cantidadUmt')
          ?.setValue(UMT_DESHABILITADO_VALOR);
      } else {
        this.abrirModal();
      }
    }
  }

  eliminarPedimento(borrar: boolean): void {
    if (borrar) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }

  abrirModal(i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje:
        'La fracción ingresada no se encuentra en el acuerdo de fracciones reguladas, favor de verificar.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
    this.elementoParaEliminar = i;
  }
}

