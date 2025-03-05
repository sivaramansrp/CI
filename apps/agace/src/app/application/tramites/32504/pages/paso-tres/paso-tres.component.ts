import { AlertComponent } from "@ng-mf/data-access-user";
import { Component } from '@angular/core';
import { TEXTO_ANEXAR_REQUISITOS } from '../../enum/aviso.enum';
import { TituloComponent } from "@ng-mf/data-access-user";

@Component({
  selector: 'app-paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
  standalone: true,
  imports: [AlertComponent, TituloComponent],
})
export class PasoTresComponent {

    /**
     * Objeto con las instrucciones.
     * @property {string} textConfig
     */
    textConfig = TEXTO_ANEXAR_REQUISITOS;
}
