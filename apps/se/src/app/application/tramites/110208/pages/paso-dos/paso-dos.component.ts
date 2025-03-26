import { catchError, map, Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosPantallaService } from 'libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteStore } from '../../../../estados/tramite.store';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent implements OnDestroy {
    /**
       * property {Subject<void>} destroyed$
       * description Sujeto utilizado para manejar la destrucción de observables.
       * private
       */
    private destroyed$ = new Subject<void>();
    /**
     * Constructor del componente.
     *
     * @param router - Servicio de enrutamiento para la navegación.
     * @param serviciosExtraordinariosServices - Servicio para manejar trámites extraordinarios.
     * @param TramiteStore - Store para gestionar el estado del trámite.
     */
    constructor(
      private router: Router,
      private serviciosExtraordinariosServices: ServiciosPantallaService,
      private TramiteStore: TramiteStore
    ) {
      // Constructor
    }
   
    /**
     * Maneja el evento para obtener la firma del usuario.
     * Si la firma es válida, obtiene el trámite correspondiente
     * y redirige a la pantalla de acuse.
     *
     * @param ev - La cadena de texto que representa la firma obtenida.
     */
    obtieneFirma(ev: string): void {
      const firma: string = ev;
   
      if (firma) {
        // Obtiene el número de trámite y establece el trámite en el store
        this.serviciosExtraordinariosServices
          .obtenerTramite(19)
          .pipe(
            map((tramite) => {
              this.TramiteStore.establecerTramite(tramite.data, firma);
              // Redirige a la pantalla de acuse
              this.router.navigate(['servicios-extraordinarios/acuse']);
            }),
            catchError((_error) => {
              return _error;
            }),
            takeUntil(this.destroyed$) 
          )
          .subscribe();
      }
    }
    
    /**
     * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
     * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
     */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
}
