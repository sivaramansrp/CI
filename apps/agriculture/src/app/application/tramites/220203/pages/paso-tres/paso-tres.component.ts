import {
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TEXTOS
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { DOCUMENTOSSELECCIONADOS } from '../../constantes/220203/importacion-de-acuicultura.enum';
/**
 * Componente para manejar el paso tres en el proceso de importación de acuicultura.
 * Este componente permite seleccionar los tipos de documentos necesarios para el trámite.
 */
@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrls: ['./paso-tres.component.scss']
})
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
   * @type {typeof TEXTOS}
   */
  TEXTOS = TEXTOS;

  /**
   * Tipo de alerta utilizada.
   * @type {string}
   */
  infoAlert = 'alert-info';

  /**
   * Lista de documentos disponibles para seleccionar.
   * @type {Catalogo[]}
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados por el usuario.
   * @type {Catalogo[]}
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Constructor que inyecta el servicio de catálogos.
   * @param {CatalogosService} catalogosServices Servicio para obtener los catálogos.
   */
  constructor(private readonly catalogosServices: CatalogosService) {
    //constructor
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
   * Realiza una solicitud al servicio de catálogos para cargar los tipos de documentos.
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
          console.error('Error al obtener los documentos del catálogo:', error);
        }
      });
  }

  /**
   * Método que se ejecuta cuando el componente es destruido.
   * Limpia las suscripciones y recursos del componente.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
