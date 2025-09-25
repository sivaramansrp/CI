import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Modal } from 'bootstrap';
import { Subject } from 'rxjs';

import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { merge } from 'rxjs';

import {
  CatalogoSelectComponent,
  ConfiguracionColumna,
  ConsultaioQuery,
  REGEX_PATRON_DECIMAL_12_3,
  REGEX_POSTAL,
  REGEX_TELEFONO_DIGITOS,
  TablaDinamicaComponent,
  TablaSeleccion,
  TableBodyData,
  TituloComponent,
  ValidacionesFormularioService
} from '@libs/shared/data-access-user/src';

import { DatosDelMercancia } from '../constants/exencion-impuestos.enum';
import { Tramite103Query } from '../estados/tramite103.query';

import {
  Catalogo,
  Solicitud103State,
  Tramite103Store
} from '../estados/tramite103.store';
import { ExencionImpuestosService } from '../services/exencion-impuestos.service';
import { MercanciaTableService } from '../services/mercancia-table.service';



/**
 * Maneja formularios, catálogos, tablas de mercancías y modales relacionados con el trámite.
 */

  @Component({
    selector: 'app-exencion-impuestos',
    standalone: true,
    imports: [
      CatalogoSelectComponent,
      FormsModule,
      ReactiveFormsModule,
      TituloComponent,
      TablaDinamicaComponent,
      CommonModule
    ],
    templateUrl: './exencion-impuestos.component.html',
    styleUrls: ['./exencion-impuestos.component.scss'],
  })
  export class ExencionImpuestosComponent implements OnInit, OnDestroy {
  /**
   * Ayuda para obtener una descripción del catálogo por identificación o valor de descripción.
   */
  static obtenerDescripcion(catalog: Catalogo[] | undefined, value: string | number): string {
    if (!catalog) { return value as string; }
    const ELEMENTO_ENCONTRADO = catalog.find(item => item.id === value || item.id === Number(value) || item.descripcion === value);
    return ELEMENTO_ENCONTRADO ? ELEMENTO_ENCONTRADO.descripcion : value as string;
  }

  /**
   * Índice de la fila pendiente de eliminación (para el modal de confirmación).
   *
   * @type {number | null}
   */
  filaPendienteEliminar: number | null = null;

  /**
   * Prepara la fila para su eliminación almacenando su índice antes de mostrar el modal de confirmación.
   *
   * @param {number | null} index Índice de la fila a eliminar.
   * @returns {void}
   */
  prepararEliminarFila(index: number | null): void {
    this.filaPendienteEliminar = index;
  }

  /**
   * Elimina la fila después de la confirmación desde el modal.
   *
   * @returns {void}
   */
  eliminarMercancias(): void {
    if (this.filaPendienteEliminar !== null && this.filaPendienteEliminar >= 0 && this.filaPendienteEliminar < this.mercanciaBodyData.length) {
      this.eliminarFila(this.filaPendienteEliminar);
    }
    this.filaPendienteEliminar = null;
  }
  /**
   * Agrega la mercancía a la tabla después de aceptar en el modal de confirmación y cierra el modal.
   *
   * @returns {void}
   */
  agregarMercanciasAceptar(): void {
    this.agregarMercancias();
    
    // Cerrar el modal manualmente para evitar conflictos de Bootstrap
    this.cerrarModalManual();
  }

  /**
   * Cierra el modal de confirmación manualmente sin usar Bootstrap.
   *
   * @returns {void}
   */
  cerrarModalManual(): void {
    if (this.confirmarModalAgregarElement && this.confirmarModalAgregarElement.nativeElement) {
      const ELEMENTO_MODAL = this.confirmarModalAgregarElement.nativeElement;
      
      // Ocultar modal
      ELEMENTO_MODAL.style.display = 'none';
      ELEMENTO_MODAL.classList.remove('show');
      ELEMENTO_MODAL.classList.add('confirmar-modal-agregar');
      ELEMENTO_MODAL.setAttribute('aria-hidden', 'true');
      
      // Remover backdrop
      const FONDO_MODAL = document.querySelector('[data-modal-id="confirmarModalAgregar"]');
      if (FONDO_MODAL) {
        FONDO_MODAL.remove();
      }
      
      // Limpiar clase del body
      document.body.classList.remove('modal-open');
    }
  }

  /**
   * Muestra el modal de confirmación de agregado y agrega la mercancía después de aceptar.
   *
   * @returns {void}
   */
  agregarMercanciasConfirm(): void {
    this.envioIntentado = true;
    const DATOS = this.agregarMercanciasForm.get('datosMercancia');
    if (!DATOS) { return; }
    const VEHICULO_SELECCIONADO = DATOS.get('vehiculo')?.value;
    // Campos principales requeridos
    const CAMPOS_PRINCIPALES = [
      'tipoDeMercancia',
      'usoEspecifico',
      'cantidad',
      'condicionMercancia',
      'unidadMedida'
    ];
    const CAMPOS_VALIDOS = CAMPOS_PRINCIPALES.every(CAMPO => {
      const CTRL = DATOS.get(CAMPO);
      return CTRL && CTRL.value !== null && CTRL.value !== '';
    });
    // Si el checkbox de vehículo está seleccionado, agregar directamente y cerrar el modal
    if (VEHICULO_SELECCIONADO && this.agregarMercanciasForm.valid) {
      this.agregarMercancias();
      // Cerrar el modal de agregar mercancías
      if (this.modalElement && this.modalElement.nativeElement) {
      const WIN = window as { bootstrap?: { Modal: unknown } };
        if (WIN.bootstrap) {
          const CLASE_MODAL = WIN.bootstrap.Modal as typeof Modal;
          const MODAL_AGREGAR_MERCANCIAS = CLASE_MODAL.getInstance(this.modalElement.nativeElement) || new CLASE_MODAL(this.modalElement.nativeElement);
          MODAL_AGREGAR_MERCANCIAS.hide();
        } else {
          this.modalElement.nativeElement.style.display = 'none';
        }
      }
      return;
    }
    // Si NO es vehículo y los campos principales son válidos, mostrar el modal de confirmación
    if (!VEHICULO_SELECCIONADO && CAMPOS_VALIDOS) {
      // Usar implementación manual sin Bootstrap para evitar conflictos de focus
      if (this.confirmarModalAgregarElement && this.confirmarModalAgregarElement.nativeElement) {
        const ELEMENTO_MODAL = this.confirmarModalAgregarElement.nativeElement;
        
        // Mostrar modal manualmente
        ELEMENTO_MODAL.classList.remove('confirmar-modal-agregar');
        ELEMENTO_MODAL.style.display = 'block';
        ELEMENTO_MODAL.classList.add('show');
        ELEMENTO_MODAL.setAttribute('aria-hidden', 'false');
        
        // Agregar backdrop manualmente
        const FONDO_MODAL = document.createElement('div');
        FONDO_MODAL.className = 'modal-backdrop fade show';
        FONDO_MODAL.setAttribute('data-modal-id', 'confirmarModalAgregar');
        document.body.appendChild(FONDO_MODAL);
        document.body.classList.add('modal-open');
        
        // Agregar event listener para cerrar con backdrop
        FONDO_MODAL.addEventListener('click', () => this.cerrarModalManual());
      }
      return;
    }
    // Si no cumple, marcar como tocado para mostrar errores
    this.agregarMercanciasForm.markAllAsTouched();
  }
  /**
   * Índice de la fila seleccionada en la tabla, o nulo si no hay ninguno seleccionado.
   */
  filaSeleccionada: number | null = null;

  /**
   * Array de índices de las filas seleccionadas en la tabla con checkboxes.
   */
  filasSeleccionadas: number[] = [];

  /**
   * Índice de la fila que se está editando, o nulo si se está agregando una nueva.
   */
  filaEditando: number | null = null;

  /**
   * Selecciona una fila de la tabla y actualiza el índice de la fila seleccionada.
   *
   * @param {MercanciaRow} row Fila de mercancía seleccionada.
   * @returns {void}
   */
  seleccionarFila(row: MercanciaRow): void {
  const INDICE = this.mercanciaBodyData.indexOf(row);
  this.filaSeleccionada = INDICE;
  }

  /**
   * Maneja la selección múltiple de filas desde el componente tabla-dinamica.
   * Actualiza el array de filas seleccionadas y establece filaSeleccionada solo si hay exactamente una fila seleccionada.
   *
   * @param {MercanciaRow[]} filasSeleccionadas Array de filas seleccionadas desde la tabla.
   * @returns {void}
   */
  manejarSeleccionMultiple(filasSeleccionadas: MercanciaRow[]): void {
    // Convertir las filas seleccionadas a índices
    this.filasSeleccionadas = filasSeleccionadas.map(fila => this.mercanciaBodyData.indexOf(fila));
    
    // Solo establecer filaSeleccionada si hay exactamente una fila seleccionada
    if (this.filasSeleccionadas.length === 1) {
      this.filaSeleccionada = this.filasSeleccionadas[0];
    } else {
      this.filaSeleccionada = null;
    }
  }

  /**
   * Permite editar una fila de la tabla de mercancías.
   * Busca la fila por su índice, valida que sea correcto, y carga los datos en el formulario de mercancías para su edición.
   * Si el índice es inválido, no realiza ninguna acción.
   *
   * @param {number | null} index Índice de la fila a editar en la tabla de mercancías.
   * @returns {void}
   */
  editarFila(index: number | null): void {
    if (index === null || index === undefined || index < 0 || index >= this.mercanciaBodyData.length) {
      return;
    }
    this.filaEditando = index;
  const FILA = this.mercanciaBodyData[index];
    this.agregarMercanciasForm.patchValue({
      datosMercancia: {
        tipoDeMercancia: FILA.tbodyData[0] ?? '',
        cantidad: FILA.tbodyData[1] ?? '',
        unidadMedida: FILA.tbodyData[2] ?? '',
        ano: FILA.tbodyData[3] ?? '',
        modelo: FILA.tbodyData[4] ?? '',
        marca: FILA.tbodyData[5] ?? '',
        serie: FILA.tbodyData[6] ?? '',
        usoEspecifico: FILA.tbodyData[7] ?? '', // Uso específico after Numero de serie
        condicionMercancia: FILA.tbodyData[8] ?? '',
        vehiculo: FILA.tbodyData[9] === 'Sí',
      }
    });
    this.abrirDialogoMercancias();
  }

  /**
   * Elimina una fila de la tabla de mercancías según el índice proporcionado.
   * Si el índice es válido, elimina la fila tanto del arreglo de datos como de la tabla visual,
   * y limpia la selección si la fila eliminada estaba seleccionada.
   *
   * @param {number | null} index Índice de la fila a eliminar en la tabla de mercancías.
   * @returns {void}
   */
  eliminarFila(index: number | null): void {
    if (index === null || index === undefined) {
      return;
    }
    this.mercanciaBodyData.splice(index, 1);
    this.getMercanciaTableData.mercanciaTable.tableBody.splice(index, 1);
    this.mercanciaBodyData = [...this.mercanciaBodyData];
    // Limpiar la selección si la fila eliminada estaba seleccionada
    if (this.filaSeleccionada === index) {
      this.filaSeleccionada = null;
    }
  }

  /**
   * Controla si el radio button debe estar deshabilitado.
   */
  public opcionDeshabilitado = true;

  /**
   * Limpia el formulario de agregar mercancías en el modal.
   */
  /**
   * Limpia y reinicia el formulario de agregar mercancías en el modal.
   * Restablece los valores, el estado de los controles y la bandera de intento de envío.
   *
   * @returns {void}
   */
  limpiarAgregarMercanciasForm(): void {
    this.agregarMercanciasForm.reset();
    this.agregarMercanciasForm.markAsUntouched();
    this.agregarMercanciasForm.markAsPristine();
    this.envioIntentado = false;
  }

  /**
   * Cancela y limpia el formulario de agregar mercancías al cerrar el modal.
   */
  /**
   * Cancela la operación de agregar mercancía, limpia el formulario y cierra el modal correspondiente.
   *
   * @returns {void}
   */
  cancelarAgregarMercanciasForm(): void {
    this.limpiarAgregarMercanciasForm();
    this.cerrarModal();
  }
  /**
   * Bandera para indicar si se intentó enviar el formulario y mostrar errores de validación
   */
  public envioIntentado = false;
  /**
   * Formulario principal para el trámite de exención de impuestos.
   */
  tramiteForm!: FormGroup;

  /**
   * Formulario para agregar mercancías al trámite.
   */
  agregarMercanciasForm!: FormGroup;

  /**
   * Sujeto para manejar la finalización de observables al destruir el componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Estado actual de la solicitud del trámite.
   */
  public solicitudState!: Solicitud103State;

  /**
   * Encabezados de la tabla de mercancías.
   */
  public mercanciaHeaderData: ConfiguracionColumna<TableBodyData>[] = [];
  /**
   * Tipo de selección de la tabla (por ejemplo, selección por checkbox).
   */
  tipoSeleccionTabla: TablaSeleccion = TablaSeleccion.CHECKBOX;
  /**
   * Datos del cuerpo de la tabla de mercancías.
   */
  public mercanciaBodyData: MercanciaRow[] = [];

  /**
   * Catálogos de fechas seleccionadas.
   */
  fechasSeleccionadas: Catalogo[] = [];

  /**
   * Lista de condiciones disponibles para la mercancía.
   */
  condicionMercancia!: Catalogo[];

  /**
   * Lista de unidades de medida disponibles.
   */
  unidadMedida!: Catalogo[];

  /**
   * Lista de años disponibles.
   */
  ano!: Catalogo[];

  /**
   * Lista de países disponibles.
   */
  pais!: Catalogo[];

  /**
   * Lista de aduanas disponibles.
   */
  aduana: Catalogo[] = [];

  /**
   * Lista de destinos disponibles para la mercancía.
   */
  destinoMercancia!: Catalogo[];

  /**
   * Referencia al elemento modal para agregar mercancías.
   */
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;

  /**
   * Referencia al elemento modal de confirmación.
   */
  @ViewChild('confirmarModal') confirmarModalElement!: ElementRef;

  /**
   * Referencia al elemento modal de confirmación de vehículo.
   */
  @ViewChild('confirmarModalVehiculo') confirmarModalVehiculoElement!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal.
   */
  @ViewChild('closeModal') closeModal!: ElementRef;

  /**
   * Referencia al botón para cerrar el modal de confirmación.
   */
  @ViewChild('closeConfirmarModal') closeConfirmarModal!: ElementRef;
  /**
   * Referencia al modal de confirmación para agregar mercancías.
   */
  @ViewChild('confirmarModalAgregar') confirmarModalAgregarElement!: ElementRef;

  /**
   * Instancia del modal de confirmación para agregar mercancías.
   */
  private confirmarModalAgregarInstance: Modal | null = null;

  /**
   * Datos de las mercancías registradas.
   */
  public datosDelMercancia: DatosDelMercancia[] = [];

  /**
   * Valor seleccionado en el grupo de opciones de radio.
   */
  valorSeleccionado!: string;

  /**
   * Opciones disponibles para el grupo de radio.
   */
  radioOpcions: RadioOpcion[] = [
    { label: 'Sí', value: 'si' },
    { label: 'No', value: 'no' }
  ];

  /**
   * Estado actual de la consulta relacionada con el trámite.
   */
  consultaDatos: ConsultaDatos = { readonly: false };

  /**
   * Datos de la tabla de mercancías obtenidos desde un archivo JSON.
   */
  public getMercanciaTableData: MercanciaTableData = { mercanciaTable: { tableHeader: [], tableBody: [] } };

  /**
   * Indica si el formulario está en modo de solo lectura.
   */
  soloLectura: boolean = false;

  /**
   * Flag para evitar bucles infinitos en el método aduanaSeleccion
   */
  private isProcessingAduanaSelection = false;

  /**
   * Flag para evitar bucles infinitos en el método destinoMercanciaSeleccion
   */
  private isProcessingDestinoSelection = false;

  /**
   * Constructor del componente ExencionImpuestosComponent.
   * Inicializa los servicios y dependencias necesarias para el manejo de formularios, catálogos y tablas de mercancías.
   *
   * @param {ExencionImpuestosService} exencionImpuestoService Servicio para operaciones de exención de impuestos.
   * @param {Tramite103Store} store Almacén para el estado del trámite 103.
   * @param {Tramite103Query} query Consulta para obtener el estado del trámite 103.
   * @param {FormBuilder} fb Constructor para formularios reactivos de Angular.
   * @param {ValidacionesFormularioService} validacionesService Servicio para validaciones personalizadas de formularios.
   * @param {ConsultaioQuery} consultaioQuery Consulta para el estado de la consulta relacionada.
   * @param {ChangeDetectorRef} cdr Referencia para la detección de cambios en el componente.
   * @param {MercanciaTableService} mercanciaTableService Servicio para la gestión de la tabla de mercancías.
   */
  constructor(
    private exencionImpuestoService: ExencionImpuestosService,
    private store: Tramite103Store,
    private query: Tramite103Query,
    public fb: FormBuilder,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery,
    private cdr: ChangeDetectorRef,
    private mercanciaTableService: MercanciaTableService
  ) {
    // Aquí se implementará la lógica del constructor.
  }

  /**
   * Método de inicialización del componente.
   * Configura observables, inicializa catálogos y formularios.
   */
  /**
   * Método de ciclo de vida que se ejecuta al inicializar el componente.
   * Inicializa catálogos, formularios, suscripciones y datos de la tabla de mercancías.
   * Configura el modo de solo lectura y prepara la interfaz para la captura de datos.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    // Obtener opciones de aduana
    this.exencionImpuestoService.getOpcionesAduana().subscribe(options => {
      this.aduana = options.map(opt => ({ 
        id: Number(opt.value ?? opt.id), 
        descripcion: String(opt.label ?? opt.descripcion)
      }));
    });

    // Suscribirse al estado de consultaio
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: ConsultaDatos) => {
          this.consultaDatos = seccionState;
          this.soloLectura = this.consultaDatos.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();

    // Inicializar catálogos y formularios
    this.inicializaCatalogos();
    this.obtenerEstadoSolicitud();
    this.donanteDomicilio();

    // Suscribirse a la tabla de mercancías
    this.mercanciaTableService.getTable().subscribe((data: MercanciaTableData) => {
      this.getMercanciaTableData = data;
      this.obtenerMercancia();
    });

    // Suscribirse a cambios en aduana para ejecutar aduanaSeleccion
    if (this.tramiteForm?.get('exencionImpuestos.aduana')) {
      this.tramiteForm.get('exencionImpuestos.aduana')?.valueChanges
        .pipe(
          takeUntil(this.destroyNotifier$),
          distinctUntilChanged()
        )
        .subscribe((_ ) => {
          if (!this.isProcessingAduanaSelection) {
            this.aduanaSeleccion();
          }
        });
    }
    // Asegura que el radio esté deshabilitado por defecto (controlado en donanteDomicilio)
  }

  /**
   * Obtiene el estado actual de la solicitud desde el almacén.
   * @private
   */
  private obtenerEstadoSolicitud(): void {
    this.query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState: Solicitud103State) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   * @private
   */
  /**
   * Inicializa los catálogos necesarios para el formulario, obteniendo datos de los servicios correspondientes.
   * Carga los catálogos de destino de mercancía, condición, unidad de medida, año y país.
   *
   * @private
   * @returns {void}
   */
  private inicializaCatalogos(): void {
    // Aduana se carga en ngOnInit desde ImportadorExportadorService.getOpcionesAduana()
    const DESTINO_MERCANCIA$ = this.exencionImpuestoService.getDestinoMercancia().pipe(
      map((resp: ApiCatalogoResponse) => {
        this.destinoMercancia = resp.data;
      })
    );
    const CONDICION_MERCANCIA$ = this.exencionImpuestoService.getCondicionMercancia().pipe(
      map((resp: ApiCatalogoResponse) => {
        this.condicionMercancia = resp.data;
      })
    );
    const UNIDAD_MEDIDA$ = this.exencionImpuestoService.getUnidadMedida().pipe(
      map((resp: ApiCatalogoResponse) => {
        this.unidadMedida = resp.data;
      })
    );
    const ANO$ = this.exencionImpuestoService.getAno().pipe(
      map((resp: ApiCatalogoResponse) => {
        this.ano = resp.data;
      })
    );
    const PAIS$ = this.exencionImpuestoService.getPais().pipe(
      map((resp: ApiCatalogoResponse) => {
        this.pais = resp.data;
      })
    );

    merge(DESTINO_MERCANCIA$, CONDICION_MERCANCIA$, UNIDAD_MEDIDA$, ANO$, PAIS$)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe();
  }

  /**
   * Inicializa los formularios principales con valores y validaciones.
   * @private
   */
  private donanteDomicilio(): void {
    // Establezca siempre 'si' después de la inicialización del formulario
    setTimeout(() => {
      this.tramiteForm.get('importadorExportador.opcion')?.setValue('si', { emitEvent: false });
    });
    this.tramiteForm = this.fb.group({
      exencionImpuestos: this.fb.group({
        manifesto: [this.solicitudState?.manifesto, [Validators.required]],
        aduana: [this.solicitudState?.aduana, [Validators.required]],
        organismoPublico: [this.solicitudState?.organismoPublico, [Validators.required]],
        destinoMercancia: [this.solicitudState?.destinoMercancia, [Validators.required]],
        personaMoral: [this.solicitudState?.personaMoral]
      }),
      importadorExportador: this.fb.group({
        nombre: [this.solicitudState?.nombre, [Validators.required, Validators.maxLength(50)]],
        calle: [this.solicitudState?.calle, [Validators.required, Validators.maxLength(80)]],
        numeroExterior: [this.solicitudState?.numeroExterior, [Validators.required, Validators.maxLength(40)]],
        numeroInterior: [this.solicitudState?.numeroInterior, [Validators.maxLength(30)]],
        telefono: [this.solicitudState?.telefono, [Validators.required, Validators.pattern(REGEX_TELEFONO_DIGITOS)]],
        correoElectronico: [this.solicitudState?.correoElectronico, [Validators.required, Validators.email, Validators.maxLength(50)]],
        pais: [this.solicitudState?.pais, [Validators.required]],
        codigoPostal: [this.solicitudState?.codigoPostal, [Validators.required, Validators.pattern(REGEX_POSTAL)]],
        estado: [this.solicitudState?.estado, [Validators.required, Validators.maxLength(50)]],
        colonia: [this.solicitudState?.colonia, [Validators.required, Validators.maxLength(50)]],
        personaMoral: [this.solicitudState?.personaMoral],
        opcion: ['si', [Validators.required]]
      })
    });
    // Forzar la selección visual de 'si' después de cualquier lógica de habilitación/desactivación
    this.tramiteForm.get('importadorExportador.opcion')?.setValue('si', { emitEvent: false });

    /**
     * Formulario reactivo para agregar mercancías al trámite.
     * Contiene el grupo de controles 'datosMercancia' con los siguientes campos:
     * - tipoDeMercancia: Tipo de mercancía (requerido)
     * - usoEspecifico: Uso específico de la mercancía (requerido)
     * - condicionMercancia: Condición de la mercancía (requerido)
     * - unidadMedida: Unidad de medida de la mercancía (requerido)
     * - vehiculo: Indica si la mercancía es un vehículo (requerido)
     * - ano: Año del vehículo (opcional, requerido si es vehículo)
     * - cantidad: Cantidad de mercancía (requerido)
     * - marca: Marca del vehículo (opcional, requerido si es vehículo)
     * - modelo: Modelo del vehículo (opcional, requerido si es vehículo)
     * - serie: Serie del vehículo (opcional, requerido si es vehículo)
     */
    this.agregarMercanciasForm = this.fb.group({
      datosMercancia: this.fb.group({
        tipoDeMercancia: [this.solicitudState?.tipoDeMercancia, [Validators.required]],
        usoEspecifico: [this.solicitudState?.usoEspecifico, [Validators.required]],
        condicionMercancia: [this.solicitudState?.condicionMercancia, [Validators.required]],
        unidadMedida: [this.solicitudState?.unidadMedida, [Validators.required]],
        vehiculo: [this.solicitudState?.vehiculo ?? false],
        ano: [this.solicitudState?.ano ?? ''],
        cantidad: [
          this.solicitudState?.cantidad,
          [
            Validators.required,
            Validators.pattern(REGEX_PATRON_DECIMAL_12_3),
            Validators.min(1)
          ]
        ],
        marca: [this.solicitudState?.marca],
        modelo: [this.solicitudState?.modelo],
        serie: [this.solicitudState?.serie]
      })
    });
    /**
     * Inicializa el estado de los formularios (habilitado o deshabilitado) según el modo de solo lectura.
     * Si el trámite está en modo solo lectura, deshabilita los formularios para evitar modificaciones.
     */
    this.inicializarEstadoFormulario();

    // Asegura que el radio esté deshabilitado por defecto (controlado por aduanaSeleccion)
    this.opcionDeshabilitado = true;

    // Suscribirse a los cambios de aduana para habilitar/deshabilitar los botones de radio
    this.tramiteForm?.get('exencionImpuestos.aduana')?.valueChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        distinctUntilChanged()
      )
      .subscribe((_ ) => {
        if (!this.isProcessingAduanaSelection) {
          this.aduanaSeleccion();
        }
      });

    // Asegura el estado correcto de habilitación/deshabilitación del radio después de la inicialización del formulario
    this.aduanaSeleccion();
  }

  /**
   * Obtiene el grupo de formulario para exención de impuestos.
   * @returns {FormGroup} Grupo de formulario.
   */
  get exencionImpuestos(): FormGroup {
    return this.tramiteForm.get('exencionImpuestos') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario para importador/exportador.
   * @returns {FormGroup} Grupo de formulario.
   */
  get importadorExportador(): FormGroup {
    return this.tramiteForm.get('importadorExportador') as FormGroup;
  }

  /**
   * Obtiene el grupo de formulario para datos de mercancía.
   * @returns {FormGroup} Grupo de formulario.
   */
  get datosMercancia(): FormGroup {
    return this.agregarMercanciasForm.get('datosMercancia') as FormGroup;
  }

  /**
   * Maneja la selección de aduana y actualiza el almacén.
   */
  /**
   * Maneja la selección de aduana en el formulario y actualiza el almacén y el estado de los controles relacionados.
   * Habilita o deshabilita el grupo de opciones de radio según la aduana seleccionada.
   *
   * @returns {void}
   */
  aduanaSeleccion(): void {
      // Establezca siempre 'si' después de habilitar/deshabilitar la lógica
      setTimeout(() => {
        this.tramiteForm.get('importadorExportador.opcion')?.setValue('si', { emitEvent: false });
      });
  // Fuerce siempre la selección visual de 'si' después de habilitar/deshabilitar
  this.tramiteForm.get('importadorExportador.opcion')?.setValue('si', { emitEvent: false });
    if (this.isProcessingAduanaSelection) {
      return;
    }
    
    this.isProcessingAduanaSelection = true;
    
    try {
      const ADUANA = this.tramiteForm.get('exencionImpuestos.aduana')?.value;
      this.store.setAduana(ADUANA);
      // ADUANA puede ser id (número) o descripción (cadena), así que buscar por id si es posible
      let ADUANA_OBJ: Catalogo | undefined = undefined;
      // Intentar coincidir por id (número) primero
      if (!isNaN(Number(ADUANA))) {
        ADUANA_OBJ = this.aduana.find(a => a.id === Number(ADUANA));
      }
      // Alternativa: intentar coincidir por descripción (cadena)
      if (!ADUANA_OBJ && typeof ADUANA === 'string') {
        ADUANA_OBJ = this.aduana.find(a => a.descripcion === ADUANA);
      }
      // Registro de depuración
      const OPCION_CONTROL = this.tramiteForm.get('importadorExportador.opcion');
      if (ADUANA_OBJ && ADUANA_OBJ.descripcion && ADUANA_OBJ.descripcion.toLowerCase().includes('salud')) {
        this.opcionDeshabilitado = false;
        OPCION_CONTROL?.enable({ emitEvent: false });
        // Simplemente establezca el valor actual sin la manipulación del tiempo.
        if (OPCION_CONTROL?.value) {
          OPCION_CONTROL.updateValueAndValidity({ emitEvent: false });
        }
      } else {
        this.opcionDeshabilitado = true;
        this.valorSeleccionado = '';
        OPCION_CONTROL?.setValue('', { emitEvent: false });
        OPCION_CONTROL?.disable({ emitEvent: false });
      }
    } finally {
      // Restablecer siempre la bandera
      this.isProcessingAduanaSelection = false;
    }
  }

  /**
   * Maneja la selección de destino de mercancía y actualiza el almacén.
   */
  /**
   * Maneja la selección de destino de mercancía en el formulario y actualiza el almacén y el estado de los controles relacionados.
   * Habilita o deshabilita el grupo de opciones de radio según el destino seleccionado.
   *
   * @returns {void}
   */
  destinoMercanciaSeleccion(): void {
    // Habilita el radio solo si destinoMercancia es 'Salud Pública' (id: 3)
    const DESTINO_MERCANCIA = this.tramiteForm.get('exencionImpuestos.destinoMercancia')?.value;
    this.store.setDestinoMercancia(DESTINO_MERCANCIA);
    const OPCION_CONTROL = this.tramiteForm.get('importadorExportador.opcion');
    if (DESTINO_MERCANCIA === 3) {
      // Si se habilita, restaura el valor anterior o selecciona 'si' por defecto
      this.opcionDeshabilitado = false;
      OPCION_CONTROL?.enable({ emitEvent: false });
      if (!OPCION_CONTROL?.value) {
        OPCION_CONTROL?.setValue('si', { emitEvent: false });
      }
    } else {
      // Si se deshabilita, no borra el valor, solo deshabilita el control
      this.opcionDeshabilitado = true;
      OPCION_CONTROL?.disable({ emitEvent: false });
    }
  }

  /**
   * Maneja la selección de condición de mercancía y actualiza el almacén.
   */
  condicionMercanciaSeleccion(): void {
  const CONDICION_MERCANCIA = this.agregarMercanciasForm.get('datosMercancia.condicionMercancia')?.value;
  this.store.setCondicionMercancia(CONDICION_MERCANCIA);
  }

  /**
   * Maneja la selección de unidad de medida y actualiza el almacén.
   */
  unidadMedidaSeleccion(): void {
  const UNIDAD_MEDIDA = this.agregarMercanciasForm.get('datosMercancia.unidadMedida')?.value;
  this.store.setUnidadMedida(UNIDAD_MEDIDA);
  }

  /**
   * Maneja la selección de año y actualiza el almacén.
   */
  anoSeleccion(): void {
  const ANO = this.agregarMercanciasForm.get('datosMercancia.ano')?.value;
  this.store.setAno(ANO);
  }

  /**
   * Maneja la selección de país y actualiza el almacén.
   */
  paisSeleccion(): void {
    const PAIS = this.tramiteForm.get('importadorExportador.pais')?.value;
    this.store.setPais(PAIS);
  }

  /**
   * Maneja la selección de organismo público y actualiza el almacén.
   */
  organismoPublico(): void {
    const ORGANISMOPUBLICO = this.tramiteForm.get('exencionImpuestos.organismoPublico')?.value;
    this.store.setOrganismoPublico(ORGANISMOPUBLICO);
  }
  /**
   * Maneja la selección de persona moral.
   * (Método deshabilitado porque setPersonaMoral no existe en Tramite103Store)
   */
  personaMoral(): void {
    const PERSONAMORAL = this.tramiteForm.get('exencionImpuestos.personaMoral')?.value;
    this.store.setPersonaMoral(PERSONAMORAL);
  }
  /**
   * Maneja la selección de vehículo y actualiza el almacén.
   */
  /**
   * Maneja la selección del checkbox de vehículo en el formulario de mercancías.
   * Si el checkbox está seleccionado, abre el modal de confirmación de forma segura.
   * Si no está seleccionado, elimina los validadores de esos campos.
   * Finalmente, actualiza la validez de los controles.
   *
   * @returns {void}
   */
  vehiculo(): void {
    const VEHICULO_CTRL = this.agregarMercanciasForm.get('datosMercancia.vehiculo');
    const MARCA_CTRL = this.agregarMercanciasForm.get('datosMercancia.marca');
    const ANO_CTRL = this.agregarMercanciasForm.get('datosMercancia.ano');
    const SERIE_CTRL = this.agregarMercanciasForm.get('datosMercancia.serie');
    const MODELO_CTRL = this.agregarMercanciasForm.get('datosMercancia.modelo');
    const VEHICULO = VEHICULO_CTRL?.value;
    
    // Actualizar tienda
    this.store.setVehiculo(VEHICULO);
    
    if (VEHICULO) {
      this.abrirModalVehiculoSeguro();
    } else {
      // Borrar validadores cuando no están marcados
      MARCA_CTRL?.clearValidators();
      MODELO_CTRL?.clearValidators();
      SERIE_CTRL?.clearValidators();
      ANO_CTRL?.clearValidators();
      
      MARCA_CTRL?.updateValueAndValidity({ emitEvent: false });
      MODELO_CTRL?.updateValueAndValidity({ emitEvent: false });
      SERIE_CTRL?.updateValueAndValidity({ emitEvent: false });
      ANO_CTRL?.updateValueAndValidity({ emitEvent: false });
    }
  }

  /**
   * Abre el modal de confirmación de vehículo de manera segura.
   * Utiliza un enfoque que evita conflictos con Bootstrap y problemas de colgado.
   *
   * @returns {void}
   */
  abrirModalVehiculoSeguro(): void {
    setTimeout(() => {
      const MODAL_VEHICULO = this.confirmarModalVehiculoElement?.nativeElement || document.getElementById('confirmarModalVehiculo');
      if (MODAL_VEHICULO) {
        try {
          const WIN = window as { bootstrap?: { Modal: unknown } };
          if (WIN.bootstrap && WIN.bootstrap.Modal) {
            const CLASE_MODAL = WIN.bootstrap.Modal as typeof Modal;
            const MODAL_INSTANCIA = new CLASE_MODAL(MODAL_VEHICULO, {
              backdrop: 'static',
              keyboard: false,
              focus: false 
            });
            MODAL_INSTANCIA.show();
          } else {
            MODAL_VEHICULO.style.display = 'block';
            MODAL_VEHICULO.style.zIndex = '1070';
            MODAL_VEHICULO.classList.add('show');
            MODAL_VEHICULO.setAttribute('aria-hidden', 'false');
            
            // Agregar fondo manualmente
            const BACKDROP = document.createElement('div');
            BACKDROP.className = 'modal-backdrop fade show';
            BACKDROP.style.zIndex = '1069';
            document.body.appendChild(BACKDROP);
          }
        } catch (error) {
          // Si falla el modal, mostrar el modal de confirmación de vehículo manualmente
          const MODAL_VEHICULO_FALLBACK = this.confirmarModalVehiculoElement?.nativeElement || document.getElementById('confirmarModalVehiculo');
          if (MODAL_VEHICULO_FALLBACK) {
            MODAL_VEHICULO_FALLBACK.style.display = 'block';
            MODAL_VEHICULO_FALLBACK.style.zIndex = '1070';
            MODAL_VEHICULO_FALLBACK.classList.add('show');
            MODAL_VEHICULO_FALLBACK.setAttribute('aria-hidden', 'false');
            // Agregar fondo manualmente
            const BACKDROP = document.createElement('div');
            BACKDROP.className = 'modal-backdrop fade show';
            BACKDROP.style.zIndex = '1069';
            document.body.appendChild(BACKDROP);
          }
        }
      }
    }, 50);
  }

  /**
   * Confirma la selección de vehículo y establece los validadores requeridos.
   *
   * @returns {void}
   */
  confirmarVehiculo(): void {
    const MARCA_CTRL = this.agregarMercanciasForm.get('datosMercancia.marca');
    const ANO_CTRL = this.agregarMercanciasForm.get('datosMercancia.ano');
    const SERIE_CTRL = this.agregarMercanciasForm.get('datosMercancia.serie');
    const MODELO_CTRL = this.agregarMercanciasForm.get('datosMercancia.modelo');
    
    // Establecer validadores para campos de vehículos
    MARCA_CTRL?.setValidators([Validators.required]);
    MODELO_CTRL?.setValidators([Validators.required]);
    SERIE_CTRL?.setValidators([Validators.required]);
    ANO_CTRL?.setValidators([Validators.required]);
    
    // Actualizar validez sin emitir eventos
    MARCA_CTRL?.updateValueAndValidity({ emitEvent: false });
    MODELO_CTRL?.updateValueAndValidity({ emitEvent: false });
    SERIE_CTRL?.updateValueAndValidity({ emitEvent: false });
    ANO_CTRL?.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Cancela la selección de vehículo y desmarca el checkbox.
   *
   * @returns {void}
   */
  cancelarVehiculo(): void {
    const VEHICULO_CTRL = this.agregarMercanciasForm.get('datosMercancia.vehiculo');
    const MARCA_CTRL = this.agregarMercanciasForm.get('datosMercancia.marca');
    const ANO_CTRL = this.agregarMercanciasForm.get('datosMercancia.ano');
    const SERIE_CTRL = this.agregarMercanciasForm.get('datosMercancia.serie');
    const MODELO_CTRL = this.agregarMercanciasForm.get('datosMercancia.modelo');
    
    // Desmarque la casilla de verificación del vehículo y borre los validadores.
    VEHICULO_CTRL?.setValue(false, { emitEvent: false });
    MARCA_CTRL?.clearValidators();
    MODELO_CTRL?.clearValidators();
    SERIE_CTRL?.clearValidators();
    ANO_CTRL?.clearValidators();

    // Actualizar validez sin emitir eventos
    MARCA_CTRL?.updateValueAndValidity({ emitEvent: false });
    MODELO_CTRL?.updateValueAndValidity({ emitEvent: false });
    SERIE_CTRL?.updateValueAndValidity({ emitEvent: false });
    ANO_CTRL?.updateValueAndValidity({ emitEvent: false });
  }

  /**
   * Valida el formulario de destinatario marcando todos los controles como tocados si es inválido.
   */
  validarDestinatarioFormulario(): void {
    if (this.tramiteForm.invalid) {
      this.tramiteForm.markAllAsTouched();
    }
  }

  /**
   * Establece un valor en el almacén a partir de un campo de formulario.
   * @param {FormGroup} form Grupo de formulario.
   * @param {string} campo Nombre del campo.
   * @param {keyof Tramite103Store} metodoNombre Nombre del método en el almacén.
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite103Store): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Abre el modal para agregar mercancías.
   */
  abrirDialogoMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCIA = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCIA.show();
    }
  }

  /**
   * Cierra el modal actualmente abierto.
   */
  cerrarModal(): void {
    if (this.modalElement) {
      const INSTANCIA_MODAL = Modal.getInstance(this.modalElement.nativeElement) || new Modal(this.modalElement.nativeElement);
      INSTANCIA_MODAL.hide();
    }
    // Alternativa: también hacer clic en el botón de cerrar si está presente
    if (this.closeModal) {
      this.closeModal.nativeElement.click();
    }
    // Limpie los fondos modales inmediatamente para evitar que se cuelguen.
    const BACKDROPS = document.querySelectorAll('.modal-backdrop');
    BACKDROPS.forEach(bd => bd.parentNode?.removeChild(bd));
    document.body.classList.remove('modal-open');
  }

  /**
   * Agrega mercancías al trámite si el formulario es válido.
   * Actualiza la tabla y cierra el modal.
   */
  agregarMercancias(): void {
    const DATOS_MERCANCIA = this.agregarMercanciasForm.get('datosMercancia');
    if (!DATOS_MERCANCIA) { return; }
    const VEHICULO_SELECCIONADO = DATOS_MERCANCIA.get('vehiculo')?.value;
    const CAMPOS_PRINCIPALES = [
      'tipoDeMercancia',
      'usoEspecifico',
      'cantidad',
      'condicionMercancia',
      'unidadMedida'
    ];
    const CAMPOS_VALIDOS = CAMPOS_PRINCIPALES.every(CAMPO => {
      const CTRL = DATOS_MERCANCIA.get(CAMPO);
      return CTRL && CTRL.value !== null && CTRL.value !== '';
    });

    if (!VEHICULO_SELECCIONADO && CAMPOS_VALIDOS) {
      this.procesarMercanciaSinVehiculo();
      return;
    }
    if (VEHICULO_SELECCIONADO && this.agregarMercanciasForm.valid) {
      this.procesarMercanciaConVehiculo();
      return;
    }
    this.agregarMercanciasForm.markAllAsTouched();
  }

  private procesarMercanciaSinVehiculo(): void {
    const VALORES = this.agregarMercanciasForm.value.datosMercancia;
    const VEHICULO_VALUE = VALORES.vehiculo === true ? 'Sí' : 'No';
    const DATOS = {
      tbodyData: [
        VALORES.tipoDeMercancia ?? '',
        VALORES.cantidad ?? '',
        VALORES.unidadMedida ?? '',
        VALORES.ano ?? '',
        VALORES.modelo ?? '',
        VALORES.marca ?? '',
        VALORES.serie ?? '',
        VALORES.usoEspecifico ?? '',
        VALORES.condicionMercancia ?? '',
        VEHICULO_VALUE
      ]
    };
    this.actualizarMercanciaBodyData(DATOS);
    this.limpiarFormularioMercancia();
  }

  private procesarMercanciaConVehiculo(): void {
    const VALORES = this.agregarMercanciasForm.value.datosMercancia;
    const VEHICULO_VALUE = VALORES.vehiculo === true ? 'Sí' : 'No';
    const DATOS = {
      tbodyData: [
        VALORES.tipoDeMercancia ?? '',
        VALORES.cantidad ?? '',
        VALORES.unidadMedida ?? '',
        VALORES.ano ?? '',
        VALORES.modelo ?? '',
        VALORES.marca ?? '',
        VALORES.serie ?? '',
        VALORES.usoEspecifico ?? '',
        VALORES.condicionMercancia ?? '',
        VEHICULO_VALUE
      ]
    };
    this.actualizarMercanciaBodyData(DATOS);
    this.limpiarFormularioMercancia();
  }

  private actualizarMercanciaBodyData(DATOS: MercanciaRow): void {
    if (this.filaEditando !== null) {
      this.mercanciaBodyData[this.filaEditando] = DATOS;
      if (this.getMercanciaTableData && this.getMercanciaTableData.mercanciaTable && Array.isArray(this.getMercanciaTableData.mercanciaTable.tableBody)) {
        this.getMercanciaTableData.mercanciaTable.tableBody[this.filaEditando] = DATOS;
      }
      this.filaEditando = null;
    } else {
      this.mercanciaBodyData.push(DATOS);
      if (this.getMercanciaTableData && this.getMercanciaTableData.mercanciaTable) {
        if (!Array.isArray(this.getMercanciaTableData.mercanciaTable.tableBody)) {
          this.getMercanciaTableData.mercanciaTable.tableBody = [];
        }
        this.getMercanciaTableData.mercanciaTable.tableBody.push(DATOS);
      }
    }
    this.mercanciaBodyData = [...this.mercanciaBodyData];
  }

  private limpiarFormularioMercancia(): void {
    this.agregarMercanciasForm.reset();
    this.agregarMercanciasForm.markAsUntouched();
    this.agregarMercanciasForm.markAsPristine();
    this.envioIntentado = false;
    this.cerrarModal();
  }

  /**
   * Abre el modal de confirmación si el formulario de mercancías es válido.
   */
  agregarConfirmarModal(): void {
    this.envioIntentado = true;
    if (this.agregarMercanciasForm.valid === true) {
      if (this.confirmarModalElement) {
        const MODAL_INSTANCIA = new Modal(this.confirmarModalElement.nativeElement);
        this.cerrarModal();
        MODAL_INSTANCIA.show();
      }
    } else {
      this.agregarMercanciasForm.markAllAsTouched();
    }
  }

  /**
   * Inicializa los datos de la tabla de mercancías.
   */
  public obtenerMercancia(): void {
    // Solo configura los encabezados, pero no carga datos iniciales
    const HEADERS: string[] = this.getMercanciaTableData?.mercanciaTable?.tableHeader || [];
    this.mercanciaHeaderData = HEADERS.map((encabezado, idx) => ({
      encabezado,
      orden: idx,
      clave: (row: TableBodyData): string => {
        if (encabezado.toLowerCase().includes('condición')) {
          return ExencionImpuestosComponent.obtenerDescripcion(this.condicionMercancia, row.tbodyData?.[idx]);
        }
        if (encabezado.toLowerCase().includes('unidad')) {
          return ExencionImpuestosComponent.obtenerDescripcion(this.unidadMedida, row.tbodyData?.[idx]);
        }
        if (encabezado.toLowerCase().includes('año') || encabezado.toLowerCase().includes('ano')) {
          return ExencionImpuestosComponent.obtenerDescripcion(this.ano, row.tbodyData?.[idx]);
        }
        return row.tbodyData?.[idx] ?? '';
      }
    }));
    // La tabla inicia vacía
    this.mercanciaBodyData = [];
  }

  /**
   * Cambia el valor seleccionado en el grupo de radio y actualiza el almacén.
   * @param {string | number} value Nuevo valor seleccionado.
   */
  cambiarRadio(value: string | number): void {
    this.valorSeleccionado = value as string;
    this.store.setValorSeleccionado(this.valorSeleccionado);
  }

  /**
   * Inicializa el estado de los formularios según el modo de solo lectura.
   * @private
   */
  private inicializarEstadoFormulario(): void {
    if (this.soloLectura) {
      this.tramiteForm?.disable();
      this.agregarMercanciasForm?.disable();
    } else {
      this.tramiteForm?.enable();
      this.agregarMercanciasForm?.enable();
    }
  }

  /**
  * Método de limpieza al destruir el componente.
  * Finaliza observables y libera recursos.
  */
  ngOnDestroy(): void {
    // Limpiar modal manual si está abierto
    this.cerrarModalManual();
    
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}

/**
 * Interface para la respuesta de la API que contiene catálogos.
 */
interface ApiCatalogoResponse {
  data: Catalogo[];
}

/**
 * Interfaz que representa una fila de la tabla de mercancías.
 * Extiende TableBodyData y agrega el campo opcional usoEspecifico.
 */
interface MercanciaRow extends TableBodyData {
  /**
   * Uso específico de la mercancía (opcional).
   */
  usoEspecifico?: string;
}

/**
 * Interface para representar el estado de la consulta relacionada con el trámite.
 */
interface ConsultaDatos {
  readonly: boolean;
  // Agregar otras propiedades según sea necesario para tu caso de uso
}

/**
 * Interface para las opciones de radio.
 */
interface RadioOpcion {
  label: string;
  value: string | number;
}

/**
 * Interface para la tabla de mercancía.
 */
interface MercanciaTableData {
  mercanciaTable: {
    tableHeader: string[];
    tableBody: TableBodyData[];
  };
}