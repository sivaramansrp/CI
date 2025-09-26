import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CamState, camCertificadoStore } from '../../estados/cam-certificado.store';
import { Catalogo, ConsultaioQuery, SeccionLibQuery, SeccionLibState } from '@libs/shared/data-access-user/src';
import { Observable, Subject, map, of, takeUntil } from 'rxjs';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { CertificadoDeOrigenComponent } from '../../../../shared/components/certificado-de-origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { MercanciaComponent } from '../mercancia/mercancia.component';
import { Modal } from 'bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';

/**
 * @description
 * Componente para la gestión de Certificados de Origen en el módulo CAM.
 * 
 * Este componente es responsable de:
 * - Gestionar el formulario de certificado de origen
 * - Manejar la interacción con servicios y estados
 * - Administrar la selección de estados y países
 * - Controlar la visualización y modificación de mercancías
 * 
 * @usageNotes
 * ### Ejemplo de uso
 * ```html
 * <app-certificado-origen
 *   [esFormularioSoloLectura]="false">
 * </app-certificado-origen>
 * ```
 * 
 * @publicApi
 * @module CertificadosOrigin
 * @version 1.0.0
 */
@Component({
  selector: 'app-certificado-origen',
  templateUrl: './certificado-origen.component.html',
  styleUrl: './certificado-origen.component.scss',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,CertificadoDeOrigenComponent,
    MercanciaComponent]
})
export class CertificadoOrigenComponent implements OnInit, AfterViewInit, OnDestroy {
    idProcedimiento:number=110211;

  /**
   * @description
   * Lista de estados disponibles para selección.
   * 
   * Esta propiedad almacena el catálogo de estados que se cargan desde el servicio
   * `CamCertificadoService`. Se utiliza para poblar los selectores de estados en el
   * formulario.
   * 
   * @type {Catalogo[]}
   * @default []
   * 
   * @example
   * ```typescript
   * // Estructura de un elemento del catálogo
   * {
   *   id: number,
   *   descripcion: string,
   *   codigo: string
   * }
   * ```
   */
  
  estado: Catalogo[] = [];

  /**
   * @description
   * Catálogo de países disponibles para selección en el formulario.
   * 
   * @property {Catalogo[]} pais
   * @memberof CertificadoOrigenComponent
   * 
   * @example
   * ```typescript
   * // Estructura del catálogo de países
   * [
   *   {
   *     id: 1,
   *     codigo: 'MX',
   *     descripcion: 'México'
   *   },
   *   // ... más países
   * ]
   * ```
   */
  pais: Catalogo[] = [];

  /**
   * @description
   * Listado de mercancías disponibles para el certificado.
   * 
   * Esta propiedad almacena todas las mercancías que pueden ser 
   * seleccionadas y asociadas al certificado de origen.
   * 
   * @property {Mercancia[]} disponiblesDatos
   * @memberof CertificadoOrigenComponent
   * 
   * @example
   * ```typescript
   * // Ejemplo de estructura de mercancías
   * [
   *   {
   *     id: '001',
   *     descripcion: 'Producto A',
   *     valorMercancia: 1000
   *     // ... otros campos
   *   }
   * ]
   * ```
   */
  disponiblesDatos: Mercancia[] = [];

  /**
   * @description
   * Indicador del estado del operador.
   * 
   * Esta bandera controla si el operador del certificado está activo 
   * y puede realizar operaciones en el sistema.
   * 
   * @property {boolean} operador
   * @memberof CertificadoOrigenComponent
   * @default true
   * 
   * @example
   * ```typescript
   * if (this.operador) {
   *   // Realizar operaciones permitidas
   * } else {
   *   // Mostrar mensaje de operador inactivo
   * }
   * ```
   */
  operador: boolean = true;

  /**
   * @description
   * Almacena los datos de la mercancía seleccionada para su modificación.
   * 
   * Esta propiedad se utiliza cuando el usuario selecciona una mercancía
   * de la tabla para editarla en el modal de modificación.
   * 
   * @property {Mercancia} datosSeleccionados
   * @memberof CertificadoOrigenComponent
   * 
   * @example
   * ```typescript
   * // Al seleccionar una mercancía
   * this.datosSeleccionados = mercanciaSeleccionada;
   * this.abrirModificarModal(this.datosSeleccionados);
   * ```
   */
  datosSeleccionados!: Mercancia;

  /**
   * @description
   * Instancia del modal de Bootstrap utilizado para modificar datos.
   * 
   * Esta propiedad mantiene la referencia al modal de Bootstrap que se utiliza
   * para mostrar y ocultar el formulario de modificación de mercancías.
   * 
   * @property {Modal} modalInstance
   * @memberof CertificadoOrigenComponent
   * 
   * @example
   * ```typescript
   * // Inicialización del modal
   * this.modalInstance = new Modal(this.modifyModal.nativeElement);
   * 
   * // Mostrar modal
   * this.modalInstance.show();
   * ```
   */
  modalInstance!: Modal;

  /**
   * @description
   * Indicador de selección de fila en la tabla.
   * 
   * Esta bandera se utiliza para controlar el estado de selección
   * en la tabla de mercancías. Se activa cuando el usuario selecciona
   * una fila y se reinicia al cerrar el modal.
   * 
   * @property {boolean} tablaSeleccionEvent
   * @memberof CertificadoOrigenComponent
   * @default false
   * 
   * @example
   * ```typescript
   * // Al cerrar el modal
   * cerrarModificarModal(): void {
   *   this.tablaSeleccionEvent = true;
   *   this.modalInstance.hide();
   * }
   * ```
   */
  tablaSeleccionEvent: boolean = false;

  /**
   * @description
   * Observable que emite los datos para la tabla de mercancías.
   * 
   * Este observable se suscribe a los cambios en el estado de la tabla
   * de mercancías y proporciona los datos actualizados para su visualización.
   * 
   * @property {Observable<Mercancia[]>} datosTabla$
   * @memberof CertificadoOrigenComponent
   * 
   * @example
   * ```typescript
   * // En el template
   * <tabla-dinamica
   *   [datos]="datosTabla$ | async"
   *   [columnas]="configuracionColumnas">
   * </tabla-dinamica>
   * 
   * // En el componente
   * this.datosTabla$ = this.query.selectmercanciaTabla$;
   * ```
   */
  datosTabla$: Observable<Mercancia[]> = of([]);

  /**
   * @description
   * Objeto que almacena los valores actuales del formulario de certificado.
   * 
   * Esta propiedad mantiene sincronizados los valores del formulario con el estado
   * de la aplicación, permitiendo acceder a los datos en cualquier momento.
   * 
   * @property {Object} formCertificadoValues
   * @memberof CertificadoOrigenComponent
   * @type {{ [key: string]: unknown }}
   * 
   * @example
   * ```typescript
   * // Suscripción a cambios en el formulario
   * this.query.formCertificado$.subscribe(estado => {
   *   this.formCertificadoValues = estado;
   * });
   * 
   * // Acceso a valores específicos
   * const valor = this.formCertificadoValues['campoCertificado'];
   * ```
   */
  formCertificadoValues!: { [key: string]: unknown};

  /**
   * @description
   * Estado actual del certificado en el módulo CAM.
   * 
   * Esta propiedad privada mantiene el estado actual del certificado,
   * incluyendo toda la información necesaria para su gestión y validación.
   * 
   * @property {CamState} certificadoState
   * @private
   * @memberof CertificadoOrigenComponent
   * 
   * @example
   * ```typescript
   * // Actualización del estado
   * this.query.selectCam$.pipe(
   *   takeUntil(this.destroyNotifier$),
   *   map((state) => {
   *     this.certificadoState = state as CamState;
   *   })
   * ).subscribe();
   * ```
   */
  private certificadoState!: CamState;

  /**
   * @description
   * Subject utilizado para gestionar la limpieza de suscripciones.
   * 
   * Este Subject se utiliza en conjunto con el operador takeUntil para
   * cancelar todas las suscripciones cuando el componente se destruye,
   * evitando así fugas de memoria.
   * 
   * @property {Subject<void>} destroyNotifier$
   * @private
   * @memberof CertificadoOrigenComponent
   * 
   * @example
   * ```typescript
   * // Uso en suscripciones
   * observable$.pipe(
   *   takeUntil(this.destroyNotifier$)
   * ).subscribe();
   * 
   * // Limpieza en ngOnDestroy
   * ngOnDestroy(): void {
   *   this.destroyNotifier$.next();
   *   this.destroyNotifier$.complete();
   * }
   * ```
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @description
   * Estado actual de la sección del formulario.
   * 
   * Mantiene el estado de la sección actual, incluyendo información
   * sobre permisos, validaciones y configuración específica de la
   * sección del certificado.
   * 
   * @property {SeccionLibState} seccionState
   * @private
   * @memberof CertificadoOrigenComponent
   * 
   * @example
   * ```typescript
   * // Suscripción al estado de la sección
   * this.seccionQuery.selectSeccionState$
   *   .pipe(takeUntil(this.destroyNotifier$))
   *   .subscribe(state => {
   *     this.seccionState = state;
   *     // Lógica adicional basada en el estado
   *   });
   * ```
   */
  private seccionState!: SeccionLibState;

  /**
   * @description
   * Referencia al elemento del modal de modificación.
   * 
   * Esta referencia se utiliza para gestionar el modal de modificación de datos.
   * El modal se inicializa como una instancia de Bootstrap Modal en el ciclo de vida
   * `ngAfterViewInit`.
   * 
   * @type {ElementRef}
   * @memberof CertificadoOrigenComponent
   * @viewChild
   * 
   * @example
   * ```typescript
   * // En el template
   * <div #modifyModal class="modal fade">
   *   <!-- Contenido del modal -->
   * </div>
   * 
   * // En el componente
   * if (this.modifyModal) {
   *   this.modalInstance = new Modal(this.modifyModal.nativeElement);
   * }
   * ```
   */
  @ViewChild('modifyModal', { static: false }) modifyModal!: ElementRef;

  @ViewChild('certificadoDeOrigenRef') certificadoDeOrigenComponent!: CertificadoDeOrigenComponent;
  @ViewChild('mercanciaRef') mercanciaComponent!: MercanciaComponent;



  /**
   * Indica si el formulario debe mostrarse solo en modo de lectura.
   *
   * @type {boolean}
   * @memberof CertificadoOrigenComponent
   * @compodoc
   * @description
   * Esta propiedad controla si el formulario es solo de lectura (`true`) o editable (`false`).
   */
  esFormularioSoloLectura:boolean = false;

  /**
   * @description
   * Constructor del componente CertificadoOrigen.
   * 
   * Inicializa los siguientes servicios y dependencias:
   * - CamCertificadoService: Para obtener datos del certificado
   * - camCertificadoStore: Para gestionar el estado del formulario
   * - camCertificadoQuery: Para consultar el estado del formulario
   * - SeccionLibQuery: Para consultar el estado de la sección
   * - ConsultaioQuery: Para gestionar el estado de consulta
   * 
   * @constructor
   * @param {CamCertificadoService} camCertificadoService - Servicio para datos del certificado
   * @param {camCertificadoStore} store - Store para el estado del formulario
   * @param {camCertificadoQuery} query - Query para consultar el estado
   * @param {SeccionLibQuery} seccionQuery - Query para el estado de la sección
   * @param {ConsultaioQuery} consultaioQuery - Query para el estado de consulta
   * 
   * @example
   * ```typescript
   * constructor(
   *   private camCertificadoService: CamCertificadoService,
   *   private store: camCertificadoStore,
   *   private query: camCertificadoQuery,
   *   private seccionQuery: SeccionLibQuery,
   *   private consultaioQuery: ConsultaioQuery
   * ) {
   *   // Inicialización de suscripciones
   * }
   * ```
   */
  constructor(
    private camCertificadoService: CamCertificadoService,
    private store: camCertificadoStore,
    private query: camCertificadoQuery,
    private seccionQuery: SeccionLibQuery,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.query.formCertificado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((estado) => {
        this.formCertificadoValues = estado;
      });
        this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState)=>{
        this.esFormularioSoloLectura = seccionState.readonly; 
      })
    )
    .subscribe()
    
  }

  /**
   * @description
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * 
   * Este método realiza las siguientes tareas de inicialización:
   * 1. Suscribe a los cambios del estado de la sección
   * 2. Suscribe a los cambios del estado del certificado CAM
   * 3. Carga los catálogos de estados y países
   * 4. Inicializa el observable de datos de la tabla
   * 
   * @lifecycle
   * @implements OnInit
   * 
   * @example
   * ```typescript
   * ngOnInit(): void {
   *   this.seccionQuery.selectSeccionState$
   *     .pipe(takeUntil(this.destroyNotifier$))
   *     .subscribe(state => {
   *       // Manejo del estado
   *     });
   *   // Otras inicializaciones...
   * }
   * ```
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();

    this.query.selectCam$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.certificadoState = state as CamState;
        })
      )
      .subscribe();

    this.estadoOpcion();
    this.paisOpcion();
    this.datosTabla$ = this.query.selectmercanciaTabla$
  }
  
  /**
 * @descripcion
 * Actualiza el almacén con los datos del formulario de certificado.
 * @param event - Objeto que contiene el nombre del grupo de formulario, el campo, el valor y el nombre del estado del almacén.
 */
setValoresStore(event: { formGroupName: string, campo: string, valor: string | number | boolean | object | null | undefined, storeStateName: string }): void {
  const { campo: CAMPO, valor: VALOR } = event;
  this.store.setFormCertificadoGenric({ [CAMPO]: VALOR });
}

  /**
   * @descripcion
   * Obtiene la lista de estados disponibles.
   */
  estadoOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('estados.json')
    .pipe(
      takeUntil(this.destroyNotifier$),
    )
    .subscribe({
      next: (data) => {
        this.estado = data as Catalogo[];
      },
      error: (_error: HttpErrorResponse) => {
        this.estado = [];
      },
    });
  }

  /**
   * @descripcion
   * Obtiene la lista de países disponibles.
   */
  paisOpcion(): void {
    this.camCertificadoService.obtenerMenuDesplegable('pais.json')
    .pipe(
      takeUntil(this.destroyNotifier$),
    )
    .subscribe({
      next: (data) => {
        this.pais = data as Catalogo[];
      },
      error: (_error: HttpErrorResponse) => {
        this.pais = [];
      },
    });
  }

  /**
   * @descripcion
   * Obtiene los datos disponibles relacionados con mercancías.
   */
  conseguirDisponiblesDatos(): void {
    this.camCertificadoService.obtenerTablaDatos('disponibles-datos.json')
    .pipe(
      takeUntil(this.destroyNotifier$),
    )
    .subscribe({
      next: (response: Mercancia[]) => {
        if (response && Array.isArray(response)) {
          this.disponiblesDatos = response as Mercancia[];
        }
        else {
          this.disponiblesDatos = [];
        }
      },
      error: (_error: HttpErrorResponse) => {
        this.disponiblesDatos = [];
      },
    });
  }

  /**
   * @descripcion
   * Actualiza el almacén con los datos del formulario.
   * @param e - Los datos del formulario a almacenar.
   */
  obtenerDatosFormulario(e: unknown): void {
    this.store.setFormCertificado(e as { [key: string]: string | number | boolean | object | undefined });
  }

  /**
   * @descripcion
   * Actualiza el almacén con el estado seleccionado.
   * @param estado - El estado seleccionado.
   */
  tipoEstadoSeleccion(estado: Catalogo): void {
    this.store.setEstado(estado);
  }

  /**
   * @descripcion
   * Actualiza el almacén con el bloque seleccionado.
   * @param estado - El bloque seleccionado.
   */
  tipoSeleccion(estado: Catalogo): void {
    this.store.setBloque([estado]);
  }

  /**
   * @descripcion
   * Abre el modal de modificación con los datos seleccionados.
   * @param disponiblesDatos - Los datos seleccionados para modificación.
   */
  abrirModificarModal(disponiblesDatos: Mercancia): void {
    this.datosSeleccionados = disponiblesDatos;
    this.store.setFormMercancia({ ...disponiblesDatos });
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  /**
   * @descripcion
   * Cierra el modal de modificación.
   */
  cerrarModificarModal(): void {
    if (this.modalInstance) {
      this.tablaSeleccionEvent = true;
      this.modalInstance.hide();
    }
  }

  /**
   * @descripcion
   * Hook del ciclo de vida que se llama después de que la vista del componente se haya inicializado.
   * Inicializa el modal de modificación.
   */
  ngAfterViewInit(): void {
    if (this.modifyModal) {
      this.modalInstance = new Modal(this.modifyModal.nativeElement);
    }
    if(this.esFormularioSoloLectura){
      this.conseguirDisponiblesDatos();
    }
  }

  /**
   * @descripcion
   * Actualiza el almacén con el estado de validación del formulario.
   * @param valida - El estado de validación del formulario.
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ certificado: valida });
  }

  validarFormularios():boolean{
    let isFormInvalid = true;
  if(!this.certificadoDeOrigenComponent.validarFormularios()){
    isFormInvalid = false;
  }
   return isFormInvalid;
}
  /**
   * @descripcion
   * Hook del ciclo de vida que se llama cuando el componente se destruye.
   * Limpia los recursos y suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}