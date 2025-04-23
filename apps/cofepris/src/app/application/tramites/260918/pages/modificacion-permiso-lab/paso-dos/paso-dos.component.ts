import { Component } from '@angular/core';
import { TEXTOS } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent {

    /**
     * @propiedad TEXTOS
     * @descripcion Referencia a los textos compartidos utilizados en el componente.
     */
    TEXTOS = TEXTOS;
}
