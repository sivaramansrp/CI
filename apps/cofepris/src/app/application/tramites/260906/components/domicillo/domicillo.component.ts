import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrossListLable, CrosslistComponent, InputFecha, InputFechaComponent, Notificacion, NotificacionesComponent, Pedimento, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MERCANCIAS_DATA, MercanciasInfo, NICO_TABLA, NicoInfo } from '@libs/shared/data-access-user/src/core/models/260906/domicilo.model';
import { Solicitud260906State, Tramite260906Store } from '../../../../estados/tramites/tramite260906.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CROSLISTA_DE_PAISES } from '@libs/shared/data-access-user/src/core/enums/260906/domicilo.enum';
import { CommonModule } from '@angular/common';
import { FECHA_DE_PAGO } from '@libs/shared/data-access-user/src/core/enums/260906/manifiestos.enum';
import { HttpClient } from '@angular/common/http';
import { SanitarioService } from '../../services/sanitario.service';
import { Tramite260906Query } from '../../../../estados/queries/tramite260906.query';

/**
 * Interfaz para la respuesta de la tabla de NICO.
 */
export interface RespuestaTabla {
  /**
   * Codigo de respuesta.
   */
  codigo: number;
  /**
   * Datos de la tabla NICO.
   */
  datos: NicoInfo[];
  /**
   * Mensaje de la respuesta.
   */
  mensaje: string;
}

/**
 * Interfaz para la respuesta de la tabla de mercancías.
 */
export interface MercanciasTabla {
  /**
   * Codigo de respuesta.
   */
  codigo: number;
  /**
   * Datos de la tabla de mercancías.
   */
  datos: MercanciasInfo[];
  /**
   * Mensaje de la respuesta.
   */
  mensaje: string;
}

/**
 * @component
 * @name DomicilloComponent
 * @description
 * Componente principal para gestionar el formulario de domicilio.
 * Este componente incluye funcionalidades para manejar datos de domicilio,
 * mercancías, agentes y tablas dinámicas.
 */
@Component({
  selector: 'app-domicillo',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    InputFechaComponent,
    NotificacionesComponent
  ],
  templateUrl: './domicillo.component.html',
  styleUrl: './domicillo.component.css',
})
export class DomicilloComponent implements OnInit, OnDestroy {
  /**
   * Indica si un campo es requerido o no.
   * @type {boolean}
   * @default false
   */
  noRequerido: boolean = false;
  /**
   * Lista de componentes Crosslist disponibles en la vista.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Estado actual de la solicitud.
   */
  public solicitudState!: Solicitud260906State;

  /**
   * Notificador para destruir los observables al finalizar.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Constructor del componente.
   * @param fb FormBuilder para crear formularios reactivos.
   * @param httpServicios Cliente HTTP para servicios API.
   * @param tramite260906Store Almacén del trámite 260906.
   * @param tramite260906Query Consulta del trámite 260906.
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly httpServicios: HttpClient,
    private tramite260906Store: Tramite260906Store,
    private tramite260906Query: Tramite260906Query,
    private service: SanitarioService,
  ) {
    // Dependencia inyectada para uso posterior
  }

  /**
   * Grupo de formularios para domicilio.
   */
  domicilio!: FormGroup;

  /**
   * Grupo de formularios para agente.
   */
  formAgente!: FormGroup;

  /**
   * Grupo de formularios para mercancías.
   */
  formMercancias!: FormGroup;

  /**
   * Control para la fecha de aduanas de entrada.
   */
  aduanasDeEntradaFecha: FormControl = new FormControl('');

  /**
   * Control para la fecha seleccionada de aduanas de entrada.
   */
  aduanasDeEntradaFechaSeleccionada: FormControl = new FormControl('');
  /**
   * Lista de catálogos de formaFarmaceutica.
   */
  formaFarmaceutica: Catalogo[] = [];
  /**
   * Lista de catálogos de estados.
   */
  estado: Catalogo[] = [];

  /**
   * Lista de países para la selección de origen.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;

  /**
   * Configuración de tabla para selección de tipo checkbox.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de columnas para la tabla NICO.
   */
  nicoTabla: ConfiguracionColumna<NicoInfo>[] = NICO_TABLA;

  /**
   * Datos cargados para la tabla NICO.
   */
  nicoTablaDatos: NicoInfo[] = [];

  /**
   * Configuración de columnas para la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos cargados para la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Lista de aduanas seleccionadas.
   */
  aduanasDeEntradaSeleccionadas: string[] = [];

  /**
   * Lista de datos de aduanas de entrada.
   */
  aduanasDeEntradaDatos: string[] = [];

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
   * Etiqueta para el crosslist de país de procedencia.
   */
  public paisDeProcedenciaLabel: CrossListLable = {
    tituluDeLaIzquierda: 'País de procedencia',
    derecha: 'País(es) seleccionados',
  };

  /**
   * Configuración de las fechas de inicio y fin.
   * @type {InputFecha}
   */
  public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;

  pedimentos: Array<Pedimento> = [];
  elementoParaEliminar!: number;
  public nuevaNotificacion!: Notificacion;

  /**
   * Método que se ejecuta al inicializar el componente.
   */
  ngOnInit(): void {
    this.tramite260906Query
      .selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.obtenerFormaFarmaceuticaList();
    this.obtenerEstadoList();
    this.obtenerTablaDatos();
    this.obtenerMercanciasDatos();
    this.inicializarFormGroup();
  }

  inicializarFormGroup(): void {
    /**
 * Inicialización del formulario de domicilio.
 */
    this.domicilio = this.fb.group({
      codigoPostal: [this.solicitudState?.codigoPostal, Validators.required],
      formaFarmaceutica: [this.solicitudState?.formaFarmaceutica, Validators.required],
      estado: [this.solicitudState?.estado, Validators.required],
      muncipio: [this.solicitudState?.muncipio, Validators.required],
      localidad: [this.solicitudState?.localidad],
      colonia: [this.solicitudState?.colonia],
      calle: [this.solicitudState?.calle],
      lada: [this.solicitudState?.lada],
      telefono: [this.solicitudState?.telefono, Validators.required],
      avisoCheckbox: [this.solicitudState?.avisoCheckbox],
      licenciaSanitaria: [{ value: this.solicitudState?.licenciaSanitaria, disabled: false }],
      regimen: [this.solicitudState?.regimen],
      aduanasEntradas: [this.solicitudState?.aduanasEntradas],
      numeroPermiso: [this.solicitudState?.numeroPermiso],
      tiempoPrograma: [this.solicitudState?.tiempoPrograma]
    });

    /**
     * Inicialización del formulario de agente.
     */
    this.formAgente = this.fb.group({
      claveScianModal: [this.solicitudState?.claveScianModal, Validators.required],
      claveDescripcionModal: [this.solicitudState?.claveDescripcionModal],
    });

    /**
     * Inicialización del formulario de mercancías.
     */
    this.formMercancias = this.fb.group({
      clasificacion: [this.solicitudState?.clasificacion, Validators.required],
      especificarClasificacionProducto: [this.solicitudState?.especificarClasificacionProducto, Validators.required],
      denominacionEspecifica: [this.solicitudState?.denominacionEspecifica, Validators.required],
      denominacionDistintiva: [this.solicitudState?.denominacionDistintiva, Validators.required],
      denominacionComun: [this.solicitudState?.denominacionComun, Validators.required],
      tipoDeProducto: [this.solicitudState?.tipoDeProducto, Validators.required],
      formaFarmaceutica: [this.solicitudState?.formaFarmaceutica, Validators.required],
      estadoFisico: [this.solicitudState?.estadoFisico, Validators.required],
      fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, Validators.required],
      descripcionFraccion: [{ value: this.solicitudState?.descripcionFraccion, disabled: true }, Validators.required],
      cantidadUMT: [this.solicitudState?.cantidadUMT, Validators.required],
      UMT: [{ value: this.solicitudState?.UMT, disabled: true }, Validators.required],
      cantidadUMC: [this.solicitudState?.cantidadUMC, Validators.required],
      UMC: [this.solicitudState?.UMC, Validators.required],
      presentacion: [this.solicitudState?.presentacion, Validators.required],
      numeroRegistro: [this.solicitudState?.numeroRegistro, Validators.required],
      fechaCaducidad: [this.solicitudState?.fechaCaducidad],
    });
  }

  /**
   * Botones de acción para gestionar listas de países en la primera sección.
   */
  paisDeProcedenciaBotons = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: (): void => this.crossList.toArray()[0].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: (): void => this.crossList.toArray()[0].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: (): void => this.crossList.toArray()[0].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: (): void => this.crossList.toArray()[0].quitar('t') },
  ];

  /**
   * Botones de acción para gestionar listas de países en la segunda sección.
   */
  paisDeProcedenciaBotonsDos = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: (): void => this.crossList.toArray()[1].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: (): void => this.crossList.toArray()[1].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: (): void => this.crossList.toArray()[1].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: (): void => this.crossList.toArray()[1].quitar('t') },
  ];

  /**
   * Botones de acción para gestionar listas de países en la tercera sección.
   */
  paisDeProcedenciaBotonsTres = [
    { btnNombre: 'Agregar todos', class: 'btn-primary', funcion: (): void => this.crossList.toArray()[2].agregar('t') },
    { btnNombre: 'Agregar selección', class: 'btn-default', funcion: (): void => this.crossList.toArray()[2].agregar('') },
    { btnNombre: 'Restar selección', class: 'btn-danger', funcion: (): void => this.crossList.toArray()[2].quitar('') },
    { btnNombre: 'Restar todos', class: 'btn-default', funcion: (): void => this.crossList.toArray()[2].quitar('t') },
  ];

  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerFormaFarmaceuticaList(): void {
    this.service.obtenerFormaFarmaceuticaList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.formaFarmaceutica = DATOS;
      });
  }
  /**
   * Obtiene la lista de estados desde un archivo JSON.
   */
  obtenerEstadoList(): void {
    this.service.obtenerEstadoList()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.data;
        this.estado = DATOS;
      });
  }

  /**
   * Obtiene los datos para la tabla de NICO desde un archivo JSON.
   */
  obtenerTablaDatos(): void {
    this.service.obtenerTablaDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.datos;
        this.nicoTablaDatos = DATOS;
      });
  }

  /**
   * Obtiene los datos de la tabla de mercancías desde un archivo JSON.
   */
  obtenerMercanciasDatos(): void {
    this.service.obtenerMercanciasDatos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        const DATOS = data?.datos;
        this.mercanciasTablaDatos = DATOS;
      });
  }

  /**
   * Maneja el cambio del checkbox en el formulario y actualiza el estado correspondiente.
   * @param event Evento del checkbox.
   * @param form Formulario en el que se realiza el cambio.
   * @param campo Nombre del campo afectado.
   * @param metodoNombre Método correspondiente del store para actualizar el valor.
   */
  onAvisoCheckboxChange(
    event: Event,
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260906Store
  ): void {
    const CHECKBOX = event.target as HTMLInputElement;
    if (CHECKBOX.checked) {
      this.domicilio.get('licenciaSanitaria')?.disable();
    } else {
      this.domicilio.get('licenciaSanitaria')?.enable();
    }
    const VALOR = form.get(campo)?.value;
    (this.tramite260906Store[metodoNombre] as (value: unknown) => void)(VALOR);
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
   * Establece el valor de un campo en el store de Tramite31601.
   * @param form - El grupo de formularios que contiene el campo.
   * @param campo - El nombre del campo cuyo valor se va a establecer.
   * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite260906Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260906Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }


  /**
   * Cambia el valor de la fecha final en el formulario.
   * @param nuevo_valor Nuevo valor de la fecha final.
   */
  public cambioFechaFinal(nuevo_valor: string): void {

    this.formMercancias.get('fechaCaducidad')?.setValue(nuevo_valor);
    this.formMercancias.get('fechaCaducidad')?.markAsUntouched();
  }

  /**
  * Habilita todos los controles del formulario si están deshabilitados.
  * @returns {void}
  */
  eliminarFormControls(): void {
    this.abrirModal('¿Estás seguro que deseas eliminar los registros marcados?', true);
  }

  /**
  * Habilita todos los controles del formulario si están deshabilitados.
  * @returns {void}
  */
  eliminarMercancias(): void {
    this.abrirModal('Selecciona un registro.', false);
  }

  /**
 * Elimina un elemento de la lista de pedimentos en la posición especificada.
 * 
 * @param {number} i - El índice del elemento a eliminar.
 * 
 * @remarks
 * Después de eliminar el elemento, se actualiza el título y mensaje del modal,
 * y se abre el modal para mostrar un aviso al usuario.
 */
  abrirModal(mensaje: string, cancelar: boolean): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: cancelar ? 'Cancelar' : '',
    }
  }


}
