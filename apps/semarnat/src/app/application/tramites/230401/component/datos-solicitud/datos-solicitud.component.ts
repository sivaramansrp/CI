import {
  ALERTA_DE_MATERIAL,
  Catalogo,
  CatalogoPaises,
  ConsultaioQuery,
  CrossListLable,
  MaxDigitsValidator,
  Notificacion,
  Pedimento,
  REGEX_SOLO_DIGITOS,
  SeccionLibQuery,
  TablaSeleccion,
  ValidacionesFormularioService,
  
} from '@ng-mf/data-access-user';
import {
  CONFIGURACION_SUSTANCIAS_SENSIBLES,
  CONTINUAR,
  CROSLISTA_DE_PAISES,
  LISTA_DE_ENTRADA_PERSONALIZADA,
} from '../../enum/pantallas-constante.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Solicitud230401State,
  Tramite230401Store,
} from '../../estados/tramite230401.store';
import {
  delay,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import {PantallasActionService } from '../../services/pantallas-action.service';
import { SeccionLibState } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';
import { Solicitud230401Query } from '../../estados/queries/solicitud230401.query';
import { Subject } from 'rxjs';
import { SustanciaSensible } from '../../models/tramies230401.model';

@Component({
  selector: 'app-datos-solicitud',
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent implements OnInit, OnDestroy {

    /**
   * @description
   * Objeto que representa una nueva notificación.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Controla la visibilidad del modal de alerta.
   * @property {boolean} mostrarAlerta
   */
  public mostrarAlerta: boolean = false;

  /**
   * Controla la visibilidad del modal de confirmación para eliminar.
   * @property {boolean} confirmacionAlerta
   */
  public confirmacionAlerta: boolean = false;

  /**
   * @property {boolean} mostrarNotificacion
   * Controla la visibilidad del modal de notificación de eliminación exitosa.
   */
  public mostrarNotificacion: boolean = false;

  /**
   * @description
   * Objeto que representa una notificación para confirmación de eliminación.
   */
  public seleccionarFilaNotificacion: Notificacion = {
    tipoNotificacion: 'alert',
    categoria: 'danger',
    modo: 'action',
    titulo: '',
    mensaje: '¿Estás seguro que deseas eliminar los registros seleccionados?',
    cerrar: true,
    tiempoDeEspera: 2000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: 'Cancelar',
  };

  /**
   * @property {Notificacion} notificacionEliminacionExitosa
   * Configuración para el modal de eliminación exitosa.
   */
  public notificacionEliminacionExitosa: Notificacion = {
    tipoNotificacion: 'alert',
    categoria: 'success',
    modo: 'info',
    titulo: '',
    mensaje: 'El registro fue eliminado correctamente',
    cerrar: true,
    tiempoDeEspera: 3000,
    txtBtnAceptar: 'Aceptar',
    txtBtnCancelar: '',
  };

  /**
   * Representa el formulario reactivo utilizado para capturar y validar los datos de la solicitud.
   * 
   * @type {FormGroup}
   * @remarks
   * Esta propiedad almacena la instancia del formulario principal de la solicitud,
   * permitiendo el manejo de controles, validaciones y estados del formulario en el componente.
   */
  formSolicitud!: FormGroup;
  
  /**
   * Representa el identificador numérico del tipo de solicitud seleccionada por el usuario.
   * 
   * Este valor se utiliza para determinar el flujo o comportamiento específico
   * de la aplicación según el tipo de trámite que el usuario elija.
   * 
   * @type {number}
   */
  tipoSolicitudSeleccionada!: number;
  
/**
 * Lista de países de origen seleccionados por el usuario.
 * 
 * Esta información se utiliza para identificar el/los país(es) desde el cual se origina el producto,
 * y puede ser usada para fines de análisis, validación o cumplimiento normativo.
 *
 * @type {CatalogoPaises[]}
 */
paisesOrigen!: CatalogoPaises[];

/**
 * Lista de países de procedencia seleccionados por el usuario.
 * 
 * Se refiere al país o países desde donde se transporta el producto antes de llegar al destino final.
 * Esta información es esencial para el análisis de rutas y cumplimiento de regulaciones internacionales.
 *
 * @type {CatalogoPaises[]}
 */
paisesProcedencia!: CatalogoPaises[];

/**
 * Lista de aduanas disponibles para la selección por el usuario.
 * 
 * Las aduanas representan los puntos de entrada al país, y su selección puede afectar el proceso de importación
 * o exportación. Estas opciones son cargadas desde un catálogo general.
 *
 * @type {Catalogo[]}
 */
aduanas!: Catalogo[];

/**
 * Lista de secciones aduaneras disponibles asociadas a las aduanas.
 * 
 * Las secciones aduaneras permiten una mayor granularidad en la selección de puntos específicos de revisión
 * o entrada, y están relacionadas jerárquicamente con las aduanas.
 *
 * @type {Catalogo[]}
 */
seccionAduanera!: Catalogo[];

/**
 * Lista de tipos de operación disponibles para el trámite.
 * 
 * Los tipos de operación pueden incluir importación, exportación, tránsito, entre otros.
 * Determinan el tipo de procedimiento que se llevará a cabo en la solicitud.
 *
 * @type {Catalogo[]}
 */
tipoOperacion!: Catalogo[];

/**
 * Constante que contiene una lista cruzada de países, utilizada para mostrar selecciones en interfaces dinámicas.
 * 
 * Sirve como referencia visual para que el usuario seleccione países de una lista doble.
 */
public crosListaDePaises = CROSLISTA_DE_PAISES;

/**
 * Notificador utilizado para liberar suscripciones activas cuando el componente se destruye.
 * 
 * Previene fugas de memoria en el manejo de observables dentro del ciclo de vida del componente.
 *
 * @type {Subject<void>}
 */
private destroyNotifier$: Subject<void> = new Subject();

/**
 * Estado actual de la solicitud, contiene toda la información del formulario y su contexto.
 * 
 * Se utiliza para mantener la coherencia y el seguimiento del proceso de llenado del trámite.
 *
 * @type {Solicitud230401State}
 */
public solicitudState!: Solicitud230401State;

/**
 * Etiqueta configurada para la selección cruzada del país de procedencia.
 * 
 * Contiene los títulos personalizados para mostrar en los componentes de selección múltiple
 * relacionados con la procedencia del producto.
 *
 * @type {CrossListLable}
 */
public paisDeProcedenciaLabel: CrossListLable = {
  tituluDeLaIzquierda: 'País de procedencia:',
  derecha: 'País(es) seleccionado(s)*:',
  showUnoTitulo: false,
  showDosTitulo: false
};
/**
 * Etiqueta configurada para la selección cruzada del país donde se elabora el producto.
 * 
 * Se muestra en los formularios donde se requiere que el usuario indique
 * el país de elaboración del producto.
 *
 * @type {CrossListLable}
 */
public paisDelProductoLabel: CrossListLable = {
  tituluDeLaIzquierda: 'País donde se elabora el producto:',
  derecha: 'País(es) seleccionado(s)*:',
  showUnoTitulo: false,
  showDosTitulo: false
};

/**
 * Etiqueta configurada para la selección cruzada de aduanas de entrada.
 * 
 * Define los textos que se muestran en la UI para ayudar al usuario
 * a seleccionar correctamente las aduanas por donde ingresará el producto.
 *
 * @type {CrossListLable}
 */
public aduanasDeEntradaLabel: CrossListLable = {
  tituluDeLaIzquierda: 'Aduanas de entrada disponibles:',
  derecha: 'Aduanas de entrada seleccionadas*:',
  showUnoTitulo: false,
  showDosTitulo: false
};


  /**
   * Define el tipo de selección que se utilizará en la tabla.
   * En este caso, se utiliza un tipo de selección basado en casillas de verificación (CHECKBOX).
   */
  public tablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de la tabla de sustancias sensibles.
   * 
   * Esta propiedad almacena la configuración utilizada para mostrar y gestionar
   * la tabla de sustancias sensibles en el componente. La configuración se define
   * en la constante `CONFIGURACION_SUSTANCIAS_SENSIBLES`.
   */
  public configuracionSustanciasTabla = CONFIGURACION_SUSTANCIAS_SENSIBLES;

  /**
   * Arreglo que almacena los datos de sustancias sensibles.
   * 
   * Este arreglo contiene objetos de tipo `SustanciaSensible` que representan
   * las sustancias sensibles asociadas a la solicitud. Se utiliza para gestionar
   * y mostrar la información relevante en la tabla de datos correspondiente.
   */
  public sustanciasSensiblesTablaDatos: SustanciaSensible[] = [];

  /**
   * Lista de sustancias sensibles seleccionadas por el usuario.
   * Esta propiedad almacena un arreglo de objetos del tipo `SustanciaSensible`,
   * que representan las sustancias que han sido marcadas como seleccionadas
   * en el contexto de la aplicación.
   */
  public sustanciasSensiblesSeleccionadas: SustanciaSensible[] = [];

  /**
   * Lista de fechas paisDeProcedenciaSeleccionadas.
   */
  paisDeProcedenciaSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas paisDeProcedenciaDatos.
   */
  paisDeProcedenciaDatos: string[] = [];

  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;
  /**crosListaDePaises
   * Control de formulario para la paisDeProcedenciaFecha.
   */
  paisDeProcedenciaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha paisDeProcedenciaFechaSeleccionada.
   */
  paisDeProcedenciaFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregar(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregar(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitar(CONTINUAR),
    },
  ];

  /**
   * Lista de fechas paisDelProductoSeleccionadas.
   */
  paisDelProductoSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas paisDelProductoDatos.
   */
  paisDelProductoDatos: string[] = [];

  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  listaPaisDelProducto: string[] = this.crosListaDePaises;
  /**
   * Control de formulario para la paisDelProductoFecha.
   */
  paisDelProductoFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha paisDelProductoFechaSeleccionada.
   */
  paisDelProductoFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  paisDelProductoBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregarDos(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregarDos(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitarDos(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitarDos(CONTINUAR),
    },
  ];

  /**
   * Lista de fechas aduanasDeEntradaSeleccionadas.
   */
  aduanasDeEntradaSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas aduanasDeEntradaDatos.
   */
  aduanasDeEntradaDatos: string[] = [];

  /**
   * Lista de rangos de días seleccionarOrigenDelPais.
   */
  listaDeEntradaPersonalizada = LISTA_DE_ENTRADA_PERSONALIZADA;
  /**
   * Control de formulario para la aduanasDeEntradaFecha.
   */
  aduanasDeEntradaFecha: FormControl = new FormControl('');

  /**
   * Control de formulario para la fecha aduanasDeEntradaFechaSeleccionada.
   */
  aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');

  /**
   * Botones de acción disponibles para gestionar las listas de fechas.
   */
  aduanasDeEntradaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregarTres(''),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.agregarTres(CONTINUAR),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitarTres(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      funcion: () => this.quitarTres(CONTINUAR),
    },
  ];
  /**
   * Estado de la solicitud de la sección 230401.
   */
  private seccion!: SeccionLibState;

  /**
 * Indica si el formulario está en modo solo lectura.
 * Cuando es `true`, los campos del formulario no se pueden editar.
 */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor de la clase DatosSolicitudComponent.
   * 
   * @param pantallasActionService - Servicio para manejar acciones relacionadas con las pantallas.
   * @param validacionesService - Servicio para realizar validaciones en los formularios.
   * @param tramite230401Store - Almacén para gestionar el estado del trámite 230401.
   * @param fb - Constructor para crear instancias de formularios reactivos.
   * @param solicitud230401Query - Consulta para obtener datos relacionados con la solicitud 230401.
   * @param consultaQuery - Consulta para manejar datos relacionados con consultas generales.
   * @param seccionQuery - Consulta para manejar datos relacionados con secciones.
   * @param seccionStore - Almacén para gestionar el estado de las secciones.
   * 
   * Este constructor inicializa los datos de catálogos necesarios para el paso uno
   * utilizando el servicio `pantallasActionService`.
   */
  constructor(public pantallasActionService: PantallasActionService,
    public validacionesService: ValidacionesFormularioService,
    public tramite230401Store: Tramite230401Store,
    public fb: FormBuilder,
    public solicitud230401Query: Solicitud230401Query,
    private consultaQuery: ConsultaioQuery,
    private seccionQuery: SeccionLibQuery,
    private seccionStore: SeccionLibStore) {
    this.pantallasActionService.inicializaPasoUnoDatosCatalogos();
  }

  ngOnInit(): void {

    this.solicitud230401Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
          this.sustanciasSensiblesTablaDatos = seccionState.sustanciasSensiblesTablaDatos;
        })
      ).subscribe();

      this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if(!seccionState.create && seccionState.procedureId === '230401') {
            this.esFormularioSoloLectura = seccionState.readonly;
          }
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccion = seccionState;
        })
      )
      .subscribe();

    this.formSolicitud.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          const SECCION: number = 1;
          const FORMAS_VALIDADAS = this.seccion.formaValida;
          const ES_VALIDO_EL_FORM = this.esFormValido();
          if (this.formSolicitud.valid || (ES_VALIDO_EL_FORM)) {
            FORMAS_VALIDADAS[SECCION] = true;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          } else {
            FORMAS_VALIDADAS[SECCION] = false;
            this.seccionStore.establecerFormaValida(FORMAS_VALIDADAS);
          }
        })
      )
      .subscribe();
  }


    /**
     * Inicializa el estado del formulario `formSolicitud`.
     *
     * - Si el formulario no ha sido creado, lo inicializa llamando a `creatformSolicitud()`.
     * - Si el formulario está configurado como solo lectura (`esFormularioSoloLectura`), lo deshabilita para evitar modificaciones.
     * - Si no está en modo solo lectura, habilita el formulario para permitir la edición.
     *
     * @remarks
     * Este método debe llamarse durante la inicialización del componente para asegurar que el formulario tenga el estado correcto según el contexto de uso.
     */
     inicializarEstadoFormulario(): void {
      if(!this.formSolicitud){
        this.creatformSolicitud();
      }
      if (this.esFormularioSoloLectura) {
          this.formSolicitud?.disable();
      } else {
        this.formSolicitud?.enable();
      }
    }
    
  /**
   * Verifica si el formulario es válido.
   * 
   * Recorre todos los controles del formulario y verifica si alguno de ellos
   * está habilitado e inválido. Si encuentra un control que cumple con estas
   * condiciones, retorna `false`. Si todos los controles habilitados son válidos,
   * retorna `true`.
   * 
   * @returns {boolean} `true` si todos los controles habilitados son válidos, 
   *                    `false` si al menos uno de los controles habilitados es inválido.
   */
  esFormValido(): boolean {
    for(const NOMBRE_DEL_CONTROL in this.formSolicitud.controls) {
      if(!NOMBRE_DEL_CONTROL){
        continue;
      }
      const CONTROL = this.formSolicitud.get(NOMBRE_DEL_CONTROL);
      if (CONTROL && CONTROL.enabled && CONTROL.invalid) {
        return false;
      }
    }
    return true;
  }

  /**
   * Una constante que contiene el valor del objeto 'PROTESTA'.
   * Se utiliza para almacenar datos adicionales relacionados con el componente.
   */

  TEXTOS = ALERTA_DE_MATERIAL;
  /**
   *
   * Una cadena que representa la clase CSS para una alerta de información.
   * Esta clase se utiliza para aplicar estilo a los mensajes de información en el componente.
   */
  public infoAlert = 'alert-info';

  /**
   * Verifica si un campo específico en un formulario es válido.
   *
   * @param {FormGroup} form - El formulario que contiene el campo a validar.
   * @param {string} field - El nombre del campo a validar.
   * @returns {boolean} - Retorna `true` si el campo es válido, de lo contrario `false`.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isValid(form: FormGroup, field: string): any {
    return this.validacionesService.isValid(form, field);
  }
  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregar(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.paisDeProcedenciaSeleccionadas = [...this.seleccionarOrigenDelPais];
      this.paisDeProcedenciaDatos = [];
    } else {
      const FECHAVALOR = this.paisDeProcedenciaFecha.value.map(Number);
      this.paisDeProcedenciaSeleccionadas.push(
        this.paisDeProcedenciaDatos[FECHAVALOR]
      );
      this.paisDeProcedenciaDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitar(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.paisDeProcedenciaDatos = [...this.paisDeProcedenciaSeleccionadas];
      this.paisDeProcedenciaSeleccionadas = [];
    } else {
      const FECHAVALOR =
        this.paisDeProcedenciaFechaSeleccionada.value.map(Number);
      this.paisDeProcedenciaDatos.push(
        this.paisDeProcedenciaSeleccionadas[FECHAVALOR]
      );
      this.paisDeProcedenciaSeleccionadas.splice(FECHAVALOR, 1);
    }
  }
  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregarDos(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.paisDelProductoSeleccionadas = [...this.listaPaisDelProducto];
      this.paisDelProductoDatos = [];
    } else {
      const FECHAVALOR = this.paisDelProductoFecha.value?.map(Number);
      this.paisDelProductoSeleccionadas.push(
        this.paisDelProductoDatos[FECHAVALOR]
      );
      this.paisDelProductoDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitarDos(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.paisDelProductoDatos = [...this.paisDelProductoSeleccionadas];
      this.paisDelProductoSeleccionadas = [];
    } else {
      const FECHAVALOR =
        this.paisDeProcedenciaFechaSeleccionada.value?.map(Number);
      this.paisDelProductoDatos.push(
        this.paisDelProductoSeleccionadas[FECHAVALOR]
      );
      this.paisDelProductoSeleccionadas.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Agrega elementos a la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  agregarTres(tipo: string): void {
    if (tipo === CONTINUAR) {
      this.aduanasDeEntradaSeleccionadas = [...this.seleccionarOrigenDelPais];
      this.aduanasDeEntradaDatos = [];
    } else {
      const FECHAVALOR = this.aduanasDeEntradaFecha.value.map(Number);
      this.aduanasDeEntradaSeleccionadas.push(
        this.aduanasDeEntradaDatos[FECHAVALOR]
      );
      this.aduanasDeEntradaDatos.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Elimina elementos de la lista de fechas según el tipo especificado.
   * @param {string} tipo - Tipo de acción a realizar.
   */
  quitarTres(tipo: string = ''): void {
    if (tipo === CONTINUAR) {
      this.aduanasDeEntradaDatos = [...this.aduanasDeEntradaSeleccionadas];
      this.aduanasDeEntradaSeleccionadas = [];
    } else {
      const FECHAVALOR =
        this.aduanasDeEntradaFechaSeleccionada.value.map(Number);
      this.aduanasDeEntradaDatos.push(
        this.aduanasDeEntradaSeleccionadas[FECHAVALOR]
      );
      this.aduanasDeEntradaSeleccionadas.splice(FECHAVALOR, 1);
    }
  }

  /**
   * Establece los valores en el store de tramite5701.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a pantallas con el valor del campo.
   * @returns {void}
   */
  setValoresStore(form: FormGroup, campo: string): void {
    const VALRO = form.get(campo)?.value;
    if (campo === 'cantidad' && VALRO !== null && VALRO !== undefined) {
      const NUMERO_ACTIVO = String(VALRO);
      this.tramite230401Store.setCantidad(NUMERO_ACTIVO);
    }
  }

  /**
   * Selecciona el tipo de solicitud y actualiza el estado correspondiente.
   *
   * Este método obtiene el valor del tipo de solicitud del formulario,
   * lo convierte a un número entero y lo asigna a la propiedad
   * `tipoSolicitudSeleccionada`. Luego, actualiza el estado del
   * `tramite230401Store` con el tipo de solicitud seleccionado.
   */
  tipoSolicitudSeleccion(): void {
    this.tipoSolicitudSeleccionada = parseInt(
      this.formSolicitud.get('tipoSolicitud')?.value,
      10
    );
    const TIPO_SOLICITUD = this.formSolicitud.get('tipoSolicitud')?.value;
    if (TIPO_SOLICITUD) {
      this.tramite230401Store.setTipoSolicitud(TIPO_SOLICITUD);
    }
  }


  /**
   * Maneja la selección del número de permiso coferprise en el formulario.
   *
   * Obtiene el valor actual del campo 'noDePermisocoferprise' desde el formulario
   * `formSolicitud` y lo establece en el store `tramite230401Store` mediante el método
   * `setNoDePermisocoferprise`. Este método se utiliza para mantener sincronizado el valor
   * del permiso coferprise seleccionado entre el formulario y el estado global de la aplicación.
   */
  noDePermisocoferpriseSeleccion(): void {
    const NO_DE_PERMISOCOFERPRISE = this.formSolicitud.get(
      'noDePermisocoferprise'
    )?.value;
    this.tramite230401Store.setNoDePermisocoferprise(NO_DE_PERMISOCOFERPRISE);
  }


  /**
   * Maneja la selección de la fracción arancelaria en el formulario.
   *
   * Obtiene el valor actual del campo 'fraccionArancelaria' del formulario,
   * construye una descripción basada en ese valor y actualiza el campo
   * 'descripcionDeLaFraccion' en el formulario. Además, actualiza el estado
   * global del store con la nueva descripción y la fracción arancelaria seleccionada.
   *
   * @remarks
   * Este método se utiliza cuando el usuario selecciona o modifica la fracción arancelaria,
   * asegurando que la descripción correspondiente se actualice automáticamente tanto en el
   * formulario como en el store de la aplicación.
   */
  fraccionArancelariaSeleccion(): void {
    const FRACCION_ARANCELARIA = this.formSolicitud.get(
      'fraccionArancelaria'
    )?.value;
    const DESCRIPCION_DE_LA_FRACCION = `Descripción de la fracción arancelaria ${this.formSolicitud.get('fraccionArancelaria')?.value}`;
    this.formSolicitud.patchValue({
      descripcionDeLaFraccion: DESCRIPCION_DE_LA_FRACCION,
    })
    this.tramite230401Store.setDescripcionDeLaFraccion(DESCRIPCION_DE_LA_FRACCION);
    this.tramite230401Store.setFraccionArancelaria(FRACCION_ARANCELARIA);
  }

  

  /**
   * Selecciona la autorización ingresada en el formulario y la almacena en el estado global.
   *
   * Obtiene el valor actual del campo 'autorizacion' del formulario `formSolicitud`
   * y lo envía al store `tramite230401Store` mediante el método `setAutorizacion`.
   *
   * @remarks
   * Este método se utiliza para actualizar el estado de la autorización seleccionada
   * por el usuario en el flujo del trámite 230401.
   */
  seleccioneAutorizacion(): void {
    const AUTORIZACION = this.formSolicitud.get('autorizacion')?.value;
    this.tramite230401Store.setAutorizacion(AUTORIZACION);
  }

  /**
   * Actualiza los campos relacionados con el número CAS en el formulario y en el store.
   *
   * Este método obtiene el valor actual del campo 'numeroCas' del formulario,
   * genera las descripciones correspondientes para los campos 'descripcionNoArancelaria'
   * y 'nombreQuimico', y actualiza dichos campos en el formulario. Además, sincroniza
   * estos valores en el store correspondiente para mantener la consistencia de los datos.
   *
   * @remarks
   * - El valor de 'numeroCas' se utiliza para construir los textos de los campos dependientes.
   * - Los métodos del store se llaman para actualizar el estado global de la aplicación.
   *
   * @returns {void} No retorna ningún valor.
   */
  numeroCasSeleccione(): void {
    const NUMERO_CAS = this.formSolicitud.get('numeroCas')?.value;
    const DESCRIPCION_NO_ARANCELARIA = `Descripción no arancelaria ${this.formSolicitud.get('numeroCas')?.value}`;
    const NOMBRE_QUIMICO = `Nombre químico ${this.formSolicitud.get('numeroCas')?.value}`;
    this.formSolicitud.patchValue({
      descripcionNoArancelaria: DESCRIPCION_NO_ARANCELARIA,
      nombreQuimico: NOMBRE_QUIMICO,
    })
    this.tramite230401Store.setDescripcionNoArancelaria(DESCRIPCION_NO_ARANCELARIA);
    this.tramite230401Store.setNombreQuimico(NOMBRE_QUIMICO);
    this.tramite230401Store.setNumeroCas(NUMERO_CAS);
  }


  /**
   * Maneja el evento de selección de clasificación en el formulario de solicitud.
   *
   * Obtiene el valor actual del campo 'clasificacion' del formulario `formSolicitud`
   * y lo establece en el store `tramite230401Store` mediante el método `setClasificacion`.
   *
   * @remarks
   * Este método se utiliza para actualizar el estado global de la clasificación seleccionada
   * cada vez que el usuario realiza un cambio en el campo correspondiente del formulario.
   */
  clasificacionSeleccione(): void {
    const CLASIFICACION = this.formSolicitud.get('clasificacion')?.value;
    this.tramite230401Store.setClasificacion(CLASIFICACION);
  }


  /**
   * Maneja la selección del estado físico en el formulario de solicitud.
   *
   * Obtiene el valor actual del campo 'estadoFisico' del formulario y lo establece
   * en el store correspondiente a través del método `setEstadoFisico` del store `tramite230401Store`.
   *
   * @remarks
   * Este método se utiliza para sincronizar el valor seleccionado en el formulario
   * con el estado global de la aplicación, asegurando que cualquier cambio en la selección
   * se refleje correctamente en el store.
   */
  estadoFisicoSeleccione(): void {
    const ESTADO_FISICO = this.formSolicitud.get('estadoFisico')?.value;
    this.tramite230401Store.setEstadoFisico(ESTADO_FISICO);
  }


/**
 * Extrae el valor del grupo de controles 'datosObjecto' del formulario principal
 * y lo envía al estado global a través del store.
 * 
 * Este método se utiliza para mantener sincronizados los datos ingresados por el usuario
 * con el estado de la solicitud en el store correspondiente, asegurando persistencia y reactividad.
 *
 * @returns {void}
 */
datosObjectoSeleccione(): void {
  const DAT_OS_OBJECTO = this.formSolicitud.get('datosObjecto')?.value;
  this.tramite230401Store.setDatosObjecto(DAT_OS_OBJECTO);
}



  /**
   * Método que maneja la selección de la unidad de medida en el formulario de solicitud.
   * Obtiene el valor actual del campo 'unidadDeMedida' del formulario y lo establece 
   * en el estado de la tienda correspondiente al trámite 230401.
   *
   * @returns {void} No devuelve ningún valor.
   */
  unidadDeMedidaSeleccione(): void {
    const UNIDAD_DE_MEDIDA = this.formSolicitud.get('unidadDeMedida')?.value;
    this.tramite230401Store.setUnidadDeMedida(UNIDAD_DE_MEDIDA);
  }


/**
 * Crea y configura el formulario principal de la solicitud.
 * 
 * Este formulario agrupa todos los controles necesarios para capturar los datos requeridos
 * en el trámite 230401, utilizando validaciones específicas para garantizar la integridad
 * de los datos ingresados por el usuario.
 * 
 * Algunos campos se inicializan como deshabilitados debido a que su contenido es solo de lectura
 * y proviene del estado actual de la solicitud. Las validaciones incluyen requisitos como longitud
 * máxima, valores obligatorios y patrones definidos.
 *
 * @returns {void}
 */
creatformSolicitud(): void {
  this.formSolicitud = this.fb.group({
    tipoSolicitud: [
      this.solicitudState?.tipoSolicitud,
      [Validators.required],
    ],
    autorizacion: [this.solicitudState?.autorizada],
    noDePermisocoferprise: [
      this.solicitudState?.noDePermisocoferprise,
      [Validators.required],
    ],
    nombreComercial: [
      { value: this.solicitudState?.nombreComercial, disabled: true },
    ],
    cantidadAutorizada: [
      { value: this.solicitudState?.cantidadAutorizada, disabled: true },
    ],
    fraccionArancelaria: [
      this.solicitudState?.fraccionArancelaria,
      [Validators.required],
    ],
    descripcionDeLaFraccion: [
      { value: this.solicitudState?.descripcionDeLaFraccion, disabled: true },
    ],
    descripcionNoArancelaria: [
      {
        value: this.solicitudState?.descripcionNoArancelaria,
        disabled: true,
      },
    ],
    nombreQuimico: [
      { value: this.solicitudState?.nombreQuimico, disabled: true },
    ],
    numeroCas: [this.solicitudState?.numeroCas, [Validators.required]],
    nombreDeLaMercancia: [
      this.solicitudState?.nombreDeLaMercancia,
      [Validators.maxLength(50)],
    ],
    unNumero: [
      this.solicitudState?.unNumero,
      [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_SOLO_DIGITOS)],
    ],
    datosNombreComercial: [
      this.solicitudState?.datosNombreComercial,
      [Validators.maxLength(50)],
    ],
    datosNumeroComun: [
      this.solicitudState?.datosNumeroComun,
      [Validators.maxLength(50)],
    ],
    datosPorcentaje: [
      this.solicitudState?.datosPorcentaje,
      [Validators.required, Validators.maxLength(100)],
    ],
    datosComponentes: [
      this.solicitudState?.datosComponentes,
      [Validators.required, Validators.maxLength(250)],
    ],
    clasificacion: [
      this.solicitudState?.clasificacion,
      [Validators.required],
    ],
    estadoFisico: [this.solicitudState?.estadoFisico, [Validators.required]],
    datosObjecto: [this.solicitudState?.datosObjecto, [Validators.required]],
    especifique: [
      this.solicitudState?.especifique,
      [Validators.maxLength(200)],
    ],
    especifiqueDos: [
      this.solicitudState?.especifiqueDos,
      [Validators.maxLength(250)],
    ],
    cantidad: [
      this.solicitudState?.cantidad,
      [Validators.required, Validators.min(1), Validators.max(999999999999.999), MaxDigitsValidator()],
    ],
    cantidadLetra: [
      this.solicitudState?.cantidadLetra || '', 
      [Validators.required] // Add required validator
    ], // Remove the disabled state
    unidadDeMedida: [
      this.solicitudState?.unidadDeMedida,
      [Validators.required],
    ],
  });
}

  /**
   * Modifica una sustancia sensible seleccionada en la lista de datos.
   * 
   * Este método permite al usuario modificar los datos de una sustancia sensible
   * que ya existe en la tabla. Primero verifica que haya exactamente una sustancia
   * seleccionada, luego carga sus datos en el formulario para su edición.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  modificarListaDeNumeros(): void {
    if (this.sustanciasSensiblesSeleccionadas.length === 0) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'info',
        titulo: 'Advertencia',
        mensaje: 'Debe seleccionar una sustancia para modificar.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
      this.mostrarAlerta = true;
      return;
    }

    if (this.sustanciasSensiblesSeleccionadas.length > 1) {
      this.nuevaNotificacion = {
        tipoNotificacion: 'alert',
        categoria: 'warning',
        modo: 'info',
        titulo: 'Advertencia',
        mensaje: 'Solo puede modificar una sustancia a la vez. Seleccione únicamente un registro.',
        cerrar: true,
        tiempoDeEspera: 3000,
        txtBtnAceptar: 'Aceptar',
        txtBtnCancelar: 'Cancelar',
      };
      this.mostrarAlerta = true;
      return;
    }

    // Cargar los datos de la sustancia seleccionada en el formulario
    const SUSTANCIA_SELECCIONADA = this.sustanciasSensiblesSeleccionadas[0];
    this.formSolicitud.patchValue({
      numeroCas: SUSTANCIA_SELECCIONADA.numeroCAS,
      descripcionNoArancelaria: SUSTANCIA_SELECCIONADA.descripcionNoArancelaria,
      nombreQuimico: SUSTANCIA_SELECCIONADA.nombreQuimico
    });

    // Opcional: Marcar que se está modificando un registro existente
    // Esto puede ser útil para cambiar el comportamiento del botón "Agregar"
    this.modoModificacion = true;
    this.sustanciaEnModificacion = SUSTANCIA_SELECCIONADA;
  }

  /**
   * Indica si el componente está en modo modificación de una sustancia existente.
   */
  private modoModificacion: boolean = false;

  /**
   * Sustancia que está siendo modificada actualmente.
   */
  private sustanciaEnModificacion: SustanciaSensible | null = null;

  /**
   * Agrega una sustancia sensible a la lista de datos en la tabla.
   * 
   * Este método crea un objeto `SustanciaSensible` con los valores del formulario
   * y lo agrega a la lista de sustancias sensibles. Si el número CAS ya existe en
   * la lista, se actualiza el elemento existente. Luego, se actualiza el estado
   * del store `tramite230401Store` con la nueva lista de sustancias sensibles.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  agregarListaDeNumeros(): void {
    const SUSTANCIA_SENSIBLE: SustanciaSensible = {
      numeroCAS: this.formSolicitud.get('numeroCas')?.value,
      cas: '',
      descripcionNoArancelaria: this.formSolicitud.get('descripcionNoArancelaria')?.value || `Descripción no arancelaria ${this.formSolicitud.get('numeroCas')?.value}`,
      nombreQuimico: this.formSolicitud.get('nombreQuimico')?.value || `Nombre químico ${this.formSolicitud.get('numeroCas')?.value}`,
    };

    const UPDATED_SUSTANCIAS_SENSIBLES_TABLA_DATOS = [...this.sustanciasSensiblesTablaDatos];

    if (this.modoModificacion && this.sustanciaEnModificacion) {
      // Actualizar la sustancia existente
      const EXISTING_INDEX = UPDATED_SUSTANCIAS_SENSIBLES_TABLA_DATOS.findIndex(
        (item) => item.numeroCAS === this.sustanciaEnModificacion?.numeroCAS
      );
      
      if (EXISTING_INDEX !== -1) {
        UPDATED_SUSTANCIAS_SENSIBLES_TABLA_DATOS[EXISTING_INDEX] = SUSTANCIA_SENSIBLE;
      }
      
      // Resetear modo modificación
      this.modoModificacion = false;
      this.sustanciaEnModificacion = null;
    } else {
      // Agregar nueva sustancia o actualizar si ya existe
      const EXISTING_INDEX = UPDATED_SUSTANCIAS_SENSIBLES_TABLA_DATOS.findIndex(
        (item) => item.numeroCAS === SUSTANCIA_SENSIBLE.numeroCAS
      );

      if (EXISTING_INDEX !== -1) {
        UPDATED_SUSTANCIAS_SENSIBLES_TABLA_DATOS[EXISTING_INDEX] = SUSTANCIA_SENSIBLE;
      } else {
        UPDATED_SUSTANCIAS_SENSIBLES_TABLA_DATOS.push(SUSTANCIA_SENSIBLE);
      }
    }

    // Actualizar el store con la nueva lista
    this.tramite230401Store.setSustanciasSensiblesTablaDatos(UPDATED_SUSTANCIAS_SENSIBLES_TABLA_DATOS);

    // Limpiar el formulario
    this.formSolicitud.patchValue({
      numeroCas: '',
      descripcionNoArancelaria: '',
      nombreQuimico: ''
    });

    // Limpiar selecciones
    this.sustanciasSensiblesSeleccionadas = [];
  }

  /**
   * Elimina una sustancia sensible de la lista de datos en la tabla.
   * 
   * Este método filtra la lista de sustancias sensibles en la tabla, eliminando
   * aquellas que coinciden con los números CAS seleccionados. Luego, actualiza el
   * estado del store `tramite230401Store` con la lista filtrada y limpia la lista
   * de sustancias sensibles seleccionadas.
   * 
   * @returns {void} Este método no retorna ningún valor.
   */
  eliminarListaDeNumeros(): void {
    if (this.sustanciasSensiblesSeleccionadas.length === 0) {
      return;
    }
    const LISTA_FILTRADA = this.sustanciasSensiblesTablaDatos.filter((elemento) => {
      return !this.sustanciasSensiblesSeleccionadas.some((elementoSeleccionado) => elementoSeleccionado.numeroCAS === elemento.numeroCAS);
    });
    if (LISTA_FILTRADA) {
      this.tramite230401Store.update((state) => ({
        ...state,
        sustanciasSensiblesTablaDatos: LISTA_FILTRADA,
      }));
      this.sustanciasSensiblesSeleccionadas = [];
    }
  }

  /**
   * Confirma la eliminación de un pedimento.
   *
   * @param borrar Indica si se debe proceder con la eliminación.
   */
  eliminarPedimentoConfirmacion(borrar: boolean): void {
    if (borrar) {
      // Remove the problematic code that was causing errors
      // Just handle the elimination logic for pedimentos if needed
    }
    this.confirmacionAlerta = false;
    if (borrar && this.pedimentos.length > 0) {
      this.pedimentos.splice(this.elementoParaEliminar, 1);
    }
  }
/**
   * @description
   * Arreglo que almacena los pedimentos asociados al establecimiento.
   * Cada pedimento contiene información relevante para el trámite.
   */
  pedimentos: Array<Pedimento> = [];

   /**
   * @description
   * Variable que almacena el índice del elemento que se desea eliminar de la lista de pedimentos.
   * Utilizada para realizar operaciones de eliminación en el arreglo `pedimentos`.
   */
  elementoParaEliminar!: number;
  

   /**
   * Método que maneja la lógica para mostrar un modal de confirmación
   * antes de eliminar registros marcados. Si no hay elementos en la lista
   * `scianLista`, muestra una alerta y detiene la ejecución.
   *
   * @remarks
   * Este método configura una notificación de tipo alerta con un mensaje
   * de confirmación para la eliminación de registros. La notificación incluye
   * opciones para aceptar o cancelar la acción.
   *
   * @returns {void} No retorna ningún valor.
   */
  eliminarModal(): void {
    if (!this.sustanciasSensiblesSeleccionadas.length) {
      this.mostrarAlerta = true;
      return;
    }
    this.seleccionarFilaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro que deseas eliminar los registros seleccionados?',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
    this.confirmacionAlerta = true;
  }

  /**
   * Maneja la confirmación de eliminación de sustancias sensibles.
   *
   * @param borrar Indica si el usuario confirmó la eliminación (`true`) o la canceló (`false`).
   *
   * ### Descripción:
   * - Si `borrar` es `true`:
   *   - Llama al método `eliminarListaDeNumeros` para eliminar las sustancias seleccionadas.
   *   - Muestra el modal de eliminación exitosa.
   * - Si `borrar` es `false`: Solo cierra el modal de confirmación.
   * - Independientemente de la acción, desactiva la alerta de confirmación (`confirmacionAlerta = false`).
   *
   * ### Ejemplo de uso:
   * ```ts
   * confirmarEliminacionSustancias(true); // Elimina las sustancias y muestra confirmación
   * confirmarEliminacionSustancias(false); // Cancela la eliminación
   * ```
   */
  confirmarEliminacionSustancias(borrar: boolean): void {
    this.confirmacionAlerta = false;
    
    if (borrar) {
      this.eliminarListaDeNumeros();
      // Mostrar el modal de eliminación exitosa
      this.mostrarNotificacion = true;
    }
  }

    /**
   * Busca el RFC del representante en el formulario y, si existe,
   * actualiza los campos relacionados con el nombre, apellido paterno
   * y apellido materno del representante con valores predeterminados.
   *
   * @remarks
   * Este método verifica si el campo 'representanteRfc' tiene un valor
   * en el formulario `datosSolicitudForm`. Si el valor está presente,
   * se actualizan los campos 'representanteNombre', 'apellidoPaterno'
   * y 'apellidoMaterno' con datos específicos.
   */
buscarRepresentanteRfc(): void {
  const CANTIDAD = this.formSolicitud.get('cantidad')?.value;

  if (CANTIDAD) {
    const CANTIDAD_NUMERICA = parseFloat(CANTIDAD);
    const CONTROL_CANTIDAD_LETRA = this.formSolicitud.get('cantidadLetra');
    
    if (CANTIDAD_NUMERICA && CANTIDAD_NUMERICA > 400) {
      // If quantity is greater than 400, make cantidadLetra required and enable it
      CONTROL_CANTIDAD_LETRA?.enable({ emitEvent: false });
      CONTROL_CANTIDAD_LETRA?.setValue('', { emitEvent: false });
      CONTROL_CANTIDAD_LETRA?.setValidators([Validators.required]);
      CONTROL_CANTIDAD_LETRA?.updateValueAndValidity();
    } else {
      // If quantity is 400 or less, disable cantidadLetra and remove required validation
      CONTROL_CANTIDAD_LETRA?.setValue('EUROFOODS DE MEXICO', { emitEvent: false });
      CONTROL_CANTIDAD_LETRA?.disable({ emitEvent: false });
      CONTROL_CANTIDAD_LETRA?.clearValidators();
      CONTROL_CANTIDAD_LETRA?.updateValueAndValidity();
    }
  }
}

/**
 * Cierra el modal de notificación de eliminación exitosa.
 *
 * @param _evento - Evento del modal (no utilizado en este caso)
 */
  cerrarNotificacionEliminacion(_evento: boolean): void {
    this.mostrarNotificacion = false;
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
 * Checks if the quantity is less than or equal to 400
 * @returns boolean indicating if quantity is <= 400
 */
isCantidadMenorOIgualA400(): boolean {
  const cantidad = this.formSolicitud.get('cantidad')?.value;
  if (cantidad) {
    const cantidadNumerica = parseFloat(cantidad);
    return !isNaN(cantidadNumerica) && cantidadNumerica <= 400;
  }
  return false;
}

/**
 * Checks if the quantity is greater than 400
 * @returns boolean indicating if quantity is > 400
 */
isCantidadMayorA400(): boolean {
  const cantidad = this.formSolicitud.get('cantidad')?.value;
  if (cantidad) {
    const cantidadNumerica = parseFloat(cantidad);
    return !isNaN(cantidadNumerica) && cantidadNumerica > 400;
  }
  return false;
}
}