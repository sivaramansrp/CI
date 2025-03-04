import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TituloComponent } from "../../../../../../../../libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";

@Component({
  selector: 'app-detalles-del-transporte',
  standalone: true,
  imports: [CommonModule, TituloComponent],
  templateUrl: './detalles-del-transporte.component.html',
  styleUrl: './detalles-del-transporte.component.scss',
})
export class DetallesDelTransporteComponent {}
