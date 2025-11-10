import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PagoDeDerechosBancoComponent } from '../../../../shared/components/pago-de-derechos-banco/pago-de-derechos-banco.component';

/**
 * Componente `PagoDerechosComponent`
 * 
 * Este componente es responsable de gestionar la interfaz de usuario para el pago de derechos.
 * Es un componente independiente (`standalone`) que utiliza el módulo común de Angular (`CommonModule`)
 * y el componente `PagoDeDerechosBancoComponent` para mostrar información relacionada con los pagos.
 */
@Component({
  selector: 'app-pago-derechos',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosBancoComponent],
  templateUrl: './pago-derechos.component.html',
  styleUrl: './pago-derechos.component.scss',
})
export class PagoDerechosComponent {

  /**
   * Identificador del procedimiento que se recibe como entrada desde el componente padre.
   * Este valor se utiliza para cargar datos específicos relacionados con el procedimiento,
   * como catálogos o listas asociadas.
   */
  public idProcedimiento: number = 260504; 

}
