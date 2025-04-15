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

/**
 * Componente para la selección de documentos.
 * Permite obtener y gestionar los tipos de documentos disponibles.
 */
@Component({
  /**
   * Selector utilizado para identificar el componente en el HTML.
   */
  selector: 'app-seleccionar-documentos',
  /**
   * Define el componente como autónomo (standalone).
   */
  standalone: true,
  /**
   * Importa los módulos y componentes necesarios para el funcionamiento.
   * Incluye componentes de alerta, anexar documentos, y títulos.
   */
  imports: [
    AlertComponent,
    CommonModule,
    AnexarDocumentosComponent,
    TituloComponent,
  ],
  /**
   * Ruta del archivo HTML que define la estructura del componente.
   */
  templateUrl: './seleccionar-documentos.component.html',
  /**
   * Ruta del archivo SCSS que define los estilos del componente.
   */
  styleUrl: './seleccionar-documentos.component.scss',
})
/**
 * Componente para la selección de documentos.
 * Permite obtener y gestionar los tipos de documentos disponibles.
 */
export class SeleccionarDocumentosComponent implements OnInit, OnDestroy {
  /** Textos compartidos utilizados en el componente. */
  TEXTOS = TEXTOS;
  
  /** Lista de tipos de documentos obtenidos desde el catálogo. */
  tiposDocumentos: Catalogo[] = [];
  
  /** Clase CSS utilizada para mostrar una alerta informativa. */
  infoAlert = 'alert-info';
  
  /** Catálogo de documentos obtenidos desde el servicio. */
  catalogoDocumentos: Catalogo[] = [];
  
  /** Subject utilizado para notificar la destrucción del componente y evitar fugas de memoria. */
  private destroy$: Subject<void> = new Subject<void>();
  
  /**
   * Constructor del componente.
   * Inicializa el servicio de catálogos.
   * @param catalogosServices Servicio para interactuar con los catálogos.
   */
  constructor(private catalogosServices: CatalogosService) {
     // Constructor vacío, se puede agregar lógica adicional si es necesario
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Obtiene los tipos de documentos disponibles.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Método para obtener los tipos de documentos desde el catálogo.
   * Utiliza el servicio de catálogos para obtener la información.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        /** 
         * En caso de éxito, almacena los documentos en el catálogo. 
         */
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        /** 
         * En caso de error, devuelve el error recibido.
         */
        error: (_error): void => {
          return _error;
        },
      });
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Libera recursos y completa el Subject para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
