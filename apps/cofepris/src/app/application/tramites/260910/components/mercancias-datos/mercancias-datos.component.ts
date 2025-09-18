import { Catalogo, CatalogosSelect, ConfiguracionColumna, CrosslistComponent, InputFecha, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CrossList, MercanciaCatalogos, MercanciaCrossList } from '../../models/mercancia.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Solicitud260910State, Solicitud260910Store } from '../../estados/tramites260910.store';
import { Subject, map, takeUntil } from 'rxjs';
import { ClavesDeLotes } from '../../models/claves-de-lotes.model';
import { Mercancia } from '../../models/mercancia.model';
import { Solicitud260910Query } from '../../estados/tramites260910.query';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';

/**
 * Componente ModificarMercanciasComponent.
 * Este componente gestiona la lógica y funcionalidad para la modificación de mercancías en el sistema.
 */
@Component({
  selector: 'app-mercancias-datos',
  templateUrl: './mercancias-datos.component.html',
  styleUrl: './mercancias-datos.component.scss',
})
export class ModificarMercanciasComponent implements OnChanges, OnInit, OnDestroy {
  /**
   * Referencias a los componentes de listas cruzadas.
   */
  @ViewChildren(CrosslistComponent) crossList!: QueryList<CrosslistComponent>;

  /**
   * Catálogo de productos disponibles.
   * Inicializado como un objeto vacío.
   */
  productosCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo para especificar productos.
   * Inicializado como un objeto vacío.
   */
  especificarCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de tipos de productos.
   * Inicializado como un objeto vacío.
   */
  tipoProductoCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de formas farmacéuticas.
   * Inicializado como un objeto vacío.
   */
  farmaceuticaCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Catálogo de estados físicos.
   * Inicializado como un objeto vacío.
   */

  fisicoCatalogo: CatalogosSelect = {} as CatalogosSelect;
  

  /**
   * Catálogo de Unidades de Medida de Comercialización (UMC).
   * Inicializado como un objeto vacío.
   */
  umcCatalogo: CatalogosSelect = {} as CatalogosSelect;

  /**
   * Controla la visibilidad del panel colapsable para el país de origen.
   * Valor inicial: `false` (panel oculto).
   */
  paisOrigen = false;

  /**
   * Lista cruzada de países de origen.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  paisOrigenCrossList: CrossList = {} as CrossList;

  /**
   * Controla la visibilidad del panel colapsable para el país de procedencia.
   * Valor inicial: `false` (panel oculto).
   */
  paisProcedencisColapsable = false;

  /**
   * Lista cruzada de países de procedencia.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  paisProcedencisCrossList: CrossList = {} as CrossList;

  /**
   * Controla la visibilidad del panel colapsable para el uso específico.
   * Valor inicial: `false` (panel oculto).
   */
  usoEspecifico = false;

  /**
   * Lista cruzada de usos específicos.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  usoEspecificoCrossList: CrossList = {} as CrossList;

  /**
   * Configuración para el campo de fecha de fabricación.
   * Incluye nombre de etiqueta, estado de requerido y habilitación.
   */
  fechaFabricacionDatos: InputFecha = {
    labelNombre: 'Fecha de fabricación',
    required: false,
    habilitado: true,
  };

  /**
   * Configuración para el campo de fecha de caducidad.
   * Incluye nombre de etiqueta, estado de requerido y habilitación.
   */
  fechaCaducidad: InputFecha = {
    labelNombre: 'Fecha de caducidad',
    required: false,
    habilitado: true,
  };

  /**
   * Tipo de selección utilizada en las tablas.
   * Configurada como selección de tipo `CHECKBOX`.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Configuración de las columnas para la tabla de claves de lotes.
   * Define el encabezado, la clave asociada y el orden de las columnas.
   */
  configuracionTabla: ConfiguracionColumna<ClavesDeLotes>[] = [
    {
      encabezado: 'Clave de los lotes ',
      clave: (item: ClavesDeLotes) => item.lotes,
      orden: 1,
    },
    {
      encabezado: 'Fecha de fabricación',
      clave: (item: ClavesDeLotes) => item.fabricacion,
      orden: 2,
    },
    {
      encabezado: 'Fecha de caducidad',
      clave: (item: ClavesDeLotes) => item.caducidad,
      orden: 3,
    },
  ];

  /**
   * Lista de claves de lotes disponibles.
   * Inicializada como un arreglo vacío.
   */
  tipos: ClavesDeLotes[] = [];

  /**
   * Lista de claves de lotes seleccionadas por el usuario.
   * Inicializada como un arreglo vacío.
   */
  selectedClavesDeLotes: ClavesDeLotes[] = [];

  /**
   * Formulario reactivo para gestionar los datos de la mercancía.
   * Se inicializará más adelante en el ciclo de vida del componente.
   */
  datosMercanciaForm!: FormGroup;

  /**
   * Estado actual de la solicitud 260910.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  solicitud260910State: Solicitud260910State = {} as Solicitud260910State;

  /**
   * Subject para manejar la destrucción del componente.
   * Utilizado para liberar recursos relacionados con las suscripciones activas.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Botones de acción para administrar listas de países en el país de origen
   */
  paisDeOrigenBotons = [
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
   * Botones de acción para gestionar listas de países en el país de procedencia.
   */
  paisDeProcedenciaBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[1].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[1].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[1].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[1].quitar('t'),
    },
  ];

  /**
   * Botones de acción para gestionar listas de países en el uso específico.
   */
  usoEspecificoBotons = [
    {
      btnNombre: 'Agregar todos',
      class: 'btn-primary',
      funcion: (): void => this.crossList.toArray()[2].agregar('t'),
    },
    {
      btnNombre: 'Agregar selección',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].agregar(''),
    },
    {
      btnNombre: 'Restar selección',
      class: 'btn-danger',
      funcion: (): void => this.crossList.toArray()[2].quitar(''),
    },
    {
      btnNombre: 'Restar todos',
      class: 'btn-default',
      funcion: (): void => this.crossList.toArray()[2].quitar('t'),
    },
  ];

  /**
   * Catálogos relacionados con la información de la mercancía.
   */
  @Input() mercancia!: Mercancia | null;
  
  /**
   * Evento emitido cuando se modifica una mercancía.
   */
  @Output() modificar = new EventEmitter<Mercancia>();

  /**
   * Constructor del componente.
   * Inicializa los servicios y carga datos iniciales como las claves de lotes,
   * catálogos de mercancías, listas cruzadas y mercancías disponibles.
   * @param fb - Servicio para construir formularios reactivos.
   * @param solicitudDatosService - Servicio para manejar datos relacionados con la solicitud.
   * @param solicitud260910Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260910Query - Consulta para observar cambios en el estado de la solicitud.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260910Store: Solicitud260910Store,
    public solicitud260910Query: Solicitud260910Query
  ) {
    this.obtenerMercanciaCatalogos();
    this.obtenerCrosslisto();
    this.obtenerMercanciaListo();
  }

  /**
   * Método del ciclo de vida `OnInit`.
   * Inicializa el formulario de datos de la mercancía y suscribe al estado de la solicitud
   * para actualizar automáticamente los valores cuando cambien.
   */
  ngOnInit(): void {
    this.datosMercanciaForm = this.fb.group({
      /** Clasificación del producto. */
      clasificaionProductos: [
        this.solicitud260910State.clasificaionProductos,
        [Validators.required],
      ],
      /** Especificación del producto, con validación de longitud máxima. */
      especificarProducto: [
        this.solicitud260910State.especificarProducto,
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Nombre específico del producto. */
      nombreProductoEspecifico: [
        this.solicitud260910State.nombreProductoEspecifico,
        [Validators.required],
      ],
      /** Distintiva del producto. */
      distintiva: [this.solicitud260910State.distintiva, [Validators.required]],
      /** Cientifico del producto. */
      cientifico: [this.solicitud260910State.cientifico, [Validators.required]],
      /** Tipo del producto. */
      tipoProducto: [
        this.solicitud260910State.tipoProducto,
        [Validators.required],
      ],

      /** Forma farmacéutica */
      farmaceutica: [
        this.solicitud260910State.farmaceutica,
        [Validators.required],
      ],

      /** Estado físico */

      fisico: [this.solicitud260910State.fisico, [Validators.required]],

      /** Fracción arancelaria del producto. */
      fraccionArancelaria: [
        this.solicitud260910State.fraccionArancelaria,
        [Validators.required],
      ],
      /** Descripción de la fracción arancelaria (solo lectura). */
      descripcionFraccionArancelaria: [
        {
          value: this.solicitud260910State.descripcionFraccionArancelaria,
          disabled: true,
        },
        [Validators.required],
      ],
      /** Cantidad medida en UMT (Unidad de Medida de Tarifa). */
      cantidadUMT: [
        this.solicitud260910State.cantidadUMT,
        [Validators.required],
      ],
      /** Unidad de Medida de Tarifa (solo lectura). */
      umt: [
        {
          value: this.solicitud260910State.umt,
          disabled: true,
        },
        [Validators.required],
      ],
      /** Cantidad medida en UMC (Unidad de Medida de Comercialización). */
      cantidadUMC: [
        this.solicitud260910State.cantidadUMC,
        [Validators.required],
      ],
      /** Unidad de Medida de Comercialización. */
      umc: [this.solicitud260910State.umc, [Validators.required]],
      /** Presentación farmacéutica del producto. */
      presentacionFarmaceutica: [
        this.solicitud260910State.presentacionFarmaceutica,
        [Validators.required],
      ],
      /** Registro sanitario del producto. */

      registroSanitario: [
        this.solicitud260910State.registroSanitario
      ],
      /** Fecha de caducidad del producto. */
      fechaCaducidad: [
        this.solicitud260910State.fechaCaducidad,
        [Validators.required],
      ],
    });

    // Observa cambios en el estado y actualiza los valores en el formulario.
    this.solicitud260910Query.seleccionarSolicitud$.pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260910State) => {
          this.solicitud260910State = respuesta;
          this.datosMercanciaForm.patchValue({
            clasificaionProductos:
              this.solicitud260910State.clasificaionProductos,
            especificarProducto: this.solicitud260910State.especificarProducto,
            nombreProductoEspecifico:
              this.solicitud260910State.nombreProductoEspecifico,
            distintiva: this.solicitud260910State.distintiva,
            cientifico: this.solicitud260910State.cientifico,
            tipoProducto: this.solicitud260910State.tipoProducto,
            farmaceutica: this.solicitud260910State.farmaceutica,
            fisico: this.solicitud260910State.fisico,
            fraccionArancelaria: this.solicitud260910State.fraccionArancelaria,
            descripcionFraccionArancelaria:
              this.solicitud260910State.descripcionFraccionArancelaria,
            cantidadUMT: this.solicitud260910State.cantidadUMT,
            umt: this.solicitud260910State.umt,
            cantidadUMC: this.solicitud260910State.cantidadUMC,
            umc: this.solicitud260910State.umc,
            presentacionFarmaceutica:
              this.solicitud260910State.presentacionFarmaceutica,
            registroSanitario: this.solicitud260910State.registroSanitario,
            fechaCaducidad: this.solicitud260910State.fechaCaducidad,
          });
        })
      )
      .subscribe();
  }

  /**
   * Actualiza el formulario cuando cambia la entrada `mercancia`.
   */
  ngOnChanges(): void {
    if (this.mercancia) {
      this.datosMercanciaForm.patchValue(this.mercancia);
    }
  }
  
  /**
   * Obtiene datos de mercancías desde el servicio y actualiza la descripción de la fracción arancelaria
   * y la unidad de medida de tarifa (UMT) en el estado.
   */
  obtenerMercanciaListo(): void {
    this.solicitudDatosService
      .obtenerMercanciaListo().pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Mercancia[]) => {
          this.solicitud260910Store.setDescripcionFraccionArancelaria(
            respuesta[0].descripcionFraccionArancelaria
          );
          this.solicitud260910Store.setUmt(respuesta[0].umt);
        },
      });
  }

  /**
   * Obtiene las listas cruzadas para los países de origen, países de procedencia
   * y usos específicos desde el servicio y actualiza las propiedades correspondientes.
   */
  obtenerCrosslisto(): void {
    this.solicitudDatosService
      .obtenerCrosslisto().pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: MercanciaCrossList) => {
          this.paisOrigenCrossList = respuesta.paisOrigenCrossList;
          this.paisProcedencisCrossList = respuesta.paisProcedencisCrossList;
          this.usoEspecificoCrossList = respuesta.usoEspecificoCrossList;
        },
      });
  }

  /**
   * Obtiene los catálogos de mercancías desde el servicio y actualiza las propiedades:
   * productos, especificación, tipos de productos y UMC (Unidad de Medida de Comercialización).
   */
  obtenerMercanciaCatalogos(): void {
    this.solicitudDatosService
      .obtenerMercanciaCatalogos().pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: MercanciaCatalogos) => {
          this.productosCatalogo = respuesta.productosCatalogo;
          this.especificarCatalogo = respuesta.especificarCatalogo;
          this.tipoProductoCatalogo = respuesta.tipoProductoCatalogo;
          this.farmaceuticaCatalogo = respuesta.farmaceuticaCatalogo;
          this.fisicoCatalogo = respuesta.fisicoCatalogo;
          this.umcCatalogo = respuesta.umcCatalogo;
        },
      });
  }
  /**
   * Alterna la visibilidad del panel colapsable para el país de origen.
   */
  paisOrigenColapsable(): void {
    this.paisOrigen = !this.paisOrigen;
  }

  /**
   * Alterna la visibilidad del panel colapsable para el país de procedencia.
   */
  paisProcedencis_colapsable(): void {
    this.paisProcedencisColapsable = !this.paisProcedencisColapsable;
  }

  /**
   * Alterna la visibilidad del panel colapsable para el uso específico.
   */
  usoEspecificoColapsable(): void {
    this.usoEspecifico = !this.usoEspecifico;
  }

  /**
   * Selecciona un producto del catálogo y actualiza la cadena de dependencia en el Store.
   * @param evento - Objeto del producto seleccionado.
   */
  seleccionaProductos(evento: Catalogo): void {
    this.solicitud260910Store.setCadenaDeDependencia(evento.descripcion);
  }

  /**
   * Selecciona una opción del catálogo para especificar el producto y actualiza el estado.
   * @param evento - Objeto del catálogo seleccionado.
   */
  seleccionaEspecificar(evento: Catalogo): void {
    this.solicitud260910Store.setEspecificarProducto(evento.id);
  }

  /**
   * Selecciona un tipo de producto del catálogo y actualiza el estado.
   * @param evento - Objeto del catálogo seleccionado.
   */
  seleccionaTipoProducto(evento: Catalogo): void {
    this.solicitud260910Store.setTipoProducto(evento.id);
  }

  /**
   * Selecciona una forma farmacéutica del catálogo y actualiza el estado.
   * @param evento - Objeto del catálogo seleccionado.
   */
  seleccionaFarmaceutica(evento: Catalogo): void {
    this.solicitud260910Store.setFarmaceutica(evento.id);
  }

  /**
   * Selecciona un estado físico del catálogo y actualiza el estado.
   * @param evento - Objeto del catálogo seleccionado.
   */
  seleccionaFisico(evento: Catalogo): void {
    this.solicitud260910Store.setFisico(evento.id);
  }


  /**
   * Selecciona la fecha de caducidad del producto y actualiza el estado.
   * @param evento - Cadena con la fecha seleccionada.
   */
  seleccionarFechaCaducidad(evento: string): void {
    this.solicitud260910Store.setFechaCaducidad(evento);
  }

  /**
   * Actualiza el nombre específico del producto en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setNombreProductoEspecifico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setNombreProductoEspecifico(VALOR);
  }

  /**
   * Actualiza la Distintiva del producto en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setDistintiva(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setDistintiva(VALOR);
  }

   /**
   * Actualiza la Cientifico del producto en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
   setCientifico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setCientifico(VALOR);
  }

  /**
   * Actualiza la fracción arancelaria en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setFraccionArancelaria(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setFraccionArancelaria(VALOR);
  }

  /**
   * Actualiza la cantidad UMT (Unidad de Medida de Tarifa) en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setCantidadUMT(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setCantidadUMT(VALOR);
  }

  /**
   * Actualiza la cantidad UMC (Unidad de Medida de Comercialización) en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setCantidadUMC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260910Store.setCantidadUMC(VALOR);
  }

  /**
   * Selecciona la UMC del catálogo y actualiza el estado.
   * @param evento - Objeto del catálogo seleccionado.
   */
  setUMC(evento: Catalogo): void {
    this.solicitud260910Store.setUmc(evento.id);
  }

  /**
     * compodoc
     * method setValoresStore
     * description Actualiza el valor de un campo en el almacén de estado.
     * Este método se utiliza para sincronizar los valores del formulario con el estado global de la aplicación.
     * param {FormGroup} form - El formulario reactivo que contiene los datos.
     * param {string} campo - El nombre del campo que se desea actualizar.
     * param {keyof Sanitario260211Store} metodoNombre - El método del almacén que se invocará para actualizar el valor.
     * returns {void}
     */
  setValoresStore(form: FormGroup, campo: string, metodoNombre: keyof Solicitud260910Store): void {
    const VALOR = form.get(campo)?.value; // Obtener el valor del campo especificado del formulario.
    (this.solicitud260910Store[metodoNombre] as (value: string | number | boolean) => void)(VALOR);
  }

  
  /**
   * Modifica o agrega los datos de la mercancía en el estado utilizando los valores del formulario reactivo.
   * Si mercancia existe (editar), modifica; si es null (agregar), agrega un nuevo registro.
   */
  modificarMercanias(): void {
    const OBJETO_JSON = {
      clasificaionProductos: this.datosMercanciaForm.get('clasificaionProductos')?.value,
      especificarProducto: this.datosMercanciaForm.get('especificarProducto')?.value,
      nombreProductoEspecifico: this.datosMercanciaForm.get('nombreProductoEspecifico')?.value,
      distintiva: this.datosMercanciaForm.get('distintiva')?.value,
      cientifico: this.datosMercanciaForm.get('cientifico')?.value,
      tipoProducto: this.datosMercanciaForm.get('tipoProducto')?.value,
      farmaceutica: this.datosMercanciaForm.get('farmaceutica')?.value,
      fisico: this.datosMercanciaForm.get('fisico')?.value,
      fraccionArancelaria: this.datosMercanciaForm.get('fraccionArancelaria')?.value,
      descripcionFraccionArancelaria: this.datosMercanciaForm.get('descripcionFraccionArancelaria')?.value,
      cantidadUMT: this.datosMercanciaForm.get('cantidadUMT')?.value,
      umt: this.datosMercanciaForm.get('umt')?.value,
      cantidadUMC: this.datosMercanciaForm.get('cantidadUMC')?.value,
      umc: this.datosMercanciaForm.get('umc')?.value,
      presentacionFarmaceutica: this.datosMercanciaForm.get('presentacionFarmaceutica')?.value,
      registroSanitario: this.datosMercanciaForm.get('registroSanitario')?.value,
      fechaCaducidad: this.datosMercanciaForm.get('fechaCaducidad')?.value,
      paisDeOrigen: 'paisDeOrigen',
      paisDeProcedencia: 'paisDeProcedencia',
      usoEspecifico: 'usoEspecifico',
    };

    if (this.mercancia) {
      // Buscar el índice de la mercancía a modificar
      const MERCANCIAS = [...this.solicitud260910Store._value().mercanciasDatos];
      const ID = MERCANCIAS.findIndex(m => m === this.mercancia);
      if (ID !== -1) {
        MERCANCIAS[ID] = { ...MERCANCIAS[ID], ...OBJETO_JSON };
        this.solicitud260910Store.setMercanciasDatos(MERCANCIAS);
      }
    } else {
      // Agregar nuevo registro
      const MERCANCIAS = [...this.solicitud260910Store._value().mercanciasDatos, OBJETO_JSON];
      this.solicitud260910Store.setMercanciasDatos(MERCANCIAS);
    }
  }

  
  /**
   * Método del ciclo de vida `OnDestroy`.
   * Libera recursos y elimina suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
