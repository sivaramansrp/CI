import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260301Store } from '../../estados/tramite260301Store.store';

/**
 * @component AgregarFacturadorContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarFacturadorComponent` 
 * para gestionar la funcionalidad relacionada con los facturadores. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260301Store`.
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
   * @constructor
   * @description Constructor que inyecta el store `Tramite260301Store` para gestionar el estado del trámite.
   * 
   * @param tramite260301Store - Store que administra el estado del trámite 260301.
   */
    constructor(
        public tramite260301Store: Tramite260301Store){
        // Constructor necesario para inyectar el store del trámite
    }

    /**
   * @method updateFacturadorTablaDatos
   * @description Actualiza los datos de la tabla de facturadores en el store del trámite.
   * 
   * @param {Facturador[]} event - Lista de facturadores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
    updateFacturadorTablaDatos(event:Facturador[]): void {
        this.tramite260301Store.updateFacturadorTablaDatos(event);
    }
}
