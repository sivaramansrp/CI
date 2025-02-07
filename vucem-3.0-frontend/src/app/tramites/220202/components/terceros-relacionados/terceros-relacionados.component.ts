import { Component } from '@angular/core';
import { ESREQUIREDTABLESMENSAJE } from '../../../../shared/constantes/220202/fitosanitario.enums';

@Component({
  selector: 'app-terceros-relacionados',
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss'
})
export class TercerosRelacionadosComponent {
  esRequiredTablesMensaje: string = ESREQUIREDTABLESMENSAJE
}
