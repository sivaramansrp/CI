import { Catalogo, CatalogoSelectComponent, ConsultaioQuery, CrosslistComponent, InputFechaComponent, TablaDinamicaComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { ClavesDeLotes } from '../../models/claves-de-lotes.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { CrossList } from '../../models/mercancia.model';
import { FormGroup } from '@angular/forms';
import { InputFecha } from '@libs/shared/data-access-user/src';
import { Mercancia } from '../../models/mercancia.model';
import { MercanciaCatalogos } from '../../models/mercancia.model';
import { MercanciaCrossList } from '../../models/mercancia.model';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Solicitud260101Query } from '../../estados/tramites260101.query';
import { Solicitud260101State } from '../../estados/tramites260101.store';
import { Solicitud260101Store } from '../../estados/tramites260101.store';
import { SolicitudDatosService } from '../../services/solicitud-datos.service';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Validators } from '@angular/forms';
import { map } from 'rxjs';
import { takeUntil } from 'rxjs';
/**
 * Componente ModificarMercanciasComponent.
 * Este componente gestiona la lógica y funcionalidad para la modificación de mercancías en el sistema.
 */
@Component({
  selector: 'app-modificar-mercancias',
  templateUrl: './modificar-mercancias.component.html',
  styleUrl: './modificar-mercancias.component.scss',
  standalone:true,
  imports:[
      ModificarMercanciasComponent,
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      CrosslistComponent,
      TablaDinamicaComponent,
      InputFechaComponent,
      CatalogoSelectComponent,
      TituloComponent,
    ]
})
export class ModificarMercanciasComponent implements OnInit, OnDestroy {
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
    labelNombre: 'Fecha de Caducidad',
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
   * Estado actual de la solicitud 260101.
   * Inicializado como un objeto vacío con la estructura correspondiente.
   */
  solicitud260101State: Solicitud260101State = {} as Solicitud260101State;

  /**
   * Subject para manejar la destrucción del componente.
   * Utilizado para liberar recursos relacionados con las suscripciones activas.
   */
  private destroyNotifier$: Subject<void> = new Subject();
  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

  /**
   * Constructor del componente.
   * Inicializa los servicios y carga datos iniciales como las claves de lotes,
   * catálogos de mercancías, listas cruzadas y mercancías disponibles.
   * @param fb - Servicio para construir formularios reactivos.
   * @param solicitudDatosService - Servicio para manejar datos relacionados con la solicitud.
   * @param solicitud260101Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260101Query - Consulta para observar cambios en el estado de la solicitud.
   * @param consultaioQuery - Servicio para consultar el estado actual desde el store.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query,
    public consultaioQuery: ConsultaioQuery
  ) {
    /**
     * Se suscribe al estado de `Consultaio` para obtener información actualizada del estado del formulario.
     *
     * - Asigna el valor de solo lectura (`readonly`) a la propiedad `esFormularioSoloLectura`.
     * - Llama a `inicializarEstadoFormulario()` para aplicar configuraciones basadas en el estado recibido.
     * - La suscripción se cancela automáticamente cuando `destroyNotifier$` emite un valor (para evitar fugas de memoria).
     */
    this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.esFormularioSoloLectura = seccionState.readonly;
          this.inicializarEstadoFormulario();
        })
      )
      .subscribe();
    this.obtenerClavesDeLotesListo();
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
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   */
  guardarDatosFormulario(): void {
    this.inicializarFormulario();
    if (this.esFormularioSoloLectura) {
      this.datosMercanciaForm.disable();
    } else if (!this.esFormularioSoloLectura) {
      this.datosMercanciaForm.enable();
    } else {
      // No se requiere ninguna acción en el formulario
    }
  }

  /**
   * Inicializa el formulario reactivo para capturar el valor de 'registro'.
   * Suscribe al estado almacenado en el store mediante el query `tramite301Query.selectSolicitud$`
   * y lo asigna a la variable local `solicitudState`. Luego, crea el formulario
   * con el valor inicial obtenido del store.
   */

  inicializarFormulario(): void {
    this.datosMercanciaForm = this.fb.group({
      /** Clasificación del producto. */
      clasificaionProductos: [
        this.solicitud260101State.clasificaionProductos,
        [Validators.required],
      ],
      /** Especificación del producto, con validación de longitud máxima. */
      especificarProducto: [
        this.solicitud260101State.especificarProducto,
        [Validators.required, Validators.maxLength(30)],
      ],
      /** Nombre específico del producto. */
      nombreProductoEspecifico: [
        this.solicitud260101State.nombreProductoEspecifico,
        [Validators.required],
      ],
      /** Marca del producto. */
      marca: [this.solicitud260101State.marca, [Validators.required]],
      /** Tipo del producto. */
      tipoProducto: [
        this.solicitud260101State.tipoProducto,
        [Validators.required],
      ],
      /** Fracción arancelaria del producto. */
      fraccionArancelaria: [
        this.solicitud260101State.fraccionArancelaria,
        [Validators.required],
      ],
      /** Descripción de la fracción arancelaria (solo lectura). */
      descripcionFraccionArancelaria: [
        {
          value: this.solicitud260101State.descripcionFraccionArancelaria,
          disabled: true,
        },
        [Validators.required],
      ],
      /** Cantidad medida en UMT (Unidad de Medida de Tarifa). */
      cantidadUMT: [
        this.solicitud260101State.cantidadUMT,
        [Validators.required],
      ],
      /** Unidad de Medida de Tarifa (solo lectura). */
      umt: [
        {
          value: this.solicitud260101State.umt,
          disabled: true,
        },
        [Validators.required],
      ],
      /** Cantidad medida en UMC (Unidad de Medida de Comercialización). */
      cantidadUMC: [
        this.solicitud260101State.cantidadUMC,
        [Validators.required],
      ],
      /** Unidad de Medida de Comercialización. */
      umc: [this.solicitud260101State.umc, [Validators.required]],
      /** Clave de los lotes del producto. */
      claveDeLosLotes: [
        this.solicitud260101State.claveDeLosLotes,
        [Validators.required],
      ],
      /** Fecha de fabricación del producto. */
      fechaFabricacion: [
        this.solicitud260101State.fechaFabricacion,
        [Validators.required],
      ],
      /** Fecha de caducidad del producto. */
      fechaCaducidad: [
        this.solicitud260101State.fechaCaducidad,
        [Validators.required],
      ],
    });

    // Observa cambios en el estado y actualiza los valores en el formulario.
    this.solicitud260101Query.seleccionarSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((respuesta: Solicitud260101State) => {
          this.solicitud260101State = respuesta;
          this.datosMercanciaForm.patchValue({
            clasificaionProductos:
              this.solicitud260101State.clasificaionProductos,
            especificarProducto: this.solicitud260101State.especificarProducto,
            nombreProductoEspecifico:
              this.solicitud260101State.nombreProductoEspecifico,
            marca: this.solicitud260101State.marca,
            tipoProducto: this.solicitud260101State.tipoProducto,
            fraccionArancelaria: this.solicitud260101State.fraccionArancelaria,
            descripcionFraccionArancelaria:
              this.solicitud260101State.descripcionFraccionArancelaria,
            cantidadUMT: this.solicitud260101State.cantidadUMT,
            umt: this.solicitud260101State.umt,
            cantidadUMC: this.solicitud260101State.cantidadUMC,
            umc: this.solicitud260101State.umc,
            claveDeLosLotes: this.solicitud260101State.claveDeLosLotes,
            fechaFabricacion: this.solicitud260101State.fechaFabricacion,
            fechaCaducidad: this.solicitud260101State.fechaCaducidad,
          });
          this.tipos = this.solicitud260101State.clavesDeLotes;
        })
      )
      .subscribe();
  }

  /**
   * Obtiene las claves de los lotes desde el servicio y actualiza los datos en el estado.
   */
  obtenerClavesDeLotesListo(): void {
    this.solicitudDatosService
      .obtenerClavesDeLotesListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: ClavesDeLotes[]) => {
          this.tipos = respuesta;
          this.solicitud260101Store.setClavesDeLotes(respuesta);
        },
      });
  }

  /**
   * Obtiene datos de mercancías desde el servicio y actualiza la descripción de la fracción arancelaria
   * y la unidad de medida de tarifa (UMT) en el estado.
   */
  obtenerMercanciaListo(): void {
    this.solicitudDatosService
      .obtenerMercanciaListo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: Mercancia[]) => {
          this.solicitud260101Store.setDescripcionFraccionArancelaria(
            respuesta[0].descripcionFraccionArancelaria
          );
          this.solicitud260101Store.setUmt(respuesta[0].umt);
        },
      });
  }

  /**
   * Obtiene las listas cruzadas para los países de origen, países de procedencia
   * y usos específicos desde el servicio y actualiza las propiedades correspondientes.
   */
  obtenerCrosslisto(): void {
    this.solicitudDatosService
      .obtenerCrosslisto()
      .pipe(takeUntil(this.destroyNotifier$))
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
      .obtenerMercanciaCatalogos()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (respuesta: MercanciaCatalogos) => {
          this.productosCatalogo = respuesta.productosCatalogo;
          this.especificarCatalogo = respuesta.especificarCatalogo;
          this.tipoProductoCatalogo = respuesta.tipoProductoCatalogo;
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
    this.solicitud260101Store.setCadenaDeDependencia(evento.descripcion);
  }

  /**
   * Selecciona una opción del catálogo para especificar el producto y actualiza el estado.
   * @param evento - Objeto del catálogo seleccionado.
   */
  seleccionaEspecificar(evento: Catalogo): void {
    this.solicitud260101Store.setEspecificarProducto(evento.id);
  }

  /**
   * Selecciona un tipo de producto del catálogo y actualiza el estado.
   * @param evento - Objeto del catálogo seleccionado.
   */
  seleccionaTipoProducto(evento: Catalogo): void {
    this.solicitud260101Store.setTipoProducto(evento.id);
  }

  /**
   * Selecciona la fecha de fabricación del producto y actualiza el estado.
   * @param evento - Cadena con la fecha seleccionada.
   */
  seleccionarFechaFabricacion(evento: string): void {
    this.solicitud260101Store.setFechaFabricacion(evento);
  }

  /**
   * Selecciona la fecha de caducidad del producto y actualiza el estado.
   * @param evento - Cadena con la fecha seleccionada.
   */
  seleccionarFechaCaducidad(evento: string): void {
    this.solicitud260101Store.setFechaCaducidad(evento);
  }

  /**
   * Actualiza el nombre específico del producto en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setNombreProductoEspecifico(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setNombreProductoEspecifico(VALOR);
  }

  /**
   * Actualiza la marca del producto en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setMarca(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setMarca(VALOR);
  }

  /**
   * Actualiza la fracción arancelaria en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setFraccionArancelaria(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setFraccionArancelaria(VALOR);
  }

  /**
   * Actualiza la cantidad UMT (Unidad de Medida de Tarifa) en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setCantidadUMT(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setCantidadUMT(VALOR);
  }

  /**
   * Actualiza la cantidad UMC (Unidad de Medida de Comercialización) en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setCantidadUMC(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setCantidadUMC(VALOR);
  }

  /**
   * Selecciona la UMC del catálogo y actualiza el estado.
   * @param evento - Objeto del catálogo seleccionado.
   */
  setUMC(evento: Catalogo): void {
    this.solicitud260101Store.setUmc(evento.id);
  }

  /**
   * Actualiza la clave de los lotes en el Store.
   * @param evento - Evento que contiene el valor ingresado.
   */
  setClaveDeDeLosLotes(evento: Event): void {
    const VALOR = (evento.target as HTMLInputElement).value;
    this.solicitud260101Store.setClaveDeLosLotes(VALOR);
  }

  /**
   * Agrega una mercancía al estado utilizando los datos del formulario.
   */
  agregarMercanias(): void {
    const OBJETO_JSON = {
      clasificaionProductos: this.datosMercanciaForm.get(
        'clasificaionProductos'
      )?.value,
      especificarProducto: this.datosMercanciaForm.get('especificarProducto')
        ?.value,
      nombreProductoEspecifico: this.datosMercanciaForm.get(
        'nombreProductoEspecifico'
      )?.value,
      marca: this.datosMercanciaForm.get('marca')?.value,
      tipoProducto: this.datosMercanciaForm.get('tipoProducto')?.value,
      fraccionArancelaria: this.datosMercanciaForm.get('fraccionArancelaria')
        ?.value,
      descripcionFraccionArancelaria: this.datosMercanciaForm.get(
        'descripcionFraccionArancelaria'
      )?.value,
      cantidadUMT: this.datosMercanciaForm.get('cantidadUMT')?.value,
      umt: this.datosMercanciaForm.get('umt')?.value,
      cantidadUMC: this.datosMercanciaForm.get('cantidadUMC')?.value,
      umc: this.datosMercanciaForm.get('umc')?.value,
      paisDeOrigen: 'paisDeOrigen',
      paisDeProcedencia: 'paisDeProcedencia',
      usoEspecifico: 'usoEspecifico',
    };

    this.solicitud260101Store.addMercanciasDatos(OBJETO_JSON);
  }

  /**
   * Agrega una clave de lote al estado utilizando los datos del formulario.
   * Solo se agrega si no hay valores vacíos.
   */
  agregarClavesDeLotes(): void {
    const OBJETO_JSON = {
      lotes: this.datosMercanciaForm.get('claveDeLosLotes')?.value,
      fabricacion: this.datosMercanciaForm.get('fechaFabricacion')?.value,
      caducidad: this.datosMercanciaForm.get('fechaCaducidad')?.value,
    };

    const ESTA_VACIO = Object.values(OBJETO_JSON).some(
      (value) => value === null || value === undefined || value === ''
    );

    if (!ESTA_VACIO) {
      this.solicitud260101Store.addClaveDeLote(OBJETO_JSON);
    }
  }

  /**
   * Actualiza la lista de claves de lotes seleccionadas.
   * @param evento - Lista de claves de lotes seleccionadas.
   */
  getListaClavesDeLotes(evento: ClavesDeLotes[]): void {
    this.selectedClavesDeLotes = evento;
  }

  /**
   * Modifica las claves de lotes seleccionadas y actualiza los valores en el formulario.
   */
  modificarClavesDeLotes(): void {
    if (this.selectedClavesDeLotes.length > 0) {
      this.datosMercanciaForm.patchValue({
        claveDeLosLotes: this.selectedClavesDeLotes[0].lotes,
        fechaFabricacion: this.selectedClavesDeLotes[0].fabricacion,
        fechaCaducidad: this.selectedClavesDeLotes[0].caducidad,
      });
    }
  }

  /**
   * Elimina la clave de lote seleccionada del estado.
   */
  eliminarClavesDeLotes(): void {
    if (this.selectedClavesDeLotes.length > 0) {
      this.solicitud260101Store.removeClaveDeLote(
        this.selectedClavesDeLotes[0]
      );
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
