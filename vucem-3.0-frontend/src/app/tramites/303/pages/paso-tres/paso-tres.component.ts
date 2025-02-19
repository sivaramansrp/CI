import { Component, Input } from '@angular/core';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  catalogoDocumentos: Catalogo[] = [];

  


}
