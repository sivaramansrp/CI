import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoResponse } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

/**
 * Componente para gestionar el paso dos del trámite.
 */
@Component({
  selector: 'paso-dos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
  ],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit {
  /**
   * Textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Clase CSS para la alerta de información.
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo de documentos disponibles.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Documentos seleccionados por el usuario.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Constructor del componente.
   *
   * @param catalogosServices Servicio para gestionar los catálogos.
   */
  constructor(private catalogosServices: CatalogosService) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.documentosSeleccionados = [
      {
        id: 1,
        descripcion: 'Documentos que ampare el valor de la mercancía',
      },
      {
        id: 2,
        descripcion:
          'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)',
      },
    ];
  }

  /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (resp: CatalogoResponse[]): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
      });
  }
}
