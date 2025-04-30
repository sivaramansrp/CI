import { INFORMACION_DE_LA_OBRA_ARTE ,INPUT_FECHA_FIN_CUPO,INPUT_FECHA_INICIO_CUPO} from '../../constantes/expedicion-certificados-frontera.enum';
import { Component } from '@angular/core';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InputFechaComponent } from '@libs/shared/data-access-user/src';
import { TituloComponent } from '@libs/shared/data-access-user/src';


@Component({
  selector: 'app-descripcion-cupo',
  standalone: true,
  imports: [TituloComponent,InputFechaComponent,FormasDinamicasComponent],
  templateUrl: './descripcion-cupo.component.html',
  styleUrl: './descripcion-cupo.component.scss',
})
export class DescripcionCupoComponent {
  FECHA_INICIO_CUPO = INPUT_FECHA_INICIO_CUPO;
  FECHA_FIN_CUPO = INPUT_FECHA_FIN_CUPO;
  public informacionFormData = INFORMACION_DE_LA_OBRA_ARTE;
}
