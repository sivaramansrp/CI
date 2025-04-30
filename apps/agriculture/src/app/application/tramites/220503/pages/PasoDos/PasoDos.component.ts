import {
  AlertComponent,
  TEXTOS,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { INFO_ALERT } from '../../enums/texto-enum';
import { ReactiveFormsModule } from '@angular/forms';
import documentList from '@libs/shared/theme/assets/json/220503/document-list.json';


@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AnexarDocumentosComponent,
    TituloComponent,
    AlertComponent,
  ],
  templateUrl: './PasoDos.component.html',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Referencia a una constante de textos predefinidos en otra parte del código.
   */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos disponibles dentro del sistema.
   * Se inicializa como un array vacío y será poblado con datos posteriormente.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Clase CSS utilizada para mostrar alertas de información en la interfaz de usuario.
   */
  infoAlert = INFO_ALERT;

  /**
   * Catálogo de documentos que almacena distintos tipos de documentos disponibles.
   * Se inicia como un array vacío y se llenará con información en tiempo de ejecución.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados obtenidos desde un archivo JSON.
   * Se almacena dentro de `documentList.documentosSeleccionados`.
   */
  documentosSeleccionados = documentList.documentosSeleccionados;

  /**
   * Sujeto para manejar el ciclo de vida de la suscripción.
   * Se utiliza para evitar fugas de memoria al momento de destruir observables.
   */
  private destroy$: Subject<void> = new Subject<void>();

  /**
   * Constructor de la clase.
   * Se inyecta el servicio `CatalogosService` para acceder a los catálogos del sistema.
   */
  constructor(private catalogosServices: CatalogosService) {
    /**
     * Inicialización del constructor de la clase.
     */
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
