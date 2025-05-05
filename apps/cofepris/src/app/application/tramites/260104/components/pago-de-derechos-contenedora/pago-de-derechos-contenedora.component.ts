import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { PagoDerechosFormState } from '../../../../shared/models/terceros-relacionados.model';
import { Tramite260104Store } from '../../estados/stores/tramite260104.store';


/**
 * @component
 * @name PagoDeDerechosContenedoraComponent
 * @description
 * Este componente es responsable de gestionar la lógica y el estado relacionado con el pago de derechos
 * dentro del trámite 260104. Actúa como un contenedor para el componente `PagoDeDerechosComponent` y 
 * se comunica con el store `Tramite260104Store` para mantener sincronizado el estado del formulario.
 * 
 * @selector app-pago-de-derechos-contenedora
 * @standalone true
 * @imports
 * - CommonModule
 * - PagoDeDerechosComponent
 * 
 * @templateUrl ./pago-de-derechos-contenedora.component.html
 * @styleUrl ./pago-de-derechos-contenedora.component.scss
 * 
 * @class PagoDeDerechosContenedoraComponent
 * @public
 * 
 * @property {PagoDerechosFormState} pagoDerechos - Representa el estado actual del formulario de pago de derechos.
 * 
 * @constructor
 * @param {Tramite260104Store} tramiteStore - Servicio inyectado para gestionar el estado del trámite 260104.
 * 
 * @method updatePagoDerechos
 * @description
 * Actualiza el estado del pago de derechos en el store del trámite.
 * 
 * @param {PagoDerechosFormState} event - Objeto que contiene el nuevo estado del formulario de pago de derechos.
 * 
 * @example
 * ```typescript
 * const nuevoEstado: PagoDerechosFormState = { ... };
 * componente.updatePagoDerechos(nuevoEstado);
 * ```
 */
@Component({
  selector: 'app-pago-de-derechos-contenedora',
  standalone: true,
  imports: [CommonModule, PagoDeDerechosComponent],
  templateUrl: './pago-de-derechos-contenedora.component.html',
  styleUrl: './pago-de-derechos-contenedora.component.scss',
})



export class PagoDeDerechosContenedoraComponent {
 public pagoDerechos: PagoDerechosFormState;

  /**
   * Constructor de la clase PagoDeDerechosContenedoraComponent.
   * 
   * @param tramiteStore - Inyección del servicio `Tramite260104Store` que se utiliza para acceder 
   *                       y gestionar el estado relacionado con el trámite 260104.
   * 
   * Este constructor inicializa la propiedad `pagoDerechos` con el valor actual del estado 
   * almacenado en `Tramite260104Store`.
   */
  constructor(public tramiteStore: Tramite260104Store){
   this.pagoDerechos = this.tramiteStore.getValue().pagoDerechos;
  }
  
  
  /**
   * @description Actualiza el estado del pago de derechos en el store del trámite.
   * @param {PagoDerechosFormState} event - Objeto que contiene el nuevo estado del formulario de pago de derechos.
   * @memberof PagoDeDerechosContenedoraComponent
   */
  updatePagoDerechos(event: PagoDerechosFormState): void{
    this.tramiteStore.updatePagoDerechos(event);
  }

}
