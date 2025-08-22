/* eslint-disable class-methods-use-this */
/**
 * Importaciones necesarias para el componente de empresas.
 * Incluye servicios, modelos, componentes compartidos y decoradores de Angular.
 */
import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  EMAIL,
  InputFecha,
  InputFechaComponent,
  NotificacionesComponent,
  REGEX_RFC,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
  ValidacionesFormularioService,
  WEBPAGE,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  DatosComplimentos,
  SociaoAccionistas,
} from '../../models/complimentos.model';
import {
  ESTADO,
  FECHA_DE_PAGO,
  FORMA_SOCIO,
  FORMA_SOCIO_ACCIONISTAS,
  FORMA_SOCIO_ACCIONISTAS_EXTRANJEROS,
  PAIS,
  TABLA_SOCIO_ACCIONISTAS,
  TABLA_SOCIO_ACCIONISTAS_EXTRANJEROS,
  TIPO_FORMA,
} from '../../constantes/complimentos.enum';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, Subscription, delay, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ComplimentosService } from '../../services/complimentos.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Notificacion } from '@ng-mf/data-access-user';

import { DatosCatalago, INPUT_FECHA_CONFIG, INPUT_FECHA_CONFIGURACION } from '../../../tramites/80102/models/autorizacion-programa-nuevo.model';
import { SelectPaisesComponent } from '@libs/shared/data-access-user/src/tramites/components/select-paises/select-paises.component';
import { TramiteStore } from '../../../estados/tramite.store';

/**
 * Componente Complimentos.
 * Responsable de mostrar y gestionar los datos relacionados a los complimentos.
 * Utiliza módulos comunes, formularios reactivos y componentes compartidos.
 */
@Component({
  selector: 'app-complimentos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TablaDinamicaComponent,
    TituloComponent,
    CatalogoSelectComponent,
    SelectPaisesComponent,
    InputFechaComponent,
    NotificacionesComponent
  ],
  templateUrl: './complimentos.component.html',
  styleUrl: './complimentos.component.scss',
})
/**
 * Clase ComplimentosComponent.
 * Gestiona la lógica del componente Complimentos, incluyendo inicialización y limpieza.
 */
export class ComplimentosComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * property {Catalogo[]} derechosList - Lista de derechos obtenida del servicio.
   */
  public derechosList!: Catalogo[];

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   */
  @Input() formularioDeshabilitado: boolean = false;

  /**
   * @type {FormGroup}
   * @description Grupo de formularios para los complementos.
   */
  formaComplimentos!: FormGroup;

  /**
   * @type {FormGroup}
   * @description Grupo de formularios para las obligaciones fiscales.
   */
  obligacionesFiscales!: FormGroup;

   /**
   * Constante para configurar el input de fecha.
   * Define las propiedades del campo de entrada de fecha.
   */
    INPUT_FECHA_CONFIG = INPUT_FECHA_CONFIG;

    /**
   * Constante para configurar el input de fecha.
   * Define las propiedades del campo de entrada de fecha.
   */
    INPUT_FECHA_CONFIGURACION = INPUT_FECHA_CONFIGURACION;

  /**
   * @type {Catalogo[]}
   * @description lista de catálogos.
   */
  estados!: Catalogo[];

  /**
   * @description
   * Objeto que representa una nueva notificación para RFC.
   * Se utiliza para mostrar mensajes de alerta o información al usuario.
   */
  public nuevaNotificacionRfc!: Notificacion;

  /**
   * Flag to track if we're currently processing RFC validation
   * Prevents interference from other form events
   */
  private isProcessingRfcValidation: boolean = false;

  /**
   * @type {Subscription}
   * @description Suscripción privada inicializada como una nueva suscripción.
   */
  private subscription: Subscription = new Subscription();

  /**
   * Storage for form data to preserve across radio button changes
   */
  private PRESERVED_FORM_DATA: { [key: string]: string | number | boolean } = {};

  /**
   * @type {DatosCatalago[]}
   * @description Campos del formulario por defecto para los socios accionistas.
   */
  camposFormularioDefault: DatosCatalago[] = FORMA_SOCIO_ACCIONISTAS;

  /**
   * @type {any}
   * @description Campos del formulario para la nacionalidad.
   */
  camposFormularioNationalidad = FORMA_SOCIO;

  /**
   * @type {any}
   * @description Campos del formulario para el tipo de persona.
   */
  camposFormularioTipoPersona = FORMA_SOCIO_ACCIONISTAS_EXTRANJEROS;

  /**
   * @type {DatosCatalago[]}
   * @description Campos del formulario para los socios accionistas.
   */
  camposFormulario: DatosCatalago[] = FORMA_SOCIO_ACCIONISTAS;

  /**
   * @type {any}
   * @description Tipo de formulario por defecto.
   */
  tipoFormulario = TIPO_FORMA.DEFAULT;

  /**
   * @type {DatosComplimentos | null}
   * @description Datos de los complementos del formulario.
   */
  @Input() datosFormaComplimentos!: DatosComplimentos | null;

  /**
   * @type {SociaoAccionistas[]}
   * @description Datos de los socios accionistas.
   */
  @Input() datosSocioAccionistas: SociaoAccionistas[] = [];

  /**
   * @type {SociaoAccionistas[]}
   * @description Datos de los socios accionistas extranjeros.
   */
  @Input() datosSocioAccionistasExtrenjeros: SociaoAccionistas[] = [];

  /**
   * @type {any}
   * @description Tabla de socios accionistas.
   */
  tablaSociaAccionistas = TABLA_SOCIO_ACCIONISTAS;

  /**
   * @type {any}
   * @description Tabla de socios accionistas extranjeros.
   */
  tablaSociaAccionistasExtranjeros = TABLA_SOCIO_ACCIONISTAS_EXTRANJEROS;

  /**
   * @type {any}
   * @description Selección de tabla.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * @type {SociaoAccionistas[]}
   * @description Lista de socios accionistas seleccionados.
   */
  empresaAccionistasSeleccionados: SociaoAccionistas[] = [];

  /**
   * @type {SociaoAccionistas[]}
   * @description Lista de accionistas extranjeros seleccionados.
   */
  accionistasExtranjerosSeleccionados: SociaoAccionistas[] = [];

  /**
   * @type {EventEmitter<DatosComplimentos>}
   * @description Emisor de eventos para los datos de complementos.
   */
  @Output()
  complimentosDatos: EventEmitter<DatosComplimentos> =
    new EventEmitter<DatosComplimentos>(true);

  /**
   * @type {EventEmitter<SociaoAccionistas>}
   * @description Emisor de eventos para los accionistas agregados.
   */
  @Output() accionistasAgregados: EventEmitter<SociaoAccionistas> =
    new EventEmitter<SociaoAccionistas>(true);

  /**
   * @type {EventEmitter<SociaoAccionistas[]>}
   * @description Emisor de eventos para los accionistas eliminados.
   */
  @Output() accionistasEliminados: EventEmitter<SociaoAccionistas[]> =
    new EventEmitter<SociaoAccionistas[]>(true);

  /**
   * @type {EventEmitter<SociaoAccionistas[]>}
   * @description Emisor de eventos para los accionistas extranjeros eliminados.
   */
  @Output() accionistasExtranjerosEliminado: EventEmitter<SociaoAccionistas[]> =
    new EventEmitter<SociaoAccionistas[]>(true);

  /**
   * Emisor de eventos para indicar si el formulario es válido.
   * @type {EventEmitter<boolean>}
   */
  @Output() formaValida: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /** Indica si el formulario debe mostrarse en modo solo lectura.  
 *  Controla la habilitación o deshabilitación de los campos. */
  esFormularioSoloLectura: boolean = false;

  /**
  * @description
  * Objeto que representa una nueva notificación.
  * Se utiliza para mostrar mensajes de alerta o información al usuario.
  */
    public eliminarNotificacion!: Notificacion;

  /**
  * @description
  * Objeto que representa una nueva notificación.
  * Se utiliza para mostrar mensajes de alerta o información al usuario.
  */
    public eliminarUnoConfirmationNotificacion!: Notificacion;

     /**
  * @description
  * Objeto que representa una nueva notificación.
  * Se utiliza para mostrar mensajes de alerta o información al usuario.
  */
    public eliminarDosConfirmationNotificacion!: Notificacion;

      /**
       * Configuración del input de fecha de inicio
       * @property {InputFecha} fechaInicioInput
       */
      fechaInicioInput: InputFecha = FECHA_DE_PAGO;

      /**
 * Obtiene el número total de socios accionistas registrados en el formulario.
 * @returns {number} Total de socios accionistas. 
 */
  get totalItemsDatosSocioAccionistas(): number {
    return this.datosSocioAccionistas.length;
  }

       /**
 * Obtiene el número total de socios accionistas registrados en el formulario.
 * @returns {number} Total de socios accionistas. 
 */
  get totalItemsDatosSocioAccionistasExtranjeros(): number {
    return this.datosSocioAccionistasExtrenjeros.length;
  }

  /**
   * Constructor para inicializar el formulario de datos del subcontratista.
   * @param {FormBuilder} fb - FormBuilder para la creación del formulario reactivo.
   * @param {CatalogosService} catalogosServices - Servicio para obtener los catálogos.
   * @param {ComplimentosService} complimentosService - Servicio para obtener los datos de complementos.
   */
  constructor(
    private fb: FormBuilder,
    private catalogosServices: CatalogosService,
    private complimentosService: ComplimentosService,
     private consultaioQuery: ConsultaioQuery,
     private tramiteStore: TramiteStore,
     private validacionesService: ValidacionesFormularioService
  ) {
    
       this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
           this.formularioDeshabilitado = seccionState.readonly;
      
              this.inicializarCertificadoFormulario(); 
        })
      )
      .subscribe();
    }
   
 /**
   * Método para inicializar el formulario reactivo con los datos de la solicitud.
   * 
   * Este método configura los campos del formulario con los valores actuales del estado de la solicitud
   * y aplica las validaciones necesarias. También deshabilita ciertos campos y establece valores predeterminados.
   */
  inicializarCertificadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
     this.inicializarFormulario();
    }  
  }

  /**
 * Verifica si un control del formulario es inválido.
 * @param fechaDeActa El nombre del control a verificar.
 * @returns Verdadero si el control es inválido y está tocado o modificado, de lo contrario, falso.
 */
  onFechaCambiada(fecha: string): void {
    if (fecha) {
      this.formaComplimentos.patchValue({ fechaDeActa: fecha });
    }
  }

    /**
   * @comdoc
   * Guarda los datos del formulario de combinación requerida.
   * 
   * Inicializa el formulario y ajusta su estado de habilitación según si es de solo lectura.
   * - Si el formulario es de solo lectura, lo deshabilita.
   * - Si no es de solo lectura, lo habilita.
   * - Si no aplica ninguna de las condiciones anteriores, no realiza ninguna acción adicional.
   */
  guardarDatosFormulario(): void {
      this.inicializarFormulario();
      if (this.esFormularioSoloLectura) {
        
this.formaComplimentos.disable();
      } else {
         
          this.formaComplimentos.enable();    
      }
  }
  /**
   * Inicializa el formulario reactivo con los valores actuales de la solicitud.
   * 
   * Configura el formulario para gestionar los campos relacionados con el pago de derechos, como clave, 
   * dependencia, banco, llave, fecha e importe. También asigna valores predeterminados a algunos campos.
   */
  private inicializarFormulario(): void {
    this.formaComplimentos = this.fb.group({
      modalidad: [{ value: '', disabled: true }],
      programaPreOperativo: [false],
      datosGeneralis: this.fb.group({
        paginaWWeb: ['', [Validators.required, Validators.maxLength(120), Validators.pattern(WEBPAGE)]],
        localizacion: ['', [Validators.required, Validators.maxLength(120)]],
      }),
      obligacionesFiscales: this.fb.group({
        opinionPositiva: [{ value: 'SI', disabled: true }],
        fechaExpedicion: ['', Validators.required],
        aceptarObligacionFiscal: [''],
      }),
      formaModificaciones: this.fb.group({
        nombreDelFederatario: ['', [Validators.required, Validators.maxLength(120)]],
        nombreDeNotaria: ['', [Validators.required, Validators.maxLength(10)]],
        estado: ['', Validators.required],
        nombreDeActa: ['',[ Validators.required, Validators.maxLength(10)]],
        fechaDeActa: ['', Validators.required],
        rfc: ['', [
          Validators.required, 
          Validators.minLength(12),
          Validators.maxLength(13),
          Validators.pattern(REGEX_RFC)
        ]],
        nombreDeRepresentante: [{ value: '', disabled: true }],
      }),
      formaCertificacion: this.fb.group({
        certificada: [{ value: '', disabled: true }],
        fechaInicio: [{ value: '', disabled: true }],
        fechaVigencia: [{ value: '', disabled: true }],
      }),
      formaSocioAccionistas: this.fb.group({
        nationalidadMaxicana: ['false', Validators.required],
        tipoDePersona: ['false', Validators.required],
        formaDatos: this.obtainerFormaDatos(TIPO_FORMA.DEFAULT),
      }),
    });

 // Apply initial data if available
    if (this.datosFormaComplimentos) {
      // Use immediate execution for better user experience
      setTimeout(() => {
        this.aplicarDatosFormulario();
      }, 0);
    }
  }

  /**
  * compo doc
  * @method isValid
  * @description 
  * Verifica si un campo específico del formulario es válido.
  * @param field El nombre del campo que se desea validar.
  * @returns {boolean | null} Un valor booleano que indica si el campo es válido.
  */
  public esValido(formgroup: string, campo: string): boolean | null {
    const FORMGRUPO = this.formaComplimentos.get(formgroup) as FormGroup;
    return this.validacionesService.isValid(FORMGRUPO, campo);
  }

  /**
   * Aplica los datos del complemento al formulario, transformando los valores según sea necesario.
   */
  private aplicarDatosFormulario(): void {
    if (!this.datosFormaComplimentos || !this.formaComplimentos) {
      return;
    }

    // Create a copy of the data for transformation
    const DATOS_TRANSFORMADOS = JSON.parse(JSON.stringify(this.datosFormaComplimentos));

  this.transformarValoresRadio(DATOS_TRANSFORMADOS);
    
    
    const PROGRAMA_PREOPERATIVO_VALUE = this.transformarCheckboxValue(DATOS_TRANSFORMADOS.programaPreOperativo);

  
    this.formaComplimentos.patchValue(DATOS_TRANSFORMADOS, { emitEvent: false });
    this.formaComplimentos.get('programaPreOperativo')?.setValue(PROGRAMA_PREOPERATIVO_VALUE, { emitEvent: false });

    
    if (DATOS_TRANSFORMADOS.formaSocioAccionistas) {
      this.aplicarDatosDinamicos(DATOS_TRANSFORMADOS);
    }
  }

  /**
   * Transforms radio button values to the expected format
   */
  private transformarValoresRadio(datos: DatosComplimentos): void {
   
    if (!datos.formaSocioAccionistas || !this.formaComplimentos) {
      return;
    }
 if (datos.formaSocioAccionistas.nationalidadMaxicana === 'Sí' || 
        datos.formaSocioAccionistas.nationalidadMaxicana === 'Si') {
      datos.formaSocioAccionistas.nationalidadMaxicana = 'true';
    } else if (datos.formaSocioAccionistas.nationalidadMaxicana === 'No') {
      datos.formaSocioAccionistas.nationalidadMaxicana = 'false';
    }

    
    if (datos.formaSocioAccionistas.tipoDePersona === 'Física' || 
        datos.formaSocioAccionistas.tipoDePersona === 'Persona Física') {
      datos.formaSocioAccionistas.tipoDePersona = 'true';
    } else if (datos.formaSocioAccionistas.tipoDePersona === 'Moral' || 
               datos.formaSocioAccionistas.tipoDePersona === 'Persona Moral') {
      datos.formaSocioAccionistas.tipoDePersona = 'false';
    }
  }

  /**
   * Transforms formaDatos structure to match form expectations
   */
  private transformarFormaDatos(datos: DatosComplimentos): void {
    if (!datos.formaSocioAccionistas) {
      return;
    }

    // Check if we have tablaDatosComplimentos data to populate the dynamic form
    if (this.datosSocioAccionistas && this.datosSocioAccionistas.length > 0) {
      const PRIMER_REGISTRO = this.datosSocioAccionistas[0];
      datos.formaSocioAccionistas.formaDatos = {
        taxId: PRIMER_REGISTRO.taxId || '',
        razonSocial: PRIMER_REGISTRO.razonSocial || '',
        pais: PRIMER_REGISTRO.pais || '',
        codigoPostal: PRIMER_REGISTRO.codigoPostal || '',
        estado: PRIMER_REGISTRO.estado || '',
        correoElectronico: PRIMER_REGISTRO.correoElectronico || '',
        nombre: PRIMER_REGISTRO.nombre || '',
        apellidoPaterno: PRIMER_REGISTRO.apellidoPaterno || '',
        apellidoMaterno: PRIMER_REGISTRO.apellidoMaterno || '',
        rfc: PRIMER_REGISTRO.rfc || ''
      };
    } else if (this.esEstructuraFormaDatosInvalida(datos.formaSocioAccionistas.formaDatos)) {
      datos.formaSocioAccionistas.formaDatos = this.crearFormaDatosVacio();
    }
  }

  /**
   * Applies dynamic form data with single form modification
   */
  private aplicarDatosDinamicos(datos: DatosComplimentos): void {
   
    this.transformarFormaDatos(datos);
    
  
    const FORM_DATA_TO_APPLY = datos.formaSocioAccionistas.formaDatos;
    
    
    if (FORM_DATA_TO_APPLY) {
      Object.keys(FORM_DATA_TO_APPLY).forEach(key => {
        this.PRESERVED_FORM_DATA[key] = FORM_DATA_TO_APPLY[key];
      });
    }

    // Determine the correct form type based on radio values
    const NACIONALIDAD_MEXICANA = datos.formaSocioAccionistas.nationalidadMaxicana === 'true';
    const PERSONA_FISICA = datos.formaSocioAccionistas.tipoDePersona === 'true';

    // Apply the appropriate form modification once
    if (NACIONALIDAD_MEXICANA) {
      this.modificarFormulario(TIPO_FORMA.NATIONALIDAD_MEXICANA, this.camposFormularioNationalidad);
    } else if (PERSONA_FISICA) {
      this.modificarFormulario(TIPO_FORMA.TIPO_PERSONA, this.camposFormularioTipoPersona);
    } else {
      this.modificarFormulario(TIPO_FORMA.DEFAULT, this.camposFormularioDefault);
    }
  }

  /**
   * Checks if formaDatos structure is invalid
   */
  private esEstructuraFormaDatosInvalida(formaDatos: { [key: string]: string }): boolean {
    return !formaDatos || 
           typeof formaDatos !== 'object' ||
           Object.keys(formaDatos).some(key => key.startsWith('socio'));
  }

  /**
   * Creates empty formaDatos structure
   */
  private crearFormaDatosVacio(): { [key: string]: string } {
    return {
      taxId: '',
      razonSocial: '',
      pais: '',
      codigoPostal: '',
      estado: '',
      correoElectronico: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      rfc: ''
    };
  }

  /**
   * Transforms checkbox values
   */
  private transformarCheckboxValue(valor: string): boolean | string {
    if (valor === 'Sí' || valor === 'Si') {
      return true;
    } else if (valor === 'No') {
      return false;
    }
    return valor;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Obtiene los catálogos de países y estados, y configura las suscripciones para los cambios en el formulario.
   * Si hay datos de complementos disponibles, los establece en el formulario.
   * @returns {void}
   */
  ngOnInit(): void {
     this.inicializarCertificadoFormulario();
    this.getCatalogoPaises();
    this.getCatalogoEstado();
    this.loadComboUnidadMedida();

    this.formaComplimentos.valueChanges
      .pipe(delay(100))
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((_) => {
        this.complimentosDatos.emit(this.formaComplimentos.value);
        this.formaValida.emit(this.formaComplimentos.valid);
      });

    // Apply data after catalogs are loaded and form is ready
    if (this.datosFormaComplimentos) {
      // Use immediate application for better performance
      setTimeout(() => {
        this.aplicarDatosFormulario();
      }, 100);
    }

    if(this.formularioDeshabilitado ) {
      this.formaComplimentos.disable();
    }
  }

  /**
   * Lifecycle hook that is called when any data-bound property changes.
   * Handles changes to input properties.
   */
  ngOnChanges(): void {
    if (this.formaComplimentos && this.datosFormaComplimentos) {
      // Apply immediately for better user experience
      this.aplicarDatosFormulario();
    }
  }

  /**
   * Obtiene el formulario de datos según el tipo de formulario.
   *
   * @param {number} tipoForma - El tipo de formulario.
   * @returns {FormGroup} El formulario correspondiente.
   */
  obtainerFormaDatos(tipoForma: number): FormGroup {
    switch (tipoForma) {
      case TIPO_FORMA.DEFAULT:
        return this.fb.group({
          taxId: ['', [Validators.required, Validators.maxLength(12)]],
          razonSocial: ['', Validators.required],
          pais: ['', Validators.required],
          codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
          estado: ['', Validators.required],
          correoElectronico: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(EMAIL)]],
        });

      case TIPO_FORMA.TIPO_PERSONA:
        return this.fb.group({
          taxId: ['', [Validators.required, Validators.maxLength(12)]],
          nombre: ['', [Validators.required, Validators.maxLength(200)]],
          pais: ['', Validators.required],
          codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
          estado: ['', [Validators.required, Validators.maxLength(250)]],
          correoElectronico: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(EMAIL)]],
          apellidoPaterno: ['', [Validators.required, Validators.maxLength(200)]],
        });
      
    case TIPO_FORMA.NATIONALIDAD_MEXICANA:
      return this.fb.group({
        rfc: ['', [
          Validators.required, 
          Validators.minLength(12),
          Validators.maxLength(13),
          Validators.pattern(REGEX_RFC)
        ]],
      });

      default:
        return this.fb.group({
          taxId: ['', [Validators.required, Validators.maxLength(12)]],
          razonSocial: ['', Validators.required],
          pais: ['', Validators.required],
          codigoPostal: ['', [Validators.required, Validators.maxLength(12)]],
          estado: ['', Validators.required],
          correoElectronico: ['', [Validators.required, Validators.maxLength(200), Validators.pattern(EMAIL)]],
        });
    }
  }

  /**
   * Modifica el formulario según el tipo de formulario y los campos del formulario.
   *
   * @param {number} tipoForma - El tipo de formulario.
   * @param {DatosCatalago[]} camposDelFormulario - Los campos del formulario.
   */
  modificarFormulario(
    tipoForma: number,
    camposDelFormulario: DatosCatalago[]
  ): void {
    const CONTROL = this.formaComplimentos.get(
      'formaSocioAccionistas'
    ) as FormGroup;
    
    // Save current form data before removing the control
    const CURRENT_FORM_DATA = CONTROL.get('formaDatos')?.value || {};
    
    // Store ALL current form data in persistent storage, including taxId
    Object.keys(CURRENT_FORM_DATA).forEach(key => {
      const VALUE = CURRENT_FORM_DATA[key];
      if (VALUE !== undefined && VALUE !== null && VALUE !== '') {
        this.PRESERVED_FORM_DATA[key] = VALUE;
      }
    });
    
    // Special handling for taxId to ensure it's always preserved
    if (CURRENT_FORM_DATA.taxId) {
      this.PRESERVED_FORM_DATA['taxId'] = CURRENT_FORM_DATA.taxId;
    }
    
    // Update form structure synchronously
    CONTROL.removeControl('formaDatos', { emitEvent: false });
    this.camposFormulario = [...camposDelFormulario];
    const NEW_FORM_CONTROL = this.obtainerFormaDatos(tipoForma);
    CONTROL.setControl('formaDatos', NEW_FORM_CONTROL, {
      emitEvent: false,
    });
    
    const DATA_TO_RESTORE: { [key: string]: string | number | boolean } = {};
    const NEW_FORM_CONTROLS = Object.keys(NEW_FORM_CONTROL.controls);
    
    // Restore data for matching controls, with special attention to taxId
    NEW_FORM_CONTROLS.forEach(controlName => {
      if (this.PRESERVED_FORM_DATA[controlName] !== undefined) {
        DATA_TO_RESTORE[controlName] = this.PRESERVED_FORM_DATA[controlName];
      }
    });
    
    // Ensure taxId is always restored if it exists in preserved data and new form has taxId
    if (this.PRESERVED_FORM_DATA['taxId'] && NEW_FORM_CONTROL.controls['taxId']) {
      DATA_TO_RESTORE['taxId'] = this.PRESERVED_FORM_DATA['taxId'];
    }
    
    if (Object.keys(DATA_TO_RESTORE).length > 0) {
      NEW_FORM_CONTROL.patchValue(DATA_TO_RESTORE, { emitEvent: false });
    }
  
  this.tipoFormulario = tipoForma;
  }

  /**
   * Verifica si el formulario contiene controles.
   *
   * @returns {boolean} Verdadero si el formulario contiene controles, falso si no.
   */
  obtenerControles(): boolean {
    return (
      this.formaComplimentos.get('formaSocioAccionistas') as FormGroup
    ).contains('formaDatos');
  }

  /**
   * @description Obtiene el catálogo de países y actualiza las opciones de los campos del formulario.
   * @returns {void}
   */
  getCatalogoPaises(): void {
    this.catalogosServices
      .getCatalogoPaises(CATALOGOS_ID.CAT_PAISES)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        const INDICE = this.camposFormulario.findIndex(
          (ele) => ele.campo === PAIS
        );
        const INDICEALT = this.camposFormularioTipoPersona.findIndex(
          (ele) => ele.campo === PAIS
        );
        this.camposFormularioTipoPersona[INDICEALT].opciones = datos;
      });
  }

   /**
   * method loadComboUnidadMedida
   * description Carga la lista de derechos desde el servicio.
   */
   loadComboUnidadMedida(): void {
    this.complimentosService.getDatos() // Llama al servicio para obtener los datos.
      .pipe(takeUntil(this.destroyNotifier$)) // Finaliza la suscripción al destruir el componente.
      .subscribe((data): void => { // Maneja los datos recibidos.
        this.derechosList = data as Catalogo[]; // Asigna los datos a la lista de derechos.
      });
  }

  /**
   * @description Obtiene el catálogo de estados y actualiza las opciones de los campos del formulario.
   * @returns {void}
   */
  getCatalogoEstado(): void {
    this.complimentosService
      .obtenerListaEstado()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        const INDICE = this.camposFormulario.findIndex(
          (ele) => ele.campo === ESTADO
        );
        const INDICEALT = this.camposFormularioTipoPersona.findIndex(
          (ele) => ele.campo === ESTADO
        );
        this.estados = datos;
        this.camposFormularioTipoPersona[INDICEALT].opcionesCatalogo = datos;
        this.camposFormularioDefault[INDICE].opcionesCatalogo = datos;
      });
  }

  /**
   * @description Agrega un nuevo accionista desde el formulario de complementos y emite el evento correspondiente.
   * @returns {void}
   */
  aggregarAccionistas(): void {
    const CONTROL = this.formaComplimentos.get(
      'formaSocioAccionistas'
    ) as FormGroup;
    const VALUE = CONTROL.get('formaDatos')?.value;
    if (VALUE) {
      this.accionistasAgregados.emit(VALUE);
      CONTROL.get('formaDatos')?.reset();
    }
  }

  /**
   * @description Elimina los accionistas seleccionados y emite el evento correspondiente.
   * @returns {void}
   */
  
  eliminarAccionistas(): void {
      this.eliminarUnoConfirmationNotificacion.cerrar = false;
    if (this.empresaAccionistasSeleccionados.length) {
      this.accionistasEliminados.emit(this.empresaAccionistasSeleccionados);
    } else {
      this.abrirEliminarModal();
    }
  }

  /**
   * Abre un modal relacionado con las plantas Immex y configura una notificación
   * para alertar al usuario en caso de que no se hayan seleccionado datos de las plantas.
   *
   * La notificación configurada tiene las siguientes características:
   * - Tipo de notificación: 'alert'
   * - Categoría: 'danger'
   * - Modo: 'action'
   * - Título: vacío
   * - Mensaje: 'No se seleccionaron datos de las plantas Immex.'
   * - Cierre automático: habilitado
   * - Tiempo de espera: 2000 milisegundos
   * - Texto del botón Aceptar: 'Aceptar'
   * - Texto del botón Cancelar: vacío
   *
   * @returns {void} No retorna ningún valor.
   */
  abrirEliminarModal(): void {
    this.eliminarNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'No hay datos seleccionados en la tabla.',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

    /**
   * Abre un modal relacionado con las plantas Immex y configura una notificación
   * para alertar al usuario en caso de que no se hayan seleccionado datos de las plantas.
   *
   * La notificación configurada tiene las siguientes características:
   * - Tipo de notificación: 'alert'
   * - Categoría: 'danger'
   * - Modo: 'action'
   * - Título: vacío
   * - Mensaje: 'No se seleccionaron datos de las plantas Immex.'
   * - Cierre automático: habilitado
   * - Tiempo de espera: 2000 milisegundos
   * - Texto del botón Aceptar: 'Aceptar'
   * - Texto del botón Cancelar: vacío
   *
   * @returns {void} No retorna ningún valor.
   */
  abrirEliminarUnoConfirmationModal(): void {
    if(!this.empresaAccionistasSeleccionados.length) {
      this.abrirEliminarModal();
      return;
    }
    this.eliminarUnoConfirmationNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro de que quieres eliminar?',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

      /**
   * Método para manejar la selección de plantas IMMEX.
   * 
   * Este método recibe un evento de tipo `PlantasImmex` y lo agrega al arreglo
   * `plantasImmexSeleccionadoDatos`, asegurando que no se dupliquen entradas.
   * 
   * @param {PlantasImmex} event - Objeto de tipo `PlantasImmex` que representa la planta seleccionada.
   */
  closePlantasModal(): void {
    this.eliminarNotificacion.cerrar = false;
  }

  /**
   * @description Elimina los accionistas extranjeros seleccionados y emite el evento correspondiente.
   * @returns {void}
   */
  eliminarAccionistasExtrenjeros(): void {
    this.eliminarDosConfirmationNotificacion.cerrar = false;
    if (this.accionistasExtranjerosSeleccionados.length) {
      this.accionistasExtranjerosEliminado.emit(
        this.accionistasExtranjerosSeleccionados
      );
    } else {
      this.abrirEliminarModal();
    }
  }

      /**
   * Abre un modal relacionado con las plantas Immex y configura una notificación
   * para alertar al usuario en caso de que no se hayan seleccionado datos de las plantas.
   *
   * La notificación configurada tiene las siguientes características:
   * - Tipo de notificación: 'alert'
   * - Categoría: 'danger'
   * - Modo: 'action'
   * - Título: vacío
   * - Mensaje: 'No se seleccionaron datos de las plantas Immex.'
   * - Cierre automático: habilitado
   * - Tiempo de espera: 2000 milisegundos
   * - Texto del botón Aceptar: 'Aceptar'
   * - Texto del botón Cancelar: vacío
   *
   * @returns {void} No retorna ningún valor.
   */
  abrirEliminarDosConfirmationModal(): void {
      if(!this.accionistasExtranjerosSeleccionados.length) {
      this.abrirEliminarModal();
      return;
    }
    this.eliminarDosConfirmationNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: '¿Estás seguro de que quieres eliminar?',
      cerrar: true,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }
  /**
   * @description Maneja la modificación del formulario basado en la nacionalidad y el tipo de persona.
   * @returns {void}
   */
  handleModificarForma(): void {
    // First, save current form data immediately, with special focus on taxId
    const CONTROL = this.formaComplimentos.get('formaSocioAccionistas') as FormGroup;
    const CURRENT_DATA = CONTROL.get('formaDatos')?.value || {};
    
    // Store initial data from datosFormaComplimentos if available
    if (this.datosFormaComplimentos?.formaSocioAccionistas?.formaDatos) {
      Object.keys(this.datosFormaComplimentos.formaSocioAccionistas.formaDatos).forEach(key => {
        const VALUE = this.datosFormaComplimentos?.formaSocioAccionistas?.formaDatos?.[key];
        if (VALUE) {
          this.PRESERVED_FORM_DATA[key] = VALUE;
        }
      });
    }
    
    // Preserve all current fields, with explicit handling for taxId
    Object.keys(CURRENT_DATA).forEach(key => {
      const VALUE = CURRENT_DATA[key];
      if (VALUE !== undefined && VALUE !== null && VALUE !== '') {
        this.PRESERVED_FORM_DATA[key] = VALUE;
      }
    });
    
    // Double-check taxId preservation
    if (CURRENT_DATA.taxId && CURRENT_DATA.taxId.trim() !== '') {
      this.PRESERVED_FORM_DATA['taxId'] = CURRENT_DATA.taxId;
    }
    
    // Execute form modification immediately without timeout
    const VALUE = this.formaComplimentos.value;
    
    if (VALUE.formaSocioAccionistas.nationalidadMaxicana === 'true') {
      this.modificarFormulario(
        TIPO_FORMA.NATIONALIDAD_MEXICANA,
        this.camposFormularioNationalidad
      );
    } else {
      if (VALUE.formaSocioAccionistas.tipoDePersona === 'true') {
        this.modificarFormulario(
          TIPO_FORMA.TIPO_PERSONA,
          this.camposFormularioTipoPersona
        );
      } else {
        this.modificarFormulario(
          TIPO_FORMA.DEFAULT,
          this.camposFormularioDefault
        );
      }
    }
  }

  /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
   cambioFechaFinal(nuevo_valor: string): void {
    this.formaComplimentos.patchValue({
      fechaExpedicion: nuevo_valor,
    });
    this.tramiteStore.setfechaExpedicion(nuevo_valor);
  }

    /**
   * Maneja los cambios en el campo "Fecha de Pago".
   * Actualiza el estado del almacén con la fecha de pago proporcionada.  
   */
   cambioFecha(nuevo_valor: string): void {
    this.formaComplimentos.patchValue({
      fechaDeActa: nuevo_valor,
    });
    this.tramiteStore.setfechaDeActa(nuevo_valor);
  }

  /**
   * Clears all preserved form data
   */
  private clearPreservedData(): void {
    this.PRESERVED_FORM_DATA = {};
  }

  /**
   * Gets the appropriate error message for the main RFC field validation (formaModificaciones.rfc only)
   * @returns {string} The error message to display
   */
  getRfcErrorMessage(): string {
    if (!this.formaComplimentos) {
      return 'Formulario no inicializado';
    }
    
    // ONLY get errors from the main RFC field, not the dynamic form RFC
    const RFC_CONTROL = this.formaComplimentos.get('formaModificaciones')?.get('rfc');
    
    if (!RFC_CONTROL?.errors) {
      return '';
    }

    if (RFC_CONTROL.errors['required']) {
      return 'El RFC es obligatorio';
    }
    
    if (RFC_CONTROL.errors['minlength']) {
      return 'El RFC no se encontró, favor de verificar';
    }
    
    if (RFC_CONTROL.errors['maxlength']) {
      return 'El RFC no se encontró, favor de verificar';
    }
    
    if (RFC_CONTROL.errors['pattern']) {
      return 'El RFC no se encontró, favor de verificar';
    }

    return 'El RFC tiene errores de validación';
  }

  /**
   * Handles MAIN RFC field blur event to show validation popup (formaModificaciones.rfc only)
   */
  onRfcBlur(): void {
    // Set flag to indicate we're processing RFC validation
    this.isProcessingRfcValidation = true;
    
    // Only target the main RFC field in formaModificaciones
    const RFC_CONTROL = this.formaComplimentos.get('formaModificaciones')?.get('rfc');
    if (RFC_CONTROL) {
      RFC_CONTROL.markAsTouched();
      // Only check validation for the main RFC field specifically on blur
      this.checkRfcValidationOnly();
    }
    
    // Reset flag after a delay
    setTimeout(() => {
      this.isProcessingRfcValidation = false;
    }, 200);
  }

  /**
   * Handles MAIN RFC field input change to show validation popup (formaModificaciones.rfc only)
   * Only triggers when called directly from the main RFC input field
   */
  onRfcChange(): void {
    // Set flag to indicate we're processing RFC validation
    this.isProcessingRfcValidation = true;
    
    // Clear any existing notification first
    this.clearRfcNotification();
    
    // Check validation after a slight delay to allow the value to be updated
    setTimeout(() => {
      // Only target the main RFC field in formaModificaciones
      const RFC_CONTROL = this.formaComplimentos.get('formaModificaciones')?.get('rfc');
      if (RFC_CONTROL && RFC_CONTROL.value) {
        RFC_CONTROL.markAsTouched();
        RFC_CONTROL.updateValueAndValidity();
        // Only check validation for the main RFC field specifically and only if it has a value
        this.checkRfcValidationOnly();
      }
      
      // Reset flag
      this.isProcessingRfcValidation = false;
    }, 100);
  }

  /**
   * Checks ONLY the main RFC validation (formaModificaciones.rfc) and shows notification if invalid
   * This method is separate from other form validations to avoid interference
   * Specifically ignores the dynamic form RFC field (formaDatos.rfc)
   */
  private checkRfcValidationOnly(): void {
    if (!this.formaComplimentos) {
      return;
    }

    // ONLY proceed if we're explicitly processing RFC validation
    if (!this.isProcessingRfcValidation) {
      return;
    }

    // ONLY check the main RFC field in formaModificaciones, NOT the dynamic form RFC
    const RFC_CONTROL = this.formaComplimentos.get('formaModificaciones')?.get('rfc');
    
    // Additional check: ensure we're not processing other form events
    const ACTIVE_ELEMENT = document.activeElement as HTMLInputElement;
    const IS_RFC_FIELD = ACTIVE_ELEMENT?.id === 'rfc' || 
                        (RFC_CONTROL?.touched && RFC_CONTROL?.value && RFC_CONTROL?.value.trim() !== '');
    
    // Ensure we're only checking the specific main RFC field and user is actually interacting with it
    if (RFC_CONTROL?.invalid && RFC_CONTROL?.touched && RFC_CONTROL?.value && 
        RFC_CONTROL?.value.trim() !== '' && IS_RFC_FIELD) {
      const ERROR_MESSAGE = this.getRfcErrorMessage();
      
      // Only show notification if there's actually an error message and no notification is already shown
      if (ERROR_MESSAGE && ERROR_MESSAGE.trim() !== '' && !this.nuevaNotificacionRfc) {
        this.nuevaNotificacionRfc = {
          tipoNotificacion: 'alert',
          categoria: 'danger',
          modo: 'action',
          titulo: '',
          mensaje: ERROR_MESSAGE,
          cerrar: false,
          tiempoDeEspera: 3000,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        };
      }
    } else if (RFC_CONTROL?.valid && IS_RFC_FIELD) {
      // Clear notification if main RFC field becomes valid and we're in RFC context
      this.clearRfcNotification();
    }
  }

  /**
   * Clears the RFC notification
   */
  private clearRfcNotification(): void {
    if (this.nuevaNotificacionRfc) {
      this.nuevaNotificacionRfc = undefined as unknown as Notificacion;
    }
  }

  /**
   * Handles notification confirmation for RFC validation
   * @param confirmar Indicates if the user confirmed the notification
   */
  confirmarNotificacionRfc(confirmar: boolean): void {
    if (confirmar) {
      // Clear the notification
      this.clearRfcNotification();
      
      // Optionally focus back on the RFC field
      const RFC_INPUT = document.getElementById('rfc');
      if (RFC_INPUT) {
        RFC_INPUT.focus();
      }
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    this.clearPreservedData();
  }

  /**
   * Handles input change for Página web field and converts to uppercase
   * @param event Input event
   */
  onPaginaInputChange(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const UPPERCASEVALUE = INPUT.value.toUpperCase();

    // Update the form control value
    this.formaComplimentos.get('datosGeneralis')?.get('paginaWWeb')?.setValue(UPPERCASEVALUE, { emitEvent: false });
    
    // Update the input field display
    INPUT.value = UPPERCASEVALUE;
  }

  /**
   * Handles input change for Localización field and converts to uppercase
   * @param event Input event
   */
  onLocalizacionInputChange(event: Event): void {
    const INPUT = event.target as HTMLInputElement;
    const UPPERCASEVALUE = INPUT.value.toUpperCase();

    // Update the form control value
    this.formaComplimentos.get('datosGeneralis')?.get('localizacion')?.setValue(UPPERCASEVALUE, { emitEvent: false });

    // Update the input field display
    INPUT.value = UPPERCASEVALUE;
  }

  /**
   * Handles keypress events to allow only letters and common characters
   * @param event Keyboard event
   * @returns boolean indicating if the key should be allowed
   */
  onKeyPress(event: KeyboardEvent): boolean {
    const CHAR = String.fromCharCode(event.which);
    const ALLOWEDPATTERN = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s.\-_:/@]$/;
    
    // Allow backspace, delete, tab, escape, enter
    if (event.which === 8 || event.which === 46 || event.which === 9 || 
        event.which === 27 || event.which === 13) {
      return true;
    }
    
  if (event.ctrlKey && (event.which === 65 || event.which === 67 || 
        event.which === 86 || event.which === 88 || event.which === 90)) {
      return true;
    }
    
    // Test the character against the pattern
    if (!ALLOWEDPATTERN.test(CHAR)) {
      event.preventDefault();
      return false;
    }
    
    return true;
  }

  /**
 * Marca como tocado el control especificado dentro del formulario de socios accionistas al perder el foco.
 * @param campo - Nombre del campo que perdió el foco.
 */
  onDesenfoque(campo: string): void {
    const CONTROL = this.formaComplimentos.get(`formaSocioAccionistas.formaDatos.${campo}`);
    CONTROL?.markAsTouched();
  }

  /**
 * Actualiza el valor del campo especificado en el formulario de socios accionistas cuando cambia su valor.
 * Marca el control como tocado y actualiza su validez; si el valor está vacío, lo marca como modificado.
 * @param event - Evento de cambio del input.
 * @param campo - Nombre del campo a actualizar.
 */
  onCambio(event: Event, campo: string): void {
    const VALOR = (event.target as HTMLInputElement).value;
    const CONTROL = this.formaComplimentos.get(`formaSocioAccionistas.formaDatos.${campo}`);
    if (VALOR) {
      CONTROL?.setValue(VALOR, { emitEvent: true });
      CONTROL?.markAsTouched({ onlySelf: true });
      CONTROL?.updateValueAndValidity();
    } else {
      CONTROL?.markAsDirty();
    }
  }
}