import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatosDelTramiteComponent } from '../../../../shared/components/datos-del-tramite/datos-del-tramite.component';

@Component({
  selector: 'app-datos-del-tramite-contenedora',
  standalone: true,
  imports: [CommonModule, DatosDelTramiteComponent],
  templateUrl: './datos-del-tramite-contenedora.component.html',
  styleUrl: './datos-del-tramite-contenedora.component.css',
})
export class DatosDelTramiteContenedoraComponent {}
