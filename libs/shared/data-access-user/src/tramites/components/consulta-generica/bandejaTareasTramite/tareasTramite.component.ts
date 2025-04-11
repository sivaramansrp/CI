import { BodyTablaTareasTramite, HeaderTablaTareasTramite } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnInit } from '@angular/core';
import { CONSULTA_TAREASTRAMITE } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { FolioQuery } from '../../../../core/queries/folio.query';

@Component({
  selector: 'lib-tareas-tramite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareasTramite.component.html',
  styleUrl: './tareasTramite.component.css',
})
export class TareasTramiteComponent implements OnInit{
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
  /**
       * Implementación para la tabla de documentos de requerimientos.
       *
       */
      readonly encabezadoTablaTareasTramite : HeaderTablaTareasTramite[] = CONSULTA_TAREASTRAMITE.encabezadoTablaTareasTramite;  
      readonly datosTablaTareasTramite: BodyTablaTareasTramite[] = CONSULTA_TAREASTRAMITE.datosTablaTareasTramite;                
}