import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import {
  AnimalesEventos,
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
  DatosMercancia,
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
  styleUrls: ['./mercancia-form.component.scss']
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
  @Input() catalogosDatos: DatosMercancia = {} as DatosMercancia;

  @Output() cerrar = new EventEmitter<void>();

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
  @Input() formularioSolicitud!: FilaSolicitud;

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
   * Indica si el formulario tiene errores de validación.
   *
   * Se utiliza para mostrar/ocultar el alert de errores en el modal.
   */
  esFormaValido: boolean = false;

  /**
   * Mensaje de error del formulario para mostrar en el alert.
   *
   * Contiene el HTML del mensaje de error a mostrar cuando hay validaciones fallidas.
   */
  formErrorAlert: string = '<strong>¡Error de registro! </strong> Faltan campos por capturar';

  /**
   * Flag to track if form submission has been attempted
   * Used to control when to show validation errors for disabled fields
   */
  formSubmissionAttempted: boolean = false;

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
    this.crearFormulario();

    this.fitosanitarioQuery
      .select((state: ListaDeDatosFinal) => state.usoCrossListDatos)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: string[]) => {
        this.usoCrossListDatos = datos;
    });
  }

  crearFormulario(): void {
    this.mercanciaForm = this.fb.group({
      id: [0],
      tipoRequisito: ['', Validators.required],
      requisito: ['', Validators.required],
      numeroCertificadoInternacional: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      fraccionArancelaria: ['', Validators.required],
      descripcionFraccion: [{ value: '', disabled: true }, Validators.required],
      nico: ['', Validators.required],
      descripcionNico: [{ value: '', disabled: true }],
      descripcion: [
        '',
        [Validators.required, Validators.maxLength(1000), Validators.pattern(/^[a-zA-Z0-9]*$/)],
      ],
      cantidadUMT: ['', [Validators.required, MercanciaFormComponent.maxDecimalsValidator, MercanciaFormComponent.maxWholeNumbersValidator]],
      umt: [{ value: '', disabled: true }, Validators.required],
      cantidadUMC: ['', [Validators.required, MercanciaFormComponent.maxDecimalsValidator, MercanciaFormComponent.maxWholeNumbersValidator]],
      umc: ['', Validators.required],
      uso: ['', Validators.required],
      paisDeOrigen: ['', Validators.required],
      paisDeProcedencia: ['', Validators.required],
      tipoProducto: [''],
      numeroDeLote: ['']
    });

    if (this.formularioSolicitud) {
      this.mercanciaForm.patchValue({
        ...this.formularioSolicitud
      });
    }
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Aquí se completa el sujeto de destrucción para evitar fugas de memoria.
   */
  tipoSelecionada(event: Catalogo): void {
    const FRACCION_SELECCIONADA = this.catalogosDatos.fraccionArancelariaList.find((fraccion) => fraccion.id === event.id);
    if (FRACCION_SELECCIONADA) {
      this.mercanciaForm.patchValue({
        descripcionFraccion: FRACCION_SELECCIONADA.descripcion,
        descripcionNico: FRACCION_SELECCIONADA.descripcion,
        umt: FRACCION_SELECCIONADA.descripcion
      });
    }
  }

  /**
   * @description Arreglo de objetos que define los botones para la funcionalidad de entrada de aduanas.
   * Cada objeto contiene el nombre del botón, la clase CSS para su estilo y la función asociada que se ejecuta al hacer clic.
   * @type {Array<{btnNombre: string, class: string, funcion: () => void}>}
   */
  aduanasEntradaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn btn-default',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn btn-primary',
      funcion: (): void => this.crossList.toArray()[0].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn btn-default',
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
    this.formSubmissionAttempted = false;
    this.cerrar.emit();
  }

  /**
   * Método para agregar animales a la lista de datos sensibles.
   * Actualmente no implementa ninguna funcionalidad, pero se puede extender en el futuro.
   */
  agregarAnimales(): void {
    this.formSubmissionAttempted = true;
    
    if (this.mercanciaForm.invalid) {
      this.mercanciaForm.markAllAsTouched();
      this.esFormaValido = true;
    }
    else {
      this.agregarDatosFormulario.emit(
        {
          formulario: this.mercanciaForm.getRawValue(),
          tablaDatos: this.sensiblesTablaDatos
        }
      );
      this.cerrar.emit();
      this.esFormaValido = false;
    }
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
