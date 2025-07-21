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
  ConsultaioQuery,
  NotificacionesComponent,
  TableComponent,
  TablePaginationComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { CatalogoSelectComponent,InputRadioComponent,Notificacion } from '@libs/shared/data-access-user/src';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ModificacionSocios,
  TableDataNgTable,
} from '../../models/avisomodify.model';
import { Subject, map, takeUntil } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { CommonModule } from '@angular/common';
import { MESSAGE_NAC } from '../../enums/modificacion-socios.enum';
import { Modal } from 'bootstrap';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
interface PreOperativoIn {
  label: string;
  value: string;
}
@Component({
  selector: 'app-modificacion-socios',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    TableComponent,
    TablePaginationComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputRadioComponent,
    AlertComponent,
    NotificacionesComponent,
  ],
  templateUrl: './modificacion-socios.component.html',
})
export class ModificacionSociosComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // Definición de las columnas de la tabla
  tableColumns: string[] = [];
  declaretableColumns: string[] = [];

  // Datos para las tablas
  mercanciasData: { tbodyData: string[] }[] = [{ tbodyData: [] }];
  declareData: { tbodyData: string[] }[] = [{ tbodyData: [] }];

  // Variables para la paginación de los datos
  totalItems: number = 0;
  itemsPerPage: number = 1;
  currentPage: number = 1;

  // Datos de la sección de miembros revocados
  public seccionMiembrosRevocados: { tbodyData: string[] }[] = [
    { tbodyData: [] },
  ];

  // Datos de los miembros de la empresa
  public gridMiembrosEmpresas: { tbodyData: string[] }[] = [{ tbodyData: [] }];

  // Instancias de los modales para mostrar
  agregarModelInstance!: Modal;

  // Modelo de datos para la modificación de socios
  modificacionSocios!: ModificacionSocios;

  // Opciones para los catálogos de nacionalidad, radio y tipo de miembro
  nacionalidadOptions!: Catalogo[];
  radioOptions!: PreOperativoIn[];
  enSuCaracterDeOptions!: Catalogo[];

  // Referencias a los elementos del DOM de los modales
  @ViewChild('Agregar', { static: false }) agregarMOdel!: ElementRef;

  // Formulario reactivo para agregar miembros
  agregarMiembroDeLaEmpresaFrom!: FormGroup;

  // Mensaje sobre la nacionalidad y tributo en México
  messageNac: string = MESSAGE_NAC;

  // Subject para controlar la destrucción del componente
  private destroy$: Subject<void> = new Subject<void>();
  /**
   * Declaración de la variable raticarNotificacion de tipo Notificacion.
   * Se usa para gestionar notificaciones relacionadas con la ratificación de un proceso.
   */
  public raticarNotificacion!: Notificacion;

  /**
   * Declaración de la variable revocarNotificacion de tipo Notificacion.
   * Se emplea para manejar notificaciones sobre revocaciones dentro del sistema.
   */
  public revocarNotificacion!: Notificacion;

  /**
   * Declaración de la variable correctamenteNotificacion de tipo Notificacion.
   * Se utiliza para almacenar y gestionar notificaciones que indican acciones exitosas.
   */
  public correctamenteNotificacion!: Notificacion;
   /**
  * Indica si el formulario está en modo solo lectura.
  * Cuando es `true`, los campos del formulario no se pueden editar.
  */
  esFormularioSoloLectura: boolean = false; 

  /**
   * Constructor de la clase, donde se inyectan los servicios y almacenes necesarios
   * para la gestión del trámite 32301 y la manipulación de formularios reactivos.
   */
  
  constructor(
    /**
     * Servicio para la creación y gestión de formularios reactivos.
     */
    private fb: FormBuilder,

    /**
     * Servicio para la modificación de avisos dentro del sistema.
     */
    private AvisoModifyService: AvisoModifyService,

    /**
     * Almacén de datos del trámite 32301, utilizado para gestionar la información relevante.
     */
    private store: Tramite32301Store,

    /**
     * Servicio de consultas que permite obtener información relacionada con el trámite 32301.
     */
    private Tramite32301Query: Tramite32301Query,

    private consultaioQuery: ConsultaioQuery,
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
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
        this.inicializarEstadoFormulario();
      })
    )
    .subscribe()
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Se encarga de realizar llamadas a servicios para obtener los datos necesarios.
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
        this.agregarMiembroDeLaEmpresaFrom.disable();
      } else if (!this.esFormularioSoloLectura) {
        this.agregarMiembroDeLaEmpresaFrom.enable();
      }
  }

   /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
 /**
     * Inicializa el formulario para agregar un miembro a la empresa.
     */
    this.initAgregarMiembroDeLaEmpresaForm();

    /**
     * Obtiene la sección de miembros revocados.
     */
    this.getSeccionMiembrosRevocados();

    /**
     * Recupera información sobre el carácter del miembro dentro de la empresa.
     */
    this.getEnSuCaracterDe();

    /**
     * Obtiene información sobre la nacionalidad de los miembros.
     */
    this.getNacionalidad();

    /**
     * Recupera los datos relacionados con el estado preoperativo.
     */
    this.getPreOperativo();

    /**
     * Obtiene la lista de miembros de la empresa para mostrarlos en el grid.
     */
    this.getGridMiembrosEmpresas();
  }

  /**
   * Método para inicializar el formulario de agregación de un miembro a la empresa.
   * Define los controles y validadores necesarios.
   */
  initAgregarMiembroDeLaEmpresaForm(): void {
    this.agregarMiembroDeLaEmpresaFrom = this.fb.group({
      ensucarácterde: [1, Validators.required],
      obligadoaTributarenMéxico: [true, Validators.required],
      nacionalidad: [1, Validators.required],
      registroFederaldeContribuyentes: [
        { value: 'HEJE780514BVA', disabled: true },
        Validators.required,
      ],
      rfc: ['HEJE780514BVA', [Validators.required]],
      nombreCompleto: [
        { value: 'ERNESTO HERNÁNDEZ URI', disabled: true },
        Validators.required,
      ],
    });
  }

  /**
   * Método para actualizar un valor en el store.
   * Se utiliza para modificar datos almacenados dentro de la gestión del trámite.
   *
   * @param form - Formulario reactivo del cual se obtiene el valor.
   * @param campo - Nombre del campo dentro del formulario.
   * @param metodoNombre - Método del store que se encargará de actualizar el valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite32301Store
  ): void {
    /**
     * Obtiene el valor del campo especificado dentro del formulario.
     */
    const VALOR = form.get(campo)?.value;

    /**
     * Asigna el valor obtenido al store, utilizando el método correspondiente.
     */
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método para obtener valores del store relacionados con la modificación de socios.
   * Se suscribe a la consulta y procesa la información para almacenarla en la variable correspondiente.
   */
  getValorStore(): void {
    /**
     * Se suscribe al observable que selecciona la modificación de socios dentro del trámite.
     * La suscripción se mantiene activa hasta que se destruye el componente.
     */
    this.Tramite32301Query.selectModificacionSocios$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        /**
         * Asigna el estado recibido a la variable modificacionSocios,
         * realizando una conversión de tipos para su manipulación.
         */
        this.modificacionSocios = state as unknown as ModificacionSocios;

        /**
         * Obtiene los valores del objeto de modificación de socios
         * y los almacena en un nuevo array.
         */
        const NEW_DATU = Object.values(this.modificacionSocios);

        /**
         * Formatea los datos obtenidos para estructurarlos dentro de un objeto,
         * convirtiendo cada elemento a tipo string.
         */
        const TBODY_DATA = { tbodyData: NEW_DATU.map(String) };

        /**
         * Agrega los datos procesados al arreglo de declaraciones.
         */
        this.declareData.push(TBODY_DATA);
      });

    /**
     * Llama al método para cerrar el modal de agregar miembros.
     */
    this.closeAgregarModal();
  }
  /**
   * Método para obtener las opciones disponibles de "En su carácter de".
   * Realiza una suscripción al servicio correspondiente y almacena la respuesta.
   */
  getEnSuCaracterDe(): void {
    /**
     * Suscripción al servicio que obtiene las opciones de "En su carácter de".
     */
    this.AvisoModifyService.getEnSuCaracterDe()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        /**
         * Asigna la respuesta recibida a la variable enSuCaracterDeOptions,
         * duplicando su contenido para evitar modificaciones inesperadas.
         */
        this.enSuCaracterDeOptions = Object.assign([], resp);
      });
  }

  /**
   * Método para obtener las opciones de nacionalidad disponibles en el sistema.
   * Realiza una suscripción al servicio correspondiente y almacena la respuesta.
   */
  getNacionalidad(): void {
    /**
     * Suscripción al servicio que obtiene las opciones de nacionalidad.
     */
    this.AvisoModifyService.getNacionalidad()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        /**
         * Asigna la respuesta recibida a la variable nacionalidadOptions,
         * duplicando su contenido para evitar modificaciones inesperadas.
         */
        this.nacionalidadOptions = Object.assign([], resp);
      });
  }
  /**
   * Método para obtener las opciones del "Pre Operativo".
   * Realiza una suscripción al servicio correspondiente y almacena la respuesta.
   */
  getPreOperativo(): void {
    /**
     * Suscripción al servicio que obtiene las opciones del estado preoperativo.
     */
    this.AvisoModifyService.getPreOperativo()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        /**
         * Asigna la respuesta recibida a la variable radioOptions,
         * duplicando su contenido para evitar modificaciones inesperadas.
         */
        this.radioOptions = Object.assign([], resp);
      });
  }

  /**
   * Método para obtener los datos de la tabla de miembros de la empresa.
   * Se suscribe al servicio correspondiente y almacena la información recibida.
   */
  getGridMiembrosEmpresas(): void {
    /**
     * Suscripción al servicio que recupera la información de los miembros de la empresa.
     */
    this.AvisoModifyService.getGridMiembrosEmpresas()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: TableDataNgTable) => {
        /**
         * Asigna los encabezados de la tabla a la variable tableColumns.
         */
        this.tableColumns = resp.tableHeader;

        /**
         * Asigna los datos del cuerpo de la tabla a la variable mercanciasData.
         */
        this.mercanciasData = resp.tableBody;
      });
  }

  /**
   * Método para obtener la sección de miembros revocados dentro del sistema.
   * Se suscribe al servicio correspondiente y almacena los datos recibidos.
   */
  getSeccionMiembrosRevocados(): void {
    /**
     * Suscripción al servicio que recupera la información de los miembros revocados.
     */
    this.AvisoModifyService.getSeccionMiembrosRevocados()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: TableDataNgTable) => {
        /**
         * Asigna los encabezados de la tabla a la variable declaretableColumns.
         */
        this.declaretableColumns = resp.tableHeader;
      });
  }

  /**
   * Método para actualizar la paginación de la tabla de miembros de la empresa.
   * Se calcula el índice de inicio y se ajusta el subconjunto de datos que se mostrará.
   */
  updatePagination(): void {
    /**
     * Calcula el índice de inicio basado en la página actual y la cantidad de elementos por página.
     */
    const START_INDEX = (this.currentPage - 1) * this.itemsPerPage;

    /**
     * Obtiene un subconjunto de datos de la tabla de miembros de la empresa,
     * comenzando desde el índice calculado y mostrando únicamente la cantidad de elementos por página.
     */
    this.mercanciasData = this.mercanciasData.slice(
      START_INDEX,
      START_INDEX + this.itemsPerPage
    );
  }

  /**
   * Método para cambiar el número de elementos mostrados por página en la tabla.
   * Se actualiza el valor y se reinicia la paginación.
   *
   * @param itemsPerPage - Número de elementos por página seleccionados.
   */
  onItemsPerPageChange(itemsPerPage: number): void {
    /**
     * Asigna el número de elementos por página a la variable itemsPerPage.
     */
    this.itemsPerPage = itemsPerPage;

    /**
     * Reinicia la paginación, estableciendo la página actual en la primera.
     */
    this.currentPage = 1;

    /**
     * Llama al método para actualizar la paginación de la tabla.
     */
    this.updatePagination();
  }

  /**
   * Método para cambiar la página actual de la tabla.
   * Se actualiza el número de página y se llama a la función de paginación.
   *
   * @param page - Número de la nueva página seleccionada.
   */
  onPageChange(page: number): void {
    /**
     * Asigna el número de página seleccionada a la variable currentPage.
     */
    this.currentPage = page;

    /**
     * Llama al método para actualizar la paginación de la tabla.
     */
    this.updatePagination();
  }

  /**
   * Método que se ejecuta después de que la vista del componente ha sido completamente cargada.
   * Se utiliza para inicializar modales en la interfaz.
   */
  ngAfterViewInit(): void {
    /**
     * Verifica si existe un elemento nativo asociado al modal de agregar.
     */
    if (this.agregarMOdel?.nativeElement) {
      /**
       * Crea una nueva instancia del modal utilizando el elemento DOM asociado.
       */
      this.agregarModelInstance = new Modal(this.agregarMOdel.nativeElement);
    }
  }

  /**
   * Método para abrir el modal de agregar.
   * Verifica si la instancia del modal existe antes de mostrarlo.
   */
  openAgregarModal(): void {
    /**
     * Si la instancia del modal ha sido creada, se procede a mostrarlo.
     */
    if (this.agregarModelInstance) {
      this.agregarModelInstance.show();
    }
  }

  openRaticarModal(): void {
    /** Abre el modal para la acción de "Raticar" si la instancia existe */
    this.raticarNotificacion = {
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
       * Mensaje de la notificación, indicando que Se han ratificado los registros seleccionados.
       */
      mensaje: 'Se han ratificado los registros seleccionados',

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

  openRevocarModal(): void {
    this.revocarNotificacion = {
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
       * Mensaje de la notificación, indicando que Se han revocado los registros seleccionados.
       */
      mensaje: 'Se han revocado los registros seleccionados',

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

  openCorrectamenteModel(): void {
    /** Abre el modal de confirmación si la instancia existe */
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
  closeAgregarModal(): void {
    /** Cierra el modal de "Agregar" y abre el modal de confirmación */
    if (this.agregarModelInstance) {
      this.agregarModelInstance.hide();
      this.openCorrectamenteModel();
    }
  }
  // Método de destrucción del componente para evitar fugas de memoria
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
