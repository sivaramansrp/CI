/**
 * Componente para la baja de unidades de arrastre en el trámite 40103.
 *
 * Permite seleccionar, eliminar y gestionar unidades de arrastre.
 *
 * @module BajaUnidadComponent
 */
import { UnidadTabla, CatalogoLista } from '../../../../models/registro-muestras-mercancias.model';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UNIDAD_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion, ConsultaioQuery, ConsultaioState, Catalogo } from '@ng-mf/data-access-user';
import { Subject, takeUntil, map } from 'rxjs';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';

@Component({
  selector: 'app-baja-unidad',
  templateUrl: './baja-unidad.component.html',
  styleUrls: ['./baja-unidad.component.scss']
})
/**
 * Componente para gestionar la baja de unidades de arrastre.
 *
 * @class
 */
export class BajaUnidadComponent implements OnInit, OnDestroy {
  /**
   * Catálogo de tipos de unidad de arrastre.
   * @type {Catalogo[]}
   */
  tipoDeUnidadCatalogo: Catalogo[] = [];

  /**
   * Catálogo de países emisores.
   * @type {Catalogo[]}
   */
  paisEmisorCatalogo: Catalogo[] = [];

  /**
   * Catálogo de años.
   * @type {Catalogo[]}
   */
  anoCatalogo: Catalogo[] = [];

  /**
   * Catálogo de tipos de arrastre.
   * @type {Catalogo[]}
   */
  tipoArrastre: Catalogo[] = [];

  /**
   * Lista de unidades de arrastre.
   * @type {UnidadTabla[]}
   */
  unidadesArrastre: UnidadTabla[] = [];

  /**
   * Configuración de columnas para la tabla de unidades.
   * @type {*}
   */
  columnasUnidad = [
    {
      encabezado: 'ID',
      clave: (item: UnidadTabla) => String(item.idDeVehiculo),
      orden: 0,
    },
    {
      encabezado: 'VIN/Número de identificación',
      clave: (item: UnidadTabla) => item.vinVehiculo,
      orden: 1,
    },
    {
      encabezado: 'Tipo de unidad de arrastre',
      clave: (item: UnidadTabla) => this.obtenerDescripcionDeCatalogo(item.tipoDeUnidadArrastre, this.tipoDeUnidadCatalogo),
      orden: 2,
    },
    {
      encabezado: 'Número económico',
      clave: (item: UnidadTabla) => item.numeroEconomico,
      orden: 3,
    },
    {
      encabezado: 'Número de Placas',
      clave: (item: UnidadTabla) => item.numeroPlaca,
      orden: 4,
    },
    {
      encabezado: 'País Emisor',
      clave: (item: UnidadTabla) => this.obtenerDescripcionDeCatalogo(item.paisEmisor, this.paisEmisorCatalogo),
      orden: 5,
    },
    {
      encabezado: 'Estado o provincia',
      clave: (item: UnidadTabla) => item.estado,
      orden: 6,
    }
  ];

  /**
   * Tipo de selección de la tabla (radio, checkbox, etc).
   * @type {TablaSeleccion}
   */
  tipoSeleccionTabla = TablaSeleccion.RADIO;

  /**
   * Unidades de arrastre seleccionadas en la tabla.
   * @type {UnidadTabla[]}
   */
  unidadesArrastreSelected: UnidadTabla[] = [];

  /**
   * Indica si la vista es de solo lectura.
   * @type {boolean}
   */
  esSoloLectura: boolean = false;

  /**
   * @property {Subject<void>}
   * Sujeto para destruir las suscripciones.
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {ConsultaioState}
   * Almacena el estado de consulta actual.
   */
  datosConsulta!: ConsultaioState;

  /**
   * Indica si se muestra el diálogo de unidad.
   * @type {boolean}
   */
  mostrarDialogoUnidad = false;

  /**
   * Datos para el diálogo de unidad.
   * @type {UnidadTabla | {}}
   */
  datosDialogoUnidad: UnidadTabla | {} = {};

  /**
   * Constructor del componente `BajaUnidadComponent`.
   *
   * @constructor
   * @param {ConsultaioQuery} consultaioQuery - Servicio para consultar el estado de consulta y determinar el modo de solo lectura.
   * @param {modificarTerrestreService} modificarTerrestreService - Servicio para obtener catálogos.
   */
  constructor(
    private consultaioQuery: ConsultaioQuery,
    private modificarTerrestreService: modificarTerrestreService,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * Método de ciclo de vida de Angular que se llama cuando el componente se inicializa.
   */
  ngOnInit(): void {
    // Cargar todos los catálogos
    this.modificarTerrestreService.obtenerTipoArrastre()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoDeUnidadCatalogo = datos.datos as Catalogo[];
      });

    this.modificarTerrestreService.obtenerPaisEmisor()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.paisEmisorCatalogo = datos.datos as Catalogo[];
      });

    this.modificarTerrestreService.obtenerAno()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.anoCatalogo = datos.datos as Catalogo[];
      });

    /**
     * Suscribe al estado de consulta para determinar si el formulario debe estar en modo solo lectura.
     * Si el estado indica `readonly`, actualiza las propiedades `datosConsulta` e `esSoloLectura` del componente.
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
            this.esSoloLectura = this.datosConsulta.readonly;
          }
        })
      ).subscribe();
  }

  /**
   * Método de ciclo de vida de Angular que se llama cuando el componente se destruye.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Maneja la selección de filas en la tabla de unidades de arrastre.
   * @param {UnidadTabla[]} event - Unidades seleccionadas.
   * @returns {void}
   */
  onUnidadRowSelected(event: UnidadTabla[]) {
    this.unidadesArrastreSelected = event || [];
  }

  /**
   * Elimina las unidades seleccionadas del listado.
   * @returns {void}
   */
  eliminarUnidad() {
    if (this.unidadesArrastreSelected.length === 0) {
      return;
    }
    
    // Crear Sets con los identificadores únicos de las unidades seleccionadas
    const selectedVins = new Set(this.unidadesArrastreSelected.map(u => u.vinVehiculo).filter(vin => vin));
    const selectedIds = new Set(this.unidadesArrastreSelected.map(u => u.idDeVehiculo).filter(id => id));
    
    // Filtrar las unidades usando múltiples identificadores únicos
    this.unidadesArrastre = this.unidadesArrastre.filter(u => {
      // Primero intentar con VIN
      if (u.vinVehiculo && selectedVins.has(u.vinVehiculo)) return false;
      // Luego con ID de vehículo
      if (u.idDeVehiculo && selectedIds.has(u.idDeVehiculo)) return false;
      // Como último recurso, usar referencia de objeto
      return !this.unidadesArrastreSelected.includes(u);
    });
    
    this.unidadesArrastreSelected = [];
  }

  /**
   * Agrega una unidad actualizada desde el diálogo y la selecciona.
   * @param {UnidadTabla} updatedUnidad - Unidad actualizada.
   * @returns {void}
   */
  alGuardarDialogoUnidad(updatedUnidad: UnidadTabla) {
    console.log('BajaUnidad - Recibido evento guardar:', updatedUnidad);
    // Crear una copia mutable del array antes de agregar
    const unidadesMutables = [...this.unidadesArrastre];
    unidadesMutables.push(updatedUnidad);
    this.unidadesArrastre = unidadesMutables;
    this.unidadesArrastreSelected = [this.unidadesArrastre[this.unidadesArrastre.length - 1]];
    console.log('BajaUnidad - Cerrando modal: mostrarDialogoUnidad = false');
    this.mostrarDialogoUnidad = false;
    // Forzar detección de cambios para asegurar que el modal se cierre
    this.cdr.detectChanges();
  }

  /**
   * Elimina la fila de unidad seleccionada.
   * @returns {void}
   */
  eliminarUnidadRow() {
    this.eliminarUnidad();
  }

  /**
   * Abre el modal para agregar datos de unidades de arrastre mediante búsqueda.
   * Inicializa el diálogo para permitir al usuario buscar y agregar unidades al listado.
   * 
   * @returns {void}
   */
  agregarModal(): void {
    this.datosDialogoUnidad = {};
    this.mostrarDialogoUnidad = true;
  }

  /**
   * Busca la descripción en un catálogo por su clave.
   * @param {string} clave - Clave a buscar en el catálogo.
   * @param {Catalogo[]} catalogo - Array del catálogo donde buscar.
   * @returns {string} La descripción encontrada o la clave original si no se encuentra.
   */
  private obtenerDescripcionDeCatalogo(clave: string, catalogo: Catalogo[]): string {
    if (!clave || !catalogo || catalogo.length === 0) {
      return clave || '';
    }
    const item = catalogo.find(c => c.id === Number(clave) || c.descripcion === clave);
    return item ? item.descripcion : clave;
  }
}
