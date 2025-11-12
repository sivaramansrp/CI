import { Component } from '@angular/core';

import { PagoDeDerechosBancoComponent } from '../../../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component';

/**
 * Componente que muestra la sección de Pago de Derechos.
 */
@Component({
  selector: 'app-pago-de-derechos',
  standalone: true,
  imports: [
    PagoDeDerechosBancoComponent
  ],
  templateUrl: './pago-de-derechos.component.html',
  styleUrl: './pago-de-derechos.component.scss'
})
export class PagoDeDerechosComponent {
  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260507;

}
