import { Catalogo } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DOCUMENTO_CATALOGO_DATOS } from '../../constantes/nuevo-programa.enum';
import { PROYECTO_DATOS } from '../../constantes/nuevo-programa.enum';
import { PROYECTO_IMMEX_CONFIG } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { PoryectoDatos } from '../../../../shared/models/nuevo-programa-industrial.model';
import { ProyectoImmexComponent } from '../../../../shared/components/proyecto-immex/proyecto-immex.component';
import { ProyectoImmexEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-proyecto-immex-vista',
  standalone: true,
  imports: [CommonModule, ProyectoImmexComponent],
  templateUrl: './proyecto-immex-vista.component.html',
  styleUrl: './proyecto-immex-vista.component.scss',
})
export class ProyectoImmexVistaComponent {
  public proyectoImmexDatos: PoryectoDatos = PROYECTO_DATOS;
  public documentoCatalogDatos: Catalogo[] = DOCUMENTO_CATALOGO_DATOS;
  public proyectoImmexTablaLista: ProyectoImmexEncabezado[] = [];
  public proyectoImmexConfiguartion = {
    proyectoImmexSeleccionCheckBox: TablaSeleccion.CHECKBOX,
    proyectoImmexTabla: PROYECTO_IMMEX_CONFIG
  };

  /**
   * Método para asignar la lista de proyectos IMMEX a la propiedad `proyectoImmexTablaLista`.
   * 
   * @param event - Arreglo de objetos de tipo `ProyectoImmexEncabezado` que contiene los datos de los proyectos IMMEX.
   */
  obtenerProyectoTablaDevolverLaLlamada(event: ProyectoImmexEncabezado[]): void{
    this.proyectoImmexTablaLista = event;
  }
}
