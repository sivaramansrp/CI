import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
  Notificacion, 
  NotificacionesComponent
} from '@libs/shared/data-access-user/src';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Exportador,
  MENSAJE_TABLA_OBLIGATORIA,
  PreOperativo,
} from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';

import { CONFIGURATION_TABLA_DATOS, CONFIGURATION_TABLA_DESTINATARIO } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';
import { Destinatario } from '@libs/shared/data-access-user/src/core/models/221601/zoosanitario.model';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  Solicitud221601State,
  Tramite221601Store
} from '../../../../estados/tramites/tramite221601.store';
import {
  Subject,
  map,
  takeUntil
} from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ModalComponent } from '../modal/modal.component';
import { Tramite221601Query } from '../../../../estados/queries/tramite221601.query';
import realizar from '@libs/shared/theme/assets/json/221601/zoosanitario.json';

import { CommonModule } from '@angular/common';
import { ZoosanitarioService } from '../../service/zoosanitario.service';

import Plantatif from '@libs/shared/theme/assets/json/221601/plantatif.json';

@Component({
  selector: 'app-terceros',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent,
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    ModalComponent,
    CommonModule,
    InputRadioComponent,
    NotificacionesComponent
  ],
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss']
})
export class TercerosComponent implements OnInit, OnDestroy {
 
  public paisCatalogo: Catalogo[] = realizar.pais;
  public estadoCatalogo: Catalogo[] = realizar.estado;
  public municipioCatalogo: Catalogo[] = realizar.municipio;
  public coloniaCatalogo: Catalogo[] = realizar.colonia;
  
  
  Plantatif = [Plantatif];
  datosPersonales!: FormGroup;
  tipoPersonaForm!: FormGroup;
  buscarTercerosForm!: FormGroup;
  showtercerosModal = false;
  showBuscarTercerosModal = false;
  showFisicaRow: boolean = false;
  showMoralRow: boolean = false;
  showPlantaRow: boolean = false;
  esFormularioSoloLectura: boolean = false;
  nombreEstablecimientoTif: string = '';
  numeroEstablecimientoTif: string = '';
  exportadorSeleccionado: Exportador[] = [];
  destinatarioSeleccionado: Destinatario[] = [];
   isEditingDestinatario: boolean = false;
  editingDestinatarioIndex: number = -1;
  public mostrarAlertaDestinatario: boolean = false;
  public confirmacionAlertaDestinatario: boolean = false;
  public notificacionDestinatario!: Notificacion;
  private destroyed$ = new Subject<void>();
  private destroyNotifier$: Subject<void> = new Subject();
  tipoPersonaOptions: PreOperativo[] = [];
  public checkbox = TablaSeleccion.CHECKBOX;
  configuracionTabla: ConfiguracionColumna<Exportador>[] = CONFIGURATION_TABLA_DATOS;
  destinatario: Destinatario[] = [];
  configuracionTablaDatos: ConfiguracionColumna<Destinatario>[] = CONFIGURATION_TABLA_DESTINATARIO;
  public solicitudState!: Solicitud221601State;
  TEXTOS: string = MENSAJE_TABLA_OBLIGATORIA;
  exportador: Exportador[] = realizar.exportador;
  public planta = false;
  public fisica = false;
  public moral = false;
  showDeleteConfirmModal = false;

  constructor(
    private fb: FormBuilder,
    private tramite221601Store: Tramite221601Store,
    private tramite221601Query: Tramite221601Query,
    private consultaioQuery: ConsultaioQuery,
    private readonly cdr: ChangeDetectorRef,
    private validacionesService: ValidacionesFormularioService,
    private service: ZoosanitarioService
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarCertificadoFormulario();
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.inicializarCertificadoFormulario();
    this.cargarRadio();
  }

  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  private static phoneValidator(control: import('@angular/forms').AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null;
    }

    const VALUE = control.value.toString();
    const ISVALIDNUMBER = /^\d+$/.test(VALUE);

    if (!ISVALIDNUMBER) {
      return { pattern: true };
    }

    if (VALUE.length > 30) {
      return { maxlength: true };
    }

    return null;
  }

  inicializarFormulario(): void {
    this.tramite221601Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState;
        })
      )
      .subscribe();

    this.tipoPersonaForm = this.fb.group({
      tipoPersona: [this.solicitudState?.tipoPersona || null, Validators.required],
    });

    this.buscarTercerosForm = this.fb.group({
      tipoPersonaBuscar: [null],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      razonSocial: [''],
      correoElectronico: [''],
      pais: [this.paisCatalogo[0].id],
      entidadFederativa: ['']
    });

    this.datosPersonales = this.fb.group({
      nombre: [this.solicitudState?.nombre || '', [Validators.maxLength(200)]],
      primerApellido: [this.solicitudState?.primerApellido || '', [Validators.maxLength(200)]],
      segundoApellido: [this.solicitudState?.segundoApellido || '', [Validators.maxLength(200)]],
      social: [this.solicitudState?.social || '', [Validators.maxLength(250)]],
      pais: [this.solicitudState?.pais || this.paisCatalogo[0].id, Validators.required],
      codigo: [this.solicitudState?.codigo || '', [Validators.minLength(5), Validators.maxLength(5)]],
      estado: [this.solicitudState?.estado || '', Validators.required],
      municipio: [this.solicitudState?.municipio || '', Validators.required],
      colonia: [this.solicitudState?.colonia || ''],
      calle: [this.solicitudState?.calle || '', [Validators.required, Validators.maxLength(100)]],
      exterior: [this.solicitudState?.exterior || '', [Validators.required, Validators.maxLength(55)]],
      interior: [this.solicitudState?.interior || '', [Validators.maxLength(55)]],
      lada: [this.solicitudState?.lada || '', [TercerosComponent.phoneValidator, Validators.maxLength(5)]],
      telefono: [this.solicitudState?.telefono || '', [TercerosComponent.phoneValidator, Validators.maxLength(30)]],
      correoElectronico: [this.solicitudState?.correoElectronico || '', [Validators.required, Validators.email]],
      tif: [this.solicitudState?.tif || ''],
    });

    this.tipoPersonaForm.get('tipoPersona')?.valueChanges.subscribe(value => {
      this.handleTipoPersonaChange(value);
      this.updateConditionalValidators(value);
      this.resetRadioStates();
      this.inputChecked(value);
    });
    
    this.resetRadioStates();
    this.updateStoreWithFormData();
  }
  tercerosAgregar(): void {
    this.isEditingDestinatario = false;
    this.editingDestinatarioIndex = -1;
    this.limpiarDatosFormulario();
    this.tipoPersonaForm.reset();
    this.resetRadioStates();
    this.showFisicaRow = false;
    this.showMoralRow = false;
    this.showPlantaRow = false;
    this.showtercerosModal = true;
  }

  eliminarDestinatario(): void {
 if (!this.destinatarioSeleccionado || this.destinatarioSeleccionado.length === 0) {
      this.mostrarNotificacionDestinatario(
        'Selecciona un registro.',
        false
      );
      return;
    }

    this.mostrarNotificacionDestinatario(
      '¿Estás seguro que deseas eliminar los registros marcados?',
      true
    );
  }
  private mostrarNotificacionDestinatario(mensaje: string, mostrarCancelar: boolean = false): void {
    this.notificacionDestinatario = {
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
      this.confirmacionAlertaDestinatario = true;
    } else {
      this.mostrarAlertaDestinatario = true;
    }
  }
  onConfirmacionDestinatario(confirmar: boolean): void {
    this.confirmacionAlertaDestinatario = false;
    
    if (confirmar) {
      this.realizarEliminacionDestinatario();
    }
  }

  onAlertaDestinatario(): void {
    this.mostrarAlertaDestinatario = false;
  }
 private realizarEliminacionDestinatario(): void {
    this.destinatario = this.destinatario.filter(record => 
      !this.destinatarioSeleccionado.includes(record)
    );
    
    this.destinatarioSeleccionado = [];
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    
    this.mostrarNotificacionDestinatario(
      'Destinatario eliminado correctamente.',
      false
    );
  }

  cancelarDestinatario(): void {
    this.isEditingDestinatario = false;
    this.editingDestinatarioIndex = -1;
    this.destinatarioSeleccionado = [];
    this.limpiarDatosFormulario();
    this.tipoPersonaForm.reset();
    this.resetRadioStates();
    this.showtercerosModal = false;
  }

  modificarDestinatario(): void {
    if (this.destinatarioSeleccionado.length === 0) {
      this.mostrarNotificacionDestinatario('Por favor selecciona un destinatario para modificar.');
      return;
    }

    const DESTINATARIO_A_MODIFICAR = this.destinatarioSeleccionado[0];
    this.editingDestinatarioIndex = this.destinatario.findIndex(dest => 
      dest.nombreDenominacionORazonSocial === DESTINATARIO_A_MODIFICAR.nombreDenominacionORazonSocial &&
      dest.correoElectronico === DESTINATARIO_A_MODIFICAR.correoElectronico &&
      dest.telefono === DESTINATARIO_A_MODIFICAR.telefono
    );

    if (this.editingDestinatarioIndex === -1) {
      this.mostrarNotificacionDestinatario('No se pudo encontrar el destinatario seleccionado.');
      return;
    }
    this.isEditingDestinatario = true;
    this.cargarDatosDestinatarioParaEdicion(DESTINATARIO_A_MODIFICAR);
    this.showtercerosModal = true;
  }

  private cargarDatosDestinatarioParaEdicion(destinatario: Destinatario): void {
 const TIPO_PERSONA = this.determinarTipoPersona(destinatario.nombreDenominacionORazonSocial);
     this.tipoPersonaForm.patchValue({
      tipoPersona: TIPO_PERSONA
    });

    this.inputChecked(TIPO_PERSONA);
    this.handleTipoPersonaChange(TIPO_PERSONA);

    const TELEFONO_PARTS = destinatario.telefono ? destinatario.telefono.split('-') : ['', ''];
    const LADA = TELEFONO_PARTS.length > 1 ? TELEFONO_PARTS[0] : '';
    const TELEFONO = TELEFONO_PARTS.length > 1 ? TELEFONO_PARTS[1] : TELEFONO_PARTS[0];

    const PAIS_ID = this.paisCatalogo.find((p: Catalogo) => p.descripcion === destinatario.pais)?.id || this.paisCatalogo[0].id;
    const ESTADO_ID = this.estadoCatalogo.find((e: Catalogo) => e.descripcion === destinatario.entidadFederativa)?.id || '';
    const MUNICIPIO_ID = this.municipioCatalogo.find((m: Catalogo) => m.descripcion === destinatario.municipioOAlcaldia)?.id || '';
    const COLONIA_ID = this.coloniaCatalogo.find((c: Catalogo) => c.descripcion === destinatario.colonia)?.id || '';

    if (TIPO_PERSONA === 'fisica') {
      const NOMBRES = this.parsearNombreCompleto(destinatario.nombreDenominacionORazonSocial);
      this.datosPersonales.patchValue({
        nombre: NOMBRES.nombre,
        primerApellido: NOMBRES.primerApellido,
        segundoApellido: NOMBRES.segundoApellido,
        social: '',
        pais: PAIS_ID,
        codigo: destinatario.codigoPostal,
        estado: ESTADO_ID,
        municipio: MUNICIPIO_ID,
        colonia: COLONIA_ID,
        calle: destinatario.calle,
        exterior: destinatario.numeroExterior,
        interior: destinatario.numeroInterior,
        lada: LADA,
        telefono: TELEFONO,
        correoElectronico: destinatario.correoElectronico,
        tif: ''
      });
    } else {
      this.datosPersonales.patchValue({
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        social: destinatario.nombreDenominacionORazonSocial,
        pais: PAIS_ID,
        codigo: destinatario.codigoPostal,
        estado: ESTADO_ID,
        municipio: MUNICIPIO_ID,
        colonia: COLONIA_ID,
        calle: destinatario.calle,
        exterior: destinatario.numeroExterior,
        interior: destinatario.numeroInterior,
        lada: LADA,
        telefono: TELEFONO,
        correoElectronico: destinatario.correoElectronico,
        tif: ''
      });
    }

    this.datosPersonales.markAsPristine();
    this.datosPersonales.markAsUntouched();
    this.tipoPersonaForm.markAsPristine();
    this.tipoPersonaForm.markAsUntouched();
  
  }

  private determinarTipoPersona(nombreCompleto: string): string {
    const PALABRAS = nombreCompleto.trim().split(' ').filter(palabra => palabra.length > 0);
    return PALABRAS.length >= 2 ? 'fisica' : 'moral';
  }

  private parsearNombreCompleto(nombreCompleto: string): {nombre: string, primerApellido: string, segundoApellido: string} {
    const PARTES = nombreCompleto.trim().split(' ').filter(parte => parte.length > 0);
    
    return {
      nombre: PARTES[0] || '',
      primerApellido: PARTES[1] || '',
      segundoApellido: PARTES.slice(2).join(' ') || ''
    };
  }

  guardarDestinatario(): void {
    if (!this.tipoPersonaForm.get('tipoPersona')?.value) {
   this.mostrarNotificacionDestinatario('Por favor selecciona el tipo de persona.');
      return;
    }
   const TIPO_PERSONA = this.tipoPersonaForm.get('tipoPersona')?.value;
   this.updateConditionalValidators(TIPO_PERSONA);
   setTimeout(() => {
      Object.keys(this.datosPersonales.controls).forEach(key => {
        const CONTROL = this.datosPersonales.get(key);
        if (CONTROL?.invalid) {

        }
      });

      if (this.tipoPersonaForm.invalid || this.datosPersonales.invalid) {
        this.tipoPersonaForm.markAllAsTouched();
        this.datosPersonales.markAllAsTouched();
        this.mostrarNotificacionDestinatario('Por favor completa todos los campos requeridos correctamente.');
        return;
      }

      this.procesarGuardadoDestinatario();
    }, 100);
  }

  private procesarGuardadoDestinatario(): void {
    const FORM_VALUE = this.datosPersonales.value;
    const TIPO_PERSONA = this.tipoPersonaForm.get('tipoPersona')?.value;
    const PAIS_SELECCIONADO = this.paisCatalogo.find((item: Catalogo) => item.id === Number(FORM_VALUE.pais));
    const ESTADO_SELECCIONADO = this.estadoCatalogo.find((item: Catalogo) => item.id === Number(FORM_VALUE.estado));
    const MUNICIPIO_SELECCIONADO = this.municipioCatalogo.find((item: Catalogo) => item.id === Number(FORM_VALUE.municipio));
    const COLONIA_SELECCIONADA = this.coloniaCatalogo.find((item: Catalogo) => item.id === Number(FORM_VALUE.colonia));
     const NOMBRE_COMPLETO = TercerosComponent.obtenerNombreCompleto(FORM_VALUE, TIPO_PERSONA);
    const DOMICILIO_COMPLETO = TercerosComponent.obtenerDomicilioCompleto(FORM_VALUE, COLONIA_SELECCIONADA, MUNICIPIO_SELECCIONADO, ESTADO_SELECCIONADO);
    const DESTINATARIO_DATA: Destinatario = {
      nombreDenominacionORazonSocial: NOMBRE_COMPLETO,
      telefono: FORM_VALUE.lada && FORM_VALUE.telefono ? `${FORM_VALUE.lada}-${FORM_VALUE.telefono}` : (FORM_VALUE.telefono || ''),
      correoElectronico: FORM_VALUE.correoElectronico || '',
      domicilio: DOMICILIO_COMPLETO,
      calle: FORM_VALUE.calle || '',
      numeroExterior: FORM_VALUE.exterior || '',
      numeroInterior: FORM_VALUE.interior || '',
      pais: PAIS_SELECCIONADO?.descripcion || '',
      colonia: COLONIA_SELECCIONADA?.descripcion || '',
      municipioOAlcaldia: MUNICIPIO_SELECCIONADO?.descripcion || '',
      entidadFederativa: ESTADO_SELECCIONADO?.descripcion || '',
      codigoPostal: FORM_VALUE.codigo || ''
    };

   if (this.isEditingDestinatario && this.editingDestinatarioIndex !== -1) {
      const NUEVO_ARRAY = [...this.destinatario];
      NUEVO_ARRAY[this.editingDestinatarioIndex] = DESTINATARIO_DATA;
      this.destinatario = NUEVO_ARRAY;
  } else {
    
      this.destinatario = [...this.destinatario, DESTINATARIO_DATA];
   }
    this.isEditingDestinatario = false;
    this.editingDestinatarioIndex = -1;
    this.destinatarioSeleccionado = [];
    
    this.limpiarDatosFormulario();
    this.tipoPersonaForm.reset();
    this.resetRadioStates();
    this.showtercerosModal = false;
    
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    
    console.log('Lista actualizada de destinatarios:', this.destinatario);
    console.log('=== GUARDADO COMPLETADO ===');
  }

  private updateConditionalValidators(tipoPersona: string): void {
    console.log('Actualizando validadores para tipo:', tipoPersona);
    
    const NOMBRECONTROL = this.datosPersonales.get('nombre');
    const PRIMERAPELLIDOCONTROL = this.datosPersonales.get('primerApellido');
    const SOCIALCONTROL = this.datosPersonales.get('social');
    const CALLECONTROL = this.datosPersonales.get('calle');
    const EXTERIORCONTROL = this.datosPersonales.get('exterior');
    const CORREOCONTROL = this.datosPersonales.get('correoElectronico');
    const ESTADOCONTROL = this.datosPersonales.get('estado');
    const PAISCONTROL = this.datosPersonales.get('pais');
    const MUNICIPIOCONTROL = this.datosPersonales.get('municipio');

    NOMBRECONTROL?.clearValidators();
    PRIMERAPELLIDOCONTROL?.clearValidators();
    SOCIALCONTROL?.clearValidators();
    CALLECONTROL?.clearValidators();
    EXTERIORCONTROL?.clearValidators();
    CORREOCONTROL?.clearValidators();
    ESTADOCONTROL?.clearValidators();
    PAISCONTROL?.clearValidators();
    MUNICIPIOCONTROL?.clearValidators();

    if (tipoPersona === 'fisica') {
      console.log('Aplicando validadores para persona física');
      NOMBRECONTROL?.setValidators([Validators.required, Validators.maxLength(200)]);
      PRIMERAPELLIDOCONTROL?.setValidators([Validators.required, Validators.maxLength(200)]);
      SOCIALCONTROL?.setValidators([Validators.maxLength(250)]);
    } else if (tipoPersona === 'moral' || tipoPersona === 'planta') {
      console.log('Aplicando validadores para persona moral/planta');
      SOCIALCONTROL?.setValidators([Validators.required, Validators.maxLength(250)]);
      NOMBRECONTROL?.setValidators([Validators.maxLength(200)]);
      PRIMERAPELLIDOCONTROL?.setValidators([Validators.maxLength(200)]);
    }

    // Common validators (always required)
    CALLECONTROL?.setValidators([Validators.required, Validators.maxLength(100)]);
    EXTERIORCONTROL?.setValidators([Validators.required, Validators.maxLength(55)]);
    CORREOCONTROL?.setValidators([Validators.required, Validators.email]);
    ESTADOCONTROL?.setValidators([Validators.required]);
    PAISCONTROL?.setValidators([Validators.required]);
    MUNICIPIOCONTROL?.setValidators([Validators.required]);

    // Update validity for all controls
    NOMBRECONTROL?.updateValueAndValidity();
    PRIMERAPELLIDOCONTROL?.updateValueAndValidity();
    SOCIALCONTROL?.updateValueAndValidity();
    CALLECONTROL?.updateValueAndValidity();
    EXTERIORCONTROL?.updateValueAndValidity();
    CORREOCONTROL?.updateValueAndValidity();
    ESTADOCONTROL?.updateValueAndValidity();
    PAISCONTROL?.updateValueAndValidity();
    MUNICIPIOCONTROL?.updateValueAndValidity();

    console.log('Validadores actualizados');
  }

  private resetRadioStates(): void {
    this.fisica = false;
    this.moral = false;
    this.planta = false;
  }

  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.tipoPersonaForm.disable();
      this.datosPersonales.disable();
    } else {
      this.tipoPersonaForm.enable();
      this.datosPersonales.enable();
    }
  }

  updateStoreWithFormData(): void {
    const UPDATE_PERSONALES_FORM: Solicitud221601State = {
      ...this.solicitudState,
      pais: this.datosPersonales.get('pais')?.value,
    };
    this.tramite221601Store.update(UPDATE_PERSONALES_FORM);
  }

  handleTipoPersonaChange(tipoPersona: string): void {
    this.showFisicaRow = false;
    this.showMoralRow = false;
    this.showPlantaRow = false;
    
    if (tipoPersona === 'fisica') {
      this.showFisicaRow = true;
      this.datosPersonales.enable();
    } else if (tipoPersona === 'moral') {
      this.showMoralRow = true;
      this.datosPersonales.enable();
    } else if (tipoPersona === 'planta') {
      this.showPlantaRow = true;
      this.showMoralRow = true;
      this.datosPersonales.disable();
    }
  }

  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  onExportadorSeleccionado(filas: Exportador[]): void {
    this.exportadorSeleccionado = filas;
  }

  onDestinatarioSeleccionado(filas: Destinatario[]): void {
    console.log('Destinatarios seleccionados:', filas);
    this.destinatarioSeleccionado = [...filas];
    this.cdr.detectChanges();
  }

  public inputChecked(checkBoxName: string): void {
    console.log('Input checked called with:', checkBoxName);
    this.resetRadioStates();
    
    if (checkBoxName === 'fisica') {
      this.fisica = true;
    } else if (checkBoxName === 'moral') {
      this.moral = true;
    } else if (checkBoxName === 'planta') {
      this.planta = true;
    }
    
    this.tipoPersonaForm.get('tipoPersona')?.setValue(checkBoxName, { emitEvent: false });
    this.updateConditionalValidators(checkBoxName);
    this.handleTipoPersonaChange(checkBoxName);
  }

  cambiarRadioFisica(value: string | number): void {
    const VALOR_SELECCIONADO = value as string;
    this.inputChecked(VALOR_SELECCIONADO);
    this.handleTipoPersonaChange(VALOR_SELECCIONADO);
  }

  cancelarEliminacion(): void {
    this.showDeleteConfirmModal = false;
  }

  limpiarBusquedaTif(): void {
    this.nombreEstablecimientoTif = '';
    this.numeroEstablecimientoTif = '';
  }

  abrirBuscarTercerosModal(): void {
    this.showBuscarTercerosModal = true;
    this.buscarTercerosForm.reset({
      tipoPersonaBuscar: null,
      pais: this.paisCatalogo[0].id,
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      razonSocial: '',
      correoElectronico: '',
      entidadFederativa: ''
    });
  }

  cerrarBuscarTercerosModal(): void {
    this.showBuscarTercerosModal = false;
  }

  limpiarBuscarTerceros(): void {
    this.buscarTercerosForm.reset({
      tipoPersonaBuscar: null,
      pais: this.paisCatalogo[0].id,
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      razonSocial: '',
      correoElectronico: '',
      entidadFederativa: ''
    });
  }

  cargarRadio(): void {
    this.service.obtenerRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tipoPersonaOptions = resp;
      });
  }

  onNumericInput(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const VALUE = INPUT.value;
    const NUMERICVALUE = VALUE.replace(/[^0-9]/g, '');

    if (VALUE !== NUMERICVALUE) {
      INPUT.value = NUMERICVALUE;
      const CONTROLNAME = INPUT.getAttribute('formControlName');
      if (CONTROLNAME) {
        this.datosPersonales.get(CONTROLNAME)?.setValue(NUMERICVALUE);
        this.datosPersonales.get(CONTROLNAME)?.markAsTouched();
        this.datosPersonales.get(CONTROLNAME)?.updateValueAndValidity();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  limpiarDatosFormulario(): void {
    this.datosPersonales.reset({
      nombre: '',
      primerApellido: '',
      segundoApellido: '',
      social: '',
      pais: this.paisCatalogo[0].id,
      codigo: '',
      estado: '',
      municipio: '',
      colonia: '',
      calle: '',
      exterior: '',
      interior: '',
      lada: '',
      telefono: '',
      correoElectronico: '',
      tif: ''
    });
    
    this.datosPersonales.markAsUntouched();
    this.datosPersonales.markAsPristine();
  }

  private static obtenerNombreCompleto(formValue: any, tipoPersona: string): string {
    if (tipoPersona === 'fisica') {
      const NOMBRE = formValue.nombre || '';
      const PRIMER_APELLIDO = formValue.primerApellido || '';
      const SEGUNDO_APELLIDO = formValue.segundoApellido || '';
      
      return `${NOMBRE} ${PRIMER_APELLIDO} ${SEGUNDO_APELLIDO}`.trim();
    } else {
      return formValue.social || '';
    }
  }

  private static obtenerDomicilioCompleto(
    formValue: any, 
    colonia: Catalogo | undefined, 
    municipio: Catalogo | undefined, 
    estado: Catalogo | undefined
  ): string {
    const PARTES_DOMICILIO = [
      formValue.calle,
      formValue.exterior ? `#${formValue.exterior}` : '',
      formValue.interior ? `Int. ${formValue.interior}` : '',
      colonia?.descripcion,
      municipio?.descripcion,
      estado?.descripcion,
      formValue.codigo
    ].filter(parte => parte && parte.trim() !== '');

    return PARTES_DOMICILIO.join(', ');
  }
}