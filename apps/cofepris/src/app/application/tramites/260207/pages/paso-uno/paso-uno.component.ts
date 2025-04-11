import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Tramite260207Query } from '../../estados/tramite260207Query.query';
import { Tramite260207Store } from '../../estados/tramite260207Store.store';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.css',
})
export class PasoUnoComponent implements OnDestroy, OnInit {
  indice: number | undefined = 1;

  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    private tramite260207Query: Tramite260207Query,
    private tramite260207Store: Tramite260207Store
  ) {
    //El constructor necesita inyectar las dependencias.
  }

  ngOnInit(): void {
    this.tramite260207Query.getTabSeleccionado$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((tab) => {
        this.indice = tab;
      });
  }

  seleccionaTab(i: number): void {
    this.tramite260207Store.updateTabSeleccionado(i);
  }

  /**
   * Método del ciclo de vida de Angular que se llama justo antes de que el componente sea destruido.
   *
   * Este método emite un valor a través del observable `destroyNotifier$` para notificar a los suscriptores
   * que el componente está siendo destruido, y luego completa el observable para liberar recursos.
   *
   * @returns {void} No retorna ningún valor.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
