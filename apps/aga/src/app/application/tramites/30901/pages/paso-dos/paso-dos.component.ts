import { AlertComponent } from '@libs/shared/data-access-user/src';
import { AnexarDocumentosComponent } from '@libs/shared/data-access-user/src';
import { CATALOGOS_ID } from '@libs/shared/data-access-user/src';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { CatalogosService } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { RenovacionesMuestrasMercanciasService } from '../../services/renovaciones-muestras-mercancias/renovaciones-muestras-mercancias.service';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';

/**
 * Componente PasoDosComponent que representa el segundo paso del trámite 30901.
 */
@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [TituloComponent, AlertComponent, AnexarDocumentosComponent],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
/**  Componente PasoDosComponent que representa el segundo paso del trámite 30901. */
export class PasoDosComponent implements OnInit {
  /**
   * @description Constante que contiene los textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Array to store catalog documents.
   * Each document is of type `Catalogo`, representing an item in the catalog.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Constructor de la clase PasoDosComponent.
   *
   * @param renovacionesService - Servicio para manejar las renovaciones de muestras de mercancías.
   */
  constructor(
    public renovacionesService: RenovacionesMuestrasMercanciasService,
    private catalogosServices: CatalogosService
  ) {
    // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta una vez que el componente ha sido inicializado.
   * Aquí se llama al método `obtenerDatosIniciales` para cargar los datos necesarios al iniciar el componente.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
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
      });
  }
}
