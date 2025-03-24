import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentosDictamenes } from '../../../core/models/shared/consulta.model';
import { URL_PRUEBA } from '../../constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'lib-dictamenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dictamenes.component.html',
  styleUrl: './dictamenes.component.css',
})
export class DictamenesComponent implements OnInit {
  /**
     * Lista de documentos cargados.
     */
    documentosCargados: DocumentosDictamenes[] = [];
    readonly url: string = URL_PRUEBA;
  
    ngOnInit(): void {
      this.documentosCargados = [
        {
          fechaCreacion: '2025-03-01',
          fechaGeneracion: '2025-03-02',
          fechaAutorizacion: '2025-03-03',
          tipo: 'Acta de nacimiento',
          estatus: 'Autorizado',
          sentido: 'Positivo',
          detalle: true
        },
        {
          fechaCreacion: '2025-03-05',
          fechaGeneracion: '2025-03-06',
          fechaAutorizacion: '2025-03-07',
          tipo: 'Comprobante de domicilio',
          estatus: 'Pendiente',
          sentido: 'Negativo',
          detalle: false
        },
        {
          fechaCreacion: '2025-03-10',
          fechaGeneracion: '2025-03-11',
          fechaAutorizacion: '2025-03-12',
          tipo: 'Identificación oficial',
          estatus: 'Rechazado',
          sentido: 'Negativo',
          detalle: true
        },
        {
          fechaCreacion: '2025-03-15',
          fechaGeneracion: '2025-03-16',
          fechaAutorizacion: '2025-03-17',
          tipo: 'CURP',
          estatus: 'Autorizado',
          sentido: 'Positivo',
          detalle: false
        },
        {
          fechaCreacion: '2025-03-20',
          fechaGeneracion: '2025-03-21',
          fechaAutorizacion: '2025-03-22',
          tipo: 'RFC',
          estatus: 'Pendiente',
          sentido: 'Positivo',
          detalle: true
        }
      ];
    }
  
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
