import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrossListLable, CrosslistComponent, InputRadioComponent, MercanciasDatos, REGEX_RFC, ScianDatos, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CONFIGURACION_MERCANCIAS_DATOS, RADIO_OPCIONES } from '../../services/certificados-licencias-permisos.enum';
import { Component, Input, OnDestroy, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Solicitud260303State, Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Subject,map, takeUntil } from 'rxjs';
import CROSLISTA_DE_PAISES from '@libs/shared/theme/assets/json/260303/croslista_de_paises.json';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { EstadoCatalogResponse } from '../../models/certificados-licencias-permisos.model';
import PAISES_DE_ORIGEN from '@libs/shared/theme/assets/json/260303/paises_de_origen.json';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import USO_ESPECIFICO from '@libs/shared/theme/assets/json/260303/uso_especifico.json';

import { TEXTO_MANIFESTO_Y_DECLARACIONES } from '../../../../shared/constantes/datos-solicitud.enum';
import { NicoInfo } from '../../../260911/models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
/**
 * DatosDeLaSolicitudComponent es responsable de manejar el primer paso del proceso.
 * para actualizar el componente actual que se está mostrando.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [CommonModule,
    TituloComponent,
    TablaDinamicaComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CrosslistComponent,
    AlertComponent,
    TooltipModule,
    InputRadioComponent
  ],
  providers:[BsModalService],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit,OnDestroy {

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
  @Input() consultaState!: ConsultaioState;

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
   * Representa el tipo de selección de checkbox utilizado en el componente.
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
   * Representa el estado de la Solicitud 260303.
   * Esta propiedad contiene los datos y la gestión del estado para la solicitud actual.
   * Se espera que se inicialice con una instancia de `Solicitud260303State`.
   */
  public solicitudState!: Solicitud260303State;
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

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<ScianDatos>[] = [
    { encabezado: 'Clave S.C.I.A.N', clave: (item: ScianDatos) => item.clave, orden: 1 },
    { encabezado: 'Descripción del S.C.I.A.N', clave: (item: ScianDatos) => item.descripcion, orden: 2 }
  ];

  /** Configuración de la tabla de sectores */
  public configuracionMercancias = CONFIGURACION_MERCANCIAS_DATOS;
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
 * Constructor para el componente DatosDeLaSolicitudComponent.
 */
constructor(
  private modalService: BsModalService,
  private fb: FormBuilder,
  private certificadosLicenciasSvc: CertificadosLicenciasPermisosService,
  private tramite260211Store: Tramite260303Store,
  private tramite260211Query: Tramite260303Query,
  private validacionesService: ValidacionesFormularioService
) {
    // Set the readonly state based on consultaState
    this.esFormularioSoloLectura = this.consultaState?.readonly || false;
}

/**
 * Gancho del ciclo de vida que se llama después de que Angular ha inicializado todas las propiedades enlazadas a datos de un componente.
 * 
 * Este método realiza las siguientes acciones:
 * - Se suscribe al observable `selectSolicitud$` de `tramite260211Query` para actualizar la propiedad `solicitudState`
 *   con el estado más reciente de la sección, asegurando que la suscripción se limpie adecuadamente utilizando `takeUntil` con `destroyNotifier$`.
 * - Inicializa los datos de las tablas y catálogos llamando a `inicializarTablaYCatalogoDatos`.
 * - Crea formularios para "Establecimiento", "Representante Legal", "SCIAN" y "Mercancías" invocando sus respectivos métodos:
 *   `crearElstablecimientoForm`, `crearRepresentanteLegalForm`, `cerrarSCIANForm` y `cerrarMercanciasForm`.
 */
ngOnInit(): void {
  // Update readonly state
  this.esFormularioSoloLectura = this.consultaState?.readonly || false;
    
    this.inicializarFormulario();
    this.inicializarTablaYCatalogoDatos();
    this.crearElstablecimientoForm();
    this.crearRepresentanteLegalForm();
    this.cerrarSCIANForm();
    this.cerrarMercanciasForm();
    this.deshabilitarFormularios();
}

  /**
   * Inicializa el formulario suscribiéndose al observable selectSolicitud$ del store.
   * Actualiza la propiedad solicitudState con el estado más reciente de la sección.
   * 
   * Este método se asegura de que la información del formulario esté sincronizada con el estado global.
   */
  inicializarFormulario(): void {
    this.tramite260211Query
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
  if (this.solicitudState['scianTabla']?.length) {
    this.scianTablaDatos = this.solicitudState['scianTabla'];
  } else {
    this.getscianTabla();
  }
  this.getClaveCatalogDatos();
  this.getRegimenCatalogDatos();
  this.getMercanciasTabla();
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
   * Inicializa y crea un grupo de formularios reactivo para "domicilioDeElstablecimientoForm".
   * Este formulario se utiliza para capturar y validar los detalles de la dirección de un establecimiento y la información relacionada.
   * 
   * El formulario incluye los siguientes controles:
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
    const AVISO_VALOR = this.solicitudState.licenciaSanitaria === ''
    ? true
    : this.solicitudState.avisoCheckbox;

    this.domicilioDeElstablecimientoForm = this.fb.group({
      codigoPostal: [{value: this.solicitudState.codigoPostal, disabled: true},Validators.required],
      estado: [{value: this.solicitudState.estado, disabled: false},Validators.required],
      municipio: [{value: this.solicitudState.municipio, disabled: true},Validators.required],
      localidad: [{value: this.solicitudState.localidad, disabled: true},Validators.required],  
      colonia: [{value: this.solicitudState.colonia, disabled: true},Validators.required],
      calleYNumero: [{value: this.solicitudState.calleYNumero, disabled: true},Validators.required],
      correoElecronico: [{value: this.solicitudState.correoElecronico, disabled: true},Validators.required],
      rfc: [{value: this.solicitudState.rfc, disabled: true},Validators.required],
      lada: [{value: this.solicitudState.lada, disabled: true}],
      telefono: [{value: this.solicitudState.telefono, disabled: true},Validators.required],
      avisoCheckbox: [{value: AVISO_VALOR, disabled: false}],
      licenciaSanitaria: [{ value: this.solicitudState.licenciaSanitaria, disabled: false }],
      regimenDestinara: [this.solicitudState.regimenDestinara],
      aduana: [this.solicitudState.aduana],
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
      manifiestos: [this.solicitudState.manifiestos],
      losDatosNo: [this.solicitudState.losDatosNo],
      rfc: [this.solicitudState.rfc, [Validators.required, Validators.maxLength(13), DatosDeLaSolicitudComponent.validadorRFC]],
      nombreORazon: [{value: this.solicitudState.nombreORazon, disabled: true}],
      apellidoPaterno: [{value: this.solicitudState.apellidoPaterno, disabled: true}],
      apellidoMaterno: [{value: this.solicitudState.apellidoMaterno, disabled: true}],
    });
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
      claveScian: [this.solicitudState.claveScian, Validators.required],
      descripcion: [this.solicitudState.descripcion, Validators.required]
    });
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
   *
   * Este método asegura que el formulario se inicialice correctamente con el
   * estado actual del objeto `solicitudState`.
   */
  public cerrarMercanciasForm(): void {
    this.mercanciasForm = this.fb.group({
      clave: [this.solicitudState.clave],
      especificarClasificacion: [this.solicitudState.especificarClasificacionProducto],
      dci: [this.solicitudState.dci],
      marcaComercialODenominacionDistintiva: [this.solicitudState.marcaComercialODenominacionDistintiva],
      tipoDeProducto: [this.solicitudState.tipoDeProducto],
      fraccionArancelaria: [this.solicitudState.fraccionArancelaria],
      descripcionDeLaFraccion: [this.solicitudState.descripcionDeLaFraccion],
      cantidadUmt: [this.solicitudState.cantidadUMT],
      umt: [this.solicitudState.UMT],
      umc: [this.solicitudState.UMC],
      numeroCas: [this.solicitudState.numeroCas],
      cantidadDeLotes: [this.solicitudState.cantidadDeLotes],
      kgOrPorLote: [this.solicitudState.kgOrPorLote],
      pais: [this.solicitudState.pais],
      paisDeProcedencia: [this.solicitudState.paisDeProcedencia],
      detallarUso: [this.solicitudState.detallarUso],
      cantidadUmc: [this.solicitudState.cantidadUMC],
      numeroDePiezas: [this.solicitudState.numeroDePiezas],
      descripcionDelNumeroDePiezas: [this.solicitudState.descripcionDelNumeroDePiezas],
      numeroDeRegistro: [this.solicitudState.numeroDeRegistro],
      presentacion: [this.solicitudState.presentacion],
    });
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
  public cerrar():void {
    this.modalRef?.hide();
    this.denominacionForm.get('denominacionRazon')?.enable();
    this.domicilioDeElstablecimientoForm?.enable();
  }

  /**
   * Inicializa el FormGroup `denominacionForm` con un único control `denominacionRazon`.
   * El control se rellena previamente con el valor de `solicitudState.denominacionRazon` y se establece como deshabilitado.
   * Este método se utiliza para configurar el formulario y mostrar la denominación o razón en un estado de solo lectura.
   */
  public getDenominacionForm(): void {
    this.denominacionForm = this.fb.group({
      denominacionRazon: [{value: this.solicitudState.denominacionRazon,disabled: true}]
    })
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
      (this.tramite260211Store['setScianTabla'] as (value: unknown) => void)(this.scianTablaDatos);
    });
  }

  /**
   * Obtiene los datos del catálogo de "Clave Datos" desde el servicio y los asigna a la propiedad `claveCatalogo`.
   * 
   * Este método realiza una solicitud HTTP a través del método `certificadosLicenciasSvc.getClaveDatos()` del servicio.
   * Al recibir la respuesta, crea una copia profunda de los datos y asigna la propiedad `data` 
   * de la respuesta a la propiedad `claveCatalogo`.
   * 
   * @returns {void} Este método no retorna un valor.
   */
  public getClaveCatalogDatos():void {
    this.certificadosLicenciasSvc.getClaveDatos().pipe(takeUntil(this.destroyNotifier$)).subscribe((response) => {
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
  public getRegimenCatalogDatos():void {
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
  public seleccionarAgregar(template: TemplateRef<void>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
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
    if(valores === 'forma') {
      this.colapsableObj.formaFarmaceuticaColapsable = !this.colapsableObj.formaFarmaceuticaColapsable;
    } else if(valores === 'PaisDeOrigen') {
      this.colapsableObj.paisDeOrigenColapsable = !this.colapsableObj.paisDeOrigenColapsable;
    } else if(valores === 'usoEspecifico') {
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
  public onFuncionamientoCheckboxCambiar(event: Event): void{
    const VALOR = event.target as HTMLInputElement;
    if(VALOR.checked) {
        this.domicilioDeElstablecimientoForm.get('licenciaSanitaria')?.disable();
    } else {
        this.domicilioDeElstablecimientoForm.get('licenciaSanitaria')?.enable();
    }
    (this.tramite260211Store['setAvisoCheckbox'] as (value: unknown) => void)(VALOR.checked);
  }

  /**
   * Establece el valor de un campo en el store de Tramite260303.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  public setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260303Store): void {
    // Special handling for SCIAN form
    if (campo === 'claveScian' && form === this.scianForm) {
      // Don't auto-set description for SCIAN form - let user select
      const VALOR = form.get(campo)?.value;
      (this.tramite260211Store[metodoNombre] as (value: unknown) => void)(VALOR);
      return;
    }
    
    if (campo === 'licenciaSanitaria' && form.get('licenciaSanitaria')?.value) {
      form.get('avisoCheckbox')?.disable();
    }
    
    const VALOR = form.get(campo)?.value;
    (this.tramite260211Store[metodoNombre] as (value: unknown) => void)(VALOR);
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
        this.denominacionForm?.enable();
        this.domicilioDeElstablecimientoForm?.enable();
        this.representanteLegalForm?.enable();
        this.scianForm?.enable();
        this.mercanciasForm?.enable();
      }
    }

    /** Busca y asigna los datos del representante legal en el formulario si es válido. */
    buscarRepresentanteLegal(): void {
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
    return this.validacionesService.isValid(form, campo);
  }
 /*
  * Lista de filas seleccionadas del componente tabla de SCIAN.
  * Se utiliza para manejar la selección de filas en la tabla de SCIAN.
  */
 selectedRowsScian: any[] = [];

 /*
  * Lista de filas seleccionadas del componente tabla de mercancías.
  * Se utiliza para manejar la selección de filas en la tabla de mercancías.
  */
 selectedRows: any[] = []; 

  /**
   * Maneja el evento de cambio de selección en la tabla de SCIAN.
   * @param selected Lista de filas seleccionadas.
   */
  onSeleccionChangeScian(selected: any[]): void {
    this.selectedRowsScian = selected;
  }

  /**
   * Elimina las filas seleccionadas de la tabla SCIAN
   */
  eliminarSeleccionadosScian(): void {
    this.scianTablaDatos = this.scianTablaDatos.filter(
      (row) => !this.selectedRowsScian.includes(row)
    );
    this.selectedRowsScian = [];
    // Update the store with the new data
    (this.tramite260211Store['setScianTabla'] as (value: unknown) => void)(this.scianTablaDatos);
  }

  /**
   * Limpia el formulario SCIAN y resetea los datos seleccionados
   */
  limpiarFormularioScian(): void {
    this.scianForm.reset();
    this.selectedRowsScian = [];
  }

  /** Lógica para agregar un nuevo elemento a la tabla de SCIAN */
  public scianAgregar(): void {
    if (this.scianForm.valid) {
     
      const CLAVEVALUE = this.scianForm.get('claveScian')?.value;
      const DESCRIPCIONVALUE = this.scianForm.get('descripcion')?.value;

      const DATO: ScianDatos = {
        clave: CLAVEVALUE || '',
        descripcion: DESCRIPCIONVALUE || ''
      };

      
      this.scianTablaDatos = [...this.scianTablaDatos, DATO];
      
      
      (this.tramite260211Store['setScianTabla'] as (value: unknown) => void)(this.scianTablaDatos);
      
      this.modalRef?.hide();
      this.limpiarFormularioScian();
    } else {
     
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
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
