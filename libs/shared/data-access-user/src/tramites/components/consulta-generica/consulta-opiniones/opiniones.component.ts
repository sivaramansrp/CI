import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleOpinionComponent } from "../consulta-detalle-opinion/detalle-opinion.component";
import { FolioQuery } from '../../../../core/queries/folio.query';
import { OpinionComponent } from "../consulta-opinion/opiniones.component";

@Component({
  selector: 'lib-opiniones',
  standalone: true,
  imports: [CommonModule, DetalleOpinionComponent, OpinionComponent],
  templateUrl: './opiniones.component.html',
  styleUrl: './opiniones.component.scss',
})
export class OpinionesComponent implements OnInit {
  /**
   * Variable para almacenar el folio
   */
  public folio!: string;
  constructor(private folioQuery: FolioQuery) {
    /**
     * Se inyecta el FolioQuery para recuperar el folio desde el store
     * Se inyecta el HeaderTablaOpiniones y BodyTablaOpiniones para crear la tabla de opiniones
     * Se inyecta el CONSULTA_OPINIONES para crear la tabla de opiniones
     * Se inyecta el Validators para validar los campos del formulario
     */
  }
  ngOnInit(): void {
      /**
       * Recuperar el folio desde el store
       */
      this.folioQuery.getFolio().subscribe(folio => {
        this.folio = folio || '';
      });
  }
  /**
   * Índice de la pestaña seleccionada
   */
  indice: number = 1;
  
  /**
   * Método para seleccionar la pestaña
   * @param i indica el número de la pestaña seleccionada
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}