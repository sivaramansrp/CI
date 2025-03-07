import { AlertComponent } from "@ng-mf/data-access-user";
import { Component } from '@angular/core';
import { TEXTOS } from '../../constants/aviso.enum';
import { TituloComponent } from "@ng-mf/data-access-user";

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrl: './carga-masiva.component.scss',
  imports: [TituloComponent, AlertComponent],
  standalone: true,
})
export class CargaMasivaComponent {

  /**
   * Objeto con las instrucciones.
   * @property {string} TEXTOS
   */
  TEXTOS = TEXTOS;
  event = {};

  /**
   * Implementar lógica de carga de archivo..
   * @param {any} event
   */
  actualizarArchivo(event: Event): void {
    // Implementar lógica de carga de archivo.
    this.event = event;
  }
    
}
