import { Component, OnInit, OnDestroy } from '@angular/core';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';
import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { Subject } from 'rxjs';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  TEXTOS = TEXTOS;

  tiposDocumentos: Catalogo[] = [];
  infoAlert = 'alert-info';
  catalogoDocumentos: Catalogo[] = [];
  documentosSeleccionados: Catalogo[] = [];
  destroyed$ = new Subject<boolean>();

  constructor(
    private catalogosServices: CatalogosService,
  ) { }

  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
