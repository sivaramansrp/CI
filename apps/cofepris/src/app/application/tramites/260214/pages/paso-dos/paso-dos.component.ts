import {
  AlertComponent,
  AnexarDocumentosComponent,
  CATALOGOS_ID,
  Catalogo,
  CatalogosService,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TEXTOS_REQUISITOS } from '../../constants/medicos-uso.enum';


@Component({
  selector: 'app-paso-dos',
  standalone: true,
  imports: [
    CommonModule,
    AlertComponent,
    TituloComponent,
    AnexarDocumentosComponent,
  ],
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.css',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  TEXTOS = TEXTOS_REQUISITOS;
  tiposDocumentos: Catalogo[] = [];
  infoAlert = 'alert-info';
  catalogoDocumentos: Catalogo[] = [];
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Notificador utilizado para manejar la destrucción o desuscripción de observables.
   * Se usa comúnmente para limpiar suscripciones cuando el componente es destruido.
   *
   * @property {Subject<void>} destroyNotifier$
   */
  private destroyNotifier$: Subject<void> = new Subject();

  constructor(private catalogosServices: CatalogosService) {
    // Necesito inyectar los servicios a través del constructor, de modo que el constructor esté vacío.
  }

  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        },
      });
  }
  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Limpia las suscripciones y actualiza los BehaviorSubject para ocultar las tablas.
   * @method ngOnDestroy
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
