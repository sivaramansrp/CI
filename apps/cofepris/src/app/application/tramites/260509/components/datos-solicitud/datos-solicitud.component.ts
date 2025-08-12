import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatosDeLaComponent } from '../../../../shared/components/datos-solicitud/datos-solicitud.component';

/**
 * Componente que muestra la sección de Datos de la Solicitud.
 * Esta sección es común para todos los trámites.
 */
@Component({
  selector: 'app-datos-solicitud',
  standalone: true,
  imports: [CommonModule, DatosDeLaComponent],
  templateUrl: './datos-solicitud.component.html',
  styleUrl: './datos-solicitud.component.scss',
})
export class DatosSolicitudComponent {
  /**
   * Indica si se debe mostrar la sección de Aviso de Licencia
   */
  isAvisoLicenciaVisible: boolean = false;

  /**
   * Indica si se debe mostrar la sección de Aduanas de Entrada
   */
  isAduanasEntradaVisible: boolean = true;

  /**
   * Indica si se debe mostrar la sección de Garantías Ofrecidas
   */
  isGarantiasOfrecidasVisible: boolean = false;

  /**
   * Indica si el campo de domicilio debe estar habilitado en el formulario.
   * Cuando se establece en `true`, el campo de domicilio está activo y puede ser interactuado.
   */
  tieneDomicilioHabilitar: boolean = true;
}
