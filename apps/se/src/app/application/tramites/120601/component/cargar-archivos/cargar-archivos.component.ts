import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-cargar-archivos',
  standalone: true,
  imports: [CommonModule, AlertComponent, TituloComponent],
  templateUrl: './cargar-archivos.component.html',
  styleUrl: './cargar-archivos.component.scss',
})
export class CargarArchivosComponent {
  cargararchivos: string = "La solicitud ha quedado registrada ei numero temporal 202759017. Este no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio official le sera asignado a la solicitud al momento en que esta sea firmada.";

}
