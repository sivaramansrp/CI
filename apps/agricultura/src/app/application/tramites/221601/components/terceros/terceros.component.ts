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
  NotificacionesComponent // Add these imports
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

/**
 * Componente para la gestión de terceros en el trámite 221601 de zoosanitario.
 * Permite registrar, buscar y administrar datos de personas físicas, morales y plantas TIF.
 * 
 * @description Este componente maneja toda la funcionalidad relacionada con terceros,
 * incluyendo formularios de datos personales, búsqueda de terceros existentes,
 * gestión de destinatarios y exportadores.
 * 
 * @example
 * ```html
 * <app-terceros></app-terceros>
 * ```
 * 
 * @author Equipo de desarrollo VUCEM
 * @version 1.0.0
 * @since 2025
 */
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
    NotificacionesComponent // Add this import
  ],
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.scss']
})
export class TercerosComponent implements OnInit, OnDestroy {

  /**
   * property destroyed$
   * description Sujeto para manejar la destrucción de suscripciones.
   */
  private destroyed$ = new Subject<void>();

  /**
   * property tipoPersonaOptions
   * description Opciones para el tipo de persona (física o moral).
   */
  tipoPersonaOptions: PreOperativo[] = [];

   /**
   * Opciones para el radio de tipo de persona.
   * Utiliza los datos predefinidos en `Plantatif`.
   *
   * @description Este arreglo almacena las opciones para el selector de tipo de persona.
   */
  Plantatif = [Plantatif];

  /** 
   * Formulario reactivo para datos personales del tercero.
   * Contiene todos los campos necesarios para registrar información personal.
   * @type {FormGroup}
   */
  datosPersonales!: FormGroup;

  /** 
   * Formulario para seleccionar el tipo de persona (física, moral, planta).
   * @type {FormGroup}
   */
  tipoPersonaForm!: FormGroup;

  /** 
   * Formulario para búsqueda de terceros existentes.
   * @type {FormGroup}
   */
  buscarTercerosForm!: FormGroup;

  /** 
   * Control de visibilidad del modal de terceros.
   * @type {boolean}
   * @default false
   */
  showtercerosModal = false;

  /** 
   * Control de visibilidad del modal de búsqueda de terceros.
   * @type {boolean}
   * @default false
   */
  showBuscarTercerosModal = false;

  /** 
   * Catálogo de países disponibles para selección.
   * @type {Catalogo[]}
   */
  public paisCatalogo: Catalogo[] = realizar.pais;

  /** 
   * Catálogo de estados/entidades federativas disponibles.
   * @type {Catalogo[]}
   */
  public estadoCatalogo: Catalogo[] = realizar.estado;

  /** 
   * Catálogo de municipios disponibles para selección.
   * @type {Catalogo[]}
   */
  public municipioCatalogo: Catalogo[] = realizar.municipio;

  /** 
   * Catálogo de colonias disponibles para selección.
   * @type {Catalogo[]}
   */
  public coloniaCatalogo: Catalogo[] = realizar.colonia;

  /** 
   * Mensaje de texto para tabla obligatoria.
   * @type {string}
   */
  TEXTOS: string = MENSAJE_TABLA_OBLIGATORIA;

  /** 
   * Lista de exportadores disponibles en el sistema.
   * @type {Exportador[]}
   */
  exportador: Exportador[] = realizar.exportador;

  /** 
   * Configuración para checkbox en tabla de selección.
   * @type {TablaSeleccion}
   */
  public checkbox = TablaSeleccion.CHECKBOX;

  /** 
   * Configuración de columnas para la tabla de datos de exportadores.
   * @type {ConfiguracionColumna<Exportador>[]}
   */
  configuracionTabla: ConfiguracionColumna<Exportador>[] = CONFIGURATION_TABLA_DATOS;

  /** 
   * Lista de destinatarios registrados.
   * @type {Destinatario[]}
   */
  destinatario: Destinatario[] = [];

  /** 
   * Configuración de columnas para la tabla de destinatarios.
   * @type {ConfiguracionColumna<Destinatario>[]}
   */
  configuracionTablaDatos: ConfiguracionColumna<Destinatario>[] = CONFIGURATION_TABLA_DESTINATARIO;

  /** 
   * Estado actual de la solicitud del trámite 221601.
   * @type {Solicitud221601State}
   */
  public solicitudState!: Solicitud221601State;

  /** 
   * Subject para manejar la destrucción de suscripciones.
   * @type {Subject<void>}
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /** 
   * Control de visibilidad para campos de persona física.
   * @type {boolean}
   * @default true
   */
  showFisicaRow: boolean = true;

  /** 
   * Control de visibilidad para campos de persona moral.
   * @type {boolean}
   * @default true
   */
  showMoralRow: boolean = true;

  /** 
   * Control de visibilidad para campos de planta TIF.
   * @type {boolean}
   * @default false
   */
  showPlantaRow: boolean = false;

  /** 
   * Indica si el formulario debe ser de solo lectura.
   * @type {boolean}
   * @default false
   */
  esFormularioSoloLectura: boolean = false;

  /** 
   * Nombre del establecimiento TIF seleccionado.
   * @type {string}
   * @default ''
   */
  nombreEstablecimientoTif: string = '';

  /** 
   * Número del establecimiento TIF seleccionado.
   * @type {string}
   * @default ''
   */
  numeroEstablecimientoTif: string = '';

  /**
   * Lista de exportadores seleccionados en la tabla.
   * @type {Exportador[]}
   */
  exportadorSeleccionado: Exportador[];

  /**
   * Lista de destinatarios seleccionados en la tabla.
   * @type {Destinatario[]}
   */
  destinatarioSeleccionado: Destinatario[] = [];

  /**
   * Indica si se está editando un destinatario existente.
   * @type {boolean}
   * @default false
   */
  isEditingDestinatario: boolean = false;

  /**
   * Índice del destinatario que se está editando.
   * @type {number}
   * @default -1
   */
  editingDestinatarioIndex: number = -1;

  /**
   * Constructor del componente TercerosComponent.
   * Inicializa los servicios necesarios y configura las suscripciones iniciales.
   * 
   * @param fb - Servicio FormBuilder para crear formularios reactivos
   * @param tramite221601Store - Store para gestión del estado del trámite 221601
   * @param tramite221601Query - Query para consultar el estado del trámite 221601
   * @param consultaioQuery - Query para consultar el estado de consultaio
   * @param cdr - Servicio ChangeDetectorRef para detección de cambios
   * @param validacionesService - Servicio para validaciones de formularios
   */
  constructor(
    private fb: FormBuilder,
    private tramite221601Store: Tramite221601Store,
    private tramite221601Query: Tramite221601Query,
    private consultaioQuery: ConsultaioQuery,
    private readonly cdr: ChangeDetectorRef,
    private validacionesService: ValidacionesFormularioService,
    private service: ZoosanitarioService
  ) {
    this.exportadorSeleccionado = [];
    this.destinatarioSeleccionado = [];
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

  /**
   * Método del ciclo de vida OnInit.
   * Se ejecuta después de la inicialización del componente.
   * Llama a la inicialización del formulario de certificado.
   * 
   * @memberof TercerosComponent
   */
  ngOnInit(): void {
    this.inicializarCertificadoFormulario();
    this.cargarRadio();
  }

  /**
   * Inicializa el formulario de certificado basado en el estado de solo lectura.
   * Determina si debe guardar datos existentes o inicializar formularios nuevos.
   * 
   * @memberof TercerosComponent
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Validador personalizado para números telefónicos
   * @param control - Control del formulario
   * @returns Error de validación o null si es válido
   */
  private static phoneValidator(control: import('@angular/forms').AbstractControl): { [key: string]: boolean } | null {
    if (!control.value) {
      return null; // Campo vacío es válido
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

  /**
   * Inicializa todos los formularios reactivos del componente.
   * Configura el formulario de tipo de persona, búsqueda de terceros y datos personales.
   * Establece validaciones y suscripciones a cambios de valores.
   * 
   * @memberof TercerosComponent
   */
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
      tipoPersona: [this.solicitudState.tipoPersona || null, Validators.required],
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
      nombre: [this.solicitudState.nombre || '', [Validators.maxLength(200)]],
      primerApellido: [this.solicitudState.primerApellido || '', [Validators.maxLength(200)]],
      segundoApellido: [this.solicitudState.segundoApellido || '', [Validators.maxLength(200)]],
      social: [this.solicitudState.social || '', [Validators.maxLength(250)]],
      pais: [this.solicitudState.pais || this.paisCatalogo[0].id, Validators.required],
      codigo: [this.solicitudState.codigo || '', [Validators.minLength(5), Validators.maxLength(5)]],
      estado: [this.solicitudState.estado || '', Validators.required],
      municipio: [this.solicitudState.municipio || '', Validators.required],
      colonia: [this.solicitudState.colonia || ''],
      calle: [this.solicitudState.calle || '', [Validators.required, Validators.maxLength(100)]],
      exterior: [this.solicitudState.exterior || '', [Validators.required, Validators.maxLength(55)]],
      interior: [this.solicitudState.interior || '', [Validators.maxLength(55)]],
      lada: [this.solicitudState.lada || '', [TercerosComponent.phoneValidator, Validators.maxLength(5)]],
      telefono: [this.solicitudState.telefono || '', [TercerosComponent.phoneValidator, Validators.maxLength(30)]],
      correoElectronico: [this.solicitudState.correoElectronico || '', [Validators.required, Validators.email]],
      tif: [this.solicitudState.tif || ''],
    });

    // Set up conditional validators based on person type
    this.tipoPersonaForm.get('tipoPersona')?.valueChanges.subscribe(value => {
      this.handleTipoPersonaChange(value);
      this.updateConditionalValidators(value);
      this.resetRadioStates();
      this.inputChecked(value);
    });
    
    // Initialize with no selection
    this.resetRadioStates();
    this.showFisicaRow = false;
    this.showMoralRow = false;
    this.showPlantaRow = false;
    
    this.updateStoreWithFormData();
  }

  /**
   * Modifica el destinatario seleccionado.
   * Abre el modal con los datos del destinatario para edición.
   * 
   * @memberof TercerosComponent
   */
  modificarDestinatario(): void {
    if (this.destinatarioSeleccionado.length === 0) {
      // Show notification that no item is selected
      this.mostrarNotificacionEliminacion(
        'Por favor selecciona un destinatario para modificar.',
        false
      );
      return;
    }

    const DESTINATARIO_A_MODIFICAR = this.destinatarioSeleccionado[0];
    this.editingDestinatarioIndex = this.destinatario.findIndex(dest => 
      dest.nombreDenominacionORazonSocial === DESTINATARIO_A_MODIFICAR.nombreDenominacionORazonSocial &&
      dest.correoElectronico === DESTINATARIO_A_MODIFICAR.correoElectronico &&
      dest.telefono === DESTINATARIO_A_MODIFICAR.telefono
    );

    if (this.editingDestinatarioIndex === -1) {
      this.mostrarNotificacionEliminacion(
        'No se pudo encontrar el destinatario seleccionado.',
        false
      );
      return;
    }

    console.log('Editando destinatario en índice:', this.editingDestinatarioIndex);
    console.log('Datos del destinatario:', DESTINATARIO_A_MODIFICAR);

    this.isEditingDestinatario = true;
    this.cargarDatosDestinatarioParaEdicion(DESTINATARIO_A_MODIFICAR);
    this.showtercerosModal = true;
  }

  /**
   * Carga los datos del destinatario en el formulario para edición.
   * 
   * @param destinatario - Destinatario a cargar en el formulario
   * @memberof TercerosComponent
   */
  private cargarDatosDestinatarioParaEdicion(destinatario: Destinatario): void {
    console.log('Cargando datos para edición:', destinatario);
    
    // Determine person type based on the name structure
    const TIPO_PERSONA = this.determinarTipoPersona(destinatario.nombreDenominacionORazonSocial);
    
    console.log('Tipo de persona determinado:', TIPO_PERSONA);
    
    // Set person type and trigger change
    this.tipoPersonaForm.patchValue({
      tipoPersona: TIPO_PERSONA
    });

    // Manually trigger the radio change and show appropriate fields
    this.inputChecked(TIPO_PERSONA);
    this.handleTipoPersonaChange(TIPO_PERSONA);

    // Parse phone number
    const TELEFONO_PARTS = destinatario.telefono ? destinatario.telefono.split('-') : ['', ''];
    const LADA = TELEFONO_PARTS.length > 1 ? TELEFONO_PARTS[0] : '';
    const TELEFONO = TELEFONO_PARTS.length > 1 ? TELEFONO_PARTS[1] : TELEFONO_PARTS[0];

    // Find catalog IDs
    const PAIS_ID = this.paisCatalogo.find(p => p.descripcion === destinatario.pais)?.id || this.paisCatalogo[0].id;
    const ESTADO_ID = this.estadoCatalogo.find(e => e.descripcion === destinatario.entidadFederativa)?.id || '';
    const MUNICIPIO_ID = this.municipioCatalogo.find(m => m.descripcion === destinatario.municipioOAlcaldia)?.id || '';
    const COLONIA_ID = this.coloniaCatalogo.find(c => c.descripcion === destinatario.colonia)?.id || '';

    // Set form values based on person type
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

    // Mark the form as pristine and untouched to avoid validation errors
    this.datosPersonales.markAsPristine();
    this.datosPersonales.markAsUntouched();
    this.tipoPersonaForm.markAsPristine();
    this.tipoPersonaForm.markAsUntouched();

    console.log('Formulario cargado con valores:', this.datosPersonales.value);
  }

  /**
   * Guarda un nuevo destinatario basado en los datos del formulario.
   * Crea un objeto destinatario y lo agrega a la lista.
   * Cierra el modal después de guardar.
   * 
   * @memberof TercerosComponent
   */
  guardarDestinatario(): void {
    console.log('Guardando destinatario...');
    console.log('Formulario válido:', this.tipoPersonaForm.valid && this.datosPersonales.valid);
    console.log('Errores tipo persona:', this.tipoPersonaForm.errors);
    console.log('Errores datos personales:', this.datosPersonales.errors);
    
    if (this.tipoPersonaForm.invalid || this.datosPersonales.invalid) {
      this.tipoPersonaForm.markAllAsTouched();
      this.datosPersonales.markAllAsTouched();
      
      console.log('Formulario inválido, no se puede guardar');
      this.mostrarNotificacionEliminacion(
        'Por favor completa todos los campos requeridos correctamente.',
        false
      );
      return;
    }

    const FORM_VALUE = this.datosPersonales.value;
    const TIPO_PERSONA = this.tipoPersonaForm.get('tipoPersona')?.value;
    const PAIS_SELECCIONADO = this.paisCatalogo.find(item => item.id === Number(FORM_VALUE.pais));
    const ESTADO_SELECCIONADO = this.estadoCatalogo.find(item => item.id === Number(FORM_VALUE.estado));
    const MUNICIPIO_SELECCIONADO = this.municipioCatalogo.find(item => item.id === Number(FORM_VALUE.municipio));
    const COLONIA_SELECCIONADA = this.coloniaCatalogo.find(item => item.id === Number(FORM_VALUE.colonia));

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

    console.log('Datos del destinatario a guardar:', DESTINATARIO_DATA);

    if (this.isEditingDestinatario && this.editingDestinatarioIndex !== -1) {
      console.log('Modificando destinatario existente en índice:', this.editingDestinatarioIndex);
      
      // Create a new array with the modified item to ensure change detection
      const NUEVO_ARRAY = [...this.destinatario];
      NUEVO_ARRAY[this.editingDestinatarioIndex] = DESTINATARIO_DATA;
      this.destinatario = NUEVO_ARRAY;
      
      console.log('Destinatario modificado exitosamente');
      this.mostrarNotificacionEliminacion(
        'Destinatario modificado correctamente.',
        false
      );
    } else {
      console.log('Agregando nuevo destinatario');
      this.destinatario = [...this.destinatario, DESTINATARIO_DATA];
      
      console.log('Nuevo destinatario agregado exitosamente');
      this.mostrarNotificacionEliminacion(
        'Destinatario agregado correctamente.',
        false
      );
    }

    // Reset editing state
    this.isEditingDestinatario = false;
    this.editingDestinatarioIndex = -1;
    this.destinatarioSeleccionado = [];
    
    // Close modal and clean forms
    this.limpiarDatosFormulario();
    this.tipoPersonaForm.reset();
    this.resetRadioStates();
    this.showtercerosModal = false;
    
    // Force change detection
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    
    console.log('Lista actualizada de destinatarios:', this.destinatario);
  }

  /**
   * Updates validators based on person type selection
   * @param tipoPersona - Selected person type
   */
  private updateConditionalValidators(tipoPersona: string): void {
    const NOMBRECONTROL = this.datosPersonales.get('nombre');
    const PRIMERAPELLIDOCONTROL = this.datosPersonales.get('primerApellido');
    const SOCIALCONTROL = this.datosPersonales.get('social');
    const CALLECONTROL = this.datosPersonales.get('calle');
    const EXTERIORCONTROL = this.datosPersonales.get('exterior');
    const CORREOCONTROL = this.datosPersonales.get('correoElectronico');
    const ESTADOCONTROL = this.datosPersonales.get('estado');

    // Clear existing validators
    NOMBRECONTROL?.clearValidators();
    PRIMERAPELLIDOCONTROL?.clearValidators();
    SOCIALCONTROL?.clearValidators();

    if (tipoPersona === 'fisica') {
      NOMBRECONTROL?.setValidators([Validators.required, Validators.maxLength(200)]);
      PRIMERAPELLIDOCONTROL?.setValidators([Validators.required, Validators.maxLength(200)]);
      SOCIALCONTROL?.setValidators([Validators.maxLength(250)]);
    } else if (tipoPersona === 'moral' || tipoPersona === 'planta') {
      SOCIALCONTROL?.setValidators([Validators.required, Validators.maxLength(250)]);
      NOMBRECONTROL?.setValidators([Validators.maxLength(200)]);
      PRIMERAPELLIDOCONTROL?.setValidators([Validators.maxLength(200)]);
    }

    // Keep existing validators for other fields
    CALLECONTROL?.setValidators([Validators.required, Validators.maxLength(100)]);
    EXTERIORCONTROL?.setValidators([Validators.required, Validators.maxLength(55)]);
    CORREOCONTROL?.setValidators([Validators.required, Validators.email]);
    ESTADOCONTROL?.setValidators([Validators.required]);

    // Update validity
    NOMBRECONTROL?.updateValueAndValidity();
    PRIMERAPELLIDOCONTROL?.updateValueAndValidity();
    SOCIALCONTROL?.updateValueAndValidity();
    CALLECONTROL?.updateValueAndValidity();
    EXTERIORCONTROL?.updateValueAndValidity();
    CORREOCONTROL?.updateValueAndValidity();
    ESTADOCONTROL?.updateValueAndValidity();
  }

  /**
   * Resets all radio button states
   * @memberof TercerosComponent
   */
  private resetRadioStates(): void {
    this.fisica = false;
    this.moral = false;
    this.planta = false;
  }

  /**
   * Guarda los datos del formulario y configura el estado de solo lectura.
   * Habilita o deshabilita los formularios según el estado de solo lectura.
   * 
   * @memberof TercerosComponent
   */
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

  /**
   * Actualiza el store con los datos del formulario de datos personales.
   * Sincroniza el estado local con el estado global de la aplicación.
   * 
   * @memberof TercerosComponent
   */
  updateStoreWithFormData(): void {
    const UPDATE_PERSONALES_FORM: Solicitud221601State = {
      ...this.solicitudState,
      pais: this.datosPersonales.get('pais')?.value,
    };
    this.tramite221601Store.update(UPDATE_PERSONALES_FORM);
  }

  /**
   * Maneja los cambios en el tipo de persona seleccionado.
   * Controla la visibilidad de los diferentes tipos de formularios y campos.
   * 
   * @param tipoPersona - Tipo de persona seleccionado ('fisica', 'moral', 'planta')
   * @memberof TercerosComponent
   */
  handleTipoPersonaChange(tipoPersona: string): void {
    // Reset all visibility first
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
      this.showMoralRow = true; // Keep this if needed for planta
      this.datosPersonales.disable();
    }
  }

  /**
   * Establece valores en el store utilizando métodos dinámicos.
   * Método genérico para actualizar cualquier campo en el store.
   * 
   * @param form - Formulario del cual obtener el valor
   * @param campo - Nombre del campo a obtener
   * @param metodoNombre - Nombre del método del store a ejecutar
   * @memberof TercerosComponent
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Maneja la selección de exportadores desde la tabla dinámica.
   * Actualiza la lista de exportadores seleccionados.
   * 
   * @param filas - Array de exportadores seleccionados por el usuario
   * @memberof TercerosComponent
   */
  onExportadorSeleccionado(filas: Exportador[]): void {
    this.exportadorSeleccionado = filas;
  }

  /**
   * Maneja la selección de destinatarios desde la tabla dinámica.
   * Actualiza la lista de destinatarios seleccionados.
   * 
   * @param filas - Array de destinatarios seleccionados por el usuario
   * @memberof TercerosComponent
   */
  onDestinatarioSeleccionado(filas: Destinatario[]): void {
    console.log('Destinatarios seleccionados:', filas);
    this.destinatarioSeleccionado = [...filas]; // Create new array reference
    this.cdr.detectChanges();
  }

  /**
   * Modifica el destinatario seleccionado.
   * Abre el modal con los datos del destinatario para edición.
   * 
   * @memberof TercerosComponent
   */
  modificarDestinatario(): void {
    if (this.destinatarioSeleccionado.length === 0) {
      // Show notification that no item is selected
      this.mostrarNotificacionEliminacion(
        'Por favor selecciona un destinatario para modificar.',
        false
      );
      return;
    }

    const DESTINATARIO_A_MODIFICAR = this.destinatarioSeleccionado[0];
    this.editingDestinatarioIndex = this.destinatario.findIndex(dest => 
      dest.nombreDenominacionORazonSocial === DESTINATARIO_A_MODIFICAR.nombreDenominacionORazonSocial &&
      dest.correoElectronico === DESTINATARIO_A_MODIFICAR.correoElectronico &&
      dest.telefono === DESTINATARIO_A_MODIFICAR.telefono
    );

    if (this.editingDestinatarioIndex === -1) {
      this.mostrarNotificacionEliminacion(
        'No se pudo encontrar el destinatario seleccionado.',
        false
      );
      return;
    }

    console.log('Editando destinatario en índice:', this.editingDestinatarioIndex);
    console.log('Datos del destinatario:', DESTINATARIO_A_MODIFICAR);

    this.isEditingDestinatario = true;
    this.cargarDatosDestinatarioParaEdicion(DESTINATARIO_A_MODIFICAR);
    this.showtercerosModal = true;
  }

  /**
   * Carga los datos del destinatario en el formulario para edición.
   * 
   * @param destinatario - Destinatario a cargar en el formulario
   * @memberof TercerosComponent
   */
  private cargarDatosDestinatarioParaEdicion(destinatario: Destinatario): void {
    console.log('Cargando datos para edición:', destinatario);
    
    // Determine person type based on the name structure
    const TIPO_PERSONA = this.determinarTipoPersona(destinatario.nombreDenominacionORazonSocial);
    
    console.log('Tipo de persona determinado:', TIPO_PERSONA);
    
    // Set person type and trigger change
    this.tipoPersonaForm.patchValue({
      tipoPersona: TIPO_PERSONA
    });

    // Manually trigger the radio change and show appropriate fields
    this.inputChecked(TIPO_PERSONA);
    this.handleTipoPersonaChange(TIPO_PERSONA);

    // Parse phone number
    const TELEFONO_PARTS = destinatario.telefono ? destinatario.telefono.split('-') : ['', ''];
    const LADA = TELEFONO_PARTS.length > 1 ? TELEFONO_PARTS[0] : '';
    const TELEFONO = TELEFONO_PARTS.length > 1 ? TELEFONO_PARTS[1] : TELEFONO_PARTS[0];

    // Find catalog IDs
    const PAIS_ID = this.paisCatalogo.find(p => p.descripcion === destinatario.pais)?.id || this.paisCatalogo[0].id;
    const ESTADO_ID = this.estadoCatalogo.find(e => e.descripcion === destinatario.entidadFederativa)?.id || '';
    const MUNICIPIO_ID = this.municipioCatalogo.find(m => m.descripcion === destinatario.municipioOAlcaldia)?.id || '';
    const COLONIA_ID = this.coloniaCatalogo.find(c => c.descripcion === destinatario.colonia)?.id || '';

    // Set form values based on person type
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

    // Mark the form as pristine and untouched to avoid validation errors
    this.datosPersonales.markAsPristine();
    this.datosPersonales.markAsUntouched();
    this.tipoPersonaForm.markAsPristine();
    this.tipoPersonaForm.markAsUntouched();

    console.log('Formulario cargado con valores:', this.datosPersonales.value);
  }

  /**
   * Guarda un nuevo destinatario basado en los datos del formulario.
   * Crea un objeto destinatario y lo agrega a la lista.
   * Cierra el modal después de guardar.
   * 
   * @memberof TercerosComponent
   */
  guardarDestinatario(): void {
    console.log('Guardando destinatario...');
    console.log('Formulario válido:', this.tipoPersonaForm.valid && this.datosPersonales.valid);
    console.log('Errores tipo persona:', this.tipoPersonaForm.errors);
    console.log('Errores datos personales:', this.datosPersonales.errors);
    
    if (this.tipoPersonaForm.invalid || this.datosPersonales.invalid) {
      this.tipoPersonaForm.markAllAsTouched();
      this.datosPersonales.markAllAsTouched();
      
      console.log('Formulario inválido, no se puede guardar');
      this.mostrarNotificacionEliminacion(
        'Por favor completa todos los campos requeridos correctamente.',
        false
      );
      return;
    }

    const FORM_VALUE = this.datosPersonales.value;
    const TIPO_PERSONA = this.tipoPersonaForm.get('tipoPersona')?.value;
    const PAIS_SELECCIONADO = this.paisCatalogo.find(item => item.id === Number(FORM_VALUE.pais));
    const ESTADO_SELECCIONADO = this.estadoCatalogo.find(item => item.id === Number(FORM_VALUE.estado));
    const MUNICIPIO_SELECCIONADO = this.municipioCatalogo.find(item => item.id === Number(FORM_VALUE.municipio));
    const COLONIA_SELECCIONADA = this.coloniaCatalogo.find(item => item.id === Number(FORM_VALUE.colonia));

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

    console.log('Datos del destinatario a guardar:', DESTINATARIO_DATA);

    if (this.isEditingDestinatario && this.editingDestinatarioIndex !== -1) {
      console.log('Modificando destinatario existente en índice:', this.editingDestinatarioIndex);
      
      // Create a new array with the modified item to ensure change detection
      const NUEVO_ARRAY = [...this.destinatario];
      NUEVO_ARRAY[this.editingDestinatarioIndex] = DESTINATARIO_DATA;
      this.destinatario = NUEVO_ARRAY;
      
      console.log('Destinatario modificado exitosamente');
      this.mostrarNotificacionEliminacion(
        'Destinatario modificado correctamente.',
        false
      );
    } else {
      console.log('Agregando nuevo destinatario');
      this.destinatario = [...this.destinatario, DESTINATARIO_DATA];
      
      console.log('Nuevo destinatario agregado exitosamente');
      this.mostrarNotificacionEliminacion(
        'Destinatario agregado correctamente.',
        false
      );
    }

    // Reset editing state
    this.isEditingDestinatario = false;
    this.editingDestinatarioIndex = -1;
    this.destinatarioSeleccionado = [];
    
    // Close modal and clean forms
    this.limpiarDatosFormulario();
    this.tipoPersonaForm.reset();
    this.resetRadioStates();
    this.showtercerosModal = false;
    
    // Force change detection
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    
    console.log('Lista actualizada de destinatarios:', this.destinatario);
  }

  /**
   * Updates validators based on person type selection
   * @param tipoPersona - Selected person type
   */
  private updateConditionalValidators(tipoPersona: string): void {
    const NOMBRECONTROL = this.datosPersonales.get('nombre');
    const PRIMERAPELLIDOCONTROL = this.datosPersonales.get('primerApellido');
    const SOCIALCONTROL = this.datosPersonales.get('social');
    const CALLECONTROL = this.datosPersonales.get('calle');
    const EXTERIORCONTROL = this.datosPersonales.get('exterior');
    const CORREOCONTROL = this.datosPersonales.get('correoElectronico');
    const ESTADOCONTROL = this.datosPersonales.get('estado');

    // Clear existing validators
    NOMBRECONTROL?.clearValidators();
    PRIMERAPELLIDOCONTROL?.clearValidators();
    SOCIALCONTROL?.clearValidators();

    if (tipoPersona === 'fisica') {
      NOMBRECONTROL?.setValidators([Validators.required, Validators.maxLength(200)]);
      PRIMERAPELLIDOCONTROL?.setValidators([Validators.required, Validators.maxLength(200)]);
      SOCIALCONTROL?.setValidators([Validators.maxLength(250)]);
    } else if (tipoPersona === 'moral' || tipoPersona === 'planta') {
      SOCIALCONTROL?.setValidators([Validators.required, Validators.maxLength(250)]);
      NOMBRECONTROL?.setValidators([Validators.maxLength(200)]);
      PRIMERAPELLIDOCONTROL?.setValidators([Validators.maxLength(200)]);
    }

    // Keep existing validators for other fields
    CALLECONTROL?.setValidators([Validators.required, Validators.maxLength(100)]);
    EXTERIORCONTROL?.setValidators([Validators.required, Validators.maxLength(55)]);
    CORREOCONTROL?.setValidators([Validators.required, Validators.email]);
    ESTADOCONTROL?.setValidators([Validators.required]);

    // Update validity
    NOMBRECONTROL?.updateValueAndValidity();
    PRIMERAPELLIDOCONTROL?.updateValueAndValidity();
    SOCIALCONTROL?.updateValueAndValidity();
    CALLECONTROL?.updateValueAndValidity();
    EXTERIORCONTROL?.updateValueAndValidity();
    CORREOCONTROL?.updateValueAndValidity();
    ESTADOCONTROL?.updateValueAndValidity();
  }

  /**
   * Resets all radio button states
   * @memberof TercerosComponent
   */
  private resetRadioStates(): void {
    this.fisica = false;
    this.moral = false;
    this.planta = false;
  }

  /**
   * Guarda los datos del formulario y configura el estado de solo lectura.
   * Habilita o deshabilita los formularios según el estado de solo lectura.
   * 
   * @memberof TercerosComponent
   */
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

  /**
   * Actualiza el store con los datos del formulario de datos personales.
   * Sincroniza el estado local con el estado global de la aplicación.
   * 
   * @memberof TercerosComponent
   */
  updateStoreWithFormData(): void {
    const UPDATE_PERSONALES_FORM: Solicitud221601State = {
      ...this.solicitudState,
      pais: this.datosPersonales.get('pais')?.value,
    };
    this.tramite221601Store.update(UPDATE_PERSONALES_FORM);
  }

  /**
   * Maneja los cambios en el tipo de persona seleccionado.
   * Controla la visibilidad de los diferentes tipos de formularios y campos.
   * 
   * @param tipoPersona - Tipo de persona seleccionado ('fisica', 'moral', 'planta')
   * @memberof TercerosComponent
   */
  handleTipoPersonaChange(tipoPersona: string): void {
    // Reset all visibility first
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
      this.showMoralRow = true; // Keep this if needed for planta
      this.datosPersonales.disable();
    }
  }

  /**
   * Establece valores en el store utilizando métodos dinámicos.
   * Método genérico para actualizar cualquier campo en el store.
   * 
   * @param form - Formulario del cual obtener el valor
   * @param campo - Nombre del campo a obtener
   * @param metodoNombre - Nombre del método del store a ejecutar
   * @memberof TercerosComponent
   */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite221601Store): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite221601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Maneja la selección de exportadores desde la tabla dinámica.
   * Actualiza la lista de exportadores seleccionados.
   * 
   * @param filas - Array de exportadores seleccionados por el usuario
   * @memberof TercerosComponent
   */
  onExportadorSeleccionado(filas: Exportador[]): void {
    this.exportadorSeleccionado = filas;
  }

  /**
   * Maneja la selección de destinatarios desde la tabla dinámica.
   * Actualiza la lista de destinatarios seleccionados.
   * 
   * @param filas - Array de destinatarios seleccionados por el usuario
   * @memberof TercerosComponent
   */
  onDestinatarioSeleccionado(filas: Destinatario[]): void {
    console.log('Destinatarios seleccionados:', filas);
    this.destinatarioSeleccionado = [...filas]; // Create new array reference
    this.cdr.detectChanges();
  }

  /**
   * Modifica el destinatario seleccionado.
   * Abre el modal con los datos del destinatario para edición.
   * 
   * @memberof TercerosComponent
   */
  modificarDestinatario(): void {
    if (this.destinatarioSeleccionado.length === 0) {
      // Show notification that no item is selected
      this.mostrarNotificacionEliminacion(
        'Por favor selecciona un destinatario para modificar.',
        false
      );
      return;
    }

    const DESTINATARIO_A_MODIFICAR = this.destinatarioSeleccionado[0];
    this.editingDestinatarioIndex = this.destinatario.findIndex(dest => 
      dest.nombreDenominacionORazonSocial === DESTINATARIO_A_MODIFICAR.nombreDenominacionORazonSocial &&
      dest.correoElectronico === DESTINATARIO_A_MODIFICAR.correoElectronico &&
      dest.telefono === DESTINATARIO_A_MODIFICAR.telefono
    );

    if (this.editingDestinatarioIndex === -1) {
      this.mostrarNotificacionEliminacion(
        'No se pudo encontrar el destinatario seleccionado.',
        false
      );
      return;
    }

    console.log('Editando destinatario en índice:', this.editingDestinatarioIndex);
    console.log('Datos del destinatario:', DESTINATARIO_A_MODIFICAR);

    this.isEditingDestinatario = true;
    this.cargarDatosDestinatarioParaEdicion(DESTINATARIO_A_MODIFICAR);
    this.showtercerosModal = true;
  }

  /**
   * Carga los datos del destinatario en el formulario para edición.
   * 
   * @param destinatario - Destinatario a cargar en el formulario
   * @memberof TercerosComponent
   */
  private cargarDatosDestinatarioParaEdicion(destinatario: Destinatario): void {
    console.log('Cargando datos para edición:', destinatario);
    
    // Determine person type based on the name structure
    const TIPO_PERSONA = this.determinarTipoPersona(destinatario.nombreDenominacionORazonSocial);
    
    console.log('Tipo de persona determinado:', TIPO_PERSONA);
    
    // Set person type and trigger change
    this.tipoPersonaForm.patchValue({
      tipoPersona: TIPO_PERSONA
    });

    // Manually trigger the radio change and show appropriate fields
    this.inputChecked(TIPO_PERSONA);
    this.handleTipoPersonaChange(TIPO_PERSONA);

    // Parse phone number
    const TELEFONO_PARTS = destinatario.telefono ? destinatario.telefono.split('-') : ['', ''];
    const LADA = TELEFONO_PARTS.length > 1 ? TELEFONO_PARTS[0] : '';
    const TELEFONO = TELEFONO_PARTS.length > 1 ? TELEFONO_PARTS[1] : TELEFONO_PARTS[0];

    // Find catalog IDs
    const PAIS_ID = this.paisCatalogo.find(p => p.descripcion === destinatario.pais)?.id || this.paisCatalogo[0].id;
    const ESTADO_ID = this.estadoCatalogo.find(e => e.descripcion === destinatario.entidadFederativa)?.id || '';
    const MUNICIPIO_ID = this.municipioCatalogo.find(m => m.descripcion === destinatario.municipioOAlcaldia)?.id || '';
    const COLONIA_ID = this.coloniaCatalogo.find(c => c.descripcion === destinatario.colonia)?.id || '';

    // Set form values based on person type
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

    // Mark the form as pristine and untouched to avoid validation errors
    this.datosPersonales.markAsPristine();
    this.datosPersonales.markAsUntouched();
    this.tipoPersonaForm.markAsPristine();
    this.tipoPersonaForm.markAsUntouched();

    console.log('Formulario cargado con valores:', this.datosPersonales.value);
  }

  /**
   * Guarda un nuevo destinatario basado en los datos del formulario.
   * Crea un objeto destinatario y lo agrega a la lista.
   * Cierra el modal después de guardar.
   * 
   * @memberof TercerosComponent
   */
  guardarDestinatario(): void {
    console.log('Guardando destinatario...');
    console.log('Formulario válido:', this.tipoPersonaForm.valid && this.datosPersonales.valid);
    console.log('Errores tipo persona:', this.tipoPersonaForm.errors);
    console.log('Errores datos personales:', this.datosPersonales.errors);
    
    if (this.tipoPersonaForm.invalid || this.datosPersonales.invalid) {
      this.tipoPersonaForm.markAllAsTouched();
      this.datosPersonales.markAllAsTouched();
      
      console.log('Formulario inválido, no se puede guardar');
      this.mostrarNotificacionEliminacion(
        'Por favor completa todos los campos requeridos correctamente.',
        false
      );
      return;
    }

    const FORM_VALUE = this.datosPersonales.value;
    const TIPO_PERSONA = this.tipoPersonaForm.get('tipoPersona')?.value;
    const PAIS_SELECCIONADO = this.paisCatalogo.find(item => item.id === Number(FORM_VALUE.pais));
    const ESTADO_SELECCIONADO = this.estadoCatalogo.find(item => item.id === Number(FORM_VALUE.estado));
    const MUNICIPIO_SELECCIONADO = this.municipioCatalogo.find(item => item.id === Number(FORM_VALUE.municipio));
    const COLONIA_SELECCIONADA = this.coloniaCatalogo.find(item => item.id === Number(FORM_VALUE.colonia));

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

    console.log('Datos del destinatario a guardar:', DESTINATARIO_DATA);

    if (this.isEditingDestinatario && this.editingDestinatarioIndex !== -1) {
      console.log('Modificando destinatario existente en índice:', this.editingDestinatarioIndex);
      
      // Create a new array with the modified item to ensure change detection
      const NUEVO_ARRAY = [...this.destinatario];
      NUEVO_ARRAY[this.editingDestinatarioIndex] = DESTINATARIO_DATA;
      this.destinatario = NUEVO_ARRAY;
      
      console.log('Destinatario modificado exitosamente');
      this.mostrarNotificacionEliminacion(
        'Destinatario modificado correctamente.',
        false
      );
    } else {
      console.log('Agregando nuevo destinatario');
      this.destinatario = [...this.destinatario, DESTINATARIO_DATA];
      
      console.log('Nuevo destinatario agregado exitosamente');
      this.mostrarNotificacionEliminacion(
        'Destinatario agregado correctamente.',
        false
      );
    }

    // Reset editing state
    this.isEditingDestinatario = false;
    this.editingDestinatarioIndex = -1;
    this.destinatarioSeleccionado = [];
    
    // Close modal and clean forms
    this.limpiarDatosFormulario();
    this.tipoPersonaForm.reset();
    this.resetRadioStates();
    this.showtercerosModal = false;
    
    // Force change detection
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    
    console.log('Lista actualizada de destinatarios:', this.destinatario);
  }

  /**
   * Cancela la eliminación del destinatario.
   * 
   * @memberof TercerosComponent
   */
  cancelarEliminacion(): void {
    this.showDeleteConfirmModal = false;
  }

  /**
   * Limpia los campos de búsqueda TIF.
   * Resetea el nombre y número del establecimiento TIF.
   * 
   * @memberof TercerosComponent
   */
  limpiarBusquedaTif(): void {
    this.nombreEstablecimientoTif = '';
    this.numeroEstablecimientoTif = '';
  }

  /**
   * Abre el modal de búsqueda de terceros existentes.
   * Muestra el modal y resetea el formulario de búsqueda con valores por defecto.
   * 
   * @memberof TercerosComponent
   */
  abrirBuscarTercerosModal(): void {
    this.showBuscarTercerosModal = true;
    // Reset the search form without default selection
    this.buscarTercerosForm.reset({
      tipoPersonaBuscar: null, // No default selection
      pais: this.paisCatalogo[0].id,
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      razonSocial: '',
      correoElectronico: '',
      entidadFederativa: ''
    });
  }

  /**
   * Cierra el modal de búsqueda de terceros.
   * Oculta el modal sin realizar ninguna acción adicional.
   * 
   * @memberof TercerosComponent
   */
  cerrarBuscarTercerosModal(): void {
    this.showBuscarTercerosModal = false;
  }

  /**
   * Limpia todos los campos del formulario de búsqueda de terceros.
   * Resetea el formulario con valores por defecto para una nueva búsqueda.
   * 
   * @memberof TercerosComponent
   */
  limpiarBuscarTerceros(): void {
    this.buscarTercerosForm.reset({
      tipoPersonaBuscar: null, // No default selection
      pais: this.paisCatalogo[0].id,
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      razonSocial: '',
      correoElectronico: '',
      entidadFederativa: ''
    });
  }

  /**
   * Carga las opciones de tipo de persona desde el servicio.
   * Realiza una llamada al servicio para obtener los datos y los asigna a tipoPersonaOptions.
   * 
   * @memberof TercerosComponent
   */
  cargarRadio(): void {
    this.service.obtenerRadio()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        this.tipoPersonaOptions = resp;
      });
  }
  /**
   * property planta
   * description Indica si el tipo de persona es planta TIF.
   */

  public planta = false;

  /**
   * property fisica
   * description Indica si el tipo de persona es física.
   */
  public fisica = false;

  /**
   * property moral
   * description Indica si el tipo de persona es moral.
   */
  public moral = false;

  /** 
   * Control de visibilidad del modal de confirmación de eliminación.
   * @type {boolean}
   * @default false
   */
  showDeleteConfirmModal = false;

  /** 
   * Control de visibilidad de alerta de eliminación.
   * @type {boolean}
   * @default false
   */
  public mostrarAlertaEliminacion: boolean = false;

  /** 
   * Control de visibilidad de confirmación de alerta de eliminación.
   * @type {boolean}
   * @default false
   */
  public confirmacionAlertaEliminacion: boolean = false;

  /** 
   * Configuración de la notificación de eliminación.
   * @type {Notificacion}
   */
  public notificacionEliminacion!: Notificacion;

  /**
     * method inputChecked
     * description Cambia el estado de los checkboxes según el tipo de persona.
     * param checkBoxName Nombre del checkbox seleccionado.
     */
  public inputChecked(checkBoxName: string): void {
    this.resetRadioStates();
    
    if (checkBoxName === 'fisica') {
      this.fisica = true;
    } else if (checkBoxName === 'moral') {
      this.moral = true;
    } else if (checkBoxName === 'planta') {
      this.planta = true;
    }
    
    // Update form control value
    this.tipoPersonaForm.get('tipoPersona')?.setValue(checkBoxName, { emitEvent: false });
  }

  /**
  * method cambiarRadioFisica
  * description Cambia el estado del radio button según el valor seleccionado.
  * param value Valor seleccionado.
  */
  cambiarRadioFisica(value: string | number): void {
    const VALOR_SELECCIONADO = value as string;
    this.inputChecked(VALOR_SELECCIONADO);
    this.handleTipoPersonaChange(VALOR_SELECCIONADO);
  }


  /**
   * Maneja la entrada numérica en campos específicos, permitiendo solo dígitos.
   * Previene la entrada de caracteres no numéricos en tiempo real.
   * 
   * @param event - Evento de input del elemento HTML
   * @memberof TercerosComponent
   */
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

  /**
   * method ngOnDestroy
   * description Método para limpiar suscripciones al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Limpia todos los campos del formulario de datos personales.
   * Resetea el formulario con valores por defecto.
   * 
   * @memberof TercerosComponent
   */
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
    
    // Mark all fields as untouched to clear validation messages
    this.datosPersonales.markAsUntouched();
    this.datosPersonales.markAsPristine();
  }

  /**
   * Obtiene el nombre completo basado en el tipo de persona.
   * Combina nombre y apellidos para persona física o retorna razón social para moral.
   * 
   * @param formValue - Valores del formulario
   * @param tipoPersona - Tipo de persona ('fisica', 'moral', 'planta')
   * @returns Nombre completo formateado
   * @memberof TercerosComponent
   */
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

  /**
   * Obtiene el domicilio completo concatenando todos los campos de dirección.
   * 
   * @param formValue - Valores del formulario
   * @param colonia - Colonia seleccionada del catálogo
   * @param municipio - Municipio seleccionado del catálogo
   * @param estado - Estado seleccionado del catálogo
   * @returns Domicilio completo formateado
   * @memberof TercerosComponent
   */
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
