import { CATALOGOS_ID, Catalogo, CatalogosService, TEXTOS } from '@libs/shared/data-access-user/src';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

/**
 * @component PasoDosComponent
 * @description
 * Componente encargado de gestionar el segundo paso del trámite 130107.
 * Este paso incluye la lógica para obtener y manejar el catálogo de documentos disponibles
 * que el usuario puede seleccionar.
 * 
 * @selector app-paso-dos
 * @templateUrl ./paso-dos.component.html
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * @property destroyed$
   * @description
   * Sujeto utilizado para manejar la destrucción de observables y evitar fugas de memoria.
   * 
   * @type {Subject<void>}
   * @private
   */
  private destroyed$ = new Subject<void>();

  /**
   * @property TEXTOS
   * @description
   * Textos usados en el componente, provenientes de una fuente centralizada.
   * 
   * @type {any}
   */
  TEXTOS = TEXTOS;

  /**
   * @property catalogoDocumentos
   * @description
   * Catálogo completo de documentos disponibles para el trámite.
   * 
   * @type {Catalogo[]}
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * @constructor
   * @description
   * Constructor del componente que inyecta el servicio de catálogos.
   * 
   * @param catalogosServices Servicio inyectado para manejar operaciones relacionadas con catálogos.
   */
  constructor(public catalogosServices: CatalogosService) {}

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicializa la lista de tipos de documentos disponibles y define algunos documentos seleccionados por defecto.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * @method getTiposDocumentos
   * @description
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
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se llama cuando el componente se destruye.
   * Este método completa el observable destroyNotifier$ para cancelar las suscripciones activas.
   */
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
