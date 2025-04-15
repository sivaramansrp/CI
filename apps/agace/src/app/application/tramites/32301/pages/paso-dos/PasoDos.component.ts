import { AlertComponent, TEXTOS, TituloComponent } from "@ng-mf/data-access-user";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import documentList from '@libs/shared/theme/assets/json/32502/document-list.json';

@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, AnexarDocumentosComponent, TituloComponent, AlertComponent],
  templateUrl: './PasoDos.component.html',
  styleUrl: './PasoDos.component.css',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  TEXTOS = TEXTOS;
  
    tiposDocumentos: Catalogo[] = [];
    infoAlert = 'alert-info';
    catalogoDocumentos: Catalogo[] = [];
    documentosSeleccionados = documentList.documentosSeleccionados;
    private destroy$: Subject<void> = new Subject<void>();

     constructor(
        private catalogosServices: CatalogosService,
      ) { 
        // Constructor
      }
    
      ngOnInit(): void {
        this.getTiposDocumentos();
      }

       getTiposDocumentos(): void {
          this.catalogosServices
            .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO).pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (resp): void => {
                if (resp.length > 0) {
                  this.catalogoDocumentos = resp;
                }
              },
              error: (_error): void => {
                // Manejo de error
               },
            });
        }

      ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
      }
}
