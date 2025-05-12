import { AgregarFacturadorComponent } from '../../../../shared/components/agregar-facturador/agregar-facturador.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Facturador } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260216Store } from '../../estados/tramite260216Store.store';

/**
 * @component AgregarFacturadorContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarFacturadorComponent` 
 * para gestionar la funcionalidad relacionada con los facturadores. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260216Store`.
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
   * @description Constructor que inyecta el store `Tramite260216Store` para gestionar el estado del trámite.
   * 
   * @param tramite260216Store - Store que administra el estado del trámite 260216.
   */
    constructor(
        public tramite260216Store: Tramite260216Store){
    }

    /**
   * @method updateFacturadorTablaDatos
   * @description Actualiza los datos de la tabla de facturadores en el store del trámite.
   * 
   * @param {Facturador[]} event - Lista de facturadores que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
    updateFacturadorTablaDatos(event:Facturador[]): void {
        this.tramite260216Store.updateFacturadorTablaDatos(event);
    }
}
