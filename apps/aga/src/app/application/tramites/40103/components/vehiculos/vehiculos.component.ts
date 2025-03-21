/* eslint-disable no-empty-function */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chofer40103Query } from '../../estados/chofer40103.query';
import { Chofer40103Service } from '../../estados/chofer40103.service';
import { Chofer40103Store } from '../../estados/chofer40103.store';
import { DatosDelVehículo } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { DatosDelVehículoPaisEmisor } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { Emisor2daPlaca } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';
import { VehiculoColor } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { VehiculoVEHs } from '@libs/shared/data-access-user/src/core/models/40103/transportista-terrestre.model';
import { Subscription } from 'rxjs';
import { Catalogo } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('exampleModal', { static: false }) modalElement!: ElementRef;
  @ViewChild('dataTable', { static: false }) dataTable!: ElementRef;
  @Input() catalogo: DatosDelVehículoPaisEmisor[] = [];
  public tipoVehiculoArrastreAGA!: Catalogo[];
  public paisEmisor!: Catalogo[];
  public colorAGA!: Catalogo[];
  public paisEmisor2daPlaca!: Catalogo[];
  public solicitudVehiculoColor!: Catalogo[];
  private modalInstance!: Modal;
  formVehiculo!: FormGroup;
  vehiculos: any[] = [];
  vehiculosList$: Observable<any[]> = new Observable();
  private subscriptions: Subscription = new Subscription();
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

  /**
   * Selecciona una pestaña.
   * @param tabName El nombre de la pestaña a seleccionar.
   */
  selectTab(tabName: string): void {
    this.selectedTab =
      tabName === 'parquevehicular' ? 'Parque vehicular' : 'Unidad de arrastre';
    this.activeTab = tabName;
  }

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private chofer40103Store: Chofer40103Store,
    private chofer40103Service: Chofer40103Service,
    private chofer40103Query: Chofer40103Query
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
          Validators.pattern('^[a-zA-Z0-9]*$')
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

    this.vehiculosList$ = this.chofer40103Query.getvehiculos$;
    this.subscriptions.add(
      this.chofer40103Query.getvehiculos$.subscribe((vehiculos: any) => {
        this.vehiculos = vehiculos;
      })
    );
    this.unidadesdearrastreList$ = this.chofer40103Query.getUnidadesdeArrastre$;
    this.UnidadesDearrastre();
    this.subscriptions.add(
      this.chofer40103Query.getUnidadesdeArrastre$.subscribe(
        (unidadesdearrastre: any) => {
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
      (item) =>
        item.solicitudVehiculoVin2 === NEW_VEHICULO.solicitudVehiculoVin2
    );

    if (VIN_EXISTS) {
      this.toastr.error('⚠️ This VIN already exists!');
      return;
    }

    // Asegúrese de que `this.vehiculos` sea una matriz antes de agregar nuevos datos
    if (!Array.isArray(this.vehiculos)) {
      this.vehiculos = [];
    }

    // Actualizar el estado de Akita
    this.chofer40103Store.setVehiculos([...this.vehiculos, NEW_VEHICULO]);
    this.formVehiculo.reset();
    this.toastr.success('🚗 Vehiculo added successfully!');
    this.closeModal();
  }

  /**
   * Maneja la lógica para agregar unidades de arrastre.
   */
  UnidadesDearrastre(): void {
    if (this.formVehiculo.valid) {
      const NEW_UNIDAD = this.formVehiculo.value;
      const CURRENT_DATA = this.chofer40103Query.getunidadesdearrastre();
      this.chofer40103Store.setUnidadesdeArrastre([
        ...CURRENT_DATA,
        NEW_UNIDAD,
      ]);
      this.unidadesdearrastreList$ =
        this.chofer40103Query.getUnidadesdeArrastre$;
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

  /**
   * Obtiene los valores del formulario.
   */
  get GETFORM_VALUES() {
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
    this.subscriptions.unsubscribe();
  }
}