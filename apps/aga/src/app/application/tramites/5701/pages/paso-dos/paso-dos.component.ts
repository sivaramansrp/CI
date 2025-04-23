import { CATALOGOS_ID, CatalogoDocumento, Notificacion } from '@ng-mf/data-access-user';
import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CatalogosService } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// eslint-disable-next-line @nx/enforce-module-boundaries
import documentosOpcionales from 'libs/shared/theme/assets/json/shared/documentosOpcionales.json';
// eslint-disable-next-line @nx/enforce-module-boundaries
import documentosObligatorios from 'libs/shared/theme/assets/json/shared/documentosObligatorios.json';
import { map } from 'rxjs';

@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})
export class PasoDosComponent implements OnInit {
  @Input() cargaArchivosEvento!: EventEmitter<void>;
  @Input() regresarSeccionCargarDocumentoEvento!: EventEmitter<void>;

  @Output() reenviarEvento = new EventEmitter<void>();
  @Output() reenviarRegresarSeccion = new EventEmitter<void>();
  @Output() reenviarEventoCarga = new EventEmitter<boolean>();

  private destroyRef = inject(DestroyRef)


  TEXTOS = TEXTOS;

  tiposDocumentos: CatalogoDocumento[] = [];

  infoAlert = 'alert-info';
  catalogoDocumentos: CatalogoDocumento[] = documentosObligatorios.documentosObligatorios;
  catalogoDocumentosOpcionales: CatalogoDocumento[] = documentosOpcionales.documentosOpcionales
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
    this.cargaArchivosEvento.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(() => {
        this.reenviarEvento.emit();
      }))
      .subscribe();

    this.regresarSeccionCargarDocumentoEvento.pipe(
      takeUntilDestroyed(this.destroyRef),
      map(() => {
        this.reenviarRegresarSeccion.emit();
      })
    ).subscribe();
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

  manejarEventoCargaDocumento(existenDocumentosParaCargar: boolean): void {
    this.reenviarEventoCarga.emit(existenDocumentosParaCargar);
  }
}
