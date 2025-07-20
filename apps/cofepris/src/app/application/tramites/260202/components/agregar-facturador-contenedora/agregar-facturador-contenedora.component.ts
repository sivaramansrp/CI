import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/importacion-materias-primas.enum';
import { Tramite260202Store } from '../../estados/tramite260202Store.store';

/**
 * @component AgregarFacturadorContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarFacturadorComponent` 
 * para gestionar la funcionalidad relacionada con los facturadores. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260202Store`.
 */
@Component({
  selector: 'app-agregar-facturador-contenedora',
  standalone: true,
  imports: [CommonModule,AgregarFacturadorComponent],
  templateUrl: './agregar-facturador-contenedora.component.html',
  styleUrl: './agregar-facturador-contenedora.component.scss',
})

export class AgregarFacturadorContenedoraComponent {
     /**
   * @property {string} idProcedimiento
   * @description
   * Identificador del procedimiento.
   */
     public readonly idProcedimiento = ID_PROCEDIMIENTO;
    
  /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260202Store` para gestionar el estado del trámite.
   * 
   * @param tramite260202Store - Store que administra el estado del trámite 260202.
   */
    constructor(
        public tramite260202Store: Tramite260202Store){
        // Constructor vacío, se inyecta el store para su uso en el componente.
    }


    /**
   * @method updateFacturadorTablaDatos
   * @description Actualiza los datos de la tabla de facturadores en el store del trámite.
   * 
   * @param {Facturador[]} event - Lista de facturadores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
    updateFacturadorTablaDatos(event:Facturador[]): void {
        this.tramite260202Store.updateFacturadorTablaDatos(event);
    }
}
