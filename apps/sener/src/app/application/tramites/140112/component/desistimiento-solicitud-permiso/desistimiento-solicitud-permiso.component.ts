import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisosCancelarComponent } from '../permisos-cancelar/permisos-cancelar.component';

@Component({
  selector: 'app-desistimiento-solicitud-permiso',
  standalone: true,
  imports: [CommonModule,PermisosCancelarComponent],
  templateUrl: './desistimiento-solicitud-permiso.component.html',
  styleUrl: './desistimiento-solicitud-permiso.component.scss',
})
export class DesistimientoSolicitudPermisoComponent {}
