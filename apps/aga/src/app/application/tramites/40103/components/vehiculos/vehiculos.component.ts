import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Catalogo, TablaSeleccion } from '@ng-mf/data-access-user';
import { PagoDerechosLista, Vehiculo } from '../../../40103/models/registro-muestras-mercancias.model';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { Chofer40103Service } from '../../estados/chofer40103.service';
import { Chofer40103Store } from '../../estados/chofer40103.store';
import { DatosDelVehículoPaisEmisor } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ReplaySubject } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { VEHICULO_PAGE } from '../../enum/transportista-terrestre.enum';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements AfterViewInit, OnInit, OnDestroy {
  /**
   * Referencia al elemento modal en la plantilla.
   */
  @ViewChild('exampleModal', { static: false }) modalElement!: ElementRef;

  /**
   * Referencia a la tabla de datos en la plantilla.
   */
  @ViewChild('dataTable', { static: false }) dataTable!: ElementRef;

  /**
   * Catálogo de datos del vehículo y país emisor.
   */
  @Input() catalogo: DatosDelVehículoPaisEmisor[] = [];

  /**
   * Tipo de selección de la tabla (CHECKBOX).
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Sujeto utilizado para limpiar las suscripciones al destruir el componente.
   */
  private destroy$ = new Subject<void>();

  /**
   * Sujeto utilizado para notificar cuando se destruye el componente.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Lista de pagos de derechos.
   */
  pagoDerechosLista: PagoDerechosLista[] = [] as PagoDerechosLista[];

  /**
   * Catálogo de tipos de vehículos de arrastre.
   */
  public tipoVehiculoArrastreAGA!: Catalogo[];

  /**
   * Catálogo de países emisores.
   */
  public paisEmisor!: Catalogo[];

  /**
   * Catálogo de colores de vehículos.
   */
  public colorAGA!: Catalogo[];

  /**
   * Catálogo de países emisores para la segunda placa.
   */
  public paisEmisor2daPlaca!: Catalogo[];

  /**
   * Catálogo de colores de vehículos para la solicitud.
   */
  public solicitudVehiculoColor!: Catalogo[];

  /**
   * Instancia del modal de Bootstrap.
   */
  private modalInstance!: Modal;

  /**
   * Formulario reactivo para los datos del vehículo.
   */
  formVehiculo!: FormGroup;

  /**
   * Observable que contiene la lista de vehículos.
   */
  vehiculosList$: Observable<unknown[]> = new Observable();
  private subscriptions: Subscription = new Subscription();
  /**
   * Lista de unidades de arrastre.
   */
  unidadesdearrastre: unknown[] = [];

  /**
   * Observable que contiene la lista de unidades de arrastre.
   */
  unidadesdearrastreList$: Observable<unknown[]> = new Observable();

  /**
   * Pestaña seleccionada actualmente.
   */
  selectedTab: string = 'Parque vehicular';

  /**
   * Nombre de la pestaña activa.
   */
  activeTab: string = 'parquevehicular';

  /**
   * Lista de vehículos con arrastre.
   */
  vehiculoArrastr: unknown[] = [];

  /**
   * Catálogo de vehículos.
   */
  vehiculosA: Catalogo[] = [];

  /**
   * Catálogo de vehículos para la vista.
   */
  VehiculoVEH: Catalogo[] = [];

  /**
   * Catálogo de colores de vehículos.
   */
  VehiculoColors: Catalogo[] = [];

  /**
   * Lista de vehículos.
   */
  vehiculos: Vehiculo[] = [];

  /**
   * Lista de países emisores para la segunda placa.
   */
  PaisEmisor2daPlaca: DatosDelVehículoPaisEmisor[] = [];

  /**
   * Etiqueta para el tipo de vehículo en la solicitud.
   */
  labelSolicitudVehiculoTipoVehiculo =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_TIPO_VEHICULO;

  /**
   * Título de los datos del vehículo en la solicitud.
   */
  solicitudTituloDatosVehiculo: string =
    VEHICULO_PAGE.SOLICITUD_TITULO_DATOS_VEHICULO;

  /**
   * Etiqueta para el VIN del vehículo en la solicitud.
   */
  labelSolicitudVehiculoVin: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_VIN;

  /**
   * Etiqueta para los puntos en la solicitud.
   */
  labelPuntos: string = VEHICULO_PAGE.LABEL_PUNTOS;

  /**
   * Texto de selección no disponible para el tipo de vehículo.
   */
  nonSelectionTextTipoVehiculo: string =
    VEHICULO_PAGE.NON_SELECTION_TEXT_TIPO_VEHICULO;

  /**
   * Texto de selección no disponible para el país emisor.
   */
  nonSelectionTextPaisEmisor: string =
    VEHICULO_PAGE.NON_SELECTION_TEXT_PAIS_EMISOR;

  /**
   * Texto de selección no disponible para el color del vehículo.
   */
  nonSelectionTextColorAGA: string = VEHICULO_PAGE.NON_SELECTION_TEXT_COLOR_AGA;

  /**
   * Texto de selección no disponible para los años.
   */
  nonSelectionTextAnios: string = VEHICULO_PAGE.NON_SELECTION_TEXT_ANIOS;

  /**
   * Etiqueta para el ID del vehículo en la solicitud.
   */
  labelSolicitudVehiculoIdDeVehiculo: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_ID_DEVEHICULO;

  /**
   * Etiqueta para el número de placas en la solicitud.
   */
  labelSolicitudVehiculoNumeroPlacas: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_NUMEROPLACAS;

  /**
   * Etiqueta para el país emisor en la solicitud.
   */
  labelSolicitudVehiculoPaisEmisor: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_PAIS_EMISOR;

  /**
   * Etiqueta para el estado o provincia en la solicitud.
   */
  labelSolicitudDomicilioEstado: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_DOMICILIO_ESTADO;

  /**
   * Etiqueta para la marca del vehículo en la solicitud.
   */
  labelSolicitudVehiculoMarca: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_MARCA;

  /**
   * Etiqueta para el modelo del vehículo en la solicitud.
   */
  labelSolicitudVehiculoModelo: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_MODELO;

  /**
   * Etiqueta para el año del vehículo en la solicitud.
   */
  labelAnioVEH: string = VEHICULO_PAGE.LABEL_ANIO_VEH;

  /**
   * Etiqueta para el transponder del vehículo en la solicitud.
   */
  labelSolicitudVehiculoTransponder: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_TRANSPONDER;

  /**
   * Etiqueta para el color del vehículo en la solicitud.
   */
  labelSolicitudVehiculoColor: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_COLOR;

  /**
   * Etiqueta para el número económico del vehículo en la solicitud.
   */
  labelSolicitudVehiculoNumeroEconomico: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_NUMERO_ECONOMICO;

  /**
   * Etiqueta para el número de la segunda placa en la solicitud.
   */
  labelSolicitudVehiculoNumero2daPlaca: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_NUMERO_2DAPLACA;

  /**
   * Etiqueta para el emisor de la segunda placa en la solicitud.
   */
  labelSolicitudVehiculoEmisor2daPlaca: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_EMISOR_2DAPLACA;

  /**
   * Etiqueta para el país emisor de la segunda placa en la solicitud.
   */
  labelSolicitudVehiculoPaisEmisor2daPlaca: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_PAIS_EMISOR_2DAPLACA;

  /**
   * Etiqueta para la descripción del vehículo en la solicitud.
   */
  labelDescripcionVehiculo: string = VEHICULO_PAGE.LABEL_DESCRIPCION_VEHICULO;

  /**
   * Texto del botón para limpiar el formulario.
   */
  botonLimpiar: string = VEHICULO_PAGE.BOTON_LIMPIAR;

  /**
   * Texto del botón para cancelar la operación.
   */
  botonCancelar: string = VEHICULO_PAGE.BOTON_CANCELAR;

  /**
   * Texto del botón para guardar los datos.
   */
  botonGuardar: string = VEHICULO_PAGE.BOTON_GUARDAR;
  /**
   * Selecciona una pestaña.
   * @param tabName El nombre de la pestaña a seleccionar.
   */
  selectTab(tabName: string): void {
    this.selectedTab =
      tabName === 'parquevehicular' ? 'Parque vehicular' : 'Unidad de arrastre';
    this.activeTab = tabName;
  }
  /**
   * Representa una lista de configuraciones para el parque vehicular, donde cada elemento
   * define las propiedades de un vehículo y su mapeo correspondiente a los datos de origen.
   *
   * Cada objeto en la lista contiene:
   * - `encabezado`: El nombre de la columna que se mostrará en la interfaz de usuario.
   * - `clave`: Una función que toma un objeto de tipo `PagoDerechosLista` y devuelve el valor correspondiente.
   * - `orden`: El orden en el que se deben mostrar las columnas.
   *
   * @type {Array<{ encabezado: string; clave: (item: PagoDerechosLista) => unknown; orden: number }>}
   */
  ParqueVehicular = [
    {
      encabezado: 'Número de identificación vehicular',
      clave: (item: PagoDerechosLista): string | undefined => item.número,
      orden: 1,
    },
    {
      encabezado: 'Tipo de vehículo',
      clave: (item: PagoDerechosLista): string | undefined => item.calle,
      orden: 2,
    },
    {
      encabezado: 'ID de vehículo',
      clave: (item: PagoDerechosLista): string | undefined => item.estado,
      orden: 3,
    },
    {
      encabezado: 'Número de Placas',
      clave: (item: PagoDerechosLista): string | undefined => item.pais,
      orden: 4,
    },
    {
      encabezado: 'País Emisor',
      clave: (item: PagoDerechosLista): string | undefined =>
        item.apellidoPaterno,
      orden: 5,
    },
    {
      encabezado: 'Estado o provincia',
      clave: (item: PagoDerechosLista): string | undefined =>
        item.apellidoMaterno,
      orden: 6,
    },
    {
      encabezado: 'Marca',
      clave: (item: PagoDerechosLista): string | undefined => item.rfc,
      orden: 7,
    },
    {
      encabezado: 'Modelo',
      clave: (item: PagoDerechosLista): string | undefined => item.gafete,
      orden: 8,
    },
    {
      encabezado: 'Año',
      clave: (item: PagoDerechosLista): string | undefined =>
        item.vigenciaGafete,
      orden: 9,
    },
    {
      encabezado: 'Transponder',
      clave: (item: PagoDerechosLista): string | undefined => item.municipio,
      orden: 10,
    },
    {
      encabezado: 'Color',
      clave: (item: PagoDerechosLista): string | undefined => item.colonia,
      orden: 11,
    },
    {
      encabezado: 'Número económico',
      clave: (item: PagoDerechosLista): string | undefined => item.paisOrigen,
      orden: 12,
    },
    {
      encabezado: 'Número 2da Placa',
      clave: (item: PagoDerechosLista): string | undefined => item.ciudad,
      orden: 13,
    },
    {
      encabezado: 'País Emisor 2da Placa',
      clave: (item: PagoDerechosLista): string | undefined => item.paisOrigen,
      orden: 14,
    },
    {
      encabezado: 'País Emisor 2da Placa',
      clave: (item: PagoDerechosLista): string | undefined => item.ciudad,
      orden: 15,
    },
    {
      encabezado: 'Descripción',
      clave: (item: PagoDerechosLista): string | undefined => item.ciudad,
      orden: 16,
    },
  ];

  /**
   * Lista de objetos que representan las unidades de arrastre con sus respectivas propiedades.
   * Cada objeto contiene información sobre el encabezado, la clave para acceder a los datos
   * y el orden en el que deben aparecer.
   *
   * Propiedades:
   * - `encabezado`: Título que describe la columna correspondiente.
   * - `clave`: Función que toma un objeto de tipo `PagoDerechosLista` y devuelve el valor asociado a la clave.
   * - `orden`: Número que indica el orden en el que se deben mostrar las columnas.
   *
   * Ejemplo de columnas:
   * 1. VIN del vehículo
   * 2. Tipo de unidad de arrastre
   * 3. Número económico
   * 4. Número de Placas
   * 5. País Emisor
   * 6. Estado o provincia
   */
  unidadesDeArrastre = [
    {
      encabezado: 'VIN del vehículo',
      clave: (item: PagoDerechosLista): string | undefined => item.número,
      orden: 1,
    },
    {
      encabezado: 'Tipo de unidad de arrastre',
      clave: (item: PagoDerechosLista): string | undefined => item.calle,
      orden: 2,
    },
    {
      encabezado: 'Número económico',
      clave: (item: PagoDerechosLista): string | undefined => item.estado,
      orden: 3,
    },
    {
      encabezado: 'Número de Placas',
      clave: (item: PagoDerechosLista): string | undefined => item.pais,
      orden: 4,
    },
    {
      encabezado: 'País Emisor',
      clave: (item: PagoDerechosLista): string | undefined => item.apellidoPaterno,
      orden: 5,
    },
    {
      encabezado: 'Estado o provincia',
      clave: (item: PagoDerechosLista): string | undefined => item.apellidoMaterno,
      orden: 6,
    },
  ];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private chofer40103Store: Chofer40103Store,
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query
  ) {
    //
  }

  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   */
  ngOnInit(): void {
    this.formVehiculo = this.fb.group({
      solicitudVehiculoVin2: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{1,17}$')],
      ],
      solicitudVehiculoTipoVehiculo: ['', Validators.required],
      solicitudVehiculoIdDeVehiculo: [
        { value: '', disabled: true },
        [Validators.required, Validators.maxLength(10)],
      ],
      solicitudVehiculoNumeroPlacas: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z0-9]{1,8}$')],
      ],
      solicitudVehiculoPaisEmisor: [''],
      solicitudDomicilioEstado: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
        ],
      ],
      solicitudVehiculoMarca: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\\-\\s]+$'),
        ],
      ],
      solicitudVehiculoModelo: [
        '',
        [Validators.required, Validators.maxLength(20)],
      ],
      anioVehiculoVEH: ['', Validators.required],
      solicitudVehiculoTransponder: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      ],
      solicitudVehiculoColor: ['', Validators.required],

      solicitudVehiculoNumeroEconomico: [
        '',
        [
          Validators.required,
          Validators.maxLength(17),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      ],
      solicitudVehiculoNumero2daPlaca: [''],

      solicitudVehiculoEmisor2daPlaca: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      ],
      solicitudVehiculoPaisEmisorSegundaPlaca: [''],
      solicitudVehiculoDesc: [''],

      vin2: ['', [Validators.required, Validators.minLength(5)]],
      tipoVehiculoArrastreAGA: ['', Validators.required],
      idDeVehiculo: '',
      numeroPlacas: '',
      paisEmisor: '',
      estado2: '',
      colorAGA: '',
      numeroEconomico: '',
      numero2daPlaca: '',
      emisor2daPlaca: '',
      paisEmisor2daPlaca: '',
      desc: '',
    });

    this.vehiculosList$ = this.chofer40103Query.getvehiculos$;
    this.subscriptions.add(
      this.chofer40103Query.getvehiculos$.subscribe((vehiculos) => {
        this.vehiculos = vehiculos.map((vehiculo) => JSON.parse(vehiculo) as Vehiculo);
      })
    );
    this.unidadesdearrastreList$ = this.chofer40103Query.getUnidadesdeArrastre$;
    this.unidadesDearrastre();
    this.subscriptions.add(
      this.chofer40103Query.getUnidadesdeArrastre$.subscribe(
        (unidadesdearrastre: unknown[]) => {
          this.unidadesdearrastre = unidadesdearrastre;
        }
      )
    );
    this.conVehiculoArrastre();
    this.anioVehiculoveh();
    this.tipoVehiculoArrastreAGAData();
    this.paisEmisorData();
    this.colorAGAData();
    this.paisEmisor2DaPlacaData();
    this.solicitudVehiculoColorData();
  }

  /**
   * Maneja el envío del formulario.
   */
  onSubmit(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    const NEW_VEHICULO: Vehiculo = {
      id: (this.vehiculos?.length || 0) + 1,
      solicitudVehiculoVin2:
        this.formVehiculo.value.solicitudVehiculoVin2?.trim(),
      solicitudVehiculoTipoVehiculo:
        this.formVehiculo.value.solicitudVehiculoTipoVehiculo?.trim(),
      solicitudVehiculoNumeroEconomico:
        this.formVehiculo.value.solicitudVehiculoNumeroEconomico?.trim(),
      solicitudVehiculoNumeroPlacas:
        this.formVehiculo.value.solicitudVehiculoNumeroPlacas?.trim(),
      solicitudVehiculoPaisEmisor:
        this.formVehiculo.value.solicitudVehiculoPaisEmisor?.trim(),
      solicitudDomicilioEstado:
        this.formVehiculo.value.solicitudDomicilioEstado?.trim(),
      solicitudVehiculoMarca:
        this.formVehiculo.value.solicitudVehiculoMarca?.trim(),
      solicitudVehiculoModelo:
        this.formVehiculo.value.solicitudVehiculoModelo?.trim(),
      anioVehiculoVEH: this.formVehiculo.value.anioVehiculoVEH?.trim(),
      solicitudVehiculoTransponder:
        this.formVehiculo.value.solicitudVehiculoTransponder?.trim(),
      solicitudVehiculoColor:
        this.formVehiculo.value.solicitudVehiculoColor?.trim(),
      solicitudVehiculoNumero2daPlaca:
        this.formVehiculo.value.solicitudVehiculoNumero2daPlaca?.trim(),
      solicitudVehiculoEmisor2daPlaca:
        this.formVehiculo.value.solicitudVehiculoEmisor2daPlaca?.trim(),
      solicitudVehiculoPaisEmisorSegundaPlaca:
        this.formVehiculo.value.solicitudVehiculoPaisEmisorSegundaPlaca?.trim(),
      solicitudVehiculoDesc:
        this.formVehiculo.value.solicitudVehiculoDesc?.trim(),
    };

    // Comprueba si el VIN ya existe en el estado de Akita
    const VIN_EXISTS = this.vehiculos?.some(
      (item: Vehiculo) =>
        item.solicitudVehiculoVin2 === NEW_VEHICULO.solicitudVehiculoVin2
    );

    if (VIN_EXISTS) {
      this.toastr.error('¡Este VIN ya existe!');
      return;
    }

    // Asegúrese de que `this.vehiculos` sea una matriz antes de agregar nuevos datos
    if (!Array.isArray(this.vehiculos)) {
      this.vehiculos = [];
    }

    // Actualizar el estado de Akita
    this.chofer40103Store.setVehiculos([
      ...(this.vehiculos as unknown as string[]),
      JSON.stringify(NEW_VEHICULO),
    ]);
    this.formVehiculo.reset();
    this.toastr.success('¡Vehículo añadido exitosamente!');
    this.closeModal();
  }

  /**
   * Maneja la lógica para agregar unidades de arrastre.
   */
  unidadesDearrastre(): void {
    if (this.formVehiculo.valid) {
      const NUEVA_UNIDAD = this.formVehiculo.value;
      const DATOS_ACTUALES = this.chofer40103Query.getunidadesdearrastre();
      this.chofer40103Store.setUnidadesdeArrastre([
        ...DATOS_ACTUALES,
        NUEVA_UNIDAD,
      ]);

      // Use takeUntil to ensure subscription is cleaned up
      this.chofer40103Query.getUnidadesdeArrastre$
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.unidadesdearrastreList$ = of(data);
        });
    }

    this.formVehiculo = this.fb.group({
      solicitudVehiculoVin2:
        this.formVehiculo.value.solicitudVehiculoVin2?.trim(),
      solicitudVehiculoTipoVehiculo:
        this.formVehiculo.value.solicitudVehiculoTipoVehiculo?.trim(),
      solicitudVehiculoNumeroEconomico:
        this.formVehiculo.value.solicitudVehiculoNumeroEconomico?.trim(),
      solicitudVehiculoNumeroPlacas:
        this.formVehiculo.value.solicitudVehiculoNumeroPlacas?.trim(),
      solicitudVehiculoPaisEmisor:
        this.formVehiculo.value.solicitudVehiculoPaisEmisor?.trim(),
      solicitudDomicilioEstado:
        this.formVehiculo.value.solicitudDomicilioEstado?.trim(),
      solicitudVehiculoMarca:
        this.formVehiculo.value.solicitudVehiculoMarca?.trim(),
      solicitudVehiculoModelo:
        this.formVehiculo.value.solicitudVehiculoModelo?.trim(),
      anioVehiculoVEH: this.formVehiculo.value.anioVehiculoVEH?.trim(),
      solicitudVehiculoTransponder:
        this.formVehiculo.value.solicitudVehiculoTransponder?.trim(),
      solicitudVehiculoColor:
        this.formVehiculo.value.solicitudVehiculoColor?.trim(),
      solicitudVehiculoNumero2daPlaca:
        this.formVehiculo.value.solicitudVehiculoNumero2daPlaca?.trim(),
      solicitudVehiculoEmisor2daPlaca:
        this.formVehiculo.value.solicitudVehiculoEmisor2daPlaca?.trim(),
      solicitudVehiculoPaisEmisorSegundaPlaca:
        this.formVehiculo.value.solicitudVehiculoPaisEmisorSegundaPlaca?.trim(),
      solicitudVehiculoDesc:
        this.formVehiculo.value.solicitudVehiculoDesc?.trim(),
      vin2: ['', [Validators.required, Validators.maxLength(17)]],
      tipoVehiculoArrastreAGA: ['', Validators.required],
      idDeVehiculo: [{ value: '2', disabled: true }, Validators.required],
      numeroPlacas: ['', [Validators.required, Validators.maxLength(8)]],
      paisEmisor: ['', Validators.required],
      estado2: ['', [Validators.required, Validators.maxLength(20)]],
      colorAGA: ['', Validators.required],
      numeroEconomico: ['', [Validators.required, Validators.maxLength(17)]],
      numero2daPlaca: ['', Validators.maxLength(8)],
      emisor2daPlaca: ['', Validators.maxLength(20)],
      paisEmisor2daPlaca: [''],
      desc: ['', [Validators.maxLength(200)]],
    });
  }
  /**
   * Obtiene los valores del formulario.
   */
  get getFormValues(): { [key: string]: AbstractControl } {
    return this.formVehiculo.controls;
  }

  /**
   * Método del ciclo de vida de Angular que se llama después de que la vista del componente ha sido completamente inicializada.
   */
  ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);
    }
  }

  /**
   * Abre el diálogo de captura para validación de persona física.
   */
  openDialogCapturaSPFisicaValidacion(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  /**
   * Abre el diálogo de captura para validación de persona moral.
   */
  openDialogCapturaSPMoralValidacion(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  /**
   * Maneja la lógica para vehículos con arrastre.
   */
  conVehiculoArrastre(): void {
    const SOLICITUD_VEHICULOTIPOVEHICULO = this.formVehiculo.get(
      'solicitudVehiculoTipoVehiculo'
    )?.value;
    this.chofer40103Store.setsolicitudVehiculoTipoVehiculo(
      SOLICITUD_VEHICULOTIPOVEHICULO
    );
  }

  /**
   * Maneja la lógica para el año del vehículo.
   */
  anioVehiculoveh(): void {
    const ANIO_VEHICULOVEH = this.formVehiculo.get('anioVehiculoVEH')?.value;
    this.chofer40103Store.setanioVehiculoVEH(ANIO_VEHICULOVEH);
  }

  /**
   * Carga los datos del catálogo de tipo de vehículo de arrastre.
   */
  tipoVehiculoArrastreAGAData(): void {
    this.chofer40103Service.getTipoVehiculoArrastreAGA().subscribe((data) => {
      this.tipoVehiculoArrastreAGA = data;
    });
  }

  /**
   * Carga los datos del catálogo de país emisor.
   */
  paisEmisorData(): void {
    this.chofer40103Service.getPaisEmisor().subscribe((data) => {
      this.paisEmisor = data;
    });
  }

  /**
   * Carga los datos del catálogo de color del vehículo.
   */
  colorAGAData(): void {
    this.chofer40103Service.getcolorAGA().subscribe((data) => {
      this.colorAGA = data;
    });
  }

  /**
   * Carga los datos del catálogo de país emisor de la segunda placa.
   */
  paisEmisor2DaPlacaData(): void {
    this.chofer40103Service.getpaisEmisor2DaPlacaData().subscribe((data) => {
      this.paisEmisor2daPlaca = data;
    });
  }

  /**
   * Carga los datos del catálogo de color del vehículo para la solicitud.
   */
  solicitudVehiculoColorData(): void {
    this.chofer40103Service.getsolicitudVehiculoColor().subscribe((data) => {
      this.solicitudVehiculoColor = data;
    });
  }

  /**
   * Cierra el modal.
   */
  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  /**
   * Limpia los datos del formulario de vehículos.
   */
  limpiarDatosVEHARR(): void {
    this.formVehiculo.reset();
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Libera las suscripciones.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
