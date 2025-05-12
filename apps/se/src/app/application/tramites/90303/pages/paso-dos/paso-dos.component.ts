import { Catalogo, CatalogosService, TEXTOS } from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import {CATALOGOS_ID } from '@ng-mf/data-access-user';

/**
 * Componente que representa el segundo paso del trámite.
 * Permite al usuario anexar documentos necesarios para el trámite.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  standalone: false,
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * ReplaySubject utilizado para gestionar la destrucción de observables.
   * Se emite un valor cuando el componente se destruye para cancelar las suscripciones activas.
   */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /**
   * Textos utilizados en el componente.
   * Contiene mensajes y etiquetas que se muestran en la interfaz de usuario.
   */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos disponibles para el trámite.
   * Cada elemento representa un tipo de documento que el usuario puede anexar.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Clase CSS para mostrar una alerta informativa.
   * Se utiliza para estilizar mensajes de alerta en la interfaz.
   */
  claseAlertaInformativa = 'alert-info';

  /**
   * Catálogo de documentos disponibles.
   * Contiene los documentos que el usuario puede seleccionar para anexar.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Constructor del componente.
   * @param catalogosServices Servicio para obtener los catálogos necesarios para el trámite.
   */
  constructor(private catalogosServices: CatalogosService) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los tipos de documentos disponibles y establece los documentos seleccionados por defecto.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene el catálogo de los tipos de documentos disponibles para el trámite.
   * Llama al servicio de catálogos y actualiza la lista de documentos disponibles.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
        error: (_error): void => {
          // Manejo de error al obtener los tipos de documentos.
        },
      });
  }

  /**
   * Método de limpieza que se ejecuta cuando el componente se destruye.
   * Cancela las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
