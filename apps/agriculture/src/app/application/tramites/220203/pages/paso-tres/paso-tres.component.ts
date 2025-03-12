import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TEXTOS
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * Componente para manejar el paso tres en el proceso de importación de acuicultura.
 * Este componente permite seleccionar los tipos de documentos necesarios para el trámite.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss']
})
export class PasoTresComponent implements OnInit, OnDestroy {
  private destroyNotifier$ = new Subject<void>();
  /**
   * Texto utilizado en el componente.
   */
  TEXTOS = TEXTOS;
  /**
   * Tipo de alerta utilizada.
   */
  infoAlert = 'alert-info';
  /**
   * Lista de documentos disponibles para seleccionar.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados por el usuario.
   */
  documentosSeleccionados: Catalogo[] = [];
  constructor(private readonly catalogosServices: CatalogosService) {
    console.log('CatalogosService has been injected');
  }
  /**
   * Método de inicialización del componente.
   * Carga los tipos de documentos disponibles para el trámite.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.documentosSeleccionados = [
      { id: 1, descripcion: 'Documentos que ampare el valor de la mercancía' },
      { id: 2, descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)' },
    ];
  }
  /**
   * Obtiene el catálogo de los tipos de documentos disponibles para el trámite.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        }
      });
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
