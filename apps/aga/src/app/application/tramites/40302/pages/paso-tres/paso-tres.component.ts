import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';


@Component({
  selector: 'app-paso-tres',
  standalone: true,
  imports: [CommonModule,FirmaElectronicaComponent],
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
