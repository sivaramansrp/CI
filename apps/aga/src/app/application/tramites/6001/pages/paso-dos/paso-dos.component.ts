/* eslint-disable sort-imports */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { RegistroCuentasBancariasService } from '../../services/registro-cuentas-bancarias.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent {

  constructor(
    private router: Router,
    private _registroCuentasBancariasSvc: RegistroCuentasBancariasService,
  ) {
    //
   }


    /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
    obtieneFirma(ev: string): void {
      const FIRMA: string = ev;
      if (FIRMA) {
        // Obtiene el número de trámite
        this._registroCuentasBancariasSvc
          .obtenerTramite(19)
          .pipe(
            map((tramite) => {
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
