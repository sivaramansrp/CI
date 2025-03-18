import { ANEXO_SERVICIO } from '../../../../shared/constantes/anexo-dos-y-tres.enum';
import { AnexoDosYTresComponent } from '../../../../shared/components/anexo-dos-y-tres.component/anexo-dos-y-tres.component';
import { AnexoEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TablaSeleccion } from '@libs/shared/data-access-user/src';

@Component({
  selector: 'app-anexo-vista-dos-y-tres',
  standalone: true,
  imports: [CommonModule, AnexoDosYTresComponent],
  templateUrl: './anexo-vista-dos-y-tres.component.html',
  styleUrl: './anexo-vista-dos-y-tres.component.scss',
})
export class AnexoVistaDosYTresComponent {

  /**
   * Lista de encabezados del anexo dos.
   * @type {AnexoEncabezado[]}
   */
  public anexoDosTablaLista: AnexoEncabezado[] = [];

  /**
   * Lista de encabezados del anexo tres.
   * @type {AnexoEncabezado[]}>}
   */
  public anexoTresTablaLista: AnexoEncabezado[] = [];

  /**
   * Configuración del anexo.
   * @type {Object}
   * @property {TablaSeleccion} anexoDosTablaSeleccionCheckbox - Selección de tabla del anexo dos.
   * @property {ANEXO_SERVICIO} anexoDosEncabezadoDeTabla - Encabezado de tabla del anexo dos.
   * @property {TablaSeleccion} anexoTresTablaSeleccionCheckbox - Selección de tabla del anexo tres.
   * @property {ANEXO_SERVICIO} anexoTresEncabezadoDeTabla - Encabezado de tabla del anexo tres.
   */
  public anexoConfig = {
    anexoDosTablaSeleccionCheckbox: TablaSeleccion.CHECKBOX,
    anexoDosEncabezadoDeTabla: ANEXO_SERVICIO,
    anexoTresTablaSeleccionCheckbox: TablaSeleccion.CHECKBOX,
    anexoTresEncabezadoDeTabla: ANEXO_SERVICIO,
  }

  /**
   * Método para obtener la devolución de llamada del anexo dos.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo dos.
   * @returns {void}
   */
  public obtenerAnexoDosDevolverLaLlamada(event: AnexoEncabezado[]): void {
    this.anexoDosTablaLista = event ? event : [];
  }

  /**
   * Método para obtener la devolución de llamada del anexo tres.
   * @param {T[]} event - Evento que contiene la lista de encabezados del anexo tres.
   * @returns {void}
   */
  public obtenerAnexoTresDevolverLaLlamada(event: AnexoEncabezado[]): void {
    this.anexoTresTablaLista = event ? event : [];
  }
}
