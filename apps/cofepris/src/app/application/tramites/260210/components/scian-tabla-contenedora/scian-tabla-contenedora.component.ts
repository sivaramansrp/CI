import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScianTablaComponent } from '../../../../shared/components/scian-tabla/scian-tabla.component';
import { TablaScianConfig } from '../../../../shared/models/datos-solicitud.model';
import { Tramite260214Store } from '../../estados/tramite260210Store.store';

/**
 * Componente contenedor para la tabla SCIAN (Sistema de Clasificación Industrial de América del Norte).
 * 
 * Este componente actúa como un wrapper que gestiona la interacción con la tabla SCIAN,
 * permitiendo la selección de códigos SCIAN y actualizando el estado del store correspondiente
 * para el trámite 260210.
 * 
 * @class ScianTablaContenedoraComponent
 * @description Componente standalone que encapsula la funcionalidad de selección SCIAN
 * @version 1.0.0
 * @author Sistema VUCEM 3.0
 */
@Component({
  selector: 'app-scian-tabla-contenedora',
  standalone: true,
  imports: [CommonModule, ScianTablaComponent],
  templateUrl: './scian-tabla-contenedora.component.html',
  styleUrl: './scian-tabla-contenedora.component.scss',
})
export class ScianTablaContenedoraComponent {
  
  /**
   * Constructor del componente.
   * 
   * Inicializa el componente inyectando las dependencias necesarias para
   * la gestión del estado del trámite 260214.
   * 
   * @param tramite260214Store - Store que maneja el estado global del trámite 260214,
   *                            utilizado para actualizar la configuración SCIAN seleccionada
   */
  constructor(private tramite260214Store: Tramite260214Store) {}

  /**
   * Configuración SCIAN actualmente seleccionada.
   * 
   * Esta propiedad almacena la configuración de la tabla SCIAN que ha sido
   * seleccionada por el usuario. Se utiliza para mantener una referencia
   * local de la selección actual antes de ser enviada al store.
   * 
   * @type {TablaScianConfig}
   * @public
   * @description Objeto que contiene los datos de configuración de la tabla SCIAN seleccionada
   * @remarks Utiliza el modificador de aserción (!) para indicar que será inicializada
   *          definidamente antes de su uso
   */
  public scianSeleccionado!: TablaScianConfig;

  /**
   * Método que procesa y actualiza el estado del store con la configuración seleccionada de la tabla SCIAN.
   * 
   * Este método es invocado cuando el usuario selecciona un elemento de la tabla SCIAN.
   * Recibe la configuración seleccionada y la propaga al store del trámite 260214,
   * actualizando específicamente el campo `scianConfigDatos` con los nuevos datos.
   * 
   * El método utiliza el patrón de actualización inmutable, preservando el estado
   * existente y solo modificando la propiedad necesaria.
   * 
   * @param {TablaScianConfig} event - Objeto que contiene la configuración completa
   *                                   de la fila seleccionada en la tabla SCIAN
   * @param event.codigo - Código SCIAN seleccionado
   * @param event.descripcion - Descripción de la actividad económica
   * @param event.sector - Sector económico al que pertenece
   * @param event.subsector - Subsector específico de la clasificación
   * 
   * @returns {void} - No retorna ningún valor
   * 
   * @example
   * ```typescript
   * const configSeleccionada: TablaScianConfig = {
   *   codigo: '111110',
   *   descripcion: 'Cultivo de trigo',
   *   sector: 'Agricultura',
   *   subsector: 'Cultivo de cereales'
   * };
   * this.obtenerSeleccionado(configSeleccionada);
   * ```
   * 
   * @see {@link TablaScianConfig} - Para más detalles sobre la estructura del objeto
   * @see {@link Tramite260214Store} - Para información sobre el store utilizado
   * 
   * @since 1.0.0
   * @public
   */
  obtenerSeleccionado(event: TablaScianConfig): void {
    this.tramite260214Store.update((state) => ({
      ...state,
      scianConfigDatos: [event],
    }));
  }
}
