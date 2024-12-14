import { Component } from '@angular/core';
import { Documento } from '../../../core/models/shared/tabla-documentos.model';
import { TituloComponent } from '../titulo/titulo.component';

@Component({
  selector: 'table-documentos',
  standalone: true,
  imports: [TituloComponent],
  templateUrl: './table-documentos.component.html',
  styleUrl: './table-documentos.component.scss',
})
export class TableDocumentosComponent {
  listaDocumentos!: Array<Documento>;

  constructor() {
    this.listaDocumentos = [
      {
        id: 1,
        value: 'Documentos que ampare el valor de la mercancía',
        cargado: false,
        acciones: {
          ver: true,
          cargar: true,
        },
        ext: 'pdf',
        tamanio: 24,
        unidad: 'MB',
      },
      {
        id: 2,
        value:
          'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)',
        cargado: false,
        acciones: {
          ver: false,
          cargar: true,
        },
        ext: 'pdf',
        tamanio: 24,
        unidad: 'MB',
      },
    ];
  }

  verDocumento(id: number) {}

  abrirVentanaCargaDoc() {

  }


}
