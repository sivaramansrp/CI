import {
  AlertComponent,
  AnexarDocumentosComponent,
  CATALOGOS_ID,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Catalogo, CatalogosService, TEXTOS } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente que representa el segundo paso del trámite.
 * Permite al usuario anexar documentos necesarios para el trámite.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
    AnexarDocumentosComponent,
  ],
})
export class PasoDosComponent implements OnInit {
  /**
   * Textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos disponibles para el trámite.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Clase CSS para mostrar una alerta informativa.
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo de documentos disponibles.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados por el usuario.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Constructor del componente.
   * @param catalogosServices Servicio para obtener los catálogos necesarios para el trámite.
   */
  constructor(private catalogosServices: CatalogosService) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los tipos de documentos disponibles y establece los documentos seleccionados por defecto.
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
   * Obtiene el catálogo de los tipos de documentos disponibles para el trámite.
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
        error: (_error): void => {
          // Manejo de error al obtener los tipos de documentos.
        },
      });
  }
}
