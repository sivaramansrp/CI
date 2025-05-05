import { Catalogo, CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import seleccionarOpciones from '@libs/shared/theme/assets/json/5601/selector-5601.json'

@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule,CatalogoSelectComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.css',
})
export class DatosSolicitudComponent {

   aduanas!: Catalogo[];

   constructor() {
    this.aduanas=seleccionarOpciones?.aduanas;
   }
}
