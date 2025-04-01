import { catchError, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteFolioStore } from '@ng-mf/data-access-user';


/**
 * Componente que representa el paso tres del trámite.
 * Este paso incluye la obtención de la firma electrónica y la gestión del trámite.
 */
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FirmaElectronicaComponent],
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent {
  /**
   * Constructor de la clase.
   * @param router Servicio para la navegación entre rutas.
   * @param tramiteFolioService Servicio para gestionar los datos del trámite.
   * @param tramiteStore Almacén para gestionar el estado del trámite.
   */
  constructor(
    private router: Router,
    private tramiteFolioService: TramiteFolioService,
    private tramiteStore: TramiteFolioStore
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

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
            // Establece el trámite en el almacén con la firma obtenida
            this.tramiteStore.establecerTramite(tramite.data, FIRMA);
            // Navega a la página de acuse
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            // Maneja errores en la obtención del trámite
            return _error;
          })
        )
        .subscribe();
    }
  }
}