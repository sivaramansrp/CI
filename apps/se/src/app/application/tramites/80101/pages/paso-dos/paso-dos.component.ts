/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';
import { TEXTOS_REQUISITOS } from '../../constantes/nuevo-programa.enum';

/**
 * Objeto que contiene los textos relacionados con los requisitos.
 * 
 * Este objeto se utiliza para almacenar y acceder a los textos 
 * que describen los requisitos necesarios en el contexto de la aplicación.
 * 
 * @type {object} TEXTOS_REQUISITOS - Contiene los textos de los requisitos.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
})
export class PasoDosComponent {
  /**
   * Objeto con los textos de los requisitos.
   * @property {object} TEXTOS_REQUISITOS
   */
  TEXTOS = TEXTOS_REQUISITOS;
}
