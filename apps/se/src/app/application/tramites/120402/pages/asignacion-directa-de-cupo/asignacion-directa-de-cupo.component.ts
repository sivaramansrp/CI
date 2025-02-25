import { Component } from '@angular/core';

import { ASIGNACION, TEXTOS } from 'libs/shared/data-access-user/src/core/services/120402/asignacion-directa-de-cupo.enum';
import { ListaPasosWizard } from 'libs/shared/data-access-user/src/core/models/5701/servicios-extraordinarios.model';

// import { ASIGNACION } from '../../../../../../../../../libs/shared/data-access-user/src/core/services/120402/asignacion-directa-de-cupo.enum';


@Component({
  selector: 'app-asignacion-directa-de-cupo',
  templateUrl: './asignacion-directa-de-cupo.component.html',
})
export class AsignacionDirectaDeCupoComponent {
    pantallasPasos: ListaPasosWizard[] = ASIGNACION;
  
    indice: number = 1;

    TEXTOS = TEXTOS;

    class= "alert-danger";
}
