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
  @ViewChild('dataTable', { static: false }) dataTable!: ElementRef;
  private modalInstance!: Modal;
  formVehiculo!: FormGroup;
  nacional: any[] = [];
  selectedTab: string = 'Parque vehicular';
  activeTab: string = 'parquevehicular';
  secondTableData: any[] = [];
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
  constructor(private fb: FormBuilder, private toastr: ToastrService) {}
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
/**
   * Maneja el envío del formulario.
   */
  onSubmit() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    } else {
      console.error('Modal instance is not initialized!');
    }
    localStorage.removeItem('vehiculoData');
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

    // if (Object.values(newVehiculo).some((value) => !value)) {
    //   this.toastr.warning('⚠️ Fields cannot be empty');
    //   return;
    // }

    const vinExists = this.nacional.some(
      (item) => item.solicitudVehiculoVin2 === newVehiculo.solicitudVehiculoVin2
    );
    if (vinExists) {
      this.toastr.error('⚠️ This VIN already exists!');
      return;
    }

    this.nacional.push(newVehiculo);
    localStorage.setItem('vehiculoData', JSON.stringify(this.nacional));

    this.nacional = [...this.nacional];

    this.formVehiculo.reset();
    this.toastr.success('Vehiculo data added successfully');

    this.closeModal();
    setTimeout(() => {
      if (this.dataTable) {
        this.dataTable.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      } else {
        console.error('dataTable not found in DOM');
      }
    }, 500);
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

  closeDialogoCaptura() {}
  /**
   * Limpia los datos del formulario de vehículos.
   */
  limpiarDatosVEHARR() {
    this.formVehiculo.reset();
  }
  validarDescArrastre() {}
  /**
   * Limpia los datos del formulario de vehículos.
   */
  toggleAll(event: any) {
    // this.selectedAll = event.target.checked;
    // this.nacional.forEach(nacion => nacion.selected = this.selectedAll);
  }
}
