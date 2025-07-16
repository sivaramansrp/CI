import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';

/**
 * @class AgregarDestinatarioFinalContenedoraComponent
 * @description
 * Componente contenedor encargado de gestionar la lógica relacionada con la
 * adición de destinatarios finales en el contexto del trámite 260102.
 * Este componente funciona como intermediario entre el componente visual
 * `AgregarDestinatarioFinalComponent` y el estado centralizado (`Tramite260102Store`),
 * permitiendo mantener la sincronización de datos.
 */
@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
export class AgregarDestinatarioFinalContenedoraComponent {

  /**
   * @constructor
   * @param {Tramite260102Store} tramiteStore - Servicio que actúa como store del estado
   * del trámite 260102, permitiendo almacenar y actualizar la información relacionada
   * con los destinatarios finales.
   */
  constructor(public tramiteStore: Tramite260102Store) {}

  /**
   * @method updateDestinatarioFinalTablaDatos
   * @description
   * Actualiza los datos de la tabla de destinatarios finales en el store del trámite.
   * Este método se invoca desde el componente de presentación y propaga los cambios
   * al estado centralizado.
   *
   * @param {Destinatario[]} event - Arreglo de objetos `Destinatario` que contiene
   * los datos actualizados a registrar en el store.
   * 
   * @returns {void}
   *
   * @example
   * const nuevosDestinatarios = [
   *   { id: 1, nombre: 'Ana Torres', tipo: 'Natural' },
   *   { id: 2, nombre: 'Empresa ABC', tipo: 'Jurídica' }
   * ];
   * this.updateDestinatarioFinalTablaDatos(nuevosDestinatarios);
   */
  updateDestinatarioFinalTablaDatos(event: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}
