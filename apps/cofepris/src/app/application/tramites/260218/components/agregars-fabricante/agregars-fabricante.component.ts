import { AgregarFabricanteComponent } from "../../../../shared/components/agregar-fabricante/agregar-fabricante.component";
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Fabricante } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260218Store } from "../../estados/tramite260218Store.store";

@Component({
  selector: 'app-agregars-fabricante',
  standalone: true,
  imports: [
    CommonModule,
    AgregarFabricanteComponent
  ],
  templateUrl: './agregars-fabricante.component.html',
  styleUrl: './agregars-fabricante.component.scss',
})
export class AgregarsFabricanteComponent {

  constructor(public tramiteStore: Tramite260218Store){}
  /**
   * @property {boolean} estaOculto
   * Variable booleana que indica si el componente o sección relacionada con el 
   * formulario de agregar fabricante está visible o está oculta en la interfaz.
   * Se utiliza para controlar la visibilidad de ciertos elementos en la UI.
   */
  estaOculto: boolean = true;

    /**
     * Actualiza los datos de la tabla de fabricantes en el estado del trámite.
     *
     * @param event - Una lista de objetos de tipo `Fabricante` que contiene los datos actualizados de los fabricantes.
     * 
     * @remarks
     * Este método se utiliza para sincronizar los datos de los fabricantes con el estado del trámite
     * a través del `tramiteStore`.
     */
    updateFabricanteTablaDatos(event:Fabricante[]): void {
      this.tramiteStore.updateFabricanteTablaDatos(event);
  }
}
