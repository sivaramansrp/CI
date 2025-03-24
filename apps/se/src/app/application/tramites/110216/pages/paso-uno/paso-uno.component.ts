import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  SolicitanteComponent
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent]

})
export class PasoUnoComponent implements AfterViewInit {
  @ViewChild(SolicitanteComponent) solicitante!: SolicitanteComponent;
  indice: number = 1;

  ngAfterViewInit(): void {

  }

  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
