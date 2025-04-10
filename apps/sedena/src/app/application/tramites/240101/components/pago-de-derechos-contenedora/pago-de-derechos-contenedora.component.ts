import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/pago-de-derechos.model';
import { Subject } from 'rxjs';
import { Tramite240101Query } from '../../estados/tramite240101Query.query';
import { Tramite240101Store } from '../../estados/tramite240101Store.store';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.css',
})
export class PagoDeDerechosContenedoraComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public pagoDerechoFormState!: PagoDerechosFormState;
  private destroy$ = new Subject<void>();
  constructor(
    private tramiteQuery: Tramite240101Query,
    private tramiteStore: Tramite240101Store
  ) // eslint-disable-next-line no-empty-function
  {}

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida que se ejecuta al inicializar el componente.
   * Suscribe los observables para mostrar los datos en la vista.
   */
  ngOnInit(): void {
    this.tramiteQuery.getPagoDerechos$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.pagoDerechoFormState = data;
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  updatePagoDerechos(event: PagoDerechosFormState): void {
    this.tramiteStore.updatePagoDerechosFormState(event);
  }
}
