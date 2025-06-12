import { Catalogo, CatalogosService } from '@libs/shared/data-access-user/src';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { TEXTOS_REQUISITOS } from '../../constantes/certificado-zoosanitario.enum';

/**
 * Componente para mostrar el subtítulo del asistente.
 * @component PasoDosComponent
 * @selector app-paso-dos
 * @templateUrl ./paso-dos.component.html
 * @styleUrls ./paso-dos.component.scss
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss']
})
export class PasoDosComponent implements OnInit, OnDestroy {

  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS_REQUISITOS - Textos para los requisitos del certificado zoosanitario. --220201
   */
  TEXTOS = TEXTOS_REQUISITOS;
  /**
   * Catálogo de documentos disponibles.
   * 
   * Contiene los documentos obtenidos desde el servicio de catálogos.
   */
  catalogoDocumentos: Catalogo[] = [];
  /**
   * Notificador para destruir las suscripciones y evitar fugas de memoria.
   * 
   * Este `Subject` se utiliza para cancelar las suscripciones activas cuando
   * el componente se destruye.
   */
  private destroy$: Subject<void> = new Subject<void>();
  /**
   * Propaga al componente <anexar-documentos> el evento para disparar el metodo confirmUpload en <anexar-documentos>.
   */
  @Output() reenviarEvento = new EventEmitter<void>();
  @Output() regresarSeccionCargarDocumentoEvento = new EventEmitter<void>()
  /**
   * Constructor del componente.
   * 
   * @param {CatalogosService} catalogosServices - Servicio para obtener los catálogos de documentos.
   */
  constructor(public catalogosServices: CatalogosService) {
    // Constructor vacío
  }

  /**
   * Método que se ejecuta al inicializar el componente.
   * 
   * Este método llama a `getTiposDocumentos` para obtener los tipos de documentos disponibles.
   */
  ngOnInit(): void {
    this.getTiposDocumentos();
  }

  /**
   * Obtiene los tipos de documentos desde el servicio de catálogos.
   * 
   * Este método realiza una solicitud al servicio de catálogos para obtener
   * los documentos disponibles y los almacena en `catalogoDocumentos`.
   */
  getTiposDocumentos(): void {
    this.catalogosServices
      .getCatalogo(CATALOGOS_ID.CAT_TIPO_DOCUMENTO)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: Catalogo[]) => {
        this.catalogoDocumentos = resp;
      });
  }

  /**
   * Método que se ejecuta al destruir el componente.
   * 
   * Este método completa el `Subject` `destroy$` para cancelar todas las suscripciones activas
   * y evitar fugas de memoria.
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}