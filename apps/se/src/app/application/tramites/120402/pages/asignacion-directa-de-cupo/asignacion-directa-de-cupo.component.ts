/**
 * Componente que gestiona la asignación directa de cupo.
 * Muestra una serie de pantallas de pasos y utiliza textos predefinidos.
 */
import { Component } from '@angular/core';

import { ASIGNACION, TEXTOS } from 'libs/shared/data-access-user/src/core/services/120402/asignacion-directa-de-cupo.enum';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';

@Component({
  selector: 'app-asignacion-directa-de-cupo',
  templateUrl: './asignacion-directa-de-cupo.component.html',
})
export class AsignacionDirectaDeCupoComponent {
  /**
   * Lista de pasos para el asistente (wizard) de asignación directa.
   */
  pantallasPasos: ListaPasosWizard[] = ASIGNACION;

  /**
   * Índice actual del paso en el asistente.
   */
  indice: number = 1;

  /**
   * Textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;

  /**
   * Clase CSS para aplicar estilos específicos a los elementos de la interfaz.
   */
  class: string = 'alert-danger';
}
