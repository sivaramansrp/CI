/**
 * Componente para la baja de vehículos en el trámite 40103.
 *
 * Permite seleccionar, eliminar y gestionar vehículos del parque vehicular.
 *
 * @module BajaVehiculoComponent
 */
import { VehiculoTabla, CatalogoLista } from '../../../../models/registro-muestras-mercancias.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { VEHICULOS_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion, ConsultaioQuery, ConsultaioState, Catalogo } from '@ng-mf/data-access-user';
import { Subject, takeUntil, map } from 'rxjs';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';

@Component({
  selector: 'app-baja-vehiculo',
  templateUrl: './baja-vehiculo.component.html',
  styleUrls: ['./baja-vehiculo.component.scss']
})
/**
 * Componente para gestionar la baja de vehículos.
 *
 * @class
 */
export class BajaVehiculoComponent implements OnInit, OnDestroy {
  /**
   * Catálogo de tipos de vehículo.
   * @type {any[]}
   */
  tipoDeVehiculoCatalogo: any[] = [];

  /**
   * Catálogo de países emisores.
   * @type {any[]}
   */
  paisEmisorCatalogo: any[] = [];

  /**
   * Catálogo de años.
   * @type {any[]}
   */
  anoCatalogo: any[] = [];

  /**
   * Catálogo de tipos de arrastre.
   * @type {any[]}
   */
  tipoArrastre: any[] = [];

  /**
   * Catálogo de colores de vehículos.
   * @type {Catalogo[]}
   */
  colorVehiculoCatalogo: Catalogo[] = [];

  /**
   * Lista de vehículos en el parque vehicular.
   * @type {VehiculoTabla[]}
   */
  vehiculosParque: VehiculoTabla[] = [];

  /**
   * Configuración de columnas para la tabla de vehículos.
   * @type {*}
   */
  columnasVehiculo = [
    {
      encabezado: 'ID',
      clave: (item: VehiculoTabla) => String(item.idDeVehiculo),
      orden: 0,
    },
    {
      encabezado: 'Número de identificación vehicular',
      clave: (item: VehiculoTabla) => item.numero,
      orden: 1,
    },
    {
      encabezado: 'Tipo de vehículo',
      clave: (item: VehiculoTabla) => this.obtenerDescripcionDeCatalogo(item.tipoDeVehiculo, this.tipoDeVehiculoCatalogo),
      orden: 2,
    },
    {
      encabezado: 'Número económico',
      clave: (item: VehiculoTabla) => item.numuroEconomico,
      orden: 3,
    },
    {
      encabezado: 'Transponder',
      clave: (item: VehiculoTabla) => item.transponder,
      orden: 4,
    },
    {
      encabezado: 'Número de Placas',
      clave: (item: VehiculoTabla) => item.numeroPlaca,
      orden: 5,
    },
    {
      encabezado: 'País Emisor',
      clave: (item: VehiculoTabla) => this.obtenerDescripcionDeCatalogo(item.paisEmisor, this.paisEmisorCatalogo),
      orden: 6,
    },
    {
      encabezado: 'Estado o provincia',
      clave: (item: VehiculoTabla) => item.estado,
      orden: 7,
    },
    {
      encabezado: 'Marca',
      clave: (item: VehiculoTabla) => item.marca,
      orden: 8,
    },
    {
      encabezado: 'Modelo',
      clave: (item: VehiculoTabla) => item.modelo,
      orden: 9,
    },
    {
      encabezado: 'Año',
      clave: (item: VehiculoTabla) => this.obtenerDescripcionDeCatalogo(item.ano, this.anoCatalogo),
      orden: 10,
    }
  ];

  /**
   * Tipo de selección de la tabla (radio, checkbox, etc).
   * @type {TablaSeleccion}
   */
  tipoSeleccionTabla = TablaSeleccion.RADIO;

  /**
   * Vehículos seleccionados en la tabla.
   * @type {VehiculoTabla[]}
   */
  vehiculosParqueSelected: VehiculoTabla[] = [];

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
   * Indica si se muestra el diálogo de vehículo.
   * @type {boolean}
   */
  showVehiculoDialog = false;

  /**
   * Datos para el diálogo de vehículo.
   * @type {VehiculoTabla | {}}
   */
  vehiculoDialogData: VehiculoTabla | {} = {};

  /**
   * Constructor del componente `BajaVehiculoComponent`.
   *
   * @constructor
   * @param {ConsultaioQuery} consultaioQuery - Servicio para consultar el estado de consulta y determinar el modo de solo lectura.
   * @param {modificarTerrestreService} modificarTerrestreService - Servicio para obtener catálogos.
   */
  constructor(
    private consultaioQuery: ConsultaioQuery,
    private modificarTerrestreService: modificarTerrestreService
  ) { }

  /**
   * Método de ciclo de vida de Angular que se llama cuando el componente se inicializa.
   */
  ngOnInit(): void {
    // Load all catalogs
    this.modificarTerrestreService.obtenerTipoDeVehiculo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoDeVehiculoCatalogo = datos.datos;
      });

    this.modificarTerrestreService.obtenerPaisEmisor()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.paisEmisorCatalogo = datos.datos;
      });

    this.modificarTerrestreService.obtenerAno()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.anoCatalogo = datos.datos;
      });

    this.modificarTerrestreService.obtenerColorVehiculo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.colorVehiculoCatalogo = datos.datos as Catalogo[];
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
   * Maneja la selección de filas en la tabla de vehículos.
   * @param {VehiculoTabla[]} event - Vehículos seleccionados.
   * @returns {void}
   */
  onVehiculoRowSelected(event: VehiculoTabla[]) {
    this.vehiculosParqueSelected = event || [];
  }

  /**
   * Elimina los vehículos seleccionados del parque vehicular.
   * @returns {void}
   */
  eliminarVehiculo() {
    if (this.vehiculosParqueSelected.length === 0) {
      return;
    }
    
    // Crear un Set con los IDs de los vehículos seleccionados para comparación eficiente
    const selectedNumbers = new Set(this.vehiculosParqueSelected.map(v => v.numero).filter(n => n));
    const selectedIds = new Set(this.vehiculosParqueSelected.map(v => v.idDeVehiculo).filter(id => id));
    
    // Filtrar los vehículos usando múltiples identificadores únicos
    this.vehiculosParque = this.vehiculosParque.filter(v => {
      // Primero intentar con número
      if (v.numero && selectedNumbers.has(v.numero)) return false;
      // Luego con ID de vehículo
      if (v.idDeVehiculo && selectedIds.has(v.idDeVehiculo)) return false;
      // Como último recurso, usar referencia de objeto
      return !this.vehiculosParqueSelected.includes(v);
    });
    
    this.vehiculosParqueSelected = [];
  }

  /**
   * Agrega un vehículo actualizado desde el diálogo y lo selecciona.
   * @param {VehiculoTabla} updatedVehiculo - Vehículo actualizado.
   * @returns {void}
   */
  onVehiculoDialogSave(updatedVehiculo: VehiculoTabla) {
    // Crear una copia mutable del array antes de agregar
    const vehiculosMutables = [...this.vehiculosParque];
    vehiculosMutables.push(updatedVehiculo);
    this.vehiculosParque = vehiculosMutables;
    this.vehiculosParqueSelected = [this.vehiculosParque[this.vehiculosParque.length - 1]];
    this.showVehiculoDialog = false;
  }

  /**
   * Elimina la fila de vehículo seleccionada.
   * @returns {void}
   */
  deleteVehiculoRow() {
    this.eliminarVehiculo();
  }

  /**
   * Abre el modal para agregar datos de vehículos mediante búsqueda.
   * Inicializa el diálogo para permitir al usuario buscar y agregar vehículos al parque vehicular.
   * 
   * @returns {void}
   */
  agregarModal(): void {
    this.vehiculoDialogData = {};
    this.showVehiculoDialog = true;
  }

  /**
   * Busca la descripción en un catálogo por su clave.
   * @param {string} clave - Clave a buscar en el catálogo.
   * @param {any[]} catalogo - Array del catálogo donde buscar.
   * @returns {string} La descripción encontrada o la clave original si no se encuentra.
   */
  private obtenerDescripcionDeCatalogo(clave: string, catalogo: any[]): string {
    if (!clave || !catalogo || catalogo.length === 0) {
      return clave || '';
    }
    const item = catalogo.find(c => c.clave === clave || c.descripcion === clave);
    return item ? item.descripcion : clave;
  }
}
