import { Component, Input } from '@angular/core';
import {
  ConfiguracionColumna,
  TablaDinamicaComponent,
  TablaSeleccion,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { TramiteAsociados } from '../../models/tramite-asociados.model';

@Component({
  selector: 'app-tramite-asociados',
  standalone: true,
  imports: [CommonModule, TituloComponent ,TablaDinamicaComponent],
  templateUrl: './tramite-asociados.component.html',
  styleUrl: './tramite-asociados.component.css',
})
export class TramiteAsociadosComponent {
  @Input() configuracionTabla!: ConfiguracionColumna<TramiteAsociados>[];
  @Input() tramiteAsociados!: TramiteAsociados[];
}
