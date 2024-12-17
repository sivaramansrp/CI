import { Component } from '@angular/core';
import { Documento } from '../../../core/models/shared/tabla-documentos.model';

@Component({
  selector: 'table-documentos',
  standalone: true,
  imports: [],
  templateUrl: './table-documentos.component.html',
  styleUrl: './table-documentos.component.scss',
})
export class TableDocumentosComponent {
  listaDocumentos!: Array<Documento>;
  documento!: Documento | undefined;
  tituloCanvas!: string;

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

  verDocumento(id: number) {
    this.documento = this.listaDocumentos.find((el: Documento) => el.id === id);
  }

  get mostrarBtn () {
    return this.tituloCanvas === 'Adjuntar' ? true : false;
  }

  abrirVentana(accion: string) {
    switch (accion) {
      case 'v':
        console.log('ver documento');
        this.tituloCanvas = 'Ver';

        break;

      case 'a':
        console.log('adjuntar documento');
        this.tituloCanvas = 'Adjuntar';

      break;
      default:
        break;
    }
  }

  adjuntar() {}

  abrirVentanaVerDoc() {

  }

  leerDocumento(e: any) {

  }
}
