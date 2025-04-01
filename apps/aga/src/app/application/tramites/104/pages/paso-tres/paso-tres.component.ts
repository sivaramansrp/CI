import { Catalogo } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
})
export class PasoTresComponent {
    catalogoDocumentos: Catalogo[] = [];
  
}
