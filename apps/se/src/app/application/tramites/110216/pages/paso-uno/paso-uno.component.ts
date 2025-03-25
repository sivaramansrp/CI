import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  SolicitanteComponent
} from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent, DatosCertificadoComponent]

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
