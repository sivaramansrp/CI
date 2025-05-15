import { AcusesYResolucionesFolioDelTramiteDetallesComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'ng-mf-acuses-y-resoluciones-folio-del-tramite-detalles-contenedor',
  standalone: true,
  imports: [CommonModule, AcusesYResolucionesFolioDelTramiteDetallesComponent],
  templateUrl:
    './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component.html',
  styleUrl:
    './acuses-y-resoluciones-folio-del-tramite-detalles-contenedor.component.css',
})
export class AcusesYResolucionesFolioDelTramiteDetallesContenedorComponent {
  procedureRegresorUrl = '/subsecuentes';
  procedureUrl = '/aga/importante/datosdelasolicitud';
}
