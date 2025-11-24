import { CommonModule } from '@angular/common';

import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef, ViewChildren } from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { ConsultaioState, REGEX_VALID_UMC, SOLO_REGEX_NUMEROS } from '@ng-mf/data-access-user';

import {
  Catalogo,
  CatalogoSelectComponent,
  CrossListLable,
  CrosslistComponent,
  InputRadioComponent,
  MercanciasDatos,
  Notificacion,
  NotificacionesComponent,
  REGEX_CURP,
  REGEX_PATRON_ALFANUMERICO,
  REGEX_POSTAL,
  REGEX_RFC,
  REGEX_SOLO_NUMEROS,
  REGEX_TELEFONO,
  ScianDatos,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
} from '@libs/shared/data-access-user/src';
import {EstadoCatalogResponse, NicoInfo, ProductoTerminado} from '@libs/shared/data-access-user/src/core/models/shared2603/certificados-licencias-permisos.model';

import CROSLISTA_DE_PAISES from '@libs/shared/theme/assets/json/2603/croslista_de_paises.json';
import PAISES_DE_ORIGEN from '@libs/shared/theme/assets/json/2603/paises_de_origen.json';
import USO_ESPECIFICO from '@libs/shared/theme/assets/json/2603/uso_especifico.json';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { Subject, map, takeUntil } from 'rxjs';

import { TEXTO_MANIFESTO_Y_DECLARACIONES } from '../../../constantes/shared2603/datos-solicitud.enum';
import { Tramite2603Query } from '../../../estados/queries/2603/tramite2603.query';

import { Solicitud2603State, Tramite2603Store } from '../../../estados/stores/2603/tramite2603.store';


import { CONFIGURACION_MERCANCIAS_DATOS, CONFIGURACION_TABLA_PRODUCTO_TERMINADO, CONFIGURACION_TABLA_SCIAN, RADIO_OPCIONES } from '../../../constantes/shared2603/certificados-licencias-permisos.enum';
import { CertificadosLicenciasPermisosService } from '../../../services/shared2603/certificados-licencias-permisos.service';
/**
 * DatosDeLaSolicitudComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */

interface TipoDeProducto {
  id: number;
  descripcion: string;
}
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CrosslistComponent,
    TooltipModule,
    InputRadioComponent,
    NotificacionesComponent
  ],
  providers: [BsModalService],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  /**
   * Notificador para destruir los observables al finalizar.
   */
  private destroy$ = new Subject<void>();
  /**
   * Controla la visibilidad del modal de notificación de confirmación.
   */
  public mostrarNotificacion: boolean = false;
    get descripcionFormControl(): FormControl {
    return this.scianForm.get('descripcion') as FormControl;
  }
  
  /**
   * Flag to prevent infinite loops during form updates
   */
  private isUpdatingForm = false;
  
  /**
   * Catálogo filtrado para la descripción SCIAN, dependiente de la clave seleccionada
   */
  public descripcionScianCatalogo: Catalogo[] = [];
  
  /**
   * Actualiza el catálogo de descripción SCIAN basado en la clave seleccionada
   */
  private updateDescripcionScianCatalogo(): void {
    // Valor seleccionado en el catálogo de clave SCIAN
    const CLAVE_SELECCIONADA = this.scianForm?.get('claveScian')?.value;

    let FILTRADO: Catalogo[] = [];

    // Determinar si no hay selección válida
    const SIN_SELECCION = CLAVE_SELECCIONADA === undefined || 
                          CLAVE_SELECCIONADA === null || 
                          CLAVE_SELECCIONADA === '';

    // Determinar si la selección corresponde a "000000" (por bug del catalogo-select)
    const ES_SELECCION_CERO = CLAVE_SELECCIONADA === 'undefined' || 
                                CLAVE_SELECCIONADA === '0' || 
                                CLAVE_SELECCIONADA === 0;

    if (SIN_SELECCION) {
      // Si no hay selección válida, dejar el dropdown en blanco
      FILTRADO = [];
    } else if (ES_SELECCION_CERO) {
      // Si se selecciona "000000", mostrar "NO APLICA" (primer elemento del catálogo de estado)
      if (this.estadoCatalogo && this.estadoCatalogo[0]) {
        FILTRADO = [this.estadoCatalogo[0]];
      }
    } else if (this.estadoCatalogo && this.claveCatalogo) {
      // Buscar el índice en el catálogo de clave que coincida con el valor seleccionado
      const INDICE = this.claveCatalogo.findIndex(item => Number(item.id) === Number(CLAVE_SELECCIONADA));
      if (INDICE !== -1) {
        // Usar el mismo índice para obtener la entrada correspondiente en estado
        const ESTADO_CORRESPONDIENTE = this.estadoCatalogo[INDICE];
        if (ESTADO_CORRESPONDIENTE) {
          FILTRADO = [ESTADO_CORRESPONDIENTE];
        }
      }
    }

    // Actualizar la propiedad de descripción filtrada
    this.descripcionScianCatalogo = FILTRADO;

    // IMPORTANTE: Deshabilitar temporalmente valueChanges para evitar bucles infinitos
    this.isUpdatingForm = true;

    // Establecer el valor del formulario solo si hay exactamente una opción
    if (FILTRADO.length === 1) {
      this.scianForm?.get('descripcion')?.setValue(FILTRADO[0].id, { emitEvent: false });
    } else {
      this.scianForm?.get('descripcion')?.setValue(null, { emitEvent: false });
    }

    // Rehabilitar valueChanges después de un breve retraso
    setTimeout(() => {
      this.isUpdatingForm = false;
    }, 50);
  }
  
  /**
   * Maneja el cambio en el dropdown de claveScian
   * @param event Evento de cambio
   */
  public onClaveScianChange(_event: unknown): void {
    setTimeout(() => {
      this.updateDescripcionScianCatalogo();
    }, 100);
  }
  
  /**
   * Devuelve el catálogo filtrado para el template
   */
  get descripcionScianCatalogoFiltrado(): Catalogo[] {
    const CLAVE_SELECCIONADA = this.scianForm?.get('claveScian')?.value;
    if (!CLAVE_SELECCIONADA && CLAVE_SELECCIONADA !== 0) {
      return [];
    }
    if (this.estadoCatalogo && this.claveCatalogo) {
      const IDX = this.claveCatalogo.findIndex(item => {
        const DESCRIPCION_MATCH = String(item.descripcion) === String(CLAVE_SELECCIONADA);
        const ID_MATCH = Number(item.id) === Number(CLAVE_SELECCIONADA);
        return DESCRIPCION_MATCH || ID_MATCH;
      });
      if (IDX !== -1) {
        const ESTADO_CORRESPONDIENTE = this.estadoCatalogo[IDX];
        if (ESTADO_CORRESPONDIENTE) {
          return [ESTADO_CORRESPONDIENTE];
        }
      }
    }
    return [];
  }
  /**
   * Indica si el usuario ha aceptado el modal de establecimiento.
   */
  public establecimientoSeleccionado: boolean = false;
  /**
   * Habilita los campos que deben ser editables tras aceptar en el modal de establecimiento.
   */
  public habilitarCamposEstablecimiento(): void {
  this.establecimientoSeleccionado = true;
    const CAMPOS_A_HABILITAR = [
      'denominacionRazon',
      'codigoPostal',
      'municipio',
      'localidad',
      'colonia',
      'calleYNumero',
      'correoElecronico',
      'rfc',
      'lada',
      'telefono',
      'nombreORazon',
      'apellidoPaterno',
      'apellidoMaterno'
    ];
    CAMPOS_A_HABILITAR.forEach(field => {
      const CONTROL = this.domicilioDeElstablecimientoForm.get(field);
      if (CONTROL) {
        CONTROL.enable();
        CONTROL.updateValueAndValidity();
      }
      const DENOMINACION_CONTROL = this.denominacionForm.get(field);
      if (DENOMINACION_CONTROL) {
        DENOMINACION_CONTROL.enable();
        DENOMINACION_CONTROL.updateValueAndValidity();
      }
    });
  }

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  public esFormularioSoloLectura: boolean = false;

  /**
    * Datos cargados para la tabla NICO.
    */
  nicoTablaDatos: NicoInfo[] = [];

  /**
    * @property {string} textoManifestoContenido
    * Texto que se muestra en el manifiesto y declaraciones.
    */
  public textoManifestoContenido = TEXTO_MANIFESTO_Y_DECLARACIONES;

  /**
* @property consultaState
* @description
* Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
*/
  /**
   * Indica si el formulario debe estar en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   * Valor por defecto: `false`.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * Identificador del procedimiento actual.
   * Este valor se utiliza para mostrar o configurar secciones específicas del formulario según el trámite.
   */
  @Input() idProcedimiento!: number;

  /**
   * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
   */
  @Input() consultaState!: ConsultaioState;

/**
 * Evento de salida que emite el valor seleccionado del catálogo de tipo de producto.
 * 
 * @event selectionChange
 * @type {EventEmitter<TipoDeProducto>}
 * @description 
 * Se emite cada vez que el usuario selecciona un valor en el componente 
 * de selección de tipo de producto (`app-catalogo-select`).
 */  
  @Output() selectionChange = new EventEmitter<TipoDeProducto>();
  /**
   * Una referencia a la instancia del modal de Bootstrap.
   * Esto se utiliza para controlar e interactuar con el cuadro de diálogo modal.
   * @type {BsModalRef | undefined}
   */
  modalRef?: BsModalRef;
  /**
   * Indica si el modal está cerrado.
   * 
   * @type {boolean}
   * @default false
   */
  public esModalCerrado: boolean = false;
  /**
   * Una instancia de FormGroup utilizada para gestionar los controles del formulario
   * y la lógica de validación para la sección "Denominación" de la aplicación.
   */
  public denominacionForm!: FormGroup;
  /**
   * Representa el catálogo de estados utilizados en la aplicación.
   * Esta propiedad es un arreglo de objetos `Catalogo`, que probablemente
   * contienen información sobre diferentes estados u opciones disponibles
   * para la selección.
   */
  public estadoCatalogo!: Catalogo[];
  /**
   * Un arreglo de objetos `ScianDatos` que representa los datos para la tabla SCIAN.
   * Esta propiedad se utiliza para almacenar y gestionar la información relacionada con la clasificación SCIAN.
   */
  public scianTablaDatos: ScianDatos[] = [];


    /**
     * Almacena los datos de la tabla de Producto Terminado.
     * Cada elemento representa un producto terminado agregado por el usuario.
     * Se utiliza para mostrar y gestionar los registros en la tabla correspondiente.
     * @type {ProductoTerminado[]}
     */
    public productoTerminadoTablaDatos: ProductoTerminado[] = [];

    /**
     * Almacena las filas seleccionadas actualmente en la tabla de Producto Terminado.
     * Se actualiza cada vez que el usuario selecciona o deselecciona productos en la tabla.
     * @type {ProductoTerminado[]}
     */
    selectedRowsProductoTerminado: ProductoTerminado[] = [];

    /**
     * Maneja el evento de cambio de selección en la tabla de Producto Terminado.
     * Actualiza la propiedad `selectedRowsProductoTerminado` con las filas seleccionadas.
     * @param {ProductoTerminado[]} selected - Las filas seleccionadas en la tabla.
     */
    onSeleccionChangeProductoTerminado(selected: ProductoTerminado[]): void {
      this.selectedRowsProductoTerminado = selected;
    }

/**
 * Maneja el evento de agregado o selección de registros en la tabla de producto terminado.
 * 
 * @param {ProductoTerminado[]} datos - Lista actualizada de registros seleccionados o agregados en la tabla.
 * @returns {void}
 * @description
 * Actualiza el control del formulario asociado (`productoTerminadoTablaDatos`),
 * marcándolo como tocado y validando su estado para reflejar cambios en la interfaz.
 */

  onProductoTerminadoRecordAdded(datos: ProductoTerminado[]): void {
    const CLAVE_PRODUCTO = Array.isArray(datos) && datos.length > 0 ? (datos[0] as { clave?: string })['clave'] : null;
    if (CLAVE_PRODUCTO && this.productoTerminadoForm.get('nombre')) {
      this.productoTerminadoForm.get('nombre')?.setValue(CLAVE_PRODUCTO);
    }
    this.productoTerminadoForm.get('productoTerminadoTablaDatos')?.setValue(datos);
    this.productoTerminadoForm.get('productoTerminadoTablaDatos')?.markAsTouched();
    this.productoTerminadoForm.get('productoTerminadoTablaDatos')?.updateValueAndValidity();
  }
  
    public productoTerminadoForm!: FormGroup;
  /**
   * Representa el tipo de selección de checkbox utilizado en the componente.
   * Esto se asigna desde la enumeración `TablaSeleccion.CHECKBOX`.
   */
  public checkbox = TablaSeleccion.CHECKBOX;
  /**
   * Representa una lista de entradas de catálogo del tipo `Catalogo`.
   * Esta propiedad se utiliza para almacenar y gestionar datos de catálogo
   * relevantes para la aplicación.
   */
  public claveCatalogo!: Catalogo[];
  /**
   * Representa el catálogo de regímenes disponibles para la selección.
   * Se espera que esta propiedad sea un arreglo de objetos `Catalogo`,
   * que contienen los detalles de cada régimen.
   */
  public regimenCatalogo!: Catalogo[];
  /**
   * Un arreglo que contiene datos relacionados con "mercancías".
   * Cada elemento en el arreglo es de tipo `MercanciasDatos`.
   * Esta propiedad se utiliza para gestionar y mostrar información sobre las mercancías
   * en el contexto de la aplicación.
   */
  public mercanciasTablaDatos: MercanciasDatos[] = [];
  /**
   * Representa el catálogo de tipos de productos disponibles para la selección.
   * Se espera que esta propiedad sea un arreglo de objetos `Catalogo`,
   * donde cada objeto contiene detalles sobre un tipo de producto específico.
   */
  public tipoDeProductoCatalogo!: Catalogo[];
  /**
   * Representa el catálogo de países de origen.
   * Esta propiedad contiene un arreglo de objetos `Catalogo`, que proporcionan
   * información sobre los países de los cuales provienen los elementos o entidades.
   */
  public paisDeProcedenciaCatalogo!: Catalogo[];
  /**
   * Un grupo de formularios que representa los detalles de la dirección del establecimiento.
   * Este formulario se utiliza para capturar y validar la información necesaria
   * relacionada con el domicilio del establecimiento.
   */
  public domicilioDeElstablecimientoForm!: FormGroup;
  /**
   * Una instancia de FormGroup que representa el formulario para el representante legal.
   * Este formulario se utiliza para capturar y gestionar los datos relacionados con el representante legal
   * en el proceso de la aplicación.
   */
  public representanteLegalForm!: FormGroup;
  /**
   * Representa el grupo de formulario reactivo para los datos del SCIAN (Sistema de Clasificación Industrial de América del Norte).
   * Este grupo de formulario se utiliza para gestionar y validar la entrada del usuario relacionada con la información del SCIAN en la aplicación.
   */
  public scianForm!: FormGroup;
  /**
   * Un grupo de formulario reactivo que gestiona los datos y la lógica de validación
   * para la sección de "mercancías" de la aplicación.
   */
  public mercanciasForm!: FormGroup;
  /**
   * Representa el estado de la Solicitud 2603.
   * Esta propiedad contiene los datos y la gestión del estado para la solicitud actual.
   * Se espera que se inicialice con una instancia de `Solicitud2603State`.
   */
  public solicitudState!: Solicitud2603State;
  /**
 * Lista de componentes Crosslist disponibles en la vista.
 */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
 * Lista de países para la selección de origen.
 */
  public crosListaDePaises = DatosDeLaSolicitudComponent.deepCopy(CROSLISTA_DE_PAISES);
  /**
   * Una propiedad pública que contiene la lista de países de origen.
   * Se inicializa con la constante `PAISES_DE_ORIGEN`.
   */
  public seleccionarPais = DatosDeLaSolicitudComponent.deepCopy(PAISES_DE_ORIGEN);
  /**
   * Una propiedad pública que contiene las opciones de uso específico para la aplicación.
   * Se inicializa con la constante `USO_ESPECIFICO`.
   */
  public seleccionarUsoEspecifico = DatosDeLaSolicitudComponent.deepCopy(USO_ESPECIFICO);

  /**
   * Lista de países para seleccionar el origen de la primera sección.
   */
  seleccionarOrigenDelPais = this.crosListaDePaises;


  /**
   * Configuración de la tabla de sectores para mercancías.
   * Define las columnas, formato y opciones de la tabla de mercancías en el formulario.
   * @type {any}
   */
  public configuracionMercancias = CONFIGURACION_MERCANCIAS_DATOS;

  /**
   * Configuración de la tabla SCIAN.
   * Especifica la estructura y opciones de la tabla para datos SCIAN.
   * @type {any}
   */
  public configuracionTablaScian = CONFIGURACION_TABLA_SCIAN;

  /**
   * Configuración de la tabla de Producto Terminado.
   * Define las columnas y opciones para la tabla de productos terminados.
   * @type {any}
   */
  public configuracionTablaProductoTerminado = CONFIGURACION_TABLA_PRODUCTO_TERMINADO;

  /**
   * Etiqueta para el crosslist de Forma farmacéutica.
   */
    public paisDeProcedenciaLabel: CrossListLable = {
      tituluDeLaIzquierda: 'Forma farmacéutica',
      derecha: 'País(es) seleccionados',
    };

  /**
   * Representa las etiquetas utilizadas para mostrar información sobre el país de origen.
   * 
   * @property tituluDeLaIzquierda - La etiqueta que se muestra en el lado izquierdo, indicando el país de origen.
   * @property derecha - La etiqueta que se muestra en el lado derecho, mostrando el país o países seleccionados.
   */
  public paisDeOrigenLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de origen',
    derecha: 'País(es) seleccionado(s)*:',
  };

  /**
   * Representa las etiquetas utilizadas para la sección "Uso específico" en la interfaz de usuario.
   * 
   * @property {string} tituluDeLaIzquierda - La etiqueta que se muestra en el lado izquierdo, indicando el uso específico.
   * @property {string} derecha - La etiqueta que se muestra en el lado derecho, mostrando los usos seleccionados con un asterisco para denotar un campo obligatorio.
   */
  public usoEspecificoLabel: CrossListLable = {
    tituluDeLaIzquierda: 'Uso específico',
    derecha: 'Uso(s) seleccionado(s)*:',
  }

  /**
* Botones de acción para gestionar listas de países en la primera sección.
*/
  public paisDeProcedenciaBotons = this.getCrossListBtn();
  /**
   * Una propiedad que inicializa una lista de botones para la sección "País de Origen"
   * invocando el método `getCrossListBtn`. Esto probablemente se utiliza para gestionar o
   * mostrar elementos interactivos relacionados con el país de origen en la aplicación.
   */
  public paisDeOrigenBotons = this.getCrossListBtn();
  /**
   * Una propiedad que inicializa y almacena el resultado del método `getCrossListBtn`.
   * Esto probablemente se utiliza para gestionar o configurar botones específicos relacionados 
   * con la funcionalidad de "uso específico" dentro del componente.
   */
  public usoEspecificoBotons = this.getCrossListBtn();
  /**
   * Un objeto que representa el estado colapsable de varias secciones en el componente.
   * Cada propiedad corresponde a una sección específica e indica si está colapsada.
   * 
   * Propiedades:
   * - `formaFarmaceuticaColapsable`: Indica si la sección "Forma Farmacéutica" está colapsada.
   * - `paisDeOrigenColapsable`: Indica si la sección "País de Origen" está colapsada.
   * - `usoEspecificoColapsable`: Indica si la sección "Uso Específico" está colapsada.
   */
  public colapsableObj = {
    formaFarmaceuticaColapsable: false,
    paisDeOrigenColapsable: false,
    usoEspecificoColapsable: false,
  };

  /**
   * Notificador para destruir los observables al finalizar.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /** Modelo para la opción de tipo sí/no representado como radio button */
  public sinoOpciones = RADIO_OPCIONES;

  /**
   * Bandera que indica si se debe mostrar el campo "Especifique".
   * 
   * @type {boolean}
   * @default false
   * @description 
   * Se activa únicamente cuando el usuario selecciona un tipo de producto 
   * con identificador igual a `2`. En caso contrario, el campo se oculta.
   */
  mostrarEspecifique = false;

  /**
   * Constructor para el componente DatosDeLaSolicitudComponent.
   */
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
    public tramite2603Store: Tramite2603Store,
    public tramite2603Query: Tramite2603Query,
    private validacionesService: ValidacionesFormularioService
  ) {
    this.esFormularioSoloLectura = this.consultaState?.readonly || false;
  }

  /**
   * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de un componente.
   * 
   * Este método realiza las siguientes acciones:
   * - Se suscribe al observable `selectSolicitud$` de `tramite2603Query` para actualizar la propiedad `solicitudState`
   *   con el estado más reciente de la sección, asegurando que la suscripción se limpie adecuadamente utilizando `takeUntil` con `destroyNotifier$`.
   * - Inicializa los datos de las tablas y catálogos llamando a `inicializarTablaYCatalogoDatos`.
   * - Crea formularios para "Establecimiento", "Representante Legal", "SCIAN" y "Mercancías" invocando sus respectivos métodos:
   *   `crearElstablecimientoForm`, `crearRepresentanteLegalForm`, `cerrarSCIANForm` y `cerrarMercanciasForm`.
   */
  ngOnInit(): void {
    // Cargar claveCatalogo desde servicio con takeUntil
    this.certificadosLicenciasSvc.getClaveDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.claveCatalogo = Array.isArray(res.data) ? res.data : [];
        },
        error: () => {
          this.claveCatalogo = [];
        }
      });
    // Cargar estadoCatalogo desde servicio with takeUntil
    this.certificadosLicenciasSvc.getEstadoDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.estadoCatalogo = Array.isArray(res.data) ? res.data : [];
        },
        error: () => {
          this.estadoCatalogo = [];
        }
      });

    this.scianTablaDatos = [];
    this.esFormularioSoloLectura = this.consultaState?.readonly || false;

    this.inicializarFormulario();
    this.inicializarTablaYCatalogoDatos();
    this.crearElstablecimientoForm();
    this.crearRepresentanteLegalForm();
    this.cerrarSCIANForm();
    this.cerrarMercanciasForm();
    this.deshabilitarFormularios();
    this.crearProductoTerminadoForm();
  }

  /**
 * Maneja el evento de cambio del campo "Tipo de producto".
 * 
 * @param {Event} event - Evento de cambio del elemento `<select>`.
 * @returns {void}
 * @description 
 * Obtiene el valor seleccionado desde el elemento HTML `<select>` y determina 
 * si el campo "Especifique" debe mostrarse. Si el valor seleccionado no es `2`, 
 * el campo asociado en el formulario (`especifique`) se reinicia.
 */
  onTipoDeProductoChange(event: Event): void {
    const SELECT_ELEMENT = event.target as HTMLSelectElement;
    const ID_SELECCIONDADO = Number(SELECT_ELEMENT.value);

    this.mostrarEspecifique = ID_SELECCIONDADO === 2;

    if (!this.mostrarEspecifique) {
      this.mercanciasForm.get('especifique')?.reset();
    }
  }
  /**
   * Inicializa el formulario para Producto Terminado
   */
  crearProductoTerminadoForm(): void {
    this.productoTerminadoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  /**
   * Limpia completamente el formulario de mercancías, reseteando todos los campos a valores vacíos.
   */
  limpiarMercanciasForm(): void {
    const PAIS_VALUE = this.mercanciasForm.get('pais')?.value || '134';
    
    this.mercanciasForm.reset();
    this.mercanciasForm.patchValue({
      clave: '',
      especificarClasificacion: '',
      dci: '',
      marcaComercialODenominacionDistintiva: '',
      tipoDeProducto: '',
      especifique: '',
      fraccionArancelaria: '',
      descripcionDeLaFraccion: '',
      cantidadUmt: '',
      umt: '',
      umc: '',
      numeroCas: '',
      cantidadDeLotes: '',
      kgOrPorLote: '',
      pais: PAIS_VALUE,
      paisDeProcedencia: '',
      detallarUso: '',
      cantidadUmc: '',
      numeroDePiezas: '',
      descripcionDelNumeroDePiezas: '',
      numeroDeRegistro: '',
      presentacion: '',
      productoTerminadoTablaDatos: []
    });
    this.productoTerminadoTablaDatos = [];
    this.mostrarErrorProductoTerminado = false;
    // Restablecer secciones plegables
    this.colapsableObj = {
      formaFarmaceuticaColapsable: false,
      paisDeOrigenColapsable: false,
      usoEspecificoColapsable: false
    };
    this.mostrarEspecifique = false;
  }

  /**
   * Limpia el formulario Producto Terminado y también reinicia todos los campos de mercanciasForm.
   */
  limpiarFormularioProductoTerminado(): void {
    this.productoTerminadoForm.reset();
    this.productoTerminadoForm.get('productoTerminadoTablaDatos')?.reset([]);
    this.productoTerminadoTablaDatos = [];
    this.mostrarErrorProductoTerminado = false;
    this.limpiarMercanciasForm();
  }

  mostrarErrorProductoTerminado = false;

/**
 * Agrega una nueva fila Producto Terminado a la tabla.
 * Si el formulario es inválido, se mostrará el mensaje de error (span rojo).
 */
  productoTerminadoAgregar(): void {
    this.mostrarErrorProductoTerminado = true;
    this.productoTerminadoForm.markAllAsTouched();
    if (this.productoTerminadoForm.valid) {
      const NUEVO_PRODUCTO = this.productoTerminadoForm.value;
      this.productoTerminadoTablaDatos = [
        ...this.productoTerminadoTablaDatos,
        NUEVO_PRODUCTO,
      ];
      this.mostrarErrorProductoTerminado = false;
      this.limpiarFormularioProductoTerminado();
    }
  }

  /**
   * Cierra el modal y limpia el formulario Producto Terminado
   */
  cerrarModalProductoTerminado(): void {
    this.modalRef?.hide();
    this.limpiarFormularioProductoTerminado();
  }

  /**
   * Inicializa el formulario suscribiéndose al observable selectSolicitud$ del store.
   * Actualiza la propiedad solicitudState con el estado más reciente de la sección.
   * 
   * Este método se asegura de que la información del formulario esté sincronizada con el estado global.
   */
  inicializarFormulario(): void {
    this.tramite2603Query
      .selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          // Actualiza el estado local de la solicitud con los datos recibidos del store
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa la tabla de datos y los catálogos asociados invocando una serie de métodos.
   * Este método es responsable de configurar los datos y configuraciones necesarios
   * para que la aplicación funcione correctamente.
   *
   * Se realizan las siguientes acciones:
   * - Recupera los datos del formulario de denominación.
   * - Obtiene los datos del catálogo de estados.
   * - Carga los datos de la tabla SCIAN.
   * - Recupera los datos del catálogo de claves.
   * - Obtiene los datos del catálogo de regímenes.
   * - Carga los datos de la tabla de mercancías.
   * - Recupera los datos del catálogo de tipos de productos.
   * - Obtiene los datos del catálogo de países de origen.
   */
  public inicializarTablaYCatalogoDatos(): void {
    this.getDenominacionForm();
    this.getEstadoCatalogDatos();
    this.getClaveCatalogDatos();
    this.getRegimenCatalogDatos();
    this.getTipoDeProductoCatalogDatos();
    this.getPaisDeProcedenciaCatalogoDatos();
  }

  /**
   * Crea una copia profunda del objeto proporcionado.
   * 
   * Este método serializa el objeto a una cadena JSON y luego lo analiza de nuevo a un nuevo objeto,
   * creando efectivamente una copia profunda. Tenga en cuenta que este enfoque puede no manejar funciones,
   * valores indefinidos o referencias circulares correctamente.
   * 
   * @param obj - El objeto que se va a copiar profundamente. Por defecto es un objeto vacío.
   * @returns Una copia profunda del objeto proporcionado.
   */

  /**
   * Realiza una copia profunda de un objeto dado utilizando serialización y deserialización JSON.
   * 
   * @template T El tipo del objeto a copiar.
   * @param obj El objeto que se desea copiar profundamente.
   * @returns Una nueva instancia del objeto, completamente independiente del original.
   * @remarks
   * - Si el objeto es `undefined` o `null`, se retorna tal cual.
   * - Esta función no copia correctamente objetos que contienen funciones, fechas, mapas, conjuntos, o propiedades no serializables por JSON.
   */
  public static deepCopy<T>(obj: T): T {
    if (obj === undefined || obj === null) {
      return obj;
    }
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Valida el campo "numeroDePiezas" asegurando que solo contenga números y cumpla con el patrón alfanumérico.
   *
   * @param control - Control de formulario a validar.
   * @returns {ValidationErrors | null} Un objeto con los errores de validación si existen, o null si es válido.
   */
  private static validateNumeroDePiezas(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }

    const VALIDACION_ERRORES: ValidationErrors = {};
    if (!SOLO_REGEX_NUMEROS.test(VALUE)) {
      VALIDACION_ERRORES['soloNumeros'] = true;
    }
    
    if (!REGEX_PATRON_ALFANUMERICO.test(VALUE)) {
      VALIDACION_ERRORES['formatoInvalido'] = true;
    }
    
    return Object.keys(VALIDACION_ERRORES).length > 0 ? VALIDACION_ERRORES : null;
  }


  /**
   * Inicializa y crea un grupo de formularios reactivo para "domicilioDeElstablecimientoForm".
   * Este formulario se utiliza para capturar y validar los detalles de la dirección de un establecimiento y la información relacionada.
   * 
   * El formulario incluye los siguientes controles:
   * - `avisoCheckbox`: Indica si se ha marcado el aviso de funcionamiento (opcional).
   * - `licenciaSanitaria`: Licencia sanitaria del establecimiento (opcional).
   * - `codigoPostal`: Código postal del establecimiento (requerido).
   * - `estado`: Estado donde se encuentra el establecimiento (requerido).
   * - `municipio`: Municipio del establecimiento (requerido).
   * - `localidad`: Localidad del establecimiento (requerido).
   * - `colonia`: Colonia o barrio del establecimiento (requerido).
   * - `calleYNumero`: Calle y número del establecimiento (requerido).
   * - `correoElecronico`: Dirección de correo electrónico del establecimiento (requerido).
   * - `rfc`: Registro Federal de Contribuyentes del establecimiento (requerido).
   * - `lada`: Clave lada para el número telefónico del establecimiento (opcional).
   * - `telefono`: Número telefónico del establecimiento (requerido).
   * - `avisoDeFuncionamiento`: Aviso de funcionamiento del establecimiento (opcional).
   * - `licenciaSanitaria`: Licencia sanitaria del establecimiento (deshabilitado por defecto).
   * - `regimenDestinara`: Régimen al que el establecimiento destinará recursos (opcional).
   * - `aduana`: Información aduanera relacionada con el establecimiento (opcional).
   * 
   * Se aplican validadores para asegurar que los campos requeridos se completen adecuadamente.
   */
public crearElstablecimientoForm(): void {
  const AVISO_VALOR =
    this.solicitudState.licenciaSanitaria === ''
      ? true
      : this.solicitudState.avisoCheckbox;

  this.domicilioDeElstablecimientoForm = this.fb.group({
    avisoCheckbox: [AVISO_VALOR],
    licenciaSanitaria: [{value: this.solicitudState.licenciaSanitaria,disabled: AVISO_VALOR,}],
    codigoPostal: [{ value: '', disabled: true }, [Validators.required, DatosDeLaSolicitudComponent.noWhitespaceValidator, Validators.pattern(REGEX_POSTAL), Validators.maxLength(5)]],
    estado: [{ value: this.solicitudState.estado, disabled: false }, [Validators.required]],
    municipio: [{ value: this.solicitudState.municipio, disabled: true }, [Validators.required]],
    localidad: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(120)]],
    colonia: [{ value: this.solicitudState.colonia, disabled: true }, [Validators.required, Validators.maxLength(120)]],
    calleYNumero: [{ value: this.solicitudState.calleYNumero, disabled: true }, [Validators.required, Validators.maxLength(100)]],
    correoElecronico: [{ value: this.solicitudState.correoElecronico, disabled: true }, [Validators.required, Validators.email, Validators.maxLength(320)]],
    rfc: [{ value: this.solicitudState.rfc, disabled: true }, [Validators.required, Validators.pattern(REGEX_CURP)]],
    lada: [{ value: '', disabled: true }, [Validators.pattern(REGEX_SOLO_NUMEROS), Validators.maxLength(5)]],
    telefono: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(REGEX_TELEFONO), Validators.maxLength(30)]],
    regimenDestinara: [this.solicitudState.regimenDestinara],
    aduana: [this.solicitudState.aduana],
  });

  // Mantenga siempre estos campos deshabilitados
  const CAMPOS_SIEMPRE_DESHABILITADOS = [
    'denominacionRazon',
    'codigoPostal',
    'municipio',
    'localidad',
    'colonia',
    'calleYNumero',
    'correoElecronico',
    'rfc',
    'lada',
    'telefono',
    'regimenDestinara',
  ];

  /**
   * Deshabilita permanentemente un conjunto de campos dentro del formulario
   * `domicilioDeElstablecimientoForm`.
   * 
   * Estos campos corresponden a información que no debe ser modificada por el usuario,
   * ya que son gestionados por el sistema o dependen de datos externos. 
   * 
   * Se realiza un recorrido por el arreglo `CAMPOS_SIEMPRE_DESHABILITADOS`, 
   * aplicando el método `disable()` a cada control encontrado.
   */
  CAMPOS_SIEMPRE_DESHABILITADOS.forEach((field) => {
    this.domicilioDeElstablecimientoForm.get(field)?.disable();
  });

  /**
   * Asigna el valor `1` al campo `regimenDestinara` del formulario.
   * 
   * Este valor se establece de forma programática para garantizar 
   * que el campo tenga un valor por defecto válido y no dependa 
   * de la interacción del usuario.
   */
  this.domicilioDeElstablecimientoForm
    .get('regimenDestinara')
    ?.setValue(1);

  if (this.establecimientoSeleccionado) {
    this.habilitarCamposEstablecimiento();
  }

  /**
 * Si existe un establecimiento previamente seleccionado,
 * habilita los campos correspondientes en el formulario.
 * 
 * Esto permite la edición controlada de los datos 
 * únicamente cuando hay un contexto de establecimiento activo.
 */
  this.domicilioDeElstablecimientoForm
    .get('avisoCheckbox')
    ?.valueChanges.subscribe((checked: boolean) => {
      const LICENCIA_CONTROL =
        this.domicilioDeElstablecimientoForm.get('licenciaSanitaria');

      if (checked) {
        LICENCIA_CONTROL?.disable();
      } else {
        LICENCIA_CONTROL?.enable();
      }
    });

    /**
   * Observa los cambios en el control `avisoCheckbox`.
   * 
   * Si el checkbox se marca (`true`), se deshabilita el campo `licenciaSanitaria`.
   * Si se desmarca (`false`), el campo `licenciaSanitaria` vuelve a habilitarse.
   * 
   * Esto asegura que solo una de las opciones (aviso o licencia) 
   * pueda ser proporcionada por el usuario a la vez.
   */
    this.domicilioDeElstablecimientoForm
      .get('licenciaSanitaria')
      ?.valueChanges.subscribe((value: string) => {
        const AVISO_CONTROL =
          this.domicilioDeElstablecimientoForm.get('avisoCheckbox');

        if (value && value.trim().length > 0) {
          AVISO_CONTROL?.disable();
        } else {
          AVISO_CONTROL?.enable();
        }
      });
  }


  /**
   * Inicializa el FormGroup `representanteLegalForm` con controles y sus valores predeterminados
   * basados en el estado actual de `solicitudState`.
   * 
   * El formulario incluye los siguientes controles:
   * - `losDatosNo`: Representa un valor booleano o similar que indica una opción "No".
   * - `losDatosYes`: Representa un valor booleano o similar que indica una opción "Sí".
   * - `rfc`: Representa el RFC (Registro Federal de Contribuyentes).
   * - `nombreORazon`: Representa el nombre o razón social.
   * - `apellidoPaterno`: Representa el apellido paterno.
   * - `apellidoMaterno`: Representa el apellido materno.
   * 
   * Este método utiliza el `FormBuilder` de Angular para crear el grupo de formularios y
   * llenarlo con valores del objeto `solicitudState`.
   */
  public crearRepresentanteLegalForm(): void {
    this.representanteLegalForm = this.fb.group({
      manifiestos: [{ value: this.solicitudState.manifiestos, disabled: false }, [Validators.required]],
      losDatosNo: [{ value: this.solicitudState.losDatosNo, disabled: false }, [Validators.required]],
      rfc: [this.solicitudState.rfc, [Validators.required, Validators.maxLength(13), Validators.pattern(REGEX_RFC), DatosDeLaSolicitudComponent.validadorRFC]],
      nombreORazon: [{ value: this.solicitudState.nombreORazon, disabled: true }, Validators.required],
      apellidoPaterno: [{ value: this.solicitudState.apellidoPaterno, disabled: true }, Validators.required],
      apellidoMaterno: [{ value: this.solicitudState.apellidoMaterno, disabled: true }],
    });
  }
/**
   * Validador personalizado que verifica que el valor del campo no sea solo espacios en blanco.
   * 
   * @method noWhitespaceValidator
   * @param control Control de formulario a validar.
   * @returns {ValidationErrors | null} Un objeto de error si el valor contiene solo espacios en blanco, o null si es válido.
   */
  static noWhitespaceValidator(control: FormControl): ValidationErrors | null {
    if (control.value && control.value.trim().length === 0) {
      return { whitespace: true };
    }
    return null;
  }

  /**
   * Valida el RFC ingresado en el formulario.
   * Utiliza expresiones regulares para verificar si es un RFC válido.
   * 
   * @returns Un objeto de error si el RFC es inválido, o null si es válido.
   */
  static validadorRFC(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }
    const ES_VALIDO = REGEX_RFC.test(VALUE);
    return ES_VALIDO ? null : { rfcInvalido: true };
  }

  /**
   * Restablece e inicializa el formulario SCIAN con valores predeterminados del estado actual de la solicitud.
   * El formulario se vuelve a crear utilizando el FormBuilder con los campos `clave` y `descripcion`
   * poblados a partir del objeto `solicitudState`.
   */
  public cerrarSCIANForm(): void {
    this.scianForm = this.fb.group({
      claveScian: [this.solicitudState.claveScian ?? null, Validators.required],
      descripcion: [this.solicitudState.descripcion, Validators.required]
    });

    this.scianForm.get('claveScian')?.valueChanges.pipe(takeUntil(this.destroyNotifier$)).subscribe((_value) => {
      if (this.isUpdatingForm) {
        return;
      }
      
      setTimeout(() => {
        this.updateDescripcionScianCatalogo();
      }, 100);
    });
    
    this.updateDescripcionScianCatalogo();
  }

  /**
   * Inicializa y configura el FormGroup `mercanciasForm` con valores predeterminados
   * derivados del objeto `solicitudState`. Este formulario se utiliza para gestionar
   * y validar los datos relacionados con las "mercancías" en la aplicación.
   *
   * El formulario incluye los siguientes controles:
   * - `clave`: La clave o identificador de las mercancías.
   * - `especificarClasificacion`: Especifica la clasificación del producto.
   * - `dci`: La DCI (Denominación Común Internacional) del producto.
   * - `marcaComercialODenominacionDistintiva`: La marca comercial o denominación distintiva.
   * - `tipoDeProducto`: El tipo de producto.
   * - `fraccionArancelaria`: La fracción arancelaria.
   * - `descripcionDeLaFraccion`: Descripción de la fracción arancelaria.
   * - `cantidadUmt`: Cantidad en UMT (Unidad de Medida de Transporte).
   * - `umt`: La UMT (Unidad de Medida de Transporte).
   * - `umc`: La UMC (Unidad de Medida Comercial).
   * - `numeroCas`: El número CAS (Chemical Abstracts Service).
   * - `cantidadDeLotes`: La cantidad de lotes.
   * - `kgOrPorLote`: Kilogramos o cantidad por lote.
   * - `pais`: El país de origen.
   * - `paisDeProcedencia`: El país de procedencia.
   * - `detallarUso`: Detalles sobre el uso previsto de las mercancías.
   * - `cantidadUmc`: Cantidad en UMC (Unidad de Medida Comercial).
   * - `numeroDePiezas`: El número de piezas.
   * - `descripcionDelNumeroDePiezas`: Descripción del número de piezas.
   * - `numeroDeRegistro`: El número de registro.
   * - `presentacion`: La presentación o empaque de las mercancías.
   * - `productoTerminadoTablaDatos`: Datos relacionados con el producto terminado.
   * - `numeroDePiezas`: El número de piezas.
   * - `descripcionDelNumeroDePiezas`: Descripción del número de piezas.
   * - `numeroDeRegistro`: El número de registro.
   *
   * Este método asegura que el formulario se inicialice correctamente con el
   * estado actual del objeto `solicitudState`.
   */
  public cerrarMercanciasForm(): void {
    this.mercanciasForm = this.fb.group({
      clave: [{ value: this.solicitudState.clave, disabled: false }, [Validators.required]],
      especificarClasificacion: [{ value: this.solicitudState.especificarClasificacionProducto, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(200)]],
      dci: [{ value: this.solicitudState.dci, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(256)]],
      marcaComercialODenominacionDistintiva: [{ value: this.solicitudState.marcaComercialODenominacionDistintiva, disabled: false }, [Validators.required, Validators.maxLength(250)]],
      tipoDeProducto: [{ value: this.solicitudState.tipoDeProducto, disabled: false }, [Validators.required]],
      especifique: [{ value: this.solicitudState.especifique, disabled: false }],
      fraccionArancelaria: [{ value: this.solicitudState.fraccionArancelaria, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.pattern(SOLO_REGEX_NUMEROS), Validators.maxLength(8)]],
      descripcionDeLaFraccion: [{ value: this.solicitudState.descripcionDeLaFraccion, disabled: true }, [Validators.required]],
      cantidadUmt: [{ value: this.solicitudState.cantidadUMT, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(20)]],
      umt: [{ value: this.solicitudState.UMT, disabled: true }, [Validators.required]],
      umc: [{ value: this.solicitudState.UMC, disabled: false }, [Validators.required]],
      numeroCas: [{ value: this.solicitudState.numeroCas, disabled: false }, [Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(20)]],
      cantidadDeLotes: [{ value: this.solicitudState.cantidadDeLotes, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(150)]],
      kgOrPorLote: [{ value: this.solicitudState.kgOrPorLote, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(150)]],
      pais: [{ value: this.solicitudState.pais, disabled: false }, [Validators.required]],
      paisDeProcedencia: [{ value: this.solicitudState.paisDeProcedencia, disabled: false }, [Validators.required]],
      detallarUso: [{ value: this.solicitudState.detallarUso, disabled: false }, [Validators.maxLength(256)]],
      cantidadUmc: [{ value: this.solicitudState.cantidadUMC, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.pattern(REGEX_VALID_UMC), Validators.maxLength(23)]],
      numeroDePiezas: [{ value: this.solicitudState.numeroDePiezas, disabled: false }, [Validators.required, DatosDeLaSolicitudComponent.validateNumeroDePiezas, Validators.maxLength(15)]],
      descripcionDelNumeroDePiezas: [{ value: this.solicitudState.descripcionDelNumeroDePiezas, disabled: false }, [Validators.required, Validators.maxLength(250)]],
      numeroDeRegistro: [{ value: this.solicitudState.numeroDeRegistro, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(50)]],
      presentacion: [{ value: this.solicitudState.presentacion, disabled: false }, [Validators.required, Validators.pattern(REGEX_PATRON_ALFANUMERICO), Validators.maxLength(256)]],
      productoTerminadoTablaDatos: [[], Validators.required],
    });
    this.mercanciasForm.get('pais')?.setValue('134');
  }


  /**
   * Abre un cuadro de diálogo modal utilizando la plantilla proporcionada y establece el estado del modal.
   *
   * @param template - Una referencia a la plantilla que se mostrará en el modal.
   */
  public seleccionar(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.esModalCerrado = true;
  }

  /**
   * Cierra el cuadro de diálogo modal y vuelve a habilitar el control de formulario 'denominacionRazon'.
   * 
   * Este método realiza las siguientes acciones:
   * - Oculta el cuadro de diálogo modal si está actualmente visible.
   * - Habilita el campo 'denominacionRazon' en el grupo de formularios `denominacionForm`,
   *   permitiendo nuevamente la interacción del usuario con el campo.
   */
  public cerrar(): void {
    this.modalRef?.hide();
    this.habilitarCamposEstablecimiento();
  }

  /**
   * Inicializa el FormGroup `denominacionForm` con un único control `denominacionRazon`.
   * El control se rellena previamente con el valor de `solicitudState.denominacionRazon` y se establece como deshabilitado.
   * Este método se utiliza para configurar el formulario y mostrar la denominación o razón en un estado de solo lectura.
   */
  public getDenominacionForm(): void {
    this.denominacionForm = this.fb.group({
      denominacionRazon: [{ value: this.solicitudState.denominacionRazon, disabled: true }]
    });
    this.denominacionForm.get('denominacionRazon')?.disable();
  }

  /**
   * Obtiene los datos del catálogo de estados desde el servicio y actualiza la propiedad local `estadoCatalogo`.
   * 
   * Este método llama a la función `getEstadoDatos` del servicio `certificadosLicenciasSvc`,
   * se suscribe al observable y procesa la respuesta. Los datos de la respuesta se copian profundamente
   * para garantizar la inmutabilidad y luego se asignan a la propiedad `estadoCatalogo`.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  public getEstadoCatalogDatos(): void {
    this.certificadosLicenciasSvc.getEstadoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = DatosDeLaSolicitudComponent.deepCopy<EstadoCatalogResponse>(response);
      this.estadoCatalogo = DATOS.data;
    });
  }

  /**
   * Recupera los datos del SCIAN desde el servicio y los asigna a la propiedad `scianTablaDatos`.
   * Los datos se copian profundamente para garantizar la inmutabilidad y prevenir efectos secundarios no deseados.
   *
   * @notas
   * Este método se suscribe al observable `getScianDatos` del servicio `certificadosLicenciasSvc`.
   * La respuesta se procesa y almacena en el componente para su uso posterior.
   */
  public getscianTabla(): void {
    this.certificadosLicenciasSvc.getScianDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = DatosDeLaSolicitudComponent.deepCopy<ScianDatos[]>(response);
      this.scianTablaDatos = DATOS;
      (this.tramite2603Store['setScianTabla'] as (value: unknown) => void)(this.scianTablaDatos);
    });
  }

  /**
   * Obtiene los datos del catálogo de "Clave Datos" desde el servicio y los asigna a la propiedad `claveCatalogo`.
   * 
   * Este método realiza una solicitud HTTP a través del método `certificadosLicenciasSvc.getClaveCatalogDatos()` del servicio.
   * Al recibir la respuesta, crea una copia profunda de los datos y asigna la propiedad `data` 
   * de la respuesta a la propiedad `claveCatalogo`.
   * 
   * @returns {void} Este método no retorna un valor.
   */
  public getClaveCatalogDatos(): void {
    this.certificadosLicenciasSvc.getClaveCatalogDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = DatosDeLaSolicitudComponent.deepCopy<EstadoCatalogResponse>(response);
      this.claveCatalogo = DATOS.data;
    });
  }

  /**
   * Obtiene el catálogo de datos de régimen desde el servicio y lo asigna a la propiedad `regimenCatalogo`.
   * 
   * Este método realiza una solicitud HTTP a través del servicio `certificadosLicenciasSvc.getRegimenDatos`,
   * se suscribe a la respuesta y procesa los datos creando una copia profunda de la respuesta.
   * Los datos procesados se asignan a la propiedad `regimenCatalogo`.
   * 
   * @returns {void} Este método no retorna un valor.
   */
  public getRegimenCatalogDatos(): void {
    this.certificadosLicenciasSvc.getRegimenDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = DatosDeLaSolicitudComponent.deepCopy(response);
      this.regimenCatalogo = DATOS.data;
    });
  }

  /**
   * Abre un cuadro de diálogo modal utilizando la plantilla proporcionada.
   *
   * @param template - Una referencia a la plantilla que se mostrará en el modal.
   *                   Esto debe ser de tipo `TemplateRef<void>`.
   * 
   * El modal se muestra con una clase CSS de 'modal-lg' para indicar un modal de tamaño grande.
   */
  /**
   * Abre el modal y reinicia el formulario de mercancías
   */
  public seleccionarAgregar(template: TemplateRef<void>): void {
    this.cerrarMercanciasForm(); // Reinicia el formulario
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  /**
   * Agrega un registro a la tabla de mercancías al enviar el formulario
   */
  public agregarMercancia(): void {
  this.mercanciasForm.markAllAsTouched();
    if (this.mercanciasForm.valid) {
  const NUEVA_MERCANCIA = DatosDeLaSolicitudComponent.deepCopy(this.mercanciasForm.value);
  this.mercanciasTablaDatos = [...this.mercanciasTablaDatos, NUEVA_MERCANCIA];
      this.cerrarMercanciasForm();
      if (this.modalRef) {
        this.modalRef.hide();
      }
    } else {
      this.mercanciasForm.markAllAsTouched();
    }
  }

  /**
   * Agrega detalle de mercancía - Solo valida campos específicos: cantidadUmc, numeroDePiezas, descripcionDelNumeroDePiezas, numeroDeRegistro, presentacion
   */
  public agregarDetalleMercancia(): void {
    const FIELDS_TO_VALIDATE = ['cantidadUmc', 'numeroDePiezas', 'descripcionDelNumeroDePiezas', 'numeroDeRegistro', 'presentacion'];
    
    FIELDS_TO_VALIDATE.forEach(fieldName => {
      const CONTROL = this.mercanciasForm.get(fieldName);
      if (CONTROL) {
        CONTROL.markAsTouched();
      }
    });

    const ARE_SPECIFIC_FIELDS_VALID = FIELDS_TO_VALIDATE.every(fieldName => {
      const CONTROL = this.mercanciasForm.get(fieldName);
      return CONTROL ? CONTROL.valid : true;
    });

    if (ARE_SPECIFIC_FIELDS_VALID) {
      
      FIELDS_TO_VALIDATE.forEach(fieldName => {
        const CONTROL = this.mercanciasForm.get(fieldName);
        if (CONTROL) {
          CONTROL.reset();
          CONTROL.markAsUntouched();
        }
      });
    }
  }

  /**
   * Agrega mercancía completa - Valida todos los campos incluyendo la tabla de producto terminado
   */
  public agregarMercanciaCompleta(): void {
    this.mercanciasForm.markAllAsTouched();
    this.productoTerminadoForm.markAllAsTouched();
    this.mostrarErrorProductoTerminado = true;

    const IS_MAIN_FORM_VALID = this.mercanciasForm.valid;
    const IS_PRODUCTO_TERMINADO_TABLE_VALID = this.productoTerminadoTablaDatos.length > 0;

    if (IS_MAIN_FORM_VALID && IS_PRODUCTO_TERMINADO_TABLE_VALID) {
      const NUEVA_MERCANCIA = DatosDeLaSolicitudComponent.deepCopy(this.mercanciasForm.value);
      NUEVA_MERCANCIA.productoTerminadoTablaDatos = this.productoTerminadoTablaDatos;
      
      this.mercanciasTablaDatos = [...this.mercanciasTablaDatos, NUEVA_MERCANCIA];
      
      this.cerrarMercanciasForm();
      this.limpiarFormularioProductoTerminado();
      this.mostrarErrorProductoTerminado = false;
      
      if (this.modalRef) {
        this.modalRef.hide();
      }
    }
  }

  /**
 * @method obtenerDescripcion
 * @description
 * Obtiene la descripción de la fracción arancelaria seleccionada en el formulario dinámico.
 * @returns {string} Descripción de la fracción arancelaria seleccionada o una cadena vacía si no existe.
 */
  public static obtenerDescripcion(array: Catalogo[], id: string): string {
    const DESCRIPCION = array.find((ele: Catalogo) => Number(ele.id) === Number(id))?.descripcion;
    return DESCRIPCION ?? '';
  }

  /**
   * Recupera los datos de "mercancías" y actualiza los datos de la tabla.
   * Este método llama al servicio `getMercanciasDatos` para obtener los datos,
   * crea una copia profunda de la respuesta y la asigna a `mercanciasTablaDatos`.
   *
   * @returns {void} Este método no retorna un valor.
   */
  public getMercanciasTabla(): void {
    this.certificadosLicenciasSvc.getMercanciasDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = DatosDeLaSolicitudComponent.deepCopy(response);
      this.mercanciasTablaDatos = DATOS;
    });
  }

  /**
   * Obtiene el catálogo de tipos de productos desde el servicio y lo asigna a la propiedad `tipoDeProductoCatalogo`.
   * Los datos de la respuesta se copian profundamente para garantizar la inmutabilidad.
   *
   * @returns {void}
   */
  public getTipoDeProductoCatalogDatos(): void {
    this.certificadosLicenciasSvc.getTipoDeProductoDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = DatosDeLaSolicitudComponent.deepCopy(response);
      this.tipoDeProductoCatalogo = DATOS.data;
    });
  }

  /**
   * Alterna el estado colapsable de la primera sección.
   */
  public mostrarColapsable(valores: string): void {
    if (valores === 'forma') {
      this.colapsableObj.formaFarmaceuticaColapsable = !this.colapsableObj.formaFarmaceuticaColapsable;
    } else if (valores === 'PaisDeOrigen') {
      this.colapsableObj.paisDeOrigenColapsable = !this.colapsableObj.paisDeOrigenColapsable;
    } else if (valores === 'usoEspecifico') {
      this.colapsableObj.usoEspecificoColapsable = !this.colapsableObj.usoEspecificoColapsable;
    } else {
      this.colapsableObj.formaFarmaceuticaColapsable = false;
      this.colapsableObj.paisDeOrigenColapsable = false;
      this.colapsableObj.usoEspecificoColapsable = false;
    }
  }

  /**
   * Genera una lista de configuraciones de botones para operaciones de listas cruzadas.
   * Cada configuración de botón incluye un nombre, una clase CSS y una función
   * para realizar una acción específica en la lista cruzada.
   *
   * @returns Un arreglo de objetos de configuración de botones, donde cada objeto contiene:
   * - `btnNombre`: El nombre que se mostrará en el botón.
   * - `class`: La clase CSS para estilizar el botón.
   * - `funcion`: Una función de callback para ejecutar la acción correspondiente.
   *
   * Las acciones disponibles son:
   * - "Agregar todos": Agrega todos los elementos a la lista cruzada.
   * - "Agregar selección": Agrega los elementos seleccionados a la lista cruzada.
   * - "Restar selección": Elimina los elementos seleccionados de la lista cruzada.
   * - "Restar todos": Elimina todos los elementos de la lista cruzada.
   */
  public getCrossListBtn(): { btnNombre: string; class: string; funcion: () => void }[] {
    return [
      { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: (): void => this.crossList.toArray()[0].agregar('t') },
      { btnNombre: 'Agregar selección', class: 'btn-default', funcion: (): void => this.crossList.toArray()[0].agregar('') },
      { btnNombre: 'Restar selección', class: 'btn-danger', funcion: (): void => this.crossList.toArray()[0].quitar('') },
      { btnNombre: 'Restar todos', class: 'btn-default', funcion: (): void => this.crossList.toArray()[0].quitar('t') },
    ];
  }


  /**
   * Obtiene el catálogo de datos de países de procedencia desde el servicio y lo asigna a la propiedad `paisDeProcedenciaCatalogo`.
   * 
   * Este método realiza una solicitud HTTP a través del método `certificadosLicenciasSvc.getPaisDeProcedenciaDatos` del servicio.
   * Al recibir la respuesta, crea una copia profunda de los datos y extrae la propiedad `data`,
   * que luego se asigna a la propiedad `paisDeProcedenciaCatalogo`.
   * 
   * @returns {void} Este método no retorna un valor.
   */
  public getPaisDeProcedenciaCatalogoDatos(): void {
    this.certificadosLicenciasSvc.getPaisDeProcedenciaDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
      const DATOS = DatosDeLaSolicitudComponent.deepCopy(response);
      this.paisDeProcedenciaCatalogo = DATOS.data;
    });
  }

  /**
   * Maneja el evento de cambio para el checkbox "Funcionamiento".
   * Deshabilita o habilita el control de formulario 'licenciaSanitaria' según el estado del checkbox.
   *
   * @param event - El evento activado por el cambio del checkbox.
   *                Se espera que sea de tipo `Event` y su objetivo debe ser un `HTMLInputElement`.
   */
  public onFuncionamientoCheckboxCambiar(event: Event): void {
    const VALOR = (event.target as HTMLInputElement).checked;

    const LICENCIA_CONTROL =
      this.domicilioDeElstablecimientoForm.get('licenciaSanitaria');

    if (VALOR) {
      LICENCIA_CONTROL?.disable();
    } else {
      LICENCIA_CONTROL?.enable();
    }

    (this.tramite2603Store['setAvisoCheckbox'] as (value: boolean) => void)(
      VALOR
    );
  }

  /**
   * Maneja el evento de input para el campo "No. de licencia sanitaria".
   * Deshabilita o habilita el control de formulario 'avisoCheckbox' según el contenido del input.
   *
   * @param event - El evento activado por el input del campo.
   *                Se espera que sea de tipo `Event` y su objetivo debe ser un `HTMLInputElement`.
   */
  public onLicenciaSanitariaInput(event: Event): void {
    const VALOR = (event.target as HTMLInputElement).value;

    const AVISO_CONTROL =
      this.domicilioDeElstablecimientoForm.get('avisoCheckbox');

    if (VALOR && VALOR.trim().length > 0) {
      AVISO_CONTROL?.disable();
    } else {
      AVISO_CONTROL?.enable();
    }
  }

  /**
   * Establece el valor de un campo en el store de Tramite2603.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite2603Store): void {
    if (campo === 'claveScian' && form === this.scianForm) {
      const VALOR = form.get(campo)?.value;
      (this.tramite2603Store[metodoNombre] as (value: unknown) => void)(VALOR);
      return;
    }

    if (campo === 'licenciaSanitaria' && form.get('licenciaSanitaria')?.value) {
      form.get('avisoCheckbox')?.disable();
    }

    const VALOR = form.get(campo)?.value;
    (this.tramite2603Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Habilita o deshabilita todos los formularios del componente según el estado de solo lectura.
   * Si la propiedad `readonly` de `consultaState` es verdadera, todos los formularios se deshabilitan para evitar la edición.
   * Si no, se habilitan para permitir la edición.
   */
  deshabilitarFormularios(): void {
    this.esFormularioSoloLectura = this.consultaState?.readonly || false;

    if (this.esFormularioSoloLectura) {
      this.denominacionForm?.disable();
      this.domicilioDeElstablecimientoForm?.disable();
      this.representanteLegalForm?.disable();
      this.scianForm?.disable();
      this.mercanciasForm?.disable();
    } else {
      if (this.establecimientoSeleccionado) {
        const CAMPOS_A_HABILITAR = [
          'denominacionRazon',
          'codigoPostal',
          'estado',
          'municipio',
          'localidad',
          'colonia',
          'calleYNumero',
          'correoElecronico',
          'rfc',
          'lada',
          'telefono'
        ];
        CAMPOS_A_HABILITAR.forEach(field => {
          if (this.domicilioDeElstablecimientoForm.get(field)) {
            this.domicilioDeElstablecimientoForm.get(field)?.enable();
          }
        });
      } else {
        this.denominacionForm?.disable();
        const CAMPOS_SIEMPRE_DESHABILITADOS = [
          'denominacionRazon',
          'codigoPostal',
          'municipio',
          'localidad',
          'colonia',
          'calleYNumero',
          'correoElecronico',
          'rfc',
          'lada',
          'telefono'
        ];
        CAMPOS_SIEMPRE_DESHABILITADOS.forEach(field => {
          if (this.domicilioDeElstablecimientoForm.get(field)) {
            this.domicilioDeElstablecimientoForm.get(field)?.disable();
          }
        });
      }
      this.representanteLegalForm?.enable();
      this.scianForm?.enable();
      this.mercanciasForm?.enable();
    }
  }

  /** Busca y asigna los datos del representante legal en el formulario si es válido. */
  buscarRepresentanteLegal(): void {
    this.representanteLegalForm.markAllAsTouched();
    if (this.representanteLegalForm.valid) {
      this.representanteLegalForm.patchValue({
        nombreORazon: 'EUROFOODS DE MEXICO',
        apellidoPaterno: 'GONZALEZ',
        apellidoMaterno: 'PINAL'
      })
    } else {
      this.representanteLegalForm.markAllAsTouched();
    }
  }

  /**
* compo doc
* @method isValid
* @description 
* Verifica si un campo específico del formulario es válido.
* @param field El nombre del campo que se desea validar.
* @returns {boolean | null} Un valor booleano que indica si el campo es válido.
*/
  public esValido(form: FormGroup, campo: string): boolean | null {
    if (!this.validacionesService || typeof this.validacionesService.isValid !== 'function') {
      return null;
    }
    return this.validacionesService.isValid(form, campo);
  }
  /*
   * Lista de filas seleccionadas del componente tabla de SCIAN.
   * Se utiliza para manejar la selección de filas en la tabla de SCIAN.
   */
  selectedRowsScian: ScianDatos[] = [];

  /*
    * Lista de filas seleccionadas del componente tabla de mercancías.
    * Se utiliza para manejar la selección de filas en la tabla de mercancías.
    */
  selectedRows: NicoInfo[] = [];

  /**
   * Maneja el evento de cambio de selección en la tabla de SCIAN.
   * @param selected Lista de filas seleccionadas.
   */
  onSeleccionChangeScian(selected: ScianDatos[]): void {
    this.selectedRowsScian = selected;
  }
  /**
   * Notificación de éxito para mostrar cuando se guardan datos correctamente.
   * 
   * Siguiendo el patrón del 40402, esta notificación se muestra cuando
   * las operaciones de Add/Modify se completan exitosamente.
   * 
   * @public
   * @property {Notificacion} alertaNotificacion
   */
  public alertaNotificacion!: Notificacion;
  /**
   * Elimina las filas seleccionadas de la tabla SCIAN
   */
  eliminarSeleccionadosScian(): void {
    // Mostrar modal de confirmación usando
    this.alertaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
      cerrar: false,
      txtBtnAceptar: 'Eliminar',
      txtBtnCancelar: 'Cancelar',
    };
    this.mostrarNotificacion = true;
  }

  // Manejador de confirmación de lib-notificaciones
  onConfirmarEliminarSeleccionadosScian(confirmado: boolean): void {
    this.mostrarNotificacion = false;
    this.alertaNotificacion = {} as Notificacion;
    if (confirmado) {
      this.scianTablaDatos = this.scianTablaDatos.filter(
        (row) => !this.selectedRowsScian.some(sel => sel.clave === row.clave && sel.descripcion === row.descripcion)
      );
      this.selectedRowsScian = [];
      (this.tramite2603Store['setScianTabla'] as (value: unknown) => void)(this.scianTablaDatos);
    }
  }

  /**
   * Limpia el formulario SCIAN y resetea los datos seleccionados
   */
  limpiarFormularioScian(): void {
    this.scianForm.get('claveScian')?.setValue(null);
    this.scianForm.get('descripcion')?.setValue(null);
    this.scianForm.markAsPristine();
    this.scianForm.markAsUntouched();
    this.selectedRowsScian = [];
  }

  /**
   * Agrega una nueva fila SCIAN a la tabla, siempre resolviendo el texto de la descripción desde el catálogo.
   * La lógica del método permanece en inglés, pero la documentación y constantes están en español y UPPER_CASE.
   */
  public scianAgregar(): void {
    // Validar el formulario SCIAN antes de agregar
    if (this.scianForm.valid) {
      // Obtener el valor seleccionado de la descripción (id del catálogo)
      const DESCRIPCION_ID = this.scianForm.get('descripcion')?.value;

      // Buscar el objeto seleccionado en el catálogo de clave para obtener el código
      let CLAVE_VALOR = '';
      let DESCRIPCION_VALOR = '';
      if (
        DESCRIPCION_ID !== null &&
        DESCRIPCION_ID !== undefined &&
        this.claveCatalogo &&
        this.claveCatalogo.length > 0 &&
        this.estadoCatalogo &&
        this.estadoCatalogo.length > 0
      ) {
        // Buscar por id numérico o string
        const ITEM_CLAVE = this.claveCatalogo.find(item => String(item.id) === String(DESCRIPCION_ID));
        const ITEM_DESCRIPCION = this.estadoCatalogo.find(item => String(item.id) === String(DESCRIPCION_ID));
        if (ITEM_CLAVE) {
          CLAVE_VALOR = ITEM_CLAVE.descripcion || '';
        }
        if (ITEM_DESCRIPCION) {
          DESCRIPCION_VALOR = ITEM_DESCRIPCION.descripcion || '';
        }
      }

      // Si no se encuentra, dejar en blanco
      const FILA_SCIAN: ScianDatos = {
        clave: CLAVE_VALOR, // Código SCIAN (ej. 000000, 384125)
        descripcion: DESCRIPCION_VALOR // Descripción SCIAN (ej. NO APLICA, Producción...)
      };

  // Agregar la fila a la tabla y actualizar el store
  this.scianTablaDatos = [...this.scianTablaDatos, FILA_SCIAN];
  (this.tramite2603Store['setScianTabla'] as (value: unknown) => void)(this.scianTablaDatos);
  this.onScianRecordAdded([FILA_SCIAN]);
  this.modalRef?.hide();
  this.limpiarFormularioScian();
    } else {
      // Marcar todos los campos como tocados si el formulario no es válido
      this.scianForm.markAllAsTouched();
    }
  }

  /**
   * Cierra el modal y limpia el formulario SCIAN
   */
  public cerrarModalScian(): void {
    this.modalRef?.hide();
    this.limpiarFormularioScian();
  }

  /**
   * Elimina las filas seleccionadas del NICO
   */
  eliminarSeleccionados(): void {
    this.nicoTablaDatos = this.nicoTablaDatos.filter(
      (row) => !this.selectedRows.includes(row)
    );
    this.selectedRows = [];
  }

  /**
   * Maneja el evento cuando se agrega un registro SCIAN desde un componente externo.
   * Actualiza el valor de "licenciaSanitaria" y selecciona la opción de régimen si está disponible.
   *
   * @param event - El evento recibido, que puede contener la clave SCIAN.
   */
  onScianRecordAdded(event: unknown): void {
    const CLAVE_SCIAN = Array.isArray(event) && event.length > 0 ? (event[0] as { claveScian?: string; clave?: string })['claveScian'] || (event[0] as { clave?: string })['clave'] : null;
    const LICENCIA_SANITARIA_CONTROL = this.domicilioDeElstablecimientoForm.get('licenciaSanitaria');
    if (CLAVE_SCIAN) {
      LICENCIA_SANITARIA_CONTROL?.setValue(CLAVE_SCIAN);
    } 
    if (this.regimenCatalogo && this.regimenCatalogo.length > 0) {
      const OPTION_UNO = this.regimenCatalogo.find((item: Catalogo) => item.id === 1);
      if (OPTION_UNO) {
        this.domicilioDeElstablecimientoForm.get('regimenDestinara')?.setValue(OPTION_UNO.id);
      } 
    } 
  }
  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
