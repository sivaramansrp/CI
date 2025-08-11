/**
 * Componente para la modificación de unidades de arrastre en el trámite 40103.
 *
 * Permite agregar, modificar y eliminar unidades de arrastre.
 *
 * @module ModificacionUnidadComponent
 */
import { UnidadTabla, CatalogoLista } from '../../../../models/registro-muestras-mercancias.model';
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UNIDAD_TABLA_CONFIG } from '../../../../enum/transportista-terrestre.enum';
import { TablaSeleccion, ConsultaioQuery, ConsultaioState, Catalogo } from '@ng-mf/data-access-user';
import { Subject, takeUntil, map } from 'rxjs';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';

@Component({
  selector: 'app-modificacion-unidad',
  templateUrl: './modificacion-unidad.component.html',
  styleUrls: ['./modificacion-unidad.component.scss']
})
/**
 * Componente para gestionar la modificación de unidades de arrastre.
 *
 * @class
 */
export class ModificacionUnidadComponent implements OnInit, OnDestroy {
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
   * Indica si se muestra la alerta informativa.
   * @type {boolean}
   */
  showInfoAlert = true;

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
   * Índice de la unidad seleccionada en la tabla.
   * @type {number | null}
   */
  selectedUnidadIndex: number | null = null;

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
   * Constructor del componente `ModificacionUnidadComponent`.
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
   * Maneja la selección de filas en la tabla de unidades de arrastre.
   * @param {any} event - Evento de selección de la tabla.
   * @returns {void}
   */
  onUnidadRowSelected(event: any) {
    if (event && event.length > 0) {
      const selectedUnidad = event[0];
      // Buscar el índice usando múltiples identificadores únicos para mayor robustez
      this.selectedUnidadIndex = this.unidadesArrastre.findIndex(u => 
        (selectedUnidad.vinVehiculo && u.vinVehiculo === selectedUnidad.vinVehiculo) ||
        (selectedUnidad.idDeVehiculo && u.idDeVehiculo === selectedUnidad.idDeVehiculo) ||
        (selectedUnidad.numeroPlaca && u.numeroPlaca === selectedUnidad.numeroPlaca && 
         selectedUnidad.numeroEconomico && u.numeroEconomico === selectedUnidad.numeroEconomico)
      );
      
      // Si no se encuentra por los identificadores únicos, usar la referencia como fallback
      if (this.selectedUnidadIndex === -1) {
        this.selectedUnidadIndex = this.unidadesArrastre.indexOf(selectedUnidad);
      }
    } else {
      this.selectedUnidadIndex = null;
    }
  }

  /**
   * Agrega una unidad actualizada desde el diálogo y la selecciona.
   * @param {UnidadTabla} updatedUnidad - Unidad actualizada.
   * @returns {void}
   */
  alGuardarDialogoUnidad(updatedUnidad: UnidadTabla) {
    // Crear una copia mutable del array antes de agregar
    const unidadesMutables = [...this.unidadesArrastre];
    unidadesMutables.push(updatedUnidad);
    this.unidadesArrastre = unidadesMutables;
    this.selectedUnidadIndex = this.unidadesArrastre.length - 1;
    this.mostrarDialogoUnidad = false;
    // Forzar detección de cambios para asegurar que el modal se cierre
    this.cdr.detectChanges();
  }

  /**
   * Elimina la fila de unidad seleccionada.
   * @returns {void}
   */
  deleteUnidadRow() {
    if (this.selectedUnidadIndex !== null && this.selectedUnidadIndex >= 0) {
      // Obtener la unidad a eliminar
      const unidadAEliminar = this.unidadesArrastre[this.selectedUnidadIndex];
      
      if (unidadAEliminar) {
        // Crear conjuntos de identificadores únicos para filtrado eficiente
        const vinsAEliminar = new Set([unidadAEliminar.vinVehiculo].filter(Boolean));
        const idsAEliminar = new Set([unidadAEliminar.idDeVehiculo].filter(Boolean));
        const placasEconomicosAEliminar = new Set();
        
        // Crear identificador compuesto para placa+numeroEconomico si ambos existen
        if (unidadAEliminar.numeroPlaca && unidadAEliminar.numeroEconomico) {
          placasEconomicosAEliminar.add(`${unidadAEliminar.numeroPlaca}|${unidadAEliminar.numeroEconomico}`);
        }
        
        // Filtrar usando múltiples capas de identificación
        this.unidadesArrastre = this.unidadesArrastre.filter(unidad => {
          // Primera capa: filtrar por VIN
          if (unidad.vinVehiculo && vinsAEliminar.has(unidad.vinVehiculo)) {
            return false;
          }
          
          // Segunda capa: filtrar por ID
          if (unidad.idDeVehiculo && idsAEliminar.has(unidad.idDeVehiculo)) {
            return false;
          }
          
          // Tercera capa: filtrar por combinación placa+numeroEconomico
          if (unidad.numeroPlaca && unidad.numeroEconomico) {
            const comboId = `${unidad.numeroPlaca}|${unidad.numeroEconomico}`;
            if (placasEconomicosAEliminar.has(comboId)) {
              return false;
            }
          }
          
          // Cuarta capa: comparación de referencia de objeto como fallback
          return unidad !== unidadAEliminar;
        });
      }
      
      this.selectedUnidadIndex = null;
    }
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
