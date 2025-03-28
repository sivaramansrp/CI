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
  estaOculto: boolean = true;
}
