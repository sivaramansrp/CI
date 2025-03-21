import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { ClavesDeLotes } from '../../models/claves-de-lotes.model';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { CrossList } from '../../models/mercancia.model';
import { FormBuilder } from '@angular/forms';
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
  paisOrigenColapsable = false;

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
  usoEspecificoColapsable = false;

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
   * Constructor del componente.
   * Inicializa los servicios y carga datos iniciales como las claves de lotes,
   * catálogos de mercancías, listas cruzadas y mercancías disponibles.
   * @param fb - Servicio para construir formularios reactivos.
   * @param solicitudDatosService - Servicio para manejar datos relacionados con la solicitud.
   * @param solicitud260101Store - Almacén para gestionar el estado de la solicitud.
   * @param solicitud260101Query - Consulta para observar cambios en el estado de la solicitud.
   */
  constructor(
    public fb: FormBuilder,
    public solicitudDatosService: SolicitudDatosService,
    public solicitud260101Store: Solicitud260101Store,
    public solicitud260101Query: Solicitud260101Query
  ) {
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
        map((res: Solicitud260101State) => {
          this.solicitud260101State = res;
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
    this.solicitudDatosService.obtenerClavesDeLotesListo().subscribe({
      next: (res: ClavesDeLotes[]) => {
        this.tipos = res;
        this.solicitud260101Store.setClavesDeLotes(res);
      },
    });
  }

  /**
   * Obtiene datos de mercancías desde el servicio y actualiza la descripción de la fracción arancelaria
   * y la unidad de medida de tarifa (UMT) en el estado.
   */
  obtenerMercanciaListo(): void {
    this.solicitudDatosService.obtenerMercanciaListo().subscribe({
      next: (res: Mercancia[]) => {
        this.solicitud260101Store.setDescripcionFraccionArancelaria(
          res[0].descripcionFraccionArancelaria
        );
        this.solicitud260101Store.setUmt(res[0].umt);
      },
    });
  }

  /**
   * Obtiene las listas cruzadas para los países de origen, países de procedencia
   * y usos específicos desde el servicio y actualiza las propiedades correspondientes.
   */
  obtenerCrosslisto(): void {
    this.solicitudDatosService.obtenerCrosslisto().subscribe({
      next: (res: MercanciaCrossList) => {
        this.paisOrigenCrossList = res.paisOrigenCrossList;
        this.paisProcedencisCrossList = res.paisProcedencisCrossList;
        this.usoEspecificoCrossList = res.usoEspecificoCrossList;
      },
    });
  }

  /**
   * Obtiene los catálogos de mercancías desde el servicio y actualiza las propiedades:
   * productos, especificación, tipos de productos y UMC (Unidad de Medida de Comercialización).
   */
  obtenerMercanciaCatalogos(): void {
    this.solicitudDatosService.obtenerMercanciaCatalogos().subscribe({
      next: (res: MercanciaCatalogos) => {
        this.productosCatalogo = res.productosCatalogo;
        this.especificarCatalogo = res.especificarCatalogo;
        this.tipoProductoCatalogo = res.tipoProductoCatalogo;
        this.umcCatalogo = res.umcCatalogo;
      },
    });
  }
  /**
   * Alterna la visibilidad del panel colapsable para el país de origen.
   */
  paisOrigen_colapsable(): void {
    this.paisOrigenColapsable = !this.paisOrigenColapsable;
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
  usoEspecifico_colapsable(): void {
    this.usoEspecificoColapsable = !this.usoEspecificoColapsable;
  }

  /**
   * Selecciona un producto del catálogo y actualiza la cadena de dependencia en el Store.
   * @param event - Objeto del producto seleccionado.
   */
  seleccionaProductos(event: Catalogo): void {
    this.solicitud260101Store.setCadenaDeDependencia(event.descripcion);
  }

  /**
   * Selecciona una opción del catálogo para especificar el producto y actualiza el estado.
   * @param event - Objeto del catálogo seleccionado.
   */
  seleccionaEspecificar(event: Catalogo): void {
    this.solicitud260101Store.setEspecificarProducto(event.id);
  }

  /**
   * Selecciona un tipo de producto del catálogo y actualiza el estado.
   * @param event - Objeto del catálogo seleccionado.
   */
  seleccionaTipoProducto(event: Catalogo): void {
    this.solicitud260101Store.setTipoProducto(event.id);
  }

  /**
   * Selecciona la fecha de fabricación del producto y actualiza el estado.
   * @param event - Cadena con la fecha seleccionada.
   */
  seleccionarFechaFabricacion(event: string): void {
    this.solicitud260101Store.setFechaFabricacion(event);
  }

  /**
   * Selecciona la fecha de caducidad del producto y actualiza el estado.
   * @param event - Cadena con la fecha seleccionada.
   */
  seleccionarFechaCaducidad(event: string): void {
    this.solicitud260101Store.setFechaCaducidad(event);
  }

  /**
   * Actualiza el nombre específico del producto en el Store.
   * @param event - Evento que contiene el valor ingresado.
   */
  setNombreProductoEspecifico(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setNombreProductoEspecifico(VALUE);
  }

  /**
   * Actualiza la marca del producto en el Store.
   * @param event - Evento que contiene el valor ingresado.
   */
  setMarca(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setMarca(VALUE);
  }

  /**
   * Actualiza la fracción arancelaria en el Store.
   * @param event - Evento que contiene el valor ingresado.
   */
  setFraccionArancelaria(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setFraccionArancelaria(VALUE);
  }

  /**
   * Actualiza la cantidad UMT (Unidad de Medida de Tarifa) en el Store.
   * @param event - Evento que contiene el valor ingresado.
   */
  setCantidadUMT(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setCantidadUMT(VALUE);
  }

  /**
   * Actualiza la cantidad UMC (Unidad de Medida de Comercialización) en el Store.
   * @param event - Evento que contiene el valor ingresado.
   */
  setCantidadUMC(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setCantidadUMC(VALUE);
  }

  /**
   * Selecciona la UMC del catálogo y actualiza el estado.
   * @param event - Objeto del catálogo seleccionado.
   */
  setUMC(event: Catalogo): void {
    this.solicitud260101Store.setUmc(event.id);
  }

  /**
   * Actualiza la clave de los lotes en el Store.
   * @param event - Evento que contiene el valor ingresado.
   */
  setClaveDeDeLosLotes(event: Event): void {
    const VALUE = (event.target as HTMLInputElement).value;
    this.solicitud260101Store.setClaveDeLosLotes(VALUE);
  }

  /**
   * Agrega una mercancía al estado utilizando los datos del formulario.
   */
  agregarMercanias(): void {
    const JSON_OBJECT = {
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

    this.solicitud260101Store.addMercanciasDatos(JSON_OBJECT);
  }

  /**
   * Agrega una clave de lote al estado utilizando los datos del formulario.
   * Solo se agrega si no hay valores vacíos.
   */
  agregarClavesDeLotes(): void {
    const JSON_OBJECT = {
      lotes: this.datosMercanciaForm.get('claveDeLosLotes')?.value,
      fabricacion: this.datosMercanciaForm.get('fechaFabricacion')?.value,
      caducidad: this.datosMercanciaForm.get('fechaCaducidad')?.value,
    };

    const IS_EMPTY = Object.values(JSON_OBJECT).some(
      (value) => value === null || value === undefined || value === ''
    );

    if (!IS_EMPTY) {
      this.solicitud260101Store.addClaveDeLote(JSON_OBJECT);
    }
  }

  /**
   * Actualiza la lista de claves de lotes seleccionadas.
   * @param event - Lista de claves de lotes seleccionadas.
   */
  getListaClavesDeLotes(event: ClavesDeLotes[]): void {
    this.selectedClavesDeLotes = event;
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
