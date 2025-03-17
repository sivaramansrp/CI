/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-extra-semi */
/* eslint-disable no-empty-function */
import { AlertComponent } from '@libs/shared/data-access-user/src';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { DESTINO_SERVICIO } from '../../modelos/datos-de-interfaz.model';
import { EXPORTADOR_SERVICIO } from '../../modelos/datos-de-interfaz.model';
import { ExportadorDatosService } from '../../servicios/exportador-datos.service';
import { MANDATORY_INSTRUCTION } from '../../constantes/inspeccion-fisica-zoosanitario.enums';
import { OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TablaSeleccion } from '@ng-mf/data-access-user';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { destinoInfo} from '../../modelos/datos-de-interfaz.model';
import { exportadorInfo} from '../../modelos/datos-de-interfaz.model';


@Component({
  selector: 'interna-terceros-relacionados',
  standalone: true,
  imports: [AlertComponent, CommonModule, ReactiveFormsModule, TituloComponent, TablaDinamicaComponent],
  templateUrl: './interna-terceros-relacionados.component.html',
  styleUrl: './interna-terceros-relacionados.component.scss'
})
export class InternaTercerosRelacionadosComponent implements OnInit {

   instruccionDobleClic: string = MANDATORY_INSTRUCTION;


     /**
   * Tipo de selección de la tabla.
   * @type {TablaSeleccion}
   */
     tablaSeleccionRadio: TablaSeleccion = TablaSeleccion.RADIO;
     tablaSeleccionCheckbox: TablaSeleccion = TablaSeleccion.CHECKBOX;
   
   /**
    * Configuración de las columnas de la tabla para servicios MERCANCIA.
    * @type {ConfiguracionColumna<exportadorInfo>[]}
    */
   exportadorTabla: ConfiguracionColumna<exportadorInfo>[] = EXPORTADOR_SERVICIO;
     /**
      * Datos de los servicios MERCANCIA.
      * @type {exportadorInfo[]}
      */
     exportadorTableDatos: exportadorInfo[] = [];
 
       /**
    * @property {any[]} exportadorContenido - Array de datos MERCANCIA.
    */
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   exportadorContenido: any[] = [];


      /**
    * Configuración de las columnas de la tabla para servicios MERCANCIA.
    * @type {ConfiguracionColumna<destinoInfo>[]}
    */
      destinoTabla: ConfiguracionColumna<destinoInfo>[] = DESTINO_SERVICIO;
      /**
       * Datos de los servicios MERCANCIA.
       * @type {destinoInfo[]}
       */
      destinoTableDatos: destinoInfo[] = [];
  
        /**
     * @property {any[]} exportadorContenido - Array de datos MERCANCIA.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    destinoContenido: any[] = [];


    constructor(
      private exportadorDatosService: ExportadorDatosService,
      private cdr: ChangeDetectorRef
    ) {};

     ngOnInit(): void {
      this.fetchData();
     }
     
     fetchData(): void {
      this.exportadorDatosService.getDatos()
      .subscribe({
        next: (response: any) => {
          if (response && Array.isArray(response.exportadorContenido) &&
          Array.isArray(response.destinoContenido)) {
            this.exportadorTableDatos = response.exportadorContenido;
            this.destinoTableDatos = response.destinoContenido;
            this.cdr.detectChanges(); 
          } else {
            console.error("La respuesta de la API no tiene el formato esperado: ", response);
          }
        },
        error: (error) => {
          console.error("Error al obtener datos: ", error);
        }
      });
    }
    
}
