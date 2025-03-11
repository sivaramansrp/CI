import { Component } from '@angular/core';
import { PERMISO_MAQUILA } from '../../constantes/permiso-maquila.enum';
import { ListaPasosWizard } from '@ng-mf/data-access-user';

@Component({
  selector: 'app-permiso-maquila',
  standalone: false,
  templateUrl: './permiso-maquila.component.html',
})
export class PermisoMaquilaComponent {

  /**
     * Esta variable se utiliza para almacenar la lista de pasos.
     */
  pantallasPasos: ListaPasosWizard[] = PERMISO_MAQUILA;

  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice = 1;

}
