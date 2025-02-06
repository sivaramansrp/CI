import { Component, Input } from '@angular/core';
import { CarroFerrocarril } from '../../../../core/models/220502/solicitud-pantallas.model';

@Component({
  selector: 'carros-de-ferrocarril',
  templateUrl: './carros-de-ferrocarril.component.html',
  styleUrl: './carros-de-ferrocarril.component.scss'
})
export class CarrosDeFerrocarrilComponent {
  @Input() tablaFilaDatos: CarroFerrocarril[];
  @Input() tablaHeadData: string[];
}
