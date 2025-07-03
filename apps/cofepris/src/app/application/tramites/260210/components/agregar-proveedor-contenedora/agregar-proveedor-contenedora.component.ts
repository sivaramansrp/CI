import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260214Store } from '../../estados/tramite260210Store.store';

/**
 * @class AgregarProveedorContenedoraComponent
 * @description Componente contenedor responsable de gestionar la funcionalidad de agregar proveedores
 * dentro del sistema de trámites. Este componente actúa como un wrapper del componente 
 * `AgregarProveedorComponent` y maneja la comunicación con el store del estado del trámite 260210.
 * 
 * @version 1.0.0
 * @since 2025
 * @author Sistema VUCEM 3.0
 * 
 * @implements Component (Angular)
 * @standalone true - Componente independiente que no requiere un módulo padre
 * 
 * @dependencies
 * - CommonModule: Proporciona directivas comunes de Angular
 * - AgregarProveedorComponent: Componente hijo para la gestión de proveedores
 * - Tramite260214Store: Store de estado para el trámite 260210
 * 
 * @template ./agregar-proveedor-contenedora.component.html
 * @styles ./agregar-proveedor-contenedora.component.scss
 */
@Component({
  /**
   * @property selector
   * @description Selector CSS utilizado para renderizar este componente en las plantillas HTML.
   * @type {string}
   * @value 'app-agregar-proveedor-contenedora'
   */
  selector: 'app-agregar-proveedor-contenedora',
  
  /**
   * @property standalone
   * @description Indica que este es un componente independiente que no requiere ser declarado en un módulo.
   * @type {boolean}
   * @value true
   */
  standalone: true,
  
  /**
   * @property imports
   * @description Array de módulos y componentes que este componente necesita para funcionar correctamente.
   * @type {Array}
   * @includes CommonModule - Directivas básicas de Angular (ngIf, ngFor, etc.)
   * @includes AgregarProveedorComponent - Componente hijo para gestión de proveedores
   */
  imports: [CommonModule, AgregarProveedorComponent],
  
  /**
   * @property templateUrl
   * @description Ruta al archivo de plantilla HTML que define la estructura visual del componente.
   * @type {string}
   * @value './agregar-proveedor-contenedora.component.html'
   */
  templateUrl: './agregar-proveedor-contenedora.component.html',
  
  /**
   * @property styleUrl
   * @description Ruta al archivo de estilos SCSS que define la apariencia visual del componente.
   * @type {string}
   * @value './agregar-proveedor-contenedora.component.scss'
   */
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarProveedorContenedoraComponent {
  
  /**
   * @property tramite260214Store
   * @description Store de estado inyectado que maneja toda la lógica de estado del trámite 260210.
   * Este store contiene los métodos y propiedades necesarios para gestionar los datos de proveedores
   * y mantener la consistencia del estado a través de la aplicación.
   * 
   * @type {Tramite260214Store}
   * @access public - Accesible desde la plantilla del componente
   * @readonly - El store se inyecta una vez en la construcción y no se modifica
   * 
   * @example
   * // Acceso desde la plantilla
   * {{ tramite260214Store.proveedores$ | async }}
   */
  public tramite260214Store: Tramite260214Store;

  /**
   * @constructor
   * @description Constructor del componente que inicializa las dependencias necesarias.
   * Se ejecuta automáticamente cuando Angular crea una instancia del componente.
   * Utiliza el sistema de inyección de dependencias de Angular para obtener el store del trámite.
   * 
   * @param {Tramite260214Store} tramite260214Store - Store que administra el estado del trámite 260210.
   *        Contiene los métodos y propiedades para gestionar proveedores, validaciones y persistencia de datos.
   * 
   * @throws {Error} Si el store no puede ser inyectado correctamente
   * 
   * @example
   * // Angular automáticamente llama al constructor al crear el componente
   * const component = new AgregarProveedorContenedoraComponent(storeInstance);
   * 
   * @since 1.0.0
   */
  constructor(tramite260214Store: Tramite260214Store) {
    this.tramite260214Store = tramite260214Store;
  }

  /**
   * @method updateProveedorTablaDatos
   * @description Método público que actúa como puente entre el componente hijo `AgregarProveedorComponent`
   * y el store del estado del trámite. Recibe una lista actualizada de proveedores y la envía al store
   * para actualizar el estado global de la aplicación.
   * 
   * Este método se ejecuta típicamente cuando:
   * - Se agrega un nuevo proveedor
   * - Se modifica un proveedor existente
   * - Se elimina un proveedor de la lista
   * - Se realiza una actualización masiva de proveedores
   * 
   * @param {Proveedor[]} event - Array de objetos Proveedor que contiene la lista actualizada
   *        de todos los proveedores que deben ser almacenados en el estado del trámite.
   *        Cada elemento debe cumplir con la interfaz Proveedor definida en el modelo.
   * 
   * @returns {void} Este método no retorna ningún valor, ya que su función es realizar
   *          una acción de side-effect (actualizar el estado del store).
   * 
   * @throws {Error} Puede lanzar errores si el store no está disponible o si los datos
   *         del proveedor no son válidos según las reglas de negocio.
   * 
   * @example
   * // Uso típico desde el componente hijo
   * onProveedoresUpdated(nuevosProveedores: Proveedor[]) {
   *   this.updateProveedorTablaDatos(nuevosProveedores);
   * }
   * 
   * @example
   * // Uso desde la plantilla con event binding
   * <app-agregar-proveedor 
   *   (proveedoresActualizados)="updateProveedorTablaDatos($event)">
   * </app-agregar-proveedor>
   * 
   * @see Proveedor - Modelo de datos del proveedor
   * @see Tramite260214Store.updateProveedorTablaDatos - Método del store que se invoca
   * 
   * @since 1.0.0
   * @version 1.0.0
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramite260214Store.updateProveedorTablaDatos(event);
  }
}
