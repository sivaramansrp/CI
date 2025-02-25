import { Component } from '@angular/core';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

import {PROSEC_MODIFICATION} from 'libs/shared/data-access-user/src/core/services/90305/prosec-modificacion.enum';

@Component({
  selector: 'app-prosec-modificacion',
  templateUrl: './prosec-modificacion.component.html',
})
export class ProsecModificacionComponent {

    /**
     * @property {ListaPasosWizard[]} pantallasPasos - Array para almacenar los pasos del wizard.
     */
    pantallasPasos: ListaPasosWizard[] = PROSEC_MODIFICATION
    /**
   * @property {number} indice - El índice actual del paso.
   */
  indice: number = 1;
}
