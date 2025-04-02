import { Component, OnInit } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { TEXTOS_303 } from '@ng-mf/data-access-user';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit {
  TEXTOS = TEXTOS_303;

  tiposDocumentos: Catalogo[] = [];
  documentosSeleccionados: Catalogo[] = [];

  constructor(
    private catalogosServices: CatalogosService,
  ) {}

  ngOnInit() : void {
    this.getTiposDocumentos();
    this.documentosSeleccionados = [
      {
        id: 1,
        descripcion: 'Documentos que ampare el valor de la mercancía'
      },
      {
        id: 2,
        descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)'
      }
    ]

  }

  getTiposDocumentos() {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).subscribe((resp) => {
      if (resp.length > 0) {
        this.tiposDocumentos = resp;
      }
    })
  }

  agregarDocumento(id: number) {
    this.tiposDocumentos.forEach( el => {
      if (el.id === id) {
        this.documentosSeleccionados.push(el);
      }
    })
  }

  eliminar(i: number) {
    this.documentosSeleccionados.splice(i, 1)
  }
}
