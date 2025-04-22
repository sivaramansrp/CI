import { CATALOGOS_ID, Notificacion } from '@ng-mf/data-access-user';
import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// eslint-disable-next-line @nx/enforce-module-boundaries
import documentosOpcionales from 'libs/shared/theme/assets/json/shared/documentosOpcionales.json';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})
export class PasoDosComponent implements OnInit {
  @Input() cargaArchivosEvento!: EventEmitter<void>;
  @Output() reenviarEvento = new EventEmitter<void>();

  private destroyRef = inject(DestroyRef)


  TEXTOS = TEXTOS;

  tiposDocumentos: Catalogo[] = [];

  infoAlert = 'alert-info';
  catalogoDocumentos: Catalogo[] = [];
  catalogoDocumentosOpcionales: Catalogo[] = documentosOpcionales.documentosOpcionales
  cargaRealizada = false;

  public alertaNotificacion: Notificacion = {
    tipoNotificacion: 'banner',
    categoria: 'warning',
    modo: 'action',
    titulo: '',
    mensaje: TEXTOS.INSTRUCCIONES,
    cerrar: true,
    txtBtnAceptar: '',
    txtBtnCancelar: '',
  }



  constructor(
    private catalogosServices: CatalogosService,) { }

  ngOnInit(): void {
    this.getTiposDocumentos();
    this.cargaArchivosEvento.pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.reenviarEvento.emit();
      });
  }

  /**
   * Obtiene el catalgoso de los tipos de documentos disponibles para el trámite.
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
        error: (_error): void => { return _error; },
      });
  }

  documentosCargados(cargaRealizada: boolean): void {
    this.cargaRealizada = cargaRealizada;
  }
}
