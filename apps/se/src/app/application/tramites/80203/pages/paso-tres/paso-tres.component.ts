/**
 * @component PasoTresComponent
 * @description
 * Este componente es responsable de manejar el tercer paso del trámite IMMEX.
 * Incluye la lógica para obtener la firma electrónica y navegar a la página de acuse.
 *
 * @import { Component, Input } from '@angular/core}
 * @import { Router } from '@angular/router}
 */

import { Component } from '@angular/core';
import { TEXTOS } from '@ng-mf/data-access-user';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss'
})
export class PasoTresComponent {
  /**
   * @property {string} TEXTOS
   * @description Instrucciones para el usuario relacionadas con el tercer paso del trámite.
   */
  TEXTOS: string = TEXTOS?.INSTRUCCIONES;
}