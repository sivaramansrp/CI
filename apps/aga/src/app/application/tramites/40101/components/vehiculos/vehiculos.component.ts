import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements AfterViewInit {
  @ViewChild('exampleModal', { static: false }) modalElement!: ElementRef;
  private modalInstance!: Modal;
  formVehiculo!: FormGroup;
  nacional: any[] = [];

  // Select option data
  // tipoVehiculoAGA: any[] = [];
  // paises: any[] = [];
  // colorAGA: any[] = [];
  // anios: any[] = [];
  selectedTab: string = 'Parque vehicular';
  activeTab: string = 'parquevehicular';
  secondTableData: any[] = [];
  selectTab(tabName: string) {
    this.selectedTab =
      tabName === 'parquevehicular' ? 'Parque vehicular' : 'Unidad de arrastre';
    this.activeTab = tabName;
  }
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
  labelSolicitudVehiculoEmisor2daPlaca: string = 'Estado emisor de 2da Placa';
  labelSolicitudVehiculoPaisEmisor2daPlaca: string = 'País Emisor 2da Placa';
  labelDescripcionVehiculo: string = 'Descripción del vehículo';
  botonLimpiar: string = 'Limpiar';
  botonCancelar: string = 'Cancelar';
  botonGuardar: string = 'Guardar';

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

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
      solicitudVehiculoPaisEmisor: '',
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
      tipoVehiculoArrastreAGA: '',
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
    const storedVehiculoData = localStorage.getItem('vehiculoData');
    if (storedVehiculoData) {
      this.nacional = JSON.parse(storedVehiculoData);
    }
    const storedSecondTableData = localStorage.getItem('secondTableData');
    if (storedSecondTableData) {
      this.secondTableData = JSON.parse(storedSecondTableData);
    }

    console.log('✅ Loaded first table data:', this.nacional);
    console.log('✅ Loaded second table data:', this.secondTableData);
  }

  //  initializeForm(): void {
  //   this.formVehiculo = this.fb.group({
  //     solicitudVehiculoVin2: ['', [Validators.required, Validators.minLength(5)]],
  //     solicitudVehiculoTipoVehiculo: ['', Validators.required],
  //     solicitudVehiculoIdDeVehiculo: [{ value: '', disabled: true }],
  //     solicitudVehiculoNumeroPlacas: ['', Validators.required],
  //     solicitudVehiculoPaisEmisor: ['', Validators.required],
  //     solicitudDomicilioEstado: ['', Validators.required],
  //     solicitudVehiculoMarca: ['', Validators.required],
  //     solicitudVehiculoModelo: ['', Validators.required],
  //     anioVehiculoVEH: ['', Validators.required],
  //     solicitudVehiculoTransponder: ['', Validators.required],
  //     solicitudVehiculoColor: ['', Validators.required],
  //     solicitudVehiculoNumeroEconomico: ['', Validators.required],
  //     solicitudVehiculoNumero2daPlaca: [''],
  //     solicitudVehiculoEmisor2daPlaca: [''],
  //     solicitudVehiculoPaisEmisor2daPlaca: [''],
  //     solicitudVehiculoDesc: [''],

  //     vin2: ['', [Validators.required, Validators.maxLength(17)]],
  //     tipoVehiculoArrastreAGA: ['', Validators.required],
  //     idDeVehiculo: [{ value: '', disabled: true }, Validators.required],
  //     numeroPlacas: ['', [Validators.required, Validators.maxLength(8)]],
  //     paisEmisor: ['', Validators.required],
  //     estado2: ['', [Validators.required, Validators.maxLength(20)]],
  //     colorAGA: ['', Validators.required],
  //     numeroEconomico: ['', [Validators.required, Validators.maxLength(17)]],
  //     numero2daPlaca: ['', [Validators.maxLength(8)]],
  //     emisor2daPlaca: ['', [Validators.maxLength(20)]],
  //     paisEmisor2daPlaca: [''],
  //     desc: ['', [Validators.maxLength(200)]],
  //   });

  // console.log('Form Initialized:', this.formVehiculo);
  // }

  onSubmit() {
    // if (this.formVehiculo.invalid) {
    //   alert('⚠️ Please fill in all required fields correctly.');
    //   return;
    // }

    const newVehiculo = {
      id: this.nacional.length + 1,
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
    };

    // ✅ Prevent empty values after trimming
    if (Object.values(newVehiculo).some((value) => !value)) {
      alert('⚠️ Fields cannot be empty.');
      return;
    }
    const vinExists = this.nacional.some(
      (item) => item.solicitudVehiculoVin2 === newVehiculo.solicitudVehiculoVin2
    );
    if (vinExists) {
      alert('⚠️ This VIN already exists!');
      return;
    }
    this.nacional.push(newVehiculo);
    localStorage.setItem('vehiculoData', JSON.stringify(this.nacional));
    console.log('✅ Data added to first table:', this.nacional);
    const newSecondTableEntry = {
      vin2: newVehiculo.solicitudVehiculoVin2,
      tipoVehiculoArrastreAGA: newVehiculo.solicitudVehiculoTipoVehiculo,
      numeroEconomico: newVehiculo.solicitudVehiculoNumeroEconomico,
      numeroPlacas: newVehiculo.solicitudVehiculoNumeroPlacas,
      paisEmisor: newVehiculo.solicitudVehiculoPaisEmisor,
      estado2: newVehiculo.solicitudDomicilioEstado,
    };
    this.secondTableData.push(newSecondTableEntry);
    localStorage.setItem(
      'secondTableData',
      JSON.stringify(this.secondTableData)
    );
    console.log('✅ Data added to second table:', this.secondTableData);
    this.nacional = [...this.nacional];
    this.secondTableData = [...this.secondTableData];
    this.formVehiculo.reset();
  }

  paises = [
    { clave: 'MX', descripcion: 'México' },
    { clave: 'US', descripcion: 'Estados Unidos' },
    { clave: 'CA', descripcion: 'Canadá' },
    { clave: 'ES', descripcion: 'España' },
    { clave: 'AR', descripcion: 'Argentina' },
    { clave: 'BR', descripcion: 'Brasil' },
  ];
  tipoVehiculoAGA = [
    { clave: 'AUTOMOVIL', descripcion: 'Automóvil' },
    { clave: 'CAMIONETA', descripcion: 'Camioneta' },
    { clave: 'MOTOCICLETA', descripcion: 'Motocicleta' },
    { clave: 'CAMION', descripcion: 'Camión' },
  ];
  anios = [
    { descripcion: '2025' },
    { descripcion: '2024' },
    { descripcion: '2023' },
    { descripcion: '2022' },
    { descripcion: '2021' },
    { descripcion: '2020' },
    { descripcion: '2019' },
    { descripcion: '2010' },
  ];
  colorAGA = [
    { clave: 'BLANCO', descripcion: 'Blanco' },
    { clave: 'NEGRO', descripcion: 'Negro' },
    { clave: 'AZUL', descripcion: 'Azul' },
    { clave: 'ROJO', descripcion: 'Rojo' },
    { clave: 'VERDE', descripcion: 'Verde' },
    { clave: 'GRIS', descripcion: 'Gris' },
    { clave: 'PLATA', descripcion: 'Plata' },
    { clave: 'AMARILLO', descripcion: 'Amarillo' },
    { clave: 'NARANJA', descripcion: 'Naranja' },
    { clave: 'MORADO', descripcion: 'Morado' },
    { clave: 'ROSA', descripcion: 'Rosa' },
    { clave: 'CAFÉ', descripcion: 'Café' },
  ];

  get f() {
    return this.formVehiculo.controls;
  }
  eliminarRegistroSelec(tablaId: string): void {}
  ngAfterViewInit(): void {
    if (this.modalElement) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);
    }
  }

  openDialogCapturaSPFisicaValidacion(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  openDialogCapturaSPMoralValidacion(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  closeDialogoCaptura() {}
  limpiarDatosVEHARR() {}
}
