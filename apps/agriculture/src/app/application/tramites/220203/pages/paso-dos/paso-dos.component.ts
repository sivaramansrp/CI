import { Component, OnInit } from '@angular/core';

import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TEXTOS,

} from '@ng-mf/data-access-user';



/**
 * Componente para manejar el paso dos en el proceso de importación de acuicultura.
 * Este componente permite seleccionar los tipos de documentos necesarios para el trámite.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
})
export class PasoDosComponent implements OnInit {

  /**
   * Texto utilizado en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Tipo de alerta utilizada.
   */
  infoAlert = 'alert-info';

  /**
   * Lista de documentos disponibles para seleccionar.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados por el usuario.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Constructor que inyecta el servicio de catalogos.
   * @param catalogosServices Servicio para obtener los catalogos.
   */
  constructor(private readonly catalogosServices: CatalogosService) {
    // Constructor intentionally empty as we're only injecting services
  }

  /**
   * Método de inicialización del componente.
   * Carga los tipos de documentos disponibles para el trámite.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.documentosSeleccionados = [
      { id: 1, descripcion: 'Documentos que ampare el valor de la mercancía' },
      { id: 2, descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)' },
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
        error: (error): void => {
          // Handle error properly
          console.error('Error al cargar los documentos del catálogo:', error);
        },
      });
  }
}
