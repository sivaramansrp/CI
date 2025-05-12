import {
  AlertComponent,
  AnexarDocumentosComponent,
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TEXTOS,
} from '@ng-mf/data-access-user';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paso-dos', 
  templateUrl: './paso-dos.component.html', 
  styleUrls: ['./paso-dos.component.scss'], 
  standalone: true, 
  imports: [
    TituloComponent, 
    AlertComponent,
    CatalogoSelectComponent, 
    FormsModule, 
    ReactiveFormsModule,
    CommonModule, 
    AnexarDocumentosComponent ],
})
export class PasoDosComponent implements OnInit {
  /**
 * PasoDosComponent
 *  Componente que representa el segundo paso del formulario.
 * Permite al usuario seleccionar y anexar documentos necesarios para el trámite.
 */
  /**
   * texos
   *Contiene los textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * @property {Catalogo[]} tiposDocumentos
   * @description Lista de tipos de documentos disponibles para el trámite.
   */
  tiposDocumentos: Catalogo[] = [];

  /**
   * @property {string} infoAlert
   * @description Clase CSS para mostrar alertas informativas.
   * @default 'alert-info'
   */
  infoAlert = 'alert-info';

  /**
   * property {Catalogo[]} catalogoDocumentos
   * description Catálogo de documentos disponibles para el trámite.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * @property {Catalogo[]} documentosSeleccionados
   * @description Lista de documentos seleccionados por el usuario.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * constructor
   * 'description Constructor que se utiliza para la inyección de dependencias.
   * @param catalogosServices - Servicio para obtener los catálogos necesarios.
   */
  constructor(
    private catalogosServices: CatalogosService, // Servicio para manejar catálogos.
  ) {
    // Constructor vacío utilizado para la inyección de dependencias.
  }

  /**
   * method ngOnInit
   * description Método que se ejecuta al inicializar el componente.
   * Carga los tipos de documentos disponibles y establece documentos seleccionados por defecto.
   * returns {void}
   */
  ngOnInit(): void {
    this.getTiposDocumentos(); // Carga los tipos de documentos disponibles.
    this.documentosSeleccionados = [
      {
        id: 1, // Identificador del documento.
        descripcion: 'Documentos que ampare el valor de la mercancía' // Descripción del documento.
      },
      {
        id: 2, // Identificador del documento.
        descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)' // Descripción del documento.
      }
    ];
  }

  /**
   * metodo getTiposDocumentos
   * description Obtiene el catálogo de los tipos de documentos disponibles para el trámite.
   * Realiza una solicitud al servicio de catálogos y actualiza la lista de documentos disponibles.
   * returns {void}
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO) // Solicita el catálogo de tipos de documentos.
      .subscribe({
        /**
         * callback next
         * description Maneja la respuesta exitosa de la solicitud.
         * param {Catalogo[]} resp - Respuesta del servicio con el catálogo de documentos.
         */
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp; // Actualiza el catálogo de documentos.
          }
        },
        /**
         * callback error
         * description Maneja errores en la solicitud.
         * param {any} _error - Error recibido durante la solicitud.
         * returns {any} Retorna el error recibido.
         */
        error: (_error): void => {
          return _error; // Maneja errores en la solicitud.
        },
      });
  }
}