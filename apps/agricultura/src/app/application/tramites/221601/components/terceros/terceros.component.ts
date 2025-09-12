import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  ConfiguracionColumna,
  InputRadioComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService
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
    InputRadioComponent
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
   * Formulario para búsqueda de terceros existentes en el sistema.
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
   * Updates validators based on person type selection
   * @param tipoPersona - Selected person type
   */
  private updateConditionalValidators(tipoPersona: string): void {
    const NOMBRECONTROL = this.datosPersonales.get('nombre');
    const PRIMERAPELLIDOCONTROL = this.datosPersonales.get('primerApellido');
    const SOCIALCONTROL = this.datosPersonales.get('social');

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

    // Update validity
    NOMBRECONTROL?.updateValueAndValidity();
    PRIMERAPELLIDOCONTROL?.updateValueAndValidity();
    SOCIALCONTROL?.updateValueAndValidity();
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
   * Guarda un nuevo destinatario basado en los datos del formulario.
   * Crea un objeto destinatario y lo agrega a la lista.
   * Cierra el modal después de guardar.
   * 
   * @memberof TercerosComponent
   */
  guardarDestinatario(): void {
    if (this.tipoPersonaForm.invalid || this.datosPersonales.invalid) {
      this.tipoPersonaForm.markAllAsTouched();
      this.datosPersonales.markAllAsTouched();
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

    const NUEVO_DESTINATARIO: Destinatario = {
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

    this.destinatario = [...this.destinatario, NUEVO_DESTINATARIO];
    this.limpiarDatosFormulario();
    this.tipoPersonaForm.reset();
    this.resetRadioStates();
    this.showtercerosModal = false;
    this.cdr.detectChanges();
  }

  private static obtenerNombreCompleto(
    FORM_VALUE: { nombre?: string; primerApellido?: string; segundoApellido?: string; social?: string },
    TIPO_PERSONA: string
  ): string {
    if (TIPO_PERSONA === 'fisica') {
      const NOMBRE = FORM_VALUE.nombre || '';
      const PRIMER_APELLIDO = FORM_VALUE.primerApellido || '';
      const SEGUNDO_APELLIDO = FORM_VALUE.segundoApellido || '';
      return `${NOMBRE} ${PRIMER_APELLIDO} ${SEGUNDO_APELLIDO}`.trim();
    } else if (TIPO_PERSONA === 'moral' || TIPO_PERSONA === 'planta') {
      return FORM_VALUE.social || '';
    }
    return '';
  }

  private static obtenerDomicilioCompleto(
    FORM_VALUE: {
      calle?: string;
      exterior?: string;
      interior?: string;
      colonia?: string;
      municipio?: string;
      estado?: string;
      codigo?: string;
    },
    COLONIA_SELECCIONADA: Catalogo | undefined,
    MUNICIPIO_SELECCIONADO: Catalogo | undefined,
    ESTADO_SELECCIONADO: Catalogo | undefined
  ): string {
    const CALLE = FORM_VALUE.calle || '';
    const NUMERO_EXTERIOR = FORM_VALUE.exterior || '';
    const NUMERO_INTERIOR = FORM_VALUE.interior || '';
    const COLONIA = COLONIA_SELECCIONADA?.descripcion || '';
    const MUNICIPIO = MUNICIPIO_SELECCIONADO?.descripcion || '';
    const ESTADO = ESTADO_SELECCIONADO?.descripcion || '';
    const CODIGO_POSTAL = FORM_VALUE.codigo || '';
    return `${CALLE} ${NUMERO_EXTERIOR} ${NUMERO_INTERIOR ? `Int. ${NUMERO_INTERIOR}` : ''} ${COLONIA} ${MUNICIPIO} ${ESTADO} CP: ${CODIGO_POSTAL}`.trim().replace(/\s+/g, ' ');
  }

  /**
   * Limpia todos los datos del formulario de datos personales.
   * Fuerza la detección de cambios y resetea el formulario.
   * 
   * @memberof TercerosComponent
   */
  limpiarDatosFormulario(): void {
    this.datosPersonales.reset();
    // Reset to default values
    this.datosPersonales.patchValue({
      pais: this.paisCatalogo[0].id
    });
    this.cdr.detectChanges();
  }

  /**
   * Cancela la operación de agregar destinatario.
   * Cierra el modal de terceros sin guardar cambios.
   * 
   * @memberof TercerosComponent
   */
  cancelarDestinatario(): void {
    this.showtercerosModal = !this.showtercerosModal;
  }

  /**
   * Abre el modal para agregar un nuevo tercero.
   * Alterna el estado de visibilidad del modal de terceros.
   * 
   * @memberof TercerosComponent
   */
  tercerosAgregar(): void {
    this.showtercerosModal = true;
    // Reset forms when opening modal
    this.tipoPersonaForm.reset();
    this.datosPersonales.reset();
    this.datosPersonales.patchValue({
      pais: this.paisCatalogo[0].id
    });
    this.resetRadioStates();
    this.showFisicaRow = false;
    this.showMoralRow = false;
    this.showPlantaRow = false;
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
}
