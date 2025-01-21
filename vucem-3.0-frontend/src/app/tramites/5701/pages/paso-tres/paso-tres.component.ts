import { Component, Input } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/servicios-extraordinarios.enum';
import { Catalogo } from '../../../../core/models/5701/catalogos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {

  constructor(private roouter: Router) { }




  firmaAceptada(ev: string) : void {
    if(ev) {
      const firma = ev;

      // Generar el pdf

      // Ir a la Pagina de Acuses
      this.roouter.navigate(['/servicios-extraordinarios/acuse']);




    }

  }


}
