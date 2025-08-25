import { ANEXO_II_SERVICIO, ANEXO_IMPORTACION_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { Component, Input } from '@angular/core';
import { ANEXO_I_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { ActivatedRoute } from '@angular/router';
import { AnexoDosEncabezado, DatosComplimento } from '../../../../shared/models/nuevo-programa-industrial.model';
import { AnexoUnoComponent } from '../../../../shared/components/anexo-uno/anexo-uno.component';
import { AnexoUnoEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RutaNombre } from '../../../../shared/models/nuevo-programa-industrial.model';
import { Subject } from 'rxjs';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { takeUntil } from 'rxjs';

import { ComplementarFraccionVistaComponent } from '../complementar-fraccion-vista/complementar-fraccion-vista.component';
import { ContenedorProveedorClienteComponent } from '../contenedor-proveedor-cliente/contenedor-proveedor-cliente.component';
import { ProveedorPorArchivoVistaComponent } from '../proveedor-por-archivo-vista/proveedor-por-archivo-vista.component';
import { ProyectoImmexVistaComponent } from '../proyecto-immex-vista/proyecto-immex-vista.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Método que se ejecuta al inicializar el componente.
 * Suscribe a los observables para importar y exportar datos de tablas,
 * y actualiza las listas correspondientes con los datos obtenidos.
 * 
 * Este método realiza las siguientes acciones:
 * - Suscribe al observable `selectImportarTablsDatos$` para obtener los datos de la tabla de importación.
 * - Actualiza la lista `anexoUnoTablaLista` con los datos obtenidos si existen.
 * - Suscribe al observable `selectExportarTablsDatos$` para obtener los datos de la tabla de exportación.
 * - Actualiza la lista `anexoDosTablaLista` con los datos obtenidos si existen.
 * 
 * Utiliza el operador `takeUntil` para garantizar que las suscripciones se cancelen cuando el componente sea destruido.
 * 
 * @method ngOnInit
 * @returns {void}
 */
 
/**
 * Método para obtener la devolución de llamada del anexo Uno.
 * Actualiza la lista de encabezados del anexo Uno con los datos proporcionados
 * y los almacena en el store para su uso posterior.
 * 
 * @param {AnexoUnoEncabezado[]} event - Evento que contiene la lista de encabezados del anexo Uno.
 * Si el evento es nulo o indefinido, se asigna una lista vacía.
 * 
 * @returns {void}
 */
 
/**
 * Método para obtener la devolución de llamada del anexo Dos.
 * Actualiza la lista de encabezados del anexo Dos con los datos proporcionados
 * y los almacena en el store para su uso posterior.
 * 
 * @param {AnexoDosEncabezado[]} event - Evento que contiene la lista de encabezados del anexo Dos.
 * Si el evento es nulo o indefinido, se asigna una lista vacía.
 * 
 * @returns {void}
 */
 
/**
 * Navega a una ruta específica basada en el evento proporcionado.
 * 
 * Este método realiza las siguientes acciones:
 * - Establece la sección activa en el store utilizando el `id` del evento.
 * - Configura los datos necesarios para la navegación en el store.
 * - Navega a la ruta relativa basada en la categoría proporcionada.
 * 
 * @param {RutaNombre} event - Objeto que contiene la información necesaria para la navegación.
 *   - `catagoria`: Categoría de la ruta a la que se desea navegar.
 *   - `id`: Identificador único que se utiliza para establecer la sección activa.
 *   - `datos`: Datos adicionales necesarios para la navegación.
 * 
 * @returns {void}
 */
 
/**
 * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
 * Limpia las suscripciones activas y actualiza los BehaviorSubject para ocultar las tablas.
 * 
 * Este método realiza las siguientes acciones:
 * - Emite un valor en el `destroyNotifier$` para cancelar las suscripciones activas.
 * - Completa el `destroyNotifier$` para liberar recursos.
 * 
 * @method ngOnDestroy
 * @returns {void}
 */
@Component({
  selector: 'app-anexo-vista-uno',
  standalone: true,
  imports: [CommonModule, AnexoUnoComponent, ComplementarFraccionVistaComponent,ContenedorProveedorClienteComponent,ProyectoImmexVistaComponent,ProveedorPorArchivoVistaComponent],
  templateUrl: './anexo-vista-uno.component.html',
  styleUrl: './anexo-vista-uno.component.scss',
})
export class AnexoVistaUnoComponent implements OnInit, OnDestroy {


  /**
   * Configuración para el componente "Anexo Vista Uno".
   * 
   * Esta propiedad define los parámetros utilizados para configurar la tabla
   * y el encabezado en el componente. Los valores especificados son utilizados
   * para determinar el tipo de selección en la tabla y el encabezado que se muestra.
   * 
   * Propiedades:
   * - `anexoUnoTablaSeleccionRadio`: Define el tipo de selección en la tabla como RADIO.
   *   Utiliza la constante `TablaSeleccion.RADIO` para especificar este comportamiento.
   * - `anexoUnoEncabezadoDeTabla`: Especifica el encabezado de la tabla utilizando la constante
   *   `ANEXO_I_SERVICIO`, que representa el texto o configuración del encabezado.
   * 
   * Uso:
   * Esta configuración es utilizada para personalizar la funcionalidad y apariencia
   * del componente "Anexo Vista Uno", asegurando que cumpla con los requisitos específicos
   * del módulo de trámites.
   */
  public anexoUnoConfig = {
    anexoUnoTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoUnoEncabezadoDeTabla: ANEXO_I_SERVICIO,
  };

  /**
   * Configuración para el componente "Anexo Vista Uno".
   * 
   * Esta propiedad define los parámetros utilizados para configurar la tabla
   * y el encabezado en el componente. Los valores especificados son utilizados
   * para determinar el tipo de selección en la tabla y el encabezado que se muestra.
   * 
   * Propiedades:
   * - `anexoUnoTablaSeleccionRadio`: Define el tipo de selección en la tabla como RADIO.
   *   Utiliza la constante `TablaSeleccion.RADIO` para especificar este comportamiento.
   * - `anexoUnoEncabezadoDeTabla`: Especifica el encabezado de la tabla utilizando la constante
   *   `ANEXO_I_SERVICIO`, que representa el texto o configuración del encabezado.
   * 
   * Uso:
   * Esta configuración es utilizada para personalizar la funcionalidad y apariencia
   * del componente "Anexo Vista Uno", asegurando que cumpla con los requisitos específicos
   * del módulo de trámites.
   */
  public anexoDosConfig = {
    anexoDosTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoDosEncabezadoDeTabla: ANEXO_II_SERVICIO,
  };

  /**
   * Configuración para la importación de anexos en el componente.
   * 
   * Esta propiedad define los parámetros utilizados para la configuración
   * de la tabla de selección y el encabezado de la tabla en el contexto
   * de la importación de anexos.
   * 
   * Propiedades:
   * - `anexoDosTablaSeleccionRadio`: Define el tipo de selección en la tabla,
   *   utilizando la enumeración `TablaSeleccion.RADIO` para habilitar la selección
   *   por radio botón.
   * - `anexoDosEncabezadoDeTabla`: Especifica el encabezado de la tabla para la
   *   importación de anexos, utilizando la constante `ANEXO_IMPORTACION_SERVICIO`.
   * 
   * Uso:
   * Esta configuración es utilizada para personalizar el comportamiento y la
   * presentación de la tabla de selección en el proceso de importación de anexos.
   */
  public anexoImportacionConfig = {
    anexoDosTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoDosEncabezadoDeTabla: ANEXO_IMPORTACION_SERVICIO,
  };

  /**
   * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado.Add commentMore actions
   */
  @Input() formularioDeshabilitado: boolean = false;
  /**
   * Lista de encabezados del anexo Uno.
   * @type {AnexoEncabezado[]}
   */
  public anexoUnoTablaLista: AnexoUnoEncabezado[] = [];

  /**
   * Lista de encabezados del anexo dos.
   * @type {AnexoEncabezado[]}
   */
  public anexoDosTablaLista: AnexoDosEncabezado[] = [];

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Bandera utilizada para controlar la visibilidad del popup de "Complementar Fracción".
   * Se establece en `true` para mostrar el popup y en `false` para ocultarlo.
   *
   * @property {boolean} mostrarComplementarFraccionPopup
   */
  public mostrarComplementarFraccionPopup: boolean = false;

   /**
   * Bandera utilizada para controlar la visibilidad del popup de "Proveedor/Cliente".
   * Se establece en `true` para mostrar el popup y en `false` para ocultarlo.
   *
   * @property {boolean} mostrarProveedorClientePopup
   */
  public mostrarProveedorClientePopup: boolean = false;

  /**
   * Bandera utilizada para controlar la visibilidad del popup de "Proyecto Immex".
   * Se establece en `true` para mostrar el popup y en `false` para ocultarlo.
   *
   * @property {boolean} mostrarProyectoImmexPopup
   */
  public mostrarProyectoImmexPopup: boolean = false;

  /**
   * Bandera utilizada para controlar la visibilidad del popup de "Proveedor por Archivo".
   * Se establece en `true` para mostrar el popup y en `false` para ocultarlo.
   *
   * @property {boolean} mostrarProveedorPorArchivoPopup
   */
  public mostrarProveedorPorArchivoPopup: boolean = false;

   datosAnexoUno!: DatosComplimento;
   
 public anexoUnoFormGroup!: FormGroup;

  /**
   * Constructor del componente AnexoVistaUnoComponent.
   * @param {Router} router - Servicio de enrutamiento de Angular para navegar entre rutas.
   * @param {ActivatedRoute} activatedRoute - Servicio que proporciona información sobre la ruta activa.
   * @param {Tramite80101Store} store - Store para manejar el estado del trámite 80101.
   * @param {Tramite80101Query} query - Query para obtener datos del estado del trámite 80101.
   */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Tramite80101Store,
    private query: Tramite80101Query,
    private fb: FormBuilder,
  ) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * En este método, se configuran dos suscripciones a observables para manejar datos 
   * relacionados con tablas de importación y exportación. Estas suscripciones se 
   * cancelan automáticamente cuando el componente se destruye, utilizando el operador 
   * `takeUntil` con el observable `destroyNotifier$`.
   * 
   * - La primera suscripción escucha el observable `selectImportarTablsDatos$` y, si 
   *   contiene datos, los asigna a la propiedad `anexoUnoTablaLista`.
   * - La segunda suscripción escucha el observable `selectExportarTablsDatos$` y, si 
   *   contiene datos, los asigna a la propiedad `anexoDosTablaLista`.
   * 
   * Este método asegura que los datos necesarios para las tablas de anexos se carguen 
   * correctamente al inicializar el componente.
   */
  ngOnInit(): void {
    this.query.selectImportarTablsDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((importarTablsDatos) => {
        if (importarTablsDatos.length > 0) {
          this.anexoUnoTablaLista = importarTablsDatos;
        }
      });

    this.query.selectExportarTablsDatos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((exportarTablsDatos) => {
        if (exportarTablsDatos.length > 0) {
          this.anexoDosTablaLista = exportarTablsDatos;
        }
      });
      this.inicializarFormularioDatosSubcontratista();
     this.obtenerDatosDelAlmacen();
  }


/**
   * Obtiene los datos del almacén y los asigna al formulario de información de registro.
   * Se suscribe al observable `infoRegisterEstado$` para obtener los datos, y cuando se reciben,
   * se actualiza la propiedad `infoRegistro` y se establece el valor del formulario `formularioInfoRegistro`.
   *
   * @method obtenerDatosDelAlmacen
   */
  obtenerDatosDelAlmacen(): void {
    this.query.selectDatosComplimentos$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datosComplimentos) => {
        console.log('dssd', datosComplimentos);
        this.anexoUnoFormGroup.setValue(datosComplimentos);
      });
    }

  /**
   * Método para obtener la devolución de llamada del anexo Uno.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo Uno.
   * @returns {void}
   */
  public obtenerAnexoUnoDevolverLaLlamada(event: AnexoUnoEncabezado[]): void {
    this.anexoUnoTablaLista = event ? event : [];
    this.store.setImportarDatosTabla(this.anexoUnoTablaLista);
  }
  /**
   * Método para obtener la devolución de llamada del anexo Dos.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo Dos.
   * @returns {void}
   */
  public obtenerAnexoDosDevolverLaLlamada(event: AnexoDosEncabezado[]): void {
    this.anexoDosTablaLista = event ? event : [];
    this.store.setExportarDatosTabla(this.anexoDosTablaLista);
  }


/**
   * Inicializa el formulario de datos del subcontratista con los datos obtenidos o con valores vacíos si no hay datos disponibles.
   * @method inicializarFormularioDatosSubcontratista
   */
  inicializarFormularioDatosSubcontratista(): void {
    this.anexoUnoFormGroup = this.fb.group({
     fraccionArancelaria: ['', [Validators.required, Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

/**
   * Modifica los datos de los cumplimientos y los almacena en el estado.
   *
   * @param complimentos - Objeto de tipo `DatosComplimentos` que contiene los datos de los cumplimientos a actualizar.
   * @returns void
   */
  modifierComplimentos(complimentos: DatosComplimento): void {
    console.log('complimentos', complimentos);
    this.store.setDatosComplimento(complimentos);
  }


  /**
   * Navega a una ruta específica basada en el evento proporcionado.
   *
   * @param event - Objeto de tipo `RutaNombre` que contiene la información necesaria para la navegación.
   *   - `catagoria`: Categoría de la ruta a la que se desea navegar.
   *   - `id`: Identificador único que se utiliza para establecer la sección activa.
   *   - `datos`: Datos adicionales necesarios para la navegación.
   *
   * Este método realiza las siguientes acciones:
   * 1. Establece la sección activa en el store utilizando el `id` del evento.
   * 2. Configura los datos necesarios para la navegación en el store.
   * 3. Navega a la ruta relativa basada en la categoría proporcionada.
   */
  public rutaLaFraccionDeComplemento(event: RutaNombre): void {
    if (event && event.catagoria && event.id && event.datos) {
      this.store.setAnnexoUnoSeccionActiva(event.id);
      this.store.setDatosParaNavegar(event.datos);

      if (event.catagoria === 'complementar-fraccion') {
        this.mostrarComplementarFraccionPopup = true;
      } else if (event.catagoria === 'contenedor-proveedor-cliente') {
        this.mostrarProveedorClientePopup = true;
      } else if (event.catagoria === 'proyecto-immex') {
        this.mostrarProyectoImmexPopup = true;
      } else if (event.catagoria === 'proveedor-por-archivo') {
        this.mostrarProveedorPorArchivoPopup = true;
      }
    }
  }

  /** Cierra el popup de "Complementar Fracción". Establece mostrarComplementarFraccionPopup en false. */
  cerrarComplementarFraccion(): void {
    this.mostrarComplementarFraccionPopup = false;
  }

  /** Cierra el popup de "Proveedor/Cliente". Establece mostrarProveedorClientePopup en false. */
   cerrarContenedorProveedorCliente(): void {
    this.mostrarProveedorClientePopup = false;
  }

  /** Cierra el popup de "Proyecto IMMEX". Establece mostrarProyectoImmexPopup en false. */
   cerrarProyectoImmex(): void {
    this.mostrarProyectoImmexPopup = false;
  }

  /** Cierra el popup de "Proveedor por Archivo". Establece mostrarProveedorPorArchivoPopup en false. */
   cerrarProveedorPorArchivo(): void {
    this.mostrarProveedorPorArchivoPopup = false;
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
