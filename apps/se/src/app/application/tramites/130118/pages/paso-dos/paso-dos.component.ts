/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, DestroyRef, EventEmitter, Input, OnDestroy, OnInit,Output, inject } from '@angular/core';
import { Subject, map , takeUntil } from 'rxjs';

import { CATALOGOS_ID, Catalogo, CatalogosService, RespuestaCatalogos, TEXTOS } from '@ng-mf/data-access-user';
import { PeximService } from '../../service/pexim.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
/**
 * Este componente se muestra en PasaDos
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent implements OnInit, OnDestroy {

   @Input() regresarSeccionCargarDocumentoEvento!: EventEmitter<void>;

    /**
   * Escucha el evento para cargar los documentos que se emite desde <solicitud-page>.
   * @type {EventEmitter<void>}
   */
  @Input() cargaArchivosEvento!: EventEmitter<void>;
  /**
   * Textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  @Output() reenviarEvento = new EventEmitter<void>();

  @Output() reenviarRegresarSeccion = new EventEmitter<void>();

  /**
   * Clase CSS para la alerta de información.
   */
  infoAlert = 'alert-info';

  /**
   * Catálogo de documentos disponibles.
   */
  catalogoDocumentos: Catalogo[] = [];

  /**
   * Documentos seleccionados por el usuario.
   */
  documentosSeleccionados: Catalogo[] = [];

  /**
   * Subject para destruir notificador.
   */
   public destroyed$: Subject<void> = new Subject();
   
  

   /**
   * Indica si la carga de documentos se realizó correctamente.
   * @type {boolean}
   */
  cargaRealizada = false;

  @Output() reenviarCargaRealizada = new EventEmitter<boolean>();

    /**
   * Evento que se emite para indicar si existen documentos para cargar, y así activar el botón de "Cargar Archivos en <solicitud-page>".
   * Este evento se utiliza para habilitar o deshabilitar el botón de carga de archivos en <solicitud-page>.
   */
  @Output() reenviarEventoCarga = new EventEmitter<boolean>();

   /**
   * Referencia inyectada para gestionar la destrucción del componente y terminar las suscripciones.
   * @type {DestroyRef}
   */
  private destroyRef = inject(DestroyRef);


  /**
   * Constructor del componente.
   * 
   * @param catalogosServices Servicio para gestionar los catálogos.
   * @param peximService Servicio para gestionar las operaciones relacionadas con Pexim.
   */
  constructor(
    private catalogosServices: CatalogosService,
    private peximService: PeximService
  ) {
    // El constructor se utiliza para la inyección de dependencias.
  }

  /**
   * Hook del ciclo de vida que se llama después de que las propiedades enlazadas a datos de una directiva se inicializan.
   */
  ngOnInit(): void {
    this.cargaArchivosEvento
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => {
          this.reenviarEvento.emit();
        })
      )
      .subscribe();

    this.regresarSeccionCargarDocumentoEvento
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(() => {
          this.reenviarRegresarSeccion.emit();
        })
      )
      .subscribe(); 
  }

  /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (resp): void => {
          if (resp.length > 0) {
            this.catalogoDocumentos = resp;
          }
        }
      });
  }

  /**
   * Recupera la lista de documentos seleccionados.
   */
  obtenerDocumentosSeleccionados(): void {
    this.peximService.obtenerDocumentosSeleccionados()
    .pipe(takeUntil(this.destroyed$))
    .subscribe({
      next: (result: RespuestaCatalogos) => {
        this.documentosSeleccionados = result.data;
      }
    })
  }

   /**
   * Actualiza el estado de carga de documentos y emite un evento con el nuevo valor.
   * @param cargaRealizada Indica si la carga de documentos se realizó correctamente.
   * @returns void
   */
  documentosCargados(cargaRealizada: boolean): void {
    this.cargaRealizada = cargaRealizada;
    this.reenviarCargaRealizada.emit(this.cargaRealizada);
  }

  /**
   * Maneja el evento de carga de documentos y emite un evento con el estado.
   * @param existenDocumentosParaCargar - Indica si hay documentos para cargar.
   * @returns void
   */
  manejarEventoCargaDocumento(existenDocumentosParaCargar: boolean): void {
    this.reenviarEventoCarga.emit(existenDocumentosParaCargar);
  }

  /**
    * Se ejecuta al destruir el componente.
    * Emite un valor y completa el subject `destroyed$` para cancelar las suscripciones.
    */
    ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
    }
}