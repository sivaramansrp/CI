import { CATALOGOS_ID, TEXTOS, Catalogo, CatalogosService } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
})
export class PasoDosComponent implements OnInit {
  /**
   * Constante que contiene los textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Arreglo que contiene los tipos de documentos disponibles.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Clase CSS para mostrar una alerta informativa.
   */
  infoAlert = 'alert-info';

  /**
   * Arreglo que contiene el catálogo de documentos disponibles.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Arreglo que contiene los documentos seleccionados.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Constructor del componente.
   * @param catalogosServices Servicio para obtener los catálogos.
   */
  constructor(
    private catalogosServices: CatalogosService
  ) { }

  /**
   * Método de inicialización del componente.
   * Se ejecuta al inicializar el componente y obtiene los tipos de documentos.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
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
          console.error('Error al obtener el catálogo de tipos de documentos', _error);
        },
      });
  }
}
