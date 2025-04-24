import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-doc',
  templateUrl: './paso-doc.component.html',
  styleUrl: './paso-doc.component.scss',
})
export class PasoDocComponent {
  /**
   * Constructor del componente.
   * @param router Servicio de enrutamiento.
   */
  constructor(private router: Router
    
  ) {
    // Inicializa el componente.
  }

  /**
   * Obtiene la firma y navega a la página de acuse si la firma es válida.
   * @param {string} ev - La firma obtenida.
   */
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}
