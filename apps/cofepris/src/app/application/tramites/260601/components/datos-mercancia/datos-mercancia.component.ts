import { Component, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable, Subject, map, merge, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';

import {
  AvisoSanitarioState,
  Tramite260601Store,
} from '../../../../estados/tramites/tramite260601.store';
import { CATALOGOS_ID, PANELS } from '../../constantes/aviso-enum';
import {
  Catalogo,
  CatalogoSelectComponent,
  ConsultaioQuery,
  CrosslistComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CrossList, MercanciaCrossList } from '../../models/aviso-model';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';

/**
 * Componente para gestionar el mercancia datos.
 */
@Component({
  selector: 'app-datos-mercancia',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    CrosslistComponent,
    TituloComponent
  ],
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent implements OnInit, OnDestroy {
  /**
   * Formulario principal para los datos de la mercancía.
   */
  agregarMercanciaForm!: FormGroup;

  /**
   * Catálogo de clasificación de productos.
   */
  productoClasificacion!: Catalogo[];

  /**
   * Catálogo de clasificación específica de productos.
   */
  especificoProductoClasificacion!: Catalogo[];

  /**
   * Catálogo de tipos de productos.
   */
  tipoProducto!: Catalogo[];

  /**
   * Catálogo de países de destino.
   */
  paisDestino!: Catalogo[];

  /**
   * Estado actual del aviso sanitario.
   */
  public avisoSanitarioState!: AvisoSanitarioState;

  /**
   * Paneles de la interfaz de usuario.
   */
  panels = PANELS;

  /**
   * Estado del panel colapsable.
   */
  colapsable: boolean = false;

  /**
   * Botones configurados para acciones en tablas, como agregar o restar elementos.
   */


  /**
   * Datos de listas cruzadas específicas de uso.
   */
  usoEspecificoCrosslistDatos: CrossList = {} as CrossList;

  /**
   * Datos de listas cruzadas para país de origen.
   */
  paisOrigenCrosslistDatos: CrossList = {} as CrossList;

  /**
   * Datos de listas cruzadas para país de procedencia.
   */
  paisProcedencisCrosslistDatos: CrossList = {} as CrossList;

  /**
   * Lista de rangos de días seleccionarUsoEspecifico.
   */
  seleccionarUsoEspecifico: string[] = [];

  /**
   * Fechas seleccionadas para país de procedencia.
   */
  seleccionarPaisProcedencia: string[] = [];

  /**
   * Fechas seleccionadas para país de origen.
   */
  seleccionarPaisOrigen: string[] = [];

  /**
   * Lista de fechas usoEspecificoSeleccionadas.
   */
  usoEspecificoSeleccionadas: string[] = [];

  /**
   * Lista de datos de fechas usoEspecificoDatos.
   */
  usoEspecificoDatos: string[] = [];

  /**
   * Subject para destruir las suscripciones.
   */
  private destruirNotificador$: Subject<void> = new Subject();
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

    /**
   * @property {string[]} seleccionadaPaisOrigen
   * @description
   * Arreglo que almacena los países de origen seleccionados en el componente crosslist.
   * Estos valores se utilizan para actualizar el formulario de mercancía.
   */
  seleccionadaPaisOrigen: string[] = [];

  /**
   * @property {string[]} seleccionadaPaisProcedencia
   * @description
   * Arreglo que almacena los países de procedencia seleccionados en el componente crosslist.
   * Estos valores se utilizan para actualizar el formulario de mercancía.
   */
  seleccionadaPaisProcedencia: string[] = [];

  /**
   * @property {string[]} seleccionadaUsoEspecifico
   * @description
   * Arreglo que almacena los usos específicos seleccionados en el componente crosslist.
   * Estos valores se utilizan para actualizar el formulario de mercancía.
   */
  seleccionadaUsoEspecifico: string[] = [];

  /**
   * @property {QueryList<CrosslistComponent>} crossList
   * @description
   * Referencia a todos los componentes CrosslistComponent presentes en la plantilla.
   * Se utiliza para ejecutar métodos como agregar o quitar elementos en todas las listas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * @property {EventEmitter<void>} cerrarClicado
   * @description
   * Evento que se emite cuando el usuario hace clic en el botón de cerrar el modal.
   * El componente padre debe escuchar este evento para ocultar o cerrar el modal.
   */
  @Output() cerrarClicado = new EventEmitter<void>();

  /**
   * @property {EventEmitter<any>} guardarClicado
   * @description
   * Evento que se emite cuando el usuario hace clic en el botón de guardar.
   * Envía los datos del formulario al componente padre para su procesamiento.
   */
  @Output() guardarClicado = new EventEmitter();

  /**
   * @property {Array<{btnNombre: string, class: string, funcion: Function}>} botones
   * @description
   * Configuración de los botones para controlar las acciones en los componentes crosslist.
   * Cada botón tiene un nombre, una clase CSS y una función asociada que manipula las listas.
   */
  botones = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[0].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.forEach(cmp => cmp.agregar('')),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.forEach(cmp => cmp.quitar('')),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.forEach(cmp => cmp.quitar('t')),
    },
  ];

  /**
   * Constructor del componente.
   * Inyecta servicios necesarios para la gestión del formulario, los catálogos, y el estado del trámite.
   *
   * @param fb FormBuilder para construir y gestionar formularios reactivos.
   * @param avisoSanitarioService Servicio para interactuar con datos del aviso sanitario.
   * @param tramite260601Store Store para manejar el estado del trámite.
   * @param tramite260601Query Query para observar y consultar el estado del trámite.
   * @param consultaioQuery Query para observar el estado de la consulta.
   */
  constructor(
    private fb: FormBuilder,
    private avisoSanitarioService: AvisoSanitarioService,
    private tramite260601Store: Tramite260601Store,
    private tramite260601Query: Tramite260601Query,
    private consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destruirNotificador$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
  }

  /**
   * Inicializa el componente y configura los catálogos, formularios y suscripciones.
   */
  ngOnInit(): void {
    this.inicializarEstadoFormulario();
  }

  /**
   * Evalúa si se debe inicializar o cargar datos en el formulario.
   * Además, obtiene la información del catálogo de mercancía.
   */
  inicializarEstadoFormulario(): void {
    if (this.esFormularioSoloLectura) {
      this.guardarDatosFormulario();
    } else {
      this.inicializarFormulario();
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.inicializaCatalogos();

    this.tramite260601Query.selectSeccionState$
      .pipe(
        takeUntil(this.destruirNotificador$),
        map((seccionState) => {
          this.avisoSanitarioState = seccionState;
        })
      )
      .subscribe();

    // Inicializar el formulario principal
    this.crearFormulario();

    this.productoClasificacionSeleccion();
    this.especificoProductoClasificacionSeleccion();
    this.tipoProductoSeleccion();
    this.paisDestinoSeleccion();

    this.obtenerMercanciaCrosslist();

    this.agregarMercanciaForm
      .get('fraccionArancelaria')
      ?.valueChanges.pipe(takeUntil(this.destruirNotificador$))
      .subscribe(() => {
        this.autocompletarDescripcion();
      });
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.agregarMercanciaForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.agregarMercanciaForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Crea y configura el formulario principal de datos de mercancía.
   */
  crearFormulario(): void {
    this.agregarMercanciaForm = this.fb.group({
      cveProductoClasificacion: [
        this.avisoSanitarioState?.cveProductoClasificacion,
        [Validators.required],
      ],
      cveEspecificoProductoClasifi: [
        this.avisoSanitarioState?.cveEspecificoProductoClasifi,
        [Validators.required],
      ],
      nombreProducto: [
        this.avisoSanitarioState?.nombreProducto,
        [Validators.required],
      ],
      marca: [this.avisoSanitarioState?.marca, [Validators.required]],
      cveTipoProducto: [
        this.avisoSanitarioState?.cveTipoProducto,
        [Validators.required],
      ],
      fraccionArancelaria: [
        this.avisoSanitarioState?.fraccionArancelaria,
        [Validators.required],
      ],
      fraccionArancelariaDescripcion: [
        {
          value: this.avisoSanitarioState?.fraccionArancelariaDescripcion,
          disabled: true,
        },
        [Validators.required],
      ],
      modelo: [this.avisoSanitarioState?.modelo, [Validators.required]],
      productoDescripcion: [
        this.avisoSanitarioState?.productoDescripcion,
        [Validators.required],
      ],
      cvePaisDestino: [
        this.avisoSanitarioState?.cvePaisDestino,
        [Validators.required],
      ],
      cvePaisDeOrigen: [
        this.avisoSanitarioState?.cvePaisDeOrigen,
        [Validators.required],
      ],
      cvePaisDeProcedencia: [
        this.avisoSanitarioState?.cvePaisDeProcedencia,
        [Validators.required],
      ],
      cveUsoEspecifico: [
        this.avisoSanitarioState?.cveUsoEspecifico,
        [Validators.required],
      ],
    });
  }

  /**
   * Inicializa los catálogos necesarios para el formulario.
   */
  private inicializaCatalogos(): void {
    const PRODUCTO_CLASIFICACION$: Observable<void> = this.avisoSanitarioService
      .getProductoClasificacion(CATALOGOS_ID.CAT_PRODUCTO_CLASIFICACION)
      .pipe(
        map((resp) => {
          this.productoClasificacion = resp.data;
        })
      );

    const ESPECIFICO_PRODUCTO_CLASIFICACION$: Observable<void> =
      this.avisoSanitarioService
        .getEspecificoProductoClasificacion(
          CATALOGOS_ID.CAT_ESPECIFICO_PRODUCTO_CLASIFICACION
        )
        .pipe(
          map((resp) => {
            this.especificoProductoClasificacion = resp.data;
          })
        );

    const TIPO_PRODUCTO$: Observable<void> = this.avisoSanitarioService
      .getTipoProducto(CATALOGOS_ID.CAT_TIPO_PRODUCTO)
      .pipe(
        map((resp) => {
          this.tipoProducto = resp.data;
        })
      );

    const PAIS_DESTINO$: Observable<void> = this.avisoSanitarioService
      .getPaisDestino(CATALOGOS_ID.CAT_PAIS_DESTINO)
      .pipe(
        map((resp) => {
          this.paisDestino = resp.data;
        })
      );

    merge(
      PRODUCTO_CLASIFICACION$,
      ESPECIFICO_PRODUCTO_CLASIFICACION$,
      TIPO_PRODUCTO$,
      PAIS_DESTINO$
    )
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe();
  }

  /**
   * Maneja la selección de la clasificación de productos.
   */
  productoClasificacionSeleccion(): void {
    const PRODUCTO_CLASIFICACION = this.agregarMercanciaForm.get(
      'cveProductoClasificacion'
    )?.value;
    this.tramite260601Store.setProductoClasificacion(PRODUCTO_CLASIFICACION);
  }

  /**
   * Maneja la selección de la clasificación específica de productos.
   */
  especificoProductoClasificacionSeleccion(): void {
    const ESPECIFICO_PRODUCTO_CLASIFICACION = this.agregarMercanciaForm.get(
      'cveEspecificoProductoClasifi'
    )?.value;
    this.tramite260601Store.setEspecificoProductoClasificacion(
      ESPECIFICO_PRODUCTO_CLASIFICACION
    );
  }

  /**
   * Maneja la selección del tipo de producto.
   */
  tipoProductoSeleccion(): void {
    const TIPO_PRODUCTO =
      this.agregarMercanciaForm.get('cveTipoProducto')?.value;
    this.tramite260601Store.setTipoProducto(TIPO_PRODUCTO);
  }

  /**
   * Maneja la selección del país de destino.
   */
  paisDestinoSeleccion(): void {
    const PAIS_DESTINO = this.agregarMercanciaForm.get('cvePaisDestino')?.value;
    this.tramite260601Store.setPaisDestino(PAIS_DESTINO);
  }

  /**
   * Muestra u oculta el panel colapsable.
   *
   * @param index El índice del panel a mostrar u ocultar.
   *
   * @returns {void}
   */
  mostrar_colapsable(index: number): void {
    const ES_ABIERTO_ACTUALMENTE = this.panels[index].isCollapsed;
    this.panels.forEach((panel, i) => {
      panel.isCollapsed = i === index ? !ES_ABIERTO_ACTUALMENTE : true;
    });
  }

  /**
   * Obtiene los datos de listas cruzadas para la mercancía.
   */
  obtenerMercanciaCrosslist(): void {
    this.avisoSanitarioService
      .obtenerMercanciaCrosslist()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (respuesta: MercanciaCrossList) => {
          this.paisOrigenCrosslistDatos = respuesta.paisOrigenCrossList;
          this.paisProcedencisCrosslistDatos =
            respuesta.paisProcedencisCrossList;
          this.usoEspecificoCrosslistDatos = respuesta.usoEspecificoCrossList;
          this.seleccionarUsoEspecifico =
            respuesta.usoEspecificoCrossList.fechas;
          this.seleccionarPaisProcedencia =
            respuesta.paisProcedencisCrossList.fechas;
          this.seleccionarPaisOrigen = respuesta.paisOrigenCrossList.fechas;
        },
      });
  }

  /**
   * Alterna el estado del panel colapsable para uso específico.
   */
  mostrar_uso_especifico_colapsable(): void {
    this.colapsable = !this.colapsable;
  }

  /**
   * Autocompleta la descripción de la fracción arancelaria.
   */
  autocompletarDescripcion(): void {
    this.avisoSanitarioService
      .autocompletarDescripcion()
      .pipe(takeUntil(this.destruirNotificador$))
      .subscribe({
        next: (result) => {
          const FRACCION_DESCRIPCION = result.data[0].descripcion;
          this.agregarMercanciaForm
            .get('fraccionArancelariaDescripcion')
            ?.setValue(FRACCION_DESCRIPCION);
          this.tramite260601Store.setFraccionArancelariaDescripcion(
            FRACCION_DESCRIPCION
          );
        },
      });
  }

  /**
   * Establece los valores en el store de tramite260601.
   *
   * @param {FormGroup} form - El formulario del cual se obtiene el valor.
   * @param {string} campo - El nombre del campo del formulario cuyo valor se va a obtener.
   * @param {string} metodoNombre - El nombre del método en el store que se va a invocar con el valor del campo.
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite260601Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.tramite260601Store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

    /**
   * @method paisDeProcedenciaChange
   * @description
   * Maneja el cambio de selección en la lista de países de procedencia.
   * Actualiza el arreglo de países seleccionados y actualiza el valor en el formulario.
   * @param {string[]} event - Arreglo de países seleccionados en el componente crosslist.
   * @returns {void}
   */
  paisDeProcedenciaChange(event: string[]): void {
    const VALUE = event[0];
    this.seleccionadaPaisProcedencia = [VALUE];
    this.agregarMercanciaForm.patchValue({
      cvePaisDeProcedencia: VALUE,
    });
  }

  /**
   * @method usoEspecificoChange
   * @description
   * Maneja el cambio de selección en la lista de usos específicos.
   * Actualiza el arreglo de usos específicos seleccionados y actualiza el valor en el formulario.
   * @param {string[]} event - Arreglo de usos específicos seleccionados en el componente crosslist.
   * @returns {void}
   */
  usoEspecificoChange(event: string[]): void {
    const VALUE = event[0];
    this.seleccionadaUsoEspecifico = [VALUE];
    this.agregarMercanciaForm.patchValue({
      cveUsoEspecifico: VALUE,
    });
  }

  /**
   * @method agregarMercancia
   * @description
   * Emite los valores del formulario cuando el usuario hace clic en el botón "Guardar".
   * Luego emite otro evento para cerrar el modal de mercancía.
   * @returns {void}
   */
  agregarMercancia(): void {
    this.guardarClicado.emit(this.agregarMercanciaForm.value);
    this.cerrarClicado.emit();
  }

  /**
   * @method cerrarModal
   * @description
   * Emite un evento para cerrar el modal de mercancía sin guardar cambios.
   * @returns {void}
   */
  cerrarModal(): void {
    this.cerrarClicado.emit();
  }

  /**
   * @method limpiarSCIAN
   * @description
   * Reinicia todos los campos del formulario de mercancía a su estado inicial.
   * @returns {void}
   */
  limpiarSCIAN(): void {
    this.agregarMercanciaForm.reset();
  }

  /**
   * Se ejecuta al destruir el componente.
   * Emite un valor y completa el subject `destruirNotificador$` para cancelar las suscripciones.
   */
  ngOnDestroy(): void {
    this.destruirNotificador$.next();
    this.destruirNotificador$.complete();
  }
}
