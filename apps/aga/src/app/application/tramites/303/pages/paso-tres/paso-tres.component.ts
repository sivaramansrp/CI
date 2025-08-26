import { Catalogo } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  catalogoDocumentos: Catalogo[] = [];
}