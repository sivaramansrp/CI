import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260301Store } from '../../estados/tramite260301Store.store';

/**
 * @component AgregarProveedorContenedoraComponent
 * @description Componente contenedor que actúa como intermediario entre la vista y el componente
 * `AgregarProveedorComponent` para gestionar la funcionalidad relacionada con la administración
 * de proveedores en el trámite 260301 de COFEPRIS. Este componente encapsula la lógica de
 * negocio específica del trámite y proporciona una interfaz cohesiva para el manejo de datos
 * de proveedores.
 * 
 * @dependencies
 * - CommonModule: Directivas comunes de Angular
 * - AgregarProveedorComponent: Componente reutilizable para gestión de proveedores
 * - Tramite260301Store: Store para el manejo del estado del trámite
 * 
 * @features
 * - Componente standalone que no requiere módulo padre
 * - Integración con store centralizado para manejo de estado
 * - Interfaz simplificada para actualización de datos de proveedores
 * 
 * @usage
 * ```html
 * <app-agregar-proveedor-contenedora></app-agregar-proveedor-contenedora>
 * ```
 */

@Component({
  /**
   * @property {string} selector
   * @description Selector CSS utilizado para identificar este componente en las plantillas HTML.
   * Permite la instanciación del componente mediante la etiqueta personalizada.
   */
  selector: 'app-agregar-proveedor-contenedora',
  
  /**
   * @property {boolean} standalone
   * @description Indica que este es un componente standalone que puede funcionar
   * independientemente sin necesidad de ser declarado en un módulo NgModule.
   * Facilita la modularidad y reduce el acoplamiento en la aplicación.
   */
  standalone: true,
  
  /**
   * @property {Array<any>} imports
   * @description Lista de módulos y componentes que este componente necesita para funcionar.
   * Incluye CommonModule para directivas básicas y AgregarProveedorComponent para
   * la funcionalidad específica de gestión de proveedores.
   */
  imports: [CommonModule, AgregarProveedorComponent],
  
  /**
   * @property {string} templateUrl
   * @description Ruta relativa al archivo de plantilla HTML que define la estructura
   * visual del componente. Separa la lógica de presentación del código TypeScript.
   */
  templateUrl: './agregar-proveedor-contenedora.component.html',
  
  /**
   * @property {string} styleUrl
   * @description Ruta relativa al archivo de estilos SCSS que define la apariencia
   * visual específica de este componente. Proporciona encapsulación de estilos.
   */
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  /**
   * @property {Tramite260301Store} tramite260301Store
   * @description Instancia del store centralizado que administra el estado completo del trámite 260301.
   * Proporciona acceso a métodos y propiedades para la gestión de datos del trámite,
   * incluyendo información de proveedores, documentos, y estado de validación.
   * 
   * @access public
   * @readonly Se inicializa en el constructor y no debe ser reasignado
   * @injected Inyectado automáticamente por el sistema de DI de Angular
   * 
   * @example
   * ```typescript
   * // Acceso a datos del store
   * const proveedores = this.tramite260301Store.proveedoresTablaDatos();
   * 
   * // Actualización de estado
   * this.tramite260301Store.updateProveedorTablaDatos(nuevosProveedores);
   * ```
   */

  /**
   * @constructor
   * @description Constructor de la clase que inicializa el componente e inyecta las dependencias
   * necesarias para su funcionamiento. Se ejecuta automáticamente cuando Angular crea
   * una instancia del componente.
   * 
   * @param {Tramite260301Store} tramite260301Store - Store que administra el estado centralizado
   * del trámite 260301, incluyendo datos de proveedores, validaciones y flujo de trabajo.
   * 
   * @throws {Error} Si el store no puede ser inyectado correctamente
   * 
   * @lifecycle OnInit
   * @access public
   * 
   * @example
   * ```typescript
   * // Angular maneja automáticamente la instanciación:
   * // new AgregarProveedorContenedoraComponent(tramite260301Store);
   * ```
   */
  constructor(public tramite260301Store: Tramite260301Store) {
    // Constructor necesario para inyectar el store del trámite
    // La inyección de dependencias se maneja automáticamente por Angular
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Método público que actúa como puente entre el componente hijo
   * `AgregarProveedorComponent` y el store del trámite. Recibe una lista actualizada
   * de proveedores y la propaga al store para mantener la consistencia del estado
   * global de la aplicación.
   * 
   * @param {Proveedor[]} event - Array de objetos Proveedor que contiene la información
   * actualizada de todos los proveedores asociados al trámite. Cada proveedor debe
   * cumplir con la interfaz definida en el modelo Proveedor.
   * 
   * @returns {void} Este método no retorna ningún valor, su función es de efecto
   * secundario al actualizar el estado del store.
   * 
   * @throws {Error} Si el array de proveedores no cumple con la estructura esperada
   * o si ocurre un error durante la actualización del store.
   * 
   * @access public
   * @async false - Operación síncrona
   * 
   * @sideEffects
   * - Actualiza el estado global del trámite en el store
   * - Puede disparar notificaciones a otros componentes suscritos al store
   * - Puede activar validaciones automáticas de datos
   * 
   * @example
   * ```typescript
   * // Ejemplo de uso desde el template
   * // <app-agregar-proveedor (proveedoresActualizados)="updateProveedorTablaDatos($event)">
   * 
   * const nuevosProveedores: Proveedor[] = [
   *   {
   *     id: '001',
   *     nombre: 'Proveedor ABC S.A.',
   *     rfc: 'ABC123456789',
   *     activo: true
   *   }
   * ];
   * 
   * this.updateProveedorTablaDatos(nuevosProveedores);
   * ```
   * 
   * @see {@link Proveedor} Para la estructura completa del modelo de proveedor
   * @see {@link Tramite260301Store.updateProveedorTablaDatos} Para detalles de la implementación del store
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite260301Store.updateProveedorTablaDatos(event);
  }
}
