import { AgregarDestinatarioFinalComponent } from '../../../../shared/components/agregar-destinatario-final/agregar-destinatario-final.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';
import { ID_PROCEDIMIENTO } from '../../constants/importacion-materias-primas.enum';
import { Tramite260202Store } from '../../estados/tramite260202Store.store';

/**
 * @component AgregarDestinatarioFinalContenedoraComponent
 * @description Componente Angular encargado de gestionar la funcionalidad relacionada con los destinatarios finales 
 * en el trámite identificado por el procedimiento `ID_PROCEDIMIENTO`. Este componente interactúa con el store 
 * `Tramite260202Store` para actualizar y administrar el estado de los destinatarios finales.
 * 
 * @selector app-agregar-destinatario-final-contenedora
 * @standalone true
 * @imports CommonModule, AgregarDestinatarioFinalComponent
 * @templateUrl ./agregar-destinatario-final-contenedora.component.html
 * @styleUrl ./agregar-destinatario-final-contenedora.component.scss
 * 
 * @remarks
 * Este componente forma parte del módulo de trámites y está diseñado para trabajar con el trámite específico 
 * identificado como `260202`. Proporciona métodos para actualizar los datos de los destinatarios finales 
 * en el store correspondiente, facilitando la interacción entre la interfaz de usuario y el estado de la aplicación.
 */
@Component({
  selector: 'app-agregar-destinatario-final-contenedora',
  standalone: true,
  imports: [CommonModule, AgregarDestinatarioFinalComponent],
  templateUrl: './agregar-destinatario-final-contenedora.component.html',
  styleUrl: './agregar-destinatario-final-contenedora.component.scss',
})
/**
 * @class AgregarDestinatarioFinalContenedoraComponent
 * @description Componente encargado de gestionar la funcionalidad relacionada con los destinatarios finales 
 * en el trámite identificado por el procedimiento `ID_PROCEDIMIENTO`. Este componente interactúa con el 
 * store `Tramite260202Store` para actualizar y administrar el estado de los destinatarios finales.
 * 
 * @remarks
 * Este componente forma parte del módulo de trámites y está diseñado para trabajar con el trámite específico 
 * identificado como `260202`. Proporciona métodos para actualizar los datos de los destinatarios finales 
 * en el store correspondiente.
 */
export class AgregarDestinatarioFinalContenedoraComponent {

  /**
   * @property {string} idProcedimiento
   * @description Identificador del procedimiento, utilizado para la gestión del trámite.
   */
  public readonly idProcedimiento = ID_PROCEDIMIENTO;

    /**
   * @constructor
   * @description Constructor que inyecta el store `Tramite260202Store` para gestionar el estado del trámite.
   * 
   * @param tramiteStore - Store que administra el estado del trámite 260202.
   */
  constructor(public tramiteStore: Tramite260202Store) {
    // Constructor vacío, se inyecta el store para su uso en el componente.
  }

    /**
   * @method updateDestinatarioFinalTablaDatos
   * @description Actualiza los datos de la tabla de destinatarios finales en el store del trámite.
   * 
   * @param {Destinatario[]} event - Lista de destinatarios finales que se actualizarán en el store.
   * @returns {void} Este método no retorna ningún valor.
   */
  updateDestinatarioFinalTablaDatos(event: Destinatario[]): void {
    this.tramiteStore.updateDestinatarioFinalTablaDatos(event);
  }
}
