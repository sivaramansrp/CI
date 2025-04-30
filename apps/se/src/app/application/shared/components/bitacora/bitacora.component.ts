import { Component, Input } from '@angular/core';

import { TablaDinamicaComponent, TablaSeleccion, TituloComponent } from '@libs/shared/data-access-user/src';
import { Bitacora } from '../../models/bitacora.model';
import { TABLA_BITACORA } from '../../constantes/bitacora.enum';

/**
 * Componente para mostrar la tabla de bitácoras.
 */
@Component({
  selector: 'app-bitacora-tabla',
  standalone: true,
  imports: [
    TituloComponent,
    TablaDinamicaComponent
  ],
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.scss'
})
export class BitacoraTablaComponent {
/**
   * Lista de bitácoras obtenidas del servicio
   * @type {Bitacora[]}
   */
  @Input() bitacoraDatos: Bitacora[] = [];

  /**
   * Configuración de la tabla de bitácoras
   * @type {ConfiguracionColumna<Bitacora>[]}
   */
  configuracionTabla = TABLA_BITACORA;

  /**
   * Tabla de selección de bitácoras
   * @type {TablaSeleccion}
   */
  tablaSeleccion = TablaSeleccion;
}
