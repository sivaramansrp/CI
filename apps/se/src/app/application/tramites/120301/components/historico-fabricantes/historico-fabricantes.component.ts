
import { CommonModule } from '@angular/common';

import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject, delay, map, takeUntil, tap } from 'rxjs';

import {
  CatalogosSelect,
  ConfiguracionColumna,
  InputRadioComponent,
  SeccionLibQuery,
  SeccionLibState,
  SeccionLibStore,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@ng-mf/data-access-user';

import radioOptionsData from '@libs/shared/theme/assets/json/120301/tipos-de-fabricante-exportador.json';
import unidadRadioFields from '@libs/shared/theme/assets/json/220401/unidad.json';

import {
  CATALOGOS,
  ERROR_FORMA_ALERT,
  VALIDO,
} from '../../constantes/elegibilidad-de-textiles.enums';

import {
  ElegibilidadDeTextilesStore,
  TextilesState,
} from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HistoricoColumns } from '../../models/elegibilidad-de-textiles.model';


/**
 * @component HistoricoFabricantesComponent
 * @description
 * Componente responsable de manejar el historial de fabricantes en el trámite de elegibilidad de textiles.
 * Permite capturar, mostrar y gestionar fabricantes nacionales mediante formularios y tablas dinámicas.
 * Gestiona el estado de validez del formulario y la sincronización con el store de la aplicación.
 *
 * @example
 * <app-historico-fabricantes [formularioDeshabilitado]="true"></app-historico-fabricantes>
 *
 * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
 * @property {FormGroup} historicoFabricantesForm - Formulario reactivo para capturar datos de fabricantes.
 * @property {any[]} radioOptions - Opciones de radio para el formulario.
 * @property {string | number} selectedValue - Valor seleccionado del radio.
 * @property {string | number} defaultSelect - Valor por defecto del select.
 * @property {any[]} radioBoton - Opciones de radio para el formulario.
 * @property {TablaSeleccion} TablaSeleccion - Configuración para la selección de tablas.
 * @property {ConfiguracionColumna<HistoricoColumns>[]} tableColumns - Columnas de la tabla de fabricantes nacionales.
 * @property {HistoricoColumns[]} fabricantesNacionales - Datos de fabricantes nacionales.
 * @property {CatalogosSelect[]} dropdownConfigs - Configuraciones de los dropdowns.
 *
 * @method ngOnInit Inicializa el componente y obtiene los datos de los fabricantes.
 * @method ngOnDestroy Limpia las suscripciones al destruir el componente.
 * @method initActionFormBuild Inicializa el formulario reactivo.
 * @method recuperarDatos Obtiene los datos de fabricantes nacionales.
 * @method onValueChange Maneja el cambio de valor del radio.
 * @method setValoresStore Establece valores en el store de textiles.
 *
 * @see ElegibilidadDeTextilesStore
 * @see ElegibilidadDeTextilesQuery
 * @see SeccionLibStore
 * @see SeccionLibQuery
 * @see ElegibilidadTextilesService
 */
@Component({
  selector: 'app-historico-fabricantes',
  templateUrl: './historico-fabricantes.component.html',
  styleUrls: ['./historico-fabricantes.component.scss'],
  standalone: true,
  imports: [
    TituloComponent,
    CommonModule,
    ReactiveFormsModule,
    InputRadioComponent,
    TablaDinamicaComponent,
  ],
})
export class HistoricoFabricantesComponent implements OnInit, OnDestroy {
  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.
   * Propiedad de entrada que controla si todos los controles del formulario deben estar deshabilitados.
   * Cuando es true, impide la edición de cualquier campo del formulario de histórico de fabricantes.
   * Se utiliza para casos donde el formulario debe ser de solo lectura o en estados de visualización.
   */
  @Input()
  formularioDeshabilitado: boolean = false;

  /**
   * @property {FormGroup} historicoFabricantesForm - El grupo de formularios para capturar los datos de los fabricantes.
   * Formulario reactivo principal que contiene todos los controles necesarios para la gestión
   * del historial de fabricantes, incluyendo información fiscal, selecciones de tipo de fabricante
   * y datos de fabricantes nacionales. Maneja validaciones y sincronización con el estado global.
   */
  historicoFabricantesForm!: FormGroup;

    /**
   * @property {string} formularioAlertaError
   * @description
   * Mensaje HTML que se muestra cuando el formulario no es válido y faltan campos requeridos por capturar.
   * Se utiliza para mostrar una alerta visual al usuario en la interfaz.
   * Vacío cuando el formulario es válido.
   */
  public formularioAlertaError: string = '';

  /**
   * @property {boolean} esFormaValido
   * @description
   * Bandera booleana que indica si el formulario tiene errores de validación.
   * Si es `true`, se muestra el mensaje de error; si es `false`, el formulario es válido y no se muestra la alerta.
   */
  public esFormaValido: boolean = false;

  /**
   * @property {EventEmitter<boolean>} mostrarTabs - Emite un valor booleano para mostrar las pestañas adicionales.
   * EventEmitter que comunica al componente padre cuándo debe mostrar las pestañas de navegación.
   * Se activa cuando el usuario completa exitosamente el proceso de guardado o validación.
   * Permite la coordinación entre componentes para la navegación de la interfaz.
   */
  @Output() mostrarTabs: EventEmitter<boolean> = new EventEmitter<boolean>();  

  /**
   * @property {any[]} radioOptions - Opciones de radio para el formulario de tipo de fabricante exportador.
   * Contiene las configuraciones y opciones disponibles para los controles de radio button
   * relacionados con el tipo de fabricante exportador. Se inicializa con datos estáticos
   * importados desde un archivo JSON externo que define las opciones de selección.
   */
  radioOptions = radioOptionsData;

  /**
   * @property {string | number} selectedValue - Valor seleccionado del radio button.
   * Almacena el valor actualmente seleccionado en los controles de radio button del formulario.
   * Puede ser de tipo string o number dependiendo del tipo de opción seleccionada.
   * Se actualiza cuando el usuario cambia la selección en los controles de radio.
   */
  selectedValue: string | number = '';

  /**
   * @property {string | number} defaultSelect - Valor por defecto del control de selección.
   * Define el valor inicial que debe mostrarse en los controles de selección cuando
   * el componente se inicializa. Proporciona un estado predeterminado para la interfaz.
   */
  defaultSelect: string | number = '';

  /**
   * @property {any[]} radioBoton - Opciones de radio para el formulario de unidad.
   * Contiene las configuraciones específicas para los controles de radio button
   * relacionados con la selección de unidades. Se inicializa con datos estáticos
   * importados desde un archivo JSON externo que define las opciones de unidad disponibles.
   */
  radioBoton = unidadRadioFields;

  /**
   * @property {TablaSeleccion} TablaSeleccion - Configuración para la selección de tablas.
   * Referencia a la enumeración o constante TablaSeleccion que define las opciones
   * de selección disponibles para las tablas dinámicas en el componente.
   * Se utiliza para configurar el comportamiento de selección en la tabla de fabricantes nacionales.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * @property {ConfiguracionColumna<HistoricoColumns>[]} tableColumns - Configuración de las columnas de la tabla de fabricantes nacionales.
   * Define la estructura, comportamiento y apariencia de cada columna en la tabla de fabricantes nacionales.
   * Cada elemento especifica el encabezado, la función de acceso a los datos (clave),
   * y el orden de visualización. Incluye información sobre nombre del fabricante, número de registro fiscal,
   * dirección, correo electrónico y teléfono de contacto.
   */
  tableColumns: ConfiguracionColumna<HistoricoColumns>[] = [
    {
      encabezado: 'Nombre del fabricante',
      clave: (fila) => fila.nombreFabricante,
      orden: 1,
    },
    {
      encabezado: 'Número de registro fiscal',
      clave: (fila) => fila.numeroRegistroFiscal,
      orden: 2,
    },
    {
      encabezado: 'Dirección',
      clave: (fila) => fila.direccion,
      orden: 3,
    },
    {
      encabezado: 'Correo Electrónico',
      clave: (fila) => fila.correoElectrónico,
      orden: 4,
    },
    {
      encabezado: 'Teléfono',
      clave: (fila) => fila.telefono,
      orden: 5,
    },
  ];

  /**
   * @property {HistoricoColumns[]} fabricantesNacionales - Array de datos de fabricantes nacionales.
   * Contiene la información completa de todos los fabricantes nacionales disponibles.
   * Se carga dinámicamente desde el servicio y se actualiza según los criterios de búsqueda.
   * Cada elemento representa un fabricante con todos sus datos asociados como nombre,
   * registro fiscal, dirección, información de contacto y detalles administrativos.
   */
  fabricantesNacionales: HistoricoColumns[] = [];

  /**
   * @property {Subject<void>} destroyNotifier$ - Sujeto para manejar la destrucción de suscripciones.
   * Subject privado utilizado con el operador takeUntil para cancelar automáticamente
   * todas las suscripciones activas cuando el componente es destruido.
   * Implementa el patrón estándar para prevenir fugas de memoria en Angular.
   * @private
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TextilesState} historicoState - Estado actual del historial de fabricantes.
   * Almacena el estado completo relacionado con el historial de fabricantes en el contexto de elegibilidad de textiles.
   * Se actualiza mediante suscripciones al query correspondiente y contiene
   * toda la información necesaria para el funcionamiento del componente de histórico de fabricantes.
   * @private
   */
  private historicoState!: TextilesState;

  /**
   * @property {SeccionLibState} seccionState - Estado actual de la sección.
   * Mantiene el estado específico de la sección dentro del módulo de librerías.
   * Controla aspectos como la validez de la sección y su estado de activación.
   * Se utiliza para coordinar el estado entre diferentes secciones del trámite.
   * @private
   */
  private seccionState!: SeccionLibState;

  /**
   * @constructor
   * @description Constructor del componente. Inicializa los servicios necesarios para el funcionamiento del componente.
   * Inyecta todas las dependencias requeridas para el manejo de formularios reactivos,
   * gestión de estado global y local, consultas de datos y servicios específicos del dominio.
   * Establece la base para la comunicación entre el componente y los servicios del sistema
   * relacionados con la gestión del historial de fabricantes en el contexto de elegibilidad de textiles.
   * @param {FormBuilder} fb - Servicio de Angular para la creación y gestión de formularios reactivos.
   * @param {ElegibilidadDeTextilesStore} ElegibilidadDeTextilesStore - Store para manejar el estado global de elegibilidad de textiles.
   * @param {ElegibilidadDeTextilesQuery} ElegibilidadDeTextilesQuery - Query para consultar y suscribirse al estado de elegibilidad de textiles.
   * @param {SeccionLibStore} seccionStore - Store para manejar el estado específico de las secciones del módulo.
   * @param {SeccionLibQuery} seccionQuery - Query para consultar y suscribirse al estado de las secciones.
   * @param {ElegibilidadTextilesService} elegibilidadTextilesService - Servicio de dominio para manejar la lógica de negocio de elegibilidad de textiles.
   * @param {ChangeDetectorRef} cdr - Referencia al ChangeDetectorRef para manejar la detección de cambios.
   */
  constructor(
    private fb: FormBuilder,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private ElegibilidadDeTextilesQuery: ElegibilidadDeTextilesQuery,
    private seccionStore: SeccionLibStore,
    private seccionQuery: SeccionLibQuery,
    private elegibilidadTextilesService: ElegibilidadTextilesService,
    private cdr: ChangeDetectorRef
  ) {
    // Se puede agregar aquí la lógica del constructor si es necesario
  }

  /**
   * @method ngOnInit
   * @description Inicializa el componente y obtiene los datos de los fabricantes.
   * Configura todas las suscripciones necesarias para el manejo del estado del componente,
   * inicializa el formulario reactivo, carga los datos de fabricantes nacionales,
   * establece la validación del formulario y configura el monitoreo de cambios.
   * También maneja el estado de habilitación del formulario basado en las propiedades de entrada
   * y sincroniza el estado de validez con el store global de la aplicación.
   * @returns {void} No retorna ningún valor.
   */
  ngOnInit(): void {
    this.seccionQuery.selectSeccionState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.seccionState = seccionState;
        })
      )
      .subscribe();
    this.ElegibilidadDeTextilesQuery.selectTextile$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((state) => {
          this.historicoState = state as TextilesState;
        })
      )
      .subscribe();
    this.initActionFormBuild();
    this.recuperarDatos();

    this.historicoFabricantesForm.statusChanges
      .pipe(
        takeUntil(this.destroyNotifier$),
        delay(10),
        tap((_value) => {
          if (this.historicoFabricantesForm.valid) {
            this.ElegibilidadDeTextilesStore.setFormaValida([
              ...this.historicoState.formaValida,
              { id: 3, descripcion: 'TodoValido' },
            ]);
          }
        })
      )
      .subscribe();

    this.seccionStore.establecerFormaValida([false]);

    if (
      this.historicoState.formaValida &&
      this.historicoState.formaValida[0] &&
      this.historicoState.formaValida[0].descripcion === VALIDO
    ) {
      this.seccionStore.establecerSeccion([true]);
      this.seccionStore.establecerFormaValida([true]);
    } else {
      this.seccionStore.establecerFormaValida([false]);
    }
    if (this.formularioDeshabilitado) {
      this.historicoFabricantesForm.disable();
    }
  }

  /**
   * @method initActionFormBuild
   * @description Inicializa el formulario reactivo para capturar los datos de los fabricantes.
   * Crea todos los controles del formulario con sus valores iniciales obtenidos del estado actual,
   * aplicando las validaciones necesarias para cada campo. Configura campos para información
   * sobre si el exportador es el mismo fabricante, número de registro fiscal con validaciones
   * de longitud mínima, y selección de fabricantes nacionales disponibles.
   * @returns {void} No retorna ningún valor.
   */
  initActionFormBuild(): void {
    this.historicoFabricantesForm = this.fb.group({
      exportadorFabricanteMismo: [
        this.historicoState.exportadorFabricanteMismo,
      ],
      numeroRegistroFiscal: [
        this.historicoState.numeroRegistroFiscal,
        [Validators.required, Validators.minLength(5)],
      ],
      fabricantesNacionales: [[]],
    });
  }

  /**
   * @method recuperarDatos
   * @description Obtiene los datos de los fabricantes desde el servicio.
   * Realiza una petición HTTP al servicio para cargar los datos de fabricantes nacionales
   * desde un archivo JSON. Los datos obtenidos se asignan a la propiedad fabricantesNacionales
   * para su visualización en la tabla correspondiente. La suscripción se maneja con takeUntil
   * para evitar fugas de memoria. Los datos incluyen información completa de cada fabricante
   * nacional disponible en el sistema.
   * @returns {void} No retorna ningún valor.
   */
  recuperarDatos(): void {
    this.elegibilidadTextilesService
      .obtenerTablaDatos<HistoricoColumns>('historico-fabricantes.json')
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (response) => {
          this.fabricantesNacionales = response as HistoricoColumns[];
        },
      });
  }

  /**
   * @method onValueChange
   * @description Maneja el cambio de valor del radio button.
   * Se ejecuta cuando el usuario selecciona una nueva opción en los controles de radio button.
   * Actualiza la propiedad selectedValue con el nuevo valor seleccionado,
   * lo que puede desencadenar cambios en la interfaz o validaciones adicionales.
   * Facilita la captura de la interacción del usuario con los controles de selección.
   * @param {string | number} newValue - El nuevo valor seleccionado en el control de radio.
   * @returns {void} No retorna ningún valor.
   */
  onValueChange(newValue: number | string): void {
    this.selectedValue = newValue;
  }

  /**
   * @property {CatalogosSelect[]} dropdownConfigs - Configuraciones de los dropdowns del formulario.
   * Array que contiene la configuración específica para cada control de selección dropdown
   * utilizado en el formulario. Cada elemento define el label, requisitos de validación,
   * catálogos de datos asociados y opciones por defecto. Incluye configuraciones para
   * Delegaciones estatales SAGARPA, OSIA, Oficina Central y Distrito Desarrollo Rural (DDR).
   * Algunos dropdowns son requeridos mientras otros son opcionales según las reglas de negocio.
   */
  dropdownConfigs: CatalogosSelect[] = [
    {
      labelNombre: 'Delegaciones estatales SAGARPA',
      required: true,
      catalogos: CATALOGOS,
      primerOpcion: '',
    },
    {
      labelNombre: 'OSIA',
      required: true,
      catalogos: CATALOGOS,
      primerOpcion: '',
    },
    {
      labelNombre: 'Oficina Central',
      required: true,
      catalogos: CATALOGOS,
      primerOpcion: '',
    },
    {
      labelNombre: 'Distrito Desarrollo Rural (DDR)',
      required: false,
      catalogos: CATALOGOS,
      primerOpcion: '',
    },
  ];

  /**
   * @method setValoresStore
   * @description Establece los valores en el store de textiles.
   * Método utilitario que extrae el valor de un campo específico del formulario
   * y lo almacena en el store global utilizando el método especificado.
   * Facilita la sincronización entre el estado del formulario de histórico de fabricantes
   * y el estado global de la aplicación, asegurando consistencia de datos
   * entre diferentes componentes del sistema.
   * @param {FormGroup} form - El formulario reactivo del cual extraer el valor.
   * @param {string} campo - El nombre del campo del formulario a extraer.
   * @param {keyof ElegibilidadDeTextilesStore} metodoNombre - El nombre del método del store a invocar para guardar el valor.
   * @returns {void} No retorna ningún valor.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof ElegibilidadDeTextilesStore
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.ElegibilidadDeTextilesStore[metodoNombre] as (value: string) => void)(
      VALOR
    );
  }

    /**
   * Método para continuar al siguiente paso, validando el campo cantidadFacturas.
   * Si el formulario es inválido, muestra el mensaje de error y no permite continuar.
   * Si es válido, limpia el error y permite continuar.
   */

  continuar(): void {
    this.historicoFabricantesForm.markAllAsTouched();
    this.historicoFabricantesForm.updateValueAndValidity();
    this.cdr.detectChanges();

    if (!this.historicoFabricantesForm.valid) {
      this.formularioAlertaError = ERROR_FORMA_ALERT;
      this.esFormaValido = true;
      window.scrollTo(0, 0);
      return;
    }
    this.esFormaValido = false;
    this.formularioAlertaError = '';
    window.scrollTo(0, 0);

    this.mostrarTabs.emit(true);
  }
  
  /**
   * @method ngOnDestroy
   * @description Método que se ejecuta cuando el componente es destruido.
   * Implementa la limpieza necesaria para evitar fugas de memoria cancelando
   * todas las suscripciones activas mediante el subject destroyNotifier$.
   * Es una implementación estándar del patrón de limpieza en Angular que asegura
   * que todas las suscripciones del componente sean correctamente finalizadas
   * cuando el componente se destruye, liberando recursos del sistema.
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
