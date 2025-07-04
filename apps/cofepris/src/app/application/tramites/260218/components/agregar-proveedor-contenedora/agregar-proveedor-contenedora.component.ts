/**
 * @fileoverview
 * El `AgregarProveedorContenedoraComponent` es un componente de Angular diseñado para gestionar la funcionalidad relacionada con los proveedores.
 * Este componente utiliza el componente `AgregarProveedorComponent` y se comunica con el estado del trámite 260218 a través del store `Tramite260218Store`.
 * 
 * @module AgregarProveedorContenedoraComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos de la tabla de proveedores en el store del trámite.
 */

import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260218Store } from '../../estados/tramite260218Store.store';

/**
 * @component
 * @name AgregarProveedorContenedoraComponent
 * @description
 * Componente contenedor que utiliza el componente `AgregarProveedorComponent` 
 * para gestionar la funcionalidad relacionada con los proveedores. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260218Store`.
 *
 * @selector app-agregar-proveedor-contenedora
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./agregar-proveedor-contenedora.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./agregar-proveedor-contenedora.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - AgregarProveedorComponent: Componente compartido para gestionar la funcionalidad de los proveedores.
 */
@Component({
  selector: 'app-agregar-proveedor-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarProveedorComponent],
  templateUrl: './agregar-proveedor-contenedora.component.html',
  styleUrl: './agregar-proveedor-contenedora.component.scss',
})
export class AgregarsProveedorContenedoraComponent {
  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260218Store` para gestionar el estado del trámite.
   * 
   * @param {Tramite260218Store} tramiteStore - Store que administra el estado del trámite 260218.
   */
  constructor(public tramiteStore: Tramite260218Store) {
    // no realizar ninguna acción
  }

  /**
   * @method updateProveedorTablaDatos
   * @description
   * Actualiza los datos de la tabla de proveedores en el almacén de trámites.
   * 
   * @param {Proveedor[]} event - Una lista de objetos de tipo `Proveedor` que contiene los datos actualizados de los proveedores.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @remarks
   * Este método se utiliza para sincronizar los datos de proveedores con el almacén de trámites.
   *
   * @example
   * ```typescript
   * const nuevosProveedores: Proveedor[] = [
   *   { id: 1, nombre: 'Proveedor 1' },
   *   { id: 2, nombre: 'Proveedor 2' },
   * ];
   * this.updateProveedorTablaDatos(nuevosProveedores);
   * ```
   */
  updateProveedorTablaDatos(event: Proveedor[]): void {
    this.tramiteStore.updateProveedorTablaDatos(event);
  }
}