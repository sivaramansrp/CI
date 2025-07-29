/**
 * Importaciones necesarias para el componente de empresas.
 * Incluye servicios, modelos, componentes compartidos y decoradores de Angular.
 */
import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  InputFechaComponent,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  Component,
  EventEmitter,
  Input,
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

import { DatosCatalago, INPUT_FECHA_CONFIG } from '../../../tramites/80102/models/autorizacion-programa-nuevo.model';
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
    InputFechaComponent
  ],
  templateUrl: './complimentos.component.html',
  styleUrl: './complimentos.component.scss',
})
/**
 * Clase ComplimentosComponent.
 * Gestiona la lógica del componente Complimentos, incluyendo inicialización y limpieza.
 */
export class ComplimentosComponent implements OnInit, OnDestroy {

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
   * @type {Catalogo[]}
   * @description lista de catálogos.
   */
  estados!: Catalogo[];

  /**
   * @type {Subscription}
   * @description Suscripción privada inicializada como una nueva suscripción.
   */
  private subscription: Subscription = new Subscription();

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
     private tramiteStore: TramiteStore
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
        paginaWWeb: ['', Validators.required],
        localizacion: ['', Validators.required],
      }),
      obligacionesFiscales: this.fb.group({
        opinionPositiva: [{ value: '', disabled: true }],
        fechaExpedicion: ['', Validators.required],
        aceptarObligacionFiscal: [''],
      }),
      formaModificaciones: this.fb.group({
        nombreDelFederatario: ['', Validators.required],
        nombreDeNotaria: ['', Validators.required],
        estado: ['', Validators.required],
        nombreDeActa: ['', Validators.required],
        fechaDeActa: ['', Validators.required],
        rfc: ['', [Validators.required, Validators.maxLength(13)]],
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
    if (this.datosFormaComplimentos) {
      this.formaComplimentos.patchValue(this.datosFormaComplimentos);
    }
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

    this.formaComplimentos.valueChanges
      .pipe(delay(100))
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((_) => {
        this.complimentosDatos.emit(this.formaComplimentos.value);
        this.formaValida.emit(this.formaComplimentos.valid);
      });

    if (this.datosFormaComplimentos) {
      this.formaComplimentos.patchValue(this.datosFormaComplimentos);
    }

    if(this.formularioDeshabilitado ) {
      this.formaComplimentos.disable();
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
          taxId: ['', Validators.required],
          razonSocial: ['', Validators.required],
          pais: ['', Validators.required],
          codigoPostal: ['', Validators.required],
          estado: ['', Validators.required],
          correoElectronico: ['', Validators.required],
        });

      case TIPO_FORMA.TIPO_PERSONA:
        return this.fb.group({
          taxId: ['', Validators.required],
          nombre: ['', Validators.required],
          pais: ['', Validators.required],
          codigoPostal: ['', Validators.required],
          estado: ['', Validators.required],
          correoElectronico: ['', Validators.required],
          apellidoPaterno: ['', Validators.required],
        });
      case TIPO_FORMA.NATIONALIDAD_MEXICANA:
        return this.fb.group({
          rfc: ['', [Validators.required, Validators.maxLength(13)]],
        });

      default:
        return this.fb.group({
          taxId: ['', Validators.required],
          razonSocial: ['', Validators.required],
          pais: ['', Validators.required],
          codigoPostal: ['', Validators.required],
          estado: ['', Validators.required],
          correoElectronico: ['', Validators.required],
        });
        break;
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
    CONTROL.removeControl('formaDatos', { emitEvent: false });
    this.camposFormulario = [...camposDelFormulario];
    setTimeout(() => {
      CONTROL.setControl('formaDatos', this.obtainerFormaDatos(tipoForma), {
        emitEvent: false,
      });
    }, 10);
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
        this.camposFormularioDefault[INDICE].opciones = datos;
        this.camposFormularioTipoPersona[INDICEALT].opciones = datos;
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
    }
  }

  /**
   * @description Elimina los accionistas seleccionados y emite el evento correspondiente.
   * @returns {void}
   */
  eliminarAccionistas(): void {
    if (this.empresaAccionistasSeleccionados.length) {
      this.accionistasEliminados.emit(this.empresaAccionistasSeleccionados);
    }
  }

  /**
   * @description Elimina los accionistas extranjeros seleccionados y emite el evento correspondiente.
   * @returns {void}
   */
  eliminarAccionistasExtrenjeros(): void {
    if (this.accionistasExtranjerosSeleccionados.length) {
      this.accionistasExtranjerosEliminado.emit(
        this.accionistasExtranjerosSeleccionados
      );
    }
  }

  /**
   * @description Maneja la modificación del formulario basado en la nacionalidad y el tipo de persona.
   * @returns {void}
   */
  handleModificarForma(): void {
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
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}