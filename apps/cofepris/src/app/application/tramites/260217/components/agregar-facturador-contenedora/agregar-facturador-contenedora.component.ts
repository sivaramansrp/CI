import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260217Store } from '../../estados/tramite260217Store.store';

/**
 * @fileoverview Componente contenedor para la gestión de facturadores en el trámite 260217
 * @author VUCEM 3.0 Development Team
 * @version 1.0.0
 * @since 2025
 */

/**
 * @class AgregarFacturadorContenedoraComponent
 * @description Componente contenedor Angular standalone que encapsula la funcionalidad 
 * de agregar y gestionar facturadores para el trámite 260217. Este componente actúa 
 * como intermediario entre la vista y el estado global de la aplicación, delegando 
 * la lógica de presentación al componente hijo `AgregarFacturadorComponent` y 
 * gestionando las actualizaciones de estado a través del `Tramite260217Store`.
 * 
 * @implements {OnInit} - Implementa la interfaz OnInit para la inicialización del componente (si es necesario)
 * 
 * @example
 * ```html
 * <app-agregar-facturador-contenedora></app-agregar-facturador-contenedora>
 * ```
 * 
 * @since 1.0.0
 * @author VUCEM 3.0 Development Team
 */
@Component({
  selector: 'app-agregar-facturador-contenedora',
  standalone: true,
  imports: [CommonModule,AgregarFacturadorComponent],
  templateUrl: './agregar-facturador-contenedora.component.html',
  styleUrl: './agregar-facturador-contenedora.component.scss',
})
export class AgregarFacturadorContenedoraComponent {
    
  /**
   * @property {Tramite260217Store} tramite260217Store
   * @description Instancia inyectada del store que gestiona el estado global del trámite 260217.
   * Esta propiedad permite acceder y modificar el estado de los facturadores asociados al trámite.
   * Se declara como pública para permitir el acceso desde el template del componente.
   * 
   * @public
   * @readonly
   * @memberof AgregarFacturadorContenedoraComponent
   * @since 1.0.0
   */
  public tramite260217Store: Tramite260217Store;

  /**
   * @constructor
   * @description Constructor de la clase que inicializa el componente e inyecta las dependencias necesarias.
   * Realiza la inyección del store `Tramite260217Store` que se utilizará para gestionar el estado
   * de los facturadores del trámite 260217. No requiere lógica de inicialización adicional ya que
   * el componente delega la funcionalidad a componentes hijos y al store.
   * 
   * @param {Tramite260217Store} tramite260217Store - Store inyectado que administra el estado 
   *        global del trámite 260217, incluyendo la gestión de facturadores y sus datos asociados.
   * 
   * @memberof AgregarFacturadorContenedoraComponent
   * @since 1.0.0
   * @author VUCEM 3.0 Development Team
   * 
   * @example
   * ```typescript
   * // El constructor es invocado automáticamente por Angular durante la instanciación del componente
   * // No requiere invocación manual
   * ```
   */
    constructor(
        tramite260217Store: Tramite260217Store){
        this.tramite260217Store = tramite260217Store;
        // No se necesita lógica de inicialización adicional.
    }

    /**
   * @method updateFacturadorTablaDatos
   * @description Método público que actúa como handler para actualizar los datos de la tabla 
   * de facturadores en el store del trámite. Este método recibe un array de facturadores 
   * desde el componente hijo `AgregarFacturadorComponent` y delega la actualización del estado
   * al store correspondiente. Es invocado típicamente cuando se agregan, modifican o eliminan
   * facturadores desde la interfaz de usuario.
   * 
   * @param {Facturador[]} event - Array de objetos tipo Facturador que contiene la lista
   *        actualizada de facturadores que se sincronizará con el estado global del trámite.
   *        Cada elemento del array debe cumplir con la estructura definida en el modelo Facturador.
   * 
   * @returns {void} Este método no retorna ningún valor, su efecto es la actualización del estado global.
   * 
   * @throws {Error} Puede lanzar errores si el store no está disponible o si los datos no son válidos.
   * 
   * @memberof AgregarFacturadorContenedoraComponent
   * @since 1.0.0
   * @author VUCEM 3.0 Development Team
   * 
   * @example
   * ```typescript
   * // Ejemplo de uso desde el template del componente hijo:
   * // <app-agregar-facturador (facturadoresUpdated)="updateFacturadorTablaDatos($event)">
   * 
   * const nuevosFacturadores: Facturador[] = [
   *   { id: 1, nombre: 'Facturador 1', rfc: 'ABC123456789' },
   *   { id: 2, nombre: 'Facturador 2', rfc: 'DEF987654321' }
   * ];
   * this.updateFacturadorTablaDatos(nuevosFacturadores);
   * ```
   * 
   * @see {@link Facturador} - Modelo de datos para facturadores
   * @see {@link Tramite260217Store} - Store que gestiona el estado del trámite
   */
    updateFacturadorTablaDatos(event:Facturador[]): void {
        this.tramite260217Store.updateFacturadorTablaDatos(event);
    }
}
