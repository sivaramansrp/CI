import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DesistimientoSolicitudPermisoComponent } from '../../component/desistimiento-solicitud-permiso/desistimiento-solicitud-permiso.component';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  imports: [CommonModule, SolicitanteComponent,DesistimientoSolicitudPermisoComponent],
  standalone: true,
})
export class PasoUnoComponent {

  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }

}