import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrl: './paso-cuatro.component.scss'
})
export class PasoCuatroComponent {
  constructor(private router: Router) {
    // Constructor del componente
  }
  obtieneFirma(ev: string): void {
    const FIRMA: string = ev;
    if (FIRMA) {
      this.router.navigate(['servicios-extraordinarios/acuse']); // Navegación a la página de acuse
    }
  }
}
