import { Component, Input } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  @Input() documentos!: Array<Catalogo>;
  TEXTO = TEXTOS.ADJUNTAR;

  listaDocumentos = [
    {
      id: 1,
      value: 'Documentos que ampare el valor de la mercancía'
    },
    {
      id: 2,
      value: 'Documentos del medio de transporte (Guías, BL o carta porte según corresponda)'
    }
  ];

  eliminar(i: number) {

  }

}
