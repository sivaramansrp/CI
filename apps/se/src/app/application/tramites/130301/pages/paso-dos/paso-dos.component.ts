import { CATALOGOS_ID, Catalogo, CatalogosService, TEXTOS } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

/**
 * Componente para gestionar el paso dos del trámite.
 * Este componente permite al usuario seleccionar tipos de documentos disponibles para el trámite.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Sujeto utilizado para manejar la destrucción de observables.
   * Este objeto se utiliza para evitar pérdidas de memoria al cancelar suscripciones activas.
   * 
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * Textos usados en el componente, provenientes de una fuente centralizada.
   */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos disponibles para selección.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Clase de estilo para mensajes de alerta informativa.
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo completo de documentos disponibles.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Constructor del componente.
   * 
   * @param {CatalogosService} catalogosServices Servicio para obtener los catálogos necesarios.
   */
  constructor(public catalogosServices: CatalogosService) {}

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa la lista de tipos de documentos disponibles y define algunos documentos seleccionados por defecto.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene el catálogo de tipos de documentos disponibles para el trámite.
   * Este método realiza una solicitud al servicio de catálogos para cargar la lista
   * de documentos disponibles que el usuario podrá seleccionar.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (resp): void => {
          // Si la respuesta tiene documentos, los almacena en catalogoDocumentos
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        error: (_error): void => {
          // Manejo de errores, actualmente vacío pero puede ser implementado
        },
      });
  }

  /**
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable `destroyed$` para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}