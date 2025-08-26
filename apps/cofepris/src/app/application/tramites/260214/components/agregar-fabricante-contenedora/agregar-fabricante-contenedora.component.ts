/**
 * @fileoverview
 * El `AgregarFabricanteContenedoraComponent` es un componente de Angular diseñado para gestionar la funcionalidad relacionada con los fabricantes.
 * Este componente utiliza el componente `AgregarFabricanteComponent` y se comunica con el estado del trámite 260214 a través del store `Tramite260214Store`.
 *
 * @module AgregarFabricanteContenedoraComponent
 * @description
 * Este componente actúa como un contenedor para gestionar y actualizar los datos de la tabla de fabricantes en el store del trámite.
 */

import { AfterViewInit, Component } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import {
  Tramite260214State,
  Tramite260214Store,
} from '../../estados/tramite260214Store.store';
import { ActivatedRoute } from '@angular/router';
import { AgregarFabricanteComponent } from '../../../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { CommonModule } from '@angular/common';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/medicos-uso.enum';
import { Tramite260214Query } from '../../estados/tramite260214Query.query';

/**
 * @component
 * @name AgregarFabricanteContenedoraComponent
 * @description
 * Componente contenedor que utiliza el componente `AgregarFabricanteComponent`
 * para gestionar la funcionalidad relacionada con los fabricantes.
 * Este componente interactúa con el estado del trámite a través del store `Tramite260214Store`.
 *
 * @selector app-agregar-fabricante-contenedora
 * Define el selector del componente que se utiliza en las plantillas HTML para instanciar este componente.
 *
 * @standalone true
 * Indica que este componente es independiente y no requiere un módulo Angular para ser utilizado.
 *
 * @templateUrl ./agregar-fabricante-contenedora.component.html
 * Especifica la ubicación del archivo de plantilla HTML asociado con este componente.
 *
 * @styleUrl ./agregar-fabricante-contenedora.component.scss
 * Especifica la ubicación del archivo de estilos CSS asociado con este componente.
 *
 * @imports
 * - CommonModule: Proporciona directivas comunes de Angular como `ngIf` y `ngFor`.
 * - AgregarFabricanteComponent: Componente compartido para gestionar la funcionalidad de los fabricantes.
 */
@Component({
  selector: 'app-agregar-fabricante-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarFabricanteComponent],
  templateUrl: './agregar-fabricante-contenedora.component.html',
  styleUrl: './agregar-fabricante-contenedora.component.scss',
})
export class AgregarFabricanteContenedoraComponent implements AfterViewInit {
  /**
   * @constructor
   * @description
   * Constructor que inyecta el store `Tramite260214Store` para gestionar el estado del trámite.
   *
   * @param {Tramite260214Store} tramite260214Store - Store que administra el estado del trámite 260214.
   */

  idProcedimiento: number = ID_PROCEDIMIENTO;

  destroyNotifier$ = new Subject<void>();

  public tramiteState!: Tramite260214State;

  fabricanteTablaDatos: Fabricante[] = [];

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
          this.fabricanteTablaDatos = seccionState.fabricanteTablaDatos;
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['update'] === 'false') {
        this.fabricanteTablaDatos = [];
      }
    });
  }

  /**
   * @method updateFabricanteTablaDatos
   * @description
   * Actualiza los datos de la tabla de fabricantes en el store del trámite.
   *
   * @param {Fabricante[]} event - Lista de fabricantes que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   *
   * @example
   * ```typescript
   * const nuevosFabricantes: Fabricante[] = [
   *   { id: 1, nombre: 'Fabricante 1' },
   *   { id: 2, nombre: 'Fabricante 2' },
   * ];
   * this.updateFabricanteTablaDatos(nuevosFabricantes);
   * ```
   */
  updateFabricanteTablaDatos(event: Fabricante[]): void {
    this.tramite260214Store.updateFabricanteTablaDatos(event);
  }
}