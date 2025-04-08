import { catchError, map } from 'rxjs';
import { TramiteStore } from '../../../../estados/tramite.store';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';

import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-tres',
  standalone: true,
  imports: [ CommonModule, 
      FirmaElectronicaComponent, ],
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {

  constructor(
    private router: Router,
    private tramiteFolioService: TramiteFolioService,
    private tramiteStore: TramiteStore
  // eslint-disable-next-line no-empty-function
  ) { }

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
