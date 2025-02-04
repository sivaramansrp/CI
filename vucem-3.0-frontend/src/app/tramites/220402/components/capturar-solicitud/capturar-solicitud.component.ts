import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-capturar-solicitud',

  templateUrl: './capturar-solicitud.component.html',
  styleUrl: './capturar-solicitud.component.scss',
})
export class CapturarSolicitudComponent implements OnInit, AfterViewInit {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  // Form Groups
  solicitudForm!: FormGroup;
  formTercerosDatos!: FormGroup;

  // Variables
  title: string = '';
  seleccioneText: string = '';
  discriminador: number | string = 0;
  requiereTerceros: string = 'false';
  solPrincipal: string = '';
  solModificacion: string = '';
  solProrroga: string = '';
  actionForm: string = '';
  contextPath: string = ''; // Assign context path as needed

  // Constants for discriminator values
  readonly discriminatorValuesA: number[] = [
    220403, 220401, 220803, 220801, 220903, 220901,
  ];
  readonly discriminatorValuesB: number[] = [220402, 220802, 220902];
  readonly discriminatorValuesC: number[] = [220401, 220801, 220901];

  constructor(
    private fb: FormBuilder //private translate: TranslateService // Inject other necessary services here
  ) {
    // Initialize translation if needed
    // this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.initializeForms();
    this.loadInitialData();
    this.initializeFieldMetadata();
  }

  ngAfterViewInit(): void {
    this.initializeTabs();
  }

  private initializeForms(): void {
    this.solicitudForm = this.fb.group({
      solPrincipal: [''],
      solModificacion: [''],
      solProrroga: [''],
      // 'solicitud.discriminatorValue': [''],
      // Add other form controls as required
    });

    this.formTercerosDatos = this.fb.group({
      // Define form controls for terceros datos
    });
  }

  private loadInitialData(): void {
    // Fetch initial data from services or route parameters
    // Example assignments based on session or request scope
    this.title = 'Capturar solicitud'; // Replace with actual logic
    this.seleccioneText = 'Seleccione un valor'; // Replace with actual logic
    this.discriminador =
      this.solicitudForm.get('solicitud.discriminatorValue')?.value || 0;
    this.requiereTerceros = 'false'; // Replace with actual logic
    this.solPrincipal = this.solicitudForm.get('solPrincipal')?.value || '';
    this.solModificacion =
      this.solicitudForm.get('solModificacion')?.value || '';
    this.solProrroga = this.solicitudForm.get('solProrroga')?.value || '';
    this.actionForm = ''; // Assign based on actual logic
    // Assign contextPath if necessary
  }

  private initializeFieldMetadata(): void {
    // Implement stripesValidation equivalent if necessary
    // Angular forms handle validation via Validators
  }

  private initializeTabs(): void {
    if (this.isDiscriminatorValueIn(this.discriminatorValuesC)) {
      this.selectTab(0);
    } else {
      this.selectTab(1);
    }
  }

  private selectTab(index: number): void {
    if (this.staticTabs && this.staticTabs.tabs[index]) {
      this.staticTabs.tabs[index].active = true;
    }
  }

  // Method to handle form submission
  onSubmit(): void {
    this.sendGridTercerosGeneral(
      this.solicitudForm.get('solicitud.discriminatorValue')?.value
    );
    this.sendGridEOA();
    this.setNewAction(this.actionForm, this.solPrincipal);

    if (this.solicitudForm.valid) {
      // Handle form submission, possibly via a service
      // Example:
      // this.solicitudService.submitForm(this.solicitudForm.value).subscribe(response => {
      //   // Handle response
      // });
    }
  }

  // Method to handle terceros form submission
  onTercerosSubmit(): void {
    if (this.formTercerosDatos.valid) {
      // Handle terceros form submission
      // Example:
      // this.tercerosService.submitForm(this.formTercerosDatos.value).subscribe(response => {
      //   // Handle response
      // });
    }
  }

  // Method equivalent to recargaPaginaxTipoMercancia
  recargaPaginaxTipoMercancia(radio: any): void {
    const enumTipoMercancia =
      this.solicitudForm.get('enumTipoMercancia')?.value;
    if (enumTipoMercancia !== radio.value) {
      this.removeValidators();

      // Update form action if necessary
      // In Angular, form action is typically handled via services, not directly
      // You may need to navigate or make a service call instead

      // Example submission logic:
      // this.solicitudService.recargaTipoMercancia(radio.value).subscribe(response => {
      //   // Handle response, possibly reload data or navigate
      // });

      // Submit the form programmatically if needed
      // this.onSubmit();
    }
  }

  private removeValidators(): void {
    // Remove validators from specific form controls
    const controlsToRemoveValidators = [
      'solicitud.claveAduana',
      'solicitud.oficinaInspeccionAgropecuaria.clave',
      'solicitud.regimen.clave',
      'solicitud.transporte.ideMedioTransporte',
      'solicitud.descripcionLugarEmbarque',
      'solicitud.pago.banco.clave',
      'solicitud.pago.llaveDePago',
      'calendarTo',
      'solicitud.catalogoD.clave',
      'idEspecieModAni',
      'funcionZootecnicaModAni',
      'nombrePaisDestinoModAni',
      'idEspecieModProd',
      'tipoProductoModProd',
      'nombrePaisDestinoModProd',
      'mercanciaDetalle.idUsoEspecifico',
      'solicitud.ideGenerica2',
      'solicitud.ideGenerica3',
      'tipoProductoModQfba',
      'nombrePaisDestinoModQfba',
      'solicitud.entidadOrigen.clave',
      'identificacionTransporte',
      'solicitud.transporte.razonSocial',
      'mercanciaDetalle.numeroFlejes',
      'mercanciaDetalle.idEspecie',
      'solicitud.paisProcedencia.clave',
      'fechaArribo',
      'solicitud.puntoIngreso',
      'idEspecieProductoSelect',
      'idTipoProductoTipoTramiteProducto',
      'idPaisDestinoPorEspecieTipoProducto',
      'funcionZootecnicaAnimal',
      'nombreComunAnimal',
      'nombrePaisDestinoAnimal',
      'unidadExpedidoraDelegacionEstatal',
      'unidadExpedidoraOisa',
      'unidadExpedidoraOficinaCentral',
      'solicitud.tipoProductoTipoTramite.idTipoProductoTipoTramite',
      'paisDestinoProducto',
    ];

    controlsToRemoveValidators.forEach((controlName) => {
      const control = this.solicitudForm.get(controlName);
      if (control) {
        control.clearValidators();
        control.updateValueAndValidity();
      }
    });
  }

  // Placeholder methods for sendGrid functions
  private sendGridTercerosGeneral(csv: string): void {
    // Implement the logic for sendGridTercerosGeneral
    // Example:
    // this.someService.sendGridTercerosGeneral(csv).subscribe(response => {
    //   // Handle response
    // });
  }

  private sendGridEOA(): void {
    // Implement the logic for sendGridEOA
    // Example:
    // this.someService.sendGridEOA().subscribe(response => {
    //   // Handle response
    // });
  }

  private setNewAction(newActionForm: string, solPrincipal: string): void {
    // Implement the logic to set a new action
    // Example:
    // this.solicitudForm.patchValue({ actionForm: newActionForm, solPrincipal: solPrincipal });
  }

  // Method to check if discriminator value is in a given array
  isDiscriminatorValueIn(values: number[]): boolean {
    return values.includes(
      Number(this.solicitudForm.get('solicitud.discriminatorValue')?.value)
    );
  }

  // Event handler for tab selection
  onTabSelect(tabId: number): void {
    if (tabId === 4) {
      // TAB DE TERCEROS
      try {
        this.validaRegistrosAgregados();
      } catch (e) {
        console.error(e);
      }

      const checbox = this.isEmpresaProductoraChecked();
      if (!checbox) {
        this.limpiaGridTercerosEOA();
        this.validaBotonesTercerosEOA();
      }
    }

    if (tabId === 1) {
      // TAB DATOS TRAMITE
      const banderaRegresoCargaEOA =
        this.solicitudForm.get('idbanderaRegreso')?.value;
      const checbox = this.isEmpresaProductoraChecked();

      if (banderaRegresoCargaEOA === 'true' && !checbox) {
        this.verificarRegresoGridsEOA();
        // Clear the banderaRegreso flag
        this.solicitudForm.patchValue({ idbanderaRegreso: '' });
      }

      const empresaProductoraSufijo = 'TIPERS_EOA'; // Replace with actual suffix logic

      if (this.isEmpresaProductoraChecked()) {
        this.hideProducerLabel();
        this.disableEmpresaProductora();
        this.showAgregarTercero(empresaProductoraSufijo);
        this.showGridTerceros();
        // this.limpiaGridEOA();
      } else {
        this.showProducerLabel();
        this.enableEmpresaProductora();
        this.limpiaGridTercerosEOA();
        this.validaBotonesTercerosEOA();
        this.solicitudForm.patchValue({ contadorTerceros_TIPERS_EOA: 0 });
        this.hideAgregarTercero(empresaProductoraSufijo);
        this.hideGridTerceros();
        this.disableOtro();
      }
    }
  }

  private validaRegistrosAgregados(): void {
    // Implement validation logic
  }

  private isEmpresaProductoraChecked(): boolean {
    return this.solicitudForm.get('empresaProductoraCheck')?.value === true;
  }

  private limpiaGridTercerosEOA(): void {
    // Implement logic to clean grid terceros EOA
  }

  private validaBotonesTercerosEOA(): void {
    // Implement logic to validate botones terceros EOA
  }

  private verificarRegresoGridsEOA(): void {
    // Implement verification logic
  }

  private hideProducerLabel(): void {
    // Implement logic to hide producer label
  }

  private showProducerLabel(): void {
    // Implement logic to show producer label
  }

  private disableEmpresaProductora(): void {
    this.solicitudForm.get('empresaProductora')?.disable();
    this.solicitudForm.get('empresaProductora')?.setValue('');
  }

  private enableEmpresaProductora(): void {
    this.solicitudForm.get('empresaProductora')?.enable();
  }

  private showAgregarTercero(sufijo: string): void {
    // Implement logic to show agregar tercero
  }

  private hideAgregarTercero(sufijo: string): void {
    // Implement logic to hide agregar tercero
  }

  private showGridTerceros(): void {
    // Implement logic to show grid terceros
  }

  private hideGridTerceros(): void {
    // Implement logic to hide grid terceros
  }

  private disableOtro(): void {
    // Implement logic to disable 'otro' field
  }

  // Methods equivalent to mostrarBotonesA, mostrarBotonesP, etc.
  mostrarBotonesA(): void {
    // Implement logic to show botones A
  }

  mostrarBotonesP(): void {
    // Implement logic to show botones P
  }

  mostrarBotonesQ(): void {
    // Implement logic to show botones Q
  }

  mostrarBotones2204(): void {
    // Implement logic to show botones 2204
  }

  // Dialog handling methods
  mostrarMensaje(): void {
    // Implement logic to display messages
  }

  ocultarErrores(): void {
    // Implement logic to hide error messages
  }

  // Additional methods to handle dialogs based on tipoMercancia
  handleTipoMercanciaDialogs(): void {
    const tipoMercancia = this.solicitudForm.get(
      'solicitud.tipoMercancia'
    )?.value;

    switch (tipoMercancia) {
      case 'TICERM.AN':
        this.openDialogMercanciaAnimal();
        this.openDialogMercanciaAnimalMasiva();
        break;
      case 'TICERM.SOA':
        this.openDialogMercanciaProducto();
        this.openDialogMercanciaAnimalMasiva();
        break;
      case 'TICERM.QFBA':
        this.openDialogMercanciaQuimico();
        this.openDialogMercanciaAnimalMasiva();
        break;
      default:
        break;
    }
  }

  private openDialogMercanciaAnimal(): void {
    // Implement logic to open dialog mercancía animal
  }

  private openDialogMercanciaProducto(): void {
    // Implement logic to open dialog mercancía producto
  }

  private openDialogMercanciaQuimico(): void {
    // Implement logic to open dialog mercancía químico
  }

  private openDialogMercanciaAnimalMasiva(): void {
    // Implement logic to open dialog mercancía animal masiva
  }

  // Event handler for tab selection using ngx-bootstrap tabs
  onSelectTab(tabId: number): void {
    this.onTabSelect(tabId);
  }

  // Initialize any additional logic after view initialization
  private additionalInitialization(): void {
    // Any additional initialization logic
  }
}
