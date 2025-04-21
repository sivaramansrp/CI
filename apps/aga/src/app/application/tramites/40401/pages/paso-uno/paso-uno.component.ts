import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Component } from '@angular/core';
import { map } from 'rxjs';

import { CommonModule } from '@angular/common';
import { DatosDelTramiteComponent } from '../../components/datos-del-tramite/datos-del-tramite.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { Tramite40401Query } from '../../../../core/queries/tramite40401.query';
import { Tramite40401State } from '../../../../core/estados/tramites/tramite40401.store';
import { Tramite40401Store } from '../../../../core/estados/tramites/tramite40401.store';

/**
 * Componente para el paso uno del wizard.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SolicitanteComponent,
    DatosDelTramiteComponent,
  ],
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice del paso actual.
   */
  indice: number = 1;
    /**
   * Estado actual del trámite.
   *
   * Esta propiedad almacena el estado del trámite obtenido desde el store.
   */
    public tramiteState!: Tramite40401State;

  /**
   * Notificador para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   */
  destroyNotifier$: Subject<void> = new Subject();

  constructor(
    public store: Tramite40401Store,
    public tramiteQuery: Tramite40401Query
  ) {
    // Inicializa el paso activo en el store
  }
  /**
   * Selecciona una pestaña del wizard.
   * @param {number} i - Índice de la pestaña.
   */
  seleccionaTab(i: number): void {
    this.indice = i;
    this.store.setPestanaActiva(this.indice);
  }
  /**
   * Método del ciclo de vida `OnInit`.
   *
   * Inicializa el formulario y carga los datos necesarios para el componente.
   */
  ngOnInit(): void {
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
        })
      )
      .subscribe();
    this.indice = this.tramiteState.pestanaActiva;
  }

  /**
   * Método del ciclo de vida `OnDestroy`.
   *
   * Libera los recursos y completa el `Subject` para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
