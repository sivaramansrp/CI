import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ID_PROCEDIMIENTO } from '../../constants/exporticon-estupefacientes.enum';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';

/**
 * @class ScianTablaContenedoraComponent
 * @description
 * Componente contenedor para la tabla SCIAN del trámite 260302.
 * Este componente actúa como un wrapper que maneja la configuración y selección
 * de elementos de la tabla SCIAN, integrándose con el store del trámite para
 * mantener el estado de las selecciones realizadas por el usuario.
 * 
 * @author [Nombre del desarrollador]
 * @version 1.0.0
 * @since [Fecha de creación]
 * 
 * @example
 * ```html
 * <app-scian-tabla-contenedora></app-scian-tabla-contenedora>
 * ```
 */
@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent implements OnDestroy {

  /**
   * @property {string} idProcedimiento
   * @description
   * Identificador único del procedimiento asociado al trámite 260302.
   * Esta propiedad es de solo lectura y se utiliza para identificar
   * de manera unívoca el tipo de procedimiento que se está manejando
   * en el componente.
   * 
   * @readonly
   * @type {string}
   * @memberof ScianTablaContenedoraComponent
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

   /**
   * Subject utilizado como notificador para gestionar la destrucción de observables.
   * Este Subject emite una señal cuando el componente es destruido, permitiendo que
   * todos los observables suscritos se desuscriban automáticamente para evitar fugas de memoria.
   * Es una práctica recomendada para el manejo adecuado de suscripciones en Angular.
   * 
   * @private
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {TablaScianConfig[]} scianConfigDatos
   * @description
   * Almacena la configuración de la tabla SCIAN.
   */
  public scianConfigDatos!: TablaScianConfig[];


  /**
   * @constructor
   * @description
   * Constructor del componente que inicializa las dependencias necesarias.
   * Inyecta el store del trámite 260302 para poder gestionar el estado
   * global de la aplicación relacionado con este trámite específico.
   * 
   * @param {Tramite260302Store} tramite260302Store - Store que maneja el estado del trámite 260302
   * @memberof ScianTablaContenedoraComponent
   */
  constructor(private tramite260302Store: Tramite260302Store, private tramite260302Query: Tramite260302Query) {
    // Constructor necesario para inyectar el store del trámite
    this.tramite260302Query.getScianConfigDatos$.pipe(
      takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.scianConfigDatos = datos;
    });
  }

  /**
   * @property {TablaScianConfig} scianSeleccionado
   * @description
   * Almacena la configuración seleccionada de la tabla SCIAN.
   * Esta propiedad mantiene el estado local del elemento SCIAN que ha sido
   * seleccionado por el usuario en la interfaz. Se utiliza el operador de
   * aserción definitiva (!) para indicar que la variable será inicializada
   * antes de su uso, evitando errores de compilación de TypeScript.
   * 
   * @type {TablaScianConfig}
   * @public
   * @memberof ScianTablaContenedoraComponent
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * @method obtenerSeleccionado
   * @description
   * Método que se ejecuta cuando el usuario selecciona un elemento de la tabla SCIAN.
   * Actualiza el estado global del store agregando la nueva configuración seleccionada
   * al array de configuraciones SCIAN existentes. Utiliza el patrón inmutable para
   * preservar el estado anterior y agregar el nuevo elemento al final del array.
   * 
   * @param {TablaScianConfig} event - Objeto que contiene la configuración SCIAN seleccionada
   * @returns {void}
   * @public
   * @memberof ScianTablaContenedoraComponent
   * 
   * @example
   * ```typescript
   * // Cuando el usuario selecciona un elemento SCIAN
   * const configuracionSeleccionada: TablaScianConfig = { ... };
   * this.obtenerSeleccionado(configuracionSeleccionada);
   * ```
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
    this.tramite260302Store.update((state) => ({
      ...state,
      scianConfigDatos: [...state.scianConfigDatos, event]
    }));
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método que se ejecuta cuando el componente es destruido.
   * Se utiliza para limpiar los recursos y evitar fugas de memoria.
   * 
   * @public
   * @memberof ScianTablaContenedoraComponent
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
