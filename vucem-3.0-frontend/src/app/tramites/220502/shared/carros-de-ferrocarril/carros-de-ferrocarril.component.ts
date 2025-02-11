import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { carrosDeFerrocarril } from '../../../../core/models/220502/solicitud-pantallas.model';
/** Componente para gestionar los datos de los carros de ferrocarril */
@Component({
  selector: 'app-carros-de-ferrocarril',
  standalone: true,
  imports:[TituloComponent],
  templateUrl: './carros-de-ferrocarril.component.html',
  styleUrl: './carros-de-ferrocarril.component.scss'
})
/** Componente para gestionar los datos de los carros de ferrocarril */
export class CarrosDeFerrocarrilComponent {
   /** Matriz para contener datos para cada fila de la tabla */
  @Input() tablaFilaDatos: carrosDeFerrocarril[];

  /** Matriz para contener etiquetas de encabezado para la tabla */
  @Input() tablaHeadData: string[];
}
