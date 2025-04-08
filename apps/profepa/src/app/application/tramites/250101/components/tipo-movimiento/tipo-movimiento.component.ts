import {CatalogoSelectComponent,InputRadioComponent,TituloComponent} from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO } from '../../constantes/flora-fauna.enum';

@Component({
  selector: 'app-tipo-movimiento',
  standalone: true,
  imports: [
    TituloComponent,
    InputRadioComponent,
    CatalogoSelectComponent
  ],
  templateUrl: './tipo-movimiento.component.html',
  styleUrl: './tipo-movimiento.component.scss'
})
export class TipoMovimientoComponent {
  movimientoOpcionDeBotonDeRadio = MOVIMIENTO_OPCIONES_DE_BOTON_DE_RADIO;
}
