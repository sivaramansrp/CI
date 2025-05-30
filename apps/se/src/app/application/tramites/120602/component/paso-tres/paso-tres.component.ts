import { catchError, map } from 'rxjs';
import { TramiteStore } from '../../../../estados/tramite.store';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';

import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';

/**
 * @Component
 * @selector app-paso-tres
 * @description
 * Componente `PasoTresComponent` que representa el tercer paso del trámite 120602.
 * 
 * Detalles:
 * - Utiliza el decorador `@Component` para definir las propiedades del componente.
 * - Es un componente independiente (`standalone`) que importa módulos y componentes necesarios para su funcionamiento, como `CommonModule` y `FirmaElectronicaComponent`.
 * - Renderiza la plantilla HTML asociada para mostrar el contenido y la funcionalidad del tercer paso, incluyendo la gestión de la firma electrónica.
 * 
 * Propiedades:
 * - `selector`: Define el nombre del selector del componente como `app-paso-tres`.
 * - `standalone`: Indica que el componente es independiente.
 * - `imports`: Lista de módulos y componentes importados, como `CommonModule` y `FirmaElectronicaComponent`.
 * - `templateUrl`: Ruta al archivo de plantilla HTML del componente.
 * - `styleUrl`: Ruta al archivo de estilos SCSS del componente.
 * 
 * @example
 * <app-paso-tres></app-paso-tres>
 */
@Component({
  selector: 'app-paso-tres',
  standalone: true,
  imports: [ CommonModule, 
      FirmaElectronicaComponent, ],
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})

export class PasoTresComponent {

  /**
 * @constructor
 * @description
 * Constructor del componente `PasoTresComponent`.
 * 
 * Detalles:
 * - Inyecta el servicio de enrutamiento `Router` para la navegación entre páginas.
 * - Inyecta el servicio `TramiteFolioService` para obtener el número de trámite y gestionar la firma electrónica.
 * - Inyecta el store `TramiteStore` para actualizar el estado global del trámite.
 * 
 * @param {Router} router - Servicio de Angular para la navegación.
 * @param {TramiteFolioService} tramiteFolioService - Servicio para obtener información del trámite y gestionar la firma.
 * @param {TramiteStore} tramiteStore - Store para manejar el estado global del trámite.
 */
  constructor(
    private router: Router,
    private tramiteFolioService: TramiteFolioService,
    private tramiteStore: TramiteStore
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
