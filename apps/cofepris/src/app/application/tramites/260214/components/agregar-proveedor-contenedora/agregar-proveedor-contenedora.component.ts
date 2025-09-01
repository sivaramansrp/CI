/**
 * @fileoverview
 * El `AgregarProveedorContenedoraComponent` es un componente de Angular diseñado para gestionar la funcionalidad relacionada con los proveedores.
 * Este componente utiliza el componente `AgregarProveedorComponent` y se comunica con el estado del trámite 260214 a través del store `Tramite260214Store`.
 *
 * @module AgregarProveedorContenedoraComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos de la tabla de proveedores en el store del trámite.
 */

import { Component, OnInit } from '@angular/core';
import { Subject,map, takeUntil } from 'rxjs';
import { Tramite260214State, Tramite260214Store } from '../../estados/tramite260214Store.store';
import { ActivatedRoute } from '@angular/router';
import { AgregarProveedorComponent } from '../../../../shared/components/agregar-proveedor/agregar-proveedor.component';
import { CommonModule } from '@angular/common';
import { ID_PROCEDIMIENTO } from '../../constants/medicos-uso.enum';
import { Proveedor } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260214Query } from '../../estados/tramite260214Query.query';

/**
 * @component
 * @name AgregarProveedorContenedoraComponent
 * @description
 * Componente contenedor que utiliza el componente `AgregarProveedorComponent`
 * para gestionar la funcionalidad relacionada con los proveedores.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260214Store`.
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
export class AgregarProveedorContenedoraComponent implements OnInit {
  /**
   * Identificador del procedimiento en curso.
   *
   * Se inicializa con la constante `ID_PROCEDIMIENTO` y se utiliza
   * para determinar la lógica o el flujo que debe seguir el componente
   * según el procedimiento activo.
   */
  idProcedimiento: number = ID_PROCEDIMIENTO;
  destroyNotifier$ = new Subject<void>();

  /**
   * Estado actual del trámite 260214.
   *
   * @type {Tramite260214State}
   * @description
   * Contiene la información y valores asociados al estado del trámite en curso.  
   * Se actualiza a través de `Store` y `Query` que gestionan el flujo
   * y la persistencia del estado.
   */
  public tramiteState!: Tramite260214State;

  /**
   * Lista de proveedores en la tabla de datos.
   *
   * @type {Proveedor[]}
   * @description
   * Arreglo que almacena los registros de proveedores mostrados en la tabla.  
   * Puede ser modificado dinámicamente en función de la interacción del usuario
   * o por datos obtenidos desde el estado (`tramiteState`) o servicios externos.
   */
  proveedorTablaDatos: Proveedor[] = [];
  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param {Tramite260214Store} tramite260214Store - Store que administra el estado del trámite 260214.
   */
  constructor(
    public tramite260214Store: Tramite260214Store,
    public tramite260214Query: Tramite260214Query,
    private route: ActivatedRoute
  ) {
    this.tramite260214Query.selectTramiteState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
          this.proveedorTablaDatos = seccionState.proveedorTablaDatos;
        })
      )
      .subscribe();
  }

  /**
   * Ciclo de vida de Angular: `ngOnInit`.
   *
   * @description
   * Se ejecuta al inicializar el componente.  
   *
   * - Se suscribe a los parámetros de la ruta (`queryParams`).  
   * - Si el parámetro `update` es igual a `'false'`, se limpia la lista
   *   de proveedores (`proveedorTablaDatos`).  
   *
   * Esto permite inicializar la tabla de proveedores vacía o conservar los datos previos
   * según el valor recibido en la URL.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['update'] === 'false') {
        this.proveedorTablaDatos = [];
      } else if (params['update'] === 'true') {
        this.proveedorTablaDatos = this.tramiteState.proveedorTablaModificaDatos;
      }
    });
}

  /**
   * @method updateProveedorTablaDatos
   * @description
   * Actualiza los datos de la tabla de proveedores en el store del trámite.
   *
   * @param {Proveedor[]} event - Lista de proveedores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
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
    this.tramite260214Store.updateProveedorTablaDatos(event);
  }
}
