import { AlertComponent, AnexarDocumentosComponent, CATALOGOS_ID,Catalogo, CatalogosService, TEXTOS, TituloComponent } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';

/**
 * PasoDosComponent.
 * Este componente se encarga de gestionar la lógica del segundo paso en el flujo de servicios extraordinarios.
 * Muestra los tipos de documentos disponibles y permite seleccionar los documentos requeridos para el trámite.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  standalone: true,
  imports: [
    AlertComponent,
    AnexarDocumentosComponent,
    TituloComponent
  ],
})
export class PasoDosComponent implements OnInit {
  /**
   * Textos de la aplicación que serán utilizados para mostrar contenido en la interfaz.
   */
  TEXTOS = TEXTOS;

  /**
   * Lista de tipos de documentos obtenidos del catálogo.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * Clase CSS para definir el tipo de alerta.
   * Valor predeterminado: 'alert-info'.
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo completo de documentos disponibles.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados por el usuario.
   * Inicializado con documentos preseleccionados.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Constructor de PasoDosComponent.
   * @param catalogosServices Servicio para interactuar con los catálogos.
   */
  constructor(private catalogosServices: CatalogosService) {
    // Inicialización del componente
    this.getTiposDocumentos();
  }

  /**
   * Ciclo de vida de Angular: ngOnInit.
   * Se ejecuta al inicializar el componente.
   * Obtiene los tipos de documentos y establece documentos preseleccionados.
   */
  ngOnInit(): void {
    this.documentosSeleccionados = [
      {
        id: 1,
        descripcion: 'Documentos que ampare el valor de la mercancía',
      },
      {
        id: 2,
        descripcion:
          'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)',
      },
    ];
  }

  /**
   * Obtiene los tipos de documentos disponibles para el trámite desde el catálogo.
   * Actualiza la propiedad `catalogoDocumentos` con los datos obtenidos.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .subscribe({
        next: (respuesta): void => {
          if (respuesta.length > 0) {
            this.catalogoDocumentos = respuesta;
          }
        },
      });
  }
}
