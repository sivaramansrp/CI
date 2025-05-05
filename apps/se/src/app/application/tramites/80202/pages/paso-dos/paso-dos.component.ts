import { Component } from '@angular/core';

import { Catalogo } from '@ng-mf/data-access-user';
import { TEXTOS_REQUISITOS } from '../../constants/immex-ampliacion-sensibles.enums';


@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
export class PasoDosComponent {
  /**
   * Lista de documentos del catálogo que se utilizarán en el componente.
   * 
   * @type {Catalogo[]}
   * @remarks
   * Este arreglo almacena los documentos disponibles en el catálogo
   * y se inicializa como vacío. Se puede llenar con datos obtenidos
   * de un servicio o una fuente externa.
   */
  catalogoDocumentos: Catalogo[] = [];
  /**
   * @property infoAlert
   * @description Clase CSS utilizada para mostrar un mensaje de alerta con estilo informativo.
   */
  infoAlert = 'alert-info';
  /**
   * Constante que almacena los textos relacionados con los requisitos.
   * Se utiliza para mostrar información específica en la interfaz de usuario
   * durante el proceso en el paso dos del trámite.
   */
  TEXTOS = TEXTOS_REQUISITOS;
}
