import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarequerimientosComponent } from "../consultaRequerimientos/consultarequerimientos.component";
import { FolioQuery } from '../../../../core/queries/folio.query';

@Component({
  selector: 'lib-requerimientospaso1',
  standalone: true,
  imports: [CommonModule, ConsultarequerimientosComponent],
  templateUrl: './requerimientospaso1.component.html',
  styleUrl: './requerimientospaso1.component.css',
})
export class Requerimientospaso1Component implements OnInit{
  public folio!: string;   

  constructor(private folioQuery: FolioQuery) {
    // Componente para consulta de envio digital
  }
  ngOnInit(): void {
    // Recuperar el folio desde el store
    this.folioQuery.getFolio().subscribe(folio => {
      this.folio = folio || '';
    });
  }
  indice: number = 1;
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
