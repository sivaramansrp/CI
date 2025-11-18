import {
  EventEmitter,
  Input,
} from '@angular/core';

import { AlertComponent, CargaDocumentoComponent, Catalogo, TableData, TipoDocumentos, TituloComponent, Usuario } from '@libs/shared/data-access-user/src';
import { Component, DestroyRef, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/certificado-zoosanitario.enum';

import { Subject, map, takeUntil } from 'rxjs';

import { CatalogoDocumentosService } from '@libs/shared/data-access-user/src/core/services/shared/catalogos/catalogo-documentos.service';




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
  imports: [TituloComponent, AlertComponent, CargaDocumentoComponent]
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

/**
   * Id del tipo de trámite actual.
   */
  @Input() idTipoTRamite!: string;
  /**
   * Id de la solicitud actual.
   */
  @Input() idSolicitud!: string;
  /**
   * Servicio para gestionar los catálogos.
   */
  @Input() datosUsuario!: Usuario;
  /**
   * Evento que se emite para reenviar la solicitud de carga de documentos.
   * Este evento se utiliza para notificar a otros componentes que se debe realizar una acción de carga de documentos.
   */
  reenviarEvento = new EventEmitter<void>();
  /**
   * Escucha el evento para cargar los documentos que se emite desde <solicitud-page>.
   * @type {EventEmitter<void>}
   */
  @Input() cargaArchivosEvento!: EventEmitter<void>;
  /**
   * Indica si la carga de documentos se realizó correctamente.
   * @type {boolean}
   */
  cargaRealizada = false;
  /**
   * Evento que se emite para indicar si la carga de documentos se ha realizado.
   * Este evento se utiliza para notificar a otros componentes que la carga de documentos ha finalizado.
   */
  @Output() reenviarCargaRealizada = new EventEmitter<boolean>();

  /**
   * Evento que se emite para indicar si existen documentos para cargar, y así activar el botón de "Cargar Archivos en <solicitud-page>".
   * Este evento se utiliza para habilitar o deshabilitar el botón de carga de archivos en <solicitud-page>.
   */
  @Output() reenviarEventoCarga = new EventEmitter<boolean>();
  /** Carga del progreso del archivo */
  cargaEnProgreso: boolean = true;
  /** Emite un boleano sobre la carga del archivo */
  @Output() cargaEnProgresoChange = new EventEmitter<boolean>();

  @Output() reenviarRegresarSeccion = new EventEmitter<void>();


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
    this.cargaArchivosEvento
      .pipe(
        takeUntil(this.destroyNotifier$),
        map(() => {
          this.reenviarEvento.emit();
        })
      )
      .subscribe();
  }

  documentosCargados(cargaRealizada: boolean): void {
    this.cargaRealizada = cargaRealizada;
    this.reenviarCargaRealizada.emit(this.cargaRealizada);
  }

  manejarEventoCargaDocumento(existenDocumentosParaCargar: boolean): void {
    this.reenviarEventoCarga.emit(existenDocumentosParaCargar);
  }

  /**
   * Maneja el evento de carga en progreso emitido por un componente hijo.
   * Actualiza el estado de cargaEnProgreso según el valor recibido.
   * @param carga Valor booleano que indica si la carga está en progreso.
   */
  onCargaEnProgreso(carga: boolean): void {
    this.cargaEnProgreso = carga;
    this.cargaEnProgresoChange.emit(this.cargaEnProgreso);
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