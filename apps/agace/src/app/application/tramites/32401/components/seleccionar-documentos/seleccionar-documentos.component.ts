import { AlertComponent } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-seleccionar-documentos',
  standalone: true,
  imports: [
    AlertComponent,
    CommonModule,
    AnexarDocumentosComponent,
    TituloComponent,
  ],
  templateUrl: './seleccionar-documentos.component.html',
  styleUrl: './seleccionar-documentos.component.scss',
})
export class SeleccionarDocumentosComponent implements OnInit, OnDestroy {
  TEXTOS = TEXTOS;
  tiposDocumentos: Catalogo[] = [];
  infoAlert = 'alert-info';
  catalogoDocumentos: Catalogo[] = [];
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private catalogosServices: CatalogosService) {
    // Constructor
  }

  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        error: (_error): void => {
          return _error;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
