import { TablaDinamicaComponent, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SECTOR } from '../../constantes/complementaria.enum';
import { SectorTabla } from '../../models/complementaria.model';

/**
 * Componente que representa la sección de "Sector".
 * Este componente utiliza una tabla dinámica para mostrar información relacionada con sectores.
 */
@Component({
  selector: 'app-sector',
  standalone: true,
  imports: [CommonModule, TablaDinamicaComponent],
  templateUrl: './sector.component.html',
  styleUrl: './sector.component.css',
})
export class SectorComponent {
  /**
   * Enumeración que define las opciones de selección para la tabla.
   * Se utiliza para configurar el comportamiento de la tabla dinámica.
   */
  TablaSeleccion = TablaSeleccion;

  /**
   * Constante que contiene los datos de configuración para la tabla de sectores.
   * Esta constante se importa desde el archivo de constantes.
   */
  public SectorTabla = SECTOR;

  /**
   * Arreglo que almacena los datos de la tabla de sectores.
   * Este arreglo se utiliza para mostrar la información dinámica en la tabla.
   */
  sectorTablaDatos: SectorTabla[] = [];
}