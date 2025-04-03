/**
 * @componente
 * @nombre ManifiestoDeAceptacionComponent
 * @descripcion Este componente representa el manifiesto de aceptación en el flujo de trámites.
 * Es un componente autónomo que utiliza varios módulos compartidos para mostrar información y alertas.
 * 
 * @selector app-manifiesto-de-aceptacion
 * @autonomo true
 * @plantillaUrl ./manifiesto-de-aceptacion.component.html
 * @estiloUrl ./manifiesto-de-aceptacion.component.scss
 * @importaciones [CommonModule, TituloComponent, AlertComponent]
 */
import { AlertComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TituloComponent } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-manifiesto-de-aceptacion',
  standalone: true,
  imports: [CommonModule, TituloComponent, AlertComponent],
  templateUrl: './manifiesto-de-aceptacion.component.html',
  styleUrl: './manifiesto-de-aceptacion.component.scss',
})
export class ManifiestoDeAceptacionComponent {}