
import { CATALOGOS_ID,Catalogo, CatalogosService, TEXTOS } from '@libs/shared/data-access-user/src';
import { Component, OnInit } from '@angular/core';

/**
 * Componente para la gestión del paso dos.
 * Este componente maneja la lógica y la presentación del segundo paso del proceso,
 * incluyendo la inicialización de textos y la gestión de los controles del formulario.
 * @export
 * @class PasoDosComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit {
  /**
   * Textos de requisitos utilizados en el componente.
   * @property {string} TEXTOS
   */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos disponibles.
   * @property {Catalogo[]} tiposDocumentos
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Información de alerta utilizada en el componente.
   * @property {string} infoAlert
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo de documentos disponibles para el trámite.
   * @property {Catalogo[]} catalogoDocumentos
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados por el usuario.
   * @property {Catalogo[]} documentosSeleccionados
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Constructor del componente.
   * Inyecta los servicios necesarios para la gestión de catálogos.
   * @param {CatalogosService} catalogosServices - Servicio para obtener catálogos.
   */
  constructor(private catalogosServices: CatalogosService) {}

  /**
   * Método de inicialización del componente.
   * Obtiene los tipos de documentos y establece los documentos seleccionados por defecto.
   * @returns {void}
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
   * @returns {void}
   */
  getTiposDocumentos(): void {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).subscribe({
      next: (resp): void => {
        if (resp.length > 0) {
          this.catalogoDocumentos = resp;
        }
      },
    });
  }
}