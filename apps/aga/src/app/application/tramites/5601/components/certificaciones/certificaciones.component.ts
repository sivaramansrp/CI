import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TituloComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-certificaciones',
  standalone: true,
  imports: [CommonModule,TituloComponent],
  templateUrl: './certificaciones.component.html',
  styleUrl: './certificaciones.component.css',
})
export class CertificacionesComponent {}
