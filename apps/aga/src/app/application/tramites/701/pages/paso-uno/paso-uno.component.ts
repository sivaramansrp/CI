import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject,map,takeUntil } from 'rxjs';

import { BtnContinuarComponent, SolicitanteComponent } from '@ng-mf/data-access-user';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


/**
 * Componente para el paso uno del wizard.
 */
@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
   standalone: true,
   imports: [BtnContinuarComponent,FormsModule,ReactiveFormsModule,CommonModule,SolicitanteComponent],
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * Índice del paso actual.
   */
  indice: number = 1;
  public consultaState!:ConsultaioState;
    private destroyNotifier$: Subject<void> = new Subject();
  

  constructor(
    private consultaQuery: ConsultaioQuery
) {}

/**
 * Selecciona una pestaña del wizard.
 * @param {number} i - Índice de la pestaña.
 */
seleccionaTab(i: number): void {
  this.indice = i;
}
ngOnInit(): void {
  this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.destroyNotifier$),
      map((seccionState: ConsultaioState) => {
        this.consultaState = seccionState;
      })
    )
    .subscribe();
}

ngOnDestroy(): void {
  this.destroyNotifier$.next();
  this.destroyNotifier$.complete();
}

}
