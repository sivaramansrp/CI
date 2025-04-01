import { Catalogo } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
})
export class PasoTresComponent {
  /**
   * **Catálogo de documentos**  
   * 
   * Contiene una lista de documentos disponibles en el sistema.  
   * Se llena con los valores obtenidos desde una fuente de datos externa.
   */
  catalogoDocumentos: Catalogo[] = [];


}
