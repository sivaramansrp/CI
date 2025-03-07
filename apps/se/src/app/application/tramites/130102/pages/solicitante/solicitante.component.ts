/* eslint-disable @nx/enforce-module-boundaries */
import { Component } from '@angular/core';

import { DatosPasos } from 'libs/shared/data-access-user/src/core/models/shared/components.model';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';

import { PASOS } from 'libs/shared/data-access-user/src/tramites/constantes/servicios-extraordinarios.enum';

/**
 * @component
 * @description 
 * Este componente representa la vista del solicitante en el proceso de servicios extraordinarios.
 * Administra la navegación entre los pasos del asistente.
 */
@Component({
  selector: 'app-130102solicitante',
  templateUrl: './solicitante.component.html'
})
export class Solicitante130102Component {

  /**
   * @property {ListaPasosWizard[]} pasos
   * @description 
   * Lista de pasos del asistente, obtenidos desde una constante de configuración.
   */
  pasos: ListaPasosWizard[] = PASOS;

  /**
   * @property {number} indice
   * @description 
   * Índice actual del paso en el asistente, comienza en 1.
   */
  indice: number = 1;

  /**
   * @property {DatosPasos} datosPasos
   * @description 
   * Datos que controlan la navegación en el asistente, como el número total de pasos 
   * y los textos de los botones de navegación.
   */
  datosPasos: DatosPasos = {
    nroPasos: this.pasos.length,
    indice: this.indice,
    txtBtnAnt: 'Anterior',
    txtBtnSig: 'Continuar',
  };
}
