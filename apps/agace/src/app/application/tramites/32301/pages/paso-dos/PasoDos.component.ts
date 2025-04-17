import { AlertComponent, TEXTOS, TituloComponent } from "@ng-mf/data-access-user";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import documentList from '@libs/shared/theme/assets/json/32301/document-list.json';

@Component({
  selector: 'app-paso-dos', // Selector del componente
  standalone: true, // El componente es independiente, sin necesidad de un módulo externo
  imports: [CommonModule, ReactiveFormsModule, AnexarDocumentosComponent, TituloComponent, AlertComponent], // Importación de otros componentes y módulos
  templateUrl: './PasoDos.component.html', // Ruta al archivo HTML
  styleUrl: './PasoDos.component.css', // Ruta al archivo de estilos CSS
})
export class PasoDosComponent implements OnInit, OnDestroy {
  TEXTOS = TEXTOS; // Constantes de textos definidas en otro lugar
  
  tiposDocumentos: Catalogo[] = []; // Lista de tipos de documentos
  infoAlert = 'alert-info'; // Clase CSS para mostrar alertas de información
  catalogoDocumentos: Catalogo[] = []; // Catálogo de documentos
  documentosSeleccionados = documentList.documentosSeleccionados; // Lista de documentos seleccionados desde un archivo JSON
  private destroy$: Subject<void> = new Subject<void>(); // Sujeto para manejar el ciclo de vida y evitar fugas de memoria

  constructor(
    private catalogosServices: CatalogosService, // Servicio para obtener los catálogos
  ) { 
    // Constructor
  }

  /** Método para inicializar el componente */
  ngOnInit(): void {
    this.getTiposDocumentos(); // Llamada al servicio para obtener los tipos de documentos
  }

  /** Método para obtener los tipos de documentos desde el catálogo */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO) // Llamada al servicio para obtener el catálogo de tipos de documentos
      .pipe(takeUntil(this.destroy$)) // Suscripción con control de destrucción para evitar fugas de memoria
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp; // Asignar los tipos de documentos obtenidos
          }
        },
        error: (_error): void => {
          // Manejo de error
          console.error('Error al obtener los tipos de documentos', _error);
        },
      });
  }

  /** Método para limpiar los recursos al destruir el componente */
  ngOnDestroy(): void {
    this.destroy$.next(); // Emitir señal para completar la destrucción
    this.destroy$.complete(); // Completar el sujeto
  }
}
