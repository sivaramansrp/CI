import { Component } from '@angular/core';
import { IMPORTANTE } from '../../constantes/fitosanitario.enum';


@Component({
  selector: 'app-datos-mercancia',
  templateUrl: './datos-mercancia.component.html',
  styleUrl: './datos-mercancia.component.css',
})
export class DatosMercanciaComponent {
  IMPORTANTES: string = IMPORTANTE.Importante
}
