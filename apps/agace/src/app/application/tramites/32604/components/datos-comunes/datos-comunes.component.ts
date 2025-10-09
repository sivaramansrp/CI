/**
 * Componente de datos comunes utilizado en el trámite 32604 para la gestión de información empresarial.
 *
 * Este archivo contiene el componente principal que maneja los datos comunes de la solicitud 32604,
 * incluyendo la configuración de formularios, gestión de estados, manejo de catálogos,
 * y la interacción con modales para agregar información de empresa, subcontratados e instalaciones.
 */

import { CommonModule } from '@angular/common';

import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

import { ToastrModule, ToastrService } from 'ngx-toastr';

import { Subject, map, takeUntil } from 'rxjs';

import { ConsultaioQuery } from '@ng-mf/data-access-user';

import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  ConfiguracionAporteColumna,
  ConfiguracionColumna,
  InputRadioComponent,
  Notificacion,
  NotificacionesComponent,
  Pedimento,
  TablaConEntradaComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent
} from '@libs/shared/data-access-user/src';

import {
  DOMICILIOS_CONFIGURACION_COLUMNAS,
  INVENTARIOS_CONFIGURACION,
  NUMERO_DE_EMPLEADOS_CONFIGURACION,
  SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS
} from '../../constants/empresas-comercializadoras.enum';

import { Instalaciones } from '../../constants/agregar.model';

import {
  Domicilios,
  InputRadio,
  Inventarios,
  NumeroDeEmpleados,
  SeccionSociosIC,
  SolicitudCatologoSelectLista,
  SolicitudRadioLista
} from '../../models/empresas-comercializadoras.model';

import { Solicitud32604Query } from '../../estados/solicitud32604.query';

import { Solicitud32604State, Solicitud32604Store } from '../../estados/solicitud32604.store';

import { CatalogoInicializacionService } from '../../services/catalogo-inicializacion.servicio';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';

import { AgregarComponent } from '../agregar/agregar.component';
import { EmpresaComponent } from '../empresa/empresa.component';
import { ModificarComponent } from '../modificar/modificar.component';

/**
 * Componente principal para la gestión de datos comunes de la solicitud 32604.
 * 
 * Este componente se encarga de mostrar y gestionar las secciones relacionadas
 * con miembros de la empresa, subcontratados, instalaciones principales y otros
 * datos necesarios en el flujo de la solicitud. Proporciona funcionalidades para
 * capturar, validar y almacenar información empresarial mediante formularios
 * reactivos y modales interactivos.
 * 
 * @component
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-datos-comunes',
  standalone: true,
  imports: [
    AgregarComponent,
    CommonModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    InputRadioComponent,
    TituloComponent,
    TablaDinamicaComponent,
    TablaConEntradaComponent,
    ToastrModule,
    ModificarComponent,
    EmpresaComponent,
    NotificacionesComponent
  ],
  providers: [EmpresasComercializadorasService, ToastrService],
  templateUrl: './datos-comunes.component.html',
  styleUrl: './datos-comunes.component.scss',
})
/**
 * Componente principal para la gestión de datos comunes de la solicitud.
 * Este componente se encarga de mostrar y gestionar las secciones relacionadas
 * con miembros de la empresa, subcontratados, instalaciones principales y otros
 * datos necesarios en el flujo de la solicitud.
 */
export class DatosComunesComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal que contiene los datos comunes del componente.
   * 
   * Este formulario reactivo gestiona todos los campos de entrada del usuario
   * y mantiene sincronización con el estado global de la aplicación.
   * 
   * @property {FormGroup} datosComunesForm
   */
  datosComunesForm!: FormGroup;

  /**
   * Subject para manejar la destrucción del componente y evitar fugas de memoria.
   * 
   * Se utiliza con el operador `takeUntil` para cancelar automáticamente
   * todas las suscripciones activas cuando el componente se destruye.
   * 
   * @private
   * @property {Subject<void>} destroy$
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Modelo para la opción de tipo sí/no representado como radio button.
   * 
   * Contiene las opciones disponibles para campos de selección binaria
   * utilizados en diferentes secciones del formulario.
   * 
   * @property {InputRadio} sinoOpcion
   */
  sinoOpcion: InputRadio = {} as InputRadio;

  /**
   * Catálogo para el sector productivo.
   * 
   * Contiene la lista de opciones disponibles para seleccionar
   * el sector productivo de la empresa en el formulario.
   * 
   * @property {CatalogosSelect} sectorProductivo
   */
  sectorProductivo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo para el tipo de servicio.
   * 
   * Lista de servicios disponibles que puede seleccionar la empresa
   * como parte de sus actividades comerciales.
   * 
   * @property {CatalogosSelect} servicio
   */
  servicio: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo para seleccionar el bimestre.
   * 
   * Opciones de períodos bimestrales utilizados para reportes
   * y declaraciones específicas del trámite.
   * 
   * @property {CatalogosSelect} bimestre
   */
  bimestre: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo con opción para indicar "todos".
   * 
   * Proporciona una opción especial para seleccionar todos los elementos
   * disponibles en lugar de elementos individuales.
   * 
   * @property {CatalogosSelect} indiqueTodos
   */
  indiqueTodos: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Estado actual del formulario 32604.
   * 
   * Contiene toda la información del estado actual de la solicitud,
   * incluyendo datos del formulario, listas y configuraciones.
   * 
   * @property {Solicitud32604State} solicitud32604State
   */
  solicitud32604State: Solicitud32604State = {} as Solicitud32604State;

  /**
   * Tipo de tabla utilizada para mostrar número de empleados (checkbox).
   * 
   * Define el comportamiento de selección de la tabla como tipo checkbox
   * para permitir selecciones múltiples.
   * 
   * @property {TablaSeleccion} numeroDeEmpleadosTabla
   */
  numeroDeEmpleadosTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla de número de empleados.
   * 
   * Define la estructura, formato y comportamiento de las columnas
   * que se mostrarán en la tabla de número de empleados.
   * 
   * @property {ConfiguracionColumna<NumeroDeEmpleados>[]} numeroDeEmpleadosConfiguracionColumnas
   */
  numeroDeEmpleadosConfiguracionColumnas: ConfiguracionColumna<NumeroDeEmpleados>[] =
    NUMERO_DE_EMPLEADOS_CONFIGURACION;

  /**
   * Lista completa de número de empleados.
   * 
   * Contiene todos los registros de empleados disponibles
   * para mostrar en la tabla correspondiente.
   * 
   * @property {NumeroDeEmpleados[]} numeroDeEmpleadosLista
   */
  numeroDeEmpleadosLista: NumeroDeEmpleados[] = [] as NumeroDeEmpleados[];

  /**
   * Lista de empleados seleccionados en la tabla.
   * 
   * Almacena los registros de empleados que el usuario ha seleccionado
   * mediante los checkboxes de la tabla.
   * 
   * @property {NumeroDeEmpleados[]} seleccionarNumeroDeEmpleadosLista
   */
  seleccionarNumeroDeEmpleadosLista: NumeroDeEmpleados[] =
    [] as NumeroDeEmpleados[];

  /**
   * Configuración de columnas para la tabla de domicilios.
   * 
   * Define la estructura y comportamiento de las columnas
   * para la visualización de datos de domicilios empresariales.
   * 
   * @property {ConfiguracionColumna<Domicilios>[]} domiciliosConfiguracionColumnas
   */
  domiciliosConfiguracionColumnas: ConfiguracionColumna<Domicilios>[] =
    DOMICILIOS_CONFIGURACION_COLUMNAS;

  /**
   * Datos de los domicilios disponibles.
   * 
   * Lista de domicilios registrados de la empresa,
   * incluyendo instalaciones y direcciones comerciales.
   * 
   * @property {Domicilios[]} domiciliosDatos
   */
  domiciliosDatos: Domicilios[] = [] as Domicilios[];

  /**
   * Domicilios seleccionados por el usuario.
   * 
   * Almacena los domicilios que el usuario ha marcado
   * como seleccionados en la interfaz.
   * 
   * @property {Domicilios[]} seleccionarDomiciliosDatos
   */
  seleccionarDomiciliosDatos: Domicilios[] = [] as Domicilios[];

  /**
   * Configuración de columnas para la tabla de inventarios.
   * 
   * Define la estructura de las columnas con aportes específicos
   * para la visualización de datos de inventarios.
   * 
   * @property {ConfiguracionAporteColumna<Inventarios>[]} inventariosConfiguracionColumnas
   */
  inventariosConfiguracionColumnas: ConfiguracionAporteColumna<Inventarios>[] =
    INVENTARIOS_CONFIGURACION;

  /**
   * Datos de inventarios registrados.
   * 
   * Lista de inventarios disponibles de la empresa,
   * incluyendo productos, materiales y existencias.
   * 
   * @property {Inventarios[]} inventariosDatos
   */
  inventariosDatos: Inventarios[] = [] as Inventarios[];

  /**
   * Inventarios seleccionados por el usuario.
   * 
   * Almacena los inventarios que el usuario ha marcado
   * como seleccionados para procesamiento o eliminación.
   * 
   * @property {Inventarios[]} seleccionarInventarios
   */
  seleccionarInventarios: Inventarios[] = [] as Inventarios[];

  /**
   * Configuración de columnas para la sección de socios IC.
   * 
   * Define la estructura de las columnas para mostrar
   * información de socios y miembros de la empresa.
   * 
   * @property {ConfiguracionColumna<SeccionSociosIC>[]} seccionSociosICConfiguracionColumnas
   */
  seccionSociosICConfiguracionColumnas: ConfiguracionColumna<SeccionSociosIC>[] =
    SECCION_SOCIOSIC_CONFIGURACION_COLUMNAS;

  /**
   * Lista de socios IC registrados.
   * 
   * Contiene la información de todos los socios
   * y miembros registrados de la empresa.
   * 
   * @property {SeccionSociosIC[]} listaSeccionSociosIC
   */
  listaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];

  /**
   * Lista de socios IC seleccionados por el usuario.
   * 
   * Almacena los socios que han sido seleccionados
   * para operaciones específicas como modificación o eliminación.
   * 
   * @property {SeccionSociosIC[]} seleccionarListaSeccionSociosIC
   */
  seleccionarListaSeccionSociosIC: SeccionSociosIC[] = [] as SeccionSociosIC[];

  /**
   * Referencia al modal para agregar miembros de la empresa.
   * 
   * ViewChild que permite acceder al elemento DOM del modal
   * utilizado para agregar nuevos miembros a la empresa.
   * 
   * @property {ElementRef} modalElement
   */
  @ViewChild('modalAgregarMiembrosEmpresa', { static: false })
  modalElement!: ElementRef;

  /**
   * Referencia al modal de la sección de subcontratados.
   * 
   * ViewChild que proporciona acceso al modal utilizado
   * para gestionar la información de subcontratados.
   * 
   * @property {ElementRef} modalSeccionSubcontratadosElement
   */
  @ViewChild('modalSeccionSubcontratados', { static: false })
  modalSeccionSubcontratadosElement!: ElementRef;

  /**
   * Referencia al modal de instalaciones principales.
   * 
   * ViewChild que permite controlar el modal destinado
   * a la gestión de instalaciones principales de la empresa.
   * 
   * @property {ElementRef} modalInstalacionesPrincipalesElement
   */
  @ViewChild('modalInstalacionesPrincipalesElement', { static: false })
  modalInstalacionesPrincipalesElement!: ElementRef;

  /**
   * Referencia al modal de modificación.
   * 
   * ViewChild que proporciona acceso al modal utilizado
   * para modificar información existente.
   * 
   * @property {ElementRef} modalModificarElement
   */
  @ViewChild('modalModificarElement', { static: false })
  modalModificarElement!: ElementRef;

  /**
   * Referencia al modal de la sección de empresa.
   * 
   * ViewChild que permite acceder al modal utilizado
   * para gestionar información general de la empresa.
   * 
   * @property {ElementRef} modalEmpresaElement
   */
  @ViewChild('modalEmpresaElement', { static: false })
  modalEmpresaElement!: ElementRef;

  /**
   * Referencia al componente agregar dentro del modal.
   * 
   * ViewChild que proporciona acceso directo al componente
   * AgregarComponent para controlar su estado y comportamiento.
   * 
   * @property {AgregarComponent} agregarComponent
   */
  @ViewChild(AgregarComponent, { static: false })
  agregarComponent!: AgregarComponent;

  /**
   * Notificación utilizada para mostrar mensajes al usuario.
   * 
   * Objeto que contiene la configuración y contenido
   * de las notificaciones que se muestran en la interfaz.
   * 
   * @public
   * @property {Notificacion} nuevaNotificacion
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Índice o identificador del elemento que se desea eliminar de la tabla de pedimentos.
   * 
   * Almacena la referencia del elemento seleccionado
   * para operaciones de eliminación.
   * 
   * @property {number} elementoParaEliminar
   */
  elementoParaEliminar!: number;

  /**
   * Lista de pedimentos ingresados por el usuario.
   * 
   * Array que contiene todos los pedimentos registrados
   * en el sistema durante el proceso de captura.
   * 
   * @property {Array<Pedimento>} pedimentos
   */
  pedimentos: Array<Pedimento> = [];

  /**
   * Indica si el formulario está en modo solo lectura.
   * 
   * Cuando es `true`, los campos del formulario no se pueden editar
   * y se muestran únicamente para consulta.
   * 
   * @property {boolean} esFormularioSoloLectura
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Almacena los valores anteriores de los campos críticos para detectar cambios.
   * 
   * @property {Record<string, string | number | null | undefined>} valoresAnteriores
   */
  valoresAnteriores: Record<string, string | number | null | undefined> = {};

  /**
   * Constructor del componente donde se inicializan servicios y se cargan catálogos necesarios.
   * 
   * Inicializa todas las dependencias del componente y configura los catálogos iniciales
   * utilizando el servicio de inicialización. También establece la suscripción al estado
   * de consulta para manejar el modo de solo lectura del formulario.
   * 
   * @param {FormBuilder} fb - Constructor de formularios reactivos de Angular
   * @param {EmpresasComercializadorasService} empresasComercializadorasService - Servicio para gestión de empresas comercializadoras
   * @param {Solicitud32604Store} solicitud32604Store - Store para manejo del estado de la solicitud 32604
   * @param {Solicitud32604Query} solicitud32604Query - Query para consultas del estado de la solicitud 32604
   * @param {ConsultaioQuery} consultaioQuery - Query para el estado de consulta de la aplicación
   */
  constructor(
    public fb: FormBuilder,
    public empresasComercializadorasService: EmpresasComercializadorasService,
    public solicitud32604Store: Solicitud32604Store,
    public solicitud32604Query: Solicitud32604Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    
    /**
     * Inicializar objetos de catálogo utilizando el CatalogoInicializacionService.
     * 
     * Se obtienen los catálogos iniciales necesarios para el funcionamiento del componente,
     * incluyendo sector productivo, servicio, bimestre e indicador de "todos".
     */
    const CATALOGOS_INICIALES = CatalogoInicializacionService.inicializarTodosCatalogos();
    this.sectorProductivo = CATALOGOS_INICIALES.sectorProductivo;
    this.servicio = CATALOGOS_INICIALES.servicio;
    this.bimestre = CATALOGOS_INICIALES.bimestre;
    this.indiqueTodos = CATALOGOS_INICIALES.indiqueTodos;
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Inicializa el formulario `datosComunesForm` con valores del estado actual
   * y suscribe a los cambios del store para mantener los datos sincronizados.
   * También configura las suscripciones necesarias para el manejo de estados
   * y carga los catálogos e inventarios requeridos.
   * 
   * @memberof DatosComunesComponent
   * @implements {OnInit}
   */
  ngOnInit(): void {
    this.solicitud32604Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitud32604State = {
            ...this.solicitud32604State,
            ...seccionState,
          };
        })
      )
      .subscribe();
    this.consultaioQuery.selectConsultaioState$
    .pipe(
    takeUntil(this.destroy$),
    map((seccionState) => {
      this.esFormularioSoloLectura = seccionState.readonly;
      this.inicializarEstadoFormulario();
    })
  )
  .subscribe();
    this.inicializarEstadoFormulario();
    this.conseguirOpcionDeRadio();
    this.conseguirOpcionDeRadio();
    this.conseguirSolicitudCatologoSelectLista();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * 
   * Determina el modo de operación del formulario basado en el estado
   * de solo lectura y ejecuta la acción correspondiente para inicializar
   * o cargar datos según sea necesario.
   * 
   * @memberof DatosComunesComponent
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario(); // Llama al método para cargar los datos del formulario
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Carga datos desde el estado y actualiza el formulario con la información obtenida.
   * 
   * Inicializa el formulario y luego aplica el estado de solo lectura según corresponda.
   * Si el formulario está en modo de solo lectura, deshabilita todos los controles,
   * de lo contrario, los mantiene habilitados para edición.
   * 
   * @memberof DatosComunesComponent
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.datosComunesForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.datosComunesForm.enable();
    }
  }

  /**
   * Inicializa el formulario `datosComunesForm` con los valores actuales del estado `solicitud32604State`.
   *
   * Este formulario contiene una amplia variedad de campos que representan diferentes datos
   * requeridos por la solicitud 32604. Los valores iniciales de cada control se obtienen
   * directamente del estado actual gestionado por el store. También establece la suscripción
   * para mantener el formulario sincronizado con los cambios del estado global.
   * 
   * @memberof DatosComunesComponent
   */
  inicializarFormulario(): void {
    this.datosComunesForm = this.fb.group({
      catseleccionados: [this.solicitud32604State.catseleccionados],
      servicio: [this.solicitud32604State.servicio],
      '190': [this.solicitud32604State['190'], Validators.required],
      '191': [this.solicitud32604State['191'], Validators.required],
      '199': [this.solicitud32604State['199'], Validators.required],
      '200': [this.solicitud32604State['200'], Validators.required],
      '201': [this.solicitud32604State['201'], Validators.required],
      empleados: [this.solicitud32604State.empleados],
      bimestre: [this.solicitud32604State.bimestre],
      '2034': [this.solicitud32604State['2034']],
      '236': [this.solicitud32604State['236']],
      '237': [this.solicitud32604State['237']],
      '238': [this.solicitud32604State['238']],
      '239': [this.solicitud32604State['239']],
      '240': [this.solicitud32604State['240']],
      '243': [this.solicitud32604State['243']],
      '244': [this.solicitud32604State['244'], Validators.required],
      '245': [this.solicitud32604State['245']],
      indiqueTodos: [this.solicitud32604State.indiqueTodos],
      '246': [this.solicitud32604State['246'], Validators.required],
      file1: [this.solicitud32604State.file1],
      file2: [this.solicitud32604State.file2],
      '247': [this.solicitud32604State['247'], Validators.required],
      '248': [this.solicitud32604State['248']],
      identificacion: [this.solicitud32604State.identificacion, Validators.required],
      lugarDeRadicacion: [this.solicitud32604State.lugarDeRadicacion, Validators.required],
      '249': [this.solicitud32604State['249']],
      '250': [this.solicitud32604State['250'], Validators.required],
      '251': [this.solicitud32604State['251'], Validators.required],
      checkbox1: [this.solicitud32604State.checkbox1],
      checkbox2: [this.solicitud32604State.checkbox2, Validators.required],
      checkbox3: [this.solicitud32604State.checkbox3],
      actualmente2: [this.solicitud32604State.actualmente2],
      actualmente1: [this.solicitud32604State.actualmente1],
    });

    /**
     * Suscripción al estado de solicitud en el store para mantener
     * sincronizados los datos del formulario con el estado global.
     */
    this.solicitud32604Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroy$),
        map((respuesta: Solicitud32604State) => {
          this.solicitud32604State = respuesta;
          this.datosComunesForm.patchValue({
            catseleccionados: this.solicitud32604State.catseleccionados,
            servicio: this.solicitud32604State.servicio,
            '190': this.solicitud32604State['190'],
            '191': this.solicitud32604State['191'],
            '199': this.solicitud32604State['199'],
            empleados: this.solicitud32604State.empleados,
            bimestre: this.solicitud32604State.bimestre,
            '2034': this.solicitud32604State['2034'],
            '236': this.solicitud32604State['236'],
            '237': this.solicitud32604State['237'],
            '238': this.solicitud32604State['238'],
            '239': this.solicitud32604State['239'],
            '240': this.solicitud32604State['240'],
            '243': this.solicitud32604State['243'],
            '244': this.solicitud32604State['244'],
            '245': this.solicitud32604State['245'],
            indiqueTodos: this.solicitud32604State.indiqueTodos,
            '246': this.solicitud32604State['246'],
            file1: this.solicitud32604State.file1,
            file2: this.solicitud32604State.file2,
            '247': this.solicitud32604State['247'],
            '248': this.solicitud32604State['248'],
            identificacion: this.solicitud32604State.identificacion,
            lugarDeRadicacion: this.solicitud32604State.lugarDeRadicacion,
            '249': this.solicitud32604State['249'],
            '250': this.solicitud32604State['250'],
            '251': this.solicitud32604State['251'],
            checkbox1: this.solicitud32604State.checkbox1,
            checkbox2: this.solicitud32604State.checkbox2,
            checkbox3: this.solicitud32604State.checkbox3,
            actualmente2: this.solicitud32604State.actualmente2,
            actualmente1: this.solicitud32604State.actualmente1,
          });
          this.numeroDeEmpleadosLista =
            this.solicitud32604State.numeroDeEmpleadosLista;
          this.domiciliosDatos = this.solicitud32604State.domiciliosDatos;
          this.listaSeccionSociosIC =
            this.solicitud32604State.listaSeccionSociosIC;
        })
      )
      .subscribe();
  }

  /**
   * Método para obtener la opción de radio (sí/no) desde el servicio.
   * 
   * Se suscribe al observable del servicio empresas comercializadoras
   * y asigna el resultado a la propiedad `sinoOpcion` para su uso
   * en los componentes de radio button del formulario.
   * 
   * @memberof DatosComunesComponent
   */
  conseguirOpcionDeRadio(): void {
    this.empresasComercializadorasService
      .conseguirOpcionDeRadio()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudRadioLista) => {
          this.sinoOpcion = respuesta.requisitos;
        },
      });
  }

  /**
   * Método para obtener los catálogos del formulario desde el servicio.
   * 
   * Se suscribe al servicio para obtener las listas de catálogos necesarios
   * y los asigna a sus propiedades correspondientes (sector productivo, servicio,
   * bimestre e indique todos). Incluye manejo de errores para casos fallidos.
   * 
   * @memberof DatosComunesComponent
   */
  conseguirSolicitudCatologoSelectLista(): void {
    this.empresasComercializadorasService
      .conseguirSolicitudCatologoSelectLista()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (respuesta: SolicitudCatologoSelectLista) => {
          this.sectorProductivo = { ...this.sectorProductivo, ...respuesta.sectorProductivo };
          this.servicio = { ...this.servicio, ...respuesta.servicio };
          this.bimestre = { ...this.bimestre, ...respuesta.bimestre };
          this.indiqueTodos = { ...this.indiqueTodos, ...respuesta.indiqueTodos };
        },
        error: (error) => {
          console.error('Error loading catalog data:', error);
        }
      });
  }

  /**
   * Muestra el modal para agregar miembros de la empresa.
   * 
   * Utiliza el elemento del DOM referenciado como modalElement
   * para crear una instancia de modal de Bootstrap y mostrarlo.
   * Verifica que el elemento exista antes de proceder.
   * 
   * @memberof DatosComunesComponent
   */
  agregarMiembrosEmpresa(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Muestra el modal para agregar subcontratados a la empresa.
   * 
   * Crea una instancia de modal de Bootstrap utilizando el elemento
   * referenciado como modalSeccionSubcontratadosElement y lo muestra.
   * Incluye validación de existencia del elemento modal.
   * 
   * @memberof DatosComunesComponent
   */
  agregarSubcontratados(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(
        this.modalSeccionSubcontratadosElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Muestra el modal para agregar instalaciones principales de la empresa.
   * 
   * Reinicia el estado del componente agregar antes de mostrar el modal
   * y luego crea una instancia de modal de Bootstrap para mostrarlo.
   * Utiliza el elemento referenciado como modalInstalacionesPrincipalesElement.
   * 
   * @memberof DatosComunesComponent
   */
  agregarInstalacionesPrincipales(): void {
    if (this.modalInstalacionesPrincipalesElement) {
      // Restablecer el estado del componente Agregar al abrir modal
      if (this.agregarComponent) {
        this.agregarComponent.resetModalState();
      }
      
      const MODAL_INSTANCE = new Modal(
        this.modalInstalacionesPrincipalesElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Muestra el modal para modificar información existente.
   * 
   * Reinicia el estado del componente agregar antes de abrir el modal
   * y luego crea una instancia de modal de Bootstrap para mostrarlo.
   * Utiliza el elemento referenciado como modalModificarElement.
   * 
   * @memberof DatosComunesComponent
   */
  agregarModificarPrincipales(): void {
    if (this.modalModificarElement) {
      // Restablecer el estado del componente Agregar al abrir modal
      if (this.agregarComponent) {
        this.agregarComponent.resetModalState();
      }
      
      const MODAL_INSTANCE = new Modal(
        this.modalModificarElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Muestra el modal para gestionar información general de la empresa.
   * 
   * Reinicia el estado del componente agregar antes de mostrar el modal
   * y luego crea una instancia de modal de Bootstrap para mostrarlo.
   * Utiliza el elemento referenciado como modalEmpresaElement.
   * 
   * @memberof DatosComunesComponent
   */
  agregarEmpresaPrincipales(): void {
    if (this.modalEmpresaElement) {
      // Restablecer el estado del componente Agregar al abrir modal
      if (this.agregarComponent) {
        this.agregarComponent.resetModalState();
      }
      
      const MODAL_INSTANCE = new Modal(
        this.modalEmpresaElement.nativeElement
      );
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Actualiza la lista de miembros de la empresa con un nuevo registro recibido como evento.
   * 
   * Agrega el nuevo miembro a la lista existente, actualiza el estado global
   * en el store, crea un pedimento por defecto y muestra un mensaje de éxito
   * al usuario mediante un modal.
   * 
   * @param {SeccionSociosIC} evento - Datos del nuevo miembro de la empresa a agregar
   * @memberof DatosComunesComponent
   */
  eventoActualizarMiembro(evento: SeccionSociosIC): void {
    this.listaSeccionSociosIC = [...this.listaSeccionSociosIC, evento];
    this.solicitud32604Store.actualizarListaSeccionSociosIC(
      this.listaSeccionSociosIC
    );
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };
    this.abrirModal('Datos guardados correctamente.');
    this.pedimentos.push(PEDIMENTO);
  }

  /**
   * Muestra una notificación en forma de modal con el mensaje proporcionado.
   * 
   * Configura y muestra un modal de notificación con características específicas
   * como tipo de alerta, categoría de peligro y tiempo de espera. También
   * almacena el índice del elemento que se desea eliminar para uso posterior.
   * 
   * @param {string} mensaje - El mensaje a mostrar en el modal de notificación
   * @param {number} [i=0] - El índice del elemento a eliminar (opcional, por defecto 0)
   * @memberof DatosComunesComponent
   */
  abrirModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  /**
   * Muestra una notificación en forma de modal con el mensaje proporcionado.
   * 
   * Configura y muestra un modal de notificación con características específicas
   * como tipo de alerta, categoría de peligro y tiempo de espera. Utiliza el
   * mensaje dinámico proporcionado como parámetro e incluye un icono de cierre.
   * 
   * @param {string} mensaje - El mensaje a mostrar en el modal de notificación
   * @param {number} [i=0] - El índice del elemento a eliminar (opcional, por defecto 0)
   * @memberof DatosComunesComponent
   */
  opcionModal(mensaje: string, i: number = 0): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };

    this.elementoParaEliminar = i;
  }

  /**
   * Cierra el modal de notificación.
   * 
   * Resetea la notificación actual para cerrar el modal.
   * 
   * @memberof DatosComunesComponent
   */
  cerrarModal(): void {
    this.nuevaNotificacion = {} as Notificacion;
  }

  /**
   * Agrega un nuevo subcontratado a la lista y actualiza el estado global en el store.
   * 
   * Recibe los datos del subcontratado desde un evento, los agrega a la lista
   * existente de número de empleados y actualiza el estado en el store para
   * mantener la persistencia de los datos.
   * 
   * @param {NumeroDeEmpleados} evento - Datos del subcontratado a agregar
   * @memberof DatosComunesComponent
   */
  seccionSubcontratados(evento: NumeroDeEmpleados): void {
    this.numeroDeEmpleadosLista = [...this.numeroDeEmpleadosLista, evento];
    this.solicitud32604Store.actualizarNumeroDeEmpleadosLista(
      this.numeroDeEmpleadosLista
    );
  }

  /**
   * Agrega una nueva instalación principal a la lista y actualiza el store.
   * 
   * Recibe los datos de la instalación desde un evento, los agrega a la lista
   * de domicilios, actualiza el estado en el store, crea un pedimento por defecto
   * y muestra un mensaje de confirmación al usuario.
   * 
   * @param {Domicilios} evento - Datos de la instalación principal a agregar
   * @memberof DatosComunesComponent
   */
  instalacionesPrincipales(evento: Domicilios): void {
    this.domiciliosDatos = [...this.domiciliosDatos, evento];
    this.solicitud32604Store.actualizarDomiciliosDatos(this.domiciliosDatos);
    const PEDIMENTO = {
      patente: 0,
      pedimento: 0,
      aduana: 0,
      idTipoPedimento: 0,
      descTipoPedimento: 'Por evaluar',
      numero: '',
      comprobanteValor: '',
      pedimentoValidado: false,
    };
    this.abrirModal('Datos guardados correctamente.');
    this.pedimentos.push(PEDIMENTO);
  }
  /**
   * Actualiza el valor del catálogo seleccionado en el estado global.
   * 
   * Recibe un elemento del catálogo y actualiza el campo `catseleccionados`
   * en el store con el ID del elemento seleccionado.
   * 
   * @param {Catalogo} valor - Elemento del catálogo seleccionado
   * @memberof DatosComunesComponent
   */
  actualizarCatseleccionados(valor: Catalogo): void {
    this.solicitud32604Store.actualizarCatseleccionados(valor.id);
  }

  /**
   * Actualiza el servicio seleccionado en el estado global.
   * 
   * Recibe un elemento del catálogo correspondiente al servicio
   * y actualiza el campo `servicio` en el store con el ID del elemento.
   * 
   * @param {Catalogo} valor - Elemento del catálogo correspondiente al servicio
   * @memberof DatosComunesComponent
   */
  actualizarServicio(valor: Catalogo): void {
    this.solicitud32604Store.actualizarServicio(valor.id);
  }

  /**
   * Actualiza el campo '190' en el estado global.
   * 
   * Verifica las selecciones de radio buttons antes de actualizar
   * y luego almacena el valor en el store. Parte del sistema de
   * validación de campos de selección múltiple.
   * 
   * @param {string | number} valor - Valor numérico o de texto para el campo 190
   * @memberof DatosComunesComponent
   */
  actualizar190(valor: string | number): void {
    this.verificarSeleccionesRadio('190', valor);
    this.solicitud32604Store.actualizar190(valor);
  }

  /**
   * Actualiza el campo '191' en el estado global.
   * 
   * Realiza verificación de selecciones de radio buttons
   * y actualiza el estado en el store. Forma parte del
   * sistema de validación de campos interdependientes.
   * 
   * @param {string | number} valor - Valor numérico o de texto para el campo 191
   * @memberof DatosComunesComponent
   */
  actualizar191(valor: string | number): void {
    this.verificarSeleccionesRadio('191', valor);
    this.solicitud32604Store.actualizar191(valor);
  }

  /**
   * Actualiza el campo '199' en el estado global.
   * 
   * Almacena directamente el valor recibido en el store
   * sin verificaciones adicionales de radio buttons.
   * 
   * @param {string | number} valor - Valor numérico o de texto para el campo 199
   * @memberof DatosComunesComponent
   */
  actualizar199(valor: string | number): void {
    this.verificarSeleccionesRadio('199', valor);
    this.solicitud32604Store.actualizar199(valor);
  }

  /**
   * Actualiza el campo '200' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '200'.
   * 
   * @param {string | number} valor - Valor numérico o de texto para el campo 200
   * @memberof DatosComunesComponent
   */
  actualizar200(valor: string | number): void {
    this.verificarSeleccionesRadio('200', valor);
    this.solicitud32604Store.actualizar200(valor);
  }

  /**
   * Actualiza el campo '201' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '201'.
   * 
   * @param {string | number} valor - Valor numérico o de texto para el campo 201
   * @memberof DatosComunesComponent
   */
  actualizar201(valor: string | number): void {
    this.verificarSeleccionesRadio('201', valor);
    this.solicitud32604Store.actualizar201(valor);
  }

  /**
   * Actualiza el número de empleados ingresado.
   * 
   * Extrae el valor desde el evento de entrada del usuario
   * y lo almacena en el store para el campo de empleados.
   * 
   * @param {Event} valor - Evento de entrada del usuario con el valor del input
   * @memberof DatosComunesComponent
   */
  actualizarEmpleados(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarEmpleados(VALOR);
  }

  /**
   * Actualiza el valor del bimestre seleccionado en el estado global.
   * 
   * Recibe un elemento del catálogo de bimestres y actualiza
   * el campo correspondiente en el store con el ID seleccionado.
   * 
   * @param {Catalogo} valor - Elemento del catálogo correspondiente al bimestre
   * @memberof DatosComunesComponent
   */
  actualizarBimestre(valor: Catalogo): void {
    this.solicitud32604Store.actualizarBimestre(valor.id);
  }

  /**
   * Actualiza el campo '2034' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '2034'.
   * 
   * @param {string | number} valor - Valor para el campo 2034
   * @memberof DatosComunesComponent
   */
  actualizar2034(valor: string | number): void {
    this.solicitud32604Store.actualizar2034(valor);
  }

  /**
   * Actualiza el campo '236' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '236'.
   * 
   * @param {string | number} valor - Valor para el campo 236
   * @memberof DatosComunesComponent
   */
  actualizar236(valor: string | number): void {
    this.solicitud32604Store.actualizar236(valor);
  }

  /**
   * Actualiza el campo '237' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '237'.
   * 
   * @param {string | number} valor - Valor para el campo 237
   * @memberof DatosComunesComponent
   */
  actualizar237(valor: string | number): void {
    this.solicitud32604Store.actualizar237(valor);
  }

  /**
   * Actualiza el campo '239' y, si el valor es 1, agrega un pedimento y muestra una advertencia.
   * 
   * Almacena el valor en el store y ejecuta lógica especial cuando el valor es 1.
   * En este caso, agrega un pedimento por defecto y muestra un modal con información
   * sobre los requisitos obligatorios para el Registro en el Esquema de Certificación de Empresas.
   * 
   * @param {string | number} valor - Valor para el campo 239
   * @memberof DatosComunesComponent
   */
  actualizar239(valor: string | number): void {
    this.solicitud32604Store.actualizar239(valor);
    if (valor === 1) {
      const PEDIMENTO = {
        patente: 0,
        pedimento: 0,
        aduana: 0,
        idTipoPedimento: 0,
        descTipoPedimento: 'Por evaluar',
        numero: '',
        comprobanteValor: '',
        pedimentoValidado: false,
      };
      this.abrirModal(
        'Es un requisito obligatorio para acceder a Registro en el Esquema de Certificacion de Empresas, de conformidad con la regla 7.1.1. de las RGCE.'
      );
      this.pedimentos.push(PEDIMENTO);
    }
  }

  /**
   * Actualiza el campo '240' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '240'.
   * 
   * @param {string | number} valor - Valor para el campo 240
   * @memberof DatosComunesComponent
   */
  actualizar240(valor: string | number): void {
    this.solicitud32604Store.actualizar240(valor);
  }

  /**
   * Actualiza el campo '243' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '243'.
   * 
   * @param {string | number} valor - Valor para el campo 243
   * @memberof DatosComunesComponent
   */
  actualizar243(valor: string | number): void {
    this.solicitud32604Store.actualizar243(valor);
  }

  /**
   * Actualiza el campo '244' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '244'.
   * 
   * @param {string | number} valor - Valor para el campo 244
   * @memberof DatosComunesComponent
   */
  actualizar244(valor: string | number): void {
    this.verificarSeleccionesRadio('244', valor);
    this.solicitud32604Store.actualizar244(valor);
  }

  /**
   * Actualiza el campo '245' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '245'.
   * 
   * @param {string | number} valor - Valor para el campo 245
   * @memberof DatosComunesComponent
   */
  actualizar245(valor: string | number): void {
    this.solicitud32604Store.actualizar245(valor);
  }

  /**
   * Actualiza el valor seleccionado en el campo "indique todos" en el estado global.
   * 
   * Recibe un elemento del catálogo correspondiente al campo "indique todos"
   * y actualiza el estado en el store con el ID del elemento seleccionado.
   * 
   * @param {Catalogo} valor - Elemento del catálogo correspondiente al campo "indique todos"
   * @memberof DatosComunesComponent
   */
  actualizarIndiqueTodos(valor: Catalogo): void {
    this.solicitud32604Store.actualizarIndiqueTodos(valor.id);
  }

  /**
   * Actualiza el campo '246' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '246'.
   * 
   * @param {string | number} valor - Valor para el campo 246
   * @memberof DatosComunesComponent
   */
  actualizar246(valor: string | number): void {
    this.verificarSeleccionesRadio('246', valor);
    this.solicitud32604Store.actualizar246(valor);
  }

  /**
   * Actualiza el valor del archivo 1 desde un input file.
   * 
   * Extrae el valor del input de archivo desde el evento de cambio
   * y lo almacena en el store para el campo file1.
   * 
   * @param {Event} valor - Evento de cambio del input de archivo
   * @memberof DatosComunesComponent
   */
  actualizarFile1(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarFile1(VALOR);
  }

  /**
   * Actualiza el valor del archivo 2 desde un input file.
   * 
   * Extrae el valor del input de archivo desde el evento de cambio
   * y lo almacena en el store para el campo file2.
   * 
   * @param {Event} valor - Evento de cambio del input de archivo
   * @memberof DatosComunesComponent
   */
  actualizarFile2(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarFile2(VALOR);
  }

  /**
   * Actualiza el campo '247' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '247'.
   * 
   * @param {string | number} valor - Valor para el campo 247
   * @memberof DatosComunesComponent
   */
  actualizar247(valor: string | number): void {
    this.verificarSeleccionesRadio('247', valor);
    this.solicitud32604Store.actualizar247(valor);
  }

  /**
   * Actualiza el campo '248' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '248'.
   * 
   * @param {string | number} valor - Valor para el campo 248
   * @memberof DatosComunesComponent
   */
  actualizar248(valor: string | number): void {
    this.verificarSeleccionesRadio('248', valor);
    this.solicitud32604Store.actualizar248(valor);
  }

  /**
   * Actualiza el valor del campo de identificación.
   * 
   * Extrae el valor del input desde el evento de cambio
   * y lo almacena en el store para el campo de identificación.
   * 
   * @param {Event} valor - Evento de cambio del input de identificación
   * @memberof DatosComunesComponent
   */
  actualizarIdentificacion(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarIdentificacion(VALOR);
  }

  /**
   * Actualiza el valor del lugar de radicación.
   * 
   * Extrae el valor del input desde el evento de cambio
   * y lo almacena en el store para el campo de lugar de radicación.
   * 
   * @param {Event} valor - Evento de cambio del input de lugar de radicación
   * @memberof DatosComunesComponent
   */
  actualizarLugarDeRadicacion(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarLugarDeRadicacion(VALOR);
  }

  /**
   * Valida y procesa el control de inventarios.
   * 
   * Verifica que los campos obligatorios (identificacion y lugarDeRadicacion) sean válidos
   * antes de procesar los datos. Si el formulario no es válido, marca todos los campos como tocados
   * para mostrar los mensajes de error correspondientes y muestra un modal con mensaje de error.
   * Si la validación es exitosa, agrega los datos a la tabla de inventarios y muestra un mensaje de éxito.
   * 
   * @memberof DatosComunesComponent
   */
  validarYProcesarControlInventarios(): void {
    const CAMPOS_CONTROL_INVENTARIOS = ['identificacion', 'lugarDeRadicacion'];
    const CAMPOS_INVALIDOS = CAMPOS_CONTROL_INVENTARIOS.some(campo => 
      this.datosComunesForm.get(campo)?.invalid
    );

    if (CAMPOS_INVALIDOS) {
      this.marcarCamposInventariosComoTocados();
      this.abrirModal('Debe capturar todos los datos marcados como obligatorios.');
    } else {
      this.procesarDatosControlInventarios();
    }
  }

  /**
   * Procesa los datos del control de inventarios.
   * 
   * Crea un nuevo registro de inventario con los datos del formulario,
   * lo agrega a la lista de inventarios, actualiza el store y muestra
   * un mensaje de éxito al usuario.
   * 
   * @memberof DatosComunesComponent
   */
  private procesarDatosControlInventarios(): void {
    const NUEVO_INVENTARIO = {
      nombre: this.datosComunesForm.get('identificacion')?.value || '',
      lugarRadicacion: this.datosComunesForm.get('lugarDeRadicacion')?.value || '',
      anexo24: 'Por determinar'
    };

    this.inventariosDatos = [...this.inventariosDatos, NUEVO_INVENTARIO];
    this.abrirModal('Datos guardados correctamente.');
    
    // Limpiar los campos después de agregar
    this.datosComunesForm.patchValue({
      identificacion: '',
      lugarDeRadicacion: ''
    });
    
    // Resetear el estado de validación de los campos
    this.datosComunesForm.get('identificacion')?.markAsUntouched();
    this.datosComunesForm.get('identificacion')?.markAsPristine();
    this.datosComunesForm.get('lugarDeRadicacion')?.markAsUntouched();
    this.datosComunesForm.get('lugarDeRadicacion')?.markAsPristine();
  }

  /**
   * Marca los campos del control de inventarios como tocados.
   * 
   * Marca específicamente los campos de identificación y lugar de radicación
   * como tocados para que se muestren los mensajes de error de validación.
   * 
   * @memberof DatosComunesComponent
   */
  private marcarCamposInventariosComoTocados(): void {
    this.datosComunesForm.get('identificacion')?.markAsTouched();
    this.datosComunesForm.get('lugarDeRadicacion')?.markAsTouched();
  }

  /**
   * Actualiza el campo '249' en el estado global.
   * 
   * Almacena el valor recibido directamente en el store
   * para el campo identificado como '249'.
   * 
   * @param {string | number} valor - Valor para el campo 249
   * @memberof DatosComunesComponent
   */
  actualizar249(valor: string | number): void {
    this.verificarSeleccionesRadio('249', valor);
    this.solicitud32604Store.actualizar249(valor);
  }

  /**
   * Actualiza el campo '250' en el estado global.
   * 
   * Verifica las selecciones de radio buttons antes de actualizar
   * y luego almacena el valor en el store para el campo '250'.
   * 
   * @param {string | number} valor - Valor para el campo 250
   * @memberof DatosComunesComponent
   */
  actualizar250(valor: string | number): void {
    this.verificarSeleccionesRadio('250', valor);
    this.solicitud32604Store.actualizar250(valor);
  }

  /**
   * Actualiza el campo '251' en el estado global.
   * 
   * Verifica las selecciones de radio buttons antes de actualizar
   * y luego almacena el valor en el store para el campo '251'.
   * 
   * @param {string | number} valor - Valor para el campo 251
   * @memberof DatosComunesComponent
   */
  actualizar251(valor: string | number): void {
    this.verificarSeleccionesRadio('251', valor);
    this.solicitud32604Store.actualizar251(valor);
  }

  /**
   * Verifica y segrega las selecciones de radio buttons sin modificar el componente hijo.
   * 
   * Analiza todos los campos de radio button del formulario, los categoriza
   * en afirmativos, negativos y pendientes, y luego procesa cada categoría
   * para validaciones adicionales y manejo de estado.
   * 
   * @private
   * @param {string} campo - Nombre del campo que se está actualizando
   * @param {string | number} valor - Nuevo valor para el campo especificado
   * @memberof DatosComunesComponent
   */
  private verificarSeleccionesRadio(campo: string, valor: string | number): void {
    const SELECCIONES = {
      '190': campo === '190' ? valor : this.datosComunesForm.get('190')?.value,
      '191': campo === '191' ? valor : this.datosComunesForm.get('191')?.value,
      '199': campo === '199' ? valor : this.datosComunesForm.get('199')?.value,
      '200': campo === '200' ? valor : this.datosComunesForm.get('200')?.value,
      '201': campo === '201' ? valor : this.datosComunesForm.get('201')?.value,
      '244': campo === '244' ? valor : this.datosComunesForm.get('244')?.value,
      '246': campo === '246' ? valor : this.datosComunesForm.get('246')?.value,
      '247': campo === '247' ? valor : this.datosComunesForm.get('247')?.value,
      '248': campo === '248' ? valor : this.datosComunesForm.get('248')?.value,
      '249': campo === '249' ? valor : this.datosComunesForm.get('249')?.value,
      '250': campo === '250' ? valor : this.datosComunesForm.get('250')?.value,
      '251': campo === '251' ? valor : this.datosComunesForm.get('251')?.value,
    };
    
    // Verificar condiciones específicas para mostrar el modal
    this.verificarCondicionesModal(SELECCIONES, campo);
    
    const SELECCIONES_AFIRMATIVAS = Object.entries(SELECCIONES)
      .filter(([, value]) => value === 1 || value === '1' || value === 'Si' || value === 'Sí')
      .map(([key]) => key);
    
    const SELECCIONES_NEGATIVAS = Object.entries(SELECCIONES)
      .filter(([, value]) => value === 2 || value === '2' || value === 'No')
      .map(([key]) => key);

    const SELECCIONES_PENDIENTES = Object.entries(SELECCIONES)
      .filter(([, value]) => value === null || value === undefined || value === '')
      .map(([key]) => key);

    this.procesarSelecciones(SELECCIONES_AFIRMATIVAS, SELECCIONES_NEGATIVAS, SELECCIONES_PENDIENTES);

    this.validarCamposRequeridos(SELECCIONES);
  }

  /**
   * Verifica las condiciones específicas para mostrar el modal.
   * 
   * Evalúa individualmente cada campo para mostrar modales específicos:
   * - Para campos 190, 191, 244: muestra modal cuando value = 2 ("No")
   * - Para campos 199, 200, 201: muestra modal cuando value = 1 ("Sí")
   * 
   * @private
   * @param {Record<string, string | number | null | undefined>} selecciones - Objeto con los valores actuales de todos los campos
   * @param {string} campoModificado - El campo específico que fue modificado
   * @memberof DatosComunesComponent
   */
  private verificarCondicionesModal(selecciones: Record<string, string | number | null | undefined>, campoModificado: string): void {
    // Solo verificar el campo que fue modificado
    this.verificarCondicionIndividual(campoModificado, selecciones[campoModificado]);
  }

  /**
   * Verifica la condición específica de un campo individual.
   * 
   * @private
   * @param {string} campo - El campo a verificar
   * @param {string | number | null | undefined} valor - El valor del campo
   * @memberof DatosComunesComponent
   */
  private verificarCondicionIndividual(campo: string, valor: string | number | null | undefined): void {
    // Campos que requieren "No" (value = 2)
    const CAMPOS_NO = ['190', '191', '244', '246', '250'];

    // Campos que requieren "Sí" (value = 1)
    const CAMPOS_SI = ['199', '200', '201', '247', '248', '249', '251'];

    const ES_NO = valor === 2 || valor === '2' || valor === 'No';
    const ES_SI = valor === 1 || valor === '1' || valor === 'Si' || valor === 'Sí';

    // Mostrar modal individual para cada campo que cumple su condición
    if (CAMPOS_NO.includes(campo) && ES_NO) {
      this.mostrarModalParaCampo(campo, 'No');
    } else if (CAMPOS_SI.includes(campo) && ES_SI) {
      this.mostrarModalParaCampo(campo, 'Sí');
    }
  }

  /**
   * Muestra el modal específico para un campo.
   * 
   * @private
   * @param {string} campo - El campo que activó el modal
   * @param {string} _valor - El valor seleccionado (no utilizado en el mensaje)
   * @memberof DatosComunesComponent
   */
  private mostrarModalParaCampo(campo: string, _valor: string): void {
    // Campos que usan el mensaje estándar de RGCE
    const CAMPOS_RGCE = ['190', '191', '199', '200', '201', '244', '246', '247', '248', '250', '251'];
    
    // Mensajes especiales para campos específicos
    const MENSAJES_ESPECIALES: Record<string, string> = {
      '249': 'Debe agregar por lo menos un control de inventarios.'
    };

    let mensaje: string;
    
    if (MENSAJES_ESPECIALES[campo]) {
      // Usar mensaje especial para campos específicos
      mensaje = MENSAJES_ESPECIALES[campo];
    } else if (CAMPOS_RGCE.includes(campo)) {
      // Usar mensaje estándar de RGCE para la mayoría de campos
      mensaje = 'Es un requisito obligatorio para acceder al Registro en el Esquema de Certificación de Empresas, de conformidad con la regla 7.1.1. de las RGCE.';
    } else {
      // Mensaje por defecto para campos no configurados
      mensaje = `Campo ${campo} cumple con los requisitos obligatorios.`;
    }

    this.opcionModal(mensaje);
  }

  /**
   * Detecta cambios en los campos críticos y actualiza valores anteriores.
   * 
   * @private
   * @param {Record<string, string | number | null | undefined>} selecciones - Valores actuales de los campos
   * @returns {boolean} True si ha habido cambios en los campos críticos
   */
  private detectarCambiosEnCamposCriticos(selecciones: Record<string, string | number | null | undefined>): boolean {
    const CAMPOS_CRITICOS = ['190', '191', '244', '199', '200', '201', '201', '246', '247', '248', '249', '250', '251'];
    const HA_HABIDO_CAMBIOS = CAMPOS_CRITICOS.some(campo => 
      this.valoresAnteriores[campo] !== selecciones[campo]
    );

    // Actualizar valores anteriores
    CAMPOS_CRITICOS.forEach(campo => {
      this.valoresAnteriores[campo] = selecciones[campo];
    });

    return HA_HABIDO_CAMBIOS;
  }

  /**
   * Procesa las selecciones segregadas para análisis adicional.
   * 
   * Maneja las diferentes categorías de selecciones (afirmativas, negativas, pendientes)
   * y ejecuta la lógica correspondiente para cada tipo. Incluye manejo especial
   * para campos pendientes que requieren validación.
   * 
   * @private
   * @param {string[]} afirmativas - Lista de campos con selecciones afirmativas
   * @param {string[]} negativas - Lista de campos con selecciones negativas  
   * @param {string[]} pendientes - Lista de campos pendientes de completar
   * @memberof DatosComunesComponent
   */
  private procesarSelecciones(afirmativas: string[], negativas: string[], pendientes: string[]): void {
    if (afirmativas.length > 0) {
      // Manejar selecciones afirmativas: podría actualizar el estado del componente si fuera necesario
      // Nota: Los métodos de almacenamiento aún no existen, por lo que manejamos los datos localmente.
    }
    if (negativas.length > 0) {
      // Manejar selecciones negativas: podría actualizar el estado del componente si fuera necesario
    }
    if (pendientes.length > 0) {
      // Manejar selecciones pendientes: podría mostrar mensajes de validación
      this.mostrarCamposPendientes(pendientes);
    }
  }

  /**
   * Muestra o maneja campos pendientes de completar.
   * 
   * Gestiona la visualización de campos que aún no han sido completados
   * por el usuario. Considera el estado de solo lectura del formulario
   * para determinar si mostrar validaciones o no.
   * 
   * @private
   * @param {string[]} _campos - Lista de nombres de campos pendientes
   * @memberof DatosComunesComponent
   */
  private mostrarCamposPendientes(_campos: string[]): void {
    if (this.esFormularioSoloLectura) {
      // No mostrar validación en modo de solo lectura
    } 
  }

  /**
   * Valida que todos los campos requeridos estén completados.
   * 
   * Verifica si todos los campos obligatorios del formulario han sido
   * completados por el usuario. Si todos están completos, ejecuta
   * la lógica de formulario completo.
   * 
   * @private
   * @param {Record<string, string | number | null | undefined>} selecciones - Objeto con los valores actuales de todos los campos
   * @memberof DatosComunesComponent
   */
  private validarCamposRequeridos(selecciones: Record<string, string | number | null | undefined>): void {
    const CAMPOS_REQUERIDOS = ['190', '191', '199', '200', '201', '244', '246', '247', '248', '249', '250', '251'];
    const CAMPOS_PENDIENTES = CAMPOS_REQUERIDOS.filter(campo => 
      selecciones[campo] === null || 
      selecciones[campo] === undefined || 
      selecciones[campo] === ''
    );

    if (CAMPOS_PENDIENTES.length === 0) {
      this.onFormularioCompleto();
    }
  }

  /**
   * Método llamado cuando todos los campos requeridos están completados.
   * 
   * Se ejecuta cuando la validación confirma que todos los campos
   * obligatorios han sido completados. Verifica la validez del formulario
   * y puede habilitar funcionalidades adicionales como el botón de envío.
   * 
   * @private
   * @memberof DatosComunesComponent
   */
  private onFormularioCompleto(): void {
    if (this.datosComunesForm.valid) {
      // El formulario está completo y válido.
    }
  }

  /**
   * Actualiza el valor del checkbox 1.
   * 
   * Extrae el estado checked del checkbox desde el evento
   * y lo almacena en el store para el campo checkbox1.
   * 
   * @param {Event} valor - Evento de cambio del checkbox
   * @memberof DatosComunesComponent
   */
  actualizarCheckbox1(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).checked;
    this.solicitud32604Store.actualizarCheckbox1(VALOR);
  }

  /**
   * Actualiza el valor del checkbox 2.
   * 
   * Extrae el estado checked del checkbox desde el evento
   * y lo almacena en el store para el campo checkbox2.
   * 
   * @param {Event} valor - Evento de cambio del checkbox
   * @memberof DatosComunesComponent
   */
  actualizarCheckbox2(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).checked;
    this.solicitud32604Store.actualizarCheckbox2(VALOR);
  }

  /**
   * Actualiza el valor del checkbox 3.
   * 
   * Extrae el estado checked del checkbox desde el evento
   * y lo almacena en el store para el campo checkbox3.
   * 
   * @param {Event} valor - Evento de cambio del checkbox
   * @memberof DatosComunesComponent
   */
  actualizarCheckbox3(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).checked;
    this.solicitud32604Store.actualizarCheckbox3(VALOR);
  }

  /**
   * Actualiza el campo 'Actualmente2' en el estado global.
   * 
   * Extrae el valor del input desde el evento de cambio
   * y lo almacena en el store para el campo actualmente2.
   * 
   * @param {Event} valor - Evento de cambio del input
   * @memberof DatosComunesComponent
   */
  actualizarActualmente2(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarActualmente2(VALOR);
  }

  /**
   * Actualiza el campo 'Actualmente1' en el estado global.
   * 
   * Extrae el valor del input desde el evento de cambio
   * y lo almacena en el store para el campo actualmente1.
   * 
   * @param {Event} valor - Evento de cambio del input
   * @memberof DatosComunesComponent
   */
  actualizarActualmente1(valor: Event): void {
    const VALOR = (valor.target as HTMLInputElement).value;
    this.solicitud32604Store.actualizarActualmente1(VALOR);
  }

  /**
   * Guarda la selección de inventarios hecha por el usuario.
   * 
   * Recibe un array de inventarios seleccionados desde la tabla
   * y los almacena en la propiedad correspondiente para su
   * posterior procesamiento o eliminación.
   * 
   * @param {Inventarios[]} evento - Array de inventarios seleccionados por el usuario
   * @memberof DatosComunesComponent
   */
  seleccionarInventariosDatos(evento: Inventarios[]): void {
    this.seleccionarInventarios = evento;
  }

  /**
   * Elimina los inventarios seleccionados de la lista principal.
   * 
   * Itera sobre los inventarios seleccionados, busca cada uno en la lista
   * principal por nombre y los elimina. Utiliza el método splice para
   * remover elementos del array de forma segura.
   * 
   * @memberof DatosComunesComponent
   */
  eliminarInventariosDatos(): void {
    if (this.seleccionarInventarios.length > 0) {
      this.seleccionarInventarios.forEach((elemento) => {
        const INDICE = this.inventariosDatos.findIndex(
          (inv) => inv.nombre === elemento.nombre
        );
        if (INDICE !== -1) {
          this.inventariosDatos.splice(INDICE, 1);
        }
      });
    }
  }

  /**
   * Guarda la selección de socios hecha por el usuario.
   * 
   * Almacena el array de socios IC seleccionados desde la tabla
   * en la propiedad correspondiente para operaciones posteriores
   * como modificación o eliminación.
   * 
   * @param {SeccionSociosIC[]} evento - Array de socios IC seleccionados
   * @memberof DatosComunesComponent
   */
  seleccionarlistaSeccionSociosIC(evento: SeccionSociosIC[]): void {
    this.seleccionarListaSeccionSociosIC = evento;
  }

  /**
   * Elimina los socios seleccionados de la lista principal.
   * 
   * Busca cada socio seleccionado en la lista principal por nombre
   * y los elimina utilizando splice. Esto permite remover múltiples
   * socios de forma segura del array principal.
   * 
   * @memberof DatosComunesComponent
   */
  eliminarlistaSeccionSociosIC(): void {
    if (this.seleccionarListaSeccionSociosIC.length > 0) {
      this.seleccionarListaSeccionSociosIC.forEach((elemento) => {
        const INDICE = this.listaSeccionSociosIC.findIndex(
          (inv) => inv.nombre === elemento.nombre
        );
        if (INDICE !== -1) {
          this.listaSeccionSociosIC.splice(INDICE, 1);
        }
      });
    }
  }

  /**
   * Guarda la selección de domicilios hecha por el usuario.
   * 
   * Almacena el array de domicilios seleccionados desde la tabla
   * en la propiedad correspondiente para operaciones posteriores
   * como modificación o eliminación.
   * 
   * @param {Domicilios[]} evento - Array de domicilios seleccionados
   * @memberof DatosComunesComponent
   */
  seleccionarDomiciliosDato(evento: Domicilios[]): void {
    this.seleccionarDomiciliosDatos = evento;
  }

  /**
   * Elimina los domicilios seleccionados de la lista principal.
   * 
   * Busca cada domicilio seleccionado en la lista principal por tipo de instalación
   * y los elimina utilizando splice. Permite remover múltiples domicilios
   * de forma segura del array principal.
   * 
   * @memberof DatosComunesComponent
   */
  eliminarDomiciliosDatos(): void {
    if (this.seleccionarDomiciliosDatos.length > 0) {
      this.seleccionarDomiciliosDatos.forEach((elemento) => {
        const INDICE = this.domiciliosDatos.findIndex(
          (inv) => inv.tipoInstalacion === elemento.tipoInstalacion
        );
        if (INDICE !== -1) {
          this.domiciliosDatos.splice(INDICE, 1);
        }
      });
    }
  }

  /**
   * Guarda la selección de número de empleados hecha por el usuario.
   * 
   * Almacena el array de registros de número de empleados seleccionados
   * desde la tabla en la propiedad correspondiente para operaciones
   * posteriores como modificación o eliminación.
   * 
   * @param {NumeroDeEmpleados[]} evento - Array de registros de número de empleados seleccionados
   * @memberof DatosComunesComponent
   */
  seleccionarNumeroDeEmpleadosDato(evento: NumeroDeEmpleados[]): void {
    this.seleccionarNumeroDeEmpleadosLista = evento;
  }

  /**
   * Elimina los registros de número de empleados seleccionados.
   * 
   * Busca cada registro seleccionado en la lista principal por número de empleados
   * y los elimina utilizando splice. Permite remover múltiples registros
   * de forma segura del array principal.
   * 
   * @memberof DatosComunesComponent
   */
  eliminarNumeroDeEmpleadosDato(): void {
    if (this.seleccionarNumeroDeEmpleadosLista.length > 0) {
      this.seleccionarNumeroDeEmpleadosLista.forEach((elemento) => {
        const INDICE = this.numeroDeEmpleadosLista.findIndex(
          (inv) => inv.numeroDeEmpleados === elemento.numeroDeEmpleados
        );
        if (INDICE !== -1) {
          this.numeroDeEmpleadosLista.splice(INDICE, 1);
        }
      });
    }
  }

  /**
   * Maneja los datos seleccionados desde el componente agregar.
   * 
   * Recibe un array de instalaciones seleccionadas desde el componente
   * agregar, las agrega a la lista de socios IC, actualiza el store
   * y muestra un mensaje de confirmación al usuario.
   * 
   * @param {Instalaciones[]} datosSeleccionados - Array de datos seleccionados desde el componente agregar
   * @memberof DatosComunesComponent
   */
  onDatosSeleccionados(datosSeleccionados: Instalaciones[]): void {
    if (datosSeleccionados && datosSeleccionados.length > 0) {
      this.listaSeccionSociosIC = [...this.listaSeccionSociosIC, ...datosSeleccionados];
      this.solicitud32604Store.actualizarListaSeccionSociosIC(
        this.listaSeccionSociosIC
      );
      this.abrirModal('Datos agregados exitosamente');
    }
  }

  /**
   * Limpia y completa la señal de destrucción para evitar fugas de memoria.
   * 
   * Método del ciclo de vida que se ejecuta cuando el componente se destruye.
   * Emite un valor en el Subject destroy$ y lo completa para cancelar
   * automáticamente todas las suscripciones activas y prevenir memory leaks.
   * 
   * @memberof DatosComunesComponent
   * @implements {OnDestroy}
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
