import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleOpinionComponent } from "../consultaDetalleOpinion/DetalleOpinion.component";
import { FolioQuery } from '../../../../core/queries/folio.query';
import { OpinionComponent } from "../consultaOpinion/Opinion.component";

@Component({
  selector: 'lib-opiniones',
  standalone: true,
  imports: [CommonModule, DetalleOpinionComponent, OpinionComponent],
  templateUrl: './Opiniones.component.html',
  styleUrl: './Opiniones.component.css',
})
export class OpinionesComponent implements OnInit {
  public folio!: string;
  constructor(private folioQuery: FolioQuery) {
    // constructor por si lo requiremos en el futuro
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
