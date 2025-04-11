import {BodyTablaRequerimiento, HeaderTablaRequerimientos } from '../../../../core/models/shared/consulta-generica.model';
import { Component, OnInit } from '@angular/core';
import { CONSULTA_REQUERIMIENTOS } from '../../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { FolioQuery } from '../../../../core/queries/folio.query';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-consultarequerimientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultarequerimientos.component.html',
  styleUrl: './consultarequerimientos.component.css',
})
export class ConsultarequerimientosComponent implements OnInit {
  public folio!: string;
  /**
     * Implementación para la tabla de documentos de requerimientos.
     *
     */
    readonly encabezadoTablaRequerimiento : HeaderTablaRequerimientos[] = CONSULTA_REQUERIMIENTOS.encabezadoTablaRequerimiento;  
    readonly datosTablaRequerimiento: BodyTablaRequerimiento[] = CONSULTA_REQUERIMIENTOS.datosTablaRequerimiento;

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
       * Abre una nueva pestaña con los detalles del requerimiento.
       *
       * @param {number} id - El id del requerimiento para visualizar el detalle.
       * @returns {void}
       */
      verDetalleRequerimiento(id: number): void {
        // Aquí puedes implementar la lógica para abrir el detalle en una nueva pestaña
      }
}
