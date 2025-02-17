import { Component } from '@angular/core';

import { AdministrarResiduosComponent } from '../../components/administrar-residuos/administrar-residuos.component';
import { DatosComponent } from '../datos/datos.component';

@Component({
  selector: 'app-pantallas',
  templateUrl: './pantallas.component.html',
  styles: ``,
  standalone: true,
  imports: [DatosComponent, AdministrarResiduosComponent]
})
export class PantallasComponent {

}
