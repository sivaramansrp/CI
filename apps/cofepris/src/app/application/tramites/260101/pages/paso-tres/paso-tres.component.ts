import { FirmaElectronicaComponent, TramiteFolioService } from '@ng-mf/data-access-user';
import { catchError, map } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Componente PasoTresComponent.
 * Este componente gestiona el tercer paso en el flujo de servicios extraordinarios, permitiendo la obtención de firma y la navegación al acuse.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
  standalone:true,
  imports:[
      FirmaElectronicaComponent
    ]
})
export class PasoTresComponent {

  /**
   * Constructor de PasoTresComponent.
   * Inicializa servicios necesarios para la navegación y la gestión de trámites extraordinarios.
   * @param router - Servicio para la navegación entre rutas.
   * @param serviciosExtraordinariosServices - Servicio para interactuar con la lógica de trámites extraordinarios.
   */
  constructor(
    private router: Router,
    private serviciosExtraordinariosServices: TramiteFolioService,
  ) { 
    // Inicialización
  }

  /**
   * Maneja el evento de obtención de firma y realiza la navegación al acuse si la firma es válida.
   * @param ev - Cadena de texto que representa la firma obtenida desde el evento.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev; // Asignación de la firma desde el evento
    if (FIRMA) {
      // Llamada al servicio para obtener el número de trámite
      this.serviciosExtraordinariosServices
        .obtenerTramite(19) // ID de trámite
        .pipe(
          map(() => {
            // Navegación al acuse si el trámite es exitoso
            this.router.navigate(['servicios-extraordinarios/acuse']);
          }),
          catchError((_error) => {
            // Manejo de errores en caso de fallo
            return _error;
          })
        )
        .subscribe(); // Suscripción al observable para ejecutar la lógica
    }
  }
}
