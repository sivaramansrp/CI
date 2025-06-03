import {
  Catalogo,
  ConfiguracionColumna,
  ModeloDeFormaDinamica,
  TablaDinamicaComponent,
  TablaSeleccion,
} from '@libs/shared/data-access-user/src';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ImportacionDefinitiva130103State,
  Tramite130103Store,
} from '../../../../estados/tramites/tramite130103.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { ImportacionDefinitivaService } from '@libs/shared/data-access-user/src/core/services/130103/importacion-definitiva.service';
import { Partidas } from '../../models/importacion-definitiva.model';
import { Tramite130103Query } from '../../../../estados/queries/tramite130103.query';
import { USO_ESPECIFICO_DE_LA_MERCANCIA } from '../../constantes/importacion-definitiva.enum';
/**
 * compo doc
 * @component
 * @selector app-uso-especifico-de-la-mercancia
 * @description
 * Este componente es responsable de gestionar y renderizar los datos relacionados con
 * el uso específico de la mercancía en el trámite de importación definitiva. Utiliza un formulario dinámico
 * y una tabla dinámica para capturar y mostrar la información relacionada con las fracciones arancelarias
 * y su descripción.
 *
 * Funcionalidades principales:
 * - Renderiza dinámicamente los campos del formulario utilizando la configuración definida en `USO_ESPECIFICO_DE_LA_MERCANCIA`.
 * - Permite agregar nuevas fracciones arancelarias y descripciones a la tabla dinámica.
 * - Maneja los cambios en los valores de los campos del formulario y actualiza el estado dinámico del trámite.
 * - Obtiene las opciones dinámicas para el campo "fracción arancelaria" desde un servicio.
 *
 * Componentes importados:
 * - `TablaDinamicaComponent`: Componente para mostrar tablas dinámicas.
 * - `FormasDinamicasComponent`: Componente para renderizar formularios dinámicos.
 *
 * @templateUrl ./uso-especifico-de-la-mercancia.component.html
 * @styleUrl ./uso-especifico-de-la-mercancia.component.scss
 */
@Component({
  selector: 'app-uso-especifico-de-la-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    TablaDinamicaComponent,
    FormasDinamicasComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './uso-especifico-de-la-mercancia.component.html',
  styleUrl: './uso-especifico-de-la-mercancia.component.scss',
})
export class UsoEspecificoDeLaMercanciaComponent implements OnInit, OnDestroy {

  /**
  * @property consultaState
  * @description
  * Estado actual de la consulta gestionado por el store `ConsultaioQuery`.
  */
  @Input() consultaState!: ConsultaioState;
    
  /**
   * compo doc
   * @property usoEspecificoFormData
   * @type {DatosDelTramite[]}
   * @description
   * Esta propiedad contiene la configuración de los campos del formulario dinámico
   * utilizado en el componente. La configuración está basada en la constante
   * `USO_ESPECIFICO_DE_LA_MERCANCIA`, que define los detalles de cada campo, como su
   * identificador, etiqueta, tipo de entrada, validadores, y más.
   *
   * Se utiliza para renderizar dinámicamente los campos del formulario y para
   * gestionar su comportamiento, como la validación y la interacción con los datos
   * obtenidos de los servicios.
   */
  public usoEspecificoFormData = USO_ESPECIFICO_DE_LA_MERCANCIA;

  /**
   * compo doc
   * @type {FormGroup}
   * @memberof UsoEspecificoDeLaMercanciaComponent
   * @description
   * Este es un formulario reactivo de Angular representado por un FormGroup.
   * Se utiliza para manejar y validar los datos del formulario en el componente.
   */
  public forma: FormGroup = new FormGroup({
    ninoFormGroup: new FormGroup({}),
  });

  /**
   * compo doc
   * @getter ninoFormGroup
   * @description
   * Este getter devuelve el grupo de formularios anidado llamado `ninoFormGroup`
   * dentro del formulario reactivo principal `forma`.
   * Se utiliza para acceder y manipular los controles y valores específicos de este grupo de formularios.
   *
   * @returns {FormGroup} El grupo de formularios `ninoFormGroup` como un objeto de tipo `FormGroup`.
   *
   * @example
   * const grupo = this.ninoFormGroup;
   * grupo.get('campo').setValue('nuevo valor');
   */
  get ninoFormGroup(): FormGroup {
    return this.forma.get('ninoFormGroup') as FormGroup;
  }

  /**
   * Configuración de las columnas de la tabla.
   */
  public encabezadoDeTabla: ConfiguracionColumna<Partidas>[] = [
    { encabezado: 'ID', clave: (artículo) => artículo.id, orden: 1 },
    {
      encabezado: 'Fracción Arancelaria',
      clave: (artículo) => artículo.fraccionArancelariaProsec,
      orden: 2,
    },
    {
      encabezado: 'Descripción',
      clave: (artículo) => artículo.descripcion,
      orden: 3,
    },
  ];

  /**
   * Define los datos que se mostrarán en la tabla dinámica.
   */
  public datosTabla: Partidas[] = [];

  /**
   * Referencia a la clase o enumeración `TablaSeleccion`.
   *
   * Esta propiedad se utiliza para acceder a las funcionalidades
   * o valores definidos en `TablaSeleccion` dentro del componente.
   */
  public TablaSeleccion = TablaSeleccion;

  /**
   * Estado de la solicitud de la sección 301.
   * @type {ImportacionDefinitiva130103State}
   * @memberof DatosDelTramiteRealizerComponent
   */
  public importacionstate!: ImportacionDefinitiva130103State;

  /**
   * Subject para notificar la destrucción del componente.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property prosec
   * @type {string}
   * @description
   * Esta propiedad almacena la descripción de la fracción arancelaria seleccionada en el formulario dinámico.
   * Se utiliza para asociar y mostrar la información correspondiente en la tabla dinámica y en el estado del trámite.
   */
  public prosec!: string;

  /**
 * @property fraccionArancelariaArray
 * @description
 * Arreglo privado que almacena las opciones de fracciones arancelarias obtenidas desde el servicio.
 * @type {Catalogo[]}
 */
  private fraccionArancelariaArray: Catalogo[] = [];

  /**
   * compo doc
   * @constructor
   * @param {ImportacionDefinitivaService} importacionDefinitivaService - Servicio inyectado para obtener datos relacionados con la fracción arancelaria y el uso específico de la mercancía.
   * @param {Tramite130103Store} tramite130103Store - Store inyectado para gestionar el estado dinámico del trámite.
   * @param {Tramite130103Query} tramite130103Query - Query inyectado para consultar el estado del trámite.
   *
   * @description
   * Este constructor inicializa el componente e inyecta los servicios necesarios para gestionar
   * los datos dinámicos del formulario y el estado del trámite.
   */
  constructor(
    public importacionDefinitivaService: ImportacionDefinitivaService,
    private tramite130103Store: Tramite130103Store,
    private tramite130103Query: Tramite130103Query
  ) //
  {}

  /**
   * compo doc
   * @method ngOnInit
   * @description
   * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente
   * después de que Angular haya inicializado todas las propiedades vinculadas al componente.
   * En este caso, se utiliza para suscribirse al estado de importación, inicializar los datos
   * en la tabla dinámica y configurar las opciones dinámicas para el campo "fracción arancelaria".
   *
   * Funcionalidad:
   * - Escucha los cambios en el estado de importación a través de `selectImportacion$`.
   * - Verifica si el producto específico ya está agregado a la tabla dinámica y lo agrega si no está presente.
   * - Llama al método `obtenerFraccionArancelaria` para configurar las opciones dinámicas del formulario.
   *
   * @example
   * ngOnInit(): void {
   *   this.tramite130103Query.selectImportacion$
   *     .pipe(
   *       takeUntil(this.destroyNotifier$),
   *       map((seccionState) => {
   *         this.importacionstate = seccionState;
   *         const PRODUCTO = this.importacionstate['especifico'];
   *         const IS_ALREADY_ADDED = this.datosTabla.some((item) => item.id === PRODUCTO.id);
   *         if (!IS_ALREADY_ADDED) {
   *           this.datosTabla.push(PRODUCTO);
   *         }
   *       })
   *     )
   *     .subscribe();
   *   this.obtenerFraccionArancelaria();
   * }
   */
  ngOnInit(): void {
    this.tramite130103Query.selectImportacion$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.importacionstate = seccionState;
          if (
            this.importacionstate &&
            typeof this.importacionstate === 'object' &&
            this.importacionstate !== null &&
            'especifico' in this.importacionstate
          ) {
            const PRODUCTO = this.importacionstate['especifico'];
            const IS_ALREADY_ADDED = this.datosTabla.some(
              (item: {id: number}) => item.id === PRODUCTO.id
            );

            if (!IS_ALREADY_ADDED) {
              this.datosTabla.push(PRODUCTO);
            }
          }
        })
      )
      .subscribe();
    this.obtenerFraccionArancelaria();
  }

  /**
   * compo doc
   * @method agregar
   * @description
   * Este método se utiliza para agregar una nueva entrada específica a la tabla dinámica.
   * Verifica si el formulario `ninoFormGroup` es válido antes de crear un objeto con los datos
   * específicos. Luego, agrega este objeto a la lista de datos de la tabla y actualiza el
   * estado dinámico del trámite con la nueva entrada. Finalmente, reinicia el formulario.
   *
   * Funcionalidad:
   * - Valida el formulario `ninoFormGroup` antes de procesar los datos.
   * - Crea un objeto con los datos específicos, incluyendo la fracción arancelaria y la descripción.
   * - Agrega la nueva entrada a la tabla dinámica y actualiza el estado dinámico del trámite.
   * - Reinicia el formulario para permitir la entrada de nuevos datos.
   *
   * @example
   * this.agregar();
   * // Agrega una nueva entrada específica a la tabla dinámica y actualiza el estado del trámite.
   */
  public agregar(): void {
    if (this.ninoFormGroup.valid) {
      const ESPECIFICO = {
        id: 1,
        fraccionArancelariaProsec: this.obtenerFraccionArancelariaProsec(),
        descripcion: this.ninoFormGroup.get('uso_descripcion')?.value,
      };
      this.datosTabla?.push(ESPECIFICO);
      this.tramite130103Store.setDynamicFieldValue('especifico', ESPECIFICO);
      this.ninoFormGroup.reset();
    }
  }

  /**
 * @method obtenerFraccionArancelariaProsec
 * @description
 * Obtiene la descripción de la fracción arancelaria seleccionada en el formulario dinámico.
 * @returns {string} Descripción de la fracción arancelaria seleccionada o una cadena vacía si no existe.
 */
  public obtenerFraccionArancelariaProsec(): string {
    const DESCRIPCION = this.fraccionArancelariaArray.find((ele: Catalogo) => ele.id === Number(this.ninoFormGroup.get('uso_fraccion_arancelaria')?.value))?.descripcion;
    return DESCRIPCION ?? '';
  }

  /**
   * compo doc
   * @method obtenerFraccionArancelaria
   * @description
   * Este método se utiliza para obtener las opciones dinámicas para el campo "fracción arancelaria"
   * del formulario dinámico. Realiza una solicitud al servicio `ImportacionDefinitivaService`
   * para obtener los datos relacionados con las fracciones arancelarias y configura las opciones
   * en el formulario.
   *
   * Funcionalidad:
   * - Realiza una solicitud al servicio para obtener las fracciones arancelarias.
   * - Busca el campo "fracción arancelaria" en la configuración del formulario.
   * - Asigna las opciones obtenidas al campo "fracción arancelaria" si aún no están definidas.
   *
   * @example
   * this.obtenerFraccionArancelaria();
   * // Configura las opciones dinámicas del campo "fracción arancelaria" en el formulario.
   */
  public obtenerFraccionArancelaria(): void {
    this.importacionDefinitivaService
      .getFraccionArancelaria()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((resp) => {
        this.fraccionArancelariaArray = resp;
        const FRACCION_FIELD = this.usoEspecificoFormData.find(
          (datos: ModeloDeFormaDinamica) =>
            datos.campo === 'uso_fraccion_arancelaria'
        ) as ModeloDeFormaDinamica;
        if (FRACCION_FIELD) {
          if (!FRACCION_FIELD.opciones) {
            FRACCION_FIELD.opciones = resp.map(                 
              (item: { id: number; descripcion: string }) => ({
                descripcion: item.descripcion,
                id: item.id,
              })
            );
          }
        }
      });
  }

  /**
   * compo doc
   * @method establecerCambioDeValor
   * @description
   * Este método se utiliza para manejar los cambios en los valores de los campos del formulario dinámico.
   * Si el valor del evento es un objeto que contiene un identificador (`id`), actualiza el estado dinámico
   * del campo correspondiente en el store con dicho identificador y almacena la descripción en la propiedad `prosec`.
   * Si el valor no es un objeto, actualiza el estado dinámico del campo con el valor proporcionado.
   *
   * Funcionalidad:
   * - Verifica si el valor del evento contiene un identificador (`id`) y actualiza el estado dinámico.
   * - Almacena la descripción del valor en la propiedad `prosec`.
   * - Si el valor no es un objeto, actualiza el estado dinámico con el valor directamente.
   *
   * @param {Object} event - Objeto que contiene el campo modificado y su nuevo valor.
   * @param {string} event.campo - Nombre del campo modificado.
   * @param {any} event.valor - Nuevo valor del campo, que puede ser un objeto con un identificador o un valor directo.
   *
   * @example
   * this.establecerCambioDeValor({ campo: 'fraccion_arancelaria', valor: { id: 1, descripcion: 'Fracción A' } });
   * // Actualiza el estado dinámico del campo "fraccion_arancelaria" con el identificador 1 y almacena la descripción.
   *
   * this.establecerCambioDeValor({ campo: 'descripcion', valor: 'Descripción específica' });
   * // Actualiza el estado dinámico del campo "descripcion" con el valor "Descripción específica".
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  establecerCambioDeValor(event: { campo: string; valor: any }): void {
    if (
      event &&
      typeof event.valor === 'object' &&
      event.valor !== null &&
      'id' in event.valor
    ) {
      const VALOR = event.valor.id;
      this.prosec = event.valor.descripcion;
      this.tramite130103Store.setDynamicFieldValue(event.campo, VALOR);
    } else if (event) {
      this.tramite130103Store.setDynamicFieldValue(event.campo, event.valor);
    }
  }

  /**
   * compo doc
   * @method ngOnDestroy
   * @description
   * Este método es parte del ciclo de vida del componente y se ejecuta automáticamente
   * cuando el componente está a punto de ser destruido. Se utiliza para limpiar las suscripciones
   * activas y evitar fugas de memoria en la aplicación.
   *
   * Funcionalidad:
   * - Notifica a través del `Subject` `destroyNotifier$` que el componente será destruido.
   * - Completa el `Subject` para liberar los recursos asociados.
   *
   * @example
   * ngOnDestroy(): void {
   *   this.destroyNotifier$.next();
   *   this.destroyNotifier$.complete();
   * }
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
