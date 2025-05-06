import {CATALOGOS_ID,Catalogo,CatalogosService,TEXTOS } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent implements OnInit{
    TEXTOS = TEXTOS;
  
    tiposDocumentos: Catalogo[] = [];
    infoAlert = 'alert-info';
    catalogoDocumentos: Catalogo[] = [];
    documentosSeleccionados: Catalogo[] = [];
  
    constructor(private catalogosServices: CatalogosService,)
    // eslint-disable-next-line no-empty-function
    {
  
    }
  
    ngOnInit(): void {
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
  
    /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
   */
    getTiposDocumentos(): void {
      this.catalogosServices
        .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
        .subscribe({
          next: (resp): void => {
            if (resp.length > 0) {
              this.catalogoDocumentos = resp;
            }
          },
          error: (_error): void => { return _error; },
        });
    }
}
