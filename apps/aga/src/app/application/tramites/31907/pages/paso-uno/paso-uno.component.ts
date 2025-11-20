import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { Tramite31907Store } from '../../estados/store/tramite31907.store';

@Component({
  selector: 'app-paso-uno',
  standalone: true,
  imports: [CommonModule, SolicitanteComponent],
  templateUrl: './paso-uno.component.html',
})
export class PasoUnoComponent {
  /**
   * Folio del trámite actual.
   * se usa solo para pruebas, se debe eliminar cuando se integre con el flujo real.
   */
  folioTramite = signal('');

  /**
   * constructor de la clase PasoUnoComponent 
   * @param store Store de estado para el trámite 31907. 
   */
  constructor(private store: Tramite31907Store) {
    effect(() => {
      const FOLIO = this.folioTramite();
      this.store.update({ folioTramite: FOLIO });
    });
  }
  /**
   * Índice actual del tab mostrado.
   */
  indice: number = 2;
  /** Datos de respuesta del servidor utilizados para actualizar el formulario. */
  public esDatosRespuesta: boolean = false;

  /**
   * metodo para seleccionar el tab actual
   * @param i numero de tab a seleccionar
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }
}
