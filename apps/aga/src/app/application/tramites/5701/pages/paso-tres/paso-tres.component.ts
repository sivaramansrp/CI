import { Component, OnInit } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteFolioStore } from '@ng-mf/data-access-user';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent implements OnInit {
  /**
   * @description URL de la aplicación, se utiliza para redirigir al usuario al acuse del trámite.
   */
  url: string = '';
  /**
   * @description Constructor del componente PasoTresComponent.
   * @param router - Inyecta el servicio Router para la navegación.
   * @param tramiteFolioServices - Inyecta el servicio TramiteFolioService para obtener los datos del trámite.
   * @param tramiteStore - Inyecta el store TramiteFolioStore para manejar el estado del trámite.
   */
  constructor(
    private router: Router,
    private tramiteFolioServices: TramiteFolioService,
    private tramiteStore: TramiteFolioStore
  ) {}

  /**
   * Método de ciclo de vida de Angular que se llama una vez que el componente ha sido inicializado.
   * En este método, se obtiene la URL actual del router, se separa en partes y se construye la URL base
   */
  ngOnInit(): void {
    const URL_ACTUAL = this.router.url;
    const URL_SEPARADA = URL_ACTUAL.split('/');
    this.url = URL_SEPARADA.slice(0, 3).join('/');
  }

  /**
   * Maneja el evento para obtener la firma y realiza acciones adicionales.
   * @param ev - La cadena de texto que representa la firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      // Obtiene el número de trámite
      this.tramiteFolioServices
        .generarFolio()
        .pipe(
          tap((tramite) => {   

            //TO DO: Estas líneas serán eliminadas cuando se implemente el backend
            // Aquí se simula la obtención de un número de trámite
            // Genera un número aleatorio para el folio
            const NUM_ALEATORIO = Math.floor(Math.random() * 90) + 10;    
            const FOLIO_TRAMITE = `${tramite.datos}${NUM_ALEATORIO}`;   

            this.tramiteStore.establecerTramite(FOLIO_TRAMITE, FIRMA);
            this.router.navigate([`${this.url}/acuse`]);
          }),
          catchError((_error) => {
            return _error;
          })
        )
        .subscribe();
    }
  }
}
