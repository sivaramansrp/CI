import { Catalogo, CATALOGOS_ID, CatalogosService, TEXTOS_303 } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';

/**
 * Componente que representa el paso dos del trámite.
 * Gestiona la selección y manejo de documentos requeridos.
 */
@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit {
  /** Textos utilizados en el componente. */
  TEXTOS = TEXTOS_303;

  /** Sujeto para manejar la destrucción de observables. */
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** Lista de tipos de documentos disponibles. */
  tiposDocumentos: Catalogo[] = [];

  /** Lista de documentos seleccionados por el usuario. */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Constructor del componente.
   * @param catalogosServices Servicio para obtener los catálogos de datos.
   */
  constructor(
    private catalogosServices: CatalogosService,
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene los tipos de documentos y establece documentos seleccionados por defecto.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.documentosSeleccionados = [];
  }

  /**
   * Método para obtener los tipos de documentos desde el servicio de catálogos.
   * Actualiza la lista de `tiposDocumentos` con los datos obtenidos.
   */
  getTiposDocumentos(): void {
    this.catalogosServices.getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((resp) => {
        if (resp.length > 0) {
          this.tiposDocumentos = resp;
        }
      });
  }

  /**
   * Método para agregar un documento a la lista de documentos seleccionados.
   * @param id Identificador del documento a agregar.
   */
  agregarDocumento(id: number): void {
    this.tiposDocumentos.forEach(el => {
      if (el.id === id) {
        this.documentosSeleccionados.push(el);
      }
    });
  }

  /**
   * Método para eliminar un documento de la lista de documentos seleccionados.
   * @param i Índice del documento a eliminar.
   */
  eliminar(i: number): void {
    this.documentosSeleccionados.splice(i, 1);
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * Completa el sujeto `destroyed$` para liberar recursos.
   */
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
