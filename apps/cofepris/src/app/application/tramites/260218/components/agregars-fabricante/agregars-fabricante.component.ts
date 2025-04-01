import { AgregarFabricanteComponent } from "../../../../shared/components/agregar-fabricante/agregar-fabricante.component";
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';

@Component({
  selector: 'app-agregars-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    AgregarFabricanteComponent
  ],
  templateUrl: './agregars-fabricante.component.html',
  styleUrl: './agregars-fabricante.component.scss',
})
export class AgregarsFabricanteComponent {
  /**
   * @property {boolean} estaOculto
   * Variable booleana que indica si el componente o sección relacionada con el 
   * formulario de agregar fabricante está visible o está oculta en la interfaz.
   * Se utiliza para controlar la visibilidad de ciertos elementos en la UI.
   */
  estaOculto: boolean = true;
}
