import { CROSLISTA_DE_PAISES, ETIQUETA, FECHA_DE_FABRICACION, FECHA_DE_PAGO, OPCIONES_DE_BOTON_DE_RADIO } from '@libs/shared/data-access-user/src/core/enums/260104/domicilo.enum';
import { Catalogo, CatalogoSelectComponent, CatalogosSelect, ConfiguracionColumna, CrosslistComponent, InputFecha, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MERCANCIAS_DATA,
  MercanciasInfo,
  NICO_TABLA,
  NicoInfo,
} from '@libs/shared/data-access-user/src/core/models/260104/domicilo.model';
import { Solicitud260104State, Tramite260104Store } from '../../../../estados/tramites/tramite260104.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PermisoSanitarioProductosService } from '../../services/permiso-sanitario-productos.service';
import { Tramite260104Query } from '../../../../estados/queries/tramite260104.query';

/**
 * Componente que gestiona los datos de la solicitud en el trámite 260104.
 * Este componente incluye formularios, tablas dinámicas y listas cruzadas (crosslists)
 * para la gestión de información relacionada con mercancías y países de procedencia.
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CrosslistComponent,
    InputFechaComponent,
    InputRadioComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
})
export class DatosDeLaSolicitudComponent implements OnInit,OnDestroy{
  /**
   * Lista de componentes Crosslist disponibles en la vista.
   * Utilizado para gestionar las listas de países en diferentes secciones.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Formulario principal de la solicitud.
   */
  solicitudForm!: FormGroup;

  /**
   * Formulario para la gestión de datos del agente.
   */
  formAgente!: FormGroup;

  /**
   * Formulario para la gestión de datos de mercancías.
   */
  formMercancias!: FormGroup;

  /**
   * Estado del catálogo de selección.
   */
  estadoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Lista de estados disponibles.
   */
  estado: Catalogo[] = [];

  /**
   * Indica si el campo "Especifique" está habilitado.
   */
  isHabilitarEspecifique: boolean = false;

  /**
   * Indica si el campo "Especifique Tipo" está habilitado.
   */
  isHabilitarEspecifiqueTipo: boolean = false;

  /**
   * Sujeto utilizado para manejar la destrucción de observables.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Configuración de selección para las tablas dinámicas.
   */
  tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Estado de la solicitud obtenido desde el store.
   */
  public solicitudState!: Solicitud260104State;

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
   * Indica si la primera sección es colapsable.
   */
  colapsable: boolean = false;

  /**
   * Indica si la segunda sección es colapsable.
   */
  colapsableDos: boolean = false;

  /**
   * Indica si la tercera sección es colapsable.
   */
  colapsableTres: boolean = false;

  /**
   * Lista de países disponibles para la selección de origen.
   */
  public crosListaDePaises = CROSLISTA_DE_PAISES;

  /**
   * Etiqueta para el crosslist de país de procedencia.
   */
  public paisDeProcedenciaLabel = ETIQUETA;

  /**
   * Lista de países para seleccionar el origen en la primera sección.
   */
  seleccionarOrigenDelPais: string[] = this.crosListaDePaises;

  /**
   * Lista de países para seleccionar el origen en la segunda sección.
   */
  seleccionarOrigenDelPaisDos: string[] = this.crosListaDePaises;

  /**
   * Lista de países para seleccionar el origen en la tercera sección.
   */
  seleccionarOrigenDelPaisTres: string[] = this.crosListaDePaises;

  /**
   * Configuración para el campo de fecha de caducidad.
   */
  public fechaCaducidadInput: InputFecha = FECHA_DE_PAGO;

  /**
   * Configuración para el campo de fecha de fabricación.
   */
  public fechaFabricacionInput: InputFecha = FECHA_DE_FABRICACION;

  /**
   * Opciones para los botones de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Constructor del componente.
   * @param fb - Constructor de formularios reactivos.
   * @param permisoSanitarioProductosService - Servicio para gestionar datos de permisos sanitarios.
   * @param tramite260104Store - Store para gestionar el estado del trámite.
   * @param tramite260104Query - Query para obtener datos del estado del trámite.
   */
  constructor(
    public fb: FormBuilder,
    public permisoSanitarioProductosService: PermisoSanitarioProductosService,
    private tramite260104Store: Tramite260104Store,
    private tramite260104Query: Tramite260104Query
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Configura los formularios y suscriptores necesarios.
   */
  ngOnInit(): void {
    this.tramite260104Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.crearFormulario();
    this.obtenerEstadoCatalogo();
    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerMercanciasDatos();
  }

  /**
   * Crea y configura los formularios utilizados en el componente.
   */
  crearFormulario(): void {
    this.solicitudForm = this.fb.group({
      razonSocial: [{ value: this.solicitudState?.razonSocial, disabled: true }, Validators.required],
      correoElectronico: [{ value: this.solicitudState?.correoElectronico, disabled: true }, Validators.required, Validators.email],
      codigoPostal: [this.solicitudState?.codigoPostal, Validators.required],
      estado: [this.solicitudState?.estado, Validators.required],
      municipio: [this.solicitudState?.municipio, Validators.required],
      localidad: [this.solicitudState?.localidad],
      colonia: [this.solicitudState?.colonia],
      calle: [this.solicitudState?.calle, Validators.required],
      lada: [this.solicitudState?.lada],
      telefono: [this.solicitudState?.telefono, Validators.required],
      avisoCheckbox: [this.solicitudState?.avisoCheckbox],
      licenciaSanitaria: [this.solicitudState?.licenciaSanitaria],
      regimen: [this.solicitudState?.regimen, Validators.required],
      aduana: [this.solicitudState?.aduana, Validators.required],
      manifesto: [this.solicitudState?.manifesto, Validators.required],
      hacerlosPublicos: [this.solicitudState?.hacerlosPublicos, Validators.required],
    });

    this.formAgente = this.fb.group({
      claveScianModal: [this.solicitudState?.claveScianModal, Validators.required],
      claveDescripcionModal: [this.solicitudState?.claveDescripcionModal],
    });

    this.formMercancias = this.fb.group({
      clasificacion: [this.solicitudState?.clasificacion, Validators.required],
      especificarClasificacionProducto: [this.solicitudState?.especificarClasificacionProducto, Validators.required],
      especifique: [this.solicitudState?.especifique, Validators.required],
      denominacionEspecifica: [this.solicitudState?.denominacionEspecifica, Validators.required],
      marca: [this.solicitudState?.marca, Validators.required],
      especifiqueTipo: [this.solicitudState?.especifiqueTipo, Validators.required],
      fraccionArancelaria: [this.solicitudState?.fraccionArancelaria, Validators.required],
      descripcionFraccion: [{ value: this.solicitudState?.descripcionFraccion, disabled: true }, Validators.required],
      cantidadUMT: [this.solicitudState?.cantidadUMT, Validators.required],
      UMT: [{ value: this.solicitudState?.UMT, disabled: true }, Validators.required],
      cantidadUMC: [this.solicitudState?.cantidadUMC, Validators.required],
      UMC: [this.solicitudState?.UMC, Validators.required],
      claveDeLosLotes: [this.solicitudState?.claveDeLosLotes, Validators.required],
      fechaCaducidad: [this.solicitudState?.fechaCaducidad, Validators.required],
      fechaFabricacion: [this.solicitudState?.fechaFabricacion, Validators.required],
      tipoDeProducto: [this.solicitudState?.tipoDeProducto, Validators.required],
    });
  }
  /**
 * Obtiene el catálogo de estados desde el servicio.
 * Este método realiza una suscripción al servicio `PermisoSanitarioProductosService`
 * para obtener los datos del catálogo de estados y los asigna a la propiedad `estadoCatalogo`.
 */
obtenerEstadoCatalogo(): void {
  this.permisoSanitarioProductosService
    .obtenerEstadoCatalogo()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe({
      next: (respuesta: CatalogosSelect) => {
        this.estadoCatalogo = respuesta;
      },
    });
}

/**
 * Habilita el campo "Especifique" y actualiza el valor en el store.
 * @param form - El formulario que contiene el campo.
 * @param campo - El nombre del campo a habilitar.
 * @param metodoNombre - El método del store que se utilizará para actualizar el valor.
 */
habilitarEspecifique(
  form: FormGroup,
  campo: string,
  metodoNombre: keyof Tramite260104Store
): void {
  this.isHabilitarEspecifique = true;
  const VALOR = form.get(campo)?.value;
  (this.tramite260104Store[metodoNombre] as (value: unknown) => void)(VALOR);
}

/**
 * Habilita el campo "Especifique Tipo" y actualiza el valor en el store.
 * @param form - El formulario que contiene el campo.
 * @param campo - El nombre del campo a habilitar.
 * @param metodoNombre - El método del store que se utilizará para actualizar el valor.
 */
habilitarEspecifiqueTipo(
  form: FormGroup,
  campo: string,
  metodoNombre: keyof Tramite260104Store
): void {
  this.isHabilitarEspecifiqueTipo = true;
  const VALOR = form.get(campo)?.value;
  (this.tramite260104Store[metodoNombre] as (value: unknown) => void)(VALOR);
}

/**
 * Obtiene los datos de la tabla NICO desde el servicio.
 * Este método realiza una suscripción al servicio `PermisoSanitarioProductosService`
 * para obtener los datos de la tabla y los asigna a la propiedad `nicoTablaDatos`.
 */
obtenerTablaDatos(): void {
  this.permisoSanitarioProductosService.obtenerTablaDatos()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((data) => {
      const DATOS = data?.datos;
      this.nicoTablaDatos = DATOS;
    });
}

/**
 * Obtiene los datos de la tabla de mercancías desde un archivo JSON.
 * Este método realiza una suscripción al servicio `PermisoSanitarioProductosService`
 * para obtener los datos de la tabla y los asigna a la propiedad `mercanciasTablaDatos`.
 */
obtenerMercanciasDatos(): void {
  this.permisoSanitarioProductosService.obtenerMercanciasDatos()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((data) => {
      const DATOS = data?.datos;
      this.mercanciasTablaDatos = DATOS;
    });
}

/**
 * Obtiene la lista de estados desde el servicio.
 * Este método realiza una suscripción al servicio `PermisoSanitarioProductosService`
 * para obtener los datos de la lista de estados y los asigna a la propiedad `estado`.
 */
obtenerEstadoList(): void {
  this.permisoSanitarioProductosService.obtenerEstadoList()
    .pipe(takeUntil(this.destroyNotifier$))
    .subscribe((data) => {
      const DATOS = data?.data;
      this.estado = DATOS;
    });
}

/**
 * Habilita los campos "razón social" y "correo electrónico" en el formulario principal.
 */
habilitarCampos(): void {
  this.solicitudForm.get('razonSocial')?.enable();
  this.solicitudForm.get('correoElectronico')?.enable();
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
 * Actualiza el valor del campo "fecha de caducidad" en el formulario de mercancías.
 * @param nuevo_valor - El nuevo valor de la fecha de caducidad.
 */
public cambioFechaFinal(nuevo_valor: string): void {
  this.formMercancias.get('fechaCaducidad')?.setValue(nuevo_valor);
  this.formMercancias.get('fechaCaducidad')?.markAsUntouched();
}

/**
 * Actualiza el valor del campo "fecha de fabricación" en el formulario de mercancías.
 * @param nuevo_valor - El nuevo valor de la fecha de fabricación.
 */
public cambioFechaFabricacion(nuevo_valor: string): void {
  this.formMercancias.get('fechaFabricacion')?.setValue(nuevo_valor);
  this.formMercancias.get('fechaFabricacion')?.markAsUntouched();
}

/**
 * Establece el valor de un campo en el store de Tramite260104.
 * @param form - El grupo de formularios que contiene el campo.
 * @param campo - El nombre del campo cuyo valor se va a establecer.
 * @param metodoNombre - El nombre del método en el store que se utilizará para establecer el valor.
 */
setValoresStore(
  form: FormGroup,
  campo: string,
  metodoNombre: keyof Tramite260104Store
): void {
  const VALOR = form.get(campo)?.value;
  (this.tramite260104Store[metodoNombre] as (value: unknown) => void)(VALOR);
}

/**
 * Método que se ejecuta al destruir el componente.
 * Libera los recursos y completa los observables.
 */
ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}
}
