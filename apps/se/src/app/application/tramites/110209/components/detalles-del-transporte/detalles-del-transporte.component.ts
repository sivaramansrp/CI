import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TituloComponent } from "@ng-mf/data-access-user";

@Component({
  selector: 'app-detalles-del-transporte',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './detalles-del-transporte.component.html',
  styleUrl: './detalles-del-transporte.component.scss',
})
/**
 * Componente que representa los detalles del transporte.
 */
export class DetallesDelTransporteComponent {}