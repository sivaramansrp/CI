import { AlertComponent, AnexarDocumentosComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/certificado-zoosanitario.enum';

/**
 * @fileoverview Componente para mostrar el subtítulo y los requisitos del asistente en el paso dos del trámite.
 * Incluye la visualización de textos de ayuda y el componente para anexar documentos.
 * @module PasoDosComponent
 */

/**
 * Componente para mostrar el subtítulo del asistente y los requisitos en el paso dos.
 * @component PasoDosComponent
 * @selector app-paso-dos
 * @templateUrl ./paso-dos.component.html
 * @styleUrls ./paso-dos.component.scss
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.scss'],
  standalone: true,
  imports:[TituloComponent, AlertComponent, AnexarDocumentosComponent]
})
export class PasoDosComponent {

  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS
   * @description Textos para los requisitos del certificado zoosanitario, incluyendo instrucciones y mensajes de ayuda.
   */
  TEXTOS = TEXTOS_REQUISITOS;

}