import { Component } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';

import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';

import { TEXTOS_REQUISITOS } from '../../constants/importacion-armas-municiones.enum';

/**
 * @component PasoDosComponent
 * @description Componente responsable de gestionar el segundo paso del procedimiento.
 * Administra los requisitos documentales, consulta catálogos desde el servicio y gestiona la selección de documentos por parte del usuario.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {
  /**
   * @property TEXTOS
   * @description Contiene los textos literales estáticos utilizados en este paso del formulario.
   * @type {typeof TEXTOS_REQUISITOS}
   */
  public TEXTOS = TEXTOS_REQUISITOS;

  /**
   * @property tiposDocumentos
   * @description Almacén local para los tipos de documentos utilizados en este paso.
   * @type {Catalogo[]}
   */
  public tiposDocumentos: Catalogo[] = [];

  /**
   * @property infoAlert
   * @description Tipo de alerta de Bootstrap utilizada para mostrar mensajes informativos.
   * @type {string}
   */
  public infoAlert = 'alert-info';

  /**
   * @property catalogoDocumentos
   * @description Contiene el catálogo de tipos de documentos obtenido desde el API.
   * @type {Catalogo[]}
   */
  public catalogoDocumentos: Catalogo[] = [];

  /**
   * @property documentosSeleccionados
   * @description Lista de documentos que el usuario ha seleccionado.
   * @type {Catalogo[]}
   */
  public documentosSeleccionados: Catalogo[] = [];

  /**
   * @property destroyNotifier$
   * @description Notificador utilizado para cancelar suscripciones cuando se destruye el componente.
   * Previene fugas de memoria.
   * @type {Subject<void>}
   */
  private destroyNotifier$: Subject<void> = new Subject();

  /**
   * @constructor
   * @description Inyecta el servicio de catálogos necesario para obtener datos desde el API.
   * @param catalogosServices Servicio para obtener datos de catálogo requeridos en el formulario.
   */
  constructor(private catalogosServices: CatalogosService) {
    // Las dependencias son inyectadas. No se requiere lógica adicional aquí.
  }

  /**
   * @method ngOnInit
   * @description Hook del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Inicia la obtención de tipos de documentos.
   * @returns {void}
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * @method getTiposDocumentos
   * @description Consulta el catálogo de tipos de documentos requeridos para el trámite.
   * Si la respuesta es válida, actualiza la lista `catalogoDocumentos`.
   * @returns {void}
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
   * @method ngOnDestroy
   * @description Hook del ciclo de vida de Angular que se ejecuta justo antes de que el componente sea destruido.
   * Libera recursos cancelando las suscripciones activas para prevenir fugas de memoria.
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
