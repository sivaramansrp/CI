import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  DatosDelVehículo,
  DatosDelVehículoPaisEmisor,
  Emisor2daPlaca,
  VehiculoColor,
  VehiculoVEHs,
} from '@libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, map } from 'rxjs';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';
import { Tramite40101Query } from '../../estado/tramite40101.query';
import { Tramite40101Service } from '../../estado/tramite40101.service';
import { Tramite40101Store } from '../../estado/tramite40101.store';
import { VEHICULO_PAGE } from '../enum/transportista-terrestre.enum';
import { takeUntil } from 'rxjs';


@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements AfterViewInit, OnDestroy, OnInit {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  @ViewChild('exampleModal', { static: false }) modalElement!: ElementRef;
  @ViewChild('dataTable', { static: false }) dataTable!: ElementRef;
  @Input() catalogo: DatosDelVehículoPaisEmisor[] = [];
  private modalInstance!: Modal;
  formVehiculo!: FormGroup;
  vehiculos: any[] = [];
  vehiculosList$: Observable<any[]> = new Observable();
  unidadesdearrastre: any[] = [];
  unidadesdearrastreList$: Observable<any[]> = new Observable();
  selectedTab: string = 'Parque vehicular';
  activeTab: string = 'parquevehicular';
  vehiculoArrastr: any[] = [];
  vehiculosA: any[] = [];
  VehiculoVEH: any[] = [];
  VehiculoColors: any[] = [];
  PaisEmisor2daPlaca: any[] = [];
  // secondTableData: any[] = [];
  labelSolicitudVehiculoTipoVehiculo =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_TIPO_VEHICULO;
  solicitudTituloDatosVehiculo: string =
    VEHICULO_PAGE.SOLICITUD_TITULO_DATOS_VEHICULO;
  labelSolicitudVehiculoVin: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_VIN;
  labelPuntos: string = VEHICULO_PAGE.LABEL_PUNTOS;
  nonSelectionTextTipoVehiculo: string =
    VEHICULO_PAGE.NON_SELECTION_TEXT_TIPO_VEHICULO;
  nonSelectionTextPaisEmisor: string =
    VEHICULO_PAGE.NON_SELECTION_TEXT_PAIS_EMISOR;
  nonSelectionTextColorAGA: string = VEHICULO_PAGE.NON_SELECTION_TEXT_COLOR_AGA;
  nonSelectionTextAnios: string = VEHICULO_PAGE.NON_SELECTION_TEXT_ANIOS;
  labelSolicitudVehiculoIdDeVehiculo: string = VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_ID_DEVEHICULO;
  labelSolicitudVehiculotipodeVehiculodearrastre: string = VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_TIPO_DE_VEHICULO_DE_ARRASTRE;

  labelSolicitudVehiculoNumeroPlacas: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_NUMEROPLACAS;
  labelSolicitudVehiculoPaisEmisor: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_PAIS_EMISOR;
  labelSolicitudDomicilioEstado: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_DOMICILIO_ESTADO;
  labelSolicitudVehiculoMarca: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_MARCA;
  labelSolicitudVehiculoModelo: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_MODELO;
  labelAnioVEH: string = VEHICULO_PAGE.LABEL_ANIO_VEH;
  labelSolicitudVehiculoTransponder: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_TRANSPONDER;
  labelSolicitudVehiculoColor: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_COLOR;
  labelSolicitudVehiculoNumeroEconomico: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_NUMERO_ECONOMICO;
  labelSolicitudVehiculoNumero2daPlaca: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_NUMERO_2DAPLACA;
  labelSolicitudVehiculoEmisor2daPlaca: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_EMISOR_2DAPLACA;
  labelSolicitudVehiculoPaisEmisor2daPlaca: string =
    VEHICULO_PAGE.LABEL_SOLICITUD_VEHICULO_PAIS_EMISOR_2DAPLACA;
  labelDescripcionVehiculo: string = VEHICULO_PAGE.LABEL_DESCRIPCION_VEHICULO;
  botonLimpiar: string = VEHICULO_PAGE.BOTON_LIMPIAR;
  botonCancelar: string = VEHICULO_PAGE.BOTON_CANCELAR;
  botonGuardar: string = VEHICULO_PAGE.BOTON_GUARDAR;
  consultaState!: ConsultaioState;
  esFormularioSoloLectura: boolean = false;

  /**
   * Selecciona una pestaña.
   * @param tabName El nombre de la pestaña a seleccionar.
   */
  selectTab(tabName: string) {
    this.selectedTab =
      tabName === 'parquevehicular' ? 'Parque vehicular' : 'Unidad de arrastre';
    this.activeTab = tabName;
  }
  /**
   * Constructor para inyectar las dependencias necesarias.
   * @param fb - Servicio FormBuilder para crear formularios reactivos.
   * @param toastr - Servicio Toastr para mostrar mensajes emergentes.
   * @param tramite40101Store - Servicio para gestionar el estado de tramite40101.
   * @param tramite40101Service - Servicio para obtener datos de tramite40101.
   * @param tramite40101Query - Servicio para consultar el estado de tramite40101.
   */
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tramite40101Store: Tramite40101Store,
    private tramite40101Service: Tramite40101Service,
    private tramite40101Query: Tramite40101Query,
    private consultaioQuery: ConsultaioQuery
  ) {}

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
      solicitudVehiculoArrastrePaisEmisor2daPlaca:[''],
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
      solicitudVehiculoPaisEmisor2daPlaca: [''],
      solicitudVehiculoDesc: [''],

      vin2: ['', [Validators.required, Validators.minLength(5)]],
      solicitudVehiculoArrastreTipoVehiculo: ['', Validators.required],
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

    this.vehiculosList$ = this.tramite40101Query.getvehiculos$;
    this.tramite40101Query.getvehiculos$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((vehiculos: unknown[]) => {
        this.vehiculos = vehiculos;
      });
    this.unidadesdearrastreList$ =
      this.tramite40101Query.getUnidadesdeArrastre$;
    this.unidadDeArrastre();
    this.tramite40101Query.getUnidadesdeArrastre$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
      (unidadesdearrastre: unknown[]) => {
        this.unidadesdearrastre = unidadesdearrastre;
      });

    this.conVehiculoArrastre();
    this.anioVehiculoveh();
    this.solicitudVehiculoColor();
    this.solicitudVehiculoPaisEmisor2daPlaca();

    this.consultaioQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyed$), 
      map((seccionState) => {
      this.consultaState = seccionState;
      this.esFormularioSoloLectura = seccionState.readonly;
      if(this.esFormularioSoloLectura){
        this.formVehiculo.disable();
      }
    })).subscribe();

    if (this.consultaState.update) {
      // this.guardarDatosFormulario();
    } else {
      // this.esDatosRespuesta = true;
    }
  }
  /**
   * Maneja el envío del formulario.
   */
  onSubmit() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    } else {
      this.toastr.error('La instancia modal no está inicializada!');
    }
    const NEW_VEHICULO = {
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
      solicitudVehiculoPaisEmisor2daPlaca:
        this.formVehiculo.value.solicitudVehiculoPaisEmisor2daPlaca?.trim(),
      solicitudVehiculoDesc:
        this.formVehiculo.value.solicitudVehiculoDesc?.trim(),
    };

    // Comprueba si el VIN ya existe en el estado de Akita
    const VIN_EXISTS = this.vehiculos?.some(
      (item) => item.solicitudVehiculoVin2 === NEW_VEHICULO.solicitudVehiculoVin2
    );

    if (VIN_EXISTS) {
      this.toastr.error('⚠️ Esta VIN ya existe!');
      return;
    }

    // Asegúrese de que `this.vehiculos` sea una matriz antes de agregar nuevos datos
    if (!Array.isArray(this.vehiculos)) {
      this.vehiculos = [];
    }

    // Actualizar el estado de Akita
    this.tramite40101Store.setVehiculos([...this.vehiculos, NEW_VEHICULO]);
    this.formVehiculo.reset();
    this.toastr.success('🚗 Vehiculo agregado exitosamente!');
    this.closeModal();
  }

  unidadDeArrastre() {
    if (this.formVehiculo.valid) {
      const NEW_UNIDAD = this.formVehiculo.value;
      const CURRENT_DATA = this.tramite40101Query.getunidadesdearrastre();
      this.tramite40101Store.setUnidadesdeArrastre([...CURRENT_DATA, NEW_UNIDAD]);
      this.unidadesdearrastreList$ =
        this.tramite40101Query.getUnidadesdeArrastre$;
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
      solicitudVehiculoPaisEmisor2daPlaca:
        this.formVehiculo.value.solicitudVehiculoPaisEmisor2daPlaca?.trim(),
      solicitudVehiculoDesc:
        this.formVehiculo.value.solicitudVehiculoDesc?.trim(),
      vin2: ['', [Validators.required, Validators.maxLength(17)]],
      solicitudVehiculoArrastreTipoVehiculo: ['', Validators.required],
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

  get getFormValues() {
    return this.formVehiculo.controls;
  }
  
  eliminarRegistroSelec(tablaId: string): void {}
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
   * Método que obtiene la clasificación del régimen de vehículos de arrastre.
   *
   * Este método realiza una solicitud al servicio `tramite40101Service` para obtener
   * los datos de clasificación del régimen de vehículos de arrastre. Los datos obtenidos
   * se asignan a la propiedad `vehiculoArrastr`. En caso de error, se muestra un mensaje
   * de error utilizando `toastr`.
   *
   * @returns {void}
   */
  conVehiculoArrastre(): void {
    this.tramite40101Service
      .getClasifiRegimen()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: DatosDelVehículo[]) => {
          this.vehiculoArrastr = data;
        },
        error: (error) => this.toastr.error('Error al obtener datos:', error),
      });
  }

  /**
   * Método que obtiene el año del vehículo desde el formulario y lo establece en el store.
   * Luego, realiza una solicitud al servicio para obtener los datos del vehículo y los asigna a la propiedad `VehiculoVEH`.
   * En caso de error, muestra un mensaje de error utilizando Toastr.
   *
   * @returns {void}
   */
  anioVehiculoveh() {
    const anioVehiculoVEH = this.formVehiculo.get('anioVehiculoVEH')?.value;
    this.tramite40101Store.setanioVehiculoVEH(anioVehiculoVEH);
    this.tramite40101Service
      .getVehiculoVEH()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: VehiculoVEHs[]) => {
          this.VehiculoVEH = data;
        },
        error: (error) => this.toastr.error('Error al obtener datos:', error),
      });
  }

  /**
   * Método para solicitar el color del vehículo.
   *
   * Este método obtiene el valor del color del vehículo desde el formulario y lo envía al store.
   * Luego, realiza una solicitud al servicio para obtener los colores de vehículos disponibles.
   *
   * @returns {void}
   */
  solicitudVehiculoColor(): void {
    const solicitudVehiculoColor = this.formVehiculo.get(
      'solicitudVehiculoColor'
    )?.value;
    this.tramite40101Store.solicitudVehiculoColor(solicitudVehiculoColor);
    this.tramite40101Service
      .getVehiculoColor()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: VehiculoColor[]) => {
          this.VehiculoColors = data;
        },
        error: (error) => this.toastr.error('Error al obtener datos:', error),
      });
  }

  /**
   * Método que maneja la solicitud del país emisor de la segunda placa del vehículo.
   *
   * Este método obtiene el valor del formulario de vehículo y lo envía al store para
   * actualizar el país emisor de la segunda placa. Luego, realiza una solicitud al
   * servicio para obtener los datos del país emisor de la segunda placa y los asigna
   * a la propiedad `PaisEmisor2daPlaca`.
   *
   * @returns {void}
   */
  solicitudVehiculoPaisEmisor2daPlaca(): void {
    const SOLICITUD_VEHICULO = this.formVehiculo.get('solicitudVehiculo')?.value;
    this.tramite40101Store.VehiculoPaisEmisor2daPlaca(SOLICITUD_VEHICULO);
    this.tramite40101Service
      .getPaisEmisor2daPlaca()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: Emisor2daPlaca[]) => {
          this.PaisEmisor2daPlaca = data;
        },
        error: (error) => this.toastr.error('Error al obtener datos:', error),
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
   * Limpia los datos del formulario de vehículos.
   */
  toggleAll(event: any) {}

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   * Aquí se emiten señales para completar y limpiar cualquier suscripción o recurso que el componente
   * haya estado utilizando, evitando posibles fugas de memoria.
   *
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
