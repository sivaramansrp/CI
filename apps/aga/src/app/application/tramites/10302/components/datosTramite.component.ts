import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-datos-tramite',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './datosTramite.component.html',
  styleUrl: './datosTramite.component.scss',
})
export class DatosTramiteComponent {}
