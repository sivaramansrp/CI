import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, Notificacion, NotificacionesComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DatoTabla, Fila, FilaSolicitud, RealizarGroup } from '../../models/220203/importacion-de-acuicultura.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subject, catchError, forkJoin, map, of, takeUntil } from 'rxjs';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { MENSAJE_DOBLE_CLIC } from '../../constantes/220203/importacion-de-acuicultura.enum';
import { MercanciaSolicitudComponent } from '../mercancia-solicitud/mercancia-solicitud.component';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';

/**
 * @fileoverview
 * Componente Angular para gestionar los datos de la solicitud de importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada con la mercancía, así como mostrar tablas dinámicas y catálogos.
 * Cobertura de documentación completa: cada propiedad, método y constructor está documentado en español.
 * @module DatosDeLaSolicitudComponent
 */

/**
 * Componente para gestionar los datos de la solicitud de importación de acuicultura.
 * Permite capturar, validar y actualizar la información relacionada con la mercancía, así como mostrar tablas dinámicas y catálogos.
 * Gestiona formularios reactivos con validaciones, tablas interactivas y operaciones CRUD sobre mercancías.
 * 
 * @export
 * @class DatosDeLaSolicitudComponent
 * @implements {OnDestroy}
 * @implements {OnInit}
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-datos-de-la-solicitud',
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrl: './datos-de-la-solicitud.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    CommonModule,
    ModalComponent,
    NotificacionesComponent
  ],
})
export class DatosDeLaSolicitudComponent implements OnDestroy, OnInit {
  /**
   * Representa una nueva notificación que será utilizada en el componente.
   * Contiene la configuración de alertas y mensajes de confirmación para el usuario.
   * @type {Notificacion}
   * @public
   * @memberof DatosDeLaSolicitudComponent
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Referencia al componente modal para mostrar formularios de mercancía.
   * Se utiliza para abrir y cerrar modales de forma programática.
   * @type {ModalComponent}
   * @memberof DatosDeLaSolicitudComponent
   */
  @ViewChild('modalRef') modalRef!: ModalComponent;

  /**
   * Lista de filas seleccionadas en la tabla de mercancías.
   * Mantiene el estado de selección para operaciones de edición y eliminación.
   * @type {Fila[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  listSelectedView: Fila[] = [];

  /**
   * Subject para controlar la destrucción de suscripciones y evitar memory leaks.
   * Se utiliza para limpiar todas las suscripciones activas al destruir el componente.
   * @type {Subject<void>}
   * @private
   * @memberof DatosDeLaSolicitudComponent
   */
  private readonly DESTROY_NOTIFIER$ = new Subject<void>();

  /**
   * Mensaje que se muestra en una alerta al hacer doble clic en elementos de la tabla.
   * Proporciona información al usuario sobre acciones disponibles.
   * @type {string}
   * @memberof DatosDeLaSolicitudComponent
   */
  alertMessage: string = MENSAJE_DOBLE_CLIC;

  /**
   * Tipo de selección para la tabla principal de mercancías.
   * Permite seleccionar múltiples elementos usando checkboxes.
   * @type {TablaSeleccion}
   * @memberof DatosDeLaSolicitudComponent
   */
  tipoSeleccion: TablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Tipo de selección para la tabla de solicitudes.
   * No permite selección de elementos en esta tabla específica.
   * @type {TablaSeleccion}
   * @memberof DatosDeLaSolicitudComponent
   */
  tipoSeleccionsoli: TablaSeleccion = TablaSeleccion.UNDEFINED;

  /**
   * Datos del cuerpo de la tabla de solicitudes.
   * Contiene la información mostrada en la tabla de solicitudes secundaria.
   * @type {DatoTabla[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  cuerpoTablasoli: DatoTabla[] = [];

  /**
   * Configuración de columnas para la tabla principal de mercancías.
   * Define la estructura, orden y visualización de cada columna en la tabla.
   * @type {ConfiguracionColumna<Fila>[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  configuracionColumnas: ConfiguracionColumna<Fila>[] = [
    { encabezado: 'No. partida', clave: (fila) => fila.noPartida, orden: 1 },
    { encabezado: 'Tipo de requisito', clave: (fila) => fila.tipoRequisito, orden: 2 },
    { encabezado: 'Requisito', clave: (fila) => fila.requisito, orden: 3 },
    { encabezado: 'Número de Certificado Internacional', clave: (fila) => fila.numeroCertificado, orden: 4 },
    { encabezado: 'Fracción arancelaria', clave: (fila) => fila.fraccionArancelaria, orden: 5 },
    { encabezado: 'Descripción de la fracción', clave: (fila) => fila.descripcionFraccion, orden: 6 },
    { encabezado: 'Nico', clave: (fila) => fila.nico, orden: 7 },
    {encabezado:'Descripción Nico', clave: (fila) => fila.descripcionNico, orden: 8},
    { encabezado: 'Descripción', clave: (fila) => fila.descripcion, orden: 9 },
    { encabezado: 'Unidad de medida de tarifa (UMT)', clave: (fila) => fila.medidadetarifa, orden: 10 },
    { encabezado: 'Cantidad UMT', clave: (fila) => fila.cantidadUMT, orden: 11 },
    { encabezado: 'Unidad de medida de comercialización (UMC)', clave: (fila) => fila.umc, orden: 12 },
    { encabezado: 'Cantidad UMC', clave: (fila) => fila.cantidadUMC, orden: 13 },
    { encabezado: 'Uso', clave: (fila) => fila.uso, orden: 14 },
    { encabezado: 'Especie', clave: (fila) => fila.especie, orden: 15 },
    { encabezado: 'País de origen', clave: (fila) => fila.paisDeOrigen, orden: 16 },
    { encabezado: 'País de procedencia', clave: (fila) => fila.paisDeProcedencia, orden: 17 },
    { encabezado: 'Número de lote', clave: (fila) => fila.numeroDeLote, orden: 18 },
    { encabezado: 'Fase de desarrollo', clave: (fila) => fila.faseDeDesarrollo, orden: 19 },
    { encabezado: 'Certificado Internacional Electrónico', clave: (fila) => fila.certificadoInternacional, orden: 20 }
  ];

  /**
   * Datos del cuerpo de la tabla principal de mercancías.
   * Contiene todas las filas de mercancías que se muestran en la tabla.
   * @type {Fila[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  cuerpoTablaFila: Fila[] = [];

  /**
   * Configuración de columnas para la tabla de solicitudes secundaria.
   * Define la estructura y visualización de la tabla de solicitudes.
   * @type {ConfiguracionColumna<FilaSolicitud>[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  configuracionColumnasoli: ConfiguracionColumna<FilaSolicitud>[] = [
    { encabezado: 'Fecha Creación', clave: (fila) => fila.fechaCreacion, orden: 1 },
    { encabezado: 'Mercancía', clave: (fila) => fila.mercancia, orden: 2 },
    { encabezado: 'Cantidad', clave: (fila) => fila.cantidad.toString(), orden: 3 },
    { encabezado: 'Proveedor', clave: (fila) => fila.proveedor, orden: 4 },
  ];

  /**
   * Indica si la sección del formulario es colapsable.
   * Controla la visualización expandida o contraída de secciones del UI.
   * @type {boolean}
   * @memberof DatosDeLaSolicitudComponent
   */
  colapsable: boolean = false;

  /**
   * Grupo de formularios reactivo para los datos de la mercancía.
   * Contiene validaciones y controles para capturar información de la solicitud.
   * @type {FormGroup}
   * @memberof DatosDeLaSolicitudComponent
   */
  datosMercanciaFormGroup!: FormGroup;

  /**
   * Lista de catálogos para las aduanas de ingreso disponibles.
   * Contiene las opciones de aduanas donde puede ingresar la mercancía.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  aduanaDeIngresoList: Catalogo[] = [];

  /**
   * Lista de catálogos para las oficinas de inspección disponibles.
   * Contiene las opciones de oficinas donde se realizará la inspección.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  oficinaInspeccionList: Catalogo[] = [];

  /**
   * Lista de catálogos para los puntos de inspección disponibles.
   * Contiene las ubicaciones específicas donde se realizará la inspección.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  puntoInspeccionList: Catalogo[] = [];

  /**
   * Lista de catálogos para los tipos de requisitos disponibles.
   * Contiene las clasificaciones de requisitos aplicables a la mercancía.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  tipoRequisitoList: Catalogo[] = [];

  /**
   * Lista de catálogos para las fracciones arancelarias disponibles.
   * Contiene las clasificaciones arancelarias aplicables a la mercancía.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  arancelariaList: Catalogo[] = [];

  /**
   * Lista de catálogos para los regímenes aduaneros disponibles.
   * Contiene los tipos de régimen bajo los cuales puede ingresar la mercancía.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  regimenList: Catalogo[] = [];

  /**
   * Lista de catálogos para los códigos NICO disponibles.
   * Contiene los Números de Identificación Comercial aplicables.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  nicoList: Catalogo[] = [];

  /**
   * Lista de catálogos para las Unidades de Medida Comercial disponibles.
   * Contiene las unidades de medida para comercialización de la mercancía.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  umcList: Catalogo[] = [];

  /**
   * Lista de catálogos para los usos permitidos de la mercancía.
   * Contiene las finalidades autorizadas para el uso de la mercancía.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  usoList: Catalogo[] = [];

  /**
   * Lista de catálogos para los países de origen disponibles.
   * Contiene los países donde se origina o produce la mercancía.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  paisDeOrigenList: Catalogo[] = [];

  /**
   * Lista de catálogos para los países de procedencia disponibles.
   * Contiene los países desde donde se envía directamente la mercancía.
   * @type {Catalogo[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  paisDeProcedenciaList: Catalogo[] = [];

  /**
   * Indica si se debe mostrar el mensaje de error de la tabla.
   * Controla la visualización de errores relacionados con datos faltantes en la tabla.
   * @type {boolean}
   * @memberof DatosDeLaSolicitudComponent
   */
  tableErrorMeassageDispaly: boolean = false;


  /**
   * Datos del cuerpo de la tabla principal de solicitudes.
   * Contiene la información de todas las solicitudes registradas.
   * @type {FilaSolicitud[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  cuerpoTabla: FilaSolicitud[] = [
    {
      fechaCreacion: '2024-06-01',
      mercancia: 'Camarón',
      cantidad: 1000,
      proveedor: 'Proveedor A'
    },
    {
      fechaCreacion: '2024-06-02',
      mercancia: 'Tilapia',
      cantidad: 500,
      proveedor: 'Proveedor B'
    },
    {
      fechaCreacion: '2024-06-03',
      mercancia: 'Ostión',
      cantidad: 750,
      proveedor: 'Proveedor C'
    }
  ];

  /**
   * Datos de la mercancía almacenados en el store del componente.
   * Mantiene el estado actual de los datos del grupo de realización.
   * @type {RealizarGroup}
   * @memberof DatosDeLaSolicitudComponent
   */
  datosMercanciaStore: RealizarGroup = {} as RealizarGroup;

  /**
   * Datos específicos del cuerpo de la tabla de solicitudes.
   * Información detallada de las solicitudes mostradas en la tabla secundaria.
   * @type {FilaSolicitud[]}
   * @memberof DatosDeLaSolicitudComponent
   */
  cuerpoTablaSolicitud: FilaSolicitud[] = [];

  /**
   * Indica si se debe mostrar la barra de desplazamiento en las tablas.
   * Controla la visualización del scroll horizontal/vertical.
   * @type {boolean}
   * @memberof DatosDeLaSolicitudComponent
   */
  myScrollbarValue: boolean = true;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Controla la habilitación/deshabilitación de todos los campos del formulario.
   * @type {boolean}
   * @memberof DatosDeLaSolicitudComponent
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Indica si se debe mostrar la confirmación para eliminar datos de la tabla.
   * Controla la visualización del modal de confirmación de eliminación.
   * @type {boolean}
   * @public
   * @memberof DatosDeLaSolicitudComponent
   */
  public eliminarDatosTabla: boolean = false;

  /**
   * Constructor del componente DatosDeLaSolicitudComponent.
   * Inicializa los servicios necesarios y establece las suscripciones al estado del formulario y datos de mercancía.
   * 
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos de Angular
   * @param {ImportacionDeAcuiculturaService} importacionDeAcuiculturaServices - Servicio para obtener datos de catálogos y gestionar el estado
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado de solo lectura del formulario
   * @param {AcuiculturaStore} acuiculturaStore - Store para gestionar el estado global de la aplicación de acuicultura
   * @memberof DatosDeLaSolicitudComponent
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly importacionDeAcuiculturaServices: ImportacionDeAcuiculturaService,
    private consultaQuery: ConsultaioQuery,
    private readonly acuiculturaStore: AcuiculturaStore
  ) {
    forkJoin([
       this.obtenerCatalogosTransporte(),
    this.obtenerCatalogosArancelaria(),
    this.obtenerCatalogosUMC(),
    this.obtenerCatalogosUMT(),
    this.obtenerCatalogosUSO()
    ]).pipe(takeUntil(this.DESTROY_NOTIFIER$))
    .subscribe({
      next: ([transporte, arancelaria, umc, umt, uso]) => {
      this.importacionDeAcuiculturaServices.obtenerDatos().pipe(takeUntil(this.DESTROY_NOTIFIER$)).subscribe((datos) => {
      this.cuerpoTablaFila = datos.mercanciaGroup;
      this.datosMercanciaStore = datos.realizarGroup;
      if(this.datosMercanciaFormGroup) {
          this.datosMercanciaFormGroup.patchValue({
            realizarGroup: this.datosMercanciaStore
          });
      }
       this.inicializarEstadoFormulario();
    })
  
      }
      , error: (err) => {
        console.error('Error loading catalogs:', err);
      }
    });
   this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.DESTROY_NOTIFIER$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
         
        }
      )
    ).subscribe();
  }

  /**
   * Crea el grupo de formularios principal para los datos de la mercancía.
   * Inicializa la estructura del formulario reactivo con el grupo anidado realizarGroup.
   * 
   * @public
   * @method createFromGroup
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  public createFromGroup(): void {
    this.datosMercanciaFormGroup = this.fb.group({
      realizarGroup: this.createRealizarGroup(),
    });
  }

  /**
   * Crea el grupo de formularios específico para los datos de realización.
   * Define todos los campos necesarios con sus validadores correspondientes.
   * 
   * @public
   * @method createRealizarGroup
   * @memberof DatosDeLaSolicitudComponent
   * @returns {FormGroup} El grupo de formularios configurado para los datos de realización
   */
  public createRealizarGroup(): FormGroup {
    return this.fb.group({
      aduanaIngreso: [ '', Validators.required],
      oficinaInspeccion: [ '', Validators.required],
      puntoInspeccion: [ '', Validators.required],
      numeroGuia: [ ''],
      regimen: [ '', Validators.required],
    });
  }
 

  /**
   * Método del ciclo de vida OnInit de Angular.
   * Inicializa el formulario principal y obtiene todos los catálogos necesarios para el funcionamiento del componente.
   * 
   * @public
   * @method ngOnInit
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  async ngOnInit(): Promise<void> {
      await this.createFromGroup();
  }


  /**
   * Obtiene los datos del catálogo de transporte y puntos de inspección.
   * Carga las opciones disponibles para aduanas de ingreso y tipos de requisitos.
   * 
   * @public
   * @method obtenerCatalogosTransporte
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
public obtenerCatalogosTransporte(): Observable<Catalogo[]> {
  return this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json').pipe(
    map((data) => {
      this.aduanaDeIngresoList = data.data as Catalogo[];
      this.tipoRequisitoList = data.data as Catalogo[];
      return data.data as Catalogo[];
    }),
    catchError((err) => {
      return of([]); 
    })
  );
}


  /**
   * Obtiene los datos del catálogo de fracciones arancelarias.
   * Carga las opciones disponibles para oficinas de inspección.
   * 
   * @public
   * @method obtenerCatalogosArancelaria
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  public obtenerCatalogosArancelaria(): Observable<Catalogo[]> {
  return this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('punto.json').pipe(
    map((data) => {
      this.oficinaInspeccionList = data.data as Catalogo[];
      return data.data as Catalogo[];
    }),
    catchError((err) => {
      console.error('Error loading arancelaria catalog:', err);
      return of([]); // fallback to empty array on error
    })
  );
}


  /**
   * Obtiene los datos del catálogo de Unidades de Medida Comercial (UMC).
   * Carga las opciones disponibles para UMC y fracciones arancelarias.
   * 
   * @public
   * @method obtenerCatalogosUMC
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
public obtenerCatalogosUMC(): Observable<Catalogo[]> {
  return this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('aduana_de_ingreso.json').pipe(
    map((data) => {
      this.umcList = data.data as Catalogo[];
      this.arancelariaList = data.data as Catalogo[];
      return data.data as Catalogo[];
    }),
    catchError((err) => {
      console.error('Error loading UMC catalog:', err);
      return of([]); // fallback to empty array
    })
  );
}


  /**
   * Obtiene los datos del catálogo de Unidades de Medida de Tarifa (UMT).
   * Carga las opciones disponibles para regímenes, códigos NICO y puntos de inspección.
   * 
   * @public
   * @method obtenerCatalogosUMT
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
 public obtenerCatalogosUMT(): Observable<Catalogo[]> {
  return this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('empresa.json').pipe(
    map((data) => {
      this.regimenList = data.data as Catalogo[];
      this.nicoList = data.data as Catalogo[];
      this.puntoInspeccionList = data.data as Catalogo[];
      return data.data as Catalogo[];
    }),
    catchError((err) => {
      return of([]);
    })
  );
}


  /**
   * Obtiene los datos del catálogo de usos y países.
   * Carga las opciones disponibles para usos, países de origen y países de procedencia.
   * 
   * @public
   * @method obtenerCatalogosUSO
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  public obtenerCatalogosUSO(): Observable<Catalogo[]> {
    return this.importacionDeAcuiculturaServices.obtenerDetallesDelCatalogo('oficina_de_inspeccion.json').pipe(
      map((data) => {
        this.usoList = data.data as Catalogo[];
        this.paisDeOrigenList = data.data as Catalogo[];
        this.paisDeProcedenciaList = data.data as Catalogo[];
        return data.data as Catalogo[];
      }),
      catchError((err) => {
        return of([]); // fallback to empty array on error
      })
    );
  }

  /**
   * Alterna la visualización de la sección colapsable del formulario.
   * Cambia el estado de expansión/contracción de las secciones del UI.
   * 
   * @public
   * @method mostrar_colapsable
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  public mostrar_colapsable(): void {
    if(!this.esFormularioSoloLectura){
  this.colapsable = !this.colapsable;
    }
    else{
   this.colapsable = false;
    }
  }

  /**
   * Guarda los valores del formulario en el store de la aplicación.
   * Actualiza el estado global con los datos del grupo de realización.
   * 
   * @public
   * @method setValoresStore
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  public setValoresStore(): void {
    const VALOR = this.datosMercanciaFormGroup.getRawValue();
    (this.importacionDeAcuiculturaServices.actualizarSoloRealizarGroup as (value: RealizarGroup) => void)(
      VALOR.realizarGroup as RealizarGroup
    );
  }

  /**
   * Inicializa el estado del formulario según el modo de solo lectura.
   * Habilita o deshabilita todos los controles del formulario basado en el estado actual.
   * 
   * @public
   * @method inicializarEstadoFormulario
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  public inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.datosMercanciaFormGroup.disable();
    }
    else {
      this.datosMercanciaFormGroup.enable();
    }
  }
  /**
   * Abre el modal para agregar una nueva fila de mercancía.
   * Utiliza el componente modal para mostrar el formulario de mercancía-solicitud.
   * 
   * @public
   * @method agregarFila
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  agregarFila(): void {
    this.modalRef.abrir(MercanciaSolicitudComponent);
  }

  /**
   * Selecciona una fila de la tabla de mercancías y actualiza el estado del store.
   * Este método se ejecuta cuando el usuario selecciona elementos en la tabla principal.
   * Actualiza el estado global con los datos de la fila seleccionada para operaciones posteriores.
   * 
   * @public
   * @method seleccionTabla
   * @param {Fila[]} event - Array de filas seleccionadas de la tabla
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  seleccionTabla(event: Fila[]): void {
    this.listSelectedView = event;
    this.acuiculturaStore.update(
      (state) => ({
        ...state,
        selectedmercanciaGroupDatos: event[0] || {}
      })
    )
  }
  /**
   * Inicia el proceso de eliminación de una fila de mercancía.
   * Muestra una notificación de confirmación antes de proceder con la eliminación.
   * 
   * @public
   * @method eliminarFila
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  eliminarFila(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: 'Eliminar datos de la tabla',
      mensaje: 'Está seguro que desea eliminar estos datos?',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: 'Cancelar',
    };
    this.eliminarDatosTabla = true;
  }
  /**
   * Ejecuta la eliminación de datos de la tabla basado en la confirmación del usuario.
   * Si el usuario confirma, elimina el elemento seleccionado de la tabla de mercancías y actualiza el store.
   * 
   * @public
   * @method eliminarPedimentoDatos
   * @param {boolean} borrar - Indica si se debe proceder con la eliminación
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  eliminarPedimentoDatos(borrar: boolean): void {
    if (borrar) {
      this.eliminarDatosTabla = false;
      const VALOR = this.acuiculturaStore.getValue().mercanciaGroup;
      if (VALOR.length === 0) {
        return;
      }
      const SELECTED = this.acuiculturaStore.getValue().selectedmercanciaGroupDatos;
      const FILTERED_VALOR = VALOR.filter(
        (item) => item !== SELECTED
      );
      this.acuiculturaStore.update(
        (state) => ({
          ...state,
          mercanciaGroup: FILTERED_VALOR
        })
      );
      this.acuiculturaStore.update((state) => ({
        ...state,
        selectedmercanciaGroupDatos: {} as Fila
      }))
      this.listSelectedView = [];
    }
    else {
      this.eliminarDatosTabla = false;
    }
  }
  /**
   * Abre el modal para modificar la fila seleccionada de mercancía.
   * Solo procede si hay al menos una fila seleccionada en la tabla.
   * 
   * @public
   * @method modificarFila
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  modificarFila(): void {
    if (this.listSelectedView.length > 0) {
      this.modalRef.abrir(MercanciaSolicitudComponent);
    }
  }

  /**
   * Valida el estado actual del formulario y la tabla de mercancías.
   * Verifica que el formulario sea válido y que existan datos en la tabla.
   * 
   * @public
   * @method validarFormulario
   * @memberof DatosDeLaSolicitudComponent
   * @returns {boolean} True si tanto el formulario como la tabla son válidos, false en caso contrario
   */
  public validarFormulario(): boolean {
    this.tableErrorMeassageDispaly = this.cuerpoTablaFila.length === 0 ? true : false;
    if (this.datosMercanciaFormGroup.invalid) {
      this.datosMercanciaFormGroup.markAllAsTouched();
      return false;
    }
    else if (this.tableErrorMeassageDispaly) {
      return false;
    }

    return true;
  }

  /**
   * Método del ciclo de vida OnDestroy de Angular.
   * Ejecuta la limpieza de recursos, detiene las suscripciones activas y libera memoria.
   * Previene memory leaks al destruir el componente.
   * 
   * @public
   * @method ngOnDestroy
   * @memberof DatosDeLaSolicitudComponent
   * @returns {void}
   */
  public ngOnDestroy(): void {
    this.DESTROY_NOTIFIER$.next();
    this.DESTROY_NOTIFIER$.complete();
  }
}

