/* eslint-disable @typescript-eslint/no-empty-function */
import { CATALOGOS_ID,Catalogo, CatalogosService, TEXTOS } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';



/**
 * @fileoverview Componente para la gestión del paso dos.
 * Este componente maneja la lógica y la presentación del segundo paso del proceso,
 * incluyendo la inicialización de textos y la gestión de los controles del formulario.
 * @module pasoDos --80207
 */

/**
 * Componente para la gestión del paso dos.
 * @class PasoDosComponent --80207
 */

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})

export class PasoDosComponent implements OnInit {
//  /**
//    * Textos de requisitos.
//    * @property {string} TEXTOS
//    */
//   TEXTOS = TEXTOS_REQUISITOS;

TEXTOS = TEXTOS;

  tiposDocumentos: Catalogo[] = [];
  infoAlert = 'alert-info';
  catalogoDocumentos: Catalogo[] = [];
  documentosSeleccionados: Catalogo[] = [];

  constructor(
    private catalogosServices: CatalogosService
  ) { 
    //Necesito inyectar los servicios a través del constructor, de modo que el constructor esté vacío.
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
      });
  }

}
