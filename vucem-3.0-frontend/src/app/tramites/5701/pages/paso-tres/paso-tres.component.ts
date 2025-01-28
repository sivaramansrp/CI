import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosExtraordinariosService } from '../../../../core/services/5701/servicios-extraordinarios/servicios-extraordinarios.service';
import { TramiteStore } from '../../../../estados/tramite.store';
import { catchError, map } from 'rxjs';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent {
  constructor(
    private router: Router,
    private sercviciosExtraordinariosServices: ServiciosExtraordinariosService,
    private tramiteStore: TramiteStore
  ) {}



  obtieneFirma(ev: string) {
    const firma: string = ev;
    if (firma) {
      // Obtiene el número de trámite
      this.sercviciosExtraordinariosServices
        .obtenerTramite(19)
        .pipe(
          map((tramite) => {
            this.tramiteStore.establecerTramite(tramite.data, firma);
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((error) => {
            console.log(error);
            return error;
          })
        )
        .subscribe();
    }
  }


}
