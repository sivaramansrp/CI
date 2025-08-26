/**
 * Componente para la modificación de unidades de arrastre en el trámite 40103.
 *
 * Permite agregar, modificar y eliminar unidades de arrastre.
 *
 * @module ModificacionUnidadComponent
 */
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';

import { Catalogo, ConsultaioQuery, ConsultaioState, TablaSeleccion } from '@ng-mf/data-access-user';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

import { CatalogoLista, DatosUnidad, UnidadTabla } from '../../../../models/registro-muestras-mercancias.model';
import { modificarTerrestreService } from '../../../services/modificacar-terrestre.service';
import { obtenerColumnasUnidad } from '../../../../enum/unidad-de-arrastre.enum';

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
   * Getter que convierte UnidadTabla[] a DatosUnidad[] para el componente de diálogo.
   * @returns {DatosUnidad[]}
   */
  get unidadesArrastreDatos(): DatosUnidad[] {
    return this.unidadesArrastre.map(unidad => ({ 
      ...unidad,
      colorVehiculo: '',
      numero2daPlaca: '',
      estado2daPlaca: '',
      paisEmisor2daPlaca: '',
      descripcion: ''
    }));
  }

  /**
   * Configuración de columnas para la tabla de unidades.
   * Se genera dinámicamente usando los catálogos cargados.
   * @returns {ConfiguracionColumna<UnidadTabla>[]}
   */
  get columnasUnidad(): ConfiguracionColumna<UnidadTabla>[] {
    return obtenerColumnasUnidad(this.tipoDeUnidadCatalogo, this.paisEmisorCatalogo);
  }

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
   * @type {DatosUnidad | null}
   */
  datosDialogoUnidad: DatosUnidad | null = null;

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
   * @param {UnidadTabla[]} event - Evento de selección de la tabla.
   * @returns {void}
   */
  onUnidadRowSelected(event: UnidadTabla[]): void {
    if (event && event.length > 0) {
      const UNIDAD_SELECCIONADA = event[0];
      // Buscar el índice usando múltiples identificadores únicos para mayor robustez
      this.selectedUnidadIndex = this.unidadesArrastre.findIndex(u => 
        (UNIDAD_SELECCIONADA.vinVehiculo && u.vinVehiculo === UNIDAD_SELECCIONADA.vinVehiculo) ||
        (UNIDAD_SELECCIONADA.idDeVehiculo && u.idDeVehiculo === UNIDAD_SELECCIONADA.idDeVehiculo) ||
        (UNIDAD_SELECCIONADA.numeroPlaca && u.numeroPlaca === UNIDAD_SELECCIONADA.numeroPlaca && 
         UNIDAD_SELECCIONADA.numeroEconomico && u.numeroEconomico === UNIDAD_SELECCIONADA.numeroEconomico)
      );
      
      // Si no se encuentra por los identificadores únicos, usar la referencia como fallback
      if (this.selectedUnidadIndex === -1) {
        this.selectedUnidadIndex = this.unidadesArrastre.indexOf(UNIDAD_SELECCIONADA);
      }
    } else {
      this.selectedUnidadIndex = null;
    }
  }

  /**
   * Agrega una unidad actualizada desde el diálogo y la selecciona.
   * @param {DatosUnidad} updatedUnidad - Unidad actualizada.
   * @returns {void}
   */
  alGuardarDialogoUnidad(updatedUnidad: DatosUnidad): void {
    // Generar ID temporal si no existe
    const NEXT_ID = this.unidadesArrastre.length > 0 
      ? Math.max(...this.unidadesArrastre.map(u => Number(u.idDeVehiculo) || 0)) + 1 
      : 1;
    
    // Convertir DatosUnidad a UnidadTabla para agregar a la lista
    const UNIDAD_TABLA: UnidadTabla = { 
      ...updatedUnidad,
      idDeVehiculo: updatedUnidad.idDeVehiculo || String(NEXT_ID)
    };
    
    // Crear una copia mutable del array antes de agregar
    const UNIDADES_MUTABLES = [...this.unidadesArrastre];
    UNIDADES_MUTABLES.push(UNIDAD_TABLA);
    this.unidadesArrastre = UNIDADES_MUTABLES;
    this.selectedUnidadIndex = this.unidadesArrastre.length - 1;
    this.mostrarDialogoUnidad = false;
    // Forzar detección de cambios para asegurar que el modal se cierre
    this.cdr.detectChanges();
  }

  /**
   * Elimina la fila de unidad seleccionada.
   * @returns {void}
   */
  deleteUnidadRow(): void {
    if (this.selectedUnidadIndex !== null && this.selectedUnidadIndex >= 0) {
      // Obtener la unidad a eliminar
      const UNIDAD_A_ELIMINAR = this.unidadesArrastre[this.selectedUnidadIndex];
      
      if (UNIDAD_A_ELIMINAR) {
        // Crear conjuntos de identificadores únicos para filtrado eficiente
        const VINS_A_ELIMINAR = new Set([UNIDAD_A_ELIMINAR.vinVehiculo].filter(Boolean));
        const IDS_A_ELIMINAR = new Set([UNIDAD_A_ELIMINAR.idDeVehiculo].filter(Boolean));
        const PLACAS_ECONOMICOS_A_ELIMINAR = new Set();
        
        // Crear identificador compuesto para placa+numeroEconomico si ambos existen
        if (UNIDAD_A_ELIMINAR.numeroPlaca && UNIDAD_A_ELIMINAR.numeroEconomico) {
          PLACAS_ECONOMICOS_A_ELIMINAR.add(`${UNIDAD_A_ELIMINAR.numeroPlaca}|${UNIDAD_A_ELIMINAR.numeroEconomico}`);
        }
        
        // Filtrar usando múltiples capas de identificación
        this.unidadesArrastre = this.unidadesArrastre.filter(unidad => {
          // Primera capa: filtrar por VIN
          if (unidad.vinVehiculo && VINS_A_ELIMINAR.has(unidad.vinVehiculo)) {
            return false;
          }
          
          // Segunda capa: filtrar por ID
          if (unidad.idDeVehiculo && IDS_A_ELIMINAR.has(unidad.idDeVehiculo)) {
            return false;
          }
          
          // Tercera capa: filtrar por combinación placa+numeroEconomico
          if (unidad.numeroPlaca && unidad.numeroEconomico) {
            const ID_COMBINACION = `${unidad.numeroPlaca}|${unidad.numeroEconomico}`;
            if (PLACAS_ECONOMICOS_A_ELIMINAR.has(ID_COMBINACION)) {
              return false;
            }
          }
          
          // Cuarta capa: comparación de referencia de objeto como fallback
          return unidad !== UNIDAD_A_ELIMINAR;
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
    this.datosDialogoUnidad = null;
    this.mostrarDialogoUnidad = true;
  }
}
