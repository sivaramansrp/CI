import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Catalogo, CatalogoSelectComponent, ConfiguracionColumna, CrosslistComponent, CrossListLable, TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import fraccions from 'libs/shared/theme/assets/json/130106/fraccion.json';
import { map, Subject, takeUntil } from 'rxjs';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import { Solicitud130106State, Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
import { Partidas } from 'libs/shared/data-access-user/src/core/models/130106/partidas.model';

/**
 * @Component FraccionComponent
 * Este componente gestiona la selección de fracciones arancelarias y maneja los datos del formulario para la clasificación arancelaria.
 * El formulario incluye campos de entrada como la cantidad, descripción, unidad de medida, y otros detalles relacionados con las fracciones.
 * El componente permite agregar, quitar y modificar las fracciones arancelarias en una tabla dinámica y almacenar la información seleccionada en el estado global de la aplicación.
 */
@Component({
  selector: 'app-fraccion', // El selector que se utiliza para incluir este componente en otras plantillas.
  standalone: true, // Indica que este componente es autónomo y no depende de otros módulos de Angular.
  imports: [CatalogoSelectComponent, FormsModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent, CrosslistComponent], // Módulos y componentes importados que se utilizan en este componente.
  templateUrl: './fraccion.component.html', // Archivo de plantilla (HTML) que define la estructura visual del componente.
  styleUrl: './fraccion.component.scss' // Archivo de estilos (CSS) que define la apariencia visual del componente.
})
/**
 * @class FraccionComponent
 * @description Componente Angular que gestiona la lógica para el módulo de fracciones. 
 * Implementa las interfaces OnInit y OnDestroy para manejar los ciclos de vida del componente.
 * 
 * @implements OnInit
 * @implements OnDestroy
 */
export class FraccionComponent implements OnInit, OnDestroy {
 /** @property {FormGroup} FraccionForm - Grupo de formulario reactivo que contiene todos los controles de formulario relacionados con las fracciones
  * 
  */
  FraccionForm!: FormGroup;
    /** @property {Catalogo[]} fraccion - Lista de fracciones arancelarias disponibles que se cargan desde un archivo JSON
     * 
     */
  public fraccion: Catalogo[] = fraccions.fraccion;
   /** @property {Catalogo[]} umt - Lista de unidades de medida disponibles para la selección
    * 
    */
  public umt: Catalogo[] = fraccions.UMT;
   /** @property {Catalogo[]} bloque - Lista de bloques disponibles para la clasificación 
    * 
   */
  public bloque: Catalogo[] = fraccions.bloque;
  /** @property {Catalogo[]} entidad - Lista de entidades disponibles que pueden ser asociadas con la fracción 
   * 
  */
  public entidad: Catalogo[] = fraccions.entidad;
  /** @property {Catalogo[]} representacion - Lista de representaciones disponibles para la fracción arancelaria
   * 
   */
  public representacion: Catalogo[] = fraccions.representacion;
    /** @property {Solicitud130106State} solicitudState - Almacena el estado actual de la solicitud, que se usa para manejar los datos del formulario 
     * 
    */

  public solicitudState!: Solicitud130106State;
  /** @property {Subject<void>} destroyNotifier$ - Un subject que se usa para gestionar la cancelación de las suscripciones a los observables cuando el componente se destruye 
   * 
  */
  private destroyNotifier$: Subject<void> = new Subject();
 /** @property {Partidas[]} partidas - Lista que almacena las partidas que el usuario selecciona o agrega al formulario */
  partidas: Partidas[] = [];
  /**
 * @constructor
 * El constructor inicializa las dependencias necesarias para el componente.
 * 
 * @param {FormBuilder} fb - Instancia de FormBuilder para crear formularios reactivos.
 * @param {Tramite130106Store} tramite130106Store - Instancia del store que maneja el estado de los trámites.
 * @param {Tramite130106Query} tramite130106Query - Instancia de la clase que consulta el estado de los trámites.
 */
  constructor(
    private fb: FormBuilder, // Inicializa el servicio FormBuilder para manejar formularios reactivos.
    private tramite130106Store: Tramite130106Store, // Almacena el estado de los trámites del proceso 130106.
    private tramite130106Query: Tramite130106Query // Consulta el estado actual del trámite.
  ) { }
  
 /**
 * @constant partidasDatas
 * @description Configuración de columnas para la visualización de datos de partidas. 
 * Define los encabezados, claves y el orden de las columnas en una tabla o interfaz de usuario.
 * 
 * @type {ConfiguracionColumna<Partidas>[]}
 * @property {string} encabezado - El nombre de la columna que se mostrará al usuario.
 * @property {(item: Partidas) => any} clave - Una función que accede al valor correspondiente en el objeto `Partidas`.
 * @property {number} orden - El orden en el que se muestra la columna en la tabla.
 */
const partidasDatas: ConfiguracionColumna<Partidas>[] = [
  {
    /**
     * @property encabezado
     * @description Título de la columna: "Cantidad".
     * Muestra la cantidad de elementos en las partidas.
     */
    encabezado: 'Cantidad',

    /**
     * @property clave
     * @description Obtiene el valor de la propiedad `cantidad` del objeto `Partidas`.
     */
    clave: (item: Partidas) => item.cantidad,

    /**
     * @property orden
     * @description Define el orden de la columna como la primera en la tabla.
     */
    orden: 1
  },
  {
    encabezado: 'Unidad de medida',
    clave: (item: Partidas) => item.unidad,
    orden: 2 // Segunda columna en la tabla
  },
  {
    encabezado: 'Fracción arancelaria',
    clave: (item: Partidas) => item.fraccion,
    orden: 3 // Tercera columna en la tabla
  },
  {
    encabezado: 'Descripción',
    clave: (item: Partidas) => item.descripcion,
    orden: 4 // Cuarta columna en la tabla
  },
  {
    encabezado: 'Precio unitario USD',
    clave: (item: Partidas) => item.precio,
    orden: 5 // Quinta columna en la tabla
  },
  {
    encabezado: 'Total USD',
    clave: (item: Partidas) => item.total,
    orden: 6 // Sexta columna en la tabla
  }
];

      /** @property {typeof TablaSeleccion} TablaSeleccion - Almacena el tipo de selección de tabla, utilizado para configurar la selección en la tabla
       * 
       */
    TablaSeleccion = TablaSeleccion;
 /** @property {string[]} selectRangoDias - Lista de días seleccionados por el usuario en el formulario
  * 
  */
    selectRangoDias: string[] = [];
    /** @property {string[]} fechasDatos - Fechas disponibles para la selección y visualización 
     * 
    */
  fechasSeleccionadas: string[] = [];
    /** @property {string[]} fechasDatos - Fechas disponibles para la selección y visualización */
  fechasDatos: string[] = [];
  /** @property {FormControl} fecha - Control de formulario para manejar la entrada de fechas */
  fecha: FormControl = new FormControl('');
  /** @property {FormControl} fechaSeleccionada - Control de formulario para manejar la entrada de fechaSeleccionada */
  fechaSeleccionada: FormControl = new FormControl('');
   /** 
   * @property {Array} botonField - Configuración de botones para realizar acciones de agregar o quitar fechas en la lista
   */
/**
 * @constant botonField
 * @description Arreglo que contiene la configuración de botones utilizados en la interfaz de usuario.
 * Cada objeto representa un botón con su nombre, clase CSS, y una función asignada.
 */
 botonField = [
  {
    /**
     * @property btnNombre
     * @description Nombre del botón que se muestra en la interfaz de usuario.
     */
    btnNombre: 'Agregar todos',

    /**
     * @property class
     * @description Clase CSS aplicada para el estilo del botón.
     */
    class: 'btn-primary',

    /**
     * @property funcion
     * @description Función que se ejecuta al hacer clic en este botón. 
     * En este caso, llama a `this.agregar` con un parámetro vacío.
     */
    funcion: () => this.agregar(''),
  },
  {
    btnNombre: 'Agregar selección',
    class: 'btn-default',
    funcion: () => this.agregar('t'), // Agrega una selección específica
  },
  {
    btnNombre: 'Restar selección',
    class: 'btn-danger',
    funcion: () => this.quitar(''), // Resta una selección específica
  },
  {
    btnNombre: 'Restar todos',
    class: 'btn-default',
    funcion: () => this.quitar('t'), // Resta todos los elementos
  },
];

  /**
 * @method agregar
 * @description Método encargado de gestionar las fechas seleccionadas en función del tipo de acción solicitado.
 * Si el tipo es `'t'`, selecciona todas las fechas disponibles y las almacena en `fechasSeleccionadas`, 
 * mientras que vacía el arreglo `fechasDatos`. En cualquier otro caso, realiza la operación específica basada
 * en la selección de una fecha.
 * 
 * @param {string} tipo - Define el tipo de acción a realizar:
 *   - `'t'`: Selecciona y transfiere todas las fechas disponibles.
 *   - Cualquier otro valor: Transfiere una fecha específica de `fechasDatos` a `fechasSeleccionadas`.
 * 
 * @returns {void} Este método no devuelve un valor.
 */
agregar(tipo: string): void {
  if (tipo === 't') {
    /**
     * Si el tipo es 't':
     * 1. Se seleccionan todas las fechas disponibles en el rango (`selectRangoDias`).
     * 2. Estas fechas se asignan al arreglo `fechasSeleccionadas`.
     * 3. El arreglo `fechasDatos` se vacía.
     */
    this.fechasSeleccionadas = [...this.selectRangoDias];
    this.fechasDatos = [];
  } else {
    /**
     * En caso contrario:
     * 1. Se obtiene el índice (FECHAVALOR) de la fecha seleccionada a partir de `this.fecha.value`.
     *    El valor se convierte a un número.
     * 2. Se agrega la fecha correspondiente en `fechasDatos[FECHAVALOR]` al arreglo `fechasSeleccionadas`.
     * 3. Se elimina la fecha seleccionada de `fechasDatos` para evitar duplicados.
     */
    const FECHAVALOR = this.fecha.value.map(Number); // Convertir valores a números
    this.fechasSeleccionadas.push(this.fechasDatos[FECHAVALOR]); // Agregar la fecha seleccionada
    this.fechasDatos.splice(FECHAVALOR, 1); // Eliminar la fecha de fechasDatos
  }
}


 /**
 * @method quitar
 * @description Método encargado de gestionar la eliminación de fechas seleccionadas en función del tipo de acción.
 * Si el tipo es `'t'`, transfiere todas las fechas de `fechasSeleccionadas` a `fechasDatos` y vacía `fechasSeleccionadas`.
 * En cualquier otro caso, transfiere una fecha específica.
 * 
 * @param {string} tipo - Define el tipo de acción a realizar:
 *   - `'t'`: Transfiere todas las fechas de `fechasSeleccionadas` a `fechasDatos`.
 *   - Cualquier otro valor: Transfiere una fecha específica.
 * 
 * @returns {void} Este método no devuelve un valor.
 */
quitar(tipo: string = ''): void {
  if (tipo === 't') {
    /**
     * Si el tipo es 't':
     * 1. Transfiere todas las fechas almacenadas en `fechasSeleccionadas` al arreglo `fechasDatos`.
     * 2. Vacía completamente el arreglo `fechasSeleccionadas`.
     */
    this.fechasDatos = [...this.fechasSeleccionadas];
    this.fechasSeleccionadas = [];
  } else {
    /**
     * En caso contrario:
     * 1. Obtiene el índice (FECHAVALOR) de la fecha seleccionada desde `this.fechaSeleccionada.value`.
     * 2. Agrega la fecha correspondiente en `fechasSeleccionadas[FECHAVALOR]` al arreglo `fechasDatos`.
     * 3. Elimina la fecha transferida del arreglo `fechasSeleccionadas` para evitar duplicados.
     */
    const FECHAVALOR = this.fechaSeleccionada.value.map(Number); // Convertir valores a números
    this.fechasDatos.push(this.fechasSeleccionadas[FECHAVALOR]); // Agregar la fecha seleccionada
    this.fechasSeleccionadas.splice(FECHAVALOR, 1); // Eliminar la fecha de fechasSeleccionadas
  }
}

    /**
   * @method ngOnInit
   * Hook del ciclo de vida de Angular: Se ejecuta cuando el componente se inicializa. Inicializa el formulario y configura los datos necesarios.
   */
  ngOnInit(): void {
    this.inicializarFormulario();
    // Load your catalog data here if necessary (e.g., from an API or JSON file)
  }
 /**
 * @method setValoresStore
 * Este método establece un valor en el store de trámites basado en el campo y el método proporcionado.
 * 
 * @param {FormGroup} form - El grupo de formulario desde el cual se extrae el valor.
 * @param {string} campo - El nombre del campo cuyo valor se va a establecer.
 * @param {keyof Tramite130106Store} metodoNombre - El nombre del método del store que se usará para actualizar el estado.
 * 
 * @returns {void}
 */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Tramite130106Store): void { 
    // Obtiene el valor del campo del formulario
  const valor = form.get(campo)?.value;
  // Llama al método del store para establecer el valor     
    (this.tramite130106Store[metodoNombre] as (value: any) => void)(valor);
  }
/**
 * @method inicializarFormulario
 * @description Método privado encargado de inicializar el formulario y establecer el estado de la solicitud.
 * Utiliza un observable para suscribirse a los cambios en el estado y actualiza la propiedad `solicitudState`.
 * 
 * @private
 * @returns {void} Este método no devuelve un valor.
 */
private inicializarFormulario(): void {
  this.tramite130106Query.selectSolicitud$ // Observa los cambios en la solicitud
    .pipe(
      /**
       * @operator takeUntil
       * @description Completa la suscripción cuando se emite un valor desde `destroyNotifier$`,
       * evitando fugas de memoria.
       */
      takeUntil(this.destroyNotifier$),

      /**
       * @operator map
       * @description Transforma el estado recibido en un objeto de tipo `Solicitud130106State`
       * y lo asigna a la propiedad `solicitudState`.
       */
      map((seccionState) => {
        this.solicitudState = seccionState as Solicitud130106State;
      })
    )
    .subscribe((data) => {
      // Lógica adicional si es necesario
    });
 // Inicializa el formulario reactivo con los valores del estado de la solicitud
    this.FraccionForm = this.fb.group({
      fraccion: [this.solicitudState.fraccion, Validators.required], // Campo de fracción arancelaria, obligatorio.
      cantidad: [this.solicitudState.cantidad, [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Campo de cantidad, obligatorio y solo números.
      factura: [this.solicitudState.factura, [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Campo de factura, obligatorio y solo números.
      umt: [this.solicitudState.umt, Validators.required], // Campo de unidad de medida, obligatorio.
      mercanciaCantidad: [this.solicitudState.cantidad, [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Campo de cantidad de mercancía, obligatorio y solo números.
      mercanciaFactura: [this.solicitudState.factura, [Validators.required, Validators.pattern(/^[0-9]*$/)]], // Campo de factura de mercancía, obligatorio y solo números.
      descripcion: [this.solicitudState.umt, Validators.required], // Campo de descripción, obligatorio.
      candidadTotal: [this.solicitudState.umt, Validators.required], // Campo de cantidad total, obligatorio.
      valorTotal: [this.solicitudState.umt, Validators.required], // Campo de valor total, obligatorio.
      especifico: [this.solicitudState.especifico, Validators.required], // Campo específico, obligatorio.
      justificacion: [this.solicitudState.justificacion, Validators.required], // Campo de justificación, obligatorio.
      Observaciones: [this.solicitudState.Observaciones, Validators.required], // Campo de observaciones, obligatorio.
      entidad: [this.solicitudState.entidad, Validators.required], // Campo de entidad, obligatorio.
      representacion: [this.solicitudState.representacion, Validators.required], // Campo de representación, obligatorio.
      bloque: [this.solicitudState.bloque, Validators.required], // Campo de bloque, obligatorio.
    });
    this.updateformfied();

  }
  updateformfied(): void {
       // Deshabilita los campos para que no se puedan editar
    this.FraccionForm.get('candidadTotal')?.disable();
    this.FraccionForm.get('valorTotal')?.disable();
     }
  /**
 * @method paridasData
 * Este método agrega una nueva partida a la lista de partidas basada en los datos del formulario.
 * 
 * @returns {void}
 */
  paridasData() {
    // Obtiene los datos del formulario reactivo
    const FORMDATA = this.FraccionForm.value;
  
    // Crea un nuevo objeto de tipo Partidas con los datos del formulario
    const NEWPARTIDA: Partidas = {
      cantidad: FORMDATA.cantidad, // Cantidad especificada en el formulario.
      unidad: fraccions.UMT.find(item => item.id === Number(FORMDATA.umt))?.descripcion, // Descripción de la unidad de medida.
      fraccion: fraccions.fraccion.find(item => item.id === Number(FORMDATA.fraccion))?.descripcion, // Descripción de la fracción arancelaria.
      descripcion: FORMDATA.descripcion, // Descripción adicional de la fracción.
      precio: 1.000, // Precio unitario predeterminado.
      total: FORMDATA.cantidad // Total calculado según la cantidad.
    };  
    // Agrega la nueva partida a la lista de partidas
    this.partidas.push(NEWPARTIDA);
  }
/**
 * @method ngOnDestroy
 * @description Método del ciclo de vida de Angular que se ejecuta justo antes de que el componente sea destruido.
 * Este método se utiliza para realizar tareas de limpieza, como notificar la finalización de observables
 * para prevenir fugas de memoria.
 * 
 * @returns {void} Este método no devuelve un valor.
 */
ngOnDestroy(): void {
  /**
   * @description Emite un valor a través del `destroyNotifier$` para notificar a los observables suscritos
   * que deben completar sus operaciones.
   */
  this.destroyNotifier$.next();

  /**
   * @description Completa el observable `destroyNotifier$`, indicando que ya no habrá más emisiones.
   */
  this.destroyNotifier$.complete();
}

}
   