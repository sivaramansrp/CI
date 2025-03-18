import {
  DatosComplimentos,
  SociaoAccionistas,
} from '../../../../shared/models/complimentos.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AutorizacionProgrmaNuevoService } from '../../services/autorizacion-programa-nuevo.service';
import { CommonModule } from '@angular/common';
import { ComplimentosComponent } from '../../../../shared/components/complimentos/complimentos.component';
import { Component } from '@angular/core';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';

@Component({
  selector: 'app-aggregar-complimentos',
  standalone: true,
  imports: [CommonModule, ComplimentosComponent],
  templateUrl: './aggregar-complimentos.component.html',
  styleUrl: './aggregar-complimentos.component.scss',
})
export class AggregarComplimentosComponent {
  datosComplimentos!: DatosComplimentos;
  private destroyNotifier$: Subject<void> = new Subject();
  tablaDatosComplimentos$: Observable<SociaoAccionistas[]>;
  tablaDatosComplimentosExtranjera$: Observable<SociaoAccionistas[]>;

  constructor(
    private store: Tramite80102Store,
    private tramiteQuery: Tramite80102Query,
    private autorizacionProgrmaNuevoService: AutorizacionProgrmaNuevoService
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

  modifierComplimentos(complimentos: DatosComplimentos): void {
    this.store.setDatosComplimentos(complimentos);
  }

  accionistasAgregados(datos: SociaoAccionistas): void {
    if (datos.rfc) {
      this.store.aggregarTablaDatosComplimentos(datos);
    } else {
      this.store.aggregarTablaDatosComplimentosExtranjera(datos);
    }
  }

  accionistasEliminados(datos: SociaoAccionistas[]): void {
    this.store.eliminarTablaDatosComplimentos(datos);
  }

  accionistasExtranjerosEliminado(datos: SociaoAccionistas[]): void {
    this.store.eliminarTablaDatosComplimentosExtranjera(datos);
  }

  setFormValida(valida: boolean): void {
    this.store.setFormValida({ complimentos: valida});
  }
}
