import { Component } from '@angular/core';

import { TABLA_ORDEN } from '../../constantes/importacion-plafest.enum';
import { TercerosRelacionadosComponent } from '../../../../shared/components/terceros-fabricante/terceros-fabricante.component';

/**
 * Componente que muestra la sección de Terceros Relacionados.
 * Esta sección es común para todos los trámites.
 */
@Component({
  selector: 'app-terceros-relacionados',
  standalone: true,
  imports: [
    TercerosRelacionadosComponent
  ],
  templateUrl: './terceros-relacionados.component.html',
  styleUrl: './terceros-relacionados.component.scss'
})
export class TercerosRelacionados260507Component {
  /**
   * Propiedad que almacena la constante TABLA_ORDEN para definir el orden de la tabla.
   */
  tablaOrden = TABLA_ORDEN;
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260507;
}
