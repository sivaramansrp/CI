import { Component, OnInit } from '@angular/core';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit {
  TEXTOS = TEXTOS;
  catalogoDocumentos: Catalogo[] = [];

  constructor(private catalogosServices: CatalogosService) {}

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
            console.log(this.catalogoDocumentos);
          }
        },
        error: (_error): void => {},
      });
  }
}
