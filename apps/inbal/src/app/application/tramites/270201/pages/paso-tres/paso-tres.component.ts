import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FirmaElectronicaComponent } from '@libs/shared/data-access-user/src';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-tres',
  standalone: true,
  imports: [CommonModule,FirmaElectronicaComponent],
  templateUrl: './paso-tres.component.html',
})
export class PasoTresComponent {
constructor(private router: Router){
  // Constructor del componente
}

obtieneFirma(ev: string): void {
  const FIRMA: string = ev;
  if (FIRMA) {
    this.router.navigate(['servicios-extraordinarios/acuse']); // Navegación a la página de acuse
  }
}
}
