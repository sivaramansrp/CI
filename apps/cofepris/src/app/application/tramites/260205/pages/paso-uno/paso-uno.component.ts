import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ContenedorDeDatosSolicitudComponent } from '../../components/contenedor-de-datos-solicitud/contenedor-de-datos-solicitud.component';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDeDerechosContenedoraComponent } from "../../components/pago-de-derechos-contenedora/pago-de-derechos-contenedora.component";
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { TercerosRelacionadosVistaComponent } from '../../components/terceros-relacionados-vista/terceros-relacionados-vista.component';
import { Tramite260205Query } from '../../estados/queries/tramite260205.query';
import { Tramite260205Store } from '../../estados/stores/tramite260205.store';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [
    CommonModule,
    SolicitanteComponent,
    ContenedorDeDatosSolicitudComponent,
    TercerosRelacionadosVistaComponent,
    PagoDeDerechosComponent,
    PagoDeDerechosContenedoraComponent
],
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnDestroy {
  indice: number = 2;

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(
    protected store: Tramite260205Store,
    private query: Tramite260205Query
  ) {
    this.query.indicePrevioRuta$
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((indice: number) => {
        if (indice) {
          this.indice = indice;
        }
      });
  }

  /**
   * Limpia los recursos observables al destruir el componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }

  /**
   * Establece el índice seleccionado en el store.
   *
   * @param i - El índice a seleccionar.
   */
  seleccionaTab(i: number): void {
    this.store.setIndice(i);
  }
}
