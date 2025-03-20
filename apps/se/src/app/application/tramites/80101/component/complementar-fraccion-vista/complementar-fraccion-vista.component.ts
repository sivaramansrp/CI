import { Catalogo, ComplimentarFraccion, ComplimentarFraccionResoponse } from '../../../../shared/models/nuevo-programa-industrial.model';
import { COMPLEMENTAR_FRACCION_CATALOGO_DATOS } from '../../constantes/nuevo-programa.enum';
import { COMPLEMENTAR_FRACCION_DATOS } from '../../constantes/nuevo-programa.enum';
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
  public catagoriaSeleccionDatos: Catalogo[] = COMPLEMENTAR_FRACCION_CATALOGO_DATOS;
  public complimentarFraccionDatos: ComplimentarFraccion = COMPLEMENTAR_FRACCION_DATOS;

  /**
   * Método para asignar los datos recibidos al atributo `complimentarDatos`.
   * 
   * @param event - Objeto de tipo `ComplimentarFraccionResoponse` que contiene los datos a complementar.
   */
  getDatos(event: ComplimentarFraccionResoponse): void {
    this.complimentarDatos = event;
  }
}
