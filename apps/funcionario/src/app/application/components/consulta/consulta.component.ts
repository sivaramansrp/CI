import { BandejaComponent } from "../../../../../../../libs/shared/data-access-user/src/tramites/components/bandeja/bandeja.component";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [CommonModule, BandejaComponent],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
})
export class ConsultaComponent {}
