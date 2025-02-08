/* eslint-disable sort-imports */
import { Component, Input } from '@angular/core';
import { carrosDeFerrocarril } from '../../../../core/models/220502/solicitud-pantallas.model';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-carros-de-ferrocarril',
  standalone: true,
  imports:[TituloComponent],
  templateUrl: './carros-de-ferrocarril.component.html',
  styleUrl: './carros-de-ferrocarril.component.scss'
})
export class CarrosDeFerrocarrilComponent {
   /** Matriz para contener datos para cada fila de la tabla */
  @Input() tablaFilaDatos: carrosDeFerrocarril[];

  /** Matriz para contener etiquetas de encabezado para la tabla */
  @Input() tablaHeadData: string[];
}
