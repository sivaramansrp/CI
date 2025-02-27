import { Component } from '@angular/core';
import { CATALOGOS_ID } from 'libs/shared/data-access-user/src/tramites/constantes/constantes';
import { TEXTOS } from 'libs/shared/data-access-user/src/tramites/constantes//servicios-extraordinarios.enum';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosService } from 'libs/shared/data-access-user/src/core/services/shared/catalogos/catalogos.service';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  TEXTOS = TEXTOS;
  infoAlert = 'alert-info';
  catalogoDocumentos: Catalogo[] = [];
  documentosSeleccionados: Catalogo[] = [];

  constructor(private readonly catalogosServices: CatalogosService) { }

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
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        error: (_error): void => { },
      });
  }
}
