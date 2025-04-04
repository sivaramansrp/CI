import {BodyTablaRequerimiento, HeaderTablaRequerimientos } from '../../../core/models/shared/consulta-generica.model';
import { CONSULTA_REQUERIMIENTOS } from '../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-consultarequerimientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultarequerimientos.component.html',
  styleUrl: './consultarequerimientos.component.css',
})
export class ConsultarequerimientosComponent {
  /**
     * Implementación para la tabla de documentos de requerimientos.
     *
     */
    readonly encabezadoTablaRequerimiento : HeaderTablaRequerimientos[] = CONSULTA_REQUERIMIENTOS.encabezadoTablaRequerimiento;  
    readonly datosTablaRequerimiento: BodyTablaRequerimiento[] = CONSULTA_REQUERIMIENTOS.datosTablaRequerimiento;

    constructor(private router: Router) {
        // constructor por si lo requiremos en el futuro
      }
      
      /**
       * Abre un archivo PDF en una nueva pestaña del navegador.
       *
       * @param {string} url - La URL del archivo PDF que se va a abrir.
       * @returns {void}
       */
      verDetalleRequerimiento(url: string): void {
        window.open(url, '_blank');
      }
}
