import { Component, Input } from '@angular/core';
import { CarroFerrocarril } from '../../../../core/models/220502/solicitud-pantallas.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-carros-de-ferrocarril',
  standalone: true,
  imports:[TituloComponent],
  templateUrl: './carros-de-ferrocarril.component.html',
  styleUrl: './carros-de-ferrocarril.component.scss'
})
export class CarrosDeFerrocarrilComponent {
  @Input() tablaFilaDatos: CarroFerrocarril[];
  @Input() tablaHeadData: string[];
}
