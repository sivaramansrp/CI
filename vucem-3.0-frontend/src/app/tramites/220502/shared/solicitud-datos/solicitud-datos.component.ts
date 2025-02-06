import { Component, Input } from '@angular/core';
import { TEXTOS } from '../../../../shared/constantes/220502/texto-enum';
import { Solicitud } from '../../../../core/models/220502/solicitud-pantallas.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';


@Component({
  selector: 'app-solicitud-datos',
  standalone: true,
  imports:[TituloComponent, AlertComponent],
  templateUrl: './solicitud-datos.component.html',
  styleUrl: './solicitud-datos.component.scss'
})
export class SolicitudDatosComponent {
  TEXTOS = TEXTOS;
  colapsable: boolean = true;
  @Input() tablaHeadData : string[];
  @Input() tablaFilaDatos : Solicitud[];
  mostrar_colapsable() {
    this.colapsable = !this.colapsable;
  }
}
