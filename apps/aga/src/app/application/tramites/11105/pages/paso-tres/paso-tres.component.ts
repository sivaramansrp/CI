import {
  CatalogoSelectComponent,
  TituloComponent,
  TramiteFolioService,
} from '@ng-mf/data-access-user';
import { catchError, map } from 'rxjs';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { TramiteFolioStore } from '@ng-mf/data-access-user';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    ReactiveFormsModule,
    CatalogoSelectComponent,
    FirmaElectronicaComponent,
  ],
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent {
  constructor(
    private router: Router,
    private tramiteFolioService: TramiteFolioService,
    private tramiteStore: TramiteFolioStore
  ) {}

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtiene el número de trámite
      this.tramiteFolioService
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.tramiteStore.establecerTramite(tramite.data, FIRMA);
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            return _error;
          })
        )
        .subscribe();
    }
  }
}
