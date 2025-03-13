import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chofer40101Query } from '../../estados/chofer40101.query';
import { Chofer40101Service } from '../../estados/chofer40101.service';
import { Chofer40101Store } from '../../estados/chofer40101.store';
import { Modal } from 'bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { ToastrService } from 'ngx-toastr';
import {
  DatosDelVehículo,
  DatosDelVehículoPaisEmisor,
  Emisor2daPlaca,
  VehiculoColor,
  VehiculoVEHs,
} from 'libs/shared/data-access-user/src/core/models/40101/transportista-terrestre.model';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements AfterViewInit {
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
    private chofer40101Store: Chofer40101Store,
    private chofer40101Service: Chofer40101Service,
    private chofer40101Query: Chofer40101Query
  ) {}
  /**
   * Método del ciclo de vida de Angular que se llama después de que las propiedades enlazadas a datos se inicializan.
   */
  ngOnInit(): void {
    //  localStorage.removeItem('vehiculoData');
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

    this.vehiculosList$ = this.chofer40101Query.getvehiculos$;
    this.chofer40101Query.getvehiculos$.subscribe((vehiculos: any) => {
      this.vehiculos = vehiculos;
    });
    console.log('✅ Loaded vehicle data:', this.vehiculos);
    this.unidadesdearrastreList$ = this.chofer40101Query.getUnidadesdeArrastre$;
    this.UnidadesDearrastre();
    this.chofer40101Query.getUnidadesdeArrastre$.subscribe(
      (unidadesdearrastre: any) => {
        this.unidadesdearrastre = unidadesdearrastre;
        console.log('✅ loaded Unidades  data:', this.unidadesdearrastre);
      }
    );
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
      console.error('Modal instance is not initialized!');
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
      this.toastr.error('⚠️ This VIN already exists!');
      return;
    }

    // Asegúrese de que `this.vehiculos` sea una matriz antes de agregar nuevos datos
    if (!Array.isArray(this.vehiculos)) {
      this.vehiculos = [];
    }

    // Actualizar el estado de Akita
    this.chofer40101Store.setVehiculos([...this.vehiculos, newVehiculo]);
    this.formVehiculo.reset();
    this.toastr.success('🚗 Vehiculo added successfully!');
    this.closeModal();
  }

  UnidadesDearrastre() {
    if (this.formVehiculo.valid) {
      const newUnidad = this.formVehiculo.value;
      const currentData = this.chofer40101Query.getunidadesdearrastre();
      this.chofer40101Store.setUnidadesdeArrastre([...currentData, newUnidad]);
      this.unidadesdearrastreList$ =
        this.chofer40101Query.getUnidadesdeArrastre$;
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
  conVehiculoArrastre() {
    const solicitudVehiculoTipoVehiculo = this.formVehiculo.get(
      'solicitudVehiculoTipoVehiculo'
    )?.value;
    console.log('Selected Value:', solicitudVehiculoTipoVehiculo);
    this.chofer40101Store.setsolicitudVehiculoTipoVehiculo(
      solicitudVehiculoTipoVehiculo
    );
    this.chofer40101Service.getClasifiRegimen().subscribe({
      next: (data: DatosDelVehículo[]) => {
        this.vehiculoArrastr = data;
      },
      error: (error) => console.error('Error fetching data:', error),
    });
  }
  anioVehiculoveh() {
    const anioVehiculoVEH = this.formVehiculo.get('anioVehiculoVEH')?.value;
    console.log('Selected Value:', anioVehiculoVEH);
    this.chofer40101Store.setanioVehiculoVEH(anioVehiculoVEH);
    this.chofer40101Service.getVehiculoVEH().subscribe({
      next: (data: VehiculoVEHs[]) => {
        this.VehiculoVEH = data;
      },
      error: (error) => console.error('Error fetching data:', error),
    });
  }

  solicitudVehiculoColor() {
    const solicitudVehiculoColor = this.formVehiculo.get(
      'solicitudVehiculoColor'
    )?.value;
    console.log('Selected Value:', solicitudVehiculoColor);
    this.chofer40101Store.solicitudVehiculoColor(solicitudVehiculoColor);
    this.chofer40101Service.getVehiculoColor().subscribe({
      next: (data: VehiculoColor[]) => {
        this.VehiculoColors = data;
      },
      error: (error) => console.error('Error fetching data:', error),
    });
  }
  solicitudVehiculoPaisEmisor2daPlaca() {
    const solicitudVehiculo = this.formVehiculo.get('solicitudVehiculo')?.value;
    console.log('Selected Value:', solicitudVehiculo);
    this.chofer40101Store.VehiculoPaisEmisor2daPlaca(solicitudVehiculo);
    this.chofer40101Service.getPaisEmisor2daPlaca().subscribe({
      next: (data: Emisor2daPlaca[]) => {
        this.PaisEmisor2daPlaca = data;
      },
      error: (error) => console.error('Error fetching data:', error),
    });
  }

  tipoVehiculoArrastreAGA = [
    { clave: 'TR1', descripcion: 'Trailer' },
    { clave: 'SR2', descripcion: 'Semi-Trailer' },
    { clave: 'FL3', descripcion: 'Flatbed' },
    { clave: 'CN4', descripcion: 'Container Carrier' },
    { clave: 'TN5', descripcion: 'Tanker' },
    { clave: 'DB6', descripcion: 'Double Trailer' },
    { clave: 'FR7', descripcion: 'Fridge Trailer' },
  ];
  colorCatalogo = [
    { clave: 'BL', descripcion: 'Blanco' },
    { clave: 'NG', descripcion: 'Negro' },
    { clave: 'AZ', descripcion: 'Azul' },
    { clave: 'RO', descripcion: 'Rojo' },
    { clave: 'VD', descripcion: 'Verde' },
    { clave: 'GR', descripcion: 'Gris' },
    { clave: 'AM', descripcion: 'Amarillo' },
    { clave: 'MR', descripcion: 'Marrón' },
    { clave: 'PL', descripcion: 'Plateado' },
  ];
  paisCatalogo = [
    { clave: 'MX', descripcion: 'México' },
    { clave: 'US', descripcion: 'Estados Unidos' },
    { clave: 'CA', descripcion: 'Canadá' },
    { clave: 'ES', descripcion: 'España' },
    { clave: 'AR', descripcion: 'Argentina' },
    { clave: 'BR', descripcion: 'Brasil' },
    { clave: 'CO', descripcion: 'Colombia' },
    { clave: 'FR', descripcion: 'Francia' },
    { clave: 'DE', descripcion: 'Alemania' },
  ];
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
  toggleAll(event: any) {
    // this.selectedAll = event.target.checked;
    // this.nacional.forEach(nacion => nacion.selected = this.selectedAll);
  }
}
