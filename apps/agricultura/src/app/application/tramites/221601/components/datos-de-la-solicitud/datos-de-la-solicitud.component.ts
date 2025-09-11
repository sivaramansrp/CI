import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import { AlertComponent, Catalogo, CatalogoSelectComponent, ConfiguracionColumna, InputFechaComponent, InputRadioComponent, TablaDinamicaComponent, TablaSeleccion, TituloComponent, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { CAPTURA_MERCANCIA, CONFIGURATION_TABLAS_MERCANCIASDELLATE, DATOS_SOLICITUD, MercanciaDellate, Mercancias, OPCIONES_DE_BOTON_DE_RADIO, PreOperativo } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { Solicitud221601State, Tramite221601Store } from '../../../../estados/tramites/tramite221601.store';
import { CONFIGURATION_TABLAS_MERCANCIAS } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { CommonModule } from '@angular/common';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { Tramite221601Query } from '../../../../estados/queries/tramite221601.query';
import realizar from '@libs/shared/theme/assets/json/221601/zoosanitario.json';

import { ModalComponent } from '../modal/modal.component';
import { ZoosanitarioService } from '../../service/zoosanitario.service';

import { INPUT_FECHA_CONFIGURACION } from '@libs/shared/data-access-user/src/core/enums/221601/fecha.enum';

import { Notificacion, NotificacionesComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-de-la-solicitud',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TituloComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    AlertComponent,
    InputRadioComponent,
    ModalComponent,
    InputFechaComponent,
    NotificacionesComponent
  ],
  templateUrl: './datos-de-la-solicitud.component.html',
  styleUrls: ['./datos-de-la-solicitud.component.scss']
})

export class DatosDeLaSolicitudComponent implements OnInit, OnDestroy {
  // Add the missing destroyNotifier$ property
  private destroyNotifier$: Subject<void> = new Subject();

  // Property declarations (keep only one of each)
  tipoPersonaOptions: PreOperativo[] = [];
  showtercerosModal = false;
  INPUT_FECHA_CONFIGURACION = INPUT_FECHA_CONFIGURACION;
  esFormularioSoloLectura: boolean = false;
  public regimen: Catalogo[] = realizar.regimen;
  public veterinario: Catalogo[] = realizar.veterinario;
  public establecimiento: Catalogo[] = realizar.establecimiento;
  public solicitudState!: Solicitud221601State;
  datosSolicitudForm!: FormGroup;
  public checkbox = TablaSeleccion.CHECKBOX;
  TEXTOS: string = DATOS_SOLICITUD;
  MERCANCIA: string = CAPTURA_MERCANCIA;
  showContent = true;
  mercancias: Mercancias[] = realizar.mercancias;
  
  // KEEP ONLY ONE DECLARATION - change to any[] to avoid type issues
  mercanciasdellate: MercanciaDellate[] = [];
  
  configuracionTabla: ConfiguracionColumna<Mercancias>[] = CONFIGURATION_TABLAS_MERCANCIAS;
  configuracionTablaDelLate: ConfiguracionColumna<MercanciaDellate>[] = CONFIGURATION_TABLAS_MERCANCIASDELLATE;
  mostrarOpcionesDePrellenado: boolean = true;
  plegable: boolean = true;
  @ViewChild('modalAgregarMercancias') modalElement!: ElementRef;
  opcionDeBotonDeRadio = OPCIONES_DE_BOTON_DE_RADIO;
  valorSeleccionado: string = 'Productos y Subproductos';
  public fisica = false;
  public moral = false;
  fechaFuturaSeleccionada = false;
  showMercanciaModal = false;

  // Notification properties
  public mostrarAlertaMercancia: boolean = false;
  public confirmacionAlertaMercancia: boolean = false;
  public notificacionMercancia!: Notificacion;
  public selectedMercanciaRecords: any[] = [];
  public selectedMercanciaDelLateRecords: MercanciaDellate[] = [];

  // Date range properties
  opcionesRangoFecha = [
    { value: 'No', label: 'No' },
    { value: 'Si', label: 'Sí' }
  ];
  mostrarRangoFechas = false;
  opcionSiSeleccionada = false;

  // Fix the form initialization - make only truly required fields required
  mercanciaForm = this.fb.group({
    paisOrigen: ['', Validators.required],
    regulacion: ['', Validators.required],
    nombreProducto: ['', [Validators.required, Validators.maxLength(50)]],
    fracciónArancelaria: ['', Validators.required],
    unidad2: ['', Validators.required],
    nico: ['', Validators.required],
    unidad1: [''], // Not required based on UI
    observaciones: [''], // Not required
    cantidadUmt: ['', Validators.required],
    umt: ['', Validators.required],
    cantidadUmc: ['', Validators.required],
    umc: ['', Validators.required],
    especie: ['', Validators.required],
    edadAnimal: ['', Validators.required],
    paisOrigen1: ['', Validators.required],
    paisdeprocedencia: ['', Validators.required],
    tipoProducto: [''],
    presentacion: [''], // Not required based on UI
    cantidadPresentacion: [''], // Not required based on UI
    tipoPresentacion: [''],
    tipoPlanta: [''],
    plantaAutorizadaOrigen: [''],
    nombreLote: [''], // Not required based on UI
    tipoPersona: ['fisica'],
    fechaElaboracion: [''],
    fechaProduccion: [''],
    fechaCaducidad: [''],
    tipoEspecie: [''],
    fecha: [''],
    numeroLote: [''],
    rangoFecha: ['No'],
    fechaDesde: [''],
    fechaHasta: [''],
    FechadeCaducidad: [''],
    FechadelCaducidad: [''],
    FechadeSacrificio: [''],
    FechadelSacrificio: ['']
  });

  constructor(
    private fb: FormBuilder,
    private tramite221601Store: Tramite221601Store,
    private tramite221601Query: Tramite221601Query,
    private consultaioQuery: ConsultaioQuery,
    private validacionesService: ValidacionesFormularioService, 
    private service: ZoosanitarioService 
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarCombinacionFormulario();
        })
      )
      .subscribe()
  }

  public toggleContent(): void {
    this.showContent = !this.showContent;
  }

  mostrarColapsable(): void {
    this.plegable = !this.plegable;
  }

  ngOnInit(): void {
    this.inicializarCombinacionFormulario();
    this.cargarRadio();
  }

  // ADD THE MISSING ngOnDestroy METHOD
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  inicializarCombinacionFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormulario()
    }  
  }

  inicializarFormulario(): void {
    this.tramite221601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud221601State;
        })
      )
      .subscribe();

    this.datosSolicitudForm = this.fb.group({
      justificacion: [this.solicitudState.justificacion, Validators.required],
      aduana: [this.solicitudState.aduana],
      oficina: [this.solicitudState.oficina],
      punto: [this.solicitudState.punto],
      guia: [this.solicitudState.guia,[Validators.maxLength(50)]],
      clave: [this.solicitudState.clave,[Validators.required, Validators.maxLength(15)]],
      establecimiento: [this.solicitudState.establecimiento, Validators.required],
      regimen: [this.solicitudState.regimen, Validators.required],
      veterinario: [this.solicitudState.veterinario, Validators.required, Validators.maxLength(50)],
      capturaMercancia: [this.solicitudState.capturaMercancia, Validators.required]
    });

    this.datosSolicitudForm.get('punto')?.disable();
    this.datosSolicitudForm.get('aduana')?.disable();
    this.datosSolicitudForm.get('oficina')?.disable();
    this.datosSolicitudForm.get('aduana')?.setValue(realizar.formData.aduana);
    this.datosSolicitudForm.get('oficina')?.setValue(realizar.formData.oficina);
    this.datosSolicitudForm.get('punto')?.setValue(realizar.formData.punto);
    this.datosSolicitudForm.get('capturaMercancia')?.setValue(this.valorSeleccionado);
    this.updateStoreWithFormData();
  }

  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.datosSolicitudForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.datosSolicitudForm.enable();
    }
  }

  cargarRadio(): void {
    this.service.obtenerRadiooption()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        this.tipoPersonaOptions = resp;
      });
  }

  updateStoreWithFormData(): void {
    const UPDATED_FORM_DATA: Solicitud221601State = {
      ...this.solicitudState,
      aduana: this.datosSolicitudForm.get('aduana')?.value,
      oficina: this.datosSolicitudForm.get('oficina')?.value,
      punto: this.datosSolicitudForm.get('punto')?.value,     
      capturaMercancia: this.datosSolicitudForm.get('capturaMercancia')?.value,   
    };
    this.tramite221601Store.update(UPDATED_FORM_DATA);
  }

  public inputChecked(checkBoxName: string): void {
    if (checkBoxName === 'fisica') {
      this.fisica = true;
      this.moral = false;
    } else {
      this.fisica = false;
      this.moral = true;
    }
  }

  cambiarRadioFisica(value: string | number): void {
    const VALOR_SELECCIONADO = value as string;
    this.inputChecked(VALOR_SELECCIONADO);
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  // KEEP ONLY ONE VERSION of cambioFechaFinal
  cambioFechaFinal(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      fechaCaducidad: nuevoValor
    });
    this.tramite221601Store.setFecha(nuevoValor);

    let seleccionada: Date | null = null;
    if (nuevoValor && nuevoValor.includes('/')) {
      const [DAY, MONTH, YEAR] = nuevoValor.split('/').map(Number);
      seleccionada = new Date(YEAR, MONTH - 1, DAY);
    } else {
      seleccionada = new Date(nuevoValor); 
    }

    const HOY = new Date();
    HOY.setHours(0, 0, 0, 0);

    if (seleccionada && seleccionada > HOY) {
      this.fechaFuturaSeleccionada = true;
      this.mercanciaForm.get('fechaCaducidad')?.setErrors({ futureDate: true });
    } else {
      this.fechaFuturaSeleccionada = false;
      this.mercanciaForm.get('fechaCaducidad')?.setErrors(null);
    }
  }

  abrirDialogoMercancias(): void {
    if (this.modalElement) {
      const MODAL_INSTANCE = new Modal(this.modalElement.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  cambioValorRadio(nombreControl: string, valor: string): void {
    this.datosSolicitudForm.patchValue({
      [nombreControl]: valor,
    });
    this.valorSeleccionado = valor;
  }

  cancelarDestinatario(): void {
    this.showtercerosModal = !this.showtercerosModal;
  }

  tercerosAgregar(): void {
    this.showtercerosModal = !this.showtercerosModal;
  }

  // Add the missing cerrarModal method
  cerrarModal(): void {
    this.showtercerosModal = false;
    this.resetMercanciaForm();
  }

  // Method for main mercancia table selection
  onMercanciaSelectionChange(selectedItems: Mercancias[]): void {
    this.selectedMercanciaRecords = selectedItems;
  }

  // Method for mercancia detalle table selection
  onMercanciaDelLateSelectionChange(selectedItems: MercanciaDellate[]): void {
    this.selectedMercanciaDelLateRecords = selectedItems;
  }

  // Method to delete records - update to use the correct array
  eliminarDetalle(): void {
    if (!this.selectedMercanciaDelLateRecords || this.selectedMercanciaDelLateRecords.length === 0) {
      this.mostrarNotificacionMercancia(
        'Selecciona un registro.',
        false
      );
      return;
    }

    this.mostrarNotificacionMercancia(
      '¿Estás seguro que deseas eliminar los registros marcados?',
      true
    );
  }

  private realizarEliminacionMercancia(): void {
    this.mercanciasdellate = this.mercanciasdellate.filter(record => 
      !this.selectedMercanciaDelLateRecords.includes(record)
    );
    
    this.selectedMercanciaDelLateRecords = [];
  }

  private mostrarNotificacionMercancia(mensaje: string, mostrarCancelar: boolean = false): void {
    this.notificacionMercancia = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: mensaje,
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: mostrarCancelar ? 'Cancelar' : '',
    };
    
    if (mostrarCancelar) {
      this.confirmacionAlertaMercancia = true;
    } else {
      this.mostrarAlertaMercancia = true;
    }
  }

  onConfirmacionMercancia(confirmar: boolean): void {
    this.confirmacionAlertaMercancia = false;
    
    if (confirmar) {
      this.realizarEliminacionMercancia();
    }
  }

  onAlertaMercancia() : void {
    this.mostrarAlertaMercancia = false;
  }

 
  guardarMercancia(event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    const GET_VALUE = (control: string, fallback: string) =>
      this.mercanciaForm.get(control)?.value || fallback;

    const GET_DISPLAY_FIELDS = () => ({
      numeroLote: GET_VALUE('numeroLote', `AUTO-${Date.now()}`),
      fechaElaboracion: GET_VALUE('fechaElaboracion', '10/09/2025'),
      fechaProduccion: GET_VALUE('fechaProduccion', '11/09/2025'),
      fechaCaducidad: GET_VALUE('fechaCaducidad', '18/09/2025'),
      fechaFinElaboracion: GET_VALUE('fechaHasta', ''),
      fechaFinProduccion: GET_VALUE('FechadelSacrificio', ''),
      fechaFinCaducidad: GET_VALUE('FechadelCaducidad', ''),
    });

    const GET_INTERFACE_FIELDS = () => ({
      noPartida: GET_VALUE('numeroLote', `AUTO-${Date.now()}`),
      fechaDesde: GET_VALUE('fechaDesde', '10/09/2025'),
      FechadeSacrificio: GET_VALUE('FechadeSacrificio', '11/09/2025'),
      FechadeCaducidad: GET_VALUE('FechadeCaducidad', '18/09/2025'),
      FechadefinElaboracion: GET_VALUE('fechaHasta', '12/09/2025'),
      FechafindeSacrificio: GET_VALUE('FechadelSacrificio', '14/09/2025'),
      FechafindeCaducidad: GET_VALUE('FechadelCaducidad', '20/09/2025'),
    });

    const GET_FORM_FIELDS = () => ({
      paisOrigen: GET_VALUE('paisOrigen', 'Default Country'),
      regulacion: GET_VALUE('regulacion', 'Default Regulation'),
      nombreProducto: GET_VALUE('nombreProducto', 'Default Product'),
      fraccionArancelaria: GET_VALUE('fracciónArancelaria', 'Default Fraction'),
      nico: GET_VALUE('nico', 'Default NICO'),
      especie: GET_VALUE('especie', 'Default Species'),
      uso: GET_VALUE('edadAnimal', 'Default Use'),
      paisOrigenDetalle: GET_VALUE('paisOrigen1', 'Default Origin'),
      paisProcedencia: GET_VALUE('paisdeprocedencia', 'Default Procedure'),
    });

    const NUEVA_MERCANCIA: MercanciaDellate = {
      ...GET_DISPLAY_FIELDS(),
      ...GET_INTERFACE_FIELDS(),
      ...GET_FORM_FIELDS(),
    };

    try {
      this.mercanciasdellate = [...this.mercanciasdellate, NUEVA_MERCANCIA];
      this.resetMercanciaForm();
      
      this.mostrarNotificacionMercancia(
        'Detalle agregado correctamente.',
        false
      );
    } catch (error) {
      console.error('Error al agregar mercancía:', error);
      this.mostrarNotificacionMercancia(
        'Error al agregar el detalle. Por favor, intenta nuevamente.',
        false
      );
    }
  }

  // Test methods for debugging
//   testAddRecord(): void {
//     const testRecord = {
//       numeroLote: 'TEST-' + Date.now(),
//       fechaElaboracion: '10/09/2025',
//       fechaProduccion: '11/09/2025',
//       fechaCaducidad: '18/09/2025',
//       fechaFinElaboracion: '12/09/2025',
//       fechaFinProduccion: '14/09/2025',
//       fechaFinCaducidad: '20/09/2025',
//       noPartida: 'TEST-' + Date.now(),
//       fechaDesde: '10/09/2025',
//       FechadeSacrificio: '11/09/2025',
//       FechadeCaducidad: '18/09/2025',
//       fechaHasta: '12/09/2025',
//       FechadelSacrificio: '14/09/2025',
//       FechadelCaducidad: '20/09/2025',
//       paisOrigen: 'Test Country',
//       regulacion: 'Test Regulation',
//       nombreProducto: 'Test Product',
//       fraccionArancelaria: '12345',
//       nico: 'TEST-NICO',
//       especie: 'Test Species',
//       uso: 'Test Use',
//       paisOrigenDetalle: 'Test Origin',
//       paisProcedencia: 'Test Procedure'
//     };
    
// this.mercanciasdellate = [...this.mercanciasdellate, testRecord];
// }

//   testAddMinimalRecord(): void {
//     const minimalRecord = {
//       numeroLote: 'MINIMAL-' + Date.now(),
//       fechaElaboracion: '10/09/2025',
//       fechaProduccion: '11/09/2025',
//       fechaCaducidad: '18/09/2025',
//       fechaFinElaboracion: '',
//       fechaFinProduccion: '',
//       fechaFinCaducidad: '',
     
//       noPartida: 'MINIMAL-' + Date.now(),
//       fechaDesde: '10/09/2025',
//       FechadeSacrificio: '11/09/2025',
//       FechadeCaducidad: '18/09/2025',
//       fechaHasta: '',
//       FechadelSacrificio: '',
//       FechadelCaducidad: ''
//     };
// }

  clearAllRecords(): void {
    this.mercanciasdellate = [];
   
  }

  private resetMercanciaForm(): void {
    this.mercanciaForm.reset();
    this.mercanciaForm.patchValue({
      rangoFecha: 'No',
      tipoPersona: 'fisica'
    });
    
    this.mostrarRangoFechas = false;
    this.opcionSiSeleccionada = false;
  }

  cambiarOpcionRangoFecha(valor: string): void {
    this.mercanciaForm.patchValue({
      rangoFecha: valor
    });
    
    if (valor === 'No') {
      this.mostrarRangoFechas = true;
      this.opcionSiSeleccionada = false;
    } else if (valor === 'Si') {
      this.mostrarRangoFechas = false;
      this.opcionSiSeleccionada = true;
    }
  }

  cambioFechaDesde(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      fechaDesde: nuevoValor
    });
  }

  cambioFechaHasta(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      fechaHasta: nuevoValor
    });
  }

  cambioFechadeSacrificio(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      FechadeSacrificio: nuevoValor
    });
  }

  cambioFechadelSacrificio(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      FechadelSacrificio: nuevoValor
    });
  }

  cambioFechadeCaducidad(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      FechadeCaducidad: nuevoValor
    });
  }

  cambioFechadelCaducidad(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      FechadelCaducidad: nuevoValor
    });
  }

  cambioFechaElaboracion(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      fechaElaboracion: nuevoValor
    });
  }

  cambioFechaProduccion(nuevoValor: string): void {
    this.mercanciaForm.patchValue({
      fechaProduccion: nuevoValor
    });
  }
}