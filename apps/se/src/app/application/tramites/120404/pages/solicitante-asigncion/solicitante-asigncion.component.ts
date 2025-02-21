import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitantetabComponent } from '../../component/solicitantetab/solicitantetab.component';
import { AsignciontabComponent } from '../../component/asignciontab/asignciontab.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
@Component({
  selector: 'app-solicitante-asigncion',
  standalone: true,
  imports: [CommonModule,SolicitantetabComponent,AsignciontabComponent,SolicitanteComponent],
  templateUrl: './solicitante-asigncion.component.html',
  styleUrl: './solicitante-asigncion.component.scss',
})
export class SolicitanteAsigncionComponent {

  indice: number = 1;

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
