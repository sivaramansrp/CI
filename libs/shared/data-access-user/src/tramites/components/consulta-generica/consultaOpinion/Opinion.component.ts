import { BodyTablaOpiniones, HeaderTablaOpiniones } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnInit } from '@angular/core';
import { CONSULTA_OPINIONES } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { FolioQuery } from '../../../../core/queries/folio.query';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-opinion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Opinion.component.html',
  styleUrl: './Opinion.component.css',
})
export class OpinionComponent implements OnInit {
  public folio!: string;
  /**
   * Implementación para la tabla de documentos de Opiniones.
   *
   */
  readonly encabezadoTablaOpinion : HeaderTablaOpiniones[] = CONSULTA_OPINIONES.encabezadoTablaOpinion;  
  readonly datosTablaOpinion: BodyTablaOpiniones[] = CONSULTA_OPINIONES.datosTablaOpinion;

  constructor(private router: Router, private folioQuery: FolioQuery) {
      // constructor por si lo requiremos en el futuro
    }

    ngOnInit(): void {
        // Recuperar el folio desde el store
      this.folioQuery.getFolio().subscribe(folio => {
        this.folio = folio || '';
      });
    }
    
    /**
     * Abre una pestaña del navegador con los detalles de la opinion.
     *
     * @param {number} id - ID de la opinion.
     * @returns {void}
     */
    verDetalleOpinion(id: number): void {
      this.router.navigate(['/lib-detalle-opinion', id]);
    }
}
