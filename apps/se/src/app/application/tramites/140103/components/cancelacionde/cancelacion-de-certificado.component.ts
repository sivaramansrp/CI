/* eslint-disable class-methods-use-this */
import {
  Catalogo,
  ConsultaioQuery,
  ConsultaioState,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, EventEmitter,OnDestroy, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src/core/models/shared/configuracion-columna.model';
import { Cupo } from '@libs/shared/data-access-user/src/core/models/140103/cancelacion.model';
import { OficioComponent } from '../oficio/oficio.component';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { Tramite140103Query } from '../../../../estados/queries/tramite140103.query';
import cancelcatalog from '@libs/shared/theme/assets/json/140103/cancelcatalog.json';


import {
  Solicitud140103State,
  Tramite140103Store,
} from '../../../../estados/tramites/tramite140103.store';
import { Cupos } from '../../models/detalle';
import { NUEVO_CUPOS } from '../../constants/detalle.enum';



/**
 * Componente `CancelacionDeCertificateComponent`
 *
 * Este componente es responsable de gestionar la cancelación de certificados en una interfaz de usuario dinámica.
 * Utiliza una serie de catálogos y tablas dinámicas para permitir al usuario interactuar con la información relacionada con
 * los cupos, productos, subproductos y mecanismos de asignación en el contexto de la cancelación de certificados.
 *
 * **Objetivos principales:**
 * - Proveer al usuario la posibilidad de visualizar y gestionar los cupos asociados a la cancelación de certificados.
 * - Permitir la selección dinámica de regímenes, mecanismos, tratados, y otros atributos importantes para la cancelación de los certificados.
 * - Utilizar catálogos para manejar la selección de productos, subproductos y otros datos relacionados.
 * - Visualizar la información relevante en una tabla dinámica con las columnas configuradas según los datos de cancelación.
 *
 * **Estructura del componente:**
 * - **Catálogos cargados desde JSON**: La información de los catálogos, como los regímenes, mecanismos, tratados, productos y otros, es cargada desde archivos JSON externos.
 * - **Tabla dinámica**: Se configura una tabla dinámica para mostrar los datos de los cupos, donde cada fila de la tabla representa un cupo y muestra las propiedades relevantes como el nombre del producto, subproducto, mecanismo de asignación y tipo de cupo.
 * - **Formulario de entrada de datos**: En el futuro, se podrían agregar formularios para permitir la modificación de los datos relacionados con la cancelación de los certificados.
 *
 * **Propiedades importantes:**
 * - `cancelation`: Contiene la lista de objetos `Cupo`, representando los cupos que se van a gestionar en el proceso de cancelación de certificados.
 * - `regime`, `mecanismo`, `tratado`, `nombrede`, `nombredel`, `representacion`: Son listas de catálogos cargadas desde el archivo JSON, que contienen las opciones disponibles para los diferentes atributos relacionados con la cancelación de certificados.
 * - `configuracionTabla`: Configura la tabla dinámica que muestra los datos de los cupos en columnas específicas, ordenadas de acuerdo con la configuración definida.
 *
 * **Dependencias externas**:
 * - `@ng-mf/data-access-user`: Se utilizan componentes y servicios de esta librería para la gestión de catálogos y tablas dinámicas.
 * - Archivos JSON: Se cargan datos de archivos JSON externos (`cancelations.json`, `cancelcatalog.json`) para obtener la información necesaria para la cancelación de los certificados.
 *
 * **Eventos y métodos**:
 * - El componente no define explícitamente métodos adicionales en este fragmento, pero la implementación de `ngOnInit()` y otras funciones de manipulación de datos se pueden agregar conforme se expanda la funcionalidad.
 *
 * **Estilos y diseño**:
 * - Los estilos del componente se gestionan a través del archivo CSS asociado (`cancelacion-de-certificate.component.css`), donde se puede definir el diseño y apariencia del componente.
 *
 * **Uso en la aplicación**:
 * Este componente puede ser usado en el flujo de trabajo de cancelación de certificados, permitiendo a los usuarios visualizar y gestionar la información relacionada con el cupo y sus atributos.
 *
 * @file `cancelacion-de-certificate.component.ts`
 * @author [Tu Nombre]
 * @date [Fecha]
 */

@Component({
  selector: 'app-cancelacion-de-certificado',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    OficioComponent,
    TablaDinamicaComponent,
    CatalogoSelectComponent,
    FormsModule,
    ReactiveFormsModule,
   
  ],
  templateUrl: './cancelacion-de-certificado.component.html',
  styleUrl: './cancelacion-de-certificado.component.css',
})
/**
 * Componente que gestiona el proceso de cancelación de certificados. Este componente permite visualizar, interactuar y gestionar
 * los datos relacionados con el cupo de productos, mecanismos de asignación, tratados y otros atributos relevantes para la cancelación
 * de certificados. Utiliza tablas dinámicas para mostrar de manera ordenada los detalles y permite gestionar la información a través de
 * catálogos y formularios interactivos.
 *
 * @class
 * @example
 * <app-cancelacion-de-certificate></app-cancelacion-de-certificate>
 *
 * @constructor
 * Este componente se inicializa con datos cargados desde archivos JSON, los cuales contienen la información relacionada con los
 * cupos, mecanismos, productos, subproductos, regímenes y otros elementos importantes para el proceso de cancelación. Los datos
 * son utilizados para configurar la tabla dinámica y para llenar los campos de los catálogos, permitiendo la selección de opciones
 * durante la gestión de la cancelación de certificados.
 *
 * @property {Cupo[]} cancelation - Lista de objetos `Cupo` que contienen los datos específicos de cada cancelación de certificado.
 * @property {Catalogo[]} regime - Lista de catálogos que contiene las opciones de regímenes aplicables a la cancelación de certificados.
 * @property {Catalogo[]} mecanismo - Lista de catálogos que contiene los mecanismos de asignación utilizados en el proceso de cancelación.
 * @property {Catalogo[]} tratado - Lista de catálogos que contiene los tratados aplicables a los productos involucrados en la cancelación.
 * @property {Catalogo[]} nombrede - Lista de catálogos que contienen los nombres de los productos que pueden estar relacionados con la cancelación.
 * @property {Catalogo[]} nombredel - Lista de catálogos que contienen los nombres de los subproductos que pueden estar involucrados en la cancelación.
 * @property {Catalogo[]} representacion - Lista de catálogos que contiene las representaciones de los productos o subproductos que se gestionan.
 * @property {ConfiguracionColumna<any>[]} configuracionTabla - Configuración para las columnas de la tabla dinámica, definiendo el encabezado,
 *     la clave de acceso a los datos y el orden de visualización de cada columna.
 *
 * @method
 *
 * - **ngOnInit()**: Inicializa el componente con los valores predeterminados, y también se carga la información de los catálogos desde archivos JSON.
 *   Este método se utiliza para configurar las propiedades y preparar el componente para su uso interactivo.
 * - **configuracionTabla**: Configura las columnas de la tabla dinámica para visualizar correctamente los datos, incluyendo las propiedades
 *   de cada `Cupo` como el nombre del producto, el subproducto, el mecanismo de asignación y el tipo de cupo.
 *
 * @example
 * Este componente incluye varias tablas dinámicas que se configuran con los catálogos cargados, y su visualización depende de los datos
 * disponibles para cada cupo, junto con los detalles como el mecanismo de asignación, tipo de cupo, y nombres de productos y subproductos.
 *
 * @method updateformfied()
 * - Se puede incluir en el futuro, si se decide agregar la funcionalidad de actualización de campos del formulario.
 */

/**
 * Componente que gestiona la cancelación de certificados.
 * Implementa los hooks de ciclo de vida OnInit y OnDestroy para inicialización y limpieza.
 */
export class CancelacionDeCertificateComponent implements OnInit, OnDestroy {
/**
   * @desc Evento de salida que emite el estado de la búsqueda de intento de cancelación de certificado.
   * @param {Object} value - Objeto que contiene el estado del formulario.
   * @param {boolean} value.submitted - Indica si el formulario fue enviado.
   * @param {boolean} value.invalid - Indica si el formulario es inválido.
   * @event
   * @memberof CancelacionDeCertificadoComponent
   */
   @Output() buscarIntento = new EventEmitter<{submitted: boolean, invalid: boolean}>();
  /**
   * Lista de cupos que contiene los datos necesarios para realizar la cancelación de certificados. Esta propiedad se carga
   * a partir de un archivo JSON, lo que permite a la aplicación manejar múltiples cupos con facilidad.
   *
   * @type {Cupo[]}
   */
  Cancelacion: Cupo[] = [];
  cancelacionForm!: FormGroup;

  /**
   * Lista de catálogos para el régimen que se utiliza en la cancelación de certificados. Esta propiedad permite acceder
   * a las opciones del régimen desde un archivo JSON cargado.
   *
   * @type {Catalogo[]}
   */
  public regimen: Catalogo[] = cancelcatalog?.regimen ?? [];

  /**
   * Lista de catálogos para el mecanismo de asignación, utilizado en el proceso de cancelación de certificados.
   * Esta lista permite seleccionar el mecanismo apropiado desde los datos cargados.
   *
   * @type {Catalogo[]}
   */
  public mecanismo: Catalogo[] = cancelcatalog?.mecanismo ?? [];

  /**
   * Lista de catálogos para los tratados relacionados con los productos o subproductos que se están gestionando
   * en el proceso de cancelación.
   *
   * @type {Catalogo[]}
   */
  public tratado: Catalogo[] = cancelcatalog?.tratado ?? [];

  /**
   * Lista de catálogos con los nombres de productos involucrados en el proceso de cancelación de certificados.
   *
   * @type {Catalogo[]}
   */
  public producto: Catalogo[] = cancelcatalog?.producto ?? [];

  /**
   * Lista de catálogos con los nombres de subproductos que se gestionan durante el proceso de cancelación de certificados.
   *
   * @type {Catalogo[]}
   */
  public subproducto: Catalogo[] = cancelcatalog?.subproducto ?? [];

  /**
   * Lista de catálogos para representar diferentes representaciones o categorías asociadas a los productos o subproductos.
   *
   * @type {Catalogo[]}
   */
  public representacion: Catalogo[] = cancelcatalog?.representacion ?? [];
  public solicitudState!: Solicitud140103State;
  private destroyNotifier$: Subject<void> = new Subject();
/** Almacena el estado actual de la consulta relacionada con el trámite.  
 *  Contiene información necesaria para mostrar o procesar datos en el componente. */
   public consultaState!:ConsultaioState;
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;
  /**
   * Configuración de las columnas para la tabla dinámica donde se visualizan los detalles de cada cupo. Cada columna
   * se configura con un encabezado, una clave que accede a los datos específicos de cada objeto de tipo `Cupo` y un orden
   * que determina la disposición de las columnas en la tabla.
   *
   * @type {ConfiguracionColumna<any>[]}
   */
  configuracionTabla: ConfiguracionColumna<Cupos>[] = [
    { encabezado: 'Cupo', clave: (item: Cupos) => item.cupo, orden: 1 },
    {
      encabezado: 'Nombre de Producto',
      clave: (item: Cupos) => item.nombreProducto,
      orden: 2,
    },
    {
      encabezado: 'Nombre del Subproducto',
      clave: (item: Cupos) => item.nombreSubproducto,
      orden: 3,
    },
    {
      encabezado: 'Mecanismo de Asignación',
      clave: (item: Cupos) => item.mecanismoAsignacion,
      orden: 4,
    },
    {
      encabezado: 'Tipo Cupo',
      clave: (item: Cupos) => item.tipoCupo,
      orden: 5,
    },
  ];

  submitted = false; 

  /**
 * @constructor
 * Constructor del componente que inyecta los servicios necesarios para la gestión del formulario.
 *
 * @param {FormBuilder} fb - Servicio de Angular para construir formularios reactivos.
 * @param {Tramite140103Store} tramite140103Store - Store específico para manejar el estado del trámite 140103.
 * @param {Tramite140103Query} tramite140103Query - Query para obtener el estado del store de trámite 140103.
 * @param {ConsultaioQuery} consultaioQuery - Query para obtener el estado del store de consulta IO.
 *
 * Dentro del constructor se suscribe al observable `selectConsultaioState$` del `consultaioQuery`
 * para detectar cambios en el estado de la sección. Se actualiza la propiedad `esFormularioSoloLectura`
 * y se inicializa el estado del formulario con `inicializarEstadoFormulario()`.
 * Se utiliza `takeUntil(this.destroyNotifier$)` para limpiar la suscripción cuando el componente se destruye.
 */
  constructor(
    private fb: FormBuilder,
    private tramite140103Store: Tramite140103Store,
    private tramite140103Query: Tramite140103Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();

           this.consultaState = seccionState;
            if (this.consultaState.update) {
          this.tramite140103Store.update((state) => ({
          ...state,
           cancelacion: [...state.cancelacion, NUEVO_CUPOS]
         }));
        }
        })
      )
      .subscribe();
  }


  /**
 * @method ngOnInit
 * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
 *
 * Inicializa el formulario reactivo mediante `inicializarFormulario()` y configura
 * su estado inicial llamando a `inicializarEstadoFormulario()`.
 */
  ngOnInit(): void {
    /** Inicializa el formulario reactivo con sus controles y valores predeterminados. */
    this.inicializarFormulario();

     /** Llama al método que configura el formulario según el estado de solo lectura. */
    this.inicializarEstadoFormulario();
    // Se suscribe al estado 'cancelacion' desde el query.
// Actualiza la propiedad local `Cancelacion` con los datos obtenidos.
     this.tramite140103Query.select('cancelacion').subscribe((data: Cupo[]) => {
    this.Cancelacion = data;
  });
  }

  /**
   * Determina si se debe cargar un formulario nuevo o uno existente.  
   * Ejecuta la lógica correspondiente según el estado del componente.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    }
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.cancelacionForm && this.esFormularioSoloLectura) {
      this.cancelacionForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.cancelacionForm.enable();
    } 
  }

/**
 * @method setValoresStore
 * Asigna el valor de un campo del formulario al store correspondiente invocando un método específico.
 *
 * @param {FormGroup} form - El formulario reactivo que contiene los valores a establecer.
 * @param {string} campo - El nombre del campo dentro del formulario del cual se obtendrá el valor.
 * @param {keyof Tramite140103Store} metodoNombre - El nombre del método del store que se invocará para actualizar el estado.
 *
 * Se obtiene el valor del campo especificado del formulario y se llama dinámicamente
 * al método correspondiente del `Tramite140103Store` pasándole dicho valor.
 */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite140103Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite140103Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Método que se ejecuta al inicializar el componente. Este método crea el formulario reactivo
   * y configura los controles necesarios con las validaciones requeridas.
   */
  private inicializarFormulario(): void {
    /**
 * Formulario reactivo utilizado para la cancelación del trámite.
 * 
 * Este formulario contiene los siguientes controles, todos con validación obligatoria (`Validators.required`):
 * 
 * Inicialmente, todos los valores están establecidos como `null` hasta que se carguen los datos reales.
 */
    this.cancelacionForm = this.fb.group({
    regimen: [null, Validators.required],
    mecanismo: [null, Validators.required],
    tratado: [null, Validators.required],
    producto: [null, Validators.required],
    subproducto: [null, Validators.required],
    representacion: [null, Validators.required],
  });

/** Suscribe al estado de solicitud 140103 y lo asigna a `solicitudState`.  
 * Usa `takeUntil` para limpiar la suscripción al destruir el componente. */
    this.tramite140103Query.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.solicitudState = seccionState as Solicitud140103State;
        })
      )
      .subscribe();

      /** Actualiza los valores del formulario `CancelacionForm` con los datos de `solicitudState`.  
 * Se usa `patchValue` para asignar los campos sin reemplazar el grupo completo. */
      this.cancelacionForm.patchValue({
          regimen: this.solicitudState.regimen,
          mecanismo: this.solicitudState.mecanismo,
          tratado: this.solicitudState.tratado,
          producto: this.solicitudState.producto,
          subproducto: this.solicitudState.subproducto,
          representacion: this.solicitudState.representacion,
        });
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * 
   * Este método se utiliza para limpiar recursos, específicamente para completar
   * el `Subject` `destroyNotifier$`, el cual es usado en combinación con el operador `takeUntil`
   * para cancelar automáticamente las suscripciones a observables y evitar fugas de memoria.
   * 
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
  /**
   * Método que se ejecuta al hacer clic en el botón "Buscar" del formulario de cancelación.
   * Este método emite un evento con el estado del formulario, indicando si fue enviado y si es inválido.
   * Si el formulario es inválido, se puede implementar lógica adicional para manejar los errores.
   */
  
 buscarCupos(): void {
  this.submitted = true;
  const FORM = this.cancelacionForm;
  this.buscarIntento.emit({
    submitted: this.submitted,
    invalid: FORM.invalid
  });

if (FORM.invalid) {
    FORM.markAllAsTouched();
    return;
  }

/**
 * @desc Crea un nuevo objeto de tipo Cupos con información relevante para la cancelación de certificados.
 * 
 * @property {number} cupo - Número aleatorio generado para el cupo, entre 1 y 1000.
 * @property {string} nombreProducto - Nombre del producto obtenido del catálogo según el valor seleccionado en el formulario.
 * @property {string} nombreSubproducto - Nombre del subproducto obtenido del catálogo según el valor seleccionado en el formulario.
 * @property {string} mecanismoAsignacion - Nombre del mecanismo de asignación obtenido del catálogo según el valor seleccionado en el formulario.
 * @property {string} tipoCupo - Tipo de cupo, en este caso siempre 'General'.
 * 
 */
const NUEVO_CUPO: Cupos = {
    cupo: Math.floor(Math.random() * 1000) + 1, 
    nombreProducto: this.obtenerNombreDelCatalogo(this.producto, FORM.value.producto),
    nombreSubproducto: this.obtenerNombreDelCatalogo(this.subproducto, FORM.value.subproducto),
    mecanismoAsignacion: this.obtenerNombreDelCatalogo(this.mecanismo, FORM.value.mecanismo),
    tipoCupo: 'General' 
  };
  
this.Cancelacion = [...this.Cancelacion, NUEVO_CUPO];
}
/**
 * Devuelve la descripción de un elemento de catálogo dado su ID.
 *
 * @param {Catalogo[]} catalogo - Lista de elementos de catálogo.
 * @param {number | string} id - Identificador del elemento a buscar.
 * @returns {string} Descripción del elemento encontrado, o cadena vacía si no existe.
 */
obtenerNombreDelCatalogo(catalogo: Catalogo[], id: number | string): string {
  const IDCADENA = String(id);
  const CATALOG_ITEM = catalogo.find(i => String(i.id) === IDCADENA);
  return CATALOG_ITEM?.descripcion ?? '';
}
}