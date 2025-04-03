import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-paso-tres',
  standalone: false,
  templateUrl: './paso-tres.component.html',
})
export class PasoTresComponent {

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
