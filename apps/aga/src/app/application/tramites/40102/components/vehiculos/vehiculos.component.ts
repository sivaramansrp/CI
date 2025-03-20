import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tramite40102Query } from '../../estados/tramite40102.query';
import { Tramite40102Service } from '../../estados/tramite40102.service';
import { Tramite40102Store } from '../../estados/tramite40102.store';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, takeUntil } from 'rxjs';
import {
  DatosDelVehículo,
  DatosDelVehículoPaisEmisor,
  Emisor2daPlaca,
  VehiculoColor,
  VehiculoVEHs,
  TipoVehicleTerrestra,
  ColorCatalogo,
  PaisCatalogo,
} from 'libs/shared/data-access-user/src/core/models/40102/transportista-terrestre.model';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements AfterViewInit, OnDestroy {
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
  labelSolicitudVehiculoTipoVehiculo = 'Tipo de vehiculo';
  solicitudTituloDatosVehiculo: string = 'Datos del Vehículo';
  labelSolicitudVehiculoVin: string = 'Número de identificacion vehicular';
  labelPuntos: string = 'Puntos';
  nonSelectionTextTipoVehiculo: string = 'Selecciona un valor';
  nonSelectionTextPaisEmisor: string = 'Selecciona un valor';
  nonSelectionTextColorAGA: string = 'Selecciona un valor';
  nonSelectionTextAnios: string = 'Selecciona un valor';
  labelSolicitudVehiculoIdDeVehiculo: string = 'ID de Vehículo';
  labelSolicitudVehiculoNumeroPlacas: string = 'Número de Placas';
  labelSolicitudVehiculoPaisEmisor: string = 'País Emisor';
  labelSolicitudDomicilioEstado: string = 'Estado o provincia';
  labelSolicitudVehiculoMarca: string = 'Marca';
  labelSolicitudVehiculoModelo: string = 'Modelo';
  labelAnioVEH: string = 'Año';
  labelSolicitudVehiculoTransponder: string = 'Transponder';
  labelSolicitudVehiculoColor: string = 'Color de vehiculo';
  labelSolicitudVehiculoNumeroEconomico: string = 'Número económico';
  labelSolicitudVehiculoNumero2daPlaca: string = 'Número 2da Placa';
  labelsolicitudVehiculoNumero2daPlaca: string = 'Número 2da Placa';
  labelSolicitudVehiculoEmisor2daPlaca: string = 'Estado emisor de 2da Placa';
  labelSolicitudVehiculoPaisEmisor2daPlaca: string = 'País Emisor 2da Placa';
  labelDescripcionVehiculo: string = 'Descripción del vehículo';
  botonLimpiar: string = 'Limpiar';
  botonCancelar: string = 'Cancelar';
  botonGuardar: string = 'Guardar';
  tipoVehiculoArrastreAGA: any[] = [];
  colorCatalogo: any[] = [];
  paisCatalogo: any[] = [];
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  /**
   * Selecciona una pestaña.
   * @param tabName El nombre de la pestaña a seleccionar.
   */
  selectTab(tabName: string) {
    this.selectedTab =
      tabName === 'parquevehicular' ? 'Parque vehicular' : 'Unidad de arrastre';
    this.activeTab = tabName;
  }
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private tramite40102Store: Tramite40102Store,
    private tramite40102Service: Tramite40102Service,
    private tramite40102Query: Tramite40102Query
  ) {}
  
  /**
   * Método de ciclo de vida de Angular que se ejecuta una vez que el componente ha sido inicializado.
   * 
   * @remarks
   * Este método inicializa el formulario `formVehiculo` con varios controles y validadores.
   * También suscribe a varios observables para obtener listas de vehículos y unidades de arrastre.
   * 
   * @returns {void}
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
      solicitudVehiculoPaisEmisor2daPlaca: [''],
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

    this.vehiculosList$ = this.tramite40102Query.getvehiculos$;
    this.tramite40102Query.getvehiculos$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((vehiculos: any) => {
        this.vehiculos = vehiculos;
      });
    this.unidadesdearrastreList$ =
      this.tramite40102Query.getUnidadesdeArrastre$;
    this.unidadesDearrastre();
    this.tramite40102Query.getUnidadesdeArrastre$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((unidadesdearrastre: any) => {
        this.unidadesdearrastre = unidadesdearrastre;
      });
    this.conVehiculoArrastre();
    this.anioVehiculoveh();
    this.solicitudVehiculoColor();
    this.solicitudVehiculoPaisEmisor2daPlaca();
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
    const newVehiculo = {
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
    const vinExists = this.vehiculos?.some(
      (item) => item.solicitudVehiculoVin2 === newVehiculo.solicitudVehiculoVin2
    );

    if (vinExists) {
      this.toastr.error('⚠️ Esta VIN ya existe!');
      return;
    }

    // Asegúrese de que `this.vehiculos` sea una matriz antes de agregar nuevos datos
    if (!Array.isArray(this.vehiculos)) {
      this.vehiculos = [];
    }

    // Actualizar el estado de Akita
    this.tramite40102Store.setVehiculos([...this.vehiculos, newVehiculo]);
    this.formVehiculo.reset();
    this.toastr.success('🚗 Vehiculo agregado exitosamente!');
    this.closeModal();
  }

  unidadesDearrastre() {
    if (this.formVehiculo.valid) {
      const newUnidad = this.formVehiculo.value;
      const currentData = this.tramite40102Query.getunidadesdearrastre();
      this.tramite40102Store.setUnidadesdeArrastre([...currentData, newUnidad]);
      this.unidadesdearrastreList$ =
        this.tramite40102Query.getUnidadesdeArrastre$;
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

  get f() {
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
   * Método que maneja la lógica para obtener y establecer el tipo de vehículo de arrastre.
   * 
   * Obtiene el valor del tipo de vehículo de arrastre desde el formulario y lo establece en el store.
   * Luego, realiza una solicitud al servicio para obtener la clasificación del régimen y actualiza
   * la propiedad `vehiculoArrastr` con los datos obtenidos.
   * 
   * @returns {void}
   */
  conVehiculoArrastre() {
    const solicitudVehiculoTipoVehiculo = this.formVehiculo.get(
      'solicitudVehiculoTipoVehiculo'
    )?.value;
    this.tramite40102Store.setsolicitudVehiculoTipoVehiculo(
      solicitudVehiculoTipoVehiculo
    );
    this.tramite40102Service
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
   */
  anioVehiculoveh() {
    const anioVehiculoVEH = this.formVehiculo.get('anioVehiculoVEH')?.value;
    this.tramite40102Store.setanioVehiculoVEH(anioVehiculoVEH);
    this.tramite40102Service
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
   * Este método obtiene el valor del color del vehículo desde el formulario
   * y lo envía al store. Luego, realiza una solicitud al servicio para obtener
   * los colores de los vehículos y actualiza la propiedad `VehiculoColors` con
   * los datos obtenidos.
   * 
   * @returns {void}
   */
  solicitudVehiculoColor() {
    const solicitudVehiculoColor = this.formVehiculo.get(
      'solicitudVehiculoColor'
    )?.value;
    this.tramite40102Store.solicitudVehiculoColor(solicitudVehiculoColor);
    this.tramite40102Service
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
  solicitudVehiculoPaisEmisor2daPlaca() {
    const solicitudVehiculo = this.formVehiculo.get('solicitudVehiculo')?.value;
    this.tramite40102Store.VehiculoPaisEmisor2daPlaca(solicitudVehiculo);
    this.tramite40102Service
      .getPaisEmisor2daPlaca()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: Emisor2daPlaca[]) => {
          this.PaisEmisor2daPlaca = data;
        },
        error: (error) => this.toastr.error('Error al obtener datos:', error),
      });
  }

  fetchTipoVehiculoArrastreAGA() {
    this.tramite40102Service
      .getTipoVehiculoArrastre()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: TipoVehicleTerrestra[]) => {
          this.tipoVehiculoArrastreAGA = data;
        },
        error: (error) => this.toastr.error('Error al obtener datos:', error),
      });
  }

  fetchColorCatalogo() {
    this.tramite40102Service
      .getColorCatalogo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: ColorCatalogo[]) => {
          this.colorCatalogo = data;
        },
        error: (error) => this.toastr.error('Error al obtener datos:', error),
      });
  }

  fecthPaisCatalogo() {
    this.tramite40102Service
      .getPaisCatalogo()
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (data: PaisCatalogo[]) => {
          this.paisCatalogo = data;
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
  limpiarDatosVEHARR() {
    this.formVehiculo.reset();
  }
  /**
   * Limpia los datos del formulario de vehículos.
   */
  toggleAll(event: any) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
