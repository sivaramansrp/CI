import { Component } from '@angular/core';
import { ESREQUIREDTABLESMENSAJE } from '../../../../shared/constantes/220202/fitosanitario.enums';

import { CatalogosSelect } from '../../../../core/models/shared/components.model';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss'
})
export class TercerosRelacionadosComponent {
  esRequiredTablesMensaje: string = ESREQUIREDTABLESMENSAJE;
  pairsList: CatalogosSelect = {
    labelNombre: 'País',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: []
  }
}
