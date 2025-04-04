import { BodyTablaDictamenes, HeaderTablaDictamenes } from '../../../core/models/shared/consulta-generica.model';
import { CONSULTA_DICTAMENES } from '../../../core/enums/consulta-generica.enum';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'lib-dictamenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dictamenes.component.html',
  styleUrl: './dictamenes.component.css',
})
export class DictamenesComponent {
  /**
     * Implementación para la tabla de documentos de requerimientos.
     *
     */
    readonly encabezadoTablaDictamen : HeaderTablaDictamenes[] = CONSULTA_DICTAMENES.encabezadoTablaDictamen;  
    readonly datosTablaDictamen: BodyTablaDictamenes[] = CONSULTA_DICTAMENES.datosTablaDictamen;
  
    /**
    * Abre un archivo PDF en una nueva pestaña del navegador.
    *
    * @param {string} url - La URL del archivo PDF que se va a abrir.
    * @returns {void}
    */
    verPdf(url: string): void {
      window.open(url, '_blank');
    }
}
