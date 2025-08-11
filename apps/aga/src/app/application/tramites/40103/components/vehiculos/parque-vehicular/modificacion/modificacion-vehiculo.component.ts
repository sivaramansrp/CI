/**
 * Componente para la modificación de vehículos en el trámite 40103.
 *
 * Permite agregar, modificar y eliminar vehículos del parque vehicular.
 *
 * @module ModificacionVehiculoComponent
 */
import { VehiculoTabla, CatalogoLista } from '../../../../models/registro-muestras-mercancias.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { VEHICULOS_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion, ConsultaioQuery, ConsultaioState, Catalogo } from '@ng-mf/data-access-user';
import { Subject, takeUntil, map } from 'rxjs';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';

@Component({
  selector: 'app-modificacion-vehiculo',
  templateUrl: './modificacion-vehiculo.component.html',
  styleUrls: ['./modificacion-vehiculo.component.scss']
})
/**
 * Componente para gestionar la modificación de vehículos.
 *
 * @class
 */
export class ModificacionVehiculoComponent implements OnInit, OnDestroy {
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
   * Indica si se muestra la alerta informativa.
   * @type {boolean}
   */
  showInfoAlert = true;

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
   * Índice del vehículo seleccionado en la tabla.
   * @type {number | null}
   */
  selectedVehiculoIndex: number | null = null;

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
   * Constructor del componente `ModificacionVehiculoComponent`.
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
   * @param {any} event - Evento de selección de la tabla.
   * @returns {void}
   */
  onVehiculoRowSelected(event: any) {
    if (event && event.length > 0) {
      const selectedVehiculo = event[0];
      // Buscar el índice usando múltiples identificadores únicos para mayor robustez
      this.selectedVehiculoIndex = this.vehiculosParque.findIndex(v => 
        (selectedVehiculo.numero && v.numero === selectedVehiculo.numero) ||
        (selectedVehiculo.idDeVehiculo && v.idDeVehiculo === selectedVehiculo.idDeVehiculo) ||
        (selectedVehiculo.numeroPlaca && v.numeroPlaca === selectedVehiculo.numeroPlaca && 
         selectedVehiculo.marca && v.marca === selectedVehiculo.marca)
      );
      
      // Si no se encuentra por los identificadores únicos, usar la referencia como fallback
      if (this.selectedVehiculoIndex === -1) {
        this.selectedVehiculoIndex = this.vehiculosParque.indexOf(selectedVehiculo);
      }
    } else {
      this.selectedVehiculoIndex = null;
    }
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
    this.selectedVehiculoIndex = this.vehiculosParque.length - 1;
    this.showVehiculoDialog = false;
  }

  /**
   * Elimina la fila de vehículo seleccionada.
   * @returns {void}
   */
  deleteVehiculoRow() {
    if (this.selectedVehiculoIndex !== null && this.selectedVehiculoIndex >= 0) {
      // Obtener el vehículo a eliminar
      const vehiculoAEliminar = this.vehiculosParque[this.selectedVehiculoIndex];
      
      if (vehiculoAEliminar) {
        // Crear conjuntos de identificadores únicos para filtrado eficiente
        const numerosAEliminar = new Set([vehiculoAEliminar.numero].filter(Boolean));
        const idsAEliminar = new Set([vehiculoAEliminar.idDeVehiculo].filter(Boolean));
        const placasMarcasAEliminar = new Set();
        
        // Crear identificador compuesto para placa+marca si ambos existen
        if (vehiculoAEliminar.numeroPlaca && vehiculoAEliminar.marca) {
          placasMarcasAEliminar.add(`${vehiculoAEliminar.numeroPlaca}|${vehiculoAEliminar.marca}`);
        }
        
        // Filtrar usando múltiples capas de identificación
        this.vehiculosParque = this.vehiculosParque.filter(vehiculo => {
          // Primera capa: filtrar por número (VIN)
          if (vehiculo.numero && numerosAEliminar.has(vehiculo.numero)) {
            return false;
          }
          
          // Segunda capa: filtrar por ID
          if (vehiculo.idDeVehiculo && idsAEliminar.has(vehiculo.idDeVehiculo)) {
            return false;
          }
          
          // Tercera capa: filtrar por combinación placa+marca
          if (vehiculo.numeroPlaca && vehiculo.marca) {
            const comboId = `${vehiculo.numeroPlaca}|${vehiculo.marca}`;
            if (placasMarcasAEliminar.has(comboId)) {
              return false;
            }
          }
          
          // Cuarta capa: comparación de referencia de objeto como fallback
          return vehiculo !== vehiculoAEliminar;
        });
      }
      
      this.selectedVehiculoIndex = null;
    }
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
