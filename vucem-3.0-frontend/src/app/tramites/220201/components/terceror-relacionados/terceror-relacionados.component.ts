import { Component } from '@angular/core';
import { TERCEROR_TEXTO_DE_ALERTA } from '../../../../shared/constantes/issuance-extension-modification.enum';

@Component({
  selector: 'app-terceror-relacionados',
  templateUrl: './terceror-relacionados.component.html',
  styleUrl: './terceror-relacionados.component.scss'
})
export class TercerorRelacionadosComponent {
  TEXTO_DE_ALERTA: string = TERCEROR_TEXTO_DE_ALERTA;
}
