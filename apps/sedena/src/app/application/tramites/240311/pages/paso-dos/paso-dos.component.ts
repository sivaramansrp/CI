import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TEXTOS_REQUISITOS } from '../../constants/solicitude-de-artificios-pirotecnicos.enum';
import { takeUntil } from 'rxjs';

/**
 * Componente responsable de gestionar el paso dos del trámite.
 * Se encarga de los requisitos de documentos, obtiene catálogos y administra la selección de documentos por el usuario.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * Contiene los textos estáticos utilizados en este paso del formulario.
   */
  public TEXTOS = TEXTOS_REQUISITOS;

  /**
   * Arreglo local para los tipos de documentos utilizados en este paso.
   */
  public tiposDocumentos: Catalogo[] = [];

  /**
   * Tipo de alerta Bootstrap utilizada para mostrar mensajes informativos.
   */
  public infoAlert = 'alert-info';

  /**
   * Catálogo de tipos de documentos obtenido desde la API.
   */
  public catalogoDocumentos: Catalogo[] = [];

  /**
   * Lista de documentos seleccionados por el usuario.
   */
  public documentosSeleccionados: Catalogo[] = [];

  /**
   * Notificador utilizado para cancelar las suscripciones a observables cuando el componente se destruye.
   * Previene fugas de memoria.
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * Servicio inyectado para obtener datos de catálogos desde el backend.
   * @param catalogosServices Servicio para obtener catálogos.
   */
  constructor(private catalogosServices: CatalogosService) {
    // Las dependencias se inyectan aquí. No se requiere lógica de inicialización.
  }

  /**
   * Hook de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicia la obtención de los tipos de documentos.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene el catálogo de tipos de documentos para el trámite.
   * Si la respuesta contiene elementos, actualiza la lista local de documentos.
   */
  public getTiposDocumentos(): void {
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
   * Hook de ciclo de vida de Angular que se ejecuta justo antes de destruir el componente.
   * Limpia las suscripciones activas para evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}