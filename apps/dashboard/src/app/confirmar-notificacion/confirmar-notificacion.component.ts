import { AcuseReciboComponent } from '../acuse-recibo/acuse-recibo.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DetallesFolioComponent } from '../detalles-folio/detalles-folio.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { NotificacionActoAdministrativoComponent } from '../notificacion-acto-administrativo/notificacion-acto-administrativo.component';
import { Router } from '@angular/router';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'ng-mf-confirmar-notificacion',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    DetallesFolioComponent,
    NotificacionActoAdministrativoComponent,
    AcuseReciboComponent,
    FirmaElectronicaComponent,
  ],
  templateUrl: './confirmar-notificacion.component.html',
  styleUrl: './confirmar-notificacion.component.css',
})
export class ConfirmarNotificacionComponent {
  indiceDePaso = 1;
  constructor(private router: Router) {
    const CURRENT_NAVIGATION = this.router.getCurrentNavigation();
    if (CURRENT_NAVIGATION?.extras.state?.['isAcuseRecibo']) {
      this.indiceDePaso = 3;
    }
  }
  alContinuar(): void {
    this.indiceDePaso = this.indiceDePaso + 1;
  }
  obtieneFirma(ev: string): void {
    this.indiceDePaso = 3;
  }
  cerrar(): void {
    this.router.navigate(['/bandeja-de-tareas-pendientes']);
  }
}
