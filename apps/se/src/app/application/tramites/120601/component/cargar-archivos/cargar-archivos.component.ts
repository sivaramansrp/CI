import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { AlertComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * @description
 * `CargarArchivosComponent` is responsible for displaying an alert message
 * regarding the temporary request number when uploading files.
 */
@Component({
  selector: 'app-cargar-archivos',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent],
  templateUrl: './cargar-archivos.component.html',
  styleUrl: './cargar-archivos.component.scss',
})
export class CargarArchivosComponent {
  /**
   * @property {string} cargararchivos - Message displayed to inform users
   * about the temporary request number.
   */
  cargararchivos: string = "La solicitud ha quedado registrada con el número temporal 202759017. Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.";
}
