import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260217Store } from '../../estados/tramite260217Store.store';

/**
 * @component AgregarProveedorContenedoraComponent
 * @description Componente contenedor responsable de encapsular y gestionar la funcionalidad 
 * relacionada con la agregación de proveedores dentro del trámite 260217 de COFEPRIS.
 * 
 * Este componente actúa como un wrapper inteligente que:
 * - Utiliza el componente reutilizable `AgregarProveedorComponent`
 * - Gestiona la comunicación con el estado global a través del store `Tramite260217Store`
 * - Proporciona una interfaz específica para el contexto del trámite 260217
 * - Maneja la actualización de datos de proveedores en el estado de la aplicación
 * 
 * @author Equipo de Desarrollo VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 * 
 * @example
 * ```typescript
 * // Uso del componente en un template
 * <app-agregar-proveedor-contenedora></app-agregar-proveedor-contenedora>
 * ```
 * 
 * @see {@link AgregarProveedorComponent} - Componente hijo utilizado para la UI
 * @see {@link Tramite260217Store} - Store que maneja el estado del trámite
 * @see {@link Proveedor} - Modelo de datos para proveedores
 */

@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  
  /**
   * @property {Tramite260217Store} tramite260217Store
   * @description Store público que administra el estado global del trámite 260217.
   * 
   * Esta propiedad permite el acceso directo al store desde el template del componente
   * y facilita la gestión centralizada del estado de la aplicación. Se declara como
   * pública para permitir su uso en el template HTML asociado.
   * 
   * @public
   * @readonly A través del constructor
   * 
   * @example
   * ```typescript
   * // Acceso desde el template
   * {{ tramite260217Store.proveedores$ | async }}
   * ```
   */

  /**
   * @constructor
   * @description Constructor que inicializa el componente e inyecta las dependencias necesarias.
   * 
   * Realiza la inyección de dependencias del store `Tramite260217Store` que será utilizado
   * para gestionar el estado del trámite y mantener la sincronización de datos entre
   * diferentes componentes de la aplicación.
   * 
   * @param {Tramite260217Store} tramite260217Store - Store que administra el estado del trámite 260217.
   *        Proporciona métodos para actualizar, consultar y manipular los datos del trámite.
   * 
   * @memberof AgregarProveedorContenedoraComponent
   * 
   * @example
   * ```typescript
   * // Angular se encarga automáticamente de la inyección
   * const component = new AgregarProveedorContenedoraComponent(store);
   * ```
   */
  constructor(public tramite260217Store: Tramite260217Store) {
    // No se requiere lógica de inicialización adicional.
    // El store se inyecta automáticamente por el sistema de DI de Angular.
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Método público que actualiza los datos de la tabla de proveedores en el store del trámite.
   * 
   * Este método actúa como un puente entre el componente hijo `AgregarProveedorComponent` 
   * y el store global, permitiendo que los cambios realizados en la UI se reflejen 
   * inmediatamente en el estado de la aplicación.
   * 
   * El método se ejecuta típicamente como respuesta a eventos del componente hijo,
   * como la adición, edición o eliminación de proveedores.
   * 
   * @param {Proveedor[]} event - Array de objetos Proveedor que contiene la información
   *        actualizada de todos los proveedores que deben ser almacenados en el state.
   *        Cada objeto debe cumplir con la interfaz definida en el modelo Proveedor.
   * 
   * @returns {void} Este método no retorna ningún valor, ya que su propósito es
   *          únicamente actualizar el estado interno del store.
   * 
   * @throws {Error} Puede lanzar errores si el store no está disponible o si los datos
   *         del evento no cumplen con el formato esperado.
   * 
   * @memberof AgregarProveedorContenedoraComponent
   * @public
   * 
   * @example
   * ```typescript
   * // Llamada típica desde el template
   * onProveedoresUpdated(proveedores: Proveedor[]) {
   *   this.updateProveedorTablaDatos(proveedores);
   * }
   * ```
   * 
   * @example
   * ```html
   * <!-- Uso en el template HTML -->
   * <app-agregar-proveedor 
   *   (proveedoresActualizados)="updateProveedorTablaDatos($event)">
   * </app-agregar-proveedor>
   * ```
   * 
   * @see {@link Proveedor} - Interfaz que define la estructura de un proveedor
   * @see {@link Tramite260217Store.updateProveedorTablaDatos} - Método del store que se ejecuta
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite260217Store.updateProveedorTablaDatos(event);
  }
}
