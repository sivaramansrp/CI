import { AlertComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MANIFIESTOS_ALERT } from '../../constantes/retiros-cofepris.enum';

@Component({
  selector: 'manifiestos-declaraciones',
  standalone: true,
  imports: [
    CommonModule,
    TituloComponent,
    AlertComponent,
  ],
  templateUrl: './manifiestosDeclaraciones.component.html',
  styleUrl: './manifiestosDeclaraciones.component.scss',
})
export class ManifiestosDeclaracionesComponent {

  public manifiestosAlert: string = MANIFIESTOS_ALERT.message;
}
