import { ANEXO_I_SERVICIO } from '../../../../shared/enum/anexo-dos-y-tres.enum';
import { AnexoUnoComponent } from '../../../../shared/components/anexo-uno/anexo-uno.component';
import { AnexoUnoEncabezado } from '../../../../shared/models/se-shared.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-anexo-vista-uno',
  standalone: true,
  imports: [CommonModule, AnexoUnoComponent],
  templateUrl: './anexo-vista-uno.component.html',
  styleUrl: './anexo-vista-uno.component.scss',
})
export class AnexoVistaUnoComponent {

  public anexoConfig = {
    anexoUnoTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoUnoEncabezadoDeTabla: ANEXO_I_SERVICIO,
    anexoDosTablaSeleccionRadio: TablaSeleccion.RADIO,
    anexoDosEncabezadoDeTabla: ANEXO_I_SERVICIO,
  }

  /**
   * Lista de encabezados del anexo Uno.
   * @type {AnexoEncabezado[]}
   */
  public anexoUnoTablaLista: AnexoUnoEncabezado[] = [];

  /**
    * Lista de encabezados del anexo dos.
    * @type {AnexoEncabezado[]}
    */
  public anexoDosTablaLista: AnexoUnoEncabezado[] = [];

  /**
   * Método para obtener la devolución de llamada del anexo tres.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo tres.
   * @returns {void}
   */
  public obtenerAnexoUnoDevolverLaLlamada(event: AnexoUnoEncabezado[]): void {
    this.anexoUnoTablaLista = event ? event : [];
  }
}
