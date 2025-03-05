import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-tres',
  standalone: true,
  imports: [CommonModule, FirmaElectronicaComponent],
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
})
export class PasoTresComponent {
  constructor(private router: Router) {
    // Constructor
  }

  obtieneFirma(ev: string) {
    const firma: string = ev;
    if (firma) {
      this.router.navigate(['servicios-extraordinarios/acuse']);
    }
  }
}
