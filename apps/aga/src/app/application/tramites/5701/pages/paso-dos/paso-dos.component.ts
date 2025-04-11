import { CATALOGOS_ID, Notificacion } from '@ng-mf/data-access-user';
import { Component, OnInit } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogosService } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';


@Component({
  selector: 'paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss'
})
export class PasoDosComponent implements OnInit {
  TEXTOS = TEXTOS;

  tiposDocumentos: Catalogo[] = [];

  infoAlert = 'alert-info';
  catalogoDocumentos: Catalogo[] = [];
  catalogoDocumentosOpcionales: Catalogo[] = [];
  documentosSeleccionados: Catalogo[] = [];
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
    private catalogosServices: CatalogosService,)
  // eslint-disable-next-line no-empty-function
  {

  }

  ngOnInit(): void {
    this.getTiposDocumentos();
    this.documentosSeleccionados = [
      {
        id: 1,
        descripcion: 'Documentos que ampare el valor de la mercancía'
      },
      {
        id: 2,
        descripcion: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)'
      }
    ];

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

  documentosCargados(cargaRealizada: boolean) : void {
    this.cargaRealizada = cargaRealizada;
  }
}
