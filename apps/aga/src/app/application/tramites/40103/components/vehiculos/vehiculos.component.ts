import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Subject, map, takeUntil } from 'rxjs';

import {
  Catalogo,
  ConsultaioQuery,
  ConsultaioState,
  Notificacion,
  TablaSeleccion,
  ValidacionesFormularioService
} from '@ng-mf/data-access-user';

import {
  UNIDAD_TABLA_CONFIG,
  VEHICULOS_TABLA_CONFIG
} from '../../enum/transportista-terrestre.enum';

import {
  CatalogoLista,
  UnidadTabla,
  VehiculoTabla,
  VehiculoTablaDatos
} from '../../models/registro-muestras-mercancias.model';

import {
  Tramite40103State,
  Tramite40103Store
} from '../../estados/tramite40103.store';

import { Tramite40103Query } from '../../estados/tramite40103.query';
import { modificarTerrestreService } from '../services/modificacar-terrestre.service';
/**
 * @component VehiculosComponent
 * @description
 * Componente responsable de la gestión de vehículos y unidades de arrastre en el trámite 40103.
 * Permite agregar, editar, eliminar y mostrar información de vehículos y unidades de arrastre,
 * así como gestionar los formularios reactivos, la interacción con tablas dinámicas y la visualización de modales.
 *
 * También se encarga de la comunicación con servicios para obtener catálogos y datos, y de la sincronización con el store de estado.
 *
 * @selector app-vehiculos
 * @templateUrl ./vehiculos.component.html
 * @styleUrl ./vehiculos.component.scss
 *
 * @implements OnInit
 */
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements OnInit {
  /**
   * @property {VehiculoTabla[]}
   * Lista de vehículos.
   */
  VehiculoTabla: VehiculoTabla[] = [];

  /**
   * @property {ElementRef}
   * Referencia al modal de vehículo.
   */
  @ViewChild('vehiculoModal') vehiculoModal!: ElementRef;

  /**
   * @property {ElementRef}
   * Referencia al modal de unidad de arrastre.
   */
  @ViewChild('unidadModal') unidadModal!: ElementRef;

  /**
   * @property {FormGroup}
   * Formulario reactivo para vehículos.
   */
  vehiculoFormulario!: FormGroup;

  /**
   * @property {FormGroup}
   * Formulario reactivo para unidades de arrastre.
   */
  unidadFormulario!: FormGroup;

  /**
   * @property {Subject<void>}
   * Sujeto para destruir las suscripciones.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {Catalogo[]}
   * Catálogo de tipos de vehículo.
   */
  tipoDeVehiculoCatalogo: Catalogo[] = [];

  /**
   * @property {Catalogo[]}
   * Catálogo de tipos de arrastre.
   */
  tipoArrastre: Catalogo[] = [];

  /**
   * @property {Catalogo[]}
   * Catálogo de años.
   */
  anoCatalogo: Catalogo[] = [];

  /**
   * @property {Catalogo[]}
   * Catálogo de países emisores.
   */
  paisEmisorCatalogo: Catalogo[] = [];

  /**
   * @property {Notificacion}
   * Notificación actual.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * @property {string}
   * Nombre de la pestaña seleccionada.
   */
  selectedTab: string = 'Parque vehicular';

  /**
   * @property {string}
   * Nombre de la pestaña activa.
   */
  activeTab: string = 'parquevehicular';

  /**
   * @property {TablaSeleccion}
   * Tipo de selección de la tabla.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * @property {Tramite40103State}
   * Estado actual del trámite.
   */
  public tramiteState!: Tramite40103State;

  /**
   * @property {ElementRef}
   * Referencia al botón de cierre del modal de vehículo.
   */
  @ViewChild('closeModal') public closeModal!: ElementRef;

  /**
   * @property {ElementRef}
   * Referencia al botón de cierre del modal de unidad de arrastre.
   */
  @ViewChild('closeUnidadModal') public closeUnidadModal!: ElementRef;

  /**
   * @property {boolean}
   * Indica si el formulario o componente está en modo solo lectura.
   */
  isReadonly: boolean = false;

  /**
   * @property {ConsultaioState}
   * Almacena el estado de consulta actual.
   */
  datosConsulta!: ConsultaioState;

/**
 * Constructor del componente `VehiculosComponent`.
 *
 * - Inicializa los servicios y dependencias necesarias para la gestión de vehículos y unidades de arrastre.
 * - Permite la inyección de servicios para formularios reactivos, gestión de estado, validaciones y consultas.
 *
 * @constructor
 * @param {FormBuilder} fb - Servicio para la creación y gestión de formularios reactivos.
 * @param {Tramite40103Store} store - Store del trámite 40103 para la gestión del estado global.
 * @param {Tramite40103Query} tramiteQuery - Query para consultar el estado del trámite 40103.
 * @param {modificarTerrestreService} modificarTerrestreService - Servicio para modificar y obtener datos terrestres.
 * @param {ValidacionesFormularioService} validacionesService - Servicio para validaciones personalizadas de formularios.
 * @param {ConsultaioQuery} consultaioQuery - Servicio para consultar el estado de consulta y determinar el modo de solo lectura.
 */
  constructor(
    public fb: FormBuilder,
    public store: Tramite40103Store,
    public tramiteQuery: Tramite40103Query,
    public modificarTerrestreService: modificarTerrestreService,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) { 
    // Lógica constructora
  }

  /**
   * Método de ciclo de vida de Angular que se llama cuando el componente se inicializa.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();

/**
 * Suscribe al estado de consulta para determinar si el formulario debe estar en modo solo lectura.
 * Si el estado indica `readonly`, actualiza las propiedades `datosConsulta` e `isReadonly` del componente.
 *
 * @observable selectConsultaioState$
 * @effect Actualiza el modo de solo lectura del formulario según el estado de consulta.
 */
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if (seccionState.readonly) {
            this.datosConsulta = seccionState;
            this.isReadonly = this.datosConsulta.readonly;
          }
        })
      ).subscribe();
  /**
 * Inicializa la pestaña activa, los formularios y carga los catálogos necesarios al iniciar el componente.
 *
 * - Selecciona la pestaña "Parque vehicular" como activa.
 * - Inicializa los formularios reactivos de vehículo y unidad de arrastre.
 * - Carga los catálogos de tipos de vehículo, arrastre, año y país emisor.
 */
    this.selectTab('parquevehicular');
    this.inicializarFormulario();
    this.cargarTipoDeVehiculo();

/**
 * Deshabilita inicialmente el campo 'descripcion' en ambos formularios y gestiona su habilitación dinámica.
 *
 * - El campo 'descripcion' de `vehiculoFormulario` y `unidadFormulario` se deshabilita por defecto.
 * - Si el usuario selecciona un tipo de vehículo o unidad de arrastre con ID igual a 1,
 *   el campo 'descripcion' correspondiente se habilita; en caso contrario, se deshabilita.
 *
 * Esto permite mostrar u ocultar el campo de descripción según la selección del usuario.
 */
    this.vehiculoFormulario.get('descripcion')?.disable();
    this.unidadFormulario.get('descripcion')?.disable();

    this.vehiculoFormulario.get('tipoDeVehiculo')?.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((selectedValue) => {
        const id = Number(selectedValue);
        if (id === 1) {
          this.vehiculoFormulario.get('descripcion')?.enable();
        } else {
          this.vehiculoFormulario.get('descripcion')?.disable();
        }
      });

    this.unidadFormulario.get('tipoDeUnidadArrastre')?.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((selectedValue) => {
        const id = Number(selectedValue);
        if (id === 1) {
          this.unidadFormulario.get('descripcion')?.enable();
        } else {
          this.unidadFormulario.get('descripcion')?.disable();
        }
      });
  }

/**
 * Configuración de la tabla de vehículos.
 *
 * Define las columnas (encabezadas) y los datos que se mostrarán en la tabla de vehículos.
 * La primera columna corresponde al ID del vehículo, seguida de las columnas definidas en `VEHICULOS_TABLA_CONFIG`.
 *
 * @property {Object} vehiculosTablaConfig
 * @property {Array<Object>} vehiculosTablaConfig.encabezadas - Arreglo de objetos que define los encabezados de la tabla.
 * @property {string} vehiculosTablaConfig.encabezadas[].encabezado - Nombre del encabezado.
 * @property {function} vehiculosTablaConfig.encabezadas[].clave - Función que retorna el valor de la columna para un vehículo.
 * @property {number} vehiculosTablaConfig.encabezadas[].orden - Orden de la columna en la tabla.
 * @property {VehiculoTabla[]} vehiculosTablaConfig.datos - Datos de los vehículos a mostrar en la tabla.
 */
  vehiculosTablaConfig: {
    encabezadas: {
      encabezado: string;
      clave: (item: VehiculoTabla) => string;
      orden: number;
    }[];
    datos: VehiculoTabla[];
  } = {
      ...VEHICULOS_TABLA_CONFIG,
      encabezadas: [
        {
          encabezado: 'ID',
          clave: (item: VehiculoTabla) => String(item.idDeVehiculo),
          orden: 0,
        },
        ...VEHICULOS_TABLA_CONFIG.encabezadas.map((col, idx) => ({ ...col, orden: idx + 1 }))
      ]
    };

/**
 * Configuración de la tabla de unidades de arrastre.
 *
 * Define las columnas (encabezadas) y los datos que se mostrarán en la tabla de unidades de arrastre,
 * utilizando la configuración base proporcionada por `UNIDAD_TABLA_CONFIG`.
 *
 * @property {Object} unidadesTablaConfig
 * @property {Array<Object>} unidadesTablaConfig.encabezadas - Arreglo de objetos que define los encabezados de la tabla.
 * @property {string} unidadesTablaConfig.encabezadas[].encabezado - Nombre del encabezado.
 * @property {function} unidadesTablaConfig.encabezadas[].clave - Función que retorna el valor de la columna para una unidad.
 * @property {number} unidadesTablaConfig.encabezadas[].orden - Orden de la columna en la tabla.
 * @property {UnidadTabla[]} unidadesTablaConfig.datos - Datos de las unidades de arrastre a mostrar en la tabla.
 */
  unidadesTablaConfig: {
    encabezadas: {
      encabezado: string;
      clave: (item: UnidadTabla) => string;
      orden: number;
    }[];
    datos: UnidadTabla[];
  } = UNIDAD_TABLA_CONFIG;

/**
 * Cambia la pestaña seleccionada y activa en el componente.
 *
 * Asigna el nombre de la pestaña visible (`selectedTab`) y el identificador de la pestaña activa (`activeTab`)
 * según el valor recibido. Si el valor es 'parquevehicular', selecciona 'Parque vehicular', de lo contrario selecciona 'Unidad de arrastre'.
 *
 * @param {string} tabName - Identificador de la pestaña a seleccionar ('parquevehicular' o 'unidaddearrastre').
 * @returns {string} El identificador de la pestaña activa.
 */
  selectTab(tabName: string): string {
    this.selectedTab =
      tabName === 'parquevehicular' ? 'Parque vehicular' : 'Unidad de arrastre';
    this.activeTab = tabName;
    return this.activeTab;
  }

/**
 * Elimina todos los registros de la tabla de vehículos y restablece el formulario.
 *
 * - Limpia el arreglo de datos de la tabla de vehículos.
 * - Reinicia el índice de edición.
 * - Restablece el formulario de vehículo a su estado inicial.
 */
  eliminarPedimento(): void {
    this.vehiculosTablaConfig.datos = [];
    this.editIndex = null;
    this.vehiculoFormulario.reset();
  }

/**
 * Elimina todos los registros de la tabla de unidades de arrastre y restablece el formulario.
 *
 * - Limpia el arreglo de datos de la tabla de unidades de arrastre.
 * - Reinicia el índice de edición de unidad.
 * - Restablece el formulario de unidad de arrastre a su estado inicial.
 */
  eliminarUnidadPedimento(): void {
    this.unidadesTablaConfig.datos = [];
    this.editUnidadIndex = null;
    this.unidadFormulario.reset();
  }

/**
 * Abre el modal para agregar o editar un vehículo.
 *
 * Muestra el modal asociado al formulario de vehículos si la referencia existe.
 */
  abiertoPedimento(): void {
    if (this.vehiculoModal) {
      const MODAL_INSTANCE = new Modal(this.vehiculoModal.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

/**
 * Abre el modal para agregar o editar una unidad de arrastre.
 *
 * Muestra el modal asociado al formulario de unidades de arrastre si la referencia existe.
 */
  abiertoPedimentoUnidad(): void {
    if (this.unidadModal) {
      const MODAL_INSTANCE = new Modal(this.unidadModal.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Actualiza el valor de un campo en el store.
   * @param form Formulario reactivo.
   * @param campo Nombre del campo.
   * @param metodoNombre Nombre del método en el store.
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite40103Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

/**
 * Inicializa los formularios reactivos de vehículo y unidad de arrastre.
 *
 * - Calcula el siguiente ID disponible para el vehículo.
 * - Crea el formulario reactivo `vehiculoFormulario` con los valores y validaciones requeridas,
 *   utilizando los datos actuales del estado del trámite.
 * - Crea el formulario reactivo `unidadFormulario` para las unidades de arrastre,
 *   también con los valores y validaciones requeridas.
 *
 * Este método prepara ambos formularios para la captura o edición de datos, asegurando que los campos
 * estén correctamente inicializados y validados.
 */
  inicializarFormulario(): void {
    const lastId = Array.isArray(this.vehiculosTablaConfig?.datos) && this.vehiculosTablaConfig.datos.length > 0
      ? Math.max(...this.vehiculosTablaConfig.datos.map(v => Number(v.idDeVehiculo) || 0))
      : 0;
    const nextId = lastId + 1;

    this.vehiculoFormulario = this.fb.group({
      numero: [this.tramiteState.datosVehiculo.numero, [Validators.required]],
      tipoDeVehiculo: [
        this.tramiteState.datosVehiculo.tipoDeVehiculo,
        [Validators.required],
      ],
      idDeVehiculo: [{ value: nextId, disabled: true }, [Validators.required]],
      numeroPlaca: [
        this.tramiteState.datosVehiculo.numeroPlaca,
        [Validators.required],
      ],
      paisEmisor: [
        this.tramiteState.datosVehiculo.paisEmisor,
        [Validators.required],
      ],
      estado: [this.tramiteState.datosVehiculo.estado, [Validators.required]],
      marca: [this.tramiteState.datosVehiculo.marca, [Validators.required]],
      modelo: [this.tramiteState.datosVehiculo.modelo, [Validators.required]],
      ano: [this.tramiteState.datosVehiculo.ano, [Validators.required]],
      transponder: [
        this.tramiteState.datosVehiculo.transponder,
        [Validators.required],
      ],
      colorVehiculo: [
        this.tramiteState.datosVehiculo.colorVehiculo,
        [Validators.required],
      ],
      numuroEconomico: [
        this.tramiteState.datosVehiculo.numuroEconomico,
        [Validators.required],
      ],
      numero2daPlaca: [
        this.tramiteState.datosVehiculo.numero2daPlaca,
        [Validators.required],
      ],
      estado2daPlaca: [
        this.tramiteState.datosVehiculo.estado2daPlaca,
        [Validators.required],
      ],
      paisEmisor2daPlaca: [
        this.tramiteState.datosVehiculo.paisEmisor2daPlaca,
        [Validators.required],
      ],
      descripcion: [
        this.tramiteState.datosVehiculo.descripcion,
        [Validators.required],
      ],
    });

    this.unidadFormulario = this.fb.group({
      vinVehiculo: [
        this.tramiteState.datosUnidad.vinVehiculo,
        [Validators.required],
      ],
      tipoDeUnidadArrastre: [
        this.tramiteState.datosUnidad.tipoDeUnidadArrastre,
        [Validators.required],
      ],
      idDeVehiculo: [
        this.tramiteState.datosUnidad.idDeVehiculo,
        [Validators.required],
      ],
      numeroEconomico: [
        this.tramiteState.datosUnidad.numeroEconomico,
        [Validators.required],
      ],
      numeroPlaca: [
        this.tramiteState.datosUnidad.numeroPlaca,
        [Validators.required],
      ],
      paisEmisor: [
        this.tramiteState.datosUnidad.paisEmisor,
        [Validators.required],
      ],
      estado: [this.tramiteState.datosUnidad.estado, [Validators.required]],
      colorVehiculo: [
        this.tramiteState.datosUnidad.colorVehiculo,
        [Validators.required],
      ],
      numero2daPlaca: [
        this.tramiteState.datosUnidad.numero2daPlaca,
        [Validators.required],
      ],
      estado2daPlaca: [
        this.tramiteState.datosUnidad.estado2daPlaca,
        [Validators.required],
      ],
      paisEmisor2daPlaca: [
        this.tramiteState.datosUnidad.paisEmisor2daPlaca,
        [Validators.required],
      ],
      descripcion: [
        this.tramiteState.datosUnidad.descripcion,
        [Validators.required],
      ],
    });
  }

  /**
   * Valida si un campo del formulario es válido.
   * @param form Formulario reactivo.
   * @param field Nombre del campo.
   * @returns true si es válido, false en caso contrario.
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Índice de edición para la tabla de vehículos.
   */
  editIndex: number | null = null;

  /**
   * Inicia la edición de un vehículo.
   * @param index Índice del vehículo a editar.
   */
  startEditVehiculo(index: number): void {
    this.editIndex = index;
    const VEHICULO = this.vehiculosTablaConfig.datos[index];
    this.vehiculoFormulario.patchValue(VEHICULO);
    this.abiertoPedimento();
  }

/**
 * - Agrega o actualiza un vehículo en la tabla de vehículos.
 *
 * - Si el formulario es válido y se está editando un vehículo existente (`editIndex` no es null),
 * - actualiza el registro correspondiente en la tabla.
 * - Si se trata de un nuevo vehículo, lo agrega al arreglo de datos.
 * - Cierra el modal de vehículo, reinicia el formulario y actualiza el siguiente ID disponible.
 * - Si el formulario no es válido, marca todos los campos como tocados para mostrar las validaciones.
 * - Reinicia el formulario de vehículo y actualiza el campo 'idDeVehiculo' con el siguiente ID disponible.
 * - Calcula el último ID utilizado en la tabla de vehículos.
 * - Determina el siguiente ID incrementando en uno el valor máximo encontrado.
 * - Restablece el formulario de vehículo a su estado inicial.
 * - Asigna el nuevo ID al campo 'idDeVehiculo' y lo deshabilita para evitar su edición manual.
 */
  agregarVahiculodata(): void {
    if (this.vehiculoFormulario.valid) {
      const vehiculoData = {
        ...this.vehiculoFormulario.getRawValue()
      };
      if (this.editIndex !== null) {
        this.vehiculosTablaConfig.datos[this.editIndex] = vehiculoData;
        this.editIndex = null;
      } else {
        this.vehiculosTablaConfig.datos = [
          ...this.vehiculosTablaConfig.datos,
          vehiculoData,
        ];
        const lastIndex = this.vehiculosTablaConfig.datos.length - 1;
        this.onVehiculoRowSelected([{ index: lastIndex }]);
      }
      this.closeModal.nativeElement.click();
      const lastId = Array.isArray(this.vehiculosTablaConfig?.datos) && this.vehiculosTablaConfig.datos.length > 0
        ? Math.max(...this.vehiculosTablaConfig.datos.map(v => Number(v.idDeVehiculo) || 0))
        : 0;
      const nextId = lastId + 1;
      this.vehiculoFormulario.reset();
      this.vehiculoFormulario.get('idDeVehiculo')?.setValue(nextId);
      this.vehiculoFormulario.get('idDeVehiculo')?.disable();
    } else {
      this.vehiculoFormulario.markAllAsTouched();
    }
  }

  /**
   * Índice de edición para la tabla de unidades de arrastre.
   */
  editUnidadIndex: number | null = null;

  /**
   * Inicia la edición de una unidad de arrastre.
   * @param index Índice de la unidad a editar.
   */
  startEditUnidad(index: number): void {
    this.editUnidadIndex = index;
    const UNIDAD = this.unidadesTablaConfig.datos[index];
    this.unidadFormulario.patchValue(UNIDAD);
    this.abiertoPedimentoUnidad();
  }

  /**
   * Agrega o actualiza una unidad de arrastre en la tabla.
   */
  agregarUnidadData(): void {
    if (this.unidadFormulario.valid) {
      if (this.editUnidadIndex !== null) {
        this.unidadesTablaConfig.datos[this.editUnidadIndex] =
          this.unidadFormulario.value;
        this.editUnidadIndex = null;
      } else {
        this.unidadesTablaConfig.datos = [
          ...this.unidadesTablaConfig.datos,
          this.unidadFormulario.value,
        ];
      }
      this.closeUnidadModal.nativeElement.click();
      this.unidadFormulario.reset();
    } else {
      this.unidadFormulario.markAllAsTouched();
    }
  }

  /**
   * Carga los datos del pedimento en la tabla de vehículos.
   */
  public cargarPedimentoTabla(): void {
    this.modificarTerrestreService
      .obtenerPedimentoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: VehiculoTablaDatos) => {
        this.vehiculosTablaConfig.datos = datos.datos;
      });
  }

/**
 * Limpia el formulario de vehículo y restablece campos clave a su estado adecuado.
 *
 * - Obtiene el valor actual del campo 'idDeVehiculo' antes de limpiar.
 * - Restablece el formulario de vehículo a su estado inicial.
 * - Restaura el valor de 'idDeVehiculo' y lo deshabilita para evitar su edición.
 * - Deshabilita el campo 'descripcion' tanto en el formulario de vehículo como en el de unidad de arrastre.
 */
  limpiarVahiculodata(): void {
    const idValue = this.vehiculoFormulario.get('idDeVehiculo')?.value;
    this.vehiculoFormulario.reset();
    this.vehiculoFormulario.get('idDeVehiculo')?.setValue(idValue);
    this.vehiculoFormulario.get('idDeVehiculo')?.disable();
    this.vehiculoFormulario.get('descripcion')?.disable();
    this.unidadFormulario.get('descripcion')?.disable();
  }

/**
 * Limpia el formulario de unidad de arrastre y deshabilita campos de descripción.
 *
 * - Restablece el formulario de unidad de arrastre a su estado inicial.
 * - Deshabilita el campo 'descripcion' tanto en el formulario de unidad de arrastre como en el de vehículo.
 */
  limpiarUnidaddata(): void {
    this.unidadFormulario.reset();
    this.unidadFormulario.get('descripcion')?.disable();
    this.vehiculoFormulario.get('descripcion')?.disable();
  }

/**
 * Abre una notificación modal con los parámetros predefinidos.
 *
 * - Inicializa el objeto `nuevaNotificacion` con los valores necesarios para mostrar una alerta modal.
 * - La notificación es de tipo "alert" y categoría "danger", con un mensaje de confirmación de registro exitoso.
 * - El botón de aceptación se muestra con el texto "Aceptar" y la notificación se cierra automáticamente después de 2 segundos.
 *
 * @method abrirModal
 * @public
 * @returns {void}
 */
  public abrirModal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'El registro fue agregado correctamente.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

/**
 * Carga el catálogo de tipos de vehículo.
 *
 * - Realiza una llamada al servicio `modificarTerrestreService` para obtener el catálogo de tipos de vehículo.
 * - Asigna los datos recibidos a la propiedad `tipoDeVehiculoCatalogo` del componente.
 * - Utiliza `takeUntil(this.destroyNotifier$)` para limpiar la suscripción al destruir el componente.
 *
 * @method cargarTipoDeVehiculo
 * @public
 * @returns {void}
 */
  public cargarTipoDeVehiculo(): void {
    this.modificarTerrestreService
      .obtenerTipoDeVehiculo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoDeVehiculoCatalogo = datos.datos;
      });
/**
 * Carga los catálogos de tipo de arrastre, año y país emisor.
 *
 * - Realiza llamadas a los servicios correspondientes para obtener los catálogos requeridos.
 * - Asigna los datos recibidos a las propiedades del componente (`tipoArrastre`, `anoCatalogo`, `paisEmisorCatalogo`).
 * - Utiliza `takeUntil(this.destroyNotifier$)` para limpiar las suscripciones al destruir el componente.
 *
 * @effect Actualiza los catálogos utilizados en los formularios de vehículos y unidades de arrastre.
 */
    this.modificarTerrestreService
      .obtenerTipoArrastre()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoArrastre = datos.datos as Catalogo[];
      });

    this.modificarTerrestreService
      .obtenerAno()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.anoCatalogo = datos.datos as Catalogo[];
      });

    this.modificarTerrestreService
      .obtenerPaisEmisor()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.paisEmisorCatalogo = datos.datos as Catalogo[];
      });
  }

  selectedVehiculoIndex: number | null = null;
  selectedUnidadIndex: number | null = null;

  onVehiculoRowSelected(event: any) {
    this.selectedVehiculoIndex = event && event.length > 0 ? event[0].index : null;
  }

  onUnidadRowSelected(event: any) {
    this.selectedUnidadIndex = event && event.length > 0 ? event[0].index : null;
  }

  eliminarVehiculoRow() {
    if (this.selectedVehiculoIndex !== null) {
      this.vehiculosTablaConfig.datos.splice(this.selectedVehiculoIndex, 1);
      this.selectedVehiculoIndex = null;
    }
  }

  eliminarUnidadRow() {
    if (this.selectedUnidadIndex !== null) {
      this.unidadesTablaConfig.datos.splice(this.selectedUnidadIndex, 1);
      this.selectedUnidadIndex = null;
    }
  }
}

