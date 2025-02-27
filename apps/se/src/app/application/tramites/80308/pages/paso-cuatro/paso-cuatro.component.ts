import { Component } from '@angular/core';
import { FirmaElectronicaComponent } from "@ng-mf/data-access-user";
import { Router } from '@angular/router';

/**
 * Este componente se utiliza para mostrar el subtítulo del asistente - 220201
 * Establecer el índice del subtítulov
 */
@Component({
  selector: 'app-paso-cuatro',
  templateUrl: './paso-cuatro.component.html',
  styleUrl: './paso-cuatro.component.scss',
  standalone: true,
  imports: [FirmaElectronicaComponent],
  host: { 'hostID': crypto.randomUUID().toString()}
})
export class PasoCuatroComponent {
constructor(private router: Router) {}

  obtieneFirma(ev: string){
    if (ev) {
      this.router.navigate(['servicios-extraordinarios/acuse']);

    }
  }
}
