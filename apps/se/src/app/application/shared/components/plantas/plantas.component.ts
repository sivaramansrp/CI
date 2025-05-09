import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { PLANTAS } from '../../constantes/complementaria.enum';
import { PlantasTabla } from '../../models/complementaria.model';

/**
 * Componente que representa la sección de "Plantas".
 * Este componente utiliza una tabla dinámica para mostrar información relacionada con plantas.
 */
@Component({
  selector: 'app-plantas',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent, TituloComponent],
  templateUrl: './plantas.component.html',
  styleUrl: './plantas.component.scss',
})
export class PlantasComponent {
  /**
   * Enumeración que define las opciones de selección para la tabla.
   * Se utiliza para configurar el comportamiento de la tabla dinámica.
   */
  tablaSeleccion = TablaSeleccion;

  /**
   * Constante que contiene los datos de configuración para la tabla de plantas.
   * Esta constante se importa desde el archivo de constantes.
   */
  public plantasTabla = PLANTAS;

  /**
   * Arreglo que almacena los datos de la tabla de plantas.
   * Este arreglo se utiliza para mostrar la información dinámica en la tabla.
   */
  @Input() plantasTablaDatos: PlantasTabla[] = [];
}