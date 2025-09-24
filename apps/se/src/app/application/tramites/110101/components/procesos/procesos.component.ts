import { AlertComponent } from '@libs/shared/data-access-user/src/tramites/components/alert/alert.component';

import { Component, type OnInit } from '@angular/core';
import { ConfiguracionColumna, TablaSeleccion } from '@libs/shared/data-access-user/src';
import { PROCESO_TABLA } from '../constante110101.enum';
import { ProcesosTabla } from '../../models/panallas110101.model';
import { TablaDinamicaComponent } from '@libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
import { TituloComponent } from '@libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';


@Component({
  selector: 'app-procesos',
  standalone: true,
  imports: [
    TituloComponent,
    AlertComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss']
})
export class ProcesosComponent implements OnInit {

  /**
   * Tipo de selección utilizado en la tabla, definido como casillas de verificación (checkbox).
   * @type {TablaSeleccion}
   */
  public tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /** Configuración de la tabla de sectores */
  public configuracionTabla: ConfiguracionColumna<ProcesosTabla>[] = PROCESO_TABLA;

  /** Un array de objetos `procesosTablaDatos` que representa los datos para la tabla de solicitudes.*/
  public procesosTablaDatos: ProcesosTabla[] = [];

  /**
   * Método que se ejecuta al iniciar el componente. 
   * @returns void
   */
  ngOnInit(): void { 
    
  }
  

}
