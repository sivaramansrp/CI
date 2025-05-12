import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TEXTOS,
} from '@libs/shared/data-access-user/src';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Componente que representa el segundo paso del proceso de solicitud.

 */
@Component({
  selector: 'app-paso-dos',
  standalone: false,
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /** Textos usados en el componente, provenientes de una fuente centralizada. */
  TEXTOS = TEXTOS;

  /** Lista de tipos de documentos disponibles para selección. */
  tiposDocumentos: Catalogo[] = [];

  /** Clase de estilo para mensajes de alerta informativa. */
  infoAlert = 'alert-info';

  /** Catálogo completo de documentos disponibles. */
  catalogoDocumentos: Catalogo[] = [];

  /** Suscripción para manejar la respuesta del servicio. */
  private subscription: Subscription | null = null;

  /**
   * Constructor del componente.
   *
   * @param catalogosServices Servicio para obtener los catálogos necesarios.
   */
  constructor(
    @Inject(CatalogosService) private catalogosServices: CatalogosService
  ) {
    // Dependencia inyectada para uso posterior
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   *
   * Inicializa la lista de tipos de documentos disponibles.
   */
  ngOnInit(): void {
    this.subscription = this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
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
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   *
   * Libera la suscripción activa para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
