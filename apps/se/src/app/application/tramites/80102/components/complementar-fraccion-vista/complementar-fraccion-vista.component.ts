import { Catalogo, ComplimentarFraccion, ComplimentarFraccionResoponse } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { ComplementarFraccionComponent } from '../../../../shared/components/complementar-fraccion/complementar-fraccion.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-complementar-fraccion-vista',
  standalone: true,
  imports: [CommonModule, ComplementarFraccionComponent],
  templateUrl: './complementar-fraccion-vista.component.html',
  styleUrl: './complementar-fraccion-vista.component.scss',
})
export class ComplementarFraccionVistaComponent {
  public complimentarDatos!: ComplimentarFraccionResoponse;
  public catagoriaSeleccionDatos: Catalogo[] = [{
    id: 0,
    descripcion: ''
  }];
  public complimentarFraccionDatos: ComplimentarFraccion = {
    fraccionArancelaria: '',
    anexoDos: '',
    tipo: '',
    umt: '',
    catagoria: '',
    descripcion: '',
    monedaNacionalMensual: 0,
    monedaNacionalDeDosPeriodos: 0,
    volumenMensual: 0,
    twoPeriodVolume: 0
  }

  getDatos(event: ComplimentarFraccionResoponse): void {
    this.complimentarDatos = event;
  }
}
