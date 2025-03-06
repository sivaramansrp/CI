/**
 * compo doc
 * @component ProsecModificacionComponent
 * @description
 * Componente que gestiona el proceso de modificación PROSEC dentro de un asistente (wizard).
 * Contiene la lista de pasos del proceso y controla el índice del paso actual.
 */

import { Component } from '@angular/core';

import { ListaPasosWizard } from '@ng-mf/data-access-user';

import { PROSEC_MODIFICACION } from '@ng-mf/data-access-user';

/**
 * compo doc
 * @selector app-prosec-modificacion
 */
@Component({
  selector: 'app-prosec-modificacion',
  templateUrl: './prosec-modificacion.component.html',
})
export class ProsecModificacionComponent {
  /**
   * Lista de pasos del asistente (wizard) para la modificación PROSEC.
   * Se obtiene a partir de la enumeración `PROSEC_MODIFICACION`.
   * 
   * @type {ListaPasosWizard[]}
   */
  pantallasPasos: ListaPasosWizard[] = PROSEC_MODIFICACION;

  /**
   * Índice del paso actual dentro del asistente.
   * 
   * @type {number}
   * @default 1
   */
  indice: number = 1;
}
