import { Component, Input } from '@angular/core';
import { Catalogo } from '@ng-mf/data-access-user';
import { TEXTOS_303 } from '@ng-mf/data-access-user';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  catalogoDocumentos: Catalogo[] = [];

  


}
