import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibBandejaComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'ng-mf-bandeja-de-tareas-pendientes',
  standalone: true,
  imports: [CommonModule,LibBandejaComponent],
  templateUrl: './bandeja-de-tareas-pendientes.component.html',
  styleUrl: './bandeja-de-tareas-pendientes.component.scss',
})
export class BandejaDeTareasPendientesComponent {}
