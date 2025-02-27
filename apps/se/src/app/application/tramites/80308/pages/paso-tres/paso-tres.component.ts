import {
  AlertComponent,
  AnexarDocumentosComponent,
  TituloComponent,
} from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TEXTOS_REQUISITOS } from '../../constantes/modificacion.enum';

@Component({
  selector: 'paso-tres',
  templateUrl: './paso-tres.component.html',
  styleUrl: './paso-tres.component.scss',
  standalone: true,
  imports: [AlertComponent, TituloComponent, AnexarDocumentosComponent],
  host: { hostID: crypto.randomUUID().toString() },
})
export class PasoTresComponent {
  constructor(private router: Router) {}
  /**
   * Obtener el valor de la instrucción e inicializar la variable
   */
  TEXTOS = TEXTOS_REQUISITOS;
}
