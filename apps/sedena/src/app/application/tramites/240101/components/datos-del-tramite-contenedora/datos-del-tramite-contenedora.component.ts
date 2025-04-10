import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';
import { Tramite240101Query } from '../../estados/tramite240101Query.query';
import { Subject, takeUntil } from 'rxjs';
import {
  DatosDelTramiteFormState,
  MercanciaDetalle,
} from '../../../../shared/models/datos-del-tramite.model';
import { Tramite240101Store } from '../../estados/tramite240101Store.store';

@Component({
  selector: 'app-datos-del-tramite-contenedora',
  standalone: true,
  imports: [CommonModule, DatosDelTramiteComponent],
  templateUrl: './datos-del-tramite-contenedora.component.html',
  styleUrl: './datos-del-tramite-contenedora.component.css',
})
export class DatosDelTramiteContenedoraComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public datosMercanciaTabla: MercanciaDetalle[] = [];
  public datosDelTramiteFormState!: DatosDelTramiteFormState;
  private destroy$ = new Subject<void>();
  constructor(
    private tramiteQuery: Tramite240101Query,
    private tramiteStore: Tramite240101Store
  ) {}

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe los observables para mostrar los datos en la vista.
   */
  ngOnInit(): void {
    this.tramiteQuery.getMercanciaTablaDatos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datosMercanciaTabla = data;
      });
    this.tramiteQuery.getDatosDelTramite$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.datosDelTramiteFormState = data;
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  updateDatosDelTramiteFormulario(event: DatosDelTramiteFormState): void {
    this.tramiteStore.updateDatosDelTramiteFormState(event);
  }
}
