


// ...existing imports and code...
import { ALERT, OPCIONES_DE_BOTON_DE_RADIO } from '../../enums/domicilio-del-establecimiento.enum';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputCheckComponent, InputRadioComponent, REGEX_SOLO_DIGITOS, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule,Location } from '@angular/common';

import { DatosMercanciaContenedoraComponent } from '../datos-mercancia-contenedora/datos-mercancia-contenedora.component';
import { HttpClient } from '@angular/common/http';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MERCANCIAS_DATA, MercanciasInfo, NICO_TABLA, NicoInfo } from '../../models/modificación-del-permiso-sanitario-de-importación-de-insumo.model';
import { Subject, map, takeUntil } from 'rxjs';
import { Tramite260911State, Tramite260911Store } from '../../estados/tramite260911.store';

import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';

import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';

import { MercanciaForm } from '../../../../shared/models/datos-solicitud.model';

import { DomicilioDelEstablecimientoService } from '../../services/domicilio-del-establecimiento/domicilio-del-establecimiento.service';
import { Tramite260911Query } from '../../estados/tramite260911.query';





/**
 * Componente para gestionar el domicilio del establecimiento.
 * Permite la visualización y edición de los datos del domicilio, así como la gestión de tablas y catálogos asociados.
 * Incluye lógica para modo solo lectura y edición, integración con el store y servicios para obtener datos.
 *
 * @selector app-domicilio-del-establecimiento
 * @standalone true
 * @imports [
 *   CommonModule,
 *   TituloComponent,
 *   ReactiveFormsModule,
 *   CatalogoSelectComponent,
 *   AlertComponent,
 *   TablaDinamicaComponent,
 *   InputRadioComponent,
 *   InputCheckComponent
 * ]
 * @templateUrl ./domicilio-del-establecimiento.component.html
 * @styleUrl ./domicilio-del-establecimiento.component.scss
 */
@Component({
  selector: 'app-domicilio-del-establecimiento',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    AlertComponent,
    TablaDinamicaComponent,
    InputRadioComponent,
    InputCheckComponent,
    DatosMercanciaContenedoraComponent
  ],
  templateUrl: './domicilio-del-establecimiento.component.html',
  styleUrl: './domicilio-del-establecimiento.component.scss',
})
export class DomicilioDelEstablecimientoComponent implements OnInit, OnDestroy, AfterViewInit {
  // Mercancías modal logic
  selectedMercanciaIndex: number | null = null;

  get mercanciaFormState(): MercanciaForm {
    if (this.selectedMercanciaIndex !== null && this.mercanciasTablaDatos[this.selectedMercanciaIndex]) {
      return DomicilioDelEstablecimientoComponent.mapMercanciasInfoToForm(this.mercanciasTablaDatos[this.selectedMercanciaIndex]);
    }
    return DomicilioDelEstablecimientoComponent.getEmptyMercanciaForm();
  }

  static getEmptyMercanciaForm(): MercanciaForm {
    return {
      clasificacionProducto: '',
      especificarClasificacionProducto: '',
      denominacionEspecificaProducto: '',
      denominacionDistintiva: '',
      denominacionComun: '',
      tipoProducto: '',
      formaFarmaceutica: '',
      estadoFisico: '',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUmtValor: '',
      cantidadUmt: '',
      cantidadUmcValor: '',
      cantidadUmc: '',
      presentacion: '',
      numeroRegistroSanitario: '',
      fechaCaducidad: '',
      paisDeOriginDatos: [],
      paisDeProcedenciaDatos: [],
      usoEspecifico: [],
      marca: '',
      especifique: '',
      claveDeLos: '',
      fechaDeFabricacio: '',
      fechaDeCaducidad: '',
      especifiqueObligatorio: ''
    };
  }

  static mapMercanciasInfoToForm(info: MercanciasInfo): MercanciaForm {
    return {
  clasificacionProducto: '',
  especificarClasificacionProducto: '',
      denominacionEspecificaProducto: info.denominacionEspecifica || '',
      denominacionDistintiva: info.denominacionDistintiva || '',
      denominacionComun: info.denominacionComun || '',
      tipoProducto: info.tipoProducto || '',
      formaFarmaceutica: info.formaFarmaceutica || '',
      estadoFisico: info.estadoFisico || '',
      fraccionArancelaria: info.fraccionArancelaria || '',
      descripcionFraccion: info.descripcionFraccion || '',
      cantidadUmtValor: '',
      cantidadUmt: info.cantidadUMT || '',
      cantidadUmcValor: '',
      cantidadUmc: info.cantidadUMC || '',
      presentacion: info.presentacion || '',
      numeroRegistroSanitario: '',
      fechaCaducidad: info.fechaCaducidad || '',
      paisDeOriginDatos: [],
      paisDeProcedenciaDatos: [],
      usoEspecifico: [],
      marca: '',
      especifique: '',
      claveDeLos: '',
      fechaDeFabricacio: '',
      fechaDeCaducidad: '',
      especifiqueObligatorio: ''
    };
  }

  // Handle row selection from Mercancias table
  onMercanciaRowSelected(event: MercanciasInfo[]): void {
    if (event && event.length > 0) {
      const SELECTED_ROW = event[0];
      this.selectedMercanciaIndex = this.mercanciasTablaDatos.findIndex(row => row === SELECTED_ROW);
    } else {
      this.selectedMercanciaIndex = null;
    }
  }

  // Handle Agregar Mercancia event
  onAgregarMercancia(event: MercanciasInfo): void {
  this.mercanciasTablaDatos = [...this.mercanciasTablaDatos, event];
  this.cerrarMercanciaModal();
  }

  // Close Mercancia selection modal
  cerrarSeleccionaRegistroMercanciaModal(): void {
    if (this.modalSeleccionaRegistroMercanciaInstance) {
      this.modalSeleccionaRegistroMercanciaInstance.hide();
    }
  }
  private modalSeleccionaRegistroMercanciaInstance: Modal | undefined;

  mostrarSeleccionaRegistroMercancia(): void {
    const MODAL = document.getElementById('modalSeleccionaRegistroMercancia');
    if (MODAL) {
      const WIN = window as Window & { bootstrap?: { Modal?: typeof Modal } };
      this.modalSeleccionaRegistroMercanciaInstance = WIN.bootstrap?.Modal
        ? new WIN.bootstrap.Modal(MODAL)
        : undefined;
      this.modalSeleccionaRegistroMercanciaInstance?.show();
    }
  }
  // Open Mercancías modal for editing
  onModificarMercancia(index: number): void {
    this.selectedMercanciaIndex = index;
    if (this.datosMercanciaContenedoraComp) {
      // Patch form in child with mapped data
      const MAPPED = DomicilioDelEstablecimientoComponent.mapMercanciasInfoToForm(this.mercanciasTablaDatos[index]);
      this.datosMercanciaContenedoraComp.mercanciaForm.patchValue(MAPPED);
    }
    this.openMercanciaModal();
  }


  // Eliminar logic for Mercancías
  mercanciaEliminarIndex: number | null = null;
  private modalConfirmarEliminarMercanciaInstance: Modal | undefined;

  onEliminarMercancia(index: number | null): void {
    if (index === null || index === undefined) {
      // No row selected, show alert (optional)
      return;
    }
    this.mercanciaEliminarIndex = index;
    // Show Mercancías confirmation modal
    const MODAL_CONFIRMAR_ELIMINAR_MERCANCIA_EL = document.getElementById('modalConfirmarEliminarMercancia');
    if (MODAL_CONFIRMAR_ELIMINAR_MERCANCIA_EL) {
      const WIN = window as Window & { bootstrap?: { Modal?: typeof Modal } };
      this.modalConfirmarEliminarMercanciaInstance = WIN.bootstrap?.Modal
        ? new WIN.bootstrap.Modal(MODAL_CONFIRMAR_ELIMINAR_MERCANCIA_EL)
        : undefined;
      this.modalConfirmarEliminarMercanciaInstance?.show();
    }
  }

  cancelarEliminarMercancia(): void {
    if (this.modalConfirmarEliminarMercanciaInstance) {
      this.modalConfirmarEliminarMercanciaInstance.hide();
    }
    this.mercanciaEliminarIndex = null;
  }

  aceptarEliminarMercancia(): void {
    if (this.mercanciaEliminarIndex !== null) {
      this.mercanciasTablaDatos = this.mercanciasTablaDatos.filter((_, i) => i !== this.mercanciaEliminarIndex);
    }
    this.cancelarEliminarMercancia();
  }
  @ViewChild(DatosMercanciaContenedoraComponent) datosMercanciaContenedoraComp!: DatosMercanciaContenedoraComponent;
  openScianModal(): void {
    document.querySelectorAll('.modal-backdrop').forEach(bd => bd.remove());
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
    if (this.modalAddNicoTablaRef) {
      const WIN = window as Window & { bootstrap?: { Modal?: typeof Modal } };
      if (WIN.bootstrap && WIN.bootstrap.Modal) {
        this.bootstrapModalNicoTablaInstance = new WIN.bootstrap.Modal(this.modalAddNicoTablaRef.nativeElement);
        this.bootstrapModalNicoTablaInstance?.show();
      }
    }
  }

  openMercanciaModal(): void {
    document.querySelectorAll('.modal-backdrop').forEach(bd => bd.remove());
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
    // Reset Mercancías form in child component so modal opens blank
    if (this.datosMercanciaContenedoraComp) {
      this.datosMercanciaContenedoraComp.resetForm();
    }
    if (this.modalAddMercanciasRef) {
      const WIN = window as Window & { bootstrap?: { Modal?: typeof Modal } };
      this.bootstrapModalMercanciasInstance = WIN.bootstrap?.Modal
        ? new WIN.bootstrap.Modal(this.modalAddMercanciasRef.nativeElement)
        : undefined;
      this.bootstrapModalMercanciasInstance?.show();
    }
  }
  cerrarMercanciaModal(): void {
    if (this.bootstrapModalMercanciasInstance && typeof this.bootstrapModalMercanciasInstance.hide === 'function') {
      this.bootstrapModalMercanciasInstance.hide();
    }
    // Remove lingering Bootstrap modal backdrop manually
    const BACKDROPS = document.querySelectorAll('.modal-backdrop');
    BACKDROPS.forEach(bd => bd.parentNode?.removeChild(bd));
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
    // Optionally reset Mercancias form if needed
    // this.mercanciaForm?.reset();
    this.agregarModalBox = false;
  }
  // Track selected SCIAN row index
  selectedScianIndex: number | null = null;

  // Bootstrap modal instances for Eliminar logic
  private modalSeleccionaRegistroInstance: Modal | undefined;
  private modalConfirmarEliminarScianInstance: Modal | undefined;
  @ViewChild('modalAddMercancias', { static: false }) modalAddMercanciasRef?: ElementRef<HTMLDivElement>;
  @ViewChild('modalAddNicoTabla', { static: false }) modalAddNicoTablaRef?: ElementRef<HTMLDivElement>;
  private bootstrapModalMercanciasInstance: Modal | undefined;
  private bootstrapModalNicoTablaInstance: Modal | undefined;
  ngAfterViewInit(): void {
    const WIN = window as unknown as { bootstrap?: { Modal?: typeof Modal } };
    if (WIN.bootstrap && WIN.bootstrap.Modal) {
      if (this.modalAddMercanciasRef) {
        this.bootstrapModalMercanciasInstance = new WIN.bootstrap.Modal(this.modalAddMercanciasRef.nativeElement);
      }
      if (this.modalAddNicoTablaRef) {
        this.bootstrapModalNicoTablaInstance = new WIN.bootstrap.Modal(this.modalAddNicoTablaRef.nativeElement);
      }
      // Setup Eliminar modals
      const MODAL_SELECCIONA_REGISTRO_EL = document.getElementById('modalSeleccionaRegistro');
      if (MODAL_SELECCIONA_REGISTRO_EL) {
        this.modalSeleccionaRegistroInstance = new WIN.bootstrap.Modal(MODAL_SELECCIONA_REGISTRO_EL);
      }
      const MODAL_CONFIRMAR_ELIMINAR_SCIAN_EL = document.getElementById('modalConfirmarEliminarScian');
      if (MODAL_CONFIRMAR_ELIMINAR_SCIAN_EL) {
        this.modalConfirmarEliminarScianInstance = new WIN.bootstrap.Modal(MODAL_CONFIRMAR_ELIMINAR_SCIAN_EL);
      }
    }
  }
  /**
   * Subcatalogo for Representación federal filtered by Entidad Federativa
   */
  public subRepresentacion: Catalogo[] = [];
  /** Formulario para el modal de agregar SCIAN (nicoTablaDatos) */
  nicoTablaForm!: FormGroup;
 
 /**
   * @property {Catalogo[]} entidad
   * @description
   * Lista de entidades federativas cargadas desde un archivo JSON.
   * Se usa para poblar el select de entidades en el formulario.
   *
   * @access public
   */
  public entidad: Catalogo[] = [];

     /**
   * @property {Catalogo[]} allRepresentaciones
   * @description
   * Almacena todas las opciones de representaciones federales disponibles.
   * Se utiliza para filtrar y mostrar las representaciones según la entidad seleccionada.
   */
  public allRepresentaciones: Catalogo[] = [];


    /**
   * @property {Catalogo[]} representacion
   * @description
   * Lista de representaciones federales cargadas desde un archivo JSON.
   * Se usa para poblar el select de representaciones en el formulario.
   *
   * @access public
   */
  public representacion: Catalogo[] = [];


   /**
   * Evento que emite el objeto seleccionado de tipo `TablaScianConfig`.
   * Se utiliza para notificar al componente padre cuando un SCiAN ha sido seleccionado.
   */
  @Output() scianSeleccionado: EventEmitter<TablaScianConfig> = new EventEmitter<TablaScianConfig>();


 

  /** Estado actual de la solicitud proveniente del store */
  public solicitudState!: Tramite260911State;

  /**
   * Controla si los campos de nombre, apellidoPaterno y apellidoMaterno están habilitados
   */
  enableLegalFields: boolean = false;

  /** Indica si el formulario está en modo solo lectura */
  esFormularioSoloLectura: boolean = false;
  /** Indica si el modal de agregar está abierto */

  agregarModalBox: boolean = false;

  /**
   * Método para manejar el click en el botón Buscar del RFC
   * Si el RFC es inválido, habilita los campos de nombre, apellidoPaterno y apellidoMaterno
   */
  onBuscarRepresentanteLegal(): void {
    const RFC_CONTROL = this.representanteLegal.get('rfc');
    if (RFC_CONTROL && RFC_CONTROL.invalid) {
      this.enableLegalFields = true;
      this.representanteLegal.get('nombre')?.enable();
      this.representanteLegal.get('apellidoPaterno')?.enable();
      this.representanteLegal.get('apellidoMaterno')?.enable();
    } else {
      this.enableLegalFields = false;
      this.representanteLegal.get('nombre')?.disable();
      this.representanteLegal.get('apellidoPaterno')?.disable();
      this.representanteLegal.get('apellidoMaterno')?.disable();
    }
  }

  /**
   * Formulario principal reactivo para los datos del domicilio.
   */
  form!: FormGroup;

  /**
   * Lista de estados obtenida del catálogo.
   */
  estado: Catalogo[] = [];

  /**
   * Textos de alerta utilizados en el componente.
   */
  TEXTOS = ALERT;

  /**
   * Clase CSS para el tipo de alerta.
   */
  class = 'alert-warning';

  /**
   * Configuración para la selección de filas en la tabla (checkbox).
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

  // Handle row selection from shared table
  onScianRowSelected(event: NicoInfo[]): void {
    // If at least one row is selected, set selectedScianIndex to its index in nicoTablaDatos
    if (event && event.length > 0) {
      const SELECTED_ROW = event[0];
      this.selectedScianIndex = this.nicoTablaDatos.findIndex(row => row === SELECTED_ROW);
    } else {
      this.selectedScianIndex = null;
    }
  }

  // Called when Eliminar button is clicked
  onEliminarScian(event: number | null | undefined): void {
    // If event is null, treat as no selection
    if (event === null || event === undefined) {
      this.selectedScianIndex = null;
      // No row selected, show 'Selecciona un registro' modal
      if (this.modalSeleccionaRegistroInstance) {
        this.modalSeleccionaRegistroInstance.show();
      }
    } else {
      this.selectedScianIndex = event as number;
      // Row selected, show confirmation modal
      if (this.modalConfirmarEliminarScianInstance) {
        this.modalConfirmarEliminarScianInstance.show();
      }
    }
  }

  // Close 'Selecciona un registro' modal
  cerrarSeleccionaRegistroModal(): void {
    if (this.modalSeleccionaRegistroInstance) {
      this.modalSeleccionaRegistroInstance.hide();
    }
  }

  // Cancel deletion, close confirmation modal
  cancelarEliminarScian(): void {
    if (this.modalConfirmarEliminarScianInstance) {
      this.modalConfirmarEliminarScianInstance.hide();
    }
  }

  // Accept deletion, remove selected row
  aceptarEliminarScian(): void {
    if (this.selectedScianIndex !== null) {
      this.nicoTablaDatos = this.nicoTablaDatos.filter((_, i) => i !== this.selectedScianIndex);
      this.selectedScianIndex = null;
    }
    if (this.modalConfirmarEliminarScianInstance) {
      this.modalConfirmarEliminarScianInstance.hide();
    }
  }

  /**
   * Formulario reactivo para los datos del domicilio.
   */
  domicilio!: FormGroup;

  /**
   * Configuración de columnas para la tabla de mercancías.
   */
  mercanciasTabla: ConfiguracionColumna<MercanciasInfo>[] = MERCANCIAS_DATA;

  /**
   * Datos cargados para la tabla de mercancías.
   */
  mercanciasTablaDatos: MercanciasInfo[] = [];

  /**
   * Manifiestos de alerta utilizados en el componente.
   */
  manifests = ALERT.MANIFESTS;

  /**
   * Opciones para el botón de radio.
   */
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;

  /**
   * Formulario reactivo para los datos del representante legal.
   */
  representanteLegal!: FormGroup;

  /**
   * Subject para controlar la destrucción de suscripciones y evitar fugas de memoria.
    openMercanciaModal(): void {
      // Clean up any lingering backdrops and body classes before opening
      document.querySelectorAll('.modal-backdrop').forEach(bd => bd.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      // Re-create Bootstrap modal instance
      if (this.modalAddMercanciasRef) {
        const WIN = window as any;
        this.bootstrapModalMercanciasInstance = new WIN.bootstrap.Modal(this.modalAddMercanciasRef.nativeElement);
        this.bootstrapModalMercanciasInstance.show();
      }
    }

    openScianModal(): void {
      document.querySelectorAll('.modal-backdrop').forEach(bd => bd.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      if (this.modalAddNicoTablaRef) {
        const WIN = window as any;
        this.bootstrapModalNicoTablaInstance = new WIN.bootstrap.Modal(this.modalAddNicoTablaRef.nativeElement);
        this.bootstrapModalNicoTablaInstance.show();
      }
    }
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Estado seleccionado del trámite 260911.
   */
  estadoSeleccionado!: Tramite260911State;

  /**
   * Constructor del componente.
   *
   * @param fb FormBuilder para crear formularios reactivos.
   * @param httpServicios Servicio HTTP para realizar peticiones.
   * @param tramite260911Query Consulta de datos del trámite.
   * @param tramite260911Store Almacenamiento de datos del trámite.
   * @param domicilioDelEstablecimientoService Servicio para obtener datos relacionados con el domicilio.
   * @param consultaioQuery Consulta de estado de solo lectura.
   */
  constructor(
    private fb: FormBuilder,
    private httpServicios: HttpClient,
    private tramite260911Query: Tramite260911Query,
    private tramite260911Store: Tramite260911Store,
    private domicilioDelEstablecimientoService: DomicilioDelEstablecimientoService,
    public consultaioQuery: ConsultaioQuery,
    private ubicaccion: Location,
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el formulario dependiendo del modo (solo lectura o editable).
   * Si está en solo lectura, carga y bloquea el formulario.
   * Si no, crea un formulario editable.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.crearFormulario();
    }
  }

  /**
   * Crea el formulario y, si está en modo solo lectura, lo deshabilita.
   * De lo contrario, lo habilita para edición.
   */
  guardarDatosFormulario(): void {
    this.crearFormulario();
    if (this.esFormularioSoloLectura) {
      this.form.disable();
      this.domicilio.disable();
      this.representanteLegal.disable();
    } else {
      this.form.enable();
      this.domicilio.enable();
      this.representanteLegal.enable();
    }
  }

  /**
   * Método de inicialización del ciclo de vida del componente.
   * Inicializa el formulario y carga los datos necesarios para las tablas y catálogos.
   */
  ngOnInit(): void {
    this.loadEntidad();
    this.loadRepresentacion();
    this.inicializarEstadoFormulario();
    this.obtenerTablaDatos();
    this.obtenerEstadoList();
    this.obtenerMercanciasDatos();
    // Patch representacion when entidad changes
    this.nicoTablaForm.get('entidad')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((entidad) => {
      this.updateRepresentacionOptions(entidad);
      // Patch the value of the second dropdown to the first available option
      const FIRST_OPTION = this.subRepresentacion && this.subRepresentacion.length > 0 ? this.subRepresentacion[0].id : '';
      this.nicoTablaForm.get('representacion')?.setValue(FIRST_OPTION);
    });
  }
 



  /** Guarda los datos seleccionados en el modal SCIAN */
  guardarNicoTabla(): void {
    if (this.nicoTablaForm.valid) {
      // Aquí puedes agregar la lógica para guardar los datos seleccionados
    }
  }

  /**
   * Método de destrucción del ciclo de vida del componente.
   * Libera recursos y cancela suscripciones.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Crea los formularios reactivos principales del componente usando los datos del store.
   * Incluye el formulario principal, el de domicilio y el de representante legal.
   */
  crearFormulario(): void {
    this.tramite260911Query.selectTramite260911$
      .pipe(
        takeUntil(this.destroy$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.form = this.fb.group({
      codigoPostal: [this.solicitudState?.codigoPostal, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(12)]],
      estado: [this.solicitudState?.estado],
      municipioOAlcaldia: [this.solicitudState?.municipioOAlcaldia, [Validators.required, Validators.maxLength(120)]],
      localidad: [this.solicitudState?.localidad, [Validators.maxLength(120)]],
      colonias: [this.solicitudState?.colonias, [Validators.maxLength(120)]],
      calle: [this.solicitudState?.calle, [Validators.required, Validators.maxLength(100)]],
      lada: [this.solicitudState?.lada, [Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(5)]],
      telefono: [this.solicitudState.telefono, [Validators.required, Validators.pattern(REGEX_SOLO_DIGITOS), Validators.maxLength(30)]],
    });

    this.nicoTablaForm = this.fb.group({
      /**
       * @property {string} entidad
       * @description
       * Campo del formulario para la selección de la entidad federativa.
       * Se inicializa como una cadena vacía.
       */
      entidad: [this.solicitudState?.entidad, [Validators.required]],

      /**
       * @property {string} representacion
       * @description
       * Campo del formulario para la selección de la representación federal.
       * Se inicializa como una cadena vacía.
       */
      representacion: [this.solicitudState?.representacion, [Validators.required]],
    });

    this.domicilio = this.fb.group({
      avisoCheckbox: [true],
      licenciaSanitaria: [{ value: this.solicitudState?.licenciaSanitaria, disabled: true }],
      regimen: [this.solicitudState?.regimen, [Validators.required]],
      aduanasEntradas: [this.solicitudState?.aduanasEntradas, [Validators.required]],
      importPermitNumberCNSNS: [{ value: this.solicitudState?.importPermitNumberCNSNS, disabled: false }],
      aifaCheckbox: [true],
      manifests: [true],
    });

    this.representanteLegal = this.fb.group({
      acuerdoPublico: [this.solicitudState?.acuerdoPublico],
      rfc: [this.solicitudState?.rfc, [Validators.required, Validators.maxLength(13)]],
      nombre: [{ value: this.solicitudState?.nombre, disabled: true }, [Validators.required]],
      apellidoPaterno: [{ value: this.solicitudState?.apellidoPaterno, disabled: true }, [Validators.required]],
      apellidoMaterno: [{ value: this.solicitudState?.apellidoMaterno, disabled: true }, [Validators.required]],
    });
  }

  /**
   * Obtiene los datos de la tabla NICO desde el servicio y los asigna a la propiedad correspondiente.
   */
  obtenerTablaDatos(): void {
    this.domicilioDelEstablecimientoService
      .obtenerTablaDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.nicoTablaDatos = data?.data;
      });
  }

  /**
   * Obtiene la lista de estados desde el servicio y la asigna a la propiedad correspondiente.
   */
  obtenerEstadoList(): void {
    this.domicilioDelEstablecimientoService
      .obtenerEstadoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.estado = data?.data || [];
      });
  }

  /**
   * Obtiene los datos de mercancías desde el servicio y los asigna a la propiedad correspondiente.
   */
  obtenerMercanciasDatos(): void {
    this.domicilioDelEstablecimientoService
      .obtenerMercanciasDatos()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.mercanciasTablaDatos = data?.data || [];
      });
  }

  /**
   * Actualiza un valor específico en el store del trámite.
   *
   * @param FormGroup Formulario reactivo del cual se obtiene el valor.
   * @param control Nombre del control cuyo valor se actualizará en el store.
   */
  setValorStore(FormGroup: FormGroup, control: string): void {
    const VALOR = FormGroup.get(control)?.value;
    this.tramite260911Store.setTramite260911State({
      [control]: VALOR
    });
  }

  /**
   * Maneja el cambio del checkbox de manifests y lo marca como touched
   */
  onManifestsChange(): void {
    this.domicilio.get('manifests')?.markAsTouched();
    this.setValorStore(this.domicilio, 'manifests');
  }

  /**
   * Maneja el evento de input del campo codigoPostal para validar en tiempo real
   * @param event Evento de input del campo
   */
  onCodigoPostalInput(event: Event): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    const VALUE = INPUT_ELEMENT.value;
    const CONTROL = this.form.get('codigoPostal');
    
    if (CONTROL) {
      // Marcar como touched para mostrar errores
      CONTROL.markAsTouched();
      
      // Si el valor tiene exactamente 12 caracteres, forzar el error de maxlength
      if (VALUE && VALUE.length === 12) {
        CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 12, actualLength: VALUE.length } });
      } else if (VALUE && VALUE.length < 12) {
        // Si tiene menos de 12 caracteres, remover el error de maxlength pero mantener otros errores
        const ERRORS = CONTROL.errors;
        if (ERRORS) {
          delete ERRORS['maxlength'];
          const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
          CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
        }
      }
    }
  }

    /**
     * Maneja el evento de input del campo colonias para validar en tiempo real
     * @param event Evento de input del campo
     */

    /**
     * Maneja el evento de input del campo municipioOAlcaldia para validar en tiempo real
     * @param event Evento de input del campo
     */
    onMunicipioOAlcaldiaInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('municipioOAlcaldia');
    
      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 120) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 120, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 120) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }
  /**
   * Maneja el evento de input del campo localidad para validar en tiempo real
   * @param event Evento de input del campo
   */
  onLocalidadInput(event: Event): void {
    const INPUT_ELEMENT = event.target as HTMLInputElement;
    const VALUE = INPUT_ELEMENT.value;
    const CONTROL = this.form.get('localidad');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 120) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 120, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 120) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }
    /**
     * Maneja el evento de input del campo colonias para validar en tiempo real
     * @param event Evento de input del campo
     */
    onColoniasInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('colonias');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 120) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 120, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 120) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }

    /**
     * Maneja el evento de input del campo calle para validar en tiempo real
     * @param event Evento de input del campo
     */
    onCalleInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('calle');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 100) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 100, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 100) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }
    /**
     * Maneja el evento de input del campo lada para validar en tiempo real
     * @param event Evento de input del campo
     */
    onLadaInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('lada');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 5) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 5, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 5) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }

    /**
     * Maneja el evento de input del campo telefono para validar en tiempo real
     * @param event Evento de input del campo
     */
    onTelefonoInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.form.get('telefono');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 30) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 30, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 30) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }

    /**
     * Maneja el evento de input del campo RFC para validar en tiempo real
     * @param event Evento de input del campo
     */
    onRfcInput(event: Event): void {
      const INPUT_ELEMENT = event.target as HTMLInputElement;
      const VALUE = INPUT_ELEMENT.value;
      const CONTROL = this.representanteLegal.get('rfc');

      if (CONTROL) {
        CONTROL.markAsTouched();
        if (VALUE && VALUE.length === 13) {
          CONTROL.setErrors({ ...CONTROL.errors, maxlength: { requiredLength: 13, actualLength: VALUE.length } });
        } else if (VALUE && VALUE.length < 13) {
          const ERRORS = CONTROL.errors;
          if (ERRORS) {
            delete ERRORS['maxlength'];
            const HAS_OTHER_ERRORS = Object.keys(ERRORS).length > 0;
            CONTROL.setErrors(HAS_OTHER_ERRORS ? ERRORS : null);
          }
        }
      }
    }

    // This method is now removed as it was a duplicate and invalid.



 /**
   * @method loadEntidad
   * @description
   * Carga la información de las entidades federativas desde el servicio correspondiente
   * y la asigna a la propiedad local `entidad` para poblar el select en el formulario.
   * Utiliza un observable para manejar la suscripción y evitar fugas de memoria.
   *
   * @returns {void}
   */
  loadEntidad(): void {
    this.domicilioDelEstablecimientoService
      .getEntidad()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Catalogo[]) => {
        this.entidad = data;
       
       });
  }


  /**
   * @method loadRepresentacion
   * @description
   * Carga la información de las representaciones federales desde el servicio correspondiente
   * y la asigna a la propiedad local `allRepresentaciones` para mantener todas las opciones disponibles.
   * Posteriormente, actualiza las opciones de representación mostradas según la entidad seleccionada en el formulario.
   * Utiliza un observable para manejar la suscripción y evitar fugas de memoria.
   *
   * @returns {void}
   */
  loadRepresentacion(): void {
    this.domicilioDelEstablecimientoService
      .getRepresentacion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Catalogo[]) => {
        this.allRepresentaciones = data; // Store all options
      this.updateRepresentacionOptions(this.nicoTablaForm.get('entidad')?.value);
      });
  }

 /**
   * @method updateRepresentacionOptions
   * @description
   * Filtra y actualiza la lista de representaciones federales disponibles según la entidad seleccionada.
   * Si hay una entidad seleccionada, se muestran solo las representaciones relacionadas con dicha entidad.
   * Si no hay entidad seleccionada, la lista de representaciones se vacía.
   *
   * @param {Catalogo | null} selectedEntidad - Entidad federativa seleccionada en el formulario.
   * @returns {void}
   */
  public updateRepresentacionOptions(selectedEntidad: Catalogo | null): void {
    if (selectedEntidad) {
      this.representacion = this.allRepresentaciones.filter(
        (e => e.relacionadaUmtId === Number(selectedEntidad))
      );
      this.subRepresentacion = [...this.representacion];
    } else {
      this.representacion = [];
      this.subRepresentacion = [];
    }
  }
   /**
   * Verifica si un control del formulario es inválido, tocado o modificado.
   * @param nombreControl - Nombre del control a verificar.
   * @returns True si el control es inválido, de lo contrario false.
   */
  public esInvalido(nombreControl: string): boolean {
    const CONTROL = this.nicoTablaForm.get(nombreControl);
    return CONTROL
      ? CONTROL.invalid && (CONTROL.touched || CONTROL.dirty)
      : false;
  }

  /**
   * Agrega un nuevo elemento SCIAN a la lista seleccionada y emite el evento correspondiente.
   * 
   * Este método crea un objeto de configuración `TablaScianConfig` utilizando los valores
   * proporcionados en el formulario y la lista `scianNinoLista`. Luego, emite el objeto
   * creado a través del evento `scianSeleccionado` y navega hacia atrás en la ubicación actual.
   * 
   * @returns {void} No retorna ningún valor.
   */
  agregarScian(): void {
    if (this.nicoTablaForm.invalid) {
      this.nicoTablaForm.markAllAsTouched();
      return;
    }
    // Build new SCIAN entry from form
    const ENTIDAD_VALUE = this.nicoTablaForm.get('entidad')?.value;
    const REPRESENTACION_VALUE = this.nicoTablaForm.get('representacion')?.value;
    // Find display values if needed
    const ENTIDAD_OBJ = this.entidad.find(e => e.id === ENTIDAD_VALUE);
    const REPRESENTACION_OBJ = this.subRepresentacion.find(r => r.id === REPRESENTACION_VALUE);
    const NEW_SCIAN: NicoInfo = {
      clave_Scian: ENTIDAD_OBJ ? ENTIDAD_OBJ.descripcion : String(ENTIDAD_VALUE),
      descripcion_Scian: REPRESENTACION_OBJ ? REPRESENTACION_OBJ.descripcion : String(REPRESENTACION_VALUE)
    };
    // Add to nicoTablaDatos
    this.nicoTablaDatos = [...this.nicoTablaDatos, NEW_SCIAN];
    // Save selected entidad before reset
    const LAST_ENTIDAD = ENTIDAD_VALUE;
    // Reset form
    this.nicoTablaForm.reset();
    // Restore entidad value and repopulate subRepresentacion
    if (LAST_ENTIDAD) {
      this.nicoTablaForm.get('entidad')?.setValue(LAST_ENTIDAD);
      this.updateRepresentacionOptions(LAST_ENTIDAD);
    }
    // Close modal after adding
    if (this.bootstrapModalNicoTablaInstance && typeof this.bootstrapModalNicoTablaInstance.hide === 'function') {
      this.bootstrapModalNicoTablaInstance.hide();
    }
    document.querySelectorAll('.modal-backdrop').forEach(bd => bd.remove());
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
    this.agregarModalBox = false;
  }

/**
   * Restablece el formulario SCIAN a su estado inicial.
   * Este método reinicia todos los campos del formulario SCIAN,
   * eliminando cualquier dato ingresado previamente.
   */
  limpiarScian(): void {
    this.nicoTablaForm.reset();
  }
    /**
   * Navega a la ubicación anterior en el historial de navegación.
   * Utiliza el servicio de ubicación para retroceder una página.
   */
  cancelar(scian: boolean = false): void {
    // If scian=true, close SCIAN modal, else Mercancias modal
    if (scian) {
      if (this.bootstrapModalNicoTablaInstance && typeof this.bootstrapModalNicoTablaInstance.hide === 'function') {
        this.bootstrapModalNicoTablaInstance.hide();
      }
      this.nicoTablaForm.reset();
      // Remove lingering Bootstrap modal backdrop manually
      const BACKDROPS = document.querySelectorAll('.modal-backdrop');
      BACKDROPS.forEach(bd => bd.parentNode?.removeChild(bd));
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    } else {
      if (this.bootstrapModalMercanciasInstance && typeof this.bootstrapModalMercanciasInstance.hide === 'function') {
        this.bootstrapModalMercanciasInstance.hide();
      }
      // If you have a Mercancias form, reset it here
      // this.mercanciaForm?.reset();
    }
    this.agregarModalBox = false;
  }

}