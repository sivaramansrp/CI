import { Component } from '@angular/core';
import { PANTAPASOS } from '@ng-mf/data-access-user';
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
  pantallasPasos: ListaPasosWizard[] = PANTAPASOS;

  /**
   * Esta variable se utiliza para almacenar el índice del paso.
   */
  indice = 1;

}
