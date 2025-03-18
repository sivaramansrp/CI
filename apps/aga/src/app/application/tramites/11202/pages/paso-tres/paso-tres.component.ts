import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TramiteStore } from '../../../../estados/tramite.store';
import { Router } from '@angular/router';
import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
import { catchError, map } from 'rxjs';
import { FirmaElectronicaComponent } from "../../../../../../../../../libs/shared/data-access-user/src/tramites/components/firma-electronica/firma-electronica.component";

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoTresComponent
 * @selector app-paso-tres
 * @templateUrl ./paso-tres.component.html
 * @styleUrls ./paso-tres.component.scss --220201
 */
@Component({
  selector: 'app-paso-tres',
  standalone: true,
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss'],
  imports: [FirmaElectronicaComponent],

})
export class PasoTresComponent {

  constructor(
      private router: Router,
      private serviciosExtraordinariosServices: ServiciosExtraordinariosService,
      private tramiteStore: TramiteStore
    ) { }
 obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtiene el número de trámite
      this.serviciosExtraordinariosServices
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

/**
   * Objeto con las instrucciones.
   * @property {string} TEXTOS - Instrucciones para el usuario. --220201
   */
TEXTOS: string = TEXTOS?.INSTRUCCIONES;

}