import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260217Store } from '../../estados/tramite260217Store.store';

/**
 * Componente contenedor para la tabla SCIAN (Sistema de Clasificación Industrial de América del Norte).
 * Este componente actúa como un wrapper que gestiona la interacción entre la tabla SCIAN
 * y el store del trámite 260217, facilitando la selección y persistencia de datos SCIAN.
 * 
 * @author Equipo de Desarrollo VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 * 
 * @example
 * ```typescript
 * // Uso básico en una plantilla
 * <app-scian-tabla-contenedora></app-scian-tabla-contenedora>
 * ```
 */
@Component({
  /**
   * Selector del componente utilizado para invocarlo en las plantillas HTML.
   * @type {string}
   */
  selector: 'app-scian-tabla-contenedora',
  
  /**
   * Indica que este es un componente standalone que no requiere ser declarado en un NgModule.
   * @type {boolean}
   */
  standalone: true,
  
  /**
   * Módulos y componentes importados para el funcionamiento del componente.
   * @type {Array<any>}
   */
  imports: [CommonModule, ScianTablaComponent],
  
  /**
   * Ruta relativa al archivo de plantilla HTML del componente.
   * @type {string}
   */
  templateUrl: './scian-tabla-contenedora.component.html',
  
  /**
   * Ruta relativa al archivo de estilos SCSS del componente.
   * @type {string}
   */
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {
  
  /**
   * Store privado que maneja el estado del trámite 260217.
   * Se inyecta a través del constructor para gestionar las operaciones de estado
   * relacionadas con la configuración SCIAN del trámite.
   * 
   * @private
   * @readonly
   * @type {Tramite260217Store}
   * @memberof ScianTablaContenedoraComponent
   */
  private tramite260217Store: Tramite260217Store;

  /**
   * Constructor del componente que inyecta las dependencias necesarias.
   * Inicializa el componente con el store del trámite 260217 para gestionar
   * el estado de la aplicación relacionado con los datos SCIAN.
   * 
   * @constructor
   * @param {Tramite260217Store} tramite260217Store - Store que maneja el estado del trámite 260217.
   *                                                  Proporciona métodos para actualizar y consultar
   *                                                  la configuración SCIAN del trámite.
   * 
   * @example
   * ```typescript
   * // El constructor se invoca automáticamente por Angular
   * // No es necesario llamarlo manualmente
   * ```
   */
  constructor(tramite260217Store: Tramite260217Store) {
    this.tramite260217Store = tramite260217Store;
    // No se necesita lógica de inicialización adicional.
  }

  /**
   * Almacena la configuración del SCIAN (Sistema de Clasificación Industrial de América del Norte) seleccionado.
   * 
   * Esta propiedad mantiene la información de la clasificación industrial seleccionada por el usuario
   * en la tabla SCIAN. Se utiliza para mostrar la selección actual y puede ser consultada desde
   * otros componentes o servicios.
   * 
   * @public
   * @type {TablaScianConfig}
   * @memberof ScianTablaContenedoraComponent
   * 
   * @description
   * - Contiene los datos de la clasificación SCIAN seleccionada
   * - Se actualiza cada vez que el usuario selecciona una nueva opción en la tabla
   * - Es una propiedad pública para permitir el acceso desde la plantilla HTML
   * - Usa el operador de aserción no nula (!) indicando que se inicializará antes de su uso
   * 
   * @example
   * ```typescript
   * // Acceder a la configuración seleccionada
   * const configuracion = this.scianSeleccionado;
   * console.log('SCIAN seleccionado:', configuracion);
   * ```
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * Método manejador de eventos que procesa la selección de configuración SCIAN.
   * 
   * Este método se ejecuta cuando el usuario selecciona una opción en la tabla SCIAN.
   * Recibe la configuración seleccionada y actualiza el estado global del trámite 260217
   * a través del store correspondiente.
   * 
   * @public
   * @method obtenerSeleccionado
   * @param {TablaScianConfig} event - Objeto que contiene la configuración SCIAN seleccionada.
   *                                   Incluye todos los datos necesarios de la clasificación
   *                                   industrial seleccionada por el usuario.
   * @returns {void} No retorna ningún valor, pero actualiza el estado del store.
   * @memberof ScianTablaContenedoraComponent
   * 
   * @description
   * Funcionalidades del método:
   * - Recibe los datos de la selección SCIAN desde el componente hijo
   * - Actualiza el estado del store del trámite 260217
   * - Mantiene la configuración SCIAN en el estado global de la aplicación
   * - Preserva el estado anterior mientras actualiza solo los datos SCIAN
   * 
   * @example
   * ```typescript
   * // El método se vincula automáticamente al evento del componente hijo
   * // En la plantilla: <scian-tabla (seleccionChanged)="obtenerSeleccionado($event)">
   * 
   * // Ejemplo de uso programático (si fuera necesario)
   * const configuracionScian: TablaScianConfig = {
   *   codigo: '12345',
   *   descripcion: 'Descripción de la clasificación',
   *   // ... otros campos
   * };
   * this.obtenerSeleccionado(configuracionScian);
   * ```
   * 
   * @see {@link TablaScianConfig} Para ver la estructura del objeto de configuración
   * @see {@link Tramite260217Store} Para ver los métodos disponibles del store
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
     this.tramite260217Store.update((state) => ({
      ...state,
      scianConfigDatos: [event]
    }))
  }
}
