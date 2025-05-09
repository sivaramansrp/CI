import { Component, OnDestroy } from '@angular/core';
import {
  DatosComplimentos,
  SociaoAccionistas,
} from '../../../../shared/models/complimentos.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ComplimentosComponent } from '../../../../shared/components/complimentos/complimentos.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';

@Component({
  selector: 'app-aggregar-complimentos',
  standalone: true,
  imports: [CommonModule, ComplimentosComponent],
  templateUrl: './aggregar-complimentos.component.html',
  styleUrl: './aggregar-complimentos.component.scss',
})

/**
 * @component
 * @name AggregarComplimentosComponent
 * @description
 * Componente encargado de gestionar los datos y operaciones relacionadas con los complementos 
 * en el trámite 80102. Este componente permite agregar, modificar y eliminar accionistas 
 * nacionales y extranjeros, así como validar el formulario de complementos.
 * 
 * @usageNotes
 * Este componente utiliza servicios de estado y consultas (`Tramite80102Store` y `Tramite80102Query`) 
 * para manejar y observar los datos de los complementos. Además, implementa el ciclo de vida de Angular 
 * para limpiar las suscripciones al destruirse.
 * */
export class AggregarComplimentosComponent implements OnDestroy {
  /**
   * Datos de los complementos.
   * @type {DatosComplimentos}
   */
  datosComplimentos!: DatosComplimentos;

  /**
   * Notificador para destruir las suscripciones.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Observable para los datos de la tabla de complementos.
   * @type {Observable<SociaoAccionistas[]>}
   */
  tablaDatosComplimentos$: Observable<SociaoAccionistas[]>;

  /**
   * Observable para los datos de la tabla de complementos extranjeros.
   * @type {Observable<SociaoAccionistas[]>}
   */
  tablaDatosComplimentosExtranjera$: Observable<SociaoAccionistas[]>;

  /**
   * Constructor de la clase AggregarComplimentosComponent.
   * @param {Tramite80102Store} store - Servicio para manejar el estado del trámite.
   * @param {Tramite80102Query} tramiteQuery - Servicio para consultar el estado del trámite.
   */
  constructor(
    private store: Tramite80102Store,
    private tramiteQuery: Tramite80102Query
  ) {
    this.tablaDatosComplimentos$ =
      this.tramiteQuery.selectTablaDatosComplimentos$;
    this.tablaDatosComplimentosExtranjera$ =
      this.tramiteQuery.selectTablaDatosComplimentosExtranjera$;
  
    this.tramiteQuery.selectDatosComplimento$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos) => {
        this.datosComplimentos = datos;
      });
  }

  /**
   * Modifica los datos de los complementos.
   * @param {DatosComplimentos} complimentos - Datos de los complementos.
   * @returns {void}
   */
  modifierComplimentos(complimentos: DatosComplimentos): void {
    this.store.setDatosComplimentos(complimentos);
  }

  /**
   * Agrega un nuevo accionista a la tabla de complementos.
   * @param {SociaoAccionistas} datos - Datos del accionista.
   * @returns {void}
   */
  accionistasAgregados(datos: SociaoAccionistas): void {
    if (datos.rfc) {
      this.store.aggregarTablaDatosComplimentos(datos);
    } else {
      this.store.aggregarTablaDatosComplimentosExtranjera(datos);
    }
  }

  /**
   * Elimina los accionistas seleccionados de la tabla de complementos.
   * @param {SociaoAccionistas[]} datos - Lista de accionistas a eliminar.
   * @returns {void}
   */
  accionistasEliminados(datos: SociaoAccionistas[]): void {
    this.store.eliminarTablaDatosComplimentos(datos);
  }

  /**
   * Elimina los accionistas extranjeros seleccionados de la tabla de complementos.
   * @param {SociaoAccionistas[]} datos - Lista de accionistas extranjeros a eliminar.
   * @returns {void}
   */
  accionistasExtranjerosEliminado(datos: SociaoAccionistas[]): void {
    this.store.eliminarTablaDatosComplimentosExtranjera(datos);
  }

  /**
   * Establece si el formulario de complementos es válido.
   * @param {boolean} valida - Indica si el formulario es válido.
   * @returns {void}
   */
  setFormValida(valida: boolean): void {
    this.store.setFormValida({ complimentos: valida });
  }

   /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
   ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}