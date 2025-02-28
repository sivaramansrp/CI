import { Component } from '@angular/core';
import { ImportanteCatalogoSeleccion } from '@ng-mf/data-access-user';
import { OnInit } from '@angular/core';
import { RenovacionesMuestrasMercanciasService } from '@ng-mf/data-access-user';
import { TEXTOS } from '@ng-mf/data-access-user';
import { TableData } from '@ng-mf/data-access-user';

/**  
 * Componente PasoDosComponent que representa el segundo paso del trámite 30901.
 */
@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrl: './paso-dos.component.scss',
})
/**  Componente PasoDosComponent que representa el segundo paso del trámite 30901. */
export class PasoDosComponent implements OnInit {
  /**
   * @description Constante que contiene los textos utilizados en el componente.
   */
  TEXTOS = TEXTOS;
  /**
   * Datos de la tabla que contiene los encabezados y el cuerpo de la tabla.
   * @property {Array<any>} tableHeader - Encabezados de la tabla.
   * @property {Array<any>} tableBody - Cuerpo de la tabla.
   */
  tableData: TableData = {
    /**
     * Encabezados de la tabla.
     */
    tableHeader: [],
    /**
     * Cuerpo de la tabla.
     */
    tableBody: [],
  };

  /**
   * Constructor de la clase PasoDosComponent.
   * 
   * @param renovacionesService - Servicio para manejar las renovaciones de muestras de mercancías.
   */
  constructor(
    public renovacionesService: RenovacionesMuestrasMercanciasService
  ) {
    // Si es necesario, se puede agregar aquí la lógica de inicialización
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta una vez que el componente ha sido inicializado.
   * Aquí se llama al método `obtenerDatosIniciales` para cargar los datos necesarios al iniciar el componente.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.obtenerDatosIniciales();
  }

  /**
   * @description Obtiene los datos iniciales para el componente, incluyendo las opciones desplegables.
   */
  obtenerDatosIniciales(): void {
    this.renovacionesService.obtenerOpcionesDesplegables().subscribe({
      next: (res: ImportanteCatalogoSeleccion) => {
        this.tableData = res.requisitosObligatoriosTabla;
      },
    });
  }
}
