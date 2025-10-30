import {
  EventEmitter,
} from '@angular/core';

import { AlertComponent, AnexarDocumentosComponent, CargaDocumentoComponent, Catalogo, Documento, TableData, TipoDocumentos, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component, DestroyRef, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/certificado-zoosanitario.enum';

import { Subject, map, takeUntil } from 'rxjs';
import { CatalogoDocumentosService } from '@libs/shared/data-access-user/src/core/services/shared/catalogos/catalogo-documentos.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



/**
 * @fileoverview Componente para mostrar el subtítulo y los requisitos del asistente en el paso dos del trámite.
 * Incluye la visualización de textos de ayuda y el componente para anexar documentos.
 * @module PasoDosComponent
 */

/**
 * Componente para mostrar el subtítulo del asistente y los requisitos en el paso dos.
 * @component PasoDosComponent
 * @selector app-paso-dos
 * @templateUrl ./paso-dos.component.html
 * @styleUrls ./paso-dos.component.scss
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
  standalone: true,
  imports: [TituloComponent, AlertComponent, AnexarDocumentosComponent, CargaDocumentoComponent]
})
export class PasoDosComponent implements OnInit, OnDestroy {

  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS
   * @description Textos para los requisitos del certificado zoosanitario, incluyendo instrucciones y mensajes de ayuda.
   */
  TEXTOS = TEXTOS_REQUISITOS;

  /**
   * Datos de la tabla que contiene los encabezados y el cuerpo de la tabla.
   * @property {Array<any>} tableHeader - Encabezados de la tabla.
   * @property {Array<any>} tableBody - Cuerpo de la tabla.
   */
  tableData: TableData = {
    /**
     * Encabezados de la tabla.
     */
    tableHeader: [],
    /**
     * Cuerpo de la tabla.
     */
    tableBody: [],
  };
  private destroyNotifier$ = new Subject<void>();
  /**
   * Array para almacenar los documentos del catálogo.
   * Cada documento es de tipo `Catalogo`, representando un ítem en el catálogo.
   */
  catalogoDocumentos: Catalogo[] = [];

  catalogoDocumentosOpcionales: TipoDocumentos[] = [];

  private destroyRef$ = inject(DestroyRef);

  @Output() reenviarEvento = new EventEmitter<void>();
  @Output() reenviarRegresarSeccion = new EventEmitter<void>();
  @Output() reenviarCargaRealizada = new EventEmitter<boolean>();
  @Output() reenviarEventoCarga = new EventEmitter<boolean>();

  cargaRealizada = false;

  /**
     * Constructor de la clase PasoDosComponent.
     * 
     * @param catalogosServices - Servicio para manejar los catálogos.
     */
  constructor(
    private catalogosServices: CatalogoDocumentosService,
  ) {
    // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta una vez que el componente ha sido inicializado.
   * Aquí se llama al método `getTiposDocumentos` para cargar los datos necesarios al iniciar el componente.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.getListaDocumentoOpcionales();
  }


  // eslint-disable-next-line class-methods-use-this, no-empty-function
  getListaDocumentoOpcionales(): void {
    console.warn('Cargando documentos opcionales...');
  }

  documentosCargados(cargaRealizada: boolean): void {
    this.cargaRealizada = cargaRealizada;
    this.reenviarCargaRealizada.emit(this.cargaRealizada);
  }

  manejarEventoCargaDocumento(existenDocumentosParaCargar: boolean): void {
    this.reenviarEventoCarga.emit(existenDocumentosParaCargar);
  }

  /**
    * Método que se ejecuta al destruir el componente.
    * 
    * @memberof PasoDosComponent
    */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}