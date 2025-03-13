import { Component, Inject } from '@angular/core';
import { catchError, map } from 'rxjs';
import { Router } from '@angular/router';
import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
import { TramiteAgaceStore } from '../../../../estados/tramite.store';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.css',
})
export class PasoTresComponent {
  /**
   * Tipo de persona.
   */
  tipoPersona!: number;

  /**
   * Constructor que se utiliza para la inyección de dependencias.
   * @param router Servicio de enrutamiento.
   * @param serviciosExtraordinariosServices Servicio de servicios extraordinarios.
   * @param tramiteStore Almacén de trámites.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: ServiciosExtraordinariosService,
    @Inject(TramiteAgaceStore) private tramiteStore: TramiteAgaceStore
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Obtiene el tipo de persona.
   * @param tipo Tipo de persona.
   */
  obtenerTipoPersona(tipo: number): void {
    this.tipoPersona = tipo;
  }

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
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
}
