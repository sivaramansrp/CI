import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TEXTOS,

} from '@ng-mf/data-access-user';
import { DOCUMENTOSSELECCIONADOS } from '../../constantes/220203/importacion-de-acuicultura.enum';
import { Subject } from 'rxjs';



/**
 * Componente para manejar el paso dos en el proceso de importación de acuicultura.
 * Este componente permite seleccionar los tipos de documentos necesarios para el trámite.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
})
export class PasoDosComponent implements OnInit, OnDestroy {

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

  private destroyNotifier$ = new Subject<void>();
  /**
   * Constructor que inyecta el servicio de catalogos.
   * @param catalogosServices Servicio para obtener los catalogos.
   */
  constructor(private readonly catalogosServices: CatalogosService) {
    // Constructor intentionally empty as we're only injecting services
  }

  /**
   * Método de inicialización del componente.
   * Carga los tipos de documentos disponibles para el trámite.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
    this.documentosSeleccionados = DOCUMENTOSSELECCIONADOS;
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
        },
        error: (error): void => {
          // Handle error properly
          console.error('Error al cargar los documentos del catálogo:', error);
        },
      });
  }
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
