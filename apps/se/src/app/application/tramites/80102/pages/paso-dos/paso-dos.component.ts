// eslint-disable-next-line @nx/enforce-module-boundaries
import { AlertComponent, AnexarDocumentosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/autorizacion-programa-nuevo.enum';
/**
 * Este componente se muestra en PasaDos
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
  standalone: true,
  imports: [AlertComponent, TituloComponent, AnexarDocumentosComponent],
  host: { 'hostID': crypto.randomUUID().toString()}
})
export class PasoDosComponent {
  /**
   * Obtener el valor de la instrucción e inicializar la variable
   */
  TEXTOS = TEXTOS_REQUISITOS;
}
