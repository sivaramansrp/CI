import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, map, takeUntil } from 'rxjs';

import {
  Catalogo,
  Notificacion,
  TablaSeleccion,
  ValidacionesFormularioService,
} from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';

import {
  UNIDAD_TABLA_CONFIG,
  VEHICULOS_TABLA_CONFIG,
} from '../../enum/transportista-terrestre.enum';
import {
  Tramite40101State,
  Tramite40101Store,
} from '../../estado/tramite40101.store';

import { Tramite40101Query } from '../../estado/tramite40101.query';
import { modificarTerrestreService } from '../services/modificacar-terrestre.service';
import { CatalogoLista, UnidadTabla, VehiculoTabla, VehiculoTablaDatos, UnidadTablaConfig } from '../../models/registro-muestras-mercancias.model';
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements OnInit {
  /**
   * Índice de la unidad seleccionada para modificar
   */

  selectedUnidadRows: UnidadTabla[] = [];

  /**
   * Maneja la selección de una o más filas de unidad de arrastre (array de selección)
   */
  enUnidadFilaSeleccionada(event: UnidadTabla[]): void {
    this.selectedUnidadRows = event;
  }

  /**
   * Elimina el registro seleccionado de la tabla de unidades de arrastre.
   */
  eliminarUnidadFila(): void {
    if (this.selectedUnidadRows.length > 0) {
      this.unidadesTablaConfig.datos = this.unidadesTablaConfig.datos.filter(
        (item) => !this.selectedUnidadRows.includes(item)
      );
      this.selectedUnidadRows = [];
      this.editarIndiceUnitario = null;
      this.unidadFormulario.reset();
    }
  }

  /**
   * Índices preparados para su eliminación (vehículos)
   */
  VehiculoSeleccionada: VehiculoTabla[] = [];

  /**
   * Prepárese para eliminar vehículos seleccionados (modal abierto)
   */
  prepararEliminarVehiculo(): void {
    // No se necesita preparación, modal confirmará la eliminación de las filas seleccionadas
  }

  /**
   * Indica si el formulario o componente está en modo solo lectura.
   */
  esSoloLectura = false;

  /**
   * Maneja la selección de una o más filas de vehículo (array de selección)
   */
  onVehiculoFilaSeleccionada(event: VehiculoTabla[]): void {
    this.VehiculoSeleccionada = event;
  }

  /**
   * Almacena la lista de vehículos.
   */
  VehiculoTabla: VehiculoTabla[] = [];

  /**
   * Referencia al modal de vehículo.
   */
  @ViewChild('vehiculoModal') vehiculoModal!: ElementRef;

  /**
   * Referencia al modal de unidad de arrastre.
   */
  @ViewChild('unidadModal') unidadModal!: ElementRef;

  /**
   * Formulario reactivo para vehículos.
   */
  vehiculoFormulario!: FormGroup;

  /**
   * Formulario reactivo para unidades de arrastre.
   */
  unidadFormulario!: FormGroup;

  /**
   * Sujeto para destruir las suscripciones.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Catálogo de tipos de vehículo.
   */
  tipoDeVehiculoCatalogo: Catalogo[] = [];

  /**
   * Catálogo de tipos de unidad de arrastre.
   */
  tipoArrastreCatalogo: Catalogo[] = [];

  /**
   * Catálogo de años de los vehículos.
   */
  anoCatalogo: Catalogo[] = [];

  /**
   * Catálogo de países emisores de placas.
   */
  paisEmisorCatalogo: Catalogo[] = [];

  /**
   * Catálogo de colores de vehículos.
   */
  colorVehiculoCatalogo: Catalogo[] = [];

  /**
   * Notificación actual.
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Nombre de la pestaña seleccionada.
   */
  selectedTab: string = 'Parque vehicular';

  /**
   * Nombre de la pestaña activa.
   */
  activeTab: string = 'parquevehicular';

  /**
   * Tipo de selección de la tabla.
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Estado actual del trámite.
   */
  public tramiteState!: Tramite40101State;

  /**
   * Referencia al botón de cierre del modal de vehículo.
   */
  @ViewChild('cerrarModal') public cerrarModal!: ElementRef;

  /**
   * Referencia al botón de cierre del modal de unidad de arrastre.
   */
  @ViewChild('cerrarUnidadModal') public cerrarUnidadModal!: ElementRef;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para formularios reactivos.
   * @param store Store del trámite 40101.
   * @param tramiteQuery Query para el estado del trámite.
   * @param modificarTerrestreService Servicio para modificar datos terrestres.
   * @param validacionesService Servicio de validaciones de formulario.
   */
  constructor(
    public fb: FormBuilder,
    public store: Tramite40101Store,
    public tramiteQuery: Tramite40101Query,
    public modificarTerrestreService: modificarTerrestreService,
    private validacionesService: ValidacionesFormularioService
  ) {
    // Lógica para el constructor si es necesario.
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * - Suscribe al estado del trámite y lo actualiza en la propiedad local.
   * - Selecciona la pestaña inicial y configura los formularios reactivos.
   * - Carga los catálogos necesarios para los formularios (tipo de vehículo, país emisor, año, color, tipo de arrastre).
   * - Configura la habilitación/deshabilitación dinámica de los campos 'descripcion' según el tipo seleccionado.
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

    this.selectTab('parquevehicular');
    this.inicializarFormulario();
    this.cargarTipoDeVehiculo();
    /**
     * Carga el catálogo de países emisores de placas y lo asigna al formulario de vehículo.
     */
    this.modificarTerrestreService.obtenerPaisEmisor()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.paisEmisorCatalogo = datos.datos;
      });

    /**
     * Carga el catálogo de años de los vehículos y lo asigna al formulario de vehículo.
     */
    this.modificarTerrestreService.obtenerAno()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.anoCatalogo = datos.datos;
      });

    /**
     * Carga el catálogo de colores de vehículos si el servicio está disponible.
     */
    if (this.modificarTerrestreService.obtenerColorVehiculo) {
      this.modificarTerrestreService.obtenerColorVehiculo()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: CatalogoLista) => {
          this.colorVehiculoCatalogo = datos.datos;
        });
    }

    /**
     * Carga el catálogo de tipos de unidad de arrastre si el servicio está disponible.
     */
    if (this.modificarTerrestreService.obtenerTipoArrastre) {
      this.modificarTerrestreService.obtenerTipoArrastre()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: CatalogoLista) => {
          this.tipoArrastreCatalogo = datos.datos;
        });
    }

    /**
     * Deshabilita el campo 'descripcion' del formulario de vehículo y lo habilita solo si el tipo seleccionado es 1.
     */
    this.vehiculoFormulario.get('descripcion')?.disable();
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

    /**
     * Deshabilita el campo 'descripcion' del formulario de unidad de arrastre y lo habilita solo si el tipo seleccionado es 1.
     */
    this.unidadFormulario.get('descripcion')?.disable();
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
   */
  vehiculosTablaConfig: {
    encabezadas: {
      encabezado: string;
      clave: (item: VehiculoTabla) => string;
      orden: number;
    }[];
    datos: VehiculoTabla[];
  } = VEHICULOS_TABLA_CONFIG;

  /**
   * Configuración de la tabla de unidades de arrastre.
   */
  unidadesTablaConfig: UnidadTablaConfig = UNIDAD_TABLA_CONFIG;

  /**
   * Cambia la pestaña seleccionada.
   * @param tabName Nombre de la pestaña.
   * @returns Nombre de la pestaña activa.
   */
  selectTab(tabName: string): string {
    this.selectedTab =
      tabName === 'parquevehicular' ? 'Parque vehicular' : 'Unidad de arrastre';
    this.activeTab = tabName;
    return this.activeTab;
  }

  /**
   * Elimina el registro seleccionado de la tabla de vehículos.
   */

  eliminarVehiculoRow(): void {
    if (this.VehiculoSeleccionada.length > 0) {
      this.vehiculosTablaConfig.datos = this.vehiculosTablaConfig.datos.filter(
        (item) => !this.VehiculoSeleccionada.includes(item)
      );
      this.VehiculoSeleccionada = [];
      this.editIndex = null;
      this.vehiculoFormulario.reset();
    }
  }

  /**
   * Elimina el registro seleccionado de la tabla de unidades de arrastre.
   */



  /**
   * Abre el modal para agregar o editar un vehículo.
   */
  abiertoPedimento(): void {
    if (this.vehiculoModal) {
      const MODAL_INSTANCE = new Modal(this.vehiculoModal.nativeElement);
      MODAL_INSTANCE.show();
    }
  }

  /**
   * Abre el modal para agregar o editar una unidad de arrastre.
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
    metodoNombre: keyof Tramite40101Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

  /**
   * Inicializa los formularios reactivos de vehículo y unidad de arrastre.
   */
  inicializarFormulario(): void {
    // Incremento automático idDeVehiculo
    let nextId = 1;
    if (Array.isArray(this.vehiculosTablaConfig.datos) && this.vehiculosTablaConfig.datos.length > 0) {
      const maxId = Math.max(...this.vehiculosTablaConfig.datos.map(v => Number(v.idDeVehiculo) || 0));
      nextId = maxId + 1;
    }
    this.vehiculoFormulario = this.fb.group({
      numero: [this.tramiteState.datosVehiculo.numero, [Validators.required]],
      tipoDeVehiculo: [this.tramiteState.datosVehiculo.tipoDeVehiculo, Validators.required],
      idDeVehiculo: [{ value: nextId, disabled: true }, Validators.required],
      numeroPlaca: [this.tramiteState.datosVehiculo.numeroPlaca, Validators.required],
      paisEmisor: [this.tramiteState.datosVehiculo.paisEmisor, Validators.required],
      estado: [this.tramiteState.datosVehiculo.estado, Validators.required],
      marca: [this.tramiteState.datosVehiculo.marca, Validators.required],
      modelo: [this.tramiteState.datosVehiculo.modelo, Validators.required],
      ano: [this.tramiteState.datosVehiculo.ano, Validators.required],
      transponder: [this.tramiteState.datosVehiculo.transponder, Validators.required],
      colorVehiculo: [this.tramiteState.datosVehiculo.colorVehiculo, Validators.required],
      numuroEconomico: [this.tramiteState.datosVehiculo.numuroEconomico, Validators.required],
      numero2daPlaca: [this.tramiteState.datosVehiculo.numero2daPlaca, Validators.required],
      estado2daPlaca: [this.tramiteState.datosVehiculo.estado2daPlaca, Validators.required],
      paisEmisor2daPlaca: [this.tramiteState.datosVehiculo.paisEmisor2daPlaca, Validators.required],
      descripcion: [{ value: this.tramiteState.datosVehiculo.descripcion, disabled: true }, Validators.required],
    });

    // Incremento automático idDeVehiculoUnidad
    let nextUnidadId = 1;
    if (Array.isArray(this.unidadesTablaConfig.datos) && this.unidadesTablaConfig.datos.length > 0) {
      const maxUnidadId = Math.max(...this.unidadesTablaConfig.datos.map(u => Number(u.idDeVehiculoUnidad) || 0));
      nextUnidadId = maxUnidadId + 1;
    }
    this.unidadFormulario = this.fb.group({
      idDeVehiculoUnidad: [{ value: nextUnidadId, disabled: true }, [Validators.required]],
      vinVehiculo: [this.tramiteState.datosUnidad.vinVehiculo, [Validators.required]],
      tipoDeUnidadArrastre: [this.tramiteState.datosUnidad.tipoDeUnidadArrastre, [Validators.required]],
      numeroEconomico: [this.tramiteState.datosUnidad.numeroEconomico, [Validators.required]],
      numeroPlaca: [this.tramiteState.datosUnidad.numeroPlaca, [Validators.required]],
      paisEmisor: [this.tramiteState.datosUnidad.paisEmisor, [Validators.required]],
      estado: [this.tramiteState.datosUnidad.estado, [Validators.required]],
      colorVehiculo: [this.tramiteState.datosUnidad.colorVehiculo, [Validators.required]],
      numero2daPlaca: [this.tramiteState.datosUnidad.numero2daPlaca, [Validators.required]],
      estado2daPlaca: [this.tramiteState.datosUnidad.estado2daPlaca, [Validators.required]],
      paisEmisor2daPlaca: [this.tramiteState.datosUnidad.paisEmisor2daPlaca, [Validators.required]],
      descripcion: [{ value: this.tramiteState.datosUnidad.descripcion, disabled: true }, [Validators.required]],
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
  /**
   * Inicia la edición del primer vehículo seleccionado.
   */
  inicioEditarVehiculo(): void {
    if (!this.VehiculoSeleccionada || this.VehiculoSeleccionada.length === 0) return;
    const vehiculo = this.VehiculoSeleccionada[0];
    const index = this.vehiculosTablaConfig.datos.indexOf(vehiculo);
    if (index === -1) return;
    this.editIndex = index;
    this.vehiculoFormulario.patchValue(vehiculo);
    this.abiertoPedimento();
  }

  /**
   * Agrega o actualiza un vehículo en la tabla.
   */
  agregarVahiculodata(): void {
    if (this.vehiculoFormulario.valid) {
      const formValue = this.vehiculoFormulario.getRawValue();
      if (this.editIndex !== null) {
        Object.assign(this.vehiculosTablaConfig.datos[this.editIndex], formValue);
        this.vehiculosTablaConfig.datos = [...this.vehiculosTablaConfig.datos];
        this.editIndex = null;
      } else {
        this.vehiculosTablaConfig.datos = [
          ...this.vehiculosTablaConfig.datos,
          formValue,
        ];
      }
      // Incremento automático idDeVehiculo para la próxima entrada
      const maxId = Math.max(...this.vehiculosTablaConfig.datos.map(v => Number(v.idDeVehiculo) || 0));
      this.vehiculoFormulario.reset();
      this.vehiculoFormulario.get('idDeVehiculo')?.setValue(maxId + 1);
      this.vehiculoFormulario.get('idDeVehiculo')?.disable();
      this.cerrarModal.nativeElement.click();
    } else {
      this.vehiculoFormulario.markAllAsTouched();
    }
  }

  /**
   * Índice de edición para la tabla de unidades de arrastre.
   */
  editarIndiceUnitario: number | null = null;

  /**
   * Inicia la edición de la primera unidad de arrastre seleccionada.
   */
  inicioEditarUnidad(): void {
    if (!this.selectedUnidadRows || this.selectedUnidadRows.length === 0) return;
    const unidad = this.selectedUnidadRows[0];
    const index = this.unidadesTablaConfig.datos.indexOf(unidad);
    if (index === -1) return;
    this.editarIndiceUnitario = index;
    this.unidadFormulario.reset();
    this.unidadFormulario.patchValue(unidad);
    this.abiertoPedimentoUnidad();
  }

  /**
   * Agrega o actualiza una unidad de arrastre en la tabla.
   */
  agregarUnidadData(): void {
    if (this.unidadFormulario.valid) {
      const formValue = this.unidadFormulario.getRawValue();
      if (this.editarIndiceUnitario !== null) {
        Object.assign(this.unidadesTablaConfig.datos[this.editarIndiceUnitario], formValue);
        this.unidadesTablaConfig.datos = [...this.unidadesTablaConfig.datos];
        this.editarIndiceUnitario = null;
      } else {
        this.unidadesTablaConfig.datos = [
          ...this.unidadesTablaConfig.datos,
          formValue,
        ];
      }
      // Incremento automático idDeVehiculoUnidad para la próxima entrada
      const maxUnidadId = Math.max(...this.unidadesTablaConfig.datos.map(u => Number(u.idDeVehiculoUnidad) || 0));
      this.unidadFormulario.reset();
      this.unidadFormulario.get('idDeVehiculoUnidad')?.setValue(maxUnidadId + 1);
      this.unidadFormulario.get('idDeVehiculoUnidad')?.disable();
      this.cerrarUnidadModal.nativeElement.click();
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
   * Limpia el formulario de vehículo.
   */
  limpiarVahiculodata(): void {
    this.vehiculoFormulario.reset();
  }

  /**
   * Limpia el formulario de unidad de arrastre.
   */
  limpiarUnidaddata(): void {
    this.unidadFormulario.reset();
  }

  /**
   * Abre una notificación modal.
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
   */
  public cargarTipoDeVehiculo(): void {
    this.modificarTerrestreService
      .obtenerTipoDeVehiculo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoDeVehiculoCatalogo = datos.datos;
      });
  }
}