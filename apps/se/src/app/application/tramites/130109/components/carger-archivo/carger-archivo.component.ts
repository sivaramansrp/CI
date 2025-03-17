import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-carger-archivo',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './carger-archivo.component.html',
  styleUrl: './carger-archivo.component.scss',
})
export class CargerArchivoComponent {
  /**
   * @constructor
   * @param {Location} location - Servicio de ubicación para gestionar la navegación del historial.
   * @param {Router} router - Servicio de enrutamiento para la navegación entre páginas.
   */
  constructor(private location: Location, private router: Router) {
    // Constructor necesario para la inyección de dependencias
  }

  /**
   * @method navegar
   * @descripcion Método para regresar a la página anterior con parámetros de consulta.
   */
  navegar(): void {
    this.router.navigate(['/pago/importacion/vehiculos-usados-adaptados'], {
      queryParams: { indice: 2 },
    });
  }
}
