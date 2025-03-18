/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosService } from '@libs/shared/data-access-user/src/core/services/shared/catalogos/catalogos.service';
import { CATALOGOS_ID } from '@libs/shared/data-access-user/src/tramites/constantes/constantes';
import { TEXTOS } from '@libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent {
  /**
   * Variable que almacena los textos de los componentes.
   */
  TEXTOS = TEXTOS;

  /**
   * Variable que almacena el tipo de alerta.
   */
  infoAlert = 'alert-info';

  /**
   * Variable que almacena el tipo de alerta.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Constructor del componente.
   * @param {CatalogosService} catalogosServices - Servicio para obtener los catálogos.
   */
  constructor(private catalogosServices: CatalogosService) {}

  /**
   * Método que se ejecuta al iniciar el componente
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
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
        error: (_error): void => {},
      });
  }
}
