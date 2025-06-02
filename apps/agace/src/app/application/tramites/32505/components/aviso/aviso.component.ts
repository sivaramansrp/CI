import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { map, Subject, takeUntil } from 'rxjs';
import { InputRadioComponent, Notificacion, NotificacionesComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import {
  BotonAccionesTipos,
  Catalogo,
  CatalogoSelectComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  ValidacionesFormularioService,
} from '@libs/shared/data-access-user/src';
import { AvisoService } from '../../services/aviso.service';
import { CargaMasivaComponent } from '../carga-masiva/carga-masiva.component';
import {
  AvisoTablaDatos,
  CatalogoLista,
  ColumnasTabla,
} from '../../models/avios-model';
import {
  Solicitud32502State,
  tramite32505Store,
} from '../../../../estados/tramites/trimite32505.store';
import { Tramite32505Query } from '../../../../estados/queries/tramite32505.query';
import{ALPHANUMERIC_PATTERN, ENCABEZADAS_CONSTANT, RADIO_OPCIONS, RADIO_OPCIONS_AVISO, RADIO_TIPO_AVISO, TABLA_DE_DATOS_AVISO} from '../../constants/avios-procesos.enum';

/**
 * @component AvisoComponent
 * @description Componente encargado de gestionar la interfaz de usuario para el manejo de avisos relacionados con trámites.
 * Proporciona formularios, tablas dinámicas y modales para capturar, visualizar y gestionar datos de avisos.
 * 
 * @selector app-aviso
 * @templateUrl ./aviso.component.html
 * @styleUrl ./aviso.component.scss
 * @standalone true
 */
@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrl: './aviso.component.scss',
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    TablaDinamicaComponent,
    CargaMasivaComponent,
    InputRadioComponent,
    NotificacionesComponent
  ],
  standalone: true,
})
export class AvisoComponent implements OnInit,OnDestroy {

    /**
   * Opciones de radio.
   */
    radioOpcions = RADIO_OPCIONS;

    /**
     * Opciones de radio.
     */
    radioTipoAviso = RADIO_TIPO_AVISO;
   /**
     * Opciones de radio.
     */
    radioOpcionsAviso = RADIO_OPCIONS_AVISO;

/**
   * @property {boolean} esPopupAbierto
   * Indica si el popup está abierto.
   */
esPopupAbierto: boolean = false;

/**
 * @property {boolean} datosDelVehiculo
 * Indica si se deben mostrar los datos del vehículo.
 */
datosDelVehiculo: boolean = false;

/**
 * @property {boolean} datosDelImportacion
 * Indica si se deben mostrar los datos de importación.
 */
datosDelImportacion: boolean = false;

/**
 * @property {boolean} datosFolioVUCEM
 * Indica si se deben mostrar los datos relacionados con el folio VUCEM.
 */
datosFolioVUCEM: boolean = false;

/**
 * @property {boolean} datosDelVenta
 * Indica si se deben mostrar los datos de la venta.
 */
datosDelVenta: boolean = false;

/**
 * @property {boolean} datosNIVNumeroSerie
 * Indica si se deben mostrar los datos del NIV o número de serie.
 */
datosNIVNumeroSerie: boolean = false;

/**
 * @property {boolean} abrirPopup
 * Indica si el popup está abierto.
 * */
  abrirPopup() :void{
    this.esPopupAbierto = true;
  }
  /**
   * @property {boolean} esManualAsivoAgregarClicked
   * Indica si se ha hecho clic en el botón para agregar manualmente un aviso.
   */
  esManualAsivoAgregarClicked = false;

  /**
   * @property {TablaSeleccion} TablaSeleccion
   * Referencia a la clase TablaSeleccion para gestionar tablas dinámicas.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @property {BotonAccionesTipos} botonAccionesTipos
   * Referencia a las acciones disponibles para los botones.
   */
  botonAccionesTipos = BotonAccionesTipos;
  
/**
 * @property {Object} tablaDeDatos
 * @description Propiedad que contiene la configuración de la tabla de datos utilizada en el componente.
 * Incluye las encabezadas y los datos que se mostrarán en la tabla.
 * 
 * @property {typeof ENCABEZADAS_CONSTANT[]} encabezadas - Arreglo que define las columnas o encabezados de la tabla.
 * @property {ColumnasTabla[]} datos - Arreglo que contiene los datos que se mostrarán en las filas de la tabla.
 * 
 * @default TABLA_DE_DATOS_AVISO
 */
  tablaDeDatos: {
    encabezadas: typeof ENCABEZADAS_CONSTANT[];
    datos: ColumnasTabla[];
  } = TABLA_DE_DATOS_AVISO;
  /**
   * Referencia al elemento del modal para buscar mercancías.
   *
   * Se utiliza para abrir o cerrar el modal de búsqueda.
   */
  @ViewChild('datosAviso') datosAviso!: ElementRef;

  /**
   * Muestra el modal para cargar un archivo.
   *
   * Este método utiliza el modal de Bootstrap para mostrar el modal de carga de archivos.
   */
  datosDelAviso(): void {
    this.esPopupAbierto = true;
    if (this.datosAviso) {
      const MODAL_INSTANCE = new Modal(this.datosAviso.nativeElement);
      MODAL_INSTANCE.show();
    }
  }
  /**
   * La función maneja las acciones del botón.
   * @param accione - Parámetro que tiene la acción de ser del tipo BotonAccionesTipos.
   */
  accionesBotones(accione: BotonAccionesTipos): void {
    switch (accione) {
      case BotonAccionesTipos.AGREGAR:
        this.esManualAsivoAgregarClicked = true;
        break;
      case BotonAccionesTipos.ELIMINAR:
        break;
      case BotonAccionesTipos.MODIFICAR:
        break;

      default:
        break;
    }
  }
  /**
   * Formulario para capturar datos adicionales relacionados con el registro.
   */
  aviosForm!: FormGroup;

  /**
   * Estado de la solicitud.
   */
  public solicitudState!: Solicitud32502State;

  /**
   * Sujeto para manejar la destrucción de observables.
   *
   * Se utiliza para evitar fugas de memoria al destruir el componente.
   */
  destroyNotifier$: Subject<void> = new Subject();

  /**
   * Opciones disponibles para los países.
   *
   * Contiene una lista de países que el usuario puede seleccionar.
   */
  /**
   * @property {Catalogo[]} optionsPais
   * Opciones disponibles para los países.
   */
  optionsPais!: Catalogo[];

  /**
   * @property {Catalogo[]} optionsAnio
   * Opciones disponibles para los años.
   */
  optionsAnio!: Catalogo[];

  /**
   * @property {Catalogo[]} optionCilindros
   * Opciones disponibles para los cilindros.
   */
  optionCilindros!: Catalogo[];

  /**
   * @property {Catalogo[]} optionCombustible
   * Opciones disponibles para los tipos de combustible.
   */
  optionCombustible!: Catalogo[];

  /**
   * @property {Catalogo[]} optionAduana
   * Opciones disponibles para las aduanas.
   */
  optionAduana!: Catalogo[];

  /**
   * @property {Catalogo[]} paisIssued
   * Opciones de países que emitieron el título de propiedad.
   */
  paisIssued!: Catalogo[];


  /**
   * @property {boolean} seccionContenedorVisible
   * Indicates whether the container section is visible.
   */
  datosDelAvisoVisible: boolean = false;

  /**
   * @property {boolean} datosDelAvisoVisible
   * Indicates whether the vehicle data is visible.
   */
  datosCargaMasiva: boolean = false;


   /**
     * Representa una nueva instancia de notificación asociada con el componente.
     * Esta propiedad se utiliza para gestionar y almacenar datos de notificaciones.
     */
    public nuevaNotificacion!: Notificacion;

  
   /**
   * @constructor
   * @description Constructor del componente. Inicializa servicios y dependencias necesarias.
   * @param {FormBuilder} fb - Servicio para construir formularios reactivos.
   * @param {tramite32505Store} store - Store para gestionar el estado del trámite.
   * @param {Tramite32505Query} tramiteQuery - Servicio para realizar consultas relacionadas con el trámite.
   * @param {AvisoService} avisoService - Servicio para gestionar datos relacionados con avisos.
   * @param {ValidacionesFormularioService} validacionesService - Servicio para validar formularios.
   */
  constructor(
    private fb: FormBuilder,
    public store: tramite32505Store,
    public tramiteQuery: Tramite32505Query,
    private avisoService: AvisoService,
    private validacionesService: ValidacionesFormularioService
  ) {}
  /**
   * Método para validar el formulario.
   * @param form Formulario a validar.
   * @param field Campo a validar.
   * @returns {boolean} Regresa un booleano si el campo es válido o no.
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

 
  /**
   * @method ngOnInit
   * @description Método de inicialización del componente. Configura formularios, carga datos iniciales y suscribe observables.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();
    this.crearFormSolicitud();
    this.cargarPais();
    this.cargarAnio();
    this.mostrarCampos();
    this.mostrarCamposAviso();
    this.cargarCilindros();
    this.cargarCombustible();
    this.cargarPaisIssued();
    this.cargarAduana();
    this.openModalCancelarTramite();
   
  }

  /**
   * Obtiene el grupo de formulario 'adaceForm' del formulario principal 'FormSolicitud'.
   * @returns {FormGroup} El grupo de formulario 'adaceForm'.
   */
  get adaceForm(): FormGroup {
    return this.aviosForm.get('adaceForm') as FormGroup;
  }

  /**
   * Obtiene el campo 'adace' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'adace' del formulario 'adaceForm'.
   */
  get adace(): FormGroup {
    return this.aviosForm.get('adaceForm.adace') as FormGroup;
  }
/**
   * Obtiene el campo 'pais' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'pais' del formulario 'adaceForm'.
   * */
  get pais(): FormGroup {
    return this.aviosForm.get('adaceForm.pais') as FormGroup;
  }

  /**
   * Obtiene el campo 'anio' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'anio' del formulario 'adaceForm'.
   */
    get anio(): FormGroup {
    return this.aviosForm.get('adaceForm.anio') as FormGroup;
  }

  /**
   * Obtiene el campo 'tipoBusqueda' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'tipoBusqueda' del formulario 'adaceForm'.
   */
  get tipoBusqueda(): FormGroup {
    return this.aviosForm.get('adaceForm.tipoBusqueda') as FormGroup;
  }
  /**
   * Obtiene el campo 'tipoBusquedaAviso' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'tipoBusquedaAviso' del formulario 'adaceForm'.
   */
  get tipoBusquedaAviso(): FormGroup {
    return this.aviosForm.get('adaceForm.tipoBusquedaAviso') as FormGroup;
  }
  /**
   * Obtiene el campo 'numeroSerie' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'numeroSerie' del formulario 'adaceForm'.
   */
  get folioTipo(): FormGroup {
    return this.aviosForm.get('adaceForm.folioTipo') as FormGroup;
  }
  /**
   * Obtiene el campo 'numeroSerie' del formulario 'adaceForm'.
   * @returns {FormGroup} El campo 'numeroSerie' del formulario 'adaceForm'.
   */
  get cilindros(): FormGroup {
    return this.aviosForm.get('adaceForm.cilindros') as FormGroup;
  }
  /**
   * Método para crear el formulario principal de la solicitud.
   */
  crearFormSolicitud(): void {
    this.aviosForm = this.fb.group({
      adaceForm: this.fb.group({
        adace: [
          { value: this.solicitudState?.adace, disabled: true },
          [Validators.required],
        ],
        pais: [this.solicitudState?.pais, [Validators.required]],
        anio: [this.solicitudState?.anio, [Validators.required]],
        tipoBusqueda: [this.solicitudState?.tipoBusqueda, Validators.required],
        tipoBusquedaAviso: [
          this.solicitudState?.tipoBusquedaAviso,
          Validators.required,
        ],
        folioTipo: [this.solicitudState?.folioTipo, Validators.required],
        numeroSerie: [
          this.solicitudState?.numeroSerie,
          [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)],
        ],
        numeroNIV: [
          this.solicitudState?.numeroNIV,
          [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)],
        ],
        anoModelo: [this.solicitudState?.anoModelo, [Validators.required]],
        marca: [this.solicitudState?.marca, [Validators.required]],
        modelo: [this.solicitudState?.modelo, [Validators.required]],
        tipoVariante: [
          this.solicitudState?.tipoVariante,
          [Validators.required],
        ],
        cilindros: [this.solicitudState?.cilindros, [Validators.required]],
        puertas: [this.solicitudState?.puertas, [Validators.required]],
        combustible: [this.solicitudState?.combustible, [Validators.required]],
        propiedad: [
          this.solicitudState?.propiedad,
          [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)],
        ],
        nombreTitulo: [
          this.solicitudState?.nombreTitulo,
          [Validators.required],
        ],
        paisEmitio: [this.solicitudState?.paisEmitio, [Validators.required]],
        provinciaEmision: [
          this.solicitudState?.provinciaEmision,
          [Validators.required],
        ],
        procedencia: [this.solicitudState?.procedencia, [Validators.required]],
        vehiculoImportado: [
          this.solicitudState?.vehiculoImportado,
          [Validators.required],
        ],
        exportacion: [this.solicitudState?.exportacion, [Validators.required]],
        aduanaImportacion: [
          this.solicitudState?.aduanaImportacion,
          [Validators.required],
        ],
        patenteImportacion: [
          this.solicitudState?.patenteImportacion,
          [Validators.required],
        ],
        pedimentoImportacion: [
          this.solicitudState?.pedimentoImportacion,
          [Validators.required],
        ],
        valorAduana: [this.solicitudState?.valorAduana, [Validators.required]],
        kilometraje: [this.solicitudState?.kilometraje, [Validators.required]],
        montoIGI: [this.solicitudState?.montoIGI, [Validators.required]],
        formaPagoIGI: [
          this.solicitudState?.formaPagoIGI,
          [Validators.required],
        ],
        montoDTA: [this.solicitudState?.montoDTA, [Validators.required]],
        montoIVA: [this.solicitudState?.montoIVA, [Validators.required]],
        valorDolares: [
          this.solicitudState?.valorDolares,
          [Validators.required],
        ],
        folioCFDI: [
          this.solicitudState?.folioCFDI,
          [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)],
        ],
        folioVenta: [
          this.solicitudState?.folioVenta,
          [Validators.required, Validators.pattern(ALPHANUMERIC_PATTERN)],
        ],
        valorVenta: [this.solicitudState?.valorVenta, [Validators.required]],
      }),
     
    });

    this.mostrarCampos();
    this.mostrarCamposAviso();
   
 
  }
  /**
   * Muestra los campos según el tipo de búsqueda seleccionado.
   */
  mostrarCamposAviso(): void {
    const AVISO_TIPO_BUSQUEDA = this.adaceForm.get('tipoBusquedaAviso')?.value;
    const FOLIO_TIPO = this.adaceForm.get('folioTipo')?.value;
    if (AVISO_TIPO_BUSQUEDA === 'Importación') {
      this.datosDelVehiculo = true;
      this.datosFolioVUCEM = false;
      this.datosDelImportacion = true;
      this.datosDelVenta = false;
      this.datosNIVNumeroSerie = false;
    } else if (AVISO_TIPO_BUSQUEDA === 'Venta') {
      this.datosFolioVUCEM = true;
      this.datosDelVehiculo = false;
      this.datosDelImportacion = false;
      this.datosDelVenta = true;
      this.datosNIVNumeroSerie = false;

      if (FOLIO_TIPO === 'Si') {
        this.datosDelVenta = true;
        this.datosDelVehiculo = false;
        this.datosDelImportacion = false;
        this.datosFolioVUCEM = true;
        this.datosNIVNumeroSerie = true;
      } else if (FOLIO_TIPO === 'No') {
        this.datosDelVenta = true;
        this.datosDelVehiculo = false;
        this.datosDelImportacion = false;
        this.datosFolioVUCEM = true;
        this.datosNIVNumeroSerie = false;
      }
    } else if (AVISO_TIPO_BUSQUEDA === 'Importación y venta') {
      this.datosDelVehiculo = true;
      this.datosFolioVUCEM = false;
      this.datosDelImportacion = true;
      this.datosDelVenta = true;
    } else
    {
        this.datosFolioVUCEM = true;
        this.datosDelVehiculo = true;
        this.datosDelImportacion = true;
        this.datosDelImportacion = true;
    }
  }

  /**
   * Muestra los campos según el tipo de búsqueda seleccionado.
   */
  mostrarCampos(): void {
    const TIPO_BUSQUEDA = this.adaceForm.get('tipoBusqueda')?.value;
    
    if (TIPO_BUSQUEDA === 'Manual') {
      this.datosDelAvisoVisible = true;
      this.datosCargaMasiva = false;
    } else if (TIPO_BUSQUEDA === 'Carga masiva') {
      this.datosDelAvisoVisible = true;
      this.datosCargaMasiva = true;
    } else {
    }
  }

  /**
   * Actualiza un valor en el store del trámite.
   *
   * Este método permite actualizar un valor específico en el store del trámite utilizando el formulario y el método correspondiente.
   *
   * @param {FormGroup} form - El formulario que contiene el valor a actualizar.
   * @param {string} campo - El nombre del campo en el formulario.
   * @param {keyof Tramite110217Store} metodoNombre - El nombre del método en el store que se debe invocar.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof tramite32505Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Carga las opciones disponibles para los países.
   *
   * Este método obtiene las opciones de países desde el servicio `CertificadosOrigenService` y las asigna a `optionsPais` y `optionsTipoFactura`.
   */
  cargarPais(): void {
    this.avisoService
      .obtenerPais()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsPais = datos.datos;
        
      });
  }

  /**
   * Carga las opciones disponibles para los años.
   *
   * Este método obtiene las opciones de años desde el servicio `avisoService` y las asigna a `optionsAnio`.
   */
  cargarAnio(): void {
    this.avisoService
      .obtenerAnio()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionsAnio = datos.datos;
      });
  }

  /**
   * Carga las opciones disponibles para los cilindros.
   *
   * Este método obtiene las opciones de cilindros desde el servicio `avisoService` y las asigna a `optionCilindros`.
   */
  cargarCilindros(): void {
    this.avisoService
      .obtenerCilindros()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionCilindros = datos.datos;
      });
  }

  /**
   * Carga las opciones disponibles para los países que emitieron el título de propiedad.
   *
   * Este método obtiene las opciones de países desde el servicio `avisoService` y las asigna a `paisIssued`.
   */
  cargarPaisIssued(): void {
    this.avisoService
      .obtenerPaisIssued()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.paisIssued = datos.datos;
      });
  }
  /**
   * Carga las opciones disponibles para los tipos de combustible.
   *
   * Este método obtiene las opciones de combustible desde el servicio `avisoService` y las asigna a `optionCombustible`.
   */
  cargarCombustible(): void {
    this.avisoService
      .obtenerCombustible()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionCombustible = datos.datos;
      });
  }

  /**
   * Carga las opciones disponibles para las aduanas.
   *
   * Este método obtiene las opciones de aduanas desde el servicio `avisoService` y las asigna a `optionAduana`.
   */
  cargarAduana(): void {
    this.avisoService
      .obtenerAduana()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.optionAduana = datos.datos;
      });
  }

  /**
   * @method cargarAvisoTabla
   * @description Método para cargar los datos de la tabla de avisos desde el servicio `avisoTrasladoService`.
   * Los datos obtenidos se asignan a la propiedad `tablaDeDatos.datos`.
   *
   * @returns {void}
   */
  public cargarAvisoTabla(): void {
  
    this.avisoService
      .obtenerAvisoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: AvisoTablaDatos) => {
        this.tablaDeDatos.datos = datos.datos;
      });
  }

  /**
   * @property {ElementRef} closeDomicilio
   * @description Referencia al botón o elemento que cierra el modal de domicilio.
   * Utilizado para cerrar el modal de manera programática.
   */
  @ViewChild('closeDomicilio') public closeDomicilio!: ElementRef;
  /**
   * @method agregarDomicilio
   * @description Método para agregar domicilios a la tabla de avisos.
   *
   * - Carga los datos de la tabla de avisos y cierra el modal de domicilio.
   *
   * @returns {void}
   */
  agregarDomicilio(): void {
    this.cargarAvisoTabla();
    this.closeDomicilio.nativeElement.click();
     this.abrirModal();
  }

  public abrirModal(): void {
    console.log('abrir modal');
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'El registro fue agregado correctamente.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    }
  }

  /**
   * @property {AvisoTabla[]} filaSeleccionadaLista
   * @description Lista de filas seleccionadas en la tabla de avisos.
   * Contiene los datos de las filas seleccionadas por el usuario.
   */
  filaSeleccionadaLista: ColumnasTabla[] = [];

  /**
   * @method filaSeleccionada
   * @description Método para manejar las filas seleccionadas en la tabla de avisos.
   *
   * - Actualiza la propiedad `filaSeleccionadaLista` con las filas seleccionadas.
   *
   * @param {AvisoTabla[]} evento - Lista de filas seleccionadas en la tabla de avisos.
   * @returns {void}
   */
  filaSeleccionada(evento: ColumnasTabla[]): void {
    this.filaSeleccionadaLista = evento;
  }

  /**
   * Abre el modal para cancelar el trámite.
   */
  openModalCancelarTramite(): void {
    this.adaceForm.reset();
    this.optionsPais = [];
  }

  /**
   * Limpia los observables al destruir el componente.
   *
   * Este método emite un valor en el `destroyNotifier$` y completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
