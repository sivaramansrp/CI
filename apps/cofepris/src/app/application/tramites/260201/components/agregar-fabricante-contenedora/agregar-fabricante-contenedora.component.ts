import { AgregarFabricanteComponent } from '../../../../shared/components/agregar-fabricante/agregar-fabricante.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/psicotropicos-poretorno.enum';
import { Tramite260201Store } from '../../estados/tramite260201Store.store';
/**
 * @component AgregarFabricanteContenedoraComponent
 * @description Componente contenedor que utiliza el componente `AgregarFabricanteComponent` 
 * para gestionar la funcionalidad relacionada con los fabricantes. 
 * Este componente interactúa con el estado del trámite a través del store `Tramite260201Store`.
 */
@Component({
  selector: 'app-agregar-fabricante-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarFabricanteComponent],
  templateUrl: './agregar-fabricante-contenedora.component.html',
  styleUrl: './agregar-fabricante-contenedora.component.scss',
})
export class AgregarFabricanteContenedoraComponent {
  /**
   * @property {boolean} estaOculto
   * Variable booleana que indica si el componente o sección relacionada con el 
   * formulario de agregar fabricante está visible o está oculta en la interfaz.
   * Se utiliza para controlar la visibilidad de ciertos elementos en la UI.
   */
  estaOculto: boolean = true;

  /**
     * @property {string} idProcedimiento
     * @description
     * Identificador del procedimiento.
     */
    public readonly idProcedimiento = ID_PROCEDIMIENTO;

 /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260201Store` para gestionar el estado del trámite.
   * 
   * @param tramite260201Store - Store que administra el estado del trámite 260201.
   */
    constructor(
        public tramite260201Store: Tramite260201Store){
        // Constructor vacío, se inyecta el store para su uso en el componente.
    }

  /**
   * @method updateFabricanteTablaDatos
   * @description Actualiza los datos de la tabla de fabricantes en el store del trámite.
   * 
   * @param {Fabricante[]} event - Lista de fabricantes que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
    updateFabricanteTablaDatos(event:Fabricante[]): void {
        this.tramite260201Store.updateFabricanteTablaDatos(event);
    }
}
