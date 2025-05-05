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
  /**
   * Representa los datos del proyecto IMMEX.
   * 
   * @type {PoryectoDatos}
   * @constant
   * @description Esta propiedad contiene los datos relacionados con el proyecto IMMEX,
   *              inicializados con un valor predeterminado definido en `PROYECTO_DATOS`.
   */
  public proyectoImmexDatos: PoryectoDatos = PROYECTO_DATOS;
  /**
   * Arreglo que contiene los datos del catálogo de documentos.
   * Este catálogo se utiliza para gestionar y mostrar información relacionada
   * con los documentos disponibles en el sistema.
   */
  public documentoCatalogDatos: Catalogo[] = DOCUMENTO_CATALOGO_DATOS;
  /**
   * Lista de encabezados del proyecto IMMEX.
   * 
   * Esta propiedad almacena un arreglo de objetos de tipo `ProyectoImmexEncabezado`,
   * que representan los datos principales relacionados con el proyecto IMMEX.
   * 
   * @type {ProyectoImmexEncabezado[]}
   */
  public proyectoImmexTablaLista: ProyectoImmexEncabezado[] = [];
  /**
   * Configuración para el proyecto IMMEX.
   * 
   * Esta propiedad define la configuración utilizada en el componente 
   * para manejar la tabla y la selección de elementos relacionados 
   * con el proyecto IMMEX.
   * 
   * Propiedades:
   * - `proyectoImmexSeleccionCheckBox`: Define el tipo de selección en la tabla, 
   *   en este caso, se utiliza un checkbox para seleccionar elementos.
   * - `proyectoImmexTabla`: Contiene la configuración específica de la tabla 
   *   para el proyecto IMMEX.
   */
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
