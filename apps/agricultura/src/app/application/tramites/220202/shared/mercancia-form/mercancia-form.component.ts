import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import {
  AnimalesEventos,
  AnimalesFormularioSolicitud,
  DatosDeLaSolicitud,
  Sensible,
} from '../../../../shared/models/datos-de-la-solicitue.model';
import {
  Catalogo,
  CatalogoSelectComponent,
  CrosslistComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule, Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import {
  CrossListEtiqueta,
  FilaSolicitud,
  ListaDeDatosFinal,
} from '../../models/220202/fitosanitario.model';
import { AgriculturaApiService } from '../../services/220202/agricultura-api.service';
import { FitosanitarioQuery } from '../../queries/fitosanitario.query';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@Component({
  selector: 'app-mercancia-form',
  standalone: true,
  imports: [
    CommonModule,
    CatalogoSelectComponent,
    TituloComponent,
    ReactiveFormsModule,
    CrosslistComponent,
    TooltipModule
  ],
  templateUrl: './mercancia-form.component.html',
})
export class MercanciaFormComponent implements OnInit, OnDestroy {

  /**
   * Representa el formulario reactivo utilizado para gestionar los datos de la mercancía
   * en el componente de detalles de animales vivos.
   *
   * @type {FormGroup}
   */
  mercanciaForm!: FormGroup;

  /**
   * Lista de referencias a todos los componentes CrosslistComponent presentes en la plantilla.
   * Utiliza ViewChildren para obtener acceso a múltiples instancias del componente CrosslistComponent
   * Esta propiedad permite interactuar con los métodos y propiedades de los componentes
   * @type {QueryList<CrosslistComponent>}
   * @see CrosslistComponent
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Representa el formulario reactivo utilizado para gestionar los detalles específicos
   * de los animales vivos, como número de lote, color de pelaje, edad, etc.
   *
   * @type {FormGroup}
   */
  detalleForm!: FormGroup;

  /**
   * Datos de la solicitud que se recibirán como entrada en el componente.
   * @type {DatosDeLaSolicitud}
   */
  @Input() catalogosDatos: DatosDeLaSolicitud = {} as DatosDeLaSolicitud;

  @Output() cerrar = new EventEmitter<void>();

  /**
   * Lista de tipos de requisito disponibles para el selector correspondiente en el formulario.
   * @type {Catalogo[]}
   */
  public tipoRequisitoList: Catalogo[] = [];

  /**
   * Lista de fracciones arancelarias disponibles para el selector correspondiente en el formulario.
   * @type {Catalogo[]}
   */
  public fraccionArancelariaList: Catalogo[] = [];

  /**
   * Lista de NICO (Número de Identificación Comercial) disponibles para el selector correspondiente en el formulario.
   * @type {Catalogo[]}
   */
  public nicoList: Catalogo[] = [];

  /**
   * Lista de Unidades de Medida de Tarifa (UMT) disponibles para el selector correspondiente en el formulario.
   * @type {Catalogo[]}
   */
  public umtList: Catalogo[] = [];

  /**
   * Lista de Unidades de Medida Comercial (UMC) disponibles para el selector correspondiente en el formulario.
   * @type {Catalogo[]}
   */
  public umcList: Catalogo[] = [];

  /**
   * Lista de usos disponibles para el selector correspondiente en el formulario.
   * @type {Catalogo[]}
   */
  public usoList: Catalogo[] = [];

  /**
   * Lista de países de origen disponibles para el selector correspondiente en el formulario.
   * @type {Catalogo[]}
   */
  public paisOrigenList: Catalogo[] = [];

  /**
   * Lista de países de procedencia disponibles para el selector correspondiente en el formulario.
   * @type {Catalogo[]}
   */
  public paisDeProcedenciaList: Catalogo[] = [];

  /**
   * Lista de datos sensibles que se mostrarán en la tabla de detalles de animales vivos.
   *
   * @type {Sensible[]}
   */
  @Input() sensiblesTablaDatos: Sensible[] = [];

  /**
   * Datos del formulario de solicitud de animales vivos.
   * Este objeto contiene la información relacionada con la solicitud de animales vivos,
   * como los detalles de la mercancía y los datos específicos de los animales.
   *
   * @type {AnimalesFormularioSolicitud}
   */
  @Input() formularioSolicitud!: AnimalesFormularioSolicitud;

  /**
   * Evento que se emite cuando se agregan datos al formulario de solicitud de animales vivos.
   * Este evento permite al componente padre recibir los datos del formulario para su procesamiento.
   *
   * @type {EventEmitter<AnimalesEventos>}
   */
  @Output() agregarDatosFormulario = new EventEmitter<AnimalesEventos>();

  /**
   * Etiquetas para la lista cruzada de normas seleccionadas.
   * @type {CrossListEtiqueta}
   */
  public usoNormaSeleccionadaLabel: CrossListEtiqueta = {
    tituluDeLaIzquierda: 'Nombre científico',
    derecha: 'Nombre científico seleccionado',
  };

  /**
   * Sujeto para manejar la destrucción de observables y evitar fugas de memoria.
   *
   * @type {Subject<void>}
   * @private
   */
  private destroy$ = new Subject<void>();

  /**
   * Define el tipo de selección de la tabla, en este caso, se utiliza un checkbox para seleccionar filas.
   *
   * @type {TablaSeleccion}
   */
  public tablaSeleccion = TablaSeleccion.CHECKBOX;

  /**
   * Almacena los datos sensibles seleccionados en la tabla.
   * Esta propiedad se utiliza para realizar operaciones como eliminar o procesar los datos seleccionados.
   *
   * @type {Sensible[]}
   */
  public sensiblesTablaSeleccionada: Sensible[] = [];

  /**
   * @description Sujeto privado que notifica la destrucción del componente.
   * @type {Subject<void>}
   */
  private destroyNotifier$ = new Subject<void>();

  /**
   * @description Arreglo público que almacena una lista de datos para uso en la funcionalidad de lista cruzada.
   * @type {string[]}
   */
  public usoCrossListDatos: string[] = [];

  /**
   * Constructor del componente.
   *
   * @param fb FormBuilder para crear formularios reactivos.
   * @param ubicaccion Servicio de ubicación para navegar entre rutas.
   * @param route Ruta activa para obtener parámetros de la URL.
   * @param agriculturaApiService Servicio para interactuar con la API de Agricultura.
   * @param fitosanitarioQuery Consulta para obtener datos relacionados con fitosanitarios.
   */
  constructor(
    private fb: FormBuilder,
    private ubicaccion: Location,
    private route: ActivatedRoute,
    private readonly agriculturaApiService: AgriculturaApiService,
    private readonly fitosanitarioQuery: FitosanitarioQuery
  ) { }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Aquí se crea el formulario reactivo y se configuran los campos necesarios.
   */
  ngOnInit(): void {
    // Cargar todos los catálogos necesarios
    this.cargarTodosLosCatalogos();

    this.fitosanitarioQuery
      .select((state: ListaDeDatosFinal) => state.usoCrossListDatos)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: string[]) => {
        this.usoCrossListDatos = datos;
      });
    this.mercanciaForm = this.fb.group({
      tipoRequisito: ['', Validators.required],
      requisito: ['', Validators.required],
      numeroCertificadoInternacional: [
        '',
        [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)],
      ],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: '', disabled: true }],
      nico: ['', Validators.required],
      descripcionNico: [{ value: '', disabled: true }],
      descripcion: [
        '',
        [Validators.required, Validators.maxLength(1000), Validators.pattern(/^[a-zA-Z0-9]*$/)],
      ],
      cantidadUMT: ['', [Validators.required, MercanciaFormComponent.maxDecimalsValidator, MercanciaFormComponent.maxWholeNumbersValidator]],
      umt: [{ value: '', disabled: true }],
      cantidadUMC: ['', [Validators.required, MercanciaFormComponent.maxDecimalsValidator, MercanciaFormComponent.maxWholeNumbersValidator]],
      umc: ['', Validators.required],
      uso: ['', Validators.required],
      tipoProducto: ['', Validators.required],
      numeroDeLote: ['', [Validators.maxLength(16)]],
      paisOrigen: ['', Validators.required],
      paisDeProcedencia: ['', Validators.required],
    });

    if (this.formularioSolicitud) {
      this.mercanciaForm.patchValue({
        ...this.formularioSolicitud
      });
    }

    const ID = this.route.snapshot.paramMap.get('id');
    if (ID) {
      this.fitosanitarioQuery.seleccionarDatosSeleccionados$
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((selectedData: FilaSolicitud[]) => {
          const FOUND = selectedData[0]; // Tomar el primer elemento seleccionado
          if (FOUND) {
            this.mercanciaForm.patchValue({
              tipoRequisito: FOUND.tipoRequisito || '1',
              requisito: FOUND.requisito || '',
              numeroCertificadoInternacional: FOUND.numeroCertificadoInternacional || '',
              fraccionArancelaria: FOUND.fraccionArancelaria || '',
              descripcionFraccion: FOUND.descripcionFraccion || '',
              nico: FOUND.nico || '',
              descripcionNico: FOUND.descripcionNico || '',
              descripcion: FOUND.descripcion || '',
              cantidadUMT: FOUND.cantidadUMT || '',
              umt: FOUND.umt || '',
              cantidadUMC: FOUND.cantidadUMC || '',
              umc: FOUND.umc || '',
              uso: FOUND.uso || '',
              tipoProducto: FOUND.tipoDeProducto || '',
              numeroDeLote: FOUND.numeroDeLote || '',
              paisOrigen: FOUND.paisDeOrigen || '',
              paisDeProcedencia: FOUND.paisDeProcedencia || '',
            });
          }
        });
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Aquí se completa el sujeto de destrucción para evitar fugas de memoria.
   */
  tipoSelecionada(event: Catalogo): void {
    const FRACCION_SELECCIONADA = this.fraccionArancelariaList.find((fraccion) => fraccion.id === event.id);
    if (FRACCION_SELECCIONADA) {
      this.mercanciaForm.patchValue({
        descripcionFraccion: FRACCION_SELECCIONADA.descripcion,
        descripcionNico: FRACCION_SELECCIONADA.descripcion,
        umt: FRACCION_SELECCIONADA.descripcion
      });
    }
  }

  /**
   * @description Carga todos los catálogos necesarios para los selectores del formulario.
   * @method cargarTodosLosCatalogos
   * @returns {void}
   */
  cargarTodosLosCatalogos(): void {
    // Cargar tipo de requisito
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tipoList) => {
        this.tipoRequisitoList = tipoList as Catalogo[];
      });

    // Cargar fracción arancelaria
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.fraccionArancelariaList = data as Catalogo[];
      });

    // Cargar NICO
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.nicoList = data as Catalogo[];
      });

    // Cargar UMT
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.umtList = data as Catalogo[];
      });

    // Cargar UMC
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.umcList = data as Catalogo[];
      });

    // Cargar uso
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.usoList = data as Catalogo[];
      });

    // Cargar país de origen
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.paisOrigenList = data as Catalogo[];
      });

    // Cargar país de procedencia
    this.agriculturaApiService
      .obtenerSelectorList('nombre.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((data) => {
        this.paisDeProcedenciaList = data as Catalogo[];
      });
  }

  /**
   * @description Arreglo de objetos que define los botones para la funcionalidad de entrada de aduanas.
   * Cada objeto contiene el nombre del botón, la clase CSS para su estilo y la función asociada que se ejecuta al hacer clic.
   * @type {Array<{btnNombre: string, class: string, funcion: () => void}>}
   */
  aduanasEntradaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[0].quitar('t'),
    },
  ];

  /**
   * Limpia los datos relacionados con los animales vivos.
   * Este método vacía el arreglo `sensiblesTablaDatos` y reinicia el formulario `mercanciaForm`,
   * dejando ambos en su estado inicial. Útil para restablecer el formulario y los datos de la tabla
   * cuando se requiere comenzar una nueva operación o descartar los cambios actuales.
   */
  limpiarAnimalesVivo(): void {
    this.mercanciaForm.reset();
  }

  /**
   * Navega a la ubicación anterior en el historial de navegación.
   * Utiliza el servicio de ubicación para retroceder una página.
   */
  cancelar(): void {
    this.cerrar.emit();
  }

  /**
   * Método para agregar animales a la lista de datos sensibles.
   * Actualmente no implementa ninguna funcionalidad, pero se puede extender en el futuro.
   */
  agregarAnimales(): void {
    this.agregarDatosFormulario.emit(
      {
        formulario: this.mercanciaForm.getRawValue(),
        tablaDatos: this.sensiblesTablaDatos
      }
    );
    this.cerrar.emit();
  }

  /**
   * Validador personalizado para verificar si el número tiene más de 3 decimales
   * @param control - Control del formulario a validar
   * @returns ValidationErrors si tiene más de 3 decimales, null si es válido
   */
  static maxDecimalsValidator(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }

    const STRING_VALUE = VALUE.toString();
    const DECIMAL_PART = STRING_VALUE.split('.')[1];

    if (DECIMAL_PART && DECIMAL_PART.length > 3) {
      return { maxDecimals: true };
    }

    return null;
  }

  /**
   * Validador personalizado para verificar si el número tiene más de 12 números enteros
   * @param control - Control del formulario a validar  
   * @returns ValidationErrors si tiene más de 12 números enteros, null si es válido
   */
  static maxWholeNumbersValidator(control: AbstractControl): ValidationErrors | null {
    const VALUE = control.value;
    if (!VALUE) {
      return null;
    }

    const STRING_VALUE = VALUE.toString();
    const WHOLE_PART = STRING_VALUE.split('.')[0];

    if (WHOLE_PART.length > 12) {
      return { maxWholeNumbers: true };
    }

    return null;
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de destruir el componente.
   * Emite una señal a través del observable `destroy$` para notificar a los suscriptores que deben limpiar recursos y cancelar suscripciones.
   * Posteriormente, completa el observable para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
